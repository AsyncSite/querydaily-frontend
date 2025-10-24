'use client';

import { useEffect } from 'react';
import { setupGlobalErrorTracking } from './ErrorBoundary';

/**
 * GlobalErrorTracker Component
 *
 * 애플리케이션 전역의 에러를 추적합니다.
 * app/layout.tsx에 추가하여 모든 페이지에서 에러 추적이 활성화됩니다.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import GlobalErrorTracker from '@/components/analytics/GlobalErrorTracker';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <GlobalErrorTracker />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function GlobalErrorTracker() {
  useEffect(() => {
    // 전역 에러 핸들러 설정
    setupGlobalErrorTracking();

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Global Error Tracking: Initialized');
    }
  }, []);

  return null;
}