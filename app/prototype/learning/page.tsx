'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LearningPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const questions = [
    {
      id: 1,
      day: 23,
      total: 30,
      date: '2025.01.15',
      question: 'JPA N+1 문제를 해결하는 방법은?',
      tags: ['JPA', 'Performance'],
      status: 'completed',
      hasAnswer: true,
      insights: 50,
    },
    {
      id: 2,
      day: 22,
      total: 30,
      date: '2025.01.14',
      question: 'Spring Security 인증 과정을 설명하세요',
      tags: ['Spring', 'Security'],
      status: 'premium',
      hasAnswer: false,
      insights: 500,
    },
    {
      id: 3,
      day: 21,
      total: 30,
      date: '2025.01.13',
      question: 'Redis 캐싱 전략의 종류와 특징은?',
      tags: ['Redis', 'Cache'],
      status: 'pending',
      hasAnswer: false,
      insights: 0,
    },
    {
      id: 4,
      day: 20,
      total: 30,
      date: '2025.01.12',
      question: 'Kafka의 파티션 개념과 컨슈머 그룹을 설명하세요',
      tags: ['Kafka', 'MSA'],
      status: 'completed',
      hasAnswer: true,
      insights: 50,
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'completed') return q.status === 'completed';
    if (filter === 'pending') return q.status === 'pending';
    return true;
  });

  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">📚 학습 센터</h1>
          <p className="text-gray-400">모든 질문과 답변을 확인하세요</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-[#c3e88d] text-[#0d0d0d]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c3e88d]'
          }`}
        >
          전체 ({questions.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-[#c3e88d] text-[#0d0d0d]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c3e88d]'
          }`}
        >
          완료 (2)
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-[#c3e88d] text-[#0d0d0d]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c3e88d]'
          }`}
        >
          미완료 (1)
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c3e88d]/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-[#c3e88d]">
                    Day {q.day}/{q.total}
                  </span>
                  <span className="text-sm text-gray-500">{q.date}</span>
                  {q.status === 'completed' && (
                    <span className="px-2 py-0.5 bg-[#c3e88d]/20 text-[#c3e88d] rounded text-xs font-semibold">
                      ✅ 완료
                    </span>
                  )}
                  {q.status === 'premium' && (
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs font-semibold">
                      🔒 프리미엄
                    </span>
                  )}
                  {q.status === 'pending' && (
                    <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-xs font-semibold">
                      ⏳ 대기중
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-3">{q.question}</h3>

                <div className="flex gap-2 mb-4">
                  {q.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded-full text-sm text-gray-400"
                    >
                      🏷️ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {q.status === 'completed' && (
                <button className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#c3e88d] text-[#c3e88d] rounded-lg font-medium hover:bg-[#c3e88d] hover:text-[#0d0d0d] transition-colors">
                  내 답변 보기
                </button>
              )}

              {q.status === 'premium' && (
                <button className="flex-1 px-4 py-2 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-medium hover:bg-[#a8d378] transition-colors">
                  💡 {q.insights} 인사이트로 해제하기
                </button>
              )}

              {q.status === 'pending' && (
                <button className="flex-1 px-4 py-2 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-medium hover:bg-[#a8d378] transition-colors">
                  답변 작성하기
                </button>
              )}

              <button className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
                💬 토론
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-gray-400">해당하는 질문이 없습니다</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">📈 학습 요약</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#c3e88d] mb-1">23</div>
            <div className="text-sm text-gray-400">총 질문</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#c3e88d] mb-1">18</div>
            <div className="text-sm text-gray-400">완료</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#c3e88d] mb-1">5</div>
            <div className="text-sm text-gray-400">잠금 해제</div>
          </div>
        </div>
      </div>
    </div>
  );
}
