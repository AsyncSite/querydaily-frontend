# 🧪 A/B 테스트 시작 가이드

> A/B 테스트를 시작하고 싶을 때 이 가이드를 따라 진행하세요.
> 현재는 기초 인프라만 구축되어 있으며, 필요 시 언제든 활성화할 수 있습니다.

## 🎯 A/B 테스트란?

두 개 이상의 변형을 만들어 **어떤 것이 더 효과적인지** 데이터로 증명하는 방법입니다.

**예시:**
- A안: "매일 아침, 당신만을 위한 맞춤형 면접 질문"
- B안: "3일만 체험하세요. 면접 자신감이 달라집니다"

→ 어떤 문구가 전환율이 더 높은지 측정

---

## ✅ 현재 구축된 인프라

### 파일 위치
```
/lib/experiments/experiment-base.ts
```

### 기능
- ✅ ExperimentManager 클래스
- ✅ 변형 자동 할당 알고리즘
- ✅ localStorage 영속성
- ✅ GA4 연동 준비
- ✅ 전환 추적 함수

---

## 🚀 A/B 테스트 시작 방법

### Step 1: 실험 정의

`lib/experiments/experiment-base.ts` 파일 열기

#### 기존 실험 활성화
```typescript
this.addExperiment({
  id: 'hero_headline_test',
  name: 'Hero 헤드라인 테스트',
  description: 'Hero 섹션의 헤드라인 문구 A/B 테스트',
  variants: ['control', 'variant_a', 'variant_b'],
  weights: [0.34, 0.33, 0.33],
  isActive: true  // ← false를 true로 변경!
});
```

#### 새로운 실험 추가
```typescript
this.addExperiment({
  id: 'my_new_test',
  name: '내 실험 이름',
  description: '실험 설명',
  variants: ['control', 'variant_a'],
  weights: [0.5, 0.5],
  isActive: true
});
```

### Step 2: 컴포넌트에서 사용

```typescript
import { useExperiment } from '@/lib/experiments/experiment-base';

export default function HeroSection() {
  const variant = useExperiment('hero_headline_test');

  const headlines = {
    'control': '매일 아침, 당신만을 위한 맞춤형 면접 질문을 배달합니다',
    'variant_a': '3일만 체험하세요. 면접 자신감이 달라집니다',
    'variant_b': '매일 아침, 실전같은 면접 질문으로 완벽하게 준비하세요'
  };

  return (
    <h1>{headlines[variant] || headlines.control}</h1>
  );
}
```

### Step 3: 전환 추적

전환이 발생하는 곳에서:
```typescript
import { trackExperimentConversion } from '@/lib/experiments/experiment-base';

const handleSignup = async () => {
  // 가입 로직...

  // 실험 전환 추적
  trackExperimentConversion('hero_headline_test');
};
```

### Step 4: GA4 Console 설정

#### 커스텀 디멘션 추가
```
측정기준 이름: experiment_variant
범위: 사용자
설명: A/B 테스트 변형
사용자 속성: exp_hero_headline_test
```

#### 분석 방법
```
탐색 > 자유형식
세로 측정기준: experiment_variant
측정항목: sign_up (전환 이벤트)
```

---

## 📋 실험 설계 체크리스트

### 실험 시작 전

- [ ] **명확한 가설 수립**
  - 예: "CTA 버튼을 크게 만들면 클릭률이 증가할 것이다"

- [ ] **측정 지표 정의**
  - 주요 지표: 전환율
  - 보조 지표: 클릭률, 이탈률

- [ ] **최소 샘플 크기 계산**
  - 사용 도구: https://www.optimizely.com/sample-size-calculator/
  - 기준선 전환율, 최소 감지 효과, 신뢰수준 입력

- [ ] **실험 기간 설정**
  - 최소 1-2주 (요일 효과 제거)
  - 충분한 샘플 확보까지

### 실험 진행 중

- [ ] **한 번에 하나만 변경**
  - Hero 헤드라인만 OR CTA 버튼만
  - 동시에 여러 요소 변경 금지

- [ ] **트래픽 균등 분배 확인**
  - GA4에서 각 변형의 사용자 수 확인
  - 편차 10% 이내 유지

- [ ] **조기 종료 금지**
  - 중간에 좋아 보여도 계획한 기간까지 진행
  - 통계적 오류 방지

### 실험 종료 후

- [ ] **통계적 유의성 검증**
  - p-value < 0.05 확인
  - 신뢰구간 확인

- [ ] **세그먼트별 분석**
  - 모바일/데스크톱 따로 분석
  - 신규/재방문 사용자 비교

