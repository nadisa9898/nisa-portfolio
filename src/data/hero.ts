export interface HeroStar {
  x: string;
  y: string;
  size: number;
  depth: number;
  dur: number;
  delay: number;
  color: string;
}

export interface HeroBubble {
  x: string;
  y: string;
  size: number;
  depth: number;
  dur: number;
  delay: number;
}

export const heroStars: readonly HeroStar[] = [
  { x: "6%", y: "30%", size: 26, depth: 0.8, dur: 3.2, delay: 0, color: "#FFD84D" },
  { x: "44%", y: "14%", size: 18, depth: 0.4, dur: 2.6, delay: -1, color: "#FFFDF6" },
  { x: "50%", y: "80%", size: 22, depth: 0.6, dur: 3.6, delay: -0.5, color: "#FF78BC" },
  { x: "93%", y: "22%", size: 30, depth: 1, dur: 2.9, delay: -2, color: "#FFD84D" },
  { x: "86%", y: "76%", size: 16, depth: 0.5, dur: 3.1, delay: -1.4, color: "#FFFDF6" },
  { x: "26%", y: "88%", size: 14, depth: 0.3, dur: 2.4, delay: -0.8, color: "#FFD84D" },
  { x: "70%", y: "8%", size: 15, depth: 0.7, dur: 3.4, delay: -2.4, color: "#8ED8F8" },
];

export const heroBubbles: readonly HeroBubble[] = [
  { x: "12%", y: "66%", size: 54, depth: 0.6, dur: 5, delay: 0 },
  { x: "38%", y: "60%", size: 22, depth: 0.3, dur: 4, delay: -1 },
  { x: "60%", y: "24%", size: 34, depth: 0.9, dur: 6, delay: -2 },
  { x: "95%", y: "50%", size: 46, depth: 0.5, dur: 5.5, delay: -3 },
  { x: "80%", y: "90%", size: 26, depth: 0.4, dur: 4.4, delay: -1.6 },
  { x: "3%", y: "6%", size: 30, depth: 0.7, dur: 5.2, delay: -0.6 },
];

export const heroClouds = [
  { left: "3%", top: "16%", width: 200, height: 80, depth: 0.25, dur: 9, opacity: 1 },
  { right: "4%", top: "9%", width: 150, height: 60, depth: 0.5, dur: 11, opacity: 0.9 },
  { left: "38%", bottom: "12%", width: 240, height: 90, depth: 0.15, dur: 13, opacity: 0.85 },
] as const;
