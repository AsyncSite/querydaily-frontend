'use client';

import Link from 'next/link';

export default function DashboardPage() {
  const todayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      answerCount: 12
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      answerCount: 8
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      answerCount: 15
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Hero Value Proposition */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-3">🎯</div>
            <h1 className="text-xl font-bold mb-3">
              현직자 답변으로<br/>면접 준비하기
            </h1>

            {/* Social Proof Badge - Ultra Minimal */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-emerald-100 text-xs">
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
              <span>오늘 142명 학습 중</span>
            </div>
          </div>
        </div>

        {/* Today's Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">오늘의 추천 질문</h2>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11/questions/${question.id}`}
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === '초급'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>💬 {question.answerCount}개 답변</span>
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
    </div>
  );
}
