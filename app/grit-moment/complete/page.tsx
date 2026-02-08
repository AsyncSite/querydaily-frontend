'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

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
    <main style={{
      minHeight: '100vh',
      background: '#05060a',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#c3e88d',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          fontSize: '36px',
          color: '#05060a',
          fontWeight: 700,
        }}>✓</div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '16px',
        }}>결제가 완료되었습니다</h1>

        <p style={{
          color: '#9ca3af',
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '40px',
        }}>
          그릿모먼츠 8주 프로그램에 신청해주셔서 감사합니다
        </p>

        {/* Impact Message */}
        <div style={{
          background: 'rgba(195, 232, 141, 0.05)',
          border: '1px solid rgba(195, 232, 141, 0.15)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#c3e88d',
          }}>
            8주 후, 달라진 자신을 만나게 됩니다
          </h3>
          <p style={{
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: '#b0b0b0',
            margin: 0,
          }}>
            포기하고 싶은 순간을 돌파하는 힘,<br />
            <strong style={{ color: '#ffffff' }}>그릿모먼츠</strong>에서 함께 만들어갑니다
          </p>
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'left',
        }}>
          {[
            { label: '주문번호', value: orderData.orderId },
            { label: '프로그램', value: '그릿모먼츠 8주' },
            { label: '결제금액', value: `${orderData.price.toLocaleString('ko-KR')}원` },
            { label: '이메일', value: orderData.email },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{row.label}</span>
              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 500, textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{row.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #c3e88d 0%, #a5d65a 100%)',
            border: 'none',
            borderRadius: '10px',
            color: '#05060a',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          확인했어요
        </button>
      </div>
    </main>
  );
}
