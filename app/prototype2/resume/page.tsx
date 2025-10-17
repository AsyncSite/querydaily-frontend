export default function ResumePage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">이력서 관리</h1>
        <p className="text-gray-500">AI 분석으로 이력서를 개선하세요</p>
      </div>

      {/* Current Resume */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              resume_v3.pdf
            </h2>
            <p className="text-sm text-gray-600">
              업로드: 2025.01.10 · 분석 완료
            </p>
          </div>
          <span className="px-3 py-1 bg-white text-indigo-600 rounded-lg text-sm font-medium shadow-sm">
            현재
          </span>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          AI 분석 결과 보기
        </button>
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">AI 분석 요약</h3>

        <div className="space-y-4">
          <div className="border-l-4 border-emerald-400 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">강점</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Spring Boot 기반 백엔드 경력 명확</li>
              <li>• 성과 지표 수치화 (응답 속도 40% 개선)</li>
              <li>• MSA 환경 Kafka, Redis 활용 경험</li>
            </ul>
          </div>

          <div className="border-l-4 border-amber-400 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">보완점</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 분산 시스템 장애 처리 경험 추가 필요</li>
              <li>• 클라우드 인프라 경험 보강 추천</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">추천 학습 주제</h3>
        <div className="flex flex-wrap gap-2">
          {['Kafka Streams', 'Circuit Breaker', 'Kubernetes', 'Service Mesh'].map(
            (topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm"
              >
                {topic}
              </span>
            )
          )}
        </div>
      </div>

      {/* Upload New */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
        <div className="text-4xl mb-3">📄</div>
        <h3 className="font-semibold text-gray-900 mb-2">새 이력서 업로드</h3>
        <p className="text-sm text-gray-500 mb-4">
          PDF, DOCX (최대 5MB) · 100 인사이트 획득
        </p>
        <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          파일 선택
        </button>
      </div>
    </div>
  );
}
