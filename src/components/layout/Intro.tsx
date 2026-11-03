"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { Star } from "@/components/ui/Star";
import { site } from "@/data/site";
import { INTRO_DONE_EVENT } from "@/lib/fx";

const SEEN_KEY = "nadia-intro-seen";
/** The ribbon is drawn in a 1000x600 box and stretched to the viewport. */
const TRAIL_PATH = "M -80 470 C 150 520, 260 260, 420 300 S 640 460, 760 300 S 960 120, 1100 160";
const TRAILS = [
  { stroke: "#FFFDF6", width: 40 },
  { stroke: "#3051D9", width: 20 },
  { stroke: "#FF78BC", width: 7 },
] as const;

/** Rises one translucent bubble from the bottom edge of `layer`, then removes it. */
function spawnBubble(layer: HTMLElement) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const size = 14 + Math.random() * 40;
  const el = document.createElement("div");
  el.style.cssText = `position:absolute;left:${Math.random() * w}px;top:${h + 40}px;width:${size}px;height:${size}px;border-radius:50%;border:1.5px solid rgba(255,255,255,.95);background:radial-gradient(circle at 32% 30%,#fff 0 12%,rgba(255,255,255,.25) 13%,rgba(142,216,248,.25) 70%);box-shadow:inset 0 0 8px rgba(48,81,217,.25);pointer-events:none;`;
  layer.appendChild(el);
  const rise = h + 120;
  const sway = (Math.random() - 0.5) * 60;
  const anim = el.animate(
    [
      { transform: "translate(0,0) scale(0)", opacity: 0 },
      { transform: `translate(${sway * 0.5}px,${-rise * 0.3}px) scale(1)`, opacity: 1, offset: 0.2 },
      { transform: `translate(${sway}px,${-rise}px) scale(1.05)`, opacity: 0 },
    ],
    { duration: 1800 + Math.random() * 1400, easing: "cubic-bezier(.3,.6,.4,1)" },
  );
  anim.onfinish = () => el.remove();
}

