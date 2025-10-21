import Link from 'next/link';

export default function Prototype9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/prototype9/dashboard" className="flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">📋</span>
              <span className="font-bold">면접 준비실</span>
            </Link>
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm">D-15</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-around">
            <Link
              href="/prototype9/dashboard"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="text-xl">📝</span>
              <span className="text-xs">준비</span>
            </Link>

            <Link
              href="/prototype9/scenarios"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="text-xl">🎯</span>
              <span className="text-xs">시나리오</span>
            </Link>

            <Link
              href="/prototype9/mypage"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="text-xl">📊</span>
              <span className="text-xs">진행률</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
