'use client';

/**
 * SectionTracker Component
 * Tracks section visibility and engagement using Intersection Observer
 */

import { useEffect, useRef, useCallback } from 'react';
import {
  trackSectionView,
  trackSectionEngagement,
  isBrowser,
  type PageType,
  type SectionName,
  type ProductId,
} from '@/lib/analytics';
import { SECTION_VISIBILITY_THRESHOLD } from '@/lib/analytics/config';

interface SectionTrackerProps {
  children: React.ReactNode;
  sectionName: SectionName;
  pageType: PageType;
  productId?: ProductId;
  className?: string;
  threshold?: number;
}

export function SectionTracker({
  children,
  sectionName,
  pageType,
  productId,
  className,
  threshold = SECTION_VISIBILITY_THRESHOLD,
}: SectionTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);
  const entryTime = useRef<number | null>(null);
  const maxVisibility = useRef(0);
  const isVisible = useRef(false);

  // Track section view (first time visible)
  const handleSectionView = useCallback(() => {
    if (hasTrackedView.current) return;

    hasTrackedView.current = true;
    entryTime.current = Date.now();

    trackSectionView({
      sectionName,
      pageType,
      productId,
    });
  }, [sectionName, pageType, productId]);

  // Track section engagement (when section leaves viewport)
  const handleSectionEngagement = useCallback(() => {
    if (!entryTime.current) return;

    const timeInSection = (Date.now() - entryTime.current) / 1000;

    // Only track if user spent meaningful time (> 1 second)
    if (timeInSection > 1) {
      trackSectionEngagement({
        sectionName,
        timeInSection,
        maxVisibility: maxVisibility.current,
        pageType,
        productId,
      });
    }

    // Reset for next entry
    entryTime.current = null;
    maxVisibility.current = 0;
  }, [sectionName, pageType, productId]);

  useEffect(() => {
    if (!isBrowser() || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visibility = Math.round(entry.intersectionRatio * 100);

          if (entry.isIntersecting) {
            // Section is visible
            if (!isVisible.current) {
              isVisible.current = true;
              handleSectionView();
            }

            // Track max visibility
            if (visibility > maxVisibility.current) {
              maxVisibility.current = visibility;
            }
          } else {
            // Section left viewport
            if (isVisible.current) {
              isVisible.current = false;
              handleSectionEngagement();
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px',
      }
    );

    observer.observe(sectionRef.current);

    // Cleanup
    return () => {
      observer.disconnect();
      // Track engagement on unmount if section was visible
      if (isVisible.current) {
        handleSectionEngagement();
      }
    };
  }, [handleSectionView, handleSectionEngagement]);

  return (
    <div ref={sectionRef} className={className} data-section={sectionName}>
      {children}
    </div>
  );
}

export default SectionTracker;
