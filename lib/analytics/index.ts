/**
 * GA4 Analytics - Main Export
 * QueryDaily Service
 */

// Configuration
export { GA_MEASUREMENT_ID, GA_CONFIG, isGAEnabled, PRODUCTS } from './config';

// Types
export type {
  PageType,
  PurchaseSource,
  ReferrerType,
  ProductId,
  SectionName,
  LandingSectionName,
  ProductDetailSectionName,
  CTALocation,
  TriggerLocation,
  GA4Item,
  AnalyticsSession,
  AnalyticsContext,
  GAConfig,
  GAEventName,
  GAEventParams,
} from './types';

export {
  LANDING_SECTIONS,
  PRODUCT_DETAIL_SECTIONS,
  CTA_LOCATIONS,
} from './types';

// Core tracker
export { gaTracker, trackEvent } from './tracker';

// Event helpers
export {
  trackPageView,
  trackViewItem,
  trackBeginCheckout,
  trackAddPaymentInfo,
  trackPurchase,
  trackScrollDepth,
  trackSectionView,
  trackSectionEngagement,
  trackCTAClick,
  trackFormStart,
  trackFormField,
  trackFormAbandon,
  trackFormSubmit,
  trackFileUpload,
  trackModalClose,
  trackUserEngaged,
} from './events';

// Ecommerce
export {
  getProductInfo,
  createGA4Item,
  trackViewItemEvent,
  trackBeginCheckoutEvent,
  trackAddPaymentInfoEvent,
  trackPurchaseEvent,
  createEcommerceContext,
  getCheckoutDuration,
} from './ecommerce';

// SSR utilities
export {
  isBrowser,
  isGtagAvailable,
  safelyRunInBrowser,
  getScrollPercentage,
  getViewportHeight,
  getDocumentHeight,
  getPathname,
  getReferrer,
  getSearchParams,
  getUTMParams,
  safeSessionStorage,
  safeLocalStorage,
} from './ssr-safe';

// Error tracking
export {
  trackError,
  trackRuntimeError,
  trackUnhandledRejection,
  trackAPIError,
  trackValidationError,
  trackUploadError,
  trackPaymentError,
  initGlobalErrorHandlers,
  createErrorBoundaryReporter,
} from './errors';

// Performance utilities
export {
  getEventBatcher,
  debounce,
  throttle,
  requestIdleCallback,
  cancelIdleCallback,
  measureTime,
  measureTimeAsync,
  onPageUnload,
} from './performance';
