'use client';

import { useCallback, MouseEvent } from 'react';
import { useCTATracking } from '@/hooks/useGATracking';
import { CTA_LOCATIONS } from '@/lib/analytics/event-types';

/**
 * CTA 클릭 추적을 위한 HOC (Higher Order Component)
 *
 * @example
 * ```tsx
 * import { withCTATracking } from '@/components/analytics/CTATracker';
 *
 * const MyButton = withCTATracking(
 *   <button className="btn">시작하기</button>,
 *   { location: 'hero', text: '시작하기' }
 * );
 * ```
 */

interface CTATrackingProps {
  location: string;
  text?: string;
  variant?: string;
  index?: number;
  additionalParams?: Record<string, any>;
}

/**
 * CTA 클릭 이벤트를 추적하는 래퍼 함수
 */
export function withCTATracking(
  element: React.ReactElement,
  trackingProps: CTATrackingProps
) {
  const EnhancedComponent = () => {
    const trackCTAClick = useCTATracking();

    const handleClick = useCallback((e: MouseEvent) => {
      // 원래의 onClick 실행
      if (element.props.onClick) {
        element.props.onClick(e);
      }

      // GA 이벤트 추적
      const ctaText = trackingProps.text ||
                      element.props.children?.toString() ||
                      'Unknown CTA';

      trackCTAClick(
        ctaText,
        trackingProps.location,
        {
          cta_variant: trackingProps.variant,
          cta_index: trackingProps.index,
          ...trackingProps.additionalParams
        }
      );
    }, [trackCTAClick]);

    // 기존 props에 추적 onClick 추가
    return {
      ...element,
      props: {
        ...element.props,
        onClick: handleClick,
        'data-ga-cta': trackingProps.location // 디버깅용
      }
    };
  };

  return <EnhancedComponent />;
}

/**
 * CTA 버튼 컴포넌트
 * 자동으로 클릭 추적이 포함된 버튼
 */
interface TrackedCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  location: keyof typeof CTA_LOCATIONS | string;
  variant?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

export function TrackedCTAButton({
  children,
  onClick,
  location,
  variant,
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}: TrackedCTAButtonProps) {
  const trackCTAClick = useCTATracking();

  const handleClick = useCallback(() => {
    if (disabled) return;

    // GA 이벤트 추적
    const ctaText = typeof children === 'string'
      ? children
      : 'Button Click';

    trackCTAClick(ctaText, location, {
      cta_variant: variant
    });

    // 원래의 onClick 실행
    if (onClick) {
      onClick();
    }
  }, [trackCTAClick, onClick, disabled, children, location, variant]);

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      data-ga-cta={location}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * CTA 링크 컴포넌트
 * 자동으로 클릭 추적이 포함된 링크
 */
interface TrackedCTALinkProps {
  children: React.ReactNode;
  href: string;
  location: keyof typeof CTA_LOCATIONS | string;
  variant?: string;
  className?: string;
  external?: boolean;
  [key: string]: any;
}

export function TrackedCTALink({
  children,
  href,
  location,
  variant,
  className = '',
  external = false,
  ...rest
}: TrackedCTALinkProps) {
  const trackCTAClick = useCTATracking();

  const handleClick = useCallback(() => {
    const ctaText = typeof children === 'string'
      ? children
      : 'Link Click';

    trackCTAClick(ctaText, location, {
      cta_variant: variant,
      link_url: href,
      is_external: external
    });
  }, [trackCTAClick, children, location, variant, href, external]);

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      data-ga-cta={location}
      {...linkProps}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Hook for manual CTA tracking
 *
 * @example
 * ```tsx
 * const { trackCTA } = useManualCTATracking();
 *
 * const handleCustomAction = () => {
 *   trackCTA('Custom Action', 'custom_location');
 *   // ... other logic
 * };
 * ```
 */
export function useManualCTATracking() {
  const trackCTAClick = useCTATracking();

  const trackCTA = useCallback((
    text: string,
    location: string,
    additionalParams?: Record<string, any>
  ) => {
    trackCTAClick(text, location, additionalParams);
  }, [trackCTAClick]);

  return { trackCTA };
}

/**
 * Utility function to enhance existing buttons with CTA tracking
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   enhanceExistingCTAs({
 *     '.hero-cta': { location: 'hero' },
 *     '.product-cta': { location: 'product' },
 *     '[data-cta]': { location: 'dynamic' }
 *   });
 * }, []);
 * ```
 */
export function enhanceExistingCTAs(
  selectors: Record<string, CTATrackingProps>
) {
  if (typeof window === 'undefined') return;

  Object.entries(selectors).forEach(([selector, props]) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      if (element instanceof HTMLElement) {
        // 이미 추적 중인지 확인
        if (element.dataset.gaEnhanced) return;

        element.dataset.gaEnhanced = 'true';

        element.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const text = target.textContent || 'Unknown';

          // GA 이벤트 전송
          if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
            window.gtag('event', 'click_cta', {
              cta_text: text.trim(),
              cta_location: props.location,
              cta_index: props.index || index,
              cta_variant: props.variant,
              ...props.additionalParams
            });
          }

          // 디버그 로그
          if (process.env.NODE_ENV === 'development') {
            console.log('🎯 CTA Click:', {
              text: text.trim(),
              location: props.location,
              element: target
            });
          }
        });
      }
    });
  });
}