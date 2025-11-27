'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import './additional-styles.css';
import { ThemeProvider, ThemeSelector } from '../../../ThemeContext';
import {
  Calendar,
  Building2,
  BookOpen,
  Lightbulb,
  Check,
  Star,
  Users,
  Clock,
  Shield,
  TrendingUp,
  Mail,
  FileText,
  Bot,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Zap,
  Target,
  X,
  AlertCircle,
  Award,
  BarChart3,
  Briefcase,
  ChevronRight,
  Flame,
  MessageSquare,
  Trophy,
} from 'lucide-react';

function GrowthPlanV2Content() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.logo} onClick={() => router.push('/prototype-hyundoo/v4')}>
            <span className={styles.logoText}>
              Query<span className={styles.logoAccent}>Daily</span>
            </span>
          </div>
          <button className={styles.ctaButton}>
            합격 준비하기
          </button>
        </div>
      </header>

      {/* Floating CTA Button */}
      <div className={styles.floatingCta}>
        <div className={styles.floatingCtaContent}>
          <div className={styles.floatingPrice}>
            <span className={styles.floatingPriceOriginal}>₩106,000</span>
            <span className={styles.floatingPriceCurrent}>₩49,000</span>
          </div>
          <button className={styles.floatingCtaButton}>
            합격 준비하기
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {/* Sticky Sidebar */}
        <aside className={styles.stickySidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarBadge}>
              <Star size={14} />
              MOST POPULAR
            </div>

            <h3 className={styles.sidebarTitle}>그로스 플랜</h3>
            <p className={styles.sidebarSubtitle}>20일 집중 훈련</p>

            <div className={styles.sidebarPrice}>
              <div className={styles.sidebarPriceOriginal}>₩106,000</div>
              <div className={styles.sidebarPriceCurrent}>₩49,000</div>
              <div className={styles.sidebarDiscount}>54% 할인</div>
            </div>

            <div className={styles.sidebarFeatures}>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>매일 2회 맞춤 질문</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>20일간 총 40개 질문</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>상세 해설 & 꼬리질문</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>꼬리 질문 대비 전략</span>
              </div>
            </div>

            <button className={styles.sidebarCtaButton}>
              이력서 업로드
              <ArrowRight size={18} />
            </button>

            <div className={styles.sidebarStats}>
              <div className={styles.sidebarStat}>
                <Users size={16} />
                <span>4명 수강</span>
              </div>
              <div className={styles.sidebarStat}>
                <Star size={16} />
                <span>5.0 (4)</span>
              </div>
            </div>

            <p className={styles.sidebarRefund}>
              <Shield size={14} />
              첫 질문 발송 전 100% 환불
            </p>
          </div>
        </aside>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* 상단 배지들 */}
            <div className={styles.heroBadges}>
              <div className={styles.heroBadge}>
                <Zap size={16} />
                <span>오픈 특가 54% 할인</span>
              </div>
              <div className={styles.heroLiveBadge}>
                <div className={styles.liveDot}></div>
                <span>지금 12명이 준비 중</span>
              </div>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className={styles.heroTitle}>
              합격하는 사람들은<br />
              <span className={styles.heroHighlight}>이미 시작했습니다</span>
            </h1>

            {/* 서브 헤드라인 */}
            <p className={styles.heroSubheadline}>
              면접관이 물을 질문은 이미 <strong>당신 이력서에</strong> 다 있습니다
            </p>

            {/* 임팩트 넘버 */}
            <div className={styles.heroImpact}>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>85%</div>
                <div className={styles.impactLabel}>면접 통과율</div>
              </div>
              <div className={styles.impactDivider}>×</div>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>40개</div>
                <div className={styles.impactLabel}>맞춤 질문</div>
              </div>
              <div className={styles.impactDivider}>×</div>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>20일</div>
                <div className={styles.impactLabel}>집중 훈련</div>
              </div>
            </div>

            {/* 핵심 가치 제안 */}
            <div className={styles.heroValueProp}>
              <div className={styles.valueTitle}>
                <Award size={24} />
                <span>그로스 플랜 수강생만의 특별한 결과</span>
              </div>
              <div className={styles.valueGrid}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>일반 준비 대비 2.3배</strong>
                    <span>높은 합격률</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>평균 5.0/5.0</strong>
                    <span>만족도 (4개 리뷰)</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>매일 2번씩 20일간</strong>
                    <span>체계적인 학습 루틴</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className={styles.heroCtaSection}>
              <button className={styles.heroPrimaryButton}>
                <span>지금 바로 시작하기</span>
                <ArrowRight size={20} />
              </button>
              <div className={styles.heroCtaInfo}>
                <div className={styles.ctaInfoItem}>
                  <Shield size={16} />
                  <span>첫 질문 발송 전 100% 환불</span>
                </div>
                <div className={styles.ctaInfoItem}>
                  <Clock size={16} />
                  <span>7일 이내 시작 보장</span>
                </div>
              </div>
            </div>

            {/* 실제 수강생 후기 */}
            <div className={styles.heroReviewsSection}>
              <div className={styles.reviewsSectionHeader}>
                <h3 className={styles.reviewsSectionTitle}>실제 수강생 후기</h3>
                <p className={styles.reviewsSectionSubtitle}>그로스 플랜으로 합격한 사람들의 이야기</p>
              </div>

              <div className={styles.reviewsGrid}>
                {/* 후기 1 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.10.15</span>
                  </div>
                  <p className={styles.reviewText}>
                    "20일 동안 매일 질문을 받으면서 자연스럽게 면접 준비가 습관이 되었어요.
                    특히 꼬리 질문 대비 팁이 정말 유용했습니다. 실제 면접에서 예상했던
                    꼬리 질문이 나와서 당황하지 않고 답변할 수 있었어요."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>K</div>
                    <div>
                      <div className={styles.reviewName}>김** 님</div>
                      <div className={styles.reviewRole}>백엔드 개발자 · 신입</div>
                    </div>
                  </div>
                </div>

                {/* 후기 2 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.11.10</span>
                  </div>
                  <p className={styles.reviewText}>
                    "이력서 맞춤형 질문이라는 게 처음에는 반신반의했는데, 실제로 받아보니
                    제 프로젝트와 기술 스택을 정확히 파고드는 질문들이라 깜짝 놀랐습니다.
                    STAR 기법으로 답변을 구조화하는 연습도 많은 도움이 되었어요."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>L</div>
                    <div>
                      <div className={styles.reviewName}>이** 님</div>
                      <div className={styles.reviewRole}>백엔드 개발자 · 2년차</div>
                    </div>
                  </div>
                </div>

                {/* 후기 3 */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewStars}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <span className={styles.reviewDate}>2025.11.20</span>
                  </div>
                  <p className={styles.reviewText}>
                    "면접 준비를 어디서부터 시작해야 할지 막막했는데, 매일 아침 질문이
                    오니까 자연스럽게 공부 루틴이 만들어졌어요. 특히 상세 해설의
                    '질문 해부' 섹션이 면접관의 의도를 파악하는 데 큰 도움이 되었습니다."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>P</div>
                    <div>
                      <div className={styles.reviewName}>박** 님</div>
                      <div className={styles.reviewRole}>백엔드 개발자 · 3년차</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 신뢰 배지 */}
            <div className={styles.heroTrustBadges}>
              <div className={styles.trustBadge}>
                <Users size={18} />
                <span>4명 수강</span>
              </div>
              <div className={styles.trustBadge}>
                <TrendingUp size={18} />
                <span>85% 통과율</span>
              </div>
              <div className={styles.trustBadge}>
                <Award size={18} />
                <span>5가지 품질 검증</span>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Recommendation Section */}
        <section className={styles.planRecommendation}>
          <div className={styles.planRecommendationContainer}>
            <h2 className={styles.sectionTitle}>
              어떤 플랜이 나에게 맞을까?
            </h2>
            <p className={styles.sectionSubtitle}>
              상황에 맞는 플랜을 선택하세요
            </p>

            <div className={styles.planCardsGrid}>
              {/* 그로스 플랜 카드 */}
              <div className={styles.planCard + ' ' + styles.recommended}>
                <div className={styles.planCardTopBar}></div>
                <div className={styles.planCardBadge}>RECOMMENDED</div>
                <h3 className={styles.planCardTitle}>그로스 플랜</h3>
                <ul className={styles.planCardList}>
                  <li>
                    <Check size={18} />
                    <span>면접까지 <strong>1주일 이상</strong> 여유</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>모든 질문</strong> 빠짐없이 준비</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span>꼬리 질문까지 <strong>완벽 대비</strong></span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span>이번 이직이 <strong>정말 중요</strong>한 분</span>
                  </li>
                </ul>
              </div>

              {/* 크리티컬 히트 카드 */}
              <div className={styles.planCard}>
                <div className={styles.planCardTopBar + ' ' + styles.secondary}></div>
                <div className={styles.planCardBadge + ' ' + styles.secondary}>빠른 경험</div>
                <h3 className={styles.planCardTitle}>크리티컬 히트</h3>
                <ul className={styles.planCardList}>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span>면접이 <strong>3일 이내</strong>로 급한 분</span>
                  </li>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span><strong>먼저 경험</strong>해보고 싶은 분</span>
                  </li>
                  <li>
                    <span className={styles.planBullet}>•</span>
                    <span>핵심 <strong>3개만</strong> 빠르게</span>
                  </li>
                </ul>
                <button
                  className={styles.criticalHitCtaButton}
                  onClick={() => router.push('/prototype-hyundoo/v4/products/critical-hit')}
                >
                  <Zap size={18} />
                  크리티컬 히트 보러가기
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 추천 메시지 */}
            <div className={styles.planRecommendationMessage}>
              <p>
                <span className={styles.recommendQuestion}>고민된다면?</span>{' '}
                <strong className={styles.recommendPlan}>그로스 플랜</strong>을 추천드립니다.<br />
                <span className={styles.recommendSubtext}>제대로 준비해서 한 번에 붙는 게 결국 더 빠릅니다.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className={styles.painPoints}>
          <h2 className={styles.sectionTitle}>
            혹시 이런 경험 있으신가요?
          </h2>

          <div className={styles.painPointsSimple}>
            <div className={styles.painPointItem}>
              <X size={20} className={styles.xIcon} />
              <span>면접관 앞에서 <strong>"저는... 음..."</strong> 버벅거림</span>
            </div>
            <div className={styles.painPointItem}>
              <X size={20} className={styles.xIcon} />
              <span><strong>"좀 더 구체적으로요"</strong> 라는 말에 식은땀</span>
            </div>
            <div className={styles.painPointItem}>
              <X size={20} className={styles.xIcon} />
              <span><strong>"왜 그렇게 했나요?"</strong> 꼬리 질문에 패닉</span>
            </div>
            <div className={styles.painPointItem}>
              <X size={20} className={styles.xIcon} />
              <span>면접 끝나고 <strong>"아 그때 그렇게 말할 걸..."</strong> 후회</span>
            </div>
          </div>

          <div className={styles.painPointsSolution}>
            <div className={styles.solutionArrow}>↓</div>
            <div className={styles.solutionContent}>
              <CheckCircle2 size={28} className={styles.checkIcon} />
              <div>
                <strong>실력 문제가 아닙니다. 연습 부족입니다.</strong>
                <span>20일만 투자하면 달라집니다</span>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes - 흔한 실수 */}
        <section className={styles.commonMistakes}>
          <h2 className={styles.sectionTitle}>
            면접 준비, 이렇게 하면 실패합니다
          </h2>
          <p className={styles.sectionSubtitle}>
            이미 검증된 올바른 방법으로 준비하세요
          </p>

          <div className={styles.mistakesGrid}>
            <div className={styles.mistakeCard}>
              <div className={styles.mistakeHeader}>
                <X size={24} className={styles.xIcon} />
                <h3>일반 모범 답안 달달 외우기</h3>
              </div>
              <p className={styles.mistakeDesc}>
                면접관은 외운 티 바로 알아챕니다. 실제 경험이 없는 답변은 티가 납니다.
              </p>
              <div className={styles.mistakeSolution}>
                <Check size={18} className={styles.checkIcon} />
                <span><strong>해결:</strong> 내 경험 기반 스토리로 만들어야 합니다</span>
              </div>
            </div>

            <div className={styles.mistakeCard}>
              <div className={styles.mistakeHeader}>
                <X size={24} className={styles.xIcon} />
                <h3>프로젝트는 많은데 설명을 못함</h3>
              </div>
              <p className={styles.mistakeDesc}>
                "뭐 했는지"만 나열하고 "왜, 어떻게"를 못 말하면 설득력이 없습니다.
              </p>
              <div className={styles.mistakeSolution}>
                <Check size={18} className={styles.checkIcon} />
                <span><strong>해결:</strong> STAR 기법으로 구조화된 답변 준비</span>
              </div>
            </div>

            <div className={styles.mistakeCard}>
              <div className={styles.mistakeHeader}>
                <X size={24} className={styles.xIcon} />
                <h3>메인 질문만 준비하고 꼬리 질문 무시</h3>
              </div>
              <p className={styles.mistakeDesc}>
                진짜 실력은 꼬리 질문에서 드러납니다. 여기서 대부분 탈락합니다.
              </p>
              <div className={styles.mistakeSolution}>
                <Check size={18} className={styles.checkIcon} />
                <span><strong>해결:</strong> 꼬리 질문까지 미리 준비해야 합니다</span>
              </div>
            </div>

            <div className={styles.mistakeCard}>
              <div className={styles.mistakeHeader}>
                <X size={24} className={styles.xIcon} />
                <h3>벼락치기로 전날 밤 준비</h3>
              </div>
              <p className={styles.mistakeDesc}>
                단기 기억은 실전에서 안 나옵니다. 긴장하면 다 날아갑니다.
              </p>
              <div className={styles.mistakeSolution}>
                <Check size={18} className={styles.checkIcon} />
                <span><strong>해결:</strong> 20일간 매일 조금씩, 장기 기억으로 내재화</span>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className={styles.beforeAfter}>
          <div className={styles.beforeAfterHeader}>
            <h2 className={styles.sectionTitle}>
              능력이 아니라, 준비의 차이입니다
            </h2>
            <p className={styles.sectionSubtitle}>
              실력은 이미 충분합니다. 그걸 보여주는 연습만 하면 됩니다.
            </p>

            {/* 메인 통계 박스 */}
            <div className={styles.mainStatBox}>
              <div className={styles.mainStatItem}>
                <div className={styles.mainStatBefore}>
                  <X size={20} />
                  <span>준비 없이</span>
                </div>
                <div className={styles.mainStatNumber}>38%</div>
                <div className={styles.mainStatLabel}>평균 합격률</div>
              </div>

              <div className={styles.mainStatVs}>→</div>

              <div className={styles.mainStatItem}>
                <div className={styles.mainStatAfter}>
                  <Check size={20} />
                  <span>체계적 준비</span>
                </div>
                <div className={styles.mainStatNumber + ' ' + styles.success}>85%</div>
                <div className={styles.mainStatLabel}>합격률 달성</div>
              </div>

              <div className={styles.mainStatBadge}>
                <TrendingUp size={18} />
                <strong>2.3배</strong> 높은 합격률
              </div>
            </div>
          </div>

          <div className={styles.comparisonGrid}>
            {/* Before Column */}
            <div className={styles.comparisonColumn + ' ' + styles.beforeColumn}>
              <div className={styles.comparisonHeader + ' ' + styles.before}>
                <div className={styles.headerIconBadge + ' ' + styles.beforeBadge}>
                  <X size={32} />
                </div>
                <div>
                  <h3>보통의 면접 준비</h3>
                  <p className={styles.comparisonSubheader}>뭘 해야 할지 모르겠는 상태</p>
                </div>
              </div>
              <div className={styles.comparisonItems}>
                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>1</div>
                  <div className={styles.comparisonContent}>
                    <strong>면접 질문 검색</strong>
                    <span className={styles.comparisonDetail}>어떤 게 나올지 모름</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>2</div>
                  <div className={styles.comparisonContent}>
                    <strong>블로그 뒤져서 모범답안 정리</strong>
                    <span className={styles.comparisonDetail}>내 경험이랑 안 맞음</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>3</div>
                  <div className={styles.comparisonContent}>
                    <strong>혼자 답변 연습</strong>
                    <span className={styles.comparisonDetail}>이게 맞나? 확신 없음</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>4</div>
                  <div className={styles.comparisonContent}>
                    <strong>매일 몇 시간씩 준비</strong>
                    <span className={styles.comparisonDetail}>언제 끝날지 모름</span>
                  </div>
                </div>

                <div className={styles.comparisonResult + ' ' + styles.resultFail}>
                  <X size={20} />
                  <div>
                    <strong>결과: 불안한 채로 면접장 입장</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* After Column */}
            <div className={styles.comparisonColumn + ' ' + styles.afterColumn}>
              <div className={styles.comparisonHeader + ' ' + styles.after}>
                <div className={styles.headerIconBadge + ' ' + styles.afterBadge}>
                  <Check size={32} />
                </div>
                <div>
                  <h3>QueryDaily로 준비하면</h3>
                  <p className={styles.comparisonSubheader}>"이 질문, 준비했던 건데?"</p>
                </div>
              </div>
              <div className={styles.comparisonItems}>
                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>1</div>
                  <div className={styles.comparisonContent}>
                    <strong>내 이력서 기반 예상 질문 완비</strong>
                    <span className={styles.comparisonDetail}>면접관이 물을 질문, 이미 다 준비됨</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>2</div>
                  <div className={styles.comparisonContent}>
                    <strong>꼬리질문까지 미리 대비</strong>
                    <span className={styles.comparisonDetail}>"왜요?" "어떻게요?"에도 막힘없이</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>3</div>
                  <div className={styles.comparisonContent}>
                    <strong>실전에서 바로 쓰는 답변 구조</strong>
                    <span className={styles.comparisonDetail}>준비한 그대로 자신있게 답변</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>4</div>
                  <div className={styles.comparisonContent}>
                    <strong>예상 적중률 85%</strong>
                    <span className={styles.comparisonDetail}>실제 면접에서 준비한 질문이 나옴</span>
                  </div>
                </div>

                <div className={styles.comparisonResult + ' ' + styles.resultSuccess}>
                  <Check size={20} />
                  <div>
                    <strong>결과: "아, 이거 준비했던 건데!" 자신감 폭발</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.beforeAfterCta}>
            <div className={styles.beforeAfterCtaBox}>
              <div className={styles.ctaBoxIcon}>
                <Zap size={32} />
              </div>
              <div className={styles.ctaBoxContent}>
                <h3>합격은 여유에서 나옵니다</h3>
                <p>준비된 사람은 떨지 않습니다. 20일 후, 당신도 그렇게 됩니다.</p>
              </div>
              <button className={styles.ctaBoxButton}>
                이력서 업로드
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Product Detail Intro */}
        <section className={styles.productDetailIntro}>
          <div className={styles.detailIntroContent}>
            <span className={styles.detailIntroBadge}>상품 상세</span>
            <h2 className={styles.detailIntroTitle}>
              20일 동안<br />
              <span className={styles.detailIntroHighlight}>무엇을 받게 되나요?</span>
            </h2>
            <p className={styles.detailIntroDesc}>
              그로스 플랜에 포함된 모든 것을 확인하세요
            </p>
          </div>
        </section>

        {/* Product Info Section */}
        <section className={styles.productInfo}>
          <div className={styles.productContent}>
            {/* 상품 설명 이미지 */}
            <div className={styles.productImages}>
              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <Calendar size={24} />
                  매일 발송되는 맞춤형 질문
                </h2>
                <p className={styles.imageCardDesc}>
                  오전 7시와 오후 5시, 하루 2번<br />
                  총 40개의 질문이 20일간 발송됩니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>오전 7시: 출근길 학습용 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>오후 5시: 상세 해설 & 꼬리질문</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Clock size={20} />
                  <div>
                    <strong>하루 10분이면 충분!</strong>
                    <span>출퇴근길 갓생 루틴으로 면접 준비 완료</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <Building2 size={24} />
                  실제 기출 질문 포함
                </h2>
                <p className={styles.imageCardDesc}>
                  네카라쿠배부터 삼성·현대·LG까지<br />
                  500개 이상의 실제 면접 질문을 분석했습니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>토스, 당근, 배민 등 유니콘 기업 기출</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>삼성, 현대, LG 대기업 면접 패턴</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>스타트업부터 대기업까지 맞춤 분석</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Target size={20} />
                  <div>
                    <strong>예상 적중률 85%</strong>
                    <span>실제 면접에서 준비한 질문이 나와요</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <BookOpen size={24} />
                  상세 해설 & 꼬리질문
                </h2>
                <p className={styles.imageCardDesc}>
                  5단계 구성의 체계적인 가이드로<br />
                  STAR 기법까지 완벽하게 학습
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>질문 해부: 면접관의 의도 파악</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>STAR 기법 기반 답변 구조화</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>핵심 키워드 및 기술 용어 정리</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <Award size={20} />
                  <div>
                    <strong>면접관이 원하는 답변 구조</strong>
                    <span>"무슨 일이 있었고, 뭘 했고, 어떻게 됐는지" 순서대로</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <Lightbulb size={24} />
                  꼬리 질문 대비 전략
                </h2>
                <p className={styles.imageCardDesc}>
                  면접의 진짜 승부처인 꼬리 질문을<br />
                  미리 준비하여 완벽하게 대응
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>질문별 3-5개 예상 꼬리 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>꼬리 질문 대응 전략 제공</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>실무 경험 연결 팁</span>
                  </div>
                </div>
                <div className={styles.imageCardHighlight}>
                  <MessageSquare size={20} />
                  <div>
                    <strong>"왜요?" "어떻게요?"에도 막힘없이</strong>
                    <span>진짜 실력이 드러나는 꼬리질문까지 완벽 대비</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Email Preview Section */}
        <section className={styles.emailPreview}>
          <h2 className={styles.sectionTitle}>
            실제로 받게 될 이메일
          </h2>
          <p className={styles.sectionSubtitle}>
            매일 오전 7시와 오후 5시, 이런 이메일을 받게 됩니다
          </p>

          <div className={styles.emailTimeline}>
            {/* 오전 7시 이메일 */}
            <div className={styles.emailTimeSlot}>
              <div className={styles.emailTime}>
                <Clock size={24} />
                <span>오전 7시</span>
              </div>

              <div className={styles.emailCard}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailFrom}>
                    <Mail size={18} />
                    <div>
                      <div className={styles.emailSender}>QueryDaily</div>
                      <div className={styles.emailAddress}>question@querydaily.com</div>
                    </div>
                  </div>
                  <div className={styles.emailBadge}>Day 1 / 20</div>
                </div>

                <div className={styles.emailSubject}>
                  [QueryDaily] Day 1: 프로젝트 아키텍처 설계 경험
                </div>

                <div className={styles.emailBody}>
                  <div className={styles.emailGreeting}>
                    안녕하세요, 김개발님 👋<br />
                    오늘의 면접 질문을 준비했습니다.
                  </div>

                  <div className={styles.emailQuestion}>
                    <div className={styles.questionLabel}>
                      <Lightbulb size={20} />
                      오늘의 질문
                    </div>
                    <div className={styles.questionText}>
                      이력서에 기재된 "사용자 관리 시스템 개발" 프로젝트에서<br />
                      마이크로서비스 아키텍처를 선택한 이유는 무엇인가요?<br />
                      기존 모놀리식 구조 대비 어떤 장단점을 고려하셨나요?
                    </div>
                  </div>

                  <div className={styles.emailTags}>
                    <span className={styles.emailTag}>#아키텍처</span>
                    <span className={styles.emailTag}>#기술선택</span>
                    <span className={styles.emailTag}>#트레이드오프</span>
                  </div>

                  <div className={styles.emailTip}>
                    💡 <strong>준비 팁:</strong> 오늘 하루 이 질문에 대해 생각해보세요.<br />
                    오후 5시에 상세 해설과 꼬리질문을 보내드립니다.
                  </div>
                </div>
              </div>
            </div>
            {/* 오후 5시 이메일 */}
            <div className={styles.emailTimeSlot}>
              <div className={styles.emailTime}>
                <Clock size={24} />
                <span>오후 5시</span>
              </div>

              <div className={styles.emailCard}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailFrom}>
                    <Mail size={18} />
                    <div>
                      <div className={styles.emailSender}>QueryDaily</div>
                      <div className={styles.emailAddress}>official.querydaily@gmail.com</div>
                    </div>
                  </div>
                  <div className={styles.emailBadge + ' ' + styles.premium}>프리미엄 가이드</div>
                </div>

                <div className={styles.emailSubject}>
                  [QueryDaily] Day 1 상세 해설: STAR 기법으로 완벽 대비하기
                </div>

                <div className={styles.emailBody}>
                  <div className={styles.emailQuestionBox}>
                    <div className={styles.emailQuestionLabel}>
                      <Target size={18} />
                      오늘의 질문
                    </div>
                    <p className={styles.emailQuestionText}>
                      이력서에 기재된 "사용자 관리 시스템 개발" 프로젝트에서
                      마이크로서비스 아키텍처를 선택한 이유는 무엇인가요?
                      기존 모놀리식 구조 대비 어떤 장단점을 고려하셨나요?
                    </p>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <BarChart3 size={20} />
                      1. 질문 분석
                    </div>
                    <div className={styles.answerContent}>
                      이 질문은 단순히 기술 선택의 이유만 묻는 것이 아닙니다.<br />
                      <strong>면접관이 진짜 보고 싶은 것:</strong>
                      <ul>
                        <li>기술적 trade-off를 이해하고 있는가</li>
                        <li>비즈니스 요구사항을 기술로 풀어낼 수 있는가</li>
                        <li>의사결정 과정이 논리적인가</li>
                      </ul>
                    </div>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <Target size={20} />
                      2. 핵심 키워드
                    </div>
                    <div className={styles.keywords}>
                      <span className={styles.keyword}>API Gateway</span>
                      <span className={styles.keyword}>Service Mesh</span>
                      <span className={styles.keyword}>Event-Driven</span>
                      <span className={styles.keyword}>Saga Pattern</span>
                      <span className={styles.keyword}>Circuit Breaker</span>
                    </div>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <Star size={20} />
                      3. STAR 구조화
                    </div>
                    <div className={styles.starFramework}>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>
                          <span className={styles.starLetter}>S</span>
                          <span className={styles.starMeaning}>Situation</span>
                        </div>
                        <div className={styles.starText}>
                          "당시 회사는 사용자가 급증하면서 모놀리식 구조의 한계를 느끼고 있었습니다."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>
                          <span className={styles.starLetter}>T</span>
                          <span className={styles.starMeaning}>Task</span>
                        </div>
                        <div className={styles.starText}>
                          "저는 확장 가능하면서도 팀이 독립적으로 개발할 수 있는 구조를 설계해야 했습니다."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>
                          <span className={styles.starLetter}>A</span>
                          <span className={styles.starMeaning}>Action</span>
                        </div>
                        <div className={styles.starText}>
                          "각 도메인별로 서비스를 분리하고, API Gateway 패턴을 도입했습니다."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>
                          <span className={styles.starLetter}>R</span>
                          <span className={styles.starMeaning}>Result</span>
                        </div>
                        <div className={styles.starText}>
                          "배포 주기가 2주에서 3일로 단축되었고, 장애 격리가 가능해졌습니다."
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <Users size={20} />
                      4. 페르소나별 모범 답변
                    </div>
                    <div className={styles.personaAnswers}>
                      <div className={styles.personaCard + ' ' + styles.bigTech}>
                        <div className={styles.personaHeader}>
                          <Building2 size={18} />
                          <span>빅테크 지원자</span>
                        </div>
                        <p className={styles.personaText}>
                          "저희 팀은 일 평균 트래픽 500만 요청을 처리하는 시스템을 운영했습니다.
                          모놀리식 구조에서 배포 시 전체 서비스 다운타임이 발생했고, 이를 해결하기 위해
                          도메인 주도 설계를 기반으로 마이크로서비스로 전환했습니다.
                          결과적으로 무중단 배포가 가능해지고 장애 격리율이 95%까지 향상되었습니다."
                        </p>
                      </div>
                      <div className={styles.personaCard + ' ' + styles.unicorn}>
                        <div className={styles.personaHeader}>
                          <Zap size={18} />
                          <span>유니콘 지원자</span>
                        </div>
                        <p className={styles.personaText}>
                          "빠르게 성장하는 스타트업에서 개발 속도와 안정성의 균형이 중요했습니다.
                          처음에는 빠른 개발을 위해 모놀리식으로 시작했지만, 팀이 10명으로 늘어나면서
                          배포 충돌이 잦아졌습니다. 핵심 도메인부터 점진적으로 분리하여
                          팀별 독립 배포가 가능해지고 개발 생산성이 2배 향상되었습니다."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <MessageSquare size={20} />
                      5. 예상 꼬리 질문
                    </div>
                    <div className={styles.followUpQuestions}>
                      <div className={styles.followUpItem}>
                        <span className={styles.followUpNumber}>Q1</span>
                        <span>"마이크로서비스 전환 과정에서 가장 어려웠던 점은?"</span>
                      </div>
                      <div className={styles.followUpItem}>
                        <span className={styles.followUpNumber}>Q2</span>
                        <span>"서비스 간 통신은 어떻게 처리했나요?"</span>
                      </div>
                      <div className={styles.followUpItem}>
                        <span className={styles.followUpNumber}>Q3</span>
                        <span>"분산 트랜잭션 문제는 어떻게 해결했나요?"</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.emailFooter}>
                    <p className={styles.emailCopyright}>© 2025 QueryDaily Growth Plan by AsyncSite</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.emailPreviewCta}>
            <p className={styles.emailPreviewText}>
              이렇게 <strong>매일 2번</strong>, <strong>20일간 총 40개의 질문</strong>을 받게 됩니다.<br />
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>
            어떻게 작동하나요?
          </h2>
          <p className={styles.sectionSubtitle}>
            4단계로 시작하는 체계적인 면접 준비
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <FileText size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>이력서 업로드</h3>
                <p className={styles.stepDescription}>
                  결제 후 이력서를 업로드하면 현직 시니어 개발자들이
                  직접 검토하여 맞춤형 질문을 설계합니다.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <Bot size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>맞춤 질문 생성</h3>
                <p className={styles.stepDescription}>
                  이력서 분석 결과를 바탕으로 실제 면접에서 나올 법한
                  시나리오 기반 질문과 예상 꼬리질문을 생성합니다.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <CheckCircle2 size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>품질 검증</h3>
                <p className={styles.stepDescription}>
                  생성된 질문은 기술 정확성, 통찰력, 공정성, 실무 관련성,
                  독창성 5가지 기준으로 품질 검증을 거칩니다.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <Mail size={24} className={styles.stepIcon} />
                <h3 className={styles.stepTitle}>매일 자동 발송</h3>
                <p className={styles.stepDescription}>
                  매일 오전 7시와 오후 5시, 검증된 질문과 상세 해설이
                  이메일로 자동 발송됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table - 경쟁 우위 */}
        <section className={styles.comparisonTable}>
          <h2 className={styles.sectionTitle}>
            다른 면접 준비 방법과 비교해보세요
          </h2>
          <p className={styles.sectionSubtitle}>
            QueryDaily만의 차별화된 가치
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th>일반 모범답안 책</th>
                  <th>면접 컨설팅</th>
                  <th className={styles.highlighted}>QueryDaily</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>가격</td>
                  <td>₩30,000</td>
                  <td>₩500,000+</td>
                  <td className={styles.highlighted}><strong>₩49,000</strong></td>
                </tr>
                <tr>
                  <td>맞춤형 질문</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>지속 기간</td>
                  <td>1회성</td>
                  <td>1-2회</td>
                  <td className={styles.highlighted}><strong>20일 매일</strong></td>
                </tr>
                <tr>
                  <td>STAR 기법</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>꼬리 질문 대비</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td>△</td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>이력서 분석</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td><Check size={18} className={styles.checkIcon} /></td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                </tr>
                <tr>
                  <td>영구 보관</td>
                  <td>△</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Guarantee Section - 리스크 제거 */}
        <section className={styles.guarantee}>
          <h2 className={styles.sectionTitle}>
            걱정 없이 시작하세요
          </h2>
          <p className={styles.sectionSubtitle}>
            QueryDaily가 책임집니다
          </p>

          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <Shield size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>100% 환불 보장</h3>
              <p className={styles.guaranteeDesc}>
                첫 질문 발송 전이라면 전액 환불해드립니다. 질문의 품질에 자신이 있기 때문입니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <CheckCircle2 size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>품질 보증</h3>
              <p className={styles.guaranteeDesc}>
                5가지 기준으로 검증된 질문만 발송합니다. 만족하지 못하시면 재생성해드립니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <Shield size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>개인정보 보호</h3>
              <p className={styles.guaranteeDesc}>
                이력서는 암호화되어 안전하게 보관됩니다. 질문 생성 외 다른 용도로 사용하지 않습니다.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>
                <MessageSquare size={48} />
              </div>
              <h3 className={styles.guaranteeTitle}>빠른 고객 지원</h3>
              <p className={styles.guaranteeDesc}>
                카카오톡으로 1:1 실시간 상담이 가능합니다. 궁금한 점은 언제든 물어보세요.
              </p>
            </div>
          </div>
        </section>

        {/* Urgency Section - 긴급성 */}
        <section className={styles.urgency}>
          <div className={styles.urgencyHeader}>
            <div className={styles.urgencyBadge}>
              <Clock size={16} />
              <span>타이밍이 중요합니다</span>
            </div>
            <h2 className={styles.urgencyMainTitle}>
              면접 준비, <span className={styles.urgencyHighlight}>미루면 늦습니다</span>
            </h2>
            <p className={styles.urgencySubtitle}>
              합격한 사람들의 공통점은 단 하나, <strong>일찍 시작했다</strong>는 것입니다
            </p>
          </div>

          <div className={styles.urgencyContent}>
            {/* 왼쪽: 타임라인 */}
            <div className={styles.urgencyTimeline}>
              <div className={styles.timelineItem + ' ' + styles.timelineNow}>
                <div className={styles.timelineDot}>
                  <div className={styles.timelinePulse}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>지금 시작하면</div>
                  <div className={styles.timelineTitle}>20일 후, 면접장에서 자신감</div>
                  <div className={styles.timelineDesc}>
                    모든 예상 질문 준비 완료 + 꼬리질문까지 대비
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>1주일 뒤 시작하면</div>
                  <div className={styles.timelineTitle}>핵심 질문만 겨우 준비</div>
                  <div className={styles.timelineDesc}>
                    꼬리질문 대비 불가, 불안한 상태로 면접
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem + ' ' + styles.timelineDanger}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>면접 직전 시작하면</div>
                  <div className={styles.timelineTitle}>준비 없이 면접장 입장</div>
                  <div className={styles.timelineDesc}>
                    "아... 그때 시작할 걸" 후회
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: CTA 카드 */}
            <div className={styles.urgencyCtaCard}>
              <div className={styles.urgencyCtaHeader}>
                <Zap size={24} />
                <span>오픈 특가 진행 중</span>
              </div>

              <div className={styles.urgencyPriceSection}>
                <div className={styles.urgencyPriceOriginal}>₩106,000</div>
                <div className={styles.urgencyPriceCurrent}>₩49,000</div>
                <div className={styles.urgencyDiscount}>54% 할인</div>
              </div>

              <div className={styles.urgencyBenefits}>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>20일간 40개 맞춤 질문</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>STAR 기법 상세 해설</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Check size={18} />
                  <span>꼬리질문 완벽 대비</span>
                </div>
                <div className={styles.urgencyBenefitItem}>
                  <Shield size={18} />
                  <span>첫 질문 전 100% 환불</span>
                </div>
              </div>

              <button className={styles.urgencyCtaButton}>
                지금 바로 시작하기
                <ArrowRight size={20} />
              </button>

              <div className={styles.urgencyCtaNote}>
                <Clock size={14} />
                <span>결제 후 7일 이내 시작 보장</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faq}>
          <h2 className={styles.sectionTitle}>
            자주 묻는 질문
          </h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 0 ? styles.active : ''}`}
                onClick={() => toggleFaq(0)}
              >
                <span>20일 안에 완료하지 못하면 어떻게 되나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 0 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 0 && (
                <div className={styles.faqAnswer}>
                  <p>
                    결제 후 7일 이내에 20일간의 질문 발송이 완료됩니다.
                    <br /><br />
                    질문 발송 시작 시점을 직접 선택할 수 있으며,
                    <br />
                    한번 시작하면 20일간 매일 자동으로 발송됩니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 1 ? styles.active : ''}`}
                onClick={() => toggleFaq(1)}
              >
                <span>이력서는 어떤 형식으로 업로드하나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 1 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 1 && (
                <div className={styles.faqAnswer}>
                  <p>
                    PDF 형식을 지원합니다.
                    <br /><br />
                    가장 최신 버전의 이력서를 업로드해주시면 현직 시니어 개발자들이 직접 분석하고 확인하여 기술 스택, 프로젝트 경험, 경력 수준을 파악합니다.
                    <br /><br />
                    이력서는 안전하게 암호화되어 저장되며, 질문 생성에만 사용됩니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 2 ? styles.active : ''}`}
                onClick={() => toggleFaq(2)}
              >
                <span>환불 정책이 궁금합니다.</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 2 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 2 && (
                <div className={styles.faqAnswer}>
                  <p>
                    첫 질문 발송 전에는 100% 환불이 가능합니다.
                    <br /><br />
                    질문 발송이 시작된 이후에는 남은 일수에 대해 일할 계산하여 환불해드립니다.
                    <br /><br />
                    예를 들어 20일 중 10일간 질문을 받으셨다면, 남은 10일에 해당하는 금액을 환불받으실 수 있습니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 3 ? styles.active : ''}`}
                onClick={() => toggleFaq(3)}
              >
                <span>질문이 제 이력서와 맞지 않으면 어떻게 하나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 3 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 3 && (
                <div className={styles.faqAnswer}>
                  <p>
                    모든 질문은 5가지 품질 기준(기술 정확성, 통찰력, 공정성, 실무 관련성, 독창성)으로 검증됩니다.
                    <br /><br />
                    만약 이력서와 맞지 않는 질문이 발송된 경우 고객센터로 문의해주시면 해당 질문을 재생성하여 발송해드립니다.
                    <br /><br />
                    품질에 자신이 있기 때문에 이런 정책을 운영하고 있습니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 4 ? styles.active : ''}`}
                onClick={() => toggleFaq(4)}
              >
                <span>상세 해설만 받고 질문은 스킵할 수 있나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 4 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 4 && (
                <div className={styles.faqAnswer}>
                  <p>
                    오전 7시에 질문이 발송되고, 오후 5시에 해당 질문의 상세 해설이 발송됩니다.
                    <br /><br />
                    질문을 먼저 스스로 고민해보는 것을 권장하지만, 시간이 부족하다면 오후 5시의 상세 해설을 바로 확인하셔도 됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section className={styles.finalCta}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              지금 이 순간, 당신은 이미 변하고 있습니다
            </h2>
            <p className={styles.finalCtaSubtitle} style={{
              fontSize: '1.1rem',
              lineHeight: '1.9',
              maxWidth: '600px',
              margin: '0 auto',
              opacity: 0.9
            }}>
              면접이 두려운 건 당연합니다.<br />
              누구나 처음은 떨리니까요.<br /><br />

              하지만 20일 뒤, 면접장 문을 열고 들어가는 당신은<br />
              오늘의 당신과 다른 사람일 겁니다.<br /><br />

              &ldquo;이 질문, 나 준비했어.&rdquo;<br />
              그 한마디가 입 밖으로 나올 때의 자신감.<br /><br />

              그게 바로 우리가 드리고 싶은 선물입니다.<br /><br />

              <strong style={{ color: 'var(--color-accent)' }}>
                당신의 이야기는, 충분히 가치 있습니다.
              </strong>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '5rem 2rem 2rem',
          background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(var(--color-accent-rgb), 0.08) 100%)',
          borderTop: '1px solid rgba(var(--color-accent-rgb), 0.1)',
          marginTop: '4rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* 상단 컨텐츠 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '4rem'
            }}>
              {/* 브랜드 섹션 */}
              <div style={{ maxWidth: '400px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                  Query<span style={{ color: 'var(--color-secondary)' }}>Daily</span>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  당신의 이력서를 분석해서,<br />
                  면접관이 꼭 물어볼 질문을 매일 보내드립니다.
                </p>

                {/* 소셜 링크 */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://www.instagram.com/querydaily"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(var(--color-accent-rgb), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="http://pf.kakao.com/_fxdxfTG"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(var(--color-accent-rgb), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.18.483.378.352.156-.103 2.5-1.667 3.508-2.343.538.073 1.093.112 1.624.112 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* 링크 섹션들 */}
              <div style={{
                display: 'flex',
                gap: '4rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>상품</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="/prototype-hyundoo/v4#products" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>전체 상품</a>
                    <a href="/prototype-hyundoo/v4/products/growth-plan/v2" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>그로스 플랜</a>
                    <a href="/prototype-hyundoo/v4#products" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>크리티컬 히트</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>서비스</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="#how-it-works" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>이용방법</a>
                    <a href="#faq" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>자주 묻는 질문</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>1:1 상담</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>고객지원</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="/terms" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>이용약관</a>
                    <a href="/privacy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>개인정보처리방침</a>
                    <a href="/refund" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>환불정책</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>Contact</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="mailto:official.querydaily@gmail.com" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>official.querydaily@gmail.com</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>카카오톡 상담</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 - 저작권 및 사업자 정보 */}
            <div style={{
              borderTop: '1px solid rgba(var(--color-accent-rgb), 0.1)',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)'
              }}>© 2024 QueryDaily. All rights reserved.</p>
              <p style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)'
              }}>사업자등록번호: 456-12-02771 | 대표: 최보임</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function GrowthPlanV2() {
  return (
    <ThemeProvider>
      <GrowthPlanV2Content />
    </ThemeProvider>
  );
}