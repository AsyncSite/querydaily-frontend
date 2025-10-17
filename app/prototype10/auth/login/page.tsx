import Link from 'next/link';

export default function LoginPageV10() {
  return (
    <div className="px-6 py-12 min-h-screen flex flex-col justify-center bg-gray-900">
      <div className="mb-12 text-center">
        <div className="text-6xl mb-4">⚔️</div>
        <h1 className="text-3xl font-bold text-white mb-2">
          면접 배틀
        </h1>
        <p className="text-gray-400">게임처럼 즐기며 실력을 키우세요</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="이메일"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:border-red-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:border-red-500 focus:outline-none"
        />
        <Link
          href="/prototype10/dashboard"
          className="block w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          로그인
        </Link>
      </div>

      <div className="text-center">
        <Link
          href="/prototype10/auth/signup"
          className="text-red-500 hover:underline"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
