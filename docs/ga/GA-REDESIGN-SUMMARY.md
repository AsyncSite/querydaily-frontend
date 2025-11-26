# GA4 리디자인 요약 (2025.11)

> 이 문서는 2025년 11월 GA4 완전 재설계의 변경사항을 정리한 통합 문서입니다.
> 기존 `/docs/ga/` 문서들은 레퍼런스로 유지되며, 새 구현과 다른 부분은 이 문서를 참조하세요.

---

## 1. 개요

### 리디자인 목적
- 서비스 개선점 파악을 위한 데이터 확보
- 랜딩 페이지 vs 상품 상세 페이지 전환율 비교 분석
- CTA 위치별 효과 측정
- SSR-safe한 Next.js 호환 구현

### 주요 변경 사항
- 전체 코드 구조 재설계 (기존 코드 삭제 후 새로 구현)
- `purchase_source` 파라미터로 구매 출처 추적
- `page_type` 파라미터로 페이지 유형 구분
- Enhanced Ecommerce 이벤트 완전 지원

---

## 2. 파일 구조 변경

### 삭제된 파일
```
lib/analytics/ga-utils.ts
lib/analytics/event-types.ts
lib/analytics/debug-panel.tsx
components/analytics/ErrorBoundary.tsx
components/analytics/GlobalErrorTracker.tsx
components/analytics/ItemTracker.tsx
components/analytics/ScrollTracker.tsx
components/GoogleAnalytics.tsx
hooks/useGATracking.ts
```

### 새로 생성된 파일

**Core Library (`/lib/analytics/`)**
```
├── index.ts          # 메인 export
├── config.ts         # GA 설정 (NEXT_PUBLIC_GA_MEASUREMENT_ID)
├── types.ts          # 타입 정의 (PageType, CTALocation, ProductId 등)
├── tracker.ts        # GATracker 싱글톤
├── events.ts         # 이벤트 함수 (trackPageView, trackCTAClick 등)
├── ssr-safe.ts       # SSR 안전 유틸리티
├── ecommerce.ts      # Enhanced Ecommerce (view_item, purchase 등)
├── errors.ts         # 에러 추적
└── performance.ts    # 디바운스, 쓰로틀, 배치 처리
```

**Components (`/components/analytics/`)**
```
├── index.ts
├── AnalyticsProvider.tsx  # Context Provider + GA 스크립트 로더
├── SectionTracker.tsx     # 섹션 가시성 추적
├── CTATracker.tsx         # CTA 클릭 추적
├── FormTracker.tsx        # 폼 상호작용 추적
└── EngagementTracker.tsx  # 스크롤 + 체류시간 추적
```

**Hooks (`/hooks/`)**
```
├── index.ts
├── useLandingAnalytics.ts      # 랜딩 페이지 전용
└── useProductDetailAnalytics.ts # 상품 상세 전용
```

---

## 3. 이벤트 변경 사항

### 새로운 핵심 파라미터

| 파라미터 | 설명 | 값 예시 |
|---------|------|--------|
| `page_type` | 페이지 유형 | `'landing'`, `'product_detail'`, `'order_complete'` |
| `purchase_source` | 구매 발생 페이지 | `'landing'`, `'product_detail'` |
| `trigger_location` | CTA 트리거 위치 | `'fixed'`, `'hero'`, `'footer'` |
| `cta_location` | CTA 식별자 | `'landing_hero_primary'`, `'product_detail_fixed_cta'` |

### 이벤트 네이밍 변경

| 이전 | 새로운 |
|------|--------|
| `click_cta` | `cta_click` |
| `form_field_interaction` | `form_field` |
| - | `modal_close` (신규) |

### 주요 이벤트 목록

