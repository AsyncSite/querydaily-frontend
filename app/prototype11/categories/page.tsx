'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const trendingQuestions = [
    {
      id: 1,
      rank: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      viewCount: 1234,
      answerCount: 23,
      topAnswerPreview: 'Spring AOP는 프록시 패턴으로 동작합니다. 인터페이스가 있으면 JDK Dynamic Proxy...'
    },
    {
      id: 11,
      rank: 2,
      title: 'React Hooks의 동작 원리',
      viewCount: 987,
      answerCount: 15,
      topAnswerPreview: 'useState는 클로저를 활용합니다. 함수 컴포넌트가 리렌더링되어도...'
    },
    {
      id: 2,
      rank: 3,
      title: 'JPA N+1 문제와 해결 방법',
      viewCount: 856,
      answerCount: 18,
      topAnswerPreview: 'N+1 문제는 연관관계 조회 시 각 엔티티마다 추가 쿼리가 발생하는...'
    }
  ];

  const categories = [
    { id: 'spring', label: 'Spring', emoji: '🍃', count: 45, color: 'bg-green-50 text-green-700 border-green-200' },
    { id: 'jpa', label: 'JPA', emoji: '💾', count: 38, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'react', label: 'React', emoji: '⚛️', count: 52, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { id: 'algorithm', label: 'Algorithm', emoji: '🧮', count: 67, color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'network', label: 'Network', emoji: '🌐', count: 34, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'database', label: 'Database', emoji: '🗄️', count: 41, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
  ];

  const companies = [
    { id: 'line', name: 'LINE', logo: '💚', count: 45 },
    { id: 'naver', name: 'Naver', logo: '🟢', count: 52 },
    { id: 'kakao', name: 'Kakao', logo: '💛', count: 38 },
    { id: 'coupang', name: 'Coupang', logo: '🔵', count: 29 },
    { id: 'toss', name: 'Toss', logo: '💙', count: 34 }
  ];

  const categoryQuestions = selectedCategory ? [
    { id: 101, title: `${selectedCategory.toUpperCase()} 관련 실전 질문`, answerCount: 12 },
    { id: 102, title: `${selectedCategory.toUpperCase()} 심화 개념 정리`, answerCount: 8 },
    { id: 103, title: `${selectedCategory.toUpperCase()} 면접 빈출 문제`, answerCount: 15 }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          탐색
        </h1>
        <p className="text-sm text-gray-600">
          700+ 질문에서 원하는 것을 찾아보세요
        </p>
      </div>

      {/* Trending Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔥</span>
          <span>인기 급상승</span>
        </h2>

        <div className="space-y-3">
          {trendingQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-5 shadow-md border-2 border-gray-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {q.rank}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {q.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>👀 {q.viewCount.toLocaleString()}명</span>
                    <span>•</span>
                    <span>💬 {q.answerCount}개 답변</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-600 mb-1">인기 1위 답변 미리보기</div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {q.topAnswerPreview}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowPaywallModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>나머지 {q.answerCount - 1}개 답변 보기</span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-full">💎 10</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>주제별 탐색</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                selectedCategory === cat.id
                  ? cat.color + ' shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="ml-1 text-xs opacity-70">{cat.count}</span>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="space-y-3">
            {categoryQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">{q.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">💬 {q.answerCount}개 답변</span>
                  <button
                    onClick={() => setShowPaywallModal(true)}
                    className="text-sm text-emerald-600 font-semibold"
                  >
                    보기 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Company Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏢</span>
          <span>회사별 질문</span>
        </h2>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {companies.map((comp) => (
              <div
                key={comp.id}
                className="px-4 py-2 bg-white/60 rounded-full text-sm font-semibold text-gray-500 border border-gray-300 flex items-center gap-2 opacity-75"
              >
                <span>{comp.logo}</span>
                <span>{comp.name}</span>
                <span className="text-xs">{comp.count}</span>
                <span className="text-xs">🔒</span>
              </div>
            ))}
          </div>

          <div className="bg-white/80 rounded-xl p-4 border border-indigo-300">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  회사별 필터는 프리미엄 전용
                </h3>
                <p className="text-sm text-gray-700">
                  네이버 합격자 답변만 모아보고 싶으신가요?
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              프리미엄 보기 →
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔍</span>
          <span>질문 검색하기</span>
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200">
          <div
            onClick={() => setShowPremiumModal(true)}
            className="relative mb-4 cursor-pointer"
          >
            <input
              type="text"
              placeholder="Spring, JPA, Redis..."
              disabled
              className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl text-gray-400 bg-gray-50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">
              🔒
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              검색하면 이렇게 나와요
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">"Spring JPA"</span>
                <span className="text-sm font-semibold text-emerald-600">→ 34개 질문</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">"네이버 백엔드"</span>
                <span className="text-sm font-semibold text-emerald-600">→ 12개 질문</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowPremiumModal(true)}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            검색 기능 사용하기 (프리미엄)
          </button>
        </div>
      </section>

      {/* Paywall Modal (💎 Insights) */}
      {showPaywallModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowPaywallModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">💎</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                답변을 보려면
              </h2>
              <p className="text-gray-600">
                인사이트로 잠금 해제하세요
              </p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 mb-6 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">이 질문 잠금 해제</span>
                <span className="text-lg font-bold text-emerald-600">10 💎</span>
              </div>
              <p className="text-xs text-gray-600">
                현직자 23개 답변 전체 열람 가능
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                10 💎 사용하기
              </button>
              <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                인사이트 구매하기 →
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                현재 보유: <strong className="text-emerald-600">35 💎</strong>
              </p>
              <button
                onClick={() => setShowPaywallModal(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Modal (⭐ Subscription) */}
      {showPremiumModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowPremiumModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                프리미엄으로 업그레이드
              </h2>
              <p className="text-gray-600">
                모든 기능을 무제한으로
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 mb-6 border-2 border-indigo-200">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">질문 검색 무제한</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">회사별 필터링</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">북마크 무제한</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">AI 답변 요약</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm font-medium text-gray-700">매일 +20 💎 추가 지급</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                월 9,900원으로 시작하기
              </button>
              <p className="text-xs text-center text-gray-500">
                언제든지 취소 가능 • 7일 무료 체험
              </p>
            </div>

            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full py-3 text-gray-500 hover:text-gray-700 transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
