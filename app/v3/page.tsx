'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/api';
import { products } from './products/data';
import type { Product } from './products/data';
import styles from './page.module.css';

// 카테고리 정보
const categories = [
  { id: 'all', name: '전체', icon: '📚' },
  { id: 'interview', name: '면접 준비', icon: '💼' },
  { id: 'practice', name: '실전 연습', icon: '🎯' },
  { id: 'resume', name: '이력서', icon: '📄' },
];

// 리뷰 데이터
const testimonials = [
  {
    name: '김**',
    role: '결제 도메인 백엔드 2년차',
    avatar: '👨‍💻',
    text: '"매일 받는 질문이 실제 면접보다 더 어려웠어요. 덕분에 실제 면접에선 자신감 있게 대답할 수 있었습니다."',
    result: '💼 네카라쿠배 중 1곳 재직중',
    product: 'growth-plan'
  },
  {
    name: '이**',
    role: '쇼핑몰 플랫폼 신입 개발자',
    avatar: '👩‍💻',
    text: '"왜 QueryDaily 안 했을까 후회돼요. 면접장에서 비슷한 질문이 나와서 깜짝 놀랐습니다. 이력서 기반이라 그런가봐요."',
    result: '🏢 시리즈 B 스타트업 합격',
    product: 'growth-plan'
  },
  {
    name: '박**',
    role: '컴공 졸업예정',
    avatar: '🧑‍🎓',
    text: '"학교에서 배운 것과 실무는 정말 달라요. QueryDaily 덕분에 그 갭을 줄일 수 있었습니다."',
    result: '🎆 대기업 IT 자회사 합격',
    product: 'critical-hit'
  },
  {
    name: '정**',
    role: '전 N사 검색팀 개발자',
    avatar: '👩‍🏫',
    text: '"이직 준비하면서 제가 놓치고 있던 부분을 발견했어요. 왜 그렇게 했는지 설명하는 연습이 큰 도움이 됐습니다."',
    result: '🚀 외국계 테크 회사 재직중',
    product: 'real-interview'
  },
  {
    name: '서**',
    role: '부트캠프 수료생',
    avatar: '🥰',
    text: '"처음엔 \'내가 잘할 수 있을까\' 고민했는데, 3일 후엔 자신감이 생겼어요. 매일 받는 질문이 저를 성장시켰습니다."',
    result: '🎯 원하는 회사 K사 합격',
    product: 'growth-plan'
  },
  {
    name: '최**',
    role: '금융 서비스 백엔드 3년차',
    avatar: '💻',
    text: '"이력서 맞춤형이라 정말 좋았어요. 제 경험과 프로젝트를 기반으로 한 질문들이 실제 면접에서 큰 도움이 됐습니다."',
    result: '🎉 T사 핀테크 재직중',
    product: 'resume-fit'
  },
];

