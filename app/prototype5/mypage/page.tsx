import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Login Required */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          마이페이지
        </h2>
        <p className="text-gray-600 mb-6">
          학습 통계, 인사이트 현황 등을 확인하려면
          <br />
          로그인이 필요합니다.
        </p>
        <div className="space-y-2">
          <Link
            href="/prototype5/auth/login"
            className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
          >
            로그인하기 →
          </Link>
          <Link
            href="/prototype5/auth/signup"
            className="block w-full py-3 border-2 border-gray-300 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            회원가입하기
          </Link>
        </div>
      </div>

      {/* Preview: What You'll See */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          로그인하면 이런 정보를 볼 수 있어요
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold text-gray-900 text-sm mb-1">
              학습 통계
            </div>
            <div className="text-xs text-gray-600">
              학습일, 연속 일수, 평균 점수
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <div className="text-3xl mb-2">💎</div>
            <div className="font-semibold text-gray-900 text-sm mb-1">
              인사이트 현황
            </div>
            <div className="text-xs text-gray-600">
              보유량, 획득/사용 내역
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-semibold text-gray-900 text-sm mb-1">
              획득 뱃지
            </div>
            <div className="text-xs text-gray-600">
              달성한 업적 확인
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold text-gray-900 text-sm mb-1">
              구독 정보
            </div>
            <div className="text-xs text-gray-600">
              플랜 진행 상황
            </div>
          </div>
        </div>
      </div>

      {/* Sample Stats (Blurred) */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">학습 통계 샘플</h3>

        <div className="relative">
          <div className="filter blur-md pointer-events-none select-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                홍
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
                <p className="text-gray-500">hong@example.com</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  23일
                </div>
                <div className="text-sm text-gray-500">학습일</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  85점
                </div>
                <div className="text-sm text-gray-500">평균 점수</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  2,850
                </div>
                <div className="text-sm text-gray-500">인사이트</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  5개
                </div>
                <div className="text-sm text-gray-500">뱃지</div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-orange-200">
              <div className="text-3xl mb-3">🔒</div>
              <div className="font-semibold text-gray-900 mb-2">
                내 통계 보기
              </div>
              <Link
                href="/prototype5/auth/login"
                className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                로그인하기 →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Benefits */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">회원가입 혜택</h3>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>가입 즉시 500 인사이트 지급</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>학습 통계 및 진도 관리</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>뱃지 수집 및 랭킹 참여</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>커뮤니티 활동 및 우수 답변 선정</span>
          </div>
        </div>
        <Link
          href="/prototype5/auth/signup"
          className="block w-full py-3 bg-white text-orange-600 text-center rounded-xl font-bold hover:shadow-lg transition-all"
        >
          무료로 시작하기 →
        </Link>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <Link
          href="/prototype5/pricing"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <span className="text-gray-900 font-medium">플랜 둘러보기</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype5/community"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-900 font-medium">우수 답변 보기</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
