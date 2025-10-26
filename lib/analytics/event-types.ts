/**
 * Google Analytics 이벤트 타입 정의
 *
 * 6개 핵심 카테고리의 이벤트 타입과 파라미터를 정의합니다.
 * 모든 이벤트는 타입 안전성이 보장되며, 일관된 네이밍 규칙을 따릅니다.
 */

// ============================================
// 이벤트 이름 상수
// ============================================

export const GA_EVENTS = {
  // 1. 스크롤 깊이 (콘텐츠 참여도)
  SCROLL_DEPTH: 'scroll_depth',

  // 2. CTA 클릭 (전환 유도 효과)
  CLICK_CTA: 'click_cta',

  // 3. 폼 필드 상호작용 (이탈 지점 파악)
  FORM_FIELD_INTERACTION: 'form_field_interaction',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',

  // 4. 상품 조회 (상품 관심도)
  VIEW_ITEM: 'view_item',
  VIEW_ITEM_LIST: 'view_item_list',

  // 5. 섹션 조회 (섹션별 효과)
  VIEW_SECTION: 'view_section',

  // 6. 에러 (시스템 오류)
  ERROR: 'error',

  // 기존 이벤트 (호환성 유지)
  PAGE_VIEW: 'page_view',
  SIGN_UP: 'sign_up',
  BEGIN_APPLICATION: 'begin_application',
  FILE_UPLOAD: 'file_upload',
  EXTERNAL_LINK: 'click',

  // 구매 관련 이벤트
  BEGIN_CHECKOUT: 'begin_checkout',
  ADD_PAYMENT_INFO: 'add_payment_info',
  PURCHASE: 'purchase',
} as const;

// ============================================
// 이벤트 카테고리 상수
// ============================================

export const GA_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  FORM: 'form',
  ECOMMERCE: 'ecommerce',
  ERROR: 'error',
  NAVIGATION: 'navigation',
  CONTENT: 'content',
} as const;

// ============================================
// 파라미터 인터페이스
// ============================================

/**
 * 기본 이벤트 파라미터
 */
interface BaseEventParams {
  event_timestamp?: number;
  environment?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  page_path?: string;
  page_title?: string;
}

/**
 * 1. 스크롤 깊이 이벤트 파라미터
 */
export interface ScrollDepthParams extends BaseEventParams {
  percentage: 25 | 50 | 75 | 100;
  time_to_scroll?: number; // 스크롤까지 걸린 시간 (초)
  page_section?: string; // 현재 보고 있는 섹션
  viewport_height?: number;
}

/**
 * 2. CTA 클릭 이벤트 파라미터
 */
export interface CTAClickParams extends BaseEventParams {
  cta_text: string; // 버튼 텍스트
  cta_location: string; // 버튼 위치 (hero, product, floating 등)
  cta_variant?: string; // A/B 테스트 변형
  scroll_depth_at_click?: number; // 클릭 시점의 스크롤 깊이
  cta_index?: number; // 동일 페이지 내 CTA 순서
}

/**
 * 3. 폼 필드 상호작용 파라미터
 */
export interface FormFieldInteractionParams extends BaseEventParams {
  form_name: string; // 폼 이름 (beta_signup, purchase 등)
  field_name: string; // 필드 이름
  interaction_type: 'focus' | 'blur' | 'change' | 'complete' | 'error';
  step_number?: number; // 멀티스텝 폼의 현재 단계
  time_on_field?: number; // 필드에 머문 시간 (초)
  is_completed?: boolean;
  error_message?: string;
  focus_count?: number; // 필드 포커스 횟수
}

/**
 * 폼 시작 파라미터
 */
export interface FormStartParams extends BaseEventParams {
  form_name: string; // 폼 이름 (beta_signup, purchase 등)
  step_number?: number; // 멀티스텝 폼의 시작 단계
}

/**
 * 폼 제출 파라미터
 */
