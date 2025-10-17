import Link from 'next/link';

export default function ScenariosPage() {
  const scenarios = [
    {
      id: 'junior-backend',
      title: '신입 백엔드 개발자',
      description: 'Java, Spring 기반 신입 백엔드 개발자를 위한 필수 질문',
      icon: '🌱',
      questions: 20,
      completed: 13,
      color: 'blue',
      tags: ['Spring', 'JPA', 'Java', 'DB']
    },
    {
      id: 'mid-backend',
      title: '경력 백엔드 개발자',
      description: '3~5년차 백엔드 개발자를 위한 심화 질문',
      icon: '🚀',
      questions: 25,
      completed: 0,
      color: 'purple',
      tags: ['아키텍처', 'MSA', '성능최적화']
    },
    {
      id: 'junior-frontend',
      title: '신입 프론트엔드 개발자',
      description: 'React, TypeScript 기반 프론트엔드 필수 질문',
      icon: '🎨',
      questions: 18,
      completed: 0,
      color: 'green',
      tags: ['React', 'TypeScript', 'CSS']
    },
    {
      id: 'kakao-specific',
      title: 'Kakao 맞춤형',
      description: '카카오 기술 면접에 특화된 질문',
      icon: '💛',
      questions: 15,
      completed: 5,
      color: 'yellow',
      tags: ['MSA', 'Kafka', 'Redis']
    },
    {
      id: 'behavioral',
      title: '인성·경험 면접',
      description: '협업, 문제해결, 리더십 관련 질문',
      icon: '🤝',
      questions: 10,
      completed: 8,
      color: 'pink',
      tags: ['협업', '문제해결', '갈등']
    }
  ];

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">시나리오 선택</h1>
        <p className="text-gray-600 text-sm">
          당신의 상황에 맞는 면접 준비를 시작하세요
        </p>
      </div>

      {/* My Active Scenarios */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-bold text-gray-900 mb-4">📌 진행중인 시나리오</h3>
        <div className="space-y-3">
          {scenarios.filter(s => s.completed > 0).map((scenario) => (
            <Link
              key={scenario.id}
              href={`/prototype9/scenarios/${scenario.id}`}
              className="block bg-white rounded-xl p-4 border border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-2xl">
                  {scenario.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{scenario.title}</div>
                  <div className="text-xs text-gray-500">{scenario.description}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {scenario.completed}/{scenario.questions} 완료
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round((scenario.completed / scenario.questions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(scenario.completed / scenario.questions) * 100}%` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Scenarios */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">전체 시나리오</h3>
        <div className="space-y-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/prototype9/scenarios/${scenario.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl">
                  {scenario.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{scenario.title}</div>
                  <div className="text-xs text-gray-600 mb-2">{scenario.description}</div>
                  <div className="flex gap-2">
                    {scenario.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{scenario.questions}개 질문</span>
                {scenario.completed > 0 ? (
                  <span className="text-sm font-medium text-blue-600">
                    진행중 ({scenario.completed}/{scenario.questions})
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">시작하기 →</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Scenario CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">✨</span>
          <div className="flex-1">
            <h4 className="font-bold mb-1">커스텀 시나리오 만들기</h4>
            <p className="text-sm text-white/90 mb-4">
              PC에서 나만의 맞춤형 시나리오를 만들 수 있어요
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
