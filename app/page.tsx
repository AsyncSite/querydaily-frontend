'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function V7Page() {
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    experience: '',
    worry: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const mapExperienceToCareerLevel = (experience: string): string => {
    switch (experience) {
      case '0':
      case '1-3':
        return 'JUNIOR';
      case '3-5':
        return 'MIDDLE';
      case '5+':
        return 'SENIOR';
      default:
        return 'JUNIOR';
    }
  };

  const mapRoleToTechStack = (role: string): string[] => {
    switch (role) {
      case 'backend':
        return ['Backend', 'Java', 'Spring'];
      case 'frontend':
        return ['Frontend', 'React', 'JavaScript'];
      case 'fullstack':
        return ['Backend', 'Frontend'];
      case 'devops':
        return ['DevOps', 'AWS', 'Docker'];
      default:
        return ['Development'];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이력서 필수 체크
    if (!resumeFile) {
      setSubmitResult({
        success: false,
        message: '이력서를 업로드해주세요.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const leadData = {
        email: formData.email,
        name: formData.name,
        profile: {
          careerLevel: mapExperienceToCareerLevel(formData.experience),
          techStack: mapRoleToTechStack(formData.role),
          timezone: 'Asia/Seoul',
          worry: formData.worry || null
        }
      };

      // FormData로 multipart/form-data 전송
      const formDataToSend = new FormData();
      formDataToSend.append('lead', new Blob([JSON.stringify(leadData)], { type: 'application/json' }));

      // 이력서 파일이 있으면 추가
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/query-daily/leads`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({ email: '', name: '', role: '', experience: '', worry: '' });
        setResumeFile(null);
        setSubmitResult(null);
        // 모달 닫기
        setShowFreeTrialModal(false);
        // 토스트 표시
        setToastMessage('신청이 완료되었습니다! 48시간 내 이메일을 확인해주세요.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } else {
        // 에러 코드에 따른 메시지 처리
        let errorMessage = '신청에 실패했습니다. 다시 시도해주세요.';
        if (data.errorCode === 'TRIAL_ALREADY_USED') {
          errorMessage = '이미 등록된 이메일입니다. 다른 이메일로 시도해주세요.';
        } else if (data.message) {
          errorMessage = data.message;
        }
        setSubmitResult({
          success: false,
          message: errorMessage
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll(`.${styles.animateOnScroll}`);
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>

      {/* Hero - 카피 그대로, CTA만 변경 */}
      <section className={styles.hero}>
        {/* Decorative floating elements */}
        <div className={styles.heroDecorations}>
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorCircle3}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            73명이 이미 시작했어요
          </div>

          <h1 className={styles.heroTitle}>
            합격을 만듭니다.
          </h1>
          <p className={styles.heroSub}>
            이력서 기반 면접 준비, 20일이면 끝.
          </p>

          {/* Dual CTA Strategy */}
          <div className={styles.heroCtas}>
            <button
              className={`${styles.heroCtaPrimary} ${styles.ctaPulse}`}
              onClick={() => setShowFreeTrialModal(true)}
            >
              무료로 체험하기
            </button>
            <p className={styles.ctaSubtext}>카드 등록 없이 바로 시작</p>

            <p className={styles.heroOr}>또는</p>

            <a href="#pricing" className={styles.heroCtaSecondary}>
              상품 보러가기 →
            </a>
          </div>
        </div>
      </section>

      {/* How - 2-3줄만 */}
      <section className={styles.how}>
        <div className={styles.howContent}>
          <div className={`${styles.howItem} ${styles.animateOnScroll}`}>
            <div className={styles.howIconWrapper}>
              <svg className={styles.howIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span className={styles.howNumber}>1</span>
            <p className={styles.howText}>매일 이력서 기반 질문<br />+ 합격 답변</p>
          </div>
          <div className={styles.howConnector}></div>
          <div className={`${styles.howItem} ${styles.animateOnScroll}`} style={{ transitionDelay: '0.1s' }}>
            <div className={styles.howIconWrapper}>
              <svg className={styles.howIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M8 14h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 18h.01"></path>
                <path d="M12 18h.01"></path>
              </svg>
            </div>
            <span className={styles.howNumber}>2</span>
            <p className={styles.howText}>20일이면 완료</p>
          </div>
          <div className={styles.howConnector}></div>
          <div className={`${styles.howItem} ${styles.animateOnScroll}`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles.howIconWrapper}>
              <svg className={styles.howIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <span className={styles.howNumber}>3</span>
            <p className={styles.howText}>하루 10분</p>
          </div>
        </div>
      </section>

      {/* What - 핵심 3개 */}
      <section className={styles.what}>
        <div className={styles.whatContent}>
          <h2 className={`${styles.whatTitle} ${styles.animateOnScroll}`}>제공 서비스</h2>
          <div className={styles.whatList}>
            <div className={`${styles.whatItem} ${styles.animateOnScroll}`}>
              <div className={styles.whatIconBox}>
                <svg className={styles.whatSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div>
                <h3 className={styles.whatItemTitle}>진짜 질문</h3>
                <p className={styles.whatItemDesc}>이력서 기반 맞춤 질문</p>
              </div>
            </div>
            <div className={`${styles.whatItem} ${styles.animateOnScroll}`} style={{ transitionDelay: '0.1s' }}>
              <div className={styles.whatIconBox}>
                <svg className={styles.whatSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className={styles.whatItemTitle}>합격하는 답변</h3>
                <p className={styles.whatItemDesc}>실제 합격자 패턴</p>
              </div>
            </div>
            <div className={`${styles.whatItem} ${styles.animateOnScroll}`} style={{ transitionDelay: '0.2s' }}>
              <div className={styles.whatIconBox}>
                <svg className={styles.whatSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
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
            질문 1개 + 합격 답변 · 48시간 내 이메일 발송
          </p>

          <div className={styles.freeTrialStats}>
            <div className={styles.freeTrialStat}>
              <div className={styles.freeTrialStatNumber}>73</div>
              <div className={styles.freeTrialStatLabel}>명이 무료로 받아갔어요</div>
            </div>
            <div className={styles.freeTrialStat}>
              <div className={styles.freeTrialStatNumber}>5.0/5.0</div>
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
            "진짜 제 이력서 질문이라 놀랐습니다" <br className={styles.mobileBreak} />- 1년차 백엔드 개발자 K님
          </p>
        </div>
      </section>

      {/* Proof - 후기 섹션 */}
      <section className={styles.proof}>
        <div className={styles.proofContent}>
          <div className={styles.proofHeader}>
            <div className={styles.proofScore}>5.0/5.0</div>
            <p className={styles.proofText}>실제 사용자 만족도</p>
          </div>

          <div className={styles.reviewGrid}>
            <div className={styles.reviewCard}>
              <p className={styles.reviewText}>
                "이거 하고 붙었어요. 진짜 제 이력서 질문이라 놀랐습니다."
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>K님</span>
                <span className={styles.reviewRole}>1년차 백엔드 개발자</span>
              </div>
            </div>

            <div className={styles.reviewCard}>
              <p className={styles.reviewText}>
                "면접 전날 급하게 신청했는데, 실제로 비슷한 질문이 나왔어요."
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>L님</span>
                <span className={styles.reviewRole}>3년차 프론트엔드 개발자</span>
              </div>
            </div>

            <div className={styles.reviewCard}>
              <p className={styles.reviewText}>
                "답변 가이드가 진짜 도움됐어요. 어떻게 말해야 할지 감이 잡혔습니다."
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>P님</span>
                <span className={styles.reviewRole}>신입 풀스택 개발자</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price + CTA - 프레이밍 변경 */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingContent}>
          <h2 className={styles.pricingTitle}>체험 없이 <br className={styles.mobileBreak} />바로 시작하시겠어요?</h2>
          <p className={styles.pricingSubtitle}>이미 준비된 분들을 위한 플랜</p>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.planName}>크리티컬 히트</h3>
              <div className={styles.planPrice}>
                <span className={styles.originalPrice}>15,900원</span>
                <span className={styles.price}>9,900</span>
                <span className={styles.currency}>원</span>
              </div>
              <p className={styles.planDesc}>핵심만 빠르게</p>
              <ul className={styles.planFeatures}>
                <li>질문 3개 + 답변 가이드</li>
                <li>이력서 기반 맞춤 질문</li>
                <li>합격자 답변 패턴 포함</li>
                <li>48시간 내 이메일 발송</li>
              </ul>
              <a href="/products/critical-hit" className={styles.planCta}>선택하기</a>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.featuredBadge}>인기</div>
              <h3 className={styles.planName}>그로스 플랜</h3>
              <div className={styles.planPrice}>
                <span className={styles.originalPrice}>106,000원</span>
                <span className={styles.price}>49,000</span>
                <span className={styles.currency}>원</span>
              </div>
              <p className={styles.planDesc}>완벽하게 준비하고 싶다면</p>
              <ul className={styles.planFeatures}>
                <li>20일 x 질문 & 답변 1개 (총 20개)</li>
                <li>꼬리질문 대비</li>
                <li>빅테크/유니콘 기업 답변 가이드</li>
                <li>상세 해설 포함</li>
              </ul>
              <a href="/products/growth-plan" className={styles.planCta}>선택하기</a>
            </div>
          </div>
        </div>
      </section>

      {/* 무료 체험 재강조 섹션 */}
      <section className={styles.freeTrialReassurance}>
        <div className={styles.reassuranceContent}>
          <div className={styles.reassuranceIcon}>💡</div>
          <h2 className={styles.reassuranceTitle}>아직 확신이 서지 않으신가요?</h2>
          <p className={styles.reassuranceText}>
            괜찮습니다. 부담 갖지 마세요.<br />
            먼저 무료로 경험해보고 결정하셔도 됩니다.
          </p>
          <div className={styles.reassurancePerks}>
            <span className={styles.reassurancePerk}>✓ 신용카드 불필요</span>
            <span className={styles.reassurancePerk}>✓ 48시간 내 발송</span>
            <span className={styles.reassurancePerk}>✓ 질문 1개 + 합격 답변</span>
          </div>
          <button
            className={styles.reassuranceCta}
            onClick={() => setShowFreeTrialModal(true)}
          >
            무료로 먼저 체험하기
          </button>
          <p className={styles.reassuranceNote}>
            이미 73명이 무료로 시작했습니다
          </p>
        </div>
      </section>

      {/* Footer - 최소한 */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="https://velog.io/@querydaily/posts" target="_blank" rel="noopener noreferrer">Velog</a>
          <a href="https://www.threads.com/@querydaily.official" target="_blank" rel="noopener noreferrer">Threads</a>
        </div>
        <p>© 2025 QueryDaily. All rights reserved.</p>
        <p className={styles.footerBiz}>사업자등록번호: 456-12-02771 | 대표: 최보임</p>
      </footer>

      {/* Floating CTA Bar - Full Width */}
      <div className={styles.floatingCtaBar}>
        <div className={styles.floatingCtaBarInner}>
          <div className={styles.floatingCtaLeft}>
            <span className={styles.floatingCtaIcon}>🔥</span>
            <span className={styles.floatingCtaCount}>73명이 지금 체험 중</span>
          </div>
          <button
            className={styles.floatingCtaButton}
            onClick={() => setShowFreeTrialModal(true)}
          >
            무료 체험하기
          </button>
        </div>
      </div>

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
              질문 1개 + 답변을 48시간 내 이메일로 보내드립니다
            </p>

            <form className={styles.freeTrialForm} onSubmit={handleSubmit}>
              {submitResult && (
                <div className={submitResult.success ? styles.successMessage : styles.errorMessage}>
                  {submitResult.message}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="resume">이력서 업로드 *</label>
                <div className={styles.fileUploadArea}>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    required
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
                        <span className={styles.uploadHint}>최대 10MB</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="role">현재 직무 *</label>
                <select id="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="">선택해주세요</option>
                  <option value="backend">백엔드 개발자</option>
                  <option value="frontend">프론트엔드 개발자</option>
                  <option value="fullstack">풀스택 개발자</option>
                  <option value="devops">DevOps/인프라</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">경력 *</label>
                <select id="experience" value={formData.experience} onChange={handleInputChange} required>
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
                  value={formData.worry}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className={styles.formSubmit} disabled={isSubmitting}>
                {isSubmitting ? '신청 중...' : '무료로 받기'}
              </button>

              <p className={styles.formNote}>
                * 필수 항목
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}

    </div>
  );
}
