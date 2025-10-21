import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Streak Card */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-8 text-white text-center">
        <div className="text-6xl mb-4">🔥</div>
        <div className="text-4xl font-bold mb-2">7일</div>
        <div className="text-emerald-50">연속 학습 중! 최고 기록이에요</div>
      </div>

      {/* Insight Points */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💎</span>
          <div>
            <div className="text-xs text-gray-500">보유 인사이트</div>
            <div className="text-2xl font-bold text-emerald-600">150</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200">
          <div className="text-sm font-medium text-gray-900 mb-1">
            답변 공유로 인사이트 획득
          </div>
          <div className="text-xs text-emerald-700">
            다음 공유 시 +10 💎
          </div>
        </div>
      </div>

      {/* Today Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">오늘의 학습</h3>
          <span className="text-sm text-gray-500">Day 7</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">진행률</span>
            <span className="text-sm font-medium text-emerald-600">2/3 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Spring Bean 생명주기</div>
              <div className="text-xs text-gray-500">완료</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">JPA 영속성 컨텍스트</div>
              <div className="text-xs text-gray-500">완료</div>
            </div>
          </div>

          <Link href="/prototype7/learn/3" className="block">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-emerald-500">
              <span className="text-2xl">📝</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Spring AOP 동작 원리</div>
                <div className="text-xs text-emerald-600">다음 질문 →</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📈 전체 진행률</h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">🌱 기초 다지기</span>
              <span className="text-sm font-medium text-emerald-600">15/30 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">🎯 실전 준비</span>
              <span className="text-sm font-medium text-gray-400">0/50</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">🚀 심화</span>
              <span className="text-sm font-medium text-gray-400">0/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        <Link
          href="/prototype7/path"
          className="block mt-4 w-full py-2.5 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          학습 경로 전체 보기
        </Link>
      </div>

      {/* Review Due */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔔</span>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">복습할 질문 3개</h4>
            <p className="text-sm text-gray-600 mb-3">
              3일 전에 학습한 질문을 복습할 시간입니다
            </p>
            <Link
              href="/prototype7/review"
              className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
            >
              복습 시작하기
            </Link>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-3">💡 학습 팁</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>매일 같은 시간에 학습하면 습관이 됩니다</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span><strong>답변 후 다른 사람들의 생각을 엿보며</strong> 새로운 관점을 배워보세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>답변을 공유하면 인사이트를 받을 수 있어요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>복습은 기억을 2배 강화시킵니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
