'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function QuestionDetailPage() {
  const [myNote, setMyNote] = useState('');
  const [activeTab, setActiveTab] = useState<'samples' | 'mynote'>('samples');

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
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('samples')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'samples'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500'
          }`}
        >
          팀 작성 샘플 (3)
        </button>
        <button
          onClick={() => setActiveTab('mynote')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'mynote'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500'
          }`}
        >
          내 메모
        </button>
      </div>

      {/* Sample Answers */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
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

      {/* My Note */}
      {activeTab === 'mynote' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-900 mb-2 block">
              📝 나만의 메모 (비공개)
            </label>
            <textarea
              value={myNote}
              onChange={(e) => setMyNote(e.target.value)}
              placeholder="핵심 키워드, 기억할 점, 실전 답변 준비 등을 자유롭게 메모하세요..."
              className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none text-sm"
            />
          </div>
          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            저장하기
          </button>
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
