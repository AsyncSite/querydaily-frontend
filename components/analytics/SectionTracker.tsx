'use client';

import { useEffect, useRef } from 'react';
import { SECTION_NAMES } from '@/lib/analytics/event-types';

/**
 * SectionTracker Component
 *
 * 페이지의 각 섹션이 화면에 노출될 때 view_section 이벤트를 발생시킵니다.
 * Intersection Observer를 사용하여 섹션 내 스크롤 비율과 체류 시간을 측정합니다.
 *
 * @example
 * ```tsx
 * <SectionTracker sectionName="hero" sectionOrder={1}>
 *   <div className="hero-section">...</div>
 * </SectionTracker>
 * ```
 */

interface SectionTrackerProps {
  sectionName: keyof typeof SECTION_NAMES | string;
  sectionOrder?: number;
  children: React.ReactNode;
  threshold?: number; // 기본값 0.3 (30%)
}

export default function SectionTracker({
  sectionName,
  sectionOrder,
  children,
  threshold = 0.3
}: SectionTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasBeenViewed = useRef(false);
  const enterTime = useRef<number | null>(null);
  const maxScrollPercentage = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // 섹션 진입
            if (!enterTime.current) {
              enterTime.current = Date.now();
            }

            // 스크롤 비율 계산
            const scrollPercentage = Math.round(entry.intersectionRatio * 100);
            if (scrollPercentage > maxScrollPercentage.current) {
              maxScrollPercentage.current = scrollPercentage;
            }

            // 첫 노출 시 이벤트 발생
            if (!hasBeenViewed.current && window.gtag) {
              window.gtag('event', 'view_section', {
                section_name: sectionName,
                section_order: sectionOrder,
                view_percentage: scrollPercentage,
                page_path: window.location.pathname
              });

              hasBeenViewed.current = true;

              // 디버그 로그
              if (process.env.NODE_ENV === 'development') {
                console.log('📍 Section Viewed:', {
                  sectionName,
                  sectionOrder,
                  viewPercentage: scrollPercentage + '%'
                });
              }
            }
          } else {
            // 섹션 이탈
            if (enterTime.current && hasBeenViewed.current) {
              const timeInSection = Math.round((Date.now() - enterTime.current) / 1000);

              // 체류 시간 이벤트 (3초 이상 체류한 경우만)
              if (timeInSection >= 3 && window.gtag) {
                window.gtag('event', 'section_engagement', {
                  section_name: sectionName,
                  time_in_section: timeInSection,
                  max_scroll_percentage: maxScrollPercentage.current
                });
              }

              enterTime.current = null;
            }
          }
        });
      },
      {
        threshold: [threshold, 0.5, 0.75, 1.0],
        rootMargin: '0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionName, sectionOrder, threshold]);

  return (
    <div
      ref={sectionRef}
      data-section={sectionName}
      data-section-order={sectionOrder}
      data-section-tracking="true"
    >
      {children}
    </div>
  );
}

/**
 * Hook for manual section tracking
 */
export function useSectionTracking() {
  const trackSectionView = (
    sectionName: string,
    additionalParams?: Record<string, any>
  ) => {
    if (window.gtag) {
      window.gtag('event', 'view_section', {
        section_name: sectionName,
        page_path: window.location.pathname,
        ...additionalParams
      });
    }
  };

  return { trackSectionView };
}

/**
 * Auto-track all sections on a page
 */
export function autoTrackSections() {
  if (typeof window === 'undefined') return;

  // 주요 섹션 선택자들
  const sectionSelectors = [
    '[data-section]',
    'section[id]',
    '[id*="section"]',
    'main > div[id]'
  ];

  const sections = document.querySelectorAll(sectionSelectors.join(','));
  const trackedSections = new Set<string>();

  sections.forEach((section, index) => {
    const sectionName =
      (section as HTMLElement).dataset.section ||
      section.id ||
      `section_${index}`;

    // 이미 추적 중이거나 중복된 섹션은 스킵
    if (trackedSections.has(sectionName)) return;
    trackedSections.add(sectionName);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            if (window.gtag) {
              window.gtag('event', 'view_section', {
                section_name: sectionName,
                section_order: index + 1,
                view_percentage: Math.round(entry.intersectionRatio * 100)
              });
            }

            // 한 번만 추적
            observer.disconnect();
          }
        });
      },
      { threshold: [0.3, 0.5, 1.0] }
    );

    observer.observe(section);
  });
}