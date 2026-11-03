/** Central, editable source for personal content. */
export const site = {
  name: "Nadia Nisa",
  role: "UI/UX Designer",
  company: "Redlime Solutions",
  location: "Dhaka, Bangladesh",
  copyrightYear: 2027,
  title: "Nadia Nisa — UI/UX Designer",
  description:
    "Nadia Nisa is a UI/UX Designer at Redlime Solutions in Dhaka, Bangladesh, designing user-friendly SaaS and healthcare web applications and websites.",
  /** First-visit intro animation. Set NEXT_PUBLIC_SHOW_INTRO=false to disable it (it delays LCP on slow devices). */
  showIntro: process.env.NEXT_PUBLIC_SHOW_INTRO !== "false",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "nadisa9898@gmail.com",
  cv: { href: "/images/proj/Nadia_Nisa.pdf", fileName: "Nadia_Nisa_CV.pdf" },
  socials: {
    linkedin: "https://www.linkedin.com/in/nadianisa",
    behance: "https://www.behance.net/nadianisa5",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Section id tracked for the active indicator. */
  section: string;
  color: string;
  radius: string;
  rotate: number;
}

export const nav: readonly NavItem[] = [
  { label: "Home", href: "/#home", section: "home", color: "#8ED8F8", radius: "50%", rotate: 0 },
  { label: "About", href: "/#about", section: "about", color: "#FF78BC", radius: "2px", rotate: 45 },
  { label: "My Work", href: "/projects", section: "work", color: "#FFD84D", radius: "50% 50% 50% 0", rotate: -45 },
  { label: "My Journey", href: "/#experience", section: "experience", color: "#3051D9", radius: "3px", rotate: 0 },
  { label: "Contact", href: "/#contact", section: "contact", color: "#C9B8FF", radius: "999px 999px 2px 999px", rotate: 0 },
];
