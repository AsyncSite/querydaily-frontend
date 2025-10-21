'use client';

import Link from 'next/link';

export default function DashboardDay3Page() {
  const todayQuestions = [
    {
      id: 7,
      title: 'REST API 설계 원칙과 베스트 프랙티스',
      category: 'Backend',
      difficulty: '중급',
      answerCount: 15,
      previewCount: 2
    },
    {
      id: 8,
      title: 'JavaScript 클로저의 개념과 활용',
      category: 'JavaScript',
      difficulty: '중급',
      answerCount: 18,
      previewCount: 2
    },
    {
      id: 9,
      title: 'Docker와 Kubernetes의 차이',
      category: 'DevOps',
      difficulty: '심화',
      answerCount: 9,
      previewCount: 2
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Achievement with Progress */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">🚀</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            벌써 20 인사이트!
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center mb-3">
            <div className="text-4xl font-bold mb-1">40%</div>
            <div className="text-pink-100 text-sm">목표 달성률</div>
          </div>
          <div className="text-center text-pink-100 text-sm">
            50 인사이트까지 30개만 더!
          </div>
        </div>

        {/* Insights Progress - Enhanced */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">💎 인사이트 진행 상황</h3>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl font-bold text-pink-600">20</span>
              <span className="text-lg text-gray-500">/ 50</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-600 transition-all duration-500"
                style={{width: '40%'}}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>시작</span>
              <span className="font-bold text-pink-600">40% 달성!</span>
              <span>무제한 잠금해제</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-400">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎯</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-1">
                  3개만 더 공유하면 달성! ⭐
                </div>
                <div className="text-sm text-gray-700">
                  어제는 4개였는데 → 오늘은 3개만!
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-600 mb-1">답변 1개</div>
                  <div className="font-bold text-pink-600">+10 💎</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-600 mb-1">답변 2개</div>
                  <div className="font-bold text-pink-600">+20 💎</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-600 mb-1">답변 3개</div>
                  <div className="font-bold text-emerald-600">✓ 50 💎</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Streak - NEW */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">🔥 연속 공헌 스트릭</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Day 1</div>
                  <div className="text-xs text-gray-600">Spring AOP 답변</div>
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">+10 💎</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Day 2</div>
                  <div className="text-xs text-gray-600">Redis 캐싱 답변</div>
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">+10 💎</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl border-2 border-pink-300">
              <div className="flex items-center gap-3">
                <div className="text-2xl">→</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Day 3 (오늘)</div>
                  <div className="text-xs text-gray-600">아직 없음</div>
                </div>
              </div>
              <div className="text-xs text-pink-700 font-semibold">대기중</div>
            </div>
          </div>

          <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-200 text-center">
            <p className="text-sm text-gray-700">
              💡 오늘도 1개 공유하면 <strong className="text-indigo-700">3일 연속!</strong>
            </p>
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === '초급'
                          ? 'bg-green-50 text-green-600'
                          : question.difficulty === '중급'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-red-50 text-red-600'
                      }`}>
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
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 shadow-sm border border-pink-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎉</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 2 - Day 3 변화</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>✅ 40% 진행률로 시각적 피드백</div>
                <div>✅ "3개만 더!" (어제는 4개 → 긴박감 증가)</div>
                <div>✅ 연속 공헌 스트릭 표시</div>
                <div>✅ 오늘의 목표 명확 ("1개만 공유해도 3일 연속!")</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/prototype11/compare-day3"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            ← 비교 페이지로 돌아가기
          </Link>
        </div>
    </div>
  );
}
