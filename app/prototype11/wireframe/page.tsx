'use client';

import Link from 'next/link';

export default function WireframePage() {
  const screens = [
    {
      id: 'onboarding-1',
      title: '온보딩 1/4',
      description: '매일 딱 3문제',
      href: '/prototype11/onboarding',
      emoji: '📝',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'onboarding-2',
      title: '온보딩 2/4',
      description: '답변 후 훔쳐보기',
      emoji: '👀',
      color: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'onboarding-3',
      title: '온보딩 3/4',
      description: '인사이트 적립',
      emoji: '💎',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'kakao-login',
      title: '카카오 로그인',
      description: '3초 만에 시작',
      href: '/prototype11',
      emoji: '💬',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'personalization',
      title: '개인화 설정',
      description: '당신만의 질문 추천',
      href: '/prototype11/personalization',
      emoji: '🎯',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'dashboard',
      title: '대시보드',
      description: '개인화된 3문제',
      href: '/prototype11/dashboard',
      emoji: '🏠',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'question-detail',
      title: '질문 상세',
      description: '현직자 답변 보기',
      href: '/prototype11/questions/1',
      emoji: '📖',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'categories',
      title: '카테고리',
      description: '주제별 탐색',
      href: '/prototype11/categories',
      emoji: '📂',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'mypage',
      title: '마이페이지',
      description: '학습 통계',
      href: '/prototype11/mypage',
      emoji: '👤',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const flows = [
    { from: 0, to: 1, label: '다음' },
    { from: 1, to: 2, label: '다음' },
    { from: 2, to: 3, label: '시작하기' },
    { from: 3, to: 4, label: '로그인 완료' },
    { from: 4, to: 5, label: '설정 완료' },
    { from: 5, to: 6, label: '질문 클릭' },
    { from: 5, to: 7, label: '카테고리 탭' },
    { from: 5, to: 8, label: '프로필 탭' },
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
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">2. 메인 앱 플로우</h2>
            <div className="flex items-start gap-8">
              {/* Dashboard (Central) */}
              <div className="flex flex-col items-center">
                <Link
                  href={screens[5].href || '#'}
                  className="block group"
                >
                  <div className="bg-gray-100 rounded-2xl p-6 w-64 h-96 shadow-lg hover:shadow-xl transition-all border-2 border-emerald-400">
                    <div className={`bg-gradient-to-br ${screens[5].color} rounded-xl p-4 h-48 mb-4 flex flex-col items-center justify-center text-white`}>
                      <div className="text-5xl mb-3">{screens[5].emoji}</div>
                      <div className="text-xs font-semibold text-center">
                        {screens[5].title}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {screens[5].title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {screens[5].description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 text-xs text-emerald-700 font-bold">
                  메인 허브
                </div>
              </div>

              {/* Vertical Arrow */}
              <div className="flex flex-col gap-4 pt-32">
                <div className="flex items-center gap-3">
                  <div className="text-3xl text-gray-400">→</div>
                  <Link
                    href={screens[6].href || '#'}
                    className="block group"
                  >
                    <div className="bg-gray-100 rounded-2xl p-4 w-48 h-72 shadow-lg hover:shadow-xl transition-all border-2 border-gray-300 hover:border-purple-400">
                      <div className={`bg-gradient-to-br ${screens[6].color} rounded-xl p-3 h-32 mb-3 flex flex-col items-center justify-center text-white`}>
                        <div className="text-3xl mb-2">{screens[6].emoji}</div>
                        <div className="text-xs font-semibold text-center">
                          {screens[6].title}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                          {screens[6].title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {screens[6].description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-3xl text-gray-400">→</div>
                  <Link
                    href={screens[7].href || '#'}
                    className="block group"
                  >
                    <div className="bg-gray-100 rounded-2xl p-4 w-48 h-72 shadow-lg hover:shadow-xl transition-all border-2 border-gray-300 hover:border-indigo-400">
                      <div className={`bg-gradient-to-br ${screens[7].color} rounded-xl p-3 h-32 mb-3 flex flex-col items-center justify-center text-white`}>
                        <div className="text-3xl mb-2">{screens[7].emoji}</div>
                        <div className="text-xs font-semibold text-center">
                          {screens[7].title}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                          {screens[7].title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {screens[7].description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-3xl text-gray-400">→</div>
                  <Link
                    href={screens[8].href || '#'}
                    className="block group"
                  >
                    <div className="bg-gray-100 rounded-2xl p-4 w-48 h-72 shadow-lg hover:shadow-xl transition-all border-2 border-gray-300 hover:border-gray-400">
                      <div className={`bg-gradient-to-br ${screens[8].color} rounded-xl p-3 h-32 mb-3 flex flex-col items-center justify-center text-white`}>
                        <div className="text-3xl mb-2">{screens[8].emoji}</div>
                        <div className="text-xs font-semibold text-center">
                          {screens[8].title}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                          {screens[8].title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {screens[8].description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">범례</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span className="text-gray-700">온보딩/메인 플로우</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-700">질문 관련</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded"></div>
              <span className="text-gray-700">탐색/카테고리</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-gray-700">프로필/설정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
