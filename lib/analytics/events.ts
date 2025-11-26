/**
 * GA4 Event Helper Functions
 * Pre-configured event functions for common tracking scenarios
 */

import { trackEvent, gaTracker } from './tracker';
import {
  LANDING_SECTIONS,
  PRODUCT_DETAIL_SECTIONS,
  type PageType,
  type ProductId,
  type SectionName,
  type CTALocation,
  type TriggerLocation,
  type GA4Item,
  type ReferrerType,
} from './types';

// ============================================
// Page View Events
// ============================================

export function trackPageView(params: {
  pageType: PageType;
  productId?: ProductId;
  productName?: string;
  price?: number;
}): void {
  const { pageType, productId, productName, price } = params;

  trackEvent('page_view', {
    page_type: pageType,
    product_id: productId,
    page_title: productName,
    referrer_type: gaTracker.getSession()?.referrer_type,
  });

  // Increment page views in session
  gaTracker.incrementPageViews();

  // For product detail pages, also send view_item
  if (pageType === 'product_detail' && productId && price) {
    trackViewItem({
      productId,
      productName: productName || productId,
      price,
    });
  }
}

// ============================================
// Ecommerce Events (GA4 Standard)
// ============================================

export function trackViewItem(params: {
  productId: ProductId;
  productName: string;
  price: number;
}): void {
  const { productId, productName, price } = params;

  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    price,
    currency: 'KRW',
    quantity: 1,
  };

  trackEvent('view_item', {
    currency: 'KRW',
    value: price,
    items: [item],
    referrer_type: gaTracker.getSession()?.referrer_type,
  });
}

export function trackBeginCheckout(params: {
  productId: ProductId;
  productName: string;
  price: number;
  triggerLocation: TriggerLocation;
  pageType: PageType;
}): void {
  const { productId, productName, price, triggerLocation, pageType } = params;

  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    price,
    currency: 'KRW',
    quantity: 1,
  };

  trackEvent('begin_checkout', {
    currency: 'KRW',
    value: price,
    items: [item],
    trigger_location: triggerLocation,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackAddPaymentInfo(params: {
  productId: ProductId;
  productName: string;
  price: number;
  paymentType: 'card' | 'bank';
}): void {
  const { productId, productName, price, paymentType } = params;

  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    price,
    currency: 'KRW',
    quantity: 1,
  };

  trackEvent('add_payment_info', {
    currency: 'KRW',
    value: price,
    payment_type: paymentType,
    items: [item],
    product_id: productId,
  });
}

export function trackPurchase(params: {
  transactionId: string;
  productId: ProductId;
  productName: string;
  price: number;
  paymentMethod: 'card' | 'bank';
  purchaseSource: 'landing' | 'product_detail';
}): void {
  const { transactionId, productId, productName, price, paymentMethod, purchaseSource } = params;

  const session = gaTracker.getSession();
  const timeToPurchase = session
    ? Math.round((Date.now() - session.entry_time) / 1000)
    : undefined;

  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    price,
    currency: 'KRW',
    quantity: 1,
  };

  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: 'KRW',
    value: price,
    items: [item],
    payment_method: paymentMethod,
    purchase_source: purchaseSource,
    entry_page: session?.entry_page,
    pages_viewed_before_purchase: session?.pages_viewed,
    time_to_purchase: timeToPurchase,
    product_id: productId,
  });
}

// ============================================
// Scroll & Section Events
// ============================================

