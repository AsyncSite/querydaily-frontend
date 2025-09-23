'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function QueryInsightPage() {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePurchase = () => {
    window.open('https://open.kakao.com/o/s57VJtTh', '_blank');
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
          <div className={styles.urgencyBadge}>
            <span className={styles.timer}>⏰ 오늘의 해설 구매 가능 시간: {remainingTime}</span>
          </div>

          <h1 className={styles.title}>
            이 질문에 어떻게 답해야 할지<br/>
            <span className={styles.highlight}>막막하신가요?</span>
          </h1>

          <div className={styles.todayQuestion}>
            <div className={styles.questionLabel}>오늘의 질문</div>
            <div className={styles.questionContent}>
              "JPA의 N+1 문제를 해결하기 위해 어떤 방법들을 사용해보셨나요?<br/>
              각 방법의 트레이드오프는 무엇이었나요?"
            </div>
          </div>

          <p className={styles.subtitle}>
            당신의 10분은 소중합니다.<br/>
            <strong>단 1,900원</strong>으로 최상위권 개발자의 생각의 흐름을 엿보세요.
          </p>
        </div>
      </div>

      {/* Before & After Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            해설을 보기 전과 후,<br/>
            당신의 답변이 <span className={styles.accent}>이렇게 바뀝니다</span>
          </h2>

          <div className={styles.comparison}>
            <div className={styles.before}>
              <h3>😰 Before: 당신의 머릿속</h3>
              <div className={styles.beforeContent}>
                <p>"음... JPA는 ORM이고..."</p>
                <p>"N+1 문제는... 쿼리가 많이 나가는 거고..."</p>
                <p>"fetch join을 썼습니다..."</p>
                <p className={styles.confused}>뭔가 더 있는데 뭐였더라...</p>
              </div>
            </div>

            <div className={styles.after}>
              <h3>🎯 After: 구조화된 답변</h3>
              <div className={styles.afterContent}>
                <div className={styles.blurred}>
                  <div className={styles.structure}>
                    <div className={styles.structureItem}>📍 질문의 숨은 의도 파악</div>
                    <div className={styles.structureItem}>🔑 핵심 키워드 5개</div>
                    <div className={styles.structureItem}>⭐ STAR 기법 답변 구조</div>
                    <div className={styles.structureItem}>🏢 네카라쿠배 vs 🚀 스타트업</div>
                    <div className={styles.structureItem}>🎯 예상 꼬리 질문 3개</div>
                  </div>
                  <div className={styles.blurOverlay}>
                    <span>구매 후 확인 가능</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className={styles.section} style={{ background: '#f8f9fa' }}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            1,900원으로 얻는 것
          </h2>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>질문의 숨은 의도</h3>
              <p>면접관이 정말로 듣고 싶어하는 것이 무엇인지 완벽 분석</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔑</div>
              <h3>핵심 키워드 3~5개</h3>
              <p>반드시 언급해야 할 기술 용어와 개념 정리</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>STAR 기법 답변 구조</h3>
              <p>Situation-Task-Action-Result로 논리적 답변 구성</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🏢</div>
              <h3>페르소나별 모범 답변</h3>
              <p>네카라쿠배 vs 스타트업 관점의 맞춤형 답변 예시 2개</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>예상 꼬리 질문</h3>
              <p>면접관의 다음 공격을 미리 대비하는 추가 질문 리스트</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>📧</div>
              <h3>24시간 내 이메일 전송</h3>
              <p>결제 후 24시간 이내에 상세 해설을 이메일로 발송</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customer Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.targetCustomer}>
            <div className={styles.recommended}>
              <h3>✅ 이런 분들에게 강력 추천합니다</h3>
              <ul>
                <li>면접이 1~2주 앞으로 다가온 1~3년차 Java/Spring 개발자</li>
                <li>코드는 잘 짜는데, 말로 설명하는 데 약점이 있다고 느끼는 분</li>
                <li>오늘 받은 질문이 실제 면접에서 나올까봐 불안한 분</li>
                <li>체계적인 답변 구조를 만들고 싶은 분</li>
              </ul>
            </div>

            <div className={styles.notRecommended}>
              <h3>❌ 이런 분들에게는 아직 필요 없어요</h3>
              <ul>
                <li>이제 막 프로그래밍 공부를 시작한 입문자</li>
                <li>면접 경험이 많고 자신 있는 시니어 개발자</li>
                <li>단순 암기식 답변을 원하시는 분</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.section} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className={styles.sectionContainer}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h2 className={styles.pricingTitle}>오늘의 쿼리 해설</h2>
              <div className={styles.pricingBadge}>
                <span>베타 기간 한정 특가</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.originalPrice}>
                <span>정가</span>
                <span className={styles.strikethrough}>2,500원</span>
              </div>
              <div className={styles.discountPrice}>
                <span className={styles.priceAmount}>1,900원</span>
                <span className={styles.discount}>24% 할인</span>
              </div>
            </div>

            <div className={styles.betaNotice}>
              <p>🚀 베타 테스트 기간 특별가</p>
              <p className={styles.small}>정식 출시 후 정가로 인상됩니다</p>
            </div>

            <button className={styles.purchaseBtn} onClick={handlePurchase}>
              지금 바로 해설 받기 →
            </button>

            <div className={styles.betaInfo}>
              <p className={styles.betaInfoText}>
                💬 현재 베타 운영 중으로, 카카오톡 상담을 통해 1:1 결제 안내를 드리고 있습니다.
              </p>
            </div>

            <div className={styles.guarantee}>
              <p>
                <strong>100% 만족 보장</strong><br/>
                해설이 만족스럽지 않으신가요?<br/>
                24시간 내 문의주시면 전액 환불해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>이미 경험한 개발자들의 이야기</h2>

          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                "막연하게만 알고 있던 개념을 명확하게 정리할 수 있었어요. 특히 STAR 구조로 답변을 만드니까 논리적으로 들리더라고요."
              </div>
              <div className={styles.testimonialAuthor}>
                - 김*현님, 2년차 백엔드 개발자
              </div>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                "예상 꼬리 질문이 정말 도움됐어요. 실제 면접에서 비슷한 질문이 나왔는데 당황하지 않고 대답할 수 있었습니다."
              </div>
              <div className={styles.testimonialAuthor}>
                - 이*수님, 주니어 개발자
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.sectionContainer}>
          <h2>오늘의 질문, 그냥 넘기시겠어요?</h2>
          <p>1,900원의 투자로 면접 준비의 질을 바꿔보세요</p>
          <button className={styles.purchaseBtnLarge} onClick={handlePurchase}>
            오늘의 쿼리 해설 받기 →
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