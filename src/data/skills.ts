export type SkillIconKind = "scan" | "build" | "orbit" | "tap" | "cells" | "mix";

export interface Skill {
  title: string;
  description: string;
  background: string;
  iconBackground: string;
  icon: SkillIconKind;
  /** Pink glow variant on hover. */
  pink?: boolean;
}

/** The six "superpowers" cards. */
export const skills: readonly Skill[] = [
  {
    title: "User Experience Design",
    description: "User research and testing that shape clear, usable journeys.",
    background: "#FFFDF6",
    iconBackground: "#8ED8F8",
    icon: "scan",
  },
  {
    title: "User Interface Design",
    description: "Clean, consistent interfaces for web applications and websites.",
    background: "#FFEAF5",
    iconBackground: "#FFC8E7",
    icon: "build",
    pink: true,
  },
  {
    title: "Responsive Design",
    description: "Layouts that work beautifully from wide desktops to small phones.",
    background: "#FFFDF6",
    iconBackground: "#FFF3A6",
    icon: "orbit",
  },
  {
    title: "Wireframing & Prototyping",
    description: "Quick wireframes and interactive prototypes to test ideas early.",
    background: "#E6F7FF",
    iconBackground: "#3051D9",
    icon: "tap",
  },
  {
    title: "Design Systems",
    description: "Reusable components that keep products consistent across teams.",
    background: "#FFFDF6",
    iconBackground: "#8ED8F8",
    icon: "cells",
  },
  {
    title: "Visual & Graphic Design",
    description: "Typography, color and layout with clear visual hierarchy.",
    background: "#FFEAF5",
    iconBackground: "#FFFDF6",
    icon: "mix",
    pink: true,
  },
];
