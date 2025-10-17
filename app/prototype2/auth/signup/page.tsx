import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="px-6 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-500">QueryDaily와 함께 성장하세요</p>
      </div>

      {/* Form */}
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

        <div>
          <label className="text-sm text-gray-600 mb-2 block">경력</label>
          <div className="grid grid-cols-3 gap-2">
            {['주니어', '미들', '시니어'].map((level) => (
              <button
                key={level}
                className="py-2 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">관심 기술</label>
          <div className="flex flex-wrap gap-2">
            {['Spring', 'Node.js', 'React', 'Kafka', 'AWS'].map((tech) => (
              <button
                key={tech}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors mb-6">
        가입하기
      </button>

      {/* Login Link */}
      <div className="text-center">
        <Link
          href="/prototype2/auth/login"
          className="text-indigo-600 hover:underline"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
