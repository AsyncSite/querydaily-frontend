# QueryDaily Mobile MVP - 제품 및 기술 로드맵

**문서 버전**: 1.0
**최종 업데이트**: 2025년 1월 20일
**목표 런칭일**: 11월 중순 (3-4주 후)
**초기 사용자**: 50명 (카카오톡 채팅방 베타)

---

## 1. 요약

### 현재 상황

**기존 자산:**
- `querydaily-frontend/prototype11`: 완성된 UI/UX 웹 프로토타입 (하드코딩된 데이터)
- `query-daily-service`: 이력서 → AI 면접 질문 → 이메일 발송 서비스 (재사용 불가)
- AsyncSite MSA: user-service, noti-service, asset-service, API Gateway

**새로 만들어야 하는 것:**
1. **모바일 우선 PWA 프론트엔드** (새 레포지토리)
2. **새 백엔드 서비스** (querydaily-mobile-service)
3. **AsyncSite MSA 통합** (user-service 인증 연동)

### 핵심 가치 제안

> "다른 사람의 생각을 엿보며 배우는" - 특히 LINE, Kakao, Naver 등 현직자들의 면접 답변을 보며 학습

**핵심 가설**: 개발자는 혼자 공부하는 것보다 다른 사람(특히 좋은 회사 경력자)의 답변을 보면서 더 빠르게 성장한다.

**핵심 지표**: 주간 활성 답변 조회수 (Weekly Active Answer Views)

### 성공 기준

**필수 기능 (MVP):**
- [ ] 카카오 OAuth 로그인
- [ ] 매일 3개 질문 (카드 스택 UI)
- [ ] 다른 사람 답변 보기 (회사/경력/기술스택 뱃지 포함)
- [ ] 내 답변 작성 → 10 💎 획득
- [ ] 5 💎 소비해서 과거 질문 보기
- [ ] 친구 초대 시스템 (+50 💎 양쪽 모두)

**추가 기능 (Phase 2):**
- [ ] 프리미엄 구독 (검색, 회사 필터, 북마크)
- [ ] 결제 연동
- [ ] 회사 인증

**향후 기능:**
- [ ] AI 답변 분석
- [ ] 실시간 협업
- [ ] 스터디 그룹 기능

---

## 2. 핵심 결정 사항

### Decision 0.1: 레포지토리 구조 ✅

**프론트엔드:**
- **새 레포**: `asyncsite/querydaily-mobile`
  - prototype11 코드를 시작점으로 복사
  - Next.js 14 + TypeScript + Tailwind CSS
  - PWA 설정 (manifest + service worker)
  - 모바일 우선 반응형 디자인

**백엔드:**
- **새 레포**: `asyncsite/querydaily-mobile-service`
  - Spring Boot 3.5.3 + Java 21
  - 헥사고날 아키텍처 (user-service와 동일)
  - AsyncSite MSA 통합
  - 포트: 8388

**선택 이유:**
- 기존 query-daily-service와 완전히 다른 비즈니스 모델
- 독립적인 배포 및 확장
- Prototype11이 검증된 UI/UX 기반 제공

### Decision 0.2: 백엔드 도메인 설계 ✅

**핵심 도메인:**

```
querydaily-mobile-service/
└── src/main/java/com/asyncsite/querydailymobile/
    ├── question/          # 질문 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── answer/            # 답변 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── insight/           # 인사이트 (💎) 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── referral/          # 친구 초대 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── subscription/      # 프리미엄 구독 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    └── member/            # 회원 프로필 (읽기 전용 캐시)
        ├── domain/
        ├── application/
        └── adapter/
```

**도메인 책임:**

| 도메인 | 책임 | 주요 엔티티 |
|--------|------|-------------|
| `question` | 질문 관리, 일일 로테이션 | Question, DailyQuestions, QuestionCategory |
| `answer` | 답변 CRUD, 뱃지 시스템 | Answer, UserAnswer, AnswerBadge |
| `insight` | 가상 화폐 관리 | InsightBalance, InsightTransaction |
| `referral` | 친구 초대 시스템 | Referral, InviteCode, ReferralReward |
| `subscription` | 프리미엄 플랜 관리 | Subscription, SubscriptionPlan |
| `member` | 사용자 프로필 캐시 (user-service 동기화) | MemberProfile |

### Decision 0.3: User Service 통합 방식 ✅

