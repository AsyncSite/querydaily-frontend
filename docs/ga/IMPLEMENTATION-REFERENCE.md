# GA 구현 참고서

**목적**: 검증된 패턴으로 빠르게 구현하기
**대상**: 실제 코드 작성하는 개발자
**업데이트**: 2025-01-XX

---

## 목차

1. [검증된 추적 패턴](#1-검증된-추적-패턴)
2. [우선순위별 구현](#2-우선순위별-구현)
3. [실전 코드 스니펫](#3-실전-코드-스니펫)
4. [검증 방법](#4-검증-방법)
5. [트러블슈팅](#5-트러블슈팅)

---

## 1. 검증된 추적 패턴

실리콘밸리 주요 SaaS 기업들이 공통적으로 사용하는 패턴입니다.

### 1.1 중앙 집중식 관리 (Airbnb, Stripe 방식)

**문제**: 태그가 코드 전체에 흩어지면 관리 불가능

**해결**: 단일 파일에서 모든 이벤트 관리

```typescript
// lib/analytics.ts
import { trackEvent as gaTrackEvent } from '@/components/GoogleAnalytics';

export const Analytics = {
  // 핵심 전환
  signUp: (method: 'beta' | 'paid') => {
    gaTrackEvent('sign_up', 'conversion', 'beta_signup_complete');
  },

  purchase: (transaction: { id: string; product: string; amount: number }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transaction.id,
        currency: 'KRW',
        value: transaction.amount,
        items: [{
          item_id: transaction.product,
          item_name: transaction.product,
          price: transaction.amount,
          quantity: 1,
        }],
      });
    }
  },

  // 사용자 행동
  scrollDepth: (depth: 25 | 50 | 75 | 100) => {
    gaTrackEvent('scroll', 'engagement', `depth_${depth}%`, depth);
  },

  ctaClick: (position: 'hero' | 'sticky' | 'footer') => {
    gaTrackEvent('click_cta', 'engagement', position);
  },

  // 폼 추적
  formStart: (formName: string) => {
    gaTrackEvent('form_start', 'form', formName);
  },

  formField: (fieldName: string, step: number) => {
    gaTrackEvent('form_field_interaction', 'form', fieldName, step);
  },

  formError: (errorType: string) => {
    gaTrackEvent('form_error', 'error', errorType);
  },

  // 결제 퍼널
  beginCheckout: (product: { id: string; price: number }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'KRW',
        value: product.price,
        items: [{ item_id: product.id, price: product.price, quantity: 1 }],
      });
    }
  },

  paymentFailed: (errorMsg: string) => {
    gaTrackEvent('payment_failed', 'ecommerce', errorMsg);
  },
};

// 사용 예시
// import { Analytics } from '@/lib/analytics';
// Analytics.signUp('beta');
// Analytics.purchase({ id: 'imp_123', product: 'growth_plan', amount: 29900 });
```

**장점**:
- 모든 이벤트가 한 곳에 정의됨
- 타입 안전성 (TypeScript)
- 분석 도구 교체 시 이 파일만 수정
- 팀원 누구나 어떤 이벤트가 있는지 한눈에 파악

### 1.2 Throttle 적용 (Google, Facebook 방식)

**문제**: 스크롤 이벤트는 초당 수십 번 발생 → 성능 저하

**해결**: Throttle로 빈도 제한

```typescript
// hooks/useScrollTracking.ts
import { useEffect, useRef } from 'react';
import { Analytics } from '@/lib/analytics';

export const useScrollTracking = (thresholds = [25, 50, 75, 100]) => {
  const trackedRef = useRef(new Set<number>());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (window.scrollY / scrollHeight) * 100;

          thresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !trackedRef.current.has(threshold)) {
              Analytics.scrollDepth(threshold as any);
              trackedRef.current.add(threshold);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);
};

// 사용법
// useScrollTracking([25, 50, 75, 100]);
```

**성능 개선**:
- Before: 스크롤 시 초당 60회 함수 실행
- After: requestAnimationFrame으로 프레임당 1회만 실행 (16ms 간격)

### 1.3 Intersection Observer (Slack, Notion 방식)

**문제**: 요소가 화면에 보이는지 계속 확인하면 비효율적

**해결**: 브라우저 네이티브 API 활용

```typescript
// hooks/useVisibilityTracking.ts
import { useEffect, useRef } from 'react';
import { Analytics } from '@/lib/analytics';

export const useVisibilityTracking = (
  eventName: string,
  options = { threshold: 0.5, trackOnce: true }
) => {
  const ref = useRef<HTMLElement>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!trackedRef.current || !options.trackOnce)) {
            Analytics.ctaClick(eventName as any); // 실제로는 적절한 함수 호출
            trackedRef.current = true;
            if (options.trackOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: options.threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eventName, options.threshold, options.trackOnce]);

  return ref;
};

// 사용법
// const ctaRef = useVisibilityTracking('hero_cta_view');
// <button ref={ctaRef}>무료 시작</button>
```

**장점**:
- 메인 스레드 부하 없음
- 정확한 가시성 판단
- 모던 브라우저 표준

---

## 2. 우선순위별 구현

실제 비즈니스 임팩트 순서대로 구현합니다.

### Week 1: 매출 추적 (필수)

**구현 대상**: `purchase`, `begin_checkout`

**PortOne 결제 연동**:
```typescript
// app/page.tsx (또는 결제 페이지)
const handlePayment = async () => {
  const product = {
    id: selectedProduct || 'unknown',
    name: productName,
    price: totalAmount,
  };

  // 결제 시작 추적
  Analytics.beginCheckout({ id: product.id, price: product.price });

  window.IMP?.request_pay(
    {
      pg: 'kakaopay',
      pay_method: 'card',
      merchant_uid: `order_${Date.now()}`,
      name: product.name,
      amount: product.price,
      buyer_email: purchaseEmail,
      buyer_name: purchaseName,
      buyer_tel: purchasePhone,
    },
    (response) => {
      if (response.success) {
        // 구매 완료 추적 (가장 중요!)
        Analytics.purchase({
          id: response.imp_uid,
          product: product.id,
          amount: product.price,
        });
        router.push('/order-complete');
      } else {
        // 실패 추적
        Analytics.paymentFailed(response.error_msg || 'unknown');
        alert(`결제 실패: ${response.error_msg}`);
      }
    }
  );
};
```

**검증**:
```bash
# Chrome DevTools → Network → 'collect' 필터
# Payload에서 확인:
# - en=purchase
# - ep.value=29900 (숫자, 따옴표 없음)
# - ep.transaction_id=imp_xxx
```

### Week 2: 베타 신청 퍼널

**구현 대상**: 스크롤, CTA, 폼 추적

**메인 페이지 (app/page.tsx)**:
```typescript
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { Analytics } from '@/lib/analytics';

export default function HomePage() {
  // 스크롤 자동 추적
  useScrollTracking([25, 50, 75, 100]);

  // CTA 클릭
  const handleCTAClick = (position: 'hero' | 'sticky' | 'footer') => {
    Analytics.ctaClick(position);
    setShowModal(true);
  };

  // 폼 인터랙션
  const handleFormStart = () => {
    Analytics.formStart('beta_signup');
  };

  return (
    <>
      <button onClick={() => handleCTAClick('hero')}>
        무료로 시작하기
      </button>

      {showModal && (
        <Modal onOpen={handleFormStart}>
          <input
            type="email"
            onFocus={() => Analytics.formField('email', 1)}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            onFocus={() => Analytics.formField('experience', 2)}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option>경력 선택</option>
          </select>
          <button onClick={handleSubmit}>제출</button>
        </Modal>
      )}
    </>
  );
}
```

**폼 에러 추적**:
```typescript
const handleSubmit = async () => {
  // 유효성 검사
  if (!email) {
    Analytics.formError('email_missing');
    return;
  }
  if (!validateEmail(email)) {
    Analytics.formError('email_invalid');
    return;
  }

  // 제출
  try {
    await submitBetaApplication({ email, experience });
    Analytics.signUp('beta');
    router.push('/success');
  } catch (error) {
    Analytics.formError('submission_failed');
  }
};
```

### Week 3: A/B 테스트 기반

**간단한 버켓팅**:
```typescript
// lib/ab-test.ts
export const getVariant = (testName: string): 'A' | 'B' => {
  if (typeof window === 'undefined') return 'A';

  const userId = getUserId(); // 쿠키 또는 localStorage
  const hash = simpleHash(`${testName}_${userId}`);
  return (hash % 100) < 50 ? 'A' : 'B'; // 50:50 분배
};

const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getUserId = (): string => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random()}`;
    localStorage.setItem('user_id', userId);
  }
  return userId;
};
```

**사용 예시**:
```typescript
const variant = getVariant('hero_headline_test');

// 노출 추적
useEffect(() => {
  gaTrackEvent('ab_test_impression', 'experiment', `hero_${variant}`);
}, [variant]);

// Variant에 따른 렌더링
const headline = variant === 'A'
  ? '맞춤형 면접 질문을 배달합니다'
  : '날카로운 질문을 배달합니다';

// 전환 시 variant 포함
const handleCTAClick = () => {
  gaTrackEvent('click_cta', 'engagement', 'hero', { variant });
  setShowModal(true);
};
```

---

## 3. 실전 코드 스니펫

복사해서 바로 사용 가능한 코드들입니다.

### 3.1 에러 전역 핸들러

```typescript
// app/layout.tsx
useEffect(() => {
  const handleError = (event: ErrorEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        event_category: 'error',
        event_label: event.message,
        error_type: 'javascript_error',
        page_location: window.location.pathname,
      });
    }
  };

  window.addEventListener('error', handleError);
  return () => window.removeEventListener('error', handleError);
}, []);
```

### 3.2 세션 타이밍

```typescript
// 세션 시작 시간 기록
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.sessionStartTime = Date.now();
  }
}, []);

