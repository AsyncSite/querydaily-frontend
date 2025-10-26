'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useFormTracking } from '@/hooks/useGATracking';
import { FORM_NAMES } from '@/lib/analytics/event-types';

/**
 * FormTracker Component
 *
 * 폼 필드 상호작용을 자동으로 추적하는 컴포넌트입니다.
 * 포커스, 블러, 완료, 에러 등의 이벤트를 GA로 전송합니다.
 *
 * @example
 * ```tsx
 * <FormTracker formName="beta_signup" currentStep={1}>
 *   <form>
 *     <input name="email" type="email" />
 *     <input name="name" type="text" />
 *   </form>
 * </FormTracker>
 * ```
 */

interface FormTrackerProps {
  formName: keyof typeof FORM_NAMES | string;
  currentStep?: number;
  children: React.ReactNode;
  trackStart?: boolean; // 폼 시작 자동 추적 여부
}

export default function FormTracker({
  formName,
  currentStep,
  children,
  trackStart = true
}: FormTrackerProps) {
  const {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldComplete,
    trackFieldError,
    trackFormStart,
    trackFormSubmit
  } = useFormTracking(formName);

  const formStartTracked = useRef(false);
  const fieldTimers = useRef<Map<string, number>>(new Map());

  // 폼 시작 추적
  useEffect(() => {
    if (trackStart && !formStartTracked.current) {
      trackFormStart();
      formStartTracked.current = true;
    }
  }, [trackStart, trackFormStart]);

  // 필드 이벤트 리스너 설정
  useEffect(() => {
    const formElement = document.querySelector(`[data-form-tracker="${formName}"]`);
    if (!formElement) return;

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!target.name) return;

      const fieldName = target.name;
      fieldTimers.current.set(fieldName, Date.now());
      trackFieldFocus(fieldName);
    };

    const handleBlur = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!target.name) return;

      const fieldName = target.name;
      trackFieldBlur(fieldName);

      // 필드가 완료되었는지 확인
      if (target.value && target.value.trim()) {
        trackFieldComplete(fieldName);
      }
    };

    const handleInvalid = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.name) return;

      const errorMessage = target.validationMessage || 'Validation failed';
      trackFieldError(target.name, errorMessage);
    };

    // 이벤트 리스너 추가
    formElement.addEventListener('focusin', handleFocus);
    formElement.addEventListener('focusout', handleBlur);
    formElement.addEventListener('invalid', handleInvalid, true);

    return () => {
      formElement.removeEventListener('focusin', handleFocus);
      formElement.removeEventListener('focusout', handleBlur);
      formElement.removeEventListener('invalid', handleInvalid, true);
    };
  }, [formName, trackFieldFocus, trackFieldBlur, trackFieldComplete, trackFieldError]);

  return (
    <div data-form-tracker={formName} data-form-step={currentStep}>
      {children}
    </div>
  );
}

/**
 * FormField Component
 *
 * 개별 필드에 대한 세밀한 추적이 필요할 때 사용합니다.
 */
interface FormFieldProps {
  name: string;
  formName: string;
  required?: boolean;
  children: React.ReactElement;
}

