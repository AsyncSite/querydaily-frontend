import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Plan Status */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              GROWTH_PLAN 진행중
            </h2>
            <p className="text-gray-600">23일차 / 30일</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600">77%</div>
            <div className="text-sm text-gray-500">완료율</div>
          </div>
        </div>
        <div className="w-full bg-orange-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full"
            style={{ width: '77%' }}
          ></div>
        </div>
      </div>

      {/* Insights Earning */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">💎 인사이트 획득</h3>
          <Link
            href="/prototype4/insights"
            className="text-orange-600 text-sm font-medium hover:underline"
          >
            샵 보기 →
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <span className="text-gray-700">오늘 답변 제출</span>
            </div>
            <span className="text-orange-600 font-bold">+100</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <span className="text-gray-700">7일 연속 학습</span>
            </div>
            <span className="text-orange-600 font-bold">+150</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-700">30일 완주 시</span>
            </div>
            <span className="text-gray-400 font-bold">+1,500</span>
          </div>
        </div>
      </div>

      {/* Today's Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">📬 오늘의 질문</h3>
          <span className="text-xs text-gray-400">10분 전</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을 사용하고
          어떻게 동작하나요?
        </p>

        <div className="flex gap-2 mb-6">
          <span className="text-xs px-2 py-1 bg-gray-50 rounded">Spring</span>
          <span className="text-xs px-2 py-1 bg-gray-50 rounded">AOP</span>
          <span className="text-xs px-2 py-1 bg-gray-50 rounded">로깅</span>
        </div>

        <Link
          href="/prototype4/answer"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          답변 작성하기 (+100 인사이트)
        </Link>
      </div>

      {/* Expert Feedback Status */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-3xl">👨‍💻</span>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              전문가 피드백 대기중
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              어제 제출한 답변을 검토중입니다
            </p>
            <div className="text-sm text-blue-600 font-medium">
              ⏳ 예상 도착: 14시간 후
            </div>
          </div>
        </div>
      </div>

      {/* Insights Premium Features */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          💎 인사이트로 더 많이 학습하기
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">추가 질문 3개</div>
              <div className="text-sm text-gray-600">오늘 질문 외 3개 더</div>
            </div>
            <div className="text-orange-600 font-bold">500</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">1:1 전문가 세션</div>
              <div className="text-sm text-gray-600">30분 실시간 상담</div>
            </div>
            <div className="text-orange-600 font-bold">1,000</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">모의 면접</div>
              <div className="text-sm text-gray-600">음성 답변 + AI 평가</div>
            </div>
            <div className="text-orange-600 font-bold">1,500</div>
          </div>
        </div>
        <Link
          href="/prototype4/insights"
          className="block mt-4 w-full py-2.5 bg-white border border-amber-300 text-orange-600 text-center rounded-lg font-medium hover:bg-amber-50 transition-colors"
        >
          인사이트 샵 바로가기
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">85점</div>
          <div className="text-sm text-gray-500">평균 점수</div>
          <div className="text-xs text-emerald-600 mt-1">+7점 상승 ↑</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">7일</div>
          <div className="text-sm text-gray-500">연속 학습</div>
          <div className="text-xs text-gray-400 mt-1">최고 기록!</div>
        </div>
      </div>
    </div>
  );
}
