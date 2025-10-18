'use client';

import Link from 'next/link';

export default function CompareDay3Page() {
  const options = [
    {
      name: 'Option 1',
      title: '첫 질문 무료 전략 (3일차)',
      description: '3일 연속 방문으로 주간 목표 시스템 도입',
      color: 'from-purple-500 to-indigo-600',
      badge: 'bg-purple-100 text-purple-700',
      href: '/prototype11-option1/dashboard-day3',
      keyFeatures: [
        '주간 달력 표시 (월화수 체크)',
        '이번 주 목표: 5개 완료 (2/5)',
        '진행률 40% 시각화',
        '날짜별 히스토리 표시',
      ],
      newInDay3: [
        '📅 주간 달력 UI',
        '🎯 이번 주 목표 시스템',
        '📊 진행률 바',
      ],
      emoji: '🎁'
    },
    {
      name: 'Option 2',
      title: '티저 전략 (3일차)',
      description: '20 인사이트 달성, 목표까지 "3개만 더!"로 긴박감 조성',
      color: 'from-pink-500 to-rose-600',
      badge: 'bg-pink-100 text-pink-700',
      href: '/prototype11-option2/dashboard-day3',
      keyFeatures: [
        '인사이트 20개 (40% 진행)',
        '"3개만 더!" 메시지 (Day2는 4개였음)',
        '연속 공헌 스트릭 표시',
        '진행률 바로 시각적 피드백',
      ],
      newInDay3: [
        '📊 40% 진행률 바',
        '🎯 "3개만 더!" (긴박감)',
        '🔥 연속 공헌 스트릭',
      ],
      emoji: '🔍'
    },
    {
      name: 'Option 3',
      title: '첫 3개 완전 무료 (3일차)',
      description: '3일 연속 마일스톤 달성! 배지 시스템 도입',
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-100 text-emerald-700',
      href: '/prototype11-option3/dashboard-day3',
      keyFeatures: [
        '🎉 3일 연속 마일스톤 달성',
        '"꾸준한 학습자" 배지 획득',
        '주간 달력 (월화수 체크)',
        '다음 목표: 7일 연속 (4일 남음)',
      ],
      newInDay3: [
        '🎉 마일스톤 축하',
        '⭐ 배지 시스템',
        '📅 주간 달력',
        '🎯 7일 목표까지 카운트다운',
      ],
      emoji: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
            Day 3 시나리오 - 습관 형성의 시작
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3일차에서 달라지는 것들
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            3일 연속 방문 = 습관 형성의 첫 신호
          </p>
          <p className="text-sm text-gray-500">
            💡 Day 3부터 "마일스톤", "주간 목표", "배지" 시스템이 등장합니다
          </p>
        </div>

        {/* Critical Insight */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg mb-12 border-2 border-red-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🔥 왜 Day 3이 중요한가?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">심리학적 중요성</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Day 1: "한번 해볼까" (호기심)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Day 2: "또 해봤네" (재방문)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="font-bold">Day 3: "습관되려나?" (패턴 인식) ⭐</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">Day 7: "일주일 했네" (습관 형성)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">이탈률 데이터</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Day 1 → Day 2</span>
                    <span className="text-red-600 font-bold">50% 이탈</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{width: '50%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Day 2 → Day 3</span>
                    <span className="text-orange-600 font-bold">30% 이탈</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{width: '30%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold">Day 3 → Day 4</span>
                    <span className="text-emerald-600 font-bold">20% 이탈 ⭐</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{width: '20%'}}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  ⚡ Day 3을 넘기면 80% 확률로 일주일 이상 사용!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's New in Day 3 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✨ Day 3에 새로 등장하는 것들
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-bold text-gray-900 mb-2">주간 달력</h3>
              <p className="text-sm text-gray-600">
                월화수 체크 표시로 "3일 했네!" 시각화
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-bold text-gray-900 mb-2">마일스톤</h3>
              <p className="text-sm text-gray-600">
                3일 연속 달성 축하 + 배지 획득
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">다음 목표</h3>
              <p className="text-sm text-gray-600">
                "7일까지 4일 남음!" 카운트다운
              </p>
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

              {/* New in Day 3 */}
              <div className="mb-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="text-xs font-semibold text-amber-800 mb-2">
                  ⭐ Day 3의 새로운 요소
                </div>
                <ul className="space-y-1.5">
                  {option.newInDay3.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div className="mb-6">
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

              {/* CTA */}
              <div className={`py-3 px-4 bg-gradient-to-r ${option.color} text-white rounded-xl text-center font-semibold hover:shadow-lg transition-all`}>
                3일차 체험하기 →
              </div>
            </Link>
          ))}
        </div>

        {/* Day 2 vs Day 3 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📊 Day 2 vs Day 3 핵심 차이
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">항목</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Day 2</th>
                  <th className="text-left py-3 px-4 font-semibold text-emerald-700">Day 3 (새로움)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium">스트릭 메시지</td>
                  <td className="py-3 px-4 text-gray-600">"2일 연속 방문!"</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"3일 연속! 🎉 마일스톤"</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium">시각화</td>
                  <td className="py-3 px-4 text-gray-600">텍스트만</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">주간 달력 (✓✓✓⬜⬜⬜⬜)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium">배지/보상</td>
                  <td className="py-3 px-4 text-gray-600">없음</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">⭐ "꾸준한 학습자" 배지</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium">다음 목표</td>
                  <td className="py-3 px-4 text-gray-600">모호함</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"7일까지 4일!" 명확</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">사용자 심리</td>
                  <td className="py-3 px-4 text-gray-600">"또 와봤네"</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"습관되려나?" ⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-lg text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">🏆 Day 3 기준 추천</h2>
          <div className="space-y-4">
            <div>
              <div className="font-bold mb-2">습관 형성이 최우선이라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 3 (첫 3개 완전 무료)</strong>
                <br/>마일스톤 + 배지 + 주간 달력으로 가장 강력한 동기 부여
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">목표 달성 동기가 강한 사용자라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 2 (티저 전략)</strong>
                <br/>"3개만 더!" 같은 구체적 목표로 긴박감 조성
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">점진적 개선을 원한다면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 1 (첫 질문 무료)</strong>
                <br/>주간 목표 시스템으로 무난하게 진행
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link
            href="/prototype11/compare-next-day"
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all text-center border-2 border-gray-300"
          >
            ← Day 2 비교로 돌아가기
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
