# Google Analytics 설정 가이드

## 📊 Google Analytics 설정 완료!

QueryDaily에 Google Analytics가 성공적으로 통합되었습니다.

## 🚀 설정 단계

### 1. Google Analytics 측정 ID 받기

1. [Google Analytics](https://analytics.google.com/)에 접속
2. 계정이 없다면 새로 생성 (이미 했다면 3번으로)
3. **관리자 → 데이터 스트림 → 웹 스트림**에서 측정 ID 확인
4. `G-XXXXXXXXXX` 형태의 측정 ID 복사

### 2. 로컬 환경 설정

`.env.local` 파일을 생성하고 측정 ID 추가:

```bash
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID
```

### 3. Vercel 환경 변수 설정

1. [Vercel Dashboard](https://vercel.com) 로그인
2. QueryDaily 프로젝트 선택
3. **Settings → Environment Variables** 이동
4. 다음 환경 변수 추가:
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-YOUR_MEASUREMENT_ID` (실제 측정 ID)
   - **Environment**: Production, Preview, Development 모두 선택
5. **Save** 클릭

### 4. 재배포

환경 변수 추가 후 자동으로 재배포되지만, 수동으로 하려면:

```bash
git push origin main
```

## 📈 추적되는 주요 이벤트

### 자동 추적
- **페이지뷰**: 모든 페이지 방문
- **세션 시간**: 사용자 체류 시간
- **이탈률**: 페이지별 이탈률

### 커스텀 이벤트
- **begin_application**: 베타 신청 시작
- **sign_up**: 베타 신청 완료 ✅
- **file_upload**: 이력서 업로드
- **external_link**: 외부 링크 클릭
  - `kakao_contact`: 카카오톡 문의
  - `kakao_footer`: 푸터 카카오톡
  - `discord_success_page`: Discord 채널

## 📱 실시간 확인 방법

1. Google Analytics 대시보드 접속
2. **보고서 → 실시간** 메뉴 클릭
3. 실시간 방문자, 이벤트 확인

## 🎯 유용한 보고서

### 전환율 확인
**탐색 → 유입경로 탐색** 에서:
1. 단계 추가: `first_visit` → `begin_application` → `sign_up`
2. 각 단계별 전환율 확인

### 사용자 행동 분석
**보고서 → 참여도**에서:
- 평균 참여 시간
- 페이지별 조회수
- 이벤트 수

### 획득 채널 분석
**보고서 → 획득**에서:
- 사용자 유입 경로 (검색/직접/SNS)
- 채널별 전환율

## 🔧 문제 해결

### GA가 작동하지 않는 경우
1. 브라우저 개발자 도구 → Network 탭
2. `gtag` 또는 `google` 검색
3. 요청이 보이는지 확인

### 환경 변수가 적용되지 않는 경우
1. Vercel 대시보드에서 환경 변수 확인
2. 재배포 트리거: `git commit --allow-empty -m "Trigger deploy" && git push`

## 📝 추가 설정 (선택사항)

### Google Analytics 대시보드 커스터마이징
1. **맞춤 설정 → 맞춤 측정기준 및 측정항목**
2. 베타 신청 관련 맞춤 보고서 생성

### 목표 설정
1. **관리 → 목표 → 새 목표**
2. "베타 신청 완료"를 목표로 설정
3. 이벤트: `sign_up` 선택

## 🚨 주의사항

- 개인정보는 수집하지 않음 (IP 익명화 적용됨)
- 광고 추적 기능은 비활성화됨
- GDPR/개인정보보호법 준수

## 💡 팁

- 매주 월요일 오전에 주간 리포트 확인 추천
- 베타 테스트 기간 동안 일일 모니터링 권장
- 전환율이 낮은 구간 발견 시 UX 개선 고려

---

문의사항: official.querydaily@gmail.com