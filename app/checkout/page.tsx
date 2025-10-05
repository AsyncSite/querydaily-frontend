'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createTransferOrder } from '@/lib/api';
import styles from './page.module.css';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get('product') || '';
  const price = searchParams.get('price') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    experience: '',
    resume: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFileName, setResumeFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // 이력서 필수 검증
    if (!formData.resume) newErrors.resume = '이력서/포트폴리오를 업로드해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    setErrors({}); // 기존 에러 클리어

    try {
      // 백엔드 API 호출 (계좌이체 주문 생성)
      const response = await createTransferOrder({
        email: formData.email,
        name: formData.name,
        productCode: 'GROWTH_PLAN', // TODO: product 파라미터를 ProductCode로 매핑
        resume: formData.resume || undefined,
        profile: {
          careerLevel: formData.experience || undefined,
          // techStack, interests 등은 추후 확장 가능
        }
      });

      if (response.success && response.data) {
        // 주문 정보를 localStorage에 저장
        const orderData = {
          orderId: response.data.orderId,
          name: formData.name,
          email: formData.email,
          product,
          price,
          orderDate: new Date().toISOString()
        };

        localStorage.setItem('orderData', JSON.stringify(orderData));

        // 무통장입금 안내 페이지로 이동
        router.push('/payment');
      }
    } catch (error) {
      console.error('Order creation failed:', error);

      const errorMessage = error instanceof Error ? error.message : '주문 처리 중 오류가 발생했습니다';

      // 409 에러 (중복 신청) 처리
      if (errorMessage.includes('409') || errorMessage === 'CONFLICT') {
        alert('이미 신청 내역이 있습니다.\n현재 결제 확인 중이니 잠시만 기다려 주세요.\n\n문의사항이 있으시면 카카오톡으로 문의해 주세요.');
        return;
      }

      setErrors({ email: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
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

          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              이력서/포트폴리오 <span className={styles.required}>*</span>
            </h3>

            <div className={styles.formGroup}>
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
                <option value="middle">4년 ~ 7년</option>
                <option value="senior">8년 이상</option>
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : '무통장입금 진행하기 →'}
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