'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoVersion15 from './components/LogoVersion15';
import LogoDesign2 from './components/LogoDesign2';
import LogoDesign6 from './components/LogoDesign6';
import LogoInspired1 from './components/LogoInspired1';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export default function Prototype11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/prototype11';
  const isFullscreenPage = pathname?.startsWith('/prototype11/wireframe') ||
                          pathname?.startsWith('/prototype11/compare') ||
                          pathname?.startsWith('/prototype11/onboarding');
  const [showNotifications, setShowNotifications] = useState(false);

  // 신규 유저는 알림 없음
  const notifications: { id: number; text: string; time: string; unread: boolean }[] = [];

  const unreadCount = notifications.filter(n => n.unread).length;

  // 전체 화면 페이지는 모바일 프레임 없이
  if (isFullscreenPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative">
        {/* Header - 로그인 후에만 */}
        {!isLandingPage && (
          <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <Link href="/prototype11/dashboard">
                <LogoDesign2 />
              </Link>
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

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-16 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-20">
                <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">알림</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                      <div className="text-4xl mb-3">🔔</div>
                      <p className="text-sm text-gray-500">아직 알림이 없습니다</p>
                      <p className="text-xs text-gray-400 mt-1">답변을 공유하면 알림을 받을 수 있어요</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button className="text-sm text-emerald-600 hover:underline">
                      모두 읽음으로 표시
                    </button>
                  </div>
                )}
              </div>
            )}
          </header>
        )}

        {/* Content */}
        <main className={!isLandingPage ? 'pt-20 pb-20' : ''}>
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
                    ? 'text-emerald-600'
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
                    ? 'text-emerald-600'
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
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 ring-2 ring-emerald-600 ring-offset-2'
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
