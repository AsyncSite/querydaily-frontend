/**
 * Google Analytics 유틸리티 모듈
 *
 * 이 모듈은 GA4 이벤트 추적을 위한 핵심 유틸리티를 제공합니다.
 * - 싱글톤 패턴으로 단일 인스턴스 관리
 * - 이벤트 큐잉 및 배치 처리
 * - 개발/프로덕션 환경 분기
 * - 데이터 타입 검증
 */

interface GAEvent {
  eventName: string;
  parameters: Record<string, any>;
  timestamp: number;
}

interface TrackerConfig {
  debugMode?: boolean;
  batchSize?: number;
  batchTimeout?: number;
  enableBatching?: boolean;
}

class GATracker {
  private static instance: GATracker;
  private debugMode: boolean = false;
  private eventQueue: GAEvent[] = [];
  private batchSize: number = 10;
  private batchTimeout: number = 5000; // 5초
  private batchTimer: NodeJS.Timeout | null = null;
  private enableBatching: boolean = true;
  private isInitialized: boolean = false;

  private constructor(config?: TrackerConfig) {
    this.debugMode = config?.debugMode ?? process.env.NODE_ENV === 'development';
    this.batchSize = config?.batchSize ?? 10;
    this.batchTimeout = config?.batchTimeout ?? 5000;
    this.enableBatching = config?.enableBatching ?? true;

    // 브라우저 환경에서만 초기화
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  static getInstance(config?: TrackerConfig): GATracker {
    if (!this.instance) {
      this.instance = new GATracker(config);
    }
    return this.instance;
  }

  private initialize() {
    // gtag가 로드될 때까지 대기
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      this.isInitialized = true;
    } else {
      // gtag가 아직 로드되지 않았다면 재시도
      setTimeout(() => this.initialize(), 100);
    }

    // 페이지 언로드 시 남은 이벤트 전송
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flushEvents();
      });
    }
  }

  /**
   * GA4 이벤트 추적
   * @param eventName 이벤트 이름 (snake_case 권장)
   * @param parameters 이벤트 파라미터
   */
  trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    // SSR 환경에서는 실행하지 않음
    if (typeof window === 'undefined') return;

    // 개발 환경 로깅
    if (this.debugMode) {
      console.log('🔍 GA Event:', {
        name: eventName,
        params: parameters,
        timestamp: new Date().toISOString()
      });
    }

    // 파라미터 검증 및 정제
    const cleanedParams = this.validateAndCleanParameters(parameters);

    // 이벤트 생성
    const event: GAEvent = {
      eventName,
      parameters: cleanedParams,
      timestamp: Date.now()
    };

    if (this.enableBatching && !this.isHighPriorityEvent(eventName)) {
      // 일반 이벤트는 큐에 추가
      this.eventQueue.push(event);
      this.scheduleFlush();
    } else {
      // 중요 이벤트는 즉시 전송
      this.sendEvent(event);
    }
  }

  /**
   * 파라미터 검증 및 정제
   */
  private validateAndCleanParameters(params: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};

    for (const [key, value] of Object.entries(params)) {
      // null이나 undefined는 제외
      if (value === null || value === undefined) {
        continue;
      }

      // value는 반드시 숫자 타입이어야 함
      if (key === 'value' || key === 'price' || key.includes('amount')) {
        cleaned[key] = typeof value === 'number' ? value : Number(value) || 0;
        if (this.debugMode && typeof value !== 'number') {
          console.warn(`⚠️ GA: "${key}" should be a number, got ${typeof value}`);
        }
      }
      // 배열은 JSON 문자열로 변환
      else if (Array.isArray(value)) {
        cleaned[key] = JSON.stringify(value);
      }
      // 객체는 JSON 문자열로 변환
      else if (typeof value === 'object') {
        cleaned[key] = JSON.stringify(value);
      }
      // 문자열 최대 길이 제한 (100자)
      else if (typeof value === 'string') {
        cleaned[key] = value.substring(0, 100);
      }
      // 기타 원시 타입은 그대로
      else {
        cleaned[key] = value;
      }
    }

    return cleaned;
  }

  /**
   * 높은 우선순위 이벤트 판별
   */
  private isHighPriorityEvent(eventName: string): boolean {
    const highPriorityEvents = [
      'purchase',
      'sign_up',
      'begin_checkout',
      'error',
      'payment_failed'
    ];
    return highPriorityEvents.includes(eventName);
  }

  /**
   * 이벤트 전송 스케줄링
   */
  private scheduleFlush() {
    // 큐가 가득 찬 경우 즉시 전송
    if (this.eventQueue.length >= this.batchSize) {
      this.flushEvents();
      return;
    }

    // 타이머가 없으면 설정
    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushEvents();
      }, this.batchTimeout);
    }
  }

  /**
   * 큐에 있는 모든 이벤트 전송
   */
  private flushEvents() {
    if (this.eventQueue.length === 0) return;

    // 큐 복사 후 초기화
    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    // 타이머 초기화
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    // 이벤트 전송
    eventsToSend.forEach(event => this.sendEvent(event));
  }

  /**
   * 개별 이벤트 전송
   */
  private sendEvent(event: GAEvent) {
    if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
      if (this.debugMode) {
        console.warn('⚠️ GA: gtag not available');
      }
      return;
    }

    try {
      window.gtag('event', event.eventName, {
        ...event.parameters,
        event_timestamp: event.timestamp,
        // 환경 정보 추가
        environment: process.env.NODE_ENV,
        // 디바이스 타입 추가
        device_type: this.getDeviceType()
      });
    } catch (error) {
      console.error('❌ GA Error:', error);
    }
  }

  /**
   * 디바이스 타입 감지
   */
  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown';

    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * 스크롤 깊이 추적 헬퍼
   */
  trackScrollDepth(percentage: number, additionalParams?: Record<string, any>) {
    this.trackEvent('scroll_depth', {
      percentage,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...additionalParams
    });
  }

  /**
   * CTA 클릭 추적 헬퍼
   */
  trackCTAClick(ctaText: string, ctaLocation: string, additionalParams?: Record<string, any>) {
    this.trackEvent('click_cta', {
      cta_text: ctaText,
      cta_location: ctaLocation,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...additionalParams
    });
  }

  /**
   * 폼 필드 상호작용 추적 헬퍼
   */
  trackFormField(
    formName: string,
    fieldName: string,
    interactionType: string,
    additionalParams?: Record<string, any>
  ) {
    this.trackEvent('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      interaction_type: interactionType,
      ...additionalParams
    });
  }

  /**
   * 상품 조회 추적 헬퍼
   */
  trackItemView(itemId: string, itemName: string, price?: number, additionalParams?: Record<string, any>) {
    this.trackEvent('view_item', {
      item_id: itemId,
      item_name: itemName,
      price: price,
      item_category: 'subscription',
      ...additionalParams
    });
  }

  /**
   * 섹션 조회 추적 헬퍼
   */
  trackSectionView(sectionName: string, additionalParams?: Record<string, any>) {
    this.trackEvent('view_section', {
      section_name: sectionName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...additionalParams
    });
  }

  /**
   * 에러 추적 헬퍼
   */
  trackError(
    errorType: string,
    errorMessage: string,
    errorLocation?: string,
    additionalParams?: Record<string, any>
  ) {
    this.trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation || 'unknown',
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...additionalParams
    });
  }

  /**
   * 디버그 모드 토글
   */
  setDebugMode(enabled: boolean) {
    this.debugMode = enabled;
  }

  /**
   * 배칭 설정 변경
   */
  setBatchConfig(config: { size?: number; timeout?: number; enabled?: boolean }) {
    if (config.size !== undefined) this.batchSize = config.size;
    if (config.timeout !== undefined) this.batchTimeout = config.timeout;
    if (config.enabled !== undefined) this.enableBatching = config.enabled;
  }
}

// 싱글톤 인스턴스 export
export const gaTracker = GATracker.getInstance();

// 타입 export
export type { GAEvent, TrackerConfig };

// 헬퍼 함수들 export
export const trackScrollDepth = gaTracker.trackScrollDepth.bind(gaTracker);
export const trackCTAClick = gaTracker.trackCTAClick.bind(gaTracker);
export const trackFormField = gaTracker.trackFormField.bind(gaTracker);
export const trackItemView = gaTracker.trackItemView.bind(gaTracker);
export const trackSectionView = gaTracker.trackSectionView.bind(gaTracker);
export const trackError = gaTracker.trackError.bind(gaTracker);

// 기본 export
export default gaTracker;