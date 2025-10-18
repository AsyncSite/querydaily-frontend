'use client';

import { useRouter } from 'next/navigation';

export default function Prototype11Landing() {
  const router = useRouter();

  const handleKakaoStart = () => {
    router.push('/prototype11/auth/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-md mx-auto px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">👀</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            면접톡
          </h1>
          <p className="text-gray-600 text-lg">
            매일 3문제, 다른 사람의 생각 엿보기
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-4 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">매일 딱 3문제</h3>
                <p className="text-sm text-gray-600">부담 없이 습관으로</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">👀</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">답변 후 바로 훔쳐보기</h3>
                <p className="text-sm text-gray-600">현직자는 어떻게 답할까?</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💎</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">공유하면 인사이트 적립</h3>
                <p className="text-sm text-gray-600">답변 공유로 포인트 획득</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kakao CTA */}
        <button
          onClick={handleKakaoStart}
          className="w-full py-5 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl mb-4"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.794 1.828 5.25 4.574 6.674-.193.71-.675 2.483-.773 2.87-.117.464.17.458.358.333.155-.103 2.515-1.726 3.608-2.47.74.102 1.5.156 2.28.156 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
          </svg>
          카카오톡으로 3초 만에 시작하기
        </button>

        <p className="text-center text-xs text-gray-500 mb-8">
          🇰🇷 한국 개발자를 위한 가장 빠른 방법
        </p>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-12">
          v11: 초심플 훔쳐보기 루틴
        </p>
      </div>
    </div>
  );
}
