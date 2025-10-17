import Link from 'next/link';

export default function LearningPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">학습 기록</h1>
          <p className="text-gray-500">3개 질문에 답변했습니다</p>
        </div>
      </div>

      {/* Upgrade Prompt */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 border border-purple-200">
        <p className="font-semibold text-gray-900 mb-2">
          더 많은 질문으로 실력을 쌓으세요
        </p>
        <p className="text-sm text-gray-600 mb-3">
          프리미엄 플랜: 무제한 질문 + 프리미엄 답변
        </p>
        <Link
          href="/prototype3/pricing"
          className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          업그레이드
        </Link>
      </div>

      {/* Free Tier History (Limited) */}
      <div className="space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-gray-900 flex-1 leading-relaxed">
              Spring AOP를 사용하여 로깅을 구현할 때...
            </p>
            <span className="ml-3 px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-medium">
              완료
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                Spring
              </span>
            </div>
            <span className="text-xs text-gray-400">오늘</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-gray-900 flex-1 leading-relaxed">
              JPA N+1 문제를 해결하는 방법은?
            </p>
            <span className="ml-3 px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-medium">
              완료
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                JPA
              </span>
            </div>
            <span className="text-xs text-gray-400">어제</span>
          </div>
        </div>
      </div>

      {/* Locked Stats */}
      <div className="relative">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 opacity-60 blur-sm">
          <h3 className="font-semibold text-gray-900 mb-4">상세 통계</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">92%</div>
              <div className="text-sm text-gray-500">평균 정답률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">14일</div>
              <div className="text-sm text-gray-500">최장 연속</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl mb-2">🔒</div>
          <p className="text-sm font-medium text-gray-900 mb-2">
            프리미엄 전용
          </p>
          <Link
            href="/prototype3/pricing"
            className="text-sm text-purple-600 hover:underline font-medium"
          >
            플랜 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
