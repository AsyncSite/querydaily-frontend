'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { createOrder, ProductCode } from '@/lib/api';

export default function GritMomentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 전화번호 자동 포맷팅
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length >= 4 && cleaned.length <= 7) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else if (cleaned.length >= 8) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
      }
      setFormData(prev => ({ ...prev, phone: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = '올바른 전화번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 백엔드 주문 생성 API 호출
      const response = await createOrder({
        email: formData.email,
        name: formData.name,
        phone: formData.phone.replace(/-/g, ''),
        productCode: ProductCode.GRIT_MOMENT,
        paymentMethod: 'card',
      });

      if (!response.success || !response.data) {
        alert(`주문 생성에 실패했습니다: ${response.message || '알 수 없는 오류'}`);
        return;
      }

      // 주문 정보 로컬 스토리지에 저장
      const orderInfo = {
        orderId: response.data.orderId,
        product: 'grit-moment',
        price: response.data.amount || 0,
        paymentMethod: 'card',
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
      };
      localStorage.setItem('orderData', JSON.stringify(orderInfo));

      // SDK 모드로 결제 진행
      if (response.data.invocationType === 'SDK' && response.data.portOneSdkPayload) {
        const PortOne = await import('@portone/browser-sdk/v2');
        const payload = response.data.portOneSdkPayload as Parameters<typeof PortOne.requestPayment>[0];

        try {
          const sdkResponse = await PortOne.requestPayment(payload);

          if (!sdkResponse) {
            alert('결제 응답을 받지 못했습니다.');
            return;
          }

          if (sdkResponse.code !== undefined) {
            // 사용자 취소는 조용히 처리
            if (sdkResponse.code === 'USER_CANCEL') {
              return;
            }

            let userMessage = '결제를 처리할 수 없습니다.';
            if (sdkResponse.code === 'FAILURE_TYPE_PG') {
              userMessage = `결제 실패: ${sdkResponse.message || 'PG사 오류'}`;
            } else if (sdkResponse.code === 'FAILURE_TYPE_TIMEOUT') {
              userMessage = '결제 시간이 초과되었습니다.';
            }
            alert(userMessage);
            return;
          }

          // 결제 성공 - 완료 페이지로 이동
          router.push('/order-complete');
        } catch (sdkError: any) {
          console.error('[PortOne SDK] Error during requestPayment:', sdkError);
          alert('결제 창을 여는 중 오류가 발생했습니다.');
        }
      } else {
        alert('결제 방식이 지원되지 않습니다.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>그릿 모먼트</h1>
        <p className={styles.subtitle}>포기하고 싶을 때, 그 순간을 돌파하는 힘</p>
      </section>

      {/* Description Section */}
      <section className={styles.description}>
        <div className={styles.card}>
          <h3>그릿(Grit)이란?</h3>
          <p>
            그릿은 장기적인 목표를 향해 열정과 끈기를 유지하는 능력입니다.
            재능보다 중요한 것은 포기하지 않는 힘, 바로 그릿입니다.
          </p>
        </div>

        <div className={styles.card}>
          <h3>무엇을 얻게 되나요?</h3>
          <ul>
            <li>목표 설정과 달성을 위한 체계적인 프레임워크</li>
            <li>어려운 순간을 돌파하는 멘탈 관리 전략</li>
            <li>함께 성장하는 동료들과의 네트워킹</li>
            <li>1:1 코칭 세션을 통한 개인화된 피드백</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3>프로그램 일정</h3>
          <ul>
            <li><strong>기간:</strong> 2025년 1월 15일 ~ 3월 15일 (8주)</li>
            <li><strong>모임:</strong> 매주 토요일 오전 10시 (온라인)</li>
            <li><strong>정원:</strong> 선착순 20명</li>
          </ul>
        </div>
      </section>

      {/* Pricing & Form Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingCard}>
          <div className={styles.priceInfo}>
            <span className={styles.priceLabel}>참가비</span>
            <div className={styles.priceAmount}>
              <span className={styles.currency}>&#8361;</span>
              <span className={styles.price}>1,200,000</span>
            </div>
            <p className={styles.priceDesc}>8주 프로그램 전체 비용</p>
          </div>

          <div className={styles.installmentBadge}>
            <span className={styles.badge}>무이자 할부</span>
            <p>모든 카드사 3개월 무이자 할부 가능</p>
            <p className={styles.monthly}>월 400,000원 x 3개월</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                이름 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="홍길동"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                이메일 <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="example@email.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                전화번호 <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="010-1234-5678"
                maxLength={13}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리 중...' : '1,200,000원 결제하기'}
            </button>

            <p className={styles.refundPolicy}>
              * 프로그램 시작 7일 전까지 100% 환불 가능
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>

        <div className={styles.faqItem}>
          <h4>Q. 온라인으로만 진행되나요?</h4>
          <p>네, 전 세계 어디서든 참여 가능한 온라인 프로그램입니다. Zoom을 통해 진행됩니다.</p>
        </div>

        <div className={styles.faqItem}>
          <h4>Q. 중간에 참여가 어려운 주가 있으면 어떻게 하나요?</h4>
          <p>모든 세션은 녹화되어 제공되며, 개별 코칭을 통해 놓친 내용을 보완할 수 있습니다.</p>
        </div>

        <div className={styles.faqItem}>
          <h4>Q. 환불은 어떻게 되나요?</h4>
          <p>프로그램 시작 7일 전까지 100% 환불, 시작 후에는 진행된 주차에 비례하여 환불됩니다.</p>
        </div>
      </section>
    </main>
  );
}