export default function HomePageV2() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeQuestionCard, setActiveQuestionCard] = useState(0);

  // 히어로 섹션 질문 카드 데이터 - 이력서 기반 질문 예시 (각색)
  const questionCards = [
    {
      tech: '성능 최적화',
      level: '경력 기반',
      difficulty: '⚡ 실전형',
      question: '"이력서에 API 응답시간 개선 경험이 있는데, Thread Dump로 병목을 찾았을 때 대부분 스레드가 락 대기 상태였다면?"',
      description: '당신의 이력서 경험을 바탕으로, 성능 분석 방법론과 동시성 제어 전략을 깊이 있게 질문합니다.',
      color: '#ff6b6b',
      tag: '이력서 분석'
    },
    {
      tech: 'DB 쿼리',
      level: '경력 기반',
      difficulty: '🔥 심화형',
      question: '"복잡한 계층 구조 조회 쿼리가 느려서 Materialized View를 고려 중이라면, 데이터 신선도는 어떻게 관리하시겠어요?"',
      description: '당신이 실제로 다뤘던 DB 경험을 기반으로, 설계 결정의 트레이드오프를 질문합니다.',
      color: '#4ecdc4',
      tag: '이력서 분석'
    },
    {
      tech: 'Batch 설계',
      level: '경력 기반',
      difficulty: '⚡ 실전형',
      question: '"여러 채널별로 다른 배송 로직을 처리하는 배치 시스템, if-else 남발을 어떻게 개선하시겠어요?"',
      description: '당신의 프로젝트에서 사용한 기술을 기반으로, 설계 패턴과 확장성을 질문합니다.',
      color: '#45b7d1',
      tag: '이력서 분석'
    },
    {
      tech: '고가용성',
      level: '경력 기반',
      difficulty: '🔥 심화형',
      question: '"Redis 캐시 장애로 서비스 전체가 멈춘 경험 있으신가요? HA 구성 시 스플릿 브레인은 어떻게 방지하나요?"',
      description: '당신이 구축한 인프라 경험을 바탕으로, 장애 시나리오와 복구 전략을 질문합니다.',
      color: '#f7b731',
      tag: '이력서 분석'
    }
  ];

  // 카테고리별 상품 필터링 + 특정 상품 제외 (리얼 인터뷰, 레주메 핏)
  const filteredProducts = (selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory))
    .filter(p => p.id !== 'real-interview' && p.id !== 'resume-fit');

  // 상품 선택 핸들러 - 상세 페이지로 이동
  const handleProductSelect = (productId: string) => {
    router.push(`/v2/products/${productId}`);
  };

  // 구매 처리
  const handlePurchase = async () => {
    if (!selectedProduct) return;

    try {
      // 구매 처리 로직
      const response = await createOrder({
        email: 'user@example.com', // TODO: 실제 사용자 이메일
        name: '사용자', // TODO: 실제 사용자 이름
        productCode: 'GROWTH_PLAN' as any, // TODO: selectedProduct.id를 ProductCode로 매핑
        paymentMethod: 'card',
      });

      // 결제 페이지로 이동
      if (response.success && response.data?.orderId) {
        router.push(`/checkout?orderId=${response.data.orderId}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <span className={styles.logoText}>
              Query<span className={styles.logoAccent}>Daily</span>
            </span>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
            <a href="#products" onClick={() => setMobileMenuOpen(false)}>상품</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>이용방법</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#products" className={styles.navCta} onClick={() => setMobileMenuOpen(false)}>
              시작하기
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            {/* Left: Content */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span>🤝</span>
                <span>혼자 준비하지 마세요</span>
              </div>

              <h1 className={styles.heroTitle}>
                면접 준비,<br/>
                <span className={styles.highlight}>뭘 해야 할지 모르겠나요?</span>
              </h1>

              <p className={styles.heroSubtitle}>
                매일 예상 질문 찾고 답변 만드는 게 지치셨죠.<br/>
                그 마음, 너무 잘 알아요.
              </p>

              <p className={styles.heroDescription}>
                QueryDaily가 함께합니다. 당신의 이력서로 실제 질문을 매일 보내드릴게요.<br/>
                <strong>이제 포기하지 않으셔도 됩니다.</strong>
              </p>

              <a href="#products" className={styles.heroBtn}>
                <span>지금 바로 시작하기</span>
                <span>→</span>
              </a>
            </div>

            {/* Right: Interactive Question Cards */}
            <div className={styles.heroImage}>
              <div className={styles.questionCardsContainer}>
                <div className={styles.questionCardsHeader}>
                  <span className={styles.questionBadge}>💡 실제 질문 예시</span>
                  <p className={styles.questionHint}>카드를 클릭해보세요</p>
                </div>

                <div className={styles.questionCards}>
                  {questionCards.map((card, index) => (
                    <div
                      key={index}
                      className={`${styles.questionCard} ${activeQuestionCard === index ? styles.questionCardActive : ''}`}
                      onClick={() => setActiveQuestionCard(index)}
                    >
                      <div className={styles.cardHeader}>
                        <span
                          className={styles.techBadge}
                          style={{
                            background: `linear-gradient(135deg, ${card.color}22, ${card.color}11)`,
                            color: card.color,
                            borderColor: `${card.color}44`
                          }}
                        >
                          {card.tech}
                        </span>
                        <span className={styles.difficultyBadge}>{card.difficulty}</span>
                      </div>

                      <p className={`${styles.cardQuestion} ${activeQuestionCard === index ? styles.cardQuestionActive : ''}`}>
                        {card.question}
                      </p>

                      {activeQuestionCard === index && (
                        <div className={styles.cardDescription}>
                          <p className={styles.descriptionText}>{card.description}</p>
                        </div>
                      )}

                      <div className={styles.cardFooter}>
                        <span className={styles.levelBadge}>{card.level}</span>
                        <span className={styles.tagBadge}>{card.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardNavigation}>
                  {questionCards.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.navDot} ${activeQuestionCard === index ? styles.navDotActive : ''}`}
                      onClick={() => setActiveQuestionCard(index)}
                      aria-label={`질문 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Reviews Section */}
      <section className={styles.realReviews}>
        <div className={styles.reviewsContainer}>
          <div className={styles.reviewsHeader}>
            <span className={styles.reviewsBadge}>📊 데이터로 증명된 효과</span>
            <h2 className={styles.sectionTitle}>
              3일 만에 면접 준비 루틴이 바뀝니다
            </h2>
            <p className={styles.reviewsSubtitle}>
              실제 사용자 4명의 솔직한 피드백<br/>
              <strong>100% 만족도</strong>와 <strong>구체적인 변화</strong>를 확인하세요
            </p>
          </div>

          {/* 만족도 조사 차트 2개 - 2열 그리드 */}
          <div className={styles.chartGrid}>
            <div className={styles.chartItem}>
              <img src="/images/satisfication.png" alt="전반적 만족도" className={styles.chartImage} />
            </div>
            <div className={styles.chartItem}>
              <img src="/images/chart2.png" alt="구체적으로 도움된 점" className={styles.chartImage} />
            </div>
          </div>

          {/* 텍스트 후기 3개 - 3열 그리드 */}
          <div className={styles.reviewTextGrid}>
            <div className={styles.reviewTextItem}>
              <h3 className={styles.reviewTextTitle}>💬 평가해주신 이유</h3>
              <img src="/images/review.png" alt="평가 이유" className={styles.reviewTextImage} />
            </div>
            <div className={styles.reviewTextItem}>
              <h3 className={styles.reviewTextTitle}>⭐ 가장 만족스러웠던 점</h3>
              <img src="/images/favorite.png" alt="만족스러웠던 점" className={styles.reviewTextImage} />
            </div>
            <div className={styles.reviewTextItem}>
              <h3 className={styles.reviewTextTitle}>💡 가장 인상 깊었던 질문</h3>
              <img src="/images/impressive.png" alt="인상 깊었던 질문" className={styles.reviewTextImage} />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className={styles.whoWeAre}>
        <div className={styles.whoWeAreContainer}>
          <div className={styles.whoWeAreHeader}>
            <span className={styles.whoWeAreBadge}>이 서비스를 만든 사람들</span>
            <h2 className={styles.sectionTitle}>
              실패 데이터 500개가 만든<br/>
              <span className={styles.whoWeAreHighlight}>합격 공식</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              비전공자 / 국비지원 출신의 가장 평범한 개발자들이<br/>
              직접 증명하며 만든 초밀착 코칭 서비스
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

          <div className={styles.expertGrid}>
            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad1)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>현) 판교 N사 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>국비지원 수료생</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>판교 대기업 개발자</span>
              </div>
              <p className={styles.expertStory}>
                300번의 탈락 데이터를 분석해<br/>
                합격 공식을 찾았어요<br/>
                국비생에서 2년만에 연봉 2배↗<br/>그 경험을 시스템에 담았어요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#f093fb', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#f5576c', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad2)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>현) 유니콘 B사 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>SI 야근지옥</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>유니콘 스타트업</span>
              </div>
              <p className={styles.expertStory}>
                SI 야근지옥에서 유니콘까지,<br/>
                5번의 이직으로 찾은 최적 경로<br/>
                100개 기업 면접에서 발견한<br/>
                합격 시그널을 공유해요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#4facfe', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#00f2fe', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad3)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>전) 커머스 C사 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>무명 스타트업</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>대형 커머스</span>
              </div>
              <p className={styles.expertStory}>
                트래픽 0 → 블랙프라이데이,<br/>
                서버 터뜨리며 배운 대용량 처리의 정석<br/>
                트래픽 폭탄 맞으며 배운 진짜 개발,<br/>
                그 생존법으로 다져진 실무 경험으로 질문해요
              </p>
            </div>

            <div className={styles.expertCard}>
              <div className={styles.expertAvatar}>
                <svg className={styles.personSilhouette} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#fa709a', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#fee140', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 12 C58 12 64 18 64 28 C64 36 58 42 50 42 C42 42 36 36 36 28 C36 18 42 12 50 12 Z M25 48 C30 45 38 44 45 44 L55 44 C62 44 70 45 75 48 C82 52 85 58 85 65 L85 110 L15 110 L15 65 C15 58 18 52 25 48 Z" fill="url(#grad4)" opacity="0.9"/>
                </svg>
              </div>
              <div className={styles.expertBadge}>현) 테크 기업 개발자</div>
              <div className={styles.expertJourney}>
                <span className={styles.journeyFrom}>아이비리그 수준 CS 전공</span>
                <span className={styles.journeyArrow}>→</span>
                <span className={styles.journeyTo}>판교 테크 기업</span>
              </div>
              <p className={styles.expertStory}>
                탄탄한 이론적 기반과<br/>
                10개 이상의 시스템을 0부터 설계한 풀사이클 경험으로<br/>
                실무와 이론의 균형을 잡아드려요
              </p>
            </div>
          </div>

          <div className={styles.teamSummary}>
            <p className={styles.summaryMain}>
              수십 번의 탈락과 수백 번의 <span className={styles.highlight}>삽질</span>,<br/>
              그리고 실제 성공한 <span className={styles.highlight}>데이터</span>로 증명합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className={styles.products}>
        <div className={styles.productsContainer}>
          <h2 className={styles.sectionTitle}>면접 준비를 위한 프리미엄 서비스</h2>
          <p className={styles.sectionSubtitle}>
            당신의 경력과 목표에 맞는 상품을 선택하세요
          </p>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${selectedCategory === category.id ? styles.categoryTabActive : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className={`${styles.productCard} ${product.badge ? styles.productCardFeatured : ''}`}
                onClick={() => product.available && handleProductSelect(product.id)}
                style={{ cursor: product.available ? 'pointer' : 'not-allowed' }}
              >
                {product.badge && (
                  <div className={styles.productBadge}>{product.badge}</div>
                )}

                {/* Thumbnail */}
                <div className={styles.productThumbnail}>
                  <div className={styles.thumbnailPlaceholder}>
                    <span className={styles.thumbnailIcon}>
                      {product.category === 'interview' ? '💼' :
                       product.category === 'practice' ? '🎯' : '📄'}
                    </span>
                    <div className={styles.thumbnailText}>{product.name}</div>
                    <div className={styles.thumbnailSubtext}>{product.label}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className={styles.productTags}>
                  {product.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className={styles.productTag}>#{tag}</span>
                  ))}
                </div>

                <div className={styles.productHeader}>
                  <span className={styles.productLabel}>{product.label}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <span className={styles.productNameEn}>{product.nameEn}</span>
                </div>

                {/* Description */}
                <p className={styles.productDescription}>
                  {product.description}
                </p>

                <div className={styles.productPrice}>
                  {product.priceOriginal && (
                    <span className={styles.priceOriginal}>
                      ₩{product.priceOriginal.toLocaleString()}
                    </span>
                  )}
                  <span className={styles.priceCurrent}>
                    ₩{product.priceCurrent.toLocaleString()}
                  </span>
                </div>

                <button
                  className={`${styles.productBtn} ${!product.available ? styles.productBtnDisabled : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductSelect(product.id);
                  }}
                  disabled={!product.available}
                >
                  {product.available ? '자세히 보기' : '준비 중'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.howItWorksContainer}>
          <h2 className={styles.sectionTitle}>어떻게 작동하나요?</h2>
          <p className={styles.sectionSubtitle}>단 3단계로 시작하는 면접 준비</p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>📧</div>
              <h3 className={styles.stepTitle}>상품 선택 & 정보 입력</h3>
              <p className={styles.stepDesc}>
                원하는 상품을 선택하고 이메일과 이력서를 업로드하세요
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>🤖</div>
              <h3 className={styles.stepTitle}>AI 분석 & 질문 생성</h3>
              <p className={styles.stepDesc}>
                AI가 당신의 이력서를 분석하고 맞춤 질문을 생성합니다
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>👨‍💻</div>
              <h3 className={styles.stepTitle}>시니어 개발자 검수 & 발송</h3>
              <p className={styles.stepDesc}>
                현직 시니어 백엔드 개발자가 기술 정확성과 실무 적합성을 검증한 후,
                검증된 질문을 이메일로 발송합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparison}>
        <div className={styles.comparisonContainer}>
          <h2 className={styles.sectionTitle}>
            ChatGPT로 준비하다 지치셨나요?
          </h2>
          <p className={styles.sectionSubtitle}>
            매일 프롬프트 작성하며 2시간 쓰는 게 지겹지 않으세요?
          </p>

          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>구분</th>
                  <th className={styles.tableHeader}>ChatGPT로 직접 준비</th>
                  <th className={`${styles.tableHeader} ${styles.tableHeaderHighlight}`}>
                    <span className={styles.recommendBadge}>✨ 추천</span>
                    QueryDaily
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCategory}>준비 시간</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>매일 2시간씩 투자</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>하루 10분 투자</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>프롬프트 작성</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>매번 직접 작성 필요</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>이력서 한번만 제출</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>질문의 질</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>일반적인 답변</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>실제 면접 패턴 분석</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>개인화</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>내 경력과 무관한 질문</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>내 경력 맞춤 질문</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCategory}>지속성</td>
                  <td className={styles.tableCell}>
                    <span className={styles.negative}>금방 지쳐서 포기</span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellHighlight}`}>
                    <span className={styles.positive}>매일 아침 7시, 저녁 5시 자동 전송</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.comparisonFooter}>
            <p>프롬프트 엔지니어링 공부할 시간에, 면접 준비하세요.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faq}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>질문은 어떻게 받나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                그로스 플랜은 매일 오전 7시와 저녁 5시에 이메일로 발송됩니다.
                크리티컬 히트는 결제 후 24시간 이내에 3개의 질문이 한 번에 발송됩니다.
                모바일에서도 쉽게 확인할 수 있습니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>질문의 품질은 어떻게 보장되나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                기술 정확성, 통찰력, 공정성, 실무 관련성, 독창성 5가지 기준으로 품질 검증을 거칩니다.
                실제 면접에서 나올 법한 시나리오 기반 질문만 제공됩니다.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>환불 정책은 어떻게 되나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                그로스 플랜은 첫 질문 발송 전 100% 환불, 이후 일할 계산으로 환불됩니다.
                크리티컬 히트는 콘텐츠 열람 전 100% 환불 가능합니다.
                자세한 내용은 각 상품 페이지를 확인해주세요.
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>어떤 기술 스택을 다루나요?</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                Java/Spring 백엔드 개발자를 위한 서비스입니다.
                Spring Boot, JPA/Hibernate, MySQL/PostgreSQL, Redis, Kafka 등
                백엔드 생태계의 핵심 기술과 실무 경험을 중심으로 질문을 생성합니다.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                Query<span>Daily</span>
              </div>
              <p>이력서 맞춤형 면접 질문 서비스</p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerSection}>
                <h4>상품</h4>
                <a href="#products">전체 상품</a>
                <a href="#products">면접 준비</a>
                <a href="#products">실전 연습</a>
              </div>

              <div className={styles.footerSection}>
                <h4>고객지원</h4>
                <a href="#faq">FAQ</a>
                <a href="/terms">이용약관</a>
                <a href="/privacy">개인정보처리방침</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 QueryDaily. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Purchase Modal */}
      {purchaseModalOpen && selectedProduct && (
        <div className={styles.modal} onClick={() => setPurchaseModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setPurchaseModalOpen(false)}
            >
              ×
            </button>

            <h3 className={styles.modalTitle}>{selectedProduct.name}</h3>
            <p className={styles.modalSubtitle}>{selectedProduct.label}</p>

            <div className={styles.modalPrice}>
              {selectedProduct.priceOriginal && (
                <span className={styles.modalPriceOriginal}>
                  ₩{selectedProduct.priceOriginal.toLocaleString()}
                </span>
              )}
              <span className={styles.modalPriceCurrent}>
                ₩{selectedProduct.priceCurrent.toLocaleString()}
              </span>
            </div>

            <button
              className={styles.modalBtn}
              onClick={handlePurchase}
            >
              구매하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
