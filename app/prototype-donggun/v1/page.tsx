/**
 * QueryDaily v1: "내일의 질문, 오늘 답하기"
 *
 * 핵심 컨셉: 시간의 역전
 * - 애플 iPod "주머니 속의 1000곡" (공간의 역전)
 * - QueryDaily "내일의 질문, 오늘 답하기" (시간의 역전)
 *
 * UI 전략:
 * - 3D 카드 플립으로 시간 역전 시각화
 * - 시계 역방향 애니메이션
 * - 카운터 애니메이션
 * - 인터랙티브 토글 (일반 vs 이력서 기반)
 * - 세로 타임라인 스크롤 애니메이션
 *
 * 참고: Linear의 미니멀리즘 + Stripe의 그라디언트
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function V1TimeReversePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [questionToggle, setQuestionToggle] = useState(false); // false: 일반, true: 이력서
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // 카드 플립 자동 애니메이션 (8초 주기)
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 8000);
    return () => clearInterval(flipInterval);
  }, []);

  // 카운터 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const finalValue = parseFloat(target.dataset.target || '0');
            const isDecimal = target.dataset.decimal === 'true';
            animateCounter(target, finalValue, isDecimal);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  // 스크롤 트리거 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const animateCounter = (element: HTMLElement, target: number, isDecimal: boolean) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = isDecimal ? target.toFixed(1) : target.toString();
        clearInterval(timer);
      } else {
        element.textContent = isDecimal
          ? current.toFixed(1)
          : Math.floor(current).toString();
      }
    }, duration / steps);
  };

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
              시작하기
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - 시간 역전 카드 플립 */}
      <section className={styles.hero}>
        {/* 배경: 시계 역방향 애니메이션 */}
        <div className={styles.timeVortex}>
          <div className={styles.clockCircle}></div>
          <div className={styles.clockHand}></div>
        </div>
        <div className={styles.lightEffect}></div>
        <div className={styles.lightEffect2}></div>

        <div className={styles.heroContent}>
          {/* 3D 카드 플립 */}
          <div className={`${styles.timeCard} ${isFlipped ? styles.flipped : ''}`}>
            {/* 앞면: 내일 (불안) */}
            <div className={`${styles.cardSide} ${styles.cardFront}`}>
              <span className={styles.timeLabel}>내일 면접장</span>
              <div className={styles.questionMark}>?</div>
              <p className={styles.emotionText}>불안한 당신</p>
            </div>

            {/* 뒷면: 오늘 (자신감) */}
            <div className={`${styles.cardSide} ${styles.cardBack}`}>
              <span className={styles.timeLabel}>오늘의 준비</span>
              <div className={styles.checkMark}>✓</div>
              <p className={styles.emotionText}>준비된 당신</p>
            </div>
          </div>

          {/* 메인 타이틀 */}
          <h1 className={styles.mainTitle}>
            내일의 질문, <span className={styles.highlightText}>오늘 답하기</span>
          </h1>

          <p className={styles.subtitle}>
            당신의 이력서가 면접 질문을 예측합니다
          </p>

          <p className={styles.subDescription}>
            100명이 넘는 개발자가 매일 연습하고 있습니다
          </p>

          {/* 타임라인 인디케이터 */}
          <div className={styles.timelineIndicator}>
            <div className={styles.timePoint}>
              <span className={styles.timeText}>오전 7시</span>
              <span className={styles.timeLabel}>질문 도착</span>
            </div>
            <div className={styles.timeLine}>
              <div className={styles.flowLine}></div>
            </div>
            <div className={styles.timePoint}>
              <span className={styles.timeText}>저녁 5시</span>
              <span className={styles.timeLabel}>질문 도착</span>
            </div>
          </div>

          <a href="#products" className={styles.ctaButton}>
            <span>시간을 역전시키기</span>
            <div className={styles.ripple}></div>
          </a>
        </div>
      </section>

      {/* 통계 섹션 - 카운터 애니메이션 */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className="counter" data-target="100">0</div>
            <div className={styles.statUnit}>군데</div>
            <div className={styles.statLabel}>지원했지만</div>
            <div className={styles.statSublabel}>면접은 단 3번</div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <div className="counter" data-target="87">0</div>
            <div className={styles.statUnit}>%</div>
            <div className={styles.statLabel}>경력 1년+</div>
            <div className={styles.statSublabel}>요구 공고</div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <div className="counter" data-target="3.2" data-decimal="true">0</div>
            <div className={styles.statUnit}>초</div>
            <div className={styles.statLabel}>첫인상</div>
            <div className={styles.statSublabel}>판단 시간</div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={`${styles.statItem} ${styles.statHighlight}`}>
            <div className={styles.statBut}>BUT</div>
            <div className={styles.statMessage}>
              당신은 이미<br/>충분히 경험했습니다
            </div>
          </div>
        </div>
      </section>

      {/* 차별점 섹션 - 인터랙티브 토글 */}
      <section className={styles.differenceSection} data-section="difference">
        <div className={`${styles.differenceContainer} ${visibleSections.has('difference') ? styles.visible : ''}`}>
          <span className={styles.sectionBadge}>💡 핵심 차별점</span>
          <h2 className={styles.sectionTitle}>
            이력서가 예측합니다
          </h2>
          <p className={styles.sectionSubtitle}>
            ChatGPT는 일반론을 말합니다.<br/>
            QueryDaily는 당신의 경험을 예측합니다.
          </p>

          {/* 토글 스위치 */}
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${!questionToggle ? styles.active : ''}`}
              onClick={() => setQuestionToggle(false)}
            >
              일반 질문 (ChatGPT)
            </button>
            <button
              className={`${styles.toggleButton} ${questionToggle ? styles.active : ''}`}
              onClick={() => setQuestionToggle(true)}
            >
              이력서 기반 (QueryDaily)
            </button>
          </div>

          {/* 질문 디스플레이 */}
          <div className={styles.questionDisplay}>
            {!questionToggle ? (
              // 일반 질문
              <div className={`${styles.questionPanel} ${styles.fadeIn}`} key="general">
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>❌</span>
                  <p>"Spring Boot의 장점은 무엇인가요?"</p>
                </div>
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>❌</span>
                  <p>"JPA를 사용하는 이유는?"</p>
                </div>
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>❌</span>
                  <p>"Redis는 왜 사용하나요?"</p>
                </div>
                <div className={styles.verdict}>
                  <span className={styles.verdictIcon}>😴</span>
                  <p>누구에게나 똑같은 질문 → 외우기만 하면 됨</p>
                </div>
              </div>
            ) : (
              // 이력서 기반 질문
              <div className={`${styles.questionPanel} ${styles.fadeIn}`} key="custom">
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>✅</span>
                  <p>"3번 프로젝트에서 Spring Boot를 선택한 이유는? Django가 아닌?"</p>
                </div>
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>✅</span>
                  <p>"JPA N+1 문제를 실제로 겪었나요? 어떻게 해결했나요?"</p>
                </div>
                <div className={styles.questionItem}>
                  <span className={styles.questionIcon}>✅</span>
                  <p>"Redis 장애 시 대처법은? 실제 경험 말씀해주세요"</p>
                </div>
                <div className={`${styles.verdict} ${styles.positive}`}>
                  <span className={styles.verdictIcon}>🎯</span>
                  <p>당신만의 경험 → STAR 기법으로 구조화</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 타임라인 섹션 - 세로 스크롤 애니메이션 */}
      <section id="how-it-works" className={styles.timelineSection} ref={timelineRef}>
        <div className={styles.timelineContainer}>
          <span className={styles.sectionBadge}>⏰ 시간을 역전시키는 3단계</span>
          <h2 className={styles.sectionTitle}>
            내일을 오늘 준비하는 방법
          </h2>

          {/* 중앙 시간축 */}
          <div className={styles.timeAxis}>
            <div className={styles.axisLine}></div>
          </div>

          {/* 단계별 카드 (좌우 교차) */}
          <div className={styles.timelineSteps}>
            <div
              className={`${styles.timelineStep} ${styles.left}`}
              data-section="step1"
            >
              <div className={`${styles.stepCard} ${visibleSections.has('step1') ? styles.visible : ''}`}>
                <div className={styles.stepTime}>5분</div>
                <div className={styles.stepIcon}>📄</div>
                <h3 className={styles.stepTitle}>이력서 분석</h3>
                <p className={styles.stepDescription}>
                  AI가 당신의 경험을 읽습니다<br/>
                  어떤 질문이 나올지 예측합니다
                </p>
              </div>
            </div>

            <div
              className={`${styles.timelineStep} ${styles.right}`}
              data-section="step2"
            >
              <div className={`${styles.stepCard} ${visibleSections.has('step2') ? styles.visible : ''}`}>
                <div className={styles.stepTime}>매일 2회</div>
                <div className={styles.stepIcon}>🔮</div>
                <h3 className={styles.stepTitle}>질문 예측</h3>
                <p className={styles.stepDescription}>
                  오전 7시, 저녁 5시<br/>
                  내일의 질문이 도착합니다
                </p>
              </div>
            </div>

            <div
              className={`${styles.timelineStep} ${styles.left}`}
              data-section="step3"
            >
              <div className={`${styles.stepCard} ${visibleSections.has('step3') ? styles.visible : ''}`}>
                <div className={styles.stepTime}>10분</div>
                <div className={styles.stepIcon}>💪</div>
                <h3 className={styles.stepTitle}>오늘 준비</h3>
                <p className={styles.stepDescription}>
                  STAR 기법으로 답변 구조화<br/>
                  하루 10분, 매일 연습
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 후기 섹션 */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <span className={styles.sectionBadge}>💬 실제 사용자 후기</span>
          <h2 className={styles.sectionTitle}>
            예측이 맞았습니다
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
              <div className={styles.bigStatLabel}>추천 의향</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.bigStat}>
              <div className={styles.bigStatNumber}>하루 10분</div>
              <div className={styles.bigStatLabel}>준비 시간</div>
            </div>
          </div>

          {/* 키워드 클라우드 */}
          <div className={styles.keywordCloud}>
            <span className={styles.keyword} data-size="xxl">이력서 기반 예측</span>
            <span className={styles.keyword} data-size="xl">STAR 기법</span>
            <span className={styles.keyword} data-size="lg">답변 가이드</span>
            <span className={styles.keyword} data-size="xxl">실전 질문</span>
            <span className={styles.keyword} data-size="md">매일 연습</span>
            <span className={styles.keyword} data-size="xl">자신감</span>
            <span className={styles.keyword} data-size="lg">맞춤 질문</span>
            <span className={styles.keyword} data-size="md">꼬리 질문 대비</span>
            <span className={styles.keyword} data-size="xl">정확한 예측</span>
          </div>

          {/* 만족도 차트 */}
          <div className={styles.chartGrid}>
            <div className={styles.chartItem}>
              <img src="/images/satisfication.png" alt="전반적 만족도" className={styles.chartImage} />
            </div>
            <div className={styles.chartItem}>
              <img src="/images/chart2.png" alt="구체적으로 도움된 점" className={styles.chartImage} />
            </div>
          </div>
        </div>
      </section>

      {/* 상품 섹션 - 여정 프로그레스 */}
      <section id="products" className={styles.productsSection}>
        <div className={styles.productsContainer}>
          <span className={styles.sectionBadge}>🎯 시작하는 방법</span>
          <h2 className={styles.sectionTitle}>
            내일을 오늘 준비하세요
          </h2>

          {/* 여정 프로그레스 바 */}
          <div className={styles.journeyProgress}>
            <div className={styles.progressLine}>
              <div className={styles.progressPoint} data-step="start">
                <span>시작</span>
              </div>
              <div className={styles.progressPoint} data-step="experience">
                <span>경험하기</span>
              </div>
              <div className={styles.progressPoint} data-step="complete">
                <span>완주하기</span>
              </div>
            </div>
          </div>

          {/* 상품 카드 2개 */}
          <div className={styles.productsGrid}>
            {/* 크리티컬 히트 */}
            <div className={styles.productCard}>
              <div className={styles.cardBadge}>입문자용</div>
              <div className={styles.productHeader}>
                <h3 className={styles.productName}>크리티컬 히트</h3>
                <p className={styles.productTagline}>핵심 3질문 예측</p>
              </div>

              <div className={styles.productDescription}>
                가장 중요한 3가지 질문을 예측합니다.<br/>
                오늘 답을 준비하세요
              </div>

              <div className={styles.featureList}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>이력서 기반 핵심 질문 3개</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📚</span>
                  <span>STAR 기법 답변 가이드</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>⚡</span>
                  <span>결제 후 24시간 내 발송</span>
                </div>
              </div>

              <div className={styles.productPrice}>
                <span className={styles.price}>₩9,900</span>
                <span className={styles.originalPrice}>정가 ₩15,900</span>
              </div>

              <button
                className={styles.productCta}
                onClick={() => router.push('/v2/products/critical-hit')}
              >
                가볍게 시작하기 →
              </button>
            </div>

            {/* 그로스 플랜 */}
            <div className={`${styles.productCard} ${styles.featured}`}>
              <div className={styles.cardBadge}>MOST POPULAR</div>
              <div className={styles.productHeader}>
                <h3 className={styles.productName}>그로스 플랜</h3>
                <p className={styles.productTagline}>20일간 모든 질문 예측</p>
              </div>

              <div className={styles.productDescription}>
                이력서의 모든 경험을 질문으로 예측합니다.<br/>
                20일간 매일 답을 준비하세요
              </div>

              <div className={styles.featureList}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📅</span>
                  <span>매일 오전 7시, 저녁 5시</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📚</span>
                  <span>모든 질문에 STAR 가이드</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>💡</span>
                  <span>꼬리 질문 대비 팁</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>총 40개 예상 질문</span>
                </div>
              </div>

              <div className={styles.productPrice}>
                <span className={styles.price}>₩49,000</span>
                <span className={styles.originalPrice}>정가 ₩106,000</span>
              </div>

              <button
                className={`${styles.productCta} ${styles.featured}`}
                onClick={() => router.push('/v2/products/growth-plan')}
              >
                본격적으로 준비하기 →
              </button>
            </div>
          </div>

          {/* 상품 선택 가이드 */}
          <div className={styles.productGuide}>
            <h3 className={styles.guideTitle}>어떤 것을 선택하면 좋을까요?</h3>
            <div className={styles.guideGrid}>
              <div className={styles.guideItem}>
                <p className={styles.guideQuestion}>"일단 어떤 건지 경험해보고 싶어요"</p>
                <p className={styles.guideAnswer}>→ <strong>크리티컬 히트</strong> (₩9,900)</p>
              </div>
              <div className={styles.guideItem}>
                <p className={styles.guideQuestion}>"모든 질문에 제대로 대비하고 싶어요"</p>
                <p className={styles.guideAnswer}>→ <strong>그로스 플랜</strong> (₩49,000)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>이력서 기반 예측이 정확한가요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                실제 사용자 피드백에서 "면접에서 비슷한 질문이 나왔다"는 평가가 많습니다.<br/><br/>
                당신의 이력서 경험과 기술을 바탕으로 면접관이 파고들 포인트를 정확히 예측합니다.<br/>
                현직 시니어 개발자 4명이 질문 품질을 검수합니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>STAR 기법이 뭔가요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                경험을 구조화해서 설명하는 방법입니다.<br/><br/>
                <strong>S</strong>ituation: 어떤 상황이었나요?<br/>
                <strong>T</strong>ask: 무엇을 해야 했나요?<br/>
                <strong>A</strong>ction: 어떻게 했나요?<br/>
                <strong>R</strong>esult: 결과는 어땠나요?<br/><br/>
                모든 질문에 STAR 기법 답변 가이드를 제공합니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>환불 정책은 어떻게 되나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                <strong>24시간 내 100% 환불 보장</strong><br/><br/>
                크리티컬 히트: 구매 후 24시간 내<br/>
                그로스 플랜: 첫 질문 발송 전<br/><br/>
                환불 사유는 묻지 않습니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>어떤 기술 스택을 다루나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                <strong>Java/Spring 백엔드 개발자</strong>를 위한 서비스입니다.<br/><br/>
                Spring Boot, JPA/Hibernate, MySQL/PostgreSQL, Redis, Kafka 등<br/>
                백엔드 생태계의 핵심 기술을 중심으로 질문을 생성합니다.
              </div>
            </details>
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
              <p className={styles.footerTagline}>내일의 질문, 오늘 답하기</p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerSection}>
                <h4>상품</h4>
                <a href="#products">그로스 플랜</a>
                <a href="#products">크리티컬 히트</a>
              </div>

              <div className={styles.footerSection}>
                <h4>고객지원</h4>
                <a href="#faq">FAQ</a>
                <a href="/terms">이용약관</a>
                <a href="/privacy">개인정보처리방침</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 QueryDaily. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
