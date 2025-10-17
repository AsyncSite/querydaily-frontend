'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingFreeTrial.module.css';

export default function FloatingFreeTrial({ onOpenModal }: { onOpenModal: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      // Show when scrolled past 40%
      if (scrollPercent > 40 && !hasScrolledPast) {
        setHasScrolledPast(true);
        setIsVisible(true);

        // Auto minimize after 5 seconds
        setTimeout(() => {
          setIsMinimized(true);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [hasScrolledPast]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // localStorage.setItem('resumeHintDismissed', 'true'); // 제거 - 항상 띄우기
  };

  const handleClick = () => {
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_free_trial_floating', {
        event_category: 'Free Trial',
        event_label: 'Floating Free Trial Click',
        minimized: isMinimized
      });
    }

    // Open free trial modal
    onOpenModal();

    // Optionally dismiss after click
    // handleDismiss();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className={`${styles.floatingContainer} ${isMinimized ? styles.minimized : ''}`}
      onMouseEnter={() => setIsMinimized(false)}
      onMouseLeave={() => setIsMinimized(true)}
    >
      {/* Minimized State - Mobile: Compact Banner */}
      {isMinimized && isMobile && (
        <div className={styles.miniIconContent} onClick={handleClick}>
          <span className={styles.hotBadgeMini}>HOT</span>
          <span className={styles.iconBadge}>💬</span>
          <span className={styles.miniText}>면접 기출</span>
          <span className={styles.pulse}></span>
        </div>
      )}

      {isMinimized && !isMobile && (
        <div className={styles.minimizedContent} onClick={handleClick}>
          <span className={styles.hotBadge}>🔥 HOT</span>
          <span className={styles.iconBadge}>💬</span>
          <div className={styles.minimizedTextWrapper}>
            <span className={styles.minimizedText}>
              2025년 최신 면접 기출
            </span>
            <span className={styles.minimizedSubtext}>
              3문제 무료
            </span>
          </div>
          <span className={styles.ctaArrow}>→</span>
          <span className={styles.pulse}></span>
        </div>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <div className={styles.expandedContent}>
          <button
            className={styles.closeBtn}
            onClick={handleDismiss}
            aria-label="닫기"
          >
            ×
          </button>

          <div className={styles.hintHeader}>
            <span className={styles.emoji}>💬</span>
            <span className={styles.badge}>2025 최신</span>
          </div>

          <div className={styles.hintBody}>
            <h4 className={styles.hintTitle}>
              실제로 나온 면접 질문들
            </h4>
            <p className={styles.hintText}>
              네카라쿠배 2025년 상반기 기출<br/>
              실제 면접 질문 3개 무료 제공
            </p>

            <div className={styles.features}>
              <span>• "어제 K사에서 받은 질문이에요" - 김**님</span>
              <span>• 이번 달 가장 많이 나온 TOP 3</span>
              <span>• 모범 답안 방향까지 제공</span>
            </div>

            <div className={styles.waitingCount}>
              ⚡ 지금 바로 시작 가능
            </div>

            <button
              className={styles.hintCta}
              onClick={handleClick}
            >
              무료로 받아보기
            </button>

            <p className={styles.hintNote}>
              카드 등록 불필요 • 30초 시작
            </p>
          </div>
        </div>
      )}
    </div>
  );
}