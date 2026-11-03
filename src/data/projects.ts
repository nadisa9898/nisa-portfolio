/** Tool used to design a project. */
export type ProjectTool = "Figma" | "Claude";

/** A portfolio project card plus its overlay copy. */
export interface Project {
  slug: string;
  title: string;
  url: string;
  category: string;
  label: string;
  image: string;
  imagePosition?: string;
  background: string;
  accent: string;
  description?: string;
  overview?: string;
  purpose?: string;
  audience?: readonly string[];
  features?: readonly string[];
  considerations?: readonly { title: string; description: string }[];
  timeline: string;
  tool: ProjectTool;
  frameColor: string;
  isCaseStudy: boolean;
}

/** All 18 projects, in the original PROJECTS index order. */
export const projects: readonly Project[] = [
  {
    slug: "dosevana-admin-management-saas",
    title: "Dosevana Admin Management (SaaS)",
    url: "https://sa.dosevana.com/login",
    category: "SaaS Dashboard / Healthcare Management",
    label: "Healthcare SaaS Dashboard",
    image: "dosevana-admin",
    background: "#BCEBFF",
    accent: "#FFC8E7",
    description:
      "An all-in-one wellness business management platform designed to simplify client management, service bookings, medication workflows, and business operations.",
    overview:
      "Dosevana Admin Management brings essential wellness business operations into one centralized dashboard. The platform supports client intake, service provider management, bookings, medication order tracking, and operational insights.",
    purpose: "One dashboard for running a wellness business day to day.",
    audience: [
      "Wellness business owners",
      "Operations and front-desk teams",
      "Service providers",
    ],
    features: [
      "Client intake",
      "Service provider management",
      "Bookings",
      "Medication order tracking",
      "Operational insights",
    ],
    considerations: [
      {
        title: "Many workflows, one place",
        description:
          "Intake, bookings, providers and orders live side by side, so navigation and hierarchy need to stay predictable.",
      },
      {
        title: "Data at a glance",
        description:
          "Operational insights should be scannable without digging through screens.",
      },
    ],
    timeline: "Jul 2025 – Jun 2026",
    tool: "Figma",
    frameColor: "#FFD84D",
    isCaseStudy: true,
  },
  {
    slug: "dosevana-by-thrivewell",
    title: "Dosevana by Thrivewell",
    url: "https://dosevana.com/",
    category: "Healthcare Platform / Web Experience",
    label: "Digital Healthcare Platform",
    image: "dosevana",
    background: "#DDF5EC",
    accent: "#BCEBFF",
    description:
      "A digital healthcare platform connecting wellness businesses with prescription-based treatment programs and supporting medical services.",
    overview:
      "Dosevana provides a structured digital experience for gyms, medical spas, and wellness businesses offering physician-guided treatment programs. The platform focuses on simplifying complex healthcare services and presenting them through a clear, accessible user experience.",
    purpose:
      "Connecting wellness businesses with prescription-based treatment programs.",
    audience: ["Gyms", "Medical spas", "Wellness businesses"],
    features: [
      "Physician-guided treatment programs",
      "Prescription-based programs",
      "Supporting medical services",
    ],
    considerations: [
      {
        title: "Simplify the complex",
        description:
          "Healthcare services are presented in a structured way that is easy to follow.",
      },
      {
        title: "Clear and accessible",
        description:
          "Content and layout prioritise clarity so businesses can understand their options quickly.",
      },
    ],
    timeline: "May 2025 – Jun 2026",
    tool: "Figma",
    frameColor: "#C9B8FF",
    isCaseStudy: false,
  },
  {
    slug: "epiq-script",
    title: "Epiq Script",
    url: "https://tryepiq.com/",
    category: "Prescription Management / Healthcare Technology",
    label: "Prescription Management Platform",
    image: "epiqscripts-dash",
    background: "#E4E0FF",
    accent: "#FFF3A6",
    description:
      "A modern prescription management platform designed to simplify medication workflows and improve coordination between healthcare providers, pharmacies, and patients.",
    overview:
      "A modern prescription management platform designed to simplify medication workflows and improve coordination between healthcare providers, pharmacies, and patients.",
    purpose:
      "Simpler medication workflows and better coordination across care.",
    audience: ["Healthcare providers", "Pharmacies", "Patients"],
    features: [
      "Prescription management",
      "Medication workflows",
      "Provider, pharmacy and patient coordination",
    ],
    considerations: [
      {
        title: "Three audiences",
        description:
          "Providers, pharmacies and patients each need a clear view of the same prescription journey.",
      },
      {
        title: "Workflow clarity",
        description:
          "Medication steps should be easy to follow and hard to get wrong.",
      },
    ],
    timeline: "Jan 2024 – Jan 2025",
    tool: "Figma",
    frameColor: "#FF78BC",
    isCaseStudy: true,
  },
  {
    slug: "docmedilink-website",
    title: "DocMediLink Website",
    url: "https://docmedilink.com/",
    category: "Telehealth / Website",
    label: "Telehealth Website",
    image: "docmedilink",
    background: "#FFF3C4",
    accent: "#8ED8F8",
    description:
      "A telehealth web application supporting virtual consultations, electronic prescriptions, laboratory integrations, and patient engagement.",
    overview:
      "A telehealth web application supporting virtual consultations, electronic prescriptions, laboratory integrations, and patient engagement.",
    purpose: "Bringing consultations, prescriptions and lab work online.",
    audience: ["Patients", "Healthcare providers"],
    features: [
      "Virtual consultations",
      "Electronic prescriptions",
      "Laboratory integrations",
      "Patient engagement",
    ],
    considerations: [
      {
        title: "Connected care",
        description:
          "Consultations, prescriptions and lab results need to feel like one continuous experience.",
      },
      {
        title: "Patient engagement",
        description: "Keeping patients informed and involved between appointments.",
      },
    ],
    timeline: "Oct 2024 – Jan 2025",
    tool: "Figma",
    frameColor: "#FFD84D",
    isCaseStudy: false,
  },
  {
    slug: "thrivewellrx-web-application",
    title: "ThriveWellRX Web Application",
    url: "",
    category: "Web Application",
    label: "Web Application",
    image: "thrivewell-admin",
    background: "#FFF3C4",
    accent: "#FFC8E7",
    timeline: "Oct 2024 – Jun 2025",
    tool: "Figma",
    frameColor: "#C9B8FF",
    isCaseStudy: true,
  },
  {
    slug: "docmedilink-web-application",
    title: "DocMedilink Web Application",
    url: "https://app.docmedilink.com/login",
    category: "Prescription Dashboard",
    label: "Dashboard",
    image: "docmedrx",
    background: "#BCEBFF",
    accent: "#FFC8E7",
    timeline: "Mar 2023 – Feb 2026",
    tool: "Figma",
    frameColor: "#5ED3C4",
    isCaseStudy: true,
  },
  {
    slug: "dosevana-sales-plus",
    title: "Dosevana Sales+",
    url: "",
    category: "Registration Flow",
    label: "Registration Flow",
    image: "dosevana-sales",
    background: "#DDF5EC",
    accent: "#FFC8E7",
    timeline: "Jun 2025 – Jul 2025",
    tool: "Figma",
    frameColor: "#7ED957",
    isCaseStudy: false,
  },
  {
    slug: "slimup-austin",
    title: "SlimUp Austin",
    url: "https://slimupaustin.com/",
    category: "Wellness Website",
    label: "Wellness Website",
    image: "slimup",
    background: "#BCEBFF",
    accent: "#FFC8E7",
    timeline: "Sep 2025 – Oct 2025",
    tool: "Figma",
    frameColor: "#FF78BC",
    isCaseStudy: false,
  },
  {
    slug: "solid-match",
    title: "Solid Match",
    url: "https://solidmatch.se/",
    category: "Job Platform",
    label: "Job Platform",
    image: "solidmatch",
    background: "#D9E2FF",
    accent: "#FFC8E7",
    timeline: "Apr 2025 – Dec 2025",
    tool: "Figma",
    frameColor: "#8ED8F8",
    isCaseStudy: true,
  },
  {
    slug: "solidx",
    title: "SolidX",
    url: "https://solidx.se/",
    category: "Company Website",
    label: "Company Website",
    image: "solidx",
    background: "#BCEBFF",
    accent: "#FFC8E7",
    timeline: "Apr 2025 – Nov 2025",
    tool: "Figma",
    frameColor: "#7ED957",
    isCaseStudy: false,
  },
  {
    slug: "dosevana-qx",
    title: "Dosevana QX",
    url: "",
    category: "Landing Page",
    label: "Landing Page",
    image: "fitness-club",
    background: "#E4E0FF",
    accent: "#FFC8E7",
    timeline: "",
    tool: "Figma",
    frameColor: "#8ED8F8",
    isCaseStudy: false,
  },
  {
    slug: "tongkaboti-nature-retreat",
    title: "Tongkaboti Nature Retreat",
    url: "https://tongkabotiretreat.com/",
    category: "Resort Website",
    label: "Resort Website",
    image: "tongkaboti",
    background: "#DDF5EC",
    accent: "#FFC8E7",
    timeline: "Oct 2025 – Dec 2025",
    tool: "Figma",
    frameColor: "#FFA97A",
    isCaseStudy: false,
  },
  {
    slug: "slimout-healthcare-website",
    title: "SlimOut Healthcare Website",
    url: "https://slimoutv3.thrivewellrx.com/",
    category: "Telehealth Website",
    label: "Telehealth Website",
    image: "slimout-healthcare",
    background: "#D9E2FF",
    accent: "#FFC8E7",
    timeline: "Sep 2026 – Oct 2026",
    tool: "Claude",
    frameColor: "#FFD84D",
    isCaseStudy: false,
  },
  {
    slug: "slimout-v2",
    title: "SlimOut V2",
    url: "https://slimoutv2.thrivewellrx.com/",
    category: "Telehealth Website",
    label: "Telehealth Website",
    image: "slimout-telehealth",
    background: "#E6F7FF",
    accent: "#FFC8E7",
    timeline: "Aug 2026 – Sep 2026",
    tool: "Claude",
    frameColor: "#FFA97A",
    isCaseStudy: false,
  },
  {
    slug: "slimout-website-care-programs",
    title: "SlimOut Website: Care Programs",
    url: "",
    category: "Telehealth Website",
    label: "Telehealth Website",
    image: "slimout-device",
    background: "#DDF5EC",
    accent: "#FFC8E7",
    timeline: "Jul 2026 – Aug 2026",
    tool: "Claude",
    frameColor: "#5ED3C4",
    isCaseStudy: false,
  },
  {
    slug: "honeymeds",
    title: "HoneyMeds",
    url: "https://honeymeds.thrivewellrx.com/",
    category: "Sexual Wellness Website",
    label: "Sexual Wellness Website",
    image: "honeymeds",
    imagePosition: "62% 58%",
    background: "#FFF3C4",
    accent: "#FFC8E7",
    timeline: "Sep 2026 – Nov 2026",
    tool: "Claude",
    frameColor: "#FF78BC",
    isCaseStudy: false,
  },
  {
    slug: "tripkhata-web-app",
    title: "TripKhata Web App",
    url: "https://www.tripkhata.com/login",
    category: "Transport Ledger App",
    label: "Transport Ledger App",
    image: "tripkhata-app",
    imagePosition: "55% 60%",
    background: "#FFE9D6",
    accent: "#FFC8E7",
    timeline: "Jan 2025 – Present",
    tool: "Figma",
    frameColor: "#7ED957",
    isCaseStudy: true,
  },
  {
    slug: "tripkhata-website",
    title: "TripKhata Website",
    url: "https://www.tripkhata.com/",
    category: "Transport SaaS Website",
    label: "Transport SaaS Website",
    image: "tripkhata-site",
    background: "#F4EEE4",
    accent: "#FFC8E7",
    timeline: "Feb 2026 – Sep 2026",
    tool: "Figma",
    frameColor: "#8ED8F8",
    isCaseStudy: false,
  },
];

