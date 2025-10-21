

**문서 버전**: 1.0 (작성자 차동민)
**작성일**: 2025년 10월 20일
**목표 런칭일**: 11월 중순 (약 4주 후)
**초기 사용자**: 50명 (카카오톡 채팅방 베타)

---

### ✅ MVP 핵심에만 집중
1. **질문의 퀄리티** - 100개 엄선된 질문
2. **답변 읽기 경험** - 뱃지 포함 답변 리스트
3. **답변 작성 동기** - 좋아요를 통한 사회적 인정
4. **습관 형성** - 매일 푸시 알림

---

## 1. 요약

### 현재 상황

**기존 자산:**
- `querydaily-frontend/prototype11`: 완성된 UI/UX 웹 프로토타입
- AsyncSite MSA: user-service, noti-service, asset-service

**새로 만들어야 하는 것:**
1. **모바일 우선 PWA 프론트엔드** (querydaily-mobile)
2. **새 백엔드 서비스** (querydaily-mobile-service)
3. **AsyncSite MSA 통합** (user-service 인증 연동)

### 핵심 가치 제안

> "다른 개발자의 면접 답변을 엿보며 배우는"

**핵심 가설**: 개발자는 혼자 공부하는 것보다 다른 사람의 답변을 보면서 더 빠르게 성장한다.

**핵심 지표**: 주간 활성 답변 조회수 (Weekly Active Answer Views)

### MVP 성공 기준

**필수 기능:**
- [ ] 카카오 OAuth 로그인
- [ ] 매일 3개 질문 표시
- [ ] 다른 사람 답변 보기 (회사/경력/기술스택 뱃지 포함)
- [ ] 내 답변 작성
- [ ] 좋아요 기능
- [ ] 북마크 기능
- [ ] 매일 푸시 알림

**제외 기능 (Phase 2 이후):**
- ❌ 인사이트(💎) 시스템
- ❌ 과거 질문 잠금/해제
- ❌ 친구 초대 리워드
- ❌ 프리미엄 구독
- ❌ 검색 기능
- ❌ 회사 인증

---

## 2. 핵심 결정 사항

### Decision 1: 레포지토리 구조 ✅

**프론트엔드:**
- **새 레포**: `asyncsite/querydaily-mobile`
  - Next.js 14 + TypeScript + Tailwind CSS
  - PWA 설정 (manifest + service worker)

**백엔드:**
- **새 레포**: `asyncsite/querydaily-mobile-service`
  - Spring Boot 3.5.3 + Java 21
  - 헥사고날 아키텍처
  - 포트: 8388

### Decision 2: 백엔드 도메인 설계 ✅

**MVP 필수 도메인:**

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
    ├── bookmark/          # 북마크 도메인
    │   ├── domain/
    │   ├── application/
    │   └── adapter/
    └── member/            # 회원 프로필 (읽기 전용)
        ├── domain/
        ├── application/
        └── adapter/
```

**Phase 2 도메인 (MVP 제외):**
- `insight/` - 인사이트(💎) 시스템
- `referral/` - 친구 초대
- `subscription/` - 프리미엄 구독

### Decision 3: User Service 통합 방식 ✅

**user-service가 제공:**
- 카카오 OAuth 로그인
- JWT 토큰 발급
- 기본 사용자 정보

**querydaily-mobile-service가 관리:**
- 질문 & 답변
- 북마크
- 좋아요

**통합 플로우:**
```
모바일 앱 → user-service: 카카오 로그인
user-service → 모바일 앱: JWT 토큰
모바일 앱 → querydaily-mobile-service: JWT로 API 호출
querydaily-mobile-service: JWT 검증
```

### Decision 4: 초기 컨텐츠 전략 ✅

**100개 질문 시드 데이터:**

| 카테고리 | 개수 |
|----------|------|
| Spring/Java 백엔드 | 30 |
| JPA/데이터베이스 | 20 |
| 네트워크/HTTP | 15 |
| React/프론트엔드 | 20 |
| 시스템 디자인 | 15 |

**300개 시드 답변:**
- 베타 크루 10명이 각각 30개씩 작성
- 뱃지 분포: LINE, Kakao, Naver, Coupang, 기타
- 경력: 주니어, 미들, 시니어

### Decision 5: 배포 전략 ✅

**프론트엔드:** Vercel (PWA)
**백엔드:** AsyncSite 인프라 (Docker)
**데이터베이스:** `querydailymobiledb`

---

## 3. 시스템 아키텍처

### 3.1 시스템 개요

```
┌─────────────────────────────────────────────┐
│         클라이언트 (PWA)                      │
│      querydaily-mobile (Vercel)             │
└───────────────────┬─────────────────────────┘
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────────┐
│   querydaily-mobile-service (신규)          │
│   - 질문                                     │
│   - 답변                                     │
│   - 북마크                                   │
│   - 좋아요                                   │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│              user-service (기존)             │
│   - 카카오 OAuth                             │
│   - JWT 토큰                                 │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│            데이터 계층                        │
│   MySQL | Redis (캐시) | Kafka              │
└─────────────────────────────────────────────┘
```

### 3.2 API 설계

**핵심 엔드포인트:**

```
인증 (user-service)
├─ POST   /api/auth/oauth/kakao       # 카카오 로그인
└─ GET    /api/users/me               # 현재 사용자 정보

