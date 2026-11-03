import { NextProjectBar } from "@/components/projects/NextProjectBar";
import { ProjectTopBar } from "@/components/projects/ProjectTopBar";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { caseTags, type CaseStudy, type CaseStudyTheme, type CaseTagKey } from "@/data/caseStudies";
import { caseStudySlugs, getNextProject, type Project } from "@/data/projects";
import { caseStudyImage } from "@/lib/assets";

interface CaseStudyViewProps {
  project: Project;
  study: CaseStudy;
  theme: CaseStudyTheme;
}

/** Readable text color for a swatch background. */
function onColor(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 150 ? "#17244C" : "#FFFFFF";
}

function SectionPill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 self-start rounded-full border border-[#DDE1E8] px-3.5 py-1.5 text-[13px] font-semibold"
      style={{ color }}
    >
      <span aria-hidden="true" className="h-px w-2.5 bg-current" />
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[820px] text-[clamp(30px,3.6vw,52px)] leading-[1.05] font-semibold tracking-[-.02em] text-[#101828]">
      {children}
    </h2>
  );
}

function TagChip({ label, bg }: { label: string; bg: string }) {
  return (
    <span className="mb-3 inline-block rounded-md px-2 py-1 font-mono text-[10px] tracking-[.12em] text-[#101828]" style={{ background: bg }}>
      {label}
    </span>
  );
}

function tagFor(tag?: string) {
  if (!tag) return null;
  const known = caseTags[tag as CaseTagKey];
  return known ? <TagChip label={known.label} bg={known.bg} /> : <TagChip label={tag} bg="#E4EEFF" />;
}

function CsImage({ name, alt, className, contain }: { name: string; alt: string; className?: string; contain?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <SafeImage
        src={caseStudyImage(name)}
        alt={alt}
        fill
        sizes="(min-width: 1100px) 1100px, 100vw"
        className={contain ? "object-contain" : "object-cover"}
        fallbackColor="#E4E8F0"
      />
    </div>
  );
}

