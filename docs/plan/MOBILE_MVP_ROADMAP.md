# QueryDaily Mobile MVP - Product & Technical Roadmap

**Document Version**: 1.0
**Last Updated**: 2025-01-20
**Target Launch**: Mid-November 2025 (3-4 weeks)
**Initial Users**: 50 (Kakao Chat Room Beta)

---

## 1. Executive Summary

### Current Situation

**Existing Assets:**
- `querydaily-frontend/prototype11`: Web prototype with complete UI/UX (hardcoded data)
- `query-daily-service`: Separate service for resume → AI interview questions → email delivery (NOT reusable)
- AsyncSite MSA: user-service, noti-service, asset-service, API Gateway

**What We Need to Build:**
1. **Mobile-first PWA Frontend** (new repository)
2. **New Backend Service** (querydaily-mobile-service)
3. **Integration with AsyncSite MSA** (user-service for auth)

### Core Value Proposition

> "다른 사람의 생각을 엿보며 배우는" - Learning by peeking at others' answers

**Key Hypothesis**: Developers grow faster by seeing how others (especially experienced engineers from top companies) answer interview questions, not just studying alone.

**North Star Metric**: Weekly Active Answer Views

### Success Criteria

**Must Have (MVP):**
- [ ] Login with Kakao OAuth
- [ ] Daily 3 questions (card stack UI)
- [ ] View others' answers (with badges: company, experience, tech stack)
- [ ] Write own answer → earn 10 💎
- [ ] Spend 5 💎 to view past questions
- [ ] Referral system (+50 💎 for both parties)

**Should Have (Phase 2):**
- [ ] Premium subscription (search, company filter, bookmarks)
- [ ] Payment integration
- [ ] Company verification

**Could Have (Future):**
- [ ] AI answer analysis
- [ ] Real-time collaboration
- [ ] Study group features

---

## 2. Critical Decisions

### Decision 0.1: Repository Structure ✅

**Frontend:**
- **New Repository**: `asyncsite/querydaily-mobile`
  - Copy prototype11 code as starting point
  - Next.js 14 + TypeScript + Tailwind CSS
  - PWA configuration (manifest + service worker)
  - Mobile-first responsive design

**Backend:**
- **New Repository**: `asyncsite/querydaily-mobile-service`
  - Spring Boot 3.5.3 + Java 21
  - Hexagonal Architecture (like user-service)
  - Integrated with AsyncSite MSA
  - Port: 8388

**Rationale:**
- Clean separation from existing query-daily-service (completely different business model)
- Independent deployment and scaling
- Prototype11 provides proven UI/UX foundation

### Decision 0.2: Backend Domain Design ✅

**Core Domains:**

```
querydaily-mobile-service/
└── src/main/java/com/asyncsite/querydailymobile/
    ├── question/          # Question domain
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── answer/            # Answer domain
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── insight/           # Insight (💎) domain
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── referral/          # Friend referral domain
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    ├── subscription/      # Premium subscription domain
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    └── member/            # Member profile (read-only cache)
        ├── domain/
        ├── application/
        └── adapter/
```

**Domain Responsibilities:**

| Domain | Responsibility | Key Entities |
|--------|----------------|--------------|
| `question` | Question management, daily rotation | Question, DailyQuestions, QuestionCategory |
| `answer` | Answer CRUD, badge system | Answer, UserAnswer, AnswerBadge |
| `insight` | Virtual currency management | InsightBalance, InsightTransaction |
| `referral` | Friend invitation system | Referral, InviteCode, ReferralReward |
| `subscription` | Premium plan management | Subscription, SubscriptionPlan |
| `member` | User profile cache (synced from user-service) | MemberProfile |

### Decision 0.3: User Service Integration ✅

**What user-service Provides:**
- Kakao OAuth login
- JWT token issuance
- Basic user information (email, name, profile image)

**What querydaily-mobile-service Manages:**
- Insight balance (💎)
- Premium subscription status
- Questions & answers
- Referral codes and rewards

**Integration Pattern:**

