/**
 * Enhanced Ecommerce Tracking
 * GA4 Standard Ecommerce Events Implementation
 */

import { trackEvent } from './tracker';
import { PRODUCTS } from './config';
import type {
  ProductId,
  PageType,
  TriggerLocation,
  GA4Item,
  PurchaseSource,
} from './types';

/**
 * Product price configuration
 */
const PRODUCT_PRICES: Record<ProductId, number> = {
  'growth-plan': 129000,
  'critical-hit': 79000,
};

/**
 * Get product info
 */
export function getProductInfo(productId: ProductId) {
  return {
    ...PRODUCTS[productId],
    price: PRODUCT_PRICES[productId],
  };
}

/**
 * Create GA4 item from product
 */
export function createGA4Item(productId: ProductId, price?: number): GA4Item {
  const product = PRODUCTS[productId];
  return {
    item_id: productId,
    item_name: product.name,
    price: price ?? PRODUCT_PRICES[productId],
    currency: 'KRW',
    quantity: 1,
    item_category: product.category,
  };
}

/**
 * Track view_item event
 * Sent when user views a product detail page
 */
export function trackViewItemEvent(params: {
  productId: ProductId;
  price?: number;
  referrerType?: 'landing' | 'direct' | 'external';
}): void {
  const { productId, price, referrerType } = params;
  const item = createGA4Item(productId, price);

  trackEvent('view_item', {
    currency: 'KRW',
    value: item.price,
    items: [item],
    referrer_type: referrerType,
    product_id: productId,
  });
}

/**
 * Track begin_checkout event
 * Sent when user opens purchase modal
 */
export function trackBeginCheckoutEvent(params: {
  productId: ProductId;
  price?: number;
  triggerLocation: TriggerLocation;
  pageType: PageType;
}): void {
  const { productId, price, triggerLocation, pageType } = params;
  const item = createGA4Item(productId, price);

  trackEvent('begin_checkout', {
    currency: 'KRW',
    value: item.price,
    items: [item],
    trigger_location: triggerLocation,
    page_type: pageType,
    product_id: productId,
  });
}

/**
 * Track add_payment_info event
 * Sent when user selects payment method
 */
export function trackAddPaymentInfoEvent(params: {
  productId: ProductId;
  price?: number;
  paymentType: 'card' | 'bank';
}): void {
  const { productId, price, paymentType } = params;
  const item = createGA4Item(productId, price);

  trackEvent('add_payment_info', {
    currency: 'KRW',
    value: item.price,
    payment_type: paymentType,
    items: [item],
    product_id: productId,
  });
}

/**
 * Track purchase event
 * Sent when payment is completed
 */
export function trackPurchaseEvent(params: {
  transactionId: string;
  productId: ProductId;
  price?: number;
  paymentMethod: 'card' | 'bank';
  purchaseSource: PurchaseSource;
  entryPage?: string;
  pagesViewed?: number;
  timeToPurchase?: number;
}): void {
  const {
    transactionId,
    productId,
    price,
    paymentMethod,
    purchaseSource,
    entryPage,
    pagesViewed,
    timeToPurchase,
  } = params;

  const item = createGA4Item(productId, price);

  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: 'KRW',
    value: item.price,
    items: [item],
    payment_method: paymentMethod,
    purchase_source: purchaseSource,
    entry_page: entryPage,
    pages_viewed_before_purchase: pagesViewed,
    time_to_purchase: timeToPurchase,
    product_id: productId,
  });
}

/**
 * Ecommerce tracking context for use in components
 */
export interface EcommerceContext {
  currentProduct: ProductId | null;
  currentStep: 'browse' | 'view_item' | 'checkout' | 'payment_info' | 'complete';
  purchaseSource: PurchaseSource | null;
  checkoutStartTime: number | null;
}

/**
 * Create initial ecommerce context
 */
export function createEcommerceContext(): EcommerceContext {
  return {
    currentProduct: null,
    currentStep: 'browse',
    purchaseSource: null,
    checkoutStartTime: null,
  };
}

/**
 * Calculate checkout duration in seconds
 */
export function getCheckoutDuration(startTime: number): number {
  return Math.round((Date.now() - startTime) / 1000);
}
