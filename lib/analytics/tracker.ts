/**
 * GA4 Tracker - Core tracking functionality
 * Singleton pattern with SSR safety
 */

import { GA_MEASUREMENT_ID, GA_CONFIG } from './config';
import type { GAEventName, GAEventParams, AnalyticsSession, ReferrerType } from './types';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

class GATracker {
  private static instance: GATracker | null = null;
  private initialized = false;
  private session: AnalyticsSession | null = null;
  private eventQueue: Array<{ name: GAEventName; params: GAEventParams }> = [];
  private debugMode: boolean;

  private constructor() {
    this.debugMode = GA_CONFIG.debug ?? false;
  }

  static getInstance(): GATracker {
    if (!GATracker.instance) {
      GATracker.instance = new GATracker();
    }
    return GATracker.instance;
  }

  /**
   * Check if running in browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Check if gtag is available
   */
  private isGtagAvailable(): boolean {
    return this.isBrowser() && typeof window.gtag === 'function';
  }

  /**
   * Initialize the tracker
   */
  init(): void {
    if (!this.isBrowser() || this.initialized) {
      return;
    }

    // Initialize session
    this.initSession();

    // Process queued events
    this.flushQueue();

    this.initialized = true;
    this.log('GA Tracker initialized');
  }

  /**
   * Initialize user session
   */
  private initSession(): void {
    if (!this.isBrowser()) return;

    const referrer = document.referrer;
    let referrerType: ReferrerType = 'direct';

    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        const currentHost = window.location.host;

        if (referrerUrl.host === currentHost) {
          // Check if coming from landing page
          if (referrerUrl.pathname === '/') {
            referrerType = 'landing';
          }
        } else {
          referrerType = 'external';
        }
      } catch {
        referrerType = 'external';
      }
    }

    this.session = {
      entry_page: window.location.pathname,
      entry_time: Date.now(),
      pages_viewed: 1,
      referrer_type: referrerType,
    };

    // Store session in sessionStorage
    try {
      const existingSession = sessionStorage.getItem('ga_session');
      if (existingSession) {
        const parsed = JSON.parse(existingSession);
        this.session = {
          ...parsed,
          pages_viewed: parsed.pages_viewed + 1,
        };
      } else {
        sessionStorage.setItem('ga_session', JSON.stringify(this.session));
      }
    } catch {
      // sessionStorage not available
    }
  }

  /**
   * Get current session data
   */
  getSession(): AnalyticsSession | null {
    return this.session;
  }

  /**
   * Update session page count
   */
  incrementPageViews(): void {
    if (this.session) {
      this.session.pages_viewed += 1;
      try {
        sessionStorage.setItem('ga_session', JSON.stringify(this.session));
      } catch {
        // Ignore storage errors
      }
    }
  }

  /**
   * Track an event
   */
  trackEvent<T extends GAEventName>(
    eventName: T,
    params?: GAEventParams
  ): void {
    if (!this.isBrowser()) {
      return;
    }

    // Add session context to params
    const enrichedParams = this.enrichParams(params);

    if (!this.isGtagAvailable()) {
      // Queue event if gtag not yet available
      this.eventQueue.push({ name: eventName, params: enrichedParams });
      this.log(`Event queued: ${eventName}`, enrichedParams);
      return;
    }

    // Send event to GA
    window.gtag('event', eventName, enrichedParams);
    this.log(`Event sent: ${eventName}`, enrichedParams);
  }

  /**
   * Enrich params with session context
   */
  private enrichParams(params?: GAEventParams): Record<string, unknown> {
    const enriched: Record<string, unknown> = { ...params };

    if (this.session) {
      enriched.entry_page = this.session.entry_page;
      enriched.referrer_type = this.session.referrer_type;
    }

    return enriched;
  }

  /**
   * Flush queued events
   */
  private flushQueue(): void {
    if (!this.isGtagAvailable()) return;

    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        window.gtag('event', event.name, event.params as Record<string, unknown>);
        this.log(`Queued event sent: ${event.name}`, event.params);
      }
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, unknown>): void {
    if (!this.isGtagAvailable()) return;

    window.gtag('set', 'user_properties', properties);
    this.log('User properties set', properties);
  }

  /**
   * Configure GA
   */
  configure(config: Record<string, unknown>): void {
    if (!this.isGtagAvailable()) return;

    window.gtag('config', GA_MEASUREMENT_ID, config);
    this.log('GA configured', config);
  }

  /**
   * Enable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  /**
   * Debug logger
   */
  private log(message: string, data?: unknown): void {
    if (this.debugMode) {
      console.log(`[GA4] ${message}`, data ?? '');
    }
  }
}

// Export singleton instance
export const gaTracker = GATracker.getInstance();

// Export convenience function
export function trackEvent<T extends GAEventName>(
  eventName: T,
  params?: GAEventParams
): void {
  gaTracker.trackEvent(eventName, params);
}
