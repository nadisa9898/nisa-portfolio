import { Star } from "@/components/ui/Star";
import type { DecorStar } from "@/data/decor";

interface TwinkleStarsProps {
  stars: readonly DecorStar[];
  className?: string;
}

/** Absolutely positioned layer of twinkling stars. */
export function TwinkleStars({ stars, className }: TwinkleStarsProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      {stars.map((s, i) => (
        <Star
          key={i}
          color={s.color}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            animation: `pipTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
