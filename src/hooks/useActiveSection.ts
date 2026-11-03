"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/site";

/** Section id under the reading line (30% down the viewport). */
function sectionAtLine(): string {
  const bottomOfPage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (bottomOfPage) return nav[nav.length - 1].section;

  const line = window.innerHeight * 0.3;
  let current = nav[0].section;
  for (const item of nav) {
    const el = document.getElementById(item.section);
    if (el && el.getBoundingClientRect().top <= line) current = item.section;
  }
  return current;
}

/** Tracks which nav section is currently in view while `enabled` (home page only). */
export function useActiveSection(enabled: boolean): string {
  const [section, setSection] = useState<string>(nav[0].section);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSection(sectionAtLine()));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return section;
}
