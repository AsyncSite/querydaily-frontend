/**
 * GA4 Analytics Configuration
 * QueryDaily Service
 */

import { GAConfig } from './types';

// GA4 Measurement ID (supports both env variable names for backward compatibility)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || '';

// Default configuration
export const GA_CONFIG: GAConfig = {
  measurementId: GA_MEASUREMENT_ID,
  debug: process.env.NODE_ENV === 'development',
  sendPageView: true,
};

// Scroll depth thresholds to track
export const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

// Engagement time threshold (seconds) to consider user engaged
export const ENGAGEMENT_THRESHOLD_SECONDS = 10;

// Debounce delays (milliseconds)
export const DEBOUNCE_DELAYS = {
  scroll: 100,
  resize: 200,
  formField: 500,
} as const;

// Intersection Observer thresholds for section visibility
export const SECTION_VISIBILITY_THRESHOLD = 0.5; // 50% visible

// Batch settings for performance optimization
export const BATCH_CONFIG = {
  maxBatchSize: 10,
  flushInterval: 5000, // 5 seconds
} as const;

// Form field names for tracking
export const FORM_FIELDS = {
  purchase: {
    resume: 'resume_upload',
    email: 'email',
    name: 'name',
    phone: 'phone',
    paymentMethod: 'payment_method',
  },
} as const;

// Product information
export const PRODUCTS = {
  'growth-plan': {
    id: 'growth-plan',
    name: '그로스 플랜',
    category: 'interview_prep',
  },
  'critical-hit': {
    id: 'critical-hit',
    name: '크리티컬 히트',
    category: 'interview_prep',
  },
} as const;

// Check if GA is enabled
export const isGAEnabled = (): boolean => {
  return Boolean(GA_MEASUREMENT_ID);
};
