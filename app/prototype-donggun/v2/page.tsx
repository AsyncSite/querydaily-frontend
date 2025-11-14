'use client';

import { useEffect, useState } from 'react';
import './styles.css';

export default function V2Page() {
  const [activeComparison, setActiveComparison] = useState<'general' | 'querydaily'>('general');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="v2-container">
      {/* Header */}
      <header className="v2-header">
        <div className="v2-header-content">
          <div className="v2-logo">
            <span className="v2-logo-text">Query</span>
            <span className="v2-logo-accent">Daily</span>
          </div>
          <nav className="v2-nav">
            <a href="#solution">솔루션</a>
            <a href="#how">사용 방법</a>
            <a href="#pricing">가격</a>
            <a href="#pricing" className="v2-nav-cta">시작하기</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="v2-hero">
        <div className="v2-hero-content">
          <h1 className="v2-main-title">
            면접관이 물을 질문,<br />
            <span className="v2-highlight">미리 알고 가세요</span>
          </h1>
          <p className="v2-subtitle">
            당신의 이력서로 면접 질문을 예측합니다
          </p>
          <p className="v2-sub-description">
            100명이 넘는 개발자가 합격을 준비하고 있습니다
          </p>
          <a href="#pricing" className="v2-cta-button">
            시작하기
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="v2-section v2-problem-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('problem') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">이런 고민, 하고 계신가요?</h2>
          <div className="v2-problem-grid">
            <div className="v2-problem-card">
              <div className="v2-problem-icon">😰</div>
              <h3 className="v2-problem-title">프로젝트 경험은 있는데<br />설명을 못 하겠어요</h3>
              <p className="v2-problem-description">
                기술은 아는데 말로 정리가 안 됨
              </p>
            </div>
            <div className="v2-problem-card">
              <div className="v2-problem-icon">🤖</div>
              <h3 className="v2-problem-title">ChatGPT 답변은<br />너무 일반적이에요</h3>
              <p className="v2-problem-description">
                내 이력서와 무관한 일반론
              </p>
            </div>
            <div className="v2-problem-card">
              <div className="v2-problem-icon">🎯</div>
              <h3 className="v2-problem-title">면접에서 뭘 물어볼지<br />예측이 안 돼요</h3>
              <p className="v2-problem-description">
                범위가 너무 넓어서 불안함
              </p>
            </div>
          </div>
          <p className="v2-empathy-message">
            당신만 그런 게 아닙니다.<br />
            <strong>87%의 개발자가 같은 고민</strong>을 합니다.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="v2-section v2-solution-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('solution') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">QueryDaily는 다릅니다</h2>
          <p className="v2-section-subtitle">
            일반 면접 준비와 무엇이 다른지 직접 비교해보세요
          </p>

          <div className="v2-toggle-container">
            <button
              className={`v2-toggle-button ${activeComparison === 'general' ? 'active' : ''}`}
              onClick={() => setActiveComparison('general')}
            >
              일반 면접 준비
            </button>
            <button
              className={`v2-toggle-button ${activeComparison === 'querydaily' ? 'active' : ''}`}
              onClick={() => setActiveComparison('querydaily')}
            >
              QueryDaily
            </button>
          </div>

          <div className="v2-comparison-display">
            {activeComparison === 'general' ? (
              <div className="v2-comparison-panel">
                <div className="v2-comparison-label">
                  <span className="v2-label-icon">❌</span>
                  <span>일반 면접 준비</span>
                </div>
                <div className="v2-question-list">
                  <div className="v2-question-item">
                    "Spring Boot의 장점은 무엇인가요?"
                  </div>
                  <div className="v2-question-item">
                    "RESTful API를 설명해주세요"
                  </div>
                  <div className="v2-question-item">
                    "데이터베이스 인덱스란?"
                  </div>
                </div>
                <div className="v2-verdict">
                  <span className="v2-verdict-icon">😰</span>
                  <span>결과: 외우기식 답변, 막연한 불안</span>
                </div>
              </div>
            ) : (
              <div className="v2-comparison-panel">
                <div className="v2-comparison-label positive">
                  <span className="v2-label-icon">✅</span>
                  <span>QueryDaily</span>
                </div>
                <div className="v2-question-list">
                  <div className="v2-question-item">
                    "3번 프로젝트에서 Spring Boot를 선택한 이유는? Django가 아닌 이유는?"
                  </div>
                  <div className="v2-question-item">
                    "상품 API에서 페이지네이션을 어떻게 구현하셨나요?"
                  </div>
                  <div className="v2-question-item">
                    "user_orders 테이블에 왜 복합 인덱스를 설정하셨나요?"
                  </div>
                </div>
                <div className="v2-verdict positive">
                  <span className="v2-verdict-icon">🎯</span>
                  <span>결과: 내 경험으로 답변, 구체적 준비</span>
                </div>
              </div>
            )}
          </div>

          <div className="v2-difference-grid">
            <div className="v2-difference-card">
              <div className="v2-difference-number">1</div>
              <h3 className="v2-difference-title">이력서 기반 예측</h3>
              <p className="v2-difference-description">
                당신의 경험, 당신의 기술로 질문을 만듭니다
              </p>
            </div>
            <div className="v2-difference-card">
              <div className="v2-difference-number">2</div>
              <h3 className="v2-difference-title">STAR 기법 가이드</h3>
              <p className="v2-difference-description">
                경험을 구조화해서 답변하는 방법을 알려드립니다
              </p>
            </div>
            <div className="v2-difference-card">
              <div className="v2-difference-number">3</div>
              <h3 className="v2-difference-title">매일 자동 발송</h3>
              <p className="v2-difference-description">
                하루 10분, 매일 연습하면 자연스럽게 준비됩니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section id="how" className="v2-section v2-how-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('how') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">3단계로 시작하세요</h2>
          <p className="v2-section-subtitle">
            복잡하지 않습니다. 간단한 3단계만 거치면 됩니다
          </p>

          <div className="v2-steps-grid">
            <div className="v2-step-card">
              <div className="v2-step-number">1</div>
              <div className="v2-step-icon">📄</div>
              <h3 className="v2-step-title">이력서 업로드</h3>
              <p className="v2-step-description">
                PDF 또는 텍스트로 업로드<br />
                당신의 경험을 AI가 읽습니다
              </p>
              <span className="v2-step-time">1분 소요</span>
            </div>
            <div className="v2-step-card">
              <div className="v2-step-number">2</div>
              <div className="v2-step-icon">🔮</div>
              <h3 className="v2-step-title">질문 예측</h3>
              <p className="v2-step-description">
                이력서 기반 맞춤 질문 생성<br />
                면접관이 물을 질문을 예측합니다
              </p>
              <span className="v2-step-time">AI 자동 분석</span>
            </div>
            <div className="v2-step-card">
              <div className="v2-step-number">3</div>
              <div className="v2-step-icon">💪</div>
              <h3 className="v2-step-title">매일 연습</h3>
              <p className="v2-step-description">
                오전 7시, 저녁 5시 자동 발송<br />
                STAR 기법으로 답변을 준비합니다
              </p>
              <span className="v2-step-time">하루 10분</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="v2-section v2-proof-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('proof') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">실제로 효과가 있습니다</h2>

          <div className="v2-stats-grid">
            <div className="v2-stat-card">
              <div className="v2-stat-number">5.0</div>
              <div className="v2-stat-label">평균 만족도 / 5.0</div>
            </div>
            <div className="v2-stat-card">
              <div className="v2-stat-number">100%</div>
              <div className="v2-stat-label">추천 의향</div>
            </div>
            <div className="v2-stat-card">
              <div className="v2-stat-number">20개</div>
              <div className="v2-stat-label">예상 질문 평균</div>
            </div>
          </div>

          <div className="v2-testimonial-grid">
            <div className="v2-testimonial-card">
              <span className="v2-testimonial-badge">Before</span>
              <p className="v2-testimonial-text">
                "Redis는 왜 쓰냐는 질문에 막혔어요"
              </p>
              <div className="v2-testimonial-after">
                <span className="v2-after-badge">After</span>
                <p className="v2-after-text">
                  "예측한 질문이 실제로 나와서 술술 답했어요"
                </p>
              </div>
            </div>
            <div className="v2-testimonial-card">
              <span className="v2-testimonial-badge">Before</span>
              <p className="v2-testimonial-text">
                "일반론만 외워서 면접관 눈치가 보였어요"
              </p>
              <div className="v2-testimonial-after">
                <span className="v2-after-badge">After</span>
                <p className="v2-after-text">
                  "내 경험으로 답하니까 자신감이 생겼어요"
                </p>
              </div>
            </div>
            <div className="v2-testimonial-card">
              <span className="v2-testimonial-badge">Before</span>
              <p className="v2-testimonial-text">
                "뭘 준비해야 할지 몰라서 불안했어요"
              </p>
              <div className="v2-testimonial-after">
                <span className="v2-after-badge">After</span>
                <p className="v2-after-text">
                  "매일 10분씩 준비하니까 면접이 기대돼요"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="v2-section v2-pricing-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('pricing') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">당신에게 맞는 방법을 선택하세요</h2>

          <div className="v2-pricing-grid">
            {/* Critical Hit */}
            <div className="v2-pricing-card">
              <span className="v2-pricing-badge">빠른 경험</span>
              <h3 className="v2-pricing-name">크리티컬 히트</h3>
              <p className="v2-pricing-tagline">핵심만 빠르게 경험하고 싶다면</p>
              <div className="v2-pricing-price">
                <span className="v2-price">₩9,900</span>
              </div>
              <ul className="v2-feature-list">
                <li><span className="v2-check-icon">✓</span> 핵심 3질문 예측</li>
                <li><span className="v2-check-icon">✓</span> STAR 기법 가이드</li>
                <li><span className="v2-check-icon">✓</span> 24시간 내 발송</li>
              </ul>
              <button className="v2-pricing-button">시작하기</button>
              <p className="v2-pricing-target">일단 경험해보고 싶어요</p>
            </div>

            {/* Growth Plan */}
            <div className="v2-pricing-card v2-featured">
              <span className="v2-pricing-badge v2-popular">MOST POPULAR</span>
              <h3 className="v2-pricing-name">그로스 플랜</h3>
              <p className="v2-pricing-tagline">제대로 준비하고 싶다면</p>
              <div className="v2-pricing-price">
                <span className="v2-price">₩49,000</span>
                <span className="v2-original-price">₩99,000</span>
              </div>
              <ul className="v2-feature-list">
                <li><span className="v2-check-icon">✓</span> 20일간 매일 질문 (총 20개)</li>
                <li><span className="v2-check-icon">✓</span> STAR 기법 가이드</li>
                <li><span className="v2-check-icon">✓</span> 꼬리 질문 대비 팁</li>
                <li><span className="v2-check-icon">✓</span> 오전 7시, 저녁 5시 발송</li>
              </ul>
              <button className="v2-pricing-button v2-featured">시작하기</button>
              <p className="v2-pricing-target">제대로 준비하고 싶어요</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="v2-section v2-faq-section" data-animate>
        <div className={`v2-section-container ${visibleSections.has('faq') ? 'visible' : ''}`}>
          <h2 className="v2-section-title">자주 묻는 질문</h2>

          <div className="v2-faq-list">
            <details className="v2-faq-item">
              <summary className="v2-faq-question">
                이력서 기반 예측이 정확한가요?
                <span className="v2-faq-icon">+</span>
              </summary>
              <div className="v2-faq-answer">
                네, QueryDaily는 당신의 이력서에 있는 <strong>실제 프로젝트와 기술 스택</strong>을 분석하여
                면접관이 물을 가능성이 높은 질문을 예측합니다. 일반적인 질문이 아닌,
                <strong>당신의 경험을 깊이 있게 파고드는 질문</strong>을 제공합니다.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary className="v2-faq-question">
                ChatGPT랑 뭐가 다른가요?
                <span className="v2-faq-icon">+</span>
              </summary>
              <div className="v2-faq-answer">
                ChatGPT는 일반적인 답변을 제공하지만, QueryDaily는 <strong>당신의 이력서를 분석</strong>하여
                맞춤 질문을 생성하고, <strong>STAR 기법</strong>으로 구조화된 답변 가이드를 제공합니다.
                매일 자동으로 발송되어 꾸준한 연습이 가능합니다.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary className="v2-faq-question">
                STAR 기법이 뭔가요?
                <span className="v2-faq-icon">+</span>
              </summary>
              <div className="v2-faq-answer">
                STAR 기법은 <strong>Situation(상황), Task(과제), Action(행동), Result(결과)</strong>의
                구조로 경험을 설명하는 면접 답변 기법입니다. 이 구조를 따르면
                <strong>논리적이고 설득력 있는 답변</strong>을 할 수 있습니다.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary className="v2-faq-question">
                환불 정책은 어떻게 되나요?
                <span className="v2-faq-icon">+</span>
              </summary>
              <div className="v2-faq-answer">
                크리티컬 히트: 발송 전 100% 환불 가능<br />
                그로스 플랜: 첫 질문 발송 전 100% 환불, 이후 남은 일수에 대해 일할 계산하여 환불해드립니다.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary className="v2-faq-question">
                어떤 기술 스택을 다루나요?
                <span className="v2-faq-icon">+</span>
              </summary>
              <div className="v2-faq-answer">
                Spring, Node.js, Django, FastAPI 등 주요 백엔드 프레임워크와
                MySQL, PostgreSQL, MongoDB, Redis 등 데이터베이스,
                그리고 AWS, Docker, Kubernetes 등 인프라 기술까지
                <strong>당신의 이력서에 있는 모든 기술</strong>을 다룹니다.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="v2-footer">
        <div className="v2-footer-container">
          <div className="v2-footer-content">
            <div className="v2-footer-brand">
              <div className="v2-footer-logo">
                Query<span>Daily</span>
              </div>
              <p className="v2-footer-tagline">
                면접 준비의 모든 것
              </p>
            </div>
            <div className="v2-footer-links">
              <div className="v2-footer-section">
                <h4>서비스</h4>
                <a href="#solution">솔루션</a>
                <a href="#how">사용 방법</a>
                <a href="#pricing">가격</a>
              </div>
              <div className="v2-footer-section">
                <h4>문의</h4>
                <a href="https://pf.kakao.com/_hWMtn/chat" target="_blank" rel="noopener noreferrer">카카오톡</a>
                <a href="mailto:official.querydaily@gmail.com">이메일</a>
              </div>
            </div>
          </div>
          <div className="v2-footer-bottom">
            <p>© 2025 QueryDaily by AsyncSite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
