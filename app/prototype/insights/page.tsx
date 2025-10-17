export default function InsightsPage() {
  const unlockableContent = [
    {
      id: 1,
      title: '프리미엄 답변',
      description: 'AI 전문가의 상세 분석과 개선 제안',
      insights: 500,
      icon: '💎',
      category: 'premium',
    },
    {
      id: 2,
      title: '실전 모의 면접',
      description: '실시간 피드백과 함께하는 모의 면접',
      insights: 1000,
      icon: '🎤',
      category: 'mock',
    },
    {
      id: 3,
      title: '커리어 로드맵',
      description: '맞춤형 성장 계획 및 학습 경로',
      insights: 750,
      icon: '🗺️',
      category: 'career',
    },
    {
      id: 4,
      title: '심화 질문 팩',
      description: '고난도 심화 질문 10개 추가',
      insights: 300,
      icon: '📦',
      category: 'content',
    },
    {
      id: 5,
      title: '면접 스크립트',
      description: '완벽한 답변을 위한 템플릿',
      insights: 400,
      icon: '📜',
      category: 'content',
    },
    {
      id: 6,
      title: '기술 트렌드 분석',
      description: '최신 기술 동향과 면접 출제 경향',
      insights: 600,
      icon: '📊',
      category: 'analysis',
    },
  ];

  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#c3e88d]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">💡 인사이트 샵</h1>
            <p className="text-gray-400">인사이트로 프리미엄 콘텐츠를 잠금 해제하세요</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#c3e88d]">1,250</div>
            <div className="text-sm text-gray-400">보유 인사이트</div>
          </div>
        </div>
      </div>

      {/* Insights History */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">📈 인사이트 내역</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#c3e88d] mb-1">2,350</div>
            <div className="text-sm text-gray-400">총 획득</div>
          </div>
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-400 mb-1">1,100</div>
            <div className="text-sm text-gray-400">사용</div>
          </div>
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#c3e88d] mb-1">1,250</div>
            <div className="text-sm text-gray-400">잔액</div>
          </div>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[
            { action: '질문 답변 완료', insights: '+50', date: '10분 전' },
            { action: '프리미엄 답변 해제', insights: '-500', date: '1시간 전' },
            { action: '7일 연속 학습 달성', insights: '+200', date: '어제' },
            { action: '이력서 업데이트', insights: '+100', date: '2일 전' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0"
            >
              <div>
                <div className="text-sm font-medium">{item.action}</div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  item.insights.startsWith('+')
                    ? 'text-[#c3e88d]'
                    : 'text-gray-400'
                }`}
              >
                {item.insights}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Content */}
      <div>
        <h2 className="text-xl font-bold mb-4">🔓 잠금 해제 가능한 콘텐츠</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockableContent.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c3e88d]/50 transition-colors"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-[#c3e88d]">
                  {item.insights}
                </span>
                <span className="text-sm text-gray-500">인사이트</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  1250 >= item.insights
                    ? 'bg-[#c3e88d] text-[#0d0d0d] hover:bg-[#a8d378]'
                    : 'bg-[#0d0d0d] border border-[#2a2a2a] text-gray-500 cursor-not-allowed'
                }`}
                disabled={1250 < item.insights}
              >
                {1250 >= item.insights ? '잠금 해제' : '인사이트 부족'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Insights */}
      <div className="bg-gradient-to-r from-[#c3e88d]/10 to-[#a8d378]/10 border border-[#c3e88d]/30 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">🌟 인사이트 획득 방법</h2>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            { action: '질문 답변 완료', insights: '+50' },
            { action: '7일 연속 학습', insights: '+200' },
            { action: '이력서 업데이트', insights: '+100' },
            { action: '친구 초대 성공', insights: '+500' },
            { action: '후기 작성', insights: '+150' },
            { action: '도전과제 달성', insights: '+100~500' },
          ].map((method, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-3"
            >
              <span className="text-sm">{method.action}</span>
              <span className="text-sm font-bold text-[#c3e88d]">
                {method.insights}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
