'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { trackExternalLink } from '@/components/GoogleAnalytics';

function SuccessContent() {
  const searchParams = useSearchParams();

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        {/* Success Icon Animation */}
        <div className={styles.successIcon}>
          <div className={styles.iconCircle}>
            <svg className={styles.checkmark} viewBox="0 0 52 52">
              <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
              <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>베타 테스트 신청 완료!</h1>

          <div className={styles.messageBox}>
            <p className={styles.thankYou}>
              <strong>QueryDaily 베타 테스트</strong>에 신청해주셔서 감사합니다.
            </p>

            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📧</span>
                <p>인원 모집이 완료되면 <strong>선발되신 분께 별도 메일</strong>을 보내드릴 예정입니다.</p>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🔒</span>
                <p>제출하신 이력서는 <strong>안전하게 보관</strong>되며, 미선발시 <strong>자동 폐기</strong>됩니다.</p>
              </div>
            </div>
          </div>

          {/* Discord Promotion Section */}
          <div className={styles.discordSection}>
            <div className={styles.discordHeader}>
              <span className={styles.waitingEmoji}>⏰</span>
              <h2>기다리는 동안...</h2>
            </div>

            <div className={styles.discordCard}>
              <div className={styles.discordBadge}>
                <span className={styles.liveIndicator}></span>
                <span className={styles.liveText}>LIVE</span>
              </div>

              <h3 className={styles.discordTitle}>
                🔥 네카라쿠배당토 채용 공고를 실시간으로 받아보세요!
              </h3>

              <div className={styles.companyLogos}>
                <span className={styles.companyTag}>네이버</span>
                <span className={styles.companyTag}>카카오</span>
                <span className={styles.companyTag}>라인</span>
                <span className={styles.companyTag}>쿠팡</span>
                <span className={styles.companyTag}>배민</span>
                <span className={styles.companyTag}>당근</span>
                <span className={styles.companyTag}>토스</span>
              </div>

              <p className={styles.discordDesc}>
                매일 새로운 채용 공고를 놓치지 마세요.<br/>
                <strong>QueryDaily 디스코드 채널</strong>에서 다른 개발자들과 함께 준비해보세요!
              </p>

              <div className={styles.discordFeatures}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🚀</span>
                  <span>실시간 채용 알림</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>💬</span>
                  <span>면접 경험 공유</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🤝</span>
                  <span>함께 성장하는 커뮤니티</span>
                </div>
              </div>

              <a
                href="https://discord.gg/5XmVfNGa"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.discordButton}
                onClick={() => trackExternalLink('discord_success_page')}
              >
                <svg className={styles.discordIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Discord 채널 참여하기</span>
                <span className={styles.arrow}>→</span>
              </a>

              <p className={styles.memberCount}>
                <span className={styles.onlineDot}></span>
                활발한 커뮤니티에서 함께 성장하세요
              </p>
            </div>
          </div>

          {/* Home Link */}
          <div className={styles.footer}>
            <a href="/" className={styles.homeLink}>
              ← 메인으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}