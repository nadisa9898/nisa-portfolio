"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Star } from "@/components/ui/Star";
import { tools } from "@/data/tools";
import { burst } from "@/lib/fx";

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
      const coins = gsap.utils.toArray<HTMLElement>("[data-coin]", grid);
      // Hidden until the grid scrolls in; each coin's start point is measured then, not at load, so late layout shifts can't skew the fly-in.
      gsap.set(coins, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: grid,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const g = grid.getBoundingClientRect();
          const cx = g.left + g.width / 2;
          const cy = g.top + g.height / 2;
          gsap.fromTo(
            coins,
            {
              autoAlpha: 1,
              scale: 0,
              rotation: () => gsap.utils.random(-180, 180),
              x: (_i, el: HTMLElement) => cx - (el.getBoundingClientRect().left + el.offsetWidth / 2),
              y: (_i, el: HTMLElement) => cy - (el.getBoundingClientRect().top + el.offsetHeight / 2),
            },
            { x: 0, y: 0, scale: 1, rotation: 0, duration: 1.1, ease: "back.out(1.5)", stagger: 0.05, clearProps: "transform" },
          );
        },
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
            <li key={tool.name} data-coin className="flex flex-col items-center gap-4">
              <div className="group relative">
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-[5] w-[220px] -translate-x-1/2 translate-y-2.5 scale-90 text-center opacity-0 transition-[opacity,transform] duration-[350ms] [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                >
                  <span className="inline-block rounded-xl bg-navy px-3 py-2 font-mono text-xs leading-[1.3] text-cream">{tool.use}</span>
                </span>
                <div
                  className="animate-bob"
                  style={{ animationDuration: `${3.2 + (i % 3) * 0.6}s`, animationDelay: `${-i * 0.4}s` }}
                >
                  <div
                    tabIndex={0}
                    aria-label={`${tool.name}: ${tool.use}`}
                    data-magnetic
                    data-cursor
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse") return;
                      const r = e.currentTarget.getBoundingClientRect();
                      burst(r.left + r.width / 2, r.top + r.height / 2, 6, 80);
                    }}
                    className="size-[116px] [perspective:600px] outline-offset-4 transition-transform duration-[350ms] ease-spring"
                  >
                    <div className="relative size-full transition-transform duration-[800ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-focus-within:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)]">
                      <span
                        className="absolute inset-0 grid place-items-center rounded-full border-[3px] border-navy text-[40px] font-extrabold text-navy shadow-[inset_0_-8px_0_rgba(23,36,76,.12)] [backface-visibility:hidden] [font-variation-settings:'wdth'_75]"
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
              </div>
              <span className="text-base font-bold">{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
