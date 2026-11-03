import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/data/projects";
import { projectThumb } from "@/lib/assets";

interface NextProjectBarProps {
  project: Project;
}

/** Closing bar that links to the next project in the list. */
export function NextProjectBar({ project }: NextProjectBarProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor
      data-cursor-label="Next"
      className="group block bg-navy px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,100px)] text-cream no-underline hover:text-cream focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-sky"
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-8">
        <div className="max-w-[760px]">
          <p className="font-mono text-xs tracking-[.16em] text-sky">NEXT PROJECT</p>
          <p className="mt-3.5 text-[clamp(44px,7vw,110px)] leading-[.88] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            {project.title}
          </p>
        </div>
        <div className="relative h-[220px] w-[min(340px,80vw)] overflow-hidden rounded-[26px] border-[3px] border-sky">
          <SafeImage
            src={projectThumb(project.image)}
            alt=""
            fill
            sizes="340px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            fallbackColor="#17244C"
          />
        </div>
      </div>
    </Link>
  );
}
