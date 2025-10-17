import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-500">QueryDaily와 함께 성장하세요</p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">이름</label>
          <input
            type="text"
            placeholder="홍길동"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">이메일</label>
          <input
            type="email"
            placeholder="hong@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Benefit */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 mb-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-2">🎁 가입 혜택</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>500 인사이트 즉시 지급</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>첫 구매 시 1,000 인사이트 추가</span>
          </li>
        </ul>
      </div>

      {/* Submit */}
      <Link
        href="/prototype5/dashboard"
        className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all mb-6"
      >
        가입하기
      </Link>

      {/* Login Link */}
      <div className="text-center">
        <Link
          href="/prototype5/auth/login"
          className="text-orange-600 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
