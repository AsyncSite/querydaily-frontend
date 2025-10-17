import Link from 'next/link';

export default function CommunityPage() {
  const topAnswers = [
    {
      id: 1,
      question: 'JPA N+1 문제를 해결하는 방법은?',
      author: '김영희',
      score: 97,
      likes: 152,
      expert: '김철수 시니어',
      expertComment: '실무 경험이 녹아있는 탁월한 답변입니다',
    },
    {
      id: 2,
      question: 'Spring Transaction 전파 속성에 대해 설명하세요',
      author: '박민수',
      score: 94,
      likes: 128,
      expert: '이영희 리드',
      expertComment: '개념 정리가 매우 명확합니다',
    },
    {
      id: 3,
      question: 'Redis와 Memcached의 차이점은?',
      author: '최지훈',
      score: 92,
      likes: 98,
      expert: '김철수 시니어',
      expertComment: '장단점 비교가 훌륭합니다',
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          커뮤니티 우수 답변
        </h1>
        <p className="text-gray-500">
          전문가가 선정한 모범 답변을 확인하세요
        </p>
      </div>

      {/* Participation CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          💡 우수 답변에 선정되면?
        </h3>
        <ul className="text-sm text-gray-700 space-y-1 mb-4">
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>+300 인사이트 획득</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>전문가 배지 획득</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <span>프로필에 우수 답변 표시</span>
          </li>
        </ul>
        <Link
          href="/prototype4/answer"
          className="block w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-lg font-medium hover:shadow-lg transition-all"
        >
          오늘의 질문 답변하기
        </Link>
      </div>

      {/* Top Answers */}
      <div className="space-y-4">
        {topAnswers.map((answer, index) => (
          <div
            key={answer.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            {/* Rank Badge */}
            {index === 0 && (
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-sm font-bold rounded-full mb-3">
                👑 이번 주 1위
              </div>
            )}

            {/* Question */}
            <h3 className="font-semibold text-gray-900 mb-3">
              {answer.question}
            </h3>

            {/* Author & Score */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                {answer.author[0]}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{answer.author}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-600 font-semibold">
                    {answer.score}점
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    👍 {answer.likes}명이 도움됨
                  </span>
                </div>
              </div>
            </div>

            {/* Expert Comment */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">💬</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-900 mb-1">
                    {answer.expert} 전문가
                  </div>
                  <div className="text-sm text-gray-700">
                    "{answer.expertComment}"
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href="/prototype4/feedback"
                className="flex-1 py-2 bg-orange-600 text-white text-center rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                답변 보기
              </Link>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                👍 도움됨
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* My Rank */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-gray-900 mb-3">📊 내 순위</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">15위</div>
            <div className="text-sm text-gray-600">이번 주 127명 중</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">평균 85점</div>
            <div className="text-sm text-emerald-600">+7점 상승 ↑</div>
          </div>
        </div>
      </div>
    </div>
  );
}
