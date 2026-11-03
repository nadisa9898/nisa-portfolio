import Link from "next/link";
import { BackToTop } from "@/components/ui/BackToTop";
import { SocialLink } from "@/components/ui/SocialLink";
import { TwinkleStars } from "@/components/ui/TwinkleStars";
import { workStars } from "@/data/decor";
import { nav, site } from "@/data/site";
import { socialLinks } from "@/data/socials";

const colLabel = "font-mono text-[11px] tracking-[.18em] text-sky uppercase";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy px-[clamp(20px,5vw,72px)] pt-[clamp(80px,9vw,120px)] pb-8 text-cream">
      <TwinkleStars stars={workStars} className="opacity-70" />
      <span aria-hidden="true" className="absolute bottom-[22%] left-[12%] size-10 animate-[pipFloat_5s_ease-in-out_infinite] rounded-full border-[1.5px] border-sky-light/60 bg-sky-light/15" />
      <span aria-hidden="true" className="absolute top-[24%] right-[20%] size-6 animate-[pipFloat_4s_ease-in-out_1s_infinite] rounded-full border-[1.5px] border-sky-light/60 bg-sky-light/15" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-start justify-between gap-12 max-[639px]:flex-col max-[639px]:items-center max-[639px]:text-center">
          <div className="max-w-[380px]">
            <p className="mb-3.5 font-mono text-xs tracking-[.2em] text-sky uppercase">{site.role}</p>
            <p className="text-[22px] leading-[1.4] font-semibold">
              Designing thoughtful digital experiences with creativity, curiosity, and a little magic.
            </p>
          </div>

          <div className="flex gap-14 max-[639px]:flex-col max-[639px]:items-center">
          <nav aria-label="Footer">
            <p className={colLabel}>Navigate</p>
            <ul className="mt-[9px] flex flex-col gap-[7px]">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-base font-semibold text-cream no-underline transition-[color,translate] hover:translate-x-1 hover:text-sky"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colLabel}>Social</p>
            <ul className="mt-3 flex gap-3 max-[639px]:justify-center">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <SocialLink social={social} />
                </li>
              ))}
            </ul>
          </div>
          </div>

          <BackToTop />
        </div>

        <div className="mt-[clamp(48px,6vw,80px)] flex flex-wrap justify-between gap-3 border-t border-sky-light/25 pt-6 font-mono text-xs tracking-[.1em] text-[#BCD0F2] uppercase max-[639px]:justify-center max-[639px]:text-center">
          <p>© {site.copyrightYear} {site.name}. All rights reserved.</p>
          <p>
            {site.role} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
