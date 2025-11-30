'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function V6Page() {
  return (
    <div className={styles.container}>

      {/* Hero - 초강력 한 줄 */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            당신을 합격시킵니다.
          </h1>
          <p className={styles.heroSub}>
            면접 준비, 20일이면 끝.
          </p>
          <button className={styles.heroCta}>
            지금 시작하기
          </button>
        </div>
      </section>

      {/* How - 2-3줄만 */}
      <section className={styles.how}>
        <div className={styles.howContent}>
          <div className={styles.howItem}>
            <span className={styles.howNumber}>1</span>
            <p className={styles.howText}>매일 당신 이력서 기반 질문 + 합격 답변</p>
          </div>
          <div className={styles.howItem}>
            <span className={styles.howNumber}>2</span>
            <p className={styles.howText}>20일이면 완료</p>
          </div>
          <div className={styles.howItem}>
            <span className={styles.howNumber}>3</span>
            <p className={styles.howText}>하루 10분</p>
          </div>
        </div>
      </section>

      {/* What - 핵심 3개 */}
      <section className={styles.what}>
        <div className={styles.whatContent}>
          <h2 className={styles.whatTitle}>당신이 받는 것</h2>
          <div className={styles.whatList}>
            <div className={styles.whatItem}>
              <div className={styles.whatIcon}>→</div>
              <div>
                <h3 className={styles.whatItemTitle}>진짜 질문</h3>
                <p className={styles.whatItemDesc}>당신 이력서 기반</p>
              </div>
            </div>
            <div className={styles.whatItem}>
              <div className={styles.whatIcon}>→</div>
              <div>
                <h3 className={styles.whatItemTitle}>합격하는 답변</h3>
                <p className={styles.whatItemDesc}>실제 합격자 패턴</p>
              </div>
            </div>
            <div className={styles.whatItem}>
              <div className={styles.whatIcon}>→</div>
              <div>
                <h3 className={styles.whatItemTitle}>매일 아침 7시, 저녁 5시</h3>
                <p className={styles.whatItemDesc}>알림 받고 바로 확인</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof - 최소한 */}
      <section className={styles.proof}>
        <div className={styles.proofContent}>
          <div className={styles.proofScore}>5.0/5.0</div>
          <p className={styles.proofText}>실제 사용자 만족도</p>
          <p className={styles.proofQuote}>
            "이거 하고 붙었어요. 진짜 제 이력서 질문이라 놀랐습니다."
          </p>
        </div>
      </section>

      {/* Price + CTA */}
      <section className={styles.pricing}>
        <div className={styles.pricingContent}>
          <h2 className={styles.pricingTitle}>시작하기</h2>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.planName}>크리티컬 히트</h3>
              <div className={styles.planPrice}>
                <span className={styles.price}>29,000</span>
                <span className={styles.currency}>원</span>
              </div>
              <p className={styles.planDesc}>핵심 질문만 받고 싶다면</p>
              <ul className={styles.planFeatures}>
                <li>20일 × 3문제/일</li>
                <li>총 60개 질문</li>
                <li>합격 답변 포함</li>
              </ul>
              <button className={styles.planCta}>선택하기</button>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.featuredBadge}>인기</div>
              <h3 className={styles.planName}>그로스 플랜</h3>
              <div className={styles.planPrice}>
                <span className={styles.price}>99,000</span>
                <span className={styles.currency}>원</span>
              </div>
              <p className={styles.planDesc}>완벽하게 준비하고 싶다면</p>
              <ul className={styles.planFeatures}>
                <li>20일 × 10문제/일</li>
                <li>총 200개 질문</li>
                <li>합격 답변 포함</li>
                <li>모의 면접 무제한</li>
              </ul>
              <button className={styles.planCta}>선택하기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 최소한 */}
      <footer className={styles.footer}>
        <p>© 2024 QueryDaily. All rights reserved.</p>
      </footer>

    </div>
  );
}
