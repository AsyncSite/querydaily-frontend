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
    <div className="px-6 py-8 space-y-6">
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
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💎</span>
            <div>
              <div className="text-sm text-gray-500">보유 인사이트</div>
              <div className="text-xl font-bold text-indigo-600">150</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
            <div className="text-sm font-medium text-gray-900 mb-1">
              답변 공유로 인사이트 획득
            </div>
            <div className="text-xs text-indigo-700">
              다음 공유 시 +10 💎
            </div>
          </div>
        </div>

        {/* Quick Category Access */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">📂 카테고리별 질문</h3>
            <Link href="/prototype11/categories" className="text-sm text-indigo-600 hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/prototype11/questions?category=spring"
              className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-xs font-medium">Spring</div>
            </Link>
            <Link
              href="/prototype11/questions?category=jpa"
              className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">💾</div>
              <div className="text-xs font-medium">JPA</div>
            </Link>
            <Link
              href="/prototype11/questions?category=react"
              className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-xs font-medium">React</div>
            </Link>
            <Link
              href="/prototype11/questions?category=database"
              className="bg-gradient-to-br from-teal-400 to-green-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-xs font-medium">DB</div>
            </Link>
            <Link
              href="/prototype11/questions?category=network"
              className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-xs font-medium">Network</div>
            </Link>
            <Link
              href="/prototype11/questions?category=algorithm"
              className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-3 text-white text-center hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-1">🧮</div>
              <div className="text-xs font-medium">알고리즘</div>
            </Link>
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
  );
}
