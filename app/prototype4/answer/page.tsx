'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AnswerPage() {
  const [answer, setAnswer] = useState('');

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Question Card */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-orange-600">오늘의 질문</span>
          <span className="text-xs text-gray-400">10분 전</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을 사용하고
          어떻게 동작하나요?
        </h2>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 bg-white text-gray-600 rounded">
            Spring
          </span>
          <span className="text-xs px-2 py-1 bg-white text-gray-600 rounded">
            AOP
          </span>
          <span className="text-xs px-2 py-1 bg-white text-gray-600 rounded">
            로깅
          </span>
        </div>
      </div>

      {/* Answer Editor */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">✍️ 내 답변 작성</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>⏱️</span>
            <span>권장 시간: 15분</span>
          </div>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="여기에 답변을 작성하세요...

예시:
# Spring AOP란?

Spring AOP(Aspect-Oriented Programming)는...

## 로깅 구현 방법

1. @Aspect 어노테이션을 사용하여...
2. @Around, @Before, @After 등..."
          className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none font-mono text-sm"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {answer.length > 0 ? `${answer.length}자 작성중` : '답변을 입력하세요'}
          </div>
          <div className="text-sm text-orange-600 font-medium">
            제출 시 +100 인사이트 획득
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>더 좋은 피드백을 받으려면</span>
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>실무 경험이나 프로젝트 사례를 포함하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>코드 예시를 함께 작성하면 더 구체적인 피드백을 받습니다</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>장단점을 함께 설명하면 깊이 있는 답변으로 평가됩니다</span>
          </li>
        </ul>
      </div>

      {/* Hint Option */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">💡 힌트 보기</h4>
            <p className="text-sm text-gray-600">핵심 키워드와 방향성 제공</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            100 인사이트
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
          임시저장
        </button>
        <Link
          href="/prototype4/feedback"
          className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:shadow-lg transition-all"
        >
          제출하기
        </Link>
      </div>

      {/* Past Answers */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📝 최근 답변 내역</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex-1">
              <div className="text-gray-900 mb-1">JPA N+1 문제 해결법</div>
              <div className="text-sm text-gray-500">피드백 대기중</div>
            </div>
            <span className="text-blue-600 text-sm font-medium">대기</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Spring Transaction 전파</div>
              <div className="text-sm text-emerald-600">85점 - 우수</div>
            </div>
            <Link
              href="/prototype4/feedback"
              className="text-orange-600 text-sm font-medium hover:underline"
            >
              보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