**user-service가 제공하는 것:**
- 카카오 OAuth 로그인
- JWT 토큰 발급
- 기본 사용자 정보 (이메일, 이름, 프로필 이미지)

**querydaily-mobile-service가 관리하는 것:**
- 인사이트 잔액 (💎)
- 프리미엄 구독 상태
- 질문 & 답변
- 초대 코드 및 리워드

**통합 패턴:**

1. **인증 플로우:**
   ```
   모바일 앱 → user-service: 카카오 OAuth 로그인
   user-service → 모바일 앱: JWT 토큰
   모바일 앱 → querydaily-mobile-service: JWT와 함께 API 호출
   querydaily-mobile-service: JWT 검증 (공유 secret)
   ```

2. **프로필 동기화:**
   ```
   user-service → Kafka: user.profile.updated 이벤트
   querydaily-mobile-service → Kafka: 이벤트 구독
   querydaily-mobile-service: member 테이블 업데이트 (읽기 전용 캐시)
   ```

3. **데이터 소유권:**
   - user-service DB: `users` 테이블 (원본)
   - querydaily-mobile-service DB: `members` 테이블 (캐시된 프로필)
   - 동기화 전략: Kafka를 통한 최종 일관성

### Decision 0.4: 초기 컨텐츠 전략 ✅

**100개 질문 시드 데이터:**

| 카테고리 | 개수 | 난이도 분포 |
|----------|------|-------------|
| Spring/Java 백엔드 | 30 | 초급: 10, 중급: 15, 고급: 5 |
| JPA/데이터베이스 | 20 | 초급: 8, 중급: 10, 고급: 2 |
| 네트워크/HTTP | 15 | 초급: 6, 중급: 7, 고급: 2 |
| React/프론트엔드 | 20 | 초급: 8, 중급: 10, 고급: 2 |
| 시스템 디자인 | 15 | 초급: 3, 중급: 8, 고급: 4 |

**출처:**
- 백엔드 딥다이브 아티클
- LeetCode 면접 질문
- 팀의 실제 면접 경험

**300개 시드 답변:**
- 10명이 각각 30개씩 작성
- 뱃지 분포:
  - 회사: LINE (50), Kakao (50), Naver (50), Coupang (50), 기타 (100)
  - 경력: 주니어 (100), 미들 (150), 시니어 (50)
  - 기술스택: Spring, React, JPA, AWS 등 혼합

**뱃지 데이터 (초기):**
- 텍스트 기반 뱃지 (인증 없음)
- 회사 인증 → Phase 2

### Decision 0.5: 배포 전략 ✅

**프론트엔드 (PWA):**
- **플랫폼**: Vercel
- **기술**: Next.js 14 + PWA (next-pwa)
- **기능**:
  - 오프라인 지원 (service worker)
  - 홈 화면에 추가
  - 푸시 알림 (향후)
- **환경**: 프로덕션만 (MVP는 스테이징 없음)

**백엔드 (마이크로서비스):**
- **플랫폼**: 기존 AsyncSite 인프라
- **컨테이너**: Docker + docker-compose
- **네트워크**: asyncsite-network
- **서비스 디스커버리**: Eureka
- **데이터베이스**: MySQL 8.0 (공유 asyncsite-mysql)
- **캐시**: Redis 7 (공유 asyncsite-redis)
- **메시지 큐**: Kafka (user-service 동기화용)

**데이터베이스 이름**: `querydailymobiledb`

---

## 3. 기술 아키텍처

### 3.1 시스템 개요

```
┌─────────────────────────────────────────────────────────────┐
│                  클라이언트 계층 (PWA)                        │
│               querydaily-mobile (Vercel)                     │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                API Gateway (향후) 또는 직접 접근              │
└──────────┬──────────────────────────────────┬───────────────┘
           │                                  │
           ▼                                  ▼
┌──────────────────────┐          ┌──────────────────────┐
│   user-service       │          │ querydaily-mobile-   │
│   (기존)             │◄────────►│    service (신규)    │
│ - 카카오 OAuth       │  Kafka   │ - 질문               │
│ - JWT 토큰           │  이벤트  │ - 답변               │
│ - 사용자 프로필      │          │ - 인사이트 (💎)      │
└──────────┬───────────┘          │ - 초대               │
           │                      │ - 구독               │
           │                      └──────────┬───────────┘
           │                                 │
           ▼                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                        데이터 계층                            │
│  MySQL (users, members) | Redis (캐시) | Kafka (이벤트)     │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 API 설계

**기본 URL:**
- user-service: `http://localhost:8081` (기존)
- querydaily-mobile-service: `http://localhost:8388` (신규)

