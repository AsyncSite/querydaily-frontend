'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ProductsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePurchase = () => {
    window.open('https://open.kakao.com/o/gKxyzABf', '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.mobileContainer}>
        {/* Header */}
        <header className={styles.header}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
            <span className={styles.betaTag}>BETA</span>
          </a>
        </header>

        {/* Main Content */}
        <div className={styles.content}>

          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.urgentBadge}>
              <span className={styles.fire}>🔥</span>
              <span>베타 종료까지</span>
              <span className={styles.countdown}>
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <h1 className={styles.mainTitle}>
              면접장에서 박살나기 전에<br/>
              <span className={styles.highlight}>당신의 약점</span>을 찾아낸다
            </h1>

            <p className={styles.subtitle}>
              Java/Spring 백엔드 개발자를 위한<br/>
              가장 날카로운 면접 트레이닝
            </p>
          </div>

          {/* Product 1: 오늘의 쿼리 해설 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>오늘 질문에 답 못하셨죠?</span>
              <h2 className={styles.productName}>오늘의 쿼리 해설</h2>
              <span className={styles.productEn}>Query Insight</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeQuestion}>
                "JPA N+1 문제를 해결한 경험을 설명해주세요"
              </p>
              <p className={styles.challengeText}>
                이 질문 하나로 당신의 실력이 다 보입니다
              </p>
            </div>

            <div className={styles.transform}>
              <div className={styles.transformBefore}>
                <span className={styles.transformLabel}>지금 당신</span>
                <div className={styles.transformBox}>
                  "음... JPA는 편해서..."
                </div>
              </div>
              <div className={styles.transformAfter}>
                <span className={styles.transformLabel}>해설 후</span>
                <div className={styles.transformBox}>
                  <div className={styles.blurred}>
                    완벽한 답변 구조
                  </div>
                  <span className={styles.locked}>🔒 잠김</span>
                </div>
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩2,500</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩1,900</span>
                <span className={styles.discountTag}>BETA</span>
              </div>
              <button className={styles.buyBtn} onClick={handlePurchase}>
                지금 바로 해설 보기
              </button>
            </div>
          </div>

          {/* Product 2: 그로스 플랜 */}
          <div className={styles.product}>
            <div className={styles.bestBadge}>MOST BRUTAL</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>3일 챌린지만으론 부족하다</span>
              <h2 className={styles.productName}>그로스 플랜</h2>
              <span className={styles.productEn}>Growth Plan</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                매일 당신의 한계를 시험합니다<br/>
                준비되지 않았다면 시작하지 마세요
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>⚡</span>
                <span className={styles.featureName}>매일 맞춤 질문</span>
                <span className={styles.featureValue}>월 22개</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📊</span>
                <span className={styles.featureName}>시스템 설계</span>
                <span className={styles.featureValue}>매주</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔥</span>
                <span className={styles.featureName}>기술 트렌드</span>
                <span className={styles.featureValue}>매월</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✏️</span>
                <span className={styles.featureName}>답변 첨삭</span>
                <span className={styles.featureValue}>월 1회</span>
              </div>
            </div>

            <div className={styles.warning}>
              ⚠️ 주니어의 한계를 넘어 시니어의 사고를 갖추세요
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩39,900</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩29,900</span>
                <span className={styles.priceUnit}>/월</span>
                <span className={styles.discountTag}>BETA</span>
              </div>
              <button className={styles.buyBtn} onClick={handlePurchase}>
                도전 시작하기
              </button>
            </div>
          </div>

          {/* Product 3: 이력서 분석 리포트 */}
          <div className={styles.product}>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>면접 1주일 전 필수</span>
              <h2 className={styles.productName}>이력서 분석 리포트</h2>
              <span className={styles.productEn}>Resume Analytics</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                당신의 이력서에서 나올<br/>
                <span className={styles.emphasis}>모든 공격 포인트 50개</span>를 예측
              </p>
            </div>

            <div className={styles.preview}>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q1</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>MSA 전환</span>
                  <p className={styles.qText}>가장 큰 도전과제는?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.qNum}>Q2</span>
                <div className={styles.qContent}>
                  <span className={styles.qCat}>Spring Boot</span>
                  <p className={styles.qText}>선택 이유와 장단점?</p>
                  <span className={styles.qKeywords}>핵심키워드: 🔒</span>
                </div>
              </div>
              <div className={styles.moreBox}>
                + 48개 추가 질문
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩59,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩49,000</span>
                <span className={styles.discountTag}>BETA</span>
              </div>
              <button className={styles.buyBtn} onClick={handlePurchase}>
                약점 분석 받기
              </button>
            </div>
          </div>

          {/* Product 4: 라이브 인터뷰 */}
          <div className={styles.product}>
            <div className={styles.limitBadge}>⚠️ 3자리 남음</div>
            <div className={styles.productHeader}>
              <span className={styles.productLabel}>진짜 실전</span>
              <h2 className={styles.productName}>라이브 인터뷰</h2>
              <span className={styles.productEn}>Live Interview</span>
            </div>

            <div className={styles.challenge}>
              <p className={styles.challengeText}>
                현직 시니어 개발자와<br/>
                <span className={styles.emphasis}>45분간 진검승부</span>
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>10분</span>
                <span className={styles.timelineDesc}>이력서 압박 질문</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>20분</span>
                <span className={styles.timelineDesc}>실전 코딩 테스트</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>10분</span>
                <span className={styles.timelineDesc}>시스템 설계</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>5분</span>
                <span className={styles.timelineDesc}>즉석 피드백</span>
              </div>
            </div>

            <div className={styles.experts}>
              <span className={styles.expertsLabel}>면접관</span>
              <div className={styles.expertsList}>
                N사 시니어 · K사 테크리드 · T사 아키텍트
              </div>
            </div>

            <div className={styles.priceArea}>
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>₩99,000</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.currentPrice}>₩79,000</span>
                <span className={styles.discountTag}>BETA</span>
              </div>
              <button className={styles.buyBtn} onClick={handlePurchase}>
                실전 도전하기
              </button>
            </div>
          </div>

          {/* Beta Notice */}
          <div className={styles.betaNotice}>
            <p className={styles.betaTitle}>💬 베타 운영 안내</p>
            <p className={styles.betaText}>
              카카오톡 1:1 상담 후 결제 진행<br/>
              정식 오픈 시 가격 인상 예정
            </p>
          </div>

          {/* Final CTA */}
          <div className={styles.finalCta}>
            <h2 className={styles.ctaTitle}>
              더 미루면<br/>
              <span className={styles.ctaHighlight}>면접장에서 박살난다</span>
            </h2>
            <button className={styles.ctaBtn} onClick={handlePurchase}>
              지금 시작하기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}