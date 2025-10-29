# 📊 QueryDaily Google Analytics 구현 문서

> QueryDaily 프로젝트의 Google Analytics 4 구현에 대한 모든 문서를 모았습니다.

---

## 🎯 프로젝트 개요

**목표:** 6개 핵심 태그를 구현하여 마케팅 퍼널을 구축하고 데이터 기반 의사결정 체계 확립

**상태:** ✅ 구현 완료 (Phase 1-5, 100%)

---

## ⚡ 5분 빠른 시작

### 지금 작동하는 것들

✅ **자동 추적** (손댈 필요 없음)
- 페이지 방문
- 스크롤 깊이 (25%, 50%, 75%, 100%)
- 상품 노출 (1초 이상)
- 섹션 진입 (30% 이상 노출)
- 에러 발생

✅ **수동 적용** (이미 설정됨)
- CTA 클릭 (8개 버튼)
- 폼 필드 상호작용 (4개 필드)

### 지금 할 수 있는 것

1. **콘솔에서 확인** (F12 > Console)
   - 모든 이벤트 실시간 로그 확인

2. **GA4 실시간 보고서**
   - https://analytics.google.com
   - 보고서 > 실시간

### ⚠️ 당신이 해야 할 것

1. **GA4 Console 설정** (1시간) ← **필수!**
   - 커스텀 디멘션 생성
   - 전환 이벤트 마킹
   - 퍼널 설정
   - 📖 가이드: [GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)

2. **데이터 수집 대기** (24-48시간)
   - GA4에서 데이터 처리 시간

3. **퍼널 분석 시작** (1주 후)
   - 병목 지점 파악
   - 개선 과제 도출

---

## 📚 문서 가이드

### 🚀 처음 시작하는 경우

| 순서 | 문서 | 소요 시간 | 설명 |
|------|------|----------|------|
| 1 | **[GETTING-STARTED.md](./GETTING-STARTED.md)** ⭐ | 10분 | 전체 이해, 빠른 시작, 필수 체크리스트 |
| 2 | **[TESTING-GUIDE.md](./TESTING-GUIDE.md)** | 30분 | 종합 테스트 및 검증 |
| 3 | **[GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)** | 1시간 | GA4 Console 상세 설정 |

### 📖 역할별 가이드

#### 마케터 / 비즈니스 분석가
| 문서 | 설명 |
|------|------|
| **[GA-STRATEGY-GUIDE.md](./GA-STRATEGY-GUIDE.md)** ⭐ | 퍼널 분석, A/B 테스트, 코호트 분석, ROI 측정 (21K, 최고 품질) |
| **[FUNNEL-SETUP-GUIDE.md](./FUNNEL-SETUP-GUIDE.md)** | 퍼널 정의, 리포트 템플릿 |
| **[AB-TESTING-GUIDE.md](./AB-TESTING-GUIDE.md)** | A/B 테스트 시작 방법, 통계 검증 |

#### 개발자
| 문서 | 설명 |
|------|------|
| **[IMPLEMENTATION-REFERENCE.md](./IMPLEMENTATION-REFERENCE.md)** ⭐ | 검증된 패턴, 실전 코드 (27K, 최고 품질) |
| **[EVENT-REFERENCE.md](./EVENT-REFERENCE.md)** | 6개 핵심 이벤트 레퍼런스, 파라미터 정의 |
| **[TECHNICAL-METRICS-GUIDE.md](./TECHNICAL-METRICS-GUIDE.md)** | 기술 지표 → 비즈니스 가치 연결 (20K) |

#### 프로젝트 매니저
| 문서 | 설명 |
|------|------|
| **[00-IMPLEMENTATION-CHECKLIST.md](./00-IMPLEMENTATION-CHECKLIST.md)** | 마스터 체크리스트, 진행 상황 추적 |
| **[GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)** ⭐ | GA4 설정 전체 가이드 (31K, 최고 품질) |

---

## 🎯 상황별 가이드

### "처음 프로젝트를 받았어요"
→ **[GETTING-STARTED.md](./GETTING-STARTED.md)** ⭐

### "새로운 CTA 버튼을 추가하고 싶어요"
→ [GETTING-STARTED.md](./GETTING-STARTED.md) > "빠른 사용법"

### "폼 필드 추적을 추가하고 싶어요"
→ [GETTING-STARTED.md](./GETTING-STARTED.md) > "빠른 사용법"

### "테스트를 하고 싶어요"
→ **[TESTING-GUIDE.md](./TESTING-GUIDE.md)**

### "GA4 Console을 설정하고 싶어요"
→ **[GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)**

### "A/B 테스트를 시작하고 싶어요"
→ [AB-TESTING-GUIDE.md](./AB-TESTING-GUIDE.md)

### "마케팅 캠페인 후 분석을 하고 싶어요"
→ [FUNNEL-SETUP-GUIDE.md](./FUNNEL-SETUP-GUIDE.md) > "리포트 템플릿"

### "이벤트 상세 정보가 필요해요"
→ [EVENT-REFERENCE.md](./EVENT-REFERENCE.md)

### "코드 예제가 필요해요"
→ [IMPLEMENTATION-REFERENCE.md](./IMPLEMENTATION-REFERENCE.md) ⭐

---

## ✅ 체크리스트

### 지금 바로 (30분)
- [ ] 콘솔에서 이벤트 확인
- [ ] 스크롤, CTA 클릭 테스트
- [ ] [TESTING-GUIDE.md](./TESTING-GUIDE.md) 참조

### 오늘 중 (1시간)
- [ ] GA4 Console 접속
- [ ] 커스텀 디멘션 4개 생성
- [ ] 전환 이벤트 4개 마킹
- [ ] 퍼널 2개 생성
- [ ] [GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md) 참조