**핵심 엔드포인트:**

```
인증 (user-service)
├─ POST   /api/auth/oauth/kakao       # 카카오 로그인
├─ POST   /api/auth/refresh           # 토큰 갱신
└─ GET    /api/users/me               # 현재 사용자 정보

질문 (querydaily-mobile-service)
├─ GET    /api/v1/questions/daily     # 오늘의 3문제
├─ GET    /api/v1/questions/{id}      # 질문 상세
├─ GET    /api/v1/questions/archive   # 과거 질문 (5 💎 소비)
└─ GET    /api/v1/categories          # 질문 카테고리

답변 (querydaily-mobile-service)
├─ GET    /api/v1/questions/{id}/answers   # 답변 목록 (뱃지 포함)
├─ POST   /api/v1/answers                  # 답변 작성 (+10 💎)
├─ GET    /api/v1/me/answers               # 내 답변
└─ DELETE /api/v1/answers/{id}             # 내 답변 삭제

인사이트 (querydaily-mobile-service)
├─ GET    /api/v1/me/insights              # 내 잔액
├─ GET    /api/v1/me/insights/transactions # 거래 내역
└─ POST   /api/v1/insights/purchase        # 인사이트 구매 (테스트 모드)

초대 (querydaily-mobile-service)
├─ GET    /api/v1/me/referral/code         # 내 초대 코드
├─ POST   /api/v1/referrals/claim          # 초대 코드 입력 (+50 💎 양쪽)
└─ GET    /api/v1/me/referrals/stats       # 초대 통계

구독 (querydaily-mobile-service)
├─ GET    /api/v1/me/subscription          # 내 구독 상태
└─ POST   /api/v1/subscriptions            # 프리미엄 구독
```

### 3.3 데이터베이스 스키마 (주요 테이블)

```sql
-- 질문
CREATE TABLE questions (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    answer_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_difficulty (difficulty)
);

-- 일일 질문 로테이션
CREATE TABLE daily_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    question_1_id VARCHAR(36) NOT NULL,
    question_2_id VARCHAR(36) NOT NULL,
    question_3_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (question_1_id) REFERENCES questions(id),
    FOREIGN KEY (question_2_id) REFERENCES questions(id),
    FOREIGN KEY (question_3_id) REFERENCES questions(id)
);

-- 답변 (경력자 답변)
CREATE TABLE answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    company_badge VARCHAR(100),      -- LINE, Kakao, Naver 등
    experience_badge VARCHAR(50),    -- 주니어, 미들, 시니어
    tech_badges JSON,                -- ["Spring", "JPA", "AWS"]
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    INDEX idx_question (question_id),
    INDEX idx_member (member_id)
);

-- 사용자 답변
CREATE TABLE user_answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    INDEX idx_member_question (member_id, question_id)
);

-- 인사이트 잔액
CREATE TABLE insight_balances (
    member_id VARCHAR(36) PRIMARY KEY,
    balance INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 인사이트 거래
CREATE TABLE insight_transactions (
    id VARCHAR(36) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    amount INT NOT NULL,              -- 획득은 양수, 소비는 음수
    type VARCHAR(20) NOT NULL,        -- EARN, SPEND
    reason VARCHAR(100) NOT NULL,     -- ANSWER_WRITE, VIEW_ARCHIVE, REFERRAL, PURCHASE
    reference_id VARCHAR(36),         -- 관련 엔티티 ID (answer_id, question_id 등)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    INDEX idx_member_created (member_id, created_at DESC)
);

-- 초대
CREATE TABLE referrals (
    id VARCHAR(36) PRIMARY KEY,
    referrer_id VARCHAR(36) NOT NULL,
    referred_id VARCHAR(36) NOT NULL,
    code VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES members(id),
    FOREIGN KEY (referred_id) REFERENCES members(id),
    UNIQUE KEY uk_referred (referred_id),
    INDEX idx_referrer (referrer_id)
);

-- 초대 코드
CREATE TABLE invite_codes (
    member_id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    referral_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

-- 구독
CREATE TABLE subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    plan VARCHAR(20) NOT NULL,         -- PREMIUM
    status VARCHAR(20) NOT NULL,       -- ACTIVE, EXPIRED, CANCELLED
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    INDEX idx_member_status (member_id, status)
);

-- 회원 (user-service에서 캐시)
CREATE TABLE members (
    id VARCHAR(36) PRIMARY KEY,        -- user-service의 user ID와 동일
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    profile_image VARCHAR(500),
    company VARCHAR(100),
    role VARCHAR(100),
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_email (email)
);
```

