'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PersonalizationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [field, setField] = useState<string>('');
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('');
  const [showCompanyVerification, setShowCompanyVerification] = useState(false);

  const fields = [
    { id: 'backend', label: '백엔드', emoji: '🔧' },
    { id: 'frontend', label: '프론트엔드', emoji: '🎨' },
    { id: 'fullstack', label: '풀스택', emoji: '🚀' },
    { id: 'mobile', label: '모바일', emoji: '📱' },
    { id: 'devops', label: 'DevOps', emoji: '⚙️' },
  ];

  const techStacksByField: Record<string, { id: string; label: string }[]> = {
    backend: [
      { id: 'spring', label: 'Spring' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'django', label: 'Django' },
      { id: 'jpa', label: 'JPA' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'postgresql', label: 'PostgreSQL' },
      { id: 'redis', label: 'Redis' },
      { id: 'kafka', label: 'Kafka' },
    ],
    frontend: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'tailwind', label: 'Tailwind' },
    ],
    fullstack: [
      { id: 'spring', label: 'Spring' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'react', label: 'React' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'postgresql', label: 'PostgreSQL' },
    ],
    mobile: [
      { id: 'react-native', label: 'React Native' },
      { id: 'flutter', label: 'Flutter' },
      { id: 'swift', label: 'Swift' },
      { id: 'kotlin', label: 'Kotlin' },
    ],
    devops: [
      { id: 'docker', label: 'Docker' },
      { id: 'kubernetes', label: 'Kubernetes' },
      { id: 'aws', label: 'AWS' },
      { id: 'jenkins', label: 'Jenkins' },
      { id: 'terraform', label: 'Terraform' },
    ],
  };

  const experiences = [
    { id: 'student', label: '준비 중', subLabel: '취준생' },
    { id: 'junior', label: '0-2년', subLabel: '주니어' },
    { id: 'mid', label: '3-5년', subLabel: '미들' },
    { id: 'senior', label: '5년+', subLabel: '시니어' },
  ];

  const toggleTechStack = (techId: string) => {
    if (techStacks.includes(techId)) {
      setTechStacks(techStacks.filter(id => id !== techId));
    } else if (techStacks.length < 3) {
      setTechStacks([...techStacks, techId]);
    }
  };

  const handleNext = () => {
    if (step === 1 && field) {
      setStep(2);
    } else if (step === 2 && techStacks.length > 0) {
      setStep(3);
    } else if (step === 3 && experience) {
      setStep(4);
    }
  };

  const handleSkip = () => {
    router.push('/prototype11/dashboard');
  };

  const handleComplete = () => {
    // TODO: Save to backend
    console.log('Personalization data:', { field, techStacks, experience });
    router.push('/prototype11/dashboard');
  };

  const handleCompanyVerification = () => {
    // TODO: Implement email verification
    setShowCompanyVerification(false);
    router.push('/prototype11/dashboard');
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            딱 30초만 투자하세요
          </h1>
          <p className="text-gray-600">
            당신에게 딱 맞는 질문을 추천해드릴게요
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Step {step}/4</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Field Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              주요 개발 분야는?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {fields.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setField(f.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    field === f.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{f.emoji}</div>
                  <div className="font-semibold text-gray-900">{f.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tech Stack Selection */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              주로 사용하는 기술은?
            </h2>
            <p className="text-sm text-gray-600 mb-6">최대 3개까지 선택</p>
            <div className="flex flex-wrap gap-2">
              {techStacksByField[field]?.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => toggleTechStack(tech.id)}
                  disabled={!techStacks.includes(tech.id) && techStacks.length >= 3}
                  className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                    techStacks.includes(tech.id)
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : techStacks.length >= 3
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
                  }`}
                >
                  {tech.label}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              {techStacks.length}/3 선택됨
            </div>
          </div>
        )}

        {/* Step 3: Experience Selection */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              경력은?
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setExperience(exp.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    experience === exp.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{exp.label}</div>
                  <div className="text-sm text-gray-600">{exp.subLabel}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Optional Company Verification */}
        {step === 4 && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                설정 완료!
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">개발 분야</span>
                  <span className="font-semibold text-gray-900">
                    {fields.find(f => f.id === field)?.label}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">기술 스택</span>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                    {techStacks.map(techId => (
                      <span key={techId} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                        {techStacksByField[field]?.find(t => t.id === techId)?.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">경력</span>
                  <span className="font-semibold text-gray-900">
                    {experiences.find(e => e.id === experience)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Verification (Optional) */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border-2 border-blue-300">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🏢</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    직장 인증 (선택)
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    회사 이메일로 인증하면 "재직자" 배지와 함께 더 많은 혜택을 받을 수 있어요
                  </p>
                  <div className="bg-white/60 rounded-xl p-3 border border-blue-200 mb-4">
                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>회사 배지 획득 (LINE, Kakao 등)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>답변 작성 시 +15 💎 (일반 +10)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>프로필에 재직 기간 표시</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCompanyVerification(true)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    직장 인증하기
                  </button>
                  <button
                    onClick={handleComplete}
                    className="w-full px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-all mt-2"
                  >
                    나중에 하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Company Verification Modal */}
        {showCompanyVerification && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setShowCompanyVerification(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🏢</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  직장 인증
                </h2>
                <p className="text-sm text-gray-600">
                  회사 이메일로 인증 메일을 보내드립니다
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    회사 이메일
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Gmail, Naver 등 개인 이메일은 인증되지 않습니다
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-xs text-gray-700">
                    <strong>인증 가능한 도메인 예시:</strong>
                    <br/>@naver.com, @kakao.com, @line.com, @woowahan.com 등
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCompanyVerification(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleCompanyVerification}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  인증 메일 발송
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {step < 4 && (
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                ← 이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !field) ||
                (step === 2 && techStacks.length === 0) ||
                (step === 3 && !experience)
              }
              className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음 →
            </button>
          </div>
        )}

        {/* Skip Button */}
        {step < 4 && (
          <div className="text-center mt-4">
            <button
              onClick={handleSkip}
              className="text-gray-500 text-sm hover:text-gray-700 transition-all"
            >
              건너뛰기 (기본 추천 받기)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
