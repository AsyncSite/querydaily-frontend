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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-2xl font-bold mb-3">
              현직자들은 면접에<br/>어떻게 답할까?
            </h1>
            <p className="text-emerald-100 text-sm mb-4">
              라인, 네이버, 카카오 합격자들의 실제 답변
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <span className="font-bold text-lg">오늘 무료로 3문제 열람</span>
            </div>
            <div className="text-center text-emerald-100 text-sm space-y-1">
              <div>✓ 답변 작성 필요 없음</div>
              <div>✓ 모든 답변 무제한 열람</div>
              <div>✓ 하루 5분이면 충분</div>
            </div>
          </div>
        </div>

        {/* Today's Free Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">오늘의 무료 질문 3개</h2>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
              무료
            </div>
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

        {/* More Questions */}
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
    </div>
  );
}