| 이벤트 | 트리거 | 주요 파라미터 |
|--------|--------|--------------|
| `page_view` | 페이지 로드 | `page_type` |
| `scroll_depth` | 25/50/75/100% 도달 | `percentage`, `page_type` |
| `cta_click` | CTA 클릭 | `cta_location`, `page_type`, `productId` |
| `view_item` | 상품 조회 | `item_id`, `item_name`, `price` |
| `begin_checkout` | 결제 모달 열기 | `value`, `trigger_location` |
| `modal_close` | 모달 닫기 | `step_at_close` |
| `purchase` | 결제 완료 | `transaction_id`, `value`, `purchase_source` |

---

## 4. 페이지별 적용 현황

### 랜딩 페이지 (`app/page.tsx`)

**자동 추적**
- `page_view` (페이지 로드 시)
- `scroll_depth` (25%, 50%, 75%, 100%)
- 체류 시간 (dwell time)

**CTA 추적 위치**
- `landing_hero_primary` - 히어로 섹션 주요 CTA
- `landing_fixed_header` - 고정 헤더 CTA
- `landing_product_critical_hit` - 크리티컬 히트 상품 CTA
- `landing_product_growth_plan` - 그로스 플랜 상품 CTA
- `landing_bridge_cta` - 브릿지 섹션 CTA
- `landing_final_cta` - 최종 CTA

**구매 흐름**
- `begin_checkout` - 결제 모달 열릴 때
- `modal_close` - 결제 모달 닫힐 때
- `purchase_source: 'landing'` - orderData에 저장

---

### 상품 상세 페이지 (`app/products/[id]/page.tsx`)

**자동 추적**
- `page_view` (페이지 로드 시, `page_type: 'product_detail'`)
- `view_item` (상품 정보와 함께)
- `scroll_depth` (25%, 50%, 75%, 100%)
- 체류 시간 (dwell time)

**CTA 추적 위치**
- `product_detail_fixed_cta` - 상단 고정 CTA
- `product_detail_hero_cta` - 상품 히어로 CTA
- `product_detail_footer_cta` - 하단 CTA

**구매 흐름**
- `begin_checkout` - `trigger_location` 포함 (fixed/hero/footer)
- `modal_close` - 결제 모달 닫힐 때
- `purchase_source: 'product_detail'` - orderData에 저장

---

### 결제 완료 페이지 (`app/order-complete/page.tsx`)

**purchase 이벤트**
- 결제 상태가 `CONFIRMED`일 때 발송
- `purchase_source` 파라미터로 구매 출처 구분
- 중복 발송 방지 (hasTrackedPurchase ref 사용)

```typescript
trackPurchase({
  transactionId: orderData.orderId,
  productId,
  productName,
  price,
  paymentMethod,
  purchaseSource,  // 'landing' | 'product_detail'
});
```

---

## 5. 환경 설정

### 환경 변수

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 호환성
- 이전 변수명 `NEXT_PUBLIC_GA_ID`도 지원
- 환경 변수 미설정 시 이벤트 전송만 비활성화 (에러 없음)

---

## 6. 사용법

### 기본 사용

```typescript
import { trackCTAClick, trackPageView } from '@/lib/analytics';

// 페이지 뷰 추적
trackPageView({ pageType: 'landing' });

// CTA 클릭 추적
trackCTAClick({
  ctaLocation: 'landing_hero_primary',
  pageType: 'landing',
  productId: 'growth-plan',
  price: 49000,
});
```

### 페이지 전용 훅 사용

```typescript
import { useLandingAnalytics } from '@/hooks';

function LandingPage() {
  const { trackHeroPrimaryCTA, trackProductCTA } = useLandingAnalytics();

  return (
    <>
      <button onClick={trackHeroPrimaryCTA}>시작하기</button>
      <button onClick={() => trackProductCTA('growth-plan', 49000)}>
        그로스 플랜
      </button>
    </>
  );
}
```

### EngagementTracker 컴포넌트