// 페이지 이탈 시 세션 길이 전송
useEffect(() => {
  const handleBeforeUnload = () => {
    const duration = Date.now() - (window.sessionStartTime || Date.now());
    if (navigator.sendBeacon && window.gtag) {
      // sendBeacon: 페이지 이탈 시에도 전송 보장
      const data = new URLSearchParams({
        v: '2',
        tid: process.env.NEXT_PUBLIC_GA_ID!,
        t: 'event',
        en: 'session_duration',
        ep: JSON.stringify({
          event_category: 'engagement',
          value: Math.round(duration / 1000), // 초 단위
        }),
      });
      navigator.sendBeacon('https://www.google-analytics.com/g/collect', data);
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, []);
```

### 3.3 Exit Intent (이탈 의도 감지)

```typescript
// Booking.com, Airbnb 등에서 사용하는 패턴
useEffect(() => {
  let exitIntentFired = false;

  const handleMouseLeave = (e: MouseEvent) => {
    // 마우스가 브라우저 상단으로 이동 (탭 닫기 시도)
    if (e.clientY <= 0 && !exitIntentFired) {
      exitIntentFired = true;

      // 이탈 의도 추적
      if (typeof window !== 'undefined' && window.gtag) {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        window.gtag('event', 'exit_intent', {
          event_category: 'engagement',
          scroll_depth: scrollPercent,
          page_location: window.location.pathname,
        });
      }

      // 선택: Exit Intent Modal 표시
      // setShowExitModal(true);
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, []);
```

### 3.4 Rage Click (UX 문제 감지)

```typescript
// Hotjar, FullStory 방식
useEffect(() => {
  const clickCounts = new Map<string, { count: number; timer: NodeJS.Timeout | null }>();

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const elementId = target.id || target.className || 'unknown';

    const current = clickCounts.get(elementId) || { count: 0, timer: null };

    // 기존 타이머 취소
    if (current.timer) clearTimeout(current.timer);

    current.count += 1;

    // 1초 내 3번 이상 클릭 시 rage click
    if (current.count >= 3) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'rage_click', {
          event_category: 'error',
          event_label: elementId,
          click_count: current.count,
        });
      }
      clickCounts.delete(elementId);
    } else {
      // 1초 후 리셋
      current.timer = setTimeout(() => {
        clickCounts.delete(elementId);
      }, 1000);
      clickCounts.set(elementId, current);
    }
  };

  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}, []);
```

### 3.5 서버 성능 추적 (백엔드)

백엔드 API 성능을 추적하여 비즈니스 영향을 실시간으로 측정합니다.

```typescript
// 서버사이드 성능 모니터링 (Node.js/Express)
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// GA4 Measurement Protocol을 사용한 서버 성능 추적
export class ServerPerformanceTracker {
  private measurementId = process.env.GA_MEASUREMENT_ID;
  private apiSecret = process.env.GA_API_SECRET;
  private endpoint = 'https://www.google-analytics.com/mp/collect';

  // Express 미들웨어
  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const startTime = Date.now();
      const requestId = this.generateRequestId();

      // 요청 정보 저장
      const requestInfo = {
        path: req.path,
        method: req.method,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        timestamp: new Date().toISOString()
      };

      // 응답 완료 시 성능 측정
      res.on('finish', async () => {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;

        // 성능 데이터 수집
        const performanceData = {
          endpoint: req.path,
          method: req.method,
          duration_ms: duration,
          status_code: statusCode,
          response_size: res.get('content-length') || 0,
          memory_usage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
          cpu_usage: process.cpuUsage().user / 1000, // ms
        };

        // 비즈니스 영향 계산
        const businessImpact = this.calculateBusinessImpact(performanceData);

        // GA4로 전송
        await this.sendToGA4({
          client_id: this.getClientId(req),
          events: [{
            name: 'api_performance',
            params: {
              ...performanceData,
              ...businessImpact,
              request_id: requestId,
              environment: process.env.NODE_ENV
            }
          }]
        });

        // 느린 요청 알림 (1초 초과)
        if (duration > 1000) {
          await this.sendSlowRequestAlert(performanceData, businessImpact);
        }

        // 에러 알림 (5xx)
        if (statusCode >= 500) {
          await this.sendErrorAlert(performanceData, requestInfo);
        }
      });

      next();
    };
  }

  // 데이터베이스 쿼리 성능 추적
  async trackDatabaseQuery(queryName: string, queryFn: () => Promise<any>) {
    const startTime = Date.now();
    let error = null;
    let result;

    try {
      result = await queryFn();
    } catch (e) {
      error = e;
    }

    const duration = Date.now() - startTime;

    // GA4로 전송
    await this.sendToGA4({
      client_id: 'server',
      events: [{
        name: 'database_performance',
        params: {
          query_name: queryName,
          duration_ms: duration,
          success: !error,
          error_message: error?.message,
          rows_affected: result?.rowCount || 0,
          cache_hit: result?.fromCache || false
        }
      }]
    });

    // 느린 쿼리 추적 (500ms 초과)
    if (duration > 500) {
      await this.trackSlowQuery(queryName, duration);
    }

    if (error) throw error;
    return result;
  }

  // 비즈니스 영향 계산
  private calculateBusinessImpact(performanceData: any) {
    const { endpoint, duration_ms, status_code } = performanceData;

    // 엔드포인트별 가중치 (비즈니스 중요도)
    const endpointWeights = {
      '/api/checkout': 10,      // 결제 - 매우 중요
      '/api/auth': 8,           // 인증 - 중요
      '/api/search': 6,         // 검색 - 보통
      '/api/profile': 4,        // 프로필 - 낮음
      default: 5
    };

    const weight = endpointWeights[endpoint] || endpointWeights.default;

    // 예상 매출 손실 계산 (원/요청)
    let revenueLoss = 0;
    if (status_code >= 500) {
      revenueLoss = weight * 1000; // 에러 시
    } else if (duration_ms > 3000) {
      revenueLoss = weight * 500;  // 매우 느림
    } else if (duration_ms > 1000) {
      revenueLoss = weight * 100;  // 느림
    }

    // 사용자 경험 점수 (0-100)
    let uxScore = 100;
    if (duration_ms > 100) uxScore -= Math.min(50, duration_ms / 100);
    if (status_code >= 400) uxScore -= 30;
    if (status_code >= 500) uxScore -= 20;

    return {
      revenue_impact: revenueLoss,
      ux_score: Math.max(0, uxScore),
      performance_grade: this.getPerformanceGrade(duration_ms),
      business_priority: weight
    };
  }

  private getPerformanceGrade(duration: number): string {
    if (duration < 200) return 'excellent';
    if (duration < 500) return 'good';
    if (duration < 1000) return 'fair';
    if (duration < 3000) return 'poor';
    return 'critical';
  }

  private async sendToGA4(payload: any) {
    try {
      await axios.post(
        `${this.endpoint}?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`,
        payload,
        { timeout: 1000 } // 비동기, 빠른 타임아웃
      );
    } catch (error) {
      console.error('GA4 전송 실패:', error);
    }
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientId(req: Request): string {
    // 세션 ID 또는 해시된 IP 사용
    return req.sessionID || this.hashString(req.ip || 'unknown');
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

// 사용 예시
const tracker = new ServerPerformanceTracker();

// Express 앱에 적용
app.use(tracker.middleware());

// 데이터베이스 쿼리 추적
const users = await tracker.trackDatabaseQuery('get_active_users', async () => {
  return await db.query('SELECT * FROM users WHERE active = true');
});
```

**주요 기능**:
- API 엔드포인트별 응답 시간 측정
- 데이터베이스 쿼리 성능 추적
- 비즈니스 영향도 자동 계산
- 실시간 알림 (1초 이상 지연 시)
- GA4 Measurement Protocol 연동

### 3.6 캐시 성능 모니터링

```typescript
// Redis 캐시 성능 추적
export class CachePerformanceTracker {
  private hitCount = 0;
  private missCount = 0;
  private totalLatency = 0;
  private requestCount = 0;

  async get(key: string): Promise<any> {
    const startTime = Date.now();
    const result = await redis.get(key);
    const duration = Date.now() - startTime;

    this.totalLatency += duration;
    this.requestCount++;

    if (result) {
      this.hitCount++;
      this.trackCacheEvent('cache_hit', key, duration);
    } else {
      this.missCount++;
      this.trackCacheEvent('cache_miss', key, duration);
    }

    // 주기적으로 집계 데이터 전송 (1분마다)
    if (this.requestCount % 100 === 0) {
      this.sendAggregatedMetrics();
    }

    return result;
  }

  private trackCacheEvent(eventType: string, key: string, duration: number) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'cache',
        cache_key: this.sanitizeKey(key),
        response_time: duration,
        hit_rate: this.getHitRate()
      });
    }
  }

  private sendAggregatedMetrics() {
    const metrics = {
      hit_rate: this.getHitRate(),
      avg_latency: this.totalLatency / this.requestCount,
      total_requests: this.requestCount,
      cache_efficiency: this.calculateEfficiency()
    };

    // GA4로 전송
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cache_metrics', {
        event_category: 'performance',
        ...metrics
      });
    }

    // 캐시 효율이 낮으면 알림
    if (metrics.hit_rate < 0.7) {
      console.warn('Low cache hit rate:', metrics);
      // Slack 알림 등 추가 액션
    }
  }

  private getHitRate(): number {
    const total = this.hitCount + this.missCount;
    return total > 0 ? this.hitCount / total : 0;
  }

  private calculateEfficiency(): number {
    // 캐시 효율성 점수 (0-100)
    const hitRateScore = this.getHitRate() * 50;
    const latencyScore = Math.max(0, 50 - (this.totalLatency / this.requestCount) / 10);
    return Math.round(hitRateScore + latencyScore);
  }

  private sanitizeKey(key: string): string {
    // 민감한 정보 제거
    return key.replace(/user_\d+/, 'user_***').substring(0, 50);
  }
}
```

---

## 4. 검증 방법

### 4.1 로컬 개발 (Chrome DevTools)

**Step 1: Network 탭**
```
1. F12 → Network 탭
2. 필터: "collect"
3. 액션 수행 (버튼 클릭, 스크롤 등)
4. www.google-analytics.com/g/collect 요청 확인
```

**Step 2: Payload 검증**
```
클릭 → Payload 탭 → Query String Parameters 확인:

