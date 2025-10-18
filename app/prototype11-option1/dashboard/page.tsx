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
      isFree: true
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      answerCount: 8,
      isFree: false
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      answerCount: 15,
      isFree: false
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">👀</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            현직자들은 면접에<br/>어떻게 답할까?
          </h1>
          <div className="space-y-2 text-purple-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>라인, 네이버, 카카오 합격자 답변</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>같은 질문, 다양한 관점</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>하루 5분, 출퇴근 시간에</span>
            </div>
          </div>
        </div>

        {/* Special Offer - First Question Free */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-md border-2 border-emerald-400">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">🎁</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-lg mb-1">
                첫 질문 무료 체험!
              </div>
              <p className="text-sm text-gray-700">
                답변 작성 없이 바로 다른 개발자들의 답변을 확인할 수 있어요
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === '초급'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
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
                <strong>이렇게 작동해요</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>1️⃣ 첫 질문은 무료로 답변 확인 가능</div>
                <div>2️⃣ 2번째부터는 답변 공유 or 인사이트 사용</div>
                <div>3️⃣ 답변 공유하면 +10 인사이트 획득</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
