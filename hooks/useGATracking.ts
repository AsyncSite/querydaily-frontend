'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gaTracker from '@/lib/analytics/ga-utils';
import {
  GA_EVENTS,
  GAEventMap,
  TypedTrackEvent,
  validateEventParams,
} from '@/lib/analytics/event-types';

/**
 * GA 트래킹 훅 설정 옵션
 */
interface UseGATrackingOptions {
  debugMode?: boolean;
  trackPageViews?: boolean;
  trackErrors?: boolean;
}

/**
 * GA 트래킹 훅 반환 타입
 */
interface UseGATrackingReturn {
  trackEvent: TypedTrackEvent;
  trackPageView: () => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  isReady: boolean;
}

/**
 * Google Analytics 트래킹을 위한 메인 React Hook
 *
 * @param options 트래킹 옵션
 * @returns GA 트래킹 함수들
 *
 * @example
 * ```tsx
 * const { trackEvent, trackError } = useGATracking();
 *
 * // 타입 안전한 이벤트 추적
 * trackEvent(GA_EVENTS.CLICK_CTA, {
 *   cta_text: '시작하기',
 *   cta_location: 'hero'
 * });
 * ```
 */
export function useGATracking(options: UseGATrackingOptions = {}): UseGATrackingReturn {
  const {
    debugMode = process.env.NODE_ENV === 'development',
    trackPageViews = true,
    trackErrors = true,
  } = options;

  const pathname = usePathname();
  const isReady = useRef(false);
  const prevPathname = useRef<string>();

  // GA 초기화 확인
  useEffect(() => {
    const checkReady = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        isReady.current = true;
        if (debugMode) {
          console.log('✅ GA Tracking Hook: Ready');
        }
      } else {
        setTimeout(checkReady, 100);
      }
    };

    checkReady();
  }, [debugMode]);

  // 페이지뷰 자동 추적
  useEffect(() => {
    if (!trackPageViews || !isReady.current) return;

    // 최초 로드 또는 경로 변경 시에만 추적
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      // 약간의 지연을 두어 페이지 정보가 완전히 로드되도록 함
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: pathname,
            page_title: document.title,
            page_location: window.location.href,
          });

          if (debugMode) {
            console.log('📄 GA Page View:', {
              path: pathname,
              title: document.title,
            });
          }
        }
      }, 100);
    }
  }, [pathname, trackPageViews, debugMode]);

  // 타입 안전한 이벤트 추적 함수
  const trackEvent = useCallback<TypedTrackEvent>(
    (eventName, params) => {
      // SSR 환경 체크
      if (typeof window === 'undefined') return;

      try {
        // 파라미터 유효성 검증
        if (!validateEventParams(eventName, params)) {
          console.warn(`⚠️ GA: Invalid parameters for event "${eventName}"`);
          if (debugMode) {
            console.log('Invalid params:', params);
          }
          return;
        }

        // 이벤트 추적
        gaTracker.trackEvent(eventName, params as Record<string, any>);

        // 디버그 로깅
        if (debugMode) {
          console.log(`🎯 GA Event: ${eventName}`, params);
        }
      } catch (error) {
        console.error('❌ GA Tracking Error:', error);
        if (debugMode) {
          console.error('Event details:', { eventName, params });
        }
      }
    },
    [debugMode]
  );

  // 페이지뷰 수동 추적 함수
  const trackPageView = useCallback(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const pageData = {
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
    };

    window.gtag('event', 'page_view', pageData);

    if (debugMode) {
      console.log('📄 GA Manual Page View:', pageData);
    }
  }, [debugMode]);

  // 에러 추적 함수
  const trackError = useCallback(
    (error: Error, context: Record<string, any> = {}) => {
      if (!trackErrors) return;

      const errorType = error.name || 'unknown';
      const errorMessage = error.message || 'Unknown error occurred';

      // 에러 타입 분류
      let category: 'api' | 'validation' | 'javascript' | 'unknown' = 'unknown';
      if (errorMessage.includes('fetch') || errorMessage.includes('API')) {
        category = 'api';
      } else if (errorMessage.includes('valid')) {
        category = 'validation';
      } else if (error.stack) {
        category = 'javascript';
      }

      const errorParams = {
        error_type: category,
        error_message: errorMessage,
        error_name: errorType,
        error_location: context.location || 'unknown',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        ...context,
      };

      // 개발 환경에서만 스택 트레이스 포함
      if (debugMode && error.stack) {
        errorParams.error_stack = error.stack.substring(0, 500);
      }

      gaTracker.trackError(
        category,
        errorMessage,
        context.location,
        errorParams
      );

      if (debugMode) {
        console.error('🚨 GA Error Tracked:', errorParams);
      }
    },
    [trackErrors, debugMode]
  );

  // 전역 에러 핸들러 설정 (선택적)
  useEffect(() => {
    if (!trackErrors) return;

    const handleError = (event: ErrorEvent) => {
      trackError(new Error(event.message), {
        location: `${event.filename}:${event.lineno}:${event.colno}`,
        type: 'uncaught_error',
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

      trackError(error, {
        type: 'unhandled_rejection',
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackErrors, trackError]);

  return {
    trackEvent,
    trackPageView,
    trackError,
    isReady: isReady.current,
  };
}

// ============================================
// 특화된 훅들 (선택적 사용)
// ============================================

/**
 * 스크롤 깊이 추적 전용 훅
 */
export function useScrollDepthTracking(
  thresholds: number[] = [25, 50, 75, 100]
) {
  const { trackEvent } = useGATracking();
  const trackedDepths = useRef(new Set<number>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    const calculateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackableHeight = documentHeight - windowHeight;

      return trackableHeight > 0
        ? Math.round((scrollTop / trackableHeight) * 100)
        : 0;
    };

    const checkScrollDepth = () => {
      const currentDepth = calculateScrollPercentage();

      thresholds.forEach((threshold) => {
        if (
          currentDepth >= threshold &&
          !trackedDepths.current.has(threshold)
        ) {
          const timeToScroll = Math.round((Date.now() - startTime.current) / 1000);

          trackEvent(GA_EVENTS.SCROLL_DEPTH, {
            percentage: threshold as any,
            time_to_scroll: timeToScroll,
          });

          trackedDepths.current.add(threshold);
        }
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkScrollDepth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkScrollDepth(); // 초기 체크

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [thresholds, trackEvent]);

  return trackedDepths.current;
}

/**
 * 폼 추적 전용 훅
 */
export function useFormTracking(formName: string) {
  const { trackEvent } = useGATracking();
  const fieldMetrics = useRef(new Map<string, any>());

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      const now = Date.now();
      const metrics = fieldMetrics.current.get(fieldName) || {
        focusCount: 0,
        lastFocus: 0,
        totalTime: 0,
      };

      metrics.focusCount++;
      metrics.lastFocus = now;
      fieldMetrics.current.set(fieldName, metrics);

      trackEvent(GA_EVENTS.FORM_FIELD_INTERACTION, {
        form_name: formName,
        field_name: fieldName,
        interaction_type: 'focus',
        focus_count: metrics.focusCount,
      });
    },
    [formName, trackEvent]
  );

  const trackFieldBlur = useCallback(
    (fieldName: string) => {
      const metrics = fieldMetrics.current.get(fieldName);
      if (!metrics || !metrics.lastFocus) return;

      const timeSpent = Date.now() - metrics.lastFocus;
      metrics.totalTime += timeSpent;
      metrics.lastFocus = 0;

      trackEvent(GA_EVENTS.FORM_FIELD_INTERACTION, {
        form_name: formName,
        field_name: fieldName,
        interaction_type: 'blur',
        time_on_field: Math.round(timeSpent / 1000),
      });
    },
    [formName, trackEvent]
  );

  const trackFieldComplete = useCallback(
    (fieldName: string) => {
      trackEvent(GA_EVENTS.FORM_FIELD_INTERACTION, {
        form_name: formName,
        field_name: fieldName,
        interaction_type: 'complete',
        is_completed: true,
      });
    },
    [formName, trackEvent]
  );

  const trackFieldError = useCallback(
    (fieldName: string, errorMessage: string) => {
      trackEvent(GA_EVENTS.FORM_FIELD_INTERACTION, {
        form_name: formName,
        field_name: fieldName,
        interaction_type: 'error',
        error_message: errorMessage,
      });
    },
    [formName, trackEvent]
  );

  const trackFormStart = useCallback(() => {
    trackEvent(GA_EVENTS.FORM_START, {
      form_name: formName,
    });
  }, [formName, trackEvent]);

  const trackFormSubmit = useCallback(
    (success: boolean = true) => {
      trackEvent(GA_EVENTS.FORM_SUBMIT, {
        form_name: formName,
        success,
      });
    },
    [formName, trackEvent]
  );

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldComplete,
    trackFieldError,
    trackFormStart,
    trackFormSubmit,
  };
}

/**
 * CTA 추적 전용 훅
 */
export function useCTATracking() {
  const { trackEvent } = useGATracking();

  const trackCTAClick = useCallback(
    (ctaText: string, ctaLocation: string, additionalParams?: Record<string, any>) => {
      // 현재 스크롤 깊이 계산
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      trackEvent(GA_EVENTS.CLICK_CTA, {
        cta_text: ctaText,
        cta_location: ctaLocation,
        scroll_depth_at_click: scrollPercentage,
        ...additionalParams,
      });
    },
    [trackEvent]
  );

  return trackCTAClick;
}

// Export all
export default useGATracking;