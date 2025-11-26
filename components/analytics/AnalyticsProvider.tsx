'use client';

/**
 * AnalyticsProvider Component
 * Provides analytics context and initializes GA tracking
 */

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import Script from 'next/script';
import {
  gaTracker,
  GA_MEASUREMENT_ID,
  isGAEnabled,
  initGlobalErrorHandlers,
  isBrowser,
  type PageType,
  type ProductId,
  type AnalyticsSession,
} from '@/lib/analytics';

// ============================================
// Context Types
// ============================================

interface AnalyticsContextValue {
  isInitialized: boolean;
  isDebugMode: boolean;
  session: AnalyticsSession | null;
  currentPage: PageType;
  currentProduct: ProductId | null;
  setCurrentPage: (page: PageType) => void;
  setCurrentProduct: (product: ProductId | null) => void;
  setDebugMode: (enabled: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

// ============================================
// Provider Component
// ============================================

interface AnalyticsProviderProps {
  children: React.ReactNode;
  debug?: boolean;
}

export function AnalyticsProvider({ children, debug = false }: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(debug);
  const [session, setSession] = useState<AnalyticsSession | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [currentProduct, setCurrentProduct] = useState<ProductId | null>(null);

  // Initialize tracker when GA script loads
  const handleScriptLoad = useCallback(() => {
    gaTracker.init();
    gaTracker.setDebugMode(isDebugMode);
    setSession(gaTracker.getSession());
    setIsInitialized(true);

    if (isDebugMode) {
      console.log('[GA4] Analytics initialized', { measurementId: GA_MEASUREMENT_ID });
    }
  }, [isDebugMode]);

  // Setup global error handlers
  useEffect(() => {
    if (!isInitialized) return;

    const cleanup = initGlobalErrorHandlers({
      pageType: currentPage,
      productId: currentProduct ?? undefined,
    });

    return cleanup;
  }, [isInitialized, currentPage, currentProduct]);

  // Update debug mode
  const handleSetDebugMode = useCallback((enabled: boolean) => {
    setIsDebugMode(enabled);
    gaTracker.setDebugMode(enabled);
  }, []);

  // Context value
  const contextValue = useMemo<AnalyticsContextValue>(
    () => ({
      isInitialized,
      isDebugMode,
      session,
      currentPage,
      currentProduct,
      setCurrentPage,
      setCurrentProduct,
      setDebugMode: handleSetDebugMode,
    }),
    [isInitialized, isDebugMode, session, currentPage, currentProduct, handleSetDebugMode]
  );

  // Don't render GA script if not enabled
  if (!isGAEnabled()) {
    return (
      <AnalyticsContext.Provider value={contextValue}>
        {children}
      </AnalyticsContext.Provider>
    );
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              debug_mode: ${isDebugMode}
            });
          `,
        }}
      />
      {children}
    </AnalyticsContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);

  if (!context) {
    // Return default values if used outside provider
    return {
      isInitialized: false,
      isDebugMode: false,
      session: null,
      currentPage: 'landing',
      currentProduct: null,
      setCurrentPage: () => {},
      setCurrentProduct: () => {},
      setDebugMode: () => {},
    };
  }

  return context;
}

// ============================================
// Page Analytics Hook
// ============================================

/**
 * Hook for page-level analytics
 * Automatically sets current page and product in context
 */
export function usePageAnalytics(params: {
  pageType: PageType;
  productId?: ProductId;
}) {
  const { pageType, productId } = params;
  const { setCurrentPage, setCurrentProduct, session } = useAnalytics();

  useEffect(() => {
    setCurrentPage(pageType);
    setCurrentProduct(productId ?? null);
  }, [pageType, productId, setCurrentPage, setCurrentProduct]);

  return {
    session,
    pageType,
    productId,
  };
}

export default AnalyticsProvider;
