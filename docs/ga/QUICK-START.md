# 🚀 GA 구현 Quick Start

> 이 프로젝트의 GA 구현을 빠르게 이해하고 사용하기 위한 가이드입니다.

## ✅ 이미 구현된 것들

### 자동으로 추적되는 항목들

1. **페이지 방문** - 자동
2. **스크롤 깊이** (25%, 50%, 75%, 100%) - 자동
3. **상품 노출** (1초 이상 화면에 보일 때) - 자동
4. **섹션 진입** (각 섹션 30% 이상 노출 시) - 자동
5. **에러 발생** - 자동

### 수동으로 추적된 항목들

1. **CTA 클릭** - 주요 버튼들에 적용됨
2. **폼 필드 상호작용** - 이메일 필드에 적용됨

---

## 📁 파일 구조

```
/lib/analytics/
├── ga-utils.ts           # GA 유틸리티 (import하여 사용)
├── event-types.ts        # 이벤트 타입 정의
└── debug-panel.tsx       # 디버그 패널

/hooks/
└── useGATracking.ts      # React 훅

/components/analytics/
├── ScrollTracker.tsx     # 스크롤 추적 (이미 적용됨)
├── CTATracker.tsx        # CTA 추적
├── FormTracker.tsx       # 폼 추적
├── ItemTracker.tsx       # 상품 추적 (이미 적용됨)
├── SectionTracker.tsx    # 섹션 추적 (이미 적용됨)
└── ErrorBoundary.tsx     # 에러 추적 (이미 적용됨)
```

---

## 🎯 새로운 CTA 버튼 추가하기

### 방법 1: 간단한 방법

```typescript
import { useManualCTATracking } from '@/components/analytics/CTATracker';

export default function MyComponent() {
  const { trackCTA } = useManualCTATracking();

  return (
    <button onClick={() => {
      trackCTA('내 버튼 텍스트', 'button_location');
      // 원래 로직...
    }}>
      클릭하세요
    </button>
  );
}
```

### 방법 2: 컴포넌트 사용

```typescript
import { TrackedCTAButton } from '@/components/analytics/CTATracker';

export default function MyComponent() {
  return (
    <TrackedCTAButton
      location="hero"
      onClick={() => console.log('Clicked!')}
      className="my-button"
    >
      클릭하세요
    </TrackedCTAButton>
  );
}
```

---

## 📝 새로운 폼 필드 추적하기

### 방법 1: 직접 추가

```typescript
<input
  type="text"
  onFocus={() => {
    if (window.gtag) {
      window.gtag('event', 'form_field_interaction', {
        form_name: 'my_form',
        field_name: 'username',
        interaction_type: 'focus'
      });
    }
  }}
  onBlur={(e) => {
    if (window.gtag && e.target.value) {
      window.gtag('event', 'form_field_interaction', {
        form_name: 'my_form',
        field_name: 'username',
        interaction_type: 'complete'
      });
    }
  }}
/>
```

### 방법 2: 훅 사용

```typescript
import { useFormMetrics } from '@/components/analytics/FormTracker';

const myForm = useFormMetrics('my_form');

// 필드 이벤트 추적
myForm.startFieldTimer('username');
myForm.markFieldComplete('username');
```

---

## 🛍️ 새로운 상품 추가하기

```typescript
import ItemTracker from '@/components/analytics/ItemTracker';

<ItemTracker
  itemId="new-product"
  itemName="신규 상품"
  price={29000}
  index={5}
>
  <div className="product-card">
    상품 내용...
  </div>
</ItemTracker>
```

---

## 🐛 에러 추적하기

### 자동 추적 (이미 설정됨)
- JavaScript 런타임 에러
- Promise Rejection
- 전역 에러

### 수동 추적

```typescript
import { trackError } from '@/lib/analytics/ga-utils';

try {
  // 위험한 작업...
} catch (error) {
  trackError(
    'api',
    error.message,
    'my_component',
    {
      api_endpoint: '/api/my-endpoint',
      http_status: 500
    }
  );
}
```

---

## 📊 개발 환경에서 확인하기

### 콘솔 로그 확인

모든 이벤트가 콘솔에 로그로 출력됩니다:
```
✅ GA Tracking Hook: Ready
📊 ScrollTracker: Initialized
🔍 GA Event: scroll_depth {...}
🎯 GA Event: click_cta {...}
👁️ Item Viewed: {...}
```

### 디버그 패널 (선택)

우측 하단에 디버그 패널이 표시됩니다 (개발 환경만)

### Network 탭 확인

F12 > Network > "collect" 필터
→ GA로 전송되는 실제 요청 확인

---

## 🎯 GA4 Console에서 확인하기

### DebugView (실시간)

```
GA4 Console > 관리 > DebugView
```

개발 환경에서 발생한 이벤트를 실시간으로 확인

### 실시간 보고서

```
GA4 Console > 보고서 > 실시간
```

프로덕션 환경의 실시간 이벤트 확인

### 이벤트 보고서

```
GA4 Console > 보고서 > 참여도 > 이벤트
```

모든 이벤트의 발생 횟수 확인

---

## 🚨 문제 해결

### 이벤트가 GA4에 안 보일 때

1. **24-48시간 대기**
   - 새 이벤트는 수집에 시간이 걸림
   - DebugView에서는 즉시 확인 가능

2. **환경변수 확인**
   ```bash
   # .env.development 또는 .env.production
   NEXT_PUBLIC_GA_ID=G-24SCZ7Z1E5
   ```

3. **콘솔에서 확인**
   ```javascript
   // 브라우저 콘솔에 입력
   window.gtag
   // function이면 정상, undefined면 문제
   ```

### 이벤트가 중복 발생할 때

- **개발 환경**: React Strict Mode로 인해 정상
- **프로덕션**: 실제 1회만 발생

### "Fetch failed" 에러

- **정상입니다!** GA의 응답 방식 때문
- 실제로는 데이터가 전송됨
- 무시해도 됩니다

---

## 📖 더 알아보기

### 문서 목록

- [00-IMPLEMENTATION-CHECKLIST.md](./00-IMPLEMENTATION-CHECKLIST.md) - 마스터 체크리스트
- [COMPREHENSIVE-TEST-GUIDE.md](./COMPREHENSIVE-TEST-GUIDE.md) - 종합 테스트 가이드
- [EVENT-REFERENCE.md](./EVENT-REFERENCE.md) - 이벤트 레퍼런스
- [FUNNEL-SETUP-GUIDE.md](./FUNNEL-SETUP-GUIDE.md) - 퍼널 설정
- [GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md) - GA4 Console 설정
- [AB-TESTING-GUIDE.md](./AB-TESTING-GUIDE.md) - A/B 테스트 가이드

---

## 🎉 요약

### 지금 할 수 있는 것:
- ✅ 모든 사용자 행동 자동 추적
- ✅ 개발 환경에서 실시간 확인
- ✅ 새로운 이벤트 쉽게 추가

### 추후 설정할 것:
- 📊 GA4 Console 퍼널 설정
- 🎯 커스텀 디멘션 생성
- 🧪 A/B 테스트 활성화 (필요 시)

---

_질문이 있으시면 각 문서를 참고하거나 문의해주세요!_