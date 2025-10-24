# 📊 QueryDaily Google Analytics 구현 문서

> QueryDaily 프로젝트의 Google Analytics 4 구현에 대한 모든 문서를 모았습니다.

## 🎯 프로젝트 개요

**목표:** 6개 핵심 태그를 구현하여 마케팅 퍼널을 구축하고 데이터 기반 의사결정 체계 확립

**상태:** ✅ 구현 완료 (Phase 1-4)

---

## 📚 문서 가이드

### 🚀 시작하기

처음 이 프로젝트를 접하는 경우:

1. **[QUICK-START.md](./QUICK-START.md)** ⭐ **시작은 여기서!**
   - 5분 안에 전체 구조 파악
   - 자주 사용하는 패턴
   - 빠른 참조

2. **[PROGRESS-SUMMARY.md](./PROGRESS-SUMMARY.md)**
   - 현재 구현 상태
   - 완료된 기능들
   - 다음 단계

---

### 📖 구현 및 관리

실제 구현하거나 프로젝트를 관리하는 경우:

3. **[00-IMPLEMENTATION-CHECKLIST.md](./00-IMPLEMENTATION-CHECKLIST.md)** ⭐ **마스터 체크리스트**
   - 전체 작업 진행 상황
   - Phase별 상세 체크리스트
   - 작업 노트 및 이슈

4. **[GA-STRATEGY-GUIDE.md](./GA-STRATEGY-GUIDE.md)**
   - 퍼널 분석 전략
   - A/B 테스트 설계
   - 마케팅 ROI 측정

---

### 🧪 테스트 및 검증

구현한 기능을 테스트하는 경우:

5. **[TEST-GUIDE.md](./TEST-GUIDE.md)**
   - 기본 테스트 방법
   - 스크롤, CTA 테스트

6. **[COMPREHENSIVE-TEST-GUIDE.md](./COMPREHENSIVE-TEST-GUIDE.md)** ⭐ **종합 테스트**
   - 6개 태그 전체 테스트 방법
   - 체크리스트
   - 문제 해결

---

### 📊 GA4 설정

Google Analytics Console 설정이 필요한 경우:

7. **[GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)**
   - 커스텀 디멘션 생성
   - 전환 이벤트 마킹
   - 잠재고객 정의

8. **[FUNNEL-SETUP-GUIDE.md](./FUNNEL-SETUP-GUIDE.md)**
   - 퍼널 정의
   - 퍼널 설정 방법
   - 리포트 템플릿

---

### 🧪 A/B 테스트

A/B 테스트를 시작하고 싶은 경우:

9. **[AB-TESTING-GUIDE.md](./AB-TESTING-GUIDE.md)**
   - A/B 테스트 기초
   - 실험 시작 방법
   - 결과 분석 방법

---

### 📖 레퍼런스

이벤트나 코드를 참조해야 하는 경우:

10. **[EVENT-REFERENCE.md](./EVENT-REFERENCE.md)**
    - 모든 이벤트 상세 설명
    - 파라미터 정의
    - 코드 예시

---

## 🎯 상황별 가이드

### "처음 프로젝트를 받았어요"
→ [QUICK-START.md](./QUICK-START.md) + [PROGRESS-SUMMARY.md](./PROGRESS-SUMMARY.md)

### "새로운 CTA 버튼을 추가하고 싶어요"
→ [QUICK-START.md](./QUICK-START.md) > "새로운 CTA 버튼 추가하기"

### "폼 필드 추적을 추가하고 싶어요"
→ [QUICK-START.md](./QUICK-START.md) > "새로운 폼 필드 추적하기"

### "테스트를 하고 싶어요"
→ [COMPREHENSIVE-TEST-GUIDE.md](./COMPREHENSIVE-TEST-GUIDE.md)

### "GA4 Console을 설정하고 싶어요"
→ [GA4-CONSOLE-SETUP.md](./GA4-CONSOLE-SETUP.md)

### "A/B 테스트를 시작하고 싶어요"
→ [AB-TESTING-GUIDE.md](./AB-TESTING-GUIDE.md)

### "마케팅 캠페인 후 분석을 하고 싶어요"
→ [FUNNEL-SETUP-GUIDE.md](./FUNNEL-SETUP-GUIDE.md) > "리포트 템플릿"

---

## 📈 구현 현황

| Phase | 상태 | 문서 |
|-------|------|------|
| Phase 1: 기초 인프라 | ✅ 100% | PROGRESS-SUMMARY |
| Phase 2: 6개 태그 | ✅ 100% | EVENT-REFERENCE |
| Phase 3: 퍼널 구축 | ✅ 100% | FUNNEL-SETUP-GUIDE |
| Phase 4: A/B 테스트 | ✅ 100% | AB-TESTING-GUIDE |
| Phase 5: 문서화 | ✅ 100% | 이 문서들! |

---

## 🔗 외부 리소스

### GA4 공식 문서
- https://support.google.com/analytics

### 통계 도구
- https://www.optimizely.com/sample-size-calculator/
- https://www.graphpad.com/quickcalcs/

### 학습 자료
- Measure School (YouTube)
- Analytics Mania (블로그)

---

## 📌 핵심 원칙

1. **가격은 항상 숫자 타입**
2. **개발 환경에서 콘솔로 확인**
3. **"Fetch failed"는 정상** (무시해도 됨)
4. **높은 우선순위 이벤트는 즉시 전송**
5. **A/B 테스트는 한 번에 하나씩**

---

## 🆘 도움이 필요한 경우

1. 콘솔에 에러 메시지 확인
2. 관련 문서 참조
3. `window.gtag` 존재 여부 확인
4. 환경변수 (`NEXT_PUBLIC_GA_ID`) 확인

---

_모든 문서는 실제 구현과 동기화되어 있습니다._