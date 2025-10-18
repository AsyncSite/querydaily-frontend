import Link from 'next/link';

export default function Prototype11Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-md mx-auto px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">👀</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            면접톡
          </h1>
          <p className="text-gray-600 text-lg">
            매일 3문제, 다른 사람의 생각 엿보기
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">매일 딱 3문제</h3>
                <p className="text-sm text-gray-600">부담 없이 습관으로</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">👀</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">답변 후 바로 훔쳐보기</h3>
                <p className="text-sm text-gray-600">현직자는 어떻게 답할까?</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💎</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">공유하면 PC 할인</h3>
                <p className="text-sm text-gray-600">인사이트로 상품 구매 시 할인</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link
            href="/prototype11/auth/signup"
            className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            무료로 시작하기
          </Link>
          <Link
            href="/prototype11/auth/login"
            className="block w-full py-4 bg-white text-gray-700 text-center rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            이미 계정이 있어요
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          v11: 초심플 훔쳐보기 루틴
        </p>
      </div>
    </div>
  );
}
