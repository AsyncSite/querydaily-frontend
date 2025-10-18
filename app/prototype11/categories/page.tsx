import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'spring',
      name: 'Spring',
      icon: '🌱',
      count: 45,
      color: 'from-green-400 to-emerald-500',
      description: 'IoC, AOP, Transaction 등'
    },
    {
      id: 'jpa',
      name: 'JPA/Hibernate',
      icon: '💾',
      count: 32,
      color: 'from-purple-400 to-pink-500',
      description: '영속성, N+1, 성능 최적화'
    },
    {
      id: 'react',
      name: 'React',
      icon: '⚛️',
      count: 38,
      color: 'from-blue-400 to-cyan-500',
      description: 'Hooks, 렌더링, 상태 관리'
    },
    {
      id: 'database',
      name: '데이터베이스',
      icon: '🗄️',
      count: 40,
      color: 'from-teal-400 to-green-500',
      description: '인덱스, 정규화, 트랜잭션'
    },
    {
      id: 'network',
      name: '네트워크',
      icon: '🌐',
      count: 35,
      color: 'from-indigo-400 to-blue-500',
      description: 'HTTP, TCP/IP, REST API'
    },
    {
      id: 'algorithm',
      name: '알고리즘',
      icon: '🧮',
      count: 50,
      color: 'from-yellow-400 to-amber-500',
      description: '시간복잡도, 자료구조, 정렬'
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">카테고리별 질문</h1>
          <p className="text-sm text-gray-500 mt-1">관심있는 분야를 탐색해보세요</p>
        </div>
        <Link href="/prototype11/dashboard" className="text-gray-500">
          ← 홈
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/prototype11/questions?category=${category.id}`}
            className="block"
          >
            <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white hover:shadow-xl transition-all shadow-md`}>
              <div className="text-4xl mb-3">{category.icon}</div>
              <div className="font-bold text-lg mb-1">{category.name}</div>
              <div className="text-sm opacity-90 mb-2">{category.description}</div>
              <div className="text-xs opacity-75">{category.count}개 질문</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-300">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>오늘의 3문제 다 봤나요?</strong><br/>
              카테고리별로 더 많은 질문을 탐색하고, 관심 질문은 북마크해두세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
