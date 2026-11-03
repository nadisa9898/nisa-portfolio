import type { CSSProperties } from "react";

interface StarProps {
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/** Five-point star used throughout the design. */
export function Star({ color = "#FFD84D", stroke, strokeWidth = 1.4, className, style }: StarProps) {
  return (
    <svg viewBox="-11 -11 22 22" aria-hidden="true" className={className} style={style}>
      <polygon
        points="0,-10 2.6,-3.6 9.5,-3.1 4.3,1.4 5.9,8.1 0,4.5 -5.9,8.1 -4.3,1.4 -9.5,-3.1 -2.6,-3.6"
        fill={color}
        stroke={stroke}
        strokeWidth={stroke ? strokeWidth : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}
