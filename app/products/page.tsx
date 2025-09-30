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
          </a>
        </header>

        {/* Main Content */}
        <div className={styles.content}>

          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.urgentBadge}>
              <span className={styles.fire}>🚀</span>
              <span>베타 테스터 한정 특가</span>
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

          {/* Product 1: 그로스 플랜 */}
          <div className={styles.product}>
            <div className={styles.bestBadge}>MOST POPULAR</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>20일 집중 훈련</span>
              <h2 className={styles.productName}>그로스 플랜</h2>
              <span className={styles.productEn}>Growth Plan</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                매일 새로운 맞춤 질문으로<br/>
                20일 동안 면접 실력을 완성합니다
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📅</span>
                <span className={styles.featureName}>매일 맞춤 질문</span>
                <span className={styles.featureValue}>20일</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🏢</span>
                <span className={styles.featureName}>실제 기출 포함</span>
                <span className={styles.featureValue}>제공</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📚</span>
                <span className={styles.featureName}>모범 답안 제공</span>
                <span className={styles.featureValue}>전체</span>
              </div>
            </div>

            <div className={styles.warning}>
              ⚠️ 진짜 성장을 원하는 개발자만
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩99,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩34,900</span>
                <span className={styles.discountTag}>베타 테스터 한정 특가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 20일간 매일 발송</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('그로스 플랜', '₩34,900')}
              >
                무통장입금으로 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 첫 질문 발송 전 100%, 이후 일할 계산
              </p>
            </div>
          </div>

          {/* Product 2: 리얼 인터뷰 */}
          <div className={styles.product}>
            <div className={styles.limitBadge}>PREMIUM</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>1:2 실전 모의면접</span>
              <h2 className={styles.productName}>리얼 인터뷰</h2>
              <span className={styles.productEn}>Real Interview</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                현직 면접관 2명과<br/>
                <span className={styles.emphasis}>90분간 실전 모의면접</span>
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>30분</span>
                <span className={styles.timelineDesc}>기술 면접</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>30분</span>
                <span className={styles.timelineDesc}>프로젝트 심층 질문</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>20분</span>
                <span className={styles.timelineDesc}>시스템 설계</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>10분</span>
                <span className={styles.timelineDesc}>즉시 피드백</span>
              </div>
            </div>

            <div className={styles.experts}>
              <span className={styles.expertsLabel}>면접관</span>
              <div className={styles.expertsList}>
                대기업 & 스타트업 현직 개발자 2명이 실전 면접 시뮬레이션
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩179,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩129,000</span>
                <span className={styles.discountTag}>베타 테스터 한정 특가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 90분 모의면접 1회</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('리얼 인터뷰', '₩129,000')}
              >
                무통장입금으로 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 면접 3일 전 100%, 1-2일 전 50%, 당일 불가
              </p>
            </div>
          </div>

          {/* Product 3: 크리티컬 히트 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>단 하나의 결정적 질문</span>
              <h2 className={styles.productName}>크리티컬 히트</h2>
              <span className={styles.productEn}>Critical Hit</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                면접관이 가장 궁금해하는 그 질문<br/>
                이력서 맞춤으로 핵심을 찌릅니다
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎯</span>
                <span className={styles.featureName}>이력서 맞춤 핵심 질문</span>
                <span className={styles.featureValue}>1개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔗</span>
                <span className={styles.featureName}>꼬리 질문</span>
                <span className={styles.featureValue}>3개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📝</span>
                <span className={styles.featureName}>상세 답변 가이드</span>
                <span className={styles.featureValue}>포함</span>
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
                <span className={styles.originalPrice}>₩4,900</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩1,900</span>
                <span className={styles.discountTag}>베타 테스터 한정 특가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 구매 즉시 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('크리티컬 히트', '₩1,900')}
              >
                무통장입금으로 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 콘텐츠 열람 전 100% 환불
              </p>
            </div>
          </div>

          {/* Product 4: 라스트 체크 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>면접 D-1 긴급 대비</span>
              <h2 className={styles.productName}>라스트 체크</h2>
              <span className={styles.productEn}>Last Check</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                내일이 면접인데 준비가 부족하다면<br/>
                <span className={styles.emphasis}>핵심 질문 15개로 1시간 완벽 대비</span>
              </p>
            </div>

            <div className={styles.preview}>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q1</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>기술 스택</span>
                  <p className={styles.qText}>왜 이 기술을 선택했나요?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q2</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>프로젝트</span>
                  <p className={styles.qText}>가장 큰 도전과제는?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.moreBox}>
                + 13개 추가 질문
              </div>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🚨</span>
                <span className={styles.featureName}>핵심 질문 15개</span>
                <span className={styles.featureValue}>1시간 완벽 대비</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🗣️</span>
                <span className={styles.featureName}>막힐 때 쓰는 만능 답변</span>
                <span className={styles.featureValue}>포함</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎯</span>
                <span className={styles.featureName}>즉시 사용 가능한 답변 템플릿</span>
                <span className={styles.featureValue}>제공</span>
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩29,900</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩19,900</span>
                <span className={styles.discountTag}>베타 테스터 한정 특가</span>
              </div>
              <p className={styles.betaPaymentNotice}>* 구매 즉시 제공</p>
              <button
                className={styles.buyBtn}
                onClick={() => handlePurchaseClick('라스트 체크', '₩19,900')}
              >
                무통장입금으로 결제하기 →
              </button>
              <p className={styles.guarantee}>
                ✅ 콘텐츠 열람 전 100% 환불
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
                크리티컬 히트와 라스트 체크는 콘텐츠 열람 전 100% 환불 가능합니다.
                그로스 플랜은 첫 질문 발송 전 100% 환불, 이후 일할 계산하여 환불해드립니다.
                리얼 인터뷰는 면접 3일 전 100%, 1-2일 전 50%, 당일 환불 불가입니다.
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
                크리티컬 히트 상품에만 필요합니다.
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