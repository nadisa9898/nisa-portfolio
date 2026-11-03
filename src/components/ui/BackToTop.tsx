"use client";

/** Round "TOP" button that scrolls the page back to the hero. */
export function BackToTop() {
  return (
    <button
      type="button"
      data-cursor
      data-cursor-label="Fly up"
      aria-label="Back to top"
      onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
      className="hidden size-24 shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-cream bg-sky font-mono text-[10px] font-medium text-navy min-[640px]:flex"
    >
      <span aria-hidden="true" className="animate-[pipFloat_1.6s_ease-in-out_infinite] text-lg leading-none">
        ↑
      </span>
      TOP
    </button>
  );
}
