'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, ProductInfo, ProductCode } from '@/lib/api';

interface ProductPrices {
  [key: string]: ProductInfo;
}

interface UseProductPricesReturn {
  products: ProductPrices;
  isLoading: boolean;
  error: string | null;
  getPrice: (productCode: string) => { basePrice: number; currentPrice: number; discountPercent: number } | null;
  formatPrice: (price: number) => string;
  refetch: () => Promise<void>;
}

// 전역 캐시 (SSR에서는 사용하지 않음)
let cachedProducts: ProductPrices | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

/**
 * 상품 가격 정보를 가져오는 hook
 *
 * 사용 예시:
 * const { getPrice, formatPrice, isLoading } = useProductPrices();
 * const price = getPrice('CRITICAL_HIT');
 * console.log(formatPrice(price?.currentPrice || 0)); // "9,900"
 */
export function useProductPrices(): UseProductPricesReturn {
  const [products, setProducts] = useState<ProductPrices>(cachedProducts || {});
  const [isLoading, setIsLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    // 캐시가 유효하면 사용
    const now = Date.now();
    if (cachedProducts && now - cacheTime < CACHE_DURATION) {
      setProducts(cachedProducts);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllProducts();

      if (response.success && response.data?.products) {
        const productMap: ProductPrices = {};
        response.data.products.forEach(product => {
          productMap[product.productCode] = product;
        });

        // 캐시 업데이트
        cachedProducts = productMap;
        cacheTime = now;

        setProducts(productMap);
      } else {
        setError('상품 정보를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('상품 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getPrice = useCallback((productCode: string) => {
    const product = products[productCode];
    if (!product) return null;

    return {
      basePrice: product.basePrice,
      currentPrice: product.currentPrice,
      discountPercent: product.discountPercent,
    };
  }, [products]);

  const formatPrice = useCallback((price: number): string => {
    return price.toLocaleString('ko-KR');
  }, []);

  return {
    products,
    isLoading,
    error,
    getPrice,
    formatPrice,
    refetch: fetchProducts,
  };
}

/**
 * 특정 상품의 가격만 가져오는 hook
 */
export function useProductPrice(productCode: ProductCode | string) {
  const { getPrice, formatPrice, isLoading, error } = useProductPrices();
  const price = getPrice(productCode);

  return {
    basePrice: price?.basePrice || 0,
    currentPrice: price?.currentPrice || 0,
    discountPercent: price?.discountPercent || 0,
    formattedBasePrice: formatPrice(price?.basePrice || 0),
    formattedCurrentPrice: formatPrice(price?.currentPrice || 0),
    isLoading,
    error,
  };
}

// 기본 가격 (API 실패 시 fallback) - 할인율은 버림 처리
export const DEFAULT_PRICES: Record<string, { basePrice: number; currentPrice: number; discountPercent: number }> = {
  CRITICAL_HIT: { basePrice: 15900, currentPrice: 9900, discountPercent: 37 },
  GROWTH_PLAN: { basePrice: 106000, currentPrice: 49000, discountPercent: 53 },
  REAL_INTERVIEW: { basePrice: 179000, currentPrice: 129000, discountPercent: 27 },
  LAST_CHECK: { basePrice: 49000, currentPrice: 49000, discountPercent: 0 },
  RESUME_FIT: { basePrice: 59000, currentPrice: 59000, discountPercent: 0 },
  TRIAL: { basePrice: 0, currentPrice: 0, discountPercent: 0 },
};

/**
 * 가격을 안전하게 가져오는 hook (fallback 포함)
 */
export function useSafeProductPrice(productCode: ProductCode | string) {
  const { basePrice, currentPrice, discountPercent, isLoading, error } = useProductPrice(productCode);
  const fallback = DEFAULT_PRICES[productCode] || { basePrice: 0, currentPrice: 0, discountPercent: 0 };

  return {
    basePrice: basePrice || fallback.basePrice,
    currentPrice: currentPrice || fallback.currentPrice,
    discountPercent: discountPercent || fallback.discountPercent,
    formattedBasePrice: (basePrice || fallback.basePrice).toLocaleString('ko-KR'),
    formattedCurrentPrice: (currentPrice || fallback.currentPrice).toLocaleString('ko-KR'),
    isLoading,
    error,
    isFallback: !basePrice && !isLoading,
  };
}
