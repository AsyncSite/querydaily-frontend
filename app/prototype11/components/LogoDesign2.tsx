// 디자인 2: 다이나믹 에너지 - 더 기울이고, Q 강조, 역동적인 라인
export default function LogoDesign2() {
  return (
    <svg width="190" height="45" viewBox="0 0 190 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-4 95 22)">
        {/* Q - 매우 볼드 */}
        <text
          x="10"
          y="28"
          fontFamily="'Raleway', sans-serif"
          fontSize="29"
          fontWeight="800"
          fill="#000000"
          fontStyle="italic"
        >
          Q
        </text>
        {/* ueryDaily */}
        <text
          x="30"
          y="28"
          fontFamily="'Raleway', sans-serif"
          fontSize="27"
          fontWeight="600"
          fill="#000000"
          letterSpacing="-0.8"
          fontStyle="italic"
        >
          ueryDaily
        </text>
      </g>
      {/* 역동적인 라인 - 각도 맞춰서 */}
      <line x1="8" y1="31" x2="50" y2="28" stroke="#000000" strokeWidth="2" opacity="0.18"/>
    </svg>
  );
}
