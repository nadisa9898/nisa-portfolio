/** Key into `caseTags`, used to label challenge and decision cards. */
export type CaseTagKey = "ui" | "src" | "ux" | "prop";

/** Legend for the tag chips shown on challenge and decision cards. */
export interface CaseTag {
  readonly label: string;
  readonly bg: string;
}

/** Palette entry: [hex, name]. */
export type PaletteSwatch = readonly [hex: string, name: string];

/**
 * Rich case-study colours. Defaults when omitted: `acc` = `hero`, `dim` = "#8A93A6".
 * Palette rows are pairs of consecutive `pal` entries; row text comes from `CaseStudy.rows` when present.
 */
export interface CaseStudyTheme {
  readonly hero: string;
  readonly ink: string;
  readonly soft: string;
  readonly acc?: string;
  readonly dim?: string;
  readonly noColor?: boolean;
  readonly pal: readonly PaletteSwatch[];
}

export interface CaseChallenge {
  readonly tag: CaseTagKey;
  readonly t: string;
  readonly d: string;
}

export interface CaseNote {
  readonly t: string;
  readonly d: string;
}

/** A design decision; `tag` is a `CaseTagKey` for base copy or a free uppercase label for rich copy. */
export interface CaseDecision {
  readonly tag?: string;
  readonly t: string;
  readonly d: string;
}

export interface CaseSource {
  readonly title: string;
  readonly url: string;
}

export interface CaseMeta {
  readonly k: string;
  readonly v: string;
}

export interface CaseShow {
  readonly img: string;
  readonly alt: string;
  readonly ar?: string;
}

export interface CaseCard {
  readonly tag?: string;
  readonly t: string;
  readonly d: string;
}

export interface CaseProcessStep {
  readonly t: string;
  readonly items: readonly string[];
  readonly body: string;
}

export interface CasePaletteRow {
  readonly l: string;
  readonly r: string;
  readonly label?: string;
}

export interface CaseFinalItem {
  readonly img: string;
  readonly alt: string;
  readonly t?: string;
  readonly body?: string;
  readonly cap?: string;
}

export interface CasePills {
  readonly pOv?: string;
  readonly pPs?: string;
  readonly pPr?: string;
  readonly pFin?: string;
  readonly pDec?: string;
  readonly pLearn?: string;
}

export interface CaseTitles {
  readonly procTitle?: string;
  readonly finalTitle?: string;
  readonly decTitle?: string;
}

/**
 * One render-ready case study. Base copy (tagline, challenges, research, strategy,
 * decisions, learnings, sources) is already overridden by the rich package where one exists.
 * Image convention: `images` are names under `public/images/proj/` (`projectImage`);
 * every rich image field (hero, show.img, psImg, final, finalRest[].img, pair[].img) is a
 * name under `public/images/cs/` (`caseStudyImage`), e.g. "epiq-dashboard".
 */
export interface CaseStudy {
  readonly slug: string;
  readonly tagline: string;
  readonly images: readonly string[];
  readonly challenges: readonly CaseChallenge[];
  readonly research: readonly CaseNote[];
  readonly strategy: readonly CaseNote[];
  readonly decisions: readonly CaseDecision[];
  readonly learnings: readonly string[];
  readonly sources: readonly CaseSource[];

  readonly heroEyebrow: string;
  readonly heroBody?: string;
  readonly hero: string;
  readonly heroAlt: string;
  readonly ovTitle?: string;
  readonly overview: string;
  readonly meta: readonly CaseMeta[];
  readonly tags?: readonly string[];
  readonly showTitle?: string;
  readonly showBody?: string;
  readonly show: CaseShow;
  readonly psTitle: string;
  readonly purpose: string;
  readonly psImg?: string;
  readonly psAlt?: string;
  readonly psW?: string;
  readonly probLabel?: string;
  readonly prob?: string;
  readonly solLabel?: string;
  readonly sol?: string;
  readonly noCallouts?: boolean;
  readonly cards: readonly CaseCard[];
  readonly procIntro?: string;
  readonly proc: readonly CaseProcessStep[];
  readonly colorPill?: string;
  readonly colorTitle?: string;
  readonly colorBody?: string;
  readonly rows?: readonly CasePaletteRow[];
  readonly final: string;
  readonly finalAlt: string;
  readonly finalCap?: string;
  readonly finalIntro?: string;
  readonly leadT?: string;
  readonly leadBody?: string;
  readonly leadCap?: string;
  readonly finalRest?: readonly CaseFinalItem[];
  /** Replacement for `finalRest` below 700px viewport width (Epiq splits the records image). */
  readonly finalRestNarrow?: readonly CaseFinalItem[];
  readonly learnTitle?: string;
  readonly pills?: CasePills;
  readonly titles?: CaseTitles;
  readonly restFull?: boolean;
  readonly pair?: readonly CaseFinalItem[];
}

/** Tag legend (label and chip background) for challenge and decision cards. */
export const caseTags: Readonly<Record<CaseTagKey, CaseTag>> = {
  ui: { label: "FROM THE SCREEN", bg: "#E4EEFF" },
  src: { label: "PUBLIC INFO", bg: "#BCEBFF" },
  ux: { label: "UX ANALYSIS", bg: "#FFC8E7" },
  prop: { label: "PROPOSED", bg: "#FFF3A6" },
};

