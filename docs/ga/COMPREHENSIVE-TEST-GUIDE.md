# 🧪 GA 종합 테스트 가이드

> 6개 핵심 태그 구현이 완료되었습니다! 이제 각 태그가 정상적으로 작동하는지 확인해봅시다.

## 🎯 테스트 준비

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 브라우저 접속
- **URL**: http://localhost:3000
- **권장 브라우저**: Chrome (개발자 도구 활용)

### 3. 디버그 패널 확인
- **위치**: 화면 **오른쪽 아래**
- **모습**: 검은색 박스에 "📊 GA Debug Panel" 표시
- **기능**: 모든 GA 이벤트를 실시간으로 보여줌

---

## ✅ 테스트 체크리스트

### 🔹 태그 1: scroll_depth (콘텐츠 참여도)

**테스트 방법:**
1. 페이지를 **천천히 아래로 스크롤**
2. 디버그 패널을 확인하면서 진행

**확인 사항:**
- [ ] **25% 지점** 통과 시 디버그 패널에 이벤트 표시
  ```
  scroll_depth
    percentage: 25
    time_to_scroll: 3
    page_path: /
  ```

- [ ] **50% 지점** 통과 시 이벤트 표시
  ```
  scroll_depth
    percentage: 50
    time_to_scroll: 8
  ```

- [ ] **75% 지점** 통과 시 이벤트 표시
- [ ] **100% (페이지 끝)** 도달 시 이벤트 표시

**디버그 콘솔 확인:**
- F12 → Console 탭
- `🔍 GA Event: scroll_depth` 로그 확인

---

### 🔹 태그 2: click_cta (전환 유도 효과)

**테스트 방법:**
페이지의 주요 버튼들을 클릭하면서 확인

#### Test 2-1: Hero CTA
- [ ] **"상품 선택하기"** 버튼 클릭 (페이지 상단 큰 파란색 버튼)
- [ ] 디버그 패널 확인:
  ```
  click_cta
    cta_text: 상품 선택하기
    cta_location: hero
    scroll_depth_at_click: 15
  ```

#### Test 2-2: Product CTA
- [ ] 페이지를 스크롤하여 **상품 카드** 영역으로 이동
- [ ] **"지금 시작하기"** 버튼 클릭 (그로스 플랜)
- [ ] 디버그 패널 확인:
  ```
  click_cta
    cta_text: 지금 시작하기 - 그로스 플랜
    cta_location: product
    product_id: growth-plan
  ```

#### Test 2-3: Footer CTA
- [ ] 페이지 맨 아래 Footer까지 스크롤
- [ ] **"문의하기"** (카카오톡) 링크 클릭
- [ ] 디버그 패널 확인:
  ```
  click_cta
    cta_text: 카카오톡 문의
    cta_location: footer_support
  ```

---

### 🔹 태그 3: form_field_interaction (이탈 지점 파악)

**테스트 방법:**
베타 신청 모달을 열고 폼 필드를 테스트

#### 모달 열기
1. "상품 선택하기" 버튼 클릭하여 상품 영역으로 이동
2. 또는 상품 카드의 "지금 시작하기" 클릭하여 모달 열기
3. **무료 체험 모달이 열립니다**

#### Test 3-1: 이메일 필드
- [ ] 이메일 입력 필드 **클릭 (포커스)**
- [ ] 디버그 패널 확인:
  ```
  form_field_interaction
    form_name: beta_signup
    field_name: email
    interaction_type: focus
    step_number: 1
  ```

- [ ] 이메일 입력 (예: test@example.com)
- [ ] 다른 곳 클릭 (블러)
- [ ] 디버그 패널 확인:
  ```
  form_field_interaction
    form_name: beta_signup
    field_name: email
    interaction_type: complete
    step_number: 1
  ```

---

### 🔹 태그 4: view_item (상품 관심도)

**테스트 방법:**
상품 카드가 화면에 노출되면 자동으로 이벤트 발생

#### Test 4-1: 상품 영역으로 스크롤
- [ ] 페이지를 스크롤하여 **"그로스 플랜"** 카드가 화면에 나타나도록
- [ ] **1초 대기** (노출 시간 측정)
- [ ] 디버그 패널 확인:
  ```
  view_item
    item_id: growth-plan
    item_name: 그로스 플랜
    price: 49000
    view_duration: 1
    index: 0
  ```

#### Test 4-2: 다른 상품 확인
- [ ] 계속 스크롤하여 다른 상품 카드들 확인
- [ ] 각 상품마다 `view_item` 이벤트 발생
- [ ] **총 5개** 상품 이벤트 확인

**주의:** 한 번 본 상품은 재스크롤해도 이벤트가 다시 발생하지 않습니다.

---

### 🔹 태그 5: view_section (섹션별 효과)

**테스트 방법:**
페이지의 주요 섹션들이 화면에 나타날 때 자동 추적

