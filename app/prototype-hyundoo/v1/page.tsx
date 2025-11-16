'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Sparkles } from 'lucide-react';

export default function HomePageV1() {
  const router = useRouter();

  return (
    <>
      {/* Fixed CTA - 항상 보이는 CTA */}
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

    <div className={styles.container}>
      {/* Hero Section - 압도적으로 크게 */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          {/* 메인 헤드라인 - 엄청 크게 */}
          <h1 className={styles.heroTitle}>
            당신은<br/>
            <span className={styles.highlight}>합격할 사람입니다</span>
          </h1>

          {/* 서브 카피 - 간결하게 */}
          <p className={styles.heroSubtitle}>
            합격 스토리는 이미 당신의 이력서에 있습니다.<br/>
            면접관은 답을 주지 않습니다. 그래서 미리 준비해야 합니다.<br/>
            <strong>하루 10분, 20일이면 충분합니다.</strong>
          </p>

          {/* CTA 버튼 - 크고 눈에 띄게 */}
          <a href="#products" className={styles.heroBtn}>
            면접 준비 시작하기
          </a>
        </div>
      </section>

      {/* Real Reviews Section - 먼저 경험한 수강생들의 후기 */}
      <section className={styles.realReviews}>
        <div className={styles.reviewsContainer}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.reviewsTitle}>먼저 경험한 수강생들의 후기</h2>
            <p className={styles.reviewsSubtitle}>
              실제 사용자 4명의 솔직한 피드백 · <strong>100% 만족도</strong>
            </p>
          </div>

          {/* 2x2 그리드 */}
          <div className={styles.reviewCards}>
            <div className={styles.reviewCard}>
              <div className={styles.reviewCardHeader}>전반적 만족도</div>
              <div className={styles.reviewCardBody}>
                <img src="/images/satisfication.png" alt="전반적 만족도" />
              </div>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewCardHeader}>구체적으로 도움된 점</div>
              <div className={styles.reviewCardBody}>
                <img src="/images/chart2.png" alt="구체적으로 도움된 점" />
              </div>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewCardHeader}>가장 만족스러웠던 점</div>
              <div className={styles.reviewCardBody}>
                <img src="/images/favorite.png" alt="만족스러웠던 점" />
              </div>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewCardHeader}>가장 인상 깊었던 질문</div>
              <div className={styles.reviewCardBody}>
                <img src="/images/impressive.png" alt="인상 깊었던 질문" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - 준비의 중요성 */}
      <section className={styles.statistics}>
        <div className={styles.statisticsContainer}>
          <h2 className={styles.statisticsTitle}>
            준비한 사람만 합격합니다
          </h2>

          <div className={styles.dataSource}>
            <p>데이터 출처: Glassdoor (2024-2025), Preplaced Interview Research, Novoresume Career Analytics</p>
            <p className={styles.dataNote}>글로벌 채용 담당자 및 면접 성공 사례 분석</p>
          </div>

          <div className={styles.statsGrid}>
            {/* Main Stat - 70% */}
            <div className={styles.mainStat}>
              <div className={styles.statNumber}>70<span className={styles.percent}>%</span></div>
              <div className={styles.statLabel}>채용 담당자가 꼽은<br/>가장 흔한 탈락 이유:<br/><strong>"준비 부족"</strong></div>
            </div>

            {/* Supporting Stats */}
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

          {/* Visual Comparison Bar */}
          <div className={styles.comparisonBar}>
            <div className={styles.comparisonTitle}>면접 합격 가능성 비교</div>
            <div className={styles.comparisonItem}>
              <div className={styles.comparisonLabel}>준비한 후보</div>
              <div className={styles.barContainer}>
                <div className={styles.barFilled} style={{width: '70%'}}>70%</div>
              </div>
            </div>
            <div className={styles.comparisonItem}>
              <div className={styles.comparisonLabel}>준비 없는 후보</div>
              <div className={styles.barContainer}>
                <div className={styles.barUnfilled} style={{width: '30%'}}>30%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 두 상품 나란히 */}
      <section id="products" className={styles.products}>
        <div className={styles.productsContainer}>
          {/* Growth Plan */}
          <div className={styles.productCard}>
            <div className={styles.planBadge}>MOST POPULAR</div>

            <h2 className={styles.planTitle}>
              그로스 플랜<br/>
              <span className={styles.planSubtitle}>Growth Plan</span>
            </h2>

            <p className={styles.planDesc}>
              매일 아침 7시, 저녁 5시<br/>
              내 이력서 맞춤 질문과 모범 답변<br/>
              20일 완성
            </p>

            <div className={styles.planPrice}>
              <span className={styles.priceLabel}>20일 집중 훈련</span>
              <div className={styles.priceAmount}>
                <span className={styles.priceOriginal}>₩106,000</span>
                <span className={styles.priceCurrent}>₩49,000</span>
              </div>
            </div>

            <button
              className={styles.planBtn}
              onClick={() => router.push('/prototype-hyundoo/v1/products/growth-plan')}
            >
              자세히 보기
            </button>
          </div>

          {/* Critical Hit */}
          <div className={styles.productCard}>
            <div className={styles.planBadge}>QUICK START</div>

            <h2 className={styles.planTitle}>
              크리티컬 히트<br/>
              <span className={styles.planSubtitle}>Critical Hit</span>
            </h2>

            <p className={styles.planDesc}>
              핵심 질문 3개 + 프리미엄 답변 가이드<br/>
              24시간 내 발송<br/>
              면접 직전 빠른 준비
            </p>

            <div className={styles.planPrice}>
              <span className={styles.priceLabel}>핵심만 빠르게</span>
              <div className={styles.priceAmount}>
                <span className={styles.priceOriginal}>₩15,900</span>
                <span className={styles.priceCurrent}>₩9,900</span>
              </div>
            </div>

            <button
              className={styles.planBtn}
              onClick={() => router.push('/prototype-hyundoo/v1/products/critical-hit')}
            >
              자세히 보기
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparison}>
        <div className={styles.comparisonContainer}>
          <h2 className={styles.sectionTitle}>
            ChatGPT로 준비하다 지치셨나요?
          </h2>
          <p className={styles.sectionSubtitle}>
            매일 프롬프트 작성하며 2시간 쓰는 게 지겹지 않으세요?
          </p>

          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>구분</th>
                  <th className={styles.tableHeader}>ChatGPT로 직접 준비</th>
                  <th className={`${styles.tableHeader} ${styles.tableHeaderHighlight}`}>
                    <span className={styles.recommendBadge}>
                      <Sparkles size={14} style={{display: 'inline', verticalAlign: 'middle'}} /> 추천
                    </span>
                    QueryDaily
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCategory}>준비 시간</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>매일 2시간씩 투자</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>하루 10분 투자</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>프롬프트 작성</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>매번 직접 작성 필요</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>이력서 한번만 제출</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>질문의 질</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>일반적인 답변</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>실제 면접 패턴 분석</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>개인화</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>내 경력과 무관한 질문</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>내 경력 맞춤 질문</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>지속성</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>금방 지쳐서 포기</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>매일 아침 7시, 저녁 5시 자동 전송</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.comparisonFooter}>
            <p>프롬프트 엔지니어링 공부할 시간에, 면접 준비하세요.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section - 동작 원리 */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksContainer}>
          <h2 className={styles.sectionTitle}>어떻게 작동하나요?</h2>
          <p className={styles.sectionSubtitle}>단 3단계로 시작하는 면접 준비</p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>상품 선택 & 정보 입력</h3>
              <p className={styles.stepDesc}>
                원하는 상품을 선택하고 이메일과 이력서를 업로드하세요
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>AI 분석 & 질문 생성</h3>
              <p className={styles.stepDesc}>
                AI가 당신의 이력서를 분석하고 맞춤 질문을 생성합니다
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>시니어 개발자 검수 & 발송</h3>
              <p className={styles.stepDesc}>
                현직 시니어 백엔드 개발자가 기술 정확성과 실무 적합성을 검증한 후,
                검증된 질문을 이메일로 발송합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - 최소화 */}
      <section className={styles.faq}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>질문은 어떻게 받나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                매일 오전 7시와 저녁 5시에 이메일로 발송됩니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>환불이 가능한가요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                첫 질문 발송 전 100% 환불, 이후 일할 계산으로 환불됩니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>어떤 기술 스택을 다루나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                Java/Spring 백엔드 개발자를 위한 서비스입니다.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer - 심플하게 */}
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
