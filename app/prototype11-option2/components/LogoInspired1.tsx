// 인스파이어 1: 필기체 느낌 - 흐르는 듯한 커넥션, 자연스러운 필기
export default function LogoInspired1() {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 흐르는 베이스 라인 */}
      <path
        d="M 8 28 Q 50 25, 90 27 T 160 26"
        stroke="#000000"
        strokeWidth="0.5"
        fill="none"
        opacity="0.1"
      />

      {/* QueryDaily - 손글씨 스타일 */}
      <text
        x="10"
        y="26"
        fontFamily="'Raleway', 'Brush Script MT', cursive"
        fontSize="26"
        fontWeight="500"
        fill="#000000"
        letterSpacing="-0.5"
        fontStyle="italic"
      >
        QueryDaily
      </text>

      {/* Q 아래 작은 점 - 물음표 느낌 */}
      <circle cx="11" cy="30" r="1.2" fill="#000000" opacity="0.3"/>
    </svg>
  );
}
