import Link from 'next/link';

export default function DashboardPageV9() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Interview Date */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center">
        <div className="text-sm opacity-90 mb-2">Kakao 백엔드 면접일</div>
        <div className="text-4xl font-bold mb-1">D-15</div>
        <div className="text-sm opacity-90">2025년 11월 2일</div>
        <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
          면접 일정 변경
        </button>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">준비 현황</h3>
          <span className="text-sm text-blue-600 font-medium">65% 완료</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: '65%' }}></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">13/20</div>
            <div className="text-xs text-gray-600">답변 작성</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">5/10</div>
            <div className="text-xs text-gray-600">모의 면접</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-xs text-gray-600">체크리스트</div>
          </div>
        </div>
      </div>

      {/* My Prep Boards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">📁 내 준비 보드</h3>
          <button className="text-blue-600 text-sm font-medium">+ 새 보드</button>
        </div>

        <div className="space-y-3">
          <Link
            href="/prototype9/scenarios/junior-backend"
            className="block p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-gray-900">신입 백엔드 필수</div>
              <span className="text-sm text-blue-600">13/20</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">Spring</span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">JPA</span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">DB</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </Link>

          <Link
            href="/prototype9/scenarios/kakao-specific"
            className="block p-4 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-gray-900">Kakao 맞춤형</div>
              <span className="text-sm text-yellow-600">5/15</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">MSA</span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">Kafka</span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">Redis</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-1.5">
              <div className="bg-yellow-600 h-1.5 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </Link>

          <Link
            href="/prototype9/scenarios/behavioral"
            className="block p-4 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-gray-900">인성·경험 면접</div>
              <span className="text-sm text-green-600">8/10</span>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">협업</span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">문제해결</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-1.5">
              <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/prototype9/resume"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">📄</div>
          <div className="font-semibold text-gray-900 text-sm">이력서</div>
          <div className="text-xs text-gray-500">기반 예상 질문</div>
        </Link>

        <Link
          href="/prototype9/scenarios"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-semibold text-gray-900 text-sm">시나리오</div>
          <div className="text-xs text-gray-500">맞춤형 질문</div>
        </Link>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">✅ 오늘 할 일</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <input type="checkbox" className="mt-1 accent-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                Spring AOP 질문 답변 작성하기
              </div>
              <div className="text-xs text-gray-500">신입 백엔드 필수</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <input type="checkbox" className="mt-1 accent-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                모의 면접 1회 진행하기
              </div>
              <div className="text-xs text-gray-500">Kakao 맞춤형</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <input type="checkbox" checked className="mt-1 accent-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 line-through">
                JPA N+1 문제 답변 완료
              </div>
              <div className="text-xs text-gray-500">신입 백엔드 필수</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💎</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">프리미엄 기능</h4>
            <p className="text-sm text-white/90 mb-4">
              PC에서 AI 모의면접, 전문가 피드백, 합격 템플릿 제공
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
