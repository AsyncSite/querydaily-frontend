import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Free Plan Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 border border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              무료 플랜 사용중
            </h2>
            <p className="text-sm text-gray-600">
              하루 1개 질문만 이용 가능합니다
            </p>
          </div>
        </div>
        <Link
          href="/prototype3/pricing"
          className="block mt-4 w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          프리미엄으로 업그레이드 →
        </Link>
      </div>

      {/* Today's Question (Free) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">오늘의 질문</h2>
            <p className="text-xs text-emerald-600 font-medium">무료 이용 가능</p>
          </div>
          <span className="text-xs text-gray-400">10분 전</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을 사용하고
          어떻게 동작하나요?
        </p>

        <div className="flex gap-2 text-xs text-gray-500 mb-6">
          <span className="px-2 py-1 bg-gray-50 rounded">Spring</span>
          <span className="px-2 py-1 bg-gray-50 rounded">AOP</span>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          답변 작성하기
        </button>
      </div>

      {/* Locked Additional Questions */}
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 opacity-60 blur-[2px]">
          <h3 className="font-semibold text-gray-900 mb-3">추가 질문 2개</h3>
          <div className="space-y-2">
            <div className="text-gray-600">JPA N+1 문제를 해결하는...</div>
            <div className="text-gray-600">Redis와 Memcached의 차이...</div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl mb-3">🔒</div>
          <p className="font-semibold text-gray-900 mb-2">프리미엄 기능</p>
          <Link
            href="/prototype3/pricing"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            업그레이드하기
          </Link>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">
          프리미엄으로 더 많은 기능을
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-red-500">✗</span>
            <span className="text-gray-600">하루 1개 질문 제한</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500">✓</span>
            <span className="text-gray-900 font-medium">
              프리미엄: 무제한 질문
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500">✓</span>
            <span className="text-gray-900 font-medium">
              프리미엄 답변 & 힌트
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500">✓</span>
            <span className="text-gray-900 font-medium">이력서 AI 분석</span>
          </div>
        </div>

        <Link
          href="/prototype3/pricing"
          className="block mt-4 w-full py-2.5 bg-white border border-purple-300 text-purple-600 text-center rounded-lg font-medium hover:bg-purple-50 transition-colors"
        >
          플랜 비교하기
        </Link>
      </div>

      {/* Free Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">3일</div>
          <div className="text-sm text-gray-500">연속 학습</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
            <span className="text-2xl">🔒</span>
          </div>
          <div className="text-2xl font-bold text-gray-300 mb-1">???</div>
          <div className="text-sm text-gray-400">인사이트</div>
        </div>
      </div>
    </div>
  );
}