### 2-3일 후
- [ ] GA4에서 첫 데이터 확인
- [ ] 이벤트 보고서 확인
- [ ] 실시간 보고서 확인

### 1주 후
- [ ] 퍼널 분석 시작
- [ ] 병목 지점 파악
- [ ] 개선 과제 도출
- [ ] [GA-STRATEGY-GUIDE.md](./GA-STRATEGY-GUIDE.md) 참조

---

## 📈 구현 현황

| Phase | 상태 | 완료율 | 주요 산출물 |
|-------|------|--------|------------|
| Phase 1: 기초 인프라 | ✅ 완료 | 100% | ga-utils, event-types, 훅, 디버그 패널 |
| Phase 2: 6개 핵심 태그 | ✅ 완료 | 100% | scroll, click, form, view_item, section, error |
| Phase 3: 퍼널 구축 | ✅ 완료 | 100% | 퍼널 정의, 가이드 문서 |
| Phase 4: A/B 테스트 | ✅ 완료 | 100% | ExperimentManager, 가이드 문서 |
| Phase 5: 문서화 | ✅ 완료 | 100% | 11개 핵심 문서 |

**전체 진행률: 100% 완료**

---

## 📌 핵심 원칙

1. **가격은 항상 숫자 타입**
   ```typescript
   // ✅ 올바름
   trackEvent('purchase', 'ecommerce', 'product', 29900);

   // ❌ 잘못됨
   trackEvent('purchase', 'ecommerce', 'product', '29900');
   ```

2. **개발 환경에서 콘솔로 확인**
   - 모든 이벤트가 콘솔에 로그로 출력됨
   - F12 > Console에서 실시간 확인

3. **"Fetch failed"는 정상**
   - GA의 응답 방식 때문
   - 실제로는 데이터가 성공적으로 전송됨
   - 무시해도 됩니다

4. **높은 우선순위 이벤트는 즉시 전송**
   - purchase, sign_up 등은 배치 처리 없이 즉시 전송

5. **A/B 테스트는 한 번에 하나씩**
   - 여러 요소를 동시에 변경하면 원인 파악 불가

---

## 🔗 외부 리소스

### GA4 공식 문서
- https://support.google.com/analytics

### 통계 도구
- **샘플 크기 계산**: https://www.optimizely.com/sample-size-calculator/
- **P-value 계산**: https://www.graphpad.com/quickcalcs/

### 학습 자료
- **Measure School** (YouTube) - GA4 튜토리얼
- **Analytics Mania** (블로그) - 실전 팁

---

## 🆘 도움이 필요한 경우

### 일반적인 문제

1. **이벤트가 GA4에 안 보여요**
   - 24-48시간 대기 필요
   - DebugView에서는 즉시 확인 가능
   - [TESTING-GUIDE.md](./TESTING-GUIDE.md) > "문제 해결" 참조

2. **환경변수 관련**
   ```bash
   # .env.development 또는 .env.production
   NEXT_PUBLIC_GA_ID=G-YOUR_ID_HERE
   ```

3. **gtag 로드 확인**
   ```javascript
   // 브라우저 콘솔에 입력
   window.gtag
   // function이면 정상, undefined면 문제
   ```

### 추가 지원

1. 콘솔에 에러 메시지 확인
2. 관련 문서 참조
3. [TESTING-GUIDE.md](./TESTING-GUIDE.md) 문제 해결 섹션 확인
4. 팀에 문의

---

## 📊 문서 목록

### 핵심 문서 (시작 필수)

1. **README.md** (이 문서) - 문서 인덱스
2. **GETTING-STARTED.md** ⭐ - 빠른 시작 가이드
3. **TESTING-GUIDE.md** - 종합 테스트 가이드

### 설정 및 전략

4. **GA4-CONSOLE-SETUP.md** ⭐ - GA4 Console 상세 설정 (31K)
5. **GA-STRATEGY-GUIDE.md** ⭐ - 퍼널 분석, A/B 테스트 전략 (21K)
6. **FUNNEL-SETUP-GUIDE.md** - 퍼널 정의 및 리포트
7. **AB-TESTING-GUIDE.md** - A/B 테스트 실행

### 개발자 참고

8. **IMPLEMENTATION-REFERENCE.md** ⭐ - 코드 패턴 및 예제 (27K)
9. **EVENT-REFERENCE.md** - 이벤트 레퍼런스
10. **TECHNICAL-METRICS-GUIDE.md** - 기술 지표 가이드 (20K)

### 프로젝트 관리

11. **00-IMPLEMENTATION-CHECKLIST.md** - 마스터 체크리스트

---

## 💡 핵심 메시지

### 우리가 만든 것:
**이벤트를 수집하는 "센서"**
- 스크롤, 클릭, 폼 입력 등을 자동 감지
- GA4로 데이터 전송

### 당신이 만들 것:
**데이터를 보여주는 "대시보드"**
- GA4 Console에서 퍼널 설정
- 리포트 구성
- 분석 시작

### 비유:
```
센서 (우리) ───전송──→ GA4 서버 ───보관──→ 데이터베이스
                                              ↓
                                       [당신이 설정할 것]
                                              ↓
                                            퍼널
                                            리포트
                                            대시보드
```

---

## 🎯 지금 시작하세요!

**3단계로 시작:**

1. **[GETTING-STARTED.md](./GETTING-STARTED.md)** 읽기 (10분)
2. **[TESTING-GUIDE.md](./TESTING-GUIDE.md)**로 테스트 (30분)
3. **[GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)**로 설정 (1시간)

**성공적인 데이터 분석을 시작하세요!** 🚀

---

_모든 문서는 실제 구현과 동기화되어 있습니다._

_최종 업데이트: 2025-01-27_
