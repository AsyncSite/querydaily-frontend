'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function HomePageV3() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 컴포넌트 마운트 시 텍스트 애니메이션 시작
  useEffect(() => {
    setTimeout(() => setIsTextVisible(true), 300);
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
            <div className={styles.statNumber}>2024년</div>
            <div className={styles.statLabel}>서비스 시작</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>4.8/5.0</div>
            <div className={styles.statLabel}>평균 만족도</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>924명+</div>
            <div className={styles.statLabel}>누적 수강생</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>82%</div>
            <div className={styles.statLabel}>면접 합격률</div>
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
            베타 테스터들이<br />
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
              <div className={styles.bigStatNumber}>4명</div>
              <div className={styles.bigStatLabel}>베타 테스터</div>
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

      {/* 상품 소개 섹션 */}
      <section className={styles.productsSection}>
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
    </div>
  );
}