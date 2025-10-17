import Link from 'next/link';

export default function Prototype7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/prototype7/dashboard" className="flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">🔥</span>
              <span className="font-bold">면접 마스터</span>
            </Link>
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1">
                <span className="text-lg">🔥</span>
                <span className="font-bold">7일</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-around">
            <Link
              href="/prototype7/dashboard"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <span className="text-xl">📚</span>
              <span className="text-xs">학습</span>
            </Link>

            <Link
              href="/prototype7/review"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <span className="text-xl">🔄</span>
              <span className="text-xs">복습</span>
            </Link>

            <Link
              href="/prototype7/mypage"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <span className="text-xl">📊</span>
              <span className="text-xs">통계</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
