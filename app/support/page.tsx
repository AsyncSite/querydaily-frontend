'use client';

import Link from 'next/link';
import styles from './page.module.css';

const supportContent = `
<h1>QueryDaily 고객 지원</h1>
<p><strong>Customer Support</strong></p>

<h2>문의하기 (Contact Us)</h2>
<p>QueryDaily 이용 중 문의사항이 있으시면 아래 이메일로 연락해 주세요.</p>
<p><strong>이메일: asyncsite@gmail.com</strong></p>
<p>운영시간: 평일 오전 10시 ~ 오후 6시 (한국시간 기준)</p>
<p>답변 소요시간: 영업일 기준 24시간 이내</p>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>Q: QueryDaily는 어떤 서비스인가요?</h3>
<p>QueryDaily는 매일 개발 관련 질문을 제공하여 면접 준비를 도와주는 서비스입니다. 이력서를 분석하여 맞춤형 질문을 생성하고, 다른 사용자들의 답변을 통해 다양한 관점을 배울 수 있습니다.</p>

<h3>Q: 어떻게 시작하나요?</h3>
<p>앱을 다운로드한 후 이메일 또는 소셜 계정(카카오, Apple)으로 가입하시면 됩니다. 가입 후 바로 오늘의 질문에 답변을 작성할 수 있습니다.</p>

<h3>Q: 무료로 사용할 수 있나요?</h3>
<p>기본 기능은 무료로 제공됩니다. 프리미엄 기능(AI 피드백, 추가 질문 등)은 구독을 통해 이용하실 수 있습니다.</p>

<h3>Q: 구독을 취소하려면 어떻게 하나요?</h3>
<p>iOS 앱에서 구독한 경우 기기의 설정 > Apple ID > 구독에서 취소할 수 있습니다. 구독 취소 후에도 현재 구독 기간이 끝날 때까지는 프리미엄 기능을 이용하실 수 있습니다.</p>

<h3>Q: 내 데이터는 안전한가요?</h3>
<p>네, 안전합니다. 모든 데이터는 암호화되어 저장되며, 개인정보보호법을 준수합니다. 자세한 내용은 <a href="/privacy">개인정보처리방침</a>을 참고해 주세요.</p>

<h3>Q: 계정을 삭제하려면 어떻게 하나요?</h3>
<p>앱 내 설정 > 계정 관리에서 계정 삭제를 요청하실 수 있습니다. 또는 asyncsite@gmail.com으로 계정 삭제 요청을 보내주시면 영업일 기준 7일 이내에 처리해 드립니다.</p>

<h3>Q: 앱이 제대로 작동하지 않아요</h3>
<p>다음 방법을 시도해 보세요:</p>
<ol>
  <li>앱을 완전히 종료 후 다시 실행</li>
  <li>앱을 최신 버전으로 업데이트</li>
  <li>기기를 재시작</li>
  <li>문제가 계속되면 asyncsite@gmail.com으로 문의해 주세요</li>
</ol>

<h2>버그 신고 및 기능 제안</h2>
<p>버그를 발견하셨거나 새로운 기능을 제안하고 싶으시다면 asyncsite@gmail.com으로 알려주세요. 여러분의 피드백은 QueryDaily를 더 좋은 서비스로 만드는 데 큰 도움이 됩니다.</p>

<h2>관련 문서</h2>
<ul>
  <li><a href="/terms">이용약관</a></li>
  <li><a href="/privacy">개인정보처리방침</a></li>
</ul>

<h2>앱 정보</h2>
<p><strong>앱 이름:</strong> QueryDaily</p>
<p><strong>개발사:</strong> AsyncSite</p>
<p><strong>이메일:</strong> asyncsite@gmail.com</p>
`;

export default function SupportPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← 돌아가기
        </Link>
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: supportContent }} />
      </div>
    </div>
  );
}