✅ 올바른 예:
en=purchase
ep.value=29900          (숫자, 따옴표 없음)
ep.transaction_id=imp_xxx
ep.currency=KRW

❌ 잘못된 예:
ep.value="29900"        (문자열, 따옴표 있음)
ep.transaction_id=undefined
```

### 4.2 GA4 DebugView

**설정**:
```typescript
// GoogleAnalytics.tsx
gtag('config', GA_MEASUREMENT_ID, {
  page_path: url,
  anonymize_ip: true,
  debug_mode: process.env.NODE_ENV === 'development', // 추가
});
```

**확인**:
```
1. GA4 대시보드 → 구성 → DebugView
2. 로컬에서 액션 수행
3. 실시간 이벤트 스트림 확인
   - 이벤트명
   - 파라미터 이름/값
   - 타임스탬프
```

### 4.3 배포 전 체크리스트

**필수 확인 사항**:
- [ ] `purchase` 이벤트: transaction_id 중복 없음, value 숫자 타입
- [ ] `begin_checkout` 이벤트: value 정확함
- [ ] 폼 에러: 주요 에러 타입 추적됨 (email_invalid, email_missing 등)
- [ ] 스크롤: 25%, 50%, 75%, 100% 각각 1회만 전송
- [ ] CTA: 위치별 구분됨 (hero, sticky, footer)

**시나리오 테스트** (스테이징):
```
1. 신규 방문자로 전체 퍼널 1회 완료
   → 예상 이벤트 순서: page_view → scroll_25 → ... → sign_up

