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
      title: '답변 공유하면 인사이트 적립',
      description: '공유할수록 더 많이 볼 수 있어요',
      detail: '답변 1개당 +10 인사이트',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/prototype11/dashboard');
    }
  };

  const handleSkip = () => {
    router.push('/prototype11/dashboard');
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
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {currentStep === steps.length - 1 ? '시작하기' : '다음'}
          </button>
        </div>

        {/* Step Indicator */}
        <div className="text-center text-sm text-gray-500">
          {currentStep + 1} / {steps.length}
        </div>
      </div>
    </div>
  );
}