/** Case-study colour themes keyed by slug. */
export const caseStudyThemes: Readonly<Record<string, CaseStudyTheme>> = {
  "thrivewellrx-web-application": {
    hero: "#0B4FBF",
    ink: "#FFFFFF",
    soft: "#FFF6CF",
    acc: "#0B4FBF",
    noColor: true,
    pal: [],
  },
  "docmedilink-web-application": {
    hero: "#3D7FE0",
    ink: "#FFFFFF",
    soft: "#EAF2FF",
    acc: "#1F5FC4",
    noColor: true,
    pal: [],
  },
  "dosevana-admin-management-saas": {
    hero: "#634BFC",
    ink: "#FFFFFF",
    soft: "#EEEBFF",
    pal: [
      ["#634BFC", "Primary violet"],
      ["#8778E8", "Soft violet"],
      ["#0A7548", "Deep green"],
      ["#8BE2BC", "Mint"],
      ["#D6D7DB", "Light gray"],
      ["#FDFDFD", "White"],
    ],
  },
  "solid-match": {
    hero: "#161828",
    ink: "#FFFFFF",
    soft: "#ECEBF2",
    pal: [
      ["#161828", "Midnight"],
      ["#383747", "Graphite"],
      ["#787588", "Slate"],
      ["#B9B6C7", "Mist"],
      ["#7D82D7", "Periwinkle"],
      ["#F5F5F5", "Off-white"],
    ],
  },
  "tripkhata-web-app": {
    hero: "#F3ECE4",
    ink: "#2B2B2B",
    soft: "#F7F2EC",
    acc: "#8A5737",
    dim: "#5C5A57",
    noColor: true,
    pal: [
      ["#2B2B2B", "Charcoal"],
      ["#8A5737", "Saddle brown"],
      ["#A9846A", "Clay"],
      ["#C7AB96", "Sand"],
      ["#D6CDC4", "Stone"],
      ["#F3ECE4", "Warm ivory"],
    ],
  },
  "epiq-script": {
    hero: "#016A42",
    ink: "#FFFFFF",
    soft: "#E9F6EE",
    pal: [
      ["#FFFFFF", "White"],
      ["#000000", "Black"],
      ["#E8FBD4", "Pale green"],
      ["#3A494E", "Slate"],
      ["#7D7D7D", "Gray"],
      ["#C7C7C7", "Light gray"],
    ],
  },
};

