import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/data/projects";
import { projectThumb } from "@/lib/assets";

/** Resting tilts of the polaroid cards, cycled by grid position. */
const restingTilt = [-2, 1.6, -1.2, 1.8, -1.6, 1.2] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  /** Marks the card for the GSAP entrance in the Work section. */
  animateIn?: boolean;
}

/** Polaroid-style project card linking to the project page. */
export function ProjectCard({ project, index, className, animateIn }: ProjectCardProps) {
  const tilt = restingTilt[index % restingTilt.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-card={animateIn ? "" : undefined}
      data-cursor
      aria-label={`${project.title} — ${project.label}`}
      className={`group block text-inherit no-underline hover:text-inherit ${className ?? ""}`}
    >
      <article
        className="relative rounded-md bg-cream px-3 pt-3 pb-6 text-navy shadow-[0_22px_40px_-22px_rgba(0,0,0,.7)] transition-[translate,rotate,box-shadow] duration-500 ease-spring [rotate:var(--tilt)] group-hover:-translate-y-2 group-hover:[rotate:0deg] group-hover:shadow-[0_34px_50px_-22px_rgba(0,0,0,.75)] max-[859px]:[rotate:0deg]"
        style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
      >
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -left-4 h-6 w-[84px] -rotate-[38deg] bg-cream/60"
        />
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -right-4 h-6 w-[84px] rotate-[38deg] bg-cream/60"
        />

        <div
          className="relative aspect-[4/3.05] rounded-[14px] p-2"
          style={{ background: project.frameColor }}
        >
          <div className="relative size-full overflow-hidden rounded-[10px] bg-navy">
            <SafeImage
              src={projectThumb(project.image)}
              alt=""
              fill
              sizes="(min-width: 1000px) 380px, (min-width: 620px) 45vw, 92vw"
              style={{ objectPosition: project.imagePosition ?? "center" }}
              className="scale-[1.02] object-cover transition-transform duration-700 group-hover:scale-[1.08]"
              fallbackColor="#17244C"
            />
          </div>
          {project.isCaseStudy && (
            <span className="absolute top-5 left-5 rounded-lg border-[1.5px] border-navy bg-yellow px-2 py-1 font-mono text-[10px] tracking-[.14em] text-navy">
              CASE STUDY
            </span>
          )}
        </div>

        <div className="px-1.5 pt-5">
          <p className="text-[13px] font-semibold text-blue">{project.label}</p>
          <h3 className="mt-1.5 line-clamp-2 h-[2.1em] text-[clamp(19px,1.7vw,25px)] leading-[1.05] font-bold">
            {project.title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 hidden size-[70px] origin-bottom-right scale-0 transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(.34,1.2,.5,1)] group-hover:scale-100 min-[860px]:block"
        >
          <span className="absolute inset-0 bg-navy [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          <span className="absolute inset-0 bg-[linear-gradient(135deg,#D9D3C3_0%,#EFEADD_45%,#FFFDF6_100%)] [clip-path:polygon(0_0,100%_0,0_100%)]" />
        </span>
      </article>
    </Link>
  );
}
