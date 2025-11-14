'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function HomePageV3() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 컴포넌트 마운트 시 텍스트 애니메이션 시작
  useEffect(() => {
    setTimeout(() => setIsTextVisible(true), 300);
  }, []);

  // 월말까지 남은 시간 계산
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <span className={styles.logoText}>
              Query<span className={styles.logoAccent}>Daily</span>
            </span>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
            <a href="#products" onClick={() => setMobileMenuOpen(false)}>상품</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>이용방법</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#products" className={styles.navCta} onClick={() => setMobileMenuOpen(false)}>
              신청하기
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* 배경 빛 효과 */}
        <div className={styles.lightEffect}></div>
        <div className={styles.lightEffect2}></div>

        {/* 메인 헤드라인 - 중앙 */}
        <div className={styles.heroCenterContent}>
          <h1 className={`${styles.mainHeadline} ${isTextVisible ? styles.visible : ''}`}>
            사실, 너는 <span className={styles.highlightText}>붙을 사람</span>.
          </h1>
        </div>

        {/* 하단 컨텐츠 */}
        <div className={styles.heroBottomContent}>
          <p className={`${styles.subHeadline} ${isTextVisible ? styles.visible : ''}`}>
            지피지기 백전백승. 면접관이 묻기 전에 내가 먼저 준비한다.
          </p>

          <p className={`${styles.description} ${isTextVisible ? styles.visible : ''}`}>
            <strong>하루 10분, 이력서 기반 맞춤 질문</strong>으로<br />
            습관을 만들고, 면접에서 흔들리지 않는 자신감을 만듭니다.
          </p>

          <button className={`${styles.ctaButton} ${isTextVisible ? styles.visible : ''}`}>
            이력서 맞춤 질문 받기 →
          </button>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2025년</div>
            <div className={styles.statLabel}>서비스 시작</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5.0/5.0</div>
            <div className={styles.statLabel}>사용자 만족도</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24시간 이내</div>
            <div className={styles.statLabel}>첫 질문 발송</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>환불 보장</div>
          </div>
        </div>
      </section>

      {/* 합격 공식 섹션 */}
      <section className={styles.formulaSection}>
        <div className={styles.formulaContainer}>
          <span className={styles.formulaBadge}>📊 데이터 기반</span>
          <h2 className={styles.formulaTitle}>
            실패 데이터 500개가 만든<br />
            합격 공식
          </h2>
          <p className={styles.formulaSubtitle}>
            면접 탈락자들의 공통 패턴을 분석해 만든 체계적인 준비 프로세스
          </p>

          {/* 3단계 타임라인 */}
          <div className={styles.timeline}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>이력서 분석</h3>
                <p className={styles.stepDescription}>
                  당신의 이력서를 AI가 분석해<br />
                  면접관이 물어볼 질문을 예측합니다
                </p>
              </div>
            </div>

            <div className={styles.timelineArrow}>→</div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>맞춤 질문 생성</h3>
                <p className={styles.stepDescription}>
                  당신의 경험과 기술 스택 기반<br />
                  실전형 질문을 매일 제공합니다
                </p>
              </div>
            </div>

            <div className={styles.timelineArrow}>→</div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>습관 형성</h3>
                <p className={styles.stepDescription}>
                  하루 10분, 꾸준한 연습으로<br />
                  면접 불안을 자신감으로 바꿉니다
                </p>
              </div>
            </div>
          </div>

          {/* 비포/애프터 비교 */}
          <div className={styles.comparison}>
            <div className={styles.comparisonCard}>
              <div className={`${styles.comparisonHeader} ${styles.before}`}>
                <span className={styles.comparisonIcon}>❌</span>
                <h4>QueryDaily 사용 전</h4>
              </div>
              <ul className={styles.comparisonList}>
                <li>"면접에서 뭐 물어볼지 모르겠어요"</li>
                <li>"이력서에 쓴 건데 설명 못했어요"</li>
                <li>"준비는 했는데 불안해요"</li>
                <li>"ChatGPT로 연습했는데 도움 안 됐어요"</li>
              </ul>
            </div>

            <div className={styles.comparisonArrow}>→</div>

            <div className={styles.comparisonCard}>
              <div className={`${styles.comparisonHeader} ${styles.after}`}>
                <span className={styles.comparisonIcon}>✅</span>
                <h4>QueryDaily 사용 후</h4>
              </div>
              <ul className={styles.comparisonList}>
                <li>"예상 질문이 실제로 나왔어요!"</li>
                <li>"내 경험을 논리적으로 설명할 수 있어요"</li>
                <li>"면접장에서 떨지 않았어요"</li>
                <li>"매일 10분으로 습관이 됐어요"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <span className={styles.testimonialsBadge}>💬 실제 사용자 후기</span>
          <h2 className={styles.testimonialsTitle}>
            실사용자들이<br />
            가장 만족한 포인트
          </h2>

          {/* 만족도 통계 */}
          <div className={styles.satisfactionStats}>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>5.0/5.0</div>
              <div className={styles.bigStatLabel}>평균 만족도</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>100%</div>
              <div className={styles.bigStatLabel}>재구매 의향</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>하루 10분</div>
              <div className={styles.bigStatLabel}>면접 준비 시간</div>
            </div>
          </div>

          {/* 워드클라우드 스타일 키워드 */}
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

      {/* 불안감 조성 섹션 */}
      <section className={styles.urgencySection}>
        <div className={styles.urgencyContainer}>
          <h2 className={styles.urgencyTitle}>
            면접 준비,<br />
            언제까지 미루실 건가요?
          </h2>

          {/* 합격률 비교 꺾은선 그래프 */}
          <div className={styles.comparisonGraph}>
            <div className={styles.graphTitle}>면접 준비 기간에 따른 합격률</div>

            {/* 그래프 범례 */}
            <div className={styles.graphLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="prepared"></div>
                <span className={styles.legendText}>✅ 체계적으로 준비한 경우</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="unprepared"></div>
                <span className={styles.legendText}>❌ 준비 없이 면접 본 경우</span>
              </div>
            </div>

            {/* SVG 꺾은선 그래프 */}
            <div className={styles.lineGraphContainer}>
              <svg className={styles.lineGraph} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* 그리드 라인 */}
                <line x1="50" y1="250" x2="550" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="50" y1="187.5" x2="550" y2="187.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="50" y1="125" x2="550" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="50" y1="62.5" x2="550" y2="62.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

                {/* Y축 레이블 */}
                <text x="30" y="255" fill="#9ca3af" fontSize="12" textAnchor="end">0%</text>
                <text x="30" y="192" fill="#9ca3af" fontSize="12" textAnchor="end">25%</text>
                <text x="30" y="130" fill="#9ca3af" fontSize="12" textAnchor="end">50%</text>
                <text x="30" y="67" fill="#9ca3af" fontSize="12" textAnchor="end">75%</text>
                <text x="30" y="35" fill="#9ca3af" fontSize="12" textAnchor="end">100%</text>

                {/* X축 레이블 */}
                <text x="50" y="275" fill="#9ca3af" fontSize="12" textAnchor="middle">0일</text>
                <text x="216.67" y="275" fill="#9ca3af" fontSize="12" textAnchor="middle">1주</text>
                <text x="383.33" y="275" fill="#9ca3af" fontSize="12" textAnchor="middle">2주</text>
                <text x="550" y="275" fill="#9ca3af" fontSize="12" textAnchor="middle">3주+</text>

                {/* 준비 없는 경우 라인 (낮고 완만한 상승) */}
                <path
                  d="M 50 226 L 216.67 218.75 L 383.33 212.5 L 550 212.5"
                  stroke="#6b7280"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.lineUnprepared}
                />

                {/* 준비한 경우 라인 (높고 가파른 상승) */}
                <path
                  d="M 50 226 L 216.67 175 L 383.33 93.75 L 550 31.25"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.linePrepared}
                />

                {/* 그라디언트 정의 */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                {/* 준비 없는 경우 데이터 포인트 */}
                <circle cx="50" cy="226" r="5" fill="#6b7280" className={styles.dataPoint}/>
                <circle cx="216.67" cy="218.75" r="5" fill="#6b7280" className={styles.dataPoint}/>
                <circle cx="383.33" cy="212.5" r="5" fill="#6b7280" className={styles.dataPoint}/>
                <circle cx="550" cy="212.5" r="5" fill="#6b7280" className={styles.dataPoint}/>

                {/* 준비한 경우 데이터 포인트 */}
                <circle cx="50" cy="226" r="5" fill="#8b5cf6" className={styles.dataPoint}/>
                <circle cx="216.67" cy="175" r="5" fill="#a855f7" className={styles.dataPoint}/>
                <circle cx="383.33" cy="93.75" r="5" fill="#d946ef" className={styles.dataPoint}/>
                <circle cx="550" cy="31.25" r="5" fill="#ec4899" className={styles.dataPoint}/>

                {/* 최종 값 레이블 */}
                <text x="550" y="205" fill="#9ca3af" fontSize="14" fontWeight="700" textAnchor="start" dx="10">38%</text>
                <text x="550" y="24" fill="#ec4899" fontSize="14" fontWeight="700" textAnchor="start" dx="10">85%</text>
              </svg>
            </div>

            <div className={styles.graphNote}>
              * 체계적인 준비는 합격률을 2배 이상 향상시킵니다
            </div>
          </div>

          <div className={styles.urgencyText}>
            <p className={styles.urgencyHighlight}>면접이 잡히고 준비하면 늦습니다.</p>
            <p className={styles.urgencyDescription}>
              준비되지 않은 상태로 면접장에 가는 것은<br />
              소중한 합격 기회를 스스로 포기하는 것과 같습니다.
            </p>
          </div>

          <a href="#products" className={styles.urgencyButton}>
            지금 바로 준비하기 →
          </a>
        </div>
      </section>

      {/* 상품 소개 섹션 */}
      <section className={styles.productsSection} id="products">
        <div className={styles.productsContainer}>
          <span className={styles.productsBadge}>💎 프리미엄 서비스</span>
          <h2 className={styles.productsTitle}>
            당신에게 맞는<br />
            면접 준비 솔루션
          </h2>
          <p className={styles.productsSubtitle}>
            이력서 기반 맞춤 질문으로 완벽하게 준비하세요
          </p>

          {/* 상품 카드 */}
          <div className={styles.productsGrid}>
            {/* 그로스 플랜 */}
            <div className={styles.productCard}>
              <div className={styles.productBadge}>MOST POPULAR</div>
              <div className={styles.productHeader}>
                <div className={styles.productLabel}>20일 집중 훈련</div>
                <h3 className={styles.productName}>그로스 플랜</h3>
                <p className={styles.productNameEn}>Growth Plan</p>
              </div>

              <p className={styles.productDescription}>
                20일간 매일 이력서 맞춤형 면접 질문을 받고, 실전처럼 준비하세요.
                AI가 분석한 당신의 이력서에서 나올 수 있는 모든 질문을 대비합니다.
              </p>

              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📅</span>
                  <span>매일 오전 7시, 저녁 5시 맞춤 질문 발송</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🏢</span>
                  <span>실제 기출 질문 포함</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📚</span>
                  <span>모범 답안 및 답변 가이드</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>💡</span>
                  <span>꼬리 질문 대비 팁</span>
                </div>
              </div>

              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩106,000</span>
                <span className={styles.priceCurrent}>₩49,000</span>
                <span className={styles.priceDiscount}>54% 할인</span>
              </div>

              <button className={styles.productButton}>
                자세히 보기 →
              </button>
            </div>

            {/* 크리티컬 히트 */}
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <div className={styles.productLabel}>단 하나의 결정적 질문</div>
                <h3 className={styles.productName}>크리티컬 히트</h3>
                <p className={styles.productNameEn}>Critical Hit</p>
              </div>

              <p className={styles.productDescription}>
                당신의 이력서에서 가장 중요한 3가지 질문과 프리미엄 답변 가이드.
                AI가 분석한 핵심 포인트로 면접 준비를 시작하세요.
              </p>

              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>이력서 맞춤 핵심 질문 3개</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📚</span>
                  <span>각 질문마다 프리미엄 답변 가이드</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>⭐</span>
                  <span>STAR 기법 답변 템플릿</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>⚡</span>
                  <span>결제 즉시 이메일 발송</span>
                </div>
              </div>

              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩15,900</span>
                <span className={styles.priceCurrent}>₩9,900</span>
                <span className={styles.priceDiscount}>38% 할인</span>
              </div>

              <button className={styles.productButton}>
                자세히 보기 →
              </button>
            </div>
          </div>

          {/* 11월 특가 배너 */}
          <div className={styles.specialOfferBanner}>
            <div className={styles.offerContent}>
              <div className={styles.offerBadge}>🔥 11월 한정 특가</div>
              <div className={styles.timerSection}>
                <span className={styles.timerText}>할인 종료까지</span>
                <div className={styles.timer}>
                  <div className={styles.timerBox}>
                    <span className={styles.timerValue}>{timeLeft.days}</span>
                    <span className={styles.timerUnit}>일</span>
                  </div>
                  <span className={styles.timerSeparator}>:</span>
                  <div className={styles.timerBox}>
                    <span className={styles.timerValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className={styles.timerUnit}>시</span>
                  </div>
                  <span className={styles.timerSeparator}>:</span>
                  <div className={styles.timerBox}>
                    <span className={styles.timerValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className={styles.timerUnit}>분</span>
                  </div>
                  <span className={styles.timerSeparator}>:</span>
                  <div className={styles.timerBox}>
                    <span className={styles.timerValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className={styles.timerUnit}>초</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ChatGPT vs QueryDaily 섹션 */}
      <section className={styles.vsSection}>
        <div className={styles.vsContainer}>
          <span className={styles.vsBadge}>🆚 비교</span>
          <h2 className={styles.vsTitle}>
            ChatGPT vs QueryDaily<br />
            뭐가 다를까?
          </h2>
          <p className={styles.vsSubtitle}>
            ChatGPT로 준비해봤지만 뭔가 부족했다면, 이 차이를 확인하세요
          </p>

          {/* VS 비교 표 */}
          <div className={styles.vsTable}>
            {/* 테이블 헤더 */}
            <div className={styles.vsTableHeader}>
              <div className={styles.vsTableHeaderCell}></div>
              <div className={`${styles.vsTableHeaderCell} ${styles.chatgpt}`}>
                <span className={styles.vsTableIcon}>💬</span>
                <h3>ChatGPT</h3>
              </div>
              <div className={`${styles.vsTableHeaderCell} ${styles.querydaily}`}>
                <span className={styles.vsTableIcon}>✨</span>
                <h3>QueryDaily</h3>
              </div>
            </div>

            {/* 행 1: 프롬프트 작성 */}
            <div className={styles.vsTableRow}>
              <div className={styles.vsTableCategory}>
                <span className={styles.categoryIcon}>⌨️</span>
                <h4>프롬프트 작성</h4>
              </div>
              <div className={styles.vsTableCell}>
                <p className={styles.cellContent}>
                  "내 이력서는 이러이러한데..."<br />
                  "이전 질문은..."<br />
                  <strong>매번 긴 프롬프트 작성 필요</strong>
                </p>
              </div>
              <div className={`${styles.vsTableCell} ${styles.highlight}`}>
                <p className={styles.cellContent}>
                  <strong>이력서 업로드 한 번으로 끝!</strong><br />
                  매일 자동으로 당신에게<br />
                  최적화된 질문 도착
                </p>
              </div>
            </div>

            {/* 행 2: 질문 유형 */}
            <div className={styles.vsTableRow}>
              <div className={styles.vsTableCategory}>
                <span className={styles.categoryIcon}>🎯</span>
                <h4>질문 유형</h4>
              </div>
              <div className={styles.vsTableCell}>
                <p className={styles.cellContent}>
                  "백엔드 개발자 면접 질문 알려줘"<br />
                  <strong>인터넷에서 찾을 수 있는 뻔한 질문</strong>
                </p>
              </div>
              <div className={`${styles.vsTableCell} ${styles.highlight}`}>
                <p className={styles.cellContent}>
                  "당신이 쓴 Redis 캐싱에서..."<br />
                  <strong>내 이력서 기반 맞춤형 질문</strong>
                </p>
              </div>
            </div>

            {/* 행 3: 학습 방식 */}
            <div className={styles.vsTableRow}>
              <div className={styles.vsTableCategory}>
                <span className={styles.categoryIcon}>📚</span>
                <h4>학습 방식</h4>
              </div>
              <div className={styles.vsTableCell}>
                <p className={styles.cellContent}>
                  질문 받고, 답변하고, 끝.<br />
                  <strong>일회성 연습, 습관 형성 어려움</strong>
                </p>
              </div>
              <div className={`${styles.vsTableCell} ${styles.highlight}`}>
                <p className={styles.cellContent}>
                  매일 정해진 시간에 질문 도착<br />
                  <strong>매일 10분 습관으로 실력 향상</strong>
                </p>
              </div>
            </div>

            {/* 행 4: 질문 깊이 */}
            <div className={styles.vsTableRow}>
              <div className={styles.vsTableCategory}>
                <span className={styles.categoryIcon}>🔍</span>
                <h4>질문 깊이</h4>
              </div>
              <div className={styles.vsTableCell}>
                <p className={styles.cellContent}>
                  "REST API가 뭔가요?"<br />
                  "Spring의 장점은?"<br />
                  <strong>표면적인 얕은 질문</strong>
                </p>
              </div>
              <div className={`${styles.vsTableCell} ${styles.highlight}`}>
                <p className={styles.cellContent}>
                  "API 응답시간 개선 시 트레이드오프는?"<br />
                  <strong>실전형 깊이 있는 질문</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신청 방법 섹션 */}
      <section className={styles.howToSection}>
        <div className={styles.howToContainer}>
          <span className={styles.howToBadge}>📝 신청 방법</span>
          <h2 className={styles.howToTitle}>
            3단계로 끝!<br />
            정말 간단합니다
          </h2>
          <p className={styles.howToSubtitle}>
            복잡한 절차 없이, 3분이면 시작할 수 있어요
          </p>

          {/* 3단계 - 카드 스타일 */}
          <div className={styles.stepsContainer}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumberWatermark}>01</div>
              <div className={styles.stepIconLarge}>🎯</div>
              <h3 className={styles.stepCardTitle}>상품 선택</h3>
              <p className={styles.stepCardDescription}>
                그로스 플랜 또는 크리티컬 히트<br />
                중 원하는 플랜을 선택하세요
              </p>
            </div>

            <div className={styles.stepArrowLarge}>→</div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberWatermark}>02</div>
              <div className={styles.stepIconLarge}>📄</div>
              <h3 className={styles.stepCardTitle}>이력서 첨부</h3>
              <p className={styles.stepCardDescription}>
                PDF, 워드 모두 가능하며<br />
                첨부 후 자동으로 AI가 분석합니다
              </p>
            </div>

            <div className={styles.stepArrowLarge}>→</div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumberWatermark}>03</div>
              <div className={styles.stepIconLarge}>💳</div>
              <h3 className={styles.stepCardTitle}>결제 완료!</h3>
              <p className={styles.stepCardDescription}>
                카드, 계좌이체 모두 가능<br />
                결제 즉시 서비스 이용 시작
              </p>
            </div>
          </div>

          {/* 안심 포인트 */}
          <div className={styles.trustSection}>
            <h3 className={styles.trustTitle}>💡 이런 점도 안심하세요</h3>
            <div className={styles.trustGrid}>
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>🔒</div>
                <h4 className={styles.trustCardTitle}>개인정보 보호</h4>
                <p className={styles.trustCardDescription}>
                  이력서는 암호화되어 안전하게<br />
                  보관되며 절대 외부 유출되지 않습니다
                </p>
              </div>

              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>💰</div>
                <h4 className={styles.trustCardTitle}>100% 환불 보장</h4>
                <p className={styles.trustCardDescription}>
                  서비스 이용 전이라면<br />
                  언제든 전액 환불 가능합니다
                </p>
              </div>

              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>⚡</div>
                <h4 className={styles.trustCardTitle}>즉시 시작</h4>
                <p className={styles.trustCardDescription}>
                  결제 후 바로 다음 날부터<br />
                  맞춤 질문을 받아볼 수 있습니다
                </p>
              </div>

              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>💬</div>
                <h4 className={styles.trustCardTitle}>24시간 고객 지원</h4>
                <p className={styles.trustCardDescription}>
                  궁금한 점은 언제든 문의하세요<br />
                  빠르게 답변드립니다
                </p>
              </div>
            </div>
          </div>

          <button className={styles.howToButton}>
            지금 바로 시작하기 →
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <span className={styles.faqBadge}>❓ 자주 묻는 질문</span>
          <h2 className={styles.faqTitle}>
            궁금하신 점이 있으신가요?
          </h2>
          <p className={styles.faqSubtitle}>
            자주 묻는 질문들을 모아봤어요
          </p>

          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>질문은 어떻게 받나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                그로스 플랜은 매일 오전 7시와 저녁 5시에 이메일로 발송됩니다.
                크리티컬 히트는 결제 후 24시간 이내에 3개의 질문이 한 번에 발송됩니다.
                모바일에서도 쉽게 확인할 수 있습니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>질문의 품질은 어떻게 보장되나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                기술 정확성, 통찰력, 공정성, 실무 관련성, 독창성 5가지 기준으로 품질 검증을 거칩니다.
                실제 면접에서 나올 법한 시나리오 기반 질문만 제공됩니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>환불 정책은 어떻게 되나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                그로스 플랜은 첫 질문 발송 전 100% 환불, 이후 일할 계산으로 환불됩니다.
                크리티컬 히트는 콘텐츠 열람 전 100% 환불 가능합니다.
                자세한 내용은 각 상품 페이지를 확인해주세요.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>어떤 기술 스택을 다루나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                Java/Spring 백엔드 개발자를 위한 서비스입니다.
                Spring Boot, JPA/Hibernate, MySQL/PostgreSQL, Redis, Kafka 등
                백엔드 생태계의 핵심 기술과 실무 경험을 중심으로 질문을 생성합니다.
              </div>
            </details>
          </div>

          {/* 카카오톡 상담 CTA */}
          <div className={styles.kakaoCtaSection}>
            <p className={styles.kakaoCtaText}>더 궁금한 점이 있으신가요?</p>
            <a
              href="http://pf.kakao.com/_fxdxfTG"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.kakaoCtaButton}
            >
              💬 카카오톡으로 1:1 상담하기 →
            </a>
          </div>
        </div>
      </section>

      {/* 서비스 만족도 평가 섹션 */}
      <section className={styles.feedbackSection}>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackHeader}>
            <span className={styles.feedbackBadge}>💭 여러분의 의견을 들려주세요</span>
            <h2 className={styles.sectionTitle}>서비스 만족도 평가</h2>
            <p className={styles.feedbackSubtitle}>
              QueryDaily를 사용해보신 경험을 공유해주세요.<br/>
              더 나은 서비스로 보답하겠습니다.
            </p>
          </div>

          <div className={styles.feedbackCards}>
            <a
              href="https://forms.gle/your-satisfaction-form"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.feedbackCard}
            >
              <div className={styles.feedbackIcon}>⭐</div>
              <h3 className={styles.feedbackCardTitle}>서비스 만족도 평가</h3>
              <p className={styles.feedbackCardDescription}>
                QueryDaily의 질문 품질, 서비스 경험에 대한<br/>
                솔직한 평가를 남겨주세요
              </p>
              <div className={styles.feedbackCardButton}>평가하러 가기 →</div>
            </a>

            <a
              href="https://forms.gle/your-suggestion-form"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.feedbackCard}
            >
              <div className={styles.feedbackIcon}>💡</div>
              <h3 className={styles.feedbackCardTitle}>상품 추가 건의</h3>
              <p className={styles.feedbackCardDescription}>
                이런 상품이 있으면 좋겠다는<br/>
                아이디어를 자유롭게 제안해주세요
              </p>
              <div className={styles.feedbackCardButton}>건의하러 가기 →</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                Query<span>Daily</span>
              </div>
              <p className={styles.footerDescription}>
                당신의 이력서를 분석해서,<br/>
                면접관이 꼭 물어볼 질문을 매일 보내드립니다.
              </p>

              {/* Social Links */}
              <div className={styles.footerSocials}>
                <a
                  href="https://www.instagram.com/querydaily"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="http://pf.kakao.com/_fxdxfTG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="KakaoTalk"
                >
                  💬
                </a>
                <a
                  href="mailto:contact@querydaily.com"
                  className={styles.socialLink}
                  aria-label="Email"
                >
                  ✉️
                </a>
              </div>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerSection}>
                <h4>상품</h4>
                <a href="#products">전체 상품</a>
                <a href="#products">면접 준비</a>
                <a href="#products">실전 연습</a>
              </div>

              <div className={styles.footerSection}>
                <h4>서비스</h4>
                <a href="#how-to">이용방법</a>
                <a href="#faq">자주 묻는 질문</a>
                <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer">1:1 상담</a>
              </div>

              <div className={styles.footerSection}>
                <h4>고객지원</h4>
                <a href="/terms">이용약관</a>
                <a href="/privacy">개인정보처리방침</a>
                <a href="/refund">환불정책</a>
              </div>

              <div className={styles.footerSection}>
                <h4>Contact</h4>
                <a href="mailto:contact@querydaily.com">contact@querydaily.com</a>
                <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer">카카오톡 상담</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              © 2024 QueryDaily. All rights reserved.
            </p>
            <p className={styles.footerCompany}>
              사업자등록번호: 123-45-67890 | 대표: QueryDaily
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}