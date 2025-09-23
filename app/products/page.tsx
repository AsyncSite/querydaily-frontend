'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ProductsPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date('2025-09-27T23:59:59+09:00'); // September 27, 2025, Korean time
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePurchaseClick = (productName: string) => {
    setSelectedProduct(productName);
    setShowModal(true);
  };

  const confirmKakaoRedirect = () => {
    window.open('https://open.kakao.com/o/s57VJtTh', '_blank');
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mobileContainer}>
        {/* Header */}
        <header className={styles.header}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
            <span className={styles.betaTag}>BETA</span>
          </a>
        </header>

        {/* Main Content */}
        <div className={styles.content}>

          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.urgentBadge}>
              <span className={styles.fire}>🔥</span>
              <span>베타 종료까지</span>
              <span className={styles.countdown}>
                {timeLeft.days > 0 && `${timeLeft.days}일 `}
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <h1 className={styles.mainTitle}>
              면접관의 허를 찌르는<br/>
              <span className={styles.highlight}>결정적 질문</span>을 미리 경험해요
            </h1>

            <p className={styles.subtitle}>
              Java/Spring 백엔드 개발자를 위한<br/>
              가장 날카로운 면접 트레이닝
            </p>

            {/* Beta Process Guide */}
            <div className={styles.processGuide}>
              <span className={styles.step}>1. 상품 선택</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.step}>2. 카톡 상담</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.step}>3. 결제 진행</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.step}>4. 서비스 시작</span>
            </div>
          </div>

          {/* Product 1: 오늘의 쿼리 해설 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>오늘 질문에 답 못하셨죠?</span>
              <h2 className={styles.productName}>오늘의 쿼리 해설</h2>
              <span className={styles.productEn}>Query Insight</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeQuestion}>
                "높은 동시성 환경에서 재고 차감이나 포인트 적립 같은 critical section을 어떻게 처리하셨나요?"
              </p>
              <p className={styles.challengeText}>
                이 질문에 막힌다면, 당신은 아직 주니어입니다
              </p>
            </div>

            <div className={styles.transform}>
              <div className={styles.transformBefore}>
                <span className={styles.transformLabel}>지금 당신</span>
                <div className={styles.transformBox}>
                  "동시성 문제는... synchronized 쓰거나 @Transactional 붙이면..."
                </div>
              </div>
              <div className={styles.transformAfter}>
                <span className={styles.transformLabel}>해설 후</span>
                <div className={styles.transformBox}>
                  <div className={styles.blurred}>
                    데이터베이스 레벨 락, 애플리케이션 레벨 락, 분산 환경에서의 Redis 기반 락, 각각의 데드락 가능성과 처리량 영향도, 그리고 Event Sourcing이나 SAGA 패턴 같은 대안적 접근까지 고려한 종합적 답변
                  </div>
                  <span className={styles.locked}>🔒 잠김</span>
                </div>
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩2,500</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩1,900</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 카톡 상담 후 결제 진행</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('오늘의 쿼리 해설')}
              >
                카톡으로 신청 및 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 100% 안전 결제 · 24시간 내 환불 가능
              </p>
            </div>
          </div>

          {/* Product 2: 그로스 플랜 */}
          <div className={styles.product}>
            <div className={styles.bestBadge}>MOST BRUTAL</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>3일 챌린지만으론 부족하다</span>
              <h2 className={styles.productName}>그로스 플랜</h2>
              <span className={styles.productEn}>Growth Plan</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                매일 당신의 한계를 시험합니다<br/>
                주니어의 한계를 넘어, 시니어의 시야를 경험하세요
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>⚡</span>
                <span className={styles.featureName}>매일 질문</span>
                <span className={styles.featureValue}>월 22개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📊</span>
                <span className={styles.featureName}>시스템 설계</span>
                <span className={styles.featureValue}>매주</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔥</span>
                <span className={styles.featureName}>트렌드</span>
                <span className={styles.featureValue}>매월</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✏️</span>
                <span className={styles.featureName}>첨삭</span>
                <span className={styles.featureValue}>월 1회</span>
              </div>
            </div>

            <div className={styles.warning}>
              ⚠️ 진짜 성장을 원하는 개발자만
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩39,900</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩29,900</span>
                <span className={styles.priceUnit}>/월</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 카톡 상담 후 결제 진행</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('그로스 플랜')}
              >
                카톡으로 신청 및 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 100% 안전 결제 · 언제든 해지 가능
              </p>
            </div>
          </div>

          {/* Product 3: 이력서 분석 리포트 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>면접 1주일 전 필수</span>
              <h2 className={styles.productName}>이력서 분석 리포트</h2>
              <span className={styles.productEn}>Resume Analytics</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                당신의 이력서에서 나올<br/>
                <span className={styles.emphasis}>모든 공격 포인트 50개</span>를 예측
              </p>
            </div>

            <div className={styles.preview}>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q1</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>MSA 전환</span>
                  <p className={styles.qText}>가장 큰 도전과제는?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q2</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>Spring Boot</span>
                  <p className={styles.qText}>선택 이유와 장단점?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.moreBox}>
                + 48개 추가 질문
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩59,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩49,000</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 카톡 상담 후 결제 진행</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('이력서 분석 리포트')}
              >
                카톡으로 신청 및 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 100% 안전 결제 · 24시간 내 전달
              </p>
            </div>
          </div>

          {/* Product 4: 라이브 인터뷰 */}
          <div className={styles.product}>
            <div className={styles.limitBadge}>⚠️ 3자리 남음</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>진짜 실전</span>
              <h2 className={styles.productName}>라이브 인터뷰</h2>
              <span className={styles.productEn}>Live Interview</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                현직 시니어 개발자와<br/>
                <span className={styles.emphasis}>45분간 진검승부</span>
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>10분</span>
                <span className={styles.timelineDesc}>이력서 압박 질문</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>20분</span>
                <span className={styles.timelineDesc}>실전 코딩 테스트</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>10분</span>
                <span className={styles.timelineDesc}>시스템 설계</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>5분</span>
                <span className={styles.timelineDesc}>즉석 피드백</span>
              </div>
            </div>

            <div className={styles.experts}>
              <span className={styles.expertsLabel}>면접관</span>
              <div className={styles.expertsList}>
                N사 시니어 · K사 테크리드 · T사 아키텍트
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩99,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩79,000</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 카톡 상담 후 결제 진행</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('라이브 인터뷰')}
              >
                카톡으로 신청 및 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 100% 안전 결제 · 세션 녹화 제공
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>자주 묻는 질문</h2>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 왜 카톡으로 결제하나요?</h3>
              <p className={styles.faqAnswer}>
                현재 베타 기간으로, 사용자님의 니즈를 정확히 파악하고
                최적의 서비스를 제공하기 위해 1:1 상담을 진행하고 있습니다.
                정식 오픈 후에는 자동 결제 시스템이 도입될 예정입니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 결제는 안전한가요?</h3>
              <p className={styles.faqAnswer}>
                네, 100% 안전합니다. 카톡 상담 후 정식 세금계산서 발행이 가능하며,
                카드결제 및 계좌이체 모두 가능합니다. 24시간 내 환불도 보장합니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 어떤 결제 수단이 가능한가요?</h3>
              <p className={styles.faqAnswer}>
                카드결제, 계좌이체, 토스페이 등 다양한 결제 수단을 지원합니다.
                상담 시 편하신 방법으로 결제하실 수 있도록 안내드립니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 언제부터 서비스를 이용할 수 있나요?</h3>
              <p className={styles.faqAnswer}>
                결제 완료 즉시 서비스를 이용하실 수 있습니다.
                이력서 분석 리포트는 24시간 내, 라이브 인터뷰는 일정 조율 후 진행됩니다.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className={styles.finalCta}>
            <h2 className={styles.ctaTitle}>
              최고의 투자는<br/>
              <span className={styles.ctaHighlight}>바로 당신의 성장입니다</span>
            </h2>
            <button
              className={styles.ctaBtn}
              onClick={() => handlePurchaseClick('상품')}
            >
              지금 신청하기
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>베타 기간 특별 안내</h3>
            <div className={styles.modalBody}>
              <p className={styles.modalProduct}>{selectedProduct}</p>
              <p className={styles.modalText}>
                현재 베타 기간으로 카카오톡을 통해<br/>
                신청 및 결제를 진행하고 있습니다.
              </p>
              <div className={styles.modalFeatures}>
                <div className={styles.modalFeature}>
                  <span className={styles.checkIcon}>✅</span>
                  <span>안전한 결제</span>
                </div>
                <div className={styles.modalFeature}>
                  <span className={styles.checkIcon}>✅</span>
                  <span>24시간 내 환불 가능</span>
                </div>
                <div className={styles.modalFeature}>
                  <span className={styles.checkIcon}>✅</span>
                  <span>즉시 서비스 시작</span>
                </div>
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className={styles.modalConfirm}
                onClick={confirmKakaoRedirect}
              >
                카톡 결제 진행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}