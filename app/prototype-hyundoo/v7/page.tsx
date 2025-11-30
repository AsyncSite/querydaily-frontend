'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function V7Page() {
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <div className={styles.container}>

      {/* Hero - 카피 그대로, CTA만 변경 */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            당신을 합격시킵니다.
          </h1>
          <p className={styles.heroSub}>
            면접 준비, 20일이면 끝.
          </p>

          {/* Dual CTA Strategy */}
          <div className={styles.heroCtas}>
            <button
              className={styles.heroCtaPrimary}
              onClick={() => setShowFreeTrialModal(true)}
            >
              무료로 체험하기
            </button>

            <p className={styles.heroOr}>또는</p>

            <a href="#pricing" className={styles.heroCtaSecondary}>
              이미 확신하신다면? 바로 시작하기 →
            </a>
          </div>
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

      {/* Free Trial Social Proof */}
      <section className={styles.freeTrial}>
        <div className={styles.freeTrialContent}>
          <h2 className={styles.freeTrialTitle}>
            무료로 먼저 체험해보세요
          </h2>
          <p className={styles.freeTrialDesc}>
            질문 3개 + 합격 답변 · 24시간 내 이메일 발송
          </p>

          <div className={styles.freeTrialStats}>
            <div className={styles.freeTrialStat}>
              <div className={styles.freeTrialStatNumber}>1,234</div>
              <div className={styles.freeTrialStatLabel}>명이 무료로 받아갔어요</div>
            </div>
            <div className={styles.freeTrialStat}>
              <div className={styles.freeTrialStatNumber}>4.8/5.0</div>
              <div className={styles.freeTrialStatLabel}>평균 만족도</div>
            </div>
          </div>

          <button
            className={styles.freeTrialCta}
            onClick={() => setShowFreeTrialModal(true)}
          >
            무료로 체험하기
          </button>

          <p className={styles.freeTrialNote}>
            "진짜 제 이력서 질문이라 놀랐습니다" - 백엔드 개발자 K님
          </p>
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

      {/* Price + CTA - 프레이밍 변경 */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingContent}>
          <h2 className={styles.pricingTitle}>체험 없이 바로 시작하시겠어요?</h2>
          <p className={styles.pricingSubtitle}>이미 준비된 분들을 위한 플랜</p>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.planName}>크리티컬 히트</h3>
              <div className={styles.planPrice}>
                <span className={styles.price}>9,900</span>
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
                <span className={styles.price}>49,000</span>
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

      {/* Free Trial Modal */}
      {showFreeTrialModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFreeTrialModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowFreeTrialModal(false)}
            >
              ×
            </button>

            <h2 className={styles.modalTitle}>무료 체험 신청</h2>
            <p className={styles.modalDesc}>
              질문 3개 + 합격 답변을 24시간 내 이메일로 보내드립니다
            </p>

            <form className={styles.freeTrialForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="resume">이력서 업로드 (선택)</label>
                <div className={styles.fileUploadArea}>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          alert('파일 크기는 10MB 이하여야 합니다');
                          e.target.value = '';
                          return;
                        }
                        setResumeFile(file);
                      }
                    }}
                  />
                  <label htmlFor="resume" className={styles.fileUploadBox}>
                    {resumeFile ? (
                      <>
                        <span className={styles.uploadedIcon}>✓</span>
                        <span className={styles.uploadedFileName}>{resumeFile.name}</span>
                        <span className={styles.uploadedSize}>
                          ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.uploadIcon}>📄</span>
                        <span className={styles.uploadText}>PDF 파일을 선택하세요</span>
                        <span className={styles.uploadHint}>최대 10MB · 더 정확한 질문 생성</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="role">현재 직무 (선택)</label>
                <select id="role">
                  <option value="">선택해주세요</option>
                  <option value="backend">백엔드 개발자</option>
                  <option value="frontend">프론트엔드 개발자</option>
                  <option value="fullstack">풀스택 개발자</option>
                  <option value="devops">DevOps/인프라</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">경력 (선택)</label>
                <select id="experience">
                  <option value="">선택해주세요</option>
                  <option value="0">신입</option>
                  <option value="1-3">1-3년</option>
                  <option value="3-5">3-5년</option>
                  <option value="5+">5년 이상</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="worry">가장 걱정되는 면접 질문이 있다면? (선택)</label>
                <textarea
                  id="worry"
                  placeholder="예: Redis를 왜 사용했는지 물어보면 대답을 못할 것 같아요"
                  rows={3}
                />
              </div>

              <button type="submit" className={styles.formSubmit}>
                무료로 받기
              </button>

              <p className={styles.formNote}>
                * 필수 항목 · 이력서를 업로드하시면 훨씬 정확한 맞춤 질문을 받으실 수 있습니다
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
