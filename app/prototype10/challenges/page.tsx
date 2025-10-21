import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">챌린지</h1>
        <p className="text-gray-400 text-sm">
          도전과제를 완료하고 보상을 받으세요
        </p>
      </div>

      {/* Daily Challenges */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">🔥 데일리 챌린지</h3>
          <span className="text-sm text-yellow-400">3시간 15분 남음</span>
        </div>

        <div className="space-y-3">
          {[
            { task: '문제 3개 풀기', progress: 2, total: 3, reward: 100, done: false },
            { task: '연속 정답 5개', progress: 5, total: 5, reward: 150, done: true },
            { task: 'Gold 난이도 1회', progress: 0, total: 1, reward: 200, done: false }
          ].map((challenge, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                challenge.done
                  ? 'bg-emerald-900/30 border-2 border-emerald-500'
                  : 'bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{challenge.done ? '✅' : '🎯'}</span>
                  <span className={`font-medium ${challenge.done ? 'text-emerald-400 line-through' : 'text-white'}`}>
                    {challenge.task}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <span>⭐</span>
                  <span>+{challenge.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-600 rounded-full h-2">
                  <div
                    className={`${challenge.done ? 'bg-emerald-500' : 'bg-yellow-400'} h-2 rounded-full`}
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  {challenge.progress}/{challenge.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">🏆 주간 챌린지</h3>
          <span className="text-sm text-blue-400">3일 23시간 남음</span>
        </div>

        <div className="space-y-3">
          {[
            { task: '총 20문제 풀기', progress: 15, total: 20, reward: 500 },
            { task: '승률 70% 달성', progress: 65, total: 70, reward: 800 },
            { task: '연속 승리 10회', progress: 7, total: 10, reward: 1000 }
          ].map((challenge, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{challenge.task}</span>
                <div className="flex items-center gap-1 text-blue-400 text-sm font-bold">
                  <span>⭐</span>
                  <span>+{challenge.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  {challenge.progress}/{challenge.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Challenges */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">✨ 스페셜 챌린지</h3>
          <span className="text-sm opacity-90">한정 기간</span>
        </div>

        <div className="space-y-3">
          {[
            { task: '주말 마라톤 (50문제)', progress: 12, total: 50, reward: 2000, premium: false },
            { task: 'Platinum 난이도 3회', progress: 0, total: 3, reward: 3000, premium: true }
          ].map((challenge, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                challenge.premium
                  ? 'bg-white/20 border-2 border-yellow-400'
                  : 'bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{challenge.task}</span>
                  {challenge.premium && (
                    <span className="px-2 py-0.5 bg-yellow-400 text-purple-900 text-xs rounded-full font-bold">
                      PRO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <span>⭐</span>
                  <span>+{challenge.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/30 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs opacity-90">
                  {challenge.progress}/{challenge.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Pass Preview */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="font-bold text-white mb-4">🎁 시즌 패스</h3>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                level <= 3
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                  : 'bg-gray-700 opacity-50'
              }`}
            >
              <div className="text-xl mb-1">{level <= 3 ? '🎁' : '🔒'}</div>
              <div className="text-xs text-white font-bold">{level}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            시즌 패스 구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
