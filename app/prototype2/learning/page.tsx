export default function LearningPage() {
  const questions = [
    {
      id: 1,
      question: 'JPA N+1 문제를 해결하는 방법은?',
      tags: ['JPA', 'Performance'],
      answered: true,
      date: '2025.01.15',
    },
    {
      id: 2,
      question: 'Spring Transaction의 전파 속성에 대해 설명하세요',
      tags: ['Spring', 'Transaction'],
      answered: true,
      date: '2025.01.14',
    },
    {
      id: 3,
      question: 'Redis와 Memcached의 차이점은?',
      tags: ['Redis', 'Cache'],
      answered: false,
      date: '2025.01.13',
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">학습 기록</h1>
        <p className="text-gray-500">총 23개 질문에 답변했습니다</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-100">
        <button className="px-4 py-2 text-indigo-600 border-b-2 border-indigo-600 font-medium">
          전체
        </button>
        <button className="px-4 py-2 text-gray-500">완료</button>
        <button className="px-4 py-2 text-gray-500">미완료</button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-900 flex-1 leading-relaxed">{q.question}</p>
              {q.answered && (
                <span className="ml-3 px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded font-medium">
                  완료
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {q.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400">{q.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-indigo-50 rounded-xl p-5">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">92%</div>
            <div className="text-sm text-gray-600">평균 정답률</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">14일</div>
            <div className="text-sm text-gray-600">최장 연속</div>
          </div>
        </div>
      </div>
    </div>
  );
}
