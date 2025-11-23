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
                <span>프리미엄 답변 가이드</span>
              </div>
              <div className={styles.sidebarFeature}>
                <Check size={16} />
                <span>꼬리 질문 대비 전략</span>
              </div>
            </div>

            <button className={styles.sidebarCtaButton}>
              합격 준비 시작하기
              <ArrowRight size={18} />
            </button>

            <div className={styles.sidebarStats}>
              <div className={styles.sidebarStat}>
                <Users size={16} />
                <span>342명 수강</span>
              </div>
              <div className={styles.sidebarStat}>
                <Star size={16} />
                <span>4.8 (127)</span>
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
                <span>오늘만 54% 특가</span>
              </div>
              <div className={styles.heroLiveBadge}>
                <div className={styles.liveDot}></div>
                <span>지금 342명이 준비 중</span>
              </div>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className={styles.heroTitle}>
              합격하는 사람들은<br/>
              <span className={styles.heroHighlight}>이미 시작했습니다</span>
            </h1>

            {/* 서브 헤드라인 */}
            <p className={styles.heroSubheadline}>
              면접관이 물을 질문은 이미 <strong>당신 이력서에</strong> 다 있습니다
            </p>

            {/* 임팩트 넘버 */}
            <div className={styles.heroImpact}>
              <div className={styles.impactItem}>
                <div className={styles.impactNumber}>89%</div>
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
                    <strong>일반 준비 대비 3.2배</strong>
                    <span>높은 합격률</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.valueContent}>
                    <strong>평균 4.8/5.0</strong>
                    <span>만족도 (127개 리뷰)</span>
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
                  <span>30일 이내 시작 보장</span>
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
                    <span className={styles.reviewDate}>2024.01.15</span>
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
                      <div className={styles.reviewRole}>백엔드 개발자 · 네이버 합격</div>
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
                    <span className={styles.reviewDate}>2024.01.20</span>
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
                      <div className={styles.reviewRole}>프론트엔드 개발자 · 카카오 합격</div>
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
                    <span className={styles.reviewDate}>2024.02.03</span>
                  </div>
                  <p className={styles.reviewText}>
                    "면접 준비를 어디서부터 시작해야 할지 막막했는데, 매일 아침 질문이
                    오니까 자연스럽게 공부 루틴이 만들어졌어요. 특히 답변 가이드의
                    '질문 해부' 섹션이 면접관의 의도를 파악하는 데 큰 도움이 되었습니다."
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAvatar}>P</div>
                    <div>
                      <div className={styles.reviewName}>박** 님</div>
                      <div className={styles.reviewRole}>풀스택 개발자 · 토스 합격</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 신뢰 배지 */}
            <div className={styles.heroTrustBadges}>
              <div className={styles.trustBadge}>
                <Users size={18} />
                <span>342명 수강</span>
              </div>
              <div className={styles.trustBadge}>
                <TrendingUp size={18} />
                <span>89% 통과율</span>
              </div>
              <div className={styles.trustBadge}>
                <Award size={18} />
                <span>5가지 품질 검증</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className={styles.painPoints}>
          <h2 className={styles.sectionTitle}>
            이런 고민, 있으시죠?
          </h2>
          <p className={styles.sectionSubtitle}>
            많은 지원자들이 똑같은 문제로 고민합니다
          </p>

          <div className={styles.painPointsGrid}>
            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>이력서는 화려한데 말문이 막힌다</h3>
              <p className={styles.painPointDesc}>
                프로젝트 경험은 많은데 면접관 앞에서는 "저는... 음..." 버벅거리기만 합니다
              </p>
            </div>

            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>기본 질문도 제대로 못 답한다</h3>
              <p className={styles.painPointDesc}>
                "이 프로젝트에서 어떤 역할을 했나요?" 같은 질문에도 횡설수설하게 됩니다
              </p>
            </div>

            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>꼬리 질문에 당황한다</h3>
              <p className={styles.painPointDesc}>
                준비한 답변까지는 좋았는데 "그럼 왜 그렇게 하셨나요?"라는 꼬리 질문에 패닉
              </p>
            </div>

            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>어디서부터 시작할지 모른다</h3>
              <p className={styles.painPointDesc}>
                면접 준비가 필요한 건 아는데 뭘 어떻게 준비해야 할지 막막하기만 합니다
              </p>
            </div>

            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>모범 답안을 외워도 소용없다</h3>
              <p className={styles.painPointDesc}>
                책에 나온 답변을 열심히 외웠는데 실전에서는 전혀 써먹을 수가 없었습니다
              </p>
            </div>

            <div className={styles.painPoint}>
              <div className={styles.painPointIcon}>
                <X size={24} className={styles.xIcon} />
              </div>
              <h3 className={styles.painPointTitle}>면접 후 후회만 남는다</h3>
              <p className={styles.painPointDesc}>
                "아, 그렇게 말할 걸..." 면접이 끝나고 나서야 좋은 답변이 떠오릅니다
              </p>
            </div>
          </div>

          <div className={styles.painPointsCta}>
            <div className={styles.painPointsCtaIcon}>
              <Check size={32} />
            </div>
            <h3 className={styles.painPointsCtaTitle}>
              QueryDaily는 이 모든 문제를 해결합니다
            </h3>
            <p className={styles.painPointsCtaDesc}>
              20일간의 체계적인 훈련으로 면접장에서 자신있게 답변하세요
            </p>
          </div>
        </section>

        {/* Before/After Section */}
        <section className={styles.beforeAfter}>
          <div className={styles.beforeAfterHeader}>
            <h2 className={styles.sectionTitle}>
              20일 후, 당신의 면접 실력
            </h2>
            <p className={styles.sectionSubtitle}>
              실제 면접 현장에서 느껴지는 극적인 변화
            </p>

            {/* 메인 통계 박스 */}
            <div className={styles.mainStatBox}>
              <div className={styles.mainStatItem}>
                <div className={styles.mainStatBefore}>
                  <X size={20} />
                  <span>일반 준비</span>
                </div>
                <div className={styles.mainStatNumber}>28%</div>
                <div className={styles.mainStatLabel}>면접 통과율</div>
              </div>

              <div className={styles.mainStatVs}>VS</div>

              <div className={styles.mainStatItem}>
                <div className={styles.mainStatAfter}>
                  <Check size={20} />
                  <span>QueryDaily 수강생</span>
                </div>
                <div className={styles.mainStatNumber + ' ' + styles.success}>89%</div>
                <div className={styles.mainStatLabel}>면접 통과율</div>
              </div>

              <div className={styles.mainStatBadge}>
                <TrendingUp size={18} />
                <strong>3.2배</strong> 높은 합격률
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
                  <h3>QueryDaily 사용 전</h3>
                  <p className={styles.comparisonSubheader}>준비 없는 면접의 현실</p>
                </div>
              </div>
              <div className={styles.comparisonItems}>
                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>1</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Clock size={16} />
                      <span className={styles.metricValue}>10초 침묵</span>
                    </div>
                    <strong>"저는... React를 사용했고... 음..."</strong>
                    <span className={styles.comparisonDetail}>답변 시작조차 못하고 버벅거림</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>2</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <BookOpen size={16} />
                      <span className={styles.metricValue}>외운 답변</span>
                    </div>
                    <strong>"좋은 개발자가 되고 싶어서요"</strong>
                    <span className={styles.comparisonDetail}>책에서 본 천편일률적 답변, 진정성 제로</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>3</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <AlertCircle size={16} />
                      <span className={styles.metricValue}>패닉 상태</span>
                    </div>
                    <strong>"그건... 잘 모르겠는데요..."</strong>
                    <span className={styles.comparisonDetail}>꼬리 질문에 완전히 무너짐</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>4</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Clock size={16} />
                      <span className={styles.metricValue}>30분 중 5분</span>
                    </div>
                    <strong>실제로 말한 시간 단 5분</strong>
                    <span className={styles.comparisonDetail}>나머지 25분은 "음...", "저..." 침묵만</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeBefore}>5</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Briefcase size={16} />
                      <span className={styles.metricValue}>5개 중 0개</span>
                    </div>
                    <strong>프로젝트 설명 실패</strong>
                    <span className={styles.comparisonDetail}>"무엇을" 했는지만 나열, Why와 How는 설명 못함</span>
                  </div>
                </div>

                <div className={styles.comparisonResult + ' ' + styles.resultFail}>
                  <X size={20} />
                  <div>
                    <strong>면접 결과: 탈락</strong>
                    <span>"역량은 있어 보이는데 전달력이 아쉽네요"</span>
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
                  <h3>QueryDaily 사용 후</h3>
                  <p className={styles.comparisonSubheader}>20일간의 체계적 훈련 결과</p>
                </div>
              </div>
              <div className={styles.comparisonItems}>
                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>1</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Target size={16} />
                      <span className={styles.metricValue}>2분 완결</span>
                    </div>
                    <strong>"S.T.A.R 기법으로 말씀드리면..."</strong>
                    <span className={styles.comparisonDetail}>Situation→Task→Action→Result 구조화된 답변</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>2</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Award size={16} />
                      <span className={styles.metricValue}>차별화</span>
                    </div>
                    <strong>"제가 경험한 구체적 사례는..."</strong>
                    <span className={styles.comparisonDetail}>내 이력서 기반, 오직 나만 할 수 있는 진짜 스토리</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>3</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Lightbulb size={16} />
                      <span className={styles.metricValue}>준비 완료</span>
                    </div>
                    <strong>"그 부분은 이렇게 해결했습니다"</strong>
                    <span className={styles.comparisonDetail}>꼬리 질문 3-5개 미리 예상, 오히려 기다리게 됨</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>4</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <Clock size={16} />
                      <span className={styles.metricValue}>30분→40분</span>
                    </div>
                    <strong>면접 시간 연장 요청받음</strong>
                    <span className={styles.comparisonDetail}>면접관: "시간 괜찮으시면 더 듣고 싶은데요?"</span>
                  </div>
                </div>

                <div className={styles.comparisonItem}>
                  <div className={styles.comparisonItemBadge + ' ' + styles.badgeAfter}>5</div>
                  <div className={styles.comparisonContent}>
                    <div className={styles.comparisonMetric}>
                      <BarChart3 size={16} />
                      <span className={styles.metricValue}>임팩트</span>
                    </div>
                    <strong>프로젝트마다 Why-How-Result</strong>
                    <span className={styles.comparisonDetail}>"배포 70% 단축, 장애 90% 감소" 숫자로 증명</span>
                  </div>
                </div>

                <div className={styles.comparisonResult + ' ' + styles.resultSuccess}>
                  <Check size={20} />
                  <div>
                    <strong>면접 결과: 합격</strong>
                    <span>"경험도 풍부하고 전달력도 훌륭하시네요"</span>
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
                <h3>단 20일의 차이가 합격을 결정합니다</h3>
                <p>지금 시작하지 않으면, 다음 면접에서도 똑같은 실수를 반복하게 됩니다.</p>
              </div>
              <button className={styles.ctaBoxButton}>
                지금 합격 준비 시작하기
                <ArrowRight size={20} />
              </button>
            </div>
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
                  오전 7시와 저녁 5시, 하루 2번<br />
                  총 40개의 질문이 20일간 발송됩니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>오전 7시: 출근길 학습용 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>저녁 5시: 프리미엄 답변 가이드</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>이메일 영구 보관</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <Building2 size={24} />
                  실제 기출 질문 포함
                </h2>
                <p className={styles.imageCardDesc}>
                  300개 이상의 실제 면접 질문을 분석하여<br />
                  당신의 이력서에 맞게 재구성합니다
                </p>
                <div className={styles.imageCardFeatures}>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>기술 스택 맞춤형 질문</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>프로젝트 경험 기반 시나리오</span>
                  </div>
                  <div className={styles.featureRow}>
                    <Check size={18} />
                    <span>회사별 면접 스타일 반영</span>
                  </div>
                </div>
              </div>

              <div className={styles.productImageCard}>
                <h2 className={styles.imageCardTitle}>
                  <BookOpen size={24} />
                  프리미엄 답변 가이드
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
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className={styles.whatYouGet}>
          <h2 className={styles.sectionTitle}>
            그로스 플랜에 포함된 것들
          </h2>
          <p className={styles.sectionSubtitle}>
            20일간 매일 제공되는 프리미엄 콘텐츠
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Calendar size={32} />
              </div>
              <h3 className={styles.benefitTitle}>매일 2회 질문 발송</h3>
              <p className={styles.benefitDescription}>
                오전 7시와 저녁 5시, 총 40개의 맞춤형 질문이 20일간 발송됩니다.
                출근길과 퇴근 후, 하루 2번 면접 준비를 습관화하세요.
              </p>
              <ul className={styles.benefitList}>
                <li><Check size={16} /> 오전 7시: 출근길 학습</li>
                <li><Check size={16} /> 저녁 5시: 답변 가이드 제공</li>
                <li><Check size={16} /> 20일간 총 40개 질문</li>
              </ul>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Building2 size={32} />
              </div>
              <h3 className={styles.benefitTitle}>실제 기출 질문 포함</h3>
              <p className={styles.benefitDescription}>
                실제 면접에서 나온 질문들을 분석하여 당신의 이력서에 맞게 재구성합니다.
                일반적인 질문이 아닌, 당신만을 위한 질문입니다.
              </p>
              <ul className={styles.benefitList}>
                <li><Check size={16} /> 300+ 기출 질문 데이터베이스</li>
                <li><Check size={16} /> 이력서 맞춤형 재구성</li>
                <li><Check size={16} /> 회사별 면접 스타일 반영</li>
              </ul>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <BookOpen size={32} />
              </div>
              <h3 className={styles.benefitTitle}>프리미엄 답변 가이드</h3>
              <p className={styles.benefitDescription}>
                단순 모범 답안이 아닌, 5단계 구성의 프리미엄 가이드를 제공합니다.
                질문 해부부터 STAR 기법 적용까지 완벽하게 학습하세요.
              </p>
              <ul className={styles.benefitList}>
                <li><Check size={16} /> 질문 해부: 면접관의 의도 파악</li>
                <li><Check size={16} /> STAR 기법 기반 답변 구조화</li>
                <li><Check size={16} /> 핵심 키워드 및 기술 용어 정리</li>
              </ul>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Lightbulb size={32} />
              </div>
              <h3 className={styles.benefitTitle}>꼬리 질문 대비 전략</h3>
              <p className={styles.benefitDescription}>
                면접의 진짜 승부는 꼬리 질문입니다. 예상 꼬리 질문과 대응 전략을
                미리 준비하여 어떤 질문에도 당황하지 않게 됩니다.
              </p>
              <ul className={styles.benefitList}>
                <li><Check size={16} /> 질문별 3-5개 예상 꼬리 질문</li>
                <li><Check size={16} /> 꼬리 질문 대응 전략</li>
                <li><Check size={16} /> 실무 경험 연결 팁</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Email Preview Section */}
        <section className={styles.emailPreview}>
          <h2 className={styles.sectionTitle}>
            실제로 받게 될 이메일
          </h2>
          <p className={styles.sectionSubtitle}>
            매일 오전 7시와 저녁 5시, 이런 이메일을 받게 됩니다
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
                    안녕하세요, 김개발님 👋<br/>
                    오늘의 면접 질문을 준비했습니다.
                  </div>

                  <div className={styles.emailQuestion}>
                    <div className={styles.questionLabel}>
                      <Lightbulb size={20} />
                      오늘의 질문
                    </div>
                    <div className={styles.questionText}>
                      이력서에 기재된 "사용자 관리 시스템 개발" 프로젝트에서<br/>
                      마이크로서비스 아키텍처를 선택한 이유는 무엇인가요?<br/>
                      기존 모놀리식 구조 대비 어떤 장단점을 고려하셨나요?
                    </div>
                  </div>

                  <div className={styles.emailTags}>
                    <span className={styles.emailTag}>#아키텍처</span>
                    <span className={styles.emailTag}>#기술선택</span>
                    <span className={styles.emailTag}>#트레이드오프</span>
                  </div>

                  <div className={styles.emailTip}>
                    💡 <strong>준비 팁:</strong> 오늘 하루 이 질문에 대해 생각해보세요.<br/>
                    저녁 5시에 프리미엄 답변 가이드를 보내드립니다.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.emailDivider}>
              <ChevronRight size={32} />
            </div>

            {/* 저녁 5시 이메일 */}
            <div className={styles.emailTimeSlot}>
              <div className={styles.emailTime}>
                <Clock size={24} />
                <span>저녁 5시</span>
              </div>

              <div className={styles.emailCard}>
                <div className={styles.emailHeader}>
                  <div className={styles.emailFrom}>
                    <Mail size={18} />
                    <div>
                      <div className={styles.emailSender}>QueryDaily</div>
                      <div className={styles.emailAddress}>answer@querydaily.com</div>
                    </div>
                  </div>
                  <div className={styles.emailBadge + ' ' + styles.premium}>프리미엄 가이드</div>
                </div>

                <div className={styles.emailSubject}>
                  [QueryDaily] Day 1 답변 가이드: STAR 기법으로 완벽 대비하기
                </div>

                <div className={styles.emailBody}>
                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <CheckCircle2 size={20} />
                      1. 질문 해부
                    </div>
                    <div className={styles.answerContent}>
                      이 질문은 단순히 기술 선택의 이유만 묻는 것이 아닙니다.<br/>
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
                      2. STAR 기법 답변 구조
                    </div>
                    <div className={styles.starFramework}>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>S (Situation)</div>
                        <div className={styles.starText}>
                          "당시 회사는 사용자가 급증하면서 모놀리식 구조의 한계를 느끼고 있었습니다..."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>T (Task)</div>
                        <div className={styles.starText}>
                          "저는 확장 가능하면서도 팀이 독립적으로 개발할 수 있는 구조를 설계해야 했습니다..."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>A (Action)</div>
                        <div className={styles.starText}>
                          "각 도메인별로 서비스를 분리하고, API Gateway 패턴을 도입했습니다..."
                        </div>
                      </div>
                      <div className={styles.starItem}>
                        <div className={styles.starLabel}>R (Result)</div>
                        <div className={styles.starText}>
                          "배포 주기가 2주에서 3일로 단축되었고, 장애 격리가 가능해졌습니다..."
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <AlertCircle size={20} />
                      3. 예상 꼬리 질문 (3개)
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

                  <div className={styles.answerSection}>
                    <div className={styles.answerTitle}>
                      <BookOpen size={20} />
                      4. 핵심 키워드
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
                      <Trophy size={20} />
                      5. 실전 팁
                    </div>
                    <div className={styles.answerContent}>
                      <strong>✓ 좋은 답변의 조건:</strong>
                      <ul>
                        <li>숫자로 말하기 (배포 주기 70% 단축, 장애 복구 시간 5분 → 30초)</li>
                        <li>trade-off를 명확히 언급 (복잡도 증가 vs 확장성 향상)</li>
                        <li>팀과의 협업 과정 포함</li>
                      </ul>
                      <strong>✗ 피해야 할 답변:</strong>
                      <ul>
                        <li>"요즘 유행이라서" "다른 회사도 다 쓰니까"</li>
                        <li>기술 용어만 나열하고 맥락 없이</li>
                        <li>단점은 언급 안 하고 장점만</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.emailPreviewCta}>
            <p className={styles.emailPreviewText}>
              이렇게 <strong>매일 2번</strong>, <strong>20일간 총 40개의 질문</strong>을 받게 됩니다.<br/>
              모든 이메일은 영구 보관되어 <strong>언제든 다시 확인</strong>할 수 있습니다.
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
                  결제 후 이력서를 업로드하면 AI가 기술 스택, 프로젝트 경험,
                  경력 수준을 분석하여 당신만의 프로필을 생성합니다.
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
                  매일 오전 7시와 저녁 5시, 검증된 질문과 프리미엄 답변 가이드가
                  이메일로 자동 발송됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - 숫자로 보는 효과 */}
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>
            데이터가 증명하는 QueryDaily
          </h2>
          <p className={styles.sectionSubtitle}>
            실제 수치로 확인하는 성과
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Users size={40} />
              </div>
              <div className={styles.statNumber}>342명</div>
              <div className={styles.statLabel}>수강생</div>
              <p className={styles.statDesc}>이미 많은 분들이 합격의 기쁨을 경험했습니다</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Star size={40} />
              </div>
              <div className={styles.statNumber}>4.8/5.0</div>
              <div className={styles.statLabel}>평균 만족도</div>
              <p className={styles.statDesc}>127개의 리뷰로 검증된 품질</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Trophy size={40} />
              </div>
              <div className={styles.statNumber}>89%</div>
              <div className={styles.statLabel}>면접 통과율</div>
              <p className={styles.statDesc}>일반 준비 대비 3.2배 높은 합격률</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Calendar size={40} />
              </div>
              <div className={styles.statNumber}>40개</div>
              <div className={styles.statLabel}>맞춤형 질문</div>
              <p className={styles.statDesc}>20일간 매일 2회 발송</p>
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
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /> (AI)</td>
                </tr>
                <tr>
                  <td>언제든 복습</td>
                  <td>△</td>
                  <td><X size={18} className={styles.xIcon} /></td>
                  <td className={styles.highlighted}><Check size={18} className={styles.checkIcon} /> (이메일)</td>
                </tr>
              </tbody>
            </table>
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
                <h3>실수 1: 일반 모범 답안 달달 외우기</h3>
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
                <h3>실수 2: 프로젝트는 많은데 설명을 못함</h3>
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
                <h3>실수 3: 메인 질문만 준비하고 꼬리 질문 무시</h3>
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
                <h3>실수 4: 벼락치기로 전날 밤 준비</h3>
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
          <h2 className={styles.sectionTitle}>
            지금이 최적의 타이밍입니다
          </h2>
          <p className={styles.sectionSubtitle}>
            면접 준비는 시간이 필요합니다
          </p>

          <div className={styles.urgencyContent}>
            <div className={styles.urgencyCard}>
              <div className={styles.urgencyIcon}>
                <Clock size={48} />
              </div>
              <h3 className={styles.urgencyTitle}>면접까지 시간이 있나요?</h3>
              <ul className={styles.urgencyList}>
                <li>
                  <ChevronRight size={18} />
                  <span><strong>3일 남았다면:</strong> 크리티컬 히트 (핵심 3개)</span>
                </li>
                <li>
                  <ChevronRight size={18} />
                  <span><strong>1주일+ 남았다면:</strong> 그로스 플랜 (BEST)</span>
                </li>
              </ul>
            </div>

            <div className={styles.urgencyCard}>
              <div className={styles.urgencyIcon}>
                <Flame size={48} />
              </div>
              <h3 className={styles.urgencyTitle}>특별 할인은 언제 끝날지 모릅니다</h3>
              <ul className={styles.urgencyList}>
                <li>
                  <ChevronRight size={18} />
                  <span>현재 54% 할인 중 (₩106,000 → ₩49,000)</span>
                </li>
                <li>
                  <ChevronRight size={18} />
                  <span>조기 종료 가능</span>
                </li>
              </ul>
            </div>

            <div className={styles.urgencyCard}>
              <div className={styles.urgencyIcon}>
                <Users size={48} />
              </div>
              <h3 className={styles.urgencyTitle}>이미 342명이 준비하고 있습니다</h3>
              <ul className={styles.urgencyList}>
                <li>
                  <ChevronRight size={18} />
                  <span>경쟁자들은 이미 시작했습니다</span>
                </li>
                <li>
                  <ChevronRight size={18} />
                  <span>당신은요?</span>
                </li>
              </ul>
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
              </div>
            </div>

            {/* 추천 메시지 */}
            <div className={styles.planRecommendationMessage}>
              <p>
                <span className={styles.recommendQuestion}>고민된다면?</span>{' '}
                <strong className={styles.recommendPlan}>그로스 플랜</strong>을 추천드립니다.<br/>
                <span className={styles.recommendSubtext}>제대로 준비해서 한 번에 붙는 게 결국 더 빠릅니다.</span>
              </p>
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
                    결제 후 30일 이내에 20일간의 질문 발송이 완료됩니다.
                    질문 발송 시작 시점을 직접 선택할 수 있으며, 한번 시작하면
                    20일간 매일 자동으로 발송됩니다. 발송된 질문은 이메일로 영구 보관되므로
                    언제든지 다시 확인할 수 있습니다.
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
                    PDF, DOCX, TXT 형식을 지원합니다. 가장 최신 버전의 이력서를
                    업로드해주시면 AI가 자동으로 분석하여 기술 스택, 프로젝트 경험,
                    경력 수준을 파악합니다. 이력서는 안전하게 암호화되어 저장되며,
                    질문 생성에만 사용됩니다.
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
                    질문 발송이 시작된 이후에는 남은 일수에 대해 일할 계산하여 환불해드립니다.
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
                    모든 질문은 5가지 품질 기준(기술 정확성, 통찰력, 공정성, 실무 관련성, 독창성)으로
                    검증되지만, 만약 이력서와 맞지 않는 질문이 발송된 경우 고객센터로 문의해주시면
                    해당 질문을 재생성하여 발송해드립니다. 품질에 자신이 있기 때문에 이런 정책을 운영하고 있습니다.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openFaq === 4 ? styles.active : ''}`}
                onClick={() => toggleFaq(4)}
              >
                <span>답변 가이드만 받고 질문은 스킵할 수 있나요?</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqIcon} ${openFaq === 4 ? styles.rotated : ''}`}
                />
              </button>
              {openFaq === 4 && (
                <div className={styles.faqAnswer}>
                  <p>
                    오전 7시에 질문이 발송되고, 저녁 5시에 해당 질문의 답변 가이드가 발송됩니다.
                    질문을 먼저 스스로 고민해보는 것을 권장하지만, 시간이 부족하다면
                    저녁 5시의 답변 가이드를 바로 확인하셔도 됩니다. 모든 이메일은 영구 보관되므로
                    나중에 다시 확인하면서 학습할 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              20일 후, 면접장에서 자신감 넘치는 당신을 만나세요
            </h2>
            <p className={styles.finalCtaSubtitle}>
              매일 한 걸음씩, 합격에 가까워지는 성장을 경험하세요
            </p>

            <div className={styles.finalPricing}>
              <div className={styles.finalPriceBox}>
                <div className={styles.finalPriceLabel}>정가</div>
                <div className={styles.finalPriceOriginal}>₩106,000</div>
              </div>
              <div className={styles.finalArrow}>→</div>
              <div className={styles.finalPriceBox}>
                <div className={styles.finalPriceLabel}>특별가 (54% 할인)</div>
                <div className={styles.finalPriceCurrent}>₩49,000</div>
              </div>
            </div>

            <button className={styles.finalCtaButton}>
              지금 시작하기
              <ArrowRight size={20} />
            </button>

            <div className={styles.finalBenefits}>
              <div className={styles.finalBenefit}>
                <Clock size={16} />
                <span>30일 이내 시작 보장</span>
              </div>
              <div className={styles.finalBenefit}>
                <Shield size={16} />
                <span>100% 환불 보장</span>
              </div>
              <div className={styles.finalBenefit}>
                <Users size={16} />
                <span>342명의 수강생</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '5rem 2rem 2rem',
          background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(var(--color-accent-rgb), 0.08) 100%)',
          borderTop: '1px solid rgba(var(--color-accent-rgb), 0.1)',
          marginTop: '4rem'
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            {/* 상단 컨텐츠 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '4rem'
            }}>
              {/* 브랜드 섹션 */}
              <div style={{maxWidth: '400px'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem', fontWeight: '700', color: 'var(--color-text-primary)'}}>
                  Query<span style={{color: 'var(--color-secondary)'}}>Daily</span>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  당신의 이력서를 분석해서,<br/>
                  면접관이 꼭 물어볼 질문을 매일 보내드립니다.
                </p>

                {/* 소셜 링크 */}
                <div style={{display: 'flex', gap: '1rem'}}>
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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                      <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.18.483.378.352.156-.103 2.5-1.667 3.508-2.343.538.073 1.093.112 1.624.112 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z"/>
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
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="/prototype-hyundoo/v4#products" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>전체 상품</a>
                    <a href="/prototype-hyundoo/v4/products/growth-plan/v2" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>그로스 플랜</a>
                    <a href="/prototype-hyundoo/v4#products" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>크리티컬 히트</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>서비스</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="#how-it-works" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>이용방법</a>
                    <a href="#faq" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>자주 묻는 질문</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>1:1 상담</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>고객지원</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="/terms" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>이용약관</a>
                    <a href="/privacy" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>개인정보처리방침</a>
                    <a href="/refund" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>환불정책</a>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.2rem'
                  }}>Contact</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <a href="mailto:contact@querydaily.com" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>contact@querydaily.com</a>
                    <a href="http://pf.kakao.com/_fxdxfTG" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem'}}>카카오톡 상담</a>
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
              }}>사업자등록번호: 123-45-67890 | 대표: QueryDaily</p>
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