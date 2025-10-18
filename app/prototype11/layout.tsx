'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Prototype11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/prototype11';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative">
        {/* Header - 로그인 후에만 */}
        {!isLandingPage && (
          <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="font-bold text-lg tracking-tight text-gray-900">
              쿼리데일리
            </div>
          </header>
        )}

        {/* Content */}
        <main className={!isLandingPage ? 'pt-16 pb-20' : ''}>
          {children}
        </main>

        {/* Bottom GNB - 로그인 후에만 */}
        {!isLandingPage && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 z-10">
            <div className="flex items-center justify-around py-3 px-6">
              {/* Home */}
              <Link
                href="/prototype11/dashboard"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  pathname === '/prototype11/dashboard'
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>

              {/* Categories */}
              <Link
                href="/prototype11/categories"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  pathname === '/prototype11/categories' || pathname?.startsWith('/prototype11/questions')
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </Link>

              {/* Profile */}
              <Link
                href="/prototype11/mypage"
                className={`flex flex-col items-center gap-1 transition-colors`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  pathname === '/prototype11/mypage'
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-indigo-600 ring-offset-2'
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  나
                </div>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
