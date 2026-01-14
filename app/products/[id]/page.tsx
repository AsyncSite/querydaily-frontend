'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '../data';
import styles from './page.module.css';
import { submitBetaApplication, createOrder } from '@/lib/api';
import { useSafeProductPrice } from '@/hooks/useProductPrices';
import {
  FileText,
  Bot,
  CheckCircle2,
  Mail,
  Inbox,
  Link2,
  Rocket,
  Target,
  Calendar,
  Building2,
  BookOpen,
  Lightbulb,
  Zap,
  Star,
  AlertCircle,
  MessageSquare,
  Users,
  Video,
  GraduationCap,
  Sparkles,
  BarChart3
} from 'lucide-react';

// 이모지를 아이콘으로 매핑하는 함수
const getIconComponent = (emoji: string, size: number = 20) => {
  const iconMap: { [key: string]: JSX.Element } = {
    '📅': <Calendar size={size} />,
    '🏢': <Building2 size={size} />,
    '📚': <BookOpen size={size} />,
    '💡': <Lightbulb size={size} />,
    '🎯': <Target size={size} />,
    '⭐': <Star size={size} />,
    '⚡': <Zap size={size} />,
    '🚨': <AlertCircle size={size} />,
    '🗣️': <MessageSquare size={size} />,
    '👥': <Users size={size} />,
    '📹': <Video size={size} />,
    '💬': <MessageSquare size={size} />,
    '🎓': <GraduationCap size={size} />,
    '📄': <FileText size={size} />,
    '✨': <Sparkles size={size} />,
    '📊': <BarChart3 size={size} />,
  };

  return iconMap[emoji] || <span>{emoji}</span>;
};

