import type { Metadata } from "next";
import { Download } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "A closer look at Nadia Nisa's experience, skills, and creative journey.",
};

const downloadButton =
  "inline-flex items-center gap-3 rounded-full bg-blue py-2 pr-2 pl-5 text-[17px] font-bold text-cream no-underline transition-colors hover:bg-navy hover:text-cream";

export default function CvPage() {
  return (
    <main className="min-h-screen bg-sky-pale text-navy">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pt-[clamp(110px,14vw,150px)] pb-20">
        <Reveal className="flex flex-col items-start gap-5">
          <p className="font-mono text-xs tracking-[.2em] text-blue uppercase">{site.name} · CV</p>
          <h1 className="text-[clamp(52px,7vw,104px)] leading-[.9] font-extrabold uppercase [font-variation-settings:'wdth'_75]">
            My <span className="text-blue [text-shadow:4px_4px_0_#FFC8E7]">Resume</span>
          </h1>
          <p className="max-w-[560px] text-lg leading-normal text-ink-body">
            A closer look at my experience, skills, and creative journey.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border-2 border-navy bg-cream px-6 py-3 text-[17px] font-bold text-navy no-underline shadow-hard-4 transition-colors hover:bg-sky-light hover:text-navy"
            >
              ← Back to Portfolio
            </Link>
            <a href={site.cv.href} download={site.cv.fileName} className={downloadButton}>
              Download CV
              <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-yellow text-navy">
                <Download size={18} />
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <object
            data={`${site.cv.href}#view=FitH`}
            type="application/pdf"
            aria-label="Nadia Nisa CV"
            className="h-[80vh] min-h-[520px] w-full rounded-[14px] border-[2.5px] border-navy bg-white shadow-hard-8"
          >
            <p className="p-6 font-mono text-xs tracking-[.1em]">
              COULDN&apos;T DISPLAY THE CV HERE. USE DOWNLOAD CV INSTEAD.
            </p>
          </object>
        </Reveal>

        <a href={site.cv.href} download={site.cv.fileName} className={`${downloadButton} self-start`}>
          Download CV
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-yellow text-navy">
            <Download size={18} />
          </span>
        </a>
      </div>
    </main>
  );
}
