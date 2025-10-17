import Link from 'next/link';

export default function InsightsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          💎 인사이트 시스템
        </h1>
        <p className="text-gray-500">학습하고 인사이트를 모으세요</p>
      </div>

      {/* Sign Up Benefit Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <div className="text-5xl font-bold mb-2">500</div>
          <div className="text-orange-50 text-lg">
            회원가입 시 즉시 지급!
          </div>
        </div>
        <Link
          href="/prototype5/auth/signup"
          className="block w-full py-3 bg-white text-orange-600 text-center rounded-xl font-bold hover:shadow-lg transition-all"
        >
          무료 가입하고 받기 →
        </Link>
      </div>

      {/* What is Insight */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          인사이트란 무엇인가요?
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          인사이트는 QueryDaily에서 사용하는 포인트 시스템입니다.
          답변을 작성하고 학습하면서 인사이트를 획득하고,
          이를 사용해 추가 기능을 이용할 수 있습니다.
        </p>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
          <div className="text-sm text-gray-700">
            💡 인사이트는 학습 동기를 높이고, 지속적인 성장을 돕는
            QueryDaily만의 특별한 시스템입니다.
          </div>
        </div>
      </div>

      {/* How to Earn Insights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          💰 인사이트 획득 방법
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <span className="text-gray-700">회원가입</span>
            </div>
            <span className="text-orange-600 font-bold">+500</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <span className="text-gray-700">첫 구매 보너스</span>
            </div>
            <span className="text-orange-600 font-bold">+1,000</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <span className="text-gray-700">답변 제출</span>
            </div>
            <span className="text-orange-600 font-bold">+100</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-700">우수 답변 선정</span>
            </div>
            <span className="text-orange-600 font-bold">+300</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <span className="text-gray-700">7일 연속 학습</span>
            </div>
            <span className="text-orange-600 font-bold">+150</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-700">30일 완주</span>
            </div>
            <span className="text-orange-600 font-bold">+1,500</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-900">
            💡 <strong>유료 플랜 사용자는</strong> 답변 제출 시 인사이트를 획득할
            수 있습니다. 무료 사용자는 가입 보너스만 받을 수 있어요.
          </p>
        </div>
      </div>

      {/* What You Can Do with Insights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          ✨ 인사이트로 할 수 있는 것
        </h3>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border-2 border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  추가 질문 3개
                </h4>
                <p className="text-sm text-gray-600">
                  관심 있는 주제로 3개 질문 추가
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">500</div>
            </div>
            <div className="text-xs text-gray-500">
              플랜 기간 중 언제든지 사용 가능
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-orange-100">
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
            <div className="text-xs text-gray-500">
              이력서, 포트폴리오 리뷰 포함
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  모의 면접
                </h4>
                <p className="text-sm text-gray-600">
                  1시간 실전 모의 면접
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">1,500</div>
            </div>
            <div className="text-xs text-gray-500">
              상세한 피드백 리포트 제공
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-orange-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  타 기업 질문팩
                </h4>
                <p className="text-sm text-gray-600">
                  특정 기업 면접 질문 10개
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">800</div>
            </div>
            <div className="text-xs text-gray-500">
              카카오, 네이버, 쿠팡 등
            </div>
          </div>
        </div>
      </div>

      {/* Insight Charging */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          💳 인사이트 충전
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          인사이트가 부족하신가요? 추가로 구매할 수 있습니다.
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div className="border-2 border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">1,000</div>
            <div className="text-sm text-gray-600 mb-2">인사이트</div>
            <div className="text-orange-600 font-bold">₩5,000</div>
          </div>

          <div className="border-2 border-orange-300 rounded-xl p-4 text-center bg-orange-50">
            <div className="text-xs text-orange-600 font-bold mb-1">인기</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3,000</div>
            <div className="text-sm text-gray-600 mb-2">인사이트</div>
            <div className="text-orange-600 font-bold">₩12,000</div>
          </div>

          <div className="border-2 border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">10,000</div>
            <div className="text-sm text-gray-600 mb-2">인사이트</div>
            <div className="text-orange-600 font-bold">₩35,000</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/prototype5/auth/login"
            className="inline-block text-orange-600 text-sm font-medium hover:underline"
          >
            로그인하고 충전하기 →
          </Link>
        </div>
      </div>

      {/* Login CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          지금 가입하고 500 인사이트 받으세요!
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          회원가입만 해도 500 인사이트를 즉시 드립니다.
          추가 질문이나 힌트 기능을 바로 사용해보세요.
        </p>
        <Link
          href="/prototype5/auth/signup"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          무료 회원가입 →
        </Link>
      </div>
    </div>
  );
}
