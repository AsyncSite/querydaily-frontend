'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/prototype11/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👀</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">면접톡 시작하기</h1>
          <p className="text-gray-600">매일 3문제로 성장하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              placeholder="홍길동"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              placeholder="8자 이상"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            무료로 시작하기
          </button>
        </form>

        {/* Benefits */}
        <div className="mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>매일 3문제만, 부담 없이</span>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>현직자 답변 무제한 엿보기</span>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>공유하면 PC 상품 할인</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/prototype11/auth/login" className="text-indigo-600 font-medium hover:underline">
              로그인
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/prototype11" className="text-sm text-gray-500 hover:text-gray-700">
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
