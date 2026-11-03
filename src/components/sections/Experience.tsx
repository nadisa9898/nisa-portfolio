"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Star } from "@/components/ui/Star";
import { experience } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        const p = (window.innerHeight * 0.6 - rect.top) / rect.height;
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-ew]", {
        xPercent: -40,
        skewX: -20,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const distance = window.innerWidth < 860 ? 40 : 90;
        const trigger = { trigger: row, start: "top 80%", once: true };
        gsap.from(row.querySelector("[data-ecard]"), {
          x: dir * distance,
          rotation: dir * 3,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: trigger,
        });
        gsap.from(row.querySelector("[data-emark]"), {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: "back.out(2.5)",
          scrollTrigger: trigger,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={rootRef}
      className="relative overflow-hidden bg-cream px-[clamp(20px,5vw,72px)] py-16 min-[640px]:py-[clamp(110px,13vw,170px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(23,36,76,.13)_1.6px,transparent_1.6px)] bg-[length:28px_28px]"
      />
      <div className="relative mx-auto max-w-[1120px]">
        <header className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>The Adventure Map</Eyebrow>
          <h2 className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            <span data-ew className="inline-block">My</span>{" "}
            <span data-ew className="inline-block">design</span>
            <br />
            <span data-ew className="inline-block text-blue [text-shadow:5px_5px_0_#FFF3A6]">adventures.</span>
          </h2>
          <p className="font-mono text-xs tracking-[.12em] text-ink-muted uppercase">How I approach every mission</p>
        </header>

        <div ref={trackRef} className="relative mt-9 min-[640px]:mt-[72px]">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[22px] hidden w-1 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,rgba(23,36,76,.22)_0_10px,transparent_10px_20px)] min-[640px]:block min-[860px]:left-1/2"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[22px] hidden w-1.5 -translate-x-1/2 origin-top bg-[linear-gradient(180deg,#8ED8F8,#3051D9_60%,#FF78BC)] min-[640px]:block min-[860px]:left-1/2"
            style={{ transform: `translateX(-50%) scaleY(${progress})` }}
          />
          <Star
            color="#FFD84D"
            stroke="#17244C"
            className="absolute top-0 left-[22px] z-[3] hidden size-[38px] -translate-x-1/2 -translate-y-1/2 animate-[pipSpin_5s_linear_infinite] min-[640px]:block min-[860px]:left-1/2"
            style={{ top: `${progress * 100}%` }}
          />

          <ol>
            {experience.map((entry, i) => {
              const cardLeft = i % 2 === 0;
              return (
                <li
                  key={entry.role}
                  data-row
                  className="mb-5 grid grid-cols-1 items-center gap-3.5 min-[640px]:mb-14 min-[640px]:grid-cols-[44px_1fr] min-[640px]:gap-6 min-[860px]:grid-cols-[1fr_72px_1fr]"
                >
                  <div className="hidden justify-center self-start pt-6 min-[640px]:col-start-1 min-[640px]:row-start-1 min-[640px]:flex min-[860px]:col-start-2">
                    <div
                      data-emark
                      aria-hidden="true"
                      className="relative z-[2] grid size-[52px] place-items-center rounded-full border-[3px] border-navy font-mono text-[13px] text-navy shadow-[0_0_0_7px_#FFFDF6]"
                      style={{ background: entry.color }}
                    >
                      0{i + 1}
                    </div>
                  </div>
                  <article
                    data-ecard
                    className={`flex flex-col gap-3 rounded-[30px] border-[2.5px] border-navy bg-white p-[30px] pb-[46px] min-[640px]:col-start-2 min-[640px]:row-start-1 ${
                      cardLeft ? "min-[860px]:col-start-1" : "min-[860px]:col-start-3"
                    }`}
                    style={{ boxShadow: `6px 6px 0 ${entry.color}` }}
                  >
                    <span
                      className="self-start rounded-full border-[1.5px] border-navy px-3 py-1.5 font-mono text-xs tracking-[.08em]"
                      style={{ background: entry.color }}
                    >
                      {entry.period}
                    </span>
                    <h3 className="text-[34px] leading-[.95] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
                      {entry.role}
                    </h3>
                    <p className="text-base font-semibold text-blue">{entry.company}</p>
                    <p className="text-base leading-[1.55] text-ink-body">{entry.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
