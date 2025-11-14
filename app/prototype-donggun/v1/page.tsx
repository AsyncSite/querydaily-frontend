'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

export default function V1Page() {
  const router = useRouter();
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTimeout(() => setIsTextVisible(true), 300);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) {
              setVisibleSections(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="v1-container">
      {/* Header */}
      <header className="v1-header">
        <div className="v1-header-content">
          <div className="v1-logo">
            <span className="v1-logo-text">Query</span>
            <span className="v1-logo-accent">Daily</span>
          </div>
          <nav className="v1-nav">
            <a href="#difference">차별점</a>
            <a href="#how">사용방법</a>
            <a href="#pricing">가격</a>
            <a href="#pricing" className="v1-nav-cta">시작하기</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="v1-hero">
        <div className="v1-hero-bg"></div>
        <div className="v1-hero-center">
          <h1 className={`v1-main-headline ${isTextVisible ? 'visible' : ''}`}>
            내일의 질문, <span className="v1-highlight-text">오늘 답하기</span>
          </h1>
        </div>
        <div className="v1-hero-bottom">
          <p className={`v1-sub-headline ${isTextVisible ? 'visible' : ''}`}>
            면접관이 묻기 전에 미리 준비합니다
          </p>
          <p className={`v1-hero-desc ${isTextVisible ? 'visible' : ''}`}>
            <strong>하루 10분, 이력서 기반 맞춤 질문</strong>으로<br />
            면접에서 흔들리지 않는 자신감을 만듭니다
          </p>
          <a href="#pricing" className={`v1-hero-cta ${isTextVisible ? 'visible' : ''}`}>
            내일의 질문 받아보기 →
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="v1-stats-bar">
        <div className="v1-stats-content">
          <div className="v1-stat-item-bar">
            <div className="v1-stat-num-bar">2025년</div>
            <div className="v1-stat-label-bar">서비스 시작</div>
          </div>
          <div className="v1-stat-divider-bar"></div>
          <div className="v1-stat-item-bar">
            <div className="v1-stat-num-bar">5.0/5.0</div>
            <div className="v1-stat-label-bar">사용자 만족도</div>
          </div>
          <div className="v1-stat-divider-bar"></div>
          <div className="v1-stat-item-bar">
            <div className="v1-stat-num-bar">24시간 이내</div>
            <div className="v1-stat-label-bar">첫 질문 발송</div>
          </div>
          <div className="v1-stat-divider-bar"></div>
          <div className="v1-stat-item-bar">
            <div className="v1-stat-num-bar">100%</div>
            <div className="v1-stat-label-bar">환불 보장</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="v1-value-section">
        <div className="v1-value-container">
          <span className="v1-badge">핵심 가치</span>
          <h2 className="v1-value-title">
            이미 경험한 것을<br />
            질문으로 만듭니다
          </h2>
          <p className="v1-value-desc">
            당신의 이력서에는 프로젝트 경험이 있습니다.<br />
            면접관은 그 경험을 질문으로 파고듭니다.<br />
            <strong>QueryDaily는 그 질문을 미리 예측합니다.</strong>
          </p>
        </div>
      </section>

      {/* Difference Section - Side by Side */}
      <section id="difference" className="v1-diff-section" data-section="difference">
        <div className={`v1-diff-container ${visibleSections.has('difference') ? 'visible' : ''}`}>
          <div className="v1-section-header">
            <span className="v1-badge">핵심 차별점</span>
            <h2 className="v1-section-title">일반 질문 vs 이력서 기반 질문</h2>
            <p className="v1-section-subtitle">
              ChatGPT는 일반론을 말합니다. QueryDaily는 당신의 경험을 묻습니다.
            </p>
          </div>

          <div className="v1-comparison-grid">
            {/* 일반 질문 */}
            <div className="v1-comp-card">
              <div className="v1-comp-header">
                <span className="v1-comp-icon">❌</span>
                <h3>일반 질문</h3>
              </div>
              <div className="v1-comp-questions">
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num">Q1</span>
                  <p>Spring Boot의 장점을 설명해주세요</p>
                </div>
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num">Q2</span>
                  <p>RESTful API란 무엇인가요?</p>
                </div>
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num">Q3</span>
                  <p>데이터베이스 인덱스를 설명해주세요</p>
                </div>
              </div>
              <div className="v1-comp-footer">
                <p>😕 누구에게나 똑같은 질문<br />→ 일반론 암기</p>
              </div>
            </div>

            {/* 이력서 기반 질문 */}
            <div className="v1-comp-card positive">
              <div className="v1-comp-header positive">
                <span className="v1-comp-icon">✅</span>
                <h3>이력서 기반 질문</h3>
              </div>
              <div className="v1-comp-questions">
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num positive">Q1</span>
                  <p>상품 검색 API에서 Elasticsearch를 도입한 구체적인 이유는? 어떤 성능 지표가 개선되었나요?</p>
                </div>
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num positive">Q2</span>
                  <p>결제 시스템에서 동시성 이슈를 어떻게 해결했나요? 비관적 락과 낙관적 락 중 어떤 것을 선택했고 그 이유는?</p>
                </div>
                <div className="v1-comp-q-item">
                  <span className="v1-comp-q-num positive">Q3</span>
                  <p>user_orders 테이블에 복합 인덱스 (user_id, created_at)를 설계한 근거는? 다른 조합은 고려하지 않았나요?</p>
                </div>
              </div>
              <div className="v1-comp-footer positive">
                <p>🎯 당신만의 경험<br />→ STAR 기법 답변</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="v1-how-section" data-section="how">
        <div className={`v1-how-container ${visibleSections.has('how') ? 'visible' : ''}`}>
          <div className="v1-section-header">
            <span className="v1-badge">3단계 프로세스</span>
            <h2 className="v1-section-title">간단합니다</h2>
          </div>

          <div className="v1-timeline-horizontal">
            <div className="v1-timeline-step">
              <div className="v1-timeline-num">1</div>
              <div className="v1-timeline-content">
                <h3>이력서 분석</h3>
                <p>당신의 프로젝트 경험을<br />AI가 분석합니다</p>
              </div>
            </div>

            <div className="v1-timeline-arrow">→</div>

            <div className="v1-timeline-step">
              <div className="v1-timeline-num">2</div>
              <div className="v1-timeline-content">
                <h3>질문 예측</h3>
                <p>면접관이 물을 질문을<br />미리 생성합니다</p>
              </div>
            </div>

            <div className="v1-timeline-arrow">→</div>

            <div className="v1-timeline-step">
              <div className="v1-timeline-num">3</div>
              <div className="v1-timeline-content">
                <h3>매일 연습</h3>
                <p>STAR 기법 가이드로<br />답변을 준비합니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Testimonials */}
      <section className="v1-proof-section" data-section="proof">
        <div className={`v1-proof-container ${visibleSections.has('proof') ? 'visible' : ''}`}>
          <div className="v1-section-header">
            <span className="v1-badge">실제 사용자 후기</span>
            <h2 className="v1-section-title">예측이 맞았습니다</h2>
          </div>

          <div className="v1-before-after-grid">
            <div className="v1-ba-card">
              <div className="v1-ba-header before">
                <span className="v1-ba-icon">❌</span>
                <h4>QueryDaily 사용 전</h4>
              </div>
              <ul className="v1-ba-list">
                <li>"면접에서 뭐 물어볼지 모르겠어요"</li>
                <li>"이력서에 쓴 건데 설명 못했어요"</li>
                <li>"준비는 했는데 불안해요"</li>
                <li>"ChatGPT로 연습했는데 도움 안 됐어요"</li>
              </ul>
            </div>

            <div className="v1-ba-arrow">→</div>

            <div className="v1-ba-card">
              <div className="v1-ba-header after">
                <span className="v1-ba-icon">✅</span>
                <h4>QueryDaily 사용 후</h4>
              </div>
              <ul className="v1-ba-list positive">
                <li>"예상 질문이 실제로 나왔어요!"</li>
                <li>"내 경험을 논리적으로 설명할 수 있어요"</li>
                <li>"면접장에서 떨지 않았어요"</li>
                <li>"매일 10분으로 습관이 됐어요"</li>
              </ul>
            </div>
          </div>

          <div className="v1-stats-simple">
            <div className="v1-stat-box">
              <div className="v1-stat-num">5.0/5.0</div>
              <div className="v1-stat-label">평균 만족도</div>
            </div>
            <div className="v1-stat-box">
              <div className="v1-stat-num">100%</div>
              <div className="v1-stat-label">추천 의향</div>
            </div>
            <div className="v1-stat-box">
              <div className="v1-stat-num">하루 10분</div>
              <div className="v1-stat-label">준비 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="v1-pricing-section" data-section="pricing">
        <div className={`v1-pricing-container ${visibleSections.has('pricing') ? 'visible' : ''}`}>
          <div className="v1-section-header">
            <span className="v1-badge">시작하기</span>
            <h2 className="v1-section-title">내일을 오늘 준비하세요</h2>
          </div>

          <div className="v1-pricing-grid">
            {/* 그로스 플랜 - Featured */}
            <div className="v1-price-card featured">
              <div className="v1-card-badge popular">MOST POPULAR</div>
              <h3 className="v1-card-title">그로스 플랜</h3>
              <p className="v1-card-subtitle">20일간 모든 질문 예측</p>

              <div className="v1-card-desc">
                이력서의 모든 경험을 질문으로 예측합니다.<br />
                20일간 매일 답을 준비하세요
              </div>

              <div className="v1-features">
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>매일 오전 7시, 저녁 5시 발송</span>
                </div>
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>총 20개 맞춤 질문 (20일간)</span>
                </div>
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>모든 질문에 STAR 기법 가이드</span>
                </div>
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>꼬리 질문 대비 팁</span>
                </div>
              </div>

              <div className="v1-price-box">
                <span className="v1-price">₩49,000</span>
                <span className="v1-price-orig">정가 ₩106,000</span>
              </div>

              <button className="v1-buy-btn featured" onClick={() => router.push('/products/growth-plan')}>
                본격적으로 준비하기
              </button>
            </div>

            {/* 크리티컬 히트 */}
            <div className="v1-price-card">
              <div className="v1-card-badge">빠른 경험</div>
              <h3 className="v1-card-title">크리티컬 히트</h3>
              <p className="v1-card-subtitle">핵심 3질문 예측</p>

              <div className="v1-card-desc">
                가장 중요한 3가지 질문을 예측합니다.<br />
                오늘 답을 준비하세요
              </div>

              <div className="v1-features">
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>핵심 질문 3개 예측</span>
                </div>
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>STAR 기법 답변 가이드</span>
                </div>
                <div className="v1-feat">
                  <span className="v1-feat-check">✓</span>
                  <span>결제 후 24시간 내 발송</span>
                </div>
                <div className="v1-feat v1-feat-empty">
                  <span className="v1-feat-check" style={{visibility: 'hidden'}}>✓</span>
                  <span style={{visibility: 'hidden'}}>Spacer</span>
                </div>
              </div>

              <div className="v1-price-box">
                <span className="v1-price">₩9,900</span>
                <span className="v1-price-orig">정가 ₩15,900</span>
              </div>

              <button className="v1-buy-btn" onClick={() => router.push('/products/critical-hit')}>
                가볍게 시작하기
              </button>
            </div>
          </div>

          <div className="v1-choose-guide">
            <div className="v1-guide-item">
              <p className="v1-guide-q">"일단 경험해보고 싶어요"</p>
              <p className="v1-guide-a">→ <strong>크리티컬 히트</strong></p>
            </div>
            <div className="v1-guide-item">
              <p className="v1-guide-q">"모든 질문에 제대로 대비하고 싶어요"</p>
              <p className="v1-guide-a">→ <strong>그로스 플랜</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="v1-faq-section">
        <div className="v1-faq-container">
          <h2 className="v1-section-title">자주 묻는 질문</h2>

          <div className="v1-faq-list">
            <details className="v1-faq-item">
              <summary className="v1-faq-q">
                <span>이력서 기반 예측이 정확한가요?</span>
                <span className="v1-faq-icon">+</span>
              </summary>
              <div className="v1-faq-a">
                실제 사용자 피드백에서 "면접에서 비슷한 질문이 나왔다"는 평가가 많습니다.<br /><br />
                당신의 이력서 경험과 기술을 바탕으로 면접관이 파고들 포인트를 정확히 예측합니다.<br />
                현직 시니어 개발자 4명이 질문 품질을 검수합니다.
              </div>
            </details>

            <details className="v1-faq-item">
              <summary className="v1-faq-q">
                <span>ChatGPT랑 뭐가 다른가요?</span>
                <span className="v1-faq-icon">+</span>
              </summary>
              <div className="v1-faq-a">
                ChatGPT는 일반적인 질문을 생성하지만, QueryDaily는 <strong>당신의 이력서를 분석</strong>하여 맞춤 질문을 만듭니다.<br /><br />
                또한 매일 자동으로 발송되어 꾸준한 연습이 가능하며, STAR 기법 가이드를 함께 제공합니다.
              </div>
            </details>

            <details className="v1-faq-item">
              <summary className="v1-faq-q">
                <span>STAR 기법이 뭔가요?</span>
                <span className="v1-faq-icon">+</span>
              </summary>
              <div className="v1-faq-a">
                경험을 구조화해서 설명하는 방법입니다.<br /><br />
                <strong>S</strong>ituation: 어떤 상황이었나요?<br />
                <strong>T</strong>ask: 무엇을 해야 했나요?<br />
                <strong>A</strong>ction: 어떻게 했나요?<br />
                <strong>R</strong>esult: 결과는 어땠나요?<br /><br />
                모든 질문에 STAR 기법 답변 가이드를 제공합니다.
              </div>
            </details>

            <details className="v1-faq-item">
              <summary className="v1-faq-q">
                <span>환불 정책은 어떻게 되나요?</span>
                <span className="v1-faq-icon">+</span>
              </summary>
              <div className="v1-faq-a">
                크리티컬 히트: 발송 전 100% 환불<br />
                그로스 플랜: 첫 질문 발송 전 100% 환불, 이후 남은 일수에 대해 일할 계산<br /><br />
                환불 사유는 묻지 않습니다.
              </div>
            </details>

            <details className="v1-faq-item">
              <summary className="v1-faq-q">
                <span>어떤 기술 스택을 다루나요?</span>
                <span className="v1-faq-icon">+</span>
              </summary>
              <div className="v1-faq-a">
                <strong>백엔드 개발자</strong>를 위한 서비스입니다.<br /><br />
                Spring, Node.js, Django, FastAPI 등 주요 프레임워크와<br />
                MySQL, PostgreSQL, MongoDB, Redis 등 데이터베이스,<br />
                그리고 AWS, Docker, Kubernetes 등<br />
                <strong>당신의 이력서에 있는 모든 기술</strong>을 다룹니다.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="v1-footer">
        <div className="v1-footer-container">
          <div className="v1-footer-content">
            <div className="v1-footer-brand">
              <div className="v1-footer-logo">
                Query<span>Daily</span>
              </div>
              <p className="v1-footer-tagline">내일의 질문, 오늘 답하기</p>
            </div>
            <div className="v1-footer-links">
              <div className="v1-footer-col">
                <h4>서비스</h4>
                <a href="#pricing">그로스 플랜</a>
                <a href="#pricing">크리티컬 히트</a>
              </div>
              <div className="v1-footer-col">
                <h4>문의</h4>
                <a href="https://pf.kakao.com/_hWMtn/chat" target="_blank" rel="noopener noreferrer">카카오톡</a>
                <a href="mailto:official.querydaily@gmail.com">이메일</a>
              </div>
            </div>
          </div>
          <div className="v1-footer-bottom">
            <p>© 2025 QueryDaily by AsyncSite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
