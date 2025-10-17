import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
            홍
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
            <p className="text-gray-500">hong@example.com</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
            무료 플랜
          </span>
        </div>

        <Link
          href="/prototype3/pricing"
          className="block w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-lg font-medium hover:shadow-lg transition-all"
        >
          프리미엄으로 업그레이드
        </Link>
      </div>

      {/* Limited Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">학습 현황</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-1">3일</div>
            <div className="text-sm text-gray-500">총 학습일</div>
          </div>

          <div className="relative text-center p-4 bg-gray-50 rounded-xl">
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
              <span className="text-xl">🔒</span>
            </div>
            <div className="text-2xl font-bold text-gray-300 mb-1">??</div>
            <div className="text-sm text-gray-400">연속 학습</div>
          </div>
        </div>
      </div>

      {/* Locked Features */}
      <div className="space-y-3">
        <div className="relative">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 opacity-50">
            <h3 className="font-semibold text-gray-900 mb-2">구매 이력</h3>
            <p className="text-sm text-gray-500">구독 중인 플랜이 없습니다</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 opacity-50 blur-sm">
            <h3 className="font-semibold text-gray-900 mb-2">보유 인사이트</h3>
            <div className="text-3xl font-bold text-indigo-600">1,250</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="space-y-2">
        <Link
          href="/prototype3/resume"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">이력서 관리</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <div className="relative">
          <div className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 opacity-50">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">뱃지 현황</span>
              <span className="text-gray-300">🔒</span>
            </div>
          </div>
        </div>

        <Link
          href="/prototype3/settings"
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
