'use client';

import Link from 'next/link';

export default function DashboardDay3Page() {
  const weeklyProgress = [
    { day: '월', completed: true },
    { day: '화', completed: true },
    { day: '수', completed: true },
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
      answerCount: 15
    },
    {
      id: 8,
      title: 'JavaScript 클로저의 개념과 활용',
      category: 'JavaScript',
      difficulty: '중급',
      answerCount: 18
    },
    {
      id: 9,
      title: 'Docker와 Kubernetes의 차이',
      category: 'DevOps',
      difficulty: '심화',
      answerCount: 9
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Milestone Achievement - NEW! */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-20">🎉</div>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-2">
                마일스톤 달성!
              </h1>
              <p className="text-amber-100 text-lg">
                3일 연속 방문
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/30">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-4xl">⭐</span>
                <div className="text-center">
                  <div className="font-bold text-xl">"꾸준한 학습자" 배지 획득!</div>
                  <div className="text-amber-100 text-sm">첫 마일스톤 달성</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak & Progress */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">🔥</div>
            <div className="text-5xl font-bold mb-2">3일</div>
            <div className="text-emerald-100">연속 학습 스트릭</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">9</div>
              <div className="text-emerald-100 text-sm">총 완료</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-emerald-100 text-sm">오늘 대기</div>
            </div>
          </div>
        </div>

        {/* Weekly Calendar - NEW */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">📅 이번 주 학습 기록</h3>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {weeklyProgress.map((item) => (
              <div key={item.day} className="text-center">
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-2xl mb-2 ${
                  item.completed
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {item.completed ? '✓' : item.day}
                </div>
                <div className="text-xs text-gray-600">{item.day}</div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
            <p className="text-sm text-gray-700 mb-2">
              <strong>3일 연속 학습 완료!</strong>
            </p>
            <p className="text-xs text-gray-600">
              월요일부터 오늘까지 하루도 빠짐없이 학습했어요
            </p>
          </div>
        </div>

        {/* Next Milestone - NEW */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">🎯 다음 목표</h3>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border-2 border-indigo-300 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl">🏆</div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-lg mb-1">
                  7일 연속 달성하기
                </div>
                <div className="text-sm text-gray-600">
                  "학습 마스터" 배지 획득
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">진행률</span>
                <span className="font-bold text-indigo-600">3/7일 (43%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{width: '43%'}}></div>
              </div>
            </div>

            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">4일</div>
              <div className="text-xs text-gray-600">남았어요!</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-bold text-emerald-600 mb-1">✓ 3일</div>
              <div className="text-gray-600">꾸준한 학습자</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-2 border-2 border-indigo-300">
              <div className="font-bold text-indigo-600 mb-1">→ 7일</div>
              <div className="text-gray-600">학습 마스터</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-bold text-gray-400 mb-1">🔒 30일</div>
              <div className="text-gray-400">전설의 학습자</div>
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

        {/* Strategy Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 shadow-sm border border-blue-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎉</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Option 3 - Day 3 변화</strong>
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div>✅ 🎉 3일 마일스톤 축하</div>
                <div>✅ ⭐ "꾸준한 학습자" 배지 획득</div>
                <div>✅ 📅 주간 달력 (월화수 체크)</div>
                <div>✅ 🎯 7일 목표까지 카운트다운 (4일 남음)</div>
                <div>✅ 총 9개 완료로 성취감 극대화</div>
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
