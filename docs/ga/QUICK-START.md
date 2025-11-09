# QueryDaily GA4 빠른 시작 가이드

> 5분만에 이해하는 우리 서비스의 데이터 추적 현황과 활용법

## 🎯 현재 추적 중인 데이터

### 1. 사용자 여정 추적

```
방문 → 스크롤 → 상품 조회 → CTA 클릭 → 폼 시작 → 단계별 진행 → 전환
 ✓      ✓         ✓          ✓         ✓          ✓           ✓
```

**추적 이벤트:**
- `scroll_depth`: 25%, 50%, 75%, 100% 도달 시점
- `view_item`: 상품 카드 화면 노출 (1초 이상 + 50% 이상)
- `view_section`: 주요 섹션 진입 (hero, products, testimonials 등)
- `click_cta`: 모든 버튼/링크 클릭
- `form_step_complete`: 폼 단계 완료
- `page_engagement`: 체류시간 및 이탈 지점

### 2. 클릭 추적 범위

| 요소 | 추적 여부 | 구분자 (cta_location) |
|------|----------|---------------------|
| 네비게이션 링크 | ✅ | `navigation` |
| 상품 "지금 시작하기" | ✅ | `product` + `product_id` |
| Hero CTA | ✅ | `hero` |
| FAQ 아코디언 | ✅ | `faq_accordion` |
| 후기 슬라이더 | ✅ | `testimonial_slider` |
| 질문 유형 탭 | ✅ | `question_type_tab` |
| 모달 버튼 | ✅ | `beta_modal_step1` 등 |

### 3. 폼 추적 상세

**단계별 진행:**
- 각 단계 완료 시 `form_step_complete` 자동 발생
- Parameters: `form_name`, `step_number`, `total_steps`

**필드별 상호작용:**
- Focus, Blur, Complete, Error 모두 추적
- 인프라 완비 (필요 시 확장 가능)

### 4. 이탈/참여 분석

**페이지 이탈 시 자동 수집:**
- 총 체류 시간 (`engagement_time_seconds`)
- 이탈 시 스크롤 위치 (`exit_scroll_depth`)
- 최대 도달 깊이 (`max_scroll_depth`)
- 마지막 인터랙션 시점 (`last_interaction_seconds_ago`)

---

## 📊 GA4 UI에서 확인하는 방법

### 빠른 확인: DebugView (실시간)

```
GA4 > 구성 > DebugView
```

