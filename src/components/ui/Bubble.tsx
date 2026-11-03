import type { CSSProperties } from "react";

interface BubbleProps {
  className?: string;
  style?: CSSProperties;
}

/** Translucent floating bubble. */
export function Bubble({ className, style }: BubbleProps) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full border-[1.5px] border-white/95 ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(circle at 32% 30%,#fff 0 12%,rgba(255,255,255,.25) 13%,rgba(142,216,248,.25) 70%)",
        boxShadow: "inset 0 0 10px rgba(48,81,217,.2)",
        ...style,
      }}
    />
  );
}