1. **Authentication Flow:**
   ```
   Mobile App → user-service: Kakao OAuth login
   user-service → Mobile App: JWT token
   Mobile App → querydaily-mobile-service: API calls with JWT
   querydaily-mobile-service: Validates JWT (shared secret)
   ```

2. **Profile Synchronization:**
   ```
   user-service → Kafka: user.profile.updated event
   querydaily-mobile-service → Kafka: Subscribe to event
   querydaily-mobile-service: Update member table (read-only cache)
   ```

3. **Data Ownership:**
   - user-service DB: `users` table (source of truth)
   - querydaily-mobile-service DB: `members` table (cached profile)
   - Sync strategy: Eventual consistency via Kafka

### Decision 0.4: Initial Content Strategy ✅

**100 Questions Seed Data:**

| Category | Count | Difficulty Distribution |
|----------|-------|-------------------------|
| Spring/Java Backend | 30 | 초급: 10, 중급: 15, 고급: 5 |
| JPA/Database | 20 | 초급: 8, 중급: 10, 고급: 2 |
| Network/HTTP | 15 | 초급: 6, 중급: 7, 고급: 2 |
| React/Frontend | 20 | 초급: 8, 중급: 10, 고급: 2 |
| System Design | 15 | 초급: 3, 중급: 8, 고급: 4 |

**Sources:**
- Backend Deep Dive articles
- LeetCode interview questions
- Real interview experiences from team

**300 Seed Answers:**
- 10 contributors x 30 answers each
- Badge distribution:
  - Company: LINE (50), Kakao (50), Naver (50), Coupang (50), Other (100)
  - Experience: Junior (100), Mid (150), Senior (50)
  - Tech Stack: Mix of Spring, React, JPA, AWS, etc.

**Badge Data (Initial):**
- Text-based badges (no verification)
- Company verification → Phase 2

### Decision 0.5: Deployment Strategy ✅

**Frontend (PWA):**
- **Platform**: Vercel
- **Tech**: Next.js 14 + PWA (next-pwa)
- **Features**:
  - Offline support (service worker)
  - Add to home screen
  - Push notifications (future)
- **Environment**: Production only (no staging for MVP)

**Backend (Microservice):**
- **Platform**: Existing AsyncSite infrastructure
- **Container**: Docker + docker-compose
- **Network**: asyncsite-network
- **Service Discovery**: Eureka
- **Database**: MySQL 8.0 (shared asyncsite-mysql)
- **Cache**: Redis 7 (shared asyncsite-redis)
- **Message Queue**: Kafka (for user-service sync)

**Database Name**: `querydailymobiledb`

---

## 3. Technical Architecture

### 3.1 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer (PWA)                      │
│                   querydaily-mobile (Vercel)                 │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Future)                      │
│                   Or Direct Access for MVP                   │
└──────────┬──────────────────────────────────┬───────────────┘
           │                                  │
           ▼                                  ▼
┌──────────────────────┐          ┌──────────────────────┐
│   user-service       │          │ querydaily-mobile-   │
│   (Existing)         │◄────────►│    service (NEW)     │
│ - Kakao OAuth        │  Kafka   │ - Questions          │
│ - JWT Token          │  Events  │ - Answers            │
│ - User Profile       │          │ - Insights (💎)      │
└──────────┬───────────┘          │ - Referrals          │
           │                      │ - Subscriptions      │
           │                      └──────────┬───────────┘
           │                                 │
           ▼                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  MySQL (users, members) | Redis (cache) | Kafka (events)   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 API Design

**Base URLs:**
- user-service: `http://localhost:8081` (existing)
- querydaily-mobile-service: `http://localhost:8388` (new)

**Core Endpoints:**

