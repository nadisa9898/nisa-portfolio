/** Fired on window when the intro finishes (or is skipped) so the hero can start. */
export const INTRO_DONE_EVENT = "pip:intro-done";

const colors = ["#FFD84D", "#8ED8F8", "#FF78BC", "#3051D9"];
const starPoints = "0,-10 2.6,-3.6 9.5,-3.1 4.3,1.4 5.9,8.1 0,4.5 -5.9,8.1 -4.3,1.4 -9.5,-3.1 -2.6,-3.6";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Emits a ring of stars and bubbles from a point; appended to #fx-layer and removed when done. */
export function burst(x: number, y: number, count = 6, radius = 46): void {
  const layer = document.getElementById("fx-layer");
  if (!layer || prefersReducedMotion()) return;

  for (let i = 0; i < count; i++) {
    const size = 8 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const el = document.createElement("span");
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;pointer-events:none`;
    el.innerHTML =
      Math.random() < 0.6
        ? `<svg viewBox="-11 -11 22 22" width="${size}" height="${size}"><polygon points="${starPoints}" fill="${color}"/></svg>`
        : `<i style="display:block;width:100%;height:100%;border-radius:50%;border:1.5px solid ${color};background:${color}33"></i>`;
    layer.appendChild(el);

    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
    const distance = radius * (0.6 + Math.random() * 0.7);
    const animation = el.animate(
      [
        { transform: "translate(0,0) scale(.4) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px) scale(1) rotate(${Math.random() * 180}deg)`,
          opacity: 0,
        },
      ],
      { duration: 650 + Math.random() * 350, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
    );
    animation.onfinish = () => el.remove();
  }
}
