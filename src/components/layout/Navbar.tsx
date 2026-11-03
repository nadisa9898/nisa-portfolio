"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { nav, site } from "@/data/site";
import { asset } from "@/lib/assets";
import { SafeImage } from "@/components/ui/SafeImage";
import { Star } from "@/components/ui/Star";

const glass =
  "bg-cream/75 backdrop-blur-[14px] border-[1.5px] border-navy/12";

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const scrolledSection = useActiveSection(onHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const active = onHome ? scrolledSection : pathname.startsWith("/projects") ? "work" : "";

  useEffect(() => {
    const el = linkRefs.current[active];
    setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Project detail pages carry their own top bar (back link, counter, close).
  if (/^\/projects\/[^/]+/.test(pathname)) return null;

  return (
    <>
      <header className="pointer-events-none fixed top-3.5 right-3.5 left-3.5 z-[800] flex items-center justify-between gap-3">
        <Link
          href="/#home"
          data-magnetic
          data-logo
          aria-label={`${site.name} — home`}
          onClick={() => setMenuOpen(false)}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-full py-[7px] pr-[18px] pl-[7px] text-navy no-underline hover:text-navy ${glass}`}
        >
          <span className="relative size-[34px] overflow-hidden rounded-full border-[1.5px] border-navy bg-sky-light">
            <SafeImage
              src={asset("nadia-logo-half.webp")}
              alt=""
              width={31}
              height={32}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              fallbackColor="#BCEBFF"
            />
          </span>
          <span className="text-[19px] font-extrabold tracking-[.01em] uppercase [font-variation-settings:'wdth'_75]">
            {site.name}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={`pointer-events-auto relative hidden gap-0.5 rounded-full p-1.5 shadow-[0_12px_30px_-14px_rgba(23,36,76,.3)] min-[860px]:flex ${glass}`}
        >
          {indicator && (
            <span
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 rounded-full bg-navy transition-[left,width] duration-[550ms] [transition-timing-function:cubic-bezier(.6,-.25,.3,1.35)]"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {nav.map((item) => {
            const isActive = item.section === active;
            return (
              <Link
                key={item.label}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[item.section] = el;
                }}
                aria-current={isActive ? "page" : undefined}
                className={`group relative z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold no-underline transition-colors ${
                  isActive ? "text-cream hover:text-cream" : "text-navy hover:bg-sky/35 hover:text-navy"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-[9px] transition-transform duration-300 group-hover:scale-150"
                  style={{ background: item.color, borderRadius: item.radius, rotate: `${item.rotate}deg` }}
                />
                <span className="transition-transform group-hover:-translate-y-[3px]">{item.label}</span>
                <Star
                  color="#FFD84D"
                  stroke="#17244C"
                  className="absolute -top-1 -right-0.5 size-[13px] scale-50 -rotate-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:rotate-[20deg] group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          data-magnetic
          className="pointer-events-auto hidden items-center gap-2.5 rounded-full bg-blue px-[22px] py-3.5 text-sm font-bold text-cream no-underline shadow-[0_10px_24px_-10px_rgba(48,81,217,.7)] hover:text-cream min-[860px]:flex"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-yellow" />
          Let&apos;s Talk
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className={`pointer-events-auto relative z-[810] grid size-[52px] place-items-center rounded-full border-navy/15 min-[860px]:hidden ${glass}`}
        >
          <span className="flex flex-col gap-[5.5px]">
            <span
              className={`h-[2.5px] w-5 rounded bg-navy transition-transform ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2.5px] w-5 rounded bg-navy transition-transform ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[790] flex flex-col gap-1.5 bg-navy px-7 pt-[90px] pb-10 min-[860px]:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3.5 text-[52px] leading-[1.05] font-extrabold text-cream uppercase no-underline [font-variation-settings:'wdth'_75] hover:text-cream"
            >
              <span
                aria-hidden="true"
                className="size-3.5"
                style={{ background: item.color, borderRadius: item.radius, rotate: `${item.rotate}deg` }}
              />
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="mt-7 font-mono text-[13px] tracking-[.1em] text-sky uppercase no-underline hover:text-sky"
          >
            {site.email} ↗
          </a>
        </div>
      )}
    </>
  );
}
