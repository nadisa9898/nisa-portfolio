"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Cloud } from "@/components/ui/Cloud";
import { Mascot } from "@/components/mascot/Mascot";
import { Star } from "@/components/ui/Star";
import { heroStars } from "@/data/hero";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { key: "EMAIL", label: site.email, href: `mailto:${site.email}`, external: false },
  { key: "LINKEDIN", label: site.socials.linkedin.replace("https://www.", ""), href: site.socials.linkedin, external: true },
  { key: "BEHANCE", label: site.socials.behance.replace("https://www.", ""), href: site.socials.behance, external: true },
] as const;

const cvButton =
  "inline-flex items-center gap-3 rounded-full border-2 border-navy bg-cream py-2 pr-2 pl-5 text-[17px] font-bold text-navy no-underline shadow-hard-4 transition-colors hover:bg-sky-light hover:text-navy max-[639px]:h-[50px] max-[639px]:flex-1 max-[639px]:justify-center max-[639px]:px-3 max-[639px]:text-[clamp(13px,3.9vw,16px)]";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cw]", {
        y: 90,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 65%", once: true },
      });
      gsap.from("[data-cfade]", {
        y: 60,
        rotation: 3,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 35%", once: true },
      });
      gsap.fromTo(
        discRef.current,
        { scale: 0.35, rotation: 0 },
        {
          scale: 1.15,
          rotation: 40,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-sky px-[clamp(20px,5vw,72px)] pt-[clamp(110px,13vw,170px)] pb-[clamp(90px,10vw,140px)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          ref={discRef}
          className="absolute top-[58%] left-1/2 size-[150vmax] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle,#D4F1FF 0 18%,#BCEBFF 18% 30%,#A9E3FB 30% 44%,#9BDDFA 44% 60%,transparent 60%)",
          }}
        />
        <Cloud className="absolute right-[5%] bottom-[10%] h-[84px] w-[220px] animate-[pipSway_12s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute inset-x-0 top-0 h-[1250px]">
          <Cloud className="absolute top-[12%] left-[6%] h-[70px] w-[180px] animate-[pipSway_10s_ease-in-out_infinite_alternate]" />
          {heroStars.map((s, i) => (
            <Star
              key={i}
              color="#FFD84D"
              stroke="#17244C"
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
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <h2 className="text-center text-[clamp(58px,10vw,170px)] leading-[.84] font-extrabold tracking-[-.008em] uppercase [font-variation-settings:'wdth'_75]">
          <span className="block">
            {["Got", "a", "mission?"].map((w) => (
              <span key={w} data-cw className="mr-[.2em] inline-block last:mr-0">{w}</span>
            ))}
          </span>
          <span className="block text-cream [-webkit-text-stroke:3px_#17244C] [text-shadow:7px_7px_0_#17244C]">
            {["Let's", "team", "up!"].map((w) => (
              <span key={w} data-cw className="mr-[.2em] inline-block last:mr-0">{w}</span>
            ))}
          </span>
        </h2>

        <div className="mt-[clamp(48px,6vw,90px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-10">
          <div className="relative mx-auto aspect-square w-full max-w-[440px] min-[900px]:sticky min-[900px]:top-28 min-[900px]:mt-[clamp(0px,10vw,150px)]">
            <span aria-hidden="true" className="absolute inset-[8%] animate-[pipRing_3s_ease-out_infinite] rounded-full border-[3px] border-cream" />
            <span aria-hidden="true" className="absolute inset-[8%] animate-[pipRing_3s_ease-out_1.5s_infinite] rounded-full border-[3px] border-cream" />
            <span aria-hidden="true" className="absolute inset-[14%] rounded-full border-[3px] border-navy bg-cream shadow-hard-8" />
            <Mascot variant="stand" idle="team" className="absolute top-[-9%] left-[18%] w-[64%]" />
          </div>

          <div
            data-cfade
            className="flex flex-col gap-[22px] rounded-[40px] border-[3px] border-navy bg-cream p-[clamp(28px,4vw,48px)] shadow-hard-12"
          >
            <p className="font-mono text-xs tracking-[.18em] text-blue uppercase">Ready for our next mission?</p>
            <h3 className="text-[clamp(34px,3.6vw,54px)] leading-[.92] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
              Let&apos;s create
              <br />
              something amazing.
            </h3>
            <p className="text-lg leading-normal text-ink-body">
              Have a creative idea, an exciting project, or an opportunity to collaborate? I&apos;d love to connect and
              explore what we can create together.
            </p>

            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor
              className="inline-flex items-center justify-center gap-6 self-start rounded-full bg-blue py-2 pr-2 pl-6 text-xl font-extrabold text-cream no-underline shadow-hard-6 hover:text-cream max-[639px]:w-full min-[640px]:py-3 min-[640px]:pr-3 min-[640px]:pl-8"
            >
              Let&apos;s Connect
              <span aria-hidden="true" className="grid size-[42px] place-items-center rounded-full bg-yellow text-navy min-[640px]:size-[50px]">
                →
              </span>
            </a>

            <div className="flex gap-3.5 max-[639px]:flex-nowrap min-[640px]:flex-wrap">
              <Link href="/cv" className={cvButton}>
                View My CV
                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-blue text-cream max-[639px]:hidden">
                  <Eye size={18} />
                </span>
              </Link>
              <a href={site.cv.href} download={site.cv.fileName} className={cvButton}>
                Download CV
                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-blue text-cream max-[639px]:hidden">
                  <Download size={18} />
                </span>
              </a>
            </div>

            <ul className="border-t-[1.5px] border-navy/15">
              {links.map((link) => (
                <li key={link.key} className="border-b-[1.5px] border-navy/15 last:border-b-0">
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 px-1 py-[15px] text-navy no-underline transition-[padding,color] hover:pl-3.5 hover:text-blue"
                  >
                    <span className="min-w-[90px] font-mono text-xs tracking-[.14em] text-ink-muted">{link.key}</span>
                    <span className="flex-1 text-[17px] font-bold break-all">{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
