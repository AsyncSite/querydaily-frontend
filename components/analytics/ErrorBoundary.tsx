'use client';

import React, { Component, ReactNode } from 'react';
import { trackError } from '@/lib/analytics/ga-utils';

/**
 * ErrorBoundary Component
 *
 * React 에러 경계를 사용하여 렌더링 에러를 포착하고 GA로 추적합니다.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<div>오류가 발생했습니다</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // GA 에러 추적
    trackError(
      'javascript',
      error.message,
      errorInfo.componentStack?.split('\n')[1]?.trim(),
      {
        error_name: error.name,
        error_stack: error.stack?.substring(0, 500),
        component_stack: errorInfo.componentStack?.substring(0, 500),
        error_boundary: 'true'
      }
    );

    // 개발 환경에서 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error Boundary Caught:', {
        error,
        errorInfo,
        timestamp: new Date().toISOString()
      });
    }

    // 부모 컴포넌트 onError 호출
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#ff6b6b', marginBottom: '16px' }}>
            일시적인 오류가 발생했습니다
          </h2>
          <p style={{ color: '#cbd5e0', marginBottom: '24px' }}>
            {this.state.error?.message || '알 수 없는 오류'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#82aaff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            페이지 새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Global Error Tracker
 *
 * 전역 에러 핸들러를 설정하고 모든 에러를 GA로 추적합니다.
 */
export function setupGlobalErrorTracking() {
  if (typeof window === 'undefined') return;

  // JavaScript 런타임 에러
  window.addEventListener('error', (event) => {
    if (window.gtag) {
      window.gtag('event', 'error', {
        error_type: 'javascript',
        error_message: event.message,
        error_location: `${event.filename}:${event.lineno}:${event.colno}`,
        page_path: window.location.pathname
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Global Error:', event);
    }
  });

  // Unhandled Promise Rejection
  window.addEventListener('unhandledrejection', (event) => {
    const errorMessage = event.reason instanceof Error
      ? event.reason.message
      : String(event.reason);

    if (window.gtag) {
      window.gtag('event', 'error', {
        error_type: 'promise',
        error_message: errorMessage,
        error_location: 'unhandled_rejection',
        page_path: window.location.pathname
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Unhandled Rejection:', event.reason);
    }
  });
}

/**
 * API Error Tracker Hook
 *
 * API 요청 에러를 추적합니다.
 */
export function useAPIErrorTracking() {
  const trackAPIError = (
    endpoint: string,
    statusCode?: number,
    errorMessage?: string
  ) => {
    if (window.gtag) {
      window.gtag('event', 'error', {
        error_type: 'api',
        error_message: errorMessage || 'API request failed',
        error_code: statusCode,
        api_endpoint: endpoint,
        http_status: statusCode,
        page_path: window.location.pathname
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 API Error:', {
        endpoint,
        statusCode,
        errorMessage
      });
    }
  };

  return { trackAPIError };
}

/**
 * Form Validation Error Tracker
 */
export function trackFormValidationError(
  formName: string,
  fieldName: string,
  errorMessage: string
) {
  if (window.gtag) {
    window.gtag('event', 'error', {
      error_type: 'validation',
      error_message: errorMessage,
      error_location: `${formName}.${fieldName}`,
      form_name: formName,
      field_name: fieldName,
      page_path: window.location.pathname
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Form Validation Error:', {
      formName,
      fieldName,
      errorMessage
    });
  }
}

/**
 * File Upload Error Tracker
 */
export function trackFileUploadError(
  fileName: string,
  fileSize: number,
  errorReason: string
) {
  if (window.gtag) {
    window.gtag('event', 'error', {
      error_type: 'upload',
      error_message: errorReason,
      error_location: 'file_upload',
      file_name: fileName,
      file_size: Math.round(fileSize / 1024), // KB
      page_path: window.location.pathname
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 File Upload Error:', {
      fileName,
      fileSize: `${(fileSize / 1024 / 1024).toFixed(2)}MB`,
      errorReason
    });
  }
}

/**
 * Payment Error Tracker
 */
export function trackPaymentError(
  paymentMethod: string,
  errorCode: string,
  errorMessage: string,
  amount?: number
) {
  if (window.gtag) {
    window.gtag('event', 'error', {
      error_type: 'payment',
      error_message: errorMessage,
      error_code: errorCode,
      error_location: 'payment_process',
      payment_method: paymentMethod,
      value: amount,
      page_path: window.location.pathname
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Payment Error:', {
      paymentMethod,
      errorCode,
      errorMessage,
      amount
    });
  }
}

/**
 * Comprehensive Error Tracker with Context
 */
export class ErrorTracker {
  private static errorQueue: any[] = [];
  private static batchTimer: NodeJS.Timeout | null = null;
  private static readonly BATCH_SIZE = 5;
  private static readonly BATCH_TIMEOUT = 5000;

  static trackError(
    type: 'api' | 'validation' | 'upload' | 'payment' | 'javascript' | 'network',
    message: string,
    context?: Record<string, any>
  ) {
    const errorEvent = {
      error_type: type,
      error_message: message,
      timestamp: Date.now(),
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...context
    };

    this.errorQueue.push(errorEvent);

    // 심각한 에러는 즉시 전송
    if (this.isCritical(type, message)) {
      this.flushErrors();
    } else {
      this.scheduleBatch();
    }
  }

  private static isCritical(type: string, message: string): boolean {
    return (
      type === 'payment' ||
      message.includes('500') ||
      message.includes('critical') ||
      message.includes('fatal')
    );
  }

  private static scheduleBatch() {
    if (this.errorQueue.length >= this.BATCH_SIZE) {
      this.flushErrors();
      return;
    }

    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushErrors();
      }, this.BATCH_TIMEOUT);
    }
  }

  private static flushErrors() {
    if (this.errorQueue.length === 0) return;

    // 큐 복사
    const errorsToSend = [...this.errorQueue];
    this.errorQueue = [];

    // 타이머 초기화
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    // 에러들을 GA로 전송
    errorsToSend.forEach(error => {
      if (window.gtag) {
        window.gtag('event', 'error', error);
      }
    });

    // 디버그 로그
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Flushed ${errorsToSend.length} errors to GA`);
    }
  }
}

export default ErrorBoundary;