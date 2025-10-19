'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      emoji: '📝',
      title: '매일 딱 3문제만',
      description: '부담 없이 습관으로 만들어요',
      detail: '하루 5분이면 충분해요',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      emoji: '👀',
      title: '답변 후 바로 훔쳐보기',
      description: '현직자는 어떻게 답할까?',
      detail: '라인, 네이버, 카카오 합격자들의 실제 답변',
      color: 'from-teal-400 to-emerald-500'
    },
    {
      emoji: '💎',
      title: '답변 작성하면 인사이트 적립',
      description: '작성할수록 더 많이 볼 수 있어요',
      detail: '답변 1개당 +10 💎',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    router.push('/prototype11');
  };

  const handleKakaoLogin = () => {
    // 실제로는 카카오 OAuth 호출
    // 프로토타입에서는 개인화 설정으로 이동
    router.push('/prototype11/personalization');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            건너뛰기 →
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Emoji */}
          <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${currentStepData.color} rounded-3xl flex items-center justify-center text-5xl shadow-lg`}>
            {currentStepData.emoji}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-2">
              {currentStepData.description}
            </p>
            <p className="text-sm text-gray-500">
              {currentStepData.detail}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleKakaoLogin}
              className="w-full py-5 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.794 1.828 5.25 4.574 6.674-.193.71-.675 2.483-.773 2.87-.117.464.17.458.358.333.155-.103 2.515-1.726 3.608-2.47.74.102 1.5.156 2.28.156 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
              </svg>
              카카오톡으로 시작하기
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              다음
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="text-center text-sm text-gray-500">
          {currentStep + 1} / {steps.length}
        </div>
      </div>
    </div>
  );
}
