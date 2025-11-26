/**
 * Error Tracking for GA4
 * Captures and reports errors to analytics
 */

import { trackEvent } from './tracker';
import { isBrowser } from './ssr-safe';
import type { PageType, ProductId } from './types';

// Error event interface
interface ErrorEventParams {
  error_type: string;
  error_message: string;
  error_stack?: string;
  page_type?: PageType;
  product_id?: ProductId;
  component_name?: string;
  user_action?: string;
}

/**
 * Track an error event
 */
export function trackError(params: ErrorEventParams): void {
  // Sanitize error message (remove PII if present)
  const sanitizedMessage = sanitizeErrorMessage(params.error_message);

  trackEvent('error' as never, {
    ...params,
    error_message: sanitizedMessage,
    error_stack: params.error_stack?.substring(0, 500), // Limit stack trace length
  } as never);
}

/**
 * Track JavaScript runtime errors
 */
export function trackRuntimeError(
  error: Error,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
    componentName?: string;
  }
): void {
  trackError({
    error_type: 'runtime_error',
    error_message: error.message,
    error_stack: error.stack,
    ...context,
  });
}

/**
 * Track unhandled promise rejections
 */
export function trackUnhandledRejection(
  reason: unknown,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
  }
): void {
  const message = reason instanceof Error ? reason.message : String(reason);
  const stack = reason instanceof Error ? reason.stack : undefined;

  trackError({
    error_type: 'unhandled_rejection',
    error_message: message,
    error_stack: stack,
    ...context,
  });
}

/**
 * Track API/fetch errors
 */
export function trackAPIError(
  endpoint: string,
  status: number,
  message: string,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
  }
): void {
  trackError({
    error_type: 'api_error',
    error_message: `[${status}] ${endpoint}: ${message}`,
    ...context,
  });
}

/**
 * Track form validation errors
 */
export function trackValidationError(
  fieldName: string,
  validationType: string,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
    formName?: string;
  }
): void {
  trackError({
    error_type: 'validation_error',
    error_message: `${fieldName}: ${validationType}`,
    component_name: context?.formName,
    ...context,
  });
}

/**
 * Track file upload errors
 */
export function trackUploadError(
  fileName: string,
  reason: string,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
  }
): void {
  trackError({
    error_type: 'upload_error',
    error_message: `File upload failed: ${reason}`,
    user_action: `upload_${fileName.split('.').pop() || 'unknown'}`,
    ...context,
  });
}

/**
 * Track payment errors
 */
export function trackPaymentError(
  paymentMethod: 'card' | 'bank',
  reason: string,
  context?: {
    pageType?: PageType;
    productId?: ProductId;
  }
): void {
  trackError({
    error_type: 'payment_error',
    error_message: `Payment failed (${paymentMethod}): ${reason}`,
    user_action: `payment_${paymentMethod}`,
    ...context,
  });
}

/**
 * Sanitize error messages to remove potential PII
 */
function sanitizeErrorMessage(message: string): string {
  // Remove email addresses
  let sanitized = message.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    '[EMAIL]'
  );

  // Remove phone numbers (Korean format)
  sanitized = sanitized.replace(
    /\d{2,3}[-.\s]?\d{3,4}[-.\s]?\d{4}/g,
    '[PHONE]'
  );

  // Remove potential card numbers (16 digits)
  sanitized = sanitized.replace(/\d{4}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}/g, '[CARD]');

  return sanitized;
}

/**
 * Initialize global error handlers
 */
export function initGlobalErrorHandlers(context?: {
  pageType?: PageType;
  productId?: ProductId;
}): () => void {
  if (!isBrowser()) return () => {};

  // Handle uncaught errors
  const errorHandler = (event: ErrorEvent) => {
    trackRuntimeError(event.error || new Error(event.message), context);
  };

  // Handle unhandled promise rejections
  const rejectionHandler = (event: PromiseRejectionEvent) => {
    trackUnhandledRejection(event.reason, context);
  };

  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', rejectionHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', rejectionHandler);
  };
}

/**
 * Create an error boundary reporter
 */
export function createErrorBoundaryReporter(componentName: string) {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    trackError({
      error_type: 'react_error_boundary',
      error_message: error.message,
      error_stack: errorInfo?.componentStack || error.stack,
      component_name: componentName,
    });
  };
}
