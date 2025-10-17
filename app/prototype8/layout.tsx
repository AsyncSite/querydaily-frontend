import Link from 'next/link';

export default function Prototype8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/prototype8/feed" className="flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">💬</span>
              <span className="font-bold">면접톡</span>
            </Link>
            <div className="flex items-center gap-3 text-white">
              <Link href="/prototype8/feed">
                <span className="text-xl">🔥</span>
              </Link>
              <Link href="/prototype8/profile">
                <div className="w-8 h-8 bg-white/30 rounded-full"></div>
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
              href="/prototype8/feed"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="text-xs">피드</span>
            </Link>

            <Link
              href="/prototype8/companies"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <span className="text-xl">🏢</span>
              <span className="text-xs">기업</span>
            </Link>

            <Link
              href="/prototype8/profile"
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
