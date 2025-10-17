export default function SettingsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">설정</h1>
        <p className="text-gray-500">계정 및 서비스 설정</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">프로필</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">이름</label>
            <input
              type="text"
              value="홍길동"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">이메일</label>
            <input
              type="email"
              value="hong@example.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">알림 설정</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">일일 질문 알림</div>
              <div className="text-sm text-gray-500">매일 오전 9시</div>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">학습 리마인더</div>
              <div className="text-sm text-gray-500">미답변 질문 알림</div>
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">구독 관리</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium text-gray-900">GROWTH_PLAN</div>
            <div className="text-sm text-gray-500">₩79,000 / 30일</div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium">
            진행중
          </span>
        </div>
        <button className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          구독 관리
        </button>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">계정</h3>
        <div className="space-y-2">
          <button className="w-full py-2 text-left text-gray-700 hover:text-gray-900">
            비밀번호 변경
          </button>
          <button className="w-full py-2 text-left text-red-600 hover:text-red-700">
            계정 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
