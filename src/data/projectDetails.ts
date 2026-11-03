import type { ProjectTool } from "./projects";

/** Copy for the project detail page template. */
export interface ProjectDetail {
  tool: ProjectTool;
  heroAlt: string;
  heroTag?: string;
  intro: string;
  overviewTitle: string;
  overview: string;
  goalTitle: string;
  goal: string;
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string;
}

/** Detail page copy for the 12 template-driven projects, keyed by slug. */
export const projectDetails: Readonly<Record<string, ProjectDetail>> = {
  "dosevana-by-thrivewell": {
    tool: "Figma",
    heroAlt: "Dosevana by ThriveWell brand presentation",
    intro:
      "A digital healthcare platform connecting wellness businesses with prescription-based treatment programs.",
    overviewTitle: "Healthcare programs, made approachable.",
    overview:
      "Dosevana provides a structured digital experience for gyms, medical spas and wellness businesses offering physician-guided treatment programs. The platform presents these healthcare services through a clear, accessible experience.",
    goalTitle: "Make a complex offer easy to understand.",
    goal: "Present physician-guided, prescription-based programs to wellness businesses in a way that feels clear and trustworthy, while keeping the Dosevana by ThriveWell brand front and centre.",
    problemTitle: "Medical services can feel hard to follow.",
    problem:
      "Treatment programs, prescriptions and supporting medical services involve a lot of detail, which can overwhelm businesses evaluating the platform.",
    solutionTitle: "A clear, brand-led presentation.",
    solution:
      "The design leads with a bold Dosevana by ThriveWell identity and an energetic visual style, so the platform feels approachable before visitors dig into the program details.",
  },
  "docmedilink-website": {
    tool: "Figma",
    heroAlt: "DocMediLink homepage hero with illustrated telehealth journey",
    intro:
      "A telehealth website introducing virtual consultations, electronic prescriptions and lab services.",
    overviewTitle: "Care that travels to the patient.",
    overview:
      "DocMediLink presents telehealth services, including virtual consultations, electronic prescriptions, laboratory integrations and patient engagement. The website introduces these services to patients and healthcare providers.",
    goalTitle: "Introduce telehealth in a friendly way.",
    goal: "Explain what DocMediLink offers at a glance and give visitors a clear route to connect, with navigation for services, clinicians and contact details.",
    problemTitle: "Telehealth involves many connected services.",
    problem:
      "Consultations, prescriptions and lab work are separate steps, and presenting them together risks making the offer feel complicated.",
    solutionTitle: "One illustrated journey.",
    solution:
      "The homepage hero, \"Exceptional Care, Anywhere.\", uses an illustrated path that links phone, medication, clinician and secure-access visuals, with a single \"Let's Connect\" call to action.",
  },
  "dosevana-sales-plus": {
    tool: "Figma",
    heroAlt: "Dosevana Sales+ registration screen at step three",
    intro: "A step-by-step registration flow for Dosevana Sales+ associates.",
    overviewTitle: "Getting associates set up.",
    overview:
      "Dosevana Sales+ is a registration flow in which sales associates complete their profile. The supplied screen shows a three-step process: Basic Info, Review and Get Password.",
    goalTitle: "A registration flow people can finish.",
    goal: "Help associates complete registration with confidence by showing where they are in the process and letting them review what they have entered.",
    problemTitle: "Long forms lose people.",
    problem:
      "Registration asks for personal details and a photo before an account is ready, and a single long form makes it hard to see progress or check entries.",
    solutionTitle: "Clear steps with a review stage.",
    solution:
      "A three-step progress indicator shows completed steps with check marks, and the review step lets associates check their photo and basic info, with Edit links, before setting a password.",
  },
  "slimup-austin": {
    tool: "Figma",
    heroAlt: "SlimUp Austin website hero",
    intro: "A wellness website for SlimUp Austin, powered by Dosevana.",
    overviewTitle: "A wellness brand with energy.",
    overview:
      "SlimUp Austin is a wellness website powered by Dosevana. The supplied hero pairs the SlimUp Austin identity with full-bleed fitness photography.",
    goalTitle: "Make a strong first impression.",
    goal: "Introduce SlimUp Austin with a confident, energetic brand presence and connect it visibly to the Dosevana platform behind it.",
    problemTitle: "Two brands in one hero.",
    problem:
      "The page needs to establish the local SlimUp Austin brand while also showing that it is powered by Dosevana, without the two competing for attention.",
    solutionTitle: "Clear brand hierarchy.",
    solution:
      "The SlimUp Austin wordmark leads, with \"Powered by Dosevana\" in a secondary yellow banner beneath it. A numbered slide indicator and scroll cue invite visitors to explore further.",
  },
  solidx: {
    tool: "Figma",
    heroAlt: "SolidX brand mark over a modern building",
    intro: "A company website for SolidX.",
    overviewTitle: "A confident company presence.",
    overview:
      "SolidX is a company website. The supplied visual pairs the SolidX wordmark with architectural photography against a clear blue sky.",
    goalTitle: "Communicate stability at a glance.",
    goal: "Give SolidX a clean, professional web presence whose visual language feels solid and trustworthy from the first screen.",
    problemTitle: "Saying a lot with very little.",
    problem:
      "A company site's first screen has only a moment to set the tone before visitors decide whether to read on.",
    solutionTitle: "Strong brand, minimal noise.",
    solution:
      "A large wordmark and a single architectural image carry the first impression, keeping the composition calm and focused.",
  },
  "dosevana-qx": {
    tool: "Figma",
    heroAlt: "Dosevana QX thank-you landing page with a photo collage",
    intro: "A landing page for Dosevana QX.",
    overviewTitle: "A warm welcome after sign-up.",
    overview:
      "Dosevana QX is a landing page. The supplied screen shows a thank-you page with the message \"Your Wellness Journey Starts Here\", a \"Start Your Journey Here\" button and a collage of clinician and fitness portraits.",
    goalTitle: "Keep momentum after the first step.",
    goal: "Thank visitors and point them straight to the next action, so the wellness journey continues rather than ending on a confirmation message.",
    problemTitle: "Confirmation pages are often dead ends.",
    problem:
      "After someone signs up, a plain confirmation can leave them unsure what to do next.",
    solutionTitle: "A bold message and one next step.",
    solution:
      "A large \"Thanks for stopping by\" headline, a single primary button and a people-focused photo grid give the page warmth and one obvious next action.",
  },
  "tongkaboti-nature-retreat": {
    tool: "Figma",
    heroAlt:
      "Tongkaboti Nature Retreat website hero with the retreat at golden hour",
    intro: "A resort website for Tongkaboti Nature Retreat.",
    overviewTitle: "A retreat, introduced through place.",
    overview:
      "Tongkaboti Nature Retreat is a resort website. The supplied hero sets the Tongkaboti logo above a photograph of the retreat surrounded by forest at dusk.",
    goalTitle: "Let the setting sell the stay.",
    goal: "Help visitors imagine staying at the retreat by putting its natural surroundings and atmosphere first.",
    problemTitle: "Hospitality is about feeling.",
    problem:
      "A resort website needs to convey atmosphere and setting, which are hard to communicate through text alone.",
    solutionTitle: "Immersive photography first.",
    solution:
      "A full-width landscape photograph carries the hero, with a light, minimal logo lockup so the scenery stays the focus.",
  },
  "slimout-healthcare-website": {
    tool: "Claude",
    heroAlt: "SlimOut Healthcare website on a laptop and phone",
    intro:
      "A telehealth website presenting SlimOut's personalised care, on desktop and mobile.",
    overviewTitle: "Personalized healthcare, simplified.",
    overview:
      "The SlimOut Healthcare Website is a telehealth website. The supplied mockup shows the homepage on a laptop and a phone, leading with \"Personalized Healthcare. Simplified.\" and an \"Explore Treatment\" button.",
    goalTitle: "Make a broad range of care easy to explore.",
    goal: "Introduce SlimOut's range of care areas and guide visitors to explore treatments, with a layout that works on both desktop and mobile.",
    problemTitle: "Many care areas, one homepage.",
    problem:
      "The service spans weight management, hormone optimization, sexual wellness, sleep support, longevity, peptide therapy and hair restoration, which is a lot to present at once.",
    solutionTitle: "One clear promise, then the detail.",
    solution:
      "A short headline and single call to action lead, followed by a \"Care, made personal\" statement that lists each care area in one readable sentence. The same structure adapts to the phone layout.",
  },
  "slimout-v2": {
    tool: "Claude",
    heroAlt: "SlimOut V2 website on a desktop monitor and phone",
    intro: "The second version of the SlimOut telehealth website.",
    overviewTitle: "A second take on SlimOut.",
    overview:
      "SlimOut V2 is a telehealth website. The supplied mockup shows the homepage on a desktop monitor and a phone, with the \"Personalized Healthcare. Simplified.\" hero, a \"Get started\" button and an \"Explore Weight Loss Options\" section.",
    goalTitle: "Guide visitors towards treatment options.",
    goal: "Move visitors from the brand promise to concrete treatment options, starting with weight loss, across desktop and mobile.",
    problemTitle: "From promise to product.",
    problem:
      "Visitors need to move from a general healthcare message to specific options without losing their way.",
    solutionTitle: "A direct route to options.",
    solution:
      "Below the hero and care-area summary, an \"Explore Weight Loss Options\" section presents product cards, giving visitors a clear next place to look.",
  },
  "slimout-website-care-programs": {
    tool: "Claude",
    heroAlt: "SlimOut care programs page on a laptop and phone",
    intro:
      "A SlimOut website design built around its personalised care programs.",
    overviewTitle: "Care programs, laid out clearly.",
    overview:
      "SlimOut Website: Care Programs is a telehealth website. The supplied mockup shows a page that introduces SlimOut and then lays out its care programs: Weight Loss, Hormone Therapy, Anti-Aging, Sexual Health, Hair Regrowth, Pre-Workout, Sleep Support and Testosterone.",
    goalTitle: "Help visitors find the right program.",
    goal: "Let visitors scan every SlimOut care program in one place and choose the one that fits them.",
    problemTitle: "Choosing among many programs.",
    problem:
      "With eight care programs, visitors need a quick way to compare options without reading long descriptions.",
    solutionTitle: "A visual program grid.",
    solution:
      "An \"Explore SlimOut's personalized care programs\" section uses a grid of photo cards, one per program, each with a short label and arrow. A lime-green band separates the introduction from the programs.",
  },
  honeymeds: {
    tool: "Claude",
    heroAlt: "HoneyMeds web experience on a laptop",
    heroTag: "WEB APP",
    intro: "A sexual wellness project spanning an app and a web app.",
    overviewTitle: "One brand, two connected experiences.",
    overview:
      "HoneyMeds is a sexual wellness project made up of two connected experiences: an app and a web app. The supplied web mockup leads with \"Sweeten Your Sex Life\" and an \"Explore the Website\" button, with a \"Feel Ready\" section further down.",
    goalTitle: "Make a sensitive topic feel welcoming.",
    goal: "Present sexual wellness in a warm, confident tone, with a consistent HoneyMeds identity across the app and the web app.",
    problemTitle: "A personal subject.",
    problem:
      "Sexual wellness is a sensitive area, and the design needs to feel approachable and discreet rather than clinical or awkward.",
    solutionTitle: "Warm, confident branding.",
    solution:
      "A bold yellow headline, friendly copy and lifestyle photography give the web experience a positive, inviting tone, with one clear call to action.",
  },
  "tripkhata-website": {
    tool: "Figma",
    heroAlt: "TripKhata website homepage on a laptop",
    intro:
      "The marketing website for TripKhata, a digital ledger for transport businesses.",
    overviewTitle: "A ledger, made digital.",
    overview:
      "The TripKhata Website introduces TripKhata as a simple digital ledger for transport businesses. The supplied homepage leads with \"Trips, fares, accounts kept just like a ledger – digitally\" and two actions: Start Free and See a live demo.",
    goalTitle: "Explain the product in one line.",
    goal: "Help transport businesses understand straight away what TripKhata replaces, and give them an easy way to try it or see a demo.",
    problemTitle: "A new tool for a familiar habit.",
    problem:
      "Transport operators are used to keeping trips and accounts on paper, so a new tool has to feel familiar rather than complicated.",
    solutionTitle: "Speak the ledger's language.",
    solution:
      "The headline compares TripKhata directly to a ledger, and a truck photograph grounds it in the industry. Two clear calls to action cater to visitors ready to start and those who want a demo first.",
  },
};
