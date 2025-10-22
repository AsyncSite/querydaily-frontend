'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../page.module.css';
import { copyVariations } from '@/lib/copyConfig';

const copy = copyVariations['save-time'];

export default function SaveTimeLanding() {
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      {/* Version indicator */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        zIndex: 9999,
        fontSize: '12px'
      }}>
        📊 테스트 버전: <strong>{copy.version}</strong> | <Link href="/landing" style={{color: '#4a9eff', marginLeft: '8px'}}>다른 버전 보기</Link>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
              <span className={styles.betaTag}>BETA</span>
            </div>
            <nav className={styles.navMenu}>
              <a href="#why" className={styles.navLink}>왜 QueryDaily</a>
              <a href="#how-it-works" className={styles.navLink}>작동 방식</a>
              <a href="#products" className={styles.navLink}>상품</a>
              <a href="/" className={`${styles.navLink} ${styles.navLinkCta}`}>
                <span>메인으로</span>
                <span className={styles.navArrow}>→</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>💰</span>
              <span><strong>{copy.heroBadge}</strong></span>
            </div>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>{copy.heroTitle.main}</span><br/>
            <span className={styles.textGradient}>{copy.heroTitle.highlight}</span>
          </h1>

          <p className={styles.heroSubtitle} style={{ whiteSpace: 'pre-line' }}>
            {copy.heroSubtitle}
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{copy.heroStats.stat1.number}</div>
              <div className={styles.statLabel} dangerouslySetInnerHTML={{ __html: copy.heroStats.stat1.label }} />
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{copy.heroStats.stat2.number}</div>
              <div className={styles.statLabel} dangerouslySetInnerHTML={{ __html: copy.heroStats.stat2.label }} />
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{copy.heroStats.stat3.number}</div>
              <div className={styles.statLabel} dangerouslySetInnerHTML={{ __html: copy.heroStats.stat3.label }} />
            </div>
          </div>

          <div className={styles.heroCta}>
            <div className={styles.heroCtaButtons}>
              <a
                href="#products"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{copy.ctaButton}</span>
                <span className={styles.btnArrow}>→</span>
              </a>
            </div>
            <p className={styles.ctaNote}>
              <span className={styles.noteIcon}>✓</span> {copy.ctaNote}
              <span className={styles.noteDivider}>•</span>
              <span className={styles.noteHighlight}>즉시 시작 가능</span>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <div id="why" className={`${styles.section} ${styles.problem}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{copy.problemTitle}</h2>
          <p className={styles.sectionSubtitle} style={{ fontSize: '1.5rem', color: '#c3e88d', marginBottom: '2rem' }}>
            {copy.problemSubtitle}
          </p>

          <div className={styles.problemsBalancedGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>🤔</div>
              <h3>"왜 썼죠?"</h3>
              <p>분명 내가 사용한 기술인데, '왜?'라는 질문 앞에서는 말문이 막혀요.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>🤯</div>
              <h3>"그래서 뭘 했죠?"</h3>
              <p>내 프로젝트는 너무 평범해서, 뭘 어떻게 어필해야 할지 모르겠어요.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>📚</div>
              <h3>"어떻게 다르죠?"</h3>
              <p>분명 Spring의 동작 원리는 아는데, 이걸 제 프로젝트 경험과 연결하지 못하겠어요.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>😰</div>
              <h3>"긴장하면 백지"</h3>
              <p>집에서는 잘 아는데, 면접장에서는 머릿속이 하얘져요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tester Review Section */}
      <div className={`${styles.section} ${styles.realReviews}`} style={{ background: 'rgba(130, 170, 255, 0.02)' }}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', background: 'rgba(195, 232, 141, 0.1)', padding: '8px 16px', borderRadius: '20px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#c3e88d', fontWeight: '600' }}>
                ✓ 베타 테스터 100% 실제 후기
              </span>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            {copy.socialProofTitle || '이력서 기반 질문이라 면접에서 비슷한 질문이 나왔어요'}
          </h2>
          <p className={styles.sectionSubtitle} style={{ fontSize: '1.2rem', color: '#82aaff' }}>
            실제 면접 합격자들이 경험한 QueryDaily
          </p>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '2rem',
              borderRadius: '12px',
              borderLeft: '4px solid #c3e88d'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#c3e88d', fontWeight: '600' }}>
                  제 경험의 '부족한 부분'을 정확히 파악했어요
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#c792ea', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  ⭐ 추천도 9/10
                </span>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#cbd5e0' }}>
                "사용자가 늘어날 상황을 가정하고 서비스의 병목 지점과 대처 방법을 물어보는 질문이 인상 깊었습니다.
                전혀 다뤄보지 않은 내용이라 어떻게 답할지 고민하게 되었고, 이력서 정리에 큰 도움이 되었습니다."
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '2rem',
              borderRadius: '12px',
              borderLeft: '4px solid #82aaff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#82aaff', fontWeight: '600' }}>
                  막연한 불안감이 줄고 '자신감'이 생겼습니다
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#c792ea', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  ⭐ 추천도 10/10
                </span>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#cbd5e0' }}>
                "질문이 굉장히 구체적이고 실제 면접에서 나올 것 같았어요.
                꾸준히 답변을 고민하며 면접에 대한 자신감을 얻었고, Saga 패턴 같은 새로운 질문을 받으며 사고가 확장되는 느낌을 받았습니다."
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '2rem',
              borderRadius: '12px',
              borderLeft: '4px solid #f78c6c'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#f78c6c', fontWeight: '600' }}>
                  질문의 '깊이'가 다르고, '답변의 가이드'를 줘요
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#c792ea', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  ⭐ 추천도 10/10
                </span>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#cbd5e0' }}>
                "제 이력서 기반으로 '왜 Elasticsearch를 썼는지' 묻는 질문을 받고, 답변을 미리 구조화해볼 수 있었어요.
                STAR 구조화로 답변의 '가닥'을 잡을 수 있게 도와준 게 최고였습니다."
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(130, 170, 255, 0.05)',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#c3e88d' }}>100%</div>
                <div style={{ fontSize: '0.9rem', color: '#89ddff', marginTop: '0.5rem' }}>만족도 5/5</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#82aaff' }}>10/10</div>
                <div style={{ fontSize: '0.9rem', color: '#89ddff', marginTop: '0.5rem' }}>평균 추천도</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f78c6c' }}>3일</div>
                <div style={{ fontSize: '0.9rem', color: '#89ddff', marginTop: '0.5rem' }}>챌린지 기간</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className={`${styles.section} ${styles.solution}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            {copy.whyTitle}
          </h2>
          <p className={styles.sectionSubtitle} style={{ fontSize: '1.2rem', color: '#82aaff', marginBottom: '3rem' }}>
            {copy.whySubtitle}
          </p>

          <div className={styles.solutionValues}>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>당신만을 위한 질문</h3>
              <p>검색하면 나오는 빤한 질문은 그만. 당신의 프로젝트 경험과 기술 스택에서만 나올 수 있는 '꼬리 질문'으로 면접의 깊이를 더합니다.</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>💪</div>
              <h3>매일 만드는 실전 감각</h3>
              <p>거창한 계획은 필요 없어요. 매일 단 하나의 질문에 답을 고민하는 것만으로 '면접 근육'이 자연스럽게 단련돼요.</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>🧭</div>
              <h3>나만의 성장 지도</h3>
              <p>3일 후, 당신은 어떤 경험을 어떻게 정리해야 할지, 무엇을 더 보강해야 할지 스스로 알게 됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className={`${styles.section} ${styles.productsSection}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            {copy.productsTitle}
          </h2>
          <p className={styles.sectionSubtitle}>
            {copy.productsSubtitle}
          </p>

          <div className={styles.promotionBanner}>
            <span className={styles.promotionIcon}>🚀</span>
            <div className={styles.promotionText}>
              <span className={styles.promotionTitle}>정식 오픈 기념</span>
              <span className={styles.promotionDesc}>지금 전 상품 최대 65% 할인가 제공 중!</span>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {/* 그로스 플랜 */}
            <div className={`${styles.productCard} ${styles.productCardWide}`}>
              <div className={styles.productBadge}>MOST POPULAR</div>
              <div className={styles.productHeader}>
                <span className={styles.productLabel}>20일 집중 훈련</span>
                <h3 className={styles.productName}>그로스 플랜</h3>
                <span className={styles.productEn}>Growth Plan</span>
              </div>
              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📅</span>
                  <span>매일 맞춤 질문</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🏢</span>
                  <span>실제 기출 포함</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📚</span>
                  <span>모범 답안 제공</span>
                </div>
              </div>
              <div className={styles.productServiceInfo}>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>제공 기간</span>
                  <span className={styles.serviceInfoValue}>결제 후 30일 이내 완료 (평일 기준 20일간 매일 발송)</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>첫 질문 발송 전 100%, 이후 일할 계산</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩106,000</span>
                <span className={styles.priceCurrent}>₩49,000</span>
              </div>
              <a
                href="/"
                className={`${styles.btn} ${styles.btnProductCta} ${styles.btnProductCtaPrimary}`}
              >
                {copy.productCTA}
              </a>
            </div>

            {/* 리얼 인터뷰 */}
            <div className={styles.productCard}>
              <div className={styles.productBadge}>PREMIUM</div>
              <div className={styles.productHeader}>
                <span className={styles.productLabel}>1:2 실전 모의면접</span>
                <h3 className={styles.productName}>리얼 인터뷰</h3>
                <span className={styles.productEn}>Real Interview</span>
              </div>
              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>👥</span>
                  <span>현직 면접관 2명과 90분 실전</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📹</span>
                  <span>상세 피드백 리포트</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>💬</span>
                  <span>즉시 교정 가능한 개선점 코칭</span>
                </div>
              </div>
              <div className={styles.productServiceInfo}>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>제공 기간</span>
                  <span className={styles.serviceInfoValue}>결제 후 90일 이내 일정 조율 및 진행 (90분 모의면접 1회)</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>면접 3일 전 100%, 1-2일 전 50%, 당일 불가</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩179,000</span>
                <span className={styles.priceCurrent}>₩129,000</span>
              </div>
              <a
                href="/"
                className={`${styles.btn} ${styles.btnProductCta}`}
              >
                {copy.productCTA}
              </a>
            </div>

            {/* 크리티컬 히트 */}
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <span className={styles.productLabel}>단 하나의 결정적 질문</span>
                <h3 className={styles.productName}>크리티컬 히트</h3>
                <span className={styles.productEn}>Critical Hit</span>
              </div>
              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>이력서 맞춤 핵심 질문 1개</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🔗</span>
                  <span>꼬리 질문 3개</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📝</span>
                  <span>상세 답변 가이드</span>
                </div>
              </div>
              <div className={styles.productServiceInfo}>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>제공 기간</span>
                  <span className={styles.serviceInfoValue}>결제 후 즉시 제공, 열람 기간 무제한</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>콘텐츠 열람 전 100% 환불</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩15,900</span>
                <span className={styles.priceCurrent}>₩9,900</span>
              </div>
              <a
                href="/"
                className={`${styles.btn} ${styles.btnProductCta}`}
              >
                {copy.productCTA}
              </a>
            </div>

            {/* 라스트 체크 */}
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <span className={styles.productLabel}>면접 D-1 긴급 대비</span>
                <h3 className={styles.productName}>라스트 체크</h3>
                <span className={styles.productEn}>Last Check</span>
              </div>
              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🚨</span>
                  <span>핵심 질문 15개 (1시간 완벽 대비)</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🗣️</span>
                  <span>막힐 때 쓰는 만능 답변</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>즉시 사용 가능한 답변 템플릿</span>
                </div>
              </div>
              <div className={styles.productServiceInfo}>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>제공 기간</span>
                  <span className={styles.serviceInfoValue}>결제 후 즉시 제공, 열람 기간 무제한</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>콘텐츠 열람 전 100% 환불</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceCurrent}>₩49,000</span>
              </div>
              <button
                className={`${styles.btn} ${styles.btnProductCta}`}
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                준비 중
              </button>
            </div>

            {/* 레주메 핏 */}
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <span className={styles.productLabel}>이력서 전문가 분석</span>
                <h3 className={styles.productName}>레주메 핏</h3>
                <span className={styles.productEn}>Resume Fit</span>
              </div>
              <div className={styles.productFeatures}>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>📄</span>
                  <span>전문가의 이력서 분석</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>✨</span>
                  <span>맞춤 개선 가이드</span>
                </div>
                <div className={styles.productFeature}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span>실전 피드백</span>
                </div>
              </div>
              <div className={styles.productServiceInfo}>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>제공 기간</span>
                  <span className={styles.serviceInfoValue}>결제 후 즉시 제공, 열람 기간 무제한</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>콘텐츠 열람 전 100% 환불</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩79,000</span>
                <span className={styles.priceCurrent}>₩59,000</span>
              </div>
              <a
                href="/"
                className={`${styles.btn} ${styles.btnProductCta}`}
              >
                {copy.productCTA}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className={`${styles.section} ${styles.howItWorks}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{copy.howItWorksTitle}</h2>
          <p className={styles.sectionSubtitle}>{copy.howItWorksSubtitle}</p>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.timelineNumber}>1</div>
                <div className={styles.timelineIcon}>✉️</div>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>이메일로 시작</h3>
                <p className={styles.timelineDesc}>이메일만 입력하면 바로 시작! 경력과 기술을 알려주시면 더 정확한 질문을 보내드려요.</p>
                <div className={styles.timelineDetail}>
                  <span className={styles.timelineTiming}>⏱ 소요 시간: 30초</span>
                  <span className={styles.timelineNote}>회원가입 없이 바로</span>
                </div>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.timelineNumber}>2</div>
                <div className={styles.timelineIcon}>👨‍🏫</div>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>매일 질문 수신</h3>
                <p className={styles.timelineDesc}>3일 동안 매일 아침, 전문가가 당신을 위한 질문을 준비해요.</p>
                <div className={styles.timelineDetail}>
                  <span className={styles.timelineTiming}>📅 매일 오전 9시</span>
                  <span className={styles.timelineNote}>이메일로 편하게</span>
                </div>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.timelineNumber}>3</div>
                <div className={styles.timelineIcon}>🚀</div>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>성장의 시작</h3>
                <p className={styles.timelineDesc}>질문에 스스로 답을 고민하는 과정에서, 당신의 경험은 비로소 날카로운 무기가 됩니다.</p>
                <div className={styles.timelineDetail}>
                  <span className={styles.timelineTiming}>💎 3일 후 변화</span>
                  <span className={styles.timelineNote}>면접 자신감 상승</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.emailPreview}>
            <div className={styles.emailHeader}>
              <span className={styles.emailFrom}>QueryDaily</span>
              <span className={styles.emailTime}>오전 09:00</span>
            </div>
            <div className={styles.emailSubject}>[Day 2/3] 오늘의 면접 질문이 도착했어요 🎯</div>
            <div className={styles.emailBody}>
              <p>안녕하세요 김개발님,</p>
              <p>오늘의 질문입니다:</p>
              <div className={styles.questionBox}>
                "이력서에 작성하신 '실시간 채팅 서비스'에서 WebSocket 대신
                Server-Sent Events를 고려해보셨나요?
                각각의 장단점과 선택 이유를 설명해주세요."
              </div>
              <p>💡 힌트: 양방향 통신의 필요성, 브라우저 호환성, 서버 부하를 고려해보세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Types Section */}
      <div className={`${styles.section} ${styles.questionTypes}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{copy.questionTypesTitle}</h2>
          <p className={styles.sectionSubtitle}>{copy.questionTypesSubtitle}</p>

          <div className={styles.questionTabs}>
            <button
              className={`${styles.questionTab} ${activeQuestionTab === 0 ? styles.questionTabActive : ''}`}
              onClick={() => setActiveQuestionTab(0)}
            >
              <span className={styles.tabIcon}>🔗</span>
              <span className={styles.tabLabel}>경험 연결형</span>
            </button>
            <button
              className={`${styles.questionTab} ${activeQuestionTab === 1 ? styles.questionTabActive : ''}`}
              onClick={() => setActiveQuestionTab(1)}
            >
              <span className={styles.tabIcon}>⚖️</span>
              <span className={styles.tabLabel}>트레이드오프형</span>
            </button>
            <button
              className={`${styles.questionTab} ${activeQuestionTab === 2 ? styles.questionTabActive : ''}`}
              onClick={() => setActiveQuestionTab(2)}
            >
              <span className={styles.tabIcon}>🎯</span>
              <span className={styles.tabLabel}>상황 가정형</span>
            </button>
          </div>

          <div className={styles.questionTabContent}>
            {activeQuestionTab === 0 && (
              <div className={styles.questionTabPanel}>
                <div className={styles.questionBadge}>Type 1</div>
                <h3 className={styles.questionType}>🔗 경험 연결형</h3>
                <p className={styles.questionExample}>
                  "JPA 쓰면서 '차라리 SQL 짜는게 나았겠다' 싶었던 순간은 언제였나요?"
                </p>
                <div className={styles.questionInsight}>
                  <strong>면접관의 의도:</strong> 기술 선택의 후회와 실제 경험 확인
                </div>
                <div className={styles.additionalExamples}>
                  <h4>다른 예시들:</h4>
                  <ul>
                    <li>"왜 Spring Boot를 선택하셨나요? Express.js는 고려해보셨나요?"</li>
                    <li>"이력서에 작성하신 '성능 개선'이 정확히 어떤 지표를 개선한 건가요?"</li>
                    <li>"'응답속도 50% 개선' 이라고 쓰셨는데, 200ms에서 100ms인지, 2초에서 1초인지?"</li>
                  </ul>
                </div>
              </div>
            )}
            {activeQuestionTab === 1 && (
              <div className={styles.questionTabPanel}>
                <div className={styles.questionBadge}>Type 2</div>
                <h3 className={styles.questionType}>⚖️ 트레이드오프형</h3>
                <p className={styles.questionExample}>
                  "성능 최적화했더니 코드 가독성이 망가졌는데, 그게 맞는 선택이었나요?"
                </p>
                <div className={styles.questionInsight}>
                  <strong>면접관의 의도:</strong> 트레이드오프 인식과 의사결정 판단력
                </div>
                <div className={styles.additionalExamples}>
                  <h4>다른 예시들:</h4>
                  <ul>
                    <li>"MSA로 전환하면서 복잡도가 증가했는데, 그만한 가치가 있었나요?"</li>
                    <li>"JPA의 편리함 vs Native Query의 성능, 어떤 기준으로 선택하시나요?"</li>
                    <li>"테스트 커버리지 100%가 정말 필요한가요? 시간 대비 효율은요?"</li>
                  </ul>
                </div>
              </div>
            )}
            {activeQuestionTab === 2 && (
              <div className={styles.questionTabPanel}>
                <div className={styles.questionBadge}>Type 3</div>
                <h3 className={styles.questionType}>🎯 상황 가정형</h3>
                <p className={styles.questionExample}>
                  "Spring Batch로 대용량 데이터를 처리하던 중 OOM이 발생한다면,
                  어떤 순서로 문제를 진단하고 해결하시겠습니까?"
                </p>
                <div className={styles.questionInsight}>
                  <strong>면접관의 의도:</strong> 문제 해결 접근법, 실무 대처 능력
                </div>
                <div className={styles.additionalExamples}>
                  <h4>다른 예시들:</h4>
                  <ul>
                    <li>"배포 직후 API 응답속도가 10배 느려졌어요. 어떻게 접근하시겠어요?"</li>
                    <li>"DB 커넥션 풀이 고갈되는 상황, 당장 어떻게 대응하실 건가요?"</li>
                    <li>"코드리뷰에서 시니어와 의견 충돌이 생긴다면 어떻게 하시겠어요?"</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className={`${styles.section} ${styles.whoWeAre}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.whoWeAreHeader}>
            <span className={styles.whoWeAreBadge}>이 서비스를 만든 사람들</span>
            <h2 className={styles.whoWeAreTitle}>
              {copy.whoWeAreTitle}<br/>
              <span className={styles.whoWeAreHighlight}>{copy.whoWeAreHighlight}</span>
            </h2>
            <p className={styles.whoWeAreSubtitle} style={{ whiteSpace: 'pre-line' }}>
              {copy.whoWeAreSubtitle}
            </p>
          </div>

          <div className={styles.failureStats}>
            <div className={styles.failureStat}>
              <div className={styles.failureNumber}>500<span>+</span></div>
              <div className={styles.failureLabel}>서류 탈락</div>
            </div>
            <div className={styles.failureStatDivider}></div>
            <div className={styles.failureStat}>
              <div className={styles.failureNumber}>100<span>+</span></div>
              <div className={styles.failureLabel}>면접 경험</div>
            </div>
            <div className={styles.failureStatDivider}></div>
            <div className={styles.failureStat}>
              <div className={styles.failureNumber}>300<span>%</span></div>
              <div className={styles.failureLabel}>평균 연봉 인상</div>
            </div>
          </div>

          <div className={styles.finalMessage}>
            <p>면접관도 몰랐던 <span className={styles.emphasis}>불합격 시키는 답변 패턴</span><br/>지금 얻어가세요.</p>
          </div>
        </div>
      </div>

      {/* Privacy Trust Section */}
      <div className={`${styles.section} ${styles.privacyTrust}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{copy.privacyTitle}</h2>
          <p className={styles.sectionSubtitle}>{copy.privacySubtitle}</p>

          <div className={styles.privacyGrid}>
            <div className={styles.privacyCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>오직 면접 질문 생성</h3>
              <p>이력서는 단 하나의 목적으로만 사용돼요<br/>
              <strong>당신만을 위한 맞춤형 면접 질문 생성</strong></p>
              <ul>
                <li>프로젝트 경험 분석</li>
                <li>기술 스택 깊이 파악</li>
                <li>경력 수준별 질문 난이도 조정</li>
              </ul>
            </div>

            <div className={styles.privacyCard}>
              <div className={styles.cardIcon}>⏱️</div>
              <h3>3일 후 완전 삭제</h3>
              <p>챌린지 종료와 동시에 모든 데이터가 삭제돼요</p>
              <div className={styles.deletionTimeline}>
                <div className={styles.timelineItem}>
                  <span className={styles.day}>Day 1-3</span>
                  <span>암호화 보관</span>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.day}>Day 4</span>
                  <span>자동 영구 삭제</span>
                </div>
              </div>
              <p className={styles.note}>💡 원하시면 언제든 즉시 삭제 요청 가능</p>
            </div>

            <div className={styles.privacyCard}>
              <div className={styles.cardIcon}>🛡️</div>
              <h3>철저한 보안</h3>
              <p>당신의 정보를 지키는 우리의 약속</p>
              <ul>
                <li>제3자 공유 절대 없음</li>
                <li>마케팅 활용 절대 없음</li>
                <li>AWS 암호화 저장</li>
                <li>접근 권한 최소화</li>
              </ul>
            </div>
          </div>

          <div className={styles.trustFooter}>
            <p>
              <strong>왜 이력서가 필요한가요?</strong><br/>
              일반적인 "JPA 왜 썼나요?" 같은 질문이 아닌,<br/>
              당신의 프로젝트와 경험을 깊이 이해한 후에만 나올 수 있는<br/>
              <span style={{ color: '#c3e88d' }}>진짜 날카로운 맞춤형 질문</span>을 만들기 위해서입니다.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{copy.faqTitle}</h2>
          <p className={styles.sectionSubtitle}>{copy.faqSubtitle}</p>

          <div className={styles.faqAccordion}>
            {[
              {
                icon: '🤔',
                question: '정말 내 이력서에 맞는 질문이 올까요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p>네, <strong>현직 면접관 수준의 전문가로 파인 튜닝한 AI</strong>가 당신의 기술 스택, 프로젝트 경험, 사용한 라이브러리까지 분석해서 실제 면접관이 물어볼 만한 꼬리 질문을 생성합니다.</p>
                  </div>
                )
              },
              {
                icon: '⏰',
                question: '3일이면 충분한가요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p><strong>3일은 시작입니다.</strong></p>
                    <p>이 기간 동안 당신은 자신의 약점을 명확히 파악하고, 어떤 부분을 보강해야 할지 알게 됩니다.</p>
                  </div>
                )
              },
              {
                icon: '💭',
                question: '답변 가이드 없이 혼자 할 수 있을까요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p><strong>오히려 그래서 효과적입니다.</strong></p>
                    <p>스스로 고민하고 답을 찾는 과정에서 진짜 <strong>'면접 근육'</strong>이 생깁니다.</p>
                  </div>
                )
              },
              {
                icon: '🎯',
                question: '어떤 사람에게 가장 효과적인가요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p><strong>이런 분들께 가장 효과적입니다:</strong></p>
                    <ul className={styles.faqCheckList}>
                      <li>이력서는 준비됐지만 <strong>면접이 막막한</strong> 주니어 개발자</li>
                      <li>특히 <strong>신입~3년차 개발자</strong>분들</li>
                      <li>코드는 잘 짜지만 <strong>왜 그렇게 짰는지</strong> 설명하기 어려우신 분</li>
                      <li>기술 선택의 이유를 <strong>논리적으로 설명</strong>하고 싶으신 분</li>
                    </ul>
                  </div>
                )
              },
              {
                icon: '🌐',
                question: 'Java/Spring이 아닌 다른 기술 스택도 지원하나요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p><strong>현재는 Java/Spring 백엔드 개발자를 위한 베타 테스트 중입니다.</strong></p>
                  </div>
                )
              }
            ].map((faq, index) => (
              <div key={index} className={styles.faqAccordionItem}>
                <button
                  className={`${styles.faqAccordionHeader} ${openFaqIndex === index ? styles.faqAccordionHeaderOpen : ''}`}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <div className={styles.faqQuestionContainer}>
                    <span className={styles.faqIcon}>{faq.icon}</span>
                    <span className={styles.faqQuestionText}>{faq.question}</span>
                  </div>
                  <span className={styles.faqToggleIcon}>{openFaqIndex === index ? '−' : '+'}</span>
                </button>
                <div
                  className={`${styles.faqAccordionContent} ${openFaqIndex === index ? styles.faqAccordionContentOpen : ''}`}
                >
                  <div className={styles.faqAnswerInner}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: '#1a1f2e',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        color: '#a0aec0'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          🔍 A/B 테스트 버전: <strong style={{ color: '#ffd700' }}>{copy.version}</strong>
        </p>
        <p style={{ fontSize: '0.9rem', color: '#718096' }}>
          {copy.description}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/landing" style={{ color: '#4a9eff', textDecoration: 'underline' }}>
            다른 카피 버전 비교하기 →
          </Link>
        </div>
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p>© 2025 QueryDaily. All rights reserved.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <a href="/" style={{ color: '#82aaff', marginRight: '1rem' }}>메인 페이지</a>
            <a href="/#faq" style={{ color: '#82aaff' }}>FAQ</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
