'use client';

/**
 * Landing Page Analytics Hook
 * Centralizes all GA tracking logic for the landing page
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  trackPageView,
  trackCTAClick,
  trackBeginCheckout,
  trackAddPaymentInfo,
  trackFormStart,
  trackFormField,
  trackFileUpload,
  trackModalClose,
  getScrollPercentage,
  type CTALocation,
  type ProductId,
  type TriggerLocation,
} from '@/lib/analytics';
import { EngagementTracker } from '@/components/analytics';

const PAGE_TYPE = 'landing' as const;

/**
 * Main hook for landing page analytics
 */
export function useLandingAnalytics() {
  const hasTrackedPageView = useRef(false);
  const checkoutStartTime = useRef<number | null>(null);

  // Track page view on mount
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      trackPageView({ pageType: PAGE_TYPE });
    }
  }, []);

  // CTA Click tracking
  const trackCTA = useCallback((ctaLocation: CTALocation, ctaText?: string) => {
    trackCTAClick({
      ctaLocation,
      ctaText,
      scrollDepthAtClick: getScrollPercentage(),
      pageType: PAGE_TYPE,
    });
  }, []);

  // Hero CTA clicks
  const trackHeroPrimaryCTA = useCallback(() => {
    trackCTA('landing_hero_primary', '내 이력서로 합격 시그널 받기');
  }, [trackCTA]);

  const trackHeroSecondaryCTA = useCallback(() => {
    trackCTA('landing_hero_secondary');
  }, [trackCTA]);

  // Fixed header CTA
  const trackFixedHeaderCTA = useCallback(() => {
    trackCTA('landing_fixed_header', '지금 시작하기');
  }, [trackCTA]);

  // Product CTAs
  const trackProductCTA = useCallback((productId: ProductId) => {
    const ctaLocation: CTALocation = productId === 'critical-hit'
      ? 'landing_product_critical_hit'
      : 'landing_product_growth_plan';
    trackCTA(ctaLocation, '구매하기');
  }, [trackCTA]);

  // Bridge CTA
  const trackBridgeCTA = useCallback(() => {
    trackCTA('landing_bridge_cta', '연습 시작하기');
  }, [trackCTA]);

  // Final CTA
  const trackFinalCTA = useCallback(() => {
    trackCTA('landing_final_cta');
  }, [trackCTA]);

  // Purchase modal open (begin_checkout)
  const trackCheckoutStart = useCallback((productId: ProductId, price: number, triggerLocation: TriggerLocation = 'hero') => {
    checkoutStartTime.current = Date.now();

    const productNames: Record<ProductId, string> = {
      'growth-plan': '그로스 플랜',
      'critical-hit': '크리티컬 히트',
    };

    trackBeginCheckout({
      productId,
      productName: productNames[productId],
      price,
      triggerLocation,
      pageType: PAGE_TYPE,
    });
  }, []);

  // Payment method selection
  const trackPaymentMethodSelect = useCallback((productId: ProductId, price: number, paymentType: 'card' | 'bank') => {
    const productNames: Record<ProductId, string> = {
      'growth-plan': '그로스 플랜',
      'critical-hit': '크리티컬 히트',
    };

    trackAddPaymentInfo({
      productId,
      productName: productNames[productId],
      price,
      paymentType,
    });
  }, []);

  // Form tracking
  const trackFormStarted = useCallback((productId?: ProductId) => {
    trackFormStart({
      formName: 'purchase_form',
      totalSteps: 3,
      pageType: PAGE_TYPE,
      productId,
    });
  }, []);

  const trackField = useCallback((fieldName: string, isCompleted: boolean, productId?: ProductId) => {
    trackFormField({
      formName: 'purchase_form',
      fieldName,
      isCompleted,
      pageType: PAGE_TYPE,
      productId,
    });
  }, []);

  // File upload tracking
  const trackResumeUpload = useCallback((success: boolean, fileSize?: number, productId?: ProductId) => {
    trackFileUpload({
      success,
      fileSize,
      fileType: 'resume',
      pageType: PAGE_TYPE,
      productId,
    });
  }, []);

  // Modal close tracking
  const trackPurchaseModalClose = useCallback((stepAtClose: number, productId?: ProductId) => {
    trackModalClose({
      stepAtClose,
      reason: 'user_close',
      pageType: PAGE_TYPE,
      productId,
    });
  }, []);

  return {
    // CTA tracking
    trackHeroPrimaryCTA,
    trackHeroSecondaryCTA,
    trackFixedHeaderCTA,
    trackProductCTA,
    trackBridgeCTA,
    trackFinalCTA,
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
  };
}

export default useLandingAnalytics;
