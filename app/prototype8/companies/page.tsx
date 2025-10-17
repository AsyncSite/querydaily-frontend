import Link from 'next/link';

export default function CompaniesPage() {
  const companies = [
    {
      slug: 'kakao',
      name: 'Kakao',
      logo: '💛',
      members: 1234,
      posts: 456,
      description: '카카오 개발자 커뮤니티',
      tags: ['Spring', 'Kotlin', 'MSA'],
      trending: true
    },
    {
      slug: 'naver',
      name: 'Naver',
      logo: '💚',
      members: 2341,
      posts: 678,
      description: '네이버 개발자 커뮤니티',
      tags: ['Java', 'Spring', 'Cloud'],
      trending: true
    },
    {
      slug: 'coupang',
      name: 'Coupang',
      logo: '🧡',
      members: 987,
      posts: 234,
      description: '쿠팡 개발자 커뮤니티',
      tags: ['AWS', 'Kubernetes', 'MSA'],
      trending: true
    },
    {
      slug: 'toss',
      name: 'Toss',
      logo: '💙',
      members: 876,
      posts: 345,
      description: '토스 개발자 커뮤니티',
      tags: ['Spring', 'Kotlin', 'DDD'],
      trending: false
    },
    {
      slug: 'line',
      name: 'Line',
      logo: '💚',
      members: 654,
      posts: 189,
      description: '라인 개발자 커뮤니티',
      tags: ['Java', 'Spring', 'Redis'],
      trending: false
    },
    {
      slug: 'baemin',
      name: '배달의민족',
      logo: '🧡',
      members: 543,
      posts: 167,
      description: '배민 개발자 커뮤니티',
      tags: ['Kotlin', 'MSA', 'DDD'],
      trending: false
    },
    {
      slug: 'ncsoft',
      name: 'NCSOFT',
      logo: '🎮',
      members: 432,
      posts: 123,
      description: '엔씨소프트 개발자 커뮤니티',
      tags: ['C++', 'Unity', 'Game'],
      trending: false
    },
    {
      slug: 'samsung',
      name: 'Samsung',
      logo: '📱',
      members: 1876,
      posts: 567,
      description: '삼성전자 개발자 커뮤니티',
      tags: ['Android', 'Java', 'Tizen'],
      trending: false
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">기업 커뮤니티</h1>
        <p className="text-gray-600 text-sm">
          관심 있는 기업의 면접 정보를 확인하세요
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="기업 검색..."
          className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
        />
        <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔥</span>
          <h3 className="font-bold text-gray-900">인기 급상승</h3>
        </div>
        <div className="space-y-3">
          {companies.filter(c => c.trending).map((company) => (
            <Link
              key={company.slug}
              href={`/prototype8/companies/${company.slug}`}
              className="block bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center text-2xl">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{company.name}</div>
                  <div className="text-xs text-gray-500">
                    멤버 {company.members.toLocaleString()} · 게시글 {company.posts}
                  </div>
                </div>
                <span className="text-orange-500">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Companies */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">전체 기업</h3>
        <div className="space-y-3">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/prototype8/companies/${company.slug}`}
              className="block bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{company.name}</div>
                  <div className="text-xs text-gray-600 mb-2">
                    {company.description}
                  </div>
                  <div className="flex gap-2">
                    {company.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    멤버 {company.members.toLocaleString()} · 게시글 {company.posts}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
