'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function QuestionsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'spring';

  const categoryNames: { [key: string]: string } = {
    spring: 'Spring',
    react: 'React',
    jpa: 'JPA/Hibernate',
    redis: 'Redis',
  };

  const questions = [
    {
      id: 1,
      title: 'Spring AOP의 동작 원리를 설명하세요',
      difficulty: '중급',
      tags: ['Spring', 'AOP'],
      bookmarked: true,
    },
    {
      id: 2,
      title: '@Transactional 어노테이션의 동작 방식과 주의사항',
      difficulty: '중급',
      tags: ['Spring', 'Transaction'],
      bookmarked: false,
    },
    {
      id: 3,
      title: 'Spring Bean의 생명주기에 대해 설명하세요',
      difficulty: '초급',
      tags: ['Spring', 'Bean'],
      bookmarked: true,
    },
    {
      id: 4,
      title: 'Spring MVC의 요청 처리 과정(DispatcherServlet)',
      difficulty: '중급',
      tags: ['Spring', 'MVC'],
      bookmarked: false,
    },
    {
      id: 5,
      title: 'Spring Security의 인증/인가 프로세스',
      difficulty: '고급',
      tags: ['Spring', 'Security'],
      bookmarked: false,
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <Link href="/prototype6/dashboard" className="text-indigo-600 text-sm font-medium mb-2 inline-block hover:underline">
          ← 카테고리로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {categoryNames[category] || 'Spring'} 질문
        </h1>
        <p className="text-gray-500">총 123개 질문</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium whitespace-nowrap">
          전체
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          초급
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          중급
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          고급
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 whitespace-nowrap">
          북마크만
        </button>
      </div>

      {/* Question List */}
      <div className="space-y-3">
        {questions.map((question) => (
          <Link
            key={question.id}
            href={`/prototype6/questions/${question.id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium mb-2">
                  {question.title}
                </h3>
                <div className="flex gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      question.difficulty === '초급'
                        ? 'bg-green-50 text-green-600'
                        : question.difficulty === '중급'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </div>
              </div>
              <button className={`text-2xl ${question.bookmarked ? 'text-yellow-500' : 'text-gray-300'}`}>
                {question.bookmarked ? '⭐' : '☆'}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              팀 작성 샘플 답변 3개 · 평균 읽기 시간 5분
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function QuestionsPage() {
  return (
    <Suspense fallback={<div className="px-6 py-8">Loading...</div>}>
      <QuestionsContent />
    </Suspense>
  );
}
