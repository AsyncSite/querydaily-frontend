'use client';

import styles from './page.module.css';

export default function ResumeAnalysisPage() {
  const handlePurchase = () => {
    window.open('https://open.kakao.com/o/gKxyzABf', '_blank');
  };

  const sampleQuestions = [
    { category: "기술 스택", question: "Spring Boot를 선택한 이유와 다른 프레임워크와의 차이점은?" },
    { category: "프로젝트 경험", question: "MSA 전환 프로젝트에서 가장 큰 도전과제는 무엇이었나요?" },
    { category: "문제 해결", question: "성능 최적화를 위해 어떤 전략을 사용하셨나요?" },
    { category: "협업", question: "팀 내 기술적 의견 충돌을 어떻게 해결하셨나요?" },
    { category: "설계 철학", question: "클린 아키텍처를 적용한 이유와 얻은 이점은?" },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.nav}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
              <span className={styles.betaTag}>BETA</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.urgencyBadge}>
            <span>🔥 불안감을 즉시 해소하세요</span>
          </div>

          <h1 className={styles.title}>
            내 이력서에서 나올 수 있는<br/>
            <span className={styles.highlight}>모든 질문을 미리 대비</span>하세요
          </h1>

          <p className={styles.subtitle}>
            당신의 이력서를 완벽 분석하여<br/>
            <strong>예상 질문 50개</strong>와 각 질문의 <strong>핵심 키워드</strong>를 제공합니다
          </p>

          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>🎯</span>
              <span className={styles.valueText}>50개 맞춤 질문</span>
            </div>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>🔑</span>
              <span className={styles.valueText}>핵심 키워드 제공</span>
            </div>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>📊</span>
              <span className={styles.valueText}>카테고리별 정리</span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            면접 준비, 이런 불안감 있으신가요?
          </h2>

          <div className={styles.problems}>
            <div className={styles.problem}>
              <div className={styles.problemIcon}>😰</div>
              <h3>예상 못한 질문에 대한 두려움</h3>
              <p>"내가 놓친 부분에서 질문이 나오면 어떡하지?"</p>
            </div>

            <div className={styles.problem}>
              <div className={styles.problemIcon}>🤔</div>
              <h3>준비 방향의 불확실성</h3>
              <p>"뭘 준비해야 할지 모르겠어요"</p>
            </div>

            <div className={styles.problem}>
              <div className={styles.problemIcon}>⏰</div>
              <h3>시간 부족</h3>
              <p>"면접까지 시간이 없는데 효율적으로 준비하고 싶어요"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            49,000원으로 <span className={styles.accent}>완벽한 대비</span>
          </h2>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📋</div>
                <h3>50개 맞춤형 예상 질문</h3>
              </div>
              <p>당신의 이력서에서 면접관이 물어볼 수 있는 모든 각도의 질문을 AI가 분석하여 추출</p>
              <div className={styles.categories}>
                <span className={styles.category}>기술 스택 질문</span>
                <span className={styles.category}>프로젝트 경험</span>
                <span className={styles.category}>문제 해결 과정</span>
                <span className={styles.category}>설계 철학</span>
                <span className={styles.category}>협업 경험</span>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>🔑</div>
                <h3>각 질문별 핵심 키워드</h3>
              </div>
              <p>답변에 반드시 포함해야 할 기술 용어와 개념을 정리하여 제공</p>
              <ul>
                <li>답변의 방향성 제시</li>
                <li>놓치기 쉬운 포인트 체크</li>
                <li>면접관이 듣고 싶어하는 키워드</li>
              </ul>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📊</div>
                <h3>체계적인 리포트 형식</h3>
              </div>
              <p>카테고리별로 정리된 PDF 리포트로 효율적인 면접 준비</p>
              <ul>
                <li>난이도별 분류</li>
                <li>우선순위 표시</li>
                <li>체크리스트 제공</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            이런 질문들이 포함됩니다
          </h2>
          <p className={styles.sectionSubtitle}>
            실제 리포트에서 제공되는 50개 질문 중 일부 예시
          </p>

          <div className={styles.sampleQuestions}>
            {sampleQuestions.map((item, index) => (
              <div key={index} className={styles.sampleQuestion}>
                <div className={styles.questionNumber}>Q{index + 1}</div>
                <div className={styles.questionContent}>
                  <div className={styles.questionCategory}>{item.category}</div>
                  <div className={styles.questionText}>{item.question}</div>
                  <div className={styles.keywords}>
                    <span className={styles.keywordLabel}>핵심 키워드:</span>
                    <span className={styles.blurred}>구매 후 확인 가능</span>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.moreQuestions}>
              <p>+ 45개의 추가 질문이 더 있습니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>어떻게 진행되나요?</h2>

          <div className={styles.process}>
            <div className={styles.processItem}>
              <div className={styles.processNumber}>1</div>
              <h3>결제 완료</h3>
              <p>카카오톡 상담 후 결제 진행</p>
            </div>

            <div className={styles.processArrow}>→</div>

            <div className={styles.processItem}>
              <div className={styles.processNumber}>2</div>
              <h3>AI 분석</h3>
              <p>제출하신 이력서를 AI가 심층 분석</p>
            </div>

            <div className={styles.processArrow}>→</div>

            <div className={styles.processItem}>
              <div className={styles.processNumber}>3</div>
              <h3>리포트 생성</h3>
              <p>50개 질문과 키워드 정리</p>
            </div>

            <div className={styles.processArrow}>→</div>

            <div className={styles.processItem}>
              <div className={styles.processNumber}>4</div>
              <h3>24시간 내 전달</h3>
              <p>이메일로 PDF 리포트 발송</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customer */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>이런 분들께 추천합니다</h2>

          <div className={styles.targetCustomer}>
            <div className={styles.recommended}>
              <h3>✅ 강력 추천</h3>
              <ul>
                <li>면접이 1주일 이내로 임박한 분</li>
                <li>효율적으로 면접을 준비하고 싶은 분</li>
                <li>이력서의 약점을 미리 파악하고 싶은 분</li>
                <li>체계적인 준비 자료가 필요한 분</li>
              </ul>
            </div>

            <div className={styles.notRecommended}>
              <h3>❌ 비추천</h3>
              <ul>
                <li>답변 작성까지 대신 해주길 원하는 분</li>
                <li>이력서가 아직 준비되지 않은 분</li>
                <li>이미 충분한 면접 경험이 있는 분</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.section} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className={styles.sectionContainer}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h2 className={styles.pricingTitle}>이력서 분석 리포트</h2>
              <div className={styles.pricingBadge}>
                <span>베타 기간 특별가</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.originalPrice}>
                <span>정가</span>
                <span className={styles.strikethrough}>59,000원</span>
              </div>
              <div className={styles.discountPrice}>
                <span className={styles.priceAmount}>49,000원</span>
                <span className={styles.discount}>17% 할인</span>
              </div>
            </div>

            <div className={styles.includes}>
              <h4>포함 내용</h4>
              <ul>
                <li>✅ 맞춤형 예상 질문 50개</li>
                <li>✅ 각 질문별 핵심 키워드</li>
                <li>✅ 카테고리별 정리</li>
                <li>✅ 난이도별 분류</li>
                <li>✅ PDF 리포트 형식</li>
                <li>✅ 24시간 내 전달</li>
              </ul>
            </div>

            <button className={styles.purchaseBtn} onClick={handlePurchase}>
              이력서 분석 리포트 받기 →
            </button>

            <div className={styles.betaInfo}>
              <p className={styles.betaInfoText}>
                💬 현재 베타 운영 중으로, 카카오톡 상담을 통해 1:1 결제 안내를 드리고 있습니다.
              </p>
            </div>

            <div className={styles.guarantee}>
              <p>
                <strong>100% 만족 보장</strong><br/>
                리포트가 만족스럽지 않으신가요?<br/>
                24시간 내 문의주시면 전액 환불해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>실제 사용자 후기</h2>

          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                "면접 전날 받아서 하루 만에 준비했는데, 50개 중에 30개는 실제로 나왔어요. 정말 놀랐습니다."
              </div>
              <div className={styles.testimonialAuthor}>
                - 박*진님, 네이버 합격
              </div>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                "키워드 정리가 정말 도움됐어요. 어떤 용어를 써야 할지 명확해져서 답변이 훨씬 전문적으로 들렸대요."
              </div>
              <div className={styles.testimonialAuthor}>
                - 김*수님, 카카오 합격
              </div>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                "제 이력서의 약점이 뭔지 몰랐는데, 리포트 보고 알게 됐어요. 미리 대비할 수 있어서 좋았습니다."
              </div>
              <div className={styles.testimonialAuthor}>
                - 이*희님, 토스 합격
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.sectionContainer}>
          <h2>면접까지 시간이 없으신가요?</h2>
          <p>24시간 내에 완벽한 질문 리스트를 받아보세요</p>
          <button className={styles.purchaseBtnLarge} onClick={handlePurchase}>
            지금 바로 리포트 받기 →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 QueryDaily. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="/terms">이용약관</a>
            <span>•</span>
            <a href="/privacy">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  );
}