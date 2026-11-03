"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Star } from "@/components/ui/Star";
import { tools } from "@/data/tools";

gsap.registerPlugin(ScrollTrigger);

export function Tools() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-tw]", {
        y: 60,
        rotationX: -90,
        opacity: 0,
        transformPerspective: 600,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      const grid = root.querySelector<HTMLElement>("[data-grid]");
      if (!grid) return;
      const gridRect = grid.getBoundingClientRect();
      const cx = gridRect.left + gridRect.width / 2;
      const cy = gridRect.top + gridRect.height / 2;
      gsap.from("[data-coin]", {
        x: (_i, el: HTMLElement) => cx - (el.getBoundingClientRect().left + el.offsetWidth / 2),
        y: (_i, el: HTMLElement) => cy - (el.getBoundingClientRect().top + el.offsetHeight / 2),
        scale: 0,
        rotation: () => gsap.utils.random(-180, 180),
        duration: 1.1,
        ease: "back.out(1.5)",
        stagger: 0.05,
        scrollTrigger: { trigger: grid, start: "top 75%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tools"
      ref={rootRef}
      className="relative overflow-hidden bg-sky-mist px-[clamp(20px,5vw,72px)] py-16 min-[640px]:py-[clamp(110px,13vw,170px)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-[60%] left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 animate-[pipSpin_120s_linear_infinite] rounded-full border-2 border-dashed border-blue/20" />
        <span className="absolute top-[60%] left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 animate-[pipSpin_90s_linear_infinite_reverse] rounded-full border-2 border-dashed border-pink/25" />
      </div>

      <div className="relative mx-auto max-w-[1080px] text-center">
        <h2 className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
          <span data-tw className="inline-block">My</span>{" "}
          <span data-tw className="inline-block">secret</span>
          <br />
          <span data-tw className="inline-block">design</span>{" "}
          <span data-tw className="inline-block text-blue [text-shadow:5px_5px_0_#FFC8E7]">weapons.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[420px] text-lg leading-normal text-ink-body">
          Hover a tool to see what I use it for.
        </p>

        <ul
          data-grid
          className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-6 gap-y-10 min-[640px]:mt-16"
        >
          {tools.map((tool, i) => (
            <li key={tool.name} data-coin className="flex flex-col items-center gap-3.5">
              <div
                tabIndex={0}
                aria-label={`${tool.name}: ${tool.use}`}
                data-magnetic
                className="group relative size-[116px] [perspective:600px] outline-offset-4"
              >
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-[220px] -translate-x-1/2 rounded-xl bg-navy px-3 py-2 text-center font-mono text-xs text-cream opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {tool.use}
                </span>
                <div
                  className="relative size-full animate-bob"
                  style={{ animationDuration: `${3.2 + (i % 3) * 0.6}s`, animationDelay: `${-i * 0.4}s` }}
                >
                  <div className="relative size-full transition-transform duration-[800ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                    <span
                      className="absolute inset-0 grid place-items-center rounded-full border-[3px] border-navy text-[40px] font-extrabold shadow-[inset_0_-8px_0_rgba(23,36,76,.12)] [backface-visibility:hidden] [font-variation-settings:'wdth'_75]"
                      style={{ background: tool.background }}
                    >
                      {tool.abbr}
                    </span>
                    <span className="absolute inset-0 grid [transform:rotateY(180deg)] place-items-center rounded-full border-[3px] border-navy bg-navy [backface-visibility:hidden]">
                      <Star color="#FFD84D" className="size-11" />
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-base font-bold">{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
