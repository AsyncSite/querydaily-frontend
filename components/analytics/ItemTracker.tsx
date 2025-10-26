'use client';

import { useEffect, useRef, useState } from 'react';
import { PRODUCT_IDS } from '@/lib/analytics/event-types';

/**
 * ItemTracker Component
 *
 * Intersection Observer를 사용하여 상품이 화면에 노출될 때
 * 자동으로 view_item 이벤트를 발생시킵니다.
 *
 * @example
 * ```tsx
 * <ItemTracker
 *   itemId="growth-plan"
 *   itemName="그로스 플랜"
 *   price={29900}
 *   threshold={0.5}  // 50% 이상 보일 때 트리거
 * >
 *   <div className="product-card">...</div>
 * </ItemTracker>
 * ```
 */

interface ItemTrackerProps {
  itemId: keyof typeof PRODUCT_IDS | string;
  itemName: string;
  price?: number;
  category?: string;
  threshold?: number; // 0-1 사이, 기본값 0.5 (50%)
  minViewTime?: number; // 최소 노출 시간 (ms), 기본값 1000
  children: React.ReactNode;
  index?: number; // 목록 내 순서
}

export default function ItemTracker({
  itemId,
  itemName,
  price,
  category = 'subscription',
  threshold = 0.5,
  minViewTime = 1000,
  children,
  index
}: ItemTrackerProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const viewStartTime = useRef<number | null>(null);
  const viewTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!itemRef.current || hasBeenViewed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // 노출 시작
            if (!viewStartTime.current) {
              viewStartTime.current = Date.now();

              // 최소 시간 후 이벤트 발생
              viewTimer.current = setTimeout(() => {
                if (!hasBeenViewed && window.gtag) {
                  const viewDuration = Date.now() - (viewStartTime.current || Date.now());

                  window.gtag('event', 'view_item', {
                    item_id: itemId,
                    item_name: itemName,
                    item_category: category,
                    price: price,
                    currency: 'KRW',
                    view_duration: Math.round(viewDuration / 1000),
                    view_percentage: Math.round(entry.intersectionRatio * 100),
                    index: index
                  });

                  setHasBeenViewed(true);

                  // 디버그 로그
                  if (process.env.NODE_ENV === 'development') {
                    console.log('👁️ Item Viewed:', {
                      itemId,
                      itemName,
                      price,
                      viewDuration: Math.round(viewDuration / 1000) + 's'
                    });
                  }
                }
              }, minViewTime);
            }
          } else {
            // 노출 종료
            if (viewTimer.current) {
              clearTimeout(viewTimer.current);
              viewTimer.current = null;
            }
            viewStartTime.current = null;
          }
        });
      },
      {
        threshold: [threshold], // 지정된 임계값에서만 트리거
        rootMargin: '0px'
      }
    );

    observer.observe(itemRef.current);

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
      if (viewTimer.current) {
        clearTimeout(viewTimer.current);
      }
    };
  }, [itemId, itemName, price, category, threshold, minViewTime, hasBeenViewed, index]);

  return (
    <div ref={itemRef} data-item-id={itemId} data-item-tracking="true">
      {children}
    </div>
  );
}

/**
 * ItemListTracker Component
 *
 * 여러 상품을 한번에 추적할 때 사용합니다.
 */
interface ItemListTrackerProps {
  listName: string;
  listId?: string;
  children: React.ReactNode;
}

export function ItemListTracker({
  listName,
  listId,
  children
}: ItemListTrackerProps) {
  useEffect(() => {
    // 리스트 노출 이벤트
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'view_item_list', {
        item_list_name: listName,
        item_list_id: listId
      });
    }
  }, [listName, listId]);

  return (
    <div data-item-list={listName} data-list-id={listId}>
      {children}
    </div>
  );
}

/**
 * Hook for manual item view tracking
 */
export function useItemTracking() {
  const trackItemView = (
    itemId: string,
    itemName: string,
    price?: number,
    additionalParams?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'view_item', {
        item_id: itemId,
        item_name: itemName,
        item_category: 'subscription',
        price: price,
        currency: 'KRW',
        ...additionalParams
      });
    }
  };

  const trackItemClick = (
    itemId: string,
    itemName: string,
    price?: number,
    additionalParams?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'select_item', {
        item_id: itemId,
        item_name: itemName,
        item_category: 'subscription',
        price: price,
        currency: 'KRW',
        ...additionalParams
      });
    }
  };

  return { trackItemView, trackItemClick };
}

/**
 * Product visibility tracker using performance observer
 */
export function useProductVisibility() {
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(new Set());
  const [productMetrics, setProductMetrics] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const products = document.querySelectorAll('[data-product-id]');
    if (products.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const productId = (entry.target as HTMLElement).dataset.productId;
          if (!productId) return;

          if (entry.isIntersecting) {
            setVisibleProducts(prev => new Set([...prev, productId]));

            // 노출 시간 측정 시작
            if (!productMetrics.has(productId)) {
              setProductMetrics(prev => new Map([...prev, [productId, Date.now()]]));
            }
          } else {
            // 노출 종료 시 시간 계산
            const startTime = productMetrics.get(productId);
            if (startTime) {
              const viewTime = Date.now() - startTime;
              console.log(`Product ${productId} viewed for ${Math.round(viewTime / 1000)}s`);
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '0px'
      }
    );

    products.forEach(product => observer.observe(product));

    return () => {
      products.forEach(product => observer.unobserve(product));
    };
  }, [productMetrics]);

  return { visibleProducts, productMetrics };
}