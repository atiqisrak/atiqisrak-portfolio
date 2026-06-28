/**
 * Single source of typed content for portfolio components.
 * Copy authority: PLAN.md — headline metrics from PLAN win over legacy site data.
 *
 * Metric conflicts resolved (PLAN wins):
 * - Navana savings: old site "$20K+" → PLAN "$40M"
 * - AssetIQ growth: old generic RFID copy → PLAN "264%" / "99.4% accuracy"
 * - Sumo impact: old generic e-commerce metrics → PLAN IoT narrative
 */

export type Company = "chromatics" | "ether" | "navana";

export type Product = {
  slug: string;
  name: string;
  company: Company;
  oneLiner: string;
  url: string | null;
  metrics?: string[];
  caseStudySlug?: string;
};

export type Job = {
  slug: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  headlineMetrics?: string[];
  supportingMetrics?: string[];
  productSlugs?: string[];
};

export type ImpactStat = {
  value: string;
  label: string;
};

export type ContactLink = {
  label: string;
  href: string;
  type: "email" | "social" | "resume";
};

export type ApproachStep = {
  number: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  placeholder?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FundingRound = {
  product: string;
  productSlug?: string;
  round: "Pre-seed" | "Seed";
  amount: string;
  investor: string;
  role: string;
};

export type FundingTractionStat = {
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  proofLine: string;
  skillPills: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export const SITE_URL = "https://atiqisrak.vercel.app";

export const hero: HeroContent = {
  eyebrow: "Product leader · AI builder · Growth operator · Open to new roles",
  headline: "I don't just ship products. I grow businesses.",
  subhead:
    "I'm Atiq Israk — a product leader who turns AI and operational rigor into outcomes you can count in dollars. My journey began as a developer; today I'm ex-Toyota (Navana), IBA-trained, and 15+ products deep across B2B and B2C.",
  proofLine:
    "$40M saved through automation. 264% revenue growth from a single AI-powered platform. Products running in 1,000+ restaurants, 3 universities, and millions of consumer devices.",
  skillPills: [
    "Brand Strategy",
    "UI/UX",
    "AI Products",
    "Growth",
    "Workflow Automation",
    "Enterprise SaaS",
  ],
  ctaPrimary: { label: "See the impact →", href: "#impact" },
  ctaSecondary: { label: "Let's talk", href: "#contact" },
};

export const impactStats: ImpactStat[] = [
  { value: "$40M", label: "Saved through workflow automation (Toyota / Navana)" },
  { value: "264%", label: "Revenue growth driven by AssetIQ" },
  { value: "15+", label: "Products shipped across B2B and B2C" },
  { value: "1M+", label: "Consumer downloads driven (Aisha)" },
  { value: "1,000+", label: "Restaurants running products I've built (Neoshift)" },
  { value: "7+", label: "Years shipping products (since Feb 2019)" },
];

export const jobs: Job[] = [
  {
    slug: "chromatics-ai",
    company: "Chromatics AI",
    role: "Product Manager",
    startDate: "2026-04-01",
    endDate: "Present",
    description:
      "Building a portfolio of AI products — Bento, Aisha, GEO — from problem to revenue. I own strategy, scope, and the metrics that prove they work, building for real businesses, not demos.",
    productSlugs: ["bento", "aisha", "geo"],
  },
  {
    slug: "ether-technologies",
    company: "Ether Technologies",
    role: "Product Manager",
    startDate: "2021-01-01",
    endDate: "2026-03-30",
    description:
      "Shipped eight products spanning infrastructure, commerce, healthcare, and AI: a MACH headless CMS (Mave), a Cloudinary-class CDN (Luca), an AI LMS (Mave LMS), a DAM (Rango), a smart-restaurant IoT platform (Sumo), AssetIQ — an RFID + AI inventory system that drove 264% revenue growth — plus Aranya e-commerce and UHL hospital management.",
    headlineMetrics: ["264% revenue growth (AssetIQ)", "99.4% inventory accuracy (AssetIQ)"],
    supportingMetrics: [
      "30% faster deployments, 20% lower ops cost (Mave)",
      "40% course completion ↑, 25% dropout ↓ (Mave LMS)",
      "35% faster load times, 20% conversion lift (Aranya)",
      "40% operational efficiency, 60% faster scheduling (UHL)",
    ],
    productSlugs: [
      "assetiq",
      "sumo",
      "luca",
      "mave",
      "mave-lms",
      "rango",
      "aranya",
      "uhl",
    ],
  },
  {
    slug: "navana",
    company: "Navana",
    role: "Product Manager",
    startDate: "2019-01-01",
    endDate: "2021-12-31",
    description:
      "Where the discipline started. Built smart vehicle tracking, maintenance management, and service-queue automation for Toyota (Navana is Toyota's authorized distributor) — saving $40M. Also led Gloria Jean's Coffees' apps (Bangladesh + Australia), Neoshift POS (1,000+ restaurants), and Navbot.",
    headlineMetrics: ["$40M saved (Toyota systems)"],
    supportingMetrics: [
      "27% sales boost, 40% repeat customers, 65% digital-order adoption (Gloria Jean's)",
      "75% faster response, 85% inquiry automation (Navbot)",
    ],
    productSlugs: ["toyota-systems", "gloria-jeans", "neoshift", "navbot"],
  },
  {
    slug: "techcare",
    company: "TechCare Inc.",
    role: "Frontend Web Developer",
    startDate: "2019-02-01",
    endDate: "2020-07-31",
    description:
      "Built and productized 120+ responsive web templates on React/Next.js with animation tooling (Lottie, GSAP). Templates reached 863K+ global downloads and 430K+ purchases on Templately — early proof of shipping at scale and understanding developer users.",
    supportingMetrics: [
      "120+ web templates shipped",
      "863K+ global downloads",
      "430K+ purchases",
      "100% WCAG compliance",
    ],
  },
];

export const products: Product[] = [
  {
    slug: "bento",
    name: "Bento",
    company: "chromatics",
    oneLiner:
      "AI platform for small businesses, built around a brand-voice wedge.",
    url: "https://bentosocial.ai",
    caseStudySlug: "bento",
  },
  {
    slug: "aisha",
    name: "Aisha",
    company: "chromatics",
    oneLiner:
      "Privacy-first AI assistant built for the Black community; 1M+ downloads, low CAC, strong retention.",
    url: "https://aisha.ai/",
  },
  {
    slug: "geo",
    name: "GEO",
    company: "chromatics",
    oneLiner:
      "Generative engine for e-commerce, deployed in a top fashion brand, a leading leather business, and a major trading/shipment operation.",
    url: null,
  },
  {
    slug: "assetiq",
    name: "AssetIQ",
    company: "ether",
    oneLiner:
      "RFID + AI inventory with analytics; integrates Snowflake & Power BI. Drove 264% revenue growth; lifted inventory accuracy to 99.4%.",
    url: "https://assetiq.ethertech.ltd",
    metrics: ["264% revenue growth", "99.4% inventory accuracy"],
    caseStudySlug: "assetiq",
  },
  {
    slug: "sumo",
    name: "Sumo",
    company: "ether",
    oneLiner:
      "Smart-restaurant platform with IoT (POS, cameras, digital weigh, conveyor); deployed across 3 universities, 2 manufacturing orgs, and a major telco.",
    url: "https://sumo.ethertech.ltd",
    caseStudySlug: "sumo",
  },
  {
    slug: "luca",
    name: "Luca",
    company: "ether",
    oneLiner:
      "Scalable CDN with native + global server-switching; a Cloudinary-class performance play.",
    url: null,
  },
  {
    slug: "mave",
    name: "Mave",
    company: "ether",
    oneLiner: "MACH-based headless CMS powering enterprise sites.",
    url: "https://mave.ethertech.ltd",
    metrics: [
      "30% faster deployments",
      "20% lower ops cost",
      "40% content-delivery speed",
      "95% editor satisfaction",
    ],
  },
  {
    slug: "mave-lms",
    name: "Mave LMS",
    company: "ether",
    oneLiner:
      "AI LMS that auto-builds learning paths, scripts, and videos and manages students end to end.",
    url: "https://mave-lms.ethertech.ltd",
    metrics: [
      "40% course completion ↑",
      "25% dropout ↓",
      "90% engagement",
    ],
  },
  {
    slug: "rango",
    name: "Rango",
    company: "ether",
    oneLiner: "AI-powered digital asset management.",
    url: null,
  },
  {
    slug: "aranya",
    name: "Aranya",
    company: "ether",
    oneLiner:
      "E-commerce platform transformation; 35% faster load times, 20% conversion lift.",
    url: "https://www.aranya.com.bd/",
    metrics: ["35% faster load times", "20% conversion lift"],
    caseStudySlug: "aranya",
  },
  {
    slug: "uhl",
    name: "UHL",
    company: "ether",
    oneLiner:
      "Hospital management system for United Hospital Limited; 40% operational efficiency, 60% faster scheduling.",
    url: "https://www.uhlbd.com/",
    metrics: ["40% operational efficiency", "60% faster scheduling"],
    caseStudySlug: "uhl",
  },
  {
    slug: "toyota-systems",
    name: "Toyota systems",
    company: "navana",
    oneLiner:
      "Smart vehicle tracking, maintenance management, service-queue automation ($40M saved).",
    url: "https://www.toyota-bd.com/",
    metrics: ["$40M saved through automation"],
  },
  {
    slug: "gloria-jeans",
    name: "Gloria Jean's Coffees",
    company: "navana",
    oneLiner:
      "Delivery, customer, and dine-in apps for BD + AU, offline-first.",
    url: "https://gloriajeanscoffeesbd.com/menu",
    metrics: [
      "27% sales boost",
      "40% repeat customers",
      "65% digital-order adoption",
    ],
  },
  {
    slug: "neoshift",
    name: "Neoshift",
    company: "navana",
    oneLiner: "Smart POS in 1,000+ restaurants.",
    url: null,
    metrics: ["1,000+ restaurants"],
  },
  {
    slug: "navbot",
    name: "Navbot",
    company: "navana",
    oneLiner:
      "AI chatbot for social-media customer queries and appointment scheduling.",
    url: null,
    metrics: [
      "75% faster response",
      "85% inquiry automation",
      "40% satisfaction ↑",
    ],
  },
];

export const productsByCompany = {
  chromatics: products.filter((p) => p.company === "chromatics"),
  ether: products.filter((p) => p.company === "ether"),
  navana: products.filter((p) => p.company === "navana"),
} as const;

export const approachHeading =
  "Most PMs manage roadmaps. I manage outcomes.";

export const approachIntro =
  "A roadmap is easy to fill and easy to hide behind. The only question that matters is harder: did the business get bigger, faster, or leaner because this shipped? I start at the outcome and work backward — I can name the number a feature is meant to move before we build it.";

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Find the money",
    description:
      "I locate where growth is trapped: a manual process bleeding cost, a stockout bleeding sales, a market nobody serves. I size the prize before a line of code is written.",
  },
  {
    number: "02",
    title: "Build the machine",
    description:
      "I turn it into product: AI where it earns its keep, automation where work repeats, ruthless scope where it doesn't. Shipped fast, measured honestly.",
  },
  {
    number: "03",
    title: "Compound the gains",
    description:
      "Toyota taught me growth isn't one big launch; it's a hundred one-percent improvements that stack. I build systems that keep paying off long after the release note.",
  },
];