```
Authentication (user-service)
├─ POST   /api/auth/oauth/kakao       # Kakao login
├─ POST   /api/auth/refresh           # Refresh token
└─ GET    /api/users/me               # Current user info

Questions (querydaily-mobile-service)
├─ GET    /api/v1/questions/daily     # Today's 3 questions
├─ GET    /api/v1/questions/{id}      # Question detail
├─ GET    /api/v1/questions/archive   # Past questions (costs 5 💎)
└─ GET    /api/v1/categories          # Question categories

Answers (querydaily-mobile-service)
├─ GET    /api/v1/questions/{id}/answers   # Answer list with badges
├─ POST   /api/v1/answers                  # Create answer (+10 💎)
├─ GET    /api/v1/me/answers               # My answers
└─ DELETE /api/v1/answers/{id}             # Delete my answer

Insights (querydaily-mobile-service)
├─ GET    /api/v1/me/insights              # My balance
├─ GET    /api/v1/me/insights/transactions # Transaction history
└─ POST   /api/v1/insights/purchase        # Purchase insights (test mode)

Referrals (querydaily-mobile-service)
├─ GET    /api/v1/me/referral/code         # My invite code
├─ POST   /api/v1/referrals/claim          # Claim referral (+50 💎 x2)
└─ GET    /api/v1/me/referrals/stats       # Referral statistics

Subscriptions (querydaily-mobile-service)
├─ GET    /api/v1/me/subscription          # My subscription status
└─ POST   /api/v1/subscriptions            # Subscribe to premium
```

### 3.3 Database Schema (Key Tables)

