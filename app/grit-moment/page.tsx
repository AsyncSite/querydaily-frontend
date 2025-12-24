'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { createOrder, getProduct, ProductCode, ProductInfo } from '@/lib/api';

export default function GritMomentPage() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productInfo = await getProduct(ProductCode.GRIT_MOMENT);
      setProduct(productInfo);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

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
        phone: formData.phone,
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

        // 무이자 3개월 고정 할부 옵션
        const installmentOption = {
          monthOption: {
            fixedMonth: 3,
          },
          freeInstallmentPlans: [
            { cardCompany: 'CARD_COMPANY_SAMSUNG', months: [3] },
            { cardCompany: 'CARD_COMPANY_HYUNDAI', months: [3] },
            { cardCompany: 'CARD_COMPANY_SHINHAN', months: [3] },
            { cardCompany: 'CARD_COMPANY_KOOKMIN', months: [3] },
            { cardCompany: 'CARD_COMPANY_LOTTE', months: [3] },
            { cardCompany: 'CARD_COMPANY_BC', months: [3] },
            { cardCompany: 'CARD_COMPANY_NH', months: [3] },
            { cardCompany: 'CARD_COMPANY_HANA', months: [3] },
            { cardCompany: 'CARD_COMPANY_WOORI', months: [3] },
            { cardCompany: 'CARD_COMPANY_CITI', months: [3] },
            { cardCompany: 'CARD_COMPANY_KAKAO', months: [3] },
          ],
        };

        const payload = {
          ...response.data.portOneSdkPayload,
          installment: installmentOption,
        } as unknown as Parameters<typeof PortOne.requestPayment>[0];

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

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>로딩 중...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={styles.main}>
        <div className={styles.errorMsg}>상품 정보를 불러올 수 없습니다.</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>{product.displayName}</h1>
        <p className={styles.subtitle}>8주간의 압축 성장, 함께 설계합니다</p>
      </section>

      {/* Pricing & Form Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingCard}>
          <div className={styles.priceInfo}>
            <span className={styles.priceLabel}>8주 프로그램 참가비</span>
            <div className={styles.priceAmount}>
              <span className={styles.currency}>&#8361;</span>
              <span className={styles.price}>{product.currentPrice.toLocaleString('ko-KR')}</span>
            </div>
            <p className={styles.installmentInfo}>
              3개월 무이자 할부 시 월 {Math.floor(product.currentPrice / 3).toLocaleString('ko-KR')}원
            </p>
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
              {isSubmitting ? '처리 중...' : `${formatPrice(product.currentPrice)} 결제하기`}
            </button>

            <p className={styles.refundPolicy}>
              * 사전 인터뷰를 통해 상호 적합성을 확인한 후 결제가 진행됩니다
            </p>
            <p className={styles.refundPolicy}>
              * 결제 후 환불이 불가하오니 신중하게 결정해주세요
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
