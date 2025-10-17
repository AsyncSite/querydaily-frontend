import Link from 'next/link';

export default function MyPageV10() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl border-2 border-yellow-400">
            ⚔️
          </div>
          <div className="flex-1">
            <div className="text-sm opacity-90 mb-1">Level 15</div>
            <div className="text-2xl font-bold mb-1">김개발</div>
            <div className="text-sm text-yellow-400">🏅 Gold Tier</div>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
            프로필 편집
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/30">
          <div className="text-center">
            <div className="text-2xl font-bold">1,245</div>
            <div className="text-xs opacity-80">Total EXP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">#15</div>
            <div className="text-xs opacity-80">순위</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">78%</div>
            <div className="text-xs opacity-80">승률</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs opacity-80">연승</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="font-bold text-white mb-4">📊 전체 통계</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center">
            <div className="text-2xl font-bold mb-1">234</div>
            <div className="text-xs opacity-90">총 플레이</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white text-center">
            <div className="text-2xl font-bold mb-1">183</div>
            <div className="text-xs opacity-90">정답</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-4 text-white text-center">
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-xs opacity-90">최고 연승</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white text-center">
            <div className="text-2xl font-bold mb-1">45</div>
            <div className="text-xs opacity-90">연속 일수</div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">⬆️ 레벨 진행도</h3>
          <span className="text-sm text-yellow-400">Level 15 → 16</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">1,245 / 2,000 EXP</span>
            <span className="text-sm font-medium text-yellow-400">62%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>

        <div className="text-sm text-gray-400 text-center">
          755 EXP 남음 • 예상 소요: 약 3일
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">🏆 업적</h3>
          <span className="text-sm text-yellow-400">23 / 50</span>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { icon: '🔥', name: '연속 3일', unlocked: true },
            { icon: '⚡', name: '완벽 답변', unlocked: true },
            { icon: '🎯', name: '10연승', unlocked: true },
            { icon: '👑', name: 'Top 10%', unlocked: true },
            { icon: '💎', name: 'Gold 달성', unlocked: true },
            { icon: '📚', name: '100문제', unlocked: true },
            { icon: '⏰', name: '빠른 답변', unlocked: false },
            { icon: '🌟', name: 'Platinum', unlocked: false }
          ].map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`w-14 h-14 bg-gradient-to-br ${
                badge.unlocked
                  ? 'from-yellow-500 to-orange-500'
                  : 'from-gray-700 to-gray-800'
              } rounded-full flex items-center justify-center text-2xl mx-auto mb-2 border-2 ${
                badge.unlocked ? 'border-yellow-400' : 'border-gray-700'
              }`}>
                {badge.icon}
              </div>
              <div className={`text-xs ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>
                {badge.name}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/prototype10/achievements"
          className="block w-full py-2.5 bg-gray-700 text-white text-center rounded-xl font-medium hover:bg-gray-600 transition-colors text-sm"
        >
          전체 업적 보기
        </Link>
      </div>

      {/* Difficulty Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="font-bold text-white mb-4">🎯 난이도별 성적</h3>

        <div className="space-y-4">
          {[
            { tier: 'Bronze', wins: 45, total: 50, color: 'orange', winRate: 90 },
            { tier: 'Silver', wins: 38, total: 52, color: 'gray', winRate: 73 },
            { tier: 'Gold', wins: 28, total: 42, color: 'yellow', winRate: 67 },
            { tier: 'Platinum', wins: 0, total: 0, color: 'cyan', winRate: 0, locked: true }
          ].map((item) => (
            <div key={item.tier}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white flex items-center gap-2">
                  {item.tier}
                  {item.locked && <span className="text-xs text-gray-500">🔒</span>}
                </span>
                <span className="text-sm text-gray-400">
                  {item.wins}/{item.total} ({item.winRate}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-${item.color}-500 h-2 rounded-full`}
                  style={{ width: `${item.winRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Upgrade */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">👑</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">Pro 멤버십</h4>
            <ul className="text-sm text-white/90 mb-4 space-y-1">
              <li>✓ 무제한 도전 기회</li>
              <li>✓ 2배 빠른 EXP 획득</li>
              <li>✓ 전용 배지 및 아바타</li>
              <li>✓ PC Tournament 참여권</li>
            </ul>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              월 9,900원 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
