'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LearnQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wantsToShare, setWantsToShare] = useState(false);
  const [likedAnswers, setLikedAnswers] = useState<number[]>([]);

  const question = {
    id: params.id,
    title: 'Spring AOP 동작 원리',
    description: 'Spring AOP의 프록시 기반 동작 원리와 위빙 시점에 대해 설명해주세요.',
    difficulty: '중급',
    category: 'Spring',
    hint: '프록시 패턴과 JDK Dynamic Proxy, CGLIB의 차이점을 생각해보세요.',
    keyPoints: [
      '프록시 패턴 기반',
      'JDK Dynamic Proxy vs CGLIB',
      '위빙 시점 (컴파일타임, 로드타임, 런타임)',
      '@Aspect와 Advice 타입'
    ]
  };

  const communityAnswers = [
    {
      id: 1,
      author: {
        name: '라인 백엔드',
        avatar: '👨‍💻',
        badge: '재직',
        company: 'LINE'
      },
      content: `Spring AOP는 **프록시 패턴** 기반으로 동작합니다.

인터페이스가 있으면 JDK Dynamic Proxy, 없으면 CGLIB를 사용해요.

런타임에 위빙이 이루어지며, @Aspect로 정의한 Advice가 조인포인트에서 실행됩니다.`,
      likes: 89,
      timeAgo: '1일 전'
    },
    {
      id: 2,
      author: {
        name: '네이버 합격',
        avatar: '🎓',
        badge: '합격자',
        company: 'Naver'
      },
      content: `면접에서는 **"같은 클래스 내부 호출 시 AOP가 동작하지 않는 이유"**를 물어봤어요.

프록시를 거치지 않기 때문이라고 답했습니다!`,
      likes: 67,
      timeAgo: '3일 전'
    }
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    // Scroll to peek section
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleNext = () => {
    router.push('/prototype7/dashboard');
  };

  const toggleLike = (answerId: number) => {
    setLikedAnswers(prev =>
      prev.includes(answerId)
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <Link href="/prototype7/dashboard" className="text-gray-500">
          ← 뒤로
        </Link>
        <div className="text-sm text-gray-500">Day 7 - Question 3/3</div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
            {question.category}
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {question.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* Key Points */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">💡 체크 포인트</h3>
        <ul className="space-y-2">
          {question.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hint Section */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="text-yellow-700 font-medium text-sm"
          >
            💡 힌트 보기
          </button>
        ) : (
          <div>
            <div className="font-semibold text-gray-900 mb-2">💡 힌트</div>
            <p className="text-sm text-gray-700">{question.hint}</p>
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block mb-3">
          <span className="font-semibold text-gray-900">내 답변 작성</span>
          <span className="text-sm text-gray-500 ml-2">(선택사항)</span>
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 자유롭게 작성해보세요. 작성하지 않고 넘어가도 괜찮습니다."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
          rows={8}
        />
        <div className="text-xs text-gray-400 mt-2">
          💾 자동 저장됩니다. 나중에 복습할 때 다시 볼 수 있어요.
        </div>
      </div>

      {!submitted ? (
        <>
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
            >
              답변 제출하고 다른 사람들 보기 👀
            </button>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gray-100 text-gray-600 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              건너뛰기
            </button>
          </div>

          {/* Encouragement */}
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-medium text-gray-900 mb-1">오늘 마지막 질문이에요!</div>
            <div className="text-sm text-gray-600">
              완료하면 7일 연속 학습 달성! 🔥
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Peek Section - Core Value */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">👀</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  다른 개발자들은 어떻게 답했을까요?
                </h3>
                <p className="text-sm text-gray-600">
                  실제 합격자와 현직 개발자들의 답변을 엿보며 성장의 자극을 받아보세요
                </p>
              </div>
            </div>
          </div>

          {/* Community Answers */}
          <div className="space-y-4">
            {communityAnswers.map((answer) => (
              <div
                key={answer.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{answer.author.avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
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
                </div>

                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                  {answer.content}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleLike(answer.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      likedAnswers.includes(answer.id)
                        ? 'text-pink-600 font-medium'
                        : 'text-gray-500 hover:text-pink-600'
                    }`}
                  >
                    <span>{likedAnswers.includes(answer.id) ? '❤️' : '🤍'}</span>
                    <span>{answer.likes + (likedAnswers.includes(answer.id) ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Answer */}
          {answer.trim() && !wantsToShare && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">✍️</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    내 답변도 커뮤니티에 공유하시겠어요?
                  </div>
                  <div className="text-sm text-emerald-700 mb-3">
                    공유하면 <strong>+10 인사이트 💎</strong> 를 받고, PC 상품 구매 시 할인받을 수 있어요
                  </div>
                  <button
                    onClick={() => setWantsToShare(true)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    공유하고 인사이트 받기
                  </button>
                </div>
              </div>
            </div>
          )}

          {wantsToShare && (
            <div className="bg-emerald-100 rounded-2xl p-6 border border-emerald-300 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold text-gray-900 mb-1">
                답변이 공유되었습니다!
              </div>
              <div className="text-sm text-emerald-700">
                +10 인사이트 💎 를 받았어요
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
          >
            다음 질문으로 →
          </button>
        </>
      )}
    </div>
  );
}
