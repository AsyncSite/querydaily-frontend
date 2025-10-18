import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
          <Link href="/prototype11/dashboard" className="text-gray-500">
            ← 홈
          </Link>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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

          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-orange-500 mb-2">7일</div>
            <div className="text-sm text-gray-500">연속 학습 중 · 최고 기록!</div>
          </div>

          {/* Simple Calendar */}
          <div className="grid grid-cols-7 gap-2">
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-400 pb-1">
                {day}
              </div>
            ))}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-orange-100 flex items-center justify-center"
              >
                <span className="text-orange-500">🔥</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-indigo-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">보유 인사이트</div>
              <div className="text-4xl font-bold text-indigo-600">150 💎</div>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-4 border border-indigo-200">
            <div className="text-sm font-medium text-gray-900 mb-1">
              답변 공유로 인사이트 획득
            </div>
            <div className="text-xs text-gray-600">
              공유한 답변 1개당 +10 💎
            </div>
          </div>
        </div>

        {/* My Shared Answers */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">✍️ 공유한 답변</h3>

          <div className="space-y-3">
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-300">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Spring AOP의 동작 원리를 설명하세요
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>❤️ 12 좋아요</span>
                <span>+10 💎</span>
                <span>2일 전</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-300">
              <div className="text-sm font-medium text-gray-900 mb-2">
                JPA N+1 문제와 해결 방법
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>❤️ 8 좋아요</span>
                <span>+10 💎</span>
                <span>5일 전</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-300">
              <div className="text-sm font-medium text-gray-900 mb-2">
                HTTP와 HTTPS의 차이
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>❤️ 15 좋아요</span>
                <span>+10 💎</span>
                <span>7일 전</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600 text-center">
              총 <strong className="text-indigo-600">15개 답변</strong> 공유 · <strong className="text-indigo-600">150 인사이트</strong> 획득
            </div>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">⭐️ 북마크한 질문</h3>

          <div className="space-y-3">
            <Link href="/prototype11/questions/1" className="block bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-300 hover:border-yellow-400 transition-colors">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Spring AOP의 동작 원리를 설명하세요
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">Spring</span>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">중급</span>
              </div>
            </Link>

            <Link href="/prototype11/questions/2" className="block bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-300 hover:border-yellow-400 transition-colors">
              <div className="text-sm font-medium text-gray-900 mb-2">
                JPA N+1 문제와 해결 방법
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">JPA</span>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">중급</span>
              </div>
            </Link>

            <Link href="/prototype11/questions/3" className="block bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-300 hover:border-yellow-400 transition-colors">
              <div className="text-sm font-medium text-gray-900 mb-2">
                HTTP와 HTTPS의 차이
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">Network</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">초급</span>
              </div>
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600 text-center">
              총 <strong className="text-yellow-600">5개 질문</strong> 북마크
            </div>
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
