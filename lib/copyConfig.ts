export interface CopyConfig {
  // Meta
  version: string;
  description: string;

  // Hero Section
  heroBadge: string;
  heroTitle: {
    main: string;
    highlight: string;
  };
  heroSubtitle: string;
  heroStats: {
    stat1: { number: string; label: string };
    stat2: { number: string; label: string };
    stat3: { number: string; label: string };
  };
  ctaButton: string;
  ctaNote: string;

  // Problem Section
  problemTitle: string;
  problemSubtitle: string;

  // Why Section
  whyTitle: string;
  whySubtitle: string;

  // Social Proof Section (실제 사용자들)
  socialProofTitle: string;

  // Products Section
  productsTitle: string;
  productsSubtitle: string;
  productCTA: string; // "지금 시작하기" 버튼 문구

  // How It Works Section
  howItWorksTitle: string;
  howItWorksSubtitle: string;

  // Question Types Section
  questionTypesTitle: string;
  questionTypesSubtitle: string;

  // Who We Are Section
  whoWeAreTitle: string;
  whoWeAreSubtitle: string;
  whoWeAreHighlight: string;

  // Privacy Trust Section
  privacyTitle: string;
  privacySubtitle: string;

  // FAQ Section
  faqTitle: string;
  faqSubtitle: string;

  // Value Proposition Section (optional)
  valueTitle?: string;
  valueSubtitle?: string;

  // Testimonials Section (optional)
  testimonialsTitle?: string;
}