/** Skippable first-visit overlay: star pop, name, bubbles, a ribbon the mascot rides, then a circular wipe. */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage can be blocked; fall through and play the intro.
    }
    const root = rootRef.current;
    let handedOff = false;

    // Lets the hero start its entrance; runs once, while the wipe is still revealing the page.
    const handOff = () => {
      if (handedOff) return;
      handedOff = true;
      document.documentElement.removeAttribute("data-intro");
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    };

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Ignore storage errors.
      }
      handOff();
      setActive(false);
    };

    if (reduced || seen || !root) {
      finish();
      return;
    }

    document.documentElement.setAttribute("data-intro", "playing");
    const bubbles = root.querySelector<HTMLElement>("[data-ibubbles]");
    const paths = Array.from(root.querySelectorAll<SVGPathElement>("[data-itrail]"));
    const len = paths[0].getTotalLength();
    // non-scaling-stroke measures dashes in screen px, not the 1000x600 box, so the dash length has to be
    // the stretched path's length or the ribbon trails behind the mascot and never finishes drawing.
    const sx = window.innerWidth / 1000;
    const sy = window.innerHeight / 600;
    const STEPS = 240;
    const screenAt = [0];
    let prev = paths[0].getPointAtLength(0);
    for (let i = 1; i <= STEPS; i++) {
      const pt = paths[0].getPointAtLength((len * i) / STEPS);
      screenAt.push(screenAt[i - 1] + Math.hypot((pt.x - prev.x) * sx, (pt.y - prev.y) * sy));
      prev = pt;
    }
    const screenLen = screenAt[STEPS];
    /** Screen-space length of the path up to `fraction` of its user-space length. */
    const drawn = (fraction: number) => {
      const f = Math.min(1, Math.max(0, fraction)) * STEPS;
      const i = Math.min(STEPS - 1, Math.floor(f));
      return screenAt[i] + (screenAt[i + 1] - screenAt[i]) * (f - i);
    };
    paths.forEach((p) => {
      p.style.strokeDasharray = String(screenLen);
      p.style.strokeDashoffset = String(screenLen);
    });
    const bubbleTimer = window.setInterval(() => bubbles && spawnBubble(bubbles), 90);

    const ctx = gsap.context(() => {
      const progress = { p: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.set("[data-istar]", { opacity: 1 }, 0)
        .fromTo("[data-istar]", { scale: 0, rotation: -200 }, { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.2)" }, 0.05)
        .fromTo("[data-iname]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0.3)
        .to("[data-istar]", { scale: 1.3, duration: 0.16, ease: "power2.out" }, 0.62)
        .to("[data-istar]", { scale: 0, rotation: 140, duration: 0.32, ease: "back.in(2)" }, 0.78)
        .fromTo("[data-iring]", { scale: 0, opacity: 1 }, { scale: 7, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.74)
        .to("[data-iname]", { opacity: 0, y: -20, duration: 0.3 }, 1.3)
        .to(
          progress,
          {
            p: 1,
            duration: 1.3,
            ease: "power1.inOut",
            onUpdate: () => {
              const at = len * progress.p;
              const pt = paths[0].getPointAtLength(at);
              const ahead = paths[0].getPointAtLength(Math.min(len, at + 4));
              const angle = (Math.atan2((ahead.y - pt.y) * sy, (ahead.x - pt.x) * sx) * 180) / Math.PI;
              // The mascot box is 150 wide; offset so its body, not its corner, rides the ribbon.
              gsap.set("[data-ipip]", { x: pt.x * sx - 75, y: pt.y * sy - 100, rotation: angle * 0.5 });
              paths.forEach((p, i) => {
                p.style.strokeDashoffset = String(screenLen - drawn(progress.p - i * 0.012));
              });
            },
          },
          0.7,
        )
        .to("[data-ipin]", { scaleX: 1.25, scaleY: 0.78, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, 1.08)
        .to("[data-ipin]", { rotation: 360, duration: 0.55, ease: "power2.inOut" }, 1.2)
        .to(paths, { opacity: 0, duration: 0.3 }, 1.9)
        .call(handOff, undefined, 2.0)
        .to(root, { clipPath: "circle(0% at 50% 50%)", duration: 0.6, ease: "power3.in" }, 1.95);

      skipRef.current = () => {
        tl.kill();
        finish();
      };
    }, root);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipRef.current();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearInterval(bubbleTimer);
      window.removeEventListener("keydown", onKey);
      ctx.revert();
      document.documentElement.removeAttribute("data-intro");
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onClick={() => skipRef.current()}
      className="fixed inset-0 z-[2000] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#D4F1FF_0%,#8ED8F8_100%)] [clip-path:circle(150%_at_50%_50%)]"
    >
      <div
        className="absolute top-1/2 left-1/2 size-[220vmax] -translate-x-1/2 -translate-y-1/2 animate-[pipSpin_40s_linear_infinite]"
        style={{ background: "repeating-conic-gradient(from 0deg,rgba(255,255,255,.35) 0deg 7deg,transparent 7deg 20deg)" }}
      />
      <div data-ibubbles className="absolute inset-0" />
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        {TRAILS.map((t) => (
          <path
            key={t.stroke}
            data-itrail
            d={TRAIL_PATH}
            fill="none"
            stroke={t.stroke}
            strokeWidth={t.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            // Start undrawn so the server-rendered markup doesn't flash the full ribbon before hydration.
            style={{ strokeDasharray: 99999, strokeDashoffset: 99999 }}
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 -mt-[70px] -ml-[70px] size-[140px]">
        <span data-iring className="block size-full rounded-full border-[6px] border-cream opacity-0" />
      </div>
      <div className="absolute top-1/2 left-1/2 -mt-[90px] -ml-[90px] size-[180px]">
        <div data-istar className="size-full opacity-0 drop-shadow-[0_0_30px_rgba(255,255,255,.9)]">
          <Star color="#FFD84D" stroke="#17244C" strokeWidth={0.9} className="size-full overflow-visible" />
        </div>
      </div>
      <p
        data-iname
        className="absolute inset-x-0 top-[calc(50%+110px)] text-center font-mono text-sm font-medium tracking-[.24em] text-navy uppercase opacity-0"
      >
        {site.name} · {site.role}
      </p>
      <div data-ipip className="absolute top-0 left-0 w-[150px] -translate-x-[400px] -translate-y-[400px]">
        <div data-ipin>
          <div className="mx-auto w-[62%]">
            <Mascot variant="buddy" />
          </div>
        </div>
      </div>
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          skipRef.current();
        }}
        className="absolute right-6 bottom-6 cursor-pointer rounded-full border-[1.5px] border-navy bg-cream/70 px-4 py-2 font-mono text-xs tracking-[.12em] text-navy"
      >
        SKIP INTRO
      </button>
    </div>
  );
}
