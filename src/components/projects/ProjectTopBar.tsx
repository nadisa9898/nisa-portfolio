import Link from "next/link";

interface ProjectTopBarProps {
  counter: string;
}

/** Sticky bar on project pages: back link, position counter, close button. */
export function ProjectTopBar({ counter }: ProjectTopBarProps) {
  return (
    <div className="sticky top-0 z-[700] flex items-center justify-between gap-4 border-b-[1.5px] border-navy/10 bg-cream/85 px-[clamp(16px,4vw,40px)] py-3.5 backdrop-blur-[14px]">
      <Link
        href="/projects"
        className="rounded-full border-[1.5px] border-navy px-4 py-2 text-sm font-semibold text-navy no-underline transition-colors hover:bg-navy hover:text-cream"
      >
        ← Back to work
      </Link>
      <p className="font-mono text-xs tracking-[.14em] text-ink-soft">{counter}</p>
      <Link
        href="/projects"
        aria-label="Close project"
        className="grid size-11 place-items-center rounded-full bg-navy text-lg text-cream no-underline hover:text-cream"
      >
        ✕
      </Link>
    </div>
  );
}