export const contact = {
  heading: "Open to what's next.",
  body: "I'm open to product leadership roles where the goal is growth — building AI products that move a real number: revenue, cost, or scale. If that's the kind of team you're building, let's talk.",
  email: "atiqisrak@gmail.com",
  resumePath: "/AtiqIsrak_Resume.pdf",
};

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:atiqisrak@gmail.com", type: "email" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/atiq-israk",
    type: "social",
  },
  { label: "GitHub", href: "https://github.com/atiqisrak", type: "social" },
  {
    label: "Product Hunt",
    href: "https://producthunt.com/@atiqisrak",
    type: "social",
  },
  {
    label: "Twitter/X",
    href: "https://twitter.com/atiqisrak",
    type: "social",
  },
  {
    label: "Resume",
    href: "/AtiqIsrak_Resume.pdf",
    type: "resume",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Atiq has a rare instinct for the one thing that matters. He'll cut a bloated scope in half and somehow the numbers go up. He thinks like an owner, not a feature manager.",
    name: "Syed Quadry",
    title: "Head of Product",
    company: "Grameed Digital Healthcare",
    placeholder: true,
  },
  {
    quote:
      "He's the only PM I've worked with who could add real value in a roadmap review and a code review. He brings the problem, not a dictated solution — which is exactly why the team shipped faster with him.",
    name: "Rafin Hossain",
    title: "Engineering Lead",
    company: "Ether Technologies Ltd.",
    placeholder: true,
  },
  {
    quote:
      "Atiq turned our inventory from a guessing game into something leadership finally trusts. The accuracy alone was worth it — the revenue lift was the part we didn't see coming.",
    name: "Imran Chowdhury",
    title: "Founder & CEO",
    company: "The Lounge",
    placeholder: true,
  },
  {
    quote:
      "Calm under pressure, ruthless about priorities, and genuinely technical. Atiq is the person you want owning the product when the stakes are real.",
    name: "Nafis Ahmed",
    title: "Head of Operations",
    company: "Neoshift",
    placeholder: true,
  },
  {
    quote:
      "Atiq made me a better builder. He'd always push me to name the outcome before the feature — I still hear that voice every time I scope something.",
    name: "Maliha Hasan",
    title: "Associate Product Manager",
    company: "Codement Craft",
    placeholder: true,
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "Who is Atiq Israk?",
    answer:
      "Atiq Israk is a product leader and AI builder based in Dhaka, Bangladesh. He turns AI and operational rigor into measurable business growth, and has shipped 15+ products across B2B and B2C at Chromatics AI, Ether Technologies, and Navana.",
  },
  {
    question: "What has Atiq Israk built?",
    answer:
      "Products including Bento (AI for SMBs), Aisha (an AI assistant with 1M+ downloads), AssetIQ (RFID + AI inventory that drove 264% revenue growth), Sumo (smart-restaurant IoT), Luca (a Cloudinary-class CDN), Mave (a MACH CMS), Aranya (e-commerce), UHL (hospital management), and Neoshift (POS in 1,000+ restaurants).",
  },
  {
    question: "What are his biggest results?",
    answer:
      "$40M saved by automating workflows at Toyota (via Navana), and 264% revenue growth driven by AssetIQ.",
  },
  {
    question: "What makes him different from other product managers?",
    answer:
      "Toyota operational rigor, IBA business strategy, and hands-on AI building — he ships AI products and can read the code that runs them. His journey began as a frontend developer shipping 863K+ template downloads.",
  },
  {
    question: "Is Atiq Israk available for new roles?",
    answer:
      "Yes. He's open to product leadership roles building AI products with real business outcomes. The best way to reach him is via the contact section or LinkedIn.",
  },
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atiq Israk",
  url: SITE_URL,
  jobTitle: "Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "Chromatics AI",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institute of Business Administration, University of Dhaka",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  knowsAbout: [
    "Product Management",
    "Artificial Intelligence",
    "AI Products",
    "Digital Transformation",
    "Workflow Automation",
    "Enterprise Software",
    "Product Strategy",
  ],
  description:
    "Product leader who turns AI and operational rigor into business growth. Ex-Toyota (Navana), IBA-trained, 15+ products shipped across B2B and B2C. $40M saved through automation; 264% revenue growth driven by AssetIQ.",
  sameAs: [
    "https://www.linkedin.com/in/atiq-israk",
    "https://github.com/atiqisrak",
    "https://producthunt.com/@atiqisrak",
    "https://twitter.com/atiqisrak",
  ],
};

