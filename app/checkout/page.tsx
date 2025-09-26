'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

function CheckoutContent() {
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
    resume: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFileName, setResumeFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 파일 입력 처리
    if (name === 'resume' && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files && files[0]) {
        const file = files[0];

        // 파일 검증
        if (!file.name.toLowerCase().endsWith('.pdf')) {
          setErrors(prev => ({ ...prev, resume: 'PDF 형식만 업로드 가능합니다' }));
          e.target.value = '';
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
          setErrors(prev => ({ ...prev, resume: `파일 크기가 ${sizeInMB}MB입니다. 5MB 이하로 압축해주세요.` }));
          e.target.value = '';
          return;
        }

        setFormData(prev => ({ ...prev, resume: file }));
        setResumeFileName(file.name);
        if (errors.resume) {
          setErrors(prev => ({ ...prev, resume: '' }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
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

    // 이력서는 선택사항이므로 검증하지 않음

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // 주문 정보를 localStorage에 저장 (파일 정보는 파일명만 저장)
    const orderData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      experience: formData.experience,
      resumeFileName: resumeFileName || '',
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
              <h3 className={styles.sectionTitle}>
                이력서/포트폴리오 <span className={styles.optional}>(선택)</span>
              </h3>

              <div className={styles.infoBox}>
                💡 이미 베타 신청 시 제출하셨다면 다시 제출하지 않으셔도 됩니다.
                <br />
                최신 이력서로 업데이트하고 싶으신 경우에만 업로드해주세요.
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이력서/포트폴리오 PDF</label>
                <div className={styles.fileUpload}>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="resume" className={styles.fileLabel}>
                    {resumeFileName || '📎 PDF 파일 선택'}
                  </label>
                </div>
                {errors.resume && <span className={styles.error}>{errors.resume}</span>}
                <p className={styles.hint}>PDF 형식만 지원 (최대 5MB)</p>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        로딩 중...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}