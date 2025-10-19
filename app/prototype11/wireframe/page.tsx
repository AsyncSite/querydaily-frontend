'use client';

import Link from 'next/link';

export default function WireframePage() {
  const screens = [
    // Onboarding flow
    { id: 'onb1', title: '온보딩 1/3', emoji: '📝', href: '/prototype11/onboarding', color: 'from-emerald-400 to-emerald-600', description: '가치 제안', section: 'onboarding' },
    { id: 'onb2', title: '온보딩 2/3', emoji: '👀', href: '#', color: 'from-teal-400 to-teal-600', description: '기능 소개', section: 'onboarding' },
    { id: 'onb3', title: '온보딩 3/3', emoji: '💎', href: '#', color: 'from-emerald-400 to-emerald-600', description: '인사이트 안내', section: 'onboarding' },
    { id: 'kakao', title: '카카오 로그인', emoji: '💬', href: '/prototype11', color: 'from-yellow-400 to-yellow-600', description: '소셜 로그인', section: 'onboarding' },
    { id: 'perso', title: '개인화 설정', emoji: '🎯', href: '/prototype11/personalization', color: 'from-indigo-400 to-indigo-600', description: '관심 주제 선택', section: 'onboarding' },

    // Main app
    { id: 'dash', title: '대시보드', emoji: '🏠', href: '/prototype11/dashboard', color: 'from-emerald-400 to-emerald-600', description: '오늘의 카드 스택', section: 'main' },
    { id: 'quest', title: '질문 상세', emoji: '📖', href: '/prototype11/questions/1', color: 'from-purple-400 to-purple-600', description: '답변 열람', section: 'main' },
    { id: 'cat', title: '카테고리', emoji: '📂', href: '/prototype11/categories', color: 'from-indigo-400 to-indigo-600', description: '탐색 & 전환', section: 'main' },
    { id: 'arch', title: '아카이브', emoji: '📚', href: '/prototype11/archive', color: 'from-blue-400 to-blue-600', description: '지난 질문 복습', section: 'main' },
    { id: 'shop', title: '상점', emoji: '💎', href: '/prototype11/shop', color: 'from-orange-400 to-amber-600', description: '인사이트 & 프리미엄', section: 'main' },
    { id: 'mypage', title: '마이페이지', emoji: '👤', href: '/prototype11/mypage', color: 'from-gray-400 to-gray-600', description: '프로필 & 설정', section: 'main' },
  ];

  const flows = [
    { label: '시작' },
    { label: '기능 소개' },
    { label: '인사이트 소개' },
    { label: '로그인' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            href="/prototype11"
            className="inline-block mb-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← 메인으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            쿼리데일리 와이어프레임
          </h1>
          <p className="text-gray-600">
            사용자 플로우를 한눈에 확인하세요
          </p>
        </div>

        {/* Flow Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 overflow-x-auto">
          <div style={{ minWidth: '1600px' }}>
          {/* Onboarding Flow */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. 온보딩 플로우</h2>
            <div className="flex items-center gap-8">
              {screens.slice(0, 5).map((screen, index) => (
                <div key={screen.id} className="flex items-center gap-8">
                  {/* Screen Card */}
                  <Link
                    href={screen.href || '#'}
                    className="block group"
                  >
                    <div className="bg-gray-100 rounded-2xl p-6 w-64 h-96 shadow-lg hover:shadow-xl transition-all border-2 border-gray-300 hover:border-emerald-400">
                      {/* Mini Screen Preview */}
                      <div className={`bg-gradient-to-br ${screen.color} rounded-xl p-4 h-48 mb-4 flex flex-col items-center justify-center text-white`}>
                        <div className="text-5xl mb-3">{screen.emoji}</div>
                        <div className="text-xs font-semibold text-center">
                          {screen.title}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 mb-2">
                          {screen.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {screen.description}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Arrow */}
                  {index < 4 && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-3xl text-gray-400">→</div>
                      <div className="text-xs text-gray-500 font-medium">
                        {flows[index]?.label}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main App Flow */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">2. 메인 앱 플로우</h2>
            <div className="flex items-start gap-8 justify-center">
              {/* Dashboard (Central Hub) */}
              <div className="flex flex-col items-center">
                <Link href={screens[5].href || '#'} className="block group">
                  <div className="bg-gray-100 rounded-2xl p-6 w-72 h-[420px] shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-500">
                    <div className={`bg-gradient-to-br ${screens[5].color} rounded-xl p-4 h-56 mb-4 flex flex-col items-center justify-center text-white`}>
                      <div className="text-6xl mb-3">{screens[5].emoji}</div>
                      <div className="text-sm font-bold text-center">
                        {screens[5].title}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">
                        {screens[5].title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {screens[5].description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
                  🎯 메인 허브
                </div>
              </div>

              {/* Side Screens - Split into two columns */}
              <div className="flex gap-8">
                {/* Left column: Main features */}
                <div className="flex flex-col gap-6 pt-20">
                  {[6, 7, 8].map((idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="text-4xl text-gray-400">→</div>
                      <Link href={screens[idx].href || '#'} className="block group">
                        <div className="bg-gray-100 rounded-2xl p-5 w-56 h-80 shadow-lg hover:shadow-xl transition-all border-2 border-gray-300 hover:border-indigo-400">
                          <div className={`bg-gradient-to-br ${screens[idx].color} rounded-xl p-3 h-40 mb-3 flex flex-col items-center justify-center text-white`}>
                            <div className="text-4xl mb-2">{screens[idx].emoji}</div>
                            <div className="text-xs font-semibold text-center">
                              {screens[idx].title}
                            </div>
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-gray-900 text-base mb-1">
                              {screens[idx].title}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {screens[idx].description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Right column: Shop & MyPage */}
                <div className="flex flex-col gap-6 pt-20">
                  {[9, 10].map((idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="text-4xl text-gray-400">→</div>
                      <Link href={screens[idx].href || '#'} className="block group">
                        <div className={`bg-gray-100 rounded-2xl p-5 w-56 h-80 shadow-lg hover:shadow-xl transition-all border-2 ${
                          screens[idx].id === 'shop'
                            ? 'border-orange-400'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <div className={`bg-gradient-to-br ${screens[idx].color} rounded-xl p-3 h-40 mb-3 flex flex-col items-center justify-center text-white`}>
                            <div className="text-4xl mb-2">{screens[idx].emoji}</div>
                            <div className="text-xs font-semibold text-center">
                              {screens[idx].title}
                            </div>
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-gray-900 text-base mb-1">
                              {screens[idx].title}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {screens[idx].description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Flows */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">3. 전환 플로우 (Modals)</h2>
            <div className="grid grid-cols-3 gap-6">
              {/* Share Modal */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">🎁</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">공유 모달</h3>
                  <p className="text-sm text-gray-600 mb-4">친구 초대 & 바이럴</p>
                </div>
                <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">카카오톡 공유</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">링크 복사</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">+5 💎 리워드</span>
                  </div>
                </div>
              </div>

              {/* Paywall Modal */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">💎</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">페이월 (인사이트)</h3>
                  <p className="text-sm text-gray-600 mb-4">Pay-as-you-go</p>
                </div>
                <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span>
                    <span className="text-gray-700">질문당 10 💎</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span>
                    <span className="text-gray-700">답변 전체 열람</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span>
                    <span className="text-gray-700">인사이트 구매</span>
                  </div>
                </div>
              </div>

              {/* Premium Modal */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">⭐</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">프리미엄</h3>
                  <p className="text-sm text-gray-600 mb-4">월 9,900원</p>
                </div>
                <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-gray-700">질문 검색</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-gray-700">회사별 필터</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-gray-700">매일 +20 💎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* States */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">4. 상태 변화</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Completion State */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">완료 상태</h3>
                  <p className="text-sm text-gray-600">오늘 3개 완료!</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-700 text-center">
                    대시보드 → 완료 축하 → 복습 추천 카드
                  </p>
                </div>
              </div>

              {/* Review Recommendation */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">💡</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">복습 추천</h3>
                  <p className="text-sm text-gray-600">지난 질문 다시보기</p>
                </div>
                <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-gray-700">랜덤 과거 질문</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-gray-700">답변 작성 +10 💎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span>💡</span>
            <span>핵심 인사이트</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-emerald-400 mb-3">사용자 플로우</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                온보딩 → 대시보드 (카드 스택) → 질문 상세 → 아카이브 복습 사이클
              </p>
            </div>
            <div>
              <h4 className="font-bold text-orange-400 mb-3">수익화 전략</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                상점 탭 (인사이트 충전 + 프리미엄 구독) + 카테고리 탭 전환 유도
              </p>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 mb-3">리텐션 메커니즘</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                매일 3개 카드 → 완료 시 복습 추천 → 공유 인센티브 (+5 💎)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
