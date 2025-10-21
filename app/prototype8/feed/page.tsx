import Link from 'next/link';

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      author: {
        name: '카카오 합격자',
        company: 'Kakao',
        avatar: '👨‍💻',
        followers: 245
      },
      company: 'Kakao',
      title: '카카오 백엔드 2차 면접 후기',
      preview: '오늘 2차 면접 봤습니다. Spring WebFlux 관련 질문이 많이 나왔어요. 특히 Reactive Programming의 장단점에 대해...',
      tags: ['Spring', 'WebFlux', '백엔드'],
      likes: 127,
      comments: 23,
      timeAgo: '1시간 전',
      trending: true
    },
    {
      id: 2,
      author: {
        name: '네이버 준비중',
        company: null,
        avatar: '👩‍💻',
        followers: 89
      },
      company: 'Naver',
      title: '네이버 기술면접 준비 어떻게 하셨나요?',
      preview: '다음주에 네이버 기술면접이 있는데요, 어떤 부분을 중점적으로 준비하면 좋을까요? 경험 공유 부탁드립니다!',
      tags: ['네이버', '기술면접'],
      likes: 45,
      comments: 18,
      timeAgo: '3시간 전',
      trending: false
    },
    {
      id: 3,
      author: {
        name: '쿠팡 재직자',
        company: 'Coupang',
        avatar: '🧑‍💻',
        followers: 512
      },
      company: 'Coupang',
      title: '쿠팡 면접 꿀팁 공유합니다',
      preview: '쿠팡 입사 3년차입니다. 면접 때 가장 중요하게 보는 건 문제 해결 능력이에요. 시스템 디자인 질문이...',
      tags: ['쿠팡', '시스템디자인', '꿀팁'],
      likes: 289,
      comments: 56,
      timeAgo: '5시간 전',
      trending: true
    },
    {
      id: 4,
      author: {
        name: '토스 합격',
        company: 'Toss',
        avatar: '👨‍💼',
        followers: 178
      },
      company: 'Toss',
      title: 'JPA N+1 문제 질문 받았어요',
      preview: '토스 면접에서 JPA N+1 문제 해결 방법에 대해 질문받았습니다. Fetch Join vs EntityGraph vs Batch Size...',
      tags: ['JPA', 'N+1', '토스'],
      likes: 156,
      comments: 34,
      timeAgo: '1일 전',
      trending: false
    }
  ];

  return (
    <div className="space-y-0">
      {/* Trending Companies */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔥</span>
          <span className="font-semibold text-gray-900">인기 기업</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Kakao', 'Naver', 'Coupang', 'Toss', 'Line', 'Baemin'].map((company) => (
            <Link
              key={company}
              href={`/prototype8/companies/${company.toLowerCase()}`}
              className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium whitespace-nowrap hover:from-orange-200 hover:to-red-200 transition-colors"
            >
              {company}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <Link key={post.id} href={`/prototype8/posts/${post.id}`}>
            <div className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-xl">
                  {post.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {post.author.name}
                    </span>
                    {post.author.company && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        재직
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    팔로워 {post.author.followers} · {post.timeAgo}
                  </div>
                </div>
                {post.trending && (
                  <span className="text-orange-500 text-lg">🔥</span>
                )}
              </div>

              {/* Company Tag */}
              <div className="mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {post.company}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                {post.preview}
              </p>

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Write Button */}
      <div className="fixed bottom-20 right-6">
        <button className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-all">
          ✏️
        </button>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💎</span>
          <div className="flex-1">
            <div className="font-bold mb-1">더 깊은 인사이트가 필요하신가요?</div>
            <div className="text-sm text-white/90">
              PC에서 전문가 피드백과 합격 템플릿을 확인하세요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
