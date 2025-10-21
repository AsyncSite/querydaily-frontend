'use client';

import Link from 'next/link';

export default function ComparePage() {
  const options = [
    {
      name: 'Option 1',
      title: '첫 질문 무료 전략',
      description: '첫 번째 질문은 답변 작성 없이 모든 답변을 볼 수 있어요',
      color: 'from-purple-500 to-indigo-600',
      badge: 'bg-purple-100 text-purple-700',
      href: '/prototype11-option1/dashboard',
      pros: [
        '즉시 가치 경험',
        'Aha Moment가 30초 안에',
        '진입 장벽이 낮음',
      ],
      cons: [
        '2번째부터는 답변 필요',
        '일관성이 약간 부족',
      ],
      emoji: '🎁'
    },
    {
      name: 'Option 2',
      title: '티저 전략',
      description: '2개 답변을 미리보고, 더 보고 싶으면 답변 작성',
      color: 'from-pink-500 to-rose-600',
      badge: 'bg-pink-100 text-pink-700',
      href: '/prototype11-option2/dashboard',
      pros: [
        '가치를 먼저 보여줌',
        '명확한 교환 관계',
        '호기심 자극',
      ],
      cons: [
        '살짝 복잡할 수 있음',
        'blur 처리가 거슬릴 수 있음',
      ],
      emoji: '🔍'
    },
    {
      name: 'Option 3',
      title: '첫 3개 완전 무료',
      description: '오늘의 3문제는 답변 작성 없이 모든 답변을 볼 수 있어요',
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-100 text-emerald-700',
      href: '/prototype11-option3/dashboard',
      pros: [
        '가장 명확한 구조',
        '일관성 있음',
        '가치 제안이 강력',
      ],
      cons: [
        '3개로 부족할 수 있음',
        '답변 동기 부여 약함',
      ],
      emoji: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3가지 옵션 비교
          </h1>
          <p className="text-gray-600 text-lg">
            각 플로우를 직접 체험하고 가장 좋은 전략을 선택하세요
          </p>
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

              {/* Pros */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-emerald-700 mb-2">
                  ✅ 장점
                </div>
                <ul className="space-y-1.5">
                  {option.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-red-700 mb-2">
                  ⚠️ 단점
                </div>
                <ul className="space-y-1.5">
                  {option.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className={`py-3 px-4 bg-gradient-to-r ${option.color} text-white rounded-xl text-center font-semibold hover:shadow-lg transition-all`}>
                체험하기 →
              </div>
            </Link>
          ))}
        </div>

        {/* Key Questions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🤔 선택 시 고려할 핵심 질문들
          </h2>

          <div className="space-y-6">
            <div>
              <div className="font-semibold text-gray-900 mb-2">
                1. 사용자는 왜 이 앱을 써야 하는가?
              </div>
              <p className="text-sm text-gray-600">
                → Option 3가 가장 명확하게 가치 제안을 함 ("오늘 무료로 3문제")
              </p>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-2">
                2. Aha Moment가 얼마나 빨리 오는가?
              </div>
              <p className="text-sm text-gray-600">
                → Option 1 = Option 3 (30초) &gt; Option 2 (1-2분)
              </p>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-2">
                3. 답변 작성 동기가 충분한가?
              </div>
              <p className="text-sm text-gray-600">
                → Option 2 &gt; Option 1 &gt; Option 3 (순서대로 동기 강함)
              </p>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-2">
                4. 구조가 이해하기 쉬운가?
              </div>
              <p className="text-sm text-gray-600">
                → Option 3 &gt; Option 1 &gt; Option 2 (순서대로 명확함)
              </p>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-2">
                5. 컨텐츠 품질을 유지할 수 있는가?
              </div>
              <p className="text-sm text-gray-600">
                → Option 2 &gt; Option 1 &gt; Option 3 (억지로 쓰게 하지 않을수록 품질 높음)
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">💡 추천</h2>
          <div className="space-y-4">
            <div>
              <div className="font-bold mb-2">초기 사용자 확보가 최우선이라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 3 (첫 3개 완전 무료)</strong>
                <br/>진입 장벽이 가장 낮고, 가치 제안이 명확합니다.
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">컨텐츠 품질이 최우선이라면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 2 (티저 전략)</strong>
                <br/>답변 작성 동기가 가장 강하고, 억지로 쓰게 하지 않습니다.
              </p>
            </div>

            <div>
              <div className="font-bold mb-2">균형잡힌 접근을 원한다면:</div>
              <p className="text-indigo-100 text-sm">
                → <strong>Option 1 (첫 질문 무료)</strong>
                <br/>가치 경험 + 답변 동기를 적절히 조합했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Original */}
        <div className="mt-8 text-center">
          <Link
            href="/prototype11/dashboard"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            ← 원래 프로토타입으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
