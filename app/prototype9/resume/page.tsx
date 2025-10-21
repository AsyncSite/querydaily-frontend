import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">이력서 기반 예상 질문</h1>
        <p className="text-gray-600 text-sm">
          이력서 내용을 분석하여 예상 질문을 생성합니다
        </p>
      </div>

      {/* Upload Resume */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">📄</div>
          <h3 className="font-bold mb-1">이력서를 업로드하세요</h3>
          <p className="text-sm opacity-90">
            AI가 이력서를 분석하여 맞춤형 예상 질문을 만들어드려요
          </p>
        </div>
        <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
          📎 파일 선택하기
        </button>
      </div>

      {/* Example Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📝 예시: 예상 질문</h3>
        <div className="text-sm text-gray-600 mb-4">
          이력서에 "Spring Boot로 MSA 구축" 프로젝트가 있다면:
        </div>

        <div className="space-y-3">
          {[
            'MSA를 선택한 이유는 무엇인가요?',
            '서비스 간 통신은 어떻게 구현하셨나요?',
            '트랜잭션 관리는 어떻게 하셨나요?',
            '서비스 디스커버리는 어떤 방식을 사용하셨나요?'
          ].map((q, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="text-sm font-medium text-gray-900">{q}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">✨ 이력서 분석의 장점</h3>
        <ul className="space-y-3">
          {[
            {
              icon: '🎯',
              title: '맞춤형 질문',
              desc: '본인의 경험과 프로젝트에 대한 질문만 집중 준비'
            },
            {
              icon: '📊',
              title: '우선순위 파악',
              desc: '면접관이 물어볼 확률이 높은 질문 먼저'
            },
            {
              icon: '💡',
              title: '약점 보완',
              desc: '이력서에서 보완이 필요한 부분 파악'
            }
          ].map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-2xl">{benefit.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{benefit.title}</div>
                <div className="text-sm text-gray-600">{benefit.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💎</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">프리미엄 기능</h4>
            <p className="text-sm text-white/90 mb-4">
              PC에서 이력서 AI 분석, 맞춤형 예상 질문 100개, 답변 템플릿 제공
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              PC에서 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
