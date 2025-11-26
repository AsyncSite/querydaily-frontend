'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { ThemeProvider, ThemeSelector, useTheme } from '../prototype-hyundoo/v3/ThemeContext';
import { trackPurchase, gaTracker, type ProductId, type PurchaseSource } from '@/lib/analytics';

type PaymentStatus = 'CHECKING' | 'PENDING' | 'CONFIRMED' | 'TIMEOUT';

interface OrderStatusResponse {
  intentId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'EXPIRED';
  result?: any;
  message?: string;
  updatedAt?: string;
}

function OrderCompletePageContent() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<{
    orderId: string;
    product: string;
    price: string;
    email: string;
    paymentMethod?: string; // 'ACCOUNT_TRANSFER' | 'INICIS' 등
    purchaseSource?: string; // 'landing' | 'product_detail'
  } | null>(null);

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('CHECKING');
  const [pollingCount, setPollingCount] = useState(0);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTrackedPurchase = useRef(false);

  // GA4 Purchase 이벤트 트래킹
  useEffect(() => {
    if (paymentStatus === 'CONFIRMED' && orderData && !hasTrackedPurchase.current) {
      hasTrackedPurchase.current = true;

      // 상품 정보 매핑
      const productIdMap: Record<string, ProductId> = {
        'growth-plan': 'growth-plan',
        'critical-hit': 'critical-hit',
        '그로스 플랜': 'growth-plan',
        '크리티컬 히트': 'critical-hit',
      };

      const productNameMap: Record<string, string> = {
        'growth-plan': '그로스 플랜',
        'critical-hit': '크리티컬 히트',
        '그로스 플랜': '그로스 플랜',
        '크리티컬 히트': '크리티컬 히트',
      };

      const productId = productIdMap[orderData.product] || 'growth-plan';
      const productName = productNameMap[orderData.product] || orderData.product;

      // 가격 파싱 (문자열에서 숫자 추출)
      const price = parseInt(orderData.price.replace(/[^0-9]/g, ''), 10) || 0;

      // 결제 방법 매핑
      const paymentMethodMap: Record<string, 'card' | 'bank'> = {
        'INICIS': 'card',
        'CARD': 'card',
        'card': 'card',
        'ACCOUNT_TRANSFER': 'bank',
        'BANK': 'bank',
        'TRANSFER': 'bank',
        'bank': 'bank',
      };
      const paymentMethod = paymentMethodMap[orderData.paymentMethod?.toUpperCase() || ''] || 'card';

      // 구매 출처 (저장된 정보 또는 기본값)
      const purchaseSource = (orderData.purchaseSource as PurchaseSource) || 'landing';

      trackPurchase({
        transactionId: orderData.orderId,
        productId,
        productName,
        price,
        paymentMethod,
        purchaseSource,
      });
    }
  }, [paymentStatus, orderData]);

  // 주문 상태 폴링 (카드 결제만)
  useEffect(() => {
    if (!orderData) return;

    // 결제 수단 확인
    const paymentMethodUpper = orderData.paymentMethod?.toUpperCase();
    const isAccountTransfer = paymentMethodUpper === 'ACCOUNT_TRANSFER' ||
                             paymentMethodUpper === 'BANK' ||
                             paymentMethodUpper === 'TRANSFER';

    // 계좌이체는 폴링하지 않음 (수동 입금 대기)
    if (isAccountTransfer) {
      setPaymentStatus('PENDING');
      return;
    }

    // 카드 결제만 폴링 실행
    let attempts = 0;
    const maxAttempts = 60; // 최대 3분 (3초 * 60)
    const intervalMs = 3000; // 3초마다

    const checkOrderStatus = async () => {
      try {
        attempts++;
        setPollingCount(attempts);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/checkout/payment-intents/${orderData.orderId}/status`
        );

        if (!response.ok) {
          console.error('Failed to check order status:', response.status);
          // 404 에러 발생 시 폴링 중단
          if (response.status === 404) {
            console.error('Order not found (404). Stopping polling.');
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
            }
            setPaymentStatus('TIMEOUT');
          }
          return;
        }

        const result: { success: boolean; data: OrderStatusResponse } = await response.json();

        if (result.success && result.data.status === 'CONFIRMED') {
          setPaymentStatus('CONFIRMED');
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }

          // 3초 후 메인 페이지로 자동 리다이렉트
          setTimeout(() => {
            localStorage.removeItem('orderData');
            router.push('/');
          }, 3000);
        } else if (result.success && (result.data.status === 'FAILED' || result.data.status === 'EXPIRED')) {
          // 결제 실패 또는 만료 시 폴링 중단
          setPaymentStatus('TIMEOUT');
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
        } else if (attempts >= maxAttempts) {
          setPaymentStatus('TIMEOUT');
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
        } else {
          setPaymentStatus('PENDING');
        }
      } catch (error) {
        console.error('Order status check error:', error);
      }
    };

    // 즉시 첫 체크 실행
    checkOrderStatus();

    // 이후 주기적으로 체크
    pollingIntervalRef.current = setInterval(checkOrderStatus, intervalMs);

    // 클린업
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [orderData, router]);

  useEffect(() => {
    // localStorage에서 주문 정보 가져오기
    const data = localStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      // 주문 정보가 없으면 메인 페이지로 리다이렉트
      router.push('/');
    }
  }, [router]);

  if (!orderData) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // 결제 수단 확인 (대소문자 구분 없이)
  const paymentMethodUpper = orderData?.paymentMethod?.toUpperCase();
  const isAccountTransfer = paymentMethodUpper === 'ACCOUNT_TRANSFER' || paymentMethodUpper === 'BANK' || paymentMethodUpper === 'TRANSFER';
  const isCardPayment = paymentMethodUpper === 'INICIS' || paymentMethodUpper === 'CARD';

  // 상태별 제목과 메시지 (결제 수단에 따라 다르게)
  const getStatusDisplay = () => {
    switch (paymentStatus) {
      case 'CONFIRMED':
        return {
          title: isAccountTransfer ? '입금이 확인되었습니다!' : '결제가 완료되었습니다!',
          subtitle: '곧 상품을 이메일로 발송해드립니다.'
        };
      case 'PENDING':
        return {
          title: isAccountTransfer
            ? '입금 대기 중입니다'
            : `결제를 확인하고 있습니다... ${pollingCount > 0 ? `(${pollingCount * 3}초)` : ''}`,
          subtitle: isAccountTransfer
            ? '입금이 확인되는 즉시 이메일로 안내드립니다.'
            : '잠시만 기다려주세요.'
        };
      case 'TIMEOUT':
        return {
          title: isAccountTransfer ? '입금 대기 중입니다' : '주문이 완료되었습니다',
          subtitle: ''
        };
      default:
        return {
          title: '주문이 완료되었습니다!',
          subtitle: isAccountTransfer
            ? '입금 확인 후 상품을 이메일로 발송해드립니다'
            : '결제 확인 후 상품을 이메일로 발송해드립니다'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{statusDisplay.title}</h1>

        <p className={styles.subtitle}>
          {statusDisplay.subtitle}
        </p>

        {/* 감동 메시지 */}
        <div className={styles.impactMessage}>
          <h3 className={styles.impactTitle}>
            {orderData.product === 'growth-plan' ? (
              <>20일 후, "이 질문 나올 줄 알았어"</>
            ) : (
              <>내일 면접이어도 괜찮아요</>
            )}
          </h3>
          <p className={styles.impactDesc}>
            {orderData.product === 'growth-plan' ? (
              <>
                하루 10분씩 준비하면 면접장에서<br />
                <strong>흔들리지 않는 자신감</strong>을 갖게 됩니다
              </>
            ) : (
              <>
                당신 이력서에서 가장 중요한 질문 3개.<br />
                <strong>오늘 준비하면, 내일 자신있게 답할 수 있어요</strong>
              </>
            )}
          </p>
        </div>

        {/* 결제 완료 시 성공 메시지 */}
        {paymentStatus === 'CONFIRMED' && (
          <div className={`${styles.notice} ${styles.successNotice}`}>
            <h4 className={styles.noticeTitle}>
              좋은 선택을 하셨습니다
            </h4>
            <ul className={styles.noticeList}>
              <li><strong>{orderData.email}</strong>로 24시간 내 발송됩니다</li>
              <li>면접관이 묻기 전에 미리 준비하세요</li>
            </ul>
          </div>
        )}

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.label}>주문번호</span>
            <span className={styles.value}>{orderData.orderId}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>상품명</span>
            <span className={styles.value}>{orderData.product}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>결제금액</span>
            <span className={styles.value}>{orderData.price}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>이메일</span>
            <span className={styles.value}>{orderData.email}</span>
          </div>
          {paymentStatus === 'PENDING' && !isAccountTransfer && (
            <div className={styles.summaryRow}>
              <span className={styles.label}>상태</span>
              <span className={`${styles.value} ${styles.pendingStatus}`}>
                결제 확인 중... ({pollingCount * 3}초)
              </span>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className={styles.nextSteps}>
          <h3 className={styles.stepsTitle}>다음 단계</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>입금 확인</h4>
                <p className={styles.stepDesc}>
                  영업일 기준 1-2시간 내 확인
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>상품 준비</h4>
                <p className={styles.stepDesc}>
                  {orderData.product === '크리티컬 히트' ?
                    '이력서 분석 및 질문 작성' :
                    orderData.product === '이력서 분석 리포트' ?
                    '이력서 상세 분석' :
                    '서비스 활성화'}
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>이메일 발송</h4>
                <p className={styles.stepDesc}>
                  24시간 내 상품 전달 완료
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className={styles.notice}>
          <h4 className={styles.noticeTitle}>
            안내 사항
          </h4>
          <ul className={styles.noticeList}>
            <li><strong>{orderData.email}</strong>로 24시간 내 발송됩니다</li>
            <li>스팸메일함도 확인해주세요</li>
            <li>궁금한 점은 언제든 카카오톡 채널로 문의해주세요</li>
          </ul>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => router.push('/')}
          >
            확인했어요
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <ThemeSelector />
    </main>
  );
}

export default function OrderCompletePage() {
  return (
    <ThemeProvider>
      <OrderCompletePageContent />
    </ThemeProvider>
  );
}