import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="px-6 py-12 min-h-screen flex flex-col justify-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          QueryDaily에 오신 것을 환영합니다
        </h1>
        <p className="text-gray-500">면접 준비의 시작, 지금 시작하세요</p>
      </div>

      {/* Email Login */}
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
          href="/prototype4/dashboard"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          로그인
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-400">또는</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-3 mb-6">
        <button className="w-full py-3 bg-white border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">G</span>
          Google로 계속하기
        </button>
        <button className="w-full py-3 bg-yellow-400 text-gray-900 rounded-xl font-medium hover:bg-yellow-500 transition-colors">
          Kakao로 계속하기
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link
          href="/prototype4/auth/signup"
          className="text-orange-600 hover:underline"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