**Chrome 확장 프로그램 필요:**
[Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

**확인 항목:**
1. 페이지 스크롤 → `scroll_depth` 이벤트 발생 확인
2. CTA 클릭 → `click_cta` + `cta_location`, `cta_text` 확인
3. 폼 진행 → `form_step_complete` + `step_number` 확인
4. 페이지 이탈 → `page_engagement` 확인

### 핵심 리포트 만들기

#### 1️⃣ CTA 효과 분석

```
GA4 > 탐색 > 자유 형식

차원 추가:
- 이벤트 이름
- cta_location (커스텀 차원)
- cta_text (커스텀 차원)

측정항목:
- 이벤트 수
- 총 사용자

필터:
- 이벤트 이름 = click_cta
```

**인사이트:**
- 어떤 위치의 CTA가 가장 효과적인가?
- Hero vs Product vs Navigation 비교
- 상품별 클릭률 차이 (`product_id` 필터)

#### 2️⃣ 전환 퍼널 분석

```
GA4 > 탐색 > 유입경로 탐색 분석

단계 구성:
1. 방문 (page_view)
2. 스크롤 50% (scroll_depth, percentage ≥ 50)
3. 상품 조회 (view_item)
4. CTA 클릭 (click_cta)
5. 폼 시작 (form_field_interaction, interaction_type = focus)
6. 가입 완료 (sign_up)
```

**인사이트:**
- 어느 단계에서 이탈이 가장 많은가?
- 전체 전환율은?
- 단계별 개선 우선순위 결정

#### 3️⃣ 폼 이탈 분석

```
GA4 > 탐색 > 자유 형식

차원:
- form_name (커스텀 차원)
- step_number (커스텀 측정항목)

측정항목:
- 이벤트 수
- 총 사용자

필터:
- 이벤트 이름 = form_step_complete
```

**인사이트:**
- 어떤 단계에서 이탈이 많은가?
- Beta vs Purchase 폼 비교
- 단계별 완료율

#### 4️⃣ 페이지 참여도 분석

```
GA4 > 탐색 > 자유 형식

차원:
- page_path

측정항목:
- engagement_time_seconds (커스텀 측정항목)
- exit_scroll_depth (커스텀 측정항목)
- max_scroll_depth (커스텀 측정항목)

필터:
- 이벤트 이름 = page_engagement
```

**인사이트:**
- 평균 체류 시간은?
- 사용자들이 어디까지 스크롤하는가?
- 이탈 지점은 어디인가?

#### 5️⃣ 섹션별 효과 분석

```
GA4 > 탐색 > 자유 형식

차원:
- section_name (커스텀 차원)

측정항목:
- 이벤트 수
- 총 사용자

필터:
- 이벤트 이름 = view_section 또는 section_engagement
```

**인사이트:**
- 어떤 섹션이 가장 주목받는가?
- 섹션별 체류 시간 (3초 이상 = engagement)
- 효과 없는 섹션 식별

---

## 🎨 시각화 팁

### 대시보드 구성 (추천)

**페이지 1: 전체 개요**
```
├─ 주요 지표 카드 (방문자, 전환, 평균 체류시간)
├─ 주간 트렌드 (꺾은선 그래프)
└─ 전주 대비 증감률
```

**페이지 2: 전환 퍼널**
```
├─ 7단계 퍼널 시각화 (막대 그래프)
├─ 단계별 전환율
└─ 병목 구간 하이라이트
```

**페이지 3: CTA 효과**
```
├─ cta_location별 클릭수 (파이 차트)
├─ 상품별 관심도 (product_id)
└─ 시간대별 클릭 패턴
```

**페이지 4: 폼 성과**
```
├─ 단계별 완료율 (막대 그래프)
├─ 필드별 이탈률
└─ 평균 완료 시간
```

### Looker Studio 연동 (선택)

```
1. https://lookerstudio.google.com 접속
2. "만들기" > "데이터 소스"
3. "Google Analytics" 선택
4. QueryDaily GA4 속성 선택
5. 리포트 생성
```

**장점:**
- 자동 업데이트 대시보드
- 팀 공유 가능
- 예쁜 시각화

---

## 🚀 활용 시나리오

### 시나리오 1: CTA 위치 최적화

**문제:** "상품 선택하기" CTA 클릭률이 낮다

**분석:**
```sql
GA4에서 확인:
- click_cta 이벤트 필터
- cta_location별 그룹화
- hero vs product vs floating 비교
```

**액션:**
- 클릭률 낮은 위치 제거 또는 디자인 변경
- A/B 테스트로 검증 (`cta_variant` 활용)

### 시나리오 2: 폼 이탈 개선

**문제:** 폼 2단계에서 60% 이탈

**분석:**
```sql
GA4에서 확인:
- form_step_complete 이벤트
- step_number = 2 필터
- 전후 단계와 비교
```

**액션:**
- 해당 단계 UI 개선
- 필수 필드 최소화
- 진행 표시기 추가

### 시나리오 3: 콘텐츠 효과 측정

**문제:** 새로운 섹션 추가 후 효과 모름

**분석:**
```sql
GA4에서 확인:
- view_section 이벤트
- section_name = "new_section"
- 노출 횟수, 체류 시간 확인
```

**액션:**
- 효과 없으면 제거
- 효과 있으면 상단 이동

---

## ⚠️ 주의사항

### product_id "(not set)" 해석

**정상적인 케이스:**
```
(not set) = 상품과 무관한 CTA (네비게이션, FAQ 등)
growth-plan = 그로스 플랜 상품 CTA
```

**분석 방법:**
```
cta_location으로 먼저 필터링:
- cta_location = "product" → product_id 있어야 정상
- cta_location = "navigation" → product_id 없어야 정상
```

### 데이터 수집 지연

- **DebugView**: 즉시 확인 가능 ✅
- **이벤트 목록**: 24시간 후 나타남
- **보고서**: 24-48시간 후 반영
- **커스텀 차원**: 생성 후 발생한 이벤트부터 수집

### 샘플링 주의

- 무료 GA4: 일일 1천만 이벤트까지 샘플링 없음
- QueryDaily 규모: 걱정 불필요
- 대량 데이터 분석 시: "샘플링 없음" 확인

---

## 📚 더 알아보기

**상세 가이드:**
- `GA4-CONSOLE-SETUP.md`: 초상세 UI 설정 가이드
- `EVENT-REFERENCE.md`: 전체 이벤트 목록 및 파라미터
- `FUNNEL-SETUP-GUIDE.md`: 퍼널 생성 단계별 가이드
- `AB-TESTING-GUIDE.md`: A/B 테스트 설정 방법

**공식 문서:**
- [GA4 공식 문서](https://support.google.com/analytics)
- [커스텀 디멘션 가이드](https://support.google.com/analytics/answer/10075209)
- [탐색 분석 가이드](https://support.google.com/analytics/answer/9327974)

---

## ✅ 빠른 체크리스트

### 코드 (완료)
- [x] 모든 추적 코드 구현
- [x] 환경변수 설정
- [x] 섹션 명시화

### GA4 Console (해야 할 일)
- [ ] 커스텀 차원 7개 생성
- [ ] 커스텀 측정항목 5개 생성
- [ ] 전환 이벤트 3개 마킹
- [ ] 퍼널 2개 생성
- [ ] DebugView로 검증

### 활용 (지속적)
- [ ] 주간 리포트 확인
- [ ] 전환율 모니터링
- [ ] CTA 효과 분석
- [ ] 폼 이탈 개선