export const seo = {
  title: "Atiq Israk — Product Leader & AI Builder | Growth Operator",
  description:
    "Atiq Israk is a product leader who turns AI and operational rigor into business growth. Ex-Toyota (Navana), IBA-trained, 15+ products shipped — from a Cloudinary-class CDN to AI assistants used by millions. $40M saved, 264% revenue growth.",
  ogTitle: "Atiq Israk — I don't just ship products. I grow businesses.",
};

export const fundingNarrative =
  "Products I've led have collectively raised external funding across pre-seed and seed rounds — and I've owned the metrics, narrative, and demos that investors saw.";

export const fundingRounds: FundingRound[] = [
  {
    product: "Bento",
    productSlug: "bento",
    round: "Pre-seed",
    amount: "$500K",
    investor: "Confidential",
    role: "Built the product narrative, metrics, and demo",
  },
  {
    product: "AssetIQ",
    productSlug: "assetiq",
    round: "Seed",
    amount: "$1.2M",
    investor: "The Federal",
    role: "Led the product roadmap shown to investors",
  },
  {
    product: "Aisha",
    productSlug: "aisha",
    round: "Seed",
    amount: "$1.5M",
    investor: "Confidential",
    role: "Owned the growth + retention story in the data room",
  },
  {
    product: "Sumo",
    productSlug: "sumo",
    round: "Seed",
    amount: "$800K",
    investor: "The Lounge Pvt.",
    role: "Deployment proof + enterprise pipeline",
  },
  {
    product: "Luca",
    productSlug: "luca",
    round: "Pre-seed",
    amount: "$300K",
    investor: "Caterpillar Inc.",
    role: "Positioning vs. Cloudinary + technical narrative",
  },
];

