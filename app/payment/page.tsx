'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

function PaymentPageContent() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<{
    orderId: string;
    memberId?: string;
    product: string;
    price?: string;
    name: string;
    email: string;
    phone?: string;
  } | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [depositorName, setDepositorName] = useState('');

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

    // 화이트 테마 설정 (growth-plan/v2와 동일)
    root.style.setProperty('--color-primary', '#8b5cf6');
    root.style.setProperty('--color-primary-light', '#a78bfa');
    root.style.setProperty('--color-secondary', '#8b5cf6');
    root.style.setProperty('--color-secondary-light', '#ec4899');
    root.style.setProperty('--color-bg-primary', '#ffffff');
    root.style.setProperty('--color-bg-secondary', '#f8f9fa');
    root.style.setProperty('--color-bg-tertiary', '#f1f3f4');
    root.style.setProperty('--color-text-primary', '#1a1a1a');
    root.style.setProperty('--color-text-secondary', '#4a4a4a');
    root.style.setProperty('--color-text-muted', '#6b7280');
    root.style.setProperty('--color-accent-rgb', '139, 92, 246');

    return () => {
      Object.entries(originalStyles).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(key, value);
        } else {
          root.style.removeProperty(key);
        }
      });
    };
  }, []);

  useEffect(() => {
    // localStorage에서 주문 정보 가져오기
    const data = localStorage.getItem('orderData');
    if (data) {
      const parsedData = JSON.parse(data);
      setOrderData(parsedData);
      setDepositorName(parsedData.name);
    } else {
      // 주문 정보가 없으면 products 페이지로 리다이렉트
      router.push('/products');
    }
  }, [router]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleComplete = () => {
    // growth-plan에서 왔으면 해당 페이지로, 아니면 메인으로
    if (orderData?.product === 'growth-plan') {
      router.push('/prototype-hyundoo/v4/products/growth-plan/v2');
    } else {
      router.push('/');
    }
  };

  if (!orderData) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>무통장입금 안내</h1>
          <p className={styles.subtitle}>
            아래 계좌로 입금해주세요
          </p>
        </div>

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

        {/* 주문 정보 */}
        <div className={styles.orderInfo}>
          <h3 className={styles.sectionTitle}>주문 정보</h3>
          {orderData.memberId && (
            <div className={styles.infoRow}>
              <span className={styles.label}>회원번호</span>
              <span className={styles.value}>{orderData.memberId}</span>
            </div>
          )}
          <div className={styles.infoRow}>
            <span className={styles.label}>주문번호</span>
            <span className={styles.value}>{orderData.orderId}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>상품명</span>
            <span className={styles.value}>{orderData.product}</span>
          </div>
          {orderData.price && (
            <div className={styles.infoRow}>
              <span className={styles.label}>결제금액</span>
              <span className={styles.value}>{orderData.price}</span>
            </div>
          )}
        </div>

        {/* 입금 계좌 정보 */}
        <div className={styles.accountInfo}>
          <h3 className={styles.sectionTitle}>입금 계좌 정보</h3>

          <div className={styles.bankCard}>
            <div className={styles.bankLogo}>국민은행</div>

            <div className={styles.accountNumber}>
              <span className={styles.number}>893837-00-005595</span>
              <button
                className={styles.copyBtn}
                onClick={() => copyToClipboard('89383700005595', 'account')}
              >
                {copySuccess === 'account' ? '✓ 복사됨' : '복사'}
              </button>
            </div>

            <div className={styles.accountHolder}>
              <span className={styles.label}>예금주</span>
              <span className={styles.holderName}>최보임 (어싱크사이트)</span>
            </div>

            <div className={styles.depositName}>
              <span className={styles.label}>입금자명</span>
              <div className={styles.depositNameBox}>
                <input
                  type="text"
                  className={styles.depositNameInput}
                  value={depositorName}
                  onChange={(e) => setDepositorName(e.target.value)}
                  placeholder="입금자명을 입력하세요"
                />
                <button
                  className={styles.copyBtn}
                  onClick={() => copyToClipboard(depositorName, 'name')}
                >
                  {copySuccess === 'name' ? '✓ 복사됨' : '복사'}
                </button>
              </div>
              <p className={styles.depositNameHint}>
                실제 입금하실 분의 이름으로 수정 가능합니다
              </p>
            </div>
          </div>

          <div className={styles.notice}>
            <p className={styles.noticeItem}>
              반드시 위의 <strong>입금자명</strong>과 동일하게 입금해주세요
            </p>
            <p className={styles.noticeItem}>
              입금 확인 후 24시간 내에 상품이 이메일로 발송됩니다
            </p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className={styles.actions}>
          <button
            className={styles.completeBtn}
            onClick={handleComplete}
          >
            확인했어요
          </button>
        </div>

        {/* 문의 안내 */}
        <div className={styles.contact}>
          <p className={styles.contactText}>
            입금 관련 문의사항이 있으신가요?
          </p>
          <a
            href="http://pf.kakao.com/_hWMtn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            카카오톡 문의하기 →
          </a>
        </div>
      </div>

    </main>
  );
}

export default function PaymentPage() {
  return <PaymentPageContent />;
}