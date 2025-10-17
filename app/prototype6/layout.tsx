import Link from 'next/link';

export default function Prototype6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/prototype6/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-gray-900">면접 질문 아카이브</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/prototype6/search"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl">🔍</span>
              </Link>
              <Link
                href="/prototype6/bookmarks"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl">📚</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-around">
            <Link
              href="/prototype6/dashboard"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs">홈</span>
            </Link>

            <Link
              href="/prototype6/bookmarks"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <span className="text-xl">📚</span>
              <span className="text-xs">북마크</span>
            </Link>

            <Link
              href="/prototype6/mypage"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
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
