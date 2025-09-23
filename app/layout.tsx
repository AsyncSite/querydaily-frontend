import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QueryDaily - 매일 성장하는 개발자를 위한 맞춤형 면접 트레이닝',
  description: '당신의 Java/Spring 프로젝트 경험을 날카로운 무기로. 3일 무료 챌린지로 면접 자신감을 키우세요.',
  keywords: '개발자 면접, Java 면접, Spring 면접, 기술 면접, 면접 준비, 백엔드 면접',
  authors: [{ name: 'QueryDaily' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'QueryDaily - 매일 성장하는 개발자를 위한 맞춤형 면접 트레이닝',
    description: '당신의 Java/Spring 프로젝트 경험을 날카로운 무기로. 3일 무료 챌린지로 면접 자신감을 키우세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'QueryDaily',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QueryDaily - 맞춤형 면접 트레이닝',
    description: '매일 아침, 당신만을 위한 날카로운 면접 질문을 배달합니다.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d0d0d',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}