2. 유료 구매 퍼널 1회 완료
   → 예상 이벤트: view_item → begin_checkout → purchase

3. 결제 실패 시나리오
   → payment_failed 이벤트 전송 확인
```

---

## 5. 트러블슈팅

### 5.1 이벤트가 전송 안 됨

**증상**: Network 탭에 collect 요청이 없음

**원인 & 해결**:
```typescript
// 1. window 객체 체크 누락
// ❌ 잘못된 예
window.gtag('event', 'purchase', { ... }); // SSR 시 에러

// ✅ 올바른 예
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'purchase', { ... });
}

// 2. GA 스크립트 로딩 전 호출
// 해결: useEffect 내부에서 호출 또는 gtag 존재 확인
```

### 5.2 value가 0으로 표시

**증상**: GA4 리포트에서 매출이 0원

**원인**: 문자열로 전송
```typescript
// ❌ 잘못된 예
trackEvent('purchase', 'ecommerce', 'product', '29900'); // 문자열

// ✅ 올바른 예
trackEvent('purchase', 'ecommerce', 'product', 29900);   // 숫자
```

**확인 방법**:
```
DevTools → Payload → ep.value=29900 (따옴표 없음 확인)
```

### 5.3 중복 이벤트 발송

**증상**: 버튼 1번 클릭했는데 이벤트 2-3번 전송

**원인**: useEffect 의존성 배열 문제
```typescript
// ❌ 잘못된 예
useEffect(() => {
  trackEvent('page_view', 'engagement', 'home');
}, [someState]); // someState 변경 시마다 재전송

