'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BattlePage() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);

  const question = {
    id: 1,
    difficulty: 'Gold',
    category: 'Spring',
    question: 'Spring AOP에서 프록시를 통한 메서드 호출 시, 같은 클래스 내부의 메서드를 호출하면 AOP가 동작하지 않는 이유는?',
    options: [
      '프록시 객체를 거치지 않고 직접 호출되기 때문',
      'Spring이 내부 호출을 지원하지 않기 때문',
      'AOP 설정이 잘못되었기 때문',
      'CGLIB 프록시의 한계 때문'
    ],
    correctAnswer: 0,
    explanation: '프록시 패턴에서는 외부에서 호출해야 프록시 객체를 거치게 됩니다. 같은 클래스 내부에서 this.method()로 호출하면 실제 객체의 메서드가 직접 호출되어 AOP가 적용되지 않습니다.',
    exp: 200
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/prototype10/dashboard" className="text-gray-400 text-sm">
          ← 나가기
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-400 font-bold">
            <span>⭐</span>
            <span>+{question.exp}</span>
          </div>
          <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i === 1 ? 'bg-yellow-400' : 'bg-gray-700'
            }`}
          ></div>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-yellow-500 text-gray-900 text-xs rounded-full font-bold">
            {question.difficulty}
          </span>
          <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
            {question.category}
          </span>
        </div>

        <h2 className="text-lg font-bold text-white leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedAnswer === index
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-2 border-yellow-400'
                : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                selectedAnswer === index
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        disabled={selectedAnswer === null}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          selectedAnswer !== null
            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-lg'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selectedAnswer !== null ? '답변 제출' : '답을 선택하세요'}
      </button>

      {/* Lifelines */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <button className="py-3 bg-gray-800 text-white rounded-xl text-sm font-medium border border-gray-700 hover:border-yellow-400 transition-colors">
          <div className="text-xl mb-1">💡</div>
          <div className="text-xs">힌트</div>
        </button>
        <button className="py-3 bg-gray-800 text-white rounded-xl text-sm font-medium border border-gray-700 hover:border-yellow-400 transition-colors">
          <div className="text-xl mb-1">⏰</div>
          <div className="text-xs">시간 +30s</div>
        </button>
        <button className="py-3 bg-gray-800 text-white rounded-xl text-sm font-medium border border-gray-700 hover:border-yellow-400 transition-colors">
          <div className="text-xl mb-1">🎲</div>
          <div className="text-xs">50:50</div>
        </button>
      </div>
    </div>
  );
}
