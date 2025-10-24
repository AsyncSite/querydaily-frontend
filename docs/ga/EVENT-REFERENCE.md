# 📖 GA 이벤트 레퍼런스

> 구현된 모든 GA 이벤트의 완전한 레퍼런스 문서입니다.

## 🎯 6개 핵심 이벤트

---

### 1. scroll_depth (스크롤 깊이)

**카테고리:** Engagement (참여)

**발생 시점:** 사용자가 페이지의 25%, 50%, 75%, 100% 지점을 통과할 때

**파라미터:**
```typescript
{
  percentage: 25 | 50 | 75 | 100,        // 스크롤 깊이 (%)
  time_to_scroll: number,                // 스크롤까지 걸린 시간 (초)
  page_title: string,                    // 페이지 제목
  page_path: string,                     // 페이지 경로
  device_type: 'mobile' | 'tablet' | 'desktop',
  environment: 'development' | 'production'
}
```

**예시:**
```javascript
// 사용자가 페이지 50% 지점을 통과했을 때
{
  percentage: 50,
  time_to_scroll: 23,
  page_path: '/',
  page_title: 'QueryDaily - 매일 성장하는...'
}
```

**분석 활용:**
- 콘텐츠 참여도 측정
- 어느 지점에서 이탈하는지 파악
- 페이지별 스크롤 비율 비교

---

### 2. click_cta (CTA 클릭)

**카테고리:** Interaction (상호작용)

**발생 시점:** 주요 CTA 버튼 클릭 시

**파라미터:**
```typescript
{
  cta_text: string,                      // 버튼 텍스트
  cta_location: string,                  // 버튼 위치 (hero, product, floating 등)
  cta_variant?: string,                  // A/B 테스트 변형
  scroll_depth_at_click: number,         // 클릭 시점의 스크롤 위치 (%)
  cta_index?: number,                    // 동일 페이지 내 CTA 순서
  product_id?: string,                   // 상품 ID (상품 CTA인 경우)
  device_type: string,
  page_path: string
}
```

**예시:**
```javascript
// 그로스 플랜 "지금 시작하기" 버튼 클릭
{
  cta_text: '지금 시작하기 - 그로스 플랜',
  cta_location: 'product',
  scroll_depth_at_click: 32,
  product_id: 'growth-plan'
}
```

**분석 활용:**
- CTA별 클릭률 비교
- 스크롤 위치와 클릭의 상관관계
- 상품별 관심도

---

### 3. form_field_interaction (폼 필드 상호작용)

**카테고리:** Form (폼)

**발생 시점:** 폼 필드 포커스, 블러, 완료, 에러 시

**파라미터:**
```typescript
{
  form_name: string,                     // 폼 이름 (beta_signup, purchase)
  field_name: string,                    // 필드 이름 (email, name 등)
  interaction_type: 'focus' | 'blur' | 'complete' | 'error',
  step_number?: number,                  // 멀티스텝 폼의 현재 단계
  time_on_field?: number,                // 필드에 머문 시간 (초)
  is_completed?: boolean,                // 완료 여부
  error_message?: string,                // 에러 메시지
  focus_count?: number                   // 포커스 횟수
}
```

**예시:**
```javascript
// 이메일 필드 포커스
{
  form_name: 'beta_signup',
  field_name: 'email',
  interaction_type: 'focus',
  step_number: 1
}

// 이메일 입력 완료
{
  form_name: 'beta_signup',
  field_name: 'email',
  interaction_type: 'complete',
  step_number: 1
}
```

**분석 활용:**
- 어떤 필드에서 이탈이 많은지
- 필드별 소요 시간
- 폼 완료율

---

### 4. view_item (상품 조회)

**카테고리:** Content (콘텐츠)

**발생 시점:** 상품 카드가 화면에 50% 이상 노출되고 1초 이상 유지될 때

**파라미터:**
```typescript
{
  item_id: string,                       // 상품 ID
  item_name: string,                     // 상품명
  item_category: string,                 // 카테고리 (subscription)
  price: number,                         // 가격 (숫자 타입!)
  currency: string,                      // 통화 (KRW)
  view_duration: number,                 // 노출 시간 (초)
  view_percentage: number,               // 화면 노출 비율 (%)
  index?: number                         // 목록 내 순서
}
```

**예시:**
```javascript
// 그로스 플랜 카드 노출
{
  item_id: 'growth-plan',
  item_name: '그로스 플랜',
  item_category: 'subscription',
  price: 49000,  // ⚠️ 숫자 타입 필수
  currency: 'KRW',
  view_duration: 1,
  view_percentage: 85,
  index: 0
}
```

**분석 활용:**
- 상품별 관심도
- 노출 대비 클릭률 (CTR)
- 가격대별 선호도

---

### 5. view_section (섹션 조회)

**카테고리:** Content (콘텐츠)

