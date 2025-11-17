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
        {/* 빛 효과 애니메이션 */}
        <div className={styles.lightEffect}></div>
        <div className={styles.lightEffect2}></div>

        <div className={styles.heroContainer}>
          {/* 메인 헤드라인 - 엄청 크게 */}
          <h1 className={styles.heroTitle}>
            당신은<br/>
            <span className={styles.highlight}>합격할 사람입니다</span>
          </h1>

          {/* 서브 카피 - 간결하게 */}
          <p className={styles.heroSubtitle}>
            합격 스토리는 이미 당신의 이력서에 있습니다.<br/>
            <strong>하루 10분, 20일이면 충분합니다.</strong>
          </p>

          {/* CTA 버튼 - 크고 눈에 띄게 */}
          <a href="#products" className={styles.heroBtn}>
            면접 준비 시작하기
          </a>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <span className={styles.testimonialsBadge}>실제 사용자 후기</span>
          <h2 className={styles.testimonialsTitle}>
            실사용자들이<br />
            가장 만족한 포인트
          </h2>
          <p className={styles.testimonialsSubtitle}>
            실제 사용자 4명의 솔직한 피드백 · <strong>100% 만족도</strong>
          </p>

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
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>시작하기</span>
            <h2 className={styles.sectionTitle}>내일을 오늘 준비하세요</h2>
          </div>

          <div className={styles.pricingGrid}>
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

              <button
                className={`${styles.planBtn} ${styles.featured}`}
                onClick={() => router.push('/prototype-hyundoo/v1/products/growth-plan')}
              >
                본격적으로 준비하기
              </button>
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

              <button
                className={styles.planBtn}
                onClick={() => router.push('/prototype-hyundoo/v1/products/critical-hit')}
              >
                가볍게 시작하기
              </button>
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

      {/* Comparison Section - ChatGPT vs QueryDaily */}
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
            {/* 일반 질문 */}
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

            {/* 이력서 기반 질문 */}
            <div className={`${styles.compCard} ${styles.positive}`}>
              <div className={`${styles.compHeader} ${styles.positive}`}>
                <h3>이력서 기반 질문</h3>
              </div>
              <div className={styles.compQuestions}>
                <div className={styles.compQItem}>
                  <span className={`${styles.compQNum} ${styles.positive}`}>Q1</span>
                  <p>상품 검색 API에서 Elasticsearch를 도입한 구체적인 이유는? 어떤 성능 지표가 개선되었나요?</p>
                </div>
                <div className={styles.compQItem}>
                  <span className={`${styles.compQNum} ${styles.positive}`}>Q2</span>
                  <p>결제 시스템에서 동시성 이슈를 어떻게 해결했나요? 비관적 락과 낙관적 락 중 어떤 것을 선택했고 그 이유는?</p>
                </div>
                <div className={styles.compQItem}>
                  <span className={`${styles.compQNum} ${styles.positive}`}>Q3</span>
                  <p>user_orders 테이블에 복합 인덱스 (user_id, created_at)를 설계한 근거는? 다른 조합은 고려하지 않았나요?</p>
                </div>
              </div>
              <div className={`${styles.compFooter} ${styles.positive}`}>
                <p>당신만의 경험<br />→ STAR 기법 답변</p>
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
                      <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#ec4899', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad1)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>현) 판교 N사 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>국비지원 수료생</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>판교 대기업 개발자</span>
              </div>
              <p className={styles.expertStory}>
                300번의 탈락 데이터를 분석해<br/>
                합격 공식을 찾았어요<br/>
                국비생에서 2년만에 연봉 2배↗<br/>그 경험을 시스템에 담았어요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#ec4899', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#f472b6', stopOpacity:1}} />
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
                SI 야근지옥에서 유니콘까지,<br/>
                5번의 이직으로 찾은 최적 경로<br/>
                100개 기업 면접에서 발견한<br/>
                합격 시그널을 공유해요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#a78bfa', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#c4b5fd', stopOpacity:1}} />
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
                트래픽 0 → 블랙프라이데이,<br/>
                서버 터뜨리며 배운 대용량 처리의 정석<br/>
                트래픽 폭탄 맞으며 배운 진짜 개발,<br/>
                그 생존법으로 다져진 실무 경험으로 질문해요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#f472b6', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad4)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>현) 테크 기업 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>아이비리그 수준 CS 전공</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>판교 테크 기업</span>
              </div>
              <p className={styles.expertStory}>
                탄탄한 이론적 기반과<br/>
                10개 이상의 시스템을 0부터 설계한 풀사이클 경험으로<br/>
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
