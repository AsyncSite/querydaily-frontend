'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { submitBetaApplication, startFreeTrial, UserProfile } from '@/lib/api';
import styles from './page.module.css';
import { trackBetaSignupStart, trackBetaSignupComplete, trackFileUpload, trackExternalLink } from '@/components/GoogleAnalytics';
import FloatingFreeTrial from '@/components/FloatingFreeTrial';

declare global {
  interface Window {
    IMP?: {
      init: (merchantId: string) => void;
      request_pay: (params: any, callback: (response: any) => void) => void;
    };
  }
}

export default function HomePage() {
  const router = useRouter();

  // Force scroll reset on page load
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top after a small delay to override browser behavior
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Cleanup: restore default behavior when component unmounts
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Load Portone SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const [profileData, setProfileData] = useState<UserProfile>({
    email: '',
    experience: undefined,
    techStack: [],
    interests: [],
    targetCompany: undefined,
  });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [transition, setTransition] = useState(true);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [touchEnd, setTouchEnd] = useState(0);
  const [openFooterSection, setOpenFooterSection] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseModalStep, setPurchaseModalStep] = useState(1);
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<string | null>(null);
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [purchaseName, setPurchaseName] = useState('');
  const [purchasePhone, setPurchasePhone] = useState('');
  const [purchaseEmail, setPurchaseEmail] = useState(''); // KAKAO/INICIS REVIEW: Email moved from Step 2 to here
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card' | null>(null);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [sentVerificationCode, setSentVerificationCode] = useState('');
  const [freeTrialVerificationSent, setFreeTrialVerificationSent] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  // Calculate days remaining until Oct 31
  const calculateDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(today.getFullYear(), 9, 31); // October 31
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  const [daysRemaining] = useState(calculateDaysRemaining());

  // Timer effect for email verification
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verificationTimer > 0) {
      interval = setInterval(() => {
        setVerificationTimer(prev => {
          if (prev <= 1) {
            setShowVerificationInput(false);
            setSentVerificationCode('');
            setNotification({ message: '인증 시간이 초과되었습니다. 다시 시도해주세요.', type: 'error' });
            setTimeout(() => setNotification(null), 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verificationTimer]);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  // Auto-hide error toast after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      // Clear any existing timeout
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      // Set new timeout to clear errors after 5 seconds
      const timeout = setTimeout(() => {
        setErrors([]);
      }, 5000);

      setErrorTimeout(timeout);
    }

    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [errors]);

  // Countdown timer is now a separate component to prevent re-renders

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

  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedPurchaseProduct(productId);
    setPurchaseModalOpen(true);
    setPurchaseModalStep(1);
    // Reset email verification state
    setIsEmailVerified(false);
    setShowVerificationInput(false);
    setVerificationCode('');
    setSentVerificationCode('');
    // Reset purchase info
    setPurchaseName('');
    setPurchasePhone('');
    setPurchaseEmail(''); // KAKAO/INICIS REVIEW: Reset email
    setPurchaseFile(null);
  };

  // Send verification email
  const handleSendVerification = () => {
    if (!profileData.email || !profileData.email.includes('@')) {
      setNotification({ message: '올바른 이메일 주소를 입력해주세요', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // KAKAO/INICIS REVIEW: Auto-approve for review process
    setIsEmailVerified(true);
    setShowVerificationInput(false);
    setNotification({ message: '이메일 인증이 완료되었습니다!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    return;

    // Original code (commented for review)
    /*
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentVerificationCode(code);
    setShowVerificationInput(true);
    setVerificationTimer(180); // 3 minutes = 180 seconds

    // Mock: In real implementation, send email via backend API
    console.log(`Verification code sent to ${profileData.email}: ${code}`);
    setNotification({
      message: `인증 코드가 ${profileData.email}로 전송되었습니다. (테스트: ${code})`,
      type: 'info'
    });
    setTimeout(() => setNotification(null), 5000);
    */
  };

  // Verify the code
  const handleVerifyCode = () => {
    // KAKAO/INICIS REVIEW: Auto-approve for review process
    setIsEmailVerified(true);
    setShowVerificationInput(false);
    setVerificationTimer(0);
    setNotification({ message: '이메일 인증이 완료되었습니다!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    return;

    // Original code (commented for review)
    /*
    if (verificationCode === sentVerificationCode) {
      setIsEmailVerified(true);
      setShowVerificationInput(false);
      setVerificationTimer(0);
      setNotification({ message: '이메일 인증이 완료되었습니다!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ message: '인증 코드가 일치하지 않습니다. 다시 확인해주세요.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
    */
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

  const handleCardPayment = () => {
    if (!window.IMP) {
      alert('\uacb0\uc81c \ubaa8\ub4c8\uc774 \ub85c\ub4dc\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.');
      return;
    }

    // Initialize Portone with test MID
    window.IMP.init('iamport'); // 포트원 공식 테스트용 가맹점 식별코드

    // \uc0c1\ud488\uba85\uacfc \uac00\uaca9 \ub9e4\ud551
    const productNames: Record<string, string> = {
      'critical-hit': '\ud06c\ub9ac\ud2f0\uceec \ud788\ud2b8',
      'growth-plan': '\uadf8\ub85c\uc2a4 \ud50c\ub79c',
      'real-interview': '\ub9ac\uc5bc \uc778\ud130\ubdf0',
      'resume-analytics': '\ub77c\uc2a4\ud2b8 \uccb4\ud06c'
    };

    const productPrices: Record<string, number> = {
      'critical-hit': 1900,
      'growth-plan': 34900,
      'real-interview': 129000,
      'resume-analytics': 19900
    };

    const orderData = {
      pg: 'html5_inicis', // 이니시스 웹표준 결제 (테스트)
      pay_method: 'card',
      merchant_uid: `QD${Date.now()}`,
      name: productNames[selectedPurchaseProduct || ''] || '',
      amount: productPrices[selectedPurchaseProduct || ''] || 0,
      buyer_email: purchaseEmail || 'test@example.com',
      buyer_name: purchaseName || 'Guest',
      buyer_tel: purchasePhone || '010-0000-0000',
      custom_data: {
        product: selectedPurchaseProduct
      }
    };

    window.IMP.request_pay(orderData, (response: any) => {
      if (response.success) {
        // Store order data
        const orderInfo = {
          orderId: response.merchant_uid,
          productName: orderData.name,
          price: orderData.amount,
          paymentMethod: 'card',
          email: purchaseEmail,
          name: purchaseName,
          phone: purchasePhone || '',
          paymentId: response.imp_uid,
          paidAt: new Date().toISOString(),
        };
        localStorage.setItem('orderData', JSON.stringify(orderInfo));

        // Redirect to success page
        window.location.href = '/order-complete';
      } else {
        alert(`\uacb0\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4: ${response.error_msg}`);
      }
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profileData.email || !emailRegex.test(profileData.email)) {
      setErrors(['올바른 이메일 주소를 입력해주세요']);
      return;
    }

    setErrors([]);
    setShowProfileForm(true);
    calculateProfileCompleteness();
  };

  const calculateProfileCompleteness = () => {
    let score = 20; // 이메일 입력 시 기본 20%
    if (profileData.experience) score += 20;
    if (profileData.techStack && profileData.techStack.length > 0) score += 20;
    if (profileData.interests && profileData.interests.length > 0) score += 20;
    if (profileData.targetCompany) score += 20;
    setProfileCompleteness(score);
  };

  const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    // 프로필 완성도 재계산
    setTimeout(calculateProfileCompleteness, 100);
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    // Email validation (이메일만 필수)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email || !emailRegex.test(profileData.email)) {
      newErrors.push('올바른 이메일 주소를 입력해주세요');
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

      // Track signup start
      trackBetaSignupStart();

      try {
        // 선택된 상품 정보를 포함하여 무료 체험 시작
        const trialData = {
          ...profileData,
          selectedProduct: selectedProduct || undefined // null을 undefined로 변환
        };
        const response = await startFreeTrial(trialData);

        // Track successful signup
        trackBetaSignupComplete();

        // Redirect to success page with email parameter
        router.push(`/success?email=${encodeURIComponent(profileData.email)}`);
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
      {/* Notification Modal */}
      {notification && (
        <div className={styles.notificationContainer}>
          <div className={`${styles.notification} ${styles[`notification${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}`]}`}>
            <span className={styles.notificationMessage}>{notification.message}</span>
            <button
              className={styles.notificationClose}
              onClick={() => setNotification(null)}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
                <span>시작하기</span>
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
            <div className={styles.heroBadgeContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeIcon}>🎯</span>
                <span><strong>이력서 맞춤형</strong> 면접 질문 서비스</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>이력서에서 나올</span><br/>
              <span className={styles.textGradient}>그 질문, 미리 준비하세요</span>
            </h1>

            <p className={styles.heroSubtitle}>
              면접관이 <strong>프로젝트 경험</strong>에서 꺼낼 날카로운 질문들.<br/>
              AI가 분석해 미리 준비하고, 자신 있게 답변하세요.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>87%</div>
                <div className={styles.statLabel}>기술 면접 질문으로<br/>떨어지는 개발자</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>실제 면접 데이터로<br/>학습한 AI</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>즉시</div>
                <div className={styles.statLabel}>AI 이력서<br/>분석 시작</div>
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
                  <span>상품 선택하기</span>
                  <span className={styles.btnArrow}>→</span>
                </a>
              </div>
              <p className={styles.ctaNote}>
                <span className={styles.noteIcon}>✓</span> 즉시 시작 가능
                <span className={styles.noteDivider}>•</span>
                <span className={styles.noteIcon}>✓</span> 지하철, 버스 어디서든 가능
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
            면접 준비를 위한 프리미엄 서비스
          </h2>
          <p className={styles.sectionSubtitle}>
            당신의 경력과 목표에 맞는 상품을 선택하세요
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
            <div className={styles.productCard}>
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
                  <span className={styles.serviceInfoValue}>20일간 매일 발송</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>첫 질문 발송 전 100%, 이후 일할 계산</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩99,000</span>
                <span className={styles.priceCurrent}>₩34,900</span>
              </div>
              <button
                className={`${styles.btn} ${styles.btnProductCta} ${styles.btnProductCtaPrimary}`}
                onClick={() => handleProductSelect('growth-plan')}
              >
                지금 시작하기
              </button>
            </div>

            {/* 리얼 인터뷰 - 모의면접 */}
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
                  <span className={styles.serviceInfoValue}>90분 모의면접 1회</span>
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
              <button
                className={`${styles.btn} ${styles.btnProductCta}`}
                onClick={() => handleProductSelect('real-interview')}
              >
                지금 시작하기
              </button>
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
                  <span className={styles.serviceInfoValue}>구매 즉시 제공</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>콘텐츠 열람 전 100% 환불</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩4,900</span>
                <span className={styles.priceCurrent}>₩1,900</span>
              </div>
              <button
                className={`${styles.btn} ${styles.btnProductCta}`}
                onClick={() => handleProductSelect('critical-hit')}
              >
                지금 시작하기
              </button>
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
                  <span className={styles.serviceInfoValue}>구매 즉시 제공</span>
                </div>
                <div className={styles.serviceInfoItem}>
                  <span className={styles.serviceInfoLabel}>환불 규정</span>
                  <span className={styles.serviceInfoValue}>콘텐츠 열람 전 100% 환불</span>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.priceOriginal}>₩29,900</span>
                <span className={styles.priceCurrent}>₩19,900</span>
              </div>
              <button
                className={`${styles.btn} ${styles.btnProductCta}`}
                onClick={() => handleProductSelect('resume-analytics')}
              >
                지금 시작하기
              </button>
            </div>
          </div>

          <div className={styles.productsCta}>
            <div className={styles.priceNoticeChip}>
              <span className={styles.chipIcon}>⏰</span>
              <span className={styles.chipText}>
                10월 특가 <strong>D-{daysRemaining}</strong> · 이후 정가 전환
              </span>
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

          {/* Sample Email Preview */}
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

      {/* Who We Are Section - Team Collective Narrative */}
      <div className={`${styles.section} ${styles.whoWeAre}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.whoWeAreHeader}>
            <span className={styles.whoWeAreBadge}>이 서비스를 만든 사람들</span>
            <h2 className={styles.whoWeAreTitle}>
              실패 데이터 500개가 만든<br/>
              <span className={styles.whoWeAreHighlight}>합격 공식</span>
            </h2>
            <p className={styles.whoWeAreSubtitle}>
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

          {/* 4인의 전문가 팀 */}
          <div className={styles.expertSection}>
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
                <span className={styles.summaryMessage}>수십 번의 탈락과 수백 번의 <span className={styles.highlight}>삽질</span>,<br/>그리고 실제 성공한 <span className={styles.highlight}>데이터</span>로 증명합니다.</span>
              </p>
            </div>
          </div>

          {/* 2025년 데이터 인사이트 */}
          <div className={styles.insightSection}>
            <div className={styles.insightHeader}>
              <div className={styles.insightYear}>2025</div>
              <div className={styles.insightTitle}>최신 면접 데이터 인사이트</div>
            </div>
            <h3 className={styles.insightTitle}>500건의 면접 분석 결과</h3>
            <div className={styles.insightContent}>
              <div className={styles.insightGrid}>
                <div className={styles.insightCard}>
                  <div className={styles.insightNumber}>01</div>
                  <h4 className={styles.insightQuestion}>합격의 비밀?</h4>
                  <p className={styles.insightAnswer}>특별한 게 아니었어요</p>
                </div>
                <div className={styles.insightCard}>
                  <div className={styles.insightNumber}>02</div>
                  <h4 className={styles.insightQuestion}>불합격의 패턴?</h4>
                  <p className={styles.insightAnswer}>놀랍도록 일정했어요</p>
                </div>
              </div>

              <div className={styles.insightFindings}>
                <h4>우리가 발견한 진실</h4>
                <div className={styles.findingsGrid}>
                  <div className={styles.findingItem}>
                    <div className={styles.findingNumber}>1</div>
                    <p>완벽한 답변보다<br/><strong>치명적 실수 회피</strong></p>
                  </div>
                  <div className={styles.findingItem}>
                    <div className={styles.findingNumber}>2</div>
                    <p>가산점보다<br/><strong>감점 요소 제거</strong></p>
                  </div>
                  <div className={styles.findingItem}>
                    <div className={styles.findingNumber}>3</div>
                    <p>돋보이려 하다가<br/><strong>망치는 경우가 대부분</strong></p>
                  </div>
                </div>
              </div>

              <div className={styles.keyQuestions}>
                <h4>당신의 이력서에서 합격을 좌우할 <span className={styles.highlightNumber}>단 3개</span>의 질문</h4>
                <p className={styles.questionDesc}>
                  면접관이 듣고 싶어하는 답변은 따로 있어요.<br/>
                  <span className={styles.subtle}>교과서로 배울 수 없는 그것.</span>
                </p>
                <div className={styles.ctaMessage}>
                  <span className={styles.warningText}>매일 3분 투자</span>로<br/>
                  남들의 3개월 시행착오를 압축해요.
                </div>
              </div>
            </div>
          </div>

          {/* 차별화 포인트 */}
          <div className={styles.differenceSection}>
            <div className={styles.differenceContent}>
              <div className={styles.differenceLeft}>
                <h3 className={styles.differenceTitle}>우리의 접근법</h3>
                <p className={styles.differenceText}>
                  어디서나 볼 수 있는 <span className={styles.strikethrough}>'모범 답안'</span> 대신<br/>
                  당신의 경험에서 나올 <span className={styles.highlight}>'진짜 질문'</span>을 찾아드려요
                </p>
              </div>
              <div className={styles.differenceRight}>
                <div className={styles.testimonialProof}>
                  <div className={styles.miniTestimonialCard}>
                    <span className={styles.testimonialIcon}>"</span>
                    <div>
                      <p>QueryDaily 질문이 실제 면접에 5개 이상 나왔어요</p>
                      <span className={styles.testerName}>- 베타 테스터 K님</span>
                    </div>
                  </div>
                  <div className={styles.miniTestimonialCard}>
                    <span className={styles.testimonialIcon}>"</span>
                    <div>
                      <p>'그냥 썼던' 기술에 논리를 붙이는 법 배웠어요</p>
                      <span className={styles.testerName}>- 베타 테스터 L님</span>
                    </div>
                  </div>
                  <div className={styles.miniTestimonialCard}>
                    <span className={styles.testimonialIcon}>"</span>
                    <div>
                      <p>가이드 답변대로 했더니 면접관이 고개 끄덕이더라고요</p>
                      <span className={styles.testerName}>- 베타 테스터 P님</span>
                    </div>
                  </div>
                </div>
              </div>
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
          <h2 className={styles.sectionTitle}>🔒 당신의 이력서, 안전하게 다룹니다</h2>
          <p className={styles.sectionSubtitle}>개발자가 개발자를 위해 만든, 가장 투명한 이력서 분석 시스템</p>

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

      {/* Removed beta application section - using modals now */}

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
                    <a href="https://pf.kakao.com/_zxkxmUn/chat" target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('kakao_contact')}>문의하기</a>
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보처리방침</a>
                    <a href="/refund-policy">환불정책</a>
                    {/* KAKAO/INICIS REVIEW: Business info button hidden - now displayed directly in footer */}
                    {/* <button
                      className={styles.footerLinkBtn}
                      onClick={() => setShowBusinessInfo(true)}
                    >
                      사업자정보
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <div>
                <p>© 2025 QueryDaily. All rights reserved.</p>
                {/* KAKAO/INICIS REVIEW: Business info displayed directly */}
                <div className={styles.footerBusinessInfo}>
                  <p><strong>사업자 정보</strong></p>
                  <p>상호명: 어싱크사이트 | 대표자: 최보임</p>
                  <p>사업자등록번호: 456-12-02771</p>
                  <p>사업장 주소: 경기도 화성시 동탄대로4길 18</p>
                  <p>대표전화: 010-8120-4131 | 이메일: official.querydaily@gmail.com</p>
                </div>
              </div>
              <div className={styles.socialLinks}>
                <a href="https://pf.kakao.com/_zxkxmUn/chat" target="_blank" rel="noopener noreferrer" aria-label="KakaoTalk" onClick={() => trackExternalLink('kakao_footer')}>💬</a>
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
          <button
            className={styles.errorToastClose}
            onClick={() => setErrors([])}
            aria-label="닫기"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: '0.8',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            ✕
          </button>
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

      {/* Free Trial Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalContent}>
              {/* Progress Indicator */}
              <div className={styles.modalProgress}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`${styles.modalProgressDot} ${
                      modalStep >= step ? styles.modalProgressDotActive : ''
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Email */}
              {modalStep === 1 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>📧</span>
                    이메일 주소를 알려주세요
                  </h2>
                  <p className={styles.modalSubtitle}>
                    구매 전 품질을 확인하실 수 있는 기회입니다
                  </p>

                  <div className={styles.modalFreeTrialInfo}>
                    <div className={styles.modalInfoBox}>
                      <span className={styles.modalInfoIcon}>🆓</span>
                      <div>
                        <p className={styles.modalInfoTitle}>품질 확인용 샘플</p>
                        <p className={styles.modalInfoDesc}>실제 서비스와 동일한 품질의 <strong>면접 질문 3개</strong>를 무료로 체험하세요</p>
                      </div>
                    </div>
                    <div className={styles.modalInfoBox}>
                      <span className={styles.modalInfoIcon}>💎</span>
                      <div>
                        <p className={styles.modalInfoTitle}>유료 상품에서는</p>
                        <p className={styles.modalInfoDesc}>당신의 <strong>이력서를 분석</strong>해 맞춤형 심화 질문을 생성합니다</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.modalFormGroup}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={styles.modalInput}
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      autoFocus
                    />
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                      onClick={() => {
                        if (profileData.email && profileData.email.includes('@')) {
                          // Send verification email in background (non-blocking)
                          if (!freeTrialVerificationSent) {
                            const code = Math.floor(100000 + Math.random() * 900000).toString();
                            setSentVerificationCode(code);
                            setFreeTrialVerificationSent(true);

                            // Mock: In real implementation, send email via backend API
                            console.log(`Verification code sent (non-blocking) to ${profileData.email}: ${code}`);
                          }

                          setModalStep(2);
                        } else {
                          setErrors(['올바른 이메일 주소를 입력해주세요']);
                          setTimeout(() => setErrors([]), 3000);
                        }
                      }}
                      disabled={!profileData.email}
                    >
                      다음 단계로
                    </button>
                  </div>

                  <p className={styles.modalHint}>
                    💡 이메일은 필수 정보예요. 나머지는 선택사항입니다.
                  </p>
                </div>
              )}

              {/* Step 2: Experience Level (Optional) */}
              {modalStep === 2 && (
                <div className={styles.modalStep}>
                  {freeTrialVerificationSent && (
                    <div className={styles.modalVerificationNotice}>
                      📬 인증 이메일을 {profileData.email}로 보냈습니다
                      <br />
                      <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>나중에 확인하셔도 무료 체험은 정상 진행됩니다</span>
                    </div>
                  )}

                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>📊</span>
                    경력 수준을 선택해주세요
                  </h2>
                  <p className={styles.modalSubtitle}>
                    더 정확한 질문을 생성하는데 도움이 돼요 (선택)
                  </p>

                  <div className={styles.modalOptions}>
                    {['신입', '1-3년', '3-5년', '5년+'].map((exp) => (
                      <button
                        key={exp}
                        className={`${styles.modalOption} ${
                          profileData.experience === exp ? styles.modalOptionActive : ''
                        }`}
                        onClick={() => setProfileData({ ...profileData, experience: exp })}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setModalStep(1)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                      onClick={() => setModalStep(3)}
                    >
                      {profileData.experience ? '다음 단계로' : '건너뛰기'}
                    </button>
                  </div>

                  <p className={styles.modalHint}>
                    💡 건너뛰어도 체험 시작에 문제없어요
                  </p>
                </div>
              )}

              {/* Step 3: Tech Stack (Optional) */}
              {modalStep === 3 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>🛠️</span>
                    주력 기술 스택을 선택해주세요
                  </h2>
                  <p className={styles.modalSubtitle}>
                    맞춤형 질문 생성에 도움이 돼요 (선택, 복수 선택 가능)
                  </p>

                  <div className={styles.modalTechGrid}>
                    {[
                      'Spring Boot', 'JPA', 'MyBatis', 'MSA',
                      'Kafka', 'Redis', 'Docker', 'Kubernetes',
                      'React', 'Vue', 'Node.js', 'MongoDB'
                    ].map((tech) => (
                      <button
                        key={tech}
                        className={`${styles.modalTechItem} ${
                          profileData.techStack?.includes(tech) ? styles.modalTechItemActive : ''
                        }`}
                        onClick={() => {
                          const currentStack = profileData.techStack || [];
                          if (currentStack.includes(tech)) {
                            setProfileData({
                              ...profileData,
                              techStack: currentStack.filter(t => t !== tech)
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              techStack: [...currentStack, tech]
                            });
                          }
                        }}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setModalStep(2)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                      onClick={() => setModalStep(4)}
                    >
                      {profileData.techStack?.length ? '다음 단계로' : '건너뛰기'}
                    </button>
                  </div>

                  <p className={styles.modalHint}>
                    💡 선택하지 않아도 기본 질문을 받을 수 있어요
                  </p>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {modalStep === 4 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>👍</span>
                    품질 확인 준비 완료!
                  </h2>

                  <div className={styles.modalSummary}>
                    <div className={styles.modalSummaryItem}>
                      <span className={styles.modalSummaryLabel}>이메일</span>
                      <span className={styles.modalSummaryValue}>{profileData.email}</span>
                    </div>
                    {profileData.experience && (
                      <div className={styles.modalSummaryItem}>
                        <span className={styles.modalSummaryLabel}>경력</span>
                        <span className={styles.modalSummaryValue}>{profileData.experience}</span>
                      </div>
                    )}
                    {profileData.techStack && profileData.techStack.length > 0 && (
                      <div className={styles.modalSummaryItem}>
                        <span className={styles.modalSummaryLabel}>기술</span>
                        <span className={styles.modalSummaryValue}>
                          {profileData.techStack.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.modalHighlight}>
                    <p>✅ 실제 서비스와 동일한 품질</p>
                    <p>✅ 마음에 들면 그때 구매</p>
                    <p>✅ 스팸 없음, 강요 없음</p>
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setModalStep(3)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary} ${styles.modalBtnLarge}`}
                      onClick={async () => {
                        setIsSubmitting(true);
                        try {
                          const response = await startFreeTrial(profileData);
                          if (response.success) {
                            setModalOpen(false);
                            router.push(`/trial-started?email=${encodeURIComponent(profileData.email)}`);
                          }
                        } catch (error) {
                          setErrors([error instanceof Error ? error.message : '체험 시작 중 오류가 발생했습니다']);
                          setTimeout(() => setErrors([]), 5000);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '처리 중...' : '무료로 품질 확인하기'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal for Paid Products */}
      {purchaseModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setPurchaseModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setPurchaseModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalContent}>
              {/* Progress Indicator */}
              <div className={styles.modalProgress}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`${styles.modalProgressDot} ${
                      purchaseModalStep >= step ? styles.modalProgressDotActive : ''
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Resume Upload */}
              {purchaseModalStep === 1 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>📄</span>
                    이력서를 업로드해주세요
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {selectedPurchaseProduct === 'critical-hit' && '맞춤형 핵심 질문 생성을 위해 필요합니다'}
                    {selectedPurchaseProduct === 'growth-plan' && '20일 성장 계획 수립을 위해 필요합니다'}
                    {selectedPurchaseProduct === 'real-interview' && '모의면접 준비를 위해 필요합니다'}
                    {selectedPurchaseProduct === 'resume-analytics' && '면접 D-1 긴급 대비를 위해 필요합니다'}
                  </p>

                  <div className={styles.selectedProductInfo}>
                    <span className={styles.modalProductBadge}>
                      {selectedPurchaseProduct === 'critical-hit' && '크리티컬 히트'}
                      {selectedPurchaseProduct === 'growth-plan' && '그로스 플랜'}
                      {selectedPurchaseProduct === 'real-interview' && '리얼 인터뷰'}
                      {selectedPurchaseProduct === 'resume-analytics' && '라스트 체크'}
                    </span>
                    <span className={styles.modalProductPrice}>
                      {selectedPurchaseProduct === 'critical-hit' && '₩1,900'}
                      {selectedPurchaseProduct === 'growth-plan' && '₩34,900'}
                      {selectedPurchaseProduct === 'real-interview' && '₩129,000'}
                      {selectedPurchaseProduct === 'resume-analytics' && '₩19,900'}
                    </span>
                  </div>

                  <div className={styles.modalFormGroup}>
                    <div className={styles.fileUploadArea}>
                      <input
                        type="file"
                        id="purchaseResume"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              setErrors(['파일 크기는 10MB 이하여야 합니다']);
                              setTimeout(() => setErrors([]), 3000);
                              return;
                            }
                            setPurchaseFile(file);
                          }
                        }}
                      />
                      <label htmlFor="purchaseResume" className={styles.fileUploadBox}>
                        {purchaseFile ? (
                          <>
                            <span className={styles.uploadedIcon}>✅</span>
                            <span className={styles.uploadedFileName}>{purchaseFile.name}</span>
                            <span className={styles.uploadedSize}>
                              ({(purchaseFile.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={styles.uploadIcon}>📤</span>
                            <span className={styles.uploadText}>PDF 파일을 선택하거나 드래그하세요</span>
                            <span className={styles.uploadHint}>최대 10MB</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* KAKAO/INICIS REVIEW: Skip email step, show payment methods directly */}
                  {purchaseFile && (
                    <>
                      <div className={styles.paymentMethodTitle}>
                        결제 방법을 선택해주세요
                      </div>
                      <div className={styles.paymentMethodButtons}>
                        <button
                          className={`${styles.paymentMethodBtn} ${styles.bankTransferBtn}`}
                          onClick={() => {
                            setPaymentMethod('bank');
                            setPurchaseModalStep(2);
                          }}
                        >
                          <span className={styles.paymentMethodIcon}>🏦</span>
                          <span className={styles.paymentMethodText}>
                            <strong>무통장입금</strong>
                            <small>계좌이체로 안전하게 결제</small>
                          </span>
                        </button>
                        <button
                          className={`${styles.paymentMethodBtn} ${styles.cardPaymentBtn}`}
                          onClick={() => {
                            setPaymentMethod('card');
                            setPurchaseModalStep(2); // KAKAO/INICIS REVIEW: Go to order info first
                          }}
                        >
                          <span className={styles.paymentMethodIcon}>💳</span>
                          <span className={styles.paymentMethodText}>
                            <strong>카드결제</strong>
                            <small>신용/체크카드로 간편 결제</small>
                          </span>
                        </button>
                      </div>
                    </>
                  )}

                  {!purchaseFile && (
                    <div className={styles.modalActions}>
                      <button
                        className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                        onClick={() => setPurchaseModalOpen(false)}
                      >
                        취소
                      </button>
                    </div>
                  )}

                  <p className={styles.modalHint}>
                    💡 이력서는 암호화되어 안전하게 보관되며, AI 분석에만 사용됩니다
                  </p>
                </div>
              )}

              {/* KAKAO/INICIS REVIEW: Email step removed for review */}

              {/* Step 2: Order Information (was Step 3) */}
              {purchaseModalStep === 2 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>📝</span>
                    주문자 정보 입력
                  </h2>
                  <p className={styles.modalSubtitle}>
                    결제를 위한 정보를 입력해주세요
                  </p>

                  {/* 이메일 입력 - KAKAO/INICIS REVIEW: Moved from Step 2 */}
                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>이메일 <span style={{ color: '#ff6b6b' }}>*</span></label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={styles.modalInput}
                      value={purchaseEmail}
                      onChange={(e) => setPurchaseEmail(e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* 이름 입력 */}
                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>이름 <span style={{ color: '#ff6b6b' }}>*</span></label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className={styles.modalInput}
                      value={purchaseName}
                      onChange={(e) => setPurchaseName(e.target.value)}
                    />
                  </div>

                  {/* 연락처 입력 */}
                  <div className={styles.modalFormGroup}>
                    <label className={styles.modalLabel}>연락처 <span style={{ color: '#ff6b6b' }}>*</span></label>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      className={styles.modalInput}
                      value={purchasePhone}
                      onChange={(e) => setPurchasePhone(e.target.value)}
                    />
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setPurchaseModalStep(1)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                      onClick={() => {
                        if (!purchaseEmail.trim() || !purchaseEmail.includes('@')) {
                          alert('올바른 이메일을 입력해주세요');
                        } else if (!purchaseName.trim()) {
                          alert('이름을 입력해주세요');
                        } else if (!purchasePhone.trim()) {
                          alert('연락처를 입력해주세요');
                        } else {
                          // KAKAO/INICIS REVIEW: Handle different payment methods
                          if (paymentMethod === 'card') {
                            handleCardPayment();
                          } else {
                            setPurchaseModalStep(3); // Go to bank transfer info
                          }
                        }
                      }}
                      disabled={!purchaseEmail.includes('@') || !purchaseName.trim() || !purchasePhone.trim()}
                    >
                      다음 단계로
                    </button>
                  </div>

                  <p className={styles.modalHint}>
                    💡 입금자명 확인을 위해 정확한 정보를 입력해주세요
                  </p>
                </div>
              )}

              {/* Step 3: Payment (was Step 4) */}
              {purchaseModalStep === 3 && (
                <div className={styles.modalStep}>
                  <h2 className={styles.modalTitle}>
                    <span className={styles.modalEmoji}>💳</span>
                    무통장입금 안내
                  </h2>
                  <p className={styles.modalSubtitle}>
                    안전한 결제를 진행합니다
                  </p>

                  <div className={styles.modalOrderSummary}>
                    <div className={styles.modalOrderItem}>
                      <span>상품</span>
                      <span>
                        {selectedPurchaseProduct === 'critical-hit' && '크리티컬 히트'}
                        {selectedPurchaseProduct === 'growth-plan' && '그로스 플랜'}
                        {selectedPurchaseProduct === 'real-interview' && '리얼 인터뷰'}
                        {selectedPurchaseProduct === 'resume-analytics' && '라스트 체크'}
                      </span>
                    </div>
                    <div className={styles.modalOrderItem}>
                      <span>가격</span>
                      <span>
                        {selectedPurchaseProduct === 'critical-hit' && '₩1,900'}
                        {selectedPurchaseProduct === 'growth-plan' && '₩34,900'}
                        {selectedPurchaseProduct === 'real-interview' && '₩129,000'}
                        {selectedPurchaseProduct === 'resume-analytics' && '₩19,900'}
                      </span>
                    </div>
                    <div className={styles.modalOrderItem} style={{ fontWeight: 'bold', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '15px' }}>
                      <span>결제 금액</span>
                      <span style={{ color: '#c3e88d' }}>
                        {selectedPurchaseProduct === 'critical-hit' && '₩1,900'}
                        {selectedPurchaseProduct === 'growth-plan' && '₩34,900'}
                        {selectedPurchaseProduct === 'real-interview' && '₩129,000'}
                        {selectedPurchaseProduct === 'resume-analytics' && '₩19,900'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.modalHighlight}>
                    <p>✅ 무통장입금으로 안전한 결제</p>
                    <p>✅ 입금 확인 후 24시간 내 발송</p>
                    <p>✅ 이메일로 결과 전송</p>
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                      onClick={() => setPurchaseModalStep(2)}
                    >
                      이전
                    </button>
                    <button
                      className={`${styles.modalBtn} ${styles.modalBtnPrimary} ${styles.modalBtnLarge}`}
                      onClick={async () => {
                        if (!purchaseFile || !purchaseName || !purchaseEmail || !purchasePhone) {
                          setErrors(['모든 필수 정보를 입력해주세요.']);
                          return;
                        }

                        setIsSubmitting(true);
                        try {
                          // productType 매핑
                          const productTypeMap: Record<string, string> = {
                            'critical-hit': 'CRITICAL_HIT',
                            'growth-plan': 'SQL_MASTER',
                            'real-interview': 'SYSTEM_DESIGN',
                            'resume-analytics': 'DATA_ALGO'
                          };

                          // API 호출
                          const response = await submitBetaApplication({
                            email: purchaseEmail,
                            name: purchaseName,
                            phone: purchasePhone,
                            productType: productTypeMap[selectedPurchaseProduct || ''] || 'SQL_MASTER',
                            resume: purchaseFile
                          });

                          if (response.success && response.data.memberId) {
                            // 주문 정보를 localStorage에 저장
                            const orderData = {
                              memberId: response.data.memberId,
                              name: purchaseName,
                              email: purchaseEmail,
                              phone: purchasePhone,
                              product: selectedPurchaseProduct || '',
                              orderDate: new Date().toISOString(),
                              orderId: `QD${Date.now()}`
                            };

                            localStorage.setItem('orderData', JSON.stringify(orderData));

                            // 무통장입금 안내 페이지로 이동
                            router.push('/payment');
                          } else {
                            setErrors(['신청 처리 중 오류가 발생했습니다.']);
                          }
                        } catch (error) {
                          console.error('Error submitting application:', error);
                          setErrors(['신청 처리 중 오류가 발생했습니다.']);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '처리중...' : '무통장입금으로 결제하기'}
                    </button>
                  </div>

                  <p className={styles.modalPaymentSecurity}>
                    🔒 결제 정보는 암호화되어 안전하게 처리됩니다
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Business Info Modal */}
      {showBusinessInfo && (
        <div className={styles.modalOverlay} onClick={() => setShowBusinessInfo(false)}>
          <div className={styles.businessModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowBusinessInfo(false)}
            >
              ×
            </button>
            <h3 className={styles.businessModalTitle}>사업자 정보</h3>
            <div className={styles.businessModalContent}>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>상호명</span>
                <span className={styles.businessValue}>어싱크사이트</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>대표자</span>
                <span className={styles.businessValue}>최보임</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>사업자등록번호</span>
                <span className={styles.businessValue}>456-12-02771</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>사업장 주소</span>
                <span className={styles.businessValue}>경기도 화성시 동탄대로4길 18</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>대표전화</span>
                <span className={styles.businessValue}>010-8120-4131</span>
              </div>
              <div className={styles.businessRow}>
                <span className={styles.businessLabel}>이메일</span>
                <span className={styles.businessValue}>official.querydaily@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Free Trial - Subtle & Non-intrusive */}
      <FloatingFreeTrial onOpenModal={() => {
        setModalOpen(true);
        setModalStep(1);
        setFreeTrialVerificationSent(false);
        setSentVerificationCode('');
      }} />

    </div>
  );
}