/** Full case-study page for the six rich case studies. */
export function CaseStudyView({ project, study, theme }: CaseStudyViewProps) {
  const accent = theme.acc ?? theme.hero;
  const dim = theme.dim ?? "#8A93A6";
  const index = caseStudySlugs.indexOf(project.slug);
  const pills = study.pills ?? {};
  const titles = study.titles ?? {};
  const liveLabel = /\/login|\/\/sa\./.test(project.url) ? "View Live App" : "View Live Website";
  const rest = study.finalRest ?? [];
  const paletteRows = Math.ceil(theme.pal.length / 2);

  return (
    <div className="min-h-screen bg-white text-[#101828]">
      <ProjectTopBar counter={`CASE STUDY ${String(index + 1).padStart(2, "0")} / ${String(caseStudySlugs.length).padStart(2, "0")}`} />

      <header className="px-[clamp(16px,4vw,40px)] pt-[clamp(100px,12vw,150px)]" style={{ background: theme.hero, color: theme.ink }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="flex justify-between text-[13px] opacity-80">
            <span>{project.category}</span>
            <span>Case Study</span>
          </div>
          <p className="mt-10 text-center font-mono text-xs tracking-[.2em] uppercase opacity-80">{study.heroEyebrow}</p>
          <h1 className="mx-auto mt-5 max-w-[1100px] text-center text-[clamp(48px,8.4vw,136px)] leading-[.95] font-semibold tracking-[-.035em] [text-wrap:balance]">
            {project.title}
          </h1>
          {study.heroBody && (
            <p className="mx-auto mt-6 max-w-[640px] text-center text-lg leading-normal opacity-90">{study.heroBody}</p>
          )}
        </div>
        <CsImage
          name={study.hero}
          alt={study.heroAlt}
          className="mx-auto mt-12 aspect-[16/10] max-w-[1100px] rounded-t-3xl bg-white/20 shadow-[0_-10px_60px_-20px_rgba(23,36,76,.35)]"
        />
      </header>

      <div className="flex flex-col">
        {/* Overview */}
        <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(64px,8vw,110px)]">
          <Reveal className="grid gap-10 min-[900px]:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-5">
              <SectionPill color={accent}>{pills.pOv ?? "Overview"}</SectionPill>
              {study.ovTitle && <SectionTitle>{study.ovTitle}</SectionTitle>}
              <p className="max-w-[560px] text-lg leading-[1.6] text-[#475069]">{study.overview}</p>
              {study.tags && (
                <ul className="flex flex-wrap gap-2">
                  {study.tags.map((t) => (
                    <li key={t} className="rounded-full bg-[#F2F4F7] px-3 py-1 text-[13px] font-semibold text-[#344054]">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside className="flex flex-col gap-5 rounded-3xl border border-[#E4E8F0] bg-[#F6F8FC] p-7">
              <dl className="flex flex-col gap-5">
                {study.meta.map((m) => (
                  <div key={m.k}>
                    <dt className="font-mono text-[11px] tracking-[.14em] text-ink-muted uppercase">{m.k}</dt>
                    <dd className="mt-1 font-semibold">{m.v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[11px] tracking-[.14em] text-ink-muted uppercase">Tool used</dt>
                  <dd className="mt-1 font-semibold">{project.tool}</dd>
                </div>
              </dl>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-full bg-navy py-2 pr-2 pl-5 text-[15px] font-bold text-cream no-underline transition-colors hover:bg-blue hover:text-cream"
                >
                  {liveLabel}
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-yellow text-navy">
                    ↗
                  </span>
                </a>
              )}
            </aside>
          </Reveal>
        </section>

        {/* Showcase */}
        {(study.showTitle || study.pair?.length) && (
          <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,110px)]">
            <Reveal className="flex flex-col gap-5">
              {study.showTitle && <SectionTitle>{study.showTitle}</SectionTitle>}
              {study.showBody && <p className="max-w-[760px] text-lg leading-[1.6] text-[#475069]">{study.showBody}</p>}
              <CsImage name={study.show.img} alt={study.show.alt} className="mt-4 aspect-[16/10] rounded-[28px] bg-[#F2F4F7]" contain />
              {study.pair && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
                  {study.pair.map((p) => (
                    <CsImage key={p.img} name={p.img} alt={p.alt} className="aspect-[4/3] rounded-[28px] bg-[#F2F4F7]" contain />
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        )}

        {/* Problem & solution */}
        <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,110px)]">
          <Reveal className="flex flex-col gap-6">
            <SectionPill color={accent}>{pills.pPs ?? "Problem & solution"}</SectionPill>
            <SectionTitle>{study.psTitle}</SectionTitle>
            <p className="max-w-[760px] text-lg leading-[1.6] text-[#475069]">{study.purpose}</p>

            {study.psImg && (
              <div className="relative flex flex-col gap-5 overflow-hidden rounded-[36px] bg-[#F2F4F7] p-6 min-[900px]:block min-[900px]:aspect-[16/10] min-[900px]:p-0">
                <div
                  className="relative aspect-[16/10] min-[900px]:absolute min-[900px]:top-[8%] min-[900px]:left-1/2 min-[900px]:aspect-auto min-[900px]:h-[84%] min-[900px]:-translate-x-1/2 min-[900px]:-rotate-6"
                  style={{ width: study.psW ?? undefined }}
                >
                  <SafeImage
                    src={caseStudyImage(study.psImg)}
                    alt={study.psAlt ?? ""}
                    fill
                    sizes="(min-width: 900px) 58vw, 100vw"
                    className="rounded-2xl object-contain shadow-[0_40px_80px_-30px_rgba(16,24,40,.45)]"
                    fallbackColor="#E4E8F0"
                  />
                </div>
                {!study.noCallouts && study.prob && study.sol && (
                  <>
                    <div className="rounded-2xl bg-white/80 p-5 backdrop-blur-[12px] min-[900px]:absolute min-[900px]:top-[10%] min-[900px]:left-[4%] min-[900px]:w-[28%]">
                      <p className="font-mono text-[11px] tracking-[.14em] text-[#B4236F]">{study.probLabel ?? "THE PROBLEM"}</p>
                      <p className="mt-2 text-sm leading-normal text-[#475069]">{study.prob}</p>
                    </div>
                    <div
                      className="rounded-2xl p-5 min-[900px]:absolute min-[900px]:right-[4%] min-[900px]:bottom-[10%] min-[900px]:w-[28%]"
                      style={{ background: theme.soft }}
                    >
                      <p className="font-mono text-[11px] tracking-[.14em]" style={{ color: accent }}>{study.solLabel ?? "THE SOLUTION"}</p>
                      <p className="mt-2 text-sm leading-normal text-[#475069]">{study.sol}</p>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {study.cards.map((c) => (
                <article key={c.t} className="rounded-3xl bg-[#F7F8FA] p-7">
                  {tagFor(c.tag)}
                  <h3 className="text-xl font-semibold tracking-[-.02em]">{c.t}</h3>
                  <p className="mt-2 leading-[1.6] text-[#475069]">{c.d}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Process */}
        <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,110px)]">
          <Reveal className="flex flex-col gap-6">
            <SectionPill color={accent}>{pills.pPr ?? "Process"}</SectionPill>
            <SectionTitle>{titles.procTitle ?? "From question to interface."}</SectionTitle>
            {study.procIntro && <p className="max-w-[760px] text-lg leading-[1.6] text-[#475069]">{study.procIntro}</p>}
            <div className="grid gap-8 min-[900px]:grid-cols-3">
              {study.proc.map((step, i) => (
                <div key={step.t} className={`flex flex-col gap-3 min-[900px]:pr-8 ${i < study.proc.length - 1 ? "min-[900px]:border-r min-[900px]:border-[#E4E7EC]" : ""}`}>
                  <span aria-hidden="true" className="size-3.5 rounded-full border-[3px]" style={{ borderColor: accent }} />
                  <h3 className="text-xl font-semibold tracking-[-.02em]">{step.t}</h3>
                  {step.items.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {step.items.map((it) => (
                        <li key={it} className="rounded-full bg-[#F2F4F7] px-3 py-1 text-[13px] font-semibold text-[#344054]">
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.body && <p className="leading-[1.6] text-[#475069]">{step.body}</p>}
                </div>
              ))}
            </div>
            {study.research.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
                {study.research.map((r) => (
                  <article key={r.t} className="rounded-3xl bg-[#F7F8FA] p-7">
                    <h3 className="text-xl font-semibold tracking-[-.02em]">{r.t}</h3>
                    <p className="mt-2 leading-[1.6] text-[#475069]">{r.d}</p>
                  </article>
                ))}
              </div>
            )}
          </Reveal>
        </section>

        {/* Color / visual language */}
        {!theme.noColor && theme.pal.length > 0 && (
          <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,110px)]">
            <Reveal className="flex flex-col gap-6">
              <SectionPill color={accent}>{study.colorPill ?? "Visual language"}</SectionPill>
              {study.colorTitle && <SectionTitle>{study.colorTitle}</SectionTitle>}
              {study.colorBody && <p className="max-w-[760px] text-lg leading-[1.6] text-[#475069]">{study.colorBody}</p>}
              <div className="flex flex-col gap-4">
                {Array.from({ length: paletteRows }, (_, row) => {
                  const pair = theme.pal.slice(row * 2, row * 2 + 2);
                  const copy = study.rows?.[row];
                  return (
                    <div key={row} className="flex flex-col gap-2">
                      {copy?.label && <p className="font-mono text-[11px] tracking-[.14em]" style={{ color: dim }}>{copy.label}</p>}
                      <div className="grid gap-4 min-[640px]:grid-cols-2">
                        {pair.map(([hex, name], i) => (
                          <div key={hex} className="rounded-2xl p-5" style={{ background: hex, color: onColor(hex) }}>
                            <p className="font-mono text-xs tracking-[.1em]">{hex.toUpperCase()}</p>
                            <p className="mt-1 text-lg font-semibold">{name}</p>
                            {copy && <p className="mt-2 text-sm opacity-90">{i === 0 ? copy.l : copy.r}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </section>
        )}

        {/* Final screens */}
        <section className="px-[clamp(16px,4vw,40px)] py-[clamp(64px,8vw,110px)]" style={{ background: theme.soft }}>
          <Reveal className="mx-auto flex max-w-[1100px] flex-col gap-6">
            <SectionPill color={accent}>{pills.pFin ?? "Final screens"}</SectionPill>
            <SectionTitle>{titles.finalTitle ?? "The finished interface."}</SectionTitle>
            {study.finalIntro && <p className="max-w-[760px] text-lg leading-[1.6] text-[#475069]">{study.finalIntro}</p>}
            {study.leadT && <h3 className="text-2xl font-semibold tracking-[-.02em]">{study.leadT}</h3>}
            {study.leadBody && <p className="max-w-[760px] leading-[1.6] text-[#475069]">{study.leadBody}</p>}
            <figure>
              <CsImage name={study.final} alt={study.finalAlt} className="aspect-[16/10] rounded-[28px] bg-white/60" contain />
              {(study.leadCap ?? study.finalCap) && (
                <figcaption className="mt-3 font-mono text-[11px] tracking-[.12em] text-ink-muted">{study.leadCap ?? study.finalCap}</figcaption>
              )}
            </figure>
            {rest.length > 0 && (
              <div className={study.restFull ? "flex flex-col gap-10" : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-5"}>
                {rest.map((item) => (
                  <figure key={item.img} className="flex flex-col gap-3">
                    <CsImage name={item.img} alt={item.alt} className="aspect-[4/3] rounded-[28px] bg-white/60" contain />
                    {item.t && <h3 className="text-xl font-semibold tracking-[-.02em]">{item.t}</h3>}
                    {item.body && <p className="leading-[1.6] text-[#475069]">{item.body}</p>}
                    {item.cap && <figcaption className="font-mono text-[11px] tracking-[.12em] text-ink-muted">{item.cap}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            <p className="mt-4 font-mono text-[11px] tracking-[.14em]" style={{ color: dim }}>
              MOCKUPS BY NADIA NISA
            </p>
          </Reveal>
        </section>

        {/* Decisions + learnings */}
        <section className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(64px,8vw,110px)]">
          <Reveal className="flex flex-col gap-6">
            <SectionPill color={accent}>{pills.pDec ?? "Decisions"}</SectionPill>
            <SectionTitle>{titles.decTitle ?? "Why it works."}</SectionTitle>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {study.decisions.map((d) => (
                <article key={d.t} className="rounded-3xl bg-[#F7F8FA] p-7">
                  {tagFor(d.tag)}
                  <h3 className="text-xl font-semibold tracking-[-.02em]">{d.t}</h3>
                  <p className="mt-2 leading-[1.6] text-[#475069]">{d.d}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-[clamp(64px,8vw,110px)] flex flex-col gap-6">
            <SectionPill color={accent}>{pills.pLearn ?? "Learnings"}</SectionPill>
            <SectionTitle>{study.learnTitle ?? "What I took away."}</SectionTitle>
            <ul className="flex max-w-[820px] flex-col gap-4">
              {study.learnings.map((l) => (
                <li key={l} className="flex gap-4 text-lg leading-[1.6] text-[#475069]">
                  <span aria-hidden="true" className="mt-2.5 size-3 shrink-0 rounded-full" style={{ background: accent }} />
                  {l}
                </li>
              ))}
            </ul>
            {study.sources.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] tracking-[.14em] text-ink-muted">SOURCES</p>
                <ul className="flex flex-wrap gap-2">
                  {study.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-[#DDE1E8] px-3.5 py-1.5 text-[13px] font-semibold text-[#344054] no-underline hover:border-navy hover:text-navy"
                      >
                        {s.title} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </section>
      </div>

      <NextProjectBar project={getNextProject(project.slug)} />
    </div>
  );
}