---

## 4. 주차별 구현 계획

### 1주차: 기반 구축 (1-7일차)

**목표**: 로그인 → 오늘의 3문제 보기

**백엔드 작업:**
- [x] 레포지토리 생성: querydaily-mobile-service
- [ ] 프로젝트 구조 설정 (헥사고날 아키텍처)
- [ ] 의존성 설정 (Spring Boot, MySQL, Redis, Kafka)
- [ ] JWT 검증 구현 (user-service와 secret 공유)
- [ ] 회원 동기화 구현 (Kafka listener for user.profile.updated)
- [ ] question 도메인 생성:
  - [ ] 도메인 모델: Question, DailyQuestions
  - [ ] 유스케이스: GetDailyQuestionsUseCase, GetQuestionDetailUseCase
  - [ ] Persistence 어댑터: QuestionJpaEntity, QuestionJpaRepository
  - [ ] Web 어댑터: QuestionController
- [ ] 100개 질문 시드 데이터 삽입
- [ ] 30일치 daily_questions 엔트리 생성
- [ ] 질문 API 통합 테스트 작성

**프론트엔드 작업:**
- [x] 레포지토리 생성: querydaily-mobile
- [ ] prototype11 코드 베이스라인으로 복사
- [ ] PWA 의존성 설치 및 설정 (next-pwa)
- [ ] manifest.json 생성 (아이콘, 테마 색상, start_url)
- [ ] 오프라인 지원용 service worker 설정
- [ ] 환경 변수 설정 (NEXT_PUBLIC_API_URL)
- [ ] API 클라이언트 구현 (lib/api.ts)
- [ ] dashboard를 GET /api/v1/questions/daily에 연결
- [ ] 질문 상세를 GET /api/v1/questions/{id}에 연결
- [ ] 로딩 상태 및 에러 처리 추가
- [ ] 모바일 기기에서 PWA 설치 테스트

**인프라 작업:**
- [ ] docker-compose에 querydaily-mobile-service 추가
- [ ] querydailymobiledb 데이터베이스 생성
- [ ] Kafka 토픽 설정: user.profile.updated
- [ ] Eureka 서비스 등록 설정
- [ ] JWT 토큰 플로우 end-to-end 검증

**완료 기준:**
- [ ] 사용자가 카카오로 로그인 가능 (user-service 통해)
- [ ] Dashboard에 데이터베이스의 실제 3문제 표시
- [ ] 질문 상세 페이지에 질문 내용 표시
- [ ] PWA를 모바일에 설치 가능 (홈 화면에 추가)

---

### 2주차: 핵심 루프 (8-14일차)

**목표**: 답변 작성 → 10 💎 획득 → 과거 질문 보기

**백엔드 작업:**
- [ ] answer 도메인 생성:
  - [ ] 도메인 모델: Answer, UserAnswer, AnswerBadge
  - [ ] 유스케이스: GetAnswerListUseCase, CreateAnswerUseCase
  - [ ] Persistence 어댑터
  - [ ] Web 어댑터
- [ ] 뱃지 데이터 포함 300개 답변 시드
- [ ] insight 도메인 생성:
  - [ ] 도메인 모델: InsightBalance, InsightTransaction
  - [ ] 유스케이스: GetBalanceUseCase, EarnInsightUseCase, SpendInsightUseCase
  - [ ] Persistence 어댑터
  - [ ] Web 어댑터
- [ ] 비즈니스 로직 구현:
  - [ ] CreateAnswerService: 답변 생성 + 10 💎 획득 (트랜잭션)
  - [ ] ViewArchiveService: 5 💎 소비 + 과거 질문 반환
  - [ ] 잔액 확인: 인사이트 부족 시 에러 반환
- [ ] answer + insight 플로우 통합 테스트 작성

