import Link from 'next/link';

export default function SignUpPageV10() {
  return (
    <div className="px-6 py-12 min-h-screen bg-gray-900">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">회원가입</h1>
        <p className="text-gray-400">배틀을 시작하세요</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">이메일</label>
          <input
            type="email"
            placeholder="hong@example.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">시작 아바타 선택</label>
          <div className="grid grid-cols-6 gap-3">
            {['⚔️', '🎯', '💎', '🔥', '⚡', '🌟'].map((avatar) => (
              <button
                key={avatar}
                className="aspect-square bg-gray-800 border-2 border-gray-700 rounded-xl flex items-center justify-center text-2xl hover:border-red-500 transition-colors"
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/prototype10/dashboard"
        className="block w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all mb-6"
      >
        배틀 시작하기
      </Link>

      <div className="text-center">
        <Link
          href="/prototype10/auth/login"
          className="text-red-500 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
