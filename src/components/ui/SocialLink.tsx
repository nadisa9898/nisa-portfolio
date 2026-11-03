import type { SocialLinkData } from "@/data/socials";

interface SocialLinkProps {
  social: SocialLinkData;
  className?: string;
}

/** Round social button: the abbreviation flips to the brand mark on hover or focus (always shown on touch). */
export function SocialLink({ social, className }: SocialLinkProps) {
  const { label, abbr, href, external, viewBox, paths } = social;
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      data-magnetic
      data-cursor
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative box-content grid size-12 place-items-center overflow-hidden rounded-full border-[1.5px] border-sky-light/50 font-mono text-[13px] text-cream no-underline transition-[background-color,border-color] duration-[400ms] ease-reveal hover:border-cream hover:bg-cream hover:text-cream focus-visible:border-cream focus-visible:bg-cream [@media(hover:none)]:border-cream [@media(hover:none)]:bg-cream ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center transition-[opacity,transform] duration-[450ms] [transition-timing-function:cubic-bezier(.3,1.4,.5,1)] group-hover:-translate-y-3.5 group-hover:scale-60 group-hover:opacity-0 group-focus-visible:-translate-y-3.5 group-focus-visible:scale-60 group-focus-visible:opacity-0 [@media(hover:none)]:opacity-0"
      >
        {abbr}
      </span>
      <svg
        viewBox={viewBox}
        aria-hidden="true"
        className="absolute size-[22px] translate-y-3.5 scale-40 -rotate-[20deg] opacity-0 transition-[opacity,transform] duration-[550ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:rotate-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:scale-100 [@media(hover:none)]:rotate-0 [@media(hover:none)]:opacity-100"
      >
        {paths.map((p) => (
          <path key={p.d} d={p.d} fill={p.fill} />
        ))}
      </svg>
    </a>
  );
}