/** Slugs of the six cards on the home grid, in display order. */
export const homeFeaturedSlugs: readonly string[] = [
  "honeymeds",
  "slimout-healthcare-website",
  "solid-match",
  "dosevana-by-thrivewell",
  "slimout-v2",
  "slimup-austin",
];

/** Slugs in the display order of the full projects page. */
export const projectOrderSlugs: readonly string[] = [
  "slimout-healthcare-website",
  "dosevana-by-thrivewell",
  "honeymeds",
  "tripkhata-web-app",
  "tripkhata-website",
  "slimout-v2",
  "slimout-website-care-programs",
  "dosevana-admin-management-saas",
  "docmedilink-web-application",
  "solid-match",
  "tongkaboti-nature-retreat",
  "solidx",
  "slimup-austin",
  "dosevana-sales-plus",
  "dosevana-qx",
  "thrivewellrx-web-application",
  "docmedilink-website",
  "epiq-script",
];

/** Case study slugs, also the order for the "CASE STUDY NN / 06" counter. */
export const caseStudySlugs: readonly string[] = [
  "dosevana-admin-management-saas",
  "solid-match",
  "tripkhata-web-app",
  "epiq-script",
  "docmedilink-web-application",
  "thrivewellrx-web-application",
];

/** Mascot speech lines shown while hovering the first seven project cards. */
export const projectSpeech: readonly string[] = [
  "A whole business in one dashboard!",
  "Wellness, made simple.",
  "Prescriptions, sorted!",
  "So much clearer now.",
  "A doctor, online!",
  "Built to scale!",
  "Feeling flexible!",
];

/** Finds a project by slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Returns the next project in array order, wrapping at the end. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
