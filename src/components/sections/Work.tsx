"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TwinkleStars } from "@/components/ui/TwinkleStars";
import { workStars } from "@/data/decor";
import { getProject, homeFeaturedSlugs, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const featured = homeFeaturedSlugs
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));

/** Initial tilt of each card before it drops into place. */
const enterTilt = [-9, 7, -6, 8, -7, 6] as const;

export function Work() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: -46,
          rotation: enterTilt[i % enterTilt.length],
          duration: 1.1,
          delay: (i % 3) * 0.12,
          ease: "back.out(1.35)",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={rootRef}
      className="relative overflow-hidden bg-navy px-[clamp(20px,5vw,72px)] pt-[clamp(100px,11vw,150px)] pb-[clamp(90px,10vw,130px)]"
    >
      <TwinkleStars stars={workStars} className="opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(142,216,248,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(142,216,248,.06)_1px,transparent_1px)] bg-[length:44px_44px]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="inline-block bg-sky px-[.22em] pt-[.1em] pb-[.04em] text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold text-navy uppercase shadow-[6px_6px_0_#FF78BC] [font-variation-settings:'wdth'_75]">
            Design Adventures.
          </h2>
          <Link
            href="/projects"
            data-magnetic
            data-cursor
            className="inline-flex items-center gap-4 rounded-full border-2 border-navy bg-yellow py-2.5 pr-2.5 pl-6 text-[17px] font-bold text-navy no-underline shadow-[5px_5px_0_#8ED8F8] hover:text-navy"
          >
            View All
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-navy text-lg text-yellow">
              →
            </span>
          </Link>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-1 gap-x-[clamp(22px,2.6vw,40px)] gap-y-[clamp(44px,5vw,64px)] px-1.5 pt-3.5 min-[620px]:grid-cols-2 min-[1000px]:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} animateIn />
          ))}
        </div>
      </div>
    </section>
  );
}
