'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Prototype4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/prototype4') {
    return <>{children}</>;
  }

  const navItems = [
    { name: '홈', href: '/prototype4/dashboard', icon: '🏠' },
    { name: '답변', href: '/prototype4/answer', icon: '✍️' },
    { name: '커뮤니티', href: '/prototype4/community', icon: '👥' },
    { name: '샵', href: '/prototype4/insights', icon: '💎' },
    { name: '마이', href: '/prototype4/mypage', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center">
      <div className="w-full max-w-md bg-white min-h-screen pb-20">
        {/* Header with Insights */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="px-6 h-14 flex items-center justify-between">
            <Link href="/prototype4" className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                QueryDaily
              </span>
              <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-medium">
                v4
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/prototype4/insights"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <span className="text-sm">💎</span>
                <span className="text-sm font-bold">2,850</span>
              </Link>
              <Link
                href="/prototype4/settings"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                ⚙️
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="min-h-[calc(100vh-7rem)]">{children}</main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 z-50">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