```sql
-- Questions
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

-- Daily question rotation
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

-- Answers (from experienced engineers)
CREATE TABLE answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    company_badge VARCHAR(100),      -- LINE, Kakao, Naver, etc.
    experience_badge VARCHAR(50),    -- Junior, Mid, Senior
    tech_badges JSON,                -- ["Spring", "JPA", "AWS"]
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    INDEX idx_question (question_id),
    INDEX idx_member (member_id)
);

-- User answers
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

-- Insight balance
CREATE TABLE insight_balances (
    member_id VARCHAR(36) PRIMARY KEY,
    balance INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insight transactions
CREATE TABLE insight_transactions (
    id VARCHAR(36) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    amount INT NOT NULL,              -- Positive for earn, negative for spend
    type VARCHAR(20) NOT NULL,        -- EARN, SPEND
    reason VARCHAR(100) NOT NULL,     -- ANSWER_WRITE, VIEW_ARCHIVE, REFERRAL, PURCHASE
    reference_id VARCHAR(36),         -- Related entity ID (answer_id, question_id, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    INDEX idx_member_created (member_id, created_at DESC)
);

-- Referrals
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

-- Invite codes
CREATE TABLE invite_codes (
    member_id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    referral_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

-- Subscriptions
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

-- Members (cached from user-service)
CREATE TABLE members (
    id VARCHAR(36) PRIMARY KEY,        -- Same as user-service user ID
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

## 4. Week-by-Week Implementation Plan

### Week 1: Foundation (Days 1-7)

**Goal**: Login → See today's 3 questions

**Backend Tasks:**
- [x] Create repository: querydaily-mobile-service
- [ ] Setup project structure (Hexagonal Architecture)
- [ ] Configure dependencies (Spring Boot, MySQL, Redis, Kafka)
- [ ] Implement JWT validation (shared secret with user-service)
- [ ] Implement member synchronization (Kafka listener for user.profile.updated)
- [ ] Create question domain:
  - [ ] Domain model: Question, DailyQuestions
  - [ ] Use cases: GetDailyQuestionsUseCase, GetQuestionDetailUseCase
  - [ ] Persistence adapter: QuestionJpaEntity, QuestionJpaRepository
  - [ ] Web adapter: QuestionController
- [ ] Seed 100 questions into database
- [ ] Create daily_questions entries for next 30 days
- [ ] Write integration tests for question APIs

**Frontend Tasks:**
- [x] Create repository: querydaily-mobile
- [ ] Copy prototype11 code as baseline
- [ ] Install and configure PWA dependencies (next-pwa)
- [ ] Create manifest.json (icons, theme colors, start_url)
- [ ] Configure service worker for offline support
- [ ] Setup environment variables (NEXT_PUBLIC_API_URL)
- [ ] Implement API client (lib/api.ts)
- [ ] Connect dashboard to GET /api/v1/questions/daily
- [ ] Connect question detail to GET /api/v1/questions/{id}
- [ ] Add loading states and error handling
- [ ] Test PWA installation on mobile device

**Infrastructure Tasks:**
- [ ] Add querydaily-mobile-service to docker-compose
- [ ] Create querydailymobiledb database
- [ ] Configure Kafka topic: user.profile.updated
- [ ] Setup Eureka service registration
- [ ] Verify JWT token flow end-to-end

**Success Criteria:**
- [ ] User can login with Kakao (via user-service)
- [ ] Dashboard shows actual 3 questions from database
- [ ] Question detail page displays question content
- [ ] PWA can be installed on mobile (Add to Home Screen)

---

### Week 2: Core Loop (Days 8-14)

**Goal**: Write answer → Earn 10 💎 → View past questions

**Backend Tasks:**
- [ ] Create answer domain:
  - [ ] Domain model: Answer, UserAnswer, AnswerBadge
  - [ ] Use cases: GetAnswerListUseCase, CreateAnswerUseCase
  - [ ] Persistence adapter
  - [ ] Web adapter
- [ ] Seed 300 answers with badge data
- [ ] Create insight domain:
  - [ ] Domain model: InsightBalance, InsightTransaction
  - [ ] Use cases: GetBalanceUseCase, EarnInsightUseCase, SpendInsightUseCase
  - [ ] Persistence adapter
  - [ ] Web adapter
- [ ] Implement business logic:
  - [ ] CreateAnswerService: Create answer + earn 10 💎 (transactional)
  - [ ] ViewArchiveService: Spend 5 💎 + return past questions
  - [ ] Balance check: Return error if insufficient insights
- [ ] Write integration tests for answer + insight flow

**Frontend Tasks:**
- [ ] Connect question detail to GET /api/v1/questions/{id}/answers
- [ ] Display answer list with badges (company, experience, tech)
- [ ] Implement answer writing UI (connect to POST /api/v1/answers)
- [ ] Show success toast on answer creation
- [ ] Connect mypage to GET /api/v1/me/insights
- [ ] Display real-time insight balance in header
- [ ] Connect archive page to GET /api/v1/questions/archive
- [ ] Implement paywall modal when balance is insufficient
- [ ] Add optimistic UI updates for better UX

**Success Criteria:**
- [ ] User can see answers with badges on question detail page
- [ ] User can write answer and immediately see +10 💎
- [ ] Archive page shows past questions (costs 5 💎)
- [ ] Paywall modal appears when balance < 5 💎
- [ ] Balance updates in real-time across all pages

---

### Week 3: Monetization (Days 15-21)

**Goal**: Friend referral (+50 💎 x2) + Premium subscription + Shop integration

**Backend Tasks:**
- [ ] Create referral domain:
  - [ ] Domain model: Referral, InviteCode, ReferralReward
  - [ ] Use cases: GetMyCodeUseCase, ClaimReferralUseCase, GetStatsUseCase
  - [ ] Persistence adapter
  - [ ] Web adapter
- [ ] Implement referral logic:
  - [ ] Auto-generate invite code on signup (hook into user-service event)
  - [ ] Verify invite code uniqueness
  - [ ] ClaimReferralService: +50 💎 for referrer + referred (transactional)
  - [ ] Prevent duplicate claims (one referral per user)
- [ ] Create subscription domain:
  - [ ] Domain model: Subscription, SubscriptionPlan
  - [ ] Use cases: SubscribeUseCase, GetMySubscriptionUseCase
  - [ ] Persistence adapter
  - [ ] Web adapter
- [ ] Implement subscription logic:
  - [ ] Create subscription (test mode, no payment yet)
  - [ ] Check premium status (for feature gating)
  - [ ] Calculate end_date (start_date + 30 days)
- [ ] Write integration tests for referral + subscription

**Frontend Tasks:**
- [ ] Connect dashboard referral modal to GET /api/v1/me/referral/code
- [ ] Implement clipboard copy for invite code
- [ ] Add signup flow: Input referral code → POST /api/v1/referrals/claim
- [ ] Connect mypage referral section to GET /api/v1/me/referrals/stats
- [ ] Display real referral statistics (invited friends, earned insights)
- [ ] Connect shop page to GET /api/v1/me/subscription
- [ ] Implement premium subscribe button → POST /api/v1/subscriptions
- [ ] Add insight purchase (test mode): POST /api/v1/insights/purchase
- [ ] Update shop page to show real balance after purchase
- [ ] Add premium badge in mypage

**Success Criteria:**
- [ ] User can copy their referral code
- [ ] When friend signs up with code, both get +50 💎
- [ ] Referral stats show accurate count
- [ ] Premium subscription can be activated (test mode)
- [ ] Premium features are unlocked (search, bookmarks)
- [ ] Insight purchase works (test mode)

---

### Week 4: Polish & Launch (Days 22-28)

**Goal**: Beta test with 50 users → Fix bugs → Launch

**PWA Optimization:**
- [ ] Test offline functionality (cached questions, error states)
- [ ] Optimize service worker caching strategy
- [ ] Add push notification setup (prompt for permission)
- [ ] Improve loading performance (code splitting, lazy loading)
- [ ] Test Add to Home Screen flow on iOS and Android
- [ ] Verify PWA passes Lighthouse audit (90+ score)

**Mobile UX Polish:**
- [ ] Improve card stack swipe gestures (smoother animations)
- [ ] Add haptic feedback on interactions (iOS/Android)
- [ ] Optimize touch targets (minimum 48x48px)
- [ ] Test on various screen sizes (iPhone SE, Pro Max, Android)
- [ ] Fix any layout issues on small screens
- [ ] Add skeleton loaders for better perceived performance

**Beta Testing Preparation:**
- [ ] Create onboarding flow for new users
- [ ] Prepare kakao chat room announcement
- [ ] Setup analytics (PostHog or Mixpanel)
- [ ] Configure error tracking (Sentry)
- [ ] Create admin dashboard (simple) for monitoring:
  - [ ] Daily active users
  - [ ] Question view count
  - [ ] Answer creation count
  - [ ] Insight transaction volume
  - [ ] Referral success rate

**Bug Fixing & Monitoring:**
- [ ] Setup log aggregation (ELK stack or CloudWatch)
- [ ] Monitor API response times (< 200ms p95)
- [ ] Fix critical bugs reported by beta users
- [ ] Optimize database queries (add indexes)
- [ ] Test concurrent user load (50+ users)

**Launch Checklist:**
- [ ] All Week 1-3 features working end-to-end
- [ ] PWA installable and working offline
- [ ] No critical bugs in production
- [ ] Database migrations verified
- [ ] Rollback plan documented
- [ ] Support process defined (Discord/Kakao)

**Launch Day:**
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to production
- [ ] Announce in kakao chat room
- [ ] Monitor dashboards for errors
- [ ] Respond to user feedback quickly

**Success Criteria:**
- [ ] 50 beta users signed up
- [ ] 80%+ user retention day 2
- [ ] 30%+ of users write at least 1 answer
- [ ] 20%+ of users use referral code
- [ ] No critical bugs blocking core flow
- [ ] Average API response time < 300ms

---

## 5. Timeline Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Week 1: Foundation (Days 1-7)                              │
│  ✓ Login → Today's 3 Questions                             │
├─────────────────────────────────────────────────────────────┤
│  Week 2: Core Loop (Days 8-14)                             │
│  ✓ Write Answer → +10 💎 → View Archive                    │
├─────────────────────────────────────────────────────────────┤
│  Week 3: Monetization (Days 15-21)                         │
│  ✓ Referral (+50 💎) → Premium → Shop                      │
├─────────────────────────────────────────────────────────────┤
│  Week 4: Launch (Days 22-28)                               │
│  ✓ PWA Optimization → Beta (50 users) → Launch             │
└─────────────────────────────────────────────────────────────┘
```

