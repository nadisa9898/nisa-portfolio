export interface Recommendation {
  name: string;
  /** Photo key: public/images/rec-<photo>.webp */
  photo: string;
  title: string;
  text: string;
  url: string;
}

const source = "https://www.linkedin.com/in/nadianisa/details/recommendations/?detailScreenTabIndex=0";

/** LinkedIn recommendations. Entries ending in "[Full recommendation text coming soon.]" are placeholders: replace with the full LinkedIn text. */
export const recommendations: readonly Recommendation[] = [
  {
    name: "Mahady Hasan",
    photo: "mahady",
    title: "UI/UX Designer & Product Thinker · Managed Nadia directly",
    text: "I had the pleasure of working closely with Nadia Nisa, and I highly recommend her as a talented and skilled UI/UX Designer.\n\nNadia has a strong understanding of UI/UX principles and is highly proficient in Figma, FigJam, and other modern design tools. She also has excellent expertise in AI-powered design workflows, particularly Claude Design, which allows her to create innovative, efficient, and user-friendly design solutions [Full recommendation text coming soon.]",
    url: source,
  },
  {
    name: "Md. Tanvir Jubayer",
    photo: "tanvir",
    title: "UI/UX Team Lead · Senior Product Designer · Managed Nadia directly",
    text: "I’ve had the pleasure of working with Nadia for over two years, watching her grow from a fresher into a skilled UI/UX Designer. She is responsible, committed, and professional, with strong expertise in Figma, Adobe tools, and AI-powered design. I highly recommend her for any team looking for a dedicated and talented designer.",
    url: source,
  },
  {
    name: "Rubaiati Zannat",
    photo: "rubaiati",
    title: "UI/UX Designer (Web & Landing Pages) · Nadia’s mentor",
    text: "I’ve had the pleasure of mentoring Nadia Nisa, and I’ve witnessed her grow into a talented and dependable UX/UI designer. Her ability to understand user needs and translate them into clean, intuitive designs has consistently impressed me. What truly sets Nadia apart is not only her design skills but also her mindset — she approaches every challenge with curiosity, remains open to feedback, and is always eager to improve. Her dedication to growth and her collaborative nature make her an asset in any team setting. I have no doubt that Nadia will continue to thrive and make meaningful contributions throughout her design career.",
    url: source,
  },
  {
    name: "Shaikh Iftekhar Alif",
    photo: "shaikh",
    title: "COO & Creative Director at Exoveon · Nadia’s teacher",
    text: "I had the pleasure of mentoring Nadia during her journey into the world of UI/UX design. She's a quick learner with a strong sense of design and attention to detail. What impressed me most was her dedication to continuous improvement and her ability to take feedback constructively. I’m confident she’ll bring value to any team she joins.",
    url: source,
  },
  {
    name: "SOHANUL HABIB",
    photo: "sohanul",
    title: "Senior Product Designer · UX Mentor · Nadia’s mentor",
    text: "I’ve had the pleasure of knowing and working with Nadia Nisa, and I must say — she’s a passionate and detail-oriented UI/UX Designer with a great sense of empathy for users.\n\nNadia has a natural ability to understand user needs and translate them into intuitive, elegant design solutions. From user research to wireframing, prototyping, and delivering polished UI designs, she approaches each step with dedication and creativity. Her Figma skills are solid, and she’s always exploring ways to improve her work through feedback and iteration [Full recommendation text coming soon.]",
    url: source,
  },
  {
    name: "MD. Munim Bin Salim",
    photo: "munim",
    title: "Seasoned Graphic Designer · Video Editor · Nadia’s teacher",
    text: "Nadia is a very skilled and passionate UX designer. Her attention to details, commitment to her work and dedication to find the best solution are praiseworthy. She goes deep into finding the solution of the problem at hand. She is also very good with Figma and her files are developer-friendly. I wish her the best for her career.",
    url: source,
  },
  {
    name: "Tumelo Webb",
    photo: "tumelo",
    title: "UI/UX Designer · Graphic Designer · Product Designer · Worked with Nadia on different teams",
    text: "I had the pleasure of mentoring Nadia Nisa during her time on my program and I can confidently say she is one of the most dedicated and consistent young professionals I’ve worked with.\n\nFrom the very beginning, Nadia demonstrated a strong commitment to her craft. She approached every task—no matter how small or complex—with a level of focus and discipline that truly set her apart. Her ability to absorb feedback, iterate quickly, and consistently deliver thoughtful, [Full recommendation text coming soon.]",
    url: source,
  },
];
