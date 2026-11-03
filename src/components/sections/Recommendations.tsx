"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { recommendations } from "@/data/recommendations";

gsap.registerPlugin(ScrollTrigger);

/**
 * The slider's keyframes ship with the component: the globals.css copy never reached the production
 * stylesheet (nadianisa.com), so the track sat still. Inline rules can't be dropped by the CSS pipeline.
 */
const marqueeCss = `@keyframes pipMarq{to{transform:translate3d(-50%,0,0)}}
.pip-marq{animation:pipMarq var(--dur,60s) linear infinite}
@media (prefers-reduced-motion:reduce){.pip-marq{animation:none}}`;

/** Seconds per card, matching the reference's 324px card pitch at 38px/s. */
const secondsPerCard = 324 / 38;

export function Recommendations() {
  const rootRef = useRef<HTMLElement>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [expanded, setExpanded] = useState(false);
  const [touching, setTouching] = useState(false);
  const duration = Math.round(recommendations.length * secondsPerCard);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: root, start: "top 75%", once: true };
      gsap.from("[data-rcard]", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: trigger,
      });
      gsap.from("[data-quote]", {
        scale: 0.3,
        rotation: -30,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.6)",
        stagger: 0.12,
        scrollTrigger: trigger,
      });
    }, root);

    return () => {
      ctx.revert();
      clearTimeout(touchTimer.current);
    };
  }, []);

  const pauseOnTouch = () => {
    clearTimeout(touchTimer.current);
    setTouching(true);
  };
  const resumeAfterTouch = () => {
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouching(false), 2500);
  };

  return (
    <section
      id="recommendations"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-16 min-[640px]:py-[clamp(100px,11vw,150px)]"
    >
      <style>{marqueeCss}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(23,36,76,.13)_1.6px,transparent_1.6px)] bg-[length:28px_28px] [mask-image:linear-gradient(180deg,#000,transparent_80%)]"
      />
      <div className="relative px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-[clamp(30px,3.4vw,48px)]">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="flex flex-col items-center gap-4 text-center max-[639px]:flex-[1_1_100%] min-[640px]:items-start min-[640px]:text-left">
              <Eyebrow>Kind words, real connections</Eyebrow>
              <h2 className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
                The people I&apos;ve worked with
                <br />
                <span className="text-blue [text-shadow:4px_4px_0_#FFC8E7]">say it best.</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-lg leading-normal text-ink-body max-[639px]:text-center">
              Great design is never a solo mission. Here&apos;s what some amazing people I&apos;ve collaborated with have shared about
              working together.
            </p>
          </div>
          <div
            role="region"
            aria-label="Recommendations, scrolling automatically. Focus to pause."
            onTouchStart={pauseOnTouch}
            onTouchEnd={resumeAfterTouch}
            className="group relative -mx-[clamp(20px,5vw,72px)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto"
          >
            <div
              className="flex w-max items-start gap-6 px-3 pt-[34px] pb-[22px] will-change-transform pip-marq group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
              style={{ "--dur": `${duration}s`, animationPlayState: expanded || touching ? "paused" : undefined } as React.CSSProperties}
            >
              {[0, 1].map((copy) =>
                recommendations.map((rec, i) => (
                  <RecommendationCard
                    key={`${copy}-${rec.name}`}
                    recommendation={rec}
                    index={i}
                    duplicate={copy === 1}
                    onExpandedChange={setExpanded}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
