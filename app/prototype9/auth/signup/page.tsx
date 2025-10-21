import Link from 'next/link';

export default function SignUpPageV9() {
  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-500">면접 준비를 시작하세요</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">이름</label>
          <input
            type="text"
            placeholder="홍길동"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">이메일</label>
          <input
            type="email"
            placeholder="hong@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">면접 일정 (선택)</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">지원 직무 (선택)</label>
          <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none">
            <option>선택하세요</option>
            <option>백엔드 개발자 (신입)</option>
            <option>백엔드 개발자 (경력)</option>
            <option>프론트엔드 개발자 (신입)</option>
            <option>프론트엔드 개발자 (경력)</option>
          </select>
        </div>
      </div>

      <Link
        href="/prototype9/dashboard"
        className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all mb-6"
      >
        가입하고 시작하기
      </Link>

      <div className="text-center">
        <Link
          href="/prototype9/auth/login"
          className="text-blue-600 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
