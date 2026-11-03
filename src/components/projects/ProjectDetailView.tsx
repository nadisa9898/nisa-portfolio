import { NextProjectBar } from "@/components/projects/NextProjectBar";
import { ProjectTopBar } from "@/components/projects/ProjectTopBar";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionPill } from "@/components/ui/SectionPill";
import type { ProjectDetail } from "@/data/projectDetails";
import { projects, type Project, getNextProject } from "@/data/projects";
import { projectImage } from "@/lib/assets";

interface ProjectDetailViewProps {
  project: Project;
  detail: ProjectDetail;
}

const toolChip = {
  Figma: { color: "#A259FF", letter: "F" },
  Claude: { color: "#C15F3C", letter: "C" },
} as const;

const container = "mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] pt-[clamp(64px,8vw,110px)]";
const heading =
  "text-[clamp(30px,3.4vw,48px)] leading-[1.05] font-semibold tracking-[-.02em] text-ink-deep [text-wrap:balance]";
const copy = "text-[clamp(16px,1.25vw,18px)] leading-[1.6] text-ink-copy [text-wrap:pretty]";
const metaLabel = "text-xs text-ink-muted";

/** Detail template used by the 12 projects without a full case study. */
export function ProjectDetailView({ project, detail }: ProjectDetailViewProps) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const tool = toolChip[detail.tool];
  const liveLabel = /\/login|\/\/sa\./.test(project.url) ? "View Live App" : "View Live Website";

  return (
    <div className="min-h-screen bg-white text-ink-deep">
      <ProjectTopBar counter={`PROJECT ${String(index + 1).padStart(2, "0")} / ${projects.length}`} />

      <header
        className="overflow-hidden px-[clamp(20px,5vw,64px)] pt-[clamp(20px,3vw,32px)]"
        style={{ background: project.background }}
      >
        <div className="flex justify-between gap-4 text-[13px] font-medium text-ink-body">
          <span>{project.category}</span>
          <span>Project</span>
        </div>
        <div className="pt-[clamp(40px,6vw,76px)] text-center">
          <p className="text-[clamp(15px,1.4vw,19px)] font-medium text-ink-body">{project.label}</p>
          <h1 className="mx-auto mt-3.5 max-w-[1100px] text-[clamp(44px,7.6vw,120px)] leading-[.95] font-semibold tracking-[-.035em] [text-wrap:balance]">
            {project.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-body [text-wrap:pretty]">
            {detail.intro}
          </p>
        </div>
        <figure className="relative mx-auto mt-[clamp(36px,5vw,60px)] max-w-[1100px] overflow-hidden rounded-t-3xl bg-white leading-[0] shadow-[0_-10px_60px_-20px_rgba(23,36,76,.35)]">
          <SafeImage
            src={projectImage(project.image)}
            alt={detail.heroAlt}
            width={1600}
            height={1000}
            priority
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="block h-auto w-full"
            fallbackColor="rgba(255,255,255,.5)"
          />
          {detail.heroTag && (
            <figcaption className="absolute top-4 left-4 rounded-full bg-navy px-3.5 py-2 font-mono text-[11px] leading-none tracking-[.14em] text-cream">
              {detail.heroTag}
            </figcaption>
          )}
        </figure>
      </header>

      <section className={container}>
        <Reveal className="grid items-start gap-x-16 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <div className="flex flex-col gap-5">
            <SectionPill>Overview</SectionPill>
            <h2 className={heading}>{detail.overviewTitle}</h2>
            <p className={`${copy} max-w-[560px]`}>{detail.overview}</p>
          </div>
          <aside className="grid gap-x-8 gap-y-6 rounded-3xl border border-line-soft bg-surface p-7 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            <dl className="contents">
              <div>
                <dt className={metaLabel}>Category</dt>
                <dd className="mt-1 text-[17px] leading-[1.3] font-semibold">{project.category}</dd>
              </div>
              <div>
                <dt className={metaLabel}>Project Timeline</dt>
                <dd
                  className={`mt-1 text-[17px] leading-[1.3] font-semibold ${project.timeline ? "" : "text-ink-muted"}`}
                >
                  {project.timeline || "Timeline not available"}
                </dd>
              </div>
              <div>
                <dt className={metaLabel}>Tool used</dt>
                <dd className="mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-3 pl-2 text-[15px] font-semibold">
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] place-items-center rounded-md text-[11px] font-extrabold text-white"
                    style={{ background: tool.color }}
                  >
                    {tool.letter}
                  </span>
                  {detail.tool}
                </dd>
              </div>
            </dl>
            {project.url && (
              <div className="col-span-full">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${liveLabel} (opens in a new tab)`}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-navy bg-navy py-2 pr-2 pl-[22px] text-base leading-none font-bold whitespace-nowrap text-cream no-underline shadow-[4px_4px_0_var(--color-sky)] transition-[transform,box-shadow,background-color] duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-blue hover:text-cream hover:shadow-[6px_6px_0_var(--color-sky)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                >
                  {liveLabel}
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-yellow text-navy">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 fill-none stroke-current stroke-[2.6] [stroke-linecap:round] [stroke-linejoin:round]"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              </div>
            )}
          </aside>
        </Reveal>
      </section>

      <section className={container}>
        <Reveal className="grid items-start gap-x-16 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <div className="flex flex-col gap-5">
            <SectionPill>Project goal</SectionPill>
            <h2 className={heading}>{detail.goalTitle}</h2>
          </div>
          <p className={`${copy} max-w-[600px] pt-1.5`}>{detail.goal}</p>
        </Reveal>
      </section>

      <section className={container}>
        <Reveal>
          <SectionPill className="mb-8">Problem &amp; solution</SectionPill>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
            <article className="flex flex-col gap-3.5 rounded-[28px] border border-[#F7D4E6] bg-[#FFF4F9] p-[clamp(24px,3vw,40px)]">
              <p className="font-mono text-xs tracking-[.16em] text-rose-deep">THE PROBLEM</p>
              <h3 className="text-[clamp(22px,2vw,28px)] leading-[1.15] font-semibold text-ink-deep">
                {detail.problemTitle}
              </h3>
              <p className={copy}>{detail.problem}</p>
            </article>
            <article className="flex flex-col gap-3.5 rounded-[28px] border border-[#CFE3FA] bg-[#EEF6FF] p-[clamp(24px,3vw,40px)]">
              <p className="font-mono text-xs tracking-[.16em] text-blue-deep">THE SOLUTION</p>
              <h3 className="text-[clamp(22px,2vw,28px)] leading-[1.15] font-semibold text-ink-deep">
                {detail.solutionTitle}
              </h3>
              <p className={copy}>{detail.solution}</p>
            </article>
          </div>
        </Reveal>
      </section>

      <div aria-hidden="true" className="h-[clamp(72px,9vw,120px)]" />
      <NextProjectBar project={getNextProject(project.slug)} />
    </div>
  );
}
