export default function AchievementsPage() {
  const badges = [
    { name: '첫 질문 완료', emoji: '🎯', unlocked: true },
    { name: '7일 연속', emoji: '🔥', unlocked: true },
    { name: '30일 완주', emoji: '🏆', unlocked: false },
    { name: '100문제 달성', emoji: '💯', unlocked: false },
    { name: '전문가 등급', emoji: '⭐', unlocked: false },
  ];

  const challenges = [
    {
      name: '30일 연속 학습',
      current: 7,
      target: 30,
      reward: '500 인사이트',
    },
    {
      name: '100문제 완료',
      current: 23,
      target: 100,
      reward: '1000 인사이트',
    },
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">뱃지 & 도전과제</h1>
        <p className="text-gray-500">학습 성과를 확인하세요</p>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">획득 뱃지</h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100'
                  : 'bg-gray-50 border border-gray-100 opacity-40'
              }`}
            >
              <div className="text-3xl mb-2">{badge.emoji}</div>
              <div className="text-xs text-center text-gray-600 px-2">
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">진행중 도전과제</h3>
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const progress = (challenge.current / challenge.target) * 100;
            return (
              <div key={challenge.name}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">
                      {challenge.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {challenge.reward}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-indigo-600">
                    {challenge.current}/{challenge.target}
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <h3 className="font-semibold text-gray-900 mb-4">전체 통계</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">5개</div>
            <div className="text-sm text-gray-600">획득 뱃지</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">2개</div>
            <div className="text-sm text-gray-600">진행 도전</div>
          </div>
        </div>
      </div>
    </div>
  );
}
