export interface DecorStar {
  x: string;
  y: string;
  size: number;
  dur: number;
  delay: number;
  color: string;
}

/** Twinkle stars scattered over the dark Work and Footer sections. */
export const workStars: readonly DecorStar[] = [
  { x: "5%", y: "12%", size: 12, dur: 3, delay: 0, color: "#FFD84D" },
  { x: "22%", y: "86%", size: 9, dur: 2.4, delay: -1, color: "#8ED8F8" },
  { x: "48%", y: "8%", size: 14, dur: 3.4, delay: -2, color: "#FFFDF6" },
  { x: "66%", y: "90%", size: 10, dur: 2.8, delay: -0.4, color: "#FF78BC" },
  { x: "84%", y: "16%", size: 12, dur: 3.1, delay: -1.8, color: "#FFD84D" },
  { x: "95%", y: "60%", size: 9, dur: 2.6, delay: -1.2, color: "#8ED8F8" },
];