export const fundingTraction: FundingTractionStat[] = [
  { value: "1,000+", label: "Restaurants running Neoshift" },
  { value: "1M+", label: "Consumer downloads (Aisha)" },
  { value: "17 Enterprise", label: "Campus, factory & telco deployments (Sumo)" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  dek: string;
  href: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bento",
    title: "Bento: giving small businesses an AI team they could never hire",
    dek: 'How a brand-voice wedge turned "another AI tool" into something founders run their business on.',
    href: "/blogs",
  },
  {
    slug: "sumo",
    title: "Sumo: turning a restaurant's chaos into a system that runs itself",
    dek: "POS, cameras, scales, and conveyors wired into one AI nervous system — deployed across campuses, factories, and a telco.",
    href: "/projects/sumo",
  },
  {
    slug: "assetiq",
    title: "AssetIQ: making inventory tell the truth — and unlocking 264% growth",
    dek: "RFID + AI turned a guessing game into real-time truth, ended stockouts, and nearly quadrupled revenue.",
    href: "/projects/assetiq",
  },
];

/** Maps portfolio product slug → /projects/[slug] page key in data.json */
export const productToProjectPageSlug: Partial<Record<string, string>> = {
  mave: "mave-cms",
  "mave-lms": "mave-lms",
  assetiq: "assetiq",
  sumo: "sumo",
  aranya: "aranya",
  uhl: "uhl",
  navbot: "navbot",
  "gloria-jeans": "gloria-jeans",
  techcare: "techcare",
};

export const projectPageSlugs = new Set(Object.values(productToProjectPageSlug));

export function formatJobPeriod(startDate: string, endDate: string): string {
  const format = (value: string) => {
    if (value === "Present") return "Present";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return `${format(startDate)} — ${format(endDate)}`;
}

export function getProjectPageHref(productSlug: string): string | null {
  const pageSlug = productToProjectPageSlug[productSlug] ?? productSlug;
  if (!projectPageSlugs.has(pageSlug)) return null;
  return `/projects/${pageSlug}`;
}

export const companyLabels: Record<Company, string> = {
  chromatics: "Chromatics AI",
  ether: "Ether Technologies",
  navana: "Navana",
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getProductsForJob(jobSlug: string): Product[] {
  const job = getJobBySlug(jobSlug);
  if (!job?.productSlugs) return [];
  return job.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}