export interface FormSubmitParams extends BaseEventParams {
  form_name: string; // 폼 이름
  success: boolean; // 제출 성공 여부
  step_number?: number; // 멀티스텝 폼의 최종 단계
  submission_time?: number; // 폼 작성 시간 (초)
}

/**
 * 4. 상품 조회 파라미터
 */
export interface ViewItemParams extends BaseEventParams {
  item_id: string; // 상품 ID (starter, growth, pro 등)
  item_name: string; // 상품명
  item_category?: string; // 카테고리 (subscription)
  price?: number; // 가격 (숫자 타입 필수!)
  currency?: string; // 통화 (KRW)
  view_duration?: number; // 노출 시간 (초)
  view_percentage?: number; // 화면 노출 비율
  item_list_name?: string; // 상품 목록 이름
  item_list_id?: string;
  index?: number; // 목록 내 순서
}

/**
 * 5. 섹션 조회 파라미터
 */
export interface ViewSectionParams extends BaseEventParams {
  section_name: string; // 섹션 이름
  section_order?: number; // 섹션 순서
  view_percentage?: number; // 섹션 내 스크롤 비율
  time_in_section?: number; // 섹션 체류 시간 (초)
  section_id?: string; // 섹션 DOM ID
  is_visible?: boolean; // 현재 화면에 보이는지
}

/**
 * 6. 에러 이벤트 파라미터
 */
export interface ErrorParams extends BaseEventParams {
  error_type: 'api' | 'validation' | 'upload' | 'payment' | 'network' | 'javascript' | 'unknown';
  error_message: string;
  error_code?: string | number;
  error_location?: string; // 에러 발생 위치 (컴포넌트, 함수 등)
  error_stack?: string; // 스택 트레이스 (개발 환경에서만)
  user_action?: string; // 사용자가 시도한 액션
  api_endpoint?: string; // API 에러인 경우 엔드포인트
  http_status?: number; // HTTP 상태 코드
}

/**
 * 기존 이벤트 파라미터 (하위 호환)
 */
export interface SignUpParams extends BaseEventParams {
  method?: string;
  user_type?: string;
  step?: number;
}

export interface FileUploadParams extends BaseEventParams {
  file_size?: number; // KB 단위
  file_type?: string;
  upload_duration?: number; // 초
  success?: boolean;
}

export interface ExternalLinkParams extends BaseEventParams {
  link_url: string;
  link_text?: string;
  link_domain?: string;
  outbound?: boolean;
}

/**
 * 구매 관련 파라미터
 */
export interface BeginCheckoutParams extends BaseEventParams {
  value?: number; // 총 금액
  currency?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
  coupon?: string;
}

export interface PurchaseParams extends BeginCheckoutParams {
  transaction_id: string;
  tax?: number;
  shipping?: number;
  payment_method?: string;
}

// ============================================
// 타입 맵핑
// ============================================

/**
 * 이벤트 이름과 파라미터 타입 매핑
 */
export interface GAEventMap {
  [GA_EVENTS.SCROLL_DEPTH]: ScrollDepthParams;
  [GA_EVENTS.CLICK_CTA]: CTAClickParams;
  [GA_EVENTS.FORM_FIELD_INTERACTION]: FormFieldInteractionParams;
  [GA_EVENTS.FORM_START]: FormStartParams;
  [GA_EVENTS.FORM_SUBMIT]: FormSubmitParams;
  [GA_EVENTS.VIEW_ITEM]: ViewItemParams;
  [GA_EVENTS.VIEW_SECTION]: ViewSectionParams;
  [GA_EVENTS.ERROR]: ErrorParams;
  [GA_EVENTS.SIGN_UP]: SignUpParams;
  [GA_EVENTS.FILE_UPLOAD]: FileUploadParams;
  [GA_EVENTS.EXTERNAL_LINK]: ExternalLinkParams;
  [GA_EVENTS.BEGIN_CHECKOUT]: BeginCheckoutParams;
  [GA_EVENTS.PURCHASE]: PurchaseParams;
}

