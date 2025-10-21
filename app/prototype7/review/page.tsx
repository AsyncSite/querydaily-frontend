'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [rating, setRating] = useState<'again' | 'hard' | 'good' | 'easy' | null>(null);

  const reviewQuestions = [
    {
      id: '1',
      title: 'JPA 영속성 컨텍스트',
      description: '영속성 컨텍스트의 역할과 생명주기에 대해 설명해주세요.',
      category: 'JPA',
      lastStudied: '3일 전',
      dueStatus: '복습 필요',
      sampleAnswer: '영속성 컨텍스트는 엔티티를 영구 저장하는 환경입니다. 1차 캐시, 동일성 보장, 쓰기 지연, 변경 감지, 지연 로딩 등의 기능을 제공합니다.',
      myAnswer: '영속성 컨텍스트는 엔티티 매니저를 통해 엔티티를 관리하는 공간이고...'
    },
    {
      id: '2',
      title: 'Redis 캐시 전략',
      description: 'Cache-Aside와 Write-Through 패턴의 차이점을 설명해주세요.',
      category: 'Redis',
      lastStudied: '3일 전',
      dueStatus: '복습 필요',
      sampleAnswer: 'Cache-Aside는 캐시 미스 시 DB에서 읽어온 후 캐시에 저장하는 방식이고, Write-Through는 쓰기 시 캐시와 DB에 동시에 저장하는 방식입니다.',
      myAnswer: ''
    },
    {
      id: '3',
      title: 'HTTP vs HTTPS',
      description: 'HTTPS의 동작 원리와 SSL/TLS 핸드셰이크 과정을 설명해주세요.',
      category: 'Network',
      lastStudied: '3일 전',
      dueStatus: '복습 필요',
      sampleAnswer: 'HTTPS는 SSL/TLS를 통해 암호화된 HTTP입니다. 핸드셰이크 과정에서 서버 인증, 키 교환, 암호화 알고리즘 협상이 이루어집니다.',
      myAnswer: 'HTTPS는 HTTP에 보안을 추가한 프로토콜...'
    }
  ];

  const currentQuestion = reviewQuestions[currentIndex];

  const handleRating = (selectedRating: 'again' | 'hard' | 'good' | 'easy') => {
    setRating(selectedRating);

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentIndex < reviewQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setRating(null);
      } else {
        // Review completed - could navigate to completion screen
        alert('복습 완료! 🎉');
      }
    }, 500);
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/prototype7/dashboard" className="text-gray-500">
          ← 돌아가기
        </Link>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {reviewQuestions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / reviewQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            {currentQuestion.category}
          </span>
          <span className="text-xs text-gray-500">
            {currentQuestion.lastStudied} 학습
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {currentQuestion.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {currentQuestion.description}
        </p>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            답변 확인하기
          </button>
        ) : (
          <div className="space-y-4">
            {/* My Answer */}
            {currentQuestion.myAnswer && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  내가 작성한 답변
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentQuestion.myAnswer}
                </p>
              </div>
            )}

            {/* Sample Answer */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                샘플 답변
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentQuestion.sampleAnswer}
              </p>
            </div>

            {/* Rating Buttons */}
            <div className="pt-4">
              <div className="text-sm font-semibold text-gray-900 mb-3 text-center">
                이 질문을 얼마나 잘 기억하고 있나요?
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleRating('again')}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    rating === 'again'
                      ? 'bg-red-500 text-white'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  다시 (1일 후)
                </button>
                <button
                  onClick={() => handleRating('hard')}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    rating === 'hard'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  어려움 (3일 후)
                </button>
                <button
                  onClick={() => handleRating('good')}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    rating === 'good'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  좋음 (7일 후)
                </button>
                <button
                  onClick={() => handleRating('easy')}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    rating === 'easy'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  쉬움 (14일 후)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-semibold text-gray-900 mb-1">복습의 힘</div>
            <p className="text-sm text-gray-600">
              같은 질문을 반복해서 복습하면 장기 기억으로 전환됩니다.
              간격을 두고 복습하는 것이 가장 효과적이에요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
