/**
 * Performance Optimization Utilities for GA4
 * Event batching, debouncing, and throttling
 */

import { isBrowser } from './ssr-safe';
import { BATCH_CONFIG, DEBOUNCE_DELAYS } from './config';

// ============================================
// Event Batching
// ============================================

interface BatchedEvent {
  name: string;
  params: Record<string, unknown>;
  timestamp: number;
}

class EventBatcher {
  private queue: BatchedEvent[] = [];
  private flushTimeout: ReturnType<typeof setTimeout> | null = null;
  private isProcessing = false;

  constructor(
    private maxBatchSize: number = BATCH_CONFIG.maxBatchSize,
    private flushInterval: number = BATCH_CONFIG.flushInterval
  ) {}

  /**
   * Add event to batch queue
   */
  add(name: string, params: Record<string, unknown>): void {
    this.queue.push({
      name,
      params,
      timestamp: Date.now(),
    });

    // Flush if batch is full
    if (this.queue.length >= this.maxBatchSize) {
      this.flush();
    } else {
      this.scheduleFlush();
    }
  }

  /**
   * Schedule a flush
   */
  private scheduleFlush(): void {
    if (this.flushTimeout) return;

    this.flushTimeout = setTimeout(() => {
      this.flush();
    }, this.flushInterval);
  }

  /**
   * Flush all queued events
   */
  flush(): void {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout);
      this.flushTimeout = null;
    }

    const events = [...this.queue];
    this.queue = [];

    // Process events
    events.forEach((event) => {
      if (isBrowser() && window.gtag) {
        window.gtag('event', event.name, event.params);
      }
    });

    this.isProcessing = false;
  }

  /**
   * Clear queue without sending
   */
  clear(): void {
    this.queue = [];
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout);
      this.flushTimeout = null;
    }
  }

  /**
   * Get queue size
   */
  size(): number {
    return this.queue.length;
  }
}

// Singleton instance
let eventBatcher: EventBatcher | null = null;

export function getEventBatcher(): EventBatcher {
  if (!eventBatcher) {
    eventBatcher = new EventBatcher();
  }
  return eventBatcher;
}

// ============================================
// Debounce & Throttle Utilities
// ============================================

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number = DEBOUNCE_DELAYS.scroll
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>) => {
    lastArgs = args;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (lastArgs) {
        func(...lastArgs);
        lastArgs = null;
      }
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };

  debounced.flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (lastArgs) {
      func(...lastArgs);
      lastArgs = null;
    }
  };

  return debounced;
}

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number = DEBOUNCE_DELAYS.scroll
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttled;
}

// ============================================
// Request Idle Callback Polyfill
// ============================================

type IdleCallbackHandle = number;
type IdleDeadline = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

/**
 * Schedule work during browser idle time
 */
export function requestIdleCallback(
  callback: (deadline: IdleDeadline) => void,
  options?: { timeout?: number }
): IdleCallbackHandle {
  if (!isBrowser()) return 0;

  // Check if requestIdleCallback is available
  const win = window as typeof window & {
    requestIdleCallback?: (cb: (deadline: IdleDeadline) => void, opts?: { timeout?: number }) => number
  };

  if (win.requestIdleCallback) {
    return win.requestIdleCallback(callback, options);
  }

  // Fallback to setTimeout
  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, options?.timeout || 1) as unknown as IdleCallbackHandle;
}

/**
 * Cancel scheduled idle callback
 */
export function cancelIdleCallback(handle: IdleCallbackHandle): void {
  if (!isBrowser()) return;

  const win = window as typeof window & {
    cancelIdleCallback?: (handle: number) => void
  };

  if (win.cancelIdleCallback) {
    win.cancelIdleCallback(handle);
  } else {
    clearTimeout(handle);
  }
}

// ============================================
// Performance Monitoring
// ============================================

/**
 * Measure execution time of a function
 */
export function measureTime<T>(
  name: string,
  fn: () => T,
  logResult = false
): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  if (logResult && process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Measure async execution time
 */
export async function measureTimeAsync<T>(
  name: string,
  fn: () => Promise<T>,
  logResult = false
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;

  if (logResult && process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

// ============================================
// Cleanup on page unload
// ============================================

/**
 * Register cleanup function to run on page unload
 */
export function onPageUnload(cleanup: () => void): () => void {
  if (!isBrowser()) return () => {};

  const handler = () => {
    // Flush any pending events
    getEventBatcher().flush();
    cleanup();
  };

  window.addEventListener('beforeunload', handler);
  window.addEventListener('pagehide', handler);

  return () => {
    window.removeEventListener('beforeunload', handler);
    window.removeEventListener('pagehide', handler);
  };
}
