'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type PaymentStatus = 'CHECKING' | 'PENDING' | 'CONFIRMED' | 'TIMEOUT';

interface OrderStatusResponse {
  orderId: string;
  status: 'PENDING' | 'COMPLETED';
  purchaseId?: string;
  completedAt?: string;
  message?: string;
}

export default function OrderCompletePage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<{
    orderId: string;
    product: string;
    price: string;
    email: string;
    paymentMethod?: string; // 'ACCOUNT_TRANSFER' | 'INICIS' 등
  } | null>(null);

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('CHECKING');
  const [pollingCount, setPollingCount] = useState(0);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const KAKAO_CHANNEL_CHAT_LINK = 'http://pf.kakao.com/_hWMtn/chat';

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

        if (result.success && result.data.status === 'COMPLETED') {
          setPaymentStatus('CONFIRMED');
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }

          // 3초 후 메인 페이지로 자동 리다이렉트
          setTimeout(() => {
            localStorage.removeItem('orderData');
            router.push('/');
          }, 3000);
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
          icon: '✅',
          title: isAccountTransfer ? '입금이 확인되었습니다!' : '결제가 완료되었습니다!',
          subtitle: '곧 상품을 이메일로 발송해드립니다.'
        };
      case 'PENDING':
        return {
          icon: '🔄',
          title: isAccountTransfer
            ? '입금 대기 중입니다'
            : `결제를 확인하고 있습니다... ${pollingCount > 0 ? `(${pollingCount * 3}초)` : ''}`,
          subtitle: isAccountTransfer
            ? '입금이 확인되는 즉시 이메일로 안내드립니다.'
            : '잠시만 기다려주세요.'
        };
      case 'TIMEOUT':
        return {
          icon: '⏱️',
          title: isAccountTransfer ? '입금 대기 중입니다' : '결제 확인 중입니다',
          subtitle: isAccountTransfer
            ? '입금이 확인되는 즉시 이메일로 안내드립니다.'
            : '결제가 확인되는 즉시 이메일로 안내드립니다.'
        };
      default:
        return {
          icon: '🔄',
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
        {/* Success Animation */}
        <div className={styles.successIcon}>
          <div className={styles.checkmark}>{statusDisplay.icon}</div>
        </div>

        <h1 className={styles.title}>{statusDisplay.title}</h1>

        <p className={styles.subtitle}>
          {statusDisplay.subtitle}
        </p>

        {/* 결제 완료 시 성공 메시지 */}
        {paymentStatus === 'CONFIRMED' && (
          <div className={styles.notice} style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}>
            <h4 className={styles.noticeTitle}>
              {isAccountTransfer ? '🎉 입금이 확인되었습니다!' : '🎉 결제가 완료되었습니다!'}
            </h4>
            <ul className={styles.noticeList}>
              <li>24시간 내에 등록하신 이메일로 상품을 발송해드립니다</li>
            </ul>
          </div>
        )}

        {/* 카카오톡 채널 안내 - 모든 상품에 표시 */}
        <div style={{
          backgroundColor: '#FEF9E7',
          border: '2px solid #FEE500',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{
            margin: '0 0 15px 0',
            color: '#3C1E1E',
            fontSize: '18px',
            fontWeight: '700'
          }}>💬 카카오톡 채널 안내</h4>
          <ul style={{
            margin: '0',
            paddingLeft: '20px',
            color: '#3C1E1E',
            fontSize: '15px',
            lineHeight: '1.8'
          }}>
            <li>궁금하신 점이나 문의사항이 있으시면 <strong>카카오톡 채널</strong>로 문의해주세요</li>
            <li><strong>리얼 인터뷰</strong> 또는 <strong>레주메 핏</strong>을 구매하신 고객님은 입금 확인 후 카카오톡 채널을 통해 연락해주세요</li>
            <li>아래 버튼을 눌러 채널을 추가해주세요</li>
          </ul>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <a
              href={KAKAO_CHANNEL_CHAT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#FEE500',
                color: '#3C1E1E',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '16px'
              }}
            >
              📱 카카오톡 채널 문의하기
            </a>
          </div>
        </div>

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
              <span className={styles.value} style={{ color: '#ffa500' }}>
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
          <h4 className={styles.noticeTitle}>📌 꼭 확인해주세요!</h4>
          <ul className={styles.noticeList}>
            <li>입금자명이 주문 시 입력한 이름과 동일해야 합니다</li>
            <li>스팸메일함도 확인해주세요</li>
            <li>24시간이 지나도 메일을 받지 못하셨다면 문의해주세요</li>
          </ul>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => router.push('/')}
          >
            메인으로 돌아가기
          </button>

          <a
            href={KAKAO_CHANNEL_CHAT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            카카오톡 문의하기
          </a>
        </div>
      </div>
    </main>
  );
}