/** The six rich case studies keyed by slug. */
export const caseStudies: Readonly<Record<string, CaseStudy>> = {
  "epiq-script": {
    slug: "epiq-script",
    tagline: "Making white-label pharmacy fulfilment simple to manage.",
    images: ["epiqscripts-dash", "epiqscripts-site"],
    challenges: [
      {
        tag: "ux",
        t: "Complex, regulated workflow",
        d: "Prescriptions move between prescribers, the pharmacy and patients, with rules on who can send what. Each step needs a clear status.",
      },
      {
        tag: "ux",
        t: "Partners, not just patients",
        d: "Telehealth businesses use Epiq Scripts as a white-label pharmacy, so the experience must work for business partners as well as end patients.",
      },
      {
        tag: "ux",
        t: "Trust signals matter",
        d: "Accreditations and licensing need to be visible to reassure partners and patients.",
      },
    ],
    research: [
      {
        t: "Product",
        d: "Epiq Scripts is a Texas-based online pharmacy offering high-volume prescription fulfilment, custom compounding, custom branded packaging, nationwide shipping and an API library (epiqscripts.com).",
      },
      {
        t: "Audience",
        d: "Telemedicine and wellness businesses that need a pharmacy partner, and the patients they serve across licensed US states.",
      },
      {
        t: "Compliance",
        d: "Prescriptions arrive by ePrescribe, fax or phone from a physician; the pharmacy does not fill controlled medication online.",
      },
    ],
    strategy: [
      {
        t: "Status-led dashboard",
        d: "Orders are grouped by stage so staff see what needs action first.",
      },
      {
        t: "Services as clear doors",
        d: "Fulfilment, compounding, packaging, shipping and APIs each get a dedicated entry point.",
      },
      {
        t: "Proof near the CTA",
        d: "Accreditation badges sit close to the main call to action to support trust.",
      },
    ],
    decisions: [
      {
        t: "Consistent orientation",
        d: "The shared sidebar and active states provide a stable reference across the administrative screens.",
      },
      {
        t: "Information near its actions",
        d: "Filters sit above the prescription list, and row actions sit alongside record details, creating a clear relationship between information and controls.",
      },
    ],
    learnings: [
      "Consistency in navigation and table structure can make a complex record system easier to understand.",
      "Dense operational screens benefit from a balance of summary information, detailed records, and clearly placed actions.",
    ],
    sources: [
      { title: "epiqscripts.com", url: "https://epiqscripts.com/" },
      { title: "tryepiq.com", url: "https://www.tryepiq.com/" },
    ],
    heroEyebrow: "HEALTHCARE WEB APPLICATION",
    heroBody:
      "A clear workspace for prescription operations. An administrative interface bringing prescription status, patient records, client information, and order summaries into one consistent workspace.",
    hero: "epiq-dashboard",
    heroAlt: "Dashboard framed against a pale green background",
    ovTitle: "Project overview",
    overview:
      "Epiq Script is presented here through five desktop interface screens: Dashboard, Prescription, Clients, Patient, and Sign in. The interface combines summary cards, searchable tables, and persistent navigation to organize everyday administrative information. This case study focuses on the structure and visual decisions visible in those screens.",
    meta: [
      { k: "Focus", v: "Healthcare administration interface" },
      { k: "Format", v: "Desktop web application UI" },
      { k: "Screens", v: "Dashboard, prescriptions, clients, patients, sign-in" },
    ],
    tags: ["Healthcare", "Web Application", "Admin interface"],
    showTitle: "",
    show: {
      img: "epiq-signin",
      alt: "Epiq Script login screen with email and password fields",
      ar: "18/13",
    },
    psTitle: "Making detailed records easier to navigate.",
    purpose:
      "Prescription work brings together several kinds of information: patient and client details, medication, payment, fulfillment, and record actions. The design challenge is to keep these details available while making each screen understandable at a glance.",
    psImg: "epiq-rx",
    psAlt: "Prescription table with search, filters, selection and fulfillment details",
    noCallouts: true,
    cards: [
      {
        t: "Dense prescription records",
        d: "Keep dates, medication, payment, and fulfillment status aligned in a table that can be scanned row by row.",
      },
      {
        t: "Connected record types",
        d: "Give patient and client records a shared structure while retaining the fields specific to each list.",
      },
      {
        t: "Clear next actions",
        d: "Place search, filters, selection, and row-level actions close to the records they affect.",
      },
    ],
    procIntro:
      "Three design principles visible in the supplied interface. These describe the design, rather than an undocumented research process.",
    proc: [
      {
        t: "Orient",
        items: [],
        body: "A persistent sidebar names the main work areas. A pale green active state marks the current section.",
      },
      {
        t: "Organize",
        items: [],
        body: "Summary cards and grouped lists provide an overview, while dedicated tables accommodate more detailed records.",
      },
      {
        t: "Act",
        items: [],
        body: "Search, status controls, selection checkboxes, and contextual actions appear alongside the information being managed.",
      },
    ],
    colorPill: "Visual system",
    colorTitle: "A restrained visual system.",
    colorBody:
      "White surfaces and light neutral backgrounds separate navigation from content. Green highlights identify active navigation, selected rows, and primary actions. Blue, amber, and red accents distinguish dashboard summaries. Text labels accompany the visible color cues.",
    rows: [
      { l: "White", r: "Black" },
      { l: "Pale green", r: "Slate" },
      { l: "Gray", r: "Light gray" },
    ],
    finalIntro:
      "The screen collection moves from a high-level dashboard to detailed prescription and record views, with a consistent navigation and table language.",
    final: "epiq-dashboard",
    finalAlt: "Epiq Script dashboard with summary cards, lists and a progress chart",
    leadT: "A shared operational overview",
    leadBody:
      "Order summary cards, prescription and patient lists, and a monthly progress chart share one dashboard.",
    finalRest: [
      {
        img: "epiq-rx",
        alt: "Prescription management table",
        t: "Prescription details in context",
        body: "A prescription table brings together client, patient, prescriber, medication, payment, and fulfillment information, with search and filter controls above it.",
      },
      {
        img: "epiq-records",
        alt: "Client and patient tables shown side by side",
        t: "Consistent record views",
        body: "Client and patient lists use familiar table layouts, search fields, selection controls, and pagination.",
      },
      {
        img: "epiq-signin",
        alt: "Epiq Script sign-in screen with a Forgot Password link",
        t: "A focused entry point",
        body: "The sign-in screen pairs Epiq Script branding with email and password fields, a login action, and a Forgot Password link.",
      },
    ],
    finalRestNarrow: [
      {
        img: "epiq-rx",
        alt: "Prescription management table",
        t: "Prescription details in context",
        body: "A prescription table brings together client, patient, prescriber, medication, payment, and fulfillment information, with search and filter controls above it.",
      },
      {
        img: "epiq-clients",
        alt: "Client table",
        t: "Consistent record views",
        body: "Client and patient lists use familiar table layouts, search fields, selection controls, and pagination.",
      },
      { img: "epiq-patients", alt: "Patient table" },
      {
        img: "epiq-signin",
        alt: "Epiq Script sign-in screen with a Forgot Password link",
        t: "A focused entry point",
        body: "The sign-in screen pairs Epiq Script branding with email and password fields, a login action, and a Forgot Password link.",
      },
    ],
    learnTitle: "What I took away.",
    restFull: true,
    pills: {
      pOv: "Overview",
      pPs: "The challenge",
      pPr: "Approach",
      pFin: "Interface",
      pDec: "Rationale",
      pLearn: "Reflection",
    },
  },

  "thrivewellrx-web-application": {
    slug: "thrivewellrx-web-application",
    tagline: "Orders, products and users managed from one admin dashboard.",
    images: ["thrivewell-admin"],
    challenges: [
      {
        tag: "ux",
        t: "Several jobs in one admin",
        d: "Products, orders, categories and user management all need a home without crowding the dashboard.",
      },
      {
        tag: "ux",
        t: "Order status must be clear",
        d: "Recent orders move between Completed, Processing and Pending, and each state has to read at a glance.",
      },
      {
        tag: "ux",
        t: "Recent change stays visible",
        d: "New users, new orders and product edits happen continuously, so admins need a running view of activity.",
      },
    ],
    research: [
      {
        t: "TASK CONTEXT",
        d: "Site Admin and Sales Associate labels indicate distinct working contexts in the interface.",
      },
      {
        t: "INFORMATION",
        d: "Tables support scanning; grouped form sections and progress indicators structure detailed workflows.",
      },
      {
        t: "CONSISTENCY",
        d: "The shared visual language connects catalog, sales and order views without removing their task-specific details.",
      },
    ],
    strategy: [
      {
        t: "Totals first",
        d: "Four summary cards lead the page so the store’s state is clear before the detail.",
      },
      {
        t: "Orders as a table",
        d: "Recent orders are listed with order ID, date, customer, total and a status pill, with a View All link.",
      },
      {
        t: "Sales and activity alongside",
        d: "Sales figures and recent activity sit in a side column next to the main content.",
      },
    ],
    decisions: [
      {
        t: "A familiar structure",
        d: "Repeated navigation and panel patterns provide consistent landmarks across the supplied screens.",
      },
      {
        t: "Detail where it belongs",
        d: "Tables show the overview, while grouped forms and order-detail sections make room for deeper information.",
      },
      {
        t: "A visible next action",
        d: "Search, Next and Save controls give each view an identifiable action within its task.",
      },
    ],
    learnings: [
      "A consistent layout can connect complex workflows while leaving room for task-specific detail.",
      "Clear grouping and explicit status labels deserve attention alongside the visual treatment of a screen.",
    ],
    sources: [],
    heroEyebrow: "WEB APPLICATION",
    hero: "thrivewellrx-hero",
    heroAlt: "ThriveWellRX product catalog in a laptop-style frame.",
    ovTitle: "A workspace for products, sales and orders.",
    overview:
      "ThriveWellRX brings product management, sales preparation and order review into a shared web interface. This case study explores the supplied screens, from subscription setup and product selection to customer information and shipment details.",
    meta: [
      { k: "Scope", v: "UI/UX interface design" },
      { k: "Platform", v: "Web application" },
      { k: "Focus", v: "Sales & operations" },
    ],
    tags: ["Product catalog", "Sales workflow", "Order management"],
    showTitle: "",
    show: {
      img: "thrivewellrx-catalog",
      alt: "Product catalog with availability toggles, prices and row actions.",
      ar: "2000/1697",
    },
    psTitle: "Keeping detailed workflows understandable.",
    purpose:
      "Product configuration, sales preparation and fulfillment each bring different information into view. The design challenge is to keep those details organized while making the current task and next action easy to identify.",
    psImg: "thrivewellrx-sales",
    psAlt: "Empty and populated product-selection states side by side.",
    psW: "50%",
    probLabel: "Start with product selection",
    prob: "The selection area provides a clear place to search for and add products.",
    solLabel: "Review before continuing",
    sol: "Selected items, quantities and pricing sit above an order summary and a visible Next action.",
    cards: [
      {
        tag: "CATALOG",
        t: "Make products scannable",
        d: "A tabular catalog brings product images, names, availability and prices into a consistent row structure.",
      },
      {
        tag: "SALES",
        t: "Keep the next step visible",
        d: "A four-step indicator locates product selection and customer information within the sales journey.",
      },
      {
        tag: "ORDERS",
        t: "Separate status from payment",
        d: "Order status and payment status occupy distinct columns, with additional detail shown in tooltips.",
      },
    ],
    procIntro:
      "Three lenses for reading the supplied design: task structure, information hierarchy and interface consistency.",
    proc: [
      {
        t: "Discover",
        items: ["Catalog", "Sales", "Orders"],
        body: "Frame the tasks shown in the supplied screens: managing products, preparing a sale and reviewing an order.",
      },
      {
        t: "Define",
        items: ["Hierarchy", "Sequence", "Status"],
        body: "Organize each screen around its main task, supporting details and next visible action.",
      },
      {
        t: "Design",
        items: ["Navigation", "Forms", "Feedback"],
        body: "Use the visible sidebar, rounded panels and blue actions as recurring elements across the screen set.",
      },
    ],
    colorPill: "Color",
    colorTitle: "",
    colorBody: "",
    rows: [],
    final: "thrivewellrx-showcase",
    finalAlt: "Product setup, order details and customer information shown in full.",
    leadCap:
      "Selected screens connect product and subscription setup, order details and customer information.",
    learnTitle: "What I took away.",
    pills: {
      pOv: "The project",
      pPs: "The design challenge",
      pPr: "The approach",
      pFin: "Final interface",
      pDec: "Design rationale",
      pLearn: "Reflection",
    },
  },

  "docmedilink-web-application": {
    slug: "docmedilink-web-application",
    tagline: "Prescriptions, requests and telehealth in one dashboard.",
    images: ["docmedrx"],
    challenges: [
      {
        tag: "ux",
        t: "Many services, one screen",
        d: "Prescriptions, refills, lab orders, consultations, bills and messages all compete for space on a single dashboard.",
      },
      {
        tag: "ux",
        t: "Status has to be readable",
        d: "Requests move through states such as In Progress, Scheduled, In Review and Completed, and each one needs to be clear at a glance.",
      },
      {
        tag: "ux",
        t: "Next actions close at hand",
        d: "Starting a request, opening details or booking a consultation should not require leaving the overview.",
      },
    ],
    research: [
      {
        t: "Information hierarchy",
        d: "Distinguish summary information, supporting detail and primary actions through grouping and visual emphasis.",
      },
      {
        t: "Connected navigation",
        d: "Keep the navigation consistent as the provider moves between dashboard, patient and scheduling views.",
      },
      {
        t: "Human oversight",
        d: "Present AI-generated findings as material for clinician review, with source reports and supporting context available.",
      },
    ],
    strategy: [
      {
        t: "Summary cards first",
        d: "Three cards for Active Prescriptions, Awaiting Refill and Upcoming Renewals lead the page, each with a View Details link.",
      },
      {
        t: "Requests as a table",
        d: "Patient requests are listed with ID, name, service, a status pill, requested date and actions.",
      },
      {
        t: "Actions beside the data",
        d: "New Request, View All Requests and per-row actions sit next to the records they affect.",
      },
    ],
    decisions: [
      {
        t: "Clear priorities at a glance.",
        d: "Summary cards and consistent navigation establish a readable entry point, while detailed review remains available at patient level.",
      },
      {
        t: "Context beside the next action.",
        d: "Documents, assessment tools and coordination controls are grouped around the patient's workflow to support a more coherent review experience.",
      },
    ],
    learnings: [
      "A useful provider dashboard needs a clear hierarchy between daily workload and the detail required for an individual patient review.",
      "AI-assisted content needs visible boundaries: source context, careful wording and a clear role for clinician judgment.",
      "A next step would be to test task clarity, review navigation and scheduling comprehension with representative providers. That validation is proposed, not reported as completed research.",
    ],
    sources: [],
    heroEyebrow: "HEALTHCARE WORKSPACE · UI/UX CASE STUDY",
    heroBody:
      "Bringing patient requests, clinical review and scheduling into one provider workspace.",
    hero: "docmedilink-hero",
    heroAlt: "DocMedilink provider dashboard with private details masked.",
    ovTitle: "A connected workspace for provider care.",
    overview:
      "DocMedilink brings together the tasks surrounding a prescription request: reviewing patient information, accessing supporting documents, consulting AI-assisted lab assessments and coordinating visits. This case study focuses on how those tasks are organized across the provider dashboard and patient workspace.",
    meta: [
      { k: "Project Type", v: "Web Application / SaaS" },
      { k: "Focus", v: "Provider workflow design" },
      { k: "Platform", v: "Web dashboard" },
      { k: "Scope", v: "Patient review, AI lab assessment and scheduling" },
    ],
    tags: ["Healthcare", "Provider dashboard", "Web App"],
    showTitle: "",
    show: {
      img: "docmedilink-dash",
      alt: "Provider dashboard showing summary cards and request navigation.",
      ar: "9/7",
    },
    psTitle: "Keep the next action clear without losing patient context.",
    purpose:
      "A provider may need to move between a request, a patient record, supporting documents, lab results and a scheduled visit. The interface needs to keep these related tasks understandable while making the available actions easy to locate. The design challenge is one of hierarchy: what needs attention now, what supports review and what happens next.",
    psImg: "docmedilink-workflow",
    psAlt: "Patient review, AI lab assessment and scheduling screens.",
    psW: "50%",
    probLabel: "Daily priorities",
    prob: "Bring requests, accepted patients and upcoming schedules into the first view.",
    solLabel: "Patient context",
    sol: "Keep documents, review tools and communication close to the patient workflow.",
    cards: [
      {
        tag: "PRIORITIZATION",
        t: "Make incoming work visible.",
        d: "Summary cards and the request queue establish a clear starting point for the provider's day.",
      },
      {
        tag: "CONTEXT",
        t: "Bring related information together.",
        d: "Patient details connect supporting documents, lab review and prescription-related actions in one workspace.",
      },
      {
        tag: "CONTINUITY",
        t: "Connect review with follow-up.",
        d: "Visit controls, communication and schedule settings keep coordination within the same workflow.",
      },
    ],
    procIntro: "A walkthrough of the design decisions visible in the supplied screens.",
    proc: [
      {
        t: "Orient",
        items: [],
        body: "Start with the provider's daily workload. Use the dashboard to surface requests, accepted patients and scheduled activity.",
      },
      {
        t: "Review",
        items: [],
        body: "Group patient context with documents and lab information. Give the provider a clear route into the AI-assisted assessment.",
      },
      {
        t: "Act",
        items: [],
        body: "Place prescription-related actions and visit controls where the provider can find them during patient review.",
      },
    ],
    colorPill: "Color",
    colorTitle: "",
    colorBody: "",
    rows: [],
    final: "docmedilink-dash",
    finalAlt: "Provider dashboard with patient request and schedule summaries.",
    finalCap: "",
    finalIntro:
      "A connected set of provider screens, from daily workload to patient review and follow-up.",
    leadT: "Provider dashboard",
    leadBody:
      "Summary cards introduce the workload, while the patient request list provides a route into individual cases. Schedules and notifications sit alongside the main queue.",
    leadCap: "Dashboard overview with request, patient and schedule summaries.",
    finalRest: [
      {
        img: "docmedilink-patient",
        alt: "Accepted and completed patient detail views with sensitive data hidden.",
        t: "Patient review and prescription workflow",
        body: "The patient workspace brings together request details, documents, lab results, communication and prescription-related controls. Accepted and completed states show different points in the review workflow. The supplied screens expose entry points for creating or viewing a prescription; they do not document the complete prescribing flow.",
        cap: "Accepted and completed patient views, with sensitive information masked.",
      },
      {
        img: "docmedilink-ailab",
        alt: "AI lab review layout, with patient-specific findings masked.",
        t: "AI Lab Assessment & Review",
        body: "The assessment screen groups physician recommendations, lab summaries, category-level explanations, trends and source reports. Treatment suggestions are presented for review rather than as a prescription. The case study treats AI output as decision support and makes no claim about diagnostic accuracy or clinical validation.",
        cap: "AI-assisted assessment structure with patient-specific values and recommendations masked.",
      },
      {
        img: "docmedilink-sched",
        alt: "Appointment cards and weekly availability controls.",
        t: "Scheduling and availability",
        body: "Appointment cards sit above weekly availability settings. Providers can see audio or video visit controls, manage recurring time slots and access date-specific hours from the same scheduling view.",
        cap: "Visit coordination and availability controls in one scheduling workspace.",
      },
    ],
    learnTitle: "What I took away.",
    pills: {
      pPs: "The design challenge",
      pPr: "Design approach",
      pFin: "The solution",
      pDec: "Design rationale",
      pLearn: "Reflection",
    },
  },

  "dosevana-admin-management-saas": {
    slug: "dosevana-admin-management-saas",
    tagline: "Running a wellness business from one calm dashboard.",
    images: ["dosevana-admin", "dosevana-sales", "dosevana"],
    challenges: [
      {
        tag: "ux",
        t: "Many jobs, one screen",
        d: "Intake, bookings, providers and medication orders all compete for attention. Without a clear hierarchy, staff waste time hunting for the right module.",
      },
      {
        tag: "ux",
        t: "Clinical data needs trust",
        d: "Medication order status is high stakes. States like pending, approved and shipped must be unmistakable at a glance.",
      },
      {
        tag: "ux",
        t: "Different users, different days",
        d: "Owners want insights; front-desk teams want speed. One layout has to serve both without clutter.",
      },
    ],
    research: [
      {
        t: "Audience",
        d: "Gyms, medical spas and wellness businesses offering physician-guided treatment programs, as described on the Dosevana platform.",
      },
      {
        t: "Patterns",
        d: "Admin SaaS products commonly use a persistent sidebar, summary cards up top and filterable tables below, so users can move from overview to detail in one step.",
      },
      {
        t: "Risk",
        d: "Healthcare dashboards are used for long sessions, so legibility, contrast and predictable placement matter more than decoration.",
      },
    ],
    strategy: [
      {
        t: "Overview first",
        d: "Key numbers sit at the top, with tables and lists underneath for the detail.",
      },
      {
        t: "Module-based navigation",
        d: "Clients, providers, bookings and orders each get a home, reachable from a stable side menu.",
      },
      {
        t: "Status as colour and text",
        d: "Order and booking states pair colour with a label so they stay readable for colour-blind users.",
      },
    ],
    decisions: [
      {
        tag: "ORIENTATION",
        t: "Context stays visible",
        d: "Navigation, breadcrumbs and order information provide reference points as patients move between tasks.",
      },
      {
        tag: "GUIDANCE",
        t: "Each stage has a purpose",
        d: "Step labels, grouped information and a final acknowledgement make the request sequence explicit.",
      },
    ],
    learnings: [
      "Keep order context close to the actions patients need to take.",
      "Give each stage a clear purpose and end the request with an explicit acknowledgement.",
    ],
    sources: [
      { title: "sa.dosevana.com", url: "https://sa.dosevana.com/login" },
      { title: "dosevana.com", url: "https://dosevana.com/" },
    ],
    heroEyebrow: "PATIENT PORTAL · UI/UX CASE STUDY",
    heroBody: "A connected experience for reviewing orders and completing a refill request.",
    hero: "dosevana-hero",
    heroAlt:
      "Dosevana patient portal showing dashboard, refill selection and request confirmation.",
    overview:
      "Dosevana by Thrivewell brings patient order information and a guided refill request into one portal. The supplied interface connects a dashboard, order context and refill selection with patient information, payment authorization, progress tracking and a request confirmation.",
    meta: [
      { k: "Focus", v: "Patient experience" },
      { k: "Scope", v: "Dashboard & refills" },
      { k: "Platform", v: "Web portal" },
    ],
    tags: ["Patient portal", "Order management", "Refill workflow"],
    show: { img: "dosevana-dash", alt: "", ar: "3/2" },
    pair: [
      {
        img: "dosevana-dash",
        alt: "Patient dashboard with total and shipped order cards, recent orders and document links.",
      },
      {
        img: "dosevana-refill",
        alt: "Refill selection screen showing medication cards and an updated-intake notice.",
      },
    ],
    psTitle: "Make the next step clear.",
    purpose: "Keep order context visible while patients move through a refill request.",
    psImg: "dosevana-review",
    psAlt:
      "Payment authorization summary and progress-tracking form in the refill request workflow.",
    noCallouts: true,
    probLabel: "",
    prob: "",
    solLabel: "",
    sol: "",
    cards: [
      {
        tag: "ORDER CONTEXT",
        t: "Start with a clear overview",
        d: "Summary cards and an orders table place order activity, document links and status labels together.",
      },
      {
        tag: "REQUEST STRUCTURE",
        t: "Break the task into steps",
        d: "A numbered step indicator separates patient information, payment authorization, progress tracking and intake.",
      },
      {
        tag: "COMPLETION",
        t: "Acknowledge the request",
        d: "A dedicated confirmation screen marks the end of the request and offers a route back home.",
      },
    ],
    proc: [
      {
        t: "Orient",
        items: ["See the order context"],
        body: "The dashboard pairs totals with recent orders, linked documents and status labels.",
      },
      {
        t: "Guide",
        items: ["Follow a visible sequence"],
        body: "Breadcrumbs retain the order context while numbered steps identify the current stage of the refill request.",
      },
      {
        t: "Confirm",
        items: ["Close the request clearly"],
        body: "The final screen acknowledges the request and provides a Go to Home action.",
      },
    ],
    colorPill: "Visual language",
    colorTitle: "Color supports hierarchy and state.",
    colorBody:
      "Primary accents, success states and neutral surfaces create a clear visual hierarchy.",
    rows: [
      { l: "Primary", r: "Accent" },
      { l: "Success", r: "Support" },
      { l: "Neutral", r: "Surface" },
    ],
    final: "dosevana-dash",
    finalAlt: "Dosevana patient dashboard with order summary cards and an orders table.",
    finalCap: "",
    leadCap: "Order totals and recent activity at a glance.",
    finalRest: [
      {
        img: "dosevana-guided",
        alt: "Refill workflow showing patient information, payment authorization and progress tracking.",
      },
      {
        img: "dosevana-confirm",
        alt: "Confirmation screen acknowledging the refill request with a Go to Home action.",
        cap: "Acknowledge the request and return home.",
      },
    ],
    learnTitle: "What the interface highlights.",
    pills: {
      pPs: "The challenge",
      pPr: "Design approach",
      pFin: "The interface",
      pDec: "Design rationale",
      pLearn: "Reflection",
    },
    titles: {
      procTitle: "From overview to next step.",
      finalTitle: "The patient journey, screen by screen.",
      decTitle: "Why this structure matters.",
    },
  },

  "tripkhata-web-app": {
    slug: "tripkhata-web-app",
    tagline: "A paper transport ledger, rebuilt for the phone in your pocket.",
    images: ["tripkhata-app", "tripkhata-site"],
    challenges: [
      {
        tag: "src",
        t: "Paper ledgers break down",
        d: "TripKhata lists the problems itself: slow reconciliation, no per-trip profit view, painful month-end reports, forgotten dues and lost books.",
      },
      {
        tag: "ux",
        t: "Users think in “khata”",
        d: "Truck owners already keep separate ledgers for trucks, vendors and customers. The app needs to mirror that mental model, not replace it.",
      },
      {
        tag: "ux",
        t: "Bangla first, mobile first",
        d: "Many owners work from a phone in Bangla, so labels, numbers in ৳ and tap targets must work on small screens.",
      },
    ],
    research: [
      {
        t: "Product",
        d: "A digital ledger for Bangladeshi transport businesses that tracks daily trips, income, expenses and dues for trucks, buses and rent-a-car fleets, on web and mobile (tripkhata.com).",
      },
      {
        t: "Audience",
        d: "Truck and covered-van owners, corporate transport services, logistics companies, bus operators and rent-a-car businesses.",
      },
      {
        t: "Pricing",
        d: "Four monthly plans scaled by number of trucks and users, each with a 7-day free trial and no card required.",
      },
    ],
    strategy: [
      {
        t: "One ledger per thing",
        d: "Separate khatas for trucks, vendors, customers, employees, office equipment, invoices and trips match how owners already work.",
      },
      {
        t: "Dashboard as today’s page",
        d: "Colour-coded summary cards show today’s sales, expenses and month totals, like the top of a ledger page.",
      },
      {
        t: "Add, record, review",
        d: "A three-step model keeps onboarding simple: add your data, record trips and payments, then read the reports.",
      },
    ],
    decisions: [
      {
        tag: "HIERARCHY",
        t: "A legible overview",
        d: "Labeled groups separate financial categories so the dashboard has a clear reading order.",
      },
      {
        tag: "CONSISTENCY",
        t: "Familiar page patterns",
        d: "A shared sidebar and repeated card styling connect the different operational tasks.",
      },
      {
        tag: "CONTEXT",
        t: "Actions near records",
        d: "Vehicle links and document fields sit beside the information they relate to.",
      },
    ],
    learnings: [
      "Clear grouping gives a complex operational interface a more understandable structure.",
      "This interface highlights the value of keeping business summaries distinct from detailed records. The next step would be to test truck setup, maintenance lookup and plan comparison with transport teams.",
      "Further validation should examine task clarity, error recovery and accessibility.",
    ],
    sources: [{ title: "tripkhata.com", url: "https://tripkhata.com/" }],
    heroEyebrow: "Transport Management",
    heroBody: "A clearer view of fleet operations and business accounts.",
    hero: "tripkhata-hero",
    heroAlt: "TripKhata dashboard showing sales, payments, monthly totals and fleet status.",
    overview:
      "TripKhata brings fleet records and business accounts into a shared workspace. This interface case study focuses on the dashboard, truck setup, maintenance records and subscription experience.",
    meta: [
      { k: "Project", v: "TripKhata Web App" },
      { k: "Category", v: "Web Application" },
      { k: "My role", v: "UI/UX Design" },
    ],
    tags: ["Fleet Management", "Dashboard", "Web App"],
    show: {
      img: "tripkhata-overview",
      alt: "Truck list with vehicle status and maintenance actions",
      ar: "16/11",
    },
    psTitle: "Make everyday operations easier to follow.",
    purpose:
      "Fleet work connects vehicle details, payments, documents and service records. The design challenge is to organize those tasks without making the workspace feel fragmented.",
    psImg: "tripkhata-challenge",
    psAlt: "Truck list and category-based maintenance records",
    psW: "40%",
    probLabel: "Business context",
    prob: "Keep financial summaries visible while detailed records remain within reach.",
    solLabel: "Vehicle context",
    sol: "Connect a truck's status with its setup details and maintenance history.",
    cards: [
      {
        tag: "VISIBILITY",
        t: "Read the business at a glance",
        d: "Group sales, payments and monthly totals into clearly labeled dashboard sections.",
      },
      {
        tag: "ORGANIZATION",
        t: "Keep vehicle details together",
        d: "Bring basic information, financing fields and documents into one structured record.",
      },
      {
        tag: "CONTINUITY",
        t: "Make the next action clear",
        d: "Place search, add and maintenance actions alongside the records they support.",
      },
    ],
    proc: [
      {
        t: "Discover",
        items: ["Context", "Tasks", "Records"],
        body: "Frame the work around transport operations: reviewing accounts, locating vehicles and keeping records accessible. These priorities are inferred from the supplied product screens, not reported interview findings.",
      },
      {
        t: "Define",
        items: ["Hierarchy", "Grouping", "Navigation"],
        body: "Organize the experience around a persistent sidebar, task-specific pages and clear information groups. Separate a business overview from the details of individual vehicles.",
      },
      {
        t: "Design",
        items: ["Cards", "Forms", "Tables"],
        body: "Use summary cards for totals, a table for the fleet and grouped forms for setup. Repeat familiar controls so the interface remains visually connected across tasks.",
      },
    ],
    colorPill: "Visual language",
    colorTitle: "A calm foundation for everyday tasks.",
    colorBody:
      "The supplied app screens pair dark text and light surfaces with blue controls and an orange brand mark. Color supports the hierarchy while labels carry meaning.",
    rows: [
      { l: "Dark text", r: "Warm accent" },
      { l: "Supporting tones", r: "Soft surfaces" },
      { l: "Neutral borders", r: "Background" },
    ],
    final: "tripkhata-final1",
    finalAlt: "Dashboard and truck list presented together",
    finalCap: "",
    leadCap:
      "The dashboard groups financial summaries and fleet status, while the truck list provides search and direct access to vehicle actions.",
    finalRest: [
      {
        img: "tripkhata-final2",
        alt: "Truck setup and subscription comparison shown side by side",
        cap: "Truck setup gathers basic information and documents. Subscription presents billing cycles and plan options in a shared layout.",
      },
    ],
    learnTitle: "What I took away.",
    pills: {
      pPs: "The challenge",
      pPr: "The approach",
      pFin: "Final design",
      pDec: "Design rationale",
      pLearn: "Reflection",
    },
  },

  "solid-match": {
    slug: "solid-match",
    tagline: "Upload a CV, get matched, apply. Consulting assignments in three steps.",
    images: ["solidmatch"],
    challenges: [
      {
        tag: "ux",
        t: "Lots of assignments, little time",
        d: "Consultants scanning dozens of open roles need to see quickly which ones are worth their time.",
      },
      {
        tag: "ux",
        t: "Trusting an AI score",
        d: "A match percentage only helps if people understand and believe it, so the score needs context.",
      },
      {
        tag: "ux",
        t: "Low-effort start",
        d: "Asking for a full profile up front loses people. The first step has to be as light as uploading a CV.",
      },
    ],
    research: [
      {
        t: "Product",
        d: "SolidMatch is SolidX’s assignment platform. It gathers consulting assignments in one place and uses AI to match a consultant’s skills with the right opportunities (solidx.se).",
      },
      {
        t: "Audience",
        d: "Consultants and independent contractors looking for their next assignment.",
      },
      {
        t: "Flow",
        d: "SolidX describes three steps: upload your CV, let AI match you with assignments, then apply.",
      },
    ],
    strategy: [
      {
        t: "CV as the front door",
        d: "Uploading a CV replaces long forms, so people reach their matches faster.",
      },
      {
        t: "Match cards",
        d: "Each assignment card shows the role, client, location, start, key skills and a match score in one scannable block.",
      },
      {
        t: "Score with reasons",
        d: "Labels such as competence and seniority sit next to the percentage to explain it.",
      },
    ],
    decisions: [
      {
        t: "Consistent navigation",
        d: "The same sidebar connects consultants, assignments, the CV bank and matching views.",
      },
      {
        t: "Visible match context",
        d: "The matching screen pairs a score with matched and unmatched criteria for review.",
      },
      {
        t: "Details in context",
        d: "The history view keeps an opportunity list and the selected job details together.",
      },
    ],
    learnings: [
      "A match score is more informative when the interface also shows the criteria behind it.",
      "Structured profile and assignment details give reviewers a shared basis for comparison.",
    ],
    sources: [
      { title: "solidmatch.se", url: "https://solidmatch.se/" },
      { title: "app.solidx.se", url: "https://app.solidx.se/" },
      { title: "solidx.se", url: "https://www.solidx.se/" },
    ],
    heroEyebrow: "CONSULTANT & ASSIGNMENT PLATFORM",
    heroBody:
      "A connected workspace for consultant profiles, assignment discovery and AI-assisted matching.",
    hero: "solidmatch-hero",
    heroAlt:
      "SolidX matching interface with assignment cards, match scores and matched-skill indicators.",
    ovTitle: "Project overview",
    overview:
      "SolidX brings consultant profiles, assignments and matching into one workspace. The supplied interface designs connect profile editing, opportunity review and matching history through a consistent desktop navigation system.",
    meta: [
      { k: "Industry", v: "Consulting / recruitment" },
      { k: "My role", v: "Not specified" },
    ],
    showTitle: "From profile detail to assignment context",
    showBody:
      "Profile information and assignment requirements are presented in structured, scannable sections.",
    show: {
      img: "solidmatch-showcase",
      alt: "SolidX Assignment Details and Consultant Profile Editor shown side by side in browser frames.",
      ar: "4/3",
    },
    psTitle: "Connecting consultant information with assignment decisions.",
    purpose:
      "The design challenge is to bring profile information, assignment requirements and match context into a coherent review flow. The screens use persistent navigation, grouped details and visible matching signals to support that task.",
    psImg: "solidmatch-workflow",
    psAlt:
      "Consultant profile editor and assignment details, with a small dashboard detail from the overview board.",
    probLabel: "The challenge",
    prob: "Bring profiles, requirements and match context into one review flow.",
    solLabel: "The approach",
    sol: "Connect structured profiles with assignment details and matching views.",
    cards: [
      {
        t: "Profile context",
        d: "Skills, experience and projects give consultant information a clear structure.",
      },
      {
        t: "Assignment context",
        d: "Job summaries, benefits and qualifications sit alongside applicant information.",
      },
      {
        t: "Matching context",
        d: "Scores and matched or unmatched criteria expose the signals shown in the interface.",
      },
    ],
    proc: [
      {
        t: "01 / Structure",
        items: ["Profile", "Skills", "Experience"],
        body: "How can consultant information stay organized? The profile editor separates personal details, skills, experience and projects into distinct groups.",
      },
      {
        t: "02 / Compare",
        items: ["Assignments", "Match signals"],
        body: "What information supports opportunity review? Assignment cards combine role information with match scores, while a detailed state shows matched and unmatched criteria.",
      },
      {
        t: "03 / Review",
        items: ["History", "Job details"],
        body: "How can a previous match stay in context? Matching History pairs a selectable list with the corresponding assignment details and status.",
      },
    ],
    colorPill: "Visual design",
    colorTitle: "A consistent visual language for detailed work.",
    colorBody:
      "Light surfaces, dark text and blue interaction cues organize the product screens. Repeated cards, pills and section headings create a recognizable interface vocabulary.",
    rows: [
      { label: "HIERARCHY", l: "Clear headings", r: "Grouped details" },
      { label: "SURFACES", l: "Quiet backgrounds", r: "Distinct cards" },
      { label: "SIGNALS", l: "Blue actions", r: "Match indicators" },
    ],
    final: "solidmatch-final",
    finalAlt:
      "SolidX Consultant Matching History with a list of opportunities and a detailed selected assignment.",
    finalCap:
      "Matching History keeps the selected opportunity beside its job details, match score and status.",
    learnTitle: "Design takeaways.",
  },
};
