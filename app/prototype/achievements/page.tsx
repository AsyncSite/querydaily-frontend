export default function AchievementsPage() {
  const badges = [
    { id: 1, name: '첫 학습 완료', emoji: '🌟', earned: true, date: '2024.12.20' },
    { id: 2, name: '7일 연속 학습', emoji: '🔥', earned: true, date: '2025.01.05' },
    { id: 3, name: '이력서 업로드', emoji: '📄', earned: true, date: '2025.01.10' },
    { id: 4, name: '30일 완주', emoji: '🏁', earned: false, progress: 23, total: 30 },
    { id: 5, name: '질문 마스터', emoji: '📚', earned: false, progress: 23, total: 50 },
    { id: 6, name: '인사이트 부자', emoji: '💰', earned: false, progress: 1250, total: 5000 },
    { id: 7, name: '완벽한 답변', emoji: '💯', earned: false, progress: 3, total: 10 },
    { id: 8, name: '커뮤니티 스타', emoji: '⭐', earned: false, progress: 0, total: 20 },
  ];

  const challenges = [
    {
      id: 1,
      title: '이번 주 목표: 5일 연속 학습',
      progress: 4,
      total: 5,
      reward: '+300 인사이트, 뱃지 획득',
      deadline: '3일 남음',
      active: true,
    },
    {
      id: 2,
      title: '심화 질문 10개 완료',
      progress: 7,
      total: 10,
      reward: '+500 인사이트',
      deadline: '7일 남음',
      active: true,
    },
    {
      id: 3,
      title: '친구 3명 초대',
      progress: 1,
      total: 3,
      reward: '+1,000 인사이트',
      deadline: '기한 없음',
      active: false,
    },
  ];

  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#2a2a2a] rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-1">🏆 뱃지 & 도전과제</h1>
        <p className="text-gray-400">목표를 달성하고 뱃지를 획득하세요</p>
      </div>

      {/* Progress Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-[#c3e88d] mb-2">5</div>
          <div className="text-sm text-gray-400">획득한 뱃지</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-[#c3e88d] mb-2">2</div>
          <div className="text-sm text-gray-400">진행중인 도전과제</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-[#c3e88d] mb-2">63%</div>
          <div className="text-sm text-gray-400">전체 달성률</div>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">🎯 진행중인 도전과제</h2>

        <div className="space-y-4">
          {challenges
            .filter((c) => c.active)
            .map((challenge) => (
              <div
                key={challenge.id}
                className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{challenge.title}</h3>
                    <p className="text-sm text-gray-400">보상: {challenge.reward}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#c3e88d]/20 text-[#c3e88d] rounded-full text-xs font-semibold">
                    {challenge.deadline}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">진행률</span>
                    <span className="font-semibold">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#c3e88d] to-[#a8d378] h-3 rounded-full transition-all"
                      style={{
                        width: `${(challenge.progress / challenge.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">🏅 나의 뱃지</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-xl p-6 text-center transition-all ${
                badge.earned
                  ? 'bg-gradient-to-br from-[#c3e88d]/20 to-[#a8d378]/20 border border-[#c3e88d]/50'
                  : 'bg-[#0d0d0d] border border-[#2a2a2a] opacity-50'
              }`}
            >
              <div className="text-5xl mb-3">{badge.emoji}</div>
              <h3 className="font-semibold mb-2">{badge.name}</h3>

              {badge.earned ? (
                <p className="text-xs text-gray-400">획득: {badge.date}</p>
              ) : (
                <div>
                  <p className="text-xs text-gray-400 mb-2">
                    {badge.progress}/{badge.total}
                  </p>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div
                      className="bg-[#c3e88d] h-2 rounded-full"
                      style={{
                        width: `${(badge.progress! / badge.total!) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Challenges */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📋 모든 도전과제</h2>

        <div className="space-y-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{challenge.title}</h3>
                  <p className="text-sm text-gray-400">보상: {challenge.reward}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-[#c3e88d]">
                    {challenge.progress}/{challenge.total}
                  </div>
                  <div className="text-xs text-gray-500">{challenge.deadline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
