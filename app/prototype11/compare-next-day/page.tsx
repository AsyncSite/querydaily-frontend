'use client';

import Link from 'next/link';

export default function CompareNextDayPage() {
  const options = [
    {
      name: 'Option 1',
      title: '첫 질문 무료 전략 (2일차)',
      description: '오늘도 새로운 질문 1개를 무료로 체험할 수 있어요',
      color: 'from-purple-500 to-indigo-600',
      badge: 'bg-purple-100 text-purple-700',
      href: '/prototype11-option1/dashboard-day2',
      keyFeatures: [
        '어제 본 질문 체크 표시',
        '오늘의 새로운 무료 질문 1개',
        '진행 상황 표시 (1개 완료)',
        '일관된 경험 제공',
      ],
      challenges: [
        '스트릭 개념이 약함',
        '누적 성취감이 적음',
      ],
      emoji: '🎁'
    },
    {
      name: 'Option 2',
      title: '티저 전략 (2일차)',
      description: '어제 답변 공유로 받은 인사이트가 표시돼요',
      color: 'from-pink-500 to-rose-600',
      badge: 'bg-pink-100 text-pink-700',
      href: '/prototype11-option2/dashboard-day2',
      keyFeatures: [
        '답변 공유 인정 ("+10 💎")',
        '현재 인사이트 표시',
        '목표까지 거리 (40 💎 남음)',
        '명확한 다음 목표',
      ],
      challenges: [
        '포인트에 집중하면 본질 흐려짐',
        '복잡도가 높아질 수 있음',
      ],
      emoji: '🔍'
    },
    {
      name: 'Option 3',
      title: '첫 3개 완전 무료 (2일차)',
      description: '2일 연속 방문 + 누적 학습량을 강조해요',
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-100 text-emerald-700',
      href: '/prototype11-option3/dashboard-day2',
      keyFeatures: [
        '연속 방문 스트릭 ("2일 연속!")',
        '누적 학습량 (총 6개 완료)',
        '오늘도 무료 3개 제공',
        '가장 심플하고 명확',
      ],
      challenges: [
        '답변 동기가 여전히 약함',
        '포인트 가치가 낮게 느껴질 수 있음',
      ],
      emoji: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-4">
            Day 2 시나리오
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            2번째 방문 시 3가지 옵션 비교
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            어제 첫 방문 후, 오늘 다시 앱을 열었을 때 어떤 화면이 나올까요?
          </p>
          <p className="text-sm text-gray-500">
            💡 핵심: "어제와 달라야 하고, 오늘 또 와야 할 이유가 명확해야 함"
          </p>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg mb-12 border-2 border-amber-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 2번째 방문에서 반드시 보여줘야 할 것
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ 필수 요소</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span><strong>어제 한 행동 인정:</strong> "어제 2개 질문 봤어요!"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span><strong>진행 상황:</strong> 스트릭, 완료 개수, 포인트 등</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span><strong>오늘 할 것:</strong> 새로운 질문 명확히 표시</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span><strong>목표까지 거리:</strong> "2개만 더 하면 보상!"</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">❌ 피해야 할 것</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>어제랑 똑같은 화면</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>"첫 방문을 환영합니다" (아직도?)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>어제 본 질문이 또 나옴</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>새로운 게 없음</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {options.map((option) => (
            <Link
              key={option.name}
              href={option.href}
              className="block bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-400"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{option.emoji}</span>
                  <div className={`px-3 py-1 ${option.badge} text-sm font-bold rounded-full`}>
                    {option.name}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-indigo-700 mb-2">
                  🌟 핵심 특징
                </div>
                <ul className="space-y-1.5">
                  {option.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-amber-700 mb-2">
                  ⚠️ 도전 과제
                </div>
                <ul className="space-y-1.5">
                  {option.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className={`py-3 px-4 bg-gradient-to-r ${option.color} text-white rounded-xl text-center font-semibold hover:shadow-lg transition-all`}>
                2일차 체험하기 →
              </div>
            </Link>
          ))}
        </div>

        {/* Analysis */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Habit Formation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔥 습관 형성 효과
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 1</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '60%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">일관성은 있지만 동기 부여가 약함</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 2</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500" style={{width: '80%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">목표가 명확해서 다음 행동 유도 강함</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 3</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width: '100%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">스트릭 + 누적 성취감으로 가장 강력</p>
              </div>
            </div>
          </div>

          {/* Clarity */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              💡 명확성
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 1</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '70%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">"오늘도 1개 무료"는 이해하기 쉬움</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 2</span>
                  <span className="text-sm text-gray-500">⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500" style={{width: '50%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">포인트 계산이 복잡할 수 있음</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Option 3</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width: '100%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">"매일 3개 무료"가 가장 명확</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-lg text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">🏆 2일차 기준 추천</h2>
          <div className="space-y-4">
            <div>
              <div className="font-bold mb-2">습관 형성이 최우선이라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 3 (첫 3개 완전 무료)</strong>
                <br/>스트릭 + 누적 성취감으로 재방문 동기가 가장 강합니다.
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">목표 지향적 사용자라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 2 (티저 전략)</strong>
                <br/>"40 💎만 더 모으면 무제한!" 같은 명확한 목표가 동기를 부여합니다.
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">균형잡힌 접근이라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 1 (첫 질문 무료)</strong>
                <br/>복잡하지 않으면서도 매일 새로운 가치를 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link
            href="/prototype11/compare"
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all text-center border-2 border-gray-300"
          >
            ← 첫 방문 비교로 돌아가기
          </Link>
          <Link
            href="/prototype11"
            className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all text-center"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
