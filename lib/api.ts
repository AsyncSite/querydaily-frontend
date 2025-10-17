const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// ============================================================================
// Enums (Backend와 동일)
// ============================================================================

export enum CareerLevel {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR'
}

export enum ProductCode {
  TRIAL = 'TRIAL',
  GROWTH_PLAN = 'GROWTH_PLAN',
  CRITICAL_HIT = 'CRITICAL_HIT',
  REAL_INTERVIEW = 'REAL_INTERVIEW',
  LAST_CHECK = 'LAST_CHECK',
  RESUME_FIT = 'RESUME_FIT'
}

// ============================================================================
// Lead API (무료 체험 신청)
// ============================================================================

/**
 * 무료 체험 신청 요청 (Backend CreateLeadRequest)
 */
export interface CreateLeadRequest {
  email: string;
  name: string;
  profile: {
    careerLevel: CareerLevel;
    techStack?: string[];
    interests?: string[];
    desiredCompanies?: string[];
    timezone?: string;
  };
}

/**
 * 무료 체험 신청 응답 (Backend LeadResponse)
 */
export interface LeadResponse {
  memberId: string;
  email: string;
  name: string;
  trial: {
    purchaseId: string;
    productCode: ProductCode;
    maxDeliveries: number;
    startedAt: string; // ISO 8601 format
    firstDeliveryAt: string;
    expiresAt: string;
  };
}

// ============================================================================
// Order API (유료 주문 생성)
// ============================================================================

/**
 * 유료 주문 생성 요청 (Backend CreateOrderRequest)
 * Note: MultipartFile이므로 FormData로 전송
 */
export interface CreateOrderRequest {
  email: string;
  name: string;
  phone?: string; // 선택사항
  productCode: ProductCode;
  paymentMethod?: 'card' | 'transfer'; // 결제 방법 (기본값: transfer)
  resume?: File; // 선택사항
  profile?: {
    careerLevel?: CareerLevel;
    techStack?: string[];
    interests?: string[];
    desiredCompanies?: string[];
    timezone?: string;
  }; // 선택사항
  idempotencyKey?: string; // 멱등성 키 (자동 생성되므로 선택사항)
}

/**
 * 유료 주문 응답 (Backend OrderResponse)
 */
export interface OrderResponse {
  orderId: string; // checkoutId
  memberId: string;
  productCode: ProductCode;
  amount: number;
  checkoutUrl: string | null;
  expiresAt: string; // ISO 8601 format
  resumeId?: string;

  // Checkout Service response fields
  userId?: string;
  domain?: string;
  domainId?: string;
  reservations?: Record<string, string>;
  status?: string;
  totalAmount?: number;
  createdAt?: string;
  correlationId?: string;
  requestId?: string;
  transactionId?: string;
  invocationType?: 'SDK' | 'URL';
  portOneSdkPayload?: Record<string, any>;
}

// ============================================================================
// Product API (상품 목록 조회)
// ============================================================================

/**
 * 개별 상품 정보 (Backend ProductListResponse.ProductInfo)
 */
export interface ProductInfo {
  productCode: string;      // "GROWTH_PLAN"
  displayName: string;       // "그로스 플랜 (30일)"
  description: string;       // "매일 맞춤 질문으로..."
  basePrice: number;         // 99000 (정가)
  currentPrice: number;      // 79000 (현재가)
  hasDiscount: boolean;      // true
  discountPercent: number;   // 20 (할인율 %)
  category: string;          // "SUBSCRIPTION"
  active: boolean;           // true
  thumbnailUrl?: string;     // 썸네일 URL (nullable)
  displayOrder: number;      // 정렬 순서
}

/**
 * 상품 목록 응답 (Backend ProductListResponse)
 */
export interface ProductListResponse {
  products: ProductInfo[];
}

// ============================================================================
// Common Response Wrapper (Backend ApiResponse<T>)
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  errors?: string[];
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * 무료 체험 신청 (POST /api/query-daily/leads)
 * Gateway를 통해 라우팅: /api/query-daily/leads → /api/v1/public/leads
 */
