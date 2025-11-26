'use client';

/**
 * FormTracker Component & Hook
 * Tracks form interactions including field focus, completion, and abandonment
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import {
  trackFormStart,
  trackFormField,
  trackFormAbandon,
  trackFormSubmit,
  isBrowser,
  type PageType,
  type ProductId,
} from '@/lib/analytics';
import { DEBOUNCE_DELAYS } from '@/lib/analytics/config';

interface FormTrackerProps {
  children: React.ReactNode;
  formName: string;
  pageType: PageType;
  productId?: ProductId;
  totalSteps?: number;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

interface FieldState {
  startTime: number;
  isCompleted: boolean;
  totalTime: number;
}

export function FormTracker({
  children,
  formName,
  pageType,
  productId,
  totalSteps,
  onSubmit,
  className,
}: FormTrackerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const formStartTime = useRef<number | null>(null);
  const fieldStates = useRef<Map<string, FieldState>>(new Map());
  const currentField = useRef<string | null>(null);
  const hasStarted = useRef(false);

  // Track form start
  const handleFormStart = useCallback(() => {
    if (hasStarted.current) return;

    hasStarted.current = true;
    formStartTime.current = Date.now();

    trackFormStart({
      formName,
      totalSteps,
      pageType,
      productId,
    });
  }, [formName, totalSteps, pageType, productId]);

  // Track field focus
  const handleFieldFocus = useCallback(
    (fieldName: string) => {
      if (!hasStarted.current) {
        handleFormStart();
      }

      currentField.current = fieldName;

      const existingState = fieldStates.current.get(fieldName);
      if (!existingState) {
        fieldStates.current.set(fieldName, {
          startTime: Date.now(),
          isCompleted: false,
          totalTime: 0,
        });
      } else {
        // Resume tracking time
        fieldStates.current.set(fieldName, {
          ...existingState,
          startTime: Date.now(),
        });
      }
    },
    [handleFormStart]
  );

  // Track field blur
  const handleFieldBlur = useCallback(
    (fieldName: string, value: string) => {
      const state = fieldStates.current.get(fieldName);
      if (!state) return;

      const timeOnField = (Date.now() - state.startTime) / 1000;
      const isCompleted = value.trim().length > 0;
      const newTotalTime = state.totalTime + timeOnField;

      fieldStates.current.set(fieldName, {
        startTime: Date.now(),
        isCompleted,
        totalTime: newTotalTime,
      });

      // Track field interaction
      trackFormField({
        formName,
        fieldName,
        isCompleted,
        timeOnField: newTotalTime,
        pageType,
        productId,
      });

      currentField.current = null;
    },
    [formName, pageType, productId]
  );

  // Track form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      if (formStartTime.current) {
        const completionTime = (Date.now() - formStartTime.current) / 1000;

        trackFormSubmit({
          formName,
          completionTime,
          pageType,
          productId,
        });
      }

      onSubmit?.(e);
    },
    [formName, pageType, productId, onSubmit]
  );

  // Track form abandonment
  useEffect(() => {
    if (!isBrowser()) return;

    const handleBeforeUnload = () => {
      if (hasStarted.current && formStartTime.current) {
        const completedFields = Array.from(fieldStates.current.entries()).filter(
          ([, state]) => state.isCompleted
        );
        const totalFields = fieldStates.current.size;
        const completionRate = totalFields > 0 ? (completedFields.length / totalFields) * 100 : 0;

        // Only track abandonment if form was started but not submitted
        if (completionRate < 100) {
          trackFormAbandon({
            formName,
            abandonedAtField: currentField.current || 'unknown',
            completionRate,
            timeSpent: (Date.now() - formStartTime.current) / 1000,
            pageType,
            productId,
          });
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formName, pageType, productId]);

  // Setup event listeners on form fields
  useEffect(() => {
    if (!isBrowser() || !formRef.current) return;

    const form = formRef.current;
    const inputs = form.querySelectorAll('input, select, textarea');

    const focusHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fieldName = target.name || target.id || 'unnamed';
      handleFieldFocus(fieldName);
    };

    const blurHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fieldName = target.name || target.id || 'unnamed';
      handleFieldBlur(fieldName, target.value);
    };

    inputs.forEach((input) => {
      input.addEventListener('focus', focusHandler);
      input.addEventListener('blur', blurHandler);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', focusHandler);
        input.removeEventListener('blur', blurHandler);
      });
    };
  }, [handleFieldFocus, handleFieldBlur]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={className}
      data-form={formName}
    >
      {children}
    </form>
  );
}

/**
 * Hook for manual form tracking (when not using FormTracker component)
 */
export function useFormTracking(params: {
  formName: string;
  pageType: PageType;
  productId?: ProductId;
  totalSteps?: number;
}) {
  const { formName, pageType, productId, totalSteps } = params;

  const formStartTime = useRef<number | null>(null);
  const fieldStates = useRef<Map<string, FieldState>>(new Map());
  const currentField = useRef<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startForm = useCallback(() => {
    if (hasStarted) return;

    setHasStarted(true);
    formStartTime.current = Date.now();

    trackFormStart({
      formName,
      totalSteps,
      pageType,
      productId,
    });
  }, [hasStarted, formName, totalSteps, pageType, productId]);

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      if (!hasStarted) {
        startForm();
      }

      currentField.current = fieldName;
      fieldStates.current.set(fieldName, {
        startTime: Date.now(),
        isCompleted: false,
        totalTime: fieldStates.current.get(fieldName)?.totalTime || 0,
      });
    },
    [hasStarted, startForm]
  );

  const trackFieldBlur = useCallback(
    (fieldName: string, value: string, stepNumber?: number) => {
      const state = fieldStates.current.get(fieldName);
      if (!state) return;

      const timeOnField = (Date.now() - state.startTime) / 1000;
      const isCompleted = value.trim().length > 0;
      const newTotalTime = state.totalTime + timeOnField;

      fieldStates.current.set(fieldName, {
        startTime: Date.now(),
        isCompleted,
        totalTime: newTotalTime,
      });

      trackFormField({
        formName,
        fieldName,
        isCompleted,
        timeOnField: newTotalTime,
        stepNumber,
        pageType,
        productId,
      });

      currentField.current = null;
    },
    [formName, pageType, productId]
  );

  const submitForm = useCallback(() => {
    if (formStartTime.current) {
      const completionTime = (Date.now() - formStartTime.current) / 1000;

      trackFormSubmit({
        formName,
        completionTime,
        pageType,
        productId,
      });
    }
  }, [formName, pageType, productId]);

  const abandonForm = useCallback(
    (abandonedAtField?: string) => {
      if (!hasStarted || !formStartTime.current) return;

      const completedFields = Array.from(fieldStates.current.entries()).filter(
        ([, state]) => state.isCompleted
      );
      const totalFields = fieldStates.current.size;
      const completionRate = totalFields > 0 ? (completedFields.length / totalFields) * 100 : 0;

      trackFormAbandon({
        formName,
        abandonedAtField: abandonedAtField || currentField.current || 'unknown',
        completionRate,
        timeSpent: (Date.now() - formStartTime.current) / 1000,
        pageType,
        productId,
      });
    },
    [hasStarted, formName, pageType, productId]
  );

  return {
    startForm,
    trackFieldFocus,
    trackFieldBlur,
    submitForm,
    abandonForm,
    hasStarted,
  };
}

export default FormTracker;