// 전화번호 유효성 검사 함수
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  // Purchase modal states
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseModalStep, setPurchaseModalStep] = useState(1);
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<string | null>(null);
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [purchaseName, setPurchaseName] = useState('');
  const [purchasePhone, setPurchasePhone] = useState('');
  const [purchaseEmail, setPurchaseEmail] = useState('');
  const [purchaseEmailError, setPurchaseEmailError] = useState('');
  const [purchaseNameError, setPurchaseNameError] = useState('');
  const [purchasePhoneError, setPurchasePhoneError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const product = products.find(p => p.id === productId);

  // 상품 코드 매핑
  const productCodeMap: Record<string, string> = {
    'critical-hit': 'CRITICAL_HIT',
    'growth-plan': 'GROWTH_PLAN'
  };
  const productCode = productCodeMap[productId] || '';
  const { currentPrice, formattedCurrentPrice } = useSafeProductPrice(productCode);

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

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>상품을 찾을 수 없습니다</h1>
          <button onClick={() => router.push('/')} className={styles.backBtn}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Fixed CTA - 항상 보이는 CTA */}
      <div className={styles.fixedCta}>
        <div className={styles.fixedCtaContainer}>
          <div className={styles.fixedCtaText}>
            <div className={styles.fixedCtaTitle}>{product.name}</div>
            <div className={styles.fixedCtaPrice}>
              {product.priceOriginal && (
                <span className={styles.fixedPriceOriginal}>₩{product.priceOriginal.toLocaleString()}</span>
              )}
              <span className={styles.fixedPriceCurrent}>₩{formattedCurrentPrice}</span>
            </div>
          </div>
          <button
            className={styles.fixedCtaButton}
            disabled={!product.available}
            onClick={() => {
              setSelectedPurchaseProduct(productId);
              setPurchaseModalOpen(true);
              setPurchaseModalStep(1);
            }}
          >
            {product.available ? '합격 준비하기' : '준비 중'}
          </button>
        </div>
      </div>

    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo} onClick={() => router.push('/')}>
            <span className={styles.logoText}>
              Query<span className={styles.logoAccent}>Daily</span>
            </span>
          </div>
          <button onClick={() => router.push('/')} className={styles.backBtn}>
            ← 돌아가기
          </button>
        </div>
      </header>

      {/* Product Hero */}
      <section className={styles.productHero}>
        <div className={styles.productHeroContainer}>
          <div className={styles.heroContent}>
            {product.badge && (
              <div className={styles.badge}>{product.badge}</div>
            )}

            <h1 className={styles.heroTitle}>
              {productId === 'growth-plan' && '면접 준비, 이제 매일 10분이면 충분합니다'}
              {productId === 'critical-hit' && '핵심 3가지만 준비하세요'}
            </h1>

            <p className={styles.heroSubtitle}>
              {productId === 'growth-plan' && '20일간 당신의 이력서 맞춤형 질문과 모범 답변이 매일 아침 7시, 저녁 5시에 도착합니다'}
              {productId === 'critical-hit' && '당신의 이력서에서 면접관이 가장 파고들 법한 핵심 질문 3개와 프리미엄 답변 가이드'}
            </p>

            <div className={styles.heroPrice}>
              {product.priceOriginal && (
                <span className={styles.priceOriginal}>₩{product.priceOriginal.toLocaleString()}</span>
              )}
              <span className={styles.priceCurrent}>₩{formattedCurrentPrice}</span>
            </div>

            <button
              className={styles.purchaseBtn}
              disabled={!product.available}
              onClick={() => {
                setSelectedPurchaseProduct(productId);
                setPurchaseModalOpen(true);
                setPurchaseModalStep(1);
              }}
            >
              {product.available ? '합격 준비하기' : '준비 중'}
            </button>

            <p className={styles.refundPolicy}>
              {product.refund}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.sectionTitle}>이런 점이 좋아요</h2>
          <div className={styles.featuresGrid}>
            {product.features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <span className={styles.featureIcon}>{getIconComponent(feature.icon, 48)}</span>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Growth Plan */}
      {productId === 'growth-plan' && (
        <section className={styles.howItWorks}>
          <div className={styles.howItWorksContainer}>
            <h2 className={styles.sectionTitle}>어떻게 제공되나요?</h2>
            <p className={styles.howItWorksIntro}>
              매일 아침 7시와 저녁 5시, 당신의 이메일로 맞춤형 면접 질문이 자동으로 전송됩니다.
            </p>

            <div className={styles.workflowSteps}>
              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <FileText size={20} className={styles.stepIcon} /> 이력서 분석
                  </h3>
                  <p className={styles.stepDescription}>
                    결제 후 업로드한 이력서를 분석합니다.<br/>
                    기술 스택, 프로젝트 경험, 경력 수준을 파악하여 당신만의 프로필을 생성합니다.
                  </p>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <Bot size={20} className={styles.stepIcon} /> 질문 생성
                  </h3>
                  <p className={styles.stepDescription}>
                    당신의 이력서를 분석하여 맞춤형 질문을 생성합니다.<br/>
                    실제 면접에서 나올 법한 시나리오 기반 질문과 예상 꼬리질문까지 포함됩니다.
                  </p>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <CheckCircle2 size={20} className={styles.stepIcon} /> 품질 검증
                  </h3>
                  <p className={styles.stepDescription}>
                    생성된 질문은 5가지 기준으로 품질 검증을 거칩니다.<br/>
                    기술 정확성, 통찰력, 공정성, 실무 관련성, 독창성을 모두 확인합니다.
                  </p>
                  <div className={styles.qualityBadges}>
                    <span className={styles.qualityBadge}>기술 정확성 30%</span>
                    <span className={styles.qualityBadge}>통찰력 25%</span>
                    <span className={styles.qualityBadge}>공정성 20%</span>
                    <span className={styles.qualityBadge}>실무 관련성 15%</span>
                    <span className={styles.qualityBadge}>독창성 10%</span>
                  </div>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <Mail size={20} className={styles.stepIcon} /> 매일 자동 발송
                  </h3>
                  <p className={styles.stepDescription}>
                    매일 오전 7시와 저녁 5시, 검증된 질문이 이메일로 발송됩니다.<br/>
                    질문과 함께 모범 답안, 답변 가이드, 평가 기준까지 제공됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 질문 이메일 예시 */}
            <div className={styles.exampleEmail}>
              <h3 className={styles.exampleTitle}>
                <Inbox size={24} className={styles.exampleIcon} /> 질문 이메일 예시
              </h3>
              <div className={styles.emailPreview}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailSubject}>
                    <strong>제목:</strong> [QueryDaily] 오늘의 면접 질문 #14
                  </div>
                  <div className={styles.emailTime}>예: 오늘 오전 7:00</div>
                </div>
                <div className={styles.emailBody}>
                  <p><strong># 14. 오늘의 질문</strong></p>
                  <p className={styles.questionText}>
                    이력서의 검색 시스템 개선 프로젝트에서 "복잡한 계층 쿼리를 Materialized View로 최적화"하여
                    "응답 시간 60초 → 0.5초로 단축 (성능 개선율 99%)"을 달성하셨다는 점이 매우 인상적입니다.
                    특히 계층적 데이터 조회에서 발생하는 성능 병목을 근본적으로 해결하신 경험이 돋보입니다.
                  </p>
                  <p className={styles.questionText}>
                    먼저, 계층 구조 조회에서 재귀 쿼리(Recursive Query)가 필요했던 이유가 궁금합니다.
                    트리 구조 데이터를 조회할 때 일반적인 JOIN 방식으로는 어떤 한계가 있었나요?
                    PostgreSQL의 Recursive CTE를 사용하셨다면, WITH RECURSIVE 구문을 어떻게 구성하셨는지 설명해주세요.
                  </p>
                  <p className={styles.questionText}>
                    그리고 재귀 쿼리만으로는 응답 시간이 60초나 걸렸다고 하셨는데, 이렇게 느렸던 근본 원인이 무엇이었나요?
                    EXPLAIN ANALYZE를 통해 실행 계획을 분석하셨을 때, 어떤 지표가 가장 큰 병목이었나요?
                    Sequential Scan, Nested Loop, 혹은 다른 요인이었나요?
                  </p>
                  <p className={styles.questionText}>
                    마지막으로, Materialized View를 도입하여 성능을 극적으로 개선하셨다고 하셨는데,
                    구체적으로 어떻게 설계하셨는지 궁금합니다.
                    Materialized View는 데이터 신선도(Freshness) 문제가 있을 수 있는데,
                    원본 데이터가 변경될 때 어떻게 대응하셨나요? REFRESH 전략은 어떻게 수립하셨나요?
                  </p>
                </div>
              </div>
            </div>

            {/* 답변 가이드 이메일 예시 */}
            <div className={styles.exampleEmail}>
              <h3 className={styles.exampleTitle}>
                <Inbox size={24} className={styles.exampleIcon} /> 답변 가이드 이메일 예시
              </h3>
              <div className={styles.emailPreview}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailSubject}>
                    <strong>제목:</strong> [QueryDaily] 오늘의 답변 가이드 #14
                  </div>
                  <div className={styles.emailTime}>예: 오늘 오후 5:00</div>
                </div>
                <div className={styles.emailBody}>
                  <p><strong>1. 질문 해부: 면접관의 머릿속 엿보기</strong></p>
                  <p className={styles.sectionContent}>
                    <strong>질문 유형:</strong> 경험 연결형(<Link2 size={14} style={{display: 'inline', verticalAlign: 'middle'}} />) + 한계 돌파형(<Rocket size={14} style={{display: 'inline', verticalAlign: 'middle'}} />)
                    <br/><br/>
                    <strong>핵심 의도 분석:</strong> 이 질문은 지원자가 계층적 데이터를 다루는 고급 데이터베이스 설계 역량과
                    성능 최적화 경험을 종합적으로 평가합니다. 특히 재귀 쿼리의 동작 원리와 성능 병목 지점을 정확히 이해하고 있는지,
                    Materialized View의 개념과 실무적인 활용 방법을 알고 있는지, 그리고 데이터 신선도와 성능 사이의 트레이드오프를
                    어떻게 관리했는지를 확인하고자 합니다.
                  </p>

                  <p><strong>2. 답변 설계: 합격하는 답변의 뼈대</strong></p>
                  <div className={styles.keywordsList}>
                    <span className={styles.keyword}>Recursive CTE (WITH RECURSIVE)</span>
                    <span className={styles.keyword}>Materialized View</span>
                    <span className={styles.keyword}>Index on Materialized View</span>
                    <span className={styles.keyword}>EXPLAIN ANALYZE</span>
                    <span className={styles.keyword}>Sequential Scan vs Index Scan</span>
                    <span className={styles.keyword}>REFRESH MATERIALIZED VIEW</span>
                  </div>

                  <p><strong>3. 논리 구조화: STAR 기법</strong></p>
                  <p className={styles.sectionContent}>
                    <strong>S:</strong> 검색 시스템에서 계층적 데이터는 깊은 트리 구조를 가지고 있었습니다.
                    각 노드가 수백 개의 하위 노드를 포함하고 있어, 전체 계층 구조를 한 번에 조회하는 것이 매우 복잡했습니다.
                    초기에는 재귀 쿼리를 사용했지만, 응답 시간이 60초 이상 걸려 실시간 검색이 불가능한 상태였습니다.
                    <br/><br/>
                    <strong>T:</strong> 계층 조회 API의 응답 속도를 실시간 수준(1초 이하)으로 개선하면서도,
                    데이터 구조가 변경될 때 정합성을 유지하는 것이 목표였습니다.
                    <br/><br/>
                    <strong>A:</strong> 재귀 쿼리가 느렸던 근본 원인은 각 재귀 단계마다 테이블을 반복 스캔해야 한다는 점이었습니다.
                    EXPLAIN ANALYZE로 분석했을 때 Sequential Scan이 가장 큰 문제였습니다. 이를 해결하기 위해 재귀 쿼리 결과를
                    Materialized View로 미리 계산하여 저장하고, 주요 컬럼에 인덱스를 생성했습니다.
                    데이터 신선도 문제는 야간 배치와 REFRESH MATERIALIZED VIEW CONCURRENTLY로 해결했습니다.
                    <br/><br/>
                    <strong>R:</strong> 계층 조회 API 응답 시간 60초 → 0.5초로 단축 (99% 성능 개선, 120배 향상).
                    Sequential Scan 제거 및 Index Scan으로 전환하여 Execution Time 99% 감소.
                  </p>

                  <p><strong>4. 모범 사례: Persona A (대규모 트래픽 설계자)</strong></p>
                  <p className={styles.personaAnswer}>
                    "계층 조회에서 재귀 쿼리가 느렸던 근본 원인은 각 재귀 단계마다 테이블을 반복적으로 스캔해야 한다는 점이었습니다.
                    PostgreSQL의 Recursive CTE는 WITH RECURSIVE 구문을 사용하여 Anchor Query(최상위 노드)와 Recursive Query(하위 노드)를
                    UNION ALL로 결합하는 방식입니다. 하지만 데이터는 5~10단계의 깊은 계층을 가지므로, 재귀가 10번 실행되면 테이블이 10번 스캔되고,
                    Nested Loop Join이 반복되어 Execution Time이 60초 이상 걸렸습니다. EXPLAIN ANALYZE로 실행 계획을 분석했을 때,
                    가장 큰 문제는 Sequential Scan이었습니다. 이를 해결하기 위해 Materialized View를 설계했고, 인덱스를 최적화했습니다..."
                  </p>

                  <p><strong>5. 심화 학습: 예상 꼬리 질문</strong></p>
                  <ul className={styles.followUpList}>
                    <li>Materialized View는 REFRESH 명령으로 갱신해야 하므로, 원본 데이터와 Materialized View 사이에 데이터 불일치가 발생할 수 있습니다.
                    이러한 데이터 신선도 문제를 어떻게 모니터링하고 대응하셨나요?</li>
                    <li>REFRESH MATERIALIZED VIEW CONCURRENTLY 옵션을 사용하면 잠금 없이 갱신할 수 있지만,
                    UNIQUE 인덱스가 필요합니다. UNIQUE 인덱스를 생성할 수 없는 경우는 어떻게 대응하시겠습니까?</li>
                    <li>계층 데이터가 실시간으로 자주 변경되는 환경이라면 Materialized View는 적합하지 않을 수 있습니다.
                    이 경우 Closure Table 패턴, Nested Set Model 등의 대안을 고려해보셨나요?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works - Critical Hit */}
      {productId === 'critical-hit' && (
        <section className={styles.howItWorks}>
          <div className={styles.howItWorksContainer}>
            <h2 className={styles.sectionTitle}>어떻게 제공되나요?</h2>
            <p className={styles.howItWorksIntro}>
              3개의 핵심 질문과 각각의 프리미엄 답변 가이드를 이메일로 제공합니다.
            </p>

            <div className={styles.workflowSteps}>
              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <FileText size={20} className={styles.stepIcon} /> 이력서 분석
                  </h3>
                  <p className={styles.stepDescription}>
                    업로드한 이력서를 분석합니다.<br/>
                    기술 스택, 프로젝트 경험, 경력 수준을 파악하여 가장 중요한 3가지 포인트를 선정합니다.
                  </p>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <Target size={20} className={styles.stepIcon} /> 핵심 질문 3개 생성
                  </h3>
                  <p className={styles.stepDescription}>
                    당신의 이력서에서 면접관이 가장 파고들 법한 3가지 핵심 포인트를 선정합니다.<br/>
                    각 질문은 실제 면접에서 나올 법한 시나리오 기반으로 제작됩니다.
                  </p>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <CheckCircle2 size={20} className={styles.stepIcon} /> 프리미엄 답변 가이드 제공
                  </h3>
                  <p className={styles.stepDescription}>
                    각 질문마다 5대 구성 요소(질문 해부, 답변 설계, STAR 구조화, 모범 사례, 예상 꼬리 질문)가 포함된 프리미엄 답변 가이드를 제공합니다.
                  </p>
                </div>
              </div>

              <div className={styles.workflowStep}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    <Mail size={20} className={styles.stepIcon} /> 이메일 발송
                  </h3>
                  <p className={styles.stepDescription}>
                    3개의 질문과 답변 가이드가 모두 이메일로 발송됩니다.<br/>
                    24시간 내에 받아보실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 질문 이메일 예시 */}
            <div className={styles.exampleEmail}>
              <h3 className={styles.exampleTitle}>
                <Inbox size={24} className={styles.exampleIcon} /> 질문 이메일 예시
              </h3>
              <div className={styles.emailPreview}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailSubject}>
                    <strong>제목:</strong> [QueryDaily] 크리티컬 히트 - 핵심 질문 #1
                  </div>
                  <div className={styles.emailTime}>24시간 내 발송</div>
                </div>
                <div className={styles.emailBody}>
                  <p><strong># 1. 핵심 질문</strong></p>
                  <p className={styles.questionText}>
                    이력서의 검색 시스템 개선 프로젝트에서 "복잡한 계층 쿼리를 Materialized View로 최적화"하여
                    "응답 시간 60초 → 0.5초로 단축 (성능 개선율 99%)"을 달성하셨다는 점이 매우 인상적입니다.
                  </p>
                  <p className={styles.questionText}>
                    먼저, 계층 구조 조회에서 재귀 쿼리가 필요했던 이유가 궁금합니다.
                    트리 구조 데이터를 조회할 때 PostgreSQL의 Recursive CTE를 어떻게 작성하셨나요?
                  </p>
                  <p className={styles.questionText}>
                    그리고 재귀 쿼리만으로는 응답 시간이 60초나 걸렸다고 하셨는데, 이렇게 느렸던 근본 원인이 무엇이었나요?
                    EXPLAIN ANALYZE로 실행 계획을 분석하셨을 때, 어떤 지표가 가장 문제였나요?
                  </p>
                  <p className={styles.questionText}>
                    마지막으로, Materialized View를 도입하여 성능을 극적으로 개선하셨다고 하셨는데,
                    구체적으로 어떻게 설계하셨는지 궁금합니다.
                    Materialized View의 신선도(Freshness) 문제를 어떻게 해결하셨나요?
                  </p>
                </div>
              </div>
            </div>

            {/* 답변 가이드 이메일 예시 */}
            <div className={styles.exampleEmail}>
              <h3 className={styles.exampleTitle}>
                <Inbox size={24} className={styles.exampleIcon} /> 답변 가이드 이메일 예시
              </h3>
              <div className={styles.emailPreview}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailSubject}>
                    <strong>제목:</strong> [QueryDaily] 크리티컬 히트 - 답변 가이드 #1
                  </div>
                  <div className={styles.emailTime}>질문과 함께 발송</div>
                </div>
                <div className={styles.emailBody}>
                  <p><strong>1. 질문 해부: 면접관의 머릿속 엿보기</strong></p>
                  <p className={styles.sectionContent}>
                    <strong>질문 유형:</strong> 경험 연결형(<Link2 size={14} style={{display: 'inline', verticalAlign: 'middle'}} />) + 한계 돌파형(<Rocket size={14} style={{display: 'inline', verticalAlign: 'middle'}} />)
                    <br/><br/>
                    <strong>핵심 의도 분석:</strong> 이 질문은 지원자가 계층적 데이터를 다루는 고급 데이터베이스 설계 역량과
                    성능 최적화 경험을 종합적으로 평가합니다. 응답 시간을 60초에서 0.5초로 120배 개선한 구체적인 기술적 접근 방식과
                    문제 해결 과정을 설명할 수 있는지가 핵심입니다.
                  </p>

                  <p><strong>2. 답변 설계: 합격하는 답변의 뼈대</strong></p>
                  <div className={styles.keywordsList}>
                    <span className={styles.keyword}>Recursive CTE</span>
                    <span className={styles.keyword}>Materialized View</span>
                    <span className={styles.keyword}>Index on Materialized View</span>
                    <span className={styles.keyword}>EXPLAIN ANALYZE</span>
                    <span className={styles.keyword}>Sequential Scan</span>
                    <span className={styles.keyword}>REFRESH CONCURRENTLY</span>
                  </div>

                  <p><strong>3. 논리 구조화: STAR 기법</strong></p>
                  <p className={styles.sectionContent}>
                    <strong>S:</strong> 검색 시스템에서 계층 데이터는 깊은 트리 구조를 가지고 있었습니다.
                    초기에는 재귀 쿼리를 사용했지만, 응답 시간이 60초 이상 걸려 실시간 검색이 불가능한 상태였습니다.
                    <br/><br/>
                    <strong>T:</strong> 계층 조회 API의 응답 속도를 실시간 수준(1초 이하)으로 개선하는 것이 목표였습니다.
                    <br/><br/>
                    <strong>A:</strong> 재귀 쿼리가 느렸던 근본 원인은 각 재귀 단계마다 테이블을 반복 스캔해야 한다는 점이었습니다.
                    EXPLAIN ANALYZE로 분석했을 때 Sequential Scan이 가장 큰 문제였습니다.
                    이를 해결하기 위해 재귀 쿼리 결과를 Materialized View로 저장하고 인덱스를 생성했습니다.
                    <br/><br/>
                    <strong>R:</strong> 응답 시간 60초 → 0.5초로 단축 (99% 성능 개선, 120배 향상).
                    Sequential Scan 제거 및 Index Scan으로 전환하여 Execution Time 99% 감소.
                  </p>

                  <p><strong>4. 모범 사례: Persona A (대규모 트래픽 설계자)</strong></p>
                  <p className={styles.personaAnswer}>
                    "계층 조회에서 재귀 쿼리가 느렸던 근본 원인은 각 재귀 단계마다 테이블을 반복적으로 스캔해야 한다는 점이었습니다.
                    PostgreSQL의 Recursive CTE는 WITH RECURSIVE 구문을 사용하여 Anchor Query와 Recursive Query를 UNION ALL로 결합하는 방식입니다.
                    하지만 데이터는 5~10단계의 깊은 계층을 가지므로, Nested Loop Join이 반복되어 Execution Time이 60초 이상 걸렸습니다.
                    이를 해결하기 위해 Materialized View를 설계했고, 인덱스를 최적화했습니다..."
                  </p>

                  <p><strong>5. 심화 학습: 예상 꼬리 질문</strong></p>
                  <ul className={styles.followUpList}>
                    <li>Materialized View의 데이터 신선도 문제를 어떻게 모니터링하고 대응하셨나요?</li>
                    <li>REFRESH MATERIALIZED VIEW CONCURRENTLY를 사용하려면 UNIQUE 인덱스가 필요한데, 이를 생성할 수 없는 경우는 어떻게 대응하시겠습니까?</li>
                    <li>계층 데이터가 실시간으로 자주 변경된다면 Closure Table 패턴, Nested Set Model 등을 고려해보셨나요?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Curriculum */}
      {product.curriculum && product.curriculum.length > 0 && (
        <section className={styles.curriculum}>
          <div className={styles.curriculumContainer}>
            <h2 className={styles.sectionTitle}>커리큘럼</h2>
            <ul className={styles.curriculumList}>
              {product.curriculum.map((item, idx) => (
                <li key={idx} className={styles.curriculumItem}>
                  <span className={styles.curriculumNumber}>{idx + 1}</span>
                  <span className={styles.curriculumText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Detailed Description */}
      {product.detailedDescription && (
        <section className={styles.detailedDescription}>
          <div className={styles.descriptionContainer}>
            <div className={styles.markdown}>
              {product.detailedDescription.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h2 key={idx}>{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={idx}>{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx}>{line.replace('- ', '')}</li>;
                } else if (line.includes('**')) {
                  const parts = line.split('**');
                  return (
                    <p key={idx}>
                      {parts.map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  );
                } else if (line.trim() === '') {
                  return <br key={idx} />;
                } else {
                  return <p key={idx}>{line}</p>;
                }
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.footerCtaContainer}>
          <h2>합격할 스토리는 있습니다</h2>
          <p>{product.name}으로 준비만 하세요</p>
          <button
            className={styles.purchaseBtn}
            disabled={!product.available}
            onClick={() => {
              setSelectedPurchaseProduct(productId);
              setPurchaseModalOpen(true);
              setPurchaseModalStep(1);
            }}
          >
            {product.available ? '합격 준비하기' : '준비 중'}
          </button>
        </div>
      </section>
    </div>

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
                      ₩{formattedCurrentPrice}
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
