import Link from 'next/link';

export default function ScenarioDetailPage({ params }: { params: { id: string } }) {
  const scenario = {
    id: params.id,
    title: '신입 백엔드 개발자',
    description: 'Java, Spring 기반 신입 백엔드 개발자를 위한 필수 질문',
    icon: '🌱',
    questions: 20,
    completed: 13,
    tags: ['Spring', 'JPA', 'Java', 'DB']
  };

  const questionGroups = [
    {
      category: 'Java 기초',
      questions: [
        { id: 1, title: 'JVM 메모리 구조', status: 'completed' },
        { id: 2, title: 'GC 동작 원리', status: 'completed' },
        { id: 3, title: 'equals와 hashCode', status: 'completed' }
      ]
    },
    {
      category: 'Spring Framework',
      questions: [
        { id: 4, title: 'Spring Bean 생명주기', status: 'completed' },
        { id: 5, title: 'IoC와 DI', status: 'completed' },
        { id: 6, title: 'Spring AOP 동작 원리', status: 'in-progress' },
        { id: 7, title: '@Transactional 동작 원리', status: 'not-started' }
      ]
    },
    {
      category: 'JPA',
      questions: [
        { id: 8, title: '영속성 컨텍스트', status: 'completed' },
        { id: 9, title: 'N+1 문제 해결', status: 'completed' },
        { id: 10, title: 'Lazy vs Eager Loading', status: 'in-progress' },
        { id: 11, title: '더티 체킹', status: 'not-started' }
      ]
    },
    {
      category: 'Database',
      questions: [
        { id: 12, title: 'DB Index 동작 원리', status: 'completed' },
        { id: 13, title: 'Transaction ACID', status: 'completed' },
        { id: 14, title: 'DB Lock', status: 'not-started' },
        { id: 15, title: 'Replication vs Sharding', status: 'not-started' }
      ]
    },
    {
      category: 'Network',
      questions: [
        { id: 16, title: 'HTTP vs HTTPS', status: 'completed' },
        { id: 17, title: 'RESTful API', status: 'completed' },
        { id: 18, title: 'TCP vs UDP', status: 'not-started' },
        { id: 19, title: 'CORS', status: 'not-started' },
        { id: 20, title: 'OAuth 2.0', status: 'not-started' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return '✅';
    if (status === 'in-progress') return '📝';
    return '⭕';
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-emerald-50 border-emerald-200';
    if (status === 'in-progress') return 'bg-blue-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
        <Link href="/prototype9/scenarios" className="text-sm opacity-90 mb-4 block">
          ← 시나리오 목록
        </Link>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
            {scenario.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{scenario.title}</h1>
            <p className="text-sm opacity-90">{scenario.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm">
            {scenario.completed}/{scenario.questions} 완료
          </span>
          <span className="text-sm font-medium">
            {Math.round((scenario.completed / scenario.questions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full"
            style={{ width: `${(scenario.completed / scenario.questions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {scenario.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Question Groups */}
      <div className="px-6 py-6 space-y-6">
        {questionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">{group.category}</h3>
            <div className="space-y-3">
              {group.questions.map((question) => (
                <Link
                  key={question.id}
                  href={`/prototype9/prep/${question.id}`}
                  className={`block p-3 rounded-lg border ${getStatusColor(question.status)} hover:shadow-md transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getStatusIcon(question.status)}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {question.title}
                      </div>
                      {question.status === 'completed' && (
                        <div className="text-xs text-emerald-600">답변 완료</div>
                      )}
                      {question.status === 'in-progress' && (
                        <div className="text-xs text-blue-600">작성 중</div>
                      )}
                      {question.status === 'not-started' && (
                        <div className="text-xs text-gray-500">시작하기</div>
                      )}
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-semibold text-gray-900 mb-1">준비 팁</div>
              <p className="text-sm text-gray-600">
                각 질문마다 STAR 기법(Situation, Task, Action, Result)으로
                답변을 구조화하면 더 효과적입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
