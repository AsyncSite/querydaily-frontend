import Link from 'next/link';

export default function MyPage() {
  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#2a2a2a] rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#c3e88d] to-[#a8d378] rounded-full flex items-center justify-center text-3xl font-bold text-[#0d0d0d]">
            홍
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">홍길동</h1>
            <p className="text-gray-400 mb-2">hong@example.com</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#c3e88d]/20 text-[#c3e88d] rounded-full text-sm font-medium">
                백엔드 3년차
              </span>
              <span className="px-3 py-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded-full text-sm">
                GROWTH_PLAN
              </span>
            </div>
          </div>
          <Link
            href="/prototype/settings"
            className="px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors"
          >
            프로필 수정
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📊 학습 통계</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl">
            <div className="text-3xl font-bold text-[#c3e88d] mb-1">23일</div>
            <div className="text-sm text-gray-400">총 학습일</div>
          </div>

          <div className="text-center p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl">
            <div className="text-3xl font-bold text-[#c3e88d] mb-1">14일</div>
            <div className="text-sm text-gray-400">최장 연속</div>
          </div>

          <div className="text-center p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl">
            <div className="text-3xl font-bold text-[#c3e88d] mb-1">2,350</div>
            <div className="text-sm text-gray-400">획득 인사이트</div>
          </div>

          <div className="text-center p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl">
            <div className="text-3xl font-bold text-[#c3e88d] mb-1">92%</div>
            <div className="text-sm text-gray-400">평균 정답률</div>
          </div>
        </div>

        {/* Activity Chart (Simplified) */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-400">최근 30일 활동</h3>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(28)].map((_, i) => (
              <div
                key={i}
                className={`h-12 rounded ${
                  i % 3 === 0
                    ? 'bg-[#c3e88d]'
                    : i % 2 === 0
                    ? 'bg-[#c3e88d]/50'
                    : 'bg-[#0d0d0d] border border-[#2a2a2a]'
                }`}
                title={`Day ${i + 1}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">🛒 구매 이력</h2>

        <div className="space-y-3">
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-semibold">GROWTH_PLAN (30일)</h3>
                  <p className="text-sm text-gray-400">진행중 · 23/30일 완료</p>
                </div>
              </div>
              <span className="text-[#c3e88d] font-semibold">₩79,000</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className="bg-[#c3e88d] h-2 rounded-full"
                style={{ width: '77%' }}
              ></div>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-semibold">CRITICAL_HIT</h3>
                  <p className="text-sm text-gray-400">완료 · 2025.01.05</p>
                </div>
              </div>
              <span className="text-gray-400 font-semibold">₩49,000</span>
            </div>
          </div>

          <Link
            href="/prototype/insights"
            className="block w-full py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-center hover:border-[#c3e88d] transition-colors"
          >
            + 새 상품 구매하기
          </Link>
        </div>
      </div>

      {/* Resume Management */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">📄 이력서 관리</h2>
          <Link
            href="/prototype/resume"
            className="text-[#c3e88d] hover:underline text-sm font-medium"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-semibold">resume_v3.pdf</h3>
                <p className="text-sm text-gray-400">
                  업로드: 2025.01.10 · 분석 완료 ✅
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#a8d378] transition-colors">
              분석 결과 보기
            </button>
          </div>
        </div>
      </div>

      {/* Insights & Achievements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">💡 인사이트</h2>
            <Link
              href="/prototype/insights"
              className="text-[#c3e88d] hover:underline text-sm font-medium"
            >
              샵 방문 →
            </Link>
          </div>

          <div className="text-center py-8">
            <div className="text-5xl font-bold text-[#c3e88d] mb-2">1,250</div>
            <p className="text-gray-400">보유 인사이트</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">총 획득</span>
              <span className="font-semibold">2,350</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">사용</span>
              <span className="font-semibold">1,100</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">🏆 뱃지</h2>
            <Link
              href="/prototype/achievements"
              className="text-[#c3e88d] hover:underline text-sm font-medium"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['🌟', '🔥', '📚', '💪', '🎯'].map((emoji, i) => (
              <div
                key={i}
                className="aspect-square bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-3xl"
              >
                {emoji}
              </div>
            ))}
            <div className="aspect-square bg-[#0d0d0d] border border-[#2a2a2a] border-dashed rounded-xl flex items-center justify-center text-2xl text-gray-600">
              +3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
