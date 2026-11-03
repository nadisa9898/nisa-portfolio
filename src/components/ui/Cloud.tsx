import type { CSSProperties } from "react";

interface CloudProps {
  className?: string;
  style?: CSSProperties;
}

/** Soft white cloud: a pill bar with two overlapping circles rising above it. */
export function Cloud({ className, style }: CloudProps) {
  return (
    <div aria-hidden="true" className={`relative ${className ?? ""}`} style={style}>
      <span className="absolute bottom-0 left-0 h-1/2 w-full rounded-full bg-white" />
      <span className="absolute bottom-[14%] left-[13%] aspect-square w-[32%] rounded-full bg-white" />
      <span className="absolute bottom-[6%] left-[38%] aspect-square w-[48%] rounded-full bg-white" />
    </div>
  );
}
