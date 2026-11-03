"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Recommendation } from "@/data/recommendations";
import { asset } from "@/lib/assets";

const backgrounds = ["#FFFFFF", "#E6F7FF", "#FFEAF5", "#FFF8CF"] as const;
const tilts = ["-1deg", ".8deg", "-.5deg"] as const;

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
  /** Duplicate copies for the endless marquee are hidden from assistive tech. */
  duplicate?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** A single LinkedIn recommendation card. */
export function RecommendationCard({ recommendation, index, duplicate, onExpandedChange }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const long = recommendation.text.length > 220;

  const toggle = () => {
    setExpanded((e) => !e);
    onExpandedChange?.(!expanded);
  };

  return (
    // The wrapper carries the GSAP entrance so it can't clobber the card's own tilt/hover transforms.
    <div data-rcard className="shrink-0">
      <figure
        aria-hidden={duplicate || undefined}
        className="relative flex h-[330px] w-[300px] flex-col gap-3.5 rounded-3xl border-[2.5px] border-navy px-[22px] pt-[30px] pb-5 shadow-hard-5 transition-[translate,box-shadow,rotate] duration-[550ms] [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] [rotate:var(--tilt)] hover:-translate-y-1.5 hover:[rotate:0deg] hover:shadow-[8px_10px_0_#3051D9]"
        style={{ background: backgrounds[index % 4], "--tilt": tilts[index % 3] } as React.CSSProperties}
      >
        <span
          data-quote
          aria-hidden="true"
          className="absolute -top-[21px] left-5 grid size-[42px] place-items-center rounded-full border-[2.5px] border-navy bg-pink pt-[13px] text-[34px] leading-none font-extrabold text-cream"
        >
          “
        </span>

        <blockquote className={`${expanded ? "min-h-0 overflow-y-auto pr-1.5" : "flex-none overflow-hidden"}`}>
          <p className={`text-[15px] leading-[1.55] whitespace-pre-line text-ink-body ${long && !expanded ? "line-clamp-6" : ""}`}>
            {recommendation.text}
          </p>
        </blockquote>
        {long && (
          <button
            type="button"
            tabIndex={duplicate ? -1 : undefined}
            aria-expanded={expanded}
            onClick={toggle}
            className="self-start border-b-2 border-pink-light pb-0.5 text-sm font-bold text-blue"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}

        <figcaption className="mt-auto flex items-center gap-3 border-t-[1.5px] border-dashed border-navy/20 pt-3">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-navy bg-sky-light text-sm font-bold">
            {initials(recommendation.name)}
            <SafeImage
              src={asset(`rec-${recommendation.photo}.webp`)}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              fallbackColor="transparent"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block font-bold ${recommendation.name === "MD. Munim Bin Salim" ? "text-sm" : "text-[15px]"}`}>
              {recommendation.name}
            </span>
            <span className="line-clamp-2 text-[13px] leading-[1.35] text-ink-muted">{recommendation.title}</span>
          </span>
          <a
            href={recommendation.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={duplicate ? -1 : undefined}
            aria-label={`Source on LinkedIn: ${recommendation.name}`}
            className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-[#0A66C2] text-[13px] font-extrabold text-cream no-underline hover:text-cream"
          >
            in
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
