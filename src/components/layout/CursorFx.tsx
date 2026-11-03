"use client";

import { useEffect, useRef } from "react";
import { burst } from "@/lib/fx";

/**
 * Click-burst layer for every device, plus the custom ring/dot cursor and
 * magnetic buttons on fine pointers only.
 */
export function CursorFx() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => burst(e.clientX, e.clientY, 6, 46);
    window.addEventListener("pointerdown", onDown);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!fine || !ring || !dot || !label) return () => window.removeEventListener("pointerdown", onDown);

    document.documentElement.classList.add("pip-cursor");
    let target = { x: -100, y: -100 };
    const dotPos = { ...target };
    const ringPos = { ...target };
    let frame = 0;
    let magnetEl: HTMLElement | null = null;

    const setRing = (size: number, bg: string, border: string, text: string) => {
      ring.style.width = ring.style.height = `${size}px`;
      ring.style.background = bg;
      ring.style.borderColor = border;
      label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (magnetEl && !reduced) {
        const rect = magnetEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        magnetEl.style.translate = `${dx * 0.28}px ${dy * 0.28}px`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor],a,button");
      if (el?.dataset.cursorLabel) setRing(60, "#17244C", "#17244C", el.dataset.cursorLabel);
      else if (el) setRing(60, "rgba(142,216,248,.35)", "#3051D9", "");
      else setRing(36, "transparent", "#3051D9", "");

      const magnet = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet !== magnetEl) {
        if (magnetEl) magnetEl.style.translate = "";
        magnetEl = magnet && !(magnet.hasAttribute("data-logo") && window.innerWidth < 640) ? magnet : null;
      }
    };

    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.55;
      dotPos.y += (target.y - dotPos.y) * 0.55;
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      dot.style.transform = `translate(${dotPos.x}px,${dotPos.y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringPos.x}px,${ringPos.y}px) translate(-50%,-50%)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("pip-cursor");
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      if (magnetEl) magnetEl.style.translate = "";
    };
  }, []);

  return (
    <>
      <div id="fx-layer" aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2900]" />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[3000] grid size-9 place-items-center rounded-full border-[1.5px] border-blue transition-[width,height,background-color] duration-[350ms] [transition-timing-function:cubic-bezier(.3,1.4,.5,1)] [@media(hover:none)]:hidden"
        style={{ transform: "translate(-100px,-100px)" }}
      >
        <span ref={labelRef} className="font-mono text-[7.5px] tracking-[.06em] whitespace-nowrap text-cream uppercase opacity-0" />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[3001] size-2 rounded-full bg-blue shadow-[0_0_14px_4px_rgba(48,81,217,.5),0_0_0_2px_#fff] [@media(hover:none)]:hidden"
        style={{ transform: "translate(-100px,-100px)" }}
      />
    </>
  );
}
