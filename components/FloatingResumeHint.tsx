'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingResumeHint.module.css';

export default function FloatingResumeHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed
    const dismissed = localStorage.getItem('resumeHintDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (isDismissed) return;

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, hasScrolledPast]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('resumeHintDismissed', 'true');
  };

  const handleClick = () => {
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_resume_hint_floating', {
        event_category: 'Resume Service',
        event_label: 'Floating Hint Click',
        minimized: isMinimized
      });
    }

    // Open Google Form
    window.open('https://forms.gle/iN5GE3aNDxLiKhyU8', '_blank');

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
      {/* Minimized State - Text Banner */}
      {isMinimized && (
        <div className={styles.minimizedContent} onClick={handleClick}>
          <span className={styles.iconBadge}>📝</span>
          <span className={styles.minimizedText}>
            혹시 아직<br/>이력서가 준비되지 않으셨나요?
          </span>
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
            <span className={styles.emoji}>✍️</span>
            <span className={styles.badge}>NEW</span>
          </div>

          <div className={styles.hintBody}>
            <h4 className={styles.hintTitle}>
              이력서가 막막하신가요?
            </h4>
            <p className={styles.hintText}>
              AI가 당신의 이력서를 분석하고<br/>
              개선점을 찾아드립니다
            </p>

            <div className={styles.waitingCount}>
              🔥 423명이 기다리는 중
            </div>

            <button
              className={styles.hintCta}
              onClick={handleClick}
            >
              출시 알림 받기 →
            </button>

            <p className={styles.hintNote}>
              10초면 등록 완료
            </p>
          </div>
        </div>
      )}
    </div>
  );
}