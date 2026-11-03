"use client";

import { useEffect, type RefObject } from "react";

/**
 * Moves every `[data-depth]` child of `rootRef` by smoothed pointer position
 * and scroll offset. Active only while the page is near the top and when the
 * user has not requested reduced motion.
 */
export function usePointerParallax(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      smoothX += (targetX - smoothX) * 0.06;
      smoothY += (targetY - smoothY) * 0.06;
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.2) {
        for (const el of layers) {
          const d = Number(el.dataset.depth);
          el.style.translate = `${smoothX * d * -80}px ${smoothY * d * -50 + scrollY * d * 0.35}px`;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}
