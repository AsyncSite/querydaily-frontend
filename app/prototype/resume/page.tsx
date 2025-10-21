export default function ResumePage() {
  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">📄 이력서 관리</h1>
          <p className="text-gray-400">이력서를 업로드하고 AI 분석을 받으세요</p>
        </div>
        <button className="px-4 py-2 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#a8d378] transition-colors">
          + 새 이력서 업로드
        </button>
      </div>

      {/* Current Resume */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#c3e88d]/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl">📋</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold">resume_v3.pdf</h2>
              <span className="px-3 py-1 bg-[#c3e88d]/20 text-[#c3e88d] rounded-full text-sm font-semibold">
                현재 이력서
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              업로드: 2025.01.10 · 분석 완료 ✅
            </p>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#a8d378] transition-colors">
                AI 분석 결과 보기
              </button>
              <button className="px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
                다운로드
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">🤖 AI 분석 결과</h2>

        <div className="space-y-4">
          {/* Strengths */}
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-500">✅</span> 강점
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-[#c3e88d] mt-1">•</span>
                <span>Spring Boot, JPA 기반 백엔드 개발 경력 3년 (구체적)</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-[#c3e88d] mt-1">•</span>
                <span>MSA 환경에서 Kafka, Redis 활용 경험 명확히 기술</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-[#c3e88d] mt-1">•</span>
                <span>성과 지표 수치화 (응답 속도 40% 개선 등)</span>
              </li>
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-yellow-500">⚠️</span> 보완점
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-[#c3e88d] mt-1">•</span>
                <span>분산 시스템 장애 처리 경험 추가 필요</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-[#c3e88d] mt-1">•</span>
                <span>클라우드 인프라 (AWS, GCP) 경험 보강 추천</span>
              </li>
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-blue-400">💡</span> 추천 학습 주제
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Kafka Streams',
                'Circuit Breaker',
                'Kubernetes',
                'Service Mesh',
                'Event Sourcing',
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 bg-[#1a1a1a] border border-[#c3e88d]/50 text-[#c3e88d] rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resume History */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📚 이력서 버전 이력</h2>

        <div className="space-y-3">
          <div className="bg-[#0d0d0d] border border-[#c3e88d]/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-semibold">resume_v3.pdf</h3>
                  <p className="text-sm text-gray-400">2025.01.10 · 현재</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#c3e88d]/20 text-[#c3e88d] rounded-lg text-sm font-medium">
                분석 완료
              </button>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-semibold text-gray-400">resume_v2.pdf</h3>
                  <p className="text-sm text-gray-500">2025.01.05</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm hover:border-[#c3e88d] transition-colors">
                보기
              </button>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-semibold text-gray-400">resume_v1.pdf</h3>
                  <p className="text-sm text-gray-500">2024.12.20</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm hover:border-[#c3e88d] transition-colors">
                보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload New Resume */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#2a2a2a] border-dashed rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">📤</div>
        <h3 className="text-xl font-bold mb-2">새 이력서 업로드</h3>
        <p className="text-gray-400 mb-6">
          PDF, DOCX 파일 (최대 5MB) · 업로드 시 100 인사이트 획득
        </p>
        <button className="px-6 py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-full font-semibold hover:bg-[#a8d378] transition-colors">
          파일 선택하기
        </button>
      </div>
    </div>
  );
}
