import Link from 'next/link';

export default function FeedbackPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Expert Profile */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            김
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              김철수 시니어
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">현) 카카오 백엔드</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">경력 7년</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {'⭐'.repeat(5)}
              </div>
              <span className="text-sm font-medium text-gray-700">4.9</span>
              <span className="text-xs text-gray-500">(127개 리뷰)</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-gray-700">
            "실무 경험을 바탕으로 실전에 필요한 피드백을 드립니다. 특히 MSA 환경에서의
            Spring 활용에 강점이 있습니다."
          </p>
        </div>
      </div>

      {/* Question & My Answer */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📬 질문</h3>
        <p className="text-gray-700 mb-4">
          Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을 사용하고
          어떻게 동작하나요?
        </p>

        <h3 className="font-semibold text-gray-900 mb-3 mt-6">✍️ 내 답변</h3>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
          Spring AOP는 관점 지향 프로그래밍으로, 횡단 관심사를 분리하여 관리합니다.
          로깅 구현 시 @Aspect 어노테이션을 사용하며, @Around, @Before, @After 등의
          어드바이스를 활용합니다...
        </div>
      </div>

      {/* Score */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200 text-center">
        <div className="text-sm text-gray-600 mb-2">종합 점수</div>
        <div className="text-6xl font-bold text-emerald-600 mb-2">85</div>
        <div className="text-lg text-gray-700">/ 100점</div>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full">
          <span className="text-emerald-600">✓</span>
          <span className="text-sm font-medium text-gray-700">우수 답변</span>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-emerald-500">✅</span>
          <span>잘한 점</span>
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 mt-1">•</span>
            <span className="text-gray-700">
              Spring AOP의 핵심 개념을 정확하게 이해하고 있습니다
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 mt-1">•</span>
            <span className="text-gray-700">
              @Aspect, @Around 등 주요 어노테이션 사용법이 명확합니다
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 mt-1">•</span>
            <span className="text-gray-700">
              실무에서 겪은 로깅 경험을 잘 녹여냈습니다
            </span>
          </li>
        </ul>
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-amber-500">⚠️</span>
          <span>개선이 필요한 점</span>
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1">•</span>
            <div className="flex-1">
              <div className="text-gray-900 font-medium mb-1">
                Pointcut 표현식 설명 추가 필요
              </div>
              <div className="text-sm text-gray-600">
                execution, within 등 표현식의 차이점을 언급하면 더 완성도 높은
                답변이 됩니다
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1">•</span>
            <div className="flex-1">
              <div className="text-gray-900 font-medium mb-1">
                성능 고려사항 보완
              </div>
              <div className="text-sm text-gray-600">
                AOP 사용 시 프록시 생성으로 인한 성능 영향도 설명하면 좋습니다
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📚</span>
          <span>추천 학습 자료</span>
        </h3>
        <div className="space-y-3">
          <Link
            href="/prototype4/answer"
            className="block p-4 bg-white rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors"
          >
            <div className="font-medium text-gray-900 mb-1">
              AOP 심화 질문 3개
            </div>
            <div className="text-sm text-gray-600">
              Pointcut 표현식, 성능 최적화, 트랜잭션 AOP
            </div>
          </Link>
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <div className="font-medium text-gray-900 mb-1">
              토비의 스프링 6장
            </div>
            <div className="text-sm text-gray-600">
              AOP의 동작 원리와 프록시 패턴 상세 설명
            </div>
          </div>
        </div>
      </div>

      {/* Additional Questions (Insights) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          💡 전문가에게 추가 질문하기
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          이 답변에 대해 더 궁금한 점이 있다면 전문가에게 직접 물어보세요
        </p>
        <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all">
          1:1 질문하기 (300 인사이트)
        </button>
      </div>

      {/* Community Share */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">🌟 우수 답변 공유</h3>
        <p className="text-sm text-gray-600 mb-4">
          85점 이상 우수 답변은 커뮤니티에 공유되어 다른 사람들에게 도움을 줄 수
          있습니다
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            비공개 유지
          </button>
          <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            커뮤니티 공유 (+100 인사이트)
          </button>
        </div>
      </div>
    </div>
  );
}
