import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="px-6 py-12 min-h-screen flex flex-col justify-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          로그인
        </h1>
        <p className="text-gray-500">면접 질문 아카이브에 오신 것을 환영합니다</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="이메일"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
        />
        <Link
          href="/prototype6/dashboard"
          className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          로그인
        </Link>
      </div>

      <div className="text-center">
        <Link
          href="/prototype6/auth/signup"
          className="text-indigo-600 hover:underline"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
