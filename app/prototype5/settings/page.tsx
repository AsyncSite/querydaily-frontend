import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Login Required */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">설정</h2>
        <p className="text-gray-600 mb-6">
          프로필, 알림, 구독 관리 등을 설정하려면
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

      {/* Preview: Available Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          로그인하면 이런 설정을 할 수 있어요
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">👤</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">프로필 관리</div>
              <div className="text-sm text-gray-600">
                이름, 이메일, 프로필 사진 변경
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔔</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">알림 설정</div>
              <div className="text-sm text-gray-600">
                일일 질문, 피드백, 커뮤니티 알림
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📦</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">구독 관리</div>
              <div className="text-sm text-gray-600">
                플랜 변경, 결제 정보 관리
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔐</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">계정 보안</div>
              <div className="text-sm text-gray-600">
                비밀번호 변경, 2단계 인증
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Settings (Blurred) */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">설정 화면 미리보기</h3>

        <div className="relative">
          <div className="filter blur-md pointer-events-none select-none">
            <div className="space-y-4">
              {/* Profile */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3">프로필</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value="홍길동"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    disabled
                  />
                  <input
                    type="email"
                    value="hong@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    disabled
                  />
                </div>
              </div>

              {/* Notifications */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3">알림 설정</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">일일 질문 알림</span>
                    <div className="w-12 h-6 bg-orange-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      전문가 피드백 알림
                    </span>
                    <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Subscription */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3">구독 정보</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">GROWTH_PLAN</div>
                    <div className="text-sm text-gray-600">23/30일 진행중</div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                    관리
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-orange-200">
              <div className="text-3xl mb-3">🔒</div>
              <div className="font-semibold text-gray-900 mb-2">
                설정 변경하기
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

      {/* Why Sign Up */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          QueryDaily를 더 편리하게
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>나에게 맞는 학습 알림 설정</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>구독 플랜 자유롭게 변경</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>결제 정보 안전하게 관리</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>언제든지 계정 일시정지/삭제</span>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <Link
          href="/prototype5/dashboard"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              <span className="text-gray-900 font-medium">홈으로 돌아가기</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