export const copyVariations: Record<string, CopyConfig> = {
  // 1. 돈을 번다 (연봉 상승)
  'earn-money': {
    version: '연봉 상승',
    description: '돈을 번다 - 면접 합격으로 연봉 UP',

    heroBadge: '💰 연봉 협상력 UP',
    heroTitle: {
      main: '면접 한 번 성공하면',
      highlight: '연봉 500만원이 달라집니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해 미리 준비하고, 더 높은 연봉을 제안받으세요.',
    heroStats: {
      stat1: { number: '평균 27%', label: '면접 합격 시<br/>연봉 인상률' },
      stat2: { number: '₩1,350만', label: '평균<br/>연봉 상승액' },
      stat3: { number: '즉시', label: 'AI 이력서<br/>분석 시작' },
    },
    ctaButton: '연봉 올리고 시작하기',
    ctaNote: '✓ 대기업 합격으로 연봉 UP',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '면접 준비하면서 연봉 협상력을 높이고 싶으신가요?',

    whyTitle: '왜 면접 준비가 돈이 되는가?',
    whySubtitle: '잘 준비된 면접 = 더 높은 연봉 제안',

    socialProofTitle: '실제 연봉 상승 사례',

    productsTitle: '연봉을 올릴 준비가 되셨나요?',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '연봉 올리는 3단계',
    howItWorksSubtitle: '이력서 분석부터 면접 합격까지',

    questionTypesTitle: '대기업이 묻는 고액연봉 질문',
    questionTypesSubtitle: '연봉 협상력을 높이는 핵심 질문 유형',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '연봉 2배 달성 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: '개발자가 개발자를 위해 만든, 가장 투명한 이력서 분석 시스템',

    faqTitle: '연봉 상승에 대해 궁금하신가요?',
    faqSubtitle: '면접 합격과 연봉에 대해 가장 많이 묻는 질문',
  },

  // 2. 시간을 아낀다
  'save-time': {
    version: '시간 절약',
    description: '시간을 아낀다 - 하루 30분으로 면접 준비 완성',

    heroBadge: '⚡ 시간 절약 보장',
    heroTitle: {
      main: '면접 준비에',
      highlight: '하루 30분이면 충분합니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해서 매일 이메일로 자동 배송, 시간 낭비 없이 핵심만 준비하세요.',
    heroStats: {
      stat1: { number: '30분', label: '하루<br/>투자 시간' },
      stat2: { number: '90%', label: '준비 시간<br/>절감률' },
      stat3: { number: '0초', label: '질문 찾는<br/>시간' },
    },
    ctaButton: '시간 절약하고 시작하기',
    ctaNote: '✓ 매일 아침 9시 자동 발송',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '면접 준비에 시간이 너무 많이 걸리시나요?',

    whyTitle: '시간이 돈입니다',
    whySubtitle: '질문 검색 7시간 → AI 자동 선별 30분',

    socialProofTitle: '시간을 되찾은 개발자들',

    productsTitle: '효율적인 면접 준비를 시작하세요',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '30분만에 끝나는 3단계',
    howItWorksSubtitle: '복잡한 준비 과정을 자동화했습니다',

    questionTypesTitle: '핵심만 압축한 3가지 질문',
    questionTypesSubtitle: '시간 낭비 없이 효율적인 면접 준비',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '시간 절약 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: 'AI가 대신 분석합니다. 당신이 찾아 헤맬 필요 없습니다.',

    faqTitle: '시간 절약에 대해 궁금하신가요?',
    faqSubtitle: '빠른 면접 준비에 대해 가장 많이 묻는 질문',
  },

  // 3. 고통에서 벗어난다 (면접 불안 해소)
  'avoid-pain': {
    version: '면접 불안 해소',
    description: '고통에서 벗어난다 - 면접 공포증 극복',

    heroBadge: '🛡️ 면접 불안 해소',
    heroTitle: {
      main: '더 이상',
      highlight: '"대답 못 하면 어쩌지?" 걱정 마세요',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해 미리 준비하고, 면접장에서 당황하는 일은 이제 없습니다.',
    heroStats: {
      stat1: { number: '94%', label: '면접 불안<br/>감소 체감' },
      stat2: { number: '88%', label: '수면의 질<br/>개선률' },
      stat3: { number: '3일', label: '자신감 회복<br/>기간' },
    },
    ctaButton: '면접 불안 해소하기',
    ctaNote: '✓ 위험 부담 제로',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '면접만 생각하면 불안하고 떨리시나요?',

    whyTitle: '면접 공포에서 벗어나세요',
    whySubtitle: '준비된 답변이 있다는 것만으로도 안심됩니다',

    socialProofTitle: '면접 불안을 극복한 개발자들',

    productsTitle: '자신감을 되찾을 준비가 되셨나요?',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '불안 해소 3단계',
    howItWorksSubtitle: '3일 후 면접이 기대되기 시작합니다',

    questionTypesTitle: '가장 두려운 질문부터 대비',
    questionTypesSubtitle: '면접관이 물어볼 날카로운 질문들을 미리 준비',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '면접 자신감 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: '최악의 시나리오를 대비합니다. "모르겠어요"라고 답할 상황을 최소화',

    faqTitle: '면접 불안에 대해 궁금하신가요?',
    faqSubtitle: '면접 공포에 대해 가장 많이 묻는 질문',
  },

  // 4. 사회적 지위 향상
  'social-status': {
    version: '대기업 도전',
    description: '사회적 지위 향상 - 네이버·카카오·토스 합격',

    heroBadge: '👑 커리어 업그레이드',
    heroTitle: {
      main: '네이버, 카카오, 토스',
      highlight: '당신도 합격할 수 있습니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해 대기업·유니콘 합격을 위한 완벽한 답변을 준비하세요.',
    heroStats: {
      stat1: { number: '87%', label: '대기업 면접<br/>질문 적중률' },
      stat2: { number: '500+', label: '실제 대기업<br/>면접 데이터' },
      stat3: { number: '즉시', label: '대기업 면접<br/>준비 시작' },
    },
    ctaButton: '대기업 도전하기',
    ctaNote: '✓ 네이버·카카오·토스 특화',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '대기업 면접이 막막하게 느껴지시나요?',

    whyTitle: '대기업 개발자가 되면 달라지는 것들',
    whySubtitle: '연봉, 인정, 성장 모든 것이 달라집니다',

    socialProofTitle: '실제 대기업 합격한 개발자들',

    productsTitle: '커리어 도약을 시작하세요',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '대기업 합격 3단계',
    howItWorksSubtitle: '스타 기업 진입의 지름길',

    questionTypesTitle: '대기업이 실제로 묻는 질문',
    questionTypesSubtitle: '네이버·카카오·토스 면접 질문 유형',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '대기업 합격 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: '대기업 기준으로 분석합니다. 스타 기업이 원하는 인재상에 맞춰 준비시켜드립니다',

    faqTitle: '대기업 합격에 대해 궁금하신가요?',
    faqSubtitle: '커리어 도약에 대해 가장 많이 묻는 질문',
  },

  // 5. 돈을 아낀다
  'save-money': {
    version: '비용 절감',
    description: '돈을 아낀다 - 학원비 90만원 절약',

    heroBadge: '💸 비용 절감 보장',
    heroTitle: {
      main: '학원비 월 30만원',
      highlight: '이제 안 내셔도 됩니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해서 학원 없이도 완벽하게 면접을 준비하세요.',
    heroStats: {
      stat1: { number: '₩0', label: '지금<br/>시작 비용' },
      stat2: { number: '₩900,000', label: '학원 3개월<br/>절감 비용' },
      stat3: { number: '100%', label: '비용 절감<br/>효과' },
    },
    ctaButton: '무료로 시작하기',
    ctaNote: '✓ 학원비 걱정 없이',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '학원비 부담 때문에 면접 준비를 미루고 계신가요?',

    whyTitle: '이렇게 아낄 수 있습니다',
    whySubtitle: '학원비 + 교재비 + 교통비 = 총 117만원 절약',

    socialProofTitle: '실제 비용 절감한 개발자들',

    productsTitle: '비용 걱정 없이 시작하세요',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '비용 0원으로 시작하는 3단계',
    howItWorksSubtitle: '신용카드 등록도 필요 없습니다',

    questionTypesTitle: '학원보다 나은 맞춤형 질문',
    questionTypesSubtitle: '고정 커리큘럼이 아닌 100% 개인화',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '비용 절감 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: '학원보다 정확한 맞춤 분석. 당신의 이력서만을 위한 1:1 커리큘럼',

    faqTitle: '비용 절감에 대해 궁금하신가요?',
    faqSubtitle: '무료 체험과 비용에 대해 가장 많이 묻는 질문',
  },

  // 6. 편안함
  'comfort': {
    version: '편안한 학습',
    description: '편안함 - 집에서 편하게 면접 준비',

    heroBadge: '☁️ 편안한 학습',
    heroTitle: {
      main: '면접 준비',
      highlight: '이렇게 편할 수 있습니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\n복잡한 검색도, 어려운 선택도 필요 없이 매일 아침 이메일로 자동 배송됩니다.',
    heroStats: {
      stat1: { number: '30초', label: '설정 완료<br/>시간' },
      stat2: { number: '100%', label: '자동화<br/>시스템' },
      stat3: { number: '0번', label: '학원<br/>통학 횟수' },
    },
    ctaButton: '편하게 시작하기',
    ctaNote: '✓ 모든 것이 자동화',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '면접 준비가 너무 복잡하고 번거로우신가요?',

    whyTitle: '모든 것이 자동화됩니다',
    whySubtitle: '이메일 확인하고 30분만 학습하세요',

    socialProofTitle: '편안하게 준비한 개발자들',

    productsTitle: '편안하게 시작할 준비가 되셨나요?',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '편안한 3단계',
    howItWorksSubtitle: '복잡한 과정 없이 바로 시작',

    questionTypesTitle: '고민 없이 받아보는 질문',
    questionTypesSubtitle: '"뭘 공부하지?" 고민 끝',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '편안한 준비 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: 'AI가 대신 고민합니다. 당신은 편하게 학습만 하세요',

    faqTitle: '편안한 학습에 대해 궁금하신가요?',
    faqSubtitle: '자동화 시스템에 대해 가장 많이 묻는 질문',
  },

  // 7. 칭찬받는다
  'praise': {
    version: '인정받기',
    description: '칭찬받는다 - 면접관에게 인정받는 답변',

    heroBadge: '⭐ 칭찬받는 답변',
    heroTitle: {
      main: '면접관이',
      highlight: '"잘 준비하셨네요"라고 말합니다',
    },
    heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해 면접관이 고개를 끄덕이는 답변을 준비하세요.',
    heroStats: {
      stat1: { number: '87%', label: '면접관<br/>긍정 반응률' },
      stat2: { number: '500+', label: '실제 면접 데이터로<br/>학습한 AI' },
      stat3: { number: '즉시', label: '인정받는 답변<br/>준비 시작' },
    },
    ctaButton: '인정받는 답변 준비하기',
    ctaNote: '✓ 면접관이 놀라는 답변',

    problemTitle: '혹시 이런 고민 하고 계신가요?',
    problemSubtitle: '면접관에게 제대로 인정받고 싶으신가요?',

    whyTitle: '면접관에게 인정받으세요',
    whySubtitle: '잘 준비된 답변 = 면접관의 칭찬',

    socialProofTitle: '면접관에게 칭찬받은 개발자들',

    productsTitle: '인정받을 준비가 되셨나요?',
    productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
    productCTA: '지금 시작하기',

    howItWorksTitle: '인정받는 3단계',
    howItWorksSubtitle: '면접관이 원하는 답변을 준비합니다',

    questionTypesTitle: '면접관이 좋아하는 답변 유형',
    questionTypesSubtitle: '실제 면접관들이 원하는 답변 구조',

    whoWeAreTitle: '실패 데이터 500개가 만든',
    whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
    whoWeAreHighlight: '인정받는 답변 공식',

    privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
    privacySubtitle: '면접관 관점으로 분석합니다. 면접관이 궁금해할 포인트를 정확히 짚어드립니다',

    faqTitle: '인정받는 답변에 대해 궁금하신가요?',
    faqSubtitle: '면접 답변에 대해 가장 많이 묻는 질문',
  },
};

// 기본 카피 (원본)
export const defaultCopy: CopyConfig = {
  version: '기본',
  description: '원본 랜딩 페이지',

  heroBadge: '🎯 이력서 맞춤형 면접 질문 서비스',
  heroTitle: {
    main: '이력서에서 나올',
    highlight: '그 질문, 미리 준비하세요',
  },
  heroSubtitle: '면접관이 프로젝트 경험에서 꺼낼 날카로운 질문들.\nAI가 분석해 미리 준비하고, 자신 있게 답변하세요.',
  heroStats: {
    stat1: { number: '87%', label: '기술 면접 질문으로<br/>떨어지는 개발자' },
    stat2: { number: '500+', label: '실제 면접 데이터로<br/>학습한 AI' },
    stat3: { number: '즉시', label: 'AI 이력서<br/>분석 시작' },
  },
  ctaButton: '상품 선택하기',
  ctaNote: '✓ 즉시 시작 가능',

  problemTitle: '혹시 당신의 이야기인가요?',
  problemSubtitle: '이런 고민을 하고 계신가요?',

  whyTitle: '왜 이력서 기반 질문인가요?',
  whySubtitle: '면접관은 당신의 이력서에서 질문을 만듭니다',

  socialProofTitle: '이런 변화를 경험하고 있어요',

  productsTitle: '면접 준비를 위한 프리미엄 서비스',
  productsSubtitle: '당신의 경력과 목표에 맞는 상품을 선택하세요',
  productCTA: '지금 시작하기',

  howItWorksTitle: '어떻게 작동하나요?',
  howItWorksSubtitle: '단 3단계로 시작하는 챌린지',

  questionTypesTitle: '어떤 질문들을 받게 되나요?',
  questionTypesSubtitle: '실제 면접관들이 자주 묻는 3가지 유형',

  whoWeAreTitle: '실패 데이터 500개가 만든',
  whoWeAreSubtitle: '비전공자 / 국비지원 출신의 가장 평범한 개발자들이\n직접 증명하며 만든 초밀착 코칭 서비스',
  whoWeAreHighlight: '합격 공식',

  privacyTitle: '🔒 당신의 이력서, 안전하게 다룹니다',
  privacySubtitle: '개발자가 개발자를 위해 만든, 가장 투명한 이력서 분석 시스템',

  faqTitle: '아직 고민되시나요?',
  faqSubtitle: '가장 많이 궁금해하시는 점들을 정리했습니다',
};