- [ ] **승자 적용**
  - 유의미한 개선이 있으면 전체 적용
  - 개선 효과 모니터링

---

## 💡 A/B 테스트 예시

### 예시 1: Hero 헤드라인 테스트

#### 가설
"구체적인 기간(3일)을 제시하면 전환율이 증가할 것"

#### 변형
- **Control**: "매일 아침, 당신만을 위한 맞춤형 면접 질문을 배달합니다"
- **Variant A**: "3일만 체험하세요. 면접 자신감이 달라집니다"

#### 측정 지표
- 주요: 베타 신청 전환율
- 보조: Hero CTA 클릭률, 스크롤 깊이

#### 샘플 크기
- 각 그룹 최소 1,000명
- 실험 기간: 2주

#### 코드
```typescript
// app/page.tsx
const heroVariant = useExperiment('hero_headline_test');

const heroTitle = heroVariant === 'variant_a'
  ? "3일만 체험하세요. 면접 자신감이 달라집니다"
  : "매일 아침, 당신만을 위한 맞춤형 면접 질문을 배달합니다";

return <h1>{heroTitle}</h1>;
```

### 예시 2: CTA 버튼 크기 테스트

#### 가설
"버튼을 크게 만들면 모바일에서 클릭률이 증가할 것"

#### 변형
- **Control**: 기본 크기 (48px 높이)
- **Variant A**: 큰 크기 (64px 높이)

#### 측정 지표
- 주요: CTA 클릭률
- 보조: 베타 신청 전환율

#### 코드
```typescript
const ctaVariant = useExperiment('cta_size_test');

const buttonClass = ctaVariant === 'variant_a'
  ? 'btn-large'  // 64px
  : 'btn';       // 48px

return <button className={buttonClass}>시작하기</button>;
```

---

## 🔍 결과 분석 방법

### GA4 Console에서 분석

#### 1. 탐색 > 자유형식

**세로 측정기준:**
- experiment_variant (또는 exp_hero_headline_test)

**측정항목:**
- sign_up (전환)
- click_cta (클릭)

**필터:**
- experiment_id = 'hero_headline_test'

#### 2. 전환율 계산

```
Control 그룹:
  - 방문자: 1,000명
  - 전환: 120명
  - 전환율: 12.0%

Variant A 그룹:
  - 방문자: 1,000명
  - 전환: 145명
  - 전환율: 14.5%

개선율: +2.5%p (상대적으로 +20.8%)
```

#### 3. 통계적 유의성 검증

사용 도구: https://www.graphpad.com/quickcalcs/

입력:
- Control: 120 / 1,000
- Variant A: 145 / 1,000

결과:
- p-value < 0.05 → 유의미한 차이
- p-value >= 0.05 → 차이 없음

---

## 🎨 간단한 A/B 테스트 (if문 방식)

복잡한 시스템 없이 **간단한 if문**으로 시작할 수도 있습니다.

### 방법 1: localStorage 기반

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // 로컬스토리지에서 확인
    let userVariant = localStorage.getItem('hero_variant') as 'A' | 'B';

    if (!userVariant) {
      // 50:50 랜덤 할당
      userVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('hero_variant', userVariant);
    }

    setVariant(userVariant);

    // GA에 전송
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        hero_variant: userVariant
      });
    }
  }, []);

  const titleA = "매일 아침, 당신만을 위한 맞춤형 면접 질문을 배달합니다";
  const titleB = "3일만 체험하세요. 면접 자신감이 달라집니다";

  return <h1>{variant === 'A' ? titleA : titleB}</h1>;
}
```

### 방법 2: URL 파라미터 기반

```typescript
// URL: /?variant=B

const searchParams = useSearchParams();
const variant = searchParams.get('variant') || 'A';

