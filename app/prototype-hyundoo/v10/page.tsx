'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function LandingPageV10() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGlow}></div>
        </div>

        <div className={styles.heroBadge}>
          <span className={styles.pulseDot}>●</span>
          AI-Powered Interview Intelligence
        </div>

        <div className={`${styles.heroContent} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.preTitle}>사실,</span>
          <h1 className={styles.heroTitle}>
            당신은<br />
            <span className={styles.highlight}>붙을 사람</span>입니다.
          </h1>

          <p className={styles.heroSubtitle}>
            면접관이 물을 질문은 이미<br />
            <strong>당신 이력서에 다 있습니다.</strong>
          </p>

          <div className={styles.heroCtaGroup}>
            <a href="#pricing" className={styles.primaryBtn}>
              내 질문 미리보기
            </a>
            <a href="#how-it-works" className={styles.secondaryBtn}>
              어떻게 가능한가요?
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section (NEW) */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <span className={styles.testimonialsBadge}>실제 사용자 후기</span>
          <h2 className={styles.testimonialsTitle}>
            실사용자들이<br />
            가장 만족한 포인트
          </h2>
          <p className={styles.testimonialsSubtitle}>
            <strong>100% 만족도</strong>를 기록한 피드백
          </p>

          <div className={styles.satisfactionStats}>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>5.0/5.0</div>
              <div className={styles.bigStatLabel}>평균 만족도</div>
            </div>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>100%</div>
              <div className={styles.bigStatLabel}>재구매 의향</div>
            </div>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>하루 10분</div>
              <div className={styles.bigStatLabel}>면접 준비 시간</div>
            </div>
          </div>

          <div className={styles.keywordCloud}>
            <span className={styles.keyword} data-size="xxl">이력서 기반 질문</span>
            <span className={styles.keyword} data-size="xl">STAR 구조화</span>
            <span className={styles.keyword} data-size="lg">모범 답변 제공</span>
            <span className={styles.keyword} data-size="xxl">실전 같은 질문</span>
            <span className={styles.keyword} data-size="md">체계적 정리</span>
            <span className={styles.keyword} data-size="xl">답변 가이드</span>
            <span className={styles.keyword} data-size="lg">구체적인 질문</span>
            <span className={styles.keyword} data-size="md">깊이 있는 분석</span>
            <span className={styles.keyword} data-size="xl">사고 확장</span>
            <span className={styles.keyword} data-size="lg">자신감 상승</span>
            <span className={styles.keyword} data-size="md">답변 방향성</span>
            <span className={styles.keyword} data-size="xxl">면접 대비 완벽</span>
            <span className={styles.keyword} data-size="lg">꼬리 질문 준비</span>
            <span className={styles.keyword} data-size="md">경력 맞춤</span>
            <span className={styles.keyword} data-size="xl">실제 면접 질문</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.section} id="how-it-works">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            면접에서 떨어지는 <span className={styles.highlight}>진짜 이유</span>
          </h2>
          <p className={styles.sectionDesc}>
            기술이 부족해서가 아닙니다. <br />
            <strong>"왜?"</strong>라는 질문에 침묵했기 때문입니다.
          </p>
        </div>

        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <span className={styles.problemIcon}>🤔</span>
              <h3 className={styles.problemTitle}>Redis 캐싱 구현했다고 했더니...</h3>
            </div>
            <div className={styles.scenarioBox}>
              <p className={styles.question}>"왜 Redis였나요? Memcached는요?"</p>
              <p className={styles.result}>→ 3초간 정적...</p>
            </div>
            <p className={styles.problemText}>
              단순히 "썼다"는 중요하지 않습니다.<br />
              <strong>"왜 선택했는지"</strong>를 묻습니다.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <span className={styles.problemIcon}>😰</span>
              <h3 className={styles.problemTitle}>스프링부트 썼다고 했더니...</h3>
            </div>
            <div className={styles.scenarioBox}>
              <p className={styles.question}>"왜 스프링이었나요? 다른 건요?"</p>
              <p className={styles.result}>→ "그냥... 많이 쓰니까..."</p>
            </div>
            <p className={styles.problemText}>
              남들이 써서 썼다는 답변은<br />
              <strong>치명적인 감점 요인</strong>입니다.
            </p>
          </div>

          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <span className={styles.problemIcon}>🤯</span>
              <h3 className={styles.problemTitle}>트랜잭션 처리 했다고 했더니...</h3>
            </div>
            <div className={styles.scenarioBox}>
              <p className={styles.question}>"격리 수준은 어떻게 설정했나요?"</p>
              <p className={styles.result}>→ "...네?"</p>
            </div>
            <p className={styles.problemText}>
              깊이 있는 꼬리 질문.<br />
              <strong>미리 받아보지 않으면</strong> 당황합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section (NEW) */}
      <section className={styles.statistics}>
        <div className={styles.statisticsContainer}>
          <h2 className={styles.statisticsTitle}>
            준비한 사람만 합격합니다
          </h2>
          <div className={styles.dataSource}>
            <p>데이터 출처: Glassdoor, Preplaced, Novoresume (2024-2025)</p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.mainStat}>
              <div className={styles.statNumber}>70<span className={styles.percent}>%</span></div>
              <div className={styles.statLabel}>채용 담당자가 꼽은 가장 흔한 탈락 이유:<br /><strong>"준비 부족"</strong></div>
            </div>

            <div className={styles.supportingStats}>
              <div className={styles.supportingStat}>
                <div className={styles.supportingNumber}>90<span className={styles.percent}>%</span></div>
                <div className={styles.supportingLabel}>성공한 후보자가<br />미리 질문을 연습</div>
              </div>
              <div className={styles.supportingStat}>
                <div className={styles.supportingNumber}>92<span className={styles.percent}>%</span></div>
                <div className={styles.supportingLabel}>모의 면접을<br />필수로 생각</div>
              </div>
              <div className={styles.supportingStat}>
                <div className={styles.supportingNumber}>55<span className={styles.percent}>%</span></div>
                <div className={styles.supportingLabel}>비언어적 소통이<br />면접 성공 좌우</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section (NEW) */}
      <section className={styles.chartSection}>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>
            면접 준비 기간에 따른 합격률
          </h2>

          <div className={styles.graphLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendLine} data-type="prepared"></div>
              <span>체계적으로 준비한 경우</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendLine} data-type="unprepared"></div>
              <span>준비 없이 면접 본 경우</span>
            </div>
          </div>

          <div className={styles.lineGraphContainer}>
            <svg className={styles.lineGraph} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
              {/* Grid Lines */}
              <line x1="50" y1="250" x2="550" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="50" y1="187.5" x2="550" y2="187.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="50" y1="125" x2="550" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="50" y1="62.5" x2="550" y2="62.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Y-axis Labels */}
              <text x="30" y="255" fill="var(--text-muted)" fontSize="12" textAnchor="end">0%</text>
              <text x="30" y="192" fill="var(--text-muted)" fontSize="12" textAnchor="end">25%</text>
              <text x="30" y="130" fill="var(--text-muted)" fontSize="12" textAnchor="end">50%</text>
              <text x="30" y="67" fill="var(--text-muted)" fontSize="12" textAnchor="end">75%</text>
              <text x="30" y="35" fill="var(--text-muted)" fontSize="12" textAnchor="end">100%</text>

              {/* X-axis Labels */}
              <text x="50" y="275" fill="var(--text-muted)" fontSize="12" textAnchor="middle">0일</text>
              <text x="216.67" y="275" fill="var(--text-muted)" fontSize="12" textAnchor="middle">1주</text>
              <text x="383.33" y="275" fill="var(--text-muted)" fontSize="12" textAnchor="middle">2주</text>
              <text x="550" y="275" fill="var(--text-muted)" fontSize="12" textAnchor="middle">3주+</text>

              {/* Unprepared Line */}
              <path
                d="M 50 226 L 216.67 218.75 L 383.33 212.5 L 550 212.5"
                stroke="var(--text-muted)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.lineUnprepared}
              />

              {/* Prepared Line */}
              <path
                d="M 50 226 L 216.67 175 L 383.33 93.75 L 550 31.25"
                stroke="var(--accent-secondary)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.linePrepared}
              />

              {/* Data Points */}
              <circle cx="50" cy="226" r="5" fill="var(--accent-secondary)" className={styles.dataPoint} />
              <circle cx="216.67" cy="175" r="5" fill="var(--accent-secondary)" className={styles.dataPoint} />
              <circle cx="383.33" cy="93.75" r="5" fill="var(--accent-secondary)" className={styles.dataPoint} />
              <circle cx="550" cy="31.25" r="5" fill="var(--accent-secondary)" className={styles.dataPoint} />
            </svg>
          </div>
          <p className={styles.chartNote}>* 체계적인 준비는 합격률을 2배 이상 향상시킵니다</p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            ChatGPT는 <span className={styles.highlight}>일반론</span>을 말합니다.<br />
            QueryDaily는 <span className={styles.highlightGreen}>당신의 경험</span>을 묻습니다.
          </h2>
        </div>

        <div className={styles.comparisonGrid}>
          <div className={styles.compCard}>
            <div className={styles.compHeader}>
              <h3>일반 질문 (ChatGPT)</h3>
            </div>
            <div className={styles.compQuestions}>
              <div className={styles.compQItem}>
                <span className={styles.compQNum}>Q1</span>
                <p>Spring Boot의 장점을 설명해주세요</p>
              </div>
              <div className={styles.compQItem}>
                <span className={styles.compQNum}>Q2</span>
                <p>RESTful API란 무엇인가요?</p>
              </div>
              <div className={styles.compQItem}>
                <span className={styles.compQNum}>Q3</span>
                <p>데이터베이스 인덱스를 설명해주세요</p>
              </div>
            </div>
            <div className={styles.compFooter}>
              <p>누구에게나 똑같은 질문<br />→ 일반론 암기</p>
            </div>
          </div>

          <div className={`${styles.compCard} ${styles.positive}`}>
            <div className={styles.compHeader}>
              <h3>이력서 기반 질문 (QueryDaily)</h3>
            </div>
            <div className={styles.compQuestions}>
              <div className={styles.compQItem}>
                <span className={`${styles.compQNum} ${styles.positive}`}>Q1</span>
                <p>"상품 검색 응답시간 2초→0.3초" 어떻게 달성했나요?</p>
              </div>
              <div className={styles.compQItem}>
                <span className={`${styles.compQNum} ${styles.positive}`}>Q2</span>
                <p>"동시 결제 처리 500건" 트랜잭션 충돌은 어떻게 해결했나요?</p>
              </div>
              <div className={styles.compQItem}>
                <span className={`${styles.compQNum} ${styles.positive}`}>Q3</span>
                <p>"DAU 10만 서비스" 쿼리 최적화 전략은 무엇이었나요?</p>
              </div>
            </div>
            <div className={styles.compFooter}>
              <p>당신이 직접 겪은 문제<br />→ 구체적인 해결 과정</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            실패 데이터 500개가 만든<br />
            <span className={styles.highlight}>합격 공식</span>
          </h2>
          <p className={styles.sectionDesc}>
            비전공자, 국비지원 출신 개발자들이<br />
            직접 증명하며 만든 서비스입니다.
          </p>
        </div>

        <div className={styles.expertGrid}>
          <div className={styles.expertCard}>
            <div className={styles.expertAvatar}>👨‍💻</div>
            <div className={styles.expertBadge}>현) 판교 N사 개발자</div>
            <div className={styles.expertJourney}>
              <span>국비지원</span> <span className={styles.journeyArrow}>→</span> <span>대기업</span>
            </div>
            <p className={styles.expertStory}>
              "300번의 탈락 데이터를 분석해 합격 공식을 찾았습니다. 2년 만에 연봉 2배를 달성한 비결을 공유합니다."
            </p>
          </div>
          <div className={styles.expertCard}>
            <div className={styles.expertAvatar}>🦄</div>
            <div className={styles.expertBadge}>현) 유니콘 B사 개발자</div>
            <div className={styles.expertJourney}>
              <span>SI 야근</span> <span className={styles.journeyArrow}>→</span> <span>유니콘</span>
            </div>
            <p className={styles.expertStory}>
              "5번의 이직으로 찾은 최적 경로. 100개 기업 면접에서 발견한 합격 시그널을 담았습니다."
            </p>
          </div>
          <div className={styles.expertCard}>
            <div className={styles.expertAvatar}>🚀</div>
            <div className={styles.expertBadge}>현) 테크 기업 개발자</div>
            <div className={styles.expertJourney}>
              <span>CS 전공</span> <span className={styles.journeyArrow}>→</span> <span>테크 리드</span>
            </div>
            <p className={styles.expertStory}>
              "탄탄한 이론과 10개 이상의 시스템 설계 경험으로 실무와 이론의 균형을 잡아드립니다."
            </p>
          </div>
        </div>
      </section>

      {/* Solution / Pricing Section */}
      <section className={`${styles.section} ${styles.productSection}`} id="pricing">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            내일을, <span className={styles.highlight}>오늘</span> 준비하세요
          </h2>
          <p className={styles.sectionDesc}>
            당신의 상황에 맞는 최적의 전략을 선택하세요.
          </p>
        </div>

        <div className={styles.productGrid}>
          {/* Critical Hit */}
          <div className={styles.productCard}>
            <h3 className={styles.cardTitle}>크리티컬 히트</h3>
            <p className={styles.cardSubtitle}>내일 면접이어도 늦지 않았습니다</p>

            <div className={styles.cardPrice}>
              ₩9,900 <span>/ 1회</span>
            </div>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>이력서 핵심 질문 <strong>Top 3</strong></span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>막막하지 않은 <strong>답변 가이드</strong></span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>24시간 이내</strong> 긴급 분석</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>당장 급한 불 끄기용</span>
              </li>
            </ul>

            <button className={`${styles.cardBtn} ${styles.secondary}`}>
              지금 바로 시작하기
            </button>
          </div>

          {/* Growth Plan */}
          <div className={`${styles.productCard} ${styles.featured}`}>
            <div className={styles.cardBadge}>MOST POPULAR</div>
            <h3 className={styles.cardTitle}>그로스 플랜</h3>
            <p className={styles.cardSubtitle}>20일 후, 면접관을 리드하는 당신</p>

            <div className={styles.cardPrice}>
              <span className={styles.highlight}>₩49,000</span> <span>/ 시즌</span>
            </div>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>매일 아침 7시, 저녁 5시 <strong>질문 배달</strong></span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>출퇴근길 <strong>하루 10분</strong> 루틴</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>STAR 기법</strong> 완벽 체화</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>예상치 못한 <strong>꼬리 질문</strong>까지 대비</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>이력서 <strong>완전 정복</strong> (20일 코스)</span>
              </li>
            </ul>

            <button className={`${styles.cardBtn} ${styles.primary}`}>
              20일의 기적 시작하기
            </button>
          </div>
        </div>

        {/* Choose Guide (NEW) */}
        <div className={styles.chooseGuide}>
          <div className={styles.guideItem}>
            <p className={styles.guideQ}>"일단 경험해보고 싶어요"</p>
            <p className={styles.guideA}>→ 크리티컬 히트</p>
          </div>
          <div className={styles.guideItem}>
            <p className={styles.guideQ}>"모든 질문에 제대로 대비하고 싶어요"</p>
            <p className={styles.guideA}>→ 그로스 플랜</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
        </div>

        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              <span>이력서 기반 예측이 정확한가요?</span>
              <span className={styles.faqIcon}>+</span>
            </summary>
            <div className={styles.faqAnswer}>
              실제 사용자 피드백에서 "면접에서 비슷한 질문이 나왔다"는 평가가 많습니다.
              당신의 이력서 경험과 기술을 바탕으로 면접관이 파고들 포인트를 정확히 예측합니다.
              현직 시니어 개발자 4명이 질문 품질을 검수합니다.
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              <span>ChatGPT랑 뭐가 다른가요?</span>
              <span className={styles.faqIcon}>+</span>
            </summary>
            <div className={styles.faqAnswer}>
              ChatGPT는 일반적인 질문을 생성하지만, QueryDaily는 <strong>당신의 이력서를 분석</strong>하여 맞춤 질문을 만듭니다.
              또한 매일 자동으로 발송되어 꾸준한 연습이 가능하며, STAR 기법 가이드를 함께 제공합니다.
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              <span>STAR 기법이 뭔가요?</span>
              <span className={styles.faqIcon}>+</span>
            </summary>
            <div className={styles.faqAnswer}>
              경험을 구조화해서 설명하는 방법입니다.<br />
              <strong>S</strong>ituation (상황), <strong>T</strong>ask (과제), <strong>A</strong>ction (행동), <strong>R</strong>esult (결과)로 답변을 구성하면 논리적이고 설득력 있게 들립니다.
              모든 질문에 STAR 기법 답변 가이드를 제공합니다.
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              <span>환불 정책은 어떻게 되나요?</span>
              <span className={styles.faqIcon}>+</span>
            </summary>
            <div className={styles.faqAnswer}>
              크리티컬 히트: 발송 전 100% 환불<br />
              그로스 플랜: 첫 질문 발송 전 100% 환불, 이후 남은 일수에 대해 일할 계산됩니다.
              불만족 시 이유 불문하고 환불해 드립니다.
            </div>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.section} style={{ textAlign: 'center' }}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '2rem' }}>
          합격은 <span className={styles.gradientText}>여유</span>에서 나옵니다.
        </h2>
        <p className={styles.sectionDesc} style={{ marginBottom: '3rem' }}>
          그 여유를 만들 충분한 시간, 하루 단 10분.
        </p>
        <a href="#pricing" className={styles.primaryBtn} style={{ padding: '1.5rem 3rem', fontSize: '1.2rem' }}>
          지금 시작하기
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          Query<span className={styles.highlight}>Daily</span>
        </div>
        <p>이력서 맞춤형 면접 질문 서비스</p>
        <p>&copy; 2024 QueryDaily. All rights reserved.</p>
      </footer>
    </div>
  );
}
