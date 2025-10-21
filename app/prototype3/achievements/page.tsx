import Link from 'next/link';

export default function AchievementsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">뱃지 & 도전과제</h1>
        <p className="text-gray-500">프리미엄 전용 기능입니다</p>
      </div>

      {/* Locked Feature */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          뱃지 & 도전과제
        </h2>
        <p className="text-gray-600 mb-6">
          학습을 통해 뱃지를 모으고<br />
          도전과제를 달성하세요
        </p>

        <div className="bg-white rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">포함된 기능</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>학습 마일스톤 뱃지 수집</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>도전과제 달성 시 인사이트 보상</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>연속 학습 기록 추적</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>전체 학습 통계 확인</span>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-40 blur-sm">
          <h3 className="font-semibold text-gray-900 mb-4">획득 뱃지</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center"
              >
                <div className="text-3xl">🏆</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
