import Link from 'next/link';

export default function InsightsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">인사이트 샵</h1>
        <p className="text-gray-500">프리미엄 전용 기능입니다</p>
      </div>

      {/* Locked Feature */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          인사이트 시스템
        </h2>
        <p className="text-gray-600 mb-6">
          질문에 답변하고 인사이트를 모아<br />
          프리미엄 콘텐츠를 해제하세요
        </p>

        <div className="bg-white rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            인사이트로 할 수 있는 것
          </h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>프리미엄 답변 해제 (200 인사이트)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>힌트 보기 (50 인사이트)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>추가 질문 3개 (500 인사이트)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>이력서 AI 분석 (1000 인사이트)</span>
            </li>
          </ul>
        </div>

        <Link
          href="/prototype3/pricing"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          프리미엄으로 시작하기
        </Link>
      </div>

      {/* Preview */}
      <div className="relative">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 opacity-40 blur-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <div className="font-medium text-gray-900">질문 힌트</div>
                <div className="text-sm text-gray-500">핵심 키워드 제공</div>
              </div>
              <div className="text-purple-600 font-semibold">50</div>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <div className="font-medium text-gray-900">프리미엄 답변</div>
                <div className="text-sm text-gray-500">전문가 모범 답변</div>
              </div>
              <div className="text-purple-600 font-semibold">200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