export function FormField({
  name,
  formName,
  required = false,
  children
}: FormFieldProps) {
  const {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldComplete,
    trackFieldError
  } = useFormTracking(formName);

  const startTime = useRef<number>(0);

  const enhancedChild = React.cloneElement(children, {
    onFocus: (e: React.FocusEvent) => {
      startTime.current = Date.now();
      trackFieldFocus(name);
      if (children.props.onFocus) {
        children.props.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent) => {
      const timeSpent = Date.now() - startTime.current;
      trackFieldBlur(name);

      const target = e.target as HTMLInputElement;
      if (target.value && target.value.trim()) {
        trackFieldComplete(name);
      }

      if (children.props.onBlur) {
        children.props.onBlur(e);
      }
    },
    onChange: (e: React.ChangeEvent) => {
      if (children.props.onChange) {
        children.props.onChange(e);
      }
    },
    onInvalid: (e: React.InvalidEvent) => {
      const target = e.target as HTMLInputElement;
      trackFieldError(name, target.validationMessage);
      if (children.props.onInvalid) {
        children.props.onInvalid(e);
      }
    },
    'data-ga-field': name,
    'data-ga-form': formName
  });

  return enhancedChild;
}

/**
 * Hook for manual form tracking with field metrics
 */
interface FieldMetrics {
  focusCount: number;
  totalTime: number;
  completed: boolean;
  errors: string[];
}

export function useFormMetrics(formName: string) {
  const metrics = useRef<Map<string, FieldMetrics>>(new Map());
  const {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldComplete,
    trackFieldError,
    trackFormStart,
    trackFormSubmit
  } = useFormTracking(formName);

  const startFieldTimer = useCallback((fieldName: string) => {
    const fieldMetric = metrics.current.get(fieldName) || {
      focusCount: 0,
      totalTime: 0,
      completed: false,
      errors: []
    };

    fieldMetric.focusCount++;
    metrics.current.set(fieldName, fieldMetric);

    trackFieldFocus(fieldName);

    return Date.now();
  }, [trackFieldFocus]);

  const endFieldTimer = useCallback((fieldName: string, startTime: number) => {
    const fieldMetric = metrics.current.get(fieldName);
    if (!fieldMetric) return;

    const timeSpent = Date.now() - startTime;
    fieldMetric.totalTime += timeSpent;

    trackFieldBlur(fieldName);
  }, [trackFieldBlur]);

  const markFieldComplete = useCallback((fieldName: string) => {
    const fieldMetric = metrics.current.get(fieldName);
    if (!fieldMetric) return;

    fieldMetric.completed = true;
    trackFieldComplete(fieldName);
  }, [trackFieldComplete]);

  const recordFieldError = useCallback((fieldName: string, error: string) => {
    const fieldMetric = metrics.current.get(fieldName);
    if (!fieldMetric) return;

    fieldMetric.errors.push(error);
    trackFieldError(fieldName, error);
  }, [trackFieldError]);

  const getFormCompletionRate = useCallback(() => {
    const allFields = Array.from(metrics.current.values());
    if (allFields.length === 0) return 0;

    const completedFields = allFields.filter(f => f.completed).length;
    return (completedFields / allFields.length) * 100;
  }, []);

  const getFieldWithMostTime = useCallback(() => {
    let maxTime = 0;
    let fieldName = '';

    metrics.current.forEach((metric, name) => {
      if (metric.totalTime > maxTime) {
        maxTime = metric.totalTime;
        fieldName = name;
      }
    });

    return { fieldName, time: maxTime };
  }, []);

  const submitForm = useCallback((success: boolean = true) => {
    const completionRate = getFormCompletionRate();
    const slowestField = getFieldWithMostTime();

    trackFormSubmit(success);

    // 추가 메트릭 전송
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'form_metrics', {
        form_name: formName,
        completion_rate: completionRate,
        slowest_field: slowestField.fieldName,
        slowest_field_time: Math.round(slowestField.time / 1000),
        total_fields: metrics.current.size
      });
    }

    // 디버그 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Form Metrics:', {
        formName,
        completionRate,
        slowestField,
        allMetrics: Array.from(metrics.current.entries())
      });
    }
  }, [formName, getFormCompletionRate, getFieldWithMostTime, trackFormSubmit]);

  return {
    startFieldTimer,
    endFieldTimer,
    markFieldComplete,
    recordFieldError,
    submitForm,
    getFormCompletionRate,
    getFieldWithMostTime,
    metrics: metrics.current
  };
}

/**
 * Utility function to automatically track all forms on a page
 */
export function autoTrackForms() {
  if (typeof window === 'undefined') return;

  const forms = document.querySelectorAll('form');

  forms.forEach((form, index) => {
    const formName = form.getAttribute('name') ||
                    form.getAttribute('id') ||
                    `form_${index}`;

    // 이미 추적 중인지 확인
    if (form.dataset.gaTracking) return;

    form.dataset.gaTracking = 'true';

    // 폼 시작 추적
    form.addEventListener('focusin', () => {
      if (!form.dataset.gaStartTracked) {
        form.dataset.gaStartTracked = 'true';
        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'form_start', {
            form_name: formName
          });
        }
      }
    }, { once: true });

    // 폼 제출 추적
    form.addEventListener('submit', (e) => {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'form_submit', {
          form_name: formName,
          success: true
        });
      }
    });
  });
}