**프론트엔드 작업:**
- [ ] 질문 상세를 GET /api/v1/questions/{id}/answers에 연결
- [ ] 뱃지(회사, 경력, 기술) 포함 답변 리스트 표시
- [ ] 답변 작성 UI 구현 (POST /api/v1/answers에 연결)
- [ ] 답변 생성 시 성공 토스트 표시
- [ ] mypage를 GET /api/v1/me/insights에 연결
- [ ] 헤더에 실시간 인사이트 잔액 표시
- [ ] archive 페이지를 GET /api/v1/questions/archive에 연결
- [ ] 잔액 부족 시 paywall 모달 구현
- [ ] 더 나은 UX를 위한 낙관적 UI 업데이트 추가

**완료 기준:**
- [ ] 사용자가 질문 상세 페이지에서 뱃지 포함 답변 확인
- [ ] 사용자가 답변 작성하고 즉시 +10 💎 확인
- [ ] Archive 페이지에서 과거 질문 표시 (5 💎 소비)
- [ ] 잔액 < 5 💎일 때 paywall 모달 표시
- [ ] 모든 페이지에서 잔액 실시간 업데이트

---

### 3주차: 수익화 (15-21일차)

**목표**: 친구 초대 (+50 💎 양쪽) + 프리미엄 구독 + 상점 통합

**백엔드 작업:**
- [ ] referral 도메인 생성:
  - [ ] 도메인 모델: Referral, InviteCode, ReferralReward
  - [ ] 유스케이스: GetMyCodeUseCase, ClaimReferralUseCase, GetStatsUseCase
  - [ ] Persistence 어댑터
  - [ ] Web 어댑터
- [ ] 초대 로직 구현:
  - [ ] 회원가입 시 초대 코드 자동 생성 (user-service 이벤트 훅)
  - [ ] 초대 코드 고유성 검증
  - [ ] ClaimReferralService: 초대자 + 피초대자 +50 💎 (트랜잭션)
  - [ ] 중복 클레임 방지 (사용자당 1회만)
- [ ] subscription 도메인 생성:
  - [ ] 도메인 모델: Subscription, SubscriptionPlan
  - [ ] 유스케이스: SubscribeUseCase, GetMySubscriptionUseCase
  - [ ] Persistence 어댑터
  - [ ] Web 어댑터
- [ ] 구독 로직 구현:
  - [ ] 구독 생성 (테스트 모드, 결제 없음)
  - [ ] 프리미엄 상태 확인 (기능 게이팅용)
  - [ ] end_date 계산 (start_date + 30일)
- [ ] referral + subscription 통합 테스트 작성

**프론트엔드 작업:**
- [ ] dashboard 초대 모달을 GET /api/v1/me/referral/code에 연결
- [ ] 초대 코드 클립보드 복사 구현
- [ ] 회원가입 플로우 추가: 초대 코드 입력 → POST /api/v1/referrals/claim
- [ ] mypage 초대 섹션을 GET /api/v1/me/referrals/stats에 연결
- [ ] 실제 초대 통계 표시 (초대한 친구, 획득한 인사이트)
- [ ] shop 페이지를 GET /api/v1/me/subscription에 연결
- [ ] 프리미엄 구독 버튼 구현 → POST /api/v1/subscriptions
- [ ] 인사이트 구매 추가 (테스트 모드): POST /api/v1/insights/purchase
- [ ] 구매 후 shop 페이지에 실제 잔액 표시
- [ ] mypage에 프리미엄 뱃지 추가

**완료 기준:**
- [ ] 사용자가 초대 코드 복사 가능
- [ ] 친구가 코드로 가입 시 양쪽 +50 💎
- [ ] 초대 통계에 정확한 카운트 표시
- [ ] 프리미엄 구독 활성화 가능 (테스트 모드)
- [ ] 프리미엄 기능 잠금 해제 (검색, 북마크)
- [ ] 인사이트 구매 동작 (테스트 모드)

---

### 4주차: 마무리 및 런칭 (22-28일차)

**목표**: 50명 베타 테스트 → 버그 수정 → 런칭

**PWA 최적화:**
- [ ] 오프라인 기능 테스트 (캐시된 질문, 에러 상태)
- [ ] service worker 캐싱 전략 최적화
- [ ] 푸시 알림 설정 추가 (권한 요청 프롬프트)
- [ ] 로딩 성능 개선 (코드 분할, 지연 로딩)
- [ ] iOS 및 Android에서 홈 화면 추가 플로우 테스트
- [ ] PWA가 Lighthouse 감사 통과하는지 확인 (90점 이상)