질문 (querydaily-mobile-service)
├─ GET    /api/v1/questions/daily     # 오늘의 3문제
├─ GET    /api/v1/questions/{id}      # 질문 상세
└─ GET    /api/v1/categories          # 카테고리

답변 (querydaily-mobile-service)
├─ GET    /api/v1/questions/{id}/answers   # 답변 목록
├─ POST   /api/v1/answers                  # 답변 작성
├─ PUT    /api/v1/answers/{id}             # 답변 수정
├─ DELETE /api/v1/answers/{id}             # 답변 삭제
└─ GET    /api/v1/me/answers               # 내 답변

좋아요 (querydaily-mobile-service)
├─ POST   /api/v1/answers/{id}/like        # 좋아요
└─ DELETE /api/v1/answers/{id}/like        # 좋아요 취소

북마크 (querydaily-mobile-service)
├─ POST   /api/v1/bookmarks                # 북마크 추가
├─ GET    /api/v1/me/bookmarks             # 내 북마크
└─ DELETE /api/v1/bookmarks/{id}           # 북마크 삭제
```

### 3.3 데이터베이스 스키마 (MVP 필수만)

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
    INDEX idx_category (category)
);

-- 일일 질문
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

-- 답변 (시드 답변)
CREATE TABLE answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    company_badge VARCHAR(100),      -- LINE, Kakao 등
    experience_badge VARCHAR(50),    -- 주니어, 미들, 시니어
    tech_badges JSON,                -- ["Spring", "JPA"]
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    INDEX idx_question (question_id)
);

-- 사용자 답변
CREATE TABLE user_answers (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    INDEX idx_member_question (member_id, question_id)
);

-- 좋아요
CREATE TABLE answer_likes (
    id VARCHAR(36) PRIMARY KEY,
    answer_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_answer_member (answer_id, member_id),
    INDEX idx_member (member_id)
);

-- 북마크
CREATE TABLE bookmarks (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    member_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    UNIQUE KEY uk_question_member (question_id, member_id)
);

-- 회원 (user-service에서 캐시)
CREATE TABLE members (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    profile_image VARCHAR(500),
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_email (email)
);
```

---

## 4. 주차별 구현 계획

### 1주차: 기반 구축 (10/20 - 10/26)

**목표**: 로그인 → 오늘의 3문제 보기

#### 백엔드 작업 (3일)
- [ ] **Day 1-2: 프로젝트 셋업**
  - [ ] querydaily-mobile-service 레포 생성
  - [ ] 헥사고날 아키텍처 기본 구조
  - [ ] MySQL 연결 (querydailymobiledb)
  - [ ] Docker Compose 설정

- [ ] **Day 3-4: 인증**
  - [ ] user-service JWT 검증
  - [ ] Kafka 리스너 (user.profile.updated)
  - [ ] members 테이블 동기화

- [ ] **Day 5-7: 질문 도메인**
  - [ ] Question 엔티티
  - [ ] DailyQuestions 엔티티
  - [ ] GET /api/v1/questions/daily
  - [ ] GET /api/v1/questions/{id}
  - [ ] 100개 질문 시드 데이터

#### 프론트엔드 작업 (3일)
- [ ] **Day 1-2: 프로젝트 셋업**
  - [ ] querydaily-mobile 레포 생성
  - [ ] Next.js 14 + PWA 설정
  - [ ] prototype11 코드 복사

- [ ] **Day 3-4: 인증**
  - [ ] 카카오 로그인 UI
  - [ ] user-service API 연동
  - [ ] JWT 토큰 관리

- [ ] **Day 5-7: 질문 조회**
  - [ ] Dashboard (오늘의 3문제)
  - [ ] 질문 상세 페이지
  - [ ] 로딩/에러 처리

#### 완료 기준
- [ ] 카카오 로그인 성공
- [ ] 오늘의 3문제 표시
- [ ] 질문 상세 조회 가능

---

### 2주차: 핵심 루프 (10/27 - 11/2)

**목표**: 답변 읽기 & 작성

#### 백엔드 작업 (5일)
- [ ] **Day 8-10: 답변 조회**
  - [ ] Answer, UserAnswer 엔티티
  - [ ] GET /api/v1/questions/{id}/answers
  - [ ] 뱃지 데이터 포함
  - [ ] 정렬 (인기순/최신순)
  - [ ] 300개 시드 답변

