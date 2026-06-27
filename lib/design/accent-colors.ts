export type AccentColor = {
  bg: string;
  text: string;
  highlight: string;
  highlightStrong: string;
  hex: string;
};

export const accentColors: AccentColor[] = [
  {
    hex: "#FFD93D",
    bg: "bg-[#FFD93D]",
    text: "text-black",
    highlight: "bg-[#FFD93D]/45",
    highlightStrong: "bg-[#FFD93D]/65",
  },
  {
    hex: "#FF6B35",
    bg: "bg-[#FF6B35]",
    text: "text-white",
    highlight: "bg-[#FF6B35]/45",
    highlightStrong: "bg-[#FF6B35]/65",
  },
  {
    hex: "#635BFF",
    bg: "bg-[#635BFF]",
    text: "text-white",
    highlight: "bg-[#635BFF]/45",
    highlightStrong: "bg-[#635BFF]/65",
  },
  {
    hex: "#86EFAC",
    bg: "bg-[#86EFAC]",
    text: "text-black",
    highlight: "bg-[#86EFAC]/45",
    highlightStrong: "bg-[#86EFAC]/65",
  },
  {
    hex: "#2A5D67",
    bg: "bg-[#2A5D67]",
    text: "text-white",
    highlight: "bg-[#2A5D67]/45",
    highlightStrong: "bg-[#2A5D67]/65",
  },
  {
    hex: "#1E4D58",
    bg: "bg-[#1E4D58]",
    text: "text-white",
    highlight: "bg-[#1E4D58]/45",
    highlightStrong: "bg-[#1E4D58]/65",
  },
];

export type JapaneseAccentKey =
  | "sakura"
  | "indigo"
  | "matcha"
  | "sun"
  | "washi"
  | "inkRed"
  | "ikigaiSky"
  | "ikigaiHorizon"
  | "ikigaiDeep"
  | "ikigaiFoam"
  | "ikigaiCerulean";

export type AccentPaletteKey = JapaneseAccentKey;

export type AccentSwatch = {
  hex: string;
  bg: string;
  text: string;
  highlight: string;
  highlightStrong: string;
  orb: string;
  border: string;
};

export const japaneseAccents: Record<JapaneseAccentKey, AccentSwatch> = {
  sakura: {
    hex: "#F4A7B9",
    bg: "bg-[#F4A7B9]",
    text: "text-black",
    highlight: "bg-[#F4A7B9]/45",
    highlightStrong: "bg-[#F4A7B9]/65",
    orb: "bg-[#F4A7B9]/25",
    border: "border-[#F4A7B9]",
  },
  indigo: {
    hex: "#3D4F7C",
    bg: "bg-[#3D4F7C]",
    text: "text-white",
    highlight: "bg-[#3D4F7C]/45",
    highlightStrong: "bg-[#3D4F7C]/65",
    orb: "bg-[#3D4F7C]/25",
    border: "border-[#3D4F7C]",
  },
  matcha: {
    hex: "#8FB339",
    bg: "bg-[#8FB339]",
    text: "text-black",
    highlight: "bg-[#8FB339]/45",
    highlightStrong: "bg-[#8FB339]/65",
    orb: "bg-[#8FB339]/25",
    border: "border-[#8FB339]",
  },
  sun: {
    hex: "#E8A838",
    bg: "bg-[#E8A838]",
    text: "text-black",
    highlight: "bg-[#E8A838]/45",
    highlightStrong: "bg-[#E8A838]/65",
    orb: "bg-[#E8A838]/25",
    border: "border-[#E8A838]",
  },
  washi: {
    hex: "#F7F3EB",
    bg: "bg-[#F7F3EB]",
    text: "text-black",
    highlight: "bg-[#F7F3EB]/70",
    highlightStrong: "bg-[#F7F3EB]/90",
    orb: "bg-[#F7F3EB]/50",
    border: "border-[#F7F3EB]",
  },
  inkRed: {
    hex: "#C73E3A",
    bg: "bg-[#C73E3A]",
    text: "text-white",
    highlight: "bg-[#C73E3A]/45",
    highlightStrong: "bg-[#C73E3A]/65",
    orb: "bg-[#C73E3A]/25",
    border: "border-[#C73E3A]",
  },
  ikigaiSky: {
    hex: "#B8DFF5",
    bg: "bg-[#B8DFF5]",
    text: "text-black",
    highlight: "bg-[#B8DFF5]/55",
    highlightStrong: "bg-[#B8DFF5]/75",
    orb: "bg-[#B8DFF5]/35",
    border: "border-[#B8DFF5]",
  },
  ikigaiHorizon: {
    hex: "#6BB8E8",
    bg: "bg-[#6BB8E8]",
    text: "text-black",
    highlight: "bg-[#6BB8E8]/50",
    highlightStrong: "bg-[#6BB8E8]/70",
    orb: "bg-[#6BB8E8]/30",
    border: "border-[#6BB8E8]",
  },
  ikigaiDeep: {
    hex: "#2E6B9E",
    bg: "bg-[#2E6B9E]",
    text: "text-white",
    highlight: "bg-[#2E6B9E]/45",
    highlightStrong: "bg-[#2E6B9E]/65",
    orb: "bg-[#2E6B9E]/25",
    border: "border-[#2E6B9E]",
  },
  ikigaiFoam: {
    hex: "#E8F4FC",
    bg: "bg-[#E8F4FC]",
    text: "text-black",
    highlight: "bg-[#E8F4FC]/80",
    highlightStrong: "bg-[#E8F4FC]",
    orb: "bg-[#E8F4FC]/50",
    border: "border-[#C5E4F7]",
  },
  ikigaiCerulean: {
    hex: "#4A9FD4",
    bg: "bg-[#4A9FD4]",
    text: "text-white",
    highlight: "bg-[#4A9FD4]/50",
    highlightStrong: "bg-[#4A9FD4]/70",
    orb: "bg-[#4A9FD4]/30",
    border: "border-[#4A9FD4]",
  },
};

