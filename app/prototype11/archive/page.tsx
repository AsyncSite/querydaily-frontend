'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  const categories = [
    { id: 'spring', label: 'Spring', color: 'bg-green-50 text-green-700' },
    { id: 'jpa', label: 'JPA', color: 'bg-blue-50 text-blue-700' },
    { id: 'network', label: 'Network', color: 'bg-purple-50 text-purple-700' },
    { id: 'react', label: 'React', color: 'bg-cyan-50 text-cyan-700' },
    { id: 'algorithm', label: 'Algorithm', color: 'bg-orange-50 text-orange-700' },
    { id: 'database', label: 'Database', color: 'bg-indigo-50 text-indigo-700' },
  ];

  const pastQuestions = [
    {
      date: '12월 19일 (목)',
      questions: [
        { id: 1, title: 'Spring AOP의 동작 원리를 설명하세요', category: 'Spring', categoryColor: 'bg-green-50 text-green-700' },
        { id: 2, title: 'JPA N+1 문제와 해결 방법', category: 'JPA', categoryColor: 'bg-blue-50 text-blue-700' },
        { id: 3, title: 'HTTP와 HTTPS의 차이', category: 'Network', categoryColor: 'bg-purple-50 text-purple-700' },
      ]
    },
    {
      date: '12월 18일 (수)',
      questions: [
        { id: 11, title: 'React Hooks의 동작 원리', category: 'React', categoryColor: 'bg-cyan-50 text-cyan-700' },
        { id: 12, title: 'Redis vs Memcached', category: 'Database', categoryColor: 'bg-indigo-50 text-indigo-700' },
        { id: 13, title: 'Quick Sort vs Merge Sort', category: 'Algorithm', categoryColor: 'bg-orange-50 text-orange-700' },
      ]
    },
    {
      date: '12월 17일 (화)',
      questions: [
        { id: 21, title: '@Transactional의 전파 속성', category: 'Spring', categoryColor: 'bg-green-50 text-green-700' },
        { id: 22, title: 'JPA Dirty Checking 원리', category: 'JPA', categoryColor: 'bg-blue-50 text-blue-700' },
        { id: 23, title: 'TCP vs UDP 비교', category: 'Network', categoryColor: 'bg-purple-50 text-purple-700' },
      ]
    },
    {
      date: '12월 16일 (월)',
      questions: [
        { id: 31, title: 'useEffect vs useLayoutEffect', category: 'React', categoryColor: 'bg-cyan-50 text-cyan-700' },
        { id: 32, title: 'Index 설계 전략', category: 'Database', categoryColor: 'bg-indigo-50 text-indigo-700' },
        { id: 33, title: 'Dynamic Programming 기본 원리', category: 'Algorithm', categoryColor: 'bg-orange-50 text-orange-700' },
      ]
    },
  ];

  const filteredQuestions = pastQuestions.map(day => ({
    ...day,
    questions: selectedCategory
      ? day.questions.filter(q => q.category.toLowerCase() === selectedCategory)
      : day.questions
  })).filter(day => day.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/prototype11/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <span>←</span>
          <span>대시보드로 돌아가기</span>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📚</span>
          <h1 className="text-3xl font-bold text-gray-900">
            지난 질문
          </h1>
        </div>
        <p className="text-gray-600">
          복습하고 인사이트를 얻어보세요
        </p>
      </div>

      {/* Period Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === 'week'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            이번 주
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === 'month'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            이번 달
          </button>
          <button
            onClick={() => setSelectedPeriod('all')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === 'all'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">주제별 필터</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
            }`}
          >
            전체
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? category.color + ' border-2 border-current'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {filteredQuestions.map((day) => (
          <div key={day.date} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              {day.date}
            </h3>
            <div className="space-y-3">
              {day.questions.map((question) => (
                <Link
                  key={question.id}
                  href={`/prototype11/questions/${question.id}`}
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-2">
                        {question.title}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${question.categoryColor}`}>
                        {question.category}
                      </span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            질문이 없습니다
          </h3>
          <p className="text-gray-600 text-sm">
            다른 필터를 선택해보세요
          </p>
        </div>
      )}
    </div>
  );
}
