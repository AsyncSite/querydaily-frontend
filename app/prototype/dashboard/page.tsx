import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className=" px-4 py-6 space-y-6">
      {/* User Greeting & Streak */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#c3e88d]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              👋 안녕하세요, <span className="text-[#c3e88d]">철수님</span>
            </h1>
            <p className="text-gray-400">오늘도 면접 준비 화이팅! 🔥</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#c3e88d]">7일</div>
            <div className="text-sm text-gray-400">연속 학습</div>
          </div>
        </div>
      </div>

      {/* Today's Question */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">📬 오늘의 질문</h2>
          <span className="text-sm text-gray-500">10분 전 도착</span>
        </div>

        <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💬</span>
            <div className="flex-1">
              <p className="text-lg font-medium mb-2">
                Spring AOP를 사용하여 로깅을 구현할 때, 어떤 어노테이션을
                사용하고 어떻게 동작하나요?
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>🏷️ Spring</span>
                <span>🏷️ AOP</span>
                <span>🏷️ 로깅</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#a8d378] transition-colors">
              답변 작성하기
            </button>
            <button className="px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
              💡 힌트 보기 (50 인사이트)
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center">
          💡 답변을 완료하면 <span className="text-[#c3e88d] font-semibold">50 인사이트</span>를 획득합니다
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">📊 학습 현황</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">23/30</div>
            <div className="text-sm text-gray-400">완료일</div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-3xl mb-2 text-[#c3e88d]">77%</div>
            <div className="text-sm text-gray-400">진도율</div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💡 1,250</div>
            <div className="text-sm text-gray-400">보유 인사이트</div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🏆 5</div>
            <div className="text-sm text-gray-400">획득 뱃지</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">GROWTH_PLAN 진행중</span>
            <span className="text-[#c3e88d]">77%</span>
          </div>
          <div className="w-full bg-[#0d0d0d] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#c3e88d] to-[#a8d378] h-3 rounded-full transition-all"
              style={{ width: '77%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">⚡ 빠른 메뉴</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/prototype/learning"
            className="flex flex-col items-center gap-2 p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl hover:border-[#c3e88d] transition-colors"
          >
            <span className="text-3xl">📚</span>
            <span className="text-sm font-medium">학습 기록</span>
          </Link>

          <Link
            href="/prototype/resume"
            className="flex flex-col items-center gap-2 p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl hover:border-[#c3e88d] transition-colors"
          >
            <span className="text-3xl">📄</span>
            <span className="text-sm font-medium">이력서 관리</span>
          </Link>

          <Link
            href="/prototype/insights"
            className="flex flex-col items-center gap-2 p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl hover:border-[#c3e88d] transition-colors"
          >
            <span className="text-3xl">💡</span>
            <span className="text-sm font-medium">인사이트 샵</span>
          </Link>

          <Link
            href="/prototype/achievements"
            className="flex flex-col items-center gap-2 p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl hover:border-[#c3e88d] transition-colors"
          >
            <span className="text-3xl">🏆</span>
            <span className="text-sm font-medium">뱃지 현황</span>
          </Link>
        </div>
      </div>

      {/* Next Unlock */}
      <div className="bg-gradient-to-r from-[#c3e88d]/10 to-[#a8d378]/10 border border-[#c3e88d]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">🔒 다음 잠금 해제까지</h3>
            <p className="text-sm text-gray-400">
              프리미엄 답변 해제 (500 인사이트 필요)
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#c3e88d]">1,250 / 500</div>
            <div className="text-sm text-gray-400">달성 완료! ✅</div>
          </div>
        </div>

        <div className="mt-4 w-full bg-[#0d0d0d] rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[#c3e88d] to-[#a8d378] h-3 rounded-full"
            style={{ width: '100%' }}
          ></div>
        </div>

        <Link
          href="/prototype/insights"
          className="mt-4 block w-full py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-full font-semibold text-center hover:bg-[#a8d378] transition-colors"
        >
          지금 바로 해제하기 →
        </Link>
      </div>
    </div>
  );
}
