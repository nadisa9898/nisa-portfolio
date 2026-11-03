import { Star } from "@/components/ui/Star";

const words = ["UI Design", "UX Research", "Interaction", "Prototyping", "Design Systems", "Visual Design", "Motion"];

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative z-[4] -mt-[34px] -rotate-2 overflow-hidden bg-navy py-5 shadow-[0_6px_0_#8ED8F8]"
    >
      <div className="flex w-max animate-marquee">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-[30px] pr-[30px] text-[clamp(26px,3vw,40px)] font-extrabold whitespace-nowrap text-cream uppercase [font-variation-settings:'wdth'_75]"
          >
            {word}
            <Star color="#FFD84D" className="size-[26px]" />
          </span>
        ))}
      </div>
    </div>
  );
}
