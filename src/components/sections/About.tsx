"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { Star } from "@/components/ui/Star";
import { asset } from "@/lib/assets";

gsap.registerPlugin(ScrollTrigger);

const stickerBase = "absolute";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-mask]", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-mask]", start: "top 70%" },
      });
      gsap.from("[data-sticker]", {
        scale: 0,
        rotation: -40,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1,.45)",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-mask]", start: "top 70%" },
      });
      gsap.from("[data-afade]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 50%" },
      });
    }, root);

    const tilt = tiltRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let cleanupTilt: (() => void) | undefined;
    if (tilt && finePointer) {
      const onMove = (e: PointerEvent) => {
        const rect = tilt.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(tilt, { rotateY: x * 10, rotateX: -y * 8, duration: 0.6, ease: "power2.out", transformPerspective: 1000 });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanupTilt = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      cleanupTilt?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="bg-cream px-[clamp(20px,5vw,72px)] pt-[clamp(110px,13vw,180px)] pb-[clamp(90px,10vw,140px)]"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(48px,7vw,110px)]">
        {/* Portrait */}
        <div ref={tiltRef} className="relative mx-auto aspect-[4/5] w-full max-w-[500px]">
          <div
            aria-hidden="true"
            className="absolute top-[-6%] right-[-8%] bottom-[-4%] left-[-6%] animate-morph bg-sky-light"
          />
          <div aria-hidden="true" className="absolute top-[8%] -right-[10%] aspect-square w-[42%] rounded-full bg-pink-light" />

          <div
            data-mask
            className="absolute inset-0 overflow-hidden rounded-[999px_999px_36px_36px] border-[3px] border-navy shadow-hard-12"
            style={{ background: "linear-gradient(160deg,#8ED8F8,#3051D9)" }}
          >
            <div className="absolute inset-x-0 -inset-y-[8%]">
              <SafeImage
                src={asset("nadia-portrait-2.webp")}
                alt="Portrait of Nadia Nisa"
                width={1086}
                height={1448}
                sizes="(max-width: 640px) 90vw, 500px"
                className="absolute top-[-11.76%] left-[-13.16%] size-[128%] max-w-none object-cover object-[47%_40%]"
                fallbackColor="transparent"
              />
            </div>
          </div>

          <div
            data-sticker
            className={`${stickerBase} top-0 right-0 min-[640px]:-top-[4%] min-[640px]:-right-[6%]`}
          >
            <div className="relative animate-bob rounded-3xl border-[2.5px] border-navy bg-pink px-4 py-2 text-lg font-extrabold text-cream uppercase shadow-hard-4 [font-variation-settings:'wdth'_75] min-[640px]:text-2xl">
              Hi, I&apos;m Nadia!
              <span
                aria-hidden="true"
                className="absolute -bottom-2.5 left-6 size-4 rotate-45 border-r-[2.5px] border-b-[2.5px] border-navy bg-pink"
              />
            </div>
          </div>
          <div data-sticker className={`${stickerBase} top-[20%] left-0 min-[640px]:-left-[7%]`}>
            <Star
              color="#FFD84D"
              stroke="#17244C"
              className="size-[46px] animate-twinkle min-[640px]:size-16"
            />
          </div>
          <div data-sticker className={`${stickerBase} bottom-[10%] -left-[4%]`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[54px] animate-[pipFloat_3.6s_ease-in-out_infinite]">
              <path
                d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.8 6.6 4.8c2.2 0 3.7 1.3 5.4 3.2 1.7-1.9 3.2-3.2 5.4-3.2 3.6 0 5.7 3.6 4.2 7C19.5 16.4 12 21 12 21z"
                fill="#FF78BC"
                stroke="#17244C"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div data-sticker className={`${stickerBase} -right-[8%] -bottom-[6%]`}>
            <div className="relative size-[90px] animate-[pipSpin_18s_linear_infinite] rounded-full border-[2.5px] border-navy bg-yellow-light shadow-hard-4 min-[640px]:size-[130px]">
              <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full">
                <defs>
                  <path id="badge-circle" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                </defs>
                <text fontFamily="var(--font-dm-mono)" fontSize="11" letterSpacing="2.2" fill="#17244C">
                  <textPath href="#badge-circle">UI/UX DESIGNER • PIXEL MAGIC • </textPath>
                </text>
                <g transform="translate(50 50)">
                  <polygon
                    points="0,-10 2.6,-3.6 9.5,-3.1 4.3,1.4 5.9,8.1 0,4.5 -5.9,8.1 -4.3,1.4 -9.5,-3.1 -2.6,-3.6"
                    fill="#3051D9"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col items-center gap-7 text-center min-[640px]:items-start min-[640px]:text-left">
          <h2
            data-afade
            className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]"
          >
            A Little
            <br />
            <span className="text-blue [text-shadow:4px_4px_0_#FFC8E7]">About Me</span>
          </h2>

          <p data-afade className="max-w-[560px] text-[clamp(18px,1.4vw,21px)] leading-[1.55] text-ink-body">
            I&apos;m Nadia Nisa, a UI/UX Designer passionate about creating intuitive, visually engaging digital
            experiences. I combine creativity and user-centered thinking to turn complex ideas into simple, meaningful
            designs.
          </p>

          <blockquote
            data-afade
            className="relative rounded-[28px] border-[2.5px] border-navy bg-sky-pale px-7 py-[26px] shadow-hard-6"
          >
            <Star
              color="#FFD84D"
              stroke="#17244C"
              className="absolute -top-4 -right-3.5 size-9"
            />
            <p className="text-[clamp(26px,2.4vw,36px)] leading-[.98] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
              Good design looks great.
              <br />
              <span className="text-blue">Great design feels effortless.</span>
            </p>
          </blockquote>

          <div data-afade>
            <CtaButton href="/#work" variant="blue">
              Explore My Projects
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