const title = variant === 'B' ? titleB : titleA;
```

---

## ⚠️ 주의사항

### 하지 말아야 할 것들

1. **조기 종료**
   - "3일째인데 B가 좋아 보여!" → ❌
   - 계획한 기간(2주)까지 진행 → ✅

2. **동시에 여러 변경**
   - 헤드라인 + CTA 버튼 동시 변경 → ❌
   - 하나씩 순차적으로 → ✅

3. **샘플 크기 무시**
   - 100명씩만 테스트 → ❌
   - 최소 샘플 크기 확보 → ✅

4. **외부 요인 무시**
   - 블랙프라이데이 세일 중 테스트 → ❌
   - 정상 기간에 테스트 → ✅

---

## 📊 통계 기초 지식

### p-value란?

**간단히:** 우연히 이런 차이가 나올 확률

- p < 0.05 → 5% 미만의 확률 → **유의미한 차이**
- p >= 0.05 → 5% 이상의 확률 → **우연일 수 있음**

### 신뢰구간이란?

**간단히:** "실제 값이 이 범위 안에 있을 확률이 95%"

- Control: 12.0% (10.5% ~ 13.5%)
- Variant A: 14.5% (13.0% ~ 16.0%)
- 겹치지 않음 → 유의미한 차이

---

## 🎯 추천 첫 A/B 테스트

### 테스트 1: CTA 버튼 문구 (가장 쉬움)

**변경 사항:**
- Control: "상품 선택하기"
- Variant A: "내 맞춤 플랜 보기"

**이유:** 버튼 하나만 바꾸면 되므로 간단

**예상 기간:** 1-2주 (각 1,000명)

### 테스트 2: 가격 표시 방식

**변경 사항:**
- Control: "₩49,000"
- Variant A: "하루 ₩1,600 (월 ₩49,000)"

**이유:** 심리적 가격 장벽 테스트

### 테스트 3: Hero 헤드라인

**변경 사항:**
- Control: 현재 헤드라인
- Variant A: 기간 강조 ("3일만 체험")
- Variant B: 결과 강조 ("면접 자신감이 달라집니다")

**이유:** 핵심 메시지 최적화

---

## 📝 실험 실행 템플릿

```markdown
## 실험명: [실험 이름]

### 가설
[무엇을 바꾸면 어떤 결과가 나올 것이다]

### 변형
- Control: [기존안]
- Variant A: [변형 1]
- Variant B: [변형 2] (선택)

### 측정 지표
- 주요 지표: [전환율, 클릭률 등]
- 보조 지표: [기타 지표]

### 실험 설정
- 트래픽 분배: 50:50 (또는 34:33:33)
- 최소 샘플: 각 [N]명
- 예상 기간: [N]주
- 시작일: YYYY-MM-DD
- 종료일: YYYY-MM-DD

### 성공 기준
- p-value < 0.05
- 최소 개선율: +5%
- 모바일/데스크톱 모두에서 개선

### 결과 (실험 종료 후 작성)
- Control 전환율: [N]%
- Variant A 전환율: [N]%
- p-value: [N]
- 결론: [채택/기각]
```

---

## 🔧 7개 랜딩 페이지 변형 활용

현재 `/landing/[variant]`에 7개 카피 변형이 있습니다:
- earn-money
- save-time
- avoid-pain
- social-status
- save-money
- comfort
- praise

### GA로 추적하는 방법

각 랜딩 페이지에 코드 추가:

```typescript
// app/landing/[variant]/page.tsx

useEffect(() => {
  const variant = window.location.pathname.split('/')[2];

  if (window.gtag) {
    window.gtag('set', 'user_properties', {
      landing_page_variant: variant
    });
  }
}, []);
```

### 분석 방법

GA4에서:
```
탐색 > 자유형식
세로 측정기준: landing_page_variant
측정항목: sign_up, purchase
```

---

## 💡 베스트 프랙티스

### 1. 한 번에 하나씩
- ✅ CTA 버튼 문구만 테스트
- ❌ CTA + 헤드라인 + 가격 동시 변경

### 2. 충분한 샘플
- ✅ 각 그룹 최소 1,000명
- ❌ 각 그룹 100명 (너무 적음)

### 3. 전체 주기 테스트
- ✅ 월요일 시작 → 일요일 종료 (2주)
- ❌ 수요일 시작 → 다음 주 수요일 종료

### 4. 외부 요인 고려
- ✅ 평상시 테스트
- ❌ 마케팅 캠페인 중 테스트

---

## 📊 통계 도구

### 샘플 크기 계산
- https://www.optimizely.com/sample-size-calculator/
- https://www.evanmiller.org/ab-testing/sample-size.html

### 통계적 유의성 검증
- https://www.graphpad.com/quickcalcs/
- https://abtestguide.com/calc/

### 신뢰구간 계산
- https://www.calculator.net/confidence-interval-calculator.html

---

## 🚀 실험 시작 시

### 활성화 단계:

1. **`experiment-base.ts`에서 `isActive: true` 설정**
2. **컴포넌트에서 useExperiment 사용**
3. **전환 지점에 trackExperimentConversion 추가**
4. **GA4 Console에서 커스텀 디멘션 설정**
5. **데이터 수집 시작**
6. **2주 후 결과 분석**

### 현재 상태:
- ⚪ 실험 비활성화 (isActive: false)
- ✅ 인프라 준비 완료
- ✅ 언제든 활성화 가능

---

_A/B 테스트를 시작하고 싶을 때 이 가이드를 참고하세요!_