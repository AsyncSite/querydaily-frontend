import { redirect } from 'next/navigation';

export default function PrototypeIndex() {
  // 모바일 앱의 메인은 대시보드
  redirect('/prototype/dashboard');
}
