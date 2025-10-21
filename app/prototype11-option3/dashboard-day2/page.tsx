'use client';

import Link from 'next/link';

export default function DashboardDay2Page() {
  const todayQuestions = [
    {
      id: 4,
      title: 'Redis 캐싱 전략과 적용 사례',
      category: 'Redis',
      difficulty: '중급',
      answerCount: 10
    },
    {
      id: 5,
      title: 'React useEffect의 dependency array',
      category: 'React',
      difficulty: '중급',
      answerCount: 12
    },
    {
      id: 6,
      title: 'DB 인덱스 설계 원칙',
      category: 'Database',
      difficulty: '중급',
      answerCount: 8
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Streak Achievement */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="text-3xl font-bold mb-2">
              2일 연속 방문!
            </h1>
            <p className="text-emerald-100 text-sm">
              연속으로 학습하고 계시네요. 대단해요!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/30">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-1">6개</div>
              <div className="text-emerald-100 text-sm">총 학습 완료</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="font-bold text-2xl mb-1">3</div>
                <div className="text-emerald-100 text-xs">어제 완료</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="font-bold text-2xl mb-1">3</div>
                <div className="text-emerald-100 text-xs">오늘 대기</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">📊 나의 학습 현황</h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Day 1</div>
                  <div className="text-xs text-gray-600">3문제 완료</div>
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">100%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl border-2 border-teal-400">
              <div className="flex items-center gap-3">
                <div className="text-2xl">→</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Day 2</div>
                  <div className="text-xs text-gray-600">새로운 3문제 대기중</div>
                </div>
              </div>
              <div className="text-xs text-teal-700 font-semibold">진행중</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">연속 학습 스트릭</span>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">2일</div>
            <div className="text-xs text-gray-600">
              내일도 방문하면 3일 연속 달성!
            </div>
          </div>
        </div>

        {/* Today's Free Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">🎁 오늘의 무료 질문 3개</h2>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
              무료
            </div>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11-option3/questions/${question.id}`}
                className="block bg-white rounded-2xl p-5 shadow-md border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-100 text-emerald-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 flex-1">
                        {question.title}
                      </h3>
                      <span className="text-xl">✓</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                        {question.category}
                      </span>
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">
                        💬 {question.answerCount}개 답변
                      </span>
                      <span className="text-emerald-600 font-medium">
                        · 전체 무료 열람
                      </span>
                    </div>
                  </div>
                  <div className="text-emerald-600">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* More Questions Unlock */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-indigo-300">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">💡</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">
                더 많은 질문을 보고 싶다면?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                답변을 공유하면 인사이트를 받아요
              </p>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-200">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>답변 1개 공유</span>
                    <span className="font-bold text-indigo-600">+10 💎</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>5개 답변 = 하루 무제한</span>
                    <span className="font-bold text-indigo-600">50 💎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Info */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 3 전략</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>• 연속 방문 스트릭으로 습관 형성</div>
                <div>• 누적 학습량으로 성취감 제공</div>
                <div>• 매일 3개씩 무료로 일관성 있는 경험</div>
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
