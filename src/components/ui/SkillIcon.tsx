import type { SkillIconKind } from "@/data/skills";

interface SkillIconProps {
  kind: SkillIconKind;
  background: string;
  className?: string;
}

const loop = (name: string, dur: string, delay = "0s", extra = "ease-in-out") =>
  ({ animation: `${name} ${dur} ${extra} ${delay} infinite` }) as const;

function Glyph({ kind }: { kind: SkillIconKind }) {
  switch (kind) {
    case "scan":
      return (
        <div className="relative size-12" style={loop("pipScan", "4.2s")}>
          <span className="absolute top-0 left-0 box-content size-[30px] rounded-full border-[5px] border-navy bg-cream" />
          <span className="absolute right-1 bottom-0 h-6 w-2 origin-top -rotate-45 rounded bg-navy [translate:-2px_-1px]" />
        </div>
      );
    case "build":
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="block h-3 w-11 origin-left rounded-sm bg-navy" style={loop("pipBuildX", "3.6s")} />
          <div className="flex gap-1">
            <span className="block h-[26px] w-5 origin-top rounded-sm border-2 border-navy bg-cream" style={loop("pipBuildY", "3.6s", ".2s")} />
            <span className="block h-[26px] w-5 origin-top rounded-sm border-2 border-navy bg-blue" style={loop("pipBuildY", "3.6s", ".4s")} />
          </div>
        </div>
      );
    case "orbit":
      return (
        <div className="relative grid size-[46px] place-items-center">
          <span className="absolute inset-0 animate-[pipSpin_6s_linear_infinite] rounded-full border-[2.5px] border-dashed border-navy">
            <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-pink" />
          </span>
          <span className="size-4 rounded-full bg-blue" />
        </div>
      );
    case "tap":
      return (
        <div className="relative grid size-11 place-items-center">
          <span
            className="absolute size-12 rounded-full border-[3px] border-yellow"
            style={loop("pipRipple", "2.8s", "0s", "ease-out")}
          />
          <span
            className="block size-0 border-x-[12px] border-t-0 border-b-[24px] border-x-transparent border-b-yellow [translate:3px_5px] -rotate-[20deg]"
            style={loop("pipTap", "2.8s")}
          />
        </div>
      );
    case "cells":
      return (
        <div className="grid grid-cols-2 gap-1.5">
          <span className="box-content size-4 rounded-full bg-navy" style={loop("pipCell", "3.2s", "0s")} />
          <span className="box-content size-4 rounded-sm border-2 border-navy bg-cream" style={loop("pipCell", "3.2s", ".3s")} />
          <span className="box-content size-4 rounded-sm border-2 border-navy bg-pink" style={loop("pipCell", "3.2s", ".9s")} />
          <span className="box-content size-4 rounded-full border-2 border-navy bg-yellow" style={loop("pipCell", "3.2s", ".6s")} />
        </div>
      );
    case "mix":
      return (
        <div className="relative size-12">
          <span className="absolute top-0 left-0 size-7 rounded-full bg-sky" style={loop("pipMixL", "3.8s")} />
          <span className="absolute top-0 right-0 size-7 rounded-full bg-pink/85" style={loop("pipMixR", "3.8s")} />
          <span className="absolute bottom-0 left-2.5 size-7 rounded-full bg-yellow/85" style={loop("pipMixB", "3.8s")} />
        </div>
      );
  }
}

/** Animated icon tile for a skill card. */
export function SkillIcon({ kind, background, className }: SkillIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-[81px] place-items-center overflow-hidden rounded-3xl border-[2.5px] border-navy ${className ?? ""}`}
      style={{ background }}
    >
      <Glyph kind={kind} />
    </span>
  );
}
