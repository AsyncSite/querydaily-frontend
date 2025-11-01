'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PaymentPage() {
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
    router.push('/order-complete');
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
            아래 계좌로 입금 후, 입금 완료 버튼을 눌러주세요
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

        {/* 리얼 인터뷰/레주메 핏 특별 안내 */}
        <div style={{
          backgroundColor: '#FEF9E7',
          border: '2px solid #FEE500',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <p style={{
            margin: '0 0 10px 0',
            color: '#3C1E1E',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            💬 <strong>리얼 인터뷰</strong> 또는 <strong>레주메 핏</strong>을 구매하신 고객님은 입금 확인 후 <strong>카카오톡 채널을 통해 연락</strong>해주세요
          </p>
          <p style={{
            margin: '0',
            color: '#3C1E1E',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            일정 조율 및 상세 안내가 카카오톡 채널을 통해 진행됩니다
          </p>
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
                ⚠️ 실제 입금하실 분의 이름으로 수정 가능합니다
              </p>
            </div>
          </div>

          <div className={styles.notice}>
            <p className={styles.noticeItem}>
              ⚠️ 반드시 위의 <strong>입금자명</strong>과 동일하게 입금해주세요
            </p>
            <p className={styles.noticeItem}>
              📌 입금 확인 후 24시간 내에 상품이 이메일로 발송됩니다
            </p>
            <p className={styles.noticeItem}>
              💡 입금 후 아래 버튼을 눌러 입금 완료를 알려주세요
            </p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className={styles.actions}>
          <button
            className={styles.completeBtn}
            onClick={handleComplete}
          >
            입금 완료했어요 →
          </button>

          <button
            className={styles.laterBtn}
            onClick={() => router.push('/')}
          >
            나중에 입금할게요
          </button>
        </div>

        {/* 문의 안내 */}
        <div className={styles.contact}>
          <p className={styles.contactText}>
            입금 관련 문의사항이 있으신가요?
          </p>
          <a
            href="https://pf.kakao.com/_zxkxmUn/chat"
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