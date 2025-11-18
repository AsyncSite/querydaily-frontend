'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { ThemeProvider, ThemeSelector, useTheme, themes } from './ThemeContext';

type HeroVariant = 'v2' | 'donggun' | 'jiyeon';

function LandingPageContent() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('v2');

  // Hero entrance animation
  useEffect(() => {
    setTimeout(() => setIsTextVisible(true), 300);
  }, []);

  // Enable smooth scroll for this page only
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Hero variants array for carousel
  const heroVariants: HeroVariant[] = ['v2', 'donggun', 'jiyeon'];

  // Navigate to previous/next hero
  const handlePrevHero = () => {
    setIsTextVisible(false);
    const currentIndex = heroVariants.indexOf(heroVariant);
    const prevIndex = currentIndex === 0 ? heroVariants.length - 1 : currentIndex - 1;
    setHeroVariant(heroVariants[prevIndex]);
    setTimeout(() => setIsTextVisible(true), 100);
  };

  const handleNextHero = () => {
    setIsTextVisible(false);
    const currentIndex = heroVariants.indexOf(heroVariant);
    const nextIndex = currentIndex === heroVariants.length - 1 ? 0 : currentIndex + 1;
    setHeroVariant(heroVariants[nextIndex]);
    setTimeout(() => setIsTextVisible(true), 100);
  };

  return (
    <>
      {/* Fixed CTA */}
      <div className={styles.fixedCta}>
        <div className={styles.fixedCtaContainer}>
          <div className={styles.fixedCtaText}>
            <div className={styles.fixedCtaTitle}>Query<span>Daily</span></div>
            <div className={styles.fixedCtaSubtitle}>이력서 맞춤형 면접 질문 서비스</div>
          </div>
          <a href="#products" className={styles.fixedCtaButton}>
            지금 시작하기
          </a>
        </div>
      </div>

      {/* Theme Selector */}
      <ThemeSelector />

      <div className={styles.container}>

        {/* Hero Section - 100vh Full Screen, Centered */}
        <section className={styles.hero}>
          {/* Light Effects - Reduced opacity */}
          <div className={styles.lightEffect}></div>
          <div className={styles.lightEffect2}></div>

          {/* Carousel Navigation */}
          <button className={`${styles.carouselBtn} ${styles.carouselPrev}`} onClick={handlePrevHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className={`${styles.carouselBtn} ${styles.carouselNext}`} onClick={handleNextHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* V2 Hero (현재) */}
          {heroVariant === 'v2' && (
            <div className={styles.heroContainer}>
              <h1 className={`${styles.heroTitle} ${styles.heroTitleLarge} ${isTextVisible ? styles.visible : ''}`}>
                당신은<br/>
                <span className={styles.highlight}>합격할 사람입니다</span>
              </h1>

              <p className={`${styles.heroSubtitle} ${isTextVisible ? styles.visible : ''}`}>
                합격 스토리는 이미 당신의 이력서에 있습니다.<br/>
                <strong>하루 10분, 20일이면 충분합니다.</strong>
              </p>

              <a href="#products" className={`${styles.heroBtn} ${isTextVisible ? styles.visible : ''}`}>
                면접 준비 시작하기
              </a>
            </div>
          )}

          {/* Donggun Hero */}
          {heroVariant === 'donggun' && (
            <div className={styles.heroContainer}>
              <h1 className={`${styles.heroTitle} ${styles.heroTitleLarge} ${isTextVisible ? styles.visible : ''}`}>
                내일의 질문, <span className={styles.highlight}>오늘 답하기</span>
              </h1>

              <p className={`${styles.heroSubtitle} ${isTextVisible ? styles.visible : ''}`}>
                면접관이 묻기 전에 미리 준비합니다
              </p>

              <p className={`${styles.heroDesc} ${isTextVisible ? styles.visible : ''}`}>
                <strong>하루 10분, 이력서 기반 맞춤 질문</strong>으로 면접에서 흔들리지 않는 자신감을 만듭니다
              </p>

              <a href="#products" className={`${styles.heroBtn} ${isTextVisible ? styles.visible : ''}`}>
                내일의 질문 받아보기 →
              </a>
            </div>
          )}

          {/* Jiyeon Hero */}
          {heroVariant === 'jiyeon' && (
            <div className={styles.heroContainer}>
              <h1 className={`${styles.heroTitle} ${styles.heroTitleLarge} ${isTextVisible ? styles.visible : ''}`}>
                사실, 너는 <span className={styles.highlight}>붙을 사람</span>.
              </h1>

              <p className={`${styles.heroSubtitle} ${isTextVisible ? styles.visible : ''}`}>
                지피지기 백전백승. 면접관이 묻기 전에 내가 먼저 준비한다.
              </p>

              <p className={`${styles.heroDesc} ${isTextVisible ? styles.visible : ''}`}>
                <strong>하루 10분, 이력서 기반 맞춤 질문</strong>으로 습관을 만들고, 면접에서 흔들리지 않는 자신감을 만듭니다.
              </p>

              <a href="#products" className={`${styles.heroBtn} ${isTextVisible ? styles.visible : ''}`}>
                이력서 맞춤 질문 받기 →
              </a>
            </div>
          )}

          {/* Scroll Hint */}
          <div className={styles.scrollHint}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </section>

        {/* Testimonials Section */}
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

            {/* Satisfaction Stats - Simplified */}
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

            {/* Keyword Cloud */}
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

        {/* Statistics Section - Simplified */}
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            <h2 className={styles.statisticsTitle}>
              준비한 사람만 합격합니다
            </h2>

            {/* Data Source - Minimized single line */}
            <div className={styles.dataSource}>
              <p>데이터 출처: Glassdoor, Preplaced, Novoresume (2024-2025)</p>
            </div>

            <div className={styles.statsGrid}>
              {/* Main Stat - 70% */}
              <div className={styles.mainStat}>
                <div className={styles.statNumber}>70<span className={styles.percent}>%</span></div>
                <div className={styles.statLabel}>채용 담당자가 꼽은 가장 흔한 탈락 이유:<br/><strong>"준비 부족"</strong></div>
              </div>

              {/* Supporting Stats - Inline */}
              <div className={styles.supportingStats}>
                <div className={styles.supportingStat}>
                  <div className={styles.supportingNumber}>90<span className={styles.percent}>%</span></div>
                  <div className={styles.supportingLabel}>성공한 후보자가<br/>미리 질문을 연습</div>
                </div>

                <div className={styles.supportingStat}>
                  <div className={styles.supportingNumber}>92<span className={styles.percent}>%</span></div>
                  <div className={styles.supportingLabel}>모의 면접을<br/>필수로 생각</div>
                </div>

                <div className={styles.supportingStat}>
                  <div className={styles.supportingNumber}>55<span className={styles.percent}>%</span></div>
                  <div className={styles.supportingLabel}>비언어적 소통이<br/>면접 성공 좌우</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Rate Chart Section */}
        <section className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <h2 className={styles.chartTitle}>
              면접 준비 기간에 따른 합격률
            </h2>

            {/* Graph Legend */}
            <div className={styles.graphLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="prepared"></div>
                <span className={styles.legendText}>체계적으로 준비한 경우</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="unprepared"></div>
                <span className={styles.legendText}>준비 없이 면접 본 경우</span>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className={styles.lineGraphContainer}>
              <svg className={styles.lineGraph} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* Grid Lines */}
                <line x1="50" y1="250" x2="550" y2="250" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="187.5" x2="550" y2="187.5" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="125" x2="550" y2="125" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="62.5" x2="550" y2="62.5" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>

                {/* Y-axis Labels */}
                <text x="30" y="255" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">0%</text>
                <text x="30" y="192" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">25%</text>
                <text x="30" y="130" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">50%</text>
                <text x="30" y="67" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">75%</text>
                <text x="30" y="35" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">100%</text>

                {/* X-axis Labels */}
                <text x="50" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">0일</text>
                <text x="216.67" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">1주</text>
                <text x="383.33" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">2주</text>
                <text x="550" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">3주+</text>

                {/* Unprepared Line (low and flat) */}
                <path
                  d="M 50 226 L 216.67 218.75 L 383.33 212.5 L 550 212.5"
                  stroke="var(--color-text-muted)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.lineUnprepared}
                />

                {/* Prepared Line (high and steep) */}
                <path
                  d="M 50 226 L 216.67 175 L 383.33 93.75 L 550 31.25"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.linePrepared}
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={theme.secondary} />
                    <stop offset="100%" stopColor={theme.secondaryLight} />
                  </linearGradient>
                </defs>

                {/* Unprepared Data Points */}
                <circle cx="50" cy="226" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="216.67" cy="218.75" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="383.33" cy="212.5" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="550" cy="212.5" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>

                {/* Prepared Data Points */}
                <circle cx="50" cy="226" r="5" fill={theme.secondary} className={styles.dataPoint}/>
                <circle cx="216.67" cy="175" r="5" fill={theme.secondary} className={styles.dataPoint}/>
                <circle cx="383.33" cy="93.75" r="5" fill={theme.secondaryLight} className={styles.dataPoint}/>
                <circle cx="550" cy="31.25" r="5" fill={theme.secondaryLight} className={styles.dataPoint}/>

                {/* Final Value Labels */}
                <text x="560" y="218" fill="var(--color-text-muted)" fontSize="14" fontWeight="700">38%</text>
                <text x="560" y="38" fill={theme.secondaryLight} fontSize="14" fontWeight="700">85%</text>
              </svg>
            </div>

            <p className={styles.chartNote}>
              * 체계적인 준비는 합격률을 2배 이상 향상시킵니다
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.products}>
          <div className={styles.productsContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>시작하기</span>
              <h2 className={styles.sectionTitle}>내일을 오늘 준비하세요</h2>
            </div>

            <div id="products" className={styles.pricingGrid}>
              {/* Growth Plan - Featured */}
              <div className={`${styles.productCard} ${styles.featured}`}>
                <div className={styles.planBadge}>MOST POPULAR</div>

                <h3 className={styles.planTitle}>그로스 플랜</h3>
                <p className={styles.planSubtitle}>20일간 모든 질문 예측</p>

                <div className={styles.planDesc}>
                  이력서의 모든 경험을 질문으로 예측합니다.<br />
                  20일간 매일 답을 준비하세요
                </div>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>매일 오전 7시, 저녁 5시 발송</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>총 20개 맞춤 질문 (20일간)</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>모든 질문에 STAR 기법 가이드</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>꼬리 질문 대비 팁</span>
                  </div>
                </div>

                <div className={styles.planPrice}>
                  <span className={styles.priceCurrent}>₩49,000</span>
                  <span className={styles.priceOriginal}>정가 ₩106,000</span>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.planBtn} ${styles.featured}`}
                    onClick={() => {
                      // TODO: Direct purchase flow
                      router.push('/prototype-hyundoo/v2/products/growth-plan');
                    }}
                  >
                    지금 구매하기
                  </button>
                  <button
                    className={styles.detailBtn}
                    onClick={() => router.push('/prototype-hyundoo/v2/products/growth-plan')}
                  >
                    상세 보기
                  </button>
                </div>
              </div>

              {/* Critical Hit */}
              <div className={styles.productCard}>
                <div className={styles.planBadge}>빠른 경험</div>

                <h3 className={styles.planTitle}>크리티컬 히트</h3>
                <p className={styles.planSubtitle}>핵심 3질문 예측</p>

                <div className={styles.planDesc}>
                  가장 중요한 3가지 질문을 예측합니다.<br />
                  오늘 답을 준비하세요
                </div>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>핵심 질문 3개 예측</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>STAR 기법 답변 가이드</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>결제 후 24시간 내 발송</span>
                  </div>
                  <div className={`${styles.feature} ${styles.featureEmpty}`}>
                    <span className={styles.featureCheck} style={{visibility: 'hidden'}}>✓</span>
                    <span style={{visibility: 'hidden'}}>Spacer</span>
                  </div>
                </div>

                <div className={styles.planPrice}>
                  <span className={styles.priceCurrent}>₩9,900</span>
                  <span className={styles.priceOriginal}>정가 ₩15,900</span>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={styles.planBtn}
                    onClick={() => {
                      // TODO: Direct purchase flow
                      router.push('/prototype-hyundoo/v2/products/critical-hit');
                    }}
                  >
                    지금 구매하기
                  </button>
                  <button
                    className={styles.detailBtn}
                    onClick={() => router.push('/prototype-hyundoo/v2/products/critical-hit')}
                  >
                    상세 보기
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.chooseGuide}>
              <div className={styles.guideItem}>
                <p className={styles.guideQ}>"일단 경험해보고 싶어요"</p>
                <p className={styles.guideA}>→ <strong>크리티컬 히트</strong></p>
              </div>
              <div className={styles.guideItem}>
                <p className={styles.guideQ}>"모든 질문에 제대로 대비하고 싶어요"</p>
                <p className={styles.guideA}>→ <strong>그로스 플랜</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section - UI Improved */}
        <section className={styles.comparison}>
          <div className={styles.comparisonContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>핵심 차별점</span>
              <h2 className={styles.sectionTitle}>
                ChatGPT는 일반론을 말합니다.<br/>
                QueryDaily는 당신의 경험을 묻습니다.
              </h2>
            </div>

            <div className={styles.comparisonGrid}>
              {/* General Questions */}
              <div className={styles.compCard}>
                <div className={styles.compHeader}>
                  <h3>일반 질문</h3>
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

              {/* Resume-based Questions */}
              <div className={`${styles.compCard} ${styles.positive}`}>
                <div className={`${styles.compHeader} ${styles.positive}`}>
                  <h3>이력서 기반 질문</h3>
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
                <div className={`${styles.compFooter} ${styles.positive}`}>
                  <p>당신이 직접 겪은 문제<br />→ 구체적인 해결 과정</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className={styles.whoWeAre}>
          <div className={styles.whoWeAreContainer}>
            <div className={styles.whoWeAreHeader}>
              <span className={styles.whoWeAreBadge}>이 서비스를 만든 사람들</span>
              <h2 className={styles.sectionTitle}>
                실패 데이터 500개가 만든<br/>
                <span className={styles.whoWeAreHighlight}>합격 공식</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                비전공자 / 국비지원 출신의 가장 평범한 개발자들이<br/>
                직접 증명하며 만든 초밀착 코칭 서비스
              </p>
            </div>

            <div className={styles.failureStats}>
              <div className={styles.failureStat}>
                <div className={styles.failureNumber}>500<span>+</span></div>
                <div className={styles.failureLabel}>서류 탈락</div>
              </div>
              <div className={styles.failureStatDivider}></div>
              <div className={styles.failureStat}>
                <div className={styles.failureNumber}>100<span>+</span></div>
                <div className={styles.failureLabel}>면접 경험</div>
              </div>
              <div className={styles.failureStatDivider}></div>
              <div className={styles.failureStat}>
                <div className={styles.failureNumber}>300<span>%</span></div>
                <div className={styles.failureLabel}>평균 연봉 인상</div>
              </div>
            </div>

            <div className={styles.expertGrid}>
              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondaryLight, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad1)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>현) 판교 N사 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>국비지원 수료생</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>판교 대기업</span>
                </div>
                <p className={styles.expertStory}>
                  300번의 탈락 데이터를 분석해 합격 공식을 찾았어요<br/>
                  국비생에서 2년만에 연봉 2배↗
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.secondaryLight, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad2)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>현) 유니콘 B사 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>SI 야근지옥</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>유니콘 스타트업</span>
                </div>
                <p className={styles.expertStory}>
                  5번의 이직으로 찾은 최적 경로<br/>
                  100개 기업 면접에서 발견한 합격 시그널
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.primaryLight, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad3)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>전) 커머스 C사 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>무명 스타트업</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>대형 커머스</span>
                </div>
                <p className={styles.expertStory}>
                  트래픽 폭탄 맞으며 배운 진짜 개발<br/>
                  그 생존법으로 다져진 실무 경험
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.primary, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad4)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>현) 테크 기업 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>CS 전공</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>판교 테크 기업</span>
                </div>
                <p className={styles.expertStory}>
                  탄탄한 이론과 10개 이상의 시스템 설계 경험으로<br/>
                  실무와 이론의 균형을 잡아드려요
                </p>
              </div>
            </div>

            <div className={styles.teamSummary}>
              <p className={styles.summaryMain}>
                수십 번의 탈락과 수백 번의 <span className={styles.highlight}>삽질</span>,<br/>
                그리고 실제 성공한 <span className={styles.highlight}>데이터</span>로 증명합니다.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

            <div className={styles.faqList}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>이력서 기반 예측이 정확한가요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  실제 사용자 피드백에서 "면접에서 비슷한 질문이 나왔다"는 평가가 많습니다.<br /><br />
                  당신의 이력서 경험과 기술을 바탕으로 면접관이 파고들 포인트를 정확히 예측합니다.<br />
                  현직 시니어 개발자 4명이 질문 품질을 검수합니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>ChatGPT랑 뭐가 다른가요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  ChatGPT는 일반적인 질문을 생성하지만, QueryDaily는 <strong>당신의 이력서를 분석</strong>하여 맞춤 질문을 만듭니다.<br /><br />
                  또한 매일 자동으로 발송되어 꾸준한 연습이 가능하며, STAR 기법 가이드를 함께 제공합니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>STAR 기법이 뭔가요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  경험을 구조화해서 설명하는 방법입니다.<br /><br />
                  <strong>S</strong>ituation: 어떤 상황이었나요?<br />
                  <strong>T</strong>ask: 무엇을 해야 했나요?<br />
                  <strong>A</strong>ction: 어떻게 했나요?<br />
                  <strong>R</strong>esult: 결과는 어땠나요?<br /><br />
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
                  그로스 플랜: 첫 질문 발송 전 100% 환불, 이후 남은 일수에 대해 일할 계산<br /><br />
                  환불 사유는 묻지 않습니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>어떤 기술 스택을 다루나요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <strong>백엔드 개발자</strong>를 위한 서비스입니다.<br /><br />
                  Spring, Node.js, Django, FastAPI 등 주요 프레임워크와<br />
                  MySQL, PostgreSQL, MongoDB, Redis 등 데이터베이스,<br />
                  그리고 AWS, Docker, Kubernetes 등<br />
                  <strong>당신의 이력서에 있는 모든 기술</strong>을 다룹니다.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerLogo}>
              Query<span>Daily</span>
            </div>
            <p className={styles.footerText}>이력서 맞춤형 면접 질문 서비스</p>
            <p className={styles.footerCopy}>&copy; 2024 QueryDaily. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function HomePageV2() {
  return (
    <ThemeProvider>
      <LandingPageContent />
    </ThemeProvider>
  );
}
