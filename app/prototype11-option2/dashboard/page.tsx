'use client';

import Link from 'next/link';

export default function DashboardPage() {
  const todayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      answerCount: 12,
      previewCount: 2
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      answerCount: 8,
      previewCount: 2
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      answerCount: 15,
      previewCount: 2
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">🔍</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            다른 개발자들의 답변을<br/>미리 엿보세요
          </h1>
          <div className="space-y-2 text-pink-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>답변 일부를 먼저 확인</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>마음에 들면 나머지 보기</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>답변 공유하면 모든 답변 열람</span>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-md border-2 border-purple-300">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">💡</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-lg mb-2">
                이렇게 작동해요
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">1.</span>
                  <span>질문을 선택하면 2개의 답변을 미리 볼 수 있어요</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">2.</span>
                  <span>나머지 답변이 궁금하다면 내 답변을 공유하세요</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">3.</span>
                  <span>+10 인사이트도 받을 수 있어요</span>
                </div>
              </div>
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
                          : 'bg-orange-50 text-orange-600'
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
    </div>
  );
}
