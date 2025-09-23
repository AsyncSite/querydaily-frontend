'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { submitBetaApplication } from '@/lib/api';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    resume: null as File | null,
  });
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [transition, setTransition] = useState(true);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [openFooterSection, setOpenFooterSection] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const testimonials = [
    {
      name: '김**',
      role: '결제 도메인 백엔드 2년차',
      avatar: '👨‍💻',
      text: '"매일 받는 질문이 실제 면접보다 더 어려웠어요. 덕분에 실제 면접에선 자신감 있게 대답할 수 있었습니다."',
      result: '💼 네카라쿠배 중 1곳 재직중'
    },
    {
      name: '이**',
      role: '쇼핑몰 플랫폼 신입 개발자',
      avatar: '👩‍💻',
      text: '"왜 QueryDaily 안 했을까 후회돼요. 면접장에서 비슷한 질문이 나와서 깜짝 놀랐습니다. 이력서 기반이라 그런가봐요."',
      result: '🏢 시리즈 B 스타트업 합격'
    },
    {
      name: '박**',
      role: '컴공 졸업예정',
      avatar: '🧑‍🎓',
      text: '"학교에서 배운 것과 실무는 정말 달라요. QueryDaily 덕분에 그 갭을 줄일 수 있었습니다."',
      result: '🎆 대기업 IT 자회사 합격'
    },
    {
      name: '정**',
      role: '전 N사 검색팀 개발자',
      avatar: '👩‍🏫',
      text: '"이직 준비하면서 제가 놓치고 있던 부분을 발견했어요. 왜 그렇게 했는지 설명하는 연습이 큰 도움이 됐습니다."',
      result: '🚀 외국계 테크 회사 재직중'
    },
    {
      name: '서**',
      role: '부트캠프 수료생',
      avatar: '🥰',
      text: '"처음엔 \'내가 잘할 수 있을까\' 고민했는데, 3일 후엔 자신감이 생겼어요. 매일 받는 질문이 저를 성장시켰습니다."',
      result: '🎯 원하는 회사 K사 합격'
    },
    {
      name: '최**',
      role: '금융 서비스 백엔드 3년차',
      avatar: '💻',
      text: '"이력서 맞춤형이라 정말 좋았어요. 제 경험과 프로젝트를 기반으로 한 질문들이 실제 면접에서 큰 도움이 됐습니다."',
      result: '🎉 T사 핀테크 재직중'
    },
    {
      name: '조**',
      role: '전 SI 3년차',
      avatar: '🔥',
      text: '"SI에서 서비스 회사로 이직하는 게 막막했는데, 제 프로젝트 경험을 어떻게 어필해야 할지 알게 됐어요."',
      result: '🛍️ C사 이커머스 재직중'
    },
    {
      name: '윤**',
      role: '비전공 백엔드 1년차',
      avatar: '🌱',
      text: '"비전공자라 기초가 부족한 줄만 알았는데, 제가 가진 강점이 뭔지 발견했습니다. 질문이 정말 날카로웠어요."',
      result: '🏦 금융권 IT 재직중'
    },
    {
      name: '장**',
      role: '물류 플랫폼 개발자 5년차',
      avatar: '🏗️',
      text: '"모놀리식에서 MSA 전환 프로젝트를 했는데, 그 경험을 어떻게 설명해야 할지 막막했어요. 이제는 자신있게 설명합니다."',
      result: '🚀 L사 메신저 기업 재직중'
    },
    {
      name: '한**',
      role: '전 스타트업 CTO',
      avatar: '👨‍💼',
      text: '"작은 스타트업 경험이 대기업 면접에서 통할까 걱정했는데, 오히려 강점으로 만드는 방법을 배웠습니다."',
      result: '💳 S카드사 재직중'
    },
    {
      name: '강**',
      role: '프론트→백엔드 전환 2년차',
      avatar: '🔄',
      text: '"React만 하다가 Spring으로 전향했는데, 면접관들이 전향 이유를 계속 물어봐요. 이제는 명확하게 답할 수 있습니다."',
      result: '🎨 디자인 플랫폼 재직중'
    },
    {
      name: '문**',
      role: '해외 리모트 준비중',
      avatar: '🌏',
      text: '"영어 면접이 아니라 기술 면접이 더 걱정이었는데, QueryDaily로 한국어로 먼저 정리하니 영어 전환도 쉬웠어요."',
      result: '🌐 글로벌 리모트 기업 최종 면접중'
    },
    {
      name: '노**',
      role: 'O2O 서비스 팀리드 10년차',
      avatar: '👨‍👩‍👧‍👦',
      text: '"팀장이 되니 코딩보다 매니징 질문이 많아요. 기술 리더십을 어떻게 설명할지 연습이 필요했습니다."',
      result: '🚖 모빌리티 대기업 재직중'
    },
    {
      name: '도**',
      role: '인턴→정규직 전환 희망',
      avatar: '🌟',
      text: '"인턴 6개월 경험을 어떻게 어필해야 할지 막막했는데, 작은 기여도 의미있게 표현하는 법을 배웠어요."',
      result: '🎮 게임사 정규직 전환 성공'
    },
    {
      name: '류**',
      role: '군 전역 후 복학생',
      avatar: '🎖️',
      text: '"2년 공백이 있어서 기술 트렌드를 못 따라갈까봐 걱정했는데, 본질적인 질문으로 기초를 다졌습니다."',
      result: '📱 모바일 앱 개발사 인턴'
    },
    {
      name: '민**',
      role: '육아휴직 후 복직 준비',
      avatar: '👶',
      text: '"1년 공백 후 이직 준비가 막막했어요. 경력 단절이 아닌 경력 성숙으로 표현하는 법을 알게 됐습니다."',
      result: '👨‍👩‍👧 가족친화 기업 재직중'
    },
    {
      name: '배**',
      role: '프리랜서 5년→정규직 희망',
      avatar: '💼',
      text: '"프리랜서 경험을 회사에서 어떻게 활용할지 계속 물어봐요. 다양한 프로젝트를 강점으로 만들었습니다."',
      result: '🏢 중견기업 정규직 전환'
    },
    {
      name: '손**',
      role: 'QA 엔지니어→백엔드 전향',
      avatar: '🔍',
      text: '"테스트만 하다가 개발로 전향하니 시각이 다르더라고요. 품질 관점의 개발자로 포지셔닝했습니다."',
      result: '🔧 B2B SaaS 재직중'
    }
  ];

  // Dot 그룹핑을 위한 상수
  const MAX_DOTS = 10;
  const testimonialsPerDot = Math.ceil(testimonials.length / MAX_DOTS);
  const totalDots = Math.min(testimonials.length, MAX_DOTS);

  // Clone for infinite scroll
  const extendedTestimonials = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];

  // Auto-hide error toast after 10 seconds
  useEffect(() => {
    if (errors.length > 0) {
      // Clear any existing timeout
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      // Set new timeout to clear errors after 10 seconds
      const timeout = setTimeout(() => {
        setErrors([]);
      }, 10000);

      setErrorTimeout(timeout);
    }

    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [errors]);

  // Beta countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date('2025-09-27T23:59:59+09:00'); // September 27, 2025, Korean time
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll setup
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  // Handle infinite scroll positioning
  useEffect(() => {
    if (currentTestimonial === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrentTestimonial(testimonials.length);
        requestAnimationFrame(() => {
          setTransition(true);
        });
      }, 500);
    } else if (currentTestimonial === testimonials.length + 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentTestimonial(1);
        requestAnimationFrame(() => {
          setTransition(true);
        });
      }, 500);
    }
  }, [currentTestimonial, testimonials.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentTestimonial(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentTestimonial(prev => prev - 1);
  };

  const handleDotClick = (dotIndex: number) => {
    // 각 dot이 대표하는 첫 번째 testimonial로 이동
    const targetIndex = dotIndex * testimonialsPerDot;
    setCurrentTestimonial(targetIndex + 1);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files && files[0]) {
      const file = files[0];

      // 즉시 파일 검증
      const fileErrors: string[] = [];

      if (!file.name.toLowerCase().endsWith('.pdf')) {
        fileErrors.push('PDF 형식만 업로드 가능합니다');
      }

      if (file.size > 5 * 1024 * 1024) {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        fileErrors.push(`파일 크기가 ${sizeInMB}MB입니다. 5MB 이하로 압축해주세요.`);
      }

      if (fileErrors.length > 0) {
        setErrors(fileErrors);
        // 파일 선택 초기화
        e.target.value = '';
        return;
      }

      // 검증 통과 시 저장
      setFormData({ ...formData, resume: file });
      setResumeFileName(file.name);
      setErrors([]); // 이전 에러 클리어
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.push('올바른 이메일 주소를 입력해주세요');
    }

    // Name validation (optional but if provided, min 2 chars)
    if (formData.name && formData.name.trim().length < 2) {
      newErrors.push('이름은 2글자 이상 입력해주세요');
    }

    // Resume validation
    if (!formData.resume) {
      newErrors.push('PDF 형식의 이력서를 업로드해주세요');
    } else if (!formData.resume.name.toLowerCase().endsWith('.pdf')) {
      newErrors.push('PDF 형식만 업로드 가능합니다');
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      newErrors.push('파일 크기는 5MB 이하여야 합니다');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      setErrors([]); // Clear any previous errors

      try {
        const response = await submitBetaApplication({
          email: formData.email,
          name: formData.name,
          resume: formData.resume!
        });

        // Redirect to success page with email parameter
        router.push(`/success?email=${encodeURIComponent(formData.email)}`);
      } catch (error) {
        console.error('Error submitting application:', error);

        const errorMessage = error instanceof Error ? error.message : '';

        // 에러 타입별 사용자 친화적 메시지
        if (errorMessage === 'FILE_TOO_LARGE' || errorMessage.includes('413')) {
          setErrors([
            '📎 파일 크기가 너무 큽니다.',
            '5MB 이하의 PDF로 다시 시도해주세요.',
            '💡 파일 압축이 필요하면 smallpdf.com 또는 ilovepdf.com을 이용해보세요.'
          ]);
        } else if (errorMessage === 'TOO_MANY_REQUESTS' || errorMessage.includes('429')) {
          setErrors([
            '⏰ 너무 많은 요청이 발생했습니다.',
            '잠시 후 다시 시도해주세요.'
          ]);
        } else if (errorMessage === 'SERVER_ERROR' || errorMessage.includes('500')) {
          setErrors([
            '⚠️ 서버에 일시적인 문제가 발생했습니다.',
            '잠시 후 다시 시도하거나 카카오톡 채널로 문의해주세요.'
          ]);
        } else if (errorMessage === 'BAD_GATEWAY' || errorMessage === 'SERVICE_UNAVAILABLE') {
          setErrors([
            '🔧 서비스 점검 중입니다.',
            '잠시 후 다시 시도해주세요.',
            '문제가 지속되면 카카오톡 채널로 문의해주세요.'
          ]);
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          setErrors([
            '🌐 네트워크 연결을 확인해주세요.',
            '인터넷 연결이 안정적인지 확인 후 다시 시도해주세요.'
          ]);
        } else {
          setErrors([
            '신청 처리 중 오류가 발생했습니다.',
            '다시 시도하시거나 카카오톡 채널로 문의해주세요.'
          ]);
        }

        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
              <span className={styles.betaTag}>BETA</span>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            </button>

            <nav className={`${styles.navMenu} ${mobileMenuOpen ? styles.navMenuOpen : ''}`}>
              <a href="#why" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>왜 QueryDaily</a>
              <a href="#how-it-works" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>작동 방식</a>
              <a href="#testimonials" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>후기</a>
              <a href="#apply" className={`${styles.navLink} ${styles.navLinkCta}`} onClick={() => setMobileMenuOpen(false)}>
                <span>무료 시작</span>
                <span className={styles.navArrow}>→</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadgeContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeIcon}>🎯</span>
                <span><strong>조기 마감 예정</strong> - 10명 한정 베타 테스트</span>
              </div>
              <div className={styles.countdownBadge} style={{ background: 'linear-gradient(135deg, #ff4444, #ff6b6b)', padding: '8px 20px', borderRadius: '20px', animation: 'pulse 2s infinite' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
                  🔥 베타 종료까지 {timeLeft.days > 0 && `${timeLeft.days}일 `}
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>성장의 '자극'을</span><br/>
              <span className={styles.textGradient}>매일 아침 배달해 드립니다</span>
            </h1>

            <p className={styles.heroSubtitle}>
              매일 아침, 당신의 <strong>Java/Spring 프로젝트</strong>에서 가장 날카로운 질문 하나를 꺼내드립니다.<br/>
              <strong>3일 뒤,</strong> 당신은 스스로의 경험을 증명하는 법을 알게 됩니다.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3일</div>
                <div className={styles.statLabel}>무료 챌린지</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>89%</div>
                <div className={styles.statLabel}>베타 참여자<br/>'매우 만족'</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3분</div>
                <div className={styles.statLabel}>하루 투자</div>
              </div>
            </div>

            <div className={styles.heroCta}>
              <a href="#apply" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>
                <span>3일 무료 챌린지, 지금 시작하기</span>
                <span className={styles.btnArrow}>→</span>
              </a>
              <p className={styles.ctaNote}>
                <span className={styles.noteIcon}>✓</span> 신용카드 불필요
                <span className={styles.noteDivider}>•</span>
                <span className={styles.noteIcon}>✓</span> 언제든 취소 가능
              </p>
            </div>
          </div>

          {/* Visual Element */}
          <div className={styles.heroVisual}>
            <div className={`${styles.floatingCard} ${styles.card1}`}>
              <div className={styles.cardHeader}>오늘의 질문</div>
              <div className={styles.cardContent}>
                "이력서에 '일평균 10만 건 처리' 라고 쓰셨는데, 피크 타임엔 몇 건까지 처리해야 했고, 그때 병목은 어디서 발생했나요?"
              </div>
            </div>
            <div className={`${styles.floatingCard} ${styles.card2}`}>
              <div className={styles.cardHeader}>AI 분석 중...</div>
              <div className={styles.cardProgress}></div>
            </div>
            <div className={`${styles.floatingCard} ${styles.card3}`}>
              <div className={styles.cardEmoji}>☕</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div id="why" className={`${styles.section} ${styles.problem}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>혹시 당신의 이야기인가요?</h2>
          <p className={styles.sectionSubtitle} style={{ fontSize: '1.5rem', color: '#c3e88d', marginBottom: '2rem' }}>
            "코드는 돌아가는데, 제 경력은 설명이 안됩니다."
          </p>

          <div className={styles.problemsBalancedGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>🤔</div>
              <h3>"왜 썼죠?"</h3>
              <p>분명 내가 사용한 기술인데, '왜?'라는 질문 앞에서는 말문이 막힙니다.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>🤯</div>
              <h3>"그래서 뭘 했죠?"</h3>
              <p>내 프로젝트는 너무 평범해서, 뭘 어떻게 어필해야 할지 모르겠습니다.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>📚</div>
              <h3>"어떻게 다르죠?"</h3>
              <p>분명 Spring의 동작 원리는 아는데, 이걸 제 프로젝트 경험과 연결하지 못하겠습니다.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>😰</div>
              <h3>"긴장하면 백지"</h3>
              <p>집에서는 잘 아는데, 면접장에서는 머릿속이 하얘집니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className={`${styles.section} ${styles.solution}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            면접 준비의 핵심은<br/>'답을 찾는 것'이 아닌, '질문을 아는 것'입니다.
          </h2>

          <div className={styles.solutionValues}>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>당신만을 위한 질문</h3>
              <p>검색하면 나오는 빤한 질문은 그만. 당신의 프로젝트 경험과 기술 스택에서만 나올 수 있는 '꼬리 질문'으로 면접의 깊이를 더합니다.</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>💪</div>
              <h3>매일 만드는 실전 감각</h3>
              <p>거창한 계획은 필요 없습니다. 매일 단 하나의 질문에 답을 고민하는 것만으로 '면접 근육'이 자연스럽게 단련됩니다.</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>🧭</div>
              <h3>나만의 성장 지도</h3>
              <p>3일 후, 당신은 어떤 경험을 어떻게 정리해야 할지, 무엇을 더 보강해야 할지 스스로 알게 됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Vertical Timeline */}
      <div id="how-it-works" className={`${styles.section} ${styles.howItWorks}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>어떻게 작동하나요?</h2>
          <p className={styles.sectionSubtitle}>단 3단계로 시작하는 챌린지</p>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.timelineNumber}>1</div>
                <div className={styles.timelineIcon}>📄</div>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>이력서 제출</h3>
                <p className={styles.timelineDesc}>당신의 경험이 세상에 하나뿐인 면접 질문지가 됩니다.</p>
                <div className={styles.timelineDetail}>
                  <span className={styles.timelineTiming}>⏱ 소요 시간: 30초</span>
                  <span className={styles.timelineNote}>PDF 파일로 간단하게</span>
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
                <p className={styles.timelineDesc}>3일 동안 매일 아침, 전문가가 당신을 위한 질문을 준비합니다.</p>
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

          {/* Sample Email Preview */}
          <div className={styles.emailPreview}>
            <div className={styles.emailHeader}>
              <span className={styles.emailFrom}>QueryDaily</span>
              <span className={styles.emailTime}>오전 09:00</span>
            </div>
            <div className={styles.emailSubject}>[Day 2/3] 오늘의 면접 질문이 도착했습니다 🎯</div>
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

      {/* Question Types Section - Tabbed Interface */}
      <div className={`${styles.section} ${styles.questionTypes}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>어떤 질문들을 받게 되나요?</h2>
          <p className={styles.sectionSubtitle}>실제 면접관들이 자주 묻는 3가지 유형</p>

          {/* Tab Navigation */}
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

          {/* Tab Content */}
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

      {/* Testimonials Section */}
      <div id="testimonials" className={`${styles.section} ${styles.testimonials}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>이런 변화를 경험하고 있어요</h2>

          <div
            className={styles.testimonialsCarousel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.testimonialsWrapper}
              style={{
                transform: `translateX(-${currentTestimonial * 100}%)`,
                transition: transition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialSlide}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.testimonialHeader}>
                      <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                      <div className={styles.testimonialInfo}>
                        <div className={styles.testimonialName}>{testimonial.name}</div>
                        <div className={styles.testimonialRole}>{testimonial.role}</div>
                      </div>
                      <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
                    </div>
                    <p className={styles.testimonialText}>{testimonial.text}</p>
                    <div className={styles.testimonialResult}>{testimonial.result}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              →
            </button>

            {/* Carousel Dots */}
            <div className={styles.carouselDots}>
              {[...Array(totalDots)].map((_, dotIndex) => {
                // 현재 testimonial이 어느 dot 그룹에 속하는지 계산
                let activeTestimonialIndex = currentTestimonial - 1;
                if (currentTestimonial === 0) activeTestimonialIndex = testimonials.length - 1;
                if (currentTestimonial === testimonials.length + 1) activeTestimonialIndex = 0;

                const activeDotIndex = Math.floor(activeTestimonialIndex / testimonialsPerDot);
                const isActive = activeDotIndex === dotIndex;

                return (
                  <button
                    key={dotIndex}
                    className={`${styles.dot} ${isActive ? styles.activeDot : ''}`}
                    onClick={() => handleDotClick(dotIndex)}
                    aria-label={`Go to testimonial group ${dotIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Trust Section */}
      <div className={`${styles.section} ${styles.privacyTrust}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>🔒 당신의 이력서, 안전하게 다룹니다</h2>
          <p className={styles.sectionSubtitle}>개발자가 개발자를 위해 만든, 가장 투명한 이력서 분석 시스템</p>

          <div className={styles.privacyGrid}>
            <div className={styles.privacyCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>오직 면접 질문 생성</h3>
              <p>이력서는 단 하나의 목적으로만 사용됩니다:<br/>
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
              <p>챌린지 종료와 동시에 모든 데이터가 삭제됩니다</p>
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
              <p>당신의 정보를 지키는 우리의 약속:</p>
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

      {/* FAQ Section - Collapsible Accordion */}
      <div id="faq" className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>아직 고민되시나요?</h2>
          <p className={styles.sectionSubtitle}>가장 많이 궁금해하시는 점들을 정리했습니다</p>

          <div className={styles.faqAccordion}>
            {[
              {
                icon: '🤔',
                question: '정말 내 이력서에 맞는 질문이 올까요?',
                answer: (
                  <div className={styles.faqAnswerContent}>
                    <p>네, <strong>현직 면접관 수준의 전문가로 파인 튜닝한 AI</strong>가 당신의 기술 스택, 프로젝트 경험, 사용한 라이브러리까지 분석해서 실제 면접관이 물어볼 만한 꼬리 질문을 생성합니다.</p>

                    <div className={styles.faqComparison}>
                      <div className={styles.faqBad}>
                        <span className={styles.faqLabel}>❌ 뻔한 질문</span>
                        <div className={styles.faqExample}>"왜 Spring Security를 썼나요?"</div>
                      </div>
                      <div className={styles.faqGood}>
                        <span className={styles.faqLabel}>✅ 날카로운 질문</span>
                        <div className={styles.faqExample}>
                          "JWT 인증 방식에서 Refresh Token을 사용하셨나요? 만약 사용했다면 어디에 어떻게 저장하셨고, 그 이유는 무엇인가요?"
                        </div>
                      </div>
                    </div>
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

                    <div className={styles.faqHighlight}>
                      <span className={styles.faqHighlightIcon}>📌</span>
                      <div>
                        <strong>핵심은 깊이입니다</strong>
                        <p>매일 단 하나의 질문에 깊이 고민하는 것이 100개의 질문을 훑어보는 것보다 효과적입니다.</p>
                      </div>
                    </div>
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

                    <div className={styles.faqNote}>
                      <span className={styles.faqNoteIcon}>💪</span>
                      <div>
                        <p>답변이 궁금하다면 3일 후 '그로스 플랜'으로 업그레이드하실 수 있습니다.</p>
                        <p>하지만 <strong>먼저 스스로 생각해보는 시간</strong>이 꼭 필요합니다.</p>
                      </div>
                    </div>
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

                    <div className={styles.faqRoadmap}>
                      <h4>📅 향후 지원 예정 기술 스택</h4>
                      <ul>
                        <li>Python/Django, FastAPI</li>
                        <li>Node.js/Express, NestJS</li>
                        <li>Go (Gin, Echo)</li>
                        <li>Ruby on Rails</li>
                      </ul>
                    </div>

                    <div className={styles.faqTip}>
                      <span className={styles.faqTipIcon}>💡</span>
                      <p>다른 기술 스택 개발자시라면, 베타 신청하신 <strong>이메일로 새 스택 오픈 시 안내 메일</strong>을 보내드리겠습니다.</p>
                    </div>
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

      {/* Application Form Section */}
      <div id="apply" className={`${styles.section} ${styles.apply}`}>
        <div className={styles.applyContainer}>
          <div className={styles.applyWrapper}>
            <div className={styles.applyInfo}>
              <h2 className={styles.applyTitle}>
                <span style={{ color: '#c3e88d', fontSize: '1.2rem' }}>조기 마감 예정 - 10명 한정</span><br/>
                Java/Spring 개발자 베타 테스트
              </h2>

              {/* 타겟 안내 */}
              <div className={styles.targetNotice}>
                <div className={styles.comingSoon}>
                  <strong>🚀 곧 지원 예정:</strong>
                  <div className={styles.techTags}>
                    <span className={styles.techTag}>Python/Django</span>
                    <span className={styles.techTag}>Node.js/Express</span>
                    <span className={styles.techTag}>Go</span>
                    <span className={styles.techTag}>Ruby on Rails</span>
                  </div>
                </div>
              </div>

              <div className={styles.applyUrgency}>
                <div style={{
                  background: '#ff4444',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(255,68,68,0.3)'
                }}>
                  🔥 베타 종료까지 {timeLeft.days > 0 && `${timeLeft.days}일 `}
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <p className={styles.urgencyMessage}>🔥 <strong>마감 임박!</strong> 조기 마감될 수 있습니다.</p>
                <p className={styles.applyDesc}>
                  10명 한정 Java/Spring 백엔드 개발자를 모집합니다. (조기 마감 예정)<br/>
                  이력서 PDF를 분석하여 맞춤형 질문을 준비합니다.
                </p>
              </div>

              <div className={styles.applyFeatures}>
                <div className={styles.applyFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <div>
                    <strong>3일 무료 챌린지</strong>
                    <p>날카로운 질문으로 시작하는 성장</p>
                  </div>
                </div>
                <div className={styles.applyFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <div>
                    <strong>신용카드 불필요</strong>
                    <p>결제 정보 없이 바로 시작</p>
                  </div>
                </div>
                <div className={styles.applyFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <div>
                    <strong>언제든 취소 가능</strong>
                    <p>원할 때 자유롭게 중단</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.applyCard}>
              {isSubmitting && (
                <div className={styles.formLoadingOverlay}>
                  <div className={styles.loadingContent}>
                    <div className={styles.loadingIcon}>⏳</div>
                    <p>신청서를 처리하고 있습니다...</p>
                    <p className={styles.loadingSubtext}>잠시만 기다려주세요</p>
                  </div>
                </div>
              )}
              <form className={styles.applicationForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">이메일 <span style={{ color: '#f07178' }}>*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    inputMode="email"
                    disabled={isSubmitting}
                  />
                  <p className={styles.formHint}>매일 아침 9시, 맞춤형 면접 질문을 보내드립니다</p>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="name">이름 <span style={{ color: '#707070', fontSize: '0.9rem' }}>(선택)</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    inputMode="text"
                    disabled={isSubmitting}
                  />
                  <p className={styles.formHint}>더 친근한 메일을 보내드릴 수 있어요</p>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume">이력서/포트폴리오 PDF <span style={{ color: '#f07178' }}>*</span></label>
                  <div className={styles.fileUpload}>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf"
                      required
                      style={{ display: 'none' }}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="resume" className={`${styles.fileLabel} ${isSubmitting ? styles.disabled : ''}`}>
                      {resumeFileName || '📎 PDF 파일 선택'}
                    </label>
                  </div>
                  <p className={styles.formHint}>PDF 형식만 지원 (최대 5MB)</p>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" required disabled={isSubmitting} />
                    <span>개인정보 수집 및 이용에 동의합니다</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSubmit} ${isSubmitting ? styles.btnDisabled : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.loadingSpinner}>⏳</span> 신청 처리 중...
                    </>
                  ) : (
                    <>🎯 베타 테스트 신청하기</>
                  )}
                </button>

                <p className={styles.formSimpleNote}>
                  💡 <strong>30초면 충분!</strong> 추가 정보는 시작 후 이메일로 안내드려요.
                </p>

                <div className={styles.emotionalMessage}>
                  <p>
                    "당신의 경험은 결코 평범하지 않습니다.<br/>
                    단지, 그것을 증명하는 방법을 배우지 못했을 뿐입니다."
                  </p>
                </div>

                <p className={styles.formFooter}>
                  가입 시 <a href="/terms">서비스 이용약관</a>과 <a href="/privacy">개인정보처리방침</a>에 동의하게 됩니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.sectionContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerMain}>
              <div className={styles.footerBrand}>
                <span className={styles.logoText}>Query<span className={styles.logoAccent}>Daily</span></span>
                <p>주니어 개발자를 위한 맞춤형 면접 트레이닝</p>
              </div>

              <div className={styles.footerLinks}>
                <div className={styles.footerColumn}>
                  <h4
                    className={styles.footerColumnHeader}
                    onClick={() => setOpenFooterSection(openFooterSection === 'service' ? null : 'service')}
                  >
                    서비스
                    <span className={styles.footerToggleIcon}>{openFooterSection === 'service' ? '−' : '+'}</span>
                  </h4>
                  <div className={`${styles.footerColumnContent} ${openFooterSection === 'service' ? styles.footerColumnContentOpen : ''}`}>
                    <a href="#how-it-works">작동 방식</a>
                    <a href="#faq">자주 묻는 질문</a>
                  </div>
                </div>
                <div className={styles.footerColumn}>
                  <h4
                    className={styles.footerColumnHeader}
                    onClick={() => setOpenFooterSection(openFooterSection === 'support' ? null : 'support')}
                  >
                    지원
                    <span className={styles.footerToggleIcon}>{openFooterSection === 'support' ? '−' : '+'}</span>
                  </h4>
                  <div className={`${styles.footerColumnContent} ${openFooterSection === 'support' ? styles.footerColumnContentOpen : ''}`}>
                    <a href="https://pf.kakao.com/_zxkxmUn/chat" target="_blank" rel="noopener noreferrer">문의하기</a>
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보처리방침</a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p>© 2025 QueryDaily. All rights reserved.</p>
              <div className={styles.socialLinks}>
                <a href="https://pf.kakao.com/_zxkxmUn" target="_blank" rel="noopener noreferrer" aria-label="KakaoTalk">💬</a>
                <a href="#" aria-label="LinkedIn" title="Coming Soon" style={{ opacity: 0.5, cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>in</a>
                <a href="#" aria-label="GitHub" title="Coming Soon" style={{ opacity: 0.5, cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>⊙</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Error Toast */}
      {errors.length > 0 && (
        <div className={`${styles.errorToast} ${styles.show}`}>
          <div className={styles.errorContent}>
            <h4>⚠️ 입력 오류</h4>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}