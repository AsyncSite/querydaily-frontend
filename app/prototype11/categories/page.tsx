import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'spring',
      name: 'Spring',
      icon: '🌱',
      count: 45,
      description: 'IoC, AOP, Transaction 등'
    },
    {
      id: 'jpa',
      name: 'JPA/Hibernate',
      icon: '💾',
      count: 32,
      description: '영속성, N+1, 성능 최적화'
    },
    {
      id: 'react',
      name: 'React',
      icon: '⚛️',
      count: 38,
      description: 'Hooks, 렌더링, 상태 관리'
    },
    {
      id: 'database',
      name: '데이터베이스',
      icon: '🗄️',
      count: 40,
      description: '인덱스, 정규화, 트랜잭션'
    },
    {
      id: 'network',
      name: '네트워크',
      icon: '🌐',
      count: 35,
      description: 'HTTP, TCP/IP, REST API'
    },
    {
      id: 'algorithm',
      name: '알고리즘',
      icon: '🧮',
      count: 50,
      description: '시간복잡도, 자료구조, 정렬'
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">카테고리별 질문</h1>
        <p className="text-sm text-gray-500 mt-1">관심있는 분야를 탐색해보세요</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/prototype11/questions?category=${category.id}`}
            className="block group"
          >
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md">
              <div className="text-4xl mb-3">{category.icon}</div>
              <div className="font-bold text-lg mb-1 text-gray-900">{category.name}</div>
              <div className="text-sm text-gray-600 mb-2">{category.description}</div>
              <div className="text-xs text-emerald-600 font-medium">{category.count}개 질문</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-200">
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
