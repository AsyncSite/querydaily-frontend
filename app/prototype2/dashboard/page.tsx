import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          안녕하세요, 철수님
        </h1>
        <p className="text-gray-500">7일 연속 학습중입니다</p>
      </div>

      {/* Today's Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">오늘의 질문</h2>
          <span className="text-xs text-gray-400">10분 전</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을 사용하고
          어떻게 동작하나요?
        </p>

        <div className="flex gap-2 text-xs text-gray-500 mb-6">
          <span className="px-2 py-1 bg-gray-50 rounded">Spring</span>
          <span className="px-2 py-1 bg-gray-50 rounded">AOP</span>
          <span className="px-2 py-1 bg-gray-50 rounded">로깅</span>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          답변 작성하기
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          답변 완료 시 <span className="text-indigo-600 font-medium">50 인사이트</span> 획득
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">학습 현황</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">23/30</div>
            <div className="text-sm text-gray-500">완료일</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">77%</div>
            <div className="text-sm text-gray-500">진도율</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GROWTH_PLAN</span>
            <span className="text-gray-900 font-medium">77%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: '77%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/prototype2/insights"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-indigo-200 transition-colors"
        >
          <div className="text-sm text-gray-500 mb-1">보유 인사이트</div>
          <div className="text-2xl font-bold text-gray-900">1,250</div>
        </Link>

        <Link
          href="/prototype2/achievements"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-indigo-200 transition-colors"
        >
          <div className="text-sm text-gray-500 mb-1">획득 뱃지</div>
          <div className="text-2xl font-bold text-gray-900">5개</div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <Link
          href="/prototype2/learning"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">학습 기록</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype2/resume"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">이력서 관리</span>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
