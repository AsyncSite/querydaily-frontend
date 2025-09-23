'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function PricingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← 돌아가기
        </Link>
      </div>

      <div className={styles.content}>
        <h1>요금 안내</h1>
        <p className={styles.subtitle}>당신의 성장에 투자하세요</p>

        <div className={styles.betaBanner}>
          <span className={styles.betaIcon}>🎉</span>
          <div>
            <h3>베타 테스트 기간 특별 혜택</h3>
            <p>지금 신청하시면 <strong>완전 무료</strong>로 3일 챌린지를 경험하실 수 있습니다!</p>
          </div>
        </div>

        <div className={styles.pricingCards}>
          <div className={styles.card}>
            <div className={styles.cardBadge}>BETA</div>
            <h2 className={styles.planName}>3일 무료 챌린지</h2>
            <div className={styles.price}>
              <span className={styles.priceAmount}>₩0</span>
              <span className={styles.pricePeriod}>/ 3일</span>
            </div>
            <p className={styles.planDescription}>
              베타 테스트 기간 한정 무료 제공
            </p>
            <ul className={styles.features}>
              <li>✅ 맞춤형 면접 질문 3개</li>
              <li>✅ 매일 오전 10시 이메일 발송</li>
              <li>✅ Java/Spring 특화 질문</li>
              <li>✅ 이력서 기반 개인화</li>
              <li>✅ 3일 후 데이터 자동 삭제</li>
              <li>✅ 신용카드 등록 불필요</li>
            </ul>
            <Link href="/#apply" className={styles.ctaButton}>
              지금 신청하기 →
            </Link>
            <p className={styles.spots}>
              <strong>🔥 7/10명</strong> 신청 완료
            </p>
          </div>

          <div className={`${styles.card} ${styles.comingSoon}`}>
            <div className={styles.cardBadge}>COMING SOON</div>
            <h2 className={styles.planName}>인터뷰 패스</h2>
            <div className={styles.price}>
              <span className={styles.priceAmount}>₩29,900</span>
              <span className={styles.pricePeriod}>/ 월</span>
            </div>
            <p className={styles.planDescription}>
              더 깊이 있는 면접 준비를 원하시는 분들을 위한 프리미엄 플랜
            </p>
            <ul className={styles.features}>
              <li>✅ 모든 기본 기능 포함</li>
              <li>✅ 질문별 답변 가이드 제공</li>
              <li>✅ 30일간 매일 질문 발송</li>
              <li>✅ 질문 난이도 조절 가능</li>
              <li>✅ 기술 스택 확장 지원</li>
              <li>✅ 1:1 피드백 (월 2회)</li>
              <li>✅ 모의 면접 영상 분석</li>
            </ul>
            <button className={styles.ctaButtonDisabled} disabled>
              출시 예정
            </button>
            <p className={styles.notify}>
              출시 알림 받기: <a href="https://open.kakao.com/o/s57VJtTh" target="_blank" rel="noopener noreferrer">오픈카톡</a>
            </p>
          </div>
        </div>

        <div className={styles.comparison}>
          <h2>플랜 비교</h2>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>기능</th>
                <th>3일 무료 챌린지</th>
                <th>인터뷰 패스</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>맞춤형 면접 질문</td>
                <td>3개</td>
                <td>30개+</td>
              </tr>
              <tr>
                <td>이메일 발송</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>답변 가이드</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>난이도 조절</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>1:1 피드백</td>
                <td>❌</td>
                <td>월 2회</td>
              </tr>
              <tr>
                <td>기술 스택</td>
                <td>Java/Spring</td>
                <td>모든 백엔드</td>
              </tr>
              <tr>
                <td>데이터 보관</td>
                <td>3일</td>
                <td>이용 기간</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.faq}>
          <h2>자주 묻는 질문</h2>
          <div className={styles.faqItem}>
            <h3>💳 정말 무료인가요?</h3>
            <p>네, 베타 테스트 기간 동안은 완전 무료입니다. 신용카드 등록도 필요 없습니다.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>🔄 3일 후에 자동으로 유료 전환되나요?</h3>
            <p>아니요. 3일 챌린지는 완전히 독립된 무료 프로그램입니다. 유료 전환은 없습니다.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>🔒 개인정보는 안전한가요?</h3>
            <p>모든 데이터는 3일 후 자동으로 완전 삭제됩니다. 제3자 공유나 마케팅 활용은 절대 없습니다.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>📅 언제 정식 서비스가 출시되나요?</h3>
            <p>베타 테스트 피드백을 반영하여 2025년 상반기 출시 예정입니다.</p>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>지금이 기회입니다</h2>
          <p>베타 테스터로 참여하고 무료로 경험하세요</p>
          <Link href="/#apply" className={styles.ctaButtonPrimary}>
            3일 무료 챌린지 시작하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}