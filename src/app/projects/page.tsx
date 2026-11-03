import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { TwinkleStars } from "@/components/ui/TwinkleStars";
import { workStars } from "@/data/decor";
import { getProject, projectOrderSlugs, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore a collection of digital experiences shaped by curiosity, thoughtful design, and a passion for solving real problems.",
};

const ordered = projectOrderSlugs
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-navy text-cream">
      <TwinkleStars stars={workStars} className="opacity-80" />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5vw,72px)] pt-[clamp(120px,14vw,170px)] pb-[110px]">
        <Reveal className="flex flex-col items-start gap-6">
          <Link
            href="/"
            className="inline-flex rounded-full border-[1.5px] border-sky/50 px-4 py-2 text-sm font-semibold text-cream no-underline transition-colors hover:bg-sky hover:text-navy"
          >
            ← Back to Home
          </Link>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[.2em] text-sky uppercase">
            <span aria-hidden="true" className="h-0.5 w-7 bg-current" />
            My creative universe
          </p>
          <h1 className="text-[clamp(44px,6.4vw,100px)] leading-[.88] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            Every project
            <br />
            <span className="text-sky">has a story.</span>
          </h1>
          <p className="max-w-[600px] text-lg leading-normal text-[#C9D6F5]">
            Explore a collection of digital experiences shaped by curiosity, thoughtful design, and a passion for
            solving real problems.
          </p>
        </Reveal>

        <ProjectsExplorer projects={ordered} />

        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-[clamp(30px,3.6vw,52px)] leading-none font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            Got a project
            <br />
            that needs a <span className="text-yellow">hero?</span>
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-4 rounded-full border-2 border-navy bg-yellow py-2.5 pr-2.5 pl-6 text-[17px] font-bold text-navy no-underline shadow-[5px_5px_0_#8ED8F8] hover:text-navy"
          >
            Let&apos;s team up
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-navy text-lg text-yellow">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
