'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function GritMomentCompletePage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<{
    orderId: string;
    product: string;
    price: number;
    email: string;
    name: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      router.push('/grit-moment');
    }
  }, [router]);

  const handleConfirm = () => {
    localStorage.removeItem('orderData');
    router.push('/');
  };

  if (!orderData) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>로딩 중...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.successIcon}>
          <div className={styles.checkmark}>✓</div>
        </div>

        <h1 className={styles.title}>결제가 완료되었습니다</h1>
        <p className={styles.subtitle}>
          그릿 모먼트 8주 프로그램에 신청해주셔서 감사합니다
        </p>

        {/* Impact Message */}
        <div className={styles.impactMessage}>
          <h3 className={styles.impactTitle}>
            8주 후, 달라진 자신을 만나게 됩니다
          </h3>
          <p className={styles.impactDesc}>
            포기하고 싶은 순간을 돌파하는 힘,<br />
            <strong>그릿 모먼트</strong>에서 함께 만들어갑니다
          </p>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.label}>주문번호</span>
            <span className={styles.value}>{orderData.orderId}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>프로그램</span>
            <span className={styles.value}>그릿 모먼트 8주</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>결제금액</span>
            <span className={styles.value}>{orderData.price.toLocaleString('ko-KR')}원</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>이메일</span>
            <span className={styles.value}>{orderData.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
