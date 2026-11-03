"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Bubble } from "@/components/ui/Bubble";
import { Cloud } from "@/components/ui/Cloud";
import { CtaButton } from "@/components/ui/CtaButton";
import { Star } from "@/components/ui/Star";
import { heroBubbles, heroClouds, heroStars } from "@/data/hero";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { asset } from "@/lib/assets";
import { INTRO_DONE_EVENT } from "@/lib/fx";
import { starburstPolygon } from "@/lib/geometry";

const burst = starburstPolygon();

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  usePointerParallax(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onIntroDone: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const play = () => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.from("[data-hw]", { yPercent: 120, rotation: 12, opacity: 0, duration: 0.8, ease: "back.out(1.8)", stagger: 0.07 }, 0.1)
          .from("[data-hfade]", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 0.3)
          .from("[data-burst]", { scale: 0, rotation: -90, duration: 1, ease: "back.out(1.6)" }, 0.2)
          .from(
            "[data-drop]",
            { y: -320, scaleY: 1.25, scaleX: 0.8, opacity: 0, duration: 0.6, ease: "power3.in", transformOrigin: "50% 100%" },
            0.2,
          )
          .to("[data-drop]", { scaleY: 0.82, scaleX: 1.15, duration: 0.12, transformOrigin: "50% 100%" })
          .to("[data-drop]", { scaleY: 1, scaleX: 1, duration: 0.7, ease: "elastic.out(1,.35)", transformOrigin: "50% 100%" });
      };

      // Hold the entrance until the intro overlay has wiped away. The hero stays painted
      // underneath (the overlay covers it), so it still counts as the page's first paint.
      if (document.documentElement.dataset.intro === "playing") {
        onIntroDone = () => ctx.add(play);
        window.addEventListener(INTRO_DONE_EVENT, onIntroDone, { once: true });
      } else {
        play();
      }
    }, root);

    return () => {
      // Strict Mode re-runs this effect; a stale listener would play a second entrance on top of the
      // first, and its `from` tweens would capture the already-hidden state as their end values.
      if (onIntroDone) window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#BCEBFF_0%,#D9F3FF_58%,#FFFDF6_100%)]"
    >
      {/* Decor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[46%] left-[68%] size-[240vmax] -translate-x-1/2 -translate-y-1/2 animate-[pipSpin_140s_linear_infinite] [mask-image:radial-gradient(circle,#000_0%,transparent_42%)]"
          style={{
            background: "repeating-conic-gradient(from 0deg,rgba(255,255,255,.5) 0deg 6deg,transparent 6deg 18deg)",
          }}
        />
        {heroClouds.map((c, i) => {
          const { depth, dur, opacity, width, height, ...pos } = c;
          return (
            <div key={i} data-depth={depth} className="absolute" style={{ ...pos, width, height, opacity }}>
              <Cloud className="size-full" style={{ animation: `pipSway ${dur}s ease-in-out infinite alternate` }} />
            </div>
          );
        })}
        {heroStars.map((s, i) => (
          <div key={i} data-depth={s.depth} className="absolute" style={{ left: s.x, top: s.y }}>
            <Star
              color={s.color}
              stroke="#17244C"
              style={{ width: s.size, height: s.size, animation: `pipTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }}
            />
          </div>
        ))}
        {heroBubbles.map((b, i) => (
          <div key={i} data-depth={b.depth} className="absolute" style={{ left: b.x, top: b.y }}>
            <Bubble style={{ width: b.size, height: b.size, animation: `pipFloat ${b.dur}s ease-in-out ${b.delay}s infinite` }} />
          </div>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-6 px-[clamp(20px,5vw,72px)] pt-24 pb-7 min-[640px]:pt-[clamp(100px,13vh,135px)] min-[640px]:pb-9 min-[860px]:min-h-[min(100vh,860px)] min-[860px]:pb-10">
        {/* Text column */}
        <div className="flex flex-col items-center gap-7 text-center min-[640px]:items-start min-[640px]:text-left">
          <div
            data-hfade
            className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-navy bg-cream px-4 py-2 font-mono text-xs font-medium tracking-[.14em] shadow-hard-3"
          >
            <Star color="#FF78BC" className="size-4 animate-[pipSpin_6s_linear_infinite]" />
            HEY, I&apos;M NADIA NISA!
          </div>

          <h1 className="text-[clamp(52px,7.4vw,118px)] leading-[.86] font-extrabold tracking-[-.015em] uppercase [font-variation-settings:'wdth'_75]">
            <span className="block">
              <span data-hw className="inline-block">Design</span>{" "}
              <span data-hw className="inline-block">with</span>
            </span>
            <span className="block">
              <span data-hw className="inline-block">a</span>{" "}
              <span data-hw className="inline-block">little</span>{" "}
              <span data-hw className="relative inline-block text-blue [text-shadow:5px_5px_0_#FF78BC]">
                magic.
                <Star
                  color="#FFD84D"
                  stroke="#17244C"
                  className="absolute -top-[.12em] -right-[.28em] size-[.34em] animate-[pipTwinkle_2.4s_ease-in-out_infinite]"
                />
              </span>
            </span>
          </h1>

          <p data-hfade className="max-w-[470px] text-[clamp(18px,1.5vw,21px)] leading-normal text-ink-body">
            A UI/UX designer turning complex ideas into simple, delightful experiences people actually enjoy using.
          </p>

          <div data-hfade className="flex flex-wrap justify-center gap-3.5 min-[640px]:justify-start">
            <CtaButton href="/#work" variant="solid" className="h-[62px] w-[236px]">Explore My Work</CtaButton>
            <CtaButton href="/#about" variant="outline" className="h-[62px] w-[236px]">Get to Know Me</CtaButton>
          </div>

          <p data-hfade className="font-mono text-xs tracking-[.16em] text-ink-soft">
            CREATIVE THINKER • PROBLEM SOLVER • UI/UX DESIGNER
          </p>
        </div>

        {/* Stage */}
        <div className="relative order-first mx-auto aspect-square w-full max-w-[360px] min-[860px]:order-none min-[860px]:max-w-[640px]">
          <div aria-hidden="true" data-burst className="absolute inset-[3%] animate-[pipSpin_90s_linear_infinite]">
            <div className="absolute inset-0 bg-navy" style={{ clipPath: `polygon(${burst})` }} />
            <div className="absolute inset-[1.3%] bg-sky-pale" style={{ clipPath: `polygon(${burst})` }} />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-[20%] animate-pulse-soft"
            style={{ background: "radial-gradient(circle,#fff 0%,transparent 70%)" }}
          />
          <div aria-hidden="true" className="absolute top-[46%] left-[2%] w-[22%]">
            <span className="mb-1 block h-[5px] animate-[pipLine_1.9s_linear_infinite] rounded-full bg-white" />
            <span className="mb-1 ml-[20%] block h-[5px] w-[70%] animate-[pipLine_1.9s_linear_.4s_infinite] rounded-full bg-sky" />
            <span className="block h-[5px] animate-[pipLine_1.9s_linear_.9s_infinite] rounded-full bg-white" />
          </div>
          <div className="absolute top-[4%] left-[16%] w-[68%]">
            <div data-drop>
              {/* Animated WebP (half the bytes) with the original GIF as fallback. */}
              <picture>
                <source srcSet={asset("nadia-hero.webp")} type="image/webp" />
                <img
                  src={asset("nadia-hero.gif")}
                  alt="Nadia, cartoon character"
                  width={440}
                  height={550}
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto -mb-[8%] h-auto w-[92%]"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
