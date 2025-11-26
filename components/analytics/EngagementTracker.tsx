'use client';

/**
 * EngagementTracker Component
 * Tracks scroll depth and user engagement metrics
 */

import { useEffect, useRef, useCallback } from 'react';
import {
  trackScrollDepth,
  trackUserEngaged,
  getScrollPercentage,
  isBrowser,
  throttle,
  type PageType,
  type ProductId,
} from '@/lib/analytics';
import { SCROLL_THRESHOLDS, ENGAGEMENT_THRESHOLD_SECONDS, DEBOUNCE_DELAYS } from '@/lib/analytics/config';

interface EngagementTrackerProps {
  pageType: PageType;
  productId?: ProductId;
  children?: React.ReactNode;
}

export function EngagementTracker({
  pageType,
  productId,
  children,
}: EngagementTrackerProps) {
  const pageLoadTime = useRef(Date.now());
  const trackedThresholds = useRef<Set<number>>(new Set());
  const lastScrollTime = useRef<Record<number, number>>({});
  const isEngaged = useRef(false);
  const pauseCount = useRef(0);
  const lastScrollY = useRef(0);
  const scrollPauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll depth
  const handleScroll = useCallback(() => {
    if (!isBrowser()) return;

    const currentPercentage = getScrollPercentage();
    const currentScrollY = window.scrollY;

    // Track each threshold once
    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (currentPercentage >= threshold && !trackedThresholds.current.has(threshold)) {
        trackedThresholds.current.add(threshold);
        const timeToScroll = (Date.now() - pageLoadTime.current) / 1000;
        lastScrollTime.current[threshold] = timeToScroll;

        trackScrollDepth({
          percentage: threshold,
          timeToScroll,
          pageType,
          productId,
        });
      }
    });

    // Track scroll pauses (for engagement detection)
    if (scrollPauseTimeout.current) {
      clearTimeout(scrollPauseTimeout.current);
    }

    scrollPauseTimeout.current = setTimeout(() => {
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        pauseCount.current += 1;
      }
    }, 2000); // 2 second pause threshold

    lastScrollY.current = currentScrollY;
  }, [pageType, productId]);

  // Track user engagement (engaged after spending time + scrolling)
  const checkEngagement = useCallback(() => {
    if (isEngaged.current) return;

    const timeOnPage = (Date.now() - pageLoadTime.current) / 1000;
    const hasScrolled = trackedThresholds.current.size > 0;

    if (timeOnPage >= ENGAGEMENT_THRESHOLD_SECONDS && hasScrolled) {
      isEngaged.current = true;

      trackUserEngaged({
        timeToEngage: timeOnPage,
        pauseCount: pauseCount.current,
        pageType,
        productId,
      });
    }
  }, [pageType, productId]);

  useEffect(() => {
    if (!isBrowser()) return;

    // Throttled scroll handler
    const throttledScroll = throttle(handleScroll, DEBOUNCE_DELAYS.scroll);

    // Initial check for scroll position (in case page is already scrolled)
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Check engagement periodically
    const engagementInterval = setInterval(checkEngagement, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearInterval(engagementInterval);
      throttledScroll.cancel();
      if (scrollPauseTimeout.current) {
        clearTimeout(scrollPauseTimeout.current);
      }
    };
  }, [handleScroll, checkEngagement]);

  // Track on page unload
  useEffect(() => {
    if (!isBrowser()) return;

    const handleUnload = () => {
      // Final engagement check
      checkEngagement();
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [checkEngagement]);

  return children ? <>{children}</> : null;
}

/**
 * Hook for manual engagement tracking
 */
export function useEngagementTracking(params: {
  pageType: PageType;
  productId?: ProductId;
}) {
  const { pageType, productId } = params;

  const pageLoadTime = useRef(Date.now());
  const trackedThresholds = useRef<Set<number>>(new Set());

  const trackScroll = useCallback(
    (percentage: 25 | 50 | 75 | 100) => {
      if (trackedThresholds.current.has(percentage)) return;

      trackedThresholds.current.add(percentage);
      const timeToScroll = (Date.now() - pageLoadTime.current) / 1000;

      trackScrollDepth({
        percentage,
        timeToScroll,
        pageType,
        productId,
      });
    },
    [pageType, productId]
  );

  const trackEngaged = useCallback(
    (pauseCount?: number) => {
      const timeToEngage = (Date.now() - pageLoadTime.current) / 1000;

      trackUserEngaged({
        timeToEngage,
        pauseCount,
        pageType,
        productId,
      });
    },
    [pageType, productId]
  );

  const getTrackedThresholds = useCallback(() => {
    return Array.from(trackedThresholds.current);
  }, []);

  return {
    trackScroll,
    trackEngaged,
    getTrackedThresholds,
    pageLoadTime: pageLoadTime.current,
  };
}

export default EngagementTracker;
