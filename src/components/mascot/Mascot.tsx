"use client";

import { useEffect, useRef } from "react";
import { mascotVariants, type MascotVariantName } from "@/data/mascot";
import { asset } from "@/lib/assets";

interface MascotProps {
  variant: MascotVariantName;
  /** "float" bobs gently; "team" holds still and only looks at the pointer when it is nearby. */
  idle?: "float" | "team";
  className?: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Character with layered pupils that follow the pointer, clipped to the eye mask. */
export function Mascot({ variant, idle = "float", className }: MascotProps) {
  const spec = mascotVariants[variant];
  const bodyRef = useRef<HTMLDivElement>(null);
  const pupilRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pointer: { x: number; y: number } | null = null;
    let current = { x: 0, y: 0 };
    let visible = false;
    let frame = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(body);
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const rect = body.getBoundingClientRect();
      const scale = rect.width / spec.width;
      scrollVelocity = (window.scrollY - lastScrollY) * 0.5 + scrollVelocity * 0.5;
      lastScrollY = window.scrollY;

      let tx = 0;
      let ty = 0;
      const t = now / 1000;
      if (pointer) {
        const pad = rect.width * 0.08;
        const near =
          pointer.x > rect.left - pad && pointer.x < rect.right + pad && pointer.y > rect.top - pad && pointer.y < rect.bottom + pad;
        if (idle !== "team" || near) {
          const dx = pointer.x - (rect.left + rect.width * spec.eye.x);
          const dy = pointer.y - (rect.top + rect.height * spec.eye.y);
          const dist = Math.hypot(dx, dy) || 1;
          const m = Math.min(1, dist / (rect.width * 0.9));
          tx = (dx / dist) * m * 13;
          ty = clamp((dy / dist) * m * 12 + (idle === "team" ? 0 : scrollVelocity * 0.08), -12, 12);
        }
      } else {
        tx = Math.sin(t * 0.8) * 6;
        ty = Math.cos(t * 0.6) * 4;
      }
      current = { x: current.x + (tx - current.x) * 0.14, y: current.y + (ty - current.y) * 0.14 };
      for (const el of pupilRefs.current) {
        if (el) el.style.transform = `translate(${current.x * scale}px,${current.y * scale}px)`;
      }

      body.style.transform =
        idle === "team"
          ? `translateY(${Math.sin(t / 1.5) * 10}px) rotate(${Math.sin(t / 2.1) * 2.5}deg)`
          : `translateY(${Math.sin(t / 1.7) * 2.2}%) rotate(${Math.sin(t / 1.1) * 2}deg)`;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [idle, spec]);

  const mask = `url(${asset(`${spec.prefix}-eyemask.webp`)})`;

  return (
    <div className={className} style={{ aspectRatio: `${spec.width} / ${spec.height}` }}>
      <div ref={bodyRef} className="relative size-full will-change-transform">
        {/* Layered character art: natural pupil sizes vary, so plain img elements are used. */}
        {/* eslint-disable @next/next/no-img-element */}
        <img src={asset(`${spec.prefix}-base.webp`)} alt="" draggable={false} className="absolute inset-0 size-full select-none" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: "100% 100%", maskSize: "100% 100%", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
        >
          {spec.pupils.map((p, i) => (
            <img
              key={i}
              ref={(el) => {
                pupilRefs.current[i] = el;
              }}
              src={asset(`${spec.prefix}-pupil-${i}.webp`)}
              alt=""
              draggable={false}
              className="absolute h-auto select-none"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.width}%` }}
            />
          ))}
        </div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </div>
  );
}
