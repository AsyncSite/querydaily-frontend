'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function QuestionsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // 카테고리별 질문 데이터
  const allQuestions = [
    // Spring
    { id: 1, title: 'Spring AOP의 동작 원리를 설명하세요', category: 'spring', categoryName: 'Spring', difficulty: '중급', answers: 127 },
    { id: 4, title: 'Spring Bean의 생명주기를 설명하세요', category: 'spring', categoryName: 'Spring', difficulty: '중급', answers: 98 },
    { id: 7, title: 'Spring Transaction 전파 속성의 종류', category: 'spring', categoryName: 'Spring', difficulty: '중급', answers: 85 },
    { id: 10, title: 'DI(의존성 주입)의 3가지 방법', category: 'spring', categoryName: 'Spring', difficulty: '초급', answers: 112 },

    // JPA
    { id: 2, title: 'JPA N+1 문제와 해결 방법', category: 'jpa', categoryName: 'JPA', difficulty: '중급', answers: 89 },
    { id: 5, title: 'JPA 영속성 컨텍스트란?', category: 'jpa', categoryName: 'JPA', difficulty: '중급', answers: 76 },
    { id: 8, title: 'Dirty Checking의 동작 원리', category: 'jpa', categoryName: 'JPA', difficulty: '심화', answers: 54 },

    // React
    { id: 11, title: 'React의 Virtual DOM 동작 원리', category: 'react', categoryName: 'React', difficulty: '중급', answers: 103 },
    { id: 12, title: 'useState vs useReducer 선택 기준', category: 'react', categoryName: 'React', difficulty: '중급', answers: 87 },

    // Database
    { id: 13, title: '인덱스의 동작 원리와 장단점', category: 'database', categoryName: 'Database', difficulty: '중급', answers: 95 },
    { id: 14, title: '트랜잭션 격리 수준 4가지', category: 'database', categoryName: 'Database', difficulty: '심화', answers: 72 },

    // Network
    { id: 3, title: 'HTTP와 HTTPS의 차이', category: 'network', categoryName: 'Network', difficulty: '초급', answers: 134 },
    { id: 15, title: 'TCP와 UDP의 차이점', category: 'network', categoryName: 'Network', difficulty: '초급', answers: 118 },

    // Algorithm
    { id: 16, title: '시간복잡도 O(n)과 O(logn)의 차이', category: 'algorithm', categoryName: '알고리즘', difficulty: '초급', answers: 142 },
    { id: 17, title: 'HashMap vs TreeMap 차이와 사용 시점', category: 'algorithm', categoryName: '알고리즘', difficulty: '중급', answers: 91 },
  ];

  // 카테고리 필터링
  const filteredQuestions = category
    ? allQuestions.filter(q => q.category === category)
    : allQuestions;

  const categoryNames: { [key: string]: string } = {
    spring: 'Spring',
    jpa: 'JPA',
    react: 'React',
    database: '데이터베이스',
    network: '네트워크',
    algorithm: '알고리즘',
  };

  const categoryName = category ? categoryNames[category] : '전체';

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryName} 질문
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredQuestions.length}개 질문
          </p>
        </div>
        <Link href="/prototype11/categories" className="text-gray-500">
          ← 카테고리
        </Link>
      </div>

      {/* Filter Info */}
      {category && (
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              <strong>{categoryName}</strong> 카테고리 보는 중
            </span>
            <Link
              href="/prototype11/questions"
              className="text-sm text-indigo-600 hover:underline"
            >
              전체 보기
            </Link>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((question) => (
          <Link
            key={question.id}
            href={`/prototype11/questions/${question.id}`}
            className="block bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all"
          >
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 mb-2">
                {question.title}
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                  {question.categoryName}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  question.difficulty === '초급'
                    ? 'bg-green-50 text-green-600'
                    : question.difficulty === '중급'
                    ? 'bg-orange-50 text-orange-600'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {question.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                💬 {question.answers}개 답변
              </span>
              <span className="text-gray-400">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🤔</div>
          <div className="text-gray-600">해당 카테고리에 질문이 없습니다</div>
        </div>
      )}
    </div>
  );
}

export default function QuestionsPage() {
  return (
    <Suspense fallback={
      <div className="px-6 py-8 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    }>
      <QuestionsContent />
    </Suspense>
  );
}
