'use client';

/**
 * CTATracker Component
 * Tracks CTA button clicks with location and context
 */

import { useCallback, forwardRef } from 'react';
import {
  trackCTAClick,
  getScrollPercentage,
  type PageType,
  type CTALocation,
  type ProductId,
} from '@/lib/analytics';

interface CTATrackerProps {
  children: React.ReactNode;
  ctaLocation: CTALocation;
  pageType: PageType;
  productId?: ProductId;
  ctaText?: string;
  price?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  as?: 'button' | 'div' | 'a';
  disabled?: boolean;
  href?: string;
}

export const CTATracker = forwardRef<HTMLElement, CTATrackerProps>(
  function CTATracker(
    {
      children,
      ctaLocation,
      pageType,
      productId,
      ctaText,
      price,
      onClick,
      className,
      as = 'button',
      disabled,
      href,
    },
    ref
  ) {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        // Track the CTA click
        trackCTAClick({
          ctaLocation,
          ctaText: ctaText || (typeof children === 'string' ? children : undefined),
          scrollDepthAtClick: getScrollPercentage(),
          pageType,
          productId,
          price,
        });

        // Call the original onClick handler
        onClick?.(e);
      },
      [ctaLocation, ctaText, children, pageType, productId, price, onClick]
    );

    const Component = as;

    const commonProps = {
      ref: ref as React.Ref<HTMLButtonElement & HTMLDivElement & HTMLAnchorElement>,
      onClick: handleClick,
      className,
      'data-cta': ctaLocation,
    };

    if (Component === 'button') {
      return (
        <button {...commonProps} disabled={disabled} type="button">
          {children}
        </button>
      );
    }

    if (Component === 'a') {
      return (
        <a {...commonProps} href={href}>
          {children}
        </a>
      );
    }

    return <div {...commonProps}>{children}</div>;
  }
);

/**
 * Hook for tracking CTA clicks on custom components
 */
export function useCTATracking(params: {
  ctaLocation: CTALocation;
  pageType: PageType;
  productId?: ProductId;
  ctaText?: string;
  price?: number;
}) {
  const { ctaLocation, pageType, productId, ctaText, price } = params;

  const trackClick = useCallback(() => {
    trackCTAClick({
      ctaLocation,
      ctaText,
      scrollDepthAtClick: getScrollPercentage(),
      pageType,
      productId,
      price,
    });
  }, [ctaLocation, ctaText, pageType, productId, price]);

  return { trackClick };
}

export default CTATracker;
