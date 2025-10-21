export default function InsightsPage() {
  const products = [
    {
      id: 1,
      name: '질문 힌트',
      description: '오늘의 질문에 대한 핵심 힌트',
      cost: 50,
      available: true,
    },
    {
      id: 2,
      name: '프리미엄 답변',
      description: '전문가가 작성한 모범 답변',
      cost: 200,
      available: true,
    },
    {
      id: 3,
      name: '추가 질문 3개',
      description: '오늘 하루 3개의 질문 추가',
      cost: 500,
      available: true,
    },
    {
      id: 4,
      name: '이력서 AI 분석',
      description: '상세한 이력서 피드백',
      cost: 1000,
      available: false,
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">인사이트 샵</h1>
        <p className="text-gray-500">학습으로 얻은 인사이트를 사용하세요</p>
      </div>

      {/* Balance */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="text-sm opacity-90 mb-2">보유 인사이트</div>
        <div className="text-4xl font-bold mb-4">1,250</div>
        <div className="text-sm opacity-75">
          총 2,350개 획득 · 1,100개 사용
        </div>
      </div>

      {/* Products */}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl shadow-sm border p-5 ${
              product.available
                ? 'border-gray-100 hover:border-indigo-200'
                : 'border-gray-50 opacity-50'
            } transition-colors`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-lg font-bold text-indigo-600">
                {product.cost} 인사이트
              </div>
              {product.available ? (
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  구매하기
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                >
                  인사이트 부족
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Earn More */}
      <div className="bg-emerald-50 rounded-xl p-5 text-center">
        <p className="text-emerald-900 font-medium mb-2">
          인사이트를 더 얻고 싶으신가요?
        </p>
        <p className="text-sm text-emerald-700 mb-4">
          질문에 답변하고 매일 50 인사이트를 획득하세요
        </p>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
          오늘의 질문 보기
        </button>
      </div>
    </div>
  );
}
