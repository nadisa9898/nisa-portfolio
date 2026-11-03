import type { Metadata } from "next";
import { Download } from "lucide-react";
import Link from "next/link";
import { CvPages } from "@/components/cv/CvPages";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "A closer look at Nadia Nisa's experience, skills, and creative journey.",
};

const downloadButton =
  "inline-flex items-center gap-3 rounded-full border-2 border-navy bg-blue py-2.5 pr-2.5 pl-6 text-[17px] font-bold text-cream no-underline shadow-hard-4 transition-colors hover:bg-navy hover:text-cream";

function DownloadButton({ className }: { className?: string }) {
  return (
    <a href={site.cv.href} download={site.cv.fileName} data-magnetic data-cursor className={`${downloadButton} ${className ?? ""}`}>
      Download CV
      <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-yellow text-navy">
        <Download size={18} />
      </span>
    </a>
  );
}

export default function CvPage() {
  return (
    <main className="min-h-screen bg-sky-pale text-navy">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pt-[clamp(110px,14vw,150px)] pb-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
            <Eyebrow className="tracking-[.18em]">{site.name} · CV</Eyebrow>
            <h1 className="text-[clamp(52px,7vw,104px)] leading-[.88] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
              My <span className="text-blue [text-shadow:4px_4px_0_#FFC8E7]">Resume</span>
            </h1>
            <p className="max-w-[520px] text-[clamp(17px,1.4vw,20px)] leading-normal text-ink-body">
              A closer look at my experience, skills, and creative journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              data-magnetic
              data-cursor
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-cream px-6 py-3.5 text-base font-bold text-navy no-underline shadow-hard-4 transition-colors hover:bg-sky-light hover:text-navy"
            >
              ← Back to Portfolio
            </Link>
            <DownloadButton />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <CvPages src={site.cv.href} />
        </Reveal>

        <div className="flex justify-center">
          <DownloadButton />
        </div>
      </div>
    </main>
  );
}
