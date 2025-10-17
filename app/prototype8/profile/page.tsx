import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
            👨‍💻
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">김개발</h2>
            <p className="text-sm opacity-90">백엔드 개발자 지망생</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/30">
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs opacity-80">작성 글</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">145</div>
            <div className="text-xs opacity-80">팔로워</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">89</div>
            <div className="text-xs opacity-80">팔로잉</div>
          </div>
        </div>
      </div>

      {/* Interested Companies */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">🏢 관심 기업</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {['Kakao', 'Naver', 'Coupang', 'Toss'].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2">
                💼
              </div>
              <div className="text-xs text-gray-700 font-medium">{company}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 활동 통계</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
            <div className="text-xs text-gray-600">작성한 글</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">45</div>
            <div className="text-xs text-gray-600">작성한 댓글</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">234</div>
            <div className="text-xs text-gray-600">받은 좋아요</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
            <div className="text-xs text-gray-600">북마크</div>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">✍️ 최근 작성 글</h3>

        <div className="space-y-3">
          {[
            { title: '네이버 면접 후기 공유합니다', company: 'Naver', likes: 23, timeAgo: '1일 전' },
            { title: 'Spring JPA 질문 받으신 분?', company: 'Kakao', likes: 15, timeAgo: '3일 전' },
            { title: '토스 코딩테스트 팁', company: 'Toss', likes: 34, timeAgo: '5일 전' }
          ].map((post, index) => (
            <Link
              key={index}
              href="/prototype8/posts/1"
              className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="font-medium text-gray-900 text-sm">{post.title}</div>
                <span className="text-xs text-gray-500">{post.timeAgo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{post.company}</span>
                <span className="text-xs text-gray-500">❤️ {post.likes}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/prototype8/feed"
          className="block mt-4 w-full py-2.5 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
        >
          전체 보기
        </Link>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💎</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">프리미엄으로 업그레이드</h4>
            <p className="text-sm text-white/90 mb-4">
              PC에서 전문가 피드백과 합격 템플릿을 받아보세요
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              자세히 보기
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <Link
          href="/prototype8/settings"
          className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-900">⚙️ 설정</span>
          <span className="text-gray-400">→</span>
        </Link>
      </div>
    </div>
  );
}
