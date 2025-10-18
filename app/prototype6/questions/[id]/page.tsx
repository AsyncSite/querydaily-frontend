'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function QuestionDetailPage() {
  const [myAnswer, setMyAnswer] = useState('');
  const [activeTab, setActiveTab] = useState<'samples' | 'community' | 'myanswer'>('samples');
  const [likedAnswers, setLikedAnswers] = useState<number[]>([]);

  const toggleLike = (answerId: number) => {
    setLikedAnswers(prev =>
      prev.includes(answerId)
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };

  const communityAnswers = [
    {
      id: 1,
      author: {
        name: '카카오 현직',
        avatar: '👨‍💻',
        badge: '재직',
        company: 'Kakao'
      },
      content: `실무에서 AOP는 주로 **로깅, 트랜잭션, 보안 검증**에 사용합니다.

핵심은 프록시 패턴인데, Spring은 인터페이스가 있으면 JDK Dynamic Proxy, 없으면 CGLIB를 사용합니다.

**주의할 점:** 같은 클래스 내부 메서드 호출 시 프록시를 거치지 않아 AOP가 동작하지 않습니다. 이럴 때는 self-injection이나 별도 빈으로 분리해야 합니다.`,
      likes: 127,
      comments: 12,
      timeAgo: '2시간 전'
    },
    {
      id: 2,
      author: {
        name: '네이버 합격',
        avatar: '👩‍💻',
        badge: '합격자',
        company: 'Naver'
      },
      content: `면접에서는 AOP의 **개념**보다 **실무 활용**을 더 많이 물어봤어요.

"어떤 상황에 AOP를 쓰셨나요?"
→ 저는 API 응답 시간 측정에 사용했다고 답변했습니다.

@Around 어드바이스로 ProceedingJoinPoint를 받아 실행 전후 시간을 측정하는 방식이죠.`,
      likes: 89,
      comments: 8,
      timeAgo: '5시간 전'
    },
    {
      id: 3,
      author: {
        name: '준비중개발자',
        avatar: '🧑‍💻',
        badge: null,
        company: null
      },
      content: `정리하면서 공부한 내용 공유합니다!

**AOP 핵심 용어:**
- Aspect: 횡단 관심사 모듈
- Join Point: 메서드 실행 시점
- Pointcut: 어디에 적용할지 (execution 표현식)
- Advice: 언제 실행할지 (@Before, @After, @Around)

실전 팁: @Around가 가장 유연하지만, @Before나 @AfterReturning이 더 명확할 때도 있습니다.`,
      likes: 56,
      comments: 4,
      timeAgo: '1일 전'
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Back Button */}
      <Link
        href="/prototype6/questions?category=spring"
        className="text-indigo-600 text-sm font-medium inline-block hover:underline"
      >
        ← 질문 목록으로
      </Link>

      {/* Question Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-3">
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-medium">
                Spring
              </span>
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
                중급
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Spring AOP의 동작 원리를 설명하세요
            </h1>
          </div>
          <button className="text-3xl text-yellow-500">⭐</button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>👀</span>
            <span>조회 1,234</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>북마크 89</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>답변 48</span>
          </div>
        </div>
      </div>

      {/* Related Tags */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-sm font-medium text-gray-900 mb-3">
          🏷️ 연관 키워드
        </div>
        <div className="flex flex-wrap gap-2">
          {['프록시 패턴', '관점 지향', '@Aspect', '@Around', '위빙'].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('samples')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'samples'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500'
          }`}
        >
          팀 샘플 (3)
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'community'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500'
          }`}
        >
          커뮤니티 답변 (45)
        </button>
        <button
          onClick={() => setActiveTab('myanswer')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'myanswer'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500'
          }`}
        >
          내 답변
        </button>
      </div>

      {/* Team Sample Answers */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span>💡</span>
              <span>전문가가 작성한 검증된 답변입니다</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                팀
              </div>
              <div>
                <div className="font-medium text-gray-900">QueryDaily 팀</div>
                <div className="text-sm text-gray-500">백엔드 전문가</div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-3">
                <strong>Spring AOP(Aspect-Oriented Programming)</strong>는 관점 지향 프로그래밍으로,
                횡단 관심사(Cross-cutting Concerns)를 분리하여 모듈화하는 프로그래밍 기법입니다.
              </p>
              <p className="mb-3">
                <strong>동작 원리:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-3">
                <li>프록시 패턴 기반으로 동작합니다</li>
                <li>@Aspect 어노테이션으로 Aspect 클래스를 정의합니다</li>
                <li>@Around, @Before, @After 등으로 실행 시점을 지정합니다</li>
                <li>런타임에 프록시 객체가 생성되어 메서드 호출을 가로챕니다</li>
              </ol>
              <p>
                실무에서는 주로 로깅, 트랜잭션 관리, 보안, 성능 측정 등에 활용됩니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                팀
              </div>
              <div>
                <div className="font-medium text-gray-900">QueryDaily 팀</div>
                <div className="text-sm text-gray-500">시니어 개발자 관점</div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-3">
                AOP는 <strong>비즈니스 로직과 부가 기능을 분리</strong>하는 것이 핵심입니다.
              </p>
              <p className="mb-3">
                예를 들어, 모든 메서드에 실행 시간을 로깅하려면 각 메서드마다 코드를 추가하는 대신,
                AOP를 사용하면 한 곳에서 정의하고 여러 메서드에 적용할 수 있습니다.
              </p>
              <p>
                주의사항: 프록시 생성으로 인한 성능 오버헤드와, self-invocation 문제를 이해해야 합니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                팀
              </div>
              <div>
                <div className="font-medium text-gray-900">QueryDaily 팀</div>
                <div className="text-sm text-gray-500">코드 예시 중심</div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-800">
                <div>@Aspect</div>
                <div>@Component</div>
                <div>public class LoggingAspect &#123;</div>
                <div className="ml-4">@Around("execution(* com.example..*(..))")</div>
                <div className="ml-4">public Object logExecutionTime(ProceedingJoinPoint joinPoint) &#123;</div>
                <div className="ml-8">long start = System.currentTimeMillis();</div>
                <div className="ml-8">Object proceed = joinPoint.proceed();</div>
                <div className="ml-8">long executionTime = System.currentTimeMillis() - start;</div>
                <div className="ml-8">log.info("Time: " + executionTime);</div>
                <div className="ml-8">return proceed;</div>
                <div className="ml-4">&#125;</div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Answers */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👀</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  다른 개발자들의 생각을 엿보세요
                </div>
                <div className="text-sm text-gray-600">
                  실제 합격자와 현직 개발자들이 공유한 답변입니다
                </div>
              </div>
            </div>
          </div>

          {communityAnswers.map((answer) => (
            <div key={answer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-xl">
                  {answer.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{answer.author.name}</span>
                    {answer.author.badge && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {answer.author.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{answer.timeAgo}</div>
                </div>
              </div>

              {/* Answer Content */}
              <div className="prose prose-sm max-w-none text-gray-700 mb-4 whitespace-pre-line">
                {answer.content}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleLike(answer.id)}
                  className={`flex items-center gap-1 text-sm ${
                    likedAnswers.includes(answer.id)
                      ? 'text-red-500 font-medium'
                      : 'text-gray-500 hover:text-red-500'
                  } transition-colors`}
                >
                  <span>{likedAnswers.includes(answer.id) ? '❤️' : '🤍'}</span>
                  <span>{likedAnswers.includes(answer.id) ? answer.likes + 1 : answer.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  <span>💬</span>
                  <span>{answer.comments}</span>
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/prototype6/questions"
            className="block w-full py-3 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            더 많은 답변 보기 (42개 더)
          </Link>
        </div>
      )}

      {/* My Answer */}
      {activeTab === 'myanswer' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✍️</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  내 답변을 공유하고 인사이트를 받으세요
                </div>
                <div className="text-sm text-emerald-700">
                  공유 시 <strong>+10 인사이트</strong> (PC 상품 구매 시 할인)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                📝 내 답변 작성
              </label>
              <textarea
                value={myAnswer}
                onChange={(e) => setMyAnswer(e.target.value)}
                placeholder="이 질문에 대한 나만의 답변을 작성해보세요.

실무 경험, 프로젝트 사례, 학습한 내용 등을 자유롭게 공유하세요.
다른 개발자들에게 도움이 되는 답변은 많은 좋아요를 받을 수 있습니다!"
                className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none text-sm"
              />
            </div>

            <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="share-public" className="w-4 h-4 accent-indigo-600" defaultChecked />
                <label htmlFor="share-public" className="text-sm text-gray-700">
                  커뮤니티에 공유하기 <span className="text-emerald-600 font-medium">(+10 인사이트)</span>
                </label>
              </div>
            </div>

            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              답변 저장하기
            </button>

            <div className="mt-3 text-xs text-gray-500 text-center">
              💡 비공개로 저장하거나, 커뮤니티에 공유할 수 있습니다
            </div>
          </div>
        </div>
      )}

      {/* Related Questions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">🔗 관련 질문</h3>
        <div className="space-y-3">
          <Link href="/prototype6/questions/2" className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="text-sm font-medium text-gray-900 mb-1">
              @Transactional의 전파 속성
            </div>
            <div className="text-xs text-gray-500">Spring · 중급</div>
          </Link>
          <Link href="/prototype6/questions/3" className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Spring Bean 생명주기
            </div>
            <div className="text-xs text-gray-500">Spring · 초급</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
