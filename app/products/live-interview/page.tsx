'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function LiveInterviewPage() {
  const [remainingSlots, setRemainingSlots] = useState(3);

  const handlePurchase = () => {
    window.open('https://open.kakao.com/o/gKxyzABf', '_blank');
  };

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
          <div className={styles.premiumBadge}>
            <span>🎯 PREMIUM SERVICE</span>
          </div>

          <h1 className={styles.title}>
            현직 탑티어 개발자와의<br/>
            <span className={styles.highlight}>1:1 실전 모의면접</span>
          </h1>

          <p className={styles.subtitle}>
            45분간의 실전과 같은 면접 경험<br/>
            즉시 피드백으로 당신의 약점을 정확히 파악하세요
          </p>

          <div className={styles.urgencyNotice}>
            <span className={styles.slots}>⚠️ 이번 달 남은 자리: {remainingSlots}석</span>
          </div>
        </div>
      </div>

      {/* Expert Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            검증된 면접관과 함께합니다
          </h2>

          <div className={styles.experts}>
            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>👨‍💻</div>
              <div className={styles.expertInfo}>
                <h3>시니어 백엔드 개발자</h3>
                <div className={styles.expertCredentials}>
                  <p>🏢 네카라쿠배 현직</p>
                  <p>📚 100+ 면접 경험</p>
                  <p>👥 50+ 멘토링 경험</p>
                </div>
              </div>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>👩‍💻</div>
              <div className={styles.expertInfo}>
                <h3>테크 리드 개발자</h3>
                <div className={styles.expertCredentials}>
                  <p>🏢 유니콘 스타트업 CTO</p>
                  <p>📚 200+ 면접관 경험</p>
                  <p>✍️ 기술 블로그 50만 조회</p>
                </div>
              </div>
            </div>
          </div>

          <p className={styles.expertNote}>
            * 실제 면접관 경험이 있는 검증된 전문가만 선별하여 매칭합니다
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            45분 동안 경험하게 될 것
          </h2>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.time}>0-5분</div>
              <div className={styles.timelineContent}>
                <h3>🤝 아이스브레이킹</h3>
                <p>간단한 자기소개와 긴장 완화</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.time}>5-35분</div>
              <div className={styles.timelineContent}>
                <h3>💼 실전 면접</h3>
                <p>이력서 기반 기술 질문 + 라이브 코딩 (선택)</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.time}>35-45분</div>
              <div className={styles.timelineContent}>
                <h3>📝 즉시 피드백</h3>
                <p>강점, 약점, 개선 포인트 상세 피드백</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            라이브 인터뷰만의 <span className={styles.accent}>특별한 가치</span>
          </h2>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎯</div>
              <h3>실전과 동일한 압박감</h3>
              <p>
                혼자 연습할 때는 느낄 수 없는 실제 면접의 긴장감을 경험합니다.
                이 경험이 실제 면접에서의 자신감으로 이어집니다.
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🔍</div>
              <h3>즉각적인 꼬리 질문</h3>
              <p>
                답변에 따라 실시간으로 이어지는 추가 질문으로
                사고의 깊이를 테스트하고 확장시킵니다.
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>📊</div>
              <h3>객관적인 수준 평가</h3>
              <p>
                현재 당신의 면접 실력이 어느 정도인지,
                합격 가능성은 얼마나 되는지 솔직한 평가를 받습니다.
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>💡</div>
              <h3>맞춤형 개선 전략</h3>
              <p>
                단순한 피드백이 아닌, 당신의 상황에 맞는
                구체적인 개선 방법과 학습 로드맵을 제시합니다.
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎥</div>
              <h3>비언어적 피드백</h3>
              <p>
                답변 내용뿐만 아니라 말하는 속도, 시선 처리,
                자세 등 종합적인 면접 태도까지 코칭합니다.
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🚀</div>
              <h3>업계 인사이트</h3>
              <p>
                현직자만이 알 수 있는 회사별 면접 스타일과
                평가 기준에 대한 실전 팁을 공유합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>진행 과정</h2>

          <div className={styles.process}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>STEP 1</div>
              <h3>신청 및 결제</h3>
              <p>카카오톡 상담 후 일정 조율</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>STEP 2</div>
              <h3>이력서 사전 검토</h3>
              <p>면접관이 이력서 분석 후 질문 준비</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>STEP 3</div>
              <h3>모의면접 진행</h3>
              <p>Zoom으로 45분간 실전 면접</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>STEP 4</div>
              <h3>피드백 리포트</h3>
              <p>면접 후 24시간 내 서면 피드백 제공</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            왜 라이브 인터뷰여야 할까요?
          </h2>

          <div className={styles.comparison}>
            <div className={styles.comparisonItem}>
              <h3>❌ 혼자 준비할 때</h3>
              <ul className={styles.cons}>
                <li>실전 긴장감 부족</li>
                <li>객관적 평가 불가</li>
                <li>꼬리 질문 대비 어려움</li>
                <li>비언어적 요소 놓침</li>
              </ul>
            </div>

            <div className={styles.comparisonItem}>
              <h3>✅ 라이브 인터뷰</h3>
              <ul className={styles.pros}>
                <li>실전과 동일한 환경</li>
                <li>전문가의 객관적 평가</li>
                <li>실시간 꼬리 질문 대응</li>
                <li>종합적인 면접 태도 코칭</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>실제 경험자 후기</h2>

          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <div className={styles.testimonialQuote}>
                "실제 면접보다 더 떨렸어요. 그래서 오히려 실제 면접에서는 편안하게 임할 수 있었습니다.
                특히 즉시 피드백이 정말 도움됐어요."
              </div>
              <div className={styles.testimonialAuthor}>
                - 김*현님, 카카오 최종 합격
              </div>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <div className={styles.testimonialQuote}>
                "제가 모르고 있던 말버릇과 표정까지 짚어주셨어요.
                기술 질문뿐만 아니라 전체적인 면접 스킬이 향상됐습니다."
              </div>
              <div className={styles.testimonialAuthor}>
                - 박*수님, 네이버 최종 합격
              </div>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <div className={styles.testimonialQuote}>
                "79,000원이 아깝지 않았어요. 연봉 협상에서 훨씬 많은 금액을 받을 수 있었으니까요.
                자신감이 생긴 게 가장 큰 수확입니다."
              </div>
              <div className={styles.testimonialAuthor}>
                - 이*진님, 쿠팡 최종 합격
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.section} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className={styles.sectionContainer}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h2 className={styles.pricingTitle}>라이브 인터뷰</h2>
              <div className={styles.pricingBadge}>
                <span>베타 기간 특별가</span>
              </div>
              <div className={styles.limitedBadge}>
                <span>🔥 이번 달 {remainingSlots}자리만 남음</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.originalPrice}>
                <span>정가</span>
                <span className={styles.strikethrough}>99,000원</span>
              </div>
              <div className={styles.discountPrice}>
                <span className={styles.priceAmount}>79,000원</span>
                <span className={styles.discount}>20% 할인</span>
              </div>
            </div>

            <div className={styles.includes}>
              <h4>포함 내용</h4>
              <ul>
                <li>✅ 45분 1:1 모의면접</li>
                <li>✅ 이력서 사전 분석</li>
                <li>✅ 실시간 꼬리 질문</li>
                <li>✅ 즉시 구두 피드백</li>
                <li>✅ 24시간 내 서면 피드백</li>
                <li>✅ 개선 로드맵 제공</li>
              </ul>
            </div>

            <button className={styles.purchaseBtn} onClick={handlePurchase}>
              라이브 인터뷰 신청하기 →
            </button>

            <div className={styles.betaInfo}>
              <p className={styles.betaInfoText}>
                💬 현재 베타 운영 중으로, 카카오톡 상담을 통해 1:1 일정 조율 및 결제 안내를 드리고 있습니다.
              </p>
            </div>

            <div className={styles.guarantee}>
              <p>
                <strong>100% 만족 보장</strong><br/>
                면접이 만족스럽지 않으신가요?<br/>
                24시간 내 문의주시면 전액 환불해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>Q. 어떤 플랫폼으로 진행되나요?</h3>
              <p>Zoom을 통해 진행되며, 카메라는 선택사항입니다. 편안한 환경에서 진행하실 수 있습니다.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Q. 라이브 코딩도 하나요?</h3>
              <p>선택사항입니다. 신청 시 라이브 코딩 포함 여부를 선택하실 수 있습니다.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Q. 피드백은 어떤 형태로 받나요?</h3>
              <p>면접 직후 10분간 구두 피드백을 받고, 24시간 내에 상세한 서면 피드백을 이메일로 받으실 수 있습니다.</p>
            </div>

            <div className={styles.faqItem}>
              <h3>Q. 일정 변경이 가능한가요?</h3>
              <p>24시간 전까지 1회 변경 가능합니다. 당일 취소는 환불이 불가합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.sectionContainer}>
          <h2>면접이 두려우신가요?</h2>
          <p>실전 경험이 최고의 준비입니다</p>
          <button className={styles.purchaseBtnLarge} onClick={handlePurchase}>
            지금 바로 라이브 인터뷰 예약하기
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