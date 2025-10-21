'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoDesign2 from './components/LogoDesign2';

export default function Prototype11Option2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/prototype11-option2';
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: { id: number; text: string; time: string; unread: boolean }[] = [];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative">
        {!isLandingPage && (
          <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoDesign2 />
                <div className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded">
                  Option 2
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {showNotifications && (
              <div className="absolute top-16 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-20">
                <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">알림</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-12 text-center">
                    <div className="text-4xl mb-3">🔔</div>
                    <p className="text-sm text-gray-500">아직 알림이 없습니다</p>
                  </div>
                </div>
              </div>
            )}
          </header>
        )}

        <main className={!isLandingPage ? 'pt-20 pb-20' : ''}>
          {children}
        </main>

        {!isLandingPage && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 z-10">
            <div className="flex items-center justify-around py-3 px-6">
              <Link
                href="/prototype11-option2/dashboard"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  pathname === '/prototype11-option2/dashboard'
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>

              <Link
                href="/prototype11/compare"
                className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
