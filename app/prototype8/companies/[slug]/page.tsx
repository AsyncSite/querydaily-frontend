import Link from 'next/link';

export default function CompanyDetailPage({ params }: { params: { slug: string } }) {
  const company = {
    slug: params.slug,
    name: 'Kakao',
    logo: '💛',
    members: 1234,
    posts: 456,
    description: '카카오 개발자들의 면접 경험과 인사이트를 공유하는 커뮤니티입니다.',
    tags: ['Spring', 'Kotlin', 'MSA', 'Redis'],
    coverColor: 'from-yellow-400 to-orange-400'
  };

  const recentPosts = [
    {
      id: 1,
      author: '카카오 합격자',
      avatar: '👨‍💻',
      title: '카카오 백엔드 2차 면접 후기',
      preview: 'Spring WebFlux 관련 질문이 많이 나왔어요...',
      likes: 127,
      comments: 23,
      timeAgo: '1시간 전'
    },
    {
      id: 2,
      author: '카카오 재직 3년차',
      avatar: '👩‍💻',
      title: '카카오 기술 면접 준비 가이드',
      preview: '실제 면접에서 나온 질문들을 정리했습니다...',
      likes: 234,
      comments: 45,
      timeAgo: '1일 전'
    },
    {
      id: 3,
      author: '면접 준비중',
      avatar: '🧑‍💻',
      title: 'Kotlin 코루틴 질문 받으신 분?',
      preview: '다음주 면접인데 코루틴 공부중입니다...',
      likes: 56,
      comments: 12,
      timeAgo: '2일 전'
    }
  ];

  const topContributors = [
    { name: '카카오 시니어', avatar: '👨‍💻', posts: 23, followers: 456 },
    { name: '카카오 합격', avatar: '👩‍💻', posts: 18, followers: 234 },
    { name: '카카오 준비중', avatar: '🧑‍💻', posts: 15, followers: 178 }
  ];

  return (
    <div className="space-y-0">
      {/* Cover */}
      <div className={`bg-gradient-to-r ${company.coverColor} px-6 py-8 text-white`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl">
            {company.logo}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{company.name}</h1>
            <p className="text-sm opacity-90">{company.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm mb-4">
          <div>
            <span className="font-bold">{company.members.toLocaleString()}</span>
            <span className="opacity-80 ml-1">멤버</span>
          </div>
          <div>
            <span className="font-bold">{company.posts}</span>
            <span className="opacity-80 ml-1">게시글</span>
          </div>
        </div>

        <button className="w-full py-2.5 bg-white text-yellow-600 rounded-xl font-medium hover:bg-yellow-50 transition-colors">
          + 팔로우
        </button>
      </div>

      {/* Tags */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {company.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900 mb-3">🏆 활발한 멤버</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {topContributors.map((contributor, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gray-50 rounded-xl p-3 border border-gray-200 w-32"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                {contributor.avatar}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {contributor.name}
                </div>
                <div className="text-xs text-gray-500">
                  게시글 {contributor.posts}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="divide-y divide-gray-200">
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">최근 게시글</h3>
        </div>
        {recentPosts.map((post) => (
          <Link key={post.id} href={`/prototype8/posts/${post.id}`}>
            <div className="bg-white px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {post.author}
                  </div>
                  <div className="text-xs text-gray-500">{post.timeAgo}</div>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 mb-2">{post.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.preview}
              </p>

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
    </div>
  );
}