export async function createLead(request: CreateLeadRequest): Promise<ApiResponse<LeadResponse>> {
  const response = await fetch(`${API_BASE_URL}/api/query-daily/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

/**
 * 유료 주문 생성 (POST /api/query-daily/orders)
 * Gateway를 통해 라우팅: /api/query-daily/orders → /api/v1/public/orders
 */
export async function createOrder(request: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> {
  const formData = new FormData();

  // Idempotency Key 생성 (각 결제 시도마다 새로운 UUID)
  const idempotencyKey = crypto.randomUUID();

  // OrderController는 @RequestPart("order")로 받으므로 JSON Blob으로 전송
  const orderRequest = {
    email: request.email,
    name: request.name,
    phone: request.phone || undefined,
    productCode: request.productCode,
    paymentMethod: request.paymentMethod || 'transfer', // 기본값: 계좌이체
    profile: request.profile || undefined,
    idempotencyKey, // 멱등성 키 추가
  };

  // JSON을 Blob으로 변환하여 'order' part로 추가
  const orderBlob = new Blob([JSON.stringify(orderRequest)], {
    type: 'application/json'
  });
  formData.append('order', orderBlob);

  // resume 파일 추가 (선택사항)
  if (request.resume) {
    formData.append('resume', request.resume);
  }

  const response = await fetch(`${API_BASE_URL}/api/query-daily/orders`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

/**
 * 주문 상태 조회 (GET /api/v1/orders/{orderId}/status)
 * Note: 인증 필요
 */
export async function getOrderStatus(orderId: string): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/orders/${orderId}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization header 필요 시 추가
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

/**
 * 전체 상품 목록 조회 (GET /api/query-daily/products)
 * Gateway를 통해 라우팅: /api/query-daily/products → /api/v1/public/products
 * 인증 불필요 (Public API)
 */
export async function getAllProducts(): Promise<ApiResponse<ProductListResponse>> {
  const response = await fetch(`${API_BASE_URL}/api/query-daily/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

// ============================================================================
// Payment Helper (간편 결제 함수)
// ============================================================================

/**
 * 간편 카드 결제 (Query Daily Service를 통한 주문 생성)
 * Query Daily → Checkout → Payment Core 플로우
 */
export async function createPaymentOrder(data: {
  email: string;
  name: string;
  phone?: string;
  productCode: ProductCode;
}): Promise<ApiResponse<OrderResponse>> {
  // Idempotency Key 생성 (각 결제 시도마다 새로운 UUID)
  const idempotencyKey = crypto.randomUUID();

  // OrderController는 @RequestPart("order")로 받으므로 JSON Blob으로 전송
  const orderRequest = {
    email: data.email,
    name: data.name,
    phone: data.phone,
    productCode: data.productCode,
    paymentMethod: 'card', // 카드결제
    idempotencyKey, // 멱등성 키 추가
  };

  // FormData 생성
  const formData = new FormData();

  // JSON을 Blob으로 변환하여 'order' part로 추가
  const orderBlob = new Blob([JSON.stringify(orderRequest)], {
    type: 'application/json'
  });
  formData.append('order', orderBlob);

  const response = await fetch(`${API_BASE_URL}/api/query-daily/orders`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

// ============================================================================
// Error Handling
// ============================================================================

async function handleApiError(response: Response): Promise<never> {
  // 상태 코드별 특별 처리
  if (response.status === 413) {
    throw new Error('FILE_TOO_LARGE');
  }

  // JSON 파싱 시도
  try {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || errorData.errorCode || '요청 처리 중 오류가 발생했습니다');
  } catch (jsonError) {
    // JSON 파싱 실패 시 상태 코드 기반 메시지
    const statusMessages: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      413: 'FILE_TOO_LARGE',
      429: 'TOO_MANY_REQUESTS',
      500: 'SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE'
    };

    throw new Error(statusMessages[response.status] || `HTTP_ERROR_${response.status}`);
  }
}

// ============================================================================
// Legacy Compatibility (기존 코드와의 호환성을 위한 별칭)
// ============================================================================

/**
 * @deprecated Use createLead instead
 */
export async function startFreeTrial(data: UserProfile): Promise<ApiResponse<LeadResponse>> {
  // experience를 CareerLevel로 매핑
  let careerLevel: CareerLevel = CareerLevel.JUNIOR;
  if (data.experience?.includes('3-5년') || data.experience?.includes('4년') || data.experience?.includes('중급')) {
    careerLevel = CareerLevel.MIDDLE;
  } else if (data.experience?.includes('5년+') || data.experience?.includes('8년') || data.experience?.includes('시니어')) {
    careerLevel = CareerLevel.SENIOR;
  }

  const request: CreateLeadRequest = {
    email: data.email,
    name: data.name || data.email.split('@')[0], // 이메일에서 이름 추출
    profile: {
      careerLevel,
      techStack: data.techStack,
      interests: data.interests,
      desiredCompanies: data.targetCompany ? [data.targetCompany] : undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  return createLead(request);
}

/**
 * @deprecated Use createOrder instead
 */
export async function submitBetaApplication(data: {
  email: string;
  name?: string;
  phone?: string;
  productType?: string;
  resume: File;
}): Promise<ApiResponse<OrderResponse>> {
  // productType을 ProductCode로 매핑
  let productCode: ProductCode = ProductCode.GROWTH_PLAN;
  if (data.productType === 'CRITICAL_HIT') {
    productCode = ProductCode.CRITICAL_HIT;
  } else if (data.productType === 'REAL_INTERVIEW') {
    productCode = ProductCode.REAL_INTERVIEW;
  } else if (data.productType === 'LAST_CHECK') {
    productCode = ProductCode.LAST_CHECK;
  }

  const request: CreateOrderRequest = {
    email: data.email,
    name: data.name || data.email.split('@')[0],
    phone: data.phone,
    productCode,
    resume: data.resume,
  };

  return createOrder(request);
}

// ============================================================================
// Type Aliases for Legacy Code
// ============================================================================

/**
 * Legacy UserProfile 타입 (기존 코드 호환성)
 */
export type UserProfile = {
  email: string;
  name?: string;
  experience?: string; // "신입 | 1-3년 | 3-5년 | 5년+"
  techStack?: string[];
  interests?: string[];
  targetCompany?: string;
  selectedProduct?: string;
};

export type SubmitApplicationRequest = {
  email: string;
  name?: string;
  phone?: string;
  productType?: string;
  resume: File;
};
export type StartFreeTrialResponse = ApiResponse<LeadResponse>;
export type SubmitApplicationResponse = ApiResponse<OrderResponse>;
