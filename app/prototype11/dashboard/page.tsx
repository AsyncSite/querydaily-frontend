'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('POTATO2024');
      setToastMessage('✅ 초대 코드가 복사되었습니다!');
      setShowToast(true);
    } catch (err) {
      setToastMessage('❌ 복사 실패. 코드를 수동으로 복사해주세요.');
      setShowToast(true);
    }
  };

  const todayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      answerCount: 12
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      answerCount: 8
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      answerCount: 15
    }
  ];

  const isCompleted = currentIndex >= todayQuestions.length;

  const handleNext = () => {
    if (currentIndex < todayQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
      {/* Hero Value Proposition */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg mb-8">
        <div className="text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-xl font-bold mb-3">
            현직자 답변으로<br/>면접 준비하기
          </h1>

          {/* Social Proof Badge - Ultra Minimal */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-emerald-100 text-xs">
            <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
            <span>오늘 142명 학습 중</span>
          </div>
        </div>
      </div>

      {/* Card Stack or Completion State */}
      {!isCompleted ? (
        <div className="relative h-[500px] mb-8">
          {/* Card Stack */}
          <div className="absolute inset-0 flex items-center justify-center">
            {todayQuestions.map((question, index) => {
              const isVisible = index >= currentIndex && index < currentIndex + 3;
              const stackIndex = index - currentIndex;

              return isVisible ? (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  stackIndex={stackIndex}
                  totalCount={todayQuestions.length}
                  currentIndex={currentIndex}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onShare={() => setShowShareModal(true)}
                />
              ) : null;
            })}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            {todayQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-emerald-500'
                    : index < currentIndex
                    ? 'w-2 bg-emerald-300'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Completion State */
        <>
          {/* Completion Card - Compact */}
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center mb-6">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-gray-900">
              오늘 3개 완료!
            </h2>
          </div>

          {/* Review Recommendation */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>복습 추천</span>
            </h3>

            {/* Random Past Question Card */}
            <Link
              href="/prototype11/questions/11"
              className="block bg-white rounded-2xl p-6 shadow-md border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
            >
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-sm rounded-full font-medium">
                  React
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full font-medium">
                  중급
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                React Hooks의 동작 원리
              </h3>

              <div className="text-sm text-gray-500 mb-4">
                💬 15개 답변
              </div>

              <div className="flex gap-2">
                <div className="flex-1 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold text-center">
                  다시 보기 →
                </div>
                <div className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold text-center">
                  답변 작성 +10 💎
                </div>
              </div>
            </Link>
          </div>
        </>
      )}

      {/* Archive Button - Only show if not completed, or show differently if completed */}
      {!isCompleted ? (
        <Link
          href="/prototype11/archive"
          className="block bg-white rounded-2xl p-5 shadow-md border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <div className="font-semibold text-gray-900">지난 질문 확인하기</div>
                <div className="text-sm text-gray-500">복습하고 인사이트 얻기</div>
              </div>
            </div>
            <span className="text-emerald-600">→</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/prototype11/archive"
          className="block bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 hover:border-gray-300 transition-all text-center"
        >
          <div className="text-sm font-semibold text-gray-600">
            📚 모든 지난 질문 보기 →
          </div>
        </Link>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                친구 초대하기
              </h2>
              <p className="text-gray-600">
                친구가 가입하면 나도 친구도 각각
              </p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                +50 💎
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
              <div className="text-xs text-gray-600 mb-2 text-center">내 초대 코드</div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 tracking-wider mb-3">
                  POTATO2024
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all"
                >
                  코드 복사
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full py-4 bg-[#FEE500] text-gray-900 rounded-xl font-semibold hover:bg-[#FDD835] transition-all flex items-center justify-center gap-2">
                <span className="text-xl">💬</span>
                카카오톡으로 초대
              </button>
              <button className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <span className="text-xl">🔗</span>
                링크 복사
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 text-gray-500 hover:text-gray-700 transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl">
            <p className="text-sm font-medium text-center">
              {toastMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
    category: string;
    difficulty: string;
    answerCount: number;
  };
  index: number;
  stackIndex: number;
  totalCount: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onShare: () => void;
}

function QuestionCard({ question, index, stackIndex, totalCount, currentIndex, onNext, onPrev, onShare }: QuestionCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onPrev();
    } else if (info.offset.x < -100) {
      onNext();
    }
  };

  const scale = stackIndex === 0 ? 1 : stackIndex === 1 ? 0.95 : 0.9;
  const yOffset = stackIndex * 15;
  const rotateOffset = stackIndex === 0 ? 2 : stackIndex === 1 ? -2 : -4;
  const xOffset = stackIndex === 0 ? 0 : stackIndex === 1 ? -15 : -25;
  const zIndex = 10 - stackIndex;

  return (
    <motion.div
      style={{
        x: stackIndex === 0 ? x : xOffset,
        rotate: stackIndex === 0 ? rotate : rotateOffset,
        opacity: stackIndex === 0 ? opacity : 1,
        scale,
        zIndex,
      }}
      drag={stackIndex === 0 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        y: yOffset,
        transition: { duration: 0.3 }
      }}
      className="absolute w-full max-w-sm"
    >
      <div className={`bg-white rounded-3xl p-8 shadow-2xl border-2 ${
        stackIndex === 0 ? 'border-emerald-400' : 'border-gray-200'
      }`}>
        {/* Progress */}
        <div className="text-sm font-semibold text-emerald-600 mb-6 text-center">
          {index + 1}/{totalCount}
        </div>

        {/* Category & Difficulty */}
        <div className="flex gap-2 mb-4 justify-center">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium">
            {question.category}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
            question.difficulty === '초급'
              ? 'bg-green-50 text-green-600'
              : 'bg-orange-50 text-orange-600'
          }`}>
            {question.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6 leading-relaxed">
          {question.title}
        </h3>

        {/* Answer Count */}
        <div className="text-center text-sm text-gray-500 mb-8">
          💬 {question.answerCount}개 답변
        </div>

        {/* View Button */}
        <Link
          href={`/prototype11/questions/${question.id}`}
          className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-center hover:shadow-xl transition-all mb-3"
        >
          답변 보기 →
        </Link>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="w-full py-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-all flex items-center justify-center gap-2"
        >
          <span>🎁</span>
          친구 초대하고 +50 💎 받기
        </button>
      </div>
    </motion.div>
  );
}