**발생 시점:** 페이지 섹션이 화면에 30% 이상 노출될 때 (자동)

**파라미터:**
```typescript
{
  section_name: string,                  // 섹션 이름 (hero, products, faq 등)
  section_order: number,                 // 섹션 순서
  view_percentage: number,               // 섹션 노출 비율 (%)
  page_path: string
}
```

**추가 이벤트: section_engagement**
```typescript
{
  section_name: string,
  time_in_section: number,               // 섹션 체류 시간 (초)
  max_scroll_percentage: number          // 섹션 내 최대 스크롤 (%)
}
```

**예시:**
```javascript
// Products 섹션 진입
{
  section_name: 'products',
  section_order: 3,
  view_percentage: 50,
  page_path: '/'
}

// Products 섹션 이탈
{
  section_name: 'products',
  time_in_section: 15,
  max_scroll_percentage: 75
}
```

**분석 활용:**
- 섹션별 참여도
- 어떤 섹션을 오래 보는지
- 섹션별 전환 기여도

---

### 6. error (에러)

**카테고리:** Error (에러)

**발생 시점:** 시스템 에러, API 실패, 폼 검증 실패 등

**파라미터:**
```typescript
{
  error_type: 'api' | 'validation' | 'upload' | 'payment' | 'javascript' | 'network',
  error_message: string,                 // 에러 메시지
  error_code?: string | number,          // 에러 코드
  error_location?: string,               // 에러 발생 위치
  error_stack?: string,                  // 스택 트레이스 (개발 환경)
  user_action?: string,                  // 사용자가 시도한 액션
  api_endpoint?: string,                 // API 엔드포인트 (API 에러)
  http_status?: number,                  // HTTP 상태 코드
  page_path: string
}
```

**예시:**
```javascript
// API 에러
{
  error_type: 'api',
  error_message: 'Failed to submit application',
  http_status: 500,
  api_endpoint: '/api/beta-applications',
  user_action: 'submit_beta_form'
}

// 파일 업로드 에러
{
  error_type: 'upload',
  error_message: 'File size exceeds 10MB',
  error_location: 'file_upload',
  user_action: 'upload_resume'
}
```

**분석 활용:**
- 에러 발생 빈도
- 가장 많은 에러 타입
- 에러가 전환율에 미치는 영향

---

## 🔄 기존 이벤트 (호환성 유지)

### sign_up (베타 가입)
```typescript
{
  method?: string,
  user_type?: string
}
```

### begin_application (신청 시작)
```typescript
{
  // 기본 파라미터만
}
```

### file_upload (파일 업로드)
```typescript
{
  file_size: number,  // KB 단위
  file_type: string,
  success: boolean
}
```

### click (외부 링크)
```typescript
{
  link_url: string,
  link_domain: string,
  outbound: boolean
}
```

---

## 📊 이벤트 우선순위

### High Priority (즉시 전송)
- purchase
- sign_up
- begin_checkout
- error

### Normal Priority (배치 전송)
- scroll_depth
- click_cta
- form_field_interaction
- view_item
- view_section

---

## 🔍 이벤트 네이밍 규칙

### 형식
```
[동사]_[대상]

예시:
- click_cta (클릭 + CTA)
- view_item (조회 + 상품)
- scroll_depth (스크롤 + 깊이)
```

### 카테고리
```
- engagement: 사용자 참여 (scroll, click, view)
- form: 폼 관련 (form_start, form_error)
- ecommerce: 전자상거래 (purchase, begin_checkout)
- error: 오류 (error)
```

---

## 💡 활용 팁

### 1. 이벤트 조합으로 인사이트 도출

```
scroll_depth (75%) + view_item + click_cta 없음
→ 상품을 봤지만 클릭하지 않음
→ CTA 버튼 개선 필요
```

### 2. 시간 메트릭 활용

```
time_to_scroll: 5초 (빠름)
→ 콘텐츠를 제대로 읽지 않음
→ Hero 섹션 개선 필요
```

### 3. 에러 패턴 분석

```
error_type: 'validation'
field_name: 'email'
→ 이메일 검증 로직 개선 필요
```

---

## 📋 전체 이벤트 목록

| 이벤트 이름 | 카테고리 | 우선순위 | 상태 |
|------------|----------|----------|------|
| scroll_depth | engagement | Normal | ✅ 구현 |
| click_cta | interaction | Normal | ✅ 구현 |
| form_field_interaction | form | Normal | ✅ 구현 |
| view_item | content | Normal | ✅ 구현 |
| view_section | content | Normal | ✅ 구현 |
| error | error | High | ✅ 구현 |
| sign_up | conversion | High | ✅ 기존 |
| begin_application | conversion | High | ✅ 기존 |
| purchase | ecommerce | High | 🔄 예정 |
| begin_checkout | ecommerce | High | 🔄 예정 |

---

_모든 이벤트는 TypeScript로 타입 안전성이 보장됩니다._