export function trackScrollDepth(params: {
  percentage: 25 | 50 | 75 | 100;
  timeToScroll: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { percentage, timeToScroll, pageType, productId } = params;

  trackEvent('scroll_depth', {
    percentage,
    time_to_scroll: timeToScroll,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackSectionView(params: {
  sectionName: SectionName;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { sectionName, pageType, productId } = params;

  // Get section order based on page type
  let sectionOrder: number;
  if (pageType === 'landing' && sectionName in LANDING_SECTIONS) {
    sectionOrder = LANDING_SECTIONS[sectionName as keyof typeof LANDING_SECTIONS];
  } else if (pageType === 'product_detail' && sectionName in PRODUCT_DETAIL_SECTIONS) {
    sectionOrder = PRODUCT_DETAIL_SECTIONS[sectionName as keyof typeof PRODUCT_DETAIL_SECTIONS];
  } else {
    sectionOrder = 0;
  }

  trackEvent('section_view', {
    section_name: sectionName,
    section_order: sectionOrder,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackSectionEngagement(params: {
  sectionName: SectionName;
  timeInSection: number;
  maxVisibility: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { sectionName, timeInSection, maxVisibility, pageType, productId } = params;

  trackEvent('section_engagement', {
    section_name: sectionName,
    time_in_section: Math.round(timeInSection),
    max_visibility: Math.round(maxVisibility),
    page_type: pageType,
    product_id: productId,
  });
}

// ============================================
// CTA Events
// ============================================

export function trackCTAClick(params: {
  ctaLocation: CTALocation;
  ctaText?: string;
  scrollDepthAtClick?: number;
  pageType: PageType;
  productId?: ProductId;
  price?: number;
}): void {
  const { ctaLocation, ctaText, scrollDepthAtClick, pageType, productId, price } = params;

  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
    scroll_depth_at_click: scrollDepthAtClick,
    page_type: pageType,
    product_id: productId,
    price,
  });
}

// ============================================
// Form Events
// ============================================

export function trackFormStart(params: {
  formName: string;
  totalSteps?: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { formName, totalSteps, pageType, productId } = params;

  trackEvent('form_start', {
    form_name: formName,
    total_steps: totalSteps,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackFormField(params: {
  formName: string;
  fieldName: string;
  isCompleted: boolean;
  timeOnField?: number;
  stepNumber?: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { formName, fieldName, isCompleted, timeOnField, stepNumber, pageType, productId } = params;

  trackEvent('form_field', {
    form_name: formName,
    field_name: fieldName,
    is_completed: isCompleted,
    time_on_field: timeOnField ? Math.round(timeOnField) : undefined,
    step_number: stepNumber,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackFormAbandon(params: {
  formName: string;
  abandonedAtField: string;
  completionRate: number;
  timeSpent?: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { formName, abandonedAtField, completionRate, timeSpent, pageType, productId } = params;

  trackEvent('form_abandon', {
    form_name: formName,
    abandoned_at_field: abandonedAtField,
    completion_rate: Math.round(completionRate),
    time_spent: timeSpent ? Math.round(timeSpent) : undefined,
    page_type: pageType,
    product_id: productId,
  });
}

export function trackFormSubmit(params: {
  formName: string;
  completionTime: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { formName, completionTime, pageType, productId } = params;

  trackEvent('form_submit', {
    form_name: formName,
    form_completion_time: Math.round(completionTime),
    page_type: pageType,
    product_id: productId,
  });
}

// ============================================
// File Upload Events
// ============================================

export function trackFileUpload(params: {
  success: boolean;
  fileSize?: number;
  uploadDuration?: number;
  fileType?: string;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { success, fileSize, uploadDuration, fileType, pageType, productId } = params;

  trackEvent('file_upload', {
    success,
    file_size: fileSize,
    upload_duration: uploadDuration ? Math.round(uploadDuration) : undefined,
    file_type: fileType,
    page_type: pageType,
    product_id: productId,
  });
}

// ============================================
// Modal Events
// ============================================

export function trackModalClose(params: {
  stepAtClose?: number;
  reason?: 'user_close' | 'outside_click' | 'navigation';
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { stepAtClose, reason, pageType, productId } = params;

  trackEvent('modal_close', {
    step_at_close: stepAtClose,
    reason,
    page_type: pageType,
    product_id: productId,
  });
}

// ============================================
// User Engagement Events
// ============================================

export function trackUserEngaged(params: {
  timeToEngage: number;
  pauseCount?: number;
  pageType: PageType;
  productId?: ProductId;
}): void {
  const { timeToEngage, pauseCount, pageType, productId } = params;

  trackEvent('user_engaged', {
    time_to_engage: Math.round(timeToEngage),
    pause_count: pauseCount,
    page_type: pageType,
    product_id: productId,
  });
}
