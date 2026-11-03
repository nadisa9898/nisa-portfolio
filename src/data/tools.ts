export interface Tool {
  abbr: string;
  name: string;
  use: string;
  background: string;
}

/** Tools shown as flip coins in the Tools section. */
export const tools: readonly Tool[] = [
  { abbr: "Fg", name: "Figma", use: "Interface design & prototyping", background: "#BCEBFF" },
  { abbr: "FM", name: "Figma Make", use: "AI-assisted design in Figma", background: "#FFFDF6" },
  { abbr: "Ai", name: "Illustrator", use: "Vector graphics & icons", background: "#FFF3A6" },
  { abbr: "Ps", name: "Photoshop", use: "Image editing & retouching", background: "#FFC8E7" },
  { abbr: "Wx", name: "Wix Studio", use: "Building websites", background: "#BCEBFF" },
  { abbr: "Cv", name: "Canva", use: "Quick graphics & social posts", background: "#FFFDF6" },
  { abbr: "St", name: "Google Stitch", use: "AI UI generation", background: "#C9B8FF" },
  { abbr: "Fp", name: "Freepik AI", use: "AI imagery & assets", background: "#FFF3A6" },
  { abbr: "Gp", name: "ChatGPT", use: "Ideas, copy & research", background: "#FFC8E7" },
  { abbr: "Gm", name: "Gemini", use: "Research & ideation", background: "#BCEBFF" },
  { abbr: "Cl", name: "Claude", use: "Writing & thinking partner", background: "#FFFDF6" },
  { abbr: "No", name: "Notion", use: "Docs & project planning", background: "#C9B8FF" },
];