/**
 * 타입 안전 이벤트 트래킹 함수 시그니처
 */
export type TypedTrackEvent = <T extends keyof GAEventMap>(
  eventName: T,
  params: GAEventMap[T]
) => void;

// ============================================
// 헬퍼 타입 및 유틸리티
// ============================================

/**
 * 이벤트 이름 타입
 */
export type GAEventName = typeof GA_EVENTS[keyof typeof GA_EVENTS];

/**
 * 이벤트 카테고리 타입
 */
export type GAEventCategory = typeof GA_CATEGORIES[keyof typeof GA_CATEGORIES];

/**
 * 스크롤 깊이 임계값
 */
export const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
export type ScrollThreshold = typeof SCROLL_THRESHOLDS[number];

/**
 * 폼 이름 상수
 */
export const FORM_NAMES = {
  BETA_SIGNUP: 'beta_signup',
  PURCHASE: 'purchase',
  CONTACT: 'contact',
  NEWSLETTER: 'newsletter',
} as const;

/**
 * CTA 위치 상수
 */
export const CTA_LOCATIONS = {
  HERO: 'hero',
  PRODUCT: 'product',
  FLOATING: 'floating',
  FOOTER: 'footer',
  HEADER: 'header',
  MODAL: 'modal',
  INLINE: 'inline',
} as const;

/**
 * 섹션 이름 상수
 */
export const SECTION_NAMES = {
  HERO: 'hero',
  PROBLEM: 'problem',
  WHY: 'why',
  PRODUCTS: 'products',
  HOW_IT_WORKS: 'how_it_works',
  QUESTION_TYPES: 'question_types',
  WHO_WE_ARE: 'who_we_are',
  PRIVACY: 'privacy',
  FAQ: 'faq',
  FOOTER: 'footer',
} as const;

/**
 * 상품 ID 상수
 */
export const PRODUCT_IDS = {
  FREE_TRIAL: 'free_trial',
  STARTER: 'starter',
  GROWTH: 'growth',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

// ============================================
// 유효성 검증 함수
// ============================================

/**
 * 이벤트 파라미터 유효성 검증
 */
export function validateEventParams<T extends keyof GAEventMap>(
  eventName: T,
  params: any
): params is GAEventMap[T] {
  switch (eventName) {
    case GA_EVENTS.SCROLL_DEPTH:
      return (
        typeof params.percentage === 'number' &&
        SCROLL_THRESHOLDS.includes(params.percentage)
      );

    case GA_EVENTS.CLICK_CTA:
      return (
        typeof params.cta_text === 'string' &&
        typeof params.cta_location === 'string'
      );

    case GA_EVENTS.FORM_FIELD_INTERACTION:
      return (
        typeof params.form_name === 'string' &&
        typeof params.field_name === 'string' &&
        typeof params.interaction_type === 'string'
      );

    case GA_EVENTS.VIEW_ITEM:
      return (
        typeof params.item_id === 'string' &&
        typeof params.item_name === 'string' &&
        (params.price === undefined || typeof params.price === 'number')
      );

    case GA_EVENTS.VIEW_SECTION:
      return typeof params.section_name === 'string';

    case GA_EVENTS.ERROR:
      return (
        typeof params.error_type === 'string' &&
        typeof params.error_message === 'string'
      );

    default:
      return true;
  }
}

/**
 * 가격 필드 정제 (숫자 타입 보장)
 */
export function sanitizePrice(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

// ============================================
// Export
// ============================================

export default {
  EVENTS: GA_EVENTS,
  CATEGORIES: GA_CATEGORIES,
  SCROLL_THRESHOLDS,
  FORM_NAMES,
  CTA_LOCATIONS,
  SECTION_NAMES,
  PRODUCT_IDS,
  validateEventParams,
  sanitizePrice,
};