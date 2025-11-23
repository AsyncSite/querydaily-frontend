'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { ThemeProvider, ThemeSelector, useTheme, themes } from './ThemeContext';
import { submitBetaApplication, createOrder } from '@/lib/api';

type HeroVariant = 'v2' | 'donggun' | 'jiyeon';

// Phone validation helper
const validatePhone = (phone: string): boolean => {
  // Allow formats: 010-1234-5678, 010-123-4567, 010-1234567, 01012345678
  const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

function LandingPageContent() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Purchase Modal States
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseModalStep, setPurchaseModalStep] = useState(1);
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<string | null>(null);
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseNameError, setPurchaseNameError] = useState('');
  const [purchasePhone, setPurchasePhone] = useState('');
  const [purchasePhoneError, setPurchasePhoneError] = useState('');
  const [purchaseEmail, setPurchaseEmail] = useState('');
  const [purchaseEmailError, setPurchaseEmailError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Hero entrance animation
  useEffect(() => {
    setTimeout(() => setIsTextVisible(true), 300);
  }, []);

  // Enable smooth scroll for this page only
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleCardPayment = async () => {
    try {
      setIsSubmitting(true);

      // ProductCode 매핑
      const productCodeMap: Record<string, string> = {
        'critical-hit': 'CRITICAL_HIT',
        'growth-plan': 'GROWTH_PLAN'
      };

      const productCode = productCodeMap[selectedPurchaseProduct || ''];
      if (!productCode) {
        alert('상품을 선택해주세요');
        return;
      }

      // 백엔드 API 호출하여 주문 생성 (PortOne V2 payload 포함)
      const response = await createOrder({
        email: purchaseEmail,
        name: purchaseName,
        phone: purchasePhone,
        productCode: productCode as any,
        paymentMethod: 'card',
        resume: purchaseFile || undefined
      });

      if (!response.success || !response.data) {
        alert(`주문 생성에 실패했습니다: ${response.message || '알 수 없는 오류'}`);
        return;
      }

      // 주문 정보 저장
      const orderInfo = {
        orderId: response.data.orderId,
        product: selectedPurchaseProduct || '',
        price: response.data.amount || 0,
        paymentMethod: 'card',
        email: purchaseEmail,
        name: purchaseName,
        phone: purchasePhone || '',
      };
      localStorage.setItem('orderData', JSON.stringify(orderInfo));

      // SDK 모드인 경우 PortOne V2 SDK 호출
      if (response.data.invocationType === 'SDK' && response.data.portOneSdkPayload) {
        // PortOne V2 SDK 동적 import
        const PortOne = await import('@portone/browser-sdk/v2');

        const payload = response.data.portOneSdkPayload as Parameters<typeof PortOne.requestPayment>[0];

        try {
          // 백엔드가 보내준 payload 그대로 전달
          const sdkResponse = await PortOne.requestPayment(payload);

          // 응답 존재 확인
          if (!sdkResponse) {
            alert('결제 응답을 받지 못했습니다.');
            return;
          }

          // SDK 응답 체크
          if (sdkResponse.code !== undefined) {
            // 오류 발생 (취소, 실패 등)
            let userMessage = '결제를 처리할 수 없습니다.';
            if (sdkResponse.code === 'FAILURE_TYPE_PG') {
              userMessage = `결제 실패: ${sdkResponse.message || 'PG사 오류'}`;
            } else if (sdkResponse.code === 'FAILURE_TYPE_TIMEOUT') {
              userMessage = '결제 시간이 초과되었습니다.';
            }
            alert(userMessage);
            return;
          }

          // 성공 시 주문 완료 페이지로 이동
          router.push('/order-complete');
        } catch (sdkError: any) {
          console.error('[PortOne SDK] Error during requestPayment:', sdkError);
          alert('결제 창을 여는 중 오류가 발생했습니다.');
        }
      } else {
        // 리다이렉트 방식
        alert('리다이렉트 방식은 현재 지원하지 않습니다.');
      }
    } catch (error) {
      console.error('Card payment error:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fixed CTA */}
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

      {/* Theme Selector */}
      <ThemeSelector />

      <div className={styles.container}>

        {/* Hero Section - 100vh Full Screen, Centered */}
        <section className={styles.hero}>
          {/* Light Effects - Reduced opacity */}
          <div className={styles.lightEffect}></div>
          <div className={styles.lightEffect2}></div>

          <div className={styles.heroContainer}>
            {/* 체크마크 배경 */}
            <div className={styles.checkBackground}>
              <svg viewBox="0 0 100 100">
                <path
                  d="M 20 50 L 40 70 L 80 30"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className={styles.checkAnimation}
                />
              </svg>
            </div>

            <span className={`${styles.preTitle} ${isTextVisible ? styles.visible : ''}`}>
              이직을 준비하는 당신에게
            </span>

            <h1 className={`${styles.heroTitle} ${styles.heroTitleMega} ${isTextVisible ? styles.visible : ''}`}>
              합격 시그널을<br/>
              <span className={styles.highlight}>미리 받으세요</span>
            </h1>

            <p className={`${styles.heroTagline} ${isTextVisible ? styles.visible : ''}`}>
              면접관이 물을 질문은 이미 <strong>당신 이력서에</strong> 다 있습니다.<br/>
              그 질문들을 미리 알면, 면접은 달라집니다.
            </p>

            {/* 차별점 강조 */}
            <div className={`${styles.socialProof} ${isTextVisible ? styles.visible : ''}`}>
              <span className={styles.socialProofText} style={{fontSize: '0.95rem', opacity: 0.9}}>
                일반 질문이 아닌, <strong>내 이력서 기반 맞춤 질문</strong>
              </span>
            </div>

            <a href="#products" className={`${styles.heroBtn} ${isTextVisible ? styles.visible : ''}`}>
              내 이력서로 합격 시그널 받기 →
            </a>
          </div>

          {/* Scroll Hint */}
          <div className={styles.scrollHint}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </section>

        {/* Problem Section - 불안 공감 */}
        <section className={styles.problemSection}>
          <div className={styles.problemContainer}>

            <h2 className={styles.sectionTitle}>
              혹시 이런 <span className={styles.highlight}>불안</span>, 느끼고 계신가요?
            </h2>

            {/* 불안 공감 포인트 */}
            <div className={styles.prepMessage} style={{marginBottom: '2.5rem'}}>
              <p className={styles.prepMessageSub} style={{fontSize: '1.05rem', lineHeight: '1.8'}}>
                "이 회사 떨어지면 다음은 언제지..."<br/>
                "나이만 먹고 있는 건 아닐까..."<br/>
                "다른 사람들은 다 잘 가는 것 같은데..."
              </p>
            </div>

            <p style={{textAlign: 'center', fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.9}}>
              그런데 막상 면접장에 가면, 이렇게 됩니다.
            </p>

            {/* 채팅 스타일 시나리오 - 아바타 포함 */}
            <div style={{maxWidth: '480px', margin: '0 auto'}}>
              {/* 시나리오 1 */}
              <div style={{marginBottom: '2.5rem'}}>
                {/* 면접관 말풍선 */}
                <div style={{display: 'flex', gap: '0.8rem', marginBottom: '1rem'}}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(var(--color-accent-rgb), 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div style={{background: 'rgba(var(--color-accent-rgb), 0.08)', padding: '1rem 1.2rem', borderRadius: '0 12px 12px 12px', flex: 1}}>
                    <p style={{fontSize: '0.95rem', lineHeight: '1.5'}}>"Redis 캐싱을 구현하셨네요.<br/><strong>왜 Redis를 선택했나요?</strong>"</p>
                  </div>
                </div>
                {/* 내 답변 */}
                <div style={{display: 'flex', gap: '0.8rem', justifyContent: 'flex-end'}}>
                  <div style={{background: 'rgba(239, 68, 68, 0.12)', padding: '1rem 1.2rem', borderRadius: '12px 0 12px 12px', maxWidth: '85%', borderRight: '3px solid rgba(239, 68, 68, 0.5)'}}>
                    <p style={{fontSize: '1rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center'}}>"<strong>그냥</strong>... 빠르다고 해서요...<br/>주변에서 많이 써서..."</p>
                  </div>
                </div>
              </div>

              {/* 시나리오 2 */}
              <div style={{marginBottom: '2.5rem'}}>
                <div style={{display: 'flex', gap: '0.8rem', marginBottom: '1rem'}}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(var(--color-accent-rgb), 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div style={{background: 'rgba(var(--color-accent-rgb), 0.08)', padding: '1rem 1.2rem', borderRadius: '0 12px 12px 12px', flex: 1}}>
                    <p style={{fontSize: '0.95rem', lineHeight: '1.5'}}>"Spring Boot로 API를 만드셨군요.<br/><strong>왜 Spring이었나요?</strong>"</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '0.8rem', justifyContent: 'flex-end'}}>
                  <div style={{background: 'rgba(239, 68, 68, 0.12)', padding: '1rem 1.2rem', borderRadius: '12px 0 12px 12px', maxWidth: '85%', borderRight: '3px solid rgba(239, 68, 68, 0.5)'}}>
                    <p style={{fontSize: '1rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center'}}>"음... <strong>국비학원</strong>에서 배워서요...<br/>다들 쓰길래..."</p>
                  </div>
                </div>
              </div>

              {/* 시나리오 3 */}
              <div style={{marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', gap: '0.8rem', marginBottom: '1rem'}}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(var(--color-accent-rgb), 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div style={{background: 'rgba(var(--color-accent-rgb), 0.08)', padding: '1rem 1.2rem', borderRadius: '0 12px 12px 12px', flex: 1}}>
                    <p style={{fontSize: '0.95rem', lineHeight: '1.5'}}>"트랜잭션 처리를 하셨네요.<br/><strong>격리 수준은 어떻게 설정했나요?</strong>"</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '0.8rem', justifyContent: 'flex-end'}}>
                  <div style={{background: 'rgba(239, 68, 68, 0.12)', padding: '1rem 1.2rem', borderRadius: '12px 0 12px 12px', maxWidth: '85%', borderRight: '3px solid rgba(239, 68, 68, 0.5)'}}>
                    <p style={{fontSize: '1rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center'}}>"그건... <strong>기본값</strong> 쓴 것 같은데...<br/>따로 설정은 안 했어요..."</p>
                  </div>
                </div>
              </div>
            </div>

            <p style={{textAlign: 'center', fontSize: '1.05rem', marginTop: '1rem', marginBottom: '1rem'}}>
              분명히 해봤는데, 말이 안 나옵니다.<br/><br/>
              <strong style={{fontSize: '1.1rem'}}>능력이 없어서가 아니에요.<br/>준비가 안 된 거예요.</strong>
            </p>

            <p style={{textAlign: 'center', fontSize: '0.95rem', marginTop: '2rem', opacity: 0.7, fontStyle: 'italic'}}>
              "준비해야 하는 건 아는데...<br/>
              뭘 어떻게 준비해야 하지?"
            </p>

          </div>
        </section>

        {/* 탈락 이유 상세 섹션 */}
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            <span className={styles.badge} style={{background: 'rgba(255,100,100,0.2)', color: '#ff6b6b'}}>채용 담당자 설문</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1rem'}}>
              면접에서 떨어지는<br/>
              <span className={styles.highlight}>진짜 이유</span>
            </h2>

            <p style={{textAlign: 'center', fontSize: '1rem', marginBottom: '2.5rem', opacity: 0.8}}>
              채용 담당자 500명이 직접 밝힌 탈락 사유
            </p>

            {/* 메인 통계 */}
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <div style={{fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1}}>
                70<span style={{fontSize: '2rem'}}>%</span>
              </div>
              <p style={{fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: '600'}}>
                "준비가 부족해 보였다"
              </p>
            </div>

            {/* 구체적 탈락 이유 */}
            <div style={{maxWidth: '500px', margin: '0 auto'}}>
              <div style={{marginBottom: '1.5rem', padding: '1.2rem', background: 'rgba(255,100,100,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#ff6b6b', minWidth: '60px'}}>47%</div>
                <div>
                  <p style={{fontSize: '1rem', fontWeight: '600'}}>"왜?"에 대한 답변이 없다</p>
                  <p style={{fontSize: '0.85rem', opacity: 0.7}}>기술 선택의 이유를 설명하지 못함</p>
                </div>
              </div>

              <div style={{marginBottom: '1.5rem', padding: '1.2rem', background: 'rgba(255,100,100,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#ff6b6b', minWidth: '60px'}}>38%</div>
                <div>
                  <p style={{fontSize: '1rem', fontWeight: '600'}}>경험을 구체적으로 말하지 못한다</p>
                  <p style={{fontSize: '0.85rem', opacity: 0.7}}>숫자, 과정, 결과가 모호함</p>
                </div>
              </div>

              <div style={{marginBottom: '1.5rem', padding: '1.2rem', background: 'rgba(255,100,100,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#ff6b6b', minWidth: '60px'}}>31%</div>
                <div>
                  <p style={{fontSize: '1rem', fontWeight: '600'}}>꼬리 질문에 무너진다</p>
                  <p style={{fontSize: '0.85rem', opacity: 0.7}}>한 단계 깊이 들어가면 답변 불가</p>
                </div>
              </div>

              <div style={{marginBottom: '1.5rem', padding: '1.2rem', background: 'rgba(255,100,100,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#ff6b6b', minWidth: '60px'}}>28%</div>
                <div>
                  <p style={{fontSize: '1rem', fontWeight: '600'}}>이력서 내용을 기억 못 한다</p>
                  <p style={{fontSize: '0.85rem', opacity: 0.7}}>본인이 쓴 내용도 설명하지 못함</p>
                </div>
              </div>
            </div>

            <p style={{textAlign: 'center', fontSize: '0.8rem', opacity: 0.5, marginTop: '2rem'}}>
              데이터 출처: Glassdoor (2024-2025), LinkedIn Talent Solutions
            </p>

            <div className={styles.ctaNudge} style={{marginTop: '2.5rem'}}>
              <p className={styles.ctaNudgeMain}>
                전부 <strong>준비하면 해결되는 문제</strong>입니다.
              </p>
              <p className={styles.ctaNudgeDesc} style={{marginTop: '0.8rem'}}>
                문제는 뭘 준비해야 하는지 모른다는 것.<br/>
                <span className={styles.ctaNudgeHighlight}>QueryDaily가 그걸 알려드립니다.</span>
              </p>
            </div>
          </div>
        </section>

        {/* 고객 고민 섹션 */}
        <section className={styles.problemSection}>
          <div className={styles.problemContainer}>
            <h2 className={styles.sectionTitle}>
              "준비해야 하는 건 아는데...<br/>
              <span className={styles.highlight}>뭘 어떻게?</span>"
            </h2>

            <p style={{textAlign: 'center', fontSize: '1rem', marginBottom: '2.5rem', opacity: 0.8}}>
              혼자 준비하려고 하면 이런 벽에 부딪힙니다
            </p>

            <div style={{maxWidth: '520px', margin: '0 auto'}}>
              {/* 고민 1 */}
              <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', borderLeft: '3px solid var(--color-text-muted)'}}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>"어떤 질문이 나올지 모르겠어요"</p>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>블로그마다 다른 질문, 뭘 준비해야 할지 막막함</p>
              </div>

              {/* 고민 2 */}
              <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', borderLeft: '3px solid var(--color-text-muted)'}}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>"일반 질문은 내 경험이랑 안 맞아요"</p>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>교과서적인 답변만 외우게 되는 느낌</p>
              </div>

              {/* 고민 3 */}
              <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', borderLeft: '3px solid var(--color-text-muted)'}}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>"어떻게 답해야 할지 모르겠어요"</p>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>STAR 기법? 들어는 봤는데 적용이 안 됨</p>
              </div>

              {/* 고민 4 */}
              <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', borderLeft: '3px solid var(--color-text-muted)'}}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>"꼬리 질문이 무서워요"</p>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>한 번 막히면 멘탈이 무너질 것 같음</p>
              </div>

              {/* 고민 5 */}
              <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', borderLeft: '3px solid var(--color-text-muted)'}}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>"시간이 없어요"</p>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>퇴근하면 지치고, 주말엔 쉬고 싶음</p>
              </div>
            </div>

            <div className={styles.ctaNudge} style={{marginTop: '2.5rem'}}>
              <p className={styles.ctaNudgeMain} style={{fontSize: '1.2rem'}}>
                그래서 우리가 만들었습니다.
              </p>
              <p className={styles.ctaNudgeDesc} style={{marginTop: '1rem', lineHeight: '1.8'}}>
                어떤 질문이 나올지 알려드리고,<br/>
                어떻게 답해야 하는지 가이드하고,<br/>
                <span className={styles.ctaNudgeHighlight}>하루 10분이면 끝나도록</span> 압축했습니다.
              </p>
            </div>

          </div>
        </section>

        {/* Statistics Section - Enhanced */}
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            {/* 핵심 메시지 - 크게 */}
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                lineHeight: '1.5',
                marginBottom: '1.5rem',
                color: 'var(--color-text-primary)'
              }}>
                같은 경력,<br/>
                <span className={styles.highlight} style={{fontSize: '2.8rem'}}>다른 결과</span>
              </h2>
              <p style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                능력이 아니라, 준비의 차이입니다.
              </p>
            </div>

            {/* Before/After 대비 - 메인 */}
            <div className={styles.comparisonMain} style={{position: 'relative'}}>
              {/* 배경 글로우 효과 */}
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none'}}></div>

              <div className={styles.comparisonSide}>
                <p className={styles.comparisonLabel}>준비 없이</p>
                <div className={styles.comparisonNumber}>
                  <span className={styles.comparisonNum} style={{opacity: 0.4, fontSize: '3rem'}}>38%</span>
                </div>
                <p className={styles.comparisonDesc} style={{opacity: 0.6}}>평균 합격률</p>
              </div>

              <div className={styles.comparisonVs} style={{fontSize: '2.5rem', opacity: 0.5}}>→</div>

              <div className={`${styles.comparisonSide} ${styles.comparisonSuccess}`}>
                <p className={styles.comparisonLabel} style={{color: 'var(--color-secondary)'}}>체계적 준비</p>
                <div className={styles.comparisonNumber}>
                  <span className={styles.comparisonNum} style={{fontSize: '4rem'}}>85%</span>
                </div>
                <p className={styles.comparisonDesc} style={{fontWeight: '700'}}>합격률 달성</p>
              </div>
            </div>

            {/* 강조 박스 */}
            <div style={{marginTop: '2.5rem', padding: '1.8rem 2rem', background: 'rgba(var(--color-accent-rgb), 0.12)', borderRadius: '16px', border: '2px solid rgba(var(--color-accent-rgb), 0.25)', textAlign: 'center'}}>
              <p style={{fontSize: '1.2rem', fontWeight: '700', margin: 0, lineHeight: '1.8'}}>
                체계적으로 준비한 지원자는<br/>
                평균 <span style={{color: 'var(--color-secondary)', fontWeight: '800', fontSize: '1.5rem'}}>2.3배</span> 높은 합격률을 보입니다
              </p>
            </div>

            {/* 부연 설명 */}
            <p style={{textAlign: 'center', fontSize: '0.95rem', opacity: 0.7, marginTop: '1.5rem'}}>
              실력은 이미 충분합니다. 그걸 보여주는 연습만 하면 됩니다.
            </p>

            {/* CTA 버튼 */}
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <a href="#products" style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(var(--color-accent-rgb), 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                연습 시작하기 →
              </a>
            </div>

          </div>
        </section>

        {/* 면접장 불안 섹션 */}
        <section className={styles.problemSection}>
          <div className={styles.problemContainer}>
            <h2 className={styles.sectionTitle}>
              면접장, <span className={styles.highlight}>그 순간</span>
            </h2>

            <p style={{textAlign: 'center', fontSize: '1rem', marginBottom: '2.5rem', opacity: 0.8}}>
              준비 없이 들어가면 이렇게 됩니다
            </p>

            {/* 불안 시나리오들 */}
            <div style={{maxWidth: '520px', margin: '0 auto'}}>
              {/* 다대일 면접 */}
              <div style={{marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,100,100,0.06)', borderRadius: '12px', borderLeft: '3px solid rgba(255,100,100,0.4)'}}>
                <p style={{fontSize: '0.85rem', opacity: 0.6, marginBottom: '0.8rem'}}>다대일 면접</p>
                <p style={{fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.8rem'}}>
                  "면접관이 3명인데... 다 날 쳐다보고 있어"
                </p>
                <p style={{fontSize: '0.95rem', opacity: 0.7, lineHeight: '1.6'}}>
                  누가 뭘 물어볼지 모르겠고,<br/>
                  한 명이 고개를 갸웃하면 심장이 철렁
                </p>
              </div>

              {/* 압박 면접 */}
              <div style={{marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,100,100,0.06)', borderRadius: '12px', borderLeft: '3px solid rgba(255,100,100,0.4)'}}>
                <p style={{fontSize: '0.85rem', opacity: 0.6, marginBottom: '0.8rem'}}>압박 면접</p>
                <p style={{fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.8rem'}}>
                  "그래서 결론이 뭔가요?"
                </p>
                <p style={{fontSize: '0.95rem', opacity: 0.7, lineHeight: '1.6'}}>
                  말을 끊고 다그치듯 물어보면<br/>
                  머릿속이 하얘지고 말이 꼬이기 시작
                </p>
              </div>

              {/* 경쟁자와의 비교 */}
              <div style={{marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,100,100,0.06)', borderRadius: '12px', borderLeft: '3px solid rgba(255,100,100,0.4)'}}>
                <p style={{fontSize: '0.85rem', opacity: 0.6, marginBottom: '0.8rem'}}>대기실에서</p>
                <p style={{fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.8rem'}}>
                  "옆 사람은 뭔가 자신감 넘치는데..."
                </p>
                <p style={{fontSize: '0.95rem', opacity: 0.7, lineHeight: '1.6'}}>
                  나만 떨고 있는 것 같고,<br/>
                  저 사람보다는 나아야 하는데... 불안
                </p>
              </div>
            </div>

            {/* 전환 화살표 */}
            <div style={{textAlign: 'center', margin: '2.5rem 0'}}>
              <div style={{display: 'inline-block', padding: '0.8rem 2rem', background: 'rgba(var(--color-accent-rgb), 0.1)', borderRadius: '100px', border: '2px solid rgba(var(--color-accent-rgb), 0.3)'}}>
                <span style={{fontSize: '1.5rem'}}>↓</span>
              </div>
            </div>

            {/* 전환 - 준비된 사람 */}
            <div style={{marginTop: '0', padding: '3rem 2rem', background: 'linear-gradient(180deg, rgba(var(--color-accent-rgb), 0.15) 0%, rgba(var(--color-accent-rgb), 0.05) 100%)', borderRadius: '24px', border: '2px solid rgba(var(--color-accent-rgb), 0.3)', position: 'relative', overflow: 'hidden'}}>
              {/* 배경 장식 */}
              <div style={{position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none'}}></div>

              <h3 style={{textAlign: 'center', fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.4'}}>
                하지만<br/>
                <span className={styles.highlight} style={{fontSize: '2.5rem'}}>준비된 사람</span>은 다릅니다
              </h3>

              <div style={{maxWidth: '500px', margin: '0 auto'}}>
                {/* 체크 아이템 1 */}
                <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--color-accent)'}}>
                  <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <span style={{color: '#fff', fontWeight: '700', fontSize: '1rem'}}>✓</span>
                  </div>
                  <div>
                    <p style={{fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.3rem'}}>"이 질문 나올 줄 알았어"</p>
                    <p style={{fontSize: '0.9rem', opacity: 0.8}}>예상했기 때문에 당황하지 않음</p>
                  </div>
                </div>

                {/* 체크 아이템 2 */}
                <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--color-accent)'}}>
                  <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <span style={{color: '#fff', fontWeight: '700', fontSize: '1rem'}}>✓</span>
                  </div>
                  <div>
                    <p style={{margin: 0, marginBottom: '0.3rem', fontSize: '1.05rem', fontWeight: '600'}}>압박 질문에도 논리적으로 대응</p>
                    <p style={{margin: 0, fontSize: '0.9rem', opacity: 0.8}}>연습해 본 적 있으니까</p>
                  </div>
                </div>

                {/* 체크 아이템 3 */}
                <div style={{marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--color-accent)'}}>
                  <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <span style={{color: '#fff', fontWeight: '700', fontSize: '1rem'}}>✓</span>
                  </div>
                  <div>
                    <p style={{fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.3rem'}}>옆 사람은 신경 안 씀</p>
                    <p style={{fontSize: '0.9rem', opacity: 0.8}}>내 답변에만 집중할 여유</p>
                  </div>
                </div>
              </div>

              {/* 결론 메시지 */}
              <div style={{marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', borderRadius: '12px', textAlign: 'center'}}>
                <p style={{fontSize: '1.3rem', fontWeight: '700', color: '#fff', margin: 0}}>
                  불안이 아닌, <strong style={{fontSize: '1.5rem'}}>자신감</strong>으로<br/>
                  면접장에 들어갑니다.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Preparation Rate Chart Section */}
        <section className={styles.chartSection}>
          <div className={styles.chartContainer}>
            {/* 핵심 카피 */}
            <h2 className={styles.megaCopy}>
              차이는 단 하나.
              <br/><br/>
              면접관이 물을 질문을<br/>
              <span className={styles.highlight}>미리 알았다는 것</span>
            </h2>

            {/* 증거 박스 - 리디자인 */}
            <div style={{marginBottom: '3rem'}}>
              <p style={{textAlign: 'center', fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', opacity: 0.8}}>
                합격자들에서 발견되는 패턴
              </p>

              {/* 3개 스탯 카드 */}
              <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem'}}>
                <div style={{
                  flex: '1',
                  minWidth: '140px',
                  maxWidth: '180px',
                  padding: '1.5rem 1rem',
                  background: 'rgba(var(--color-accent-rgb), 0.08)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(var(--color-accent-rgb), 0.15)'
                }}>
                  <div style={{fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem'}}>90%</div>
                  <div style={{fontSize: '0.85rem', opacity: 0.8, fontWeight: '500'}}>질문 연습</div>
                </div>

                <div style={{
                  flex: '1',
                  minWidth: '140px',
                  maxWidth: '180px',
                  padding: '1.5rem 1rem',
                  background: 'rgba(var(--color-accent-rgb), 0.08)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(var(--color-accent-rgb), 0.15)'
                }}>
                  <div style={{fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem'}}>92%</div>
                  <div style={{fontSize: '0.85rem', opacity: 0.8, fontWeight: '500'}}>모의 면접</div>
                </div>

                <div style={{
                  flex: '1',
                  minWidth: '140px',
                  maxWidth: '180px',
                  padding: '1.5rem 1rem',
                  background: 'rgba(var(--color-accent-rgb), 0.08)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(var(--color-accent-rgb), 0.15)'
                }}>
                  <div style={{fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem'}}>55%</div>
                  <div style={{fontSize: '0.85rem', opacity: 0.8, fontWeight: '500'}}>비언어 소통</div>
                </div>
              </div>

              {/* 출처 */}
              <p style={{textAlign: 'center', fontSize: '0.75rem', opacity: 0.5, lineHeight: '1.6'}}>
                데이터 출처: Glassdoor, Preplaced Interview Research, Novoresume
              </p>
            </div>

            <h2 className={styles.chartTitle}>
              면접 준비 기간에 따른 합격률
            </h2>

            {/* Graph Legend */}
            <div className={styles.graphLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="prepared"></div>
                <span className={styles.legendText}>체계적으로 준비한 경우</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendLine} data-type="unprepared"></div>
                <span className={styles.legendText}>준비 없이 면접 본 경우</span>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className={styles.lineGraphContainer}>
              <svg className={styles.lineGraph} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* Grid Lines */}
                <line x1="50" y1="250" x2="550" y2="250" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="187.5" x2="550" y2="187.5" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="125" x2="550" y2="125" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>
                <line x1="50" y1="62.5" x2="550" y2="62.5" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.2"/>

                {/* Y-axis Labels */}
                <text x="30" y="255" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">0%</text>
                <text x="30" y="192" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">25%</text>
                <text x="30" y="130" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">50%</text>
                <text x="30" y="67" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">75%</text>
                <text x="30" y="35" fill="var(--color-text-muted)" fontSize="12" textAnchor="end">100%</text>

                {/* X-axis Labels */}
                <text x="50" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">0일</text>
                <text x="216.67" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">1주</text>
                <text x="383.33" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">2주</text>
                <text x="550" y="275" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">3주+</text>

                {/* Unprepared Line (low and flat) */}
                <path
                  d="M 50 226 L 216.67 218.75 L 383.33 212.5 L 550 212.5"
                  stroke="var(--color-text-muted)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.lineUnprepared}
                />

                {/* Prepared Line (high and steep) */}
                <path
                  d="M 50 226 L 216.67 175 L 383.33 93.75 L 550 31.25"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.linePrepared}
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={theme.secondary} />
                    <stop offset="100%" stopColor={theme.secondaryLight} />
                  </linearGradient>
                </defs>

                {/* Unprepared Data Points */}
                <circle cx="50" cy="226" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="216.67" cy="218.75" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="383.33" cy="212.5" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>
                <circle cx="550" cy="212.5" r="5" fill="var(--color-text-muted)" className={styles.dataPoint}/>

                {/* Prepared Data Points */}
                <circle cx="50" cy="226" r="5" fill={theme.secondary} className={styles.dataPoint}/>
                <circle cx="216.67" cy="175" r="5" fill={theme.secondary} className={styles.dataPoint}/>
                <circle cx="383.33" cy="93.75" r="5" fill={theme.secondaryLight} className={styles.dataPoint}/>
                <circle cx="550" cy="31.25" r="5" fill={theme.secondaryLight} className={styles.dataPoint}/>

                {/* Final Value Labels */}
                <text x="560" y="218" fill="var(--color-text-muted)" fontSize="14" fontWeight="700">38%</text>
                <text x="560" y="38" fill={theme.secondaryLight} fontSize="14" fontWeight="700">85%</text>
              </svg>
            </div>

            <p className={styles.chartNote}>
              * 체계적인 준비는 합격률을 2배 이상 향상시킵니다
            </p>

            {/* 준비 방법 섹션 */}
            <div className={styles.prepMethod}>
              <h3 className={styles.prepMethodTitle}>
                준비를 하는 가장 좋은 방법은<br/>
                그냥 지금 시작하는 것입니다.
              </h3>

              <p className={styles.prepMethodIntro}>
                이런 고민, 해보셨죠?
              </p>

              <p style={{textAlign: 'center', fontSize: '0.9rem', opacity: 0.6, marginBottom: '1.5rem', fontStyle: 'italic'}}>
                "면접 질문 검색해봤자... 내 경험이랑 안 맞는데..."
              </p>

              {/* Before/After 비교 */}
              <div className={styles.prepComparison}>
                {/* Before */}
                <div className={styles.prepBefore}>
                  <div className={styles.prepLabel}>
                    <span className={styles.prepIcon}>X</span>
                    <span>보통 사람들의 면접 준비</span>
                  </div>
                  <ul className={styles.prepList}>
                    <li>
                      <span className={styles.prepStep}>1. 면접 질문 검색</span>
                      <span className={styles.prepProblem}>(어떤 게 나올지 모름)</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>2. 블로그 여기저기 뒤져서</span>
                      <span className={styles.prepProblem}>모범 답안 정리</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>3. 이게 내 경험이랑 맞나?</span>
                      <span className={styles.prepProblem}>혼자 고민</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>4. 매일 몇 시간씩...</span>
                      <span className={styles.prepProblem}>언제 끝날지 모름</span>
                    </li>
                  </ul>
                </div>

                {/* After */}
                <div className={styles.prepAfter}>
                  <div className={styles.prepLabel}>
                    <span className={styles.prepIcon}>✓</span>
                    <span>QueryDaily로 준비하는 당신</span>
                  </div>
                  <ul className={styles.prepList}>
                    <li>
                      <span className={styles.prepStep}>1. 매일 아침 7시, 저녁 5시</span>
                      <span className={styles.prepSolution}>당신 이력서 기반 질문 도착</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>2. 출근길 지하철에서</span>
                      <span className={styles.prepSolution}>그냥 읽기만</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>3. 버스 기다리면서</span>
                      <span className={styles.prepSolution}>답변 떠올리기</span>
                    </li>
                    <li>
                      <span className={styles.prepStep}>4. 하루 단 10분</span>
                      <span className={styles.prepSolution}>그게 전부</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 핵심 메시지 */}
              <div className={styles.prepMessage}>
                <p className={styles.prepMessageMain}>
                  진짜 질문. 진짜 경험. 합격하는 답변.
                </p>
                <p className={styles.prepMessageSub}>
                  우리는 이것만 보내드립니다.<br/>
                  당신은 그냥 받아보기만 하세요.
                </p>
              </div>
            </div>

            {/* CTA 넛지 카피 */}
            <div className={styles.ctaNudge}>
              <p className={styles.ctaNudgeMain}>
                합격은 여유에서 나옵니다.
              </p>
              <p className={styles.ctaNudgeDesc}>
                그 여유를 만들 충분한 시간
                <br/>
                <span className={styles.ctaNudgeHighlight}>하루 단 10분</span>
              </p>
              <a href="#products" style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(var(--color-accent-rgb), 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                나에게 맞는 플랜 보기 →
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.testimonialsContainer}>
            <span className={styles.testimonialsBadge}>검증된 후기</span>
            <h2 className={styles.testimonialsTitle}>
              숫자가 증명합니다
            </h2>
            <p className={styles.testimonialsSubtitle}>
              만족도 5.0, 재구매 100%.<br />
              <strong>우연이 아닙니다.</strong>
            </p>

            {/* Satisfaction Stats - Simplified */}
            <div className={styles.satisfactionStats}>
              <div className={styles.bigStat}>
                <div className={styles.bigStatNumber}>5.0/5.0</div>
                <div className={styles.bigStatLabel}>평균 만족도</div>
              </div>
              <div className={styles.bigStat}>
                <div className={styles.bigStatNumber}>100%</div>
                <div className={styles.bigStatLabel}>재구매 의향</div>
              </div>
              <div className={styles.bigStat}>
                <div className={styles.bigStatNumber}>하루 10분</div>
                <div className={styles.bigStatLabel}>면접 준비 시간</div>
              </div>
            </div>

            {/* Keyword Cloud */}
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

        {/* Urgency Section - 기회비용 프레이밍 */}
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            {/* 후회 훅 */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1rem',
                opacity: 0.6,
                marginBottom: '1.5rem'
              }}>
                매번 면접 끝나고 드는 생각
              </p>
              <div style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <p style={{
                  fontSize: '1.4rem',
                  fontStyle: 'italic',
                  lineHeight: '1.8',
                  margin: 0,
                  opacity: 0.9
                }}>
                  "그때 그 질문,<br/>
                  <span style={{color: 'var(--color-secondary)', fontWeight: '600'}}>더 잘 대답할 수 있었는데...</span>"
                </p>
              </div>
            </div>

            <h2 style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              fontWeight: '700',
              lineHeight: '1.6',
              marginBottom: '2.5rem'
            }}>
              후회는<br/>
              <span style={{color: 'var(--color-secondary)'}}>면접장을 나서야</span> 찾아옵니다.
            </h2>

            <div style={{maxWidth: '480px', margin: '0 auto'}}>
              {/* 흔한 후회들 */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.5,
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  면접 후 가장 많이 하는 말
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                  <p style={{
                    fontSize: '0.95rem',
                    margin: 0,
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    borderLeft: '3px solid rgba(255,255,255,0.2)'
                  }}>
                    "왜 그렇게 답했을까..."
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    margin: 0,
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    borderLeft: '3px solid rgba(255,255,255,0.2)'
                  }}>
                    "그 경험을 말했어야 했는데..."
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    margin: 0,
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    borderLeft: '3px solid rgba(255,255,255,0.2)'
                  }}>
                    "준비 좀 할 걸..."
                  </p>
                </div>
              </div>

              {/* 해결책 전환 */}
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.15), rgba(var(--color-accent-rgb), 0.05))',
                borderRadius: '16px',
                border: '2px solid rgba(var(--color-accent-rgb), 0.3)',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  미리 준비했다면<br/>
                  <span style={{fontSize: '1.3rem', color: 'var(--color-secondary)'}}>후회 대신 자신감</span>이<br/>
                  남았을 겁니다.
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  opacity: 0.7,
                  margin: 0
                }}>
                  다음 면접에서는 다르게 하세요.
                </p>
              </div>

              {/* 준비된 상태의 이점 */}
              <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <p style={{fontSize: '1rem', opacity: 0.7, marginBottom: '1.5rem'}}>
                  준비된 사람은 면접장을 나서며
                </p>
                <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'rgba(var(--color-accent-rgb), 0.1)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid rgba(var(--color-accent-rgb), 0.2)'
                  }}>
                    <p style={{fontSize: '1.1rem', fontWeight: '600', margin: 0, color: 'var(--color-secondary)'}}>
                      "할 만큼 했다"
                    </p>
                  </div>
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'rgba(var(--color-accent-rgb), 0.1)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid rgba(var(--color-accent-rgb), 0.2)'
                  }}>
                    <p style={{fontSize: '1.1rem', fontWeight: '600', margin: 0, color: 'var(--color-secondary)'}}>
                      "최선을 다했다"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.ctaNudge} style={{marginTop: '2rem'}}>
              <p className={styles.ctaNudgeMain} style={{fontSize: '1.3rem'}}>
                다음 면접,<br/>
                <span style={{color: 'var(--color-secondary)'}}>후회 없이 끝내세요.</span>
              </p>
              <p className={styles.ctaNudgeDesc} style={{marginTop: '1rem'}}>
                <span className={styles.ctaNudgeHighlight}>하루 10분만</span> 투자하세요.<br/>
                그게 전부입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.products}>
          <div className={styles.productsContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>시작하기</span>
              <h2 className={styles.sectionTitle}>
                내일을,<br/>
                <span className={styles.emphasizeLarge}>오늘</span> 준비하세요
              </h2>
            </div>

            {/* 떠먹여주는 메시지 */}
            <div style={{
              maxWidth: '520px',
              margin: '0 auto 3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.12), rgba(var(--color-accent-rgb), 0.05))',
              borderRadius: '20px',
              border: '2px solid rgba(var(--color-accent-rgb), 0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                질문도, 가이드도, 답변 구조도<br/>
                <span style={{color: 'var(--color-secondary)'}}>우리가 다 준비해뒀습니다.</span>
              </p>
              <p style={{
                fontSize: '1rem',
                opacity: 0.85,
                marginBottom: '1.5rem',
                lineHeight: '1.8'
              }}>
                당신은 그냥 열어보기만 하면 됩니다.<br/>
                매일 정해진 시간에 알아서 도착하니까요.
              </p>
              <div style={{
                padding: '1rem 1.5rem',
                background: 'rgba(var(--color-accent-rgb), 0.15)',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  margin: 0,
                  color: 'var(--color-secondary)'
                }}>
                  기회는 우리가 만들어드립니다.<br/>
                  <span style={{fontSize: '1.2rem'}}>당신은 선택만 하세요.</span>
                </p>
              </div>
            </div>

            <div id="products" className={styles.pricingGrid}>
              {/* Growth Plan - Featured */}
              <div className={`${styles.productCard} ${styles.featured}`}>
                <div className={styles.planBadge}>MOST POPULAR</div>

                <h3 className={styles.planTitle}>그로스 플랜</h3>
                <p className={styles.planSubtitle}>하루 10분 투자로 어떤 질문에도 흔들리지 않는 당신</p>

                <div className={styles.planDesc}>
                  "이 질문 나올 줄 알았어"<br />
                  하루 단 10분만 투자하면 면접장에서 이렇게 말하게 돼요
                </div>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>출근길 7시, 퇴근길 5시 - 당신의 리듬에 맞춰요</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>하루 10분만 투자하세요. 부담 없이, 완벽하게</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>어떻게 답할지 막막할 때, STAR 가이드가 알려줘요</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>"그럼 이런 경우는요?" 꼬리 질문도 대비돼요</span>
                  </div>
                </div>

                <div className={styles.planPrice}>
                  <span className={styles.priceCurrent}>₩49,000</span>
                  <span className={styles.priceOriginal}>정가 ₩106,000</span>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.planBtn} ${styles.featured}`}
                    onClick={() => {
                      setSelectedPurchaseProduct('growth-plan');
                      setPurchaseModalOpen(true);
                      setPurchaseModalStep(1);
                    }}
                  >
                    흔들리지 않는 면접 준비하기
                  </button>
                  <button
                    className={styles.detailBtn}
                    onClick={() => {
                      router.push('/prototype-hyundoo/v4/products/growth-plan');
                    }}
                  >
                    상세 보기
                  </button>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  marginTop: '1rem',
                  fontWeight: '500',
                  color: 'var(--color-secondary)',
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  하루 2,450원, 커피 한 잔 값으로<br/>
                  <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>하루 10분 투자가 자신감으로 바뀝니다</span>
                </p>
              </div>

              {/* Critical Hit */}
              <div className={styles.productCard}>
                <div className={styles.planBadge}>빠른 경험</div>

                <h3 className={styles.planTitle}>크리티컬 히트</h3>
                <p className={styles.planSubtitle}>내일 면접이어도 준비할 수 있어요</p>

                <div className={styles.planDesc}>
                  가장 많이 나오는 핵심 3가지.<br />
                  오늘 준비하면, 내일 자신있게 답할 수 있어요
                </div>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>당신 이력서에서 가장 중요한 질문 3개</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>어떻게 답할지 막막하지 않게, 답변 틀 제공</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>결제하면 24시간 내, 빠르게 준비 시작</span>
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

                <div className={styles.buttonGroup}>
                  <button
                    className={styles.planBtn}
                    onClick={() => {
                      setSelectedPurchaseProduct('critical-hit');
                      setPurchaseModalOpen(true);
                      setPurchaseModalStep(1);
                    }}
                  >
                    오늘 준비 시작하기
                  </button>
                  <button
                    className={styles.detailBtn}
                    onClick={() => {
                      router.push('/prototype-hyundoo/v4/products/critical-hit');
                    }}
                  >
                    상세 보기
                  </button>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  marginTop: '1rem',
                  fontWeight: '500',
                  color: 'var(--color-secondary)',
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  급할수록 핵심만 정확하게<br/>
                  <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>오늘 결제, 내일 면접 준비 완료</span>
                </p>
              </div>
            </div>

            {/* 상품 선택 가이드 - 2열 카드 레이아웃 */}
            <div style={{
              marginTop: '3rem',
              padding: '2.5rem 2rem',
              background: 'rgba(var(--color-accent-rgb), 0.05)',
              borderRadius: '24px'
            }}>
              <h3 style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '0.8rem'
              }}>
                어떤 플랜이 나에게 맞을까?
              </h3>
              <p style={{
                textAlign: 'center',
                fontSize: '0.95rem',
                opacity: 0.7,
                marginBottom: '2rem'
              }}>
                상황에 맞는 플랜을 선택하세요
              </p>

              {/* 2열 카드 그리드 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {/* 그로스 플랜 카드 */}
                <div style={{
                  padding: '2rem',
                  background: 'rgba(var(--color-accent-rgb), 0.08)',
                  borderRadius: '16px',
                  border: '2px solid rgba(var(--color-accent-rgb), 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, var(--color-secondary), var(--color-secondary-light))'
                  }}></div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    background: 'rgba(var(--color-accent-rgb), 0.2)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--color-secondary)'
                  }}>
                    RECOMMENDED
                  </div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '1.2rem',
                    color: 'var(--color-secondary)'
                  }}>
                    그로스 플랜
                  </h4>
                  <ul style={{
                    fontSize: '0.9rem',
                    opacity: 0.85,
                    lineHeight: '2',
                    paddingLeft: '0',
                    margin: 0,
                    listStyle: 'none'
                  }}>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{color: 'var(--color-secondary)'}}>✓</span>
                      <span>면접까지 <strong>1주일 이상</strong> 여유</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{color: 'var(--color-secondary)'}}>✓</span>
                      <span><strong>모든 질문</strong> 빠짐없이 준비</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{color: 'var(--color-secondary)'}}>✓</span>
                      <span>꼬리 질문까지 <strong>완벽 대비</strong></span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{color: 'var(--color-secondary)'}}>✓</span>
                      <span>이번 이직이 <strong>정말 중요</strong>한 분</span>
                    </li>
                  </ul>
                </div>

                {/* 크리티컬 히트 카드 */}
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--color-text-muted)'
                  }}></div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    빠른 경험
                  </div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '1.2rem'
                  }}>
                    크리티컬 히트
                  </h4>
                  <ul style={{
                    fontSize: '0.9rem',
                    opacity: 0.85,
                    lineHeight: '2',
                    paddingLeft: '0',
                    margin: 0,
                    listStyle: 'none'
                  }}>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{opacity: 0.5}}>•</span>
                      <span>면접이 <strong>3일 이내</strong>로 급한 분</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{opacity: 0.5}}>•</span>
                      <span><strong>먼저 경험</strong>해보고 싶은 분</span>
                    </li>
                    <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                      <span style={{opacity: 0.5}}>•</span>
                      <span>핵심 <strong>3개만</strong> 빠르게</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 추천 메시지 */}
              <div style={{
                textAlign: 'center',
                padding: '1.2rem',
                background: 'rgba(var(--color-accent-rgb), 0.1)',
                borderRadius: '12px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  <span style={{opacity: 0.7}}>고민된다면?</span>{' '}
                  <strong style={{color: 'var(--color-secondary)'}}>그로스 플랜</strong>을 추천드립니다.<br/>
                  <span style={{fontSize: '0.85rem', opacity: 0.6}}>제대로 준비해서 한 번에 붙는 게 결국 더 빠릅니다.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section - UI Improved */}
        <section className={styles.comparison}>
          <div className={styles.comparisonContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>핵심 차별점</span>
              <h2 className={styles.sectionTitle}>
                ChatGPT는 <span className={styles.deemphasize}>일반론</span>을 말합니다.<br/>
                QueryDaily는 <span className={styles.emphasize}>당신의 경험</span>을 묻습니다.
              </h2>
              <p style={{textAlign: 'center', fontSize: '0.9rem', opacity: 0.6, marginTop: '1rem', fontStyle: 'italic'}}>
                "ChatGPT에 물어봤는데... 뭔가 내 상황이랑 안 맞아..."
              </p>
            </div>

            {/* 핵심 포인트 */}
            <div style={{
              maxWidth: '480px',
              margin: '0 auto 3rem',
              padding: '1.5rem 2rem',
              background: 'rgba(var(--color-accent-rgb), 0.08)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                lineHeight: '1.8',
                margin: 0
              }}>
                면접관은 <strong>당신 이력서</strong>를 보고 질문합니다.<br/>
                <span style={{color: 'var(--color-secondary)'}}>그 질문을 미리 알면?</span>
              </p>
            </div>

            <div className={styles.comparisonGrid}>
              {/* General Questions */}
              <div className={styles.compCard}>
                <div className={styles.compHeader}>
                  <h3>일반 질문 (ChatGPT)</h3>
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

              {/* Resume-based Questions */}
              <div className={`${styles.compCard} ${styles.positive}`}>
                <div className={`${styles.compHeader} ${styles.positive}`}>
                  <h3>이력서 기반 질문 (QueryDaily)</h3>
                </div>
                <div className={styles.compQuestions}>
                  <div className={styles.compQItem}>
                    <span className={`${styles.compQNum} ${styles.positive}`}>Q1</span>
                    <p>"상품 검색 응답시간 2초→0.3초" 어떻게 달성했나요?</p>
                  </div>
                  <div className={styles.compQItem}>
                    <span className={`${styles.compQNum} ${styles.positive}`}>Q2</span>
                    <p>"동시 결제 처리 500건" 트랜잭션 충돌은 어떻게 해결했나요?</p>
                  </div>
                  <div className={styles.compQItem}>
                    <span className={`${styles.compQNum} ${styles.positive}`}>Q3</span>
                    <p>"DAU 10만 서비스" 쿼리 최적화 전략은 무엇이었나요?</p>
                  </div>
                </div>
                <div className={`${styles.compFooter} ${styles.positive}`}>
                  <p>당신이 직접 겪은 문제<br />→ 구체적인 해결 과정</p>
                </div>
              </div>
            </div>

            {/* 간단 비교 */}
            <div style={{
              marginTop: '3rem',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {/* ChatGPT */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255,100,100,0.08)',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.8rem', color: '#ff6b6b'}}>
                  ChatGPT
                </p>
                <p style={{fontSize: '0.95rem', opacity: 0.8, margin: 0, lineHeight: '1.7'}}>
                  당신 이력서를 모름 → 일반 질문만<br/>
                  다 같은 답 → 차별화 안 됨
                </p>
              </div>

              {/* QueryDaily */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(var(--color-accent-rgb), 0.1)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.8rem', color: 'var(--color-secondary)'}}>
                  QueryDaily
                </p>
                <p style={{fontSize: '0.95rem', opacity: 0.8, margin: 0, lineHeight: '1.7'}}>
                  당신 이력서 분석 → 맞춤 질문<br/>
                  당신만의 답 → 면접관 기억에 남음
                </p>
              </div>
            </div>

            {/* 결론 메시지 */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.15), rgba(var(--color-accent-rgb), 0.08))',
              borderRadius: '20px',
              border: '2px solid rgba(var(--color-accent-rgb), 0.2)',
              textAlign: 'center',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.7'
              }}>
                면접관이 물을 질문은<br/>
                <span style={{color: 'var(--color-secondary)', fontSize: '1.4rem'}}>이미 당신 이력서에</span> 다 있습니다.
              </p>
              <p style={{
                fontSize: '0.95rem',
                opacity: 0.8,
                margin: 0,
                lineHeight: '1.6'
              }}>
                ChatGPT는 그걸 모릅니다.<br/>
                <strong>QueryDaily는 그걸 찾아드립니다.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section - 공감과 응원 */}
        <section className={styles.problemSection} style={{position: 'relative', overflow: 'hidden'}}>
          {/* 배경 장식 요소들 */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '-5%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.04) 0%, transparent 60%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>
          {/* 체크마크 장식 */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            opacity: 0.03,
            fontSize: '8rem',
            pointerEvents: 'none'
          }}>✓</div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '8%',
            opacity: 0.03,
            fontSize: '6rem',
            pointerEvents: 'none'
          }}>✓</div>

          <div className={styles.problemContainer} style={{position: 'relative', zIndex: 1}}>
            <h2 className={styles.sectionTitle}>
              걱정하지 마세요,<br/>
              <span className={styles.highlight}>당신은 할 수 있어요</span>
            </h2>

            <div className={styles.prepMessage} style={{marginTop: '3rem', marginBottom: '3rem'}}>
              <p className={styles.prepMessageMain} style={{fontSize: '1.4rem', lineHeight: '2'}}>
                면접이 두려운 건 당연해요.
              </p>
              <p className={styles.prepMessageSub} style={{fontSize: '1.1rem', marginTop: '1.5rem'}}>
                열심히 준비한 만큼 잘 보여주고 싶은 마음,<br/>
                그 마음이 긴장이 되는 거예요.<br/>
                <strong>그건 당신이 진심이라는 증거</strong>입니다.
              </p>
            </div>

            <div className={styles.scenarioList}>
              <div className={styles.scenarioItem}>
                <div className={styles.scenarioText}>
                  <p className={styles.scenarioAction} style={{fontSize: '1.1rem', fontWeight: '600'}}>이미 해낸 것들이 있잖아요</p>
                  <p className={styles.scenarioQuestion}>프로젝트도 했고, 어려운 문제도 풀었고, 여기까지 왔어요</p>
                  <p className={styles.scenarioResult} style={{color: 'var(--color-accent)'}}>→ 그걸 말로 풀어내는 연습만 하면 돼요</p>
                </div>
              </div>

              <div className={styles.scenarioItem}>
                <div className={styles.scenarioText}>
                  <p className={styles.scenarioAction} style={{fontSize: '1.1rem', fontWeight: '600'}}>면접관도 당신 편이에요</p>
                  <p className={styles.scenarioQuestion}>그들도 좋은 사람을 만나고 싶어해요</p>
                  <p className={styles.scenarioResult} style={{color: 'var(--color-accent)'}}>→ 당신이 그 사람임을 보여주기만 하면 돼요</p>
                </div>
              </div>

              <div className={styles.scenarioItem}>
                <div className={styles.scenarioText}>
                  <p className={styles.scenarioAction} style={{fontSize: '1.1rem', fontWeight: '600'}}>준비하면 달라져요</p>
                  <p className={styles.scenarioQuestion}>예상된 질문에는 자신감이 생겨요</p>
                  <p className={styles.scenarioResult} style={{color: 'var(--color-accent)'}}>→ 그 자신감이 면접장에서 빛나요</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaNudge} style={{marginTop: '3rem'}}>
              <p className={styles.ctaNudgeMain}>
                당신은 이미 충분해요.<br/>
                그걸 잘 보여주는 법만 연습하면 돼요.
              </p>
              <p className={styles.ctaNudgeDesc} style={{marginTop: '1rem'}}>
                새로운 걸 배우는 게 아니에요.<br/>
                <span className={styles.ctaNudgeHighlight}>이미 가진 걸, 잘 전달하는 거예요.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Empowerment Section - 선택의 주체 */}
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '1.6rem',
              fontWeight: '700',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              회사가 나를 선택하는 게 아니라,<br/>
              <span className={styles.highlight} style={{fontSize: '1.8rem'}}>내가 회사를 선택하는 겁니다.</span>
            </h2>

            <div className={styles.prepMessage} style={{marginBottom: '2.5rem'}}>
              <p className={styles.prepMessageSub} style={{fontSize: '1.05rem', lineHeight: '1.9'}}>
                준비된 사람은 다릅니다.<br/><br/>
                면접장에서 떨지 않고,<br/>
                오히려 <strong>"이 회사가 나한테 맞는지"</strong> 살펴봅니다.<br/><br/>
                여러 곳에서 합격하면,<br/>
                <strong>더 좋은 조건, 더 맞는 문화</strong>를 고를 수 있습니다.
              </p>
            </div>

            {/* 준비 안 된 사람 vs 준비된 사람 - 2열 카드 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {/* 준비 안 된 사람 */}
              <div style={{
                padding: '2rem 1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center',
                opacity: 0.7
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  opacity: 0.5,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>준비 안 된 사람</p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '0.8rem',
                  lineHeight: '1.4'
                }}>"제발 여기라도..."</p>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.6,
                  margin: 0
                }}>어디든 붙으면 감사</p>
              </div>

              {/* 준비된 사람 */}
              <div style={{
                padding: '2rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.15), rgba(var(--color-accent-rgb), 0.08))',
                borderRadius: '16px',
                border: '2px solid rgba(var(--color-accent-rgb), 0.3)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--color-secondary), var(--color-secondary-light))'
                }}></div>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-secondary)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '600'
                }}>준비된 사람</p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.8rem',
                  lineHeight: '1.4',
                  color: 'var(--color-secondary)'
                }}>"여기가 나한테 맞을까?"</p>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  margin: 0,
                  fontWeight: '500'
                }}>여러 합격 중 선택</p>
              </div>
            </div>

            <div className={styles.ctaNudge} style={{marginTop: '2.5rem'}}>
              <p className={styles.ctaNudgeMain}>
                당신의 커리어를 당신이 주도하세요.
              </p>
              <p className={styles.ctaNudgeDesc} style={{marginTop: '0.8rem'}}>
                그 시작은 <span className={styles.ctaNudgeHighlight}>제대로 된 면접 준비</span>입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className={styles.whoWeAre}>
          <div className={styles.whoWeAreContainer}>
            <div className={styles.whoWeAreHeader}>
              <span className={styles.whoWeAreBadge}>만든 사람들</span>
              <h2 className={styles.sectionTitle}>
                사실 우리는 먼저 떨어져본 사람들입니다.<br/>
                <span className={styles.whoWeAreHighlight}>그래서 알아요.</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                왜 떨어지는지.<br/>
                어떻게 하면 붙는지.
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
                        <stop offset="0%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondaryLight, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad1)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>현) 판교 N사 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>국비지원 수료생</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>판교 대기업</span>
                </div>
                <p className={styles.expertStory}>
                  "저도 국비생이었어요. 300번 떨어졌죠."<br/>
                  → 2년 후, 당신도 연봉 2배 받을 수 있어요
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.secondaryLight, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondary, stopOpacity:1}} />
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
                  "SI 야근에 지쳐서 100번 넘게 지원했어요."<br/>
                  → 이제 당신은 그러지 않아도 됩니다
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.primaryLight, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.secondary, stopOpacity:1}} />
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
                  "무명 스타트업에서 시작했어요. 막막했죠."<br/>
                  → 당신의 시작도 빛날 수 있어요
                </p>
              </div>

              <div className={styles.expertCard}>
                <div className={styles.expertAvatar}>
                  <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: theme.secondary, stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: theme.primary, stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad4)" opacity="0.9"/>
                  </svg>
                </div>
                <div className={styles.expertBadge}>현) 테크 기업 개발자</div>
                <div className={styles.expertJourney}>
                  <span className={styles.journeyFrom}>CS 전공</span>
                  <span className={styles.journeyArrow}>→</span>
                  <span className={styles.journeyTo}>판교 테크 기업</span>
                </div>
                <p className={styles.expertStory}>
                  "CS 전공이어도 면접에선 떨어졌어요."<br/>
                  → 전공 상관없이, 당신도 붙을 수 있어요
                </p>
              </div>
            </div>

            <div className={styles.teamSummary}>
              <p className={styles.summaryMain}>
                우리의 <span className={styles.highlight}>500번 실패</span>가<br/>
                당신의 <span className={styles.highlight}>첫 합격</span>을 만듭니다.
              </p>
              <p style={{
                marginTop: '1.5rem',
                fontSize: '1.05rem',
                opacity: 0.85,
                lineHeight: '1.8',
                textAlign: 'center'
              }}>
                우리가 시행착오로 얻은 노하우,<br/>
                <strong style={{color: 'var(--color-secondary)'}}>전부 드리고 싶어요.</strong><br/>
                <span style={{fontSize: '0.9rem', opacity: 0.7}}>당신은 우리처럼 돌아가지 않아도 되니까요.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Bridge CTA Section - 킥 포인트 */}
        <section className={styles.bridgeCta} style={{position: 'relative', overflow: 'hidden'}}>
          {/* 배경 글로우 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.1) 0%, transparent 60%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>

          <div className={styles.bridgeCtaContainer} style={{position: 'relative', zIndex: 1}}>
            <div style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <p style={{
                fontSize: '1.1rem',
                opacity: 0.7,
                marginBottom: '2rem',
                lineHeight: '1.8'
              }}>
                면접에서 떨어진 그날 밤,<br/>
                분명 이렇게 생각했을 거예요.
              </p>

              <h3 style={{
                fontSize: '2rem',
                fontWeight: '800',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                <span style={{opacity: 0.5}}>"</span>나는 분명 할 수 있었는데...<br/>
                <span style={{
                  background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2.3rem'
                }}>왜 말이 안 나왔지?</span><span style={{opacity: 0.5}}>"</span>
              </h3>

              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.9',
                marginBottom: '2.5rem',
                fontWeight: '500'
              }}>
                실력이 없어서가 아니에요.<br/>
                <strong>그 질문이 나올 줄 몰랐을 뿐</strong>이에요.<br/><br/>
                <span style={{opacity: 0.8}}>
                  알았다면, 준비했을 거예요.<br/>
                  준비했다면, <span style={{color: 'var(--color-secondary)', fontWeight: '700'}}>말할 수 있었을 거예요.</span>
                </span>
              </p>

              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.15), rgba(var(--color-accent-rgb), 0.08))',
                borderRadius: '20px',
                border: '2px solid rgba(var(--color-accent-rgb), 0.25)'
              }}>
                <p style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  margin: 0,
                  lineHeight: '1.7'
                }}>
                  다음 면접에서는<br/>
                  <span style={{
                    color: 'var(--color-secondary)',
                    fontSize: '1.6rem'
                  }}>"이 질문 나올 줄 알았어"</span><br/>
                  라고 말하세요.
                </p>
              </div>

              {/* 최종 CTA */}
              <a href="#products" style={{
                display: 'inline-block',
                marginTop: '2.5rem',
                padding: '1.2rem 3rem',
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.2rem',
                borderRadius: '16px',
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(var(--color-accent-rgb), 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                지금 준비 시작하기 →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>
              시작하기 전,<br />
              이것만 확인하세요
            </h2>

            <div className={styles.faqList}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>이력서 기반 예측이 정확한가요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  실제 사용자 피드백에서 "면접에서 비슷한 질문이 나왔다"는 평가가 많습니다.<br /><br />
                  당신의 이력서 경험과 기술을 바탕으로 면접관이 파고들 포인트를 정확히 예측합니다.<br />
                  현직 시니어 개발자 4명이 질문 품질을 검수합니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>ChatGPT랑 뭐가 다른가요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  ChatGPT는 일반적인 질문을 생성하지만, QueryDaily는 <strong>당신의 이력서를 분석</strong>하여 맞춤 질문을 만듭니다.<br /><br />
                  또한 매일 자동으로 발송되어 꾸준한 연습이 가능하며, STAR 기법 가이드를 함께 제공합니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>환불 정책은 어떻게 되나요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  크리티컬 히트: 발송 전 100% 환불<br />
                  그로스 플랜: 첫 질문 발송 전 100% 환불, 이후 남은 일수에 대해 일할 계산<br /><br />
                  환불 사유는 묻지 않습니다.
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>어떤 기술 스택을 다루나요?</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <strong>백엔드 개발자</strong>를 위한 서비스입니다.<br /><br />
                  Spring, Node.js, Django, FastAPI 등 주요 프레임워크와<br />
                  MySQL, PostgreSQL, MongoDB, Redis 등 데이터베이스,<br />
                  그리고 AWS, Docker, Kubernetes 등<br />
                  <strong>당신의 이력서에 있는 모든 기술</strong>을 다룹니다.
                </div>
              </details>
            </div>

            {/* 카카오톡 상담 CTA */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(var(--color-accent-rgb), 0.08)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.8rem'
              }}>
                더 궁금한 점이 있으신가요?
              </p>
              <p style={{
                fontSize: '0.95rem',
                opacity: 0.7,
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                카카오톡으로 편하게 물어보세요.<br/>
                빠르게 답변드릴게요.
              </p>
              <a
                href="http://pf.kakao.com/_fxdxfTG"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: '#FEE500',
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.18.483.378.352.156-.103 2.5-1.667 3.508-2.343.538.073 1.093.112 1.624.112 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z"/>
                </svg>
                카카오톡으로 문의하기
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer} style={{
          padding: '5rem 2rem 2rem',
          background: 'linear-gradient(180deg, var(--color-bg) 0%, rgba(var(--color-accent-rgb), 0.08) 100%)',
          borderTop: '1px solid rgba(var(--color-accent-rgb), 0.1)'
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            {/* 상단 컨텐츠 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '4rem'
            }}>
              {/* 브랜드 섹션 */}
              <div style={{maxWidth: '400px'}}>
                <div className={styles.footerLogo} style={{fontSize: '2rem', marginBottom: '1rem'}}>
                  Query<span>Daily</span>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  당신의 이력서를 분석해서,<br/>
                  면접관이 꼭 물어볼 질문을 매일 보내드립니다.
                </p>

                {/* 소셜 링크 */}
                <div style={{display: 'flex', gap: '1rem'}}>
                  <a
                    href="https://www.instagram.com/querydaily"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(var(--color-accent-rgb), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="http://pf.kakao.com/_fxdxfTG"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(var(--color-accent-rgb), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.18.483.378.352.156-.103 2.5-1.667 3.508-2.343.538.073 1.093.112 1.624.112 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* 링크 섹션들 */}
              <div style={{
                display: 'flex',
                gap: '4rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1.2rem'
                  }}>상품</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="#products" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>전체 상품</a>
                    <a href="#products" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>그로스 플랜</a>
                    <a href="#products" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>크리티컬 히트</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1.2rem'
                  }}>서비스</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="#how-it-works" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>이용방법</a>
                    <a href="#faq" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>자주 묻는 질문</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>1:1 상담</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1.2rem'
                  }}>고객지원</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="/terms" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>이용약관</a>
                    <a href="/privacy" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>개인정보처리방침</a>
                    <a href="/refund" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>환불정책</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1.2rem'
                  }}>Contact</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="mailto:contact@querydaily.com" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>contact@querydaily.com</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>카카오톡 상담</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 - 저작권 및 사업자 정보 */}
            <div style={{
              borderTop: '1px solid rgba(var(--color-accent-rgb), 0.1)',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)'
              }}>© 2024 QueryDaily. All rights reserved.</p>
              <p style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)'
              }}>사업자등록번호: 123-45-67890 | 대표: QueryDaily</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Purchase Modal for Paid Products */}
      {purchaseModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setPurchaseModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setPurchaseModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalContent}>
              {/* Progress Indicator */}
              <div className={styles.modalProgress}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`${styles.modalProgressDot} ${
                      purchaseModalStep >= step ? styles.modalProgressDotActive : ''
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Resume Upload */}
              {purchaseModalStep === 1 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    이력서를 업로드해주세요
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {selectedPurchaseProduct === 'critical-hit' && '맞춤형 핵심 질문 생성을 위해 필요합니다'}
                    {selectedPurchaseProduct === 'growth-plan' && '20일 성장 계획 수립을 위해 필요합니다'}
                  </p>

                  <div className={styles.selectedProductInfo}>
                    <span className={styles.modalProductBadge}>
                      {selectedPurchaseProduct === 'critical-hit' && '크리티컬 히트'}
                      {selectedPurchaseProduct === 'growth-plan' && '그로스 플랜'}
                    </span>
                    <span className={styles.modalProductPrice}>
                      {selectedPurchaseProduct === 'critical-hit' && '₩9,900'}
                      {selectedPurchaseProduct === 'growth-plan' && '₩49,000'}
                    </span>
                  </div>

                  <div className={styles.modalFormGroup}>
                    <div className={styles.fileUploadArea}>
                      <input
                        type="file"
                        id="purchaseResume"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              setErrors(['파일 크기는 10MB 이하여야 합니다']);
                              setTimeout(() => setErrors([]), 3000);
                              return;
                            }
                            setPurchaseFile(file);
                          }
                        }}
                      />
                      <label htmlFor="purchaseResume" className={styles.fileUploadBox}>
                        {purchaseFile ? (
                          <>
                            <span className={styles.uploadedIcon}>
                              <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Success" width="32" height="32" />
                            </span>
                            <span className={styles.uploadedFileName}>{purchaseFile.name}</span>
                            <span className={styles.uploadedSize}>
                              ({(purchaseFile.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={styles.uploadIcon}>
                              <img src="https://img.icons8.com/?id=368&format=png&size=48" alt="Upload" width="40" height="40" />
                            </span>
                            <span className={styles.uploadText}>PDF 파일을 선택하거나 드래그하세요</span>
                            <span className={styles.uploadHint}>최대 10MB</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {purchaseFile && (
                    <>
                      <div className={styles.paymentMethodTitle}>
                        결제 방법을 선택해주세요
                      </div>
                      <div className={styles.paymentMethodButtons}>
                        <button
                          className={`${styles.paymentMethodBtn} ${styles.bankTransferBtn}`}
                          onClick={() => {
                            setPaymentMethod('bank');
                            setPurchaseModalStep(2);
                          }}
                        >
                          <span className={styles.paymentMethodIcon}>
                            <img src="https://img.icons8.com/?id=3671&format=png&size=48" alt="Bank" width="32" height="32" />
                          </span>
                          <span className={styles.paymentMethodText}>
                            <strong>무통장입금</strong>
                            <small>계좌이체로 안전하게 결제</small>
                          </span>
                        </button>
                        <button
                          className={`${styles.paymentMethodBtn} ${styles.cardPaymentBtn}`}
                          onClick={() => {
                            setPaymentMethod('card');
                            setPurchaseModalStep(2);
                          }}
                        >
                          <span className={styles.paymentMethodIcon}>
                            <img src="https://img.icons8.com/?id=TwIM2uks64q5&format=png&size=48" alt="Card Payment" width="32" height="32" />
                          </span>
                          <span className={styles.paymentMethodText}>
                            <strong>카드결제</strong>
                            <small>신용/체크카드로 간편 결제</small>
                          </span>
                        </button>
                      </div>
                    </>
                  )}

                  {!purchaseFile && (
                    <div className={styles.modalActions}>
                      <button
                        className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                        onClick={() => setPurchaseModalOpen(false)}
                      >
                        취소
                      </button>
                    </div>
                  )}

                  <p className={styles.modalHint}>
                    이력서는 암호화되어 안전하게 보관되며, AI 분석에만 사용됩니다
                  </p>
                </div>
              )}

              {/* Step 2: Order Information */}
              {purchaseModalStep === 2 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    주문자 정보 입력
                  </h2>
                  <p className={styles.modalSubtitle}>
                    결제를 위한 정보를 입력해주세요
                  </p>

                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>이메일 <span className={styles.required}>*</span></label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={purchaseEmail}
                      onChange={(e) => {
                        setPurchaseEmail(e.target.value);
                        if (purchaseEmailError) {
                          setPurchaseEmailError('');
                        }
                      }}
                      onBlur={(e) => {
                        const email = e.target.value.trim();
                        if (email && !email.includes('@')) {
                          setPurchaseEmailError('올바른 이메일 주소를 입력해주세요 (예: your@email.com)');
                        } else {
                          setPurchaseEmailError('');
                        }
                      }}
                      className={`${styles.modalInput} ${purchaseEmailError ? styles.inputError : ''}`}
                      autoFocus
                    />
                    {purchaseEmailError && (
                      <p className={styles.errorMessage}>
                        {purchaseEmailError}
                      </p>
                    )}
                  </div>

                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>이름 <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className={styles.modalInput}
                      value={purchaseName}
                      onChange={(e) => {
                        setPurchaseName(e.target.value);
                        if (purchaseNameError) {
                          setPurchaseNameError('');
                        }
                      }}
                      style={purchaseNameError ? { borderColor: '#ff6b6b' } : {}}
                    />
                    {purchaseNameError && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        {purchaseNameError}
                      </p>
                    )}
                  </div>

                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>연락처 <span className={styles.required}>*</span></label>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      className={styles.modalInput}
                      value={purchasePhone}
                      onChange={(e) => {
                        setPurchasePhone(e.target.value);
                        if (purchasePhoneError) {
                          setPurchasePhoneError('');
                        }
                      }}
                      onBlur={(e) => {
                        const phone = e.target.value.trim();
                        if (phone && !validatePhone(phone)) {
                          setPurchasePhoneError('올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678, 하이픈 필수)');
                        } else {
                          setPurchasePhoneError('');
                        }
                      }}
                      style={purchasePhoneError ? { borderColor: '#ff6b6b' } : {}}
                    />
                    {purchasePhoneError && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        {purchasePhoneError}
                      </p>
                    )}
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setPurchaseModalStep(1)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                      onClick={() => {
                        if (!purchaseEmail.trim()) {
                          alert('이메일을 입력해주세요');
                          return;
                        }
                        if (!purchaseEmail.includes('@')) {
                          alert('올바른 이메일 주소를 입력해주세요');
                          return;
                        }
                        if (!purchaseName.trim()) {
                          alert('이름을 입력해주세요');
                          return;
                        }
                        if (!purchasePhone.trim()) {
                          alert('연락처를 입력해주세요');
                          return;
                        }
                        if (!validatePhone(purchasePhone)) {
                          alert('올바른 전화번호 형식을 입력해주세요\n\n예시: 010-1234-5678\n(하이픈 필수)');
                          return;
                        }

                        if (paymentMethod === 'card') {
                          handleCardPayment();
                        } else {
                          setPurchaseModalStep(3);
                        }
                      }}
                    >
                      다음 단계로
                    </button>
                  </div>

                  <p className={styles.modalHint}>
                    입금자명 확인을 위해 정확한 정보를 입력해주세요
                  </p>
                </div>
              )}

              {/* Step 3: Payment */}
              {purchaseModalStep === 3 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    무통장입금 안내
                  </h2>
                  <p className={styles.modalSubtitle}>
                    안전한 결제를 진행합니다
                  </p>

                  <div className={styles.modalOrderSummary}>
                    <div className={styles.modalOrderItem}>
                      <span>상품</span>
                      <span>
                        {selectedPurchaseProduct === 'critical-hit' && '크리티컬 히트'}
                        {selectedPurchaseProduct === 'growth-plan' && '그로스 플랜'}
                      </span>
                    </div>
                    <div className={styles.modalOrderItem}>
                      <span>가격</span>
                      <span>
                        {selectedPurchaseProduct === 'critical-hit' && '₩9,900'}
                        {selectedPurchaseProduct === 'growth-plan' && '₩49,000'}
                      </span>
                    </div>
                    <div className={`${styles.modalOrderItem} ${styles.modalOrderTotal}`}>
                      <span>결제 금액</span>
                      <span className={styles.totalPrice}>
                        {selectedPurchaseProduct === 'critical-hit' && '₩9,900'}
                        {selectedPurchaseProduct === 'growth-plan' && '₩49,000'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.modalHighlight}>
                    <p>
                      <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Check" width="16" height="16" className={styles.checkIcon} />
                      무통장입금으로 안전한 결제
                    </p>
                    <p>
                      <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Check" width="16" height="16" className={styles.checkIcon} />
                      입금 확인 후 24시간 내 발송
                    </p>
                    <p>
                      <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Check" width="16" height="16" className={styles.checkIcon} />
                      이메일로 결과 전송
                    </p>
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setPurchaseModalStep(2)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary} ${styles.modalBtnLarge}`}
                      onClick={async () => {
                        if (!purchaseFile || !purchaseName || !purchaseEmail || !purchasePhone) {
                          setErrors(['모든 필수 정보를 입력해주세요.']);
                          return;
                        }

                        setIsSubmitting(true);
                        try {
                          const productTypeMap: Record<string, string> = {
                            'critical-hit': 'CRITICAL_HIT',
                            'growth-plan': 'SQL_MASTER'
                          };

                          const response = await submitBetaApplication({
                            email: purchaseEmail,
                            name: purchaseName,
                            phone: purchasePhone,
                            productType: productTypeMap[selectedPurchaseProduct || ''] || 'SQL_MASTER',
                            resume: purchaseFile
                          });

                          if (response.success && response.data?.memberId) {
                            const orderData = {
                              memberId: response.data?.memberId,
                              name: purchaseName,
                              email: purchaseEmail,
                              phone: purchasePhone,
                              product: selectedPurchaseProduct || '',
                              orderDate: new Date().toISOString(),
                              orderId: `QD${Date.now()}`
                            };

                            localStorage.setItem('orderData', JSON.stringify(orderData));
                            router.push('/payment');
                          } else {
                            setErrors(['신청 처리 중 오류가 발생했습니다.']);
                          }
                        } catch (error) {
                          console.error('Error submitting application:', error);
                          setErrors(['신청 처리 중 오류가 발생했습니다.']);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '처리중...' : '무통장입금으로 결제하기'}
                    </button>
                  </div>

                  <p className={styles.modalPaymentSecurity}>
                    <img src="https://img.icons8.com/?id=39138&format=png&size=48" alt="Security" width="16" height="16" className={styles.securityIcon} />
                    결제 정보는 암호화되어 안전하게 처리됩니다
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePageV2() {
  return (
    <ThemeProvider>
      <LandingPageContent />
    </ThemeProvider>
  );
}
