import Link from 'next/link';

export default function AnswerPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Login Required Notice */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🔒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          로그인이 필요합니다
        </h2>
        <p className="text-gray-600 mb-4">
          답변을 작성하고 전문가 피드백을 받으려면
          <br />
          로그인해주세요.
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

      {/* Preview: What You Get */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          로그인하면 이런 기능을 사용할 수 있어요
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✍️</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                마크다운 에디터로 답변 작성
              </div>
              <div className="text-sm text-gray-600">
                코드 블록, 리스트 등 풍부한 표현 가능
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">힌트 기능</div>
              <div className="text-sm text-gray-600">
                막힐 때 인사이트로 힌트 받기 (100 인사이트)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📊</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                전문가 피드백
              </div>
              <div className="text-sm text-gray-600">
                카카오, 네이버 현직자의 상세한 코멘트
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💎</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                인사이트 획득
              </div>
              <div className="text-sm text-gray-600">
                답변 제출마다 +100 인사이트 적립
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Question Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">오늘의 질문</h3>
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-800 text-sm leading-relaxed">
            Spring Boot 애플리케이션에서 트랜잭션 전파(Propagation) 속성에 대해
            설명하고, REQUIRES_NEW와 NESTED의 차이점을 실제 사용 사례와 함께
            설명해주세요.
          </p>
        </div>

        {/* Blurred Answer Editor */}
        <div className="relative">
          <div className="filter blur-sm pointer-events-none select-none">
            <textarea
              className="w-full h-60 p-4 border border-gray-200 rounded-xl resize-none font-mono text-sm bg-white"
              placeholder="여기에 답변을 작성하세요..."
              disabled
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href="/prototype5/auth/login"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              로그인하고 작성하기 →
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Up Benefits */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-3">🎁 가입 혜택</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>회원가입 시 500 인사이트 즉시 지급</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>첫 구매 시 1,000 인사이트 추가</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>7일 무료 환불 보장</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
