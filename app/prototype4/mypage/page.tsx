import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            홍
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
            <p className="text-gray-500 mb-2">hong@example.com</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium">
                GROWTH_PLAN
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-sm font-medium">
                💎 2,850
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">23일</div>
          <div className="text-sm text-gray-500 mb-2">학습일</div>
          <div className="text-xs text-orange-600">7일 연속 🔥</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">85점</div>
          <div className="text-sm text-gray-500 mb-2">평균 점수</div>
          <div className="text-xs text-emerald-600">+7점 향상 ↑</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">3,200</div>
          <div className="text-sm text-gray-500 mb-2">획득 인사이트</div>
          <div className="text-xs text-gray-500">350개 사용</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">5개</div>
          <div className="text-sm text-gray-500 mb-2">획득 뱃지</div>
          <div className="text-xs text-gray-400">3개 진행중</div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="font-semibold text-gray-900 mb-3">📦 구독 정보</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">GROWTH_PLAN</div>
              <div className="text-sm text-gray-600">23/30일 진행중</div>
            </div>
            <div className="text-orange-600 font-semibold">₩79,000</div>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
              style={{ width: '77%' }}
            ></div>
          </div>
          <div className="pt-2">
            <Link
              href="/prototype4/pricing"
              className="block w-full py-2 text-center text-orange-600 font-medium hover:underline"
            >
              플랜 관리하기 →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="space-y-2">
        <Link
          href="/prototype4/insights"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💎</span>
              <span className="text-gray-900 font-medium">인사이트 샵</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype4/community"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-900 font-medium">우수 답변</span>
            </div>
            <span className="text-orange-600 text-sm font-medium">2개</span>
          </div>
        </Link>

        <Link
          href="/prototype4/settings"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <span className="text-gray-900 font-medium">설정</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
