'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LearnQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const question = {
    id: params.id,
    title: 'Spring AOP 동작 원리',
    description: 'Spring AOP의 프록시 기반 동작 원리와 위빙 시점에 대해 설명해주세요.',
    difficulty: '중급',
    category: 'Spring',
    hint: '프록시 패턴과 JDK Dynamic Proxy, CGLIB의 차이점을 생각해보세요.',
    keyPoints: [
      '프록시 패턴 기반',
      'JDK Dynamic Proxy vs CGLIB',
      '위빙 시점 (컴파일타임, 로드타임, 런타임)',
      '@Aspect와 Advice 타입'
    ]
  };

  const handleSubmit = () => {
    // Navigate back to dashboard after submission
    router.push('/prototype7/dashboard');
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <Link href="/prototype7/dashboard" className="text-gray-500">
          ← 뒤로
        </Link>
        <div className="text-sm text-gray-500">Day 7 - Question 3/3</div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
            {question.category}
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {question.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* Key Points */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">💡 체크 포인트</h3>
        <ul className="space-y-2">
          {question.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hint Section */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="text-yellow-700 font-medium text-sm"
          >
            💡 힌트 보기
          </button>
        ) : (
          <div>
            <div className="font-semibold text-gray-900 mb-2">💡 힌트</div>
            <p className="text-sm text-gray-700">{question.hint}</p>
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block mb-3">
          <span className="font-semibold text-gray-900">내 답변 작성</span>
          <span className="text-sm text-gray-500 ml-2">(선택사항)</span>
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 자유롭게 작성해보세요. 작성하지 않고 넘어가도 괜찮습니다."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
          rows={8}
        />
        <div className="text-xs text-gray-400 mt-2">
          💾 자동 저장됩니다. 나중에 복습할 때 다시 볼 수 있어요.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          답변 제출하고 다음으로
        </button>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gray-100 text-gray-600 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          건너뛰기
        </button>
      </div>

      {/* Encouragement */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center">
        <div className="text-3xl mb-2">🎯</div>
        <div className="font-medium text-gray-900 mb-1">오늘 마지막 질문이에요!</div>
        <div className="text-sm text-gray-600">
          완료하면 7일 연속 학습 달성! 🔥
        </div>
      </div>
    </div>
  );
}
