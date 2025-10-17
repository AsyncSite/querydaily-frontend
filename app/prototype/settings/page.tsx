import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className=" px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">⚙️ 설정</h1>
          <p className="text-gray-400">계정 및 알림 설정을 관리하세요</p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">👤 프로필 설정</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">이름</label>
            <input
              type="text"
              defaultValue="홍길동"
              className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">이메일</label>
            <input
              type="email"
              defaultValue="hong@example.com"
              className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">이메일은 변경할 수 없습니다</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">경력 레벨</label>
            <select className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors">
              <option>신입 (1년 미만)</option>
              <option>주니어 (1-3년)</option>
              <option selected>미들 (3-5년)</option>
              <option>시니어 (5년 이상)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">기술 스택</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Java',
                'Spring',
                'JPA',
                'MySQL',
                'Redis',
                'Kafka',
                'Docker',
                'AWS',
              ].map((tech) => (
                <button
                  key={tech}
                  className="px-3 py-1.5 text-sm bg-[#c3e88d]/20 border border-[#c3e88d] text-[#c3e88d] rounded-full hover:bg-[#c3e88d] hover:text-[#0d0d0d] transition-colors"
                >
                  {tech} ✕
                </button>
              ))}
              <button className="px-3 py-1.5 text-sm bg-[#0d0d0d] border border-[#2a2a2a] rounded-full hover:border-[#c3e88d] transition-colors">
                + 추가
              </button>
            </div>
          </div>

          <button className="w-full py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#a8d378] transition-colors">
            변경사항 저장
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">🔔 알림 설정</h2>

        <div className="space-y-4">
          {[
            {
              title: '질문 도착 알림',
              description: '새로운 질문이 도착하면 알림을 받습니다',
              enabled: true,
            },
            {
              title: '학습 리마인더',
              description: '매일 아침 9시에 학습 알림을 받습니다',
              enabled: true,
            },
            {
              title: '인사이트 획득 알림',
              description: '인사이트를 획득하면 알림을 받습니다',
              enabled: false,
            },
            {
              title: '도전과제 달성 알림',
              description: '도전과제를 달성하면 알림을 받습니다',
              enabled: true,
            },
            {
              title: '마케팅 알림',
              description: '새로운 기능 및 프로모션 소식을 받습니다',
              enabled: false,
            },
          ].map((setting, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium mb-1">{setting.title}</h3>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c3e88d]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">📚 학습 환경 설정</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              질문 배달 시간
            </label>
            <select className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors">
              <option>매일 오전 9시</option>
              <option>매일 오전 10시</option>
              <option>매일 오후 6시</option>
              <option>매일 오후 8시</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">난이도 조절</label>
            <select className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg focus:border-[#c3e88d] focus:outline-none transition-colors">
              <option>쉬움 (기본 개념 위주)</option>
              <option selected>보통 (실무 중심)</option>
              <option>어려움 (심화 질문)</option>
              <option>자동 조절 (실력에 맞춤)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              관심 주제 (선택)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                '백엔드',
                '프론트엔드',
                '인프라',
                '데이터베이스',
                'MSA',
                '보안',
              ].map((topic) => (
                <button
                  key={topic}
                  className="px-3 py-1.5 text-sm bg-[#0d0d0d] border border-[#2a2a2a] rounded-full hover:border-[#c3e88d] transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">💳 구독 관리</h2>

        <div className="bg-[#0d0d0d] border border-[#c3e88d]/50 rounded-xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">GROWTH_PLAN (30일)</h3>
              <p className="text-sm text-gray-400">다음 결제: 2025.02.10</p>
            </div>
            <span className="px-4 py-2 bg-[#c3e88d]/20 text-[#c3e88d] rounded-lg font-semibold">
              진행중
            </span>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg hover:border-[#c3e88d] transition-colors">
              플랜 변경
            </button>
            <button className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-red-400 hover:border-red-400 transition-colors">
              구독 취소
            </button>
          </div>
        </div>

        <Link
          href="/prototype/insights"
          className="block w-full py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-lg font-semibold text-center hover:bg-[#a8d378] transition-colors"
        >
          새 상품 구매하기
        </Link>
      </div>

      {/* Account Management */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">🔒 계정 관리</h2>

        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-left hover:border-[#c3e88d] transition-colors">
            비밀번호 변경
          </button>
          <button className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-left hover:border-[#c3e88d] transition-colors">
            연결된 계정 관리
          </button>
          <button className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-left hover:border-[#c3e88d] transition-colors">
            데이터 다운로드
          </button>
          <button className="w-full px-4 py-3 bg-[#0d0d0d] border border-red-500/50 text-red-400 rounded-lg text-left hover:border-red-500 transition-colors">
            회원 탈퇴
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="flex gap-3">
        <Link
          href="/prototype/auth/login"
          className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-center hover:border-[#c3e88d] transition-colors"
        >
          로그아웃
        </Link>
        <Link
          href="/prototype"
          className="flex-1 px-4 py-3 bg-[#c3e88d] text-[#0d0d0d] rounded-lg text-center font-semibold hover:bg-[#a8d378] transition-colors"
        >
          프로토타입 홈으로
        </Link>
      </div>
    </div>
  );
}
