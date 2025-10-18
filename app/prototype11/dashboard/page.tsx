'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const todayQuestions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      completed: false
    },
    {
      id: 2,
      title: 'JPA N+1 문제와 해결 방법',
      category: 'JPA',
      difficulty: '중급',
      completed: false
    },
    {
      id: 3,
      title: 'HTTP와 HTTPS의 차이',
      category: 'Network',
      difficulty: '초급',
      completed: false
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Streak */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-8 text-white text-center shadow-lg">
          <div className="text-6xl mb-3">👋</div>
          <div className="text-3xl font-bold mb-2">첫 방문을 환영합니다!</div>
          <div className="text-emerald-50 text-sm">오늘부터 시작해보세요</div>
        </div>

        {/* Today's 3 Questions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">오늘의 3문제</h2>
            <span className="text-sm text-gray-500">0/3 완료</span>
          </div>

          <div className="space-y-3">
            {todayQuestions.map((question, index) => (
              <Link
                key={question.id}
                href={`/prototype11/questions/${question.id}`}
                className="block bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    question.completed
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {question.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full">
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === '초급'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Category Access */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">📂 카테고리별 질문</h3>
            <Link href="/prototype11/categories" className="text-sm text-emerald-600 hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/prototype11/questions?category=spring"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-xs font-medium text-gray-900">Spring</div>
            </Link>
            <Link
              href="/prototype11/questions?category=jpa"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">💾</div>
              <div className="text-xs font-medium text-gray-900">JPA</div>
            </Link>
            <Link
              href="/prototype11/questions?category=react"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-xs font-medium text-gray-900">React</div>
            </Link>
            <Link
              href="/prototype11/questions?category=database"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-xs font-medium text-gray-900">DB</div>
            </Link>
            <Link
              href="/prototype11/questions?category=network"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-xs font-medium text-gray-900">Network</div>
            </Link>
            <Link
              href="/prototype11/questions?category=algorithm"
              className="bg-white rounded-xl p-3 text-center border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <div className="text-2xl mb-1">🧮</div>
              <div className="text-xs font-medium text-gray-900">알고리즘</div>
            </Link>
          </div>
        </div>

        {/* Premium Feature - Unlimited Peek */}
        <div className="bg-gradient-to-r from-[#ffcb6b]/10 to-[#ffcb6b]/5 rounded-2xl p-6 shadow-md border-2 border-[#ffcb6b]/30">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">🔒</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900">무제한 훔쳐보기</h3>
                <span className="px-2 py-0.5 bg-[#ffcb6b] text-gray-900 text-xs font-bold rounded-full">
                  PREMIUM
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                오늘의 3문제 외에도 모든 질문을 무제한으로 훔쳐볼 수 있어요
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-lg">💎</span>
                  <span className="text-sm font-bold text-gray-900">50 필요</span>
                </div>
                <div className="text-gray-400">·</div>
                <div className="text-sm text-gray-600">24시간 이용권</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowUnlockModal(true)}
            className="w-full py-3 bg-[#ffcb6b] text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            잠금 해제하기
          </button>
        </div>

        {/* Unlock Modal */}
        {showUnlockModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setShowUnlockModal(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  무제한 훔쳐보기
                </h2>
                <p className="text-sm text-gray-600">
                  24시간 동안 모든 질문의 답변을 무제한으로 볼 수 있어요
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">필요한 인사이트</span>
                  <span className="text-lg font-bold text-gray-900">50 💎</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">보유 인사이트</span>
                  <span className="text-lg font-bold text-red-600">0 💎</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">부족</span>
                    <span className="text-lg font-bold text-red-600">-50 💎</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-200">
                <p className="text-sm text-gray-700 text-center">
                  💡 답변을 공유하면 <strong className="text-emerald-700">+10 💎</strong>씩 받을 수 있어요<br/>
                  <span className="text-xs text-gray-500">5개 답변 = 50 인사이트</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnlockModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  닫기
                </button>
                <Link
                  href="/prototype11/questions/1"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all"
                >
                  답변 공유하러 가기
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Simple Tips */}
        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-200">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <strong>답변 후 훔쳐보기가 핵심!</strong><br/>
                현직자들은 어떻게 답했는지 엿보며 새로운 관점을 배워보세요.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
