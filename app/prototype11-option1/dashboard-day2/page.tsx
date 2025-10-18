'use client';

import Link from 'next/link';

export default function DashboardDay2Page() {
  const yesterdayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      completed: true
    }
  ];

  const todayQuestions = [
    {
      id: 4,
      title: 'Redis 캐싱 전략과 적용 사례',
      category: 'Redis',
      difficulty: '중급',
      answerCount: 10,
      isFree: true
    },
    {
      id: 5,
      title: 'React useEffect의 dependency array',
      category: 'React',
      difficulty: '중급',
      answerCount: 12,
      isFree: false
    },
    {
      id: 6,
      title: 'DB 인덱스 설계 원칙',
      category: 'Database',
      difficulty: '중급',
      answerCount: 8,
      isFree: false
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Welcome Back */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">👋</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            다시 오셨네요!
          </h1>
          <div className="text-center text-purple-100 text-sm">
            어제 1개 질문을 완료했어요
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">📊 나의 진행 상황</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">어제</div>
                  <div className="text-xs text-gray-600">Spring AOP</div>
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">완료</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border-2 border-indigo-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  →
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">오늘</div>
                  <div className="text-xs text-gray-600">새로운 3문제 대기중</div>
                </div>
              </div>
              <div className="text-xs text-indigo-700 font-semibold">진행중</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">총 학습 완료</span>
              <span className="font-bold text-indigo-600">1개 질문</span>
            </div>
          </div>
        </div>

        {/* Today's Free Question */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-md border-2 border-emerald-400">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">🎁</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-lg mb-1">
                오늘의 무료 질문!
              </div>
              <p className="text-sm text-gray-700">
                매일 1개씩 새로운 질문을 무료로 체험할 수 있어요
              </p>
            </div>
          </div>
        </div>

        {/* Today's Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">오늘의 질문</h2>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11-option1/questions/${question.id}`}
                className="block bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    question.isFree
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 flex-1">
                        {question.title}
                      </h3>
                      {question.isFree && (
                        <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          무료
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                        {question.category}
                      </span>
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      💬 {question.answerCount}개의 답변
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

        {/* How It Works */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 1 전략</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>• 매일 1개씩 무료 질문 제공</div>
                <div>• 어제 본 질문은 "완료" 표시</div>
                <div>• 나머지는 답변 공유 or 인사이트 필요</div>
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
