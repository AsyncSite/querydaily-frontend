import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          환영합니다! 👋
        </h2>
        <p className="text-gray-700 text-sm mb-4">
          QueryDaily는 매일 실전 면접 질문과 전문가 피드백으로
          <br />
          면접 준비를 도와드립니다.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-white rounded-lg text-orange-600 font-medium">
            🎁 가입 시 500 인사이트 지급
          </span>
        </div>
      </div>

      {/* Today's Question (Sample) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">오늘의 질문 미리보기</h3>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
            샘플
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-800 leading-relaxed">
            Spring Boot 애플리케이션에서 트랜잭션 전파(Propagation) 속성에 대해
            설명하고, REQUIRES_NEW와 NESTED의 차이점을 실제 사용 사례와 함께
            설명해주세요.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm">
            Spring
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
            Backend
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm">
            중급
          </span>
        </div>

        {/* Login CTA */}
        <Link
          href="/prototype5/auth/login"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          로그인하고 답변하기 →
        </Link>
      </div>

      {/* Value Proposition */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-3xl mb-2">👨‍💼</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">
            전문가 피드백
          </div>
          <div className="text-xs text-gray-500">
            카카오, 네이버 현직자
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">
            점수 & 분석
          </div>
          <div className="text-xs text-gray-500">실력 향상 추적</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-3xl mb-2">🔥</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">
            매일 1문제
          </div>
          <div className="text-xs text-gray-500">30일 완주 챌린지</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-3xl mb-2">💎</div>
          <div className="font-semibold text-gray-900 text-sm mb-1">
            인사이트 획득
          </div>
          <div className="text-xs text-gray-500">추가 기능 이용</div>
        </div>
      </div>

      {/* Sample Feedback Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">전문가 피드백 샘플</h3>
          <span className="text-orange-600 text-sm font-medium">미리보기</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
              김
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                김철수 시니어
              </div>
              <div className="text-sm text-gray-600">현) 카카오 백엔드</div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-emerald-600">85</span>
              <span className="text-sm text-gray-600">/ 100</span>
            </div>
            <p className="text-sm text-gray-700">
              트랜잭션 전파에 대한 이해가 좋습니다. 실무 예시를 더 추가하면
              완벽할 것 같아요!
            </p>
          </div>

          <Link
            href="/prototype5/feedback"
            className="block w-full py-2.5 border-2 border-orange-500 text-orange-600 text-center rounded-xl font-medium hover:bg-orange-50 transition-colors"
          >
            전체 피드백 보기 →
          </Link>
        </div>
      </div>

      {/* Sign Up CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">지금 시작하세요!</h3>
        <p className="text-orange-50 text-sm mb-4">
          회원가입하고 매일 면접 질문과 전문가 피드백을 받아보세요.
        </p>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>가입 즉시 500 인사이트 지급</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>첫 구매 시 1,000 인사이트 추가</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>7일 무료 환불 보장</span>
          </div>
        </div>
        <Link
          href="/prototype5/auth/signup"
          className="block w-full py-3 bg-white text-orange-600 text-center rounded-xl font-bold hover:shadow-lg transition-all"
        >
          무료로 시작하기 →
        </Link>
      </div>

      {/* Community Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">🏆 이번 주 우수 답변</h3>
          <Link
            href="/prototype5/community"
            className="text-orange-600 text-sm font-medium hover:underline"
          >
            더보기 →
          </Link>
        </div>

        <div className="space-y-3">
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                박
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  박지민 님
                </div>
                <div className="text-xs text-gray-500">95점 획득</div>
              </div>
              <span className="text-xl">🥇</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              REQUIRES_NEW는 항상 새로운 트랜잭션을 시작하며 기존
              트랜잭션과는 독립적으로 동작합니다...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
