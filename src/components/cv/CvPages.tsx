"use client";

import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

interface CvPagesProps {
  /** URL of the PDF to render. */
  src: string;
  className?: string;
}

interface PageSize {
  width: number;
  height: number;
}

const maxWidth = 860;

/** Renders every page of a PDF as a styled canvas, instead of the browser's own PDF viewer chrome. */
export function CvPages({ src, className }: CvPagesProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const pagesRef = useRef<PDFPageProxy[]>([]);
  const [sizes, setSizes] = useState<PageSize[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let doc: PDFDocumentProxy | undefined;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
        doc = await pdfjs.getDocument(src).promise;
        const pages: PDFPageProxy[] = [];
        for (let n = 1; n <= doc.numPages; n++) pages.push(await doc.getPage(n));
        if (cancelled) return;
        pagesRef.current = pages;
        setSizes(
          pages.map((page) => {
            const { width, height } = page.getViewport({ scale: 1 });
            return { width, height };
          }),
        );
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      void doc?.destroy();
    };
  }, [src]);

  useEffect(() => {
    if (!sizes.length) return;
    let cancelled = false;
    const width = Math.min(boxRef.current?.clientWidth || maxWidth, maxWidth);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    (async () => {
      for (let i = 0; i < pagesRef.current.length; i++) {
        const canvas = canvasRefs.current[i];
        const page = pagesRef.current[i];
        if (!canvas || cancelled) return;
        const viewport = page.getViewport({ scale: (width / sizes[i].width) * dpr });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        if (!context) return;
        try {
          await page.render({ canvasContext: context, viewport }).promise;
        } catch {
          return;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sizes]);

  return (
    <div ref={boxRef} className={`flex flex-col items-center gap-6 ${className ?? ""}`}>
      {failed ? (
        <p className="py-[60px] text-center font-mono text-[13px] tracking-[.1em] text-ink-muted uppercase">
          Couldn&apos;t display the CV here. Use Download CV below.
        </p>
      ) : sizes.length === 0 ? (
        <p role="status" className="py-20 font-mono text-xs tracking-[.14em] text-ink-muted uppercase">
          Loading CV…
        </p>
      ) : (
        sizes.map((size, i) => (
          <canvas
            key={i}
            ref={(el) => {
              canvasRefs.current[i] = el;
            }}
            role="img"
            aria-label={`CV page ${i + 1}`}
            className="block h-auto w-full max-w-[860px] rounded-[14px] border-[2.5px] border-navy bg-white shadow-hard-8"
            style={{ aspectRatio: `${size.width} / ${size.height}` }}
          />
        ))
      )}
    </div>
  );
}