- [ ] **Day 11-12: 답변 작성**
  - [ ] POST /api/v1/answers
  - [ ] PUT /api/v1/answers/{id}
  - [ ] DELETE /api/v1/answers/{id}

- [ ] **Day 13-14: 좋아요**
  - [ ] AnswerLike 엔티티
  - [ ] POST /api/v1/answers/{id}/like
  - [ ] like_count 업데이트

#### 프론트엔드 작업 (5일)
- [ ] **Day 8-10: 답변 읽기**
  - [ ] 답변 리스트 컴포넌트
  - [ ] 뱃지 UI
  - [ ] 정렬 토글
  - [ ] 좋아요 버튼

- [ ] **Day 11-12: 답변 작성**
  - [ ] 답변 작성 에디터
  - [ ] 마크다운 지원
  - [ ] 작성 성공 토스트

- [ ] **Day 13-14: 내 답변 관리**
  - [ ] 내 답변 목록
  - [ ] 수정/삭제 UI

#### 완료 기준
- [ ] 답변 목록에 뱃지 표시
- [ ] 답변 작성 가능
- [ ] 좋아요 실시간 반영
- [ ] 내 답변 수정/삭제 가능

---

### 3주차: 부가 기능 & 폴리싱 (11/3 - 11/9)

**목표**: 사용자 경험 개선

#### 백엔드 작업 (4일)
- [ ] **Day 15-16: 북마크**
  - [ ] Bookmark 엔티티
  - [ ] POST /api/v1/bookmarks
  - [ ] GET /api/v1/me/bookmarks
  - [ ] DELETE /api/v1/bookmarks/{id}

- [ ] **Day 17-18: 푸시 알림**
  - [ ] FCM 토큰 저장
  - [ ] 매일 오전 9시 알림 스케줄러
  - [ ] 알림 설정 API

- [ ] **Day 19-21: 성능 최적화**
  - [ ] DB 인덱스 추가
  - [ ] 쿼리 최적화
  - [ ] Redis 캐싱 (선택)

#### 프론트엔드 작업 (4일)
- [ ] **Day 15-16: 북마크**
  - [ ] 북마크 버튼
  - [ ] 북마크 목록 페이지

- [ ] **Day 17-18: 푸시 알림**
  - [ ] FCM SDK 설정
  - [ ] 알림 권한 요청
  - [ ] 알림 설정 토글

- [ ] **Day 19-21: UI 폴리싱**
  - [ ] 스켈레톤 로더
  - [ ] 애니메이션 개선
  - [ ] 다양한 화면 크기 테스트
  - [ ] 온보딩 플로우

#### 완료 기준
- [ ] 북마크 추가/삭제 가능
- [ ] 푸시 알림 수신
- [ ] UI 부드럽게 작동
- [ ] 모바일 최적화 완료

---

### 4주차: 베타 & 출시 (11/10 - 11/16)

**목표**: 11월 15일 공식 출시

#### Day 22-23: 베타 준비
- [ ] 프로덕션 배포
- [ ] 모니터링 설정
- [ ] 100개 질문 최종 검토
- [ ] 300개 답변 최종 검토

#### Day 24-25: 베타 테스트
- [ ] 50명 초대
- [ ] 버그 수집
- [ ] 긴급 수정

#### Day 26: 공식 출시 (11/15)
- [ ] 최종 점검
- [ ] 출시
- [ ] 모니터링

#### 완료 기준
- [ ] 50명 가입
- [ ] 크리티컬 버그 0건
- [ ] 11/15 출시 완료

---

## 5. MVP 필수 기능 체크리스트

### 인증
- [ ] 카카오 OAuth 로그인
- [ ] JWT 토큰 관리
- [ ] 자동 로그인

### 질문
- [ ] 오늘의 3문제
- [ ] 질문 상세
- [ ] 카테고리 탐색

### 답변
- [ ] 답변 목록 (뱃지 포함)
- [ ] 답변 작성 (마크다운)
- [ ] 답변 수정/삭제
- [ ] 정렬 (인기순/최신순)

### 좋아요
- [ ] 좋아요 추가/취소
- [ ] 좋아요 수 실시간 반영

### 북마크
- [ ] 북마크 추가/삭제
- [ ] 북마크 목록

### 프로필
- [ ] 내 프로필 조회
- [ ] 내 답변 목록

### 알림
- [ ] 매일 푸시 알림
- [ ] 알림 설정 ON/OFF

### PWA
- [ ] PWA 설치 가능
- [ ] 오프라인 지원
- [ ] 모바일 최적화

---

## 6. 명시적으로 제외되는 기능

### Phase 2로 이동 (출시 후 1-2개월)
- ❌ **인사이트(💎) 시스템**
  - 답변 작성 → +10 💎
  - 과거 질문 잠금 → 5 💎 소비
  - 인사이트 구매

