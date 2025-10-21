import Link from 'next/link';

export default function Prototype10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-gray-900 shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/prototype10/dashboard" className="flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">⚔️</span>
              <span className="font-bold">면접 배틀</span>
            </Link>
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold">1,245</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900">{children}</main>

        {/* Bottom Navigation */}
        <nav className="bg-gray-800 border-t border-gray-700 px-6 py-3">
          <div className="flex items-center justify-around">
            <Link
              href="/prototype10/dashboard"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs">홈</span>
            </Link>

            <Link
              href="/prototype10/challenges"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="text-xl">🎯</span>
              <span className="text-xs">챌린지</span>
            </Link>

            <Link
              href="/prototype10/leaderboard"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="text-xl">🏆</span>
              <span className="text-xs">랭킹</span>
            </Link>

            <Link
              href="/prototype10/mypage"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
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
