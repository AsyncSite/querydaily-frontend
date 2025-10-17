import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">이력서 관리</h1>
        <p className="text-gray-500">이력서를 업로드하세요 (무료)</p>
      </div>

      {/* Upload - Free Feature */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-4">📄</div>
        <h3 className="font-semibold text-gray-900 mb-2">이력서 업로드</h3>
        <p className="text-sm text-gray-500 mb-4">
          PDF, DOCX (최대 5MB)
        </p>
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          파일 선택
        </button>
      </div>

      {/* AI Analysis - Locked */}
      <div className="relative">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 opacity-70 blur-[1px]">
          <h3 className="font-semibold text-gray-900 mb-3">AI 분석 결과</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-emerald-400 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">강점</h4>
              <p className="text-sm text-gray-600">
                Spring Boot 기반 백엔드 경력 명확...
              </p>
            </div>
            <div className="border-l-4 border-amber-400 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">보완점</h4>
              <p className="text-sm text-gray-600">
                분산 시스템 장애 처리 경험...
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-purple-200">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-bold text-gray-900 mb-2">AI 분석</h3>
            <p className="text-sm text-gray-600 mb-4">
              프리미엄 전용 기능입니다
            </p>
            <Link
              href="/prototype3/pricing"
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              업그레이드
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Info */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">
          프리미엄 AI 분석 기능
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>이력서 강점 & 보완점 분석</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>맞춤형 학습 주제 추천</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>면접 예상 질문 생성</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
