import Link from 'next/link';

export default function DashboardPage() {
  const todayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      completed: false
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      completed: false
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">오늘의 학습</h1>
          <Link href="/prototype11/mypage" className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 text-white text-center shadow-lg">
          <div className="text-6xl mb-3">🔥</div>
          <div className="text-5xl font-bold mb-2">7일</div>
          <div className="text-orange-100 text-sm">연속 학습 중!</div>
        </div>

        {/* Today's 3 Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">오늘의 3문제</h2>
            <span className="text-sm text-gray-500">0/3 완료</span>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11/questions/${question.id}`}
                className="block bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    question.completed
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {question.title}
                    </h3>
                    <div className="flex gap-2">
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
                  </div>
                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Insights - Simple */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <div className="text-sm text-gray-500">보유 인사이트</div>
                <div className="text-xl font-bold text-indigo-600">150</div>
              </div>
            </div>
            <Link
              href="/products"
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              PC 할인
            </Link>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              답변 공유 시 +10 💎 · PC 상품 구매 시 할인
            </p>
          </div>
        </div>

        {/* Simple Tips */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <strong>답변 후 훔쳐보기가 핵심!</strong><br/>
                현직자들은 어떻게 답했는지 엿보며 새로운 관점을 배워보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
