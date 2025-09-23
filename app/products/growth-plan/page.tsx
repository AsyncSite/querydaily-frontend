'use client';

import styles from './page.module.css';

export default function GrowthPlanPage() {
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
          <div className={styles.badge}>
            <span>✨ 3일 챌린지를 완료하셨나요?</span>
          </div>

          <h1 className={styles.title}>
            과거 경험 정리를 넘어,<br/>
            <span className={styles.highlight}>미래 성장을 위한 훈련</span>을 시작하세요
          </h1>

          <p className={styles.subtitle}>
            지난 3일간, 좋은 질문이 주는 성장의 자극을 경험하셨습니다.<br/>
            이제 그 성장을 당신의 <strong>'일상'</strong>으로 만드세요.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>매일</div>
              <div className={styles.statLabel}>맞춤 질문 + 해설</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>매주</div>
              <div className={styles.statLabel}>시스템 설계 챌린지</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>매월</div>
              <div className={styles.statLabel}>기술 트렌드 Q&A</div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Comparison Table */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            어떤 선택이 <span className={styles.accent}>가장 현명</span>할까요?
          </h2>

          <div className={styles.comparisonTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.featureCol}>제공 가치</th>
                  <th className={styles.freeCol}>
                    <div className={styles.planName}>무료 체험</div>
                    <div className={styles.planPrice}>3일 한정</div>
                  </th>
                  <th className={styles.singleCol}>
                    <div className={styles.planName}>단건 구매</div>
                    <div className={styles.planPrice}>1,900원~</div>
                  </th>
                  <th className={styles.growthCol}>
                    <div className={styles.recommended}>BEST</div>
                    <div className={styles.planName}>그로스 플랜</div>
                    <div className={styles.planPrice}>
                      <span className={styles.originalPrice}>39,900원</span>
                      <span className={styles.discountPrice}>29,900원/월</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이력서 기반 맞춤 질문</td>
                  <td className={styles.center}>3개</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>매일 (약 22개/월)</strong></td>
                </tr>
                <tr>
                  <td>프리미엄 답변 해설</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>1개</td>
                  <td className={styles.center}><strong>✅ 모든 질문 포함</strong></td>
                </tr>
                <tr>
                  <td>개인 대시보드</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>✅</strong></td>
                </tr>
                <tr>
                  <td>시스템 설계 챌린지</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>✅ 매주</strong></td>
                </tr>
                <tr>
                  <td>기술 트렌드 Q&A</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>✅ 매월</strong></td>
                </tr>
                <tr>
                  <td>답변 첨삭 크레딧</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>✅ 월 1회</strong></td>
                </tr>
                <tr>
                  <td>Q&A 라이브러리 접근</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}>❌</td>
                  <td className={styles.center}><strong>✅ 무제한</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Beyond Resume Section */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            이력서를 넘어,<br/>
            <span className={styles.accent}>지속적인 성장</span>을 위한 특별 혜택
          </h2>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>📈</div>
              <h3>매일 맞춤 질문 + 프리미엄 답변 해설</h3>
              <p>
                매일 아침 9시, 당신의 이력서를 분석한 맞춤 질문과<br/>
                완벽한 답변을 위한 상세 가이드를 제공합니다.
              </p>
              <ul>
                <li>질문 의도 분석</li>
                <li>STAR 기법 답변 구조</li>
                <li>페르소나별 답변 예시</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🏗️</div>
              <h3>주간 시스템 설계 챌린지</h3>
              <p>
                "주니어의 한계를 넘어 시니어의 시야를 갖추세요"<br/>
                매주 금요일, 대규모 서비스를 가정한 아키텍처 문제
              </p>
              <ul>
                <li>실제 서비스 사례 기반</li>
                <li>확장성/성능 고려사항</li>
                <li>트레이드오프 분석</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🔥</div>
              <h3>월간 기술 트렌드 Q&A</h3>
              <p>
                "요즘 네카라쿠배에서는 이런 걸 묻습니다"<br/>
                최신 기술 동향과 대기업 면접 트렌드 분석
              </p>
              <ul>
                <li>최신 기술 스택 질문</li>
                <li>기출 변형 문제</li>
                <li>업계 트렌드 인사이트</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✍️</div>
              <h3>월 1회, 답변 첨삭 크레딧</h3>
              <p>
                "진짜 전문가의 피드백으로 답변을 완성하세요"<br/>
                본인 답변을 제출하면 전문가가 서면 피드백 제공
              </p>
              <ul>
                <li>개인화된 피드백</li>
                <li>개선 포인트 제시</li>
                <li>모범 답안 비교</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>📚</div>
              <h3>멤버 전용 Q&A 라이브러리</h3>
              <p>
                다른 구독자들이 받았던 좋은 질문과 답변을<br/>
                익명으로 열람하며 학습 시야를 확장하세요
              </p>
              <ul>
                <li>카테고리별 정리</li>
                <li>난이도별 분류</li>
                <li>북마크 기능</li>
              </ul>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>📊</div>
              <h3>개인 대시보드</h3>
              <p>
                과거에 받았던 모든 질문과 답변을<br/>
                언제든 다시 볼 수 있는 나만의 무기고
              </p>
              <ul>
                <li>학습 히스토리</li>
                <li>강점/약점 분석</li>
                <li>성장 그래프</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>어떻게 진행되나요?</h2>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>📅</div>
              <div className={styles.timelineContent}>
                <h3>매일 아침 9시</h3>
                <p>이력서 기반 맞춤 질문 + 완벽한 해설</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>🎯</div>
              <div className={styles.timelineContent}>
                <h3>매주 금요일</h3>
                <p>시스템 설계 챌린지 문제 발송</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>🚀</div>
              <div className={styles.timelineContent}>
                <h3>매월 1일</h3>
                <p>기술 트렌드 Q&A + 답변 첨삭 크레딧 제공</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>📈</div>
              <div className={styles.timelineContent}>
                <h3>언제든지</h3>
                <p>개인 대시보드와 Q&A 라이브러리 무제한 접근</p>
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
              <h2 className={styles.pricingTitle}>그로스 플랜</h2>
              <div className={styles.pricingBadge}>
                <span>베타 테스터 특별가</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.originalPriceRow}>
                <span>정가</span>
                <span className={styles.strikethrough}>월 39,900원</span>
              </div>
              <div className={styles.discountPriceRow}>
                <span className={styles.priceAmount}>월 29,900원</span>
                <span className={styles.discount}>25% 할인</span>
              </div>
            </div>

            <div className={styles.pricingFeatures}>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>매일 맞춤 질문 + 프리미엄 해설</span>
              </div>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>매주 시스템 설계 챌린지</span>
              </div>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>매월 기술 트렌드 Q&A</span>
              </div>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>월 1회 답변 첨삭</span>
              </div>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>Q&A 라이브러리 무제한 접근</span>
              </div>
              <div className={styles.pricingFeature}>
                <span className={styles.checkIcon}>✅</span>
                <span>개인 대시보드 제공</span>
              </div>
            </div>

            <div className={styles.betaNotice}>
              <p>⚠️ 베타 테스트 종료 후 정식 가격으로 인상됩니다</p>
              <p className={styles.small}>지금 구독하시면 베타 할인가가 계속 유지됩니다</p>
            </div>

            <button className={styles.purchaseBtn} onClick={handlePurchase}>
              그로스 플랜 시작하기 →
            </button>

            <div className={styles.betaInfo}>
              <p className={styles.betaInfoText}>
                💬 현재 베타 운영 중으로, 카카오톡 상담을 통해 1:1 결제 안내를 드리고 있습니다.
              </p>
            </div>

            <div className={styles.cancelInfo}>
              <p>언제든 해지 가능 • 일할 계산 환불</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 언제든 해지할 수 있나요?</h3>
              <p className={styles.faqAnswer}>
                네, 언제든지 해지 가능합니다. 해지 시 남은 기간에 대해 일할 계산하여 환불해드립니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 베타 할인가는 언제까지 유지되나요?</h3>
              <p className={styles.faqAnswer}>
                베타 기간 중 구독하신 분들은 정식 출시 후에도 베타 할인가가 계속 유지됩니다.
                단, 해지 후 재구독 시에는 정식 가격이 적용됩니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 질문이 마음에 들지 않으면 어떻게 하나요?</h3>
              <p className={styles.faqAnswer}>
                매일 제공되는 질문 외에도 Q&A 라이브러리에서 다양한 질문을 찾아볼 수 있습니다.
                또한 월 1회 답변 첨삭을 통해 본인이 원하는 주제로 피드백을 받을 수 있습니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 이미 3일 챌린지를 완료했는데, 다시 받을 수 있나요?</h3>
              <p className={styles.faqAnswer}>
                그로스 플랜은 3일 챌린지와는 다른 새로운 질문들로 구성됩니다.
                이미 받으신 질문과 중복되지 않도록 AI가 자동으로 필터링합니다.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Q. 결제 방법은 어떻게 되나요?</h3>
              <p className={styles.faqAnswer}>
                현재 베타 기간 중에는 카카오톡 상담을 통해 계좌이체로 결제를 진행하고 있습니다.
                정식 출시 후에는 카드 자동결제가 도입될 예정입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.sectionContainer}>
          <h2>3일의 경험을 365일의 성장으로</h2>
          <p>지금 시작하면, 내일 아침부터 성장이 시작됩니다</p>
          <button className={styles.purchaseBtnLarge} onClick={handlePurchase}>
            그로스 플랜 구독하고 매일 성장하기
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