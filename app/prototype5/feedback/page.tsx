import Link from 'next/link';

export default function FeedbackPage() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          전문가 피드백 미리보기
        </h1>
        <p className="text-gray-500">샘플 피드백으로 품질을 확인하세요</p>
      </div>

      {/* Expert Profile (Visible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            김
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              김철수 시니어
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">현) 카카오 백엔드</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">경력 7년</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">{'⭐'.repeat(5)}</div>
              <span className="text-sm font-medium text-gray-700">4.9</span>
              <span className="text-xs text-gray-500">(127 리뷰)</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-gray-700">
            카카오에서 백엔드 개발 7년차입니다. Spring, JPA, Redis 등 백엔드
            전반에 대한 피드백을 제공합니다.
          </p>
        </div>
      </div>

      {/* Score (Visible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">점수</h3>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 text-center">
          <div className="text-5xl font-bold text-emerald-600 mb-2">85</div>
          <div className="text-gray-600">/ 100</div>
          <div className="mt-3 text-sm text-gray-700">
            우수한 답변입니다! 👏
          </div>
        </div>
      </div>

      {/* Strengths (Partially Visible - First Item Only) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">✅ 강점</h3>
        <div className="space-y-3">
          {/* First item visible */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="font-medium text-emerald-900 mb-2">
              트랜잭션 전파 개념 이해
            </div>
            <p className="text-sm text-gray-700">
              REQUIRES_NEW와 NESTED의 기본 개념을 정확하게 설명하셨습니다.
              특히 각 전파 속성의 트랜잭션 독립성에 대한 이해가 좋습니다.
            </p>
          </div>

          {/* Remaining items blurred */}
          <div className="relative">
            <div className="filter blur-md pointer-events-none select-none">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 mb-3">
                <div className="font-medium text-emerald-900 mb-2">
                  실무 적용 사례 제시
                </div>
                <p className="text-sm text-gray-700">
                  결제 시스템에서의 활용 예시가 구체적이었습니다...
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="font-medium text-emerald-900 mb-2">
                  예외 처리 고려
                </div>
                <p className="text-sm text-gray-700">
                  트랜잭션 롤백 시나리오에 대한 설명이 명확했습니다...
                </p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center border-2 border-orange-200">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-semibold text-gray-900 mb-2">
                  전체 피드백 보기
                </div>
                <Link
                  href="/prototype5/auth/login"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  로그인하기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improvements (Completely Blurred) */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">⚠️ 개선점</h3>
        <div className="relative">
          <div className="filter blur-md pointer-events-none select-none">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-3">
              <div className="font-medium text-amber-900 mb-2">
                코드 예시 추가
              </div>
              <p className="text-sm text-gray-700">
                실제 코드 예시를 함께 제시하면 더욱 명확할 것 같습니다...
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="font-medium text-amber-900 mb-2">
                성능 고려사항 언급
              </div>
              <p className="text-sm text-gray-700">
                각 전파 속성의 성능 차이에 대해서도 언급하면...
              </p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl">🔒</div>
          </div>
        </div>
      </div>

      {/* Recommended Resources (Completely Blurred) */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📚 추천 학습 자료</h3>
        <div className="relative">
          <div className="filter blur-md pointer-events-none select-none">
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-gray-900 mb-1">
                  Spring 공식 문서 - Transaction Management
                </div>
                <p className="text-sm text-gray-600">
                  트랜잭션 전파에 대한 공식 설명...
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-gray-900 mb-1">
                  Baeldung - Transaction Propagation
                </div>
                <p className="text-sm text-gray-600">
                  각 전파 속성의 동작 방식 예제...
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl">🔒</div>
          </div>
        </div>
      </div>

      {/* Sign Up CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">
          전체 피드백을 받아보세요!
        </h3>
        <p className="text-orange-50 text-sm mb-4">
          카카오, 네이버 현직자의 상세한 피드백으로
          <br />
          면접 실력을 높이세요.
        </p>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>강점 3개 + 개선점 3개 상세 분석</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>맞춤 학습 자료 추천</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>1:1 추가 질문 가능 (인사이트 사용)</span>
          </div>
        </div>
        <Link
          href="/prototype5/auth/signup"
          className="block w-full py-3 bg-white text-orange-600 text-center rounded-xl font-bold hover:shadow-lg transition-all"
        >
          회원가입하고 시작하기 →
        </Link>
      </div>

      {/* Why Expert Feedback */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          왜 전문가 피드백인가요?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">👨‍💼</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                실무 경험 기반
              </div>
              <div className="text-sm text-gray-600">
                현직 개발자가 실제 면접 경험을 토대로 피드백
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🎯</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">맞춤형 조언</div>
              <div className="text-sm text-gray-600">
                AI가 아닌 사람이 직접 당신의 답변을 읽고 분석
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📈</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">
                검증된 효과
              </div>
              <div className="text-sm text-gray-600">
                평균 2주 내 면접 점수 15% 향상
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
