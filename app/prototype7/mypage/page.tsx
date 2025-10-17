import Link from 'next/link';

export default function MyPageV7() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">학습 통계</h1>
        <p className="text-gray-600 text-sm">당신의 성장을 확인하세요</p>
      </div>

      {/* Streak Stats */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-8 text-white text-center">
        <div className="text-6xl mb-4">🔥</div>
        <div className="text-4xl font-bold mb-2">7일</div>
        <div className="text-emerald-50 mb-6">연속 학습 중! 최고 기록이에요</div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/30">
          <div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs opacity-80">현재 연속</div>
          </div>
          <div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs opacity-80">최고 기록</div>
          </div>
          <div>
            <div className="text-2xl font-bold">28</div>
            <div className="text-xs opacity-80">총 학습일</div>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">이번 주 활동</h3>

        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          {[
            { day: '월', count: 3, height: '60%' },
            { day: '화', count: 2, height: '40%' },
            { day: '수', count: 3, height: '60%' },
            { day: '목', count: 4, height: '80%' },
            { day: '금', count: 3, height: '60%' },
            { day: '토', count: 5, height: '100%' },
            { day: '일', count: 3, height: '60%' }
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg"
                style={{ height: item.height }}
              ></div>
              <div className="text-xs text-gray-600">{item.day}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          이번 주 총 <span className="font-bold text-emerald-600">23개</span> 질문 학습
        </div>
      </div>

      {/* Learning Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 학습 현황</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">45</div>
            <div className="text-xs text-gray-600">완료한 질문</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <div className="text-xs text-gray-600">복습 완료</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">55</div>
            <div className="text-xs text-gray-600">남은 질문</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
            <div className="text-xs text-gray-600">작성한 답변</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">전체 진행률</span>
            <span className="text-sm font-medium text-emerald-600">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📚 카테고리별 학습</h3>

        <div className="space-y-3">
          {[
            { name: 'Spring', completed: 12, total: 20, color: 'emerald' },
            { name: 'JPA', completed: 8, total: 15, color: 'blue' },
            { name: 'Java', completed: 10, total: 15, color: 'yellow' },
            { name: 'Database', completed: 7, total: 20, color: 'purple' },
            { name: 'Network', completed: 8, total: 15, color: 'pink' }
          ].map((category, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{category.name}</span>
                <span className="text-sm text-gray-500">
                  {category.completed}/{category.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${category.color}-500 h-2 rounded-full`}
                  style={{ width: `${(category.completed / category.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">🏆 획득한 배지</h3>

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
              🔥
            </div>
            <div className="text-xs text-center text-gray-600">7일 연속</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
              📚
            </div>
            <div className="text-xs text-center text-gray-600">30문제 완료</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
              ✍️
            </div>
            <div className="text-xs text-center text-gray-600">첫 답변</div>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
            <div className="text-xs text-center text-gray-600">100문제</div>
          </div>
        </div>
      </div>

      {/* Level Up CTA */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🚀</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">준비된 것 같나요?</h4>
            <p className="text-sm text-white/90 mb-4">
              100일 완주하면 모의 면접 기회와 전문가 피드백을 드려요!
            </p>
            <Link
              href="/prototype7/path"
              className="inline-block px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              학습 경로 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
