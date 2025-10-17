import Link from 'next/link';

export default function MyPageV9() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Interview Countdown */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center">
        <div className="text-sm opacity-90 mb-2">Kakao 백엔드 면접일</div>
        <div className="text-5xl font-bold mb-2">D-15</div>
        <div className="text-sm opacity-90 mb-4">2025년 11월 2일</div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/30">
          <div>
            <div className="text-2xl font-bold">13</div>
            <div className="text-xs opacity-80">답변 작성</div>
          </div>
          <div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs opacity-80">모의 면접</div>
          </div>
          <div>
            <div className="text-2xl font-bold">65%</div>
            <div className="text-xs opacity-80">완료율</div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 전체 진행률</h3>

        <div className="space-y-4">
          {[
            { name: '신입 백엔드 필수', completed: 13, total: 20, color: 'blue' },
            { name: 'Kakao 맞춤형', completed: 5, total: 15, color: 'yellow' },
            { name: '인성·경험 면접', completed: 8, total: 10, color: 'green' }
          ].map((board, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{board.name}</span>
                <span className="text-sm font-medium text-blue-600">
                  {board.completed}/{board.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${board.color}-600 h-2 rounded-full`}
                  style={{ width: `${(board.completed / board.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📈 학습 통계</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">26</div>
            <div className="text-xs text-gray-600">답변 작성 완료</div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">5</div>
            <div className="text-xs text-gray-600">모의 면접 완료</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">18</div>
            <div className="text-xs text-gray-600">학습 일수</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-600 mb-1">42h</div>
            <div className="text-xs text-gray-600">총 학습 시간</div>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📅 이번 주 활동</h3>

        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          {[
            { day: '월', hours: 2.5, height: '60%' },
            { day: '화', hours: 1.5, height: '40%' },
            { day: '수', hours: 3, height: '75%' },
            { day: '목', hours: 4, height: '100%' },
            { day: '금', hours: 2, height: '50%' },
            { day: '토', hours: 0, height: '0%' },
            { day: '일', hours: 0, height: '0%' }
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg"
                style={{ height: item.height }}
              ></div>
              <div className="text-xs text-gray-600">{item.day}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          이번 주 총 <span className="font-bold text-blue-600">13시간</span> 학습
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">🏆 획득한 배지</h3>

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
              📝
            </div>
            <div className="text-xs text-center text-gray-600">첫 답변</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
              📚
            </div>
            <div className="text-xs text-center text-gray-600">20문제</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
              ⏰
            </div>
            <div className="text-xs text-center text-gray-600">7일 연속</div>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
            <div className="text-xs text-center text-gray-600">완벽준비</div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">✅ 면접 전 체크리스트</h3>

        <div className="space-y-3">
          {[
            { text: '기술 질문 답변 준비', done: true },
            { text: '프로젝트 설명 연습', done: true },
            { text: '모의 면접 5회 이상', done: true },
            { text: '예상 질문 전체 복습', done: false },
            { text: '지원 동기 작성', done: false }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.done}
                className="accent-blue-600"
                readOnly
              />
              <span className={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💎</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">합격 확률을 높이세요</h4>
            <p className="text-sm text-white/90 mb-4">
              PC에서 AI 모의면접, 전문가 1:1 피드백, 합격자 답변 템플릿 제공
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              프리미엄 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
