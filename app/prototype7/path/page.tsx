import Link from 'next/link';

export default function LearningPathPage() {
  const learningPath = [
    {
      id: 'foundation',
      title: '🌱 기초 다지기',
      description: 'CS 기본 개념과 핵심 원리',
      questions: 30,
      completed: 15,
      progress: 50,
      color: 'emerald',
      status: 'in-progress',
      topics: [
        { name: 'Java 기초', completed: 5, total: 5 },
        { name: 'OOP 개념', completed: 4, total: 5 },
        { name: 'Spring 기본', completed: 3, total: 5 },
        { name: 'JPA 기초', completed: 3, total: 5 },
        { name: 'DB 기본', completed: 0, total: 5 },
        { name: 'Network 기초', completed: 0, total: 5 }
      ]
    },
    {
      id: 'practical',
      title: '🎯 실전 준비',
      description: '실무에서 자주 나오는 질문',
      questions: 50,
      completed: 0,
      progress: 0,
      color: 'blue',
      status: 'locked',
      topics: [
        { name: 'Spring Boot 심화', completed: 0, total: 8 },
        { name: 'JPA 최적화', completed: 0, total: 8 },
        { name: 'Redis 활용', completed: 0, total: 7 },
        { name: 'Kafka 기본', completed: 0, total: 7 },
        { name: '트랜잭션 관리', completed: 0, total: 7 },
        { name: 'API 설계', completed: 0, total: 7 },
        { name: '테스트 코드', completed: 0, total: 6 }
      ]
    },
    {
      id: 'advanced',
      title: '🚀 심화',
      description: '시니어 레벨의 깊이있는 질문',
      questions: 20,
      completed: 0,
      progress: 0,
      color: 'purple',
      status: 'locked',
      topics: [
        { name: '아키텍처 설계', completed: 0, total: 5 },
        { name: '성능 최적화', completed: 0, total: 5 },
        { name: 'MSA 패턴', completed: 0, total: 5 },
        { name: '대용량 처리', completed: 0, total: 5 }
      ]
    }
  ];

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      emerald: {
        bg: 'bg-emerald-500',
        text: 'text-emerald-600',
        border: 'border-emerald-500'
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-500'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-500'
      }
    };
    return colors[color][variant];
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">학습 경로</h1>
        <p className="text-gray-600 text-sm">
          체계적인 커리큘럼으로 실력을 쌓아가세요
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90">전체 진행률</div>
            <div className="text-3xl font-bold">15%</div>
          </div>
          <div className="text-5xl">🎯</div>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3">
          <div className="bg-white h-3 rounded-full" style={{ width: '15%' }}></div>
        </div>
        <div className="mt-3 text-sm opacity-90">
          15 / 100 질문 완료
        </div>
      </div>

      {/* Learning Stages */}
      <div className="space-y-6">
        {learningPath.map((stage, index) => (
          <div
            key={stage.id}
            className={`bg-white rounded-2xl shadow-sm border-2 ${
              stage.status === 'locked' ? 'border-gray-200 opacity-60' : 'border-gray-100'
            } overflow-hidden`}
          >
            {/* Stage Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
                {stage.status === 'locked' && (
                  <span className="text-2xl">🔒</span>
                )}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {stage.completed} / {stage.questions} 완료
                </span>
                <span className={`text-sm font-medium ${getColorClasses(stage.color, 'text')}`}>
                  {stage.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${getColorClasses(stage.color, 'bg')} h-2 rounded-full`}
                  style={{ width: `${stage.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Topics */}
            <div className="p-6 space-y-3">
              {stage.topics.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    topic.completed === topic.total
                      ? 'bg-emerald-50 border border-emerald-200'
                      : topic.completed > 0
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {topic.completed === topic.total ? '✅' :
                       topic.completed > 0 ? '📝' : '⭕'}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {topic.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {topic.completed} / {topic.total} 질문
                      </div>
                    </div>
                  </div>
                  {stage.status !== 'locked' && topic.completed < topic.total && (
                    <Link
                      href="/prototype7/learn/1"
                      className="text-sm text-emerald-600 font-medium"
                    >
                      학습 →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Motivation */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💪</span>
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              꾸준함이 실력을 만듭니다
            </div>
            <p className="text-sm text-gray-600">
              매일 조금씩 학습하면 100일 후엔 전문가가 되어있을 거예요.
              기초부터 차근차근 완성해나가세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
