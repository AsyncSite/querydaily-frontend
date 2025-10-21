export default function PricingPage() {
  const plans = [
    {
      code: 'GROWTH_PLAN',
      name: '그로스 플랜',
      price: 79000,
      originalPrice: 99000,
      period: '30일',
      deliveries: 30,
      recommended: true,
      features: [
        '매일 1개 질문 (총 30개)',
        '매일 전문가 피드백',
        '이력서 기반 맞춤 질문',
        '모든 모범 답변 열람',
        '약점 분석 리포트',
        '인사이트 획득 (답변당 +100)',
        '우수 답변 선정 시 +300',
        '30일 완주 시 +1,500',
      ],
    },
    {
      code: 'CRITICAL_HIT',
      name: '크리티컬 힛',
      price: 49000,
      period: '단건',
      deliveries: 1,
      features: [
        '질문 1개 + 심화 피드백',
        '합격 전략 집중 분석',
        '이력서 심화 분석 포함',
        '인사이트 획득 (+50)',
      ],
    },
    {
      code: 'REAL_INTERVIEW',
      name: '실전 면접',
      price: 39000,
      period: '단건',
      deliveries: 1,
      features: [
        '질문 1개 + 상세 피드백',
        '실전 면접 질문 기반',
        '인사이트 획득 (+50)',
      ],
    },
    {
      code: 'LAST_CHECK',
      name: '마지막 체크',
      price: 29000,
      period: '단건',
      deliveries: 1,
      features: [
        '질문 1개 + 기본 피드백',
        '면접 직전 빠른 체크',
        '인사이트 획득 (+30)',
      ],
    },
  ];

  return (
    <div className="px-6 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">플랜 선택</h1>
        <p className="text-gray-500">
          목표에 맞는 플랜으로 면접 준비를 시작하세요
        </p>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.code}
            className={`rounded-2xl p-6 border-2 ${
              plan.recommended
                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg'
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.recommended && (
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full mb-3">
                ⭐ 추천
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₩{plan.price.toLocaleString()}
                </span>
                {plan.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₩{plan.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-sm text-gray-500">/ {plan.period}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {plan.deliveries}회 발송
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-0.5">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                plan.recommended
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              선택하기
            </button>
          </div>
        ))}
      </div>

      {/* Insights Info */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          💎 인사이트 시스템
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          유료 플랜 구매 시 질문에 답변하면 인사이트를 획득합니다.
          인사이트로 추가 기능을 이용하세요!
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3">
            <div className="font-medium text-gray-900 mb-1">추가 질문 3개</div>
            <div className="text-orange-600 font-bold">500 인사이트</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="font-medium text-gray-900 mb-1">1:1 세션</div>
            <div className="text-orange-600 font-bold">1,000 인사이트</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="font-medium text-gray-900 mb-1">모의 면접</div>
            <div className="text-orange-600 font-bold">1,500 인사이트</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="font-medium text-gray-900 mb-1">기업 질문팩</div>
            <div className="text-orange-600 font-bold">800 인사이트</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">자주 묻는 질문</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-900 mb-1">
              GROWTH_PLAN이 가장 효과적인 이유는?
            </p>
            <p className="text-sm text-gray-600">
              매일 꾸준한 학습과 전문가 피드백으로 실력 향상이 가장 빠릅니다.
              30일 완주 시 1,500 인사이트 보너스로 추가 학습도 가능합니다.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">
              단건 상품도 인사이트를 받나요?
            </p>
            <p className="text-sm text-gray-600">
              네, 답변 제출 시 인사이트를 획득합니다. GROWTH_PLAN보다는 적지만
              체험용으로 충분합니다.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">환불 정책은?</p>
            <p className="text-sm text-gray-600">
              7일 이내 사용하지 않은 기간에 대해 100% 환불 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
