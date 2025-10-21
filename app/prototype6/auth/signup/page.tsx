import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-500">무료로 시작하세요</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">이름</label>
          <input
            type="text"
            placeholder="홍길동"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">이메일</label>
          <input
            type="email"
            placeholder="hong@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <Link
        href="/prototype6/dashboard"
        className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all mb-6"
      >
        가입하기
      </Link>

      <div className="text-center">
        <Link
          href="/prototype6/auth/login"
          className="text-indigo-600 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