/** Rotating palette for inline highlights across sections */
export const highlightPalette: JapaneseAccentKey[] = [
  "sun",
  "matcha",
  "sakura",
  "indigo",
  "ikigaiCerulean",
  "ikigaiHorizon",
];

const sectionAccentMap: Record<string, JapaneseAccentKey[]> = {
  approach: ["matcha", "sun", "indigo", "sakura"],
  impact: ["sun", "matcha", "ikigaiCerulean", "sakura", "ikigaiHorizon", "indigo"],
  experience: ["indigo", "matcha", "sun", "sakura"],
  projects: ["sakura", "indigo", "sun", "ikigaiCerulean"],
  "case-studies": ["sakura", "matcha", "indigo"],
  funding: ["ikigaiHorizon", "sun", "matcha"],
  testimonials: ["sakura", "ikigaiCerulean"],
  faq: ["indigo", "matcha", "ikigaiHorizon"],
  contact: ["sun", "ikigaiCerulean", "sakura"],
  footer: ["ikigaiSky", "ikigaiHorizon", "ikigaiDeep", "ikigaiCerulean"],
};

export const ikigaiFooterTheme = {
  background: "bg-gradient-to-b from-[#E8F4FC] via-[#D9EDFA] to-[#C5E4F7]",
  backgroundDark:
    "dark:bg-gradient-to-b dark:from-[#0f1a24] dark:via-[#152535] dark:to-[#1a3050]",
  border: "border-[#B8DFF5]/60 dark:border-[#2E6B9E]/40",
  textMuted: "text-[#2E6B9E]/70 dark:text-[#B8DFF5]/70",
  kanji: "text-[#2E6B9E]/50 dark:text-[#6BB8E8]/50",
};

export function getAccent(index: number): AccentColor {
  return accentColors[index % accentColors.length];
}

export function getJapaneseAccent(key: JapaneseAccentKey): AccentSwatch {
  return japaneseAccents[key];
}

export function getHighlightAccent(index: number): AccentSwatch {
  const key = highlightPalette[index % highlightPalette.length];
  return japaneseAccents[key];
}

export function getSectionAccent(sectionId: string, index = 0): AccentSwatch {
  const keys = sectionAccentMap[sectionId] ?? highlightPalette;
  return japaneseAccents[keys[index % keys.length]];
}

export const companyAccentMap = {
  chromatics: japaneseAccents.sakura,
  ether: japaneseAccents.ikigaiCerulean,
  navana: japaneseAccents.sun,
} as const;
