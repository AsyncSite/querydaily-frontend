'use client';

import Link from 'next/link';

export default function DashboardDay3Page() {
  const weeklyProgress = [
    { day: '월', completed: true, title: 'Spring AOP' },
    { day: '화', completed: true, title: 'Redis 캐싱' },
    { day: '수', completed: true, title: '오늘' },
    { day: '목', completed: false },
    { day: '금', completed: false },
    { day: '토', completed: false },
    { day: '일', completed: false },
  ];

  const todayQuestions = [
    {
      id: 7,
      title: 'REST API 설계 원칙과 베스트 프랙티스',
      category: 'Backend',
      difficulty: '중급',
      answerCount: 15,
      isFree: true
    },
    {
      id: 8,
      title: 'JavaScript 클로저의 개념과 활용',
      category: 'JavaScript',
      difficulty: '중급',
      answerCount: 18,
      isFree: false
    },
    {
      id: 9,
      title: 'Docker와 Kubernetes의 차이',
      category: 'DevOps',
      difficulty: '심화',
      answerCount: 9,
      isFree: false
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Welcome Back - Day 3 */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-5xl mb-4 text-center">🔥</div>
          <h1 className="text-2xl font-bold mb-3 text-center">
            3일 연속 방문!
          </h1>
          <div className="text-center text-purple-100 text-sm">
            꾸준히 학습하고 계시네요
          </div>
        </div>

        {/* Weekly Calendar - NEW */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">📅 이번 주 학습</h3>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {weeklyProgress.map((item) => (
              <div key={item.day} className="text-center">
                <div className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center mb-2 ${
                  item.completed
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <div className="text-2xl mb-1">
                    {item.completed ? '✓' : item.day}
                  </div>
                </div>
                <div className="text-xs text-gray-600">{item.day}</div>
                {item.completed && item.title && (
                  <div className="text-xs text-gray-500 mt-1 truncate">{item.title}</div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">이번 주 목표</span>
              <span className="text-sm text-gray-600">2/5 완료</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{width: '40%'}}></div>
            </div>
            <div className="text-xs text-gray-600">
              5개 질문 중 2개 완료 (40%)
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">📊 나의 진행 상황</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">3</div>
              <div className="text-xs text-gray-600">연속 방문</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">3</div>
              <div className="text-xs text-gray-600">완료한 질문</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              <strong>학습한 주제:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Spring</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">Redis</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Backend</span>
              </div>
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

        {/* Strategy Info */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 1 - Day 3 변화</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>✅ 주간 달력 추가 (월화수 체크)</div>
                <div>✅ 이번 주 목표 시스템 (5개 중 2개)</div>
                <div>✅ 진행률 바로 시각적 피드백</div>
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