// ✅ 올바른 예
useEffect(() => {
  trackEvent('page_view', 'engagement', 'home');
}, []); // 빈 배열: 마운트 시 1회만
```

### 5.4 스크롤 이벤트 미작동

**증상**: 스크롤해도 이벤트 전송 안 됨

**원인**: scrollHeight 계산 오류 (짧은 페이지)
```typescript
// 해결
const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
if (scrollHeight === 0) return; // 페이지가 너무 짧으면 무시

const scrollPercent = (window.scrollY / scrollHeight) * 100;
```

### 5.5 GA4에서 이벤트가 안 보임

**증상**: DevTools에서는 전송 확인했는데 GA4에 안 보임

**확인 사항**:
```
1. 측정 ID 확인
   → process.env.NEXT_PUBLIC_GA_ID === GA4 측정 ID

2. 데이터 스트림 활성화 확인
   → GA4 관리 → 데이터 스트림 → 상태 "활성"

3. 처리 시간 고려
   → 실시간 보고서: 즉시
   → 표준 보고서: 24-48시간 지연

4. 날짜 범위 확인
   → GA4 우상단 날짜: "오늘" 또는 "최근 7일"
```

---

## 부록: 체크리스트

### 주요 이벤트 구현 체크리스트

**Tier 1 (필수)**:
- [ ] `purchase` - 결제 완료 추적
- [ ] `begin_checkout` - 결제 시작 추적
- [ ] `sign_up` - 베타 신청 완료 (기존 확인)

**Tier 2 (권장)**:
- [ ] `scroll_depth` - 25%, 50%, 75%, 100%
- [ ] `click_cta` - CTA 위치별
- [ ] `form_field_interaction` - 이메일, 경력, 기술스택
- [ ] `form_error` - 유효성 검사 에러
- [ ] `payment_failed` - 결제 실패

**Tier 3 (선택)**:
- [ ] `exit_intent` - 이탈 의도
- [ ] `rage_click` - UX 문제
- [ ] `error` - 전역 에러 핸들러

### 배포 전 최종 확인

- [ ] Chrome DevTools에서 모든 주요 이벤트 전송 확인
- [ ] Payload 타입 검증 (value는 숫자)
- [ ] GA4 DebugView에서 실시간 확인
- [ ] 전체 퍼널 1회 시나리오 테스트
- [ ] 중복 이벤트 없음 확인

---

**문서 버전**: 2.0
**최종 수정**: 2025-01-22
**주요 업데이트**: 서버 성능 추적 및 캐시 모니터링 섹션 추가