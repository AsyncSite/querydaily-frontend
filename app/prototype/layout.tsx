'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 인덱스 페이지에서는 네비게이션 숨김
  if (pathname === '/prototype') {
    return <>{children}</>;
  }

  const navItems = [
    { name: '홈', href: '/prototype/dashboard', icon: '🏠' },
    { name: '학습', href: '/prototype/learning', icon: '📚' },
    { name: '인사이트', href: '/prototype/insights', icon: '💡' },
    { name: '마이', href: '/prototype/mypage', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-start justify-center">
      {/* Mobile Frame Container - 데스크톱에서도 모바일처럼 보이게 */}
      <div className="w-full max-w-md bg-[#0d0d0d] min-h-screen pb-20 shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 bg-[#0d0d0d]/95 backdrop-blur-lg border-b border-[#2a2a2a] z-50">
          <div className="px-4 h-16 flex items-center justify-between">
            <Link href="/prototype" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span className="text-[#c3e88d]">Query</span>Daily
              </span>
              <span className="text-xs bg-[#c3e88d] text-[#0d0d0d] px-2 py-0.5 rounded-full font-semibold">
                PROTOTYPE
              </span>
            </Link>

            <Link
              href="/prototype/settings"
              className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              ⚙️
            </Link>
          </div>
        </header>

        {/* Content */}
        <main>{children}</main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0d0d0d] border-t border-[#2a2a2a] z-50">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#c3e88d]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
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
