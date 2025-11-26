/**
 * SSR Safe Utilities for GA4
 * Ensures analytics code runs only in browser environment
 */

/**
 * Check if code is running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if gtag is available
 */
export function isGtagAvailable(): boolean {
  return isBrowser() && typeof window.gtag === 'function';
}

/**
 * Safe wrapper for browser-only operations
 */
export function safelyRunInBrowser<T>(
  callback: () => T,
  fallback?: T
): T | undefined {
  if (!isBrowser()) {
    return fallback;
  }
  return callback();
}

/**
 * Get scroll percentage safely
 */
export function getScrollPercentage(): number {
  if (!isBrowser()) return 0;

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 100;

  return Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
}

/**
 * Get viewport height safely
 */
export function getViewportHeight(): number {
  if (!isBrowser()) return 0;
  return window.innerHeight;
}

/**
 * Get document height safely
 */
export function getDocumentHeight(): number {
  if (!isBrowser()) return 0;
  return document.documentElement.scrollHeight;
}

/**
 * Get current pathname safely
 */
export function getPathname(): string {
  if (!isBrowser()) return '';
  return window.location.pathname;
}

/**
 * Get referrer safely
 */
export function getReferrer(): string {
  if (!isBrowser()) return '';
  return document.referrer;
}

/**
 * Get search params safely
 */
export function getSearchParams(): URLSearchParams | null {
  if (!isBrowser()) return null;
  return new URLSearchParams(window.location.search);
}

/**
 * Get UTM parameters
 */
export function getUTMParams(): Record<string, string> {
  const searchParams = getSearchParams();
  if (!searchParams) return {};

  const utmParams: Record<string, string> = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  utmKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}

/**
 * Session storage wrapper with error handling
 */
export const safeSessionStorage = {
  getItem(key: string): string | null {
    if (!isBrowser()) return null;
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (!isBrowser()) return false;
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (!isBrowser()) return false;
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Local storage wrapper with error handling
 */
export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (!isBrowser()) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (!isBrowser()) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (!isBrowser()) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Create a debounced function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Create a throttled function
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
