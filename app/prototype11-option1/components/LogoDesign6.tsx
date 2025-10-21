// 디자인 6: 초미니멀 - 극도로 타이트, 극도로 단순, 극도로 정제
export default function LogoDesign6() {
  return (
    <svg width="170" height="38" viewBox="0 0 170 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-1.8 85 19)">
        <text
          x="10"
          y="25"
          fontFamily="'Raleway', sans-serif"
          fontSize="25"
          fontWeight="600"
          fill="#000000"
          letterSpacing="-2"
          fontStyle="italic"
        >
          QueryDaily
        </text>
      </g>
      {/* 극미니멀 라인 - 짧고 얇게 */}
      <line x1="8" y1="27.5" x2="30" y2="27" stroke="#000000" strokeWidth="0.8" opacity="0.15"/>
    </svg>
  );
}
