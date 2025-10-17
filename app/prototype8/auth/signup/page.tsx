import Link from 'next/link';

export default function SignUpPageV8() {
  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-500">면접톡 커뮤니티에 참여하세요</p>
      </div>

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

        <div>
          <label className="text-sm text-gray-600 mb-1 block">관심 기업 (선택)</label>
          <div className="grid grid-cols-2 gap-2">
            {['Kakao', 'Naver', 'Coupang', 'Toss', 'Line', 'Baemin'].map((company) => (
              <label
                key={company}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer"
              >
                <input type="checkbox" className="accent-orange-500" />
                <span className="text-sm text-gray-700">{company}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/prototype8/feed"
        className="block w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all mb-6"
      >
        가입하고 시작하기
      </Link>

      <div className="text-center">
        <Link
          href="/prototype8/auth/login"
          className="text-orange-600 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
