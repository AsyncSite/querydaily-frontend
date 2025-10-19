'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPage() {
  const [isPremium] = useState(false); // Toggle this to test premium state
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
      // Fallback for older browsers
      setToastMessage('❌ 복사 실패. 코드를 수동으로 복사해주세요.');
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 pb-24 space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              개
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">개발하는 감자</h2>
              <p className="text-sm text-gray-500">potato@example.com</p>
            </div>
          </div>

          {/* Premium Status or CTA */}
          {isPremium ? (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-bold text-indigo-900">프리미엄 회원</div>
                    <div className="text-xs text-indigo-600">2025.01.20까지</div>
                  </div>
                </div>
                <Link
                  href="/prototype11/shop"
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  관리 →
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/prototype11/shop"
              className="block bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-bold">프리미엄 체험하기</div>
                    <div className="text-sm text-indigo-100">7일 무료 • 매일 +20 💎</div>
                  </div>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </Link>
          )}
        </div>

        {/* Streak History */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">🔥 학습 스트릭</h3>

          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-gray-400 mb-2">0일</div>
            <div className="text-sm text-gray-500">첫 질문을 풀어보세요!</div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
            <p className="text-sm text-gray-700">
              💡 매일 질문을 풀면 스트릭이 쌓여요
            </p>
          </div>
        </div>

        {/* Insights Balance */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">보유 인사이트</div>
              <div className="text-4xl font-bold text-emerald-600">35 💎</div>
            </div>
            <Link
              href="/prototype11/shop"
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
            >
              충전하기
            </Link>
          </div>

          <div className="bg-white/60 rounded-xl p-4 border border-emerald-200">
            <div className="text-sm font-medium text-gray-900 mb-3">
              💡 인사이트 획득 방법
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">✍️ 답변 작성</span>
                <span className="font-bold text-emerald-600">+10 💎</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🎁 친구 초대</span>
                <span className="font-bold text-emerald-600">+50 💎</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🔥 7일 연속 출석</span>
                <span className="font-bold text-emerald-600">+20 💎</span>
              </div>
              {isPremium && (
                <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                  <span className="text-gray-700">⭐ 프리미엄 매일</span>
                  <span className="font-bold text-indigo-600">+20 💎</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-md border-2 border-purple-200">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span>🎁</span>
            <span>친구 초대</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            친구가 가입하면 나도 친구도 각각 50 💎 받아요!
          </p>

          {/* Referral Code */}
          <div className="bg-white rounded-xl p-4 mb-4 border border-purple-200">
            <div className="text-xs text-gray-600 mb-2">내 초대 코드</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600 tracking-wider">
                POTATO2024
              </div>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all"
              >
                복사
              </button>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <div className="text-xs text-gray-600 mb-1">초대한 친구</div>
              <div className="text-xl font-bold text-gray-900">0명</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <div className="text-xs text-gray-600 mb-1">받은 인사이트</div>
              <div className="text-xl font-bold text-emerald-600">0 💎</div>
            </div>
          </div>

          {/* Share Button */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <span>💬</span>
            <span>카카오톡으로 초대하기</span>
          </button>
        </div>

        {/* My Shared Answers */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">✍️ 작성한 답변</h3>

          <div className="py-12 text-center">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-sm text-gray-600 mb-1">아직 작성한 답변이 없습니다</p>
            <p className="text-xs text-gray-400">답변을 작성하면 인사이트를 받을 수 있어요</p>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">⭐ 북마크한 질문</h3>
            {!isPremium && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                프리미엄
              </span>
            )}
          </div>

          {isPremium ? (
            <div className="py-12 text-center">
              <div className="text-5xl mb-3">⭐</div>
              <p className="text-sm text-gray-600 mb-1">아직 북마크한 질문이 없습니다</p>
              <p className="text-xs text-gray-400">질문 상세 페이지에서 ⭐를 눌러 북마크하세요</p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="text-5xl mb-3">🔒</div>
              <p className="text-sm text-gray-700 mb-3">북마크는 프리미엄 전용 기능입니다</p>
              <Link
                href="/prototype11/shop"
                className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
              >
                프리미엄 가입하기
              </Link>
            </div>
          )}
        </div>

        {/* Simple Settings */}
        <div className="space-y-2">
          <button className="w-full py-3 bg-white text-gray-700 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            설정
          </button>
          <button className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors">
            로그아웃
          </button>
        </div>

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
