import Link from 'next/link';

export default function DashboardPage() {
  const categories = [
    { id: 'spring', name: 'Spring', icon: '🌱', count: 123, color: 'from-green-400 to-emerald-500' },
    { id: 'react', name: 'React', icon: '⚛️', count: 89, color: 'from-blue-400 to-cyan-500' },
    { id: 'jpa', name: 'JPA/Hibernate', icon: '💾', count: 67, color: 'from-purple-400 to-pink-500' },
    { id: 'redis', name: 'Redis', icon: '🔴', count: 45, color: 'from-red-400 to-orange-500' },
    { id: 'network', name: '네트워크', icon: '🌐', count: 78, color: 'from-indigo-400 to-blue-500' },
    { id: 'os', name: '운영체제', icon: '💻', count: 56, color: 'from-gray-400 to-slate-500' },
    { id: 'database', name: '데이터베이스', icon: '🗄️', count: 92, color: 'from-teal-400 to-green-500' },
    { id: 'algorithm', name: '알고리즘', icon: '🧮', count: 134, color: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          면접 질문 아카이브
        </h1>
        <p className="text-gray-500">
          실전 기출 문제로 면접 준비하세요
        </p>
      </div>

      {/* Insight Points Banner */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">내 인사이트</div>
            <div className="text-4xl font-bold">230 💎</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-3">
          <div className="text-sm font-medium mb-1">답변 공유로 인사이트 획득</div>
          <div className="text-xs opacity-90">공유한 답변 1개당 +10 💎</div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">👥 내 커뮤니티 활동</h3>
        <div className="grid grid-cols-3 gap-4">
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">다음 레벨까지</span>
            <span className="font-semibold text-gray-900">50 인사이트 필요</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full" style={{ width: '82%' }}></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">684</div>
            <div className="text-sm text-gray-600">전체 질문 수</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
            <div className="text-sm text-gray-600">카테고리</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">무료</div>
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">🔥 인기 질문</h3>
          <Link href="/prototype6/questions/popular" className="text-indigo-600 text-sm font-medium hover:underline">
            전체보기 →
          </Link>
        </div>
        <div className="space-y-3">
          <Link href="/prototype6/questions/1" className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-gray-900 font-medium mb-1">
                  Spring AOP의 동작 원리를 설명하세요
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded">Spring</span>
                  <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">중급</span>
                </div>
              </div>
              <button className="text-yellow-500 text-xl">⭐</button>
            </div>
          </Link>

          <Link href="/prototype6/questions/2" className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-gray-900 font-medium mb-1">
                  JPA N+1 문제와 해결 방법
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded">JPA</span>
                  <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">중급</span>
                </div>
              </div>
              <button className="text-yellow-500 text-xl">⭐</button>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">📂 기술 스택별 질문</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/prototype6/questions?category=${category.id}`}
              className="block"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white hover:shadow-lg transition-all`}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-bold text-lg mb-1">{category.name}</div>
                <div className="text-sm opacity-90">{category.count}개 질문</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>효과적인 활용법</span>
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">1.</span>
            <span>관심 기술 스택의 질문을 모두 북마크하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">2.</span>
            <span>팀 샘플과 <strong>커뮤니티 답변을 엿보며</strong> 다양한 관점을 배우세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">3.</span>
            <span><strong>내 답변을 공유</strong>하면 인사이트를 받을 수 있어요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">4.</span>
            <span>좋은 답변에 좋아요를 눌러주면 작성자에게 큰 동기부여가 됩니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
