"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { skills } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

const blueGlow = "hover:shadow-[10px_16px_0_#17244C,0_0_0_6px_rgba(48,81,217,.25),0_0_50px_10px_rgba(142,216,248,.9)]";
const pinkGlow = "hover:shadow-[10px_16px_0_#17244C,0_0_0_6px_rgba(255,120,188,.25),0_0_50px_10px_rgba(255,200,231,.95)]";

export function Expertise() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-sw]", {
        scale: 0.2,
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "elastic.out(1,.5)",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      gsap.from("[data-skill]", {
        rotationX: -85,
        y: 90,
        opacity: 0,
        transformOrigin: "50% 0%",
        transformPerspective: 900,
        duration: 1,
        ease: "back.out(1.4)",
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-skill]", start: "top 85%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={rootRef}
      className="relative overflow-hidden bg-sky-light px-[clamp(20px,5vw,72px)] py-12 min-[640px]:pt-[clamp(110px,13vw,170px)] min-[640px]:pb-[clamp(110px,13vw,170px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(48,81,217,.16)_2px,transparent_2px)] bg-[length:24px_24px] [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-8 max-[639px]:justify-center max-[639px]:text-center">
          <h2 className="text-[clamp(44px,5.4vw,84px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            <span data-sw className="inline-block">Every</span>{" "}
            <span data-sw className="inline-block">designer</span>
            <br />
            <span data-sw className="inline-block">has</span>{" "}
            <span data-sw className="inline-block text-blue [text-shadow:5px_5px_0_#FFFDF6]">superpowers.</span>
          </h2>
          <p className="max-w-[420px] text-lg leading-normal text-ink-body">
            Six abilities I bring to every mission, from first interview to final pixel.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6 min-[640px]:mt-16">
          {skills.map((skill, i) => (
            <li
              key={skill.title}
              data-skill
              className={`group flex flex-col gap-[18px] rounded-[34px] border-[2.5px] border-navy p-[30px] shadow-hard-6 transition-[translate,box-shadow] duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-2.5 ${skill.pink ? pinkGlow : blueGlow}`}
              style={{ background: skill.background }}
            >
              <div className="flex items-center justify-between gap-4">
                <SkillIcon
                  kind={skill.icon}
                  background={skill.iconBackground}
                  className="transition-transform duration-700 ease-spring group-hover:-rotate-[16deg] group-hover:scale-[1.18]"
                />
                <span className="font-mono text-[11px] tracking-[.16em] text-ink-muted">
                  POWER 0{i + 1}
                </span>
              </div>
              <h3 className="text-[34px] leading-[.95] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
                {skill.title}
              </h3>
              <p className="text-[17px] leading-normal text-ink-body">{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
