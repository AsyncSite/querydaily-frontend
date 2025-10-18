import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            홍
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">준비중</span>
            </div>
            <p className="text-gray-600 text-sm">hong@example.com</p>
          </div>
        </div>

        {/* Insight Points Summary */}
        <div className="bg-white/60 rounded-xl p-4 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-600 mb-1">보유 인사이트</div>
              <div className="text-2xl font-bold text-emerald-600">230 💎</div>
            </div>
            <Link
              href="/products"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
            >
              PC 할인받기
            </Link>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>👥</span>
          <span>커뮤니티 영향력</span>
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">5</div>
            <div className="text-xs text-gray-600">공유한 답변</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600 mb-1">23</div>
            <div className="text-xs text-gray-600">받은 좋아요</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">7</div>
            <div className="text-xs text-gray-600">받은 댓글</div>
          </div>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-700 font-medium">레벨 2: 기여자</span>
            <span className="text-purple-600 font-semibold">82%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style={{ width: '82%' }}></div>
          </div>
          <div className="text-xs text-gray-600 mt-2">
            다음 레벨까지 50 인사이트 필요 (레벨 3: 멘토)
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">45</div>
          <div className="text-sm text-gray-500">조회한 질문</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
          <div className="text-sm text-gray-500">북마크</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-1">8</div>
          <div className="text-sm text-gray-500">내 메모</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">5</div>
          <div className="text-sm text-gray-500">카테고리</div>
        </div>
      </div>

      {/* Learning Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 학습 분석</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Spring</span>
              <span className="text-sm font-medium text-indigo-600">18개</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">네트워크</span>
              <span className="text-sm font-medium text-blue-600">12개</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">JPA</span>
              <span className="text-sm font-medium text-purple-600">9개</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shared Answers */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">✍️ 최근 공유한 답변</h3>
          <Link href="/prototype6/my-answers" className="text-indigo-600 text-sm hover:underline">
            전체보기 →
          </Link>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <Link href="/prototype6/questions/1" className="text-sm font-medium text-gray-900 mb-2 block hover:text-indigo-600">
              Spring AOP의 동작 원리를 설명하세요
            </Link>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>❤️ 8 좋아요</span>
              <span>💬 2 댓글</span>
              <span>+10 💎</span>
              <span className="text-gray-400">2일 전</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <Link href="/prototype6/questions/2" className="text-sm font-medium text-gray-900 mb-2 block hover:text-indigo-600">
              JPA N+1 문제와 해결 방법
            </Link>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>❤️ 15 좋아요</span>
              <span>💬 5 댓글</span>
              <span>+10 💎</span>
              <span className="text-gray-400">5일 전</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <Link
          href="/prototype6/bookmarks"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span className="text-gray-900 font-medium">내 북마크</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>

        <Link
          href="/prototype6/settings"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <span className="text-gray-900 font-medium">설정</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
