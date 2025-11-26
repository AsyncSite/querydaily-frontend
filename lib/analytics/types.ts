/**
 * GA4 Analytics Type Definitions
 * QueryDaily Service - Complete GA Redesign
 */

// ============================================
// Page & Section Types
// ============================================

export type PageType = 'landing' | 'product_detail' | 'order_complete' | 'other';

export type PurchaseSource = 'landing' | 'product_detail';

export type ReferrerType = 'landing' | 'direct' | 'external';

// Landing page sections
export const LANDING_SECTIONS = {
  hero: 1,
  problem: 2,
  statistics: 3,
  customer_concerns: 4,
  prep_rate_chart: 5,
  testimonials: 6,
  products: 7,
  comparison: 8,
  who_we_are: 9,
  faq: 10,
  final_cta: 11,
  footer: 12,
} as const;

export type LandingSectionName = keyof typeof LANDING_SECTIONS;

// Product detail page sections
export const PRODUCT_DETAIL_SECTIONS = {
  product_hero: 1,
  product_features: 2,
  product_how_it_works: 3,
  product_email_example_question: 4,
  product_email_example_answer: 5,
  product_curriculum: 6,
  product_detailed_description: 7,
  product_footer_cta: 8,
} as const;

export type ProductDetailSectionName = keyof typeof PRODUCT_DETAIL_SECTIONS;

export type SectionName = LandingSectionName | ProductDetailSectionName;

// ============================================
// CTA Types
// ============================================

export const CTA_LOCATIONS = {
  // Landing page CTAs
  landing_hero_primary: 'landing_hero_primary',
  landing_hero_secondary: 'landing_hero_secondary',
  landing_fixed_header: 'landing_fixed_header',
  landing_product_critical_hit: 'landing_product_critical_hit',
  landing_product_growth_plan: 'landing_product_growth_plan',
  landing_bridge_cta: 'landing_bridge_cta',
  landing_final_cta: 'landing_final_cta',

  // Product detail page CTAs
  product_detail_fixed_cta: 'product_detail_fixed_cta',
  product_detail_hero_cta: 'product_detail_hero_cta',
  product_detail_footer_cta: 'product_detail_footer_cta',
} as const;

export type CTALocation = keyof typeof CTA_LOCATIONS;

export type TriggerLocation = 'fixed' | 'hero' | 'footer';

// ============================================
// Product Types
// ============================================

export type ProductId = 'growth-plan' | 'critical-hit';

export interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  currency: 'KRW';
  quantity?: number;
  item_category?: string;
}

// ============================================
// Event Parameter Types
// ============================================

export interface BaseEventParams {
  page_type?: PageType;
  product_id?: ProductId;
}

// page_view event
export interface PageViewParams extends BaseEventParams {
  page_title?: string;
  page_location?: string;
  referrer_type?: ReferrerType;
}

// view_item event (GA4 standard)
export interface ViewItemParams extends BaseEventParams {
  currency: 'KRW';
  value: number;
  items: GA4Item[];
  referrer_type?: ReferrerType;
}

// begin_checkout event (GA4 standard)
export interface BeginCheckoutParams extends BaseEventParams {
  currency: 'KRW';
  value: number;
  items: GA4Item[];
  trigger_location?: TriggerLocation;
}

// add_payment_info event (GA4 standard)
export interface AddPaymentInfoParams extends BaseEventParams {
  currency: 'KRW';
  value: number;
  payment_type: 'card' | 'bank';
  items: GA4Item[];
}

// purchase event (GA4 standard)
export interface PurchaseParams extends BaseEventParams {
  transaction_id: string;
  currency: 'KRW';
  value: number;
  items: GA4Item[];
  payment_method: 'card' | 'bank';
  purchase_source: PurchaseSource;
  entry_page?: string;
  pages_viewed_before_purchase?: number;
  time_to_purchase?: number;
}

// scroll_depth event (custom)
export interface ScrollDepthParams extends BaseEventParams {
  percentage: 25 | 50 | 75 | 100;
  time_to_scroll: number; // seconds
}

// section_view event (custom)
export interface SectionViewParams extends BaseEventParams {
  section_name: SectionName;
  section_order: number;
}

// section_engagement event (custom)
export interface SectionEngagementParams extends BaseEventParams {
  section_name: SectionName;
  time_in_section: number; // seconds
  max_visibility: number; // percentage
}

// cta_click event (custom)
export interface CTAClickParams extends BaseEventParams {
  cta_location: CTALocation;
  cta_text?: string;
  scroll_depth_at_click?: number;
  price?: number;
}

// form_start event (custom)
export interface FormStartParams extends BaseEventParams {
  form_name: string;
  total_steps?: number;
}

// form_field event (custom)
export interface FormFieldParams extends BaseEventParams {
  form_name: string;
  field_name: string;
  time_on_field?: number; // seconds
  is_completed: boolean;
  step_number?: number;
}

// form_abandon event (custom)
export interface FormAbandonParams extends BaseEventParams {
  form_name: string;
  abandoned_at_field: string;
  completion_rate: number; // percentage
  time_spent?: number; // seconds
}

// form_submit event (custom)
export interface FormSubmitParams extends BaseEventParams {
  form_name: string;
  form_completion_time: number; // seconds
}

// file_upload event (custom)
export interface FileUploadParams extends BaseEventParams {
  file_size?: number; // bytes
  success: boolean;
  upload_duration?: number; // seconds
  file_type?: string;
}

// user_engaged event (custom)
export interface UserEngagedParams extends BaseEventParams {
  time_to_engage: number; // seconds
  pause_count?: number;
}

// modal_close event (custom)
export interface ModalCloseParams extends BaseEventParams {
  step_at_close?: number;
  reason?: 'user_close' | 'outside_click' | 'navigation';
}

// ============================================
// Event Union Type
// ============================================

export type GAEventName =
  | 'page_view'
  | 'view_item'
  | 'begin_checkout'
  | 'add_payment_info'
  | 'purchase'
  | 'scroll_depth'
  | 'section_view'
  | 'section_engagement'
  | 'cta_click'
  | 'form_start'
  | 'form_field'
  | 'form_abandon'
  | 'form_submit'
  | 'file_upload'
  | 'user_engaged'
  | 'modal_close';

export type GAEventParams =
  | PageViewParams
  | ViewItemParams
  | BeginCheckoutParams
  | AddPaymentInfoParams
  | PurchaseParams
  | ScrollDepthParams
  | SectionViewParams
  | SectionEngagementParams
  | CTAClickParams
  | FormStartParams
  | FormFieldParams
  | FormAbandonParams
  | FormSubmitParams
  | FileUploadParams
  | UserEngagedParams
  | ModalCloseParams;

// ============================================
// Session & Context Types
// ============================================

export interface AnalyticsSession {
  entry_page: string;
  entry_time: number;
  pages_viewed: number;
  referrer_type: ReferrerType;
}

export interface AnalyticsContext {
  session: AnalyticsSession;
  currentPage: PageType;
  currentProduct?: ProductId;
  isDebugMode: boolean;
}

// ============================================
// Configuration Types
// ============================================

export interface GAConfig {
  measurementId: string;
  debug?: boolean;
  sendPageView?: boolean;
}
