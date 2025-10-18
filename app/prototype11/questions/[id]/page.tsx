'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [myAnswer, setMyAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [shared, setShared] = useState(false);
  const [likedAnswers, setLikedAnswers] = useState<number[]>([]);

  const question = {
    id: params.id,
    number: 1,
    total: 3,
    title: 'Spring AOP의 동작 원리를 설명하세요',
    description: 'Spring AOP가 프록시 패턴을 기반으로 어떻게 동작하는지, 위빙 시점은 언제인지 설명해주세요.',
    category: 'Spring',
    difficulty: '중급',
    hint: '💡 JDK Dynamic Proxy와 CGLIB의 차이를 생각해보세요. 같은 클래스 내부 호출 시 주의점도 있습니다.'
  };

  const othersAnswers = [
    {
      id: 1,
      author: {
        name: '라인 백엔드',
        badge: '재직',
        company: 'LINE'
      },
      content: 'Spring AOP는 프록시 패턴으로 동작합니다. 인터페이스가 있으면 JDK Dynamic Proxy, 없으면 CGLIB를 사용해요.\n\n런타임에 위빙이 이루어지며, @Aspect로 정의한 Advice가 조인포인트에서 실행됩니다.\n\n주의할 점은 같은 클래스 내부 메서드 호출 시 프록시를 거치지 않아 AOP가 동작하지 않는다는 거예요.',
      likes: 127,
      timeAgo: '2시간 전'
    },
    {
      id: 2,
      author: {
        name: '네이버 합격',
        badge: '합격자',
        company: 'Naver'
      },
      content: '면접에서 실제로 "같은 클래스 내부 호출 시 왜 AOP가 안 되는지" 물어봤어요.\n\n프록시를 거치지 않기 때문이라고 답했고, 이 경우 self-injection이나 리팩토링으로 해결할 수 있다고 추가 설명했습니다!',
      likes: 89,
      timeAgo: '1일 전'
    }
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleShare = () => {
    setShared(true);
  };

  const toggleLike = (answerId: number) => {
    setLikedAnswers(prev =>
      prev.includes(answerId)
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };

  const handleNext = () => {
    router.push('/prototype11/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/prototype11/dashboard" className="text-gray-500">
            ← 뒤로
          </Link>
          <span className="text-sm font-medium text-gray-500">
            {question.number}/3
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
              {question.category}
            </span>
            <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
              {question.difficulty}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {question.title}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {question.description}
          </p>

          {/* Hint */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {question.hint}
            </p>
          </div>
        </div>

        {/* My Answer */}
        {!submitted && (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <label className="block mb-3">
                <span className="font-semibold text-gray-900">내 답변</span>
                <span className="text-sm text-gray-400 ml-2">(선택)</span>
              </label>
              <textarea
                value={myAnswer}
                onChange={(e) => setMyAnswer(e.target.value)}
                placeholder="자유롭게 작성해보세요. 작성 안 해도 다른 사람 답변은 볼 수 있어요."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                rows={8}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              제출하고 다른 사람들 보기 👀
            </button>
          </>
        )}

        {/* Others' Answers - After Submit */}
        {submitted && (
          <>
            {/* Peek Header */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-300">
              <div className="flex items-start gap-3">
                <span className="text-3xl">👀</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    다른 개발자들은 어떻게 답했을까요?
                  </h3>
                  <p className="text-sm text-gray-600">
                    현직자와 합격자의 실제 답변입니다
                  </p>
                </div>
              </div>
            </div>

            {/* Answers */}
            <div className="space-y-4">
              {othersAnswers.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {answer.author.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm">
                          {answer.author.name}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          answer.author.badge === '재직'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {answer.author.badge}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{answer.timeAgo}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                    {answer.content}
                  </p>

                  <button
                    onClick={() => toggleLike(answer.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      likedAnswers.includes(answer.id)
                        ? 'text-pink-600 font-medium'
                        : 'text-gray-400 hover:text-pink-600'
                    }`}
                  >
                    <span className="text-lg">
                      {likedAnswers.includes(answer.id) ? '❤️' : '🤍'}
                    </span>
                    <span>
                      {answer.likes + (likedAnswers.includes(answer.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* Share My Answer */}
            {myAnswer.trim() && !shared && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-300">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">✍️</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      내 답변도 공유하시겠어요?
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      공유하면 <strong className="text-emerald-700">+10 인사이트 💎</strong>
                    </div>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                    >
                      공유하기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {shared && (
              <div className="bg-emerald-100 rounded-2xl p-5 shadow-sm border border-emerald-400 text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="font-semibold text-gray-900 mb-1">
                  공유 완료!
                </div>
                <div className="text-sm text-emerald-700">
                  +10 인사이트를 받았어요 💎
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              다음 질문으로 →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
