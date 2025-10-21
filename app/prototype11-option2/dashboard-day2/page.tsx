'use client';

import Link from 'next/link';

export default function DashboardDay2Page() {
  const todayQuestions = [
    {
      id: 4,
      title: 'Redis 캐싱 전략과 적용 사례',
      category: 'Redis',
      difficulty: '중급',
      answerCount: 10,
      previewCount: 2
    },
    {
      id: 5,
      title: 'React useEffect의 dependency array',
      category: 'React',
      difficulty: '중급',
      answerCount: 12,
      previewCount: 2
    },
    {
      id: 6,
      title: 'DB 인덱스 설계 원칙',
      category: 'Database',
      difficulty: '중급',
      answerCount: 8,
      previewCount: 2
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Achievement */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">🔥</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            어제 1개 답변 공유했어요!
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
            <div className="text-3xl font-bold mb-1">+10 💎</div>
            <div className="text-pink-100 text-sm">인사이트 획득</div>
          </div>
        </div>

        {/* Insights Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">💎 현재 인사이트</h3>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-pink-600">10</span>
              <span className="text-sm text-gray-500">/ 50 필요</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-600" style={{width: '20%'}}></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm mb-1">
                  다음 목표: 하루 무제한 열람
                </div>
                <div className="text-xs text-gray-600">
                  40 💎만 더 모으면 24시간 동안 모든 질문 무제한!
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">남은 답변</span>
                <span className="font-bold text-amber-700">4개만 공유하면 달성!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yesterday's Activity */}
        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold text-gray-900 text-sm">어제 활동</div>
              <div className="text-xs text-gray-600">Spring AOP 답변 공유 (+10 💎)</div>
            </div>
          </div>
        </div>

        {/* Today's Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">🆕 오늘의 새로운 질문</h2>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11-option2/questions/${question.id}`}
                className="block bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gray-100 text-gray-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {question.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                        {question.category}
                      </span>
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>👀 {question.previewCount}개 미리보기</span>
                      <span>·</span>
                      <span>💬 총 {question.answerCount}개 답변</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-indigo-50 rounded-2xl p-5 shadow-sm border border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">🚀</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 2 전략</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>• 어제 받은 인사이트가 명확히 표시됨</div>
                <div>• "40 💎만 더!"라는 구체적 목표</div>
                <div>• 매일 2개씩 미리보기로 가치 먼저 확인</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/prototype11/compare-next-day"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            ← 비교 페이지로 돌아가기
          </Link>
        </div>
    </div>
  );
}
