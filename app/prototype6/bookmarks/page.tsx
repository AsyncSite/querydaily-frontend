import Link from 'next/link';

export default function BookmarksPage() {
  const bookmarks = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      category: 'Spring',
      difficulty: '중급',
      folder: '면접 필수',
    },
    {
      id: 3,
      title: 'Spring Bean의 생명주기에 대해 설명하세요',
      category: 'Spring',
      difficulty: '초급',
      folder: '면접 필수',
    },
    {
      id: 7,
      title: 'TCP와 UDP의 차이점',
      category: '네트워크',
      difficulty: '초급',
      folder: 'CS 기초',
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          📚 북마크
        </h1>
        <p className="text-gray-500">저장한 질문 {bookmarks.length}개</p>
      </div>

      {/* Folders */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium whitespace-nowrap">
          전체 ({bookmarks.length})
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          면접 필수 (2)
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          CS 기초 (1)
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          + 폴더 추가
        </button>
      </div>

      {/* Empty State if needed */}
      {bookmarks.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-lg font-medium text-gray-900 mb-2">
            아직 북마크한 질문이 없어요
          </div>
          <p className="text-gray-500 mb-6">
            질문 옆의 ⭐ 버튼을 눌러 저장하세요
          </p>
          <Link
            href="/prototype6/dashboard"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            질문 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((question) => (
            <Link
              key={question.id}
              href={`/prototype6/questions/${question.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-2">{question.folder}</div>
                  <h3 className="text-gray-900 font-medium mb-2">
                    {question.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                      {question.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        question.difficulty === '초급'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                </div>
                <button className="text-2xl text-yellow-500">⭐</button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-3">💡 북마크 활용 팁</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>폴더로 정리해서 체계적으로 관리하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>면접 전날 북마크 전체 복습 추천</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
