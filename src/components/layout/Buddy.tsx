"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { buddySays } from "@/data/mascot";
import { useActiveSection } from "@/hooks/useActiveSection";
import { burst } from "@/lib/fx";

/** Fixed companion that slides in after the hero and comments on the current section. */
export function Buddy() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const section = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [message, setMessage] = useState("");
  const hideTimer = useRef<number>(0);
  const lastSection = useRef(section);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!onHome || lastSection.current === section) return;
    lastSection.current = section;
    const text = buddySays[section] ?? "";
    if (!text) return;
    window.clearTimeout(hideTimer.current);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- message reacts to an external scroll-derived value
    setMessage(text);
    hideTimer.current = window.setTimeout(() => setMessage(""), 2600);
  }, [section, onHome]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const visible = scrolled || !onHome;

  return (
    <div
      aria-hidden="true"
      onClick={(e) => burst(e.clientX, e.clientY, 10, 70)}
      className={`fixed right-3.5 bottom-3.5 z-[950] w-[58px] transition-[translate,opacity] duration-[700ms] [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] min-[860px]:w-[78px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
      }`}
    >
      {message && (
        <p className="absolute right-[62%] bottom-[78%] w-max max-w-[220px] rounded-[18px_18px_4px_18px] border-2 border-navy bg-cream px-3.5 py-2.5 text-sm font-bold shadow-hard-3">
          {message}
        </p>
      )}
      <Mascot variant="buddy" />
    </div>
  );
}
