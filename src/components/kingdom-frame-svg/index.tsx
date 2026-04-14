export const KingdomFrameSVG = () => (
  <svg
    viewBox="0 0 680 260"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    <defs>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5d060" />
        <stop offset="40%" stopColor="#c8960c" />
        <stop offset="70%" stopColor="#f0c040" />
        <stop offset="100%" stopColor="#9a6f08" />
      </linearGradient>
      <linearGradient id="goldInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe080" />
        <stop offset="50%" stopColor="#d4a010" />
        <stop offset="100%" stopColor="#b07800" />
      </linearGradient>
    </defs>
    <path
      d="M 130 240 L 80 240 L 60 220 L 60 130 Q 60 40 340 30 Q 620 40 620 130 L 620 220 L 600 240 L 130 240 Z"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1.5"
    />
    <path
      d="M 138 228 L 88 228 L 72 214 L 72 132 Q 72 52 340 44 Q 608 52 608 132 L 608 214 L 592 228 L 138 228 Z"
      fill="url(#goldInner)"
      stroke="#c8960c"
      strokeWidth="1"
    />
    <path
      d="M 143 220 L 95 220 L 82 208 L 82 134 Q 82 62 340 54 Q 598 62 598 134 L 598 208 L 585 220 L 143 220 Z"
      fill="#2a1a00"
      stroke="#c8960c"
      strokeWidth="0.8"
    />
    <polygon
      points="340,18 350,30 340,42 330,30"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
    <polygon points="340,22 347,30 340,38 333,30" fill="#ffe080" />
    <polygon
      points="340,242 355,252 340,262 325,252"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
    <polygon points="340,246 351,252 340,258 329,252" fill="#ffe080" />
    <path
      d="M 100 110 L 78 95 L 68 115 L 90 118 Z"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
    <path
      d="M 580 110 L 602 95 L 612 115 L 590 118 Z"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
    <path
      d="M 62 220 Q 50 230 55 245 Q 65 255 80 248 L 88 228 L 62 220 Z"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
    <path
      d="M 618 220 Q 630 230 625 245 Q 615 255 600 248 L 592 228 L 618 220 Z"
      fill="url(#gold)"
      stroke="#7a5000"
      strokeWidth="1"
    />
  </svg>
);