**Key Milestones:**
- **Day 7**: Demo to team (login + questions working)
- **Day 14**: Demo to team (core loop working)
- **Day 21**: Feature complete (all MVP features)
- **Day 22**: Beta launch (invite 50 users)
- **Day 28**: Public launch (if beta successful)

**Risk Mitigation:**
- Week 1-2 are critical (foundation + core loop)
- Week 3-4 have buffer (can reduce scope if needed)
- Payment integration moved to post-launch
- Company verification moved to post-launch

---

## 6. Post-Launch Roadmap (Phase 2)

**Month 1 (After Launch):**
- [ ] Payment integration (Toss Payments or PortOne)
- [ ] Real insight purchase
- [ ] Premium subscription billing
- [ ] Company email verification
- [ ] Advanced search (premium feature)
- [ ] Bookmarks (premium feature)

**Month 2:**
- [ ] AI answer analysis
- [ ] Answer quality scoring
- [ ] Personalized question recommendations
- [ ] Push notifications for daily questions

**Month 3:**
- [ ] Study group features
- [ ] Answer comments and discussions
- [ ] Leaderboard (gamification)
- [ ] Badge system expansion

---

## 7. Success Metrics

### Product Metrics (North Star)

| Metric | Definition | Week 1 Target | Month 1 Target |
|--------|------------|---------------|----------------|
| **WAA** (Weekly Active Answer Views) | Users who view at least 1 answer per week | N/A | 30 |
| Daily Active Users (DAU) | Users who open app daily | 20 | 50+ |
| Answer Write Rate | % of users who write ≥1 answer | 20% | 30% |
| Retention Day 7 | % of users who return after 7 days | 40% | 50% |
| Referral Conversion | % of invited users who sign up | N/A | 20% |

