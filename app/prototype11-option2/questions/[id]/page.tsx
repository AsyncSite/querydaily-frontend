'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [myAnswer, setMyAnswer] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [shared, setShared] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [likedAnswers, setLikedAnswers] = useState<number[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');

  const currentId = parseInt(params.id);

  const question = {
    id: params.id,
    number: currentId,
    total: 3,
    title: currentId === 1 ? 'Spring AOP의 동작 원리를 설명하세요'
           : currentId === 2 ? 'JPA N+1 문제와 해결 방법'
           : 'HTTP와 HTTPS의 차이',
    description: currentId === 1 ? 'Spring AOP가 프록시 패턴을 기반으로 어떻게 동작하는지, 위빙 시점은 언제인지 설명해주세요.'
                 : currentId === 2 ? 'N+1 문제가 발생하는 원인과 해결 방법을 설명해주세요.'
                 : 'HTTP와 HTTPS의 차이점과 HTTPS가 보안을 제공하는 방식을 설명해주세요.',
    category: currentId === 1 ? 'Spring' : currentId === 2 ? 'JPA' : 'Network',
    difficulty: currentId === 3 ? '초급' : '중급',
    hint: currentId === 1 ? '💡 JDK Dynamic Proxy와 CGLIB의 차이를 생각해보세요.'
          : currentId === 2 ? '💡 FetchType과 연관관계 로딩 전략을 고려해보세요.'
          : '💡 SSL/TLS 인증서와 암호화 방식을 생각해보세요.'
  };

  // 모든 답변 데이터
  const allAnswers = [
    {
      id: 1,
      author: { name: '라인 백엔드', badge: '재직', company: 'LINE' },
      content: currentId === 1
        ? 'Spring AOP는 프록시 패턴으로 동작합니다. 인터페이스가 있으면 JDK Dynamic Proxy, 없으면 CGLIB를 사용해요.\n\n런타임에 위빙이 이루어지며, @Aspect로 정의한 Advice가 조인포인트에서 실행됩니다.\n\n주의할 점은 같은 클래스 내부 메서드 호출 시 프록시를 거치지 않아 AOP가 동작하지 않는다는 거예요.'
        : currentId === 2
        ? 'N+1 문제는 연관관계 조회 시 각 엔티티마다 추가 쿼리가 발생하는 문제입니다.\n\nFetch Join이나 @EntityGraph를 사용하면 한 번의 쿼리로 해결할 수 있어요.'
        : 'HTTP는 평문 통신이고, HTTPS는 SSL/TLS로 암호화된 통신입니다.\n\nHTTPS는 공개키 암호화 방식으로 데이터를 보호합니다.',
      likes: 127,
      timeAgo: '2시간 전',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      preview: true
    },
    {
      id: 2,
      author: { name: '네이버 합격', badge: '합격자', company: 'Naver' },
      content: currentId === 1
        ? '면접에서 실제로 "같은 클래스 내부 호출 시 왜 AOP가 안 되는지" 물어봤어요.\n\n프록시를 거치지 않기 때문이라고 답했고, self-injection으로 해결할 수 있다고 설명했습니다!'
        : currentId === 2
        ? '실무에서 가장 많이 쓰는 건 Fetch Join이에요.\n\n다만 페이징 처리 시 메모리에서 페이징이 되는 문제가 있으니 @BatchSize를 사용하는 게 나을 수 있어요.'
        : 'HTTPS는 대칭키와 공개키 암호화를 모두 사용합니다.\n\n핸드셰이크 과정에서 공개키로 대칭키를 교환하고, 실제 데이터는 대칭키로 암호화해요.',
      likes: 89,
      timeAgo: '1일 전',
      timestamp: Date.now() - 24 * 60 * 60 * 1000,
      preview: true
    },
    {
      id: 3,
      author: { name: '카카오 시니어', badge: '재직', company: 'Kakao' },
      content: '실무 경험상 AOP는 트랜잭션, 로깅, 보안 등에 많이 사용됩니다.\n\n특히 @Transactional도 AOP로 구현되어 있죠.\n\n성능에 미치는 영향은 크지 않지만, 프록시 생성 비용은 고려해야 합니다.',
      likes: 64,
      timeAgo: '3일 전',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
      preview: false
    },
    {
      id: 4,
      author: { name: '토스 개발자', badge: '재직', company: 'Toss' },
      content: 'CGLIB는 클래스 상속 방식이라 final 클래스나 메서드에는 적용할 수 없어요.\n\n이런 제약사항도 면접에서 물어볼 수 있으니 알아두면 좋습니다.',
      likes: 52,
      timeAgo: '5일 전',
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
      preview: false
    }
  ];

  // 미리보기 답변과 잠긴 답변 분리
  const previewAnswers = allAnswers.filter(a => a.preview);
  const lockedAnswers = allAnswers.filter(a => !a.preview);

  const handleShare = () => {
    setShared(true);
    setUnlocked(true);
  };

  const toggleLike = (answerId: number) => {
    setLikedAnswers(prev =>
      prev.includes(answerId)
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };

  const nextId = currentId < 3 ? currentId + 1 : null;
  const prevId = currentId > 1 ? currentId - 1 : null;

  const handleNext = () => {
    if (nextId) {
      router.push(`/prototype11-option2/questions/${nextId}`);
    } else {
      router.push('/prototype11-option2/dashboard');
    }
  };

  const handlePrev = () => {
    if (prevId) {
      router.push(`/prototype11-option2/questions/${prevId}`);
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/prototype11-option2/dashboard" className="text-gray-500">
            ← 뒤로
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="text-2xl transition-transform hover:scale-110"
            >
              {bookmarked ? '⭐️' : '☆'}
            </button>
            <span className="text-sm font-medium text-gray-500">
              {question.number}/3
            </span>
          </div>
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

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {question.hint}
            </p>
          </div>
        </div>

        {/* Preview Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 shadow-sm border border-purple-300">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👀</span>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                답변 미리보기
              </h3>
              <p className="text-sm text-gray-600">
                2개의 답변을 먼저 확인할 수 있어요
              </p>
            </div>
          </div>
        </div>

        {/* Preview Answers */}
        <div className="space-y-4">
          {previewAnswers.map((answer) => (
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

        {/* Locked Answers Section */}
        {!unlocked && (
          <div className="relative">
            {/* Blurred Locked Answers */}
            <div className="space-y-4 opacity-40 blur-sm pointer-events-none">
              {lockedAnswers.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                      ?
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Unlock CTA Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-pink-400 max-w-sm mx-4">
                <div className="text-center">
                  <div className="text-5xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    나머지 {lockedAnswers.length}개 답변 보기
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    내 답변을 공유하면 모든 답변을 볼 수 있어요
                  </p>
                  <button
                    onClick={() => setShowAnswerForm(true)}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    답변 작성하고 열람하기
                  </button>
                  <p className="text-xs text-gray-500 mt-3">
                    +10 인사이트도 받을 수 있어요
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unlocked Answers */}
        {unlocked && (
          <div className="space-y-4">
            {lockedAnswers.map((answer) => (
              <div
                key={answer.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 animate-fade-in"
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
                      <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
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
        )}

        {/* Answer Form Modal */}
        {showAnswerForm && !shared && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setShowAnswerForm(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">내 답변 작성</h3>
              <textarea
                value={myAnswer}
                onChange={(e) => setMyAnswer(e.target.value)}
                placeholder="자유롭게 작성해보세요. 완벽할 필요 없어요!"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none resize-none mb-4"
                rows={10}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAnswerForm(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleShare}
                  disabled={!myAnswer.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {prevId && (
            <button
              onClick={handlePrev}
              className="flex-1 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-pink-400 hover:bg-gray-50 transition-all"
            >
              ← 이전 질문
            </button>
          )}
          <button
            onClick={handleNext}
            className={`${prevId ? 'flex-1' : 'w-full'} py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
          >
            {nextId ? '다음 질문 →' : '완료하고 돌아가기'}
          </button>
        </div>
    </div>
  );
}
