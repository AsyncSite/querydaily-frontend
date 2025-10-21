'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShopPage() {
  const [selectedTab, setSelectedTab] = useState<'insights' | 'premium'>('insights');
  const [balance, setBalance] = useState(35); // 시뮬레이션용 잔액
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handlePurchaseInsights = (amount: number, bonus: number, price: number) => {
    const total = amount + bonus;
    setBalance(balance + total);
    showToastMessage(`✅ ${total} 💎 구매 완료!\n현재 보유: ${balance + total} 💎`);
  };

  const handlePremiumSubscribe = () => {
    showToastMessage('✅ 프리미엄 7일 무료 체험이 시작되었습니다!\n매일 +20 💎를 받으세요');
  };

  const insightPackages = [
    {
      id: 'pack_10',
      amount: 10,
      price: 1900,
      bonus: 0,
      popular: false,
    },
    {
      id: 'pack_50',
      amount: 50,
      price: 8900,
      bonus: 5,
      popular: true,
    },
    {
      id: 'pack_100',
      amount: 100,
      price: 15900,
      bonus: 15,
      popular: false,
    },
    {
      id: 'pack_200',
      amount: 200,
      price: 29900,
      bonus: 40,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          상점
        </h1>
        <p className="text-sm text-gray-600">
          인사이트를 충전하거나 프리미엄을 구독하세요
        </p>
      </div>

      {/* Current Balance */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">현재 보유</div>
            <div className="text-4xl font-bold">{balance} 💎</div>
          </div>
          <div className="text-6xl opacity-80">💎</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedTab('insights')}
            className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              selectedTab === 'insights'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            💎 인사이트 충전
          </button>
          <button
            onClick={() => setSelectedTab('premium')}
            className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              selectedTab === 'premium'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⭐ 프리미엄
          </button>
        </div>
      </div>

      {/* Insights Tab */}
      {selectedTab === 'insights' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  인사이트로 질문 잠금 해제
                </h3>
                <p className="text-sm text-gray-700">
                  과거 질문은 질문당 10 💎로 현직자 답변을 전체 열람할 수 있어요
                </p>
              </div>
            </div>
          </div>

          {insightPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl p-6 shadow-md border-2 transition-all hover:shadow-lg ${
                pkg.popular
                  ? 'border-emerald-400'
                  : 'border-gray-200 hover:border-emerald-200'
              } relative`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-full shadow-lg">
                    🔥 인기
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.amount} 💎
                    </span>
                    {pkg.bonus > 0 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                        +{pkg.bonus} 보너스
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    약 {Math.floor(pkg.amount / 10)}개 질문 열람 가능
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {pkg.price.toLocaleString()}원
                  </div>
                  {pkg.bonus > 0 && (
                    <div className="text-xs text-emerald-600 font-medium">
                      {Math.round((pkg.bonus / (pkg.amount + pkg.bonus)) * 100)}% 추가
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handlePurchaseInsights(pkg.amount, pkg.bonus, pkg.price)}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                구매하기
              </button>
            </div>
          ))}

          {/* How to Earn */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mt-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎁</span>
              <span>무료로 인사이트 얻는 법</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                  ✍️
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">답변 작성</div>
                  <div className="text-xs text-gray-600">질문에 답변하면 +10 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  🎁
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">친구 초대</div>
                  <div className="text-xs text-gray-600">친구가 가입하면 +50 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">
                  🔥
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">매일 출석</div>
                  <div className="text-xs text-gray-600">7일 연속 시 보너스 +20 💎</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Tab */}
      {selectedTab === 'premium' && (
        <div className="space-y-6">
          {/* Premium Hero */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold mb-2">
              프리미엄으로 업그레이드
            </h2>
            <p className="text-indigo-100 mb-6">
              모든 기능을 무제한으로 사용하세요
            </p>
            <div className="inline-flex items-baseline gap-2">
              <span className="text-5xl font-bold">9,900원</span>
              <span className="text-xl text-indigo-200">/월</span>
            </div>
          </div>

          {/* Premium Benefits */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">프리미엄 전용 혜택</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔍</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">질문 검색 무제한</div>
                  <p className="text-sm text-gray-600">
                    700+ 질문에서 원하는 것을 자유롭게 검색하세요
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏢</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">회사별 필터링</div>
                  <p className="text-sm text-gray-600">
                    네이버, 라인, 카카오 등 회사별 면접 질문만 모아보기
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⭐</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">북마크 무제한</div>
                  <p className="text-sm text-gray-600">
                    중요한 질문을 무제한으로 저장하고 관리하세요
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">AI 답변 요약</div>
                  <p className="text-sm text-gray-600">
                    여러 답변을 AI가 핵심만 요약해드려요
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💎</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">매일 인사이트 +20</div>
                  <p className="text-sm text-gray-600">
                    매달 600 💎 (59,000원 상당) 자동 충전
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-200">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900">월간 구독</span>
                <span className="text-2xl font-bold text-gray-900">9,900원</span>
              </div>
              <p className="text-sm text-gray-600">
                언제든지 취소 가능 • 첫 7일 무료 체험
              </p>
            </div>

            <button
              onClick={handlePremiumSubscribe}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all mb-3"
            >
              7일 무료로 시작하기
            </button>

            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <p className="text-xs text-indigo-800 text-center">
                💡 프리미엄 + 인사이트 구매로 완벽한 학습 경험을 만드세요
              </p>
            </div>
          </div>

          {/* Premium vs Free Comparison */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-center">프리미엄 vs 무료</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700">오늘의 질문 3개</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-600 font-semibold">✓</span>
                  <span className="text-emerald-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700">질문 검색</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">✗</span>
                  <span className="text-emerald-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700">회사별 필터</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">✗</span>
                  <span className="text-emerald-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700">AI 답변 요약</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">✗</span>
                  <span className="text-emerald-600 font-semibold">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">매일 인사이트</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">+5</span>
                  <span className="text-emerald-600 font-semibold">+20</span>
                </div>
              </div>
            </div>
            <div className="text-right mt-2">
              <span className="text-xs text-gray-500">무료</span>
              <span className="mx-8"></span>
              <span className="text-xs text-indigo-600 font-semibold">프리미엄</span>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl max-w-sm">
            <p className="text-sm font-medium whitespace-pre-line text-center">
              {toastMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
