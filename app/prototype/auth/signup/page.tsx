import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">회원가입</h1>
          <p className="text-gray-400">3일 무료 체험으로 시작하세요</p>
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
              <label className="block text-sm font-medium mb-2">이름</label>
              <input
                type="text"
                placeholder="홍길동"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <input
                type="password"
                placeholder="8자 이상 입력하세요"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">경력 레벨</label>
              <select className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors">
                <option>신입 (1년 미만)</option>
                <option>주니어 (1-3년)</option>
                <option>미들 (3-5년)</option>
                <option>시니어 (5년 이상)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                기술 스택 (선택)
              </label>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Spring', 'JPA', 'MySQL', 'Redis', 'Kafka'].map(
                  (tech) => (
                    <button
                      key={tech}
                      type="button"
                      className="px-3 py-1.5 text-sm bg-[#0d0d0d] border border-[#2a2a2a] rounded-full hover:border-[#c3e88d] transition-colors"
                    >
                      {tech}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" required />
                <span className="text-gray-400">
                  <a href="#" className="text-[#c3e88d] hover:underline">
                    이용약관
                  </a>
                  {' 및 '}
                  <a href="#" className="text-[#c3e88d] hover:underline">
                    개인정보처리방침
                  </a>
                  에 동의합니다
                </span>
              </label>
            </div>

            <Link
              href="/prototype/dashboard"
              className="block w-full py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-full font-semibold text-center hover:bg-[#a8d378] transition-colors"
            >
              3일 무료로 시작하기
            </Link>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
            <p className="text-center text-gray-400">
              이미 계정이 있으신가요?{' '}
              <Link
                href="/prototype/auth/login"
                className="text-[#c3e88d] font-semibold hover:underline"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
