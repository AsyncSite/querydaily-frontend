import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            홍
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
            <p className="text-gray-500">hong@example.com</p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
            백엔드 3년차
          </span>
          <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm">
            GROWTH_PLAN
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">23일</div>
          <div className="text-sm text-gray-500">총 학습일</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">14일</div>
          <div className="text-sm text-gray-500">최장 연속</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">2,350</div>
          <div className="text-sm text-gray-500">획득 인사이트</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">92%</div>
          <div className="text-sm text-gray-500">평균 정답률</div>
        </div>
      </div>

      {/* Purchases */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">구매 이력</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-900 mb-1">
                GROWTH_PLAN (30일)
              </div>
              <div className="text-sm text-gray-500">진행중 · 23/30일</div>
            </div>
            <div className="text-indigo-600 font-semibold">₩79,000</div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 mb-1">CRITICAL_HIT</div>
              <div className="text-sm text-gray-500">완료 · 2025.01.05</div>
            </div>
            <div className="text-gray-400 font-semibold">₩49,000</div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="space-y-2">
        <Link
          href="/prototype2/resume"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">이력서 관리</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype2/achievements"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">뱃지 현황</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype2/settings"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">설정</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
