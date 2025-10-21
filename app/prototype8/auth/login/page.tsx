import Link from 'next/link';

export default function LoginPageV8() {
  return (
    <div className="px-6 py-12 min-h-screen flex flex-col justify-center">
      <div className="mb-12 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          면접톡
        </h1>
        <p className="text-gray-500">면접 경험을 나누고 함께 성장하세요</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="이메일"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
        />
        <Link
          href="/prototype8/feed"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          로그인
        </Link>
      </div>

      <div className="text-center">
        <Link
          href="/prototype8/auth/signup"
          className="text-orange-600 hover:underline"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
