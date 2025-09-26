'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function OrderCompletePage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // localStorage에서 주문 정보 가져오기
    const data = localStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));

      // 주문 완료 후 localStorage 클리어 (선택사항)
      // localStorage.removeItem('orderData');
    } else {
      // 주문 정보가 없으면 products 페이지로 리다이렉트
      router.push('/products');
    }
  }, [router]);

  if (!orderData) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Success Animation */}
        <div className={styles.successIcon}>
          <div className={styles.checkmark}>✓</div>
        </div>

        <h1 className={styles.title}>주문이 완료되었습니다!</h1>

        <p className={styles.subtitle}>
          입금 확인 후 24시간 내에<br/>
          등록하신 이메일로 상품을 발송해드립니다
        </p>

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
            onClick={() => router.push('/products')}
          >
            다른 상품 보기
          </button>

          <a
            href="https://pf.kakao.com/_zxkxmUn/chat"
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