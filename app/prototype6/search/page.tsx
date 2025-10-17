import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔍 질문 검색</h1>
        <input
          type="text"
          placeholder="질문, 키워드, 태그로 검색..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">🔥 인기 검색어</h3>
        <div className="flex flex-wrap gap-2">
          {['Spring AOP', 'JPA N+1', '트랜잭션', 'Redis', 'TCP/IP'].map((keyword) => (
            <button
              key={keyword}
              className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
