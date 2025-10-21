export default function SettingsPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">설정</h1>
        <p className="text-gray-500">계정 및 앱 설정</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">계정</h3>
        <div className="space-y-2">
          <button className="w-full py-2 text-left text-gray-700 hover:text-gray-900">
            프로필 수정
          </button>
          <button className="w-full py-2 text-left text-gray-700 hover:text-gray-900">
            비밀번호 변경
          </button>
          <button className="w-full py-2 text-left text-red-600 hover:text-red-700">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
