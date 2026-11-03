import type { CSSProperties } from "react";

interface SectionPillProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Small outlined label with a leading dash, used to introduce a detail-page section. */
export function SectionPill({ children, className, style }: SectionPillProps) {
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-blue ${className ?? ""}`}
    >
      <span aria-hidden="true" className="h-[1.5px] w-2.5 bg-current" />
      {children}
    </span>
  );
}
