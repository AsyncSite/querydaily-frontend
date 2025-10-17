'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PrepQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [myAnswer, setMyAnswer] = useState('');
  const [activeTab, setActiveTab] = useState<'guide' | 'sample' | 'mynote'>('guide');

  const question = {
    id: params.id,
    title: 'Spring AOP 동작 원리',
    description: 'Spring AOP의 프록시 기반 동작 원리와 위빙 시점에 대해 설명해주세요.',
    category: 'Spring Framework',
    difficulty: '중급',
    tags: ['Spring', 'AOP', 'Proxy']
  };

  const guide = {
    keyPoints: [
      '프록시 패턴을 기반으로 동작',
      'JDK Dynamic Proxy vs CGLIB 차이',
      '위빙 시점 (컴파일타임, 로드타임, 런타임)',
      '@Aspect와 Advice 타입 (Before, After, Around 등)'
    ],
    tips: [
      '실제 프로젝트에서 AOP를 사용한 경험이 있다면 언급하세요',
      '프록시의 한계점(같은 클래스 내부 메서드 호출)도 알고 있다면 좋습니다'
    ]
  };

  const sampleAnswers = [
    {
      author: '전문가 답변',
      content: `Spring AOP는 프록시 패턴을 기반으로 동작합니다.

인터페이스가 있는 경우 JDK Dynamic Proxy를 사용하고, 없는 경우 CGLIB를 사용하여 프록시 객체를 생성합니다.

위빙 시점은 런타임에 이루어지며, @Aspect 어노테이션으로 정의된 Advice(Before, After, Around 등)가 특정 조인포인트에서 실행됩니다.

주의할 점은 같은 클래스 내부의 메서드 호출 시에는 프록시를 거치지 않아 AOP가 동작하지 않는다는 것입니다.`,
      rating: '⭐ 5.0'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <Link href="/prototype9/scenarios/junior-backend" className="text-gray-600 text-sm">
          ← 목록으로
        </Link>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
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

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'guide'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              답변 가이드
            </button>
            <button
              onClick={() => setActiveTab('sample')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'sample'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              샘플 답변
            </button>
            <button
              onClick={() => setActiveTab('mynote')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'mynote'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              내 답변
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'guide' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">💡 핵심 포인트</h4>
                  <ul className="space-y-2">
                    {guide.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">✨ 답변 팁</h4>
                  <ul className="space-y-2">
                    {guide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-500 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'sample' && (
              <div className="space-y-4">
                {sampleAnswers.map((answer, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {answer.author}
                      </span>
                      <span className="text-xs text-yellow-600">{answer.rating}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {answer.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'mynote' && (
              <div>
                <textarea
                  value={myAnswer}
                  onChange={(e) => setMyAnswer(e.target.value)}
                  placeholder="나만의 답변을 작성해보세요. 실제 면접 상황을 떠올리며 말하듯이 작성하면 좋습니다."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                  rows={12}
                />
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    💾 저장하기
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    🎤 음성 연습
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Questions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">🔗 연관 질문</h3>
          <div className="space-y-2">
            {[
              '@Transactional 동작 원리',
              'Proxy의 한계점',
              'Spring Bean 생명주기'
            ].map((q, index) => (
              <Link
                key={index}
                href="/prototype9/prep/1"
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm text-gray-700">{q}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
