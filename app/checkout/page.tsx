'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get('product') || '';
  const price = searchParams.get('price') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    experience: '',
    resumeUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    if (!formData.phone) newErrors.phone = '연락처를 입력해주세요';
    else if (!/^010-?\d{3,4}-?\d{4}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '올바른 휴대폰 번호 형식이 아닙니다';
    }

    if (product === '크리티컬 히트' || product === '이력서 분석 리포트') {
      if (!formData.resumeUrl) newErrors.resumeUrl = '이력서 URL을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // 주문 정보를 localStorage에 저장
    const orderData = {
      ...formData,
      product,
      price,
      orderDate: new Date().toISOString(),
      orderId: `QD${Date.now()}`
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));

    // 무통장입금 안내 페이지로 이동
    router.push('/payment');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>주문 정보 입력</h1>

        <div className={styles.orderInfo}>
          <div className={styles.productInfo}>
            <span className={styles.productLabel}>선택한 상품</span>
            <h2 className={styles.productName}>{product}</h2>
            <span className={styles.productPrice}>{price}</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기본 정보</h3>

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
                연락처 <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="010-1234-5678"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>추가 정보</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>회사</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
                placeholder="현재 재직 중인 회사 (선택)"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>직무</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={styles.input}
                placeholder="백엔드 개발자 (선택)"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>경력</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">선택해주세요</option>
                <option value="junior">신입 ~ 3년</option>
                <option value="mid">4년 ~ 7년</option>
                <option value="senior">8년 이상</option>
              </select>
            </div>
          </div>

          {(product === '크리티컬 히트' || product === '이력서 분석 리포트') && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>이력서 정보</h3>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  이력서 URL <span className={styles.required}>*</span>
                </label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://notion.so/... 또는 Google Docs URL"
                />
                {errors.resumeUrl && <span className={styles.error}>{errors.resumeUrl}</span>}
                <p className={styles.hint}>
                  Notion, Google Docs, PDF 링크 등을 입력해주세요
                </p>
              </div>
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            무통장입금 진행하기 →
          </button>
        </form>
      </div>
    </main>
  );
}