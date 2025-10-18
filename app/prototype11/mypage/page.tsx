import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              홍
            </div>
            <div>
              <h2 className="font-bold text-gray-900">홍길동</h2>
              <p className="text-sm text-gray-500">hong@example.com</p>
            </div>
          </div>
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

        {/* Insights & Tier */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-300">
          {/* Current Tier */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">🌱</div>
              <div>
                <div className="text-lg font-bold text-gray-900">새싹</div>
                <div className="text-sm text-gray-600">0 / 50 인사이트</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">0 💎</div>
              <div className="text-xs text-gray-500">보유중</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>🌱 새싹</span>
              <span>🔥 기여자 (50)</span>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-4 border border-emerald-200">
            <div className="text-sm font-medium text-gray-900 mb-2">
              티어별 혜택
            </div>
            <div className="text-xs text-gray-600 space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="text-base">🌱</span>
                <div>
                  <div className="font-medium text-gray-700">새싹 (0-49)</div>
                  <div className="text-gray-500">오늘의 3문제 무료</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">🔥</span>
                <div>
                  <div className="font-medium text-gray-700">기여자 (50-149)</div>
                  <div className="text-gray-500">무제한 훔쳐보기 24시간</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">⭐</span>
                <div>
                  <div className="font-medium text-gray-700">전문가 (150+)</div>
                  <div className="text-gray-500">심화 질문 팩 접근</div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-100">
              <div className="text-xs text-emerald-700">
                💡 답변 공유 1개당 +10 💎 획득
              </div>
            </div>
          </div>
        </div>

        {/* My Shared Answers */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">✍️ 공유한 답변</h3>

          <div className="py-12 text-center">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-sm text-gray-600 mb-1">아직 공유한 답변이 없습니다</p>
            <p className="text-xs text-gray-400">답변을 공유하면 인사이트를 받을 수 있어요</p>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">⭐️ 북마크한 질문</h3>

          <div className="py-12 text-center">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-sm text-gray-600 mb-1">아직 북마크한 질문이 없습니다</p>
            <p className="text-xs text-gray-400">질문 상세 페이지에서 ⭐를 눌러 북마크하세요</p>
          </div>
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
    </div>
  );
}
