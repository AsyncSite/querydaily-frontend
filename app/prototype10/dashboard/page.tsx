import Link from 'next/link';

export default function DashboardPageV10() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Player Card */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl border-2 border-yellow-400">
              ⚔️
            </div>
            <div>
              <div className="text-sm opacity-90">Level 15</div>
              <div className="text-2xl font-bold">김개발</div>
              <div className="text-sm text-yellow-400">🏅 Gold Tier</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-90">EXP</div>
            <div className="text-lg font-bold">1,245 / 2,000</div>
          </div>
        </div>

        <div className="w-full bg-white/30 rounded-full h-3 mb-2">
          <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '62%' }}></div>
        </div>
        <div className="text-xs opacity-90 text-right">755 EXP until Level 16</div>
      </div>

      {/* Daily Challenge */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">🎯 Daily Challenge</div>
            <div className="text-xl font-bold">3문제 연속 정답</div>
          </div>
          <div className="text-4xl">🔥</div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i <= 2 ? 'bg-white' : 'bg-white/30'
              }`}
            ></div>
          ))}
        </div>

        <div className="text-sm opacity-90 mb-3">2/3 완료 | 남은 시간: 3시간 15분</div>

        <Link
          href="/prototype10/battle"
          className="block w-full py-2.5 bg-white text-orange-600 text-center rounded-xl font-bold hover:bg-yellow-50 transition-colors"
        >
          도전하기 +100 EXP
        </Link>
      </div>

      {/* Quick Play */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/prototype10/battle?mode=easy"
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
        >
          <div className="text-3xl mb-2">🌱</div>
          <div className="font-bold mb-1">Bronze</div>
          <div className="text-xs opacity-90">초급 난이도</div>
          <div className="text-xs opacity-90 mt-2">+50 EXP</div>
        </Link>

        <Link
          href="/prototype10/battle?mode=medium"
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
        >
          <div className="text-3xl mb-2">💎</div>
          <div className="font-bold mb-1">Silver</div>
          <div className="text-xs opacity-90">중급 난이도</div>
          <div className="text-xs opacity-90 mt-2">+100 EXP</div>
        </Link>

        <Link
          href="/prototype10/battle?mode=hard"
          className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all"
        >
          <div className="text-3xl mb-2">🏆</div>
          <div className="font-bold mb-1">Gold</div>
          <div className="text-xs opacity-90">고급 난이도</div>
          <div className="text-xs opacity-90 mt-2">+200 EXP</div>
        </Link>

        <div className="bg-gray-800 rounded-2xl p-6 text-gray-500 border-2 border-gray-700">
          <div className="text-3xl mb-2 opacity-50">💠</div>
          <div className="font-bold mb-1">Platinum</div>
          <div className="text-xs opacity-70">최고급</div>
          <div className="text-xs opacity-70 mt-2">🔒 Level 20</div>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">🏆 이번 주 랭킹</h3>
          <Link href="/prototype10/leaderboard" className="text-sm text-red-500">
            전체 보기 →
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { rank: 1, name: '면접왕김철수', score: 3456, avatar: '👑' },
            { rank: 2, name: '백엔드마스터', score: 3234, avatar: '⚔️' },
            { rank: 3, name: '코딩천재', score: 3012, avatar: '🎯' },
            { rank: 15, name: '김개발 (나)', score: 1245, avatar: '⚔️', isMe: true }
          ].map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                player.isMe
                  ? 'bg-red-900/30 border-2 border-red-500'
                  : 'bg-gray-700'
              }`}
            >
              <div className={`text-lg font-bold ${player.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                #{player.rank}
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                {player.avatar}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${player.isMe ? 'text-red-400' : 'text-white'}`}>
                  {player.name}
                </div>
                <div className="text-xs text-gray-400">{player.score.toLocaleString()} EXP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="font-bold text-white mb-4">🎖️ 최근 획득 배지</h3>

        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '🔥', name: '연속 3일', color: 'from-orange-500 to-red-500' },
            { icon: '⚡', name: '완벽 답변', color: 'from-yellow-500 to-orange-500' },
            { icon: '🎯', name: '10연승', color: 'from-blue-500 to-indigo-500' },
            { icon: '👑', name: 'Top 10%', color: 'from-purple-500 to-pink-500' }
          ].map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`w-14 h-14 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-2`}>
                {badge.icon}
              </div>
              <div className="text-xs text-gray-400">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">👑</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">Pro Member</h4>
            <p className="text-sm text-white/90 mb-4">
              무제한 도전, 2배 빠른 성장, 전용 배지, PC Tournament 참여
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              Pro 가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
