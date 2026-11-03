export interface ExperienceEntry {
  role: string;
  period: string;
  company: string;
  color: string;
  description: string;
}

/** Timeline entries rendered in the Experience section. */
export const experience: readonly ExperienceEntry[] = [
  {
    role: "UI/UX Designer",
    period: "JAN 2025 — PRESENT · CURRENT",
    company: "Redlime Solutions · Dhaka, Bangladesh",
    color: "#8ED8F8",
    description:
      "Designing end-to-end for SaaS and healthcare platforms, working with product, development and QA to turn business needs into clear, consistent interfaces built on reusable design systems.",
  },
  {
    role: "My Side Hustle",
    period: "MAR 2026 — PRESENT",
    company: "Quick Delivery · Sylhet, Bangladesh",
    color: "#FFC8E7",
    description:
      "Running daily delivery operations, from pricing and rider coordination to customer care, and leading the social media campaigns that grow the brand.",
  },
  {
    role: "UI-UX Guided Program",
    period: "BATCH 35 · COMPLETED",
    company: "Ostad",
    color: "#FFF3A6",
    description:
      "The chapter where it all clicked. I completed the program with a perfect 100% on every assignment and quiz, earning both a certificate of completion and a vetted certificate of assessment.",
  },
  {
    role: "GIS & CAD Operator",
    // Placeholder dates until the real ones are supplied.
    period: "20XX — 20XX",
    company: "Data Experts (Pvt.) Limited [datEx]",
    color: "#C9B8FF",
    description:
      "Working with GIS mapping and CAD drawings taught me precision, patience and care for small details, habits I now bring to every interface I design.",
  },
];
