"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { recommendations } from "@/data/recommendations";

/** Seconds per card, matching the reference's 324px card pitch at 38px/s. */
const secondsPerCard = 324 / 38;

export function Recommendations() {
  const [expanded, setExpanded] = useState(false);
  const duration = recommendations.length * secondsPerCard;

  return (
    <section
      id="recommendations"
      className="relative overflow-hidden bg-cream py-16 min-[640px]:py-[clamp(100px,11vw,150px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(23,36,76,.13)_1.6px,transparent_1.6px)] bg-[length:28px_28px] [mask-image:linear-gradient(180deg,#000,transparent_80%)]"
      />
      <div className="relative px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-[1220px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow>Kind words, real connections</Eyebrow>
            <h2 className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
              The people I&apos;ve worked with
              <br />
              <span className="text-blue [text-shadow:4px_4px_0_#FFC8E7]">say it best.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-lg leading-normal text-ink-body">
            Great design is never a solo mission. Here&apos;s what some amazing people I&apos;ve collaborated with have
            shared about working together.
          </p>
        </div>
        </div>
      </div>

      <div
        role="region"
        aria-label="Recommendations, scrolling automatically. Focus to pause."
        className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto"
      >
        <div
          className="flex w-max gap-6 px-3 pt-[34px] pb-[22px] animate-[pipMarq_var(--dur)_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ "--dur": `${duration}s`, animationPlayState: expanded ? "paused" : undefined } as React.CSSProperties}
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
    </section>
  );
}
