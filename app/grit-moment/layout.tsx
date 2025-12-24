import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '그릿 모먼트 | 8주 성장 프로그램',
  description: '포기하고 싶을 때, 그 순간을 돌파하는 힘. 8주간의 압축 성장 프로그램.',
  openGraph: {
    title: '그릿 모먼트 | 8주 성장 프로그램',
    description: '포기하고 싶을 때, 그 순간을 돌파하는 힘. 8주간의 압축 성장 프로그램.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '그릿 모먼트 | 8주 성장 프로그램',
    description: '포기하고 싶을 때, 그 순간을 돌파하는 힘. 8주간의 압축 성장 프로그램.',
  },
};

export default function GritMomentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
