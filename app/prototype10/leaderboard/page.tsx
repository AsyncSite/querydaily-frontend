import Link from 'next/link';

export default function LeaderboardPage() {
  const topPlayers = [
    { rank: 1, name: '면접왕김철수', level: 28, score: 3456, tier: 'Platinum', avatar: '👑', streak: 45 },
    { rank: 2, name: '백엔드마스터', level: 26, score: 3234, tier: 'Gold', avatar: '⚔️', streak: 32 },
    { rank: 3, name: '코딩천재', level: 25, score: 3012, tier: 'Gold', avatar: '🎯', streak: 28 },
    { rank: 4, name: 'Spring고수', level: 24, score: 2890, tier: 'Gold', avatar: '🌱', streak: 25 },
    { rank: 5, name: 'JPA마스터', level: 23, score: 2756, tier: 'Gold', avatar: '💎', streak: 22 },
    { rank: 6, name: '알고리즘왕', level: 22, score: 2634, tier: 'Gold', avatar: '🧮', streak: 20 },
    { rank: 7, name: 'DB전문가', level: 21, score: 2512, tier: 'Silver', avatar: '🗄️', streak: 18 },
    { rank: 8, name: '네트워크짱', level: 20, score: 2398, tier: 'Silver', avatar: '🌐', streak: 15 },
    { rank: 9, name: '자바고인', level: 19, score: 2276, tier: 'Silver', avatar: '☕', streak: 14 },
    { rank: 10, name: '면접준비중', level: 18, score: 2154, tier: 'Silver', avatar: '📚', streak: 12 }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-cyan-500 to-blue-500';
      case 'Gold':
        return 'from-yellow-500 to-orange-500';
      case 'Silver':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-orange-600 to-red-600';
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">랭킹</h1>
        <p className="text-gray-400 text-sm">
          이번 주 최고의 플레이어들
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['이번 주', '이번 달', '전체 기간'].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              period === '이번 주'
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-3">
        {[topPlayers[1], topPlayers[0], topPlayers[2]].map((player, index) => (
          <div
            key={player.rank}
            className={`bg-gray-800 rounded-2xl p-4 text-center border-2 ${
              player.rank === 1
                ? 'border-yellow-400'
                : player.rank === 2
                ? 'border-gray-400'
                : 'border-orange-600'
            }`}
          >
            <div className={`text-4xl mb-2 ${index === 1 ? 'text-5xl -mt-6' : ''}`}>
              {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br ${getTierColor(player.tier)} rounded-full flex items-center justify-center text-2xl mx-auto mb-2 ${
              index === 1 ? 'w-16 h-16' : ''
            }`}>
              {player.avatar}
            </div>
            <div className={`font-bold text-white mb-1 ${index === 1 ? 'text-lg' : 'text-sm'}`}>
              {player.name}
            </div>
            <div className="text-xs text-gray-400 mb-1">Lv.{player.level}</div>
            <div className={`font-bold ${
              player.rank === 1
                ? 'text-yellow-400'
                : player.rank === 2
                ? 'text-gray-400'
                : 'text-orange-500'
            }`}>
              {player.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Rankings 4-10 */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="space-y-3">
          {topPlayers.slice(3).map((player) => (
            <div
              key={player.rank}
              className="flex items-center gap-3 p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <div className="text-lg font-bold text-gray-400 w-8 text-center">
                #{player.rank}
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${getTierColor(player.tier)} rounded-full flex items-center justify-center text-xl`}>
                {player.avatar}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">{player.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>Lv.{player.level}</span>
                  <span className="text-yellow-500">{player.tier}</span>
                  <span>🔥 {player.streak}일</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{player.score.toLocaleString()}</div>
                <div className="text-xs text-gray-400">EXP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Rank */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">#15</div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
            ⚔️
          </div>
          <div className="flex-1">
            <div className="font-bold">김개발 (나)</div>
            <div className="text-sm opacity-90">Lv.15 • Gold</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">1,245</div>
            <div className="text-xs opacity-90">EXP</div>
          </div>
        </div>
        <div className="mt-4 text-sm opacity-90 text-center">
          Top 10까지 2,211 EXP 차이 • 계속 도전하세요! 🔥
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="font-bold text-white mb-4">🏆 티어 분포</h3>

        <div className="space-y-3">
          {[
            { tier: 'Platinum', count: 125, percent: 2, color: 'cyan' },
            { tier: 'Gold', count: 1234, percent: 15, color: 'yellow' },
            { tier: 'Silver', count: 3456, percent: 40, color: 'gray' },
            { tier: 'Bronze', count: 3712, percent: 43, color: 'orange' }
          ].map((item) => (
            <div key={item.tier}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{item.tier}</span>
                <span className="text-sm text-gray-400">
                  {item.count.toLocaleString()} 명 ({item.percent}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-${item.color}-500 h-2 rounded-full`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
