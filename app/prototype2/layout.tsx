'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Prototype2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 인덱스 페이지에서는 네비게이션 숨김
  if (pathname === '/prototype2') {
    return <>{children}</>;
  }

  const navItems = [
    { name: '홈', href: '/prototype2/dashboard' },
    { name: '학습', href: '/prototype2/learning' },
    { name: '샵', href: '/prototype2/insights' },
    { name: '마이', href: '/prototype2/mypage' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white min-h-screen pb-20">
        {/* Header - Ultra Minimal */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="px-6 h-14 flex items-center justify-between">
            <Link href="/prototype2" className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                QueryDaily
              </span>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">
                v2
              </span>
            </Link>

            <Link
              href="/prototype2/settings"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              설정
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="min-h-[calc(100vh-7rem)]">{children}</main>

        {/* Bottom Navigation - Minimal */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 z-50">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 text-center py-2 transition-colors ${
                    isActive
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
