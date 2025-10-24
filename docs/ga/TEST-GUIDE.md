# 🧪 GA 구현 테스트 가이드

## ✅ 현재 적용 완료된 항목들

### 1. GADebugPanel (디버그 패널)
- **위치**: `app/layout.tsx`에 추가됨
- **기능**: GA 이벤트를 실시간으로 모니터링

### 2. ScrollTracker (스크롤 추적)
- **위치**: `app/page.tsx`에 추가됨
- **추적 지점**: 25%, 50%, 75%, 100%

---

## 🚀 테스트 실행 방법

### Step 1: 개발 서버 시작
```bash
npm run dev
# 또는
yarn dev
```

### Step 2: 브라우저에서 확인
1. http://localhost:3000 접속
2. 페이지 로드 완료 확인

---

## 🔍 검증 체크리스트

### 1. GA Debug Panel 확인
- [x] **우측 하단**에 검은색 디버그 패널이 표시되는가?
- [x] 패널 헤더에 "📊 GA Debug Panel"이 보이는가?
- [x] 최소화/최대화 버튼이 작동하는가?
- [x] Hydration 에러 없이 정상 작동하는가?

### 2. 스크롤 이벤트 테스트 ✅
페이지를 천천히 스크롤하면서 다음을 확인:

#### 25% 지점 스크롤
- [ ] 디버그 패널에 `scroll_depth` 이벤트 표시
- [ ] `percentage: 25` 파라미터 확인
- [ ] `time_to_scroll` 값 확인

#### 50% 지점 스크롤
- [ ] 디버그 패널에 `scroll_depth` 이벤트 표시
- [ ] `percentage: 50` 파라미터 확인

#### 75% 지점 스크롤
- [ ] 디버그 패널에 `scroll_depth` 이벤트 표시
- [ ] `percentage: 75` 파라미터 확인

#### 100% (페이지 끝) 도달
- [ ] 디버그 패널에 `scroll_depth` 이벤트 표시
- [ ] `percentage: 100` 파라미터 확인

### 3. CTA 클릭 이벤트 테스트 🆕

#### Hero CTA
- [ ] "상품 선택하기" 버튼 클릭
- [ ] 디버그 패널에 `click_cta` 이벤트 표시
- [ ] `cta_text: 상품 선택하기` 확인
- [ ] `cta_location: hero` 확인

#### Product CTAs
- [ ] "지금 시작하기" 버튼 클릭 (그로스 플랜)
- [ ] 디버그 패널에 `click_cta` 이벤트 표시
- [ ] `cta_text: 지금 시작하기 - 그로스 플랜` 확인
- [ ] `cta_location: product` 확인
- [ ] `product_id: growth-plan` 확인

#### Footer CTA
- [ ] "문의하기" (카카오톡) 링크 클릭
- [ ] 디버그 패널에 `click_cta` 이벤트 표시
- [ ] `cta_text: 카카오톡 문의` 확인
- [ ] `cta_location: footer_support` 확인

### 4. 콘솔 로그 확인 (개발 환경)
브라우저 개발자 도구(F12) > Console 탭에서:

- [ ] `✅ GA Tracking Hook: Ready` 메시지 확인
- [ ] `📊 ScrollTracker: Initialized for /` 메시지 확인
- [ ] 스크롤 시 `🔍 GA Event:` 로그 확인
- [ ] 각 이벤트의 파라미터 확인

---

## 🎯 예상 결과

### 정상 작동 시 디버그 패널 모습
```
📊 GA Debug Panel                    [3]
✓ Connected  Events: 3
----------------------------------------
scroll_depth                     10:23:45
  percentage: 25
  time_to_scroll: 2
  page_path: /

scroll_depth                     10:23:47
  percentage: 50
  time_to_scroll: 4

page_view                        10:23:43
  page_path: /
  page_title: QueryDaily - 매일...
```

### 정상 작동 시 콘솔 로그
```
✅ GA Tracking Hook: Ready
📊 ScrollTracker: Initialized for /
🔍 GA Event: {
  name: "scroll_depth",
  params: {
    percentage: 25,
    time_to_scroll: 2,
    page_path: "/",
    page_title: "QueryDaily - 매일 성장하는..."
  }
}
```

---

## ❌ 문제 발생 시

### 1. 디버그 패널이 보이지 않는 경우
- 개발 환경(`NODE_ENV=development`)인지 확인
- `app/layout.tsx`에 `<GADebugPanel />` 추가 확인
- 브라우저 새로고침 (Ctrl+F5)

### 2. 스크롤 이벤트가 발생하지 않는 경우
- `app/page.tsx`에 `<ScrollTracker />` 추가 확인
- 페이지 높이가 스크롤 가능한지 확인
- 콘솔에 에러 메시지 확인

### 3. "gtag not found" 에러
- `GoogleAnalytics` 컴포넌트가 로드되었는지 확인
- `window.gtag` 존재 여부 확인 (콘솔에서 직접 입력)

### 4. TypeScript 에러 발생
```bash
# 타입 체크
npm run type-check
# 또는
npx tsc --noEmit
```

---

## 📋 다음 단계

### 검증 완료 후:
1. **GA4 DebugView 확인**
   - [GA4 Console](https://analytics.google.com) 접속
   - 설정 > DebugView 이동
   - 실시간 이벤트 확인

2. **Phase 2.2 진행**
   - click_cta 태그 구현
   - CTA 버튼들에 클릭 추적 적용

### 문제 발생 시:
1. 에러 메시지와 콘솔 로그 캡처
2. 문제 재현 단계 기록
3. 수정 후 재테스트

---

## 💡 테스트 팁

1. **페이지 새로고침 후 테스트**
   - 스크롤 추적은 페이지당 1회만 발생
   - 재테스트 시 페이지 새로고침 필요

2. **천천히 스크롤**
   - 너무 빨리 스크롤하면 일부 지점을 놓칠 수 있음
   - 각 지점에서 잠시 멈추면서 테스트

3. **네트워크 탭 확인**
   - 개발자 도구 > Network 탭
   - `collect` 또는 `gtag` 요청 확인
   - GA로 실제 데이터 전송 확인

---

_테스트 완료 후 결과를 기록해주세요._

## 테스트 결과 기록

**테스트 일시**: _______________
**테스트 환경**:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**결과**:
- GA Debug Panel: [ ] 정상 / [ ] 오류
- Scroll Tracking: [ ] 정상 / [ ] 오류
- Console Logs: [ ] 정상 / [ ] 오류

**메모**:
_____________________
_____________________