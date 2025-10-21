import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-[#c3e88d]">Query</span>Daily
          </h1>
          <p className="text-gray-400">로그인하고 학습을 시작하세요</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-gray-400">로그인 상태 유지</span>
              </label>
              <a href="#" className="text-[#c3e88d] hover:underline">
                비밀번호 찾기
              </a>
            </div>

            <Link
              href="/prototype/dashboard"
              className="block w-full py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-full font-semibold text-center hover:bg-[#a8d378] transition-colors"
            >
              로그인
            </Link>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
            <p className="text-center text-gray-400">
              계정이 없으신가요?{' '}
              <Link
                href="/prototype/auth/signup"
                className="text-[#c3e88d] font-semibold hover:underline"
              >
                회원가입
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2a2a]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a1a] text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
                <span className="text-xl">🔑</span>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
                <span className="text-xl">💬</span>
                <span className="text-sm">Kakao</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
