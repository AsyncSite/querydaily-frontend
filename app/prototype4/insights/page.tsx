export default function InsightsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Balance */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-8 text-white text-center">
        <div className="text-sm opacity-90 mb-2">보유 인사이트</div>
        <div className="text-5xl font-bold mb-3">2,850</div>
        <div className="text-sm opacity-75">
          총 3,200개 획득 · 350개 사용
        </div>
      </div>

      {/* How to Earn */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">💎 인사이트 획득 방법</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <span className="text-gray-700">매일 답변 제출</span>
            </div>
            <span className="text-orange-600 font-bold">+100</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-700">우수 답변 선정</span>
            </div>
            <span className="text-orange-600 font-bold">+300</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <span className="text-gray-700">7일 연속 학습</span>
            </div>
            <span className="text-orange-600 font-bold">+150</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-700">30일 완주</span>
            </div>
            <span className="text-orange-600 font-bold">+1,500</span>
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="font-semibold text-gray-900 mb-4">🔥 프리미엄 기능</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-5 border border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  추가 질문 3개
                </h4>
                <p className="text-sm text-gray-600">
                  오늘 질문 외에 3개 더 받기
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">500</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              사용하기
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  1:1 전문가 세션
                </h4>
                <p className="text-sm text-gray-600">
                  30분 실시간 화상 상담
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">1,000</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              예약하기
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  타 기업 질문팩
                </h4>
                <p className="text-sm text-gray-600">
                  카카오/네이버/쿠팡 등 특화 질문
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">800</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              구매하기
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  모의 면접
                </h4>
                <p className="text-sm text-gray-600">
                  음성 답변 + AI 실시간 평가
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">1,500</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              시작하기
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  이력서 심화 분석
                </h4>
                <p className="text-sm text-gray-600">
                  AI + 전문가 종합 피드백
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">700</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              분석하기
            </button>
          </div>
        </div>
      </div>

      {/* Charge Insights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">💰 인사이트 충전</h3>
        <div className="space-y-3">
          <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">1,000 인사이트</div>
                <div className="text-sm text-gray-500">기본 패키지</div>
              </div>
              <div className="text-lg font-bold text-gray-900">₩5,000</div>
            </div>
          </button>

          <button className="w-full p-4 border-2 border-orange-300 bg-orange-50 rounded-xl hover:border-orange-400 transition-colors text-left relative">
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium">
                인기
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">3,000 인사이트</div>
                <div className="text-sm text-orange-600">20% 할인</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">₩12,000</div>
                <div className="text-xs text-gray-400 line-through">₩15,000</div>
              </div>
            </div>
          </button>

          <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">10,000 인사이트</div>
                <div className="text-sm text-orange-600">30% 할인</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">₩35,000</div>
                <div className="text-xs text-gray-400 line-through">₩50,000</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
