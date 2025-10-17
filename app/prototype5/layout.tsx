import Link from 'next/link';

export default function Prototype5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/prototype5/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="font-bold text-gray-900">QueryDaily</span>
          </Link>

          {/* Login Button (Non-logged in state) */}
          <Link
            href="/prototype5/auth/login"
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
          >
            로그인
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/prototype5/dashboard"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs">홈</span>
            </Link>

            <Link
              href="/prototype5/community"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">🏆</span>
              <span className="text-xs">커뮤니티</span>
            </Link>

            <Link
              href="/prototype5/insights"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">💎</span>
              <span className="text-xs">인사이트</span>
            </Link>

            <Link
              href="/prototype5/pricing"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">💳</span>
              <span className="text-xs">플랜</span>
            </Link>

            <Link
              href="/prototype5/mypage"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">👤</span>
              <span className="text-xs">MY</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
