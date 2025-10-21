export default function PricingPage() {
  const plans = [
    {
      name: 'FREE',
      price: 0,
      period: '영구 무료',
      current: true,
      features: [
        { text: '하루 1개 질문', included: true },
        { text: '기본 답변 확인', included: true },
        { text: '추가 질문', included: false },
        { text: '프리미엄 답변', included: false },
        { text: '힌트 사용', included: false },
        { text: '이력서 AI 분석', included: false },
        { text: '무제한 인사이트', included: false },
      ],
    },
    {
      name: 'GROWTH_PLAN',
      price: 79000,
      period: '30일',
      recommended: true,
      features: [
        { text: '무제한 질문', included: true },
        { text: '프리미엄 답변', included: true },
        { text: '힌트 무제한', included: true },
        { text: '이력서 AI 분석 3회', included: true },
        { text: '인사이트 적립', included: true },
        { text: '학습 통계', included: true },
        { text: '뱃지 & 도전과제', included: true },
      ],
    },
    {
      name: 'CRITICAL_HIT',
      price: 49000,
      period: '7일 집중',
      features: [
        { text: '7일 무제한 질문', included: true },
        { text: '프리미엄 답변', included: true },
        { text: '면접 대비 특화', included: true },
        { text: '이력서 분석 1회', included: true },
        { text: '인사이트 적립', included: true },
      ],
    },
  ];

  return (
    <div className="px-6 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          플랜 선택하기
        </h1>
        <p className="text-gray-500">
          목표에 맞는 플랜을 선택하고 성장하세요
        </p>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 border-2 ${
              plan.recommended
                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                : plan.current
                ? 'border-gray-200 bg-white'
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.recommended && (
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full mb-3">
                ⭐ 추천
              </div>
            )}
            {plan.current && (
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                현재 플랜
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  ₩{plan.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">/ {plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm">
                  {feature.included ? (
                    <span className="text-emerald-500 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                  <span
                    className={
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {plan.current ? (
              <button
                disabled
                className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-medium cursor-not-allowed"
              >
                현재 사용중
              </button>
            ) : plan.recommended ? (
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                지금 시작하기
              </button>
            ) : (
              <button className="w-full py-3 bg-white border border-gray-300 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                선택하기
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">자주 묻는 질문</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-gray-900 mb-1">
              무료 플랜으로 충분한가요?
            </p>
            <p className="text-gray-600">
              매일 꾸준히 한 문제씩만 풀고 싶다면 무료로도 충분합니다.
              면접 준비나 집중 학습이 필요하다면 프리미엄을 추천합니다.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">환불 정책은?</p>
            <p className="text-gray-600">
              7일 이내 사용하지 않은 기간에 대해 100% 환불 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
