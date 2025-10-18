'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // 실제로는 카카오 OAuth 호출
    // 프로토타입에서는 바로 대시보드로 이동
    router.push('/prototype11/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">👀</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">면접톡</h1>
          <p className="text-gray-600 text-lg">
            매일 3문제, 다른 사람의 생각 엿보기
          </p>
        </div>

        {/* Kakao Login Button */}
        <button
          onClick={handleKakaoLogin}
          className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.794 1.828 5.25 4.574 6.674-.193.71-.675 2.483-.773 2.87-.117.464.17.458.358.333.155-.103 2.515-1.726 3.608-2.47.74.102 1.5.156 2.28.156 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
          </svg>
          카카오톡으로 3초 만에 시작하기
        </button>

        {/* Info */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200">
          <div className="text-sm text-gray-700 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>매일 3문제만, 부담 없이</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>현직자 답변 무제한 엿보기</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>답변 공유하면 인사이트 적립</span>
            </div>
          </div>
        </div>

        {/* Why Kakao Only */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🇰🇷 한국 개발자를 위한 가장 빠른 방법입니다
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/prototype11" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