- ❌ **친구 초대 시스템**
  - 초대 코드
  - +50 💎 리워드

- ❌ **검색 기능**
  - 질문 검색
  - 답변 검색

### Phase 3로 이동 (출시 후 3-6개월)
- ❌ **프리미엄 구독**
  - 월 9,900원
  - 고급 기능 잠금 해제

- ❌ **회사 인증**
  - 이메일 인증
  - 인증 뱃지

- ❌ **PC 연동**
  - 통합 계정
  - 포인트 공유

### 제외 이유
**MVP는 핵심 가설 검증에만 집중:**
> "개발자들은 다른 사람의 답변을 보는 것만으로도 성장한다고 느낄 것이다"

포인트 시스템, 수익화, 복잡한 기능은 이 가설을 흐리게 만듭니다.

---

## 7. 측정 지표

### North Star Metric
**주간 활성 답변 조회 수** (Weekly Active Answer Views)

### 핵심 지표 (출시 후 2주)

| 지표 | 목표 |
|------|------|
| 가입 사용자 | 50명 이상 |
| 2주 잔존율 | 30% 이상 |
| 평균 세션 시간 | 3분 이상 |
| 답변 작성 비율 | 10% 이상 |
| 질문당 답변 조회 | 평균 2개 이상 |
| 크리티컬 버그 | 0건 |

### 정성적 지표
- [ ] "다른 답변 보는 게 도움됐다" 피드백 5건 이상
- [ ] "질문 퀄리티가 좋다" 피드백 5건 이상

---

## 8. 출시 후 로드맵

### Phase 2 (출시 후 1-2개월)
**조건**: MAU 200명 이상, 2주 잔존율 30% 이상

**추가 기능:**
- [ ] 인사이트(💎) 시스템
  - 답변 작성 리워드
  - 과거 질문 잠금
- [ ] 친구 초대 시스템
- [ ] 검색 기능
- [ ] 댓글 (선택)

### Phase 3 (출시 후 3-6개월)
**조건**: MAU 500명 이상, PMF 확인

**수익화:**
- [ ] 프리미엄 구독 (월 9,900원)
- [ ] 회사 인증
- [ ] PC 연동

---

## 9. 리스크 관리

### Risk 1: 컨텐츠 준비 지연
**영향**: 출시 연기

**완화**:
- Week 1에 질문 100개 완료 (최우선)
- 베타 크루 조기 모집 (10/21)

### Risk 2: 4주 타임라인
**영향**: 출시 연기 또는 품질 저하

**완화**:
- 매주 금요일 체크포인트
- 지연 시 기능 범위 축소
- 인사이트 시스템 이미 제외함

### Risk 3: 사용자 참여 부족
**영향**: Ghost Town

**완화**:
- 300개 시드 답변 확보
- 매일 푸시 알림
- 좋아요를 통한 사회적 인정

---

## 10. 다음 단계

### 이번 주 (10/20-10/26)
1. [ ] 레포지토리 생성
2. [ ] 100개 질문 수집
3. [ ] 베타 크루 10명 모집
4. [ ] 기반 구축 착수

### 다음 주 (10/27-11/2)
1. [ ] 핵심 루프 구현
2. [ ] 300개 시드 답변 작성
3. [ ] 내부 테스트

### 3주차 (11/3-11/9)
1. [ ] 부가 기능 추가
2. [ ] UI 폴리싱
3. [ ] 베타 준비

### 4주차 (11/10-11/16)
1. [ ] 베타 테스트 (50명)
2. [ ] 버그 수정
3. [ ] 11/15 공식 출시

---

## 11. 주요 변경 사항 요약

### v1.0 (동료 로드맵) vs v2.0 (이 문서)

| 항목 | v1.0 | v2.0 |
|------|------|------|
| **인사이트 시스템** | Week 2 (MVP) | Phase 2 (제외) |
| **친구 초대** | Week 3 (MVP) | Phase 2 (제외) |
| **프리미엄 구독** | Week 3 (MVP) | Phase 3 (제외) |
| **북마크** | 미정 | Week 3 (MVP) |
| **MVP 복잡도** | 높음 | 낮음 |
| **핵심 집중도** | 분산 | 집중 |

### 왜 변경했는가?

1. **MVP는 가설 검증용**
   - "다른 답변을 보는 것이 도움이 되는가?"
   - 포인트 시스템은 이 가설과 무관

2. **복잡도 최소화**
   - 4주 안에 완성 가능한 범위
   - 테스트 가능한 수준

3. **본질에 집중**
   - 질문 퀄리티
   - 답변 읽기 경험
   - 사회적 인정 (좋아요)

---

**문서 소유자**: 제품팀
**검토 주기**: 매주
**상태**: ✅ 검토 중
