import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "blue";
  className?: string;
  style?: CSSProperties;
}

const variants = {
  solid: {
    box: "border-2 border-navy bg-navy text-cream hover:text-cream shadow-[0_14px_30px_-12px_rgba(23,36,76,.6)]",
    circle: "bg-sky text-navy",
  },
  outline: {
    box: "border-2 border-navy bg-cream/50 text-navy hover:bg-cream hover:text-navy",
    circle: "bg-navy text-cream",
  },
  blue: {
    box: "bg-blue text-cream hover:text-cream shadow-hard-5",
    circle: "bg-cream text-blue",
  },
} as const;

/** Pill button with a circular arrow, shared by Hero and About. */
export function CtaButton({ href, children, variant = "solid", className, style }: CtaButtonProps) {
  const v = variants[variant];
  return (
    <Link
      href={href}
      data-magnetic
      data-cursor
      style={style}
      className={`inline-flex items-center justify-between gap-4 rounded-full py-2.5 pr-2.5 pl-6 text-[17px] font-bold no-underline transition-transform duration-300 ease-spring hover:-translate-y-0.5 ${v.box} ${className ?? ""}`}
    >
      {children}
      <span aria-hidden="true" className={`grid size-10 place-items-center rounded-full text-lg ${v.circle}`}>
        →
      </span>
    </Link>
  );
}
