'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [myAnswer, setMyAnswer] = useState('');
  const [showMyAnswer, setShowMyAnswer] = useState(false);
  const [shared, setShared] = useState(false);
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

  const answersData = [
    {
      id: 1,
      author: {
        nickname: '개발하는 감자',
        badges: [
          { type: 'company', label: 'LINE', verified: true, color: 'blue' },
          { type: 'experience', label: '5년차', color: 'purple' }
        ]
      },
      content: currentId === 1
        ? 'Spring AOP는 프록시 패턴으로 동작합니다. 인터페이스가 있으면 JDK Dynamic Proxy, 없으면 CGLIB를 사용해요.\n\n런타임에 위빙이 이루어지며, @Aspect로 정의한 Advice가 조인포인트에서 실행됩니다.\n\n주의할 점은 같은 클래스 내부 메서드 호출 시 프록시를 거치지 않아 AOP가 동작하지 않는다는 거예요.'
        : currentId === 2
        ? 'N+1 문제는 연관관계 조회 시 각 엔티티마다 추가 쿼리가 발생하는 문제입니다.\n\nFetch Join이나 @EntityGraph를 사용하면 한 번의 쿼리로 해결할 수 있어요.\n\nBatch Size 설정도 효과적인 방법 중 하나입니다.'
        : 'HTTP는 평문 통신이고, HTTPS는 SSL/TLS로 암호화된 통신입니다.\n\nHTTPS는 공개키 암호화 방식으로 데이터를 보호하고, 인증서로 서버의 신원을 보장합니다.\n\n포트도 다릅니다. HTTP는 80, HTTPS는 443을 사용해요.',
      likes: 127,
      timeAgo: '2시간 전',
      timestamp: Date.now() - 2 * 60 * 60 * 1000
    },
    {
      id: 2,
      author: {
        nickname: '코딩하는 호랑이',
        badges: [
          { type: 'experience', label: '5년차 백엔드', color: 'purple' },
          { type: 'activity', label: '베스트 답변 12회', color: 'orange' }
        ]
      },
      content: currentId === 1
        ? '면접에서 실제로 "같은 클래스 내부 호출 시 왜 AOP가 안 되는지" 물어봤어요.\n\n프록시를 거치지 않기 때문이라고 답했고, 이 경우 self-injection이나 리팩토링으로 해결할 수 있다고 추가 설명했습니다!'
        : currentId === 2
        ? '실무에서 가장 많이 쓰는 건 Fetch Join이에요.\n\n다만 페이징 처리 시 메모리에서 페이징이 되는 문제가 있으니 주의해야 합니다.\n\n이럴 때는 @BatchSize를 사용하는 게 더 나을 수 있어요.'
        : 'HTTPS는 대칭키와 공개키 암호화를 모두 사용합니다.\n\n핸드셰이크 과정에서 공개키로 대칭키를 교환하고, 실제 데이터는 대칭키로 암호화해요.\n\n이렇게 하면 속도와 보안을 모두 잡을 수 있습니다.',
      likes: 89,
      timeAgo: '1일 전',
      timestamp: Date.now() - 24 * 60 * 60 * 1000
    },
    {
      id: 3,
      author: {
        nickname: '스프링 마스터',
        badges: [
          { type: 'tech', label: 'Spring 전문가', color: 'green' },
          { type: 'company', label: '우아한형제들', verified: true, color: 'blue' }
        ]
      },
      content: currentId === 1
        ? '실무 경험상 AOP는 트랜잭션, 로깅, 보안 등에 많이 사용됩니다.\n\n특히 @Transactional도 AOP로 구현되어 있죠.\n\n성능에 미치는 영향은 크지 않지만, 프록시 생성 비용은 고려해야 합니다.'
        : currentId === 2
        ? '@BatchSize는 IN 쿼리로 한번에 여러 개를 조회해서 쿼리 수를 줄여줍니다.\n\nFetch Join보다 유연하고, 페이징과도 같이 쓸 수 있어요.'
        : '중요한 건 HTTPS가 완벽한 보안을 보장하지는 않는다는 점이에요.\n\n중간자 공격을 방지하지만, 서버 자체가 해킹되면 소용없죠.',
      likes: 64,
      timeAgo: '3일 전',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
    },
    {
      id: 4,
      author: {
        nickname: '백엔드 지망생',
        badges: [
          { type: 'learner', label: '준비 중', color: 'gray' },
          { type: 'activity', label: '도움돼요 45+', color: 'orange' }
        ]
      },
      content: currentId === 1
        ? 'CGLIB는 클래스 상속 방식이라 final 클래스나 메서드에는 적용할 수 없어요.\n\n이런 제약사항도 면접에서 물어볼 수 있으니 알아두면 좋습니다.'
        : currentId === 2
        ? '실무 팁: 지연 로딩을 기본으로 하고, 필요한 경우에만 Fetch Join을 쓰세요.\n\n그리고 항상 쿼리 로그를 확인하는 습관을 들이세요.'
        : '면접에서 "대칭키와 공개키를 왜 둘 다 쓰는지" 물어보는 경우가 많아요.\n\n공개키는 느리지만 안전하고, 대칭키는 빠르지만 키 교환이 문제라서 둘을 조합하는 거죠.',
      likes: 52,
      timeAgo: '5일 전',
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
    }
  ];

  const othersAnswers = [...answersData].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    } else {
      return b.timestamp - a.timestamp;
    }
  });

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

  const nextId = currentId < 3 ? currentId + 1 : null;
  const prevId = currentId > 1 ? currentId - 1 : null;

  const handleNext = () => {
    if (nextId) {
      router.push(`/prototype11/questions/${nextId}`);
    } else {
      router.push('/prototype11/dashboard');
    }
  };

  const handlePrev = () => {
    if (prevId) {
      router.push(`/prototype11/questions/${prevId}`);
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/prototype11/dashboard" className="text-gray-500">
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

        {/* Others' Answers Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">👀</span>
              <span className="font-semibold text-gray-900">현직자 답변</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>8명 보는 중</span>
            </div>
          </div>

          {/* Contributor Badges Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {othersAnswers.map((answer) => {
              const primaryBadge = answer.author.badges[0];
              return (
                <div
                  key={answer.id}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                    primaryBadge.color === 'blue'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : primaryBadge.color === 'purple'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : primaryBadge.color === 'green'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : primaryBadge.color === 'orange'
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {primaryBadge.verified && <span className="text-blue-600">✓</span>}
                  {primaryBadge.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                sortBy === 'popular'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              인기순
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                sortBy === 'recent'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {/* All Answers (Free) */}
        <div className="space-y-4">
          {othersAnswers.map((answer) => (
            <div
              key={answer.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {answer.author.nickname[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900 text-sm">
                      {answer.author.nickname}
                    </span>
                    {answer.author.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 ${
                          badge.color === 'blue'
                            ? 'bg-blue-100 text-blue-700'
                            : badge.color === 'purple'
                            ? 'bg-purple-100 text-purple-700'
                            : badge.color === 'green'
                            ? 'bg-green-100 text-green-700'
                            : badge.color === 'orange'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {badge.verified && <span className="text-blue-600">✓</span>}
                        {badge.label}
                      </span>
                    ))}
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

        {/* Encourage Answer Writing (Optional) */}
        {!showMyAnswer && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-md border-2 border-indigo-300">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">✍️</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-2">
                  당신의 생각도 공유해주세요
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  답변을 공유하면 <strong className="text-indigo-700">+10 인사이트 💎</strong>를 받고,
                  다른 사람들에게도 도움을 줄 수 있어요
                </p>
                <button
                  onClick={() => setShowMyAnswer(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  답변 작성하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Answer Section */}
        {showMyAnswer && !shared && (
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-300">
            <label className="block mb-3">
              <span className="font-semibold text-gray-900">내 답변</span>
            </label>
            <textarea
              value={myAnswer}
              onChange={(e) => setMyAnswer(e.target.value)}
              placeholder="자유롭게 작성해보세요. 완벽할 필요 없어요!"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
              rows={8}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowMyAnswer(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                취소
              </button>
              <button
                onClick={handleShare}
                disabled={!myAnswer.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                공유하기
              </button>
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
              className="flex-1 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-emerald-400 hover:bg-gray-50 transition-all"
            >
              ← 이전 질문
            </button>
          )}
          <button
            onClick={handleNext}
            className={`${prevId ? 'flex-1' : 'w-full'} py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
          >
            {nextId ? '다음 질문 →' : '완료하고 돌아가기'}
          </button>
        </div>
    </div>
  );
}
