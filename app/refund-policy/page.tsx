'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RefundPolicyPage() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.back()}
          >
            ← 뒤로가기
          </button>
          <a href="/" className={styles.logo}>
            <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
          </a>
        </header>

        {/* Title */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>환불 정책</h1>
          <p className={styles.subtitle}>
            QueryDaily는 고객님의 만족을 최우선으로 생각합니다
          </p>
          <p className={styles.lastUpdated}>최종 업데이트: 2025년 9월</p>
        </div>

        {/* Content */}
        <div className={styles.content}>

          {/* 기본 환불 정책 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. 기본 환불 정책</h2>
            <div className={styles.sectionContent}>
              <p className={styles.paragraph}>
                QueryDaily는 디지털 콘텐츠의 특성을 고려하여 다음과 같은 환불 정책을 운영합니다:
              </p>
              <ul className={styles.list}>
                <li>서비스 제공 전: <strong>100% 환불</strong></li>
                <li>서비스 제공 후: 상품별 정책에 따름</li>
                <li>환불 요청 기한: 결제일로부터 7일 이내</li>
              </ul>
            </div>
          </section>

          {/* 상품별 환불 정책 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. 상품별 환불 정책</h2>

            <div className={styles.productPolicy}>
              <h3 className={styles.productName}>크리티컬 히트 (단건 질문)</h3>
              <div className={styles.policyBox}>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>메일 발송 전</span>
                  <span className={styles.rate}>100% 환불</span>
                </div>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>메일 발송 후</span>
                  <span className={styles.rate}>환불 불가</span>
                </div>
                <p className={styles.note}>
                  * 면접 질문 메일이 발송된 순간부터 환불이 불가능합니다
                </p>
              </div>
            </div>

            <div className={styles.productPolicy}>
              <h3 className={styles.productName}>그로스 플랜 (월 구독)</h3>
              <div className={styles.policyBox}>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>10회 이하 사용</span>
                  <span className={styles.rate}>차감 후 환불</span>
                </div>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>10회 이상 사용</span>
                  <span className={styles.rate}>환불 불가</span>
                </div>
                <p className={styles.note}>
                  * 10회까지는 사용 횟수에 비례하여 차감 후 환불됩니다<br/>
                  * 계산식: 결제금액 - (결제금액 ÷ 20 × 발급받은 횟수)<br/>
                  * 10회부터는 환불이 불가능합니다
                </p>
              </div>
            </div>

            <div className={styles.productPolicy}>
              <h3 className={styles.productName}>이력서 분석 리포트</h3>
              <div className={styles.policyBox}>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>분석 시작 전</span>
                  <span className={styles.rate}>100% 환불</span>
                </div>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>리포트 발송 후</span>
                  <span className={styles.rate}>환불 불가</span>
                </div>
                <p className={styles.note}>
                  * 이력서 분석이 시작되면 환불이 불가능합니다
                </p>
              </div>
            </div>

            <div className={styles.productPolicy}>
              <h3 className={styles.productName}>라이브 인터뷰</h3>
              <div className={styles.policyBox}>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>일정 확정 전</span>
                  <span className={styles.rate}>100% 환불</span>
                </div>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>24시간 전 취소</span>
                  <span className={styles.rate}>50% 환불</span>
                </div>
                <div className={styles.policyRow}>
                  <span className={styles.condition}>24시간 이내 취소</span>
                  <span className={styles.rate}>환불 불가</span>
                </div>
                <p className={styles.note}>
                  * 일정 변경은 1회에 한해 무료로 가능합니다
                </p>
              </div>
            </div>
          </section>

          {/* 환불 절차 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. 환불 절차</h2>
            <div className={styles.processSteps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>환불 요청</h4>
                  <p className={styles.stepDesc}>
                    카카오톡 채널 또는 이메일로 환불 요청
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>요청 검토</h4>
                  <p className={styles.stepDesc}>
                    영업일 기준 24시간 내 검토 및 안내
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>환불 처리</h4>
                  <p className={styles.stepDesc}>
                    승인 시 3-5 영업일 내 환불 완료
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 환불 불가 사유 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. 환불 불가 사유</h2>
            <div className={styles.sectionContent}>
              <ul className={styles.list}>
                <li>디지털 콘텐츠 특성상 이미 제공된 서비스</li>
                <li>고객의 요구에 따라 개인화/커스터마이징된 콘텐츠</li>
                <li>서비스 이용 중 부정행위가 확인된 경우</li>
                <li>환불 요청 기한(7일)이 경과한 경우</li>
              </ul>
            </div>
          </section>

          {/* 특별 환불 정책 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. 특별 환불 정책</h2>
            <div className={styles.specialPolicy}>
              <div className={styles.policyCard}>
                <h4 className={styles.cardTitle}>🎯 품질 보증</h4>
                <p className={styles.cardDesc}>
                  서비스 품질이 현저히 약속과 다른 경우, 증빙 자료 검토 후 전액 환불이 가능합니다
                </p>
              </div>
              <div className={styles.policyCard}>
                <h4 className={styles.cardTitle}>🛡️ 기술적 오류</h4>
                <p className={styles.cardDesc}>
                  시스템 오류로 인해 서비스를 정상적으로 이용하지 못한 경우 전액 환불됩니다
                </p>
              </div>
            </div>
          </section>

          {/* 연락처 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. 문의 및 환불 요청</h2>
            <div className={styles.contactBox}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>카카오톡 채널</span>
                <a
                  href="https://pf.kakao.com/_zxkxmUn/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @querydaily
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>이메일</span>
                <a
                  href="mailto:official.querydaily@gmail.com"
                  className={styles.contactLink}
                >
                  official.querydaily@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>응답 시간</span>
                <span className={styles.contactValue}>
                  평일 09:00 - 18:00 (영업일 기준 24시간 내 답변)
                </span>
              </div>
            </div>
          </section>

          {/* 법적 고지 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. 법적 고지</h2>
            <div className={styles.legalNotice}>
              <p className={styles.paragraph}>
                본 환불 정책은 대한민국 전자상거래 등에서의 소비자보호에 관한 법률을 준수합니다.
                소비자는 전자상거래법에 따른 청약철회 및 환불을 요청할 수 있으며,
                분쟁 발생 시 한국소비자원의 조정을 신청할 수 있습니다.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className={styles.footerActions}>
          <button
            className={styles.primaryBtn}
            onClick={() => router.push('/products')}
          >
            상품 보러가기
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => router.push('/terms')}
          >
            이용약관 보기
          </button>
        </div>
      </div>
    </main>
  );
}