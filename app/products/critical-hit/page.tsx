'use client';

import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import './white-theme.css';
import { submitBetaApplication, createOrder, ProductCode } from '@/lib/api';
import { useSafeProductPrice } from '@/hooks/useProductPrices';
import {
  Calendar,
  Building2,
  BookOpen,
  Lightbulb,
  Check,
  Star,
  Users,
  Clock,
  Shield,
  TrendingUp,
  Mail,
  FileText,
  Bot,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  Target,
  X,
  AlertCircle,
  Award,
  BarChart3,
  Briefcase,
  ChevronRight,
  Flame,
  MessageSquare,
  Trophy,
  Gift,
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Phone validation helper
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

function CriticalHitContent() {
  const router = useRouter();

  // 상품 가격 (DB에서 조회)
  const { basePrice, currentPrice, discountPercent, formattedBasePrice, formattedCurrentPrice } =
    useSafeProductPrice('CRITICAL_HIT');
  const growthPlanPrice = useSafeProductPrice('GROWTH_PLAN');

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Free Trial Form States
  const [freeTrialEmail, setFreeTrialEmail] = useState('');
  const [freeTrialName, setFreeTrialName] = useState('');
  const [freeTrialRole, setFreeTrialRole] = useState('');
  const [freeTrialExperience, setFreeTrialExperience] = useState('');
  const [freeTrialWorry, setFreeTrialWorry] = useState('');
  const [isSubmittingFreeTrial, setIsSubmittingFreeTrial] = useState(false);

  // Purchase Modal States
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseModalStep, setPurchaseModalStep] = useState(1);
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

  // 결제 모달 열기
  const openPaymentModal = () => {
    setPurchaseModalOpen(true);
    setPurchaseModalStep(1);
  };

  // 카드 결제 처리
  const handleCardPayment = async () => {
    try {
      setIsSubmitting(true);

      const response = await createOrder({
        email: purchaseEmail,
        name: purchaseName,
        phone: purchasePhone,
        productCode: ProductCode.CRITICAL_HIT,
        paymentMethod: 'card',
        resume: purchaseFile || undefined
      });

      if (!response.success || !response.data) {
        alert(`주문 생성에 실패했습니다: ${response.message || '알 수 없는 오류'}`);
        return;
      }

      const orderInfo = {
        orderId: response.data.orderId,
        product: 'critical-hit',
        price: response.data.amount || 0,
        paymentMethod: 'card',
        email: purchaseEmail,
        name: purchaseName,
        phone: purchasePhone || '',
      };
      localStorage.setItem('orderData', JSON.stringify(orderInfo));

      if (response.data.invocationType === 'SDK' && response.data.portOneSdkPayload) {
        const PortOne = await import('@portone/browser-sdk/v2');
        const payload = response.data.portOneSdkPayload as Parameters<typeof PortOne.requestPayment>[0];

        try {
          const sdkResponse = await PortOne.requestPayment(payload);

          if (!sdkResponse) {
            alert('결제 응답을 받지 못했습니다.');
            return;
          }

          if (sdkResponse.code !== undefined) {
            let userMessage = '결제를 처리할 수 없습니다.';
            if (sdkResponse.code === 'FAILURE_TYPE_PG') {
              userMessage = `결제 실패: ${sdkResponse.message || 'PG사 오류'}`;
            } else if (sdkResponse.code === 'FAILURE_TYPE_TIMEOUT') {
              userMessage = '결제 시간이 초과되었습니다.';
            }
            alert(userMessage);
            return;
          }

          router.push('/order-complete');
        } catch (sdkError: any) {
          console.error('[PortOne SDK] Error during requestPayment:', sdkError);
          alert('결제 창을 여는 중 오류가 발생했습니다.');
        }
      } else {
        alert('리다이렉트 방식은 현재 지원하지 않습니다.');
      }
    } catch (error) {
      console.error('Card payment error:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 화이트 테마 CSS 변수 적용
  useLayoutEffect(() => {
    const root = document.documentElement;
    const originalStyles: { [key: string]: string } = {};
    const properties = [
      '--color-primary',
      '--color-primary-light',
      '--color-secondary',
      '--color-secondary-light',
      '--color-bg-primary',
      '--color-bg-secondary',
      '--color-bg-tertiary',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-text-muted',
      '--color-accent-rgb',
    ];

    properties.forEach(prop => {
      originalStyles[prop] = root.style.getPropertyValue(prop);
    });


    // 화이트 테마 설정 (블루+보라색 테마)
    root.style.setProperty('--color-primary', '#8b5cf6');
    root.style.setProperty('--color-primary-light', '#a78bfa');
    root.style.setProperty('--color-secondary', '#8b5cf6');
    root.style.setProperty('--color-secondary-light', '#a78bfa');
    root.style.setProperty('--color-bg-primary', '#ffffff');
    root.style.setProperty('--color-bg-secondary', '#f8f9fa');
    root.style.setProperty('--color-bg-tertiary', '#f1f3f4');
    root.style.setProperty('--color-text-primary', '#1a1a1a');
    root.style.setProperty('--color-text-secondary', '#4a4a4a');
    root.style.setProperty('--color-text-muted', '#6b7280');
    root.style.setProperty('--color-accent-rgb', '139, 92, 246');

    // 컴포넌트 언마운트 시 원래대로 복원 (선택사항)
    return () => {
      // 다른 페이지로 이동시 다크 테마로 복원하고 싶다면 여기에 코드 추가
      Object.entries(originalStyles).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(key, value);
        } else {
          root.style.removeProperty(key);
        }
      });
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.logo} onClick={() => router.push('/')}>
            <span className={styles.logoText}>
              Query<span className={styles.logoAccent}>Daily</span>
            </span>
          </div>
          <button className={styles.ctaButton} onClick={openPaymentModal}>
            지금 시작하기
          </button>
        </div>
      </header>

      {/* Floating CTA Button */}
      <div className={styles.floatingCta}>
        <div className={styles.floatingCtaContent}>
          <div className={styles.floatingPrice}>
            <span className={styles.floatingPriceOriginal}>₩{formattedBasePrice}</span>
            <span className={styles.floatingPriceCurrent}>₩{formattedCurrentPrice}</span>
          </div>
          <button className={styles.floatingCtaButton} onClick={openPaymentModal}>
            지금 시작하기
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {/* Sticky Sidebar */}
        <aside className={styles.stickySidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarBadge}>
              <Zap size={14} />
              빠른 경험
            </div>

            <h3 className={styles.sidebarTitle}>크리티컬 히트</h3>
            <p className={styles.sidebarSubtitle}>핵심 질문 3개 즉시 제공</p>

            <div className={styles.sidebarPrice}>
              <div className={styles.sidebarPriceOriginal}>₩{formattedBasePrice}</div>
              <div className={styles.sidebarPriceCurrent}>₩{formattedCurrentPrice}</div>
              <div className={styles.sidebarDiscount}>{discountPercent}% 할인</div>
            </div>

            <div className={styles.sidebarFeatures}>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>한 번에 3개 질문 전송</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>결제 후 48시간 내 발송</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>상세 해설 포함</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>꼬리 질문 대비</span>
              </div>
            </div>

            <button className={styles.sidebarCtaButton} onClick={openPaymentModal}>
              이력서 업로드
              <ArrowRight size={18} />
            </button>

            <div className={styles.sidebarStats}>
              <div className={styles.sidebarStat}>
                <Users size={16} />
                <span>12명 수강</span>
              </div>
              <div className={styles.sidebarStat}>
                <Star size={16} />
                <span>4.8 (12)</span>
              </div>
            </div>

            <p className={styles.sidebarRefund}>
              <Shield size={14} />
              첫 질문 발송 전 100% 환불
            </p>
          </div>
        </aside>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* 상단 배지들 */}
            <div className={styles.heroBadges}>
              <div className={styles.heroBadge}>
                <Zap size={16} />
                <span>오픈 특가 {discountPercent}% 할인</span>
              </div>
              <div className={styles.heroLiveBadge}>
                <div className={styles.liveDot}></div>
                <span>지금 8명이 체험 중</span>
              </div>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className={styles.heroTitle}>
              면접까지 시간이 없다면<br />
              <span className={styles.heroHighlight}>핵심만 빠르게</span>
            </h1>

            {/* 서브 헤드라인 */}
            <p className={styles.heroSubheadline}>
              면접이 코앞? <strong>핵심 질문 3개</strong>를 바로 받아보세요
            </p>

            {/* 임팩트 넘버 */}
            <div className={styles.heroImpact}>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>3개</div>
                <div className={styles.impactLabel}>핵심 질문</div>
              </div>
              <div className={styles.impactDivider}>×</div>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>즉시</div>
                <div className={styles.impactLabel}>한 번에 전송</div>
              </div>
              <div className={styles.impactDivider}>×</div>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>₩{formattedCurrentPrice}</div>
                <div className={styles.impactLabel}>합리적 가격</div>
              </div>
            </div>

            {/* 핵심 가치 제안 */}
            <div className={styles.heroValueProp}>
              <div className={styles.valueTitle}>
                <Zap size={24} />
                <span>크리티컬 히트가 딱 맞는 분</span>
              </div>
              <div className={styles.valueGrid}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>면접이 3일 이내</strong>
                    <span>급하게 준비가 필요한 분</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>서비스 체험 먼저</strong>
                    <span>그로스 플랜 전 경험해보고 싶은 분</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>핵심만 빠르게</strong>
                    <span>가장 중요한 질문 3개만 원하는 분</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className={styles.heroCtaSection}>
              <button className={styles.heroPrimaryButton} onClick={openPaymentModal}>
                <span>지금 바로 시작하기</span>
                <ArrowRight size={20} />
              </button>
              <div className={styles.heroCtaInfo}>
                <div className={styles.ctaInfoItem}>
                  <Shield size={16} />
                  <span>첫 질문 발송 전 100% 환불</span>
                </div>
                <div className={styles.ctaInfoItem}>
                  <Clock size={16} />
                  <span>48시간 이내 시작</span>
                </div>
              </div>
            </div>

            {/* 실제 수강생 후기 */}
            <div className={styles.heroReviewsSection}>
              <div className={styles.reviewsSectionHeader}>
                <h3 className={styles.reviewsSectionTitle}>실제 체험 후기</h3>
                <p className={styles.reviewsSectionSubtitle}>크리티컬 히트로 면접 준비한 분들의 이야기</p>
              </div>

              <div className={styles.reviewsGrid}>
                {/* 후기 1 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.11.25</span>
                  </div>
                  <p className={styles.reviewText}>
                    "면접이 3일 뒤였는데 뭘 준비해야 할지 막막했어요. 크리티컬 히트로
                    핵심 질문 3개만 집중적으로 준비했더니 실제 면접에서 2개가 나왔어요!
                    가성비 최고였습니다."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>J</div>
                    <div>
                      <div className={styles.reviewName}>정** 님</div>
                      <div className={styles.reviewRole}>프론트엔드 개발자 · 신입</div>
                    </div>
                  </div>
                </div>

                {/* 후기 2 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.11.20</span>
                  </div>
                  <p className={styles.reviewText}>
                    "그로스 플랜 구매 전에 서비스가 어떤지 경험해보고 싶었어요.
                    크리티컬 히트로 체험해보니 질문 퀄리티가 정말 좋아서 바로 그로스 플랜
                    결제했습니다. 체험판으로 딱이에요."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>S</div>
                    <div>
                      <div className={styles.reviewName}>송** 님</div>
                      <div className={styles.reviewRole}>백엔드 개발자 · 2년차</div>
                    </div>
                  </div>
                </div>

                {/* 후기 3 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.11.15</span>
                  </div>
                  <p className={styles.reviewText}>
                    "9,900원에 이 정도 퀄리티면 정말 괜찮아요. 한 번에 3개 질문을
                    받아서 바로 준비할 수 있었어요. 다만 시간 여유가 있으면
                    그로스 플랜이 더 좋을 것 같아요."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>H</div>
                    <div>
                      <div className={styles.reviewName}>한** 님</div>
                      <div className={styles.reviewRole}>풀스택 개발자 · 1년차</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 신뢰 배지 */}
            <div className={styles.heroTrustBadges}>
              <div className={styles.trustBadge}>
                <Users size={18} />
                <span>12명 수강</span>
              </div>
              <div className={styles.trustBadge}>
                <TrendingUp size={18} />
                <span>4.8 만족도</span>
              </div>
              <div className={styles.trustBadge}>
                <Clock size={18} />
                <span>48시간 내 시작</span>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Recommendation Section */}
        <section className={styles.planRecommendation}>
          <div className={styles.planRecommendationContainer}>
            <h2 className={styles.sectionTitle}>
              더 철저한 준비가 필요하다면?
            </h2>
            <p className={styles.sectionSubtitle}>
              시간이 있다면 그로스 플랜을 추천합니다
            </p>

            <div className={styles.planCardsGrid}>
              {/* 크리티컬 히트 카드 */}
              <div className={styles.planCard + ' ' + styles.recommended}>
                <div className={styles.planCardTopBar}></div>
                <div className={styles.planCardBadge}>현재 보고 있는 상품</div>
                <h3 className={styles.planCardTitle}>크리티컬 히트</h3>
                <ul className={styles.planCardList}>
                  <li>
                    <Check size={18} />
                    <span>면접이 <strong>3일 이내</strong>로 급한 분</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>먼저 경험</strong>해보고 싶은 분</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span>핵심 <strong>3개만</strong> 빠르게</span>
                  </li>
                </ul>
              </div>

              {/* 그로스 플랜 카드 */}
              <div className={styles.planCard}>
                <div className={styles.planCardTopBar + ' ' + styles.secondary}></div>
                <div className={styles.planCardBadge + ' ' + styles.secondary}>MOST POPULAR</div>
                <h3 className={styles.planCardTitle}>그로스 플랜</h3>
                <ul className={styles.planCardList}>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span>면접까지 <strong>1주일 이상</strong> 여유</span>
                  </li>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span><strong>모든 질문</strong> 빠짐없이 준비</span>
                  </li>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span>꼬리 질문까지 <strong>완벽 대비</strong></span>
                  </li>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span>이번 이직이 <strong>정말 중요</strong>한 분</span>
                  </li>
                </ul>
                <button
                  className={styles.growthPlanCtaButton}
                  onClick={() => router.push('/products/growth-plan')}
                >
                  <Star size={18} />
                  그로스 플랜 보러가기
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 추천 메시지 */}
            <div className={styles.planRecommendationMessage}>
              <p>
                <span className={styles.recommendQuestion}>시간이 있다면?</span>{' '}
                <strong className={styles.recommendPlan}>그로스 플랜</strong>을 추천드립니다.<br />
                <span className={styles.recommendSubtext}>20일간 20개 질문으로 완벽하게 준비하세요.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Product Detail Intro */}
        <section className={styles.productDetailIntro}>
          <div className={styles.detailIntroContent}>
            <span className={styles.detailIntroBadge}>상품 상세</span>
            <h2 className={styles.detailIntroTitle}>
              결제 즉시<br />
              <span className={styles.detailIntroHighlight}>무엇을 받게 되나요?</span>
            </h2>
            <p className={styles.detailIntroDesc}>
              크리티컬 히트에 포함된 모든 것을 확인하세요
            </p>
          </div>
        </section>

        {/* Product Info Section */}
        <section className={styles.productInfo}>
          <div className={styles.productContent}>
            {/* 상품 설명 이미지 */}
            <div className={styles.productImages}>
              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <Zap size={24} />
                  핵심 질문 3개 즉시 전송
                </h2>
                <p className={styles.imageCardDesc}>
                  결제 후 48시간 이내<br />
                  가장 중요한 질문 3개를 한 번에 발송합니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>이력서 기반 맞춤형 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>실제 면접 빈출 질문 위주</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Target size={20} />
                  <div>
                    <strong>핵심만 빠르게!</strong>
                    <span>가장 중요한 3개 질문으로 압축</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <BookOpen size={24} />
                  상세 해설 포함
                </h2>
                <p className={styles.imageCardDesc}>
                  각 질문별<br />
                  상세 해설과 모범 답변을 함께 제공합니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>면접관의 의도 파악</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>상황→행동→결과 답변 구조</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>핵심 키워드 정리</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Award size={20} />
                  <div>
                    <strong>그로스 플랜과 동일한 품질</strong>
                    <span>해설 퀄리티는 똑같이 제공</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <MessageSquare size={24} />
                  꼬리 질문 대비
                </h2>
                <p className={styles.imageCardDesc}>
                  각 질문별 예상 꼬리 질문과<br />
                  대응 전략을 함께 제공합니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>질문별 2-3개 예상 꼬리 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>꼬리 질문 대응 전략</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Lightbulb size={20} />
                  <div>
                    <strong>"왜요?" "어떻게요?"에도 준비 완료</strong>
                    <span>꼬리질문까지 미리 대비</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison - 크리티컬 히트 vs 그로스 플랜 */}
        <section className={styles.comparisonTable}>
          <h2 className={styles.sectionTitle}>
            크리티컬 히트 vs 그로스 플랜
          </h2>
          <p className={styles.sectionSubtitle}>
            상황에 맞는 플랜을 선택하세요
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th className={styles.highlighted}>크리티컬 히트</th>
                  <th>그로스 플랜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>가격</td>
                  <td className={styles.highlighted}><strong>₩{formattedCurrentPrice}</strong></td>
                  <td>₩{growthPlanPrice.formattedCurrentPrice}</td>
                </tr>
                <tr>
                  <td>기간</td>
                  <td className={styles.highlighted}><strong>1일</strong></td>
                  <td>20일</td>
                </tr>
                <tr>
                  <td>질문 개수</td>
                  <td className={styles.highlighted}><strong>3개</strong></td>
                  <td>20개</td>
                </tr>
                <tr>
                  <td>상세 해설</td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>꼬리 질문 대비</td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>이력서 분석</td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>추천 대상</td>
                  <td className={styles.highlighted}><strong>급한 면접, 체험</strong></td>
                  <td>철저한 준비</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>
            어떻게 작동하나요?
          </h2>
          <p className={styles.sectionSubtitle}>
            3단계로 시작하는 빠른 면접 준비
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <FileText size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>이력서 업로드</h3>
                <p className={styles.stepDescription}>
                  결제 후 이력서를 업로드하면 48시간 이내에
                  맞춤형 질문 설계가 시작됩니다.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <Bot size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>핵심 질문 선별</h3>
                <p className={styles.stepDescription}>
                  이력서 분석을 통해 면접에서 가장 높은 확률로
                  나올 3개 질문을 엄선합니다.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <Mail size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>한 번에 3개 전송</h3>
                <p className={styles.stepDescription}>
                  핵심 질문 3개와 상세 해설이 함께
                  이메일로 발송됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className={styles.guarantee}>
          <h2 className={styles.sectionTitle}>
            걱정 없이 시작하세요
          </h2>
          <p className={styles.sectionSubtitle}>
            QueryDaily가 책임집니다
          </p>

          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <Shield size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>100% 환불 보장</h3>
              <p className={styles.guaranteeDesc}>
                첫 질문 발송 전이라면 전액 환불해드립니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <CheckCircle2 size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>동일한 품질</h3>
              <p className={styles.guaranteeDesc}>
                그로스 플랜과 동일한 품질의 해설을 제공합니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <Clock size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>빠른 시작</h3>
              <p className={styles.guaranteeDesc}>
                결제 후 48시간 이내에 첫 질문이 발송됩니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <MessageSquare size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>빠른 고객 지원</h3>
              <p className={styles.guaranteeDesc}>
                카카오톡으로 1:1 실시간 상담이 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Urgency Section */}
        <section className={styles.urgency}>
          <div className={styles.urgencyHeader}>
            <div className={styles.urgencyBadge}>
              <Clock size={16} />
              <span>면접이 급하다면</span>
            </div>
            <h2 className={styles.urgencyMainTitle}>
              지금 시작하면 <span className={styles.urgencyHighlight}>내일 첫 질문</span>
            </h2>
            <p className={styles.urgencySubtitle}>
              1일이면 충분합니다. <strong>핵심만 준비하세요.</strong>
            </p>
          </div>

          <div className={styles.urgencyContent}>
            {/* 왼쪽: 타임라인 */}
            <div className={styles.urgencyTimeline}>
              <div className={styles.timelineItem + ' ' + styles.timelineNow}>
                <div className={styles.timelineDot}>
                  <div className={styles.timelinePulse}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>지금 시작하면</div>
                  <div className={styles.timelineTitle}>내일, 핵심 질문 3개 도착</div>
                  <div className={styles.timelineDesc}>
                    가장 중요한 질문으로 집중 준비
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>면접 전날 시작하면</div>
                  <div className={styles.timelineTitle}>급하게 질문만 확인</div>
                  <div className={styles.timelineDesc}>
                    답변 준비할 시간 부족
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem + ' ' + styles.timelineDanger}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>면접 당일 시작하면</div>
                  <div className={styles.timelineTitle}>준비 없이 면접장 입장</div>
                  <div className={styles.timelineDesc}>
                    "아... 어제라도 시작할 걸" 후회
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: CTA 카드 */}
            <div className={styles.urgencyCtaCard}>
              <div className={styles.urgencyCtaHeader}>
                <Zap size={24} />
                <span>오픈 특가 진행 중</span>
              </div>

              <div className={styles.urgencyPriceSection}>
                <div className={styles.urgencyPriceOriginal}>₩{formattedBasePrice}</div>
                <div className={styles.urgencyPriceCurrent}>₩{formattedCurrentPrice}</div>
                <div className={styles.urgencyDiscount}>{discountPercent}% 할인</div>
              </div>

              <div className={styles.urgencyBenefits}>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>한 번에 3개 핵심 질문</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>모범 답변 상세 해설</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>꼬리질문 대비</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Shield size={18} />
                  <span>첫 질문 전 100% 환불</span>
                </div>
              </div>

              <button className={styles.urgencyCtaButton} onClick={openPaymentModal}>
                지금 바로 시작하기
                <ArrowRight size={20} />
              </button>

              <div className={styles.urgencyCtaNote}>
                <Clock size={14} />
                <span>결제 후 48시간 이내 시작</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faq}>
          <h2 className={styles.sectionTitle}>
            자주 묻는 질문
          </h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 1 ? styles.active : ''}`}
                onClick={() => toggleFaq(1)}
              >
                <span>크리티컬 히트와 그로스 플랜의 차이가 뭔가요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 1 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 1 && (
                <div className={styles.faqAnswer}>
                  <p>
                    가장 큰 차이는 <strong>기간과 질문 개수</strong>입니다.
                    <br /><br />
                    크리티컬 히트는 한 번에 3개의 핵심 질문을, 그로스 플랜은 20일간 20개의 질문을 제공합니다.
                    <br /><br />
                    해설의 퀄리티는 동일합니다. 면접이 급하거나 서비스를 먼저 체험해보고 싶은 분은 크리티컬 히트를,
                    시간 여유가 있고 철저하게 준비하고 싶은 분은 그로스 플랜을 추천드립니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 2 ? styles.active : ''}`}
                onClick={() => toggleFaq(2)}
              >
                <span>3개 질문으로 충분한가요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 2 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 2 && (
                <div className={styles.faqAnswer}>
                  <p>
                    <strong>급한 면접이라면 충분합니다.</strong>
                    <br /><br />
                    크리티컬 히트는 이력서를 분석해서 면접에서 가장 높은 확률로 나올 핵심 질문 3개를 엄선합니다.
                    <br /><br />
                    하지만 시간이 있다면 그로스 플랜으로 20개 질문을 모두 준비하는 것을 추천드립니다.
                    더 완벽한 준비가 가능합니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 3 ? styles.active : ''}`}
                onClick={() => toggleFaq(3)}
              >
                <span>크리티컬 히트 후 그로스 플랜으로 업그레이드 가능한가요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 3 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 3 && (
                <div className={styles.faqAnswer}>
                  <p>
                    네, 가능합니다!
                    <br /><br />
                    크리티컬 히트를 완료하신 후 그로스 플랜을 구매하시면 됩니다.
                    그로스 플랜에서는 크리티컬 히트에서 받지 못한 새로운 질문들을 받게 됩니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 4 ? styles.active : ''}`}
                onClick={() => toggleFaq(4)}
              >
                <span>언제 첫 질문을 받을 수 있나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 4 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 4 && (
                <div className={styles.faqAnswer}>
                  <p>
                    결제 및 이력서 업로드 완료 후 <strong>48시간 이내</strong>에 첫 질문이 발송됩니다.
                    <br /><br />
                    급한 면접 준비에 맞춰 최대한 빠르게 시작할 수 있도록 도와드립니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ 하단 카카오톡 문의 */}
          <div className={styles.faqKakao}>
            <p className={styles.faqKakaoText}>더 궁금한 점이 있으신가요?</p>
            <p className={styles.faqKakaoSub}>카카오톡으로 편하게 물어보세요.</p>
            <a href="https://pf.kakao.com/_hWMtn" target="_blank" rel="noopener noreferrer" className={styles.kakaoButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.18.483.378.352.156-.103 2.5-1.667 3.508-2.343.538.073 1.093.112 1.624.112 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z" />
              </svg>
              카카오톡 문의하기
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              면접까지 시간이 없다면
            </h2>
            <p className={styles.finalCtaSubtitle} style={{
              fontSize: '1.1rem',
              lineHeight: '1.9',
              maxWidth: '600px',
              margin: '0 auto',
              opacity: 0.9
            }}>
              1일이면 충분합니다.<br />
              핵심만 빠르게 준비하세요.<br /><br />

              <strong style={{ color: 'var(--color-accent)' }}>
                ₩{formattedCurrentPrice}으로 시작하는 면접 준비
              </strong>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="https://velog.io/@querydaily/posts" target="_blank" rel="noopener noreferrer">Velog</a>
            <a href="https://www.threads.com/@querydaily.official" target="_blank" rel="noopener noreferrer">Threads</a>
          </div>
          <p>© 2025 QueryDaily. All rights reserved.</p>
          <p className={styles.footerBiz}>사업자등록번호: 456-12-02771 | 대표: 최보임</p>
        </footer>
      </div>

      {/* Sticky Free Trial Bar */}
      <div className={styles.stickyFreeTrialBar}>
        <div className={styles.freeTrialBarContent}>
          <div className={styles.freeTrialBarText}>
            <Gift size={18} />
            <span>가격이 부담된다면? <strong>무료로 먼저 체험해보세요</strong></span>
          </div>
          <button
            className={styles.freeTrialBarButton}
            onClick={() => setShowFreeTrialModal(true)}
          >
            무료 체험 신청하기
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Free Trial Modal */}
      {showFreeTrialModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFreeTrialModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowFreeTrialModal(false)}>
              ×
            </button>
            <h2 className={styles.modalTitle}>무료 체험 신청</h2>
            <p className={styles.modalDesc}>
              이력서를 업로드하면 48시간 내에 질문 1개 + 답변을 무료로 받아보실 수 있습니다.
            </p>

            <form className={styles.freeTrialForm} onSubmit={async (e) => {
              e.preventDefault();

              if (!freeTrialEmail.trim() || !freeTrialName.trim() || !resumeFile || !freeTrialRole || !freeTrialExperience) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
              }

              setIsSubmittingFreeTrial(true);
              try {
                // v7과 동일한 방식으로 Lead API 호출
                const mapExperienceToCareerLevel = (experience: string): string => {
                  switch (experience) {
                    case 'new':
                    case '1-3':
                      return 'JUNIOR';
                    case '3-5':
                      return 'MIDDLE';
                    case '5+':
                      return 'SENIOR';
                    default:
                      return 'JUNIOR';
                  }
                };

                const mapRoleToTechStack = (role: string): string[] => {
                  switch (role) {
                    case 'backend':
                      return ['Backend', 'Java', 'Spring'];
                    case 'frontend':
                      return ['Frontend', 'React', 'JavaScript'];
                    case 'fullstack':
                      return ['Backend', 'Frontend'];
                    case 'devops':
                      return ['DevOps', 'AWS', 'Docker'];
                    default:
                      return ['Development'];
                  }
                };

                const leadData = {
                  email: freeTrialEmail,
                  name: freeTrialName,
                  profile: {
                    careerLevel: mapExperienceToCareerLevel(freeTrialExperience),
                    techStack: mapRoleToTechStack(freeTrialRole),
                    timezone: 'Asia/Seoul',
                    worry: freeTrialWorry || null
                  }
                };

                // FormData로 multipart/form-data 전송
                const formDataToSend = new FormData();
                formDataToSend.append('lead', new Blob([JSON.stringify(leadData)], { type: 'application/json' }));
                formDataToSend.append('resume', resumeFile);

                const response = await fetch(`${API_BASE_URL}/api/query-daily/leads`, {
                  method: 'POST',
                  body: formDataToSend,
                });

                const data = await response.json();

                if (data.success) {
                  alert('무료 체험 신청이 완료되었습니다!\n48시간 내에 이메일로 질문이 발송됩니다.');
                  setShowFreeTrialModal(false);
                  // Reset form
                  setFreeTrialEmail('');
                  setFreeTrialName('');
                  setFreeTrialRole('');
                  setFreeTrialExperience('');
                  setFreeTrialWorry('');
                  setResumeFile(null);
                } else {
                  let errorMessage = '신청 처리 중 오류가 발생했습니다.';
                  if (data.errorCode === 'TRIAL_ALREADY_USED') {
                    errorMessage = '이미 등록된 이메일입니다. 다른 이메일로 시도해주세요.';
                  } else if (data.message) {
                    errorMessage = data.message;
                  }
                  alert(errorMessage);
                }
              } catch (error) {
                console.error('Error submitting free trial:', error);
                alert('신청 처리 중 오류가 발생했습니다.');
              } finally {
                setIsSubmittingFreeTrial(false);
              }
            }}>
              <div className={styles.formGroup}>
                <label>이메일 *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={freeTrialEmail}
                  onChange={(e) => setFreeTrialEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>이름 *</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  required
                  value={freeTrialName}
                  onChange={(e) => setFreeTrialName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>이력서 (PDF) *</label>
                <div className={styles.fileUploadArea}>
                  <input
                    type="file"
                    accept=".pdf"
                    id="resumeUpload"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          alert('파일 크기는 10MB 이하여야 합니다.');
                          return;
                        }
                        setResumeFile(file);
                      }
                    }}
                    required
                  />
                  <label htmlFor="resumeUpload" className={styles.fileUploadBox}>
                    {resumeFile ? (
                      <>
                        <span className={styles.uploadedIcon}>✓</span>
                        <span className={styles.uploadedFileName}>{resumeFile.name}</span>
                        <span className={styles.uploadedSize}>
                          ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.uploadIcon}>📄</span>
                        <span className={styles.uploadText}>클릭하여 이력서 업로드</span>
                        <span className={styles.uploadHint}>PDF 파일, 최대 10MB</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>희망 직무 *</label>
                <select
                  required
                  value={freeTrialRole}
                  onChange={(e) => setFreeTrialRole(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="backend">백엔드 개발자</option>
                  <option value="frontend">프론트엔드 개발자</option>
                  <option value="fullstack">풀스택 개발자</option>
                  <option value="devops">DevOps 엔지니어</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>경력 *</label>
                <select
                  required
                  value={freeTrialExperience}
                  onChange={(e) => setFreeTrialExperience(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="new">신입</option>
                  <option value="1-3">1-3년</option>
                  <option value="3-5">3-5년</option>
                  <option value="5+">5년 이상</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>면접 관련 고민 (선택)</label>
                <textarea
                  placeholder="면접 준비하면서 특별히 걱정되는 부분이 있으시면 알려주세요."
                  rows={3}
                  value={freeTrialWorry}
                  onChange={(e) => setFreeTrialWorry(e.target.value)}
                />
              </div>

              <button type="submit" className={styles.formSubmit} disabled={isSubmittingFreeTrial}>
                {isSubmittingFreeTrial ? '신청 중...' : '무료 체험 신청하기'}
              </button>
              <p className={styles.formNote}>
                신청 후 48시간 내에 이메일로 질문이 발송됩니다
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
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
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`${styles.modalProgressDot} ${purchaseModalStep >= step ? styles.modalProgressDotActive : ''}`}
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
                    핵심 질문 3개 생성을 위해 필요합니다
                  </p>

                  <div className={styles.selectedProductInfo}>
                    <span className={styles.modalProductBadge}>크리티컬 히트</span>
                    <span className={styles.modalProductPrice}>₩{formattedCurrentPrice}</span>
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
                      <span>크리티컬 히트</span>
                    </div>
                    <div className={styles.modalOrderItem}>
                      <span>가격</span>
                      <span>₩{formattedCurrentPrice}</span>
                    </div>
                    <div className={`${styles.modalOrderItem} ${styles.modalOrderTotal}`}>
                      <span>결제 금액</span>
                      <span className={styles.totalPrice}>₩{formattedCurrentPrice}</span>
                    </div>
                  </div>

                  <div className={styles.modalHighlight}>
                    <p>
                      <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Check" width="16" height="16" className={styles.checkIcon} />
                      무통장입금으로 안전한 결제
                    </p>
                    <p>
                      <img src="https://img.icons8.com/?id=11695&format=png&size=48" alt="Check" width="16" height="16" className={styles.checkIcon} />
                      입금 확인 후 48시간 내 발송
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
                          const response = await submitBetaApplication({
                            email: purchaseEmail,
                            name: purchaseName,
                            phone: purchasePhone,
                            productType: 'CRITICAL_HIT',
                            resume: purchaseFile
                          });

                          if (response.success && response.data?.memberId) {
                            const orderData = {
                              memberId: response.data?.memberId,
                              name: purchaseName,
                              email: purchaseEmail,
                              phone: purchasePhone,
                              product: 'critical-hit',
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

export default function CriticalHit() {
  return <CriticalHitContent />;
}