**모바일 UX 개선:**
- [ ] 카드 스택 스와이프 제스처 개선 (더 부드러운 애니메이션)
- [ ] 상호작용에 햅틱 피드백 추가 (iOS/Android)
- [ ] 터치 타겟 최적화 (최소 48x48px)
- [ ] 다양한 화면 크기 테스트 (iPhone SE, Pro Max, Android)
- [ ] 작은 화면의 레이아웃 문제 수정
- [ ] 더 나은 체감 성능을 위한 스켈레톤 로더 추가

**베타 테스트 준비:**
- [ ] 신규 사용자용 온보딩 플로우 생성
- [ ] 카카오톡 채팅방 공지 준비
- [ ] 분석 도구 설정 (PostHog 또는 Mixpanel)
- [ ] 에러 추적 설정 (Sentry)
- [ ] 모니터링용 관리자 대시보드 생성 (간단):
  - [ ] 일일 활성 사용자
  - [ ] 질문 조회수
  - [ ] 답변 작성 수
  - [ ] 인사이트 거래량
  - [ ] 초대 성공률

**버그 수정 및 모니터링:**
- [ ] 로그 수집 설정 (ELK 스택 또는 CloudWatch)
- [ ] API 응답 시간 모니터링 (p95 < 200ms)
- [ ] 베타 사용자가 보고한 심각한 버그 수정
- [ ] 데이터베이스 쿼리 최적화 (인덱스 추가)
- [ ] 동시 사용자 부하 테스트 (50명 이상)

**런칭 체크리스트:**
- [ ] 1-3주차 모든 기능이 end-to-end 작동
- [ ] PWA 설치 가능하고 오프라인 작동
- [ ] 프로덕션에 심각한 버그 없음
- [ ] 데이터베이스 마이그레이션 검증
- [ ] 롤백 계획 문서화
- [ ] 지원 프로세스 정의 (Discord/카카오)

**런칭일:**
- [ ] 프론트엔드 Vercel에 배포
- [ ] 백엔드 프로덕션에 배포
- [ ] 카카오톡 채팅방에 공지
- [ ] 에러 대시보드 모니터링
- [ ] 사용자 피드백에 빠르게 응답

**완료 기준:**
- [ ] 50명 베타 사용자 가입
- [ ] 80% 이상 2일차 사용자 리텐션
- [ ] 30% 이상 사용자가 최소 1개 답변 작성
- [ ] 20% 이상 사용자가 초대 코드 사용
- [ ] 핵심 플로우를 막는 심각한 버그 없음
- [ ] 평균 API 응답 시간 < 300ms

---

## 5. 타임라인 요약

```
┌─────────────────────────────────────────────────────────────┐
│  1주차: 기반 구축 (1-7일차)                                  │
│  ✓ 로그인 → 오늘의 3문제                                     │
├─────────────────────────────────────────────────────────────┤
│  2주차: 핵심 루프 (8-14일차)                                │
│  ✓ 답변 작성 → +10 💎 → Archive 보기                        │
├─────────────────────────────────────────────────────────────┤
│  3주차: 수익화 (15-21일차)                                  │
│  ✓ 초대 (+50 💎) → 프리미엄 → 상점                          │
├─────────────────────────────────────────────────────────────┤
│  4주차: 런칭 (22-28일차)                                    │
│  ✓ PWA 최적화 → 베타 (50명) → 런칭                          │
└─────────────────────────────────────────────────────────────┘
```

**주요 마일스톤:**
- **7일차**: 팀 데모 (로그인 + 질문 동작)
- **14일차**: 팀 데모 (핵심 루프 동작)
- **21일차**: 기능 완료 (모든 MVP 기능)
- **22일차**: 베타 런칭 (50명 초대)
- **28일차**: 공개 런칭 (베타 성공 시)

**리스크 완화:**
- 1-2주차가 중요 (기반 + 핵심 루프)
- 3-4주차에 버퍼 존재 (필요 시 범위 축소 가능)
- 결제 연동은 런칭 후로 이동
- 회사 인증은 런칭 후로 이동

---

## 6. 런칭 후 로드맵 (Phase 2)

