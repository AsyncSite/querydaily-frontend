'use client';

/**
 * Product Detail Page Analytics Hook
 * Centralizes all GA tracking logic for product detail pages
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  trackPageView,
  trackViewItem,
  trackCTAClick,
  trackBeginCheckout,
  trackAddPaymentInfo,
  trackFormStart,
  trackFormField,
  trackFileUpload,
  trackModalClose,
  getScrollPercentage,
  gaTracker,
  type CTALocation,
  type ProductId,
  type TriggerLocation,
} from '@/lib/analytics';

const PAGE_TYPE = 'product_detail' as const;

interface ProductInfo {
  id: ProductId;
  name: string;
  price: number;
}

/**
 * Main hook for product detail page analytics
 */
export function useProductDetailAnalytics(product: ProductInfo) {
  const hasTrackedPageView = useRef(false);
  const checkoutStartTime = useRef<number | null>(null);

  // Track page view and view_item on mount
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      hasTrackedPageView.current = true;

      // Get referrer type from session
      const session = gaTracker.getSession();
      const referrerType = session?.referrer_type;

      // Track page view
      trackPageView({
        pageType: PAGE_TYPE,
        productId: product.id,
        productName: product.name,
        price: product.price,
      });

      // Track view_item (GA4 Ecommerce)
      trackViewItem({
        productId: product.id,
        productName: product.name,
        price: product.price,
      });
    }
  }, [product]);

  // CTA Click tracking based on location
  const trackCTA = useCallback((triggerLocation: TriggerLocation, ctaText?: string) => {
    const ctaLocationMap: Record<TriggerLocation, CTALocation> = {
      fixed: 'product_detail_fixed_cta',
      hero: 'product_detail_hero_cta',
      footer: 'product_detail_footer_cta',
    };

    trackCTAClick({
      ctaLocation: ctaLocationMap[triggerLocation],
      ctaText,
      scrollDepthAtClick: getScrollPercentage(),
      pageType: PAGE_TYPE,
      productId: product.id,
      price: product.price,
    });
  }, [product]);

  // Fixed CTA click
  const trackFixedCTA = useCallback(() => {
    trackCTA('fixed', '구매하기');
  }, [trackCTA]);

  // Hero CTA click
  const trackHeroCTA = useCallback(() => {
    trackCTA('hero', '구매하기');
  }, [trackCTA]);

  // Footer CTA click
  const trackFooterCTA = useCallback(() => {
    trackCTA('footer', '구매하기');
  }, [trackCTA]);

  // Purchase modal open (begin_checkout)
  const trackCheckoutStart = useCallback((triggerLocation: TriggerLocation) => {
    checkoutStartTime.current = Date.now();

    trackBeginCheckout({
      productId: product.id,
      productName: product.name,
      price: product.price,
      triggerLocation,
      pageType: PAGE_TYPE,
    });
  }, [product]);

  // Payment method selection
  const trackPaymentMethodSelect = useCallback((paymentType: 'card' | 'bank') => {
    trackAddPaymentInfo({
      productId: product.id,
      productName: product.name,
      price: product.price,
      paymentType,
    });
  }, [product]);

  // Form tracking
  const trackFormStarted = useCallback(() => {
    trackFormStart({
      formName: 'purchase_form',
      totalSteps: 3,
      pageType: PAGE_TYPE,
      productId: product.id,
    });
  }, [product.id]);

  const trackField = useCallback((fieldName: string, isCompleted: boolean) => {
    trackFormField({
      formName: 'purchase_form',
      fieldName,
      isCompleted,
      pageType: PAGE_TYPE,
      productId: product.id,
    });
  }, [product.id]);

  // File upload tracking
  const trackResumeUpload = useCallback((success: boolean, fileSize?: number) => {
    trackFileUpload({
      success,
      fileSize,
      fileType: 'resume',
      pageType: PAGE_TYPE,
      productId: product.id,
    });
  }, [product.id]);

  // Modal close tracking
  const trackPurchaseModalClose = useCallback((stepAtClose: number, reason?: 'user_close' | 'outside_click') => {
    trackModalClose({
      stepAtClose,
      reason: reason || 'user_close',
      pageType: PAGE_TYPE,
      productId: product.id,
    });
  }, [product.id]);

  return {
    // CTA tracking
    trackFixedCTA,
    trackHeroCTA,
    trackFooterCTA,
    trackCTA,

    // Checkout tracking
    trackCheckoutStart,
    trackPaymentMethodSelect,

    // Form tracking
    trackFormStarted,
    trackField,
    trackResumeUpload,

    // Modal tracking
    trackPurchaseModalClose,

    // Product info
    product,
  };
}

export default useProductDetailAnalytics;