#### 자동 추적되는 섹션들:
- Hero 섹션
- Problem 섹션 (#why)
- Products 섹션 (#products)
- How It Works 섹션 (#how-it-works)
- FAQ 섹션 (#faq)
- Footer

#### Test 5-1: 섹션 스크롤
- [ ] 페이지를 **천천히** 스크롤
- [ ] 각 섹션이 화면에 나타날 때 디버그 패널 확인:
  ```
  view_section
    section_name: products
    section_order: 3
    view_percentage: 50
  ```

**팁:** 각 섹션에 들어갈 때마다 1회씩 이벤트 발생

---

### 🔹 태그 6: error (시스템 오류)

**테스트 방법:**
의도적으로 에러를 발생시켜 추적 확인

#### Test 6-1: 폼 검증 에러
- [ ] 베타 신청 모달 열기
- [ ] 이메일 필드에 **잘못된 이메일** 입력 (예: "test")
- [ ] "다음 단계로" 버튼 클릭
- [ ] 디버그 패널에서 에러 이벤트 또는 검증 메시지 확인

#### Test 6-2: 파일 업로드 에러 (선택)
- [ ] 구매 모달 열기
- [ ] **10MB 초과 파일** 업로드 시도
- [ ] 디버그 패널에 에러 이벤트 확인

#### Test 6-3: 콘솔에서 에러 확인
- [ ] 개발자 도구(F12) > Console
- [ ] `✅ Global Error Tracking: Initialized` 메시지 확인

---

## 📊 종합 검증

### 최종 확인 사항

테스트를 모두 완료한 후 디버그 패널을 확인하세요:

**예상 이벤트 수:**
- [ ] `scroll_depth`: 최소 4개 (25%, 50%, 75%, 100%)
- [ ] `click_cta`: 최소 2-3개 (버튼 클릭한 만큼)
- [ ] `form_field_interaction`: 최소 2개 (focus + blur/complete)
- [ ] `view_item`: 최소 3-5개 (본 상품 개수)
- [ ] `view_section`: 5-8개 (본 섹션 개수)
- [ ] `page_view`: 1개

**총 이벤트:** 약 **15-25개**

---

## 🎯 시각적 테스트 가이드

### 화면 구성
```
┌──────────────────────────────────────────┐
│ QueryDaily - 면접 준비...                │
│                                          │
│    [상품 선택하기] ← 1. 이 버튼 클릭     │
│                                          │
│    (스크롤하면서...)                     │
│                                          │
│    [그로스 플랜]                         │
│    [지금 시작하기] ← 2. 상품 버튼 클릭   │
│                                          │
│                      ┌─────────────┐     │
│                      │📊 GA Debug  │ ←── 3. 여기서 확인
│                      │ Events: 12  │     │
│                      │─────────────│     │
│                      │scroll_depth │     │
│                      │click_cta    │     │
│                      │view_item    │     │
└──────────────────────────┴─────────────┘
```

---

## 🔍 고급 검증

### 브라우저 개발자 도구 활용

#### 1. Console 탭
```javascript
// 모든 GA 이벤트 로그 확인
// 🔍 GA Event: 로 시작하는 메시지들
```

#### 2. Network 탭
- Filter에 "collect" 입력
- GA로 전송되는 실제 요청 확인
- URL에 이벤트 파라미터 포함 확인

#### 3. Application 탭
- Local Storage 확인
- 실험 그룹 할당 정보 (향후 A/B 테스트용)

---

## ❌ 문제 해결

### 디버그 패널이 안 보일 때
1. **페이지 새로고침** (Ctrl+F5 또는 Cmd+Shift+R)
2. **개발 모드 확인**: `NODE_ENV=development`
3. **콘솔 에러 확인**: F12 > Console에서 에러 메시지

### 이벤트가 발생하지 않을 때
1. **gtag 로드 확인**: 콘솔에 `window.gtag` 입력
   - `function` → 정상
   - `undefined` → GoogleAnalytics 컴포넌트 확인
2. **컴포넌트 import 확인**: ScrollTracker, ItemTracker 등이 제대로 import되었는지
3. **페이지 새로고침**: 일부 이벤트는 1회만 발생

### 이벤트가 중복 발생할 때
- **정상입니다**: 개발 환경에서는 React Strict Mode로 인해 일부 이벤트가 2번 발생할 수 있습니다
- 프로덕션 빌드에서는 정상적으로 1회만 발생합니다

---

## 📝 테스트 결과 기록

### 체크리스트

**테스트 일시**: _______________

**환경**:
- [ ] Chrome
- [ ] 개발 서버 (localhost:3000)
- [ ] NODE_ENV=development

**결과**:
- [ ] ✅ 디버그 패널 정상 표시
- [ ] ✅ scroll_depth 이벤트 정상 (4개)
- [ ] ✅ click_cta 이벤트 정상 (2개 이상)
- [ ] ✅ form_field_interaction 이벤트 정상 (2개 이상)
- [ ] ✅ view_item 이벤트 정상 (3개 이상)
- [ ] ✅ view_section 이벤트 정상 (5개 이상)
- [ ] ✅ error 추적 초기화 완료

**발견된 이슈**:
_____________________
_____________________

---

## 🚀 검증 완료 후 다음 단계

### Phase 3: 전환 퍼널 구축
- GA4 Console에서 퍼널 설정
- 커스텀 디멘션 추가
- 리포트 템플릿 구성

### Phase 4: A/B 테스트 준비
- 실험 인프라 기초 구축
- 가이드 문서 작성

### Phase 5: 문서화
- 최종 이벤트 레퍼런스 작성
- 마케팅 후 분석 템플릿 작성

---

## 💡 추가 팁

### 디버그 패널 활용법
1. **필터 사용**: 특정 이벤트만 보고 싶을 때
2. **Clear All**: 이벤트 목록 초기화
3. **최소화**: 화면 공간 확보
4. **고정 해제**: 패널 위치 이동

### 정확한 테스트를 위한 팁
1. **한 번에 하나씩**: 각 기능을 개별적으로 테스트
2. **새로고침 후 재테스트**: 일부 이벤트는 1회성
3. **천천히 진행**: 이벤트 발생 시간 확보
4. **디버그 패널 확장**: 파라미터 상세 확인

---

_테스트를 완료하시면 체크리스트에 ✅ 표시해주세요!_