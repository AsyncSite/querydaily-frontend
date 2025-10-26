'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollDepthTracking } from '@/hooks/useGATracking';

/**
 * ScrollTracker Component
 *
 * 페이지의 스크롤 깊이를 추적하고 GA에 이벤트를 전송합니다.
 * 25%, 50%, 75%, 100% 지점을 추적합니다.
 *
 * @example
 * ```tsx
 * // 페이지 컴포넌트에 추가
 * import ScrollTracker from '@/components/analytics/ScrollTracker';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <ScrollTracker />
 *       <main>...</main>
 *     </>
 *   );
 * }
 * ```
 */
export default function ScrollTracker() {
  const pathname = usePathname();
  // 페이지뷰 자동 추적 비활성화 (GoogleAnalytics 컴포넌트에서 처리)
  const trackedDepths = useScrollDepthTracking([25, 50, 75, 100]);

  // 디버그 모드에서 시각적 표시
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // 개발 환경에서만 인디케이터 표시
    if (process.env.NODE_ENV === 'development') {
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 5000); // 5초 후 숨김
    }
  }, []);

  // 페이지 변경 시 추적 리셋 (useScrollDepthTracking 내부에서 처리)
  useEffect(() => {
    // 페이지가 변경되면 스크롤 추적이 자동으로 리셋됨
    console.log(`📊 ScrollTracker: Initialized for ${pathname}`);
  }, [pathname]);

  // 개발 환경에서만 디버그 인디케이터 표시
  if (process.env.NODE_ENV === 'development' && showIndicator) {
    return (
      <div className="fixed top-20 left-4 bg-black/80 text-white p-2 rounded-lg text-xs font-mono z-40">
        <div className="mb-1 font-bold">📊 Scroll Tracking</div>
        <div className="space-y-1">
          {[25, 50, 75, 100].map(depth => (
            <div key={depth} className="flex items-center gap-2">
              <span className={trackedDepths.has(depth) ? 'text-green-400' : 'text-gray-400'}>
                {trackedDepths.has(depth) ? '✓' : '○'}
              </span>
              <span>{depth}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Advanced ScrollTracker with Intersection Observer
 *
 * 더 정밀한 스크롤 추적이 필요한 경우 사용합니다.
 * 특정 요소들의 노출을 추적할 수 있습니다.
 */
interface AdvancedScrollTrackerProps {
  thresholds?: number[];
  trackSections?: boolean;
  debugMode?: boolean;
}

export function AdvancedScrollTracker({
  thresholds = [25, 50, 75, 100],
  trackSections = false,
  debugMode = false,
}: AdvancedScrollTrackerProps) {
  const markersRef = useRef<HTMLDivElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackedMarkers = useRef(new Set<number>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    // 마커 요소 생성 및 배치
    const markers: HTMLDivElement[] = [];

    thresholds.forEach((threshold, index) => {
      const marker = document.createElement('div');
      marker.style.position = 'absolute';
      marker.style.width = '1px';
      marker.style.height = '1px';
      marker.style.left = '0';
      marker.style.visibility = 'hidden';
      marker.setAttribute('data-threshold', threshold.toString());
      marker.setAttribute('data-index', index.toString());

      // 마커 위치 계산
      const updateMarkerPosition = () => {
        const docHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = docHeight - viewportHeight;

        if (threshold === 100) {
          // 100%는 문서 끝
          marker.style.top = `${docHeight - 1}px`;
        } else {
          // 다른 퍼센티지는 스크롤 가능 영역 기준
          const position = (scrollableHeight * threshold) / 100;
          marker.style.top = `${position}px`;
        }
      };

      updateMarkerPosition();
      document.body.appendChild(marker);
      markers.push(marker);

      // 리사이즈 시 마커 위치 업데이트
      window.addEventListener('resize', updateMarkerPosition);
    });

    markersRef.current = markers;

    // Intersection Observer 설정
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const threshold = parseInt(entry.target.getAttribute('data-threshold') || '0');
            const index = parseInt(entry.target.getAttribute('data-index') || '0');

            if (!trackedMarkers.current.has(threshold)) {
              trackedMarkers.current.add(threshold);

              const timeToScroll = Math.round((Date.now() - startTime.current) / 1000);

              // GA 이벤트 전송
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'scroll_depth', {
                  percentage: threshold,
                  time_to_scroll: timeToScroll,
                  page_path: window.location.pathname,
                  page_title: document.title,
                });

                if (debugMode) {
                  console.log(`📊 Scroll Depth: ${threshold}% reached in ${timeToScroll}s`);
                }
              }

              // 100% 도달 시 observer 정리
              if (threshold === 100) {
                observerRef.current?.disconnect();
              }
            }
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.01, // 1% 이상 보이면 트리거
      }
    );

    // 마커 관찰 시작
    markers.forEach(marker => {
      observerRef.current?.observe(marker);
    });

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
      markers.forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
    };
  }, [thresholds, debugMode]);

  // 디버그 모드 UI
  if (debugMode) {
    return (
      <div className="fixed top-20 right-4 bg-black/90 text-white p-3 rounded-lg text-xs font-mono z-50">
        <div className="mb-2 font-bold text-yellow-400">🎯 Advanced Scroll Tracker</div>
        <div className="space-y-1">
          {thresholds.map(threshold => (
            <div key={threshold} className="flex items-center gap-2">
              <span className={trackedMarkers.current.has(threshold) ? '🟢' : '⚪'} />
              <span className={trackedMarkers.current.has(threshold) ? 'text-green-400' : ''}>
                {threshold}%
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-white/20 text-gray-400">
          <div>Page Height: {typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0}px</div>
          <div>Viewport: {typeof window !== 'undefined' ? window.innerHeight : 0}px</div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Hook for manual scroll tracking
 */
export function useManualScrollTracking() {
  const [scrollData, setScrollData] = useState({
    percentage: 0,
    pixels: 0,
    direction: 'down' as 'up' | 'down',
    velocity: 0,
  });

  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollableHeight = docHeight - winHeight;

        const percentage = scrollableHeight > 0
          ? Math.round((scrollTop / scrollableHeight) * 100)
          : 0;

        const currentTime = Date.now();
        const timeDiff = currentTime - lastScrollTime.current;
        const scrollDiff = Math.abs(scrollTop - lastScrollTop.current);
        const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;

        setScrollData({
          percentage: Math.min(100, Math.max(0, percentage)),
          pixels: scrollTop,
          direction: scrollTop > lastScrollTop.current ? 'down' : 'up',
          velocity: Math.round(velocity * 1000), // pixels per second
        });

        lastScrollTop.current = scrollTop;
        lastScrollTime.current = currentTime;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기값 설정

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollData;
}