```tsx
import { EngagementTracker } from '@/components/analytics';

function ProductPage() {
  return (
    <>
      <EngagementTracker
        pageType="product_detail"
        productId="growth-plan"
      />
      {/* 페이지 콘텐츠 */}
    </>
  );
}
```

---

## 7. GA4 Console 설정 (필수)

### Custom Dimensions 등록

GA4 Console > 관리 > 맞춤 정의 > 맞춤 측정기준 생성

| 차원명 | 이벤트 매개변수 | 범위 |
|--------|---------------|------|
| Page Type | `page_type` | 이벤트 |
| Purchase Source | `purchase_source` | 이벤트 |
| CTA Location | `cta_location` | 이벤트 |
| Trigger Location | `trigger_location` | 이벤트 |
| Product ID | `product_id` | 이벤트 |

### 전환 이벤트 설정

GA4 Console > 관리 > 이벤트 > 전환으로 표시

- `purchase` (필수)
- `begin_checkout` (권장)

---

## 8. 분석 인사이트

### 랜딩 vs 상세페이지 전환율 비교

**Exploration 설정**
- 유형: Free-Form
- 차원: `purchase_source`
- 측정항목: `begin_checkout` count, `purchase` count
- 계산: 전환율 = purchase / begin_checkout

**예상 인사이트**
- 상세페이지 경유 구매자의 전환율이 더 높은지?
- 어느 경로가 매출에 더 기여하는지?

### CTA 위치별 효과 분석

**Exploration 설정**
- 차원: `cta_location`, `page_type`
- 측정항목: `cta_click` count
- 정렬: 클릭 수 내림차순

**예상 인사이트**
- Fixed CTA vs Hero CTA vs Footer CTA 중 어느 것이 효과적인지?
- 페이지별로 효과적인 CTA 위치가 다른지?

### 상품별 상세페이지 효과

**Exploration 설정**
- 차원: `product_id`
- 측정항목: `view_item` count, `begin_checkout` count, `purchase` count
- 비교: Growth Plan vs Critical Hit

---

## 9. 테스트 방법

### 개발 환경 테스트

1. **콘솔 로그 확인**
   - `debug={true}` 설정 시 모든 이벤트가 콘솔에 로그됨
   - AnalyticsProvider에서 `process.env.NODE_ENV === 'development'`로 자동 활성화

2. **Network 탭 확인**
   - Chrome DevTools > Network > "collect" 필터
   - `google-analytics.com/g/collect` 요청 확인

3. **GA4 DebugView**
   - GA4 Console > 관리 > DebugView
   - 실시간 이벤트 스트림 확인

### 검증 체크리스트

- [ ] 페이지 로드 시 `page_view` 이벤트 발송
- [ ] 스크롤 시 `scroll_depth` 이벤트 발송 (25%, 50%, 75%, 100%)
- [ ] CTA 클릭 시 `cta_click` 이벤트 발송
- [ ] 상품 상세 페이지에서 `view_item` 이벤트 발송
- [ ] 결제 모달 열릴 때 `begin_checkout` 이벤트 발송
- [ ] 결제 완료 시 `purchase` 이벤트 발송
- [ ] `purchase_source` 파라미터가 올바르게 설정됨

---

## 10. 기존 문서와의 관계

| 기존 문서 | 상태 | 비고 |
|----------|------|------|
| EVENT-REFERENCE.md | 구버전 | 이벤트명이 다름 (`click_cta` → `cta_click`) |
| IMPLEMENTATION-REFERENCE.md | 구버전 | 파일 구조가 다름 |
| GA4-CONSOLE-SETUP.md | 일부 유효 | Custom Dimensions 섹션은 이 문서 참조 |
| TESTING-GUIDE.md | 일부 유효 | 테스트 방법론은 유효 |
| README.md | 일부 유효 | 개요 및 워크플로우는 유효 |

**권장**: 새 구현과 관련된 내용은 이 문서를 우선 참조하세요.

---

_최종 업데이트: 2025-11-26_