**런칭 후 1개월:**
- [ ] 결제 연동 (Toss Payments 또는 PortOne)
- [ ] 실제 인사이트 구매
- [ ] 프리미엄 구독 과금
- [ ] 회사 이메일 인증
- [ ] 고급 검색 (프리미엄 기능)
- [ ] 북마크 (프리미엄 기능)

**2개월차:**
- [ ] AI 답변 분석
- [ ] 답변 품질 점수
- [ ] 개인화된 질문 추천
- [ ] 일일 질문 푸시 알림

**3개월차:**
- [ ] 스터디 그룹 기능
- [ ] 답변 댓글 및 토론
- [ ] 리더보드 (게이미피케이션)
- [ ] 뱃지 시스템 확장

---

## 7. 성공 지표

### 제품 지표 (핵심 지표)

| 지표 | 정의 | 1주차 목표 | 1개월 목표 |
|------|------|-----------|-----------|
| **WAA** (주간 활성 답변 조회수) | 주당 최소 1개 답변을 본 사용자 | N/A | 30명 |
| 일일 활성 사용자 (DAU) | 매일 앱을 여는 사용자 | 20명 | 50명 이상 |
| 답변 작성률 | 최소 1개 답변을 쓴 사용자 비율 | 20% | 30% |
| 7일 리텐션 | 7일 후 돌아오는 사용자 비율 | 40% | 50% |
| 초대 전환율 | 초대받아 가입하는 사용자 비율 | N/A | 20% |

### 기술 지표

| 지표 | 목표 |
|------|------|
| API 응답 시간 (p95) | < 300ms |
| 에러율 | < 1% |
| 가동 시간 | > 99.5% |
| PWA 설치율 | > 30% |

---

## 8. 다음 단계 (즉시 실행)

### 1일차 작업:

**결정 확인:**
- [ ] Decision 0.1-0.5를 팀과 확인
- [ ] 레포지토리 생성 승인 받기
- [ ] AsyncSite 인프라 접근 권한 확인

**레포지토리 설정:**
- [ ] `asyncsite/querydaily-mobile` (프론트엔드) 생성
- [ ] `asyncsite/querydaily-mobile-service` (백엔드) 생성
- [ ] CI/CD 파이프라인 설정 (GitHub Actions)
- [ ] 로컬 개발용 Docker 설정

**컨텐츠 준비:**
- [ ] 100개 면접 질문 수집 시작
- [ ] 시드 답변 작성을 위해 팀원 10명 모집
- [ ] 뱃지 데이터 구조 정의

**인프라:**
- [ ] MySQL 데이터베이스 이름 확인: `querydailymobiledb`
- [ ] 서비스 포트 확인: 8388
- [ ] Kafka 토픽 설정: `user.profile.updated`
- [ ] user-service와 JWT 토큰 검증 테스트

**커뮤니케이션:**
- [ ] 이 로드맵을 팀과 공유
- [ ] 일일 스탠드업 일정 수립 (15분)
- [ ] 업데이트용 Discord/Slack 채널 설정

---

## 9. 부록

### A. 기술 스택 요약

**프론트엔드 (PWA):**
- Next.js 14.2.32 (App Router)
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- Framer Motion (애니메이션)
- next-pwa (PWA 지원)

**백엔드 (마이크로서비스):**
- Spring Boot 3.5.3
- Java 21 (Eclipse Temurin)
- Gradle (Kotlin DSL)
- MySQL 8.0
- Redis 7
- Kafka (AsyncSite 공유)
- Eureka Client

**인프라:**
- Docker + docker-compose
- Vercel (프론트엔드 호스팅)
- AsyncSite VPS (백엔드 호스팅)

### B. 팀 역할 (미정)

- **제품 오너**: [이름]
- **기술 리드**: [이름]
- **프론트엔드 개발자**: [이름]
- **백엔드 개발자**: [이름]
- **컨텐츠 크리에이터**: [팀 - 시드 답변 작성 10명]

### C. 참고 자료

- [Prototype11 Wireframe](../querydaily-frontend/app/prototype11/wireframe)
- [User Service CLAUDE.md](../../user-service/CLAUDE.md)
- [AsyncSite MSA Architecture](../../core-platform/docs/ARCHITECTURE.md)

---

**문서 소유자**: 제품팀
**검토 주기**: 구현 중 매주
**상태**: ✅ 구현 승인됨