### Technical Metrics

| Metric | Target |
|--------|--------|
| API Response Time (p95) | < 300ms |
| Error Rate | < 1% |
| Uptime | > 99.5% |
| PWA Install Rate | > 30% |

---

## 8. Next Steps (Immediate Actions)

### Day 1 Tasks:

**Decision Confirmation:**
- [ ] Confirm all Decisions 0.1-0.5 with team
- [ ] Get approval for repository creation
- [ ] Confirm AsyncSite infrastructure access

**Repository Setup:**
- [ ] Create `asyncsite/querydaily-mobile` (frontend)
- [ ] Create `asyncsite/querydaily-mobile-service` (backend)
- [ ] Setup CI/CD pipelines (GitHub Actions)
- [ ] Configure Docker for local development

**Content Preparation:**
- [ ] Start collecting 100 interview questions
- [ ] Recruit 10 team members for seed answers
- [ ] Define badge data structure

**Infrastructure:**
- [ ] Confirm MySQL database name: `querydailymobiledb`
- [ ] Confirm service port: 8388
- [ ] Setup Kafka topic: `user.profile.updated`
- [ ] Test JWT token validation with user-service

**Communication:**
- [ ] Share this roadmap with team
- [ ] Schedule daily standup (15 min)
- [ ] Setup Discord/Slack channel for updates

---

## 9. Appendix

### A. Tech Stack Summary

**Frontend (PWA):**
- Next.js 14.2.32 (App Router)
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- Framer Motion (animations)
- next-pwa (PWA support)

**Backend (Microservice):**
- Spring Boot 3.5.3
- Java 21 (Eclipse Temurin)
- Gradle (Kotlin DSL)
- MySQL 8.0
- Redis 7
- Kafka (AsyncSite shared)
- Eureka Client

**Infrastructure:**
- Docker + docker-compose
- Vercel (frontend hosting)
- AsyncSite VPS (backend hosting)

### B. Team Roles (TBD)

- **Product Owner**: [Name]
- **Tech Lead**: [Name]
- **Frontend Developer**: [Name]
- **Backend Developer**: [Name]
- **Content Creator**: [Team - 10 people for seed answers]

### C. References

- [Prototype11 Wireframe](../querydaily-frontend/app/prototype11/wireframe)
- [User Service CLAUDE.md](../../user-service/CLAUDE.md)
- [AsyncSite MSA Architecture](../../core-platform/docs/ARCHITECTURE.md)

---

**Document Owner**: Product Team
**Review Cycle**: Weekly during implementation
**Status**: ✅ Approved for implementation
