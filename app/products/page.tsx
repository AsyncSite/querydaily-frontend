'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProductsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  const handlePurchaseClick = (productName: string, price: string) => {
    // checkout 페이지로 이동하면서 상품 정보 전달
    router.push(`/checkout?product=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}`);
  };

  const confirmKakaoRedirect = () => {
    window.open('https://pf.kakao.com/_zxkxmUn/chat', '_blank');
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
              <span>베타 테스트 한정 특가</span>
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
              <span className={styles.step}>2. 주문 정보 입력</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.step}>3. 무통장입금</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.step}>4. 서비스 시작</span>
            </div>
          </div>

          {/* Product 1: 단건 면접 질문 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>단 하나의 질문으로 당락이 결정될 때</span>
              <h2 className={styles.productName}>크리티컬 히트</h2>
              <span className={styles.productEn}>Critical Hit</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                면접관이 가장 궁금해하는 그 질문<br/>
                24시간 내 이력서 분석 후 급소를 찌릅니다
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎯</span>
                <span className={styles.featureName}>핵심 질문</span>
                <span className={styles.featureValue}>1개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔗</span>
                <span className={styles.featureName}>꼬리 질문</span>
                <span className={styles.featureValue}>3개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📝</span>
                <span className={styles.featureName}>답변 가이드</span>
                <span className={styles.featureValue}>상세</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>⚠️</span>
                <span className={styles.featureName}>함정 포인트</span>
                <span className={styles.featureValue}>체크</span>
              </div>
            </div>

            <div className={styles.sampleBox}>
              <div className={styles.sampleLabel}>실제 예시</div>
              <div className={styles.sampleContent}>
                <div className={styles.blurred}>
                  Q: "Redis를 캐시로 사용하셨는데, 캐시 무효화 전략은 어떻게 가져가셨나요? Cache Aside와 Write Through의 차이점과 선택 이유를 설명해주세요."
                  <br/><br/>
                  A: [상세 답변 가이드 포함]
                </div>
                <span className={styles.locked}>🔒 구매 후 확인</span>
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩5,500</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩2,900</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 무통장입금 결제 후 24시간 내 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('크리티컬 히트', '₩2,900')}
              >
                무통장입금으로 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 100% 안전 결제 · 24시간 내 전달
              </p>
            </div>
          </div>

          {/* Product 2: 그로스 플랜 */}
          <div className={styles.product}>
            <div className={styles.bestBadge}>MOST BRUTAL</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>크리티컬 히트 × 22일</span>
              <h2 className={styles.productName}>그로스 플랜</h2>
              <span className={styles.productEn}>Growth Plan</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                매일 급소를 찌르는 질문 폭격<br/>
                22일 동안 당신의 약점을 모두 제거합니다
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎯</span>
                <span className={styles.featureName}>크리티컬 히트</span>
                <span className={styles.featureValue}>매일</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📅</span>
                <span className={styles.featureName}>제공 일수</span>
                <span className={styles.featureValue}>22일</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🏢</span>
                <span className={styles.featureName}>실제 기출</span>
                <span className={styles.featureValue}>포함</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📝</span>
                <span className={styles.featureName}>모범 답안</span>
                <span className={styles.featureValue}>전체</span>
              </div>
            </div>

            <div className={styles.warning}>
              ⚠️ 진짜 성장을 원하는 개발자만
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩121,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩49,900</span>
                <span className={styles.priceUnit}>/월</span>
                <span className={styles.discountTag}>베타 한정가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 무통장입금 결제 후 24시간 내 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('그로스 플랜', '₩49,900')}
              >
                무통장입금으로 결제하기 →
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
              <p className={styles.betaPaymentNotice}>* 무통장입금 결제 후 24시간 내 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('이력서 분석 리포트', '₩9,900')}
              >
                무통장입금으로 결제하기 →
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
              <p className={styles.betaPaymentNotice}>* 무통장입금 결제 후 24시간 내 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('라이브 인터뷰', '₩79,900')}
              >
                무통장입금으로 결제하기 →
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
              <h3 className={styles.faqQuestion}>Q. 무통장입금은 언제 확인되나요?</h3>
              <p className={styles.faqAnswer}>
                영업일 기준 1-2시간 내에 확인됩니다.
                입금 확인 후 24시간 내에 등록하신 이메일로 상품을 발송해드립니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 환불은 가능한가요?</h3>
              <p className={styles.faqAnswer}>
                크리티컬 히트와 이력서 분석 리포트는 작업 시작 전 100% 환불 가능합니다.
                그로스 플랜은 7일 이내 환불 가능하며, 일할 계산하여 환불해드립니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 세금계산서 발행이 가능한가요?</h3>
              <p className={styles.faqAnswer}>
                네, 가능합니다. 입금 확인 후 사업자 등록 번호로
                정식 세금계산서를 발행해드립니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 이력서는 어떻게 전달하나요?</h3>
              <p className={styles.faqAnswer}>
                주문 시 Notion, Google Docs, PDF 링크 등을 입력해주시면 됩니다.
                크리티컬 히트와 이력서 분석 리포트 상품에만 필요합니다.
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              상품 보러가기 ↑
            </button>
          </div>

        </div>
      </div>

      {/* Business Info Footer - 작고 간결하게 */}
      <footer className={styles.businessInfo}>
        <div className={styles.businessInfoContent}>
          <div className={styles.businessInfoFooter}>
            <div className={styles.footerLinks}>
              <a href="/terms" className={styles.footerLink}>이용약관</a>
              <span className={styles.divider}>|</span>
              <a href="/privacy" className={styles.footerLink}>개인정보처리방침</a>
              <span className={styles.divider}>|</span>
              <a href="/refund-policy" className={styles.footerLink}>환불정책</a>
              <span className={styles.divider}>|</span>
              <button
                className={styles.footerLinkBtn}
                onClick={() => setShowBusinessInfo(true)}
              >
                사업자정보
              </button>
            </div>
            <p className={styles.copyright}>© 2025 QueryDaily. All rights reserved.</p>
          </div>
        </div>
      </footer>

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

      {/* Business Info Modal */}
      {showBusinessInfo && (
        <div className={styles.modalOverlay} onClick={() => setShowBusinessInfo(false)}>
          <div className={styles.businessModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowBusinessInfo(false)}
            >
              ×
            </button>
            <h3 className={styles.businessModalTitle}>사업자 정보</h3>
            <div className={styles.businessModalContent}>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>상호명</span>
                <span className={styles.businessValue}>어싱크사이트</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>대표자</span>
                <span className={styles.businessValue}>최보임</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>사업자등록번호</span>
                <span className={styles.businessValue}>456-12-02771</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>사업장 주소</span>
                <span className={styles.businessValue}>경기도 화성시 동탄대로4길 18</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>대표전화</span>
                <span className={styles.businessValue}>010-8120-4131</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>이메일</span>
                <span className={styles.businessValue}>official.querydaily@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}