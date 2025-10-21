// 디자인 2: 다이나믹 에너지 - Q 강조, 역동적인 라인
export default function LogoDesign2() {
  return (
    <svg width="190" height="40" viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-1.5 95 20)">
        {/* Q - 매우 볼드 */}
        <text
          x="10"
          y="26"
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
          y="26"
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
    </svg>
  );
}
