export type Project = {
  slug: string;
  title: string;
  summary: string;
  imageSrc?: string;
  year?: string;
  stack?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "promptquest",
    title: "PromptQuest",
    summary:
      "Real-time prompt-engineering game with structured evaluation, instant feedback, and dynamic scoring. Won 1st Place at Vercel Software Awards (Good Vibes Only Buildathon).",
    year: "2026",
    stack: ["Next.js", "Full-stack", "LLM"],
    repoUrl: "https://github.com/MNSamarth/PromptQuest",
    imageSrc: "/images/PromptQuest.png",
    featured: true,
  },
  {
    slug: "eventsearch",
    title: "EventSearch",
    summary:
      "Location-aware event discovery with fast filtering and scalable REST APIs, designed for low-latency browsing and clean data modeling.",
    year: "2025",
    stack: ["Backend", "REST APIs", "Database"],
    repoUrl: "https://github.com/MNSamarth/EventSearch",
    imageSrc: "/images/EventSearch.png",
    featured: true,
  },
  {
    slug: "isl-recognition",
    title: "Indian Sign Language Recognition",
    summary:
      "Real-time ISL alphabet/word recognition using a lightweight CV pipeline + CNN, optimized for reliability on consumer webcams.",
    stack: ["Python", "Computer Vision", "CNN"],
    repoUrl: "https://github.com/MNSamarth/ISL-Interpreter",
    imageSrc: "/images/ISL.png",
    featured: true,
  },
  {
    slug: "anpr",
    title: "Automatic Number Plate Recognition (ANPR)",
    summary:
      "Plate detection, perspective stabilization, character segmentation, and OCR with pragmatic post-processing for regional formats.",
    stack: ["OpenCV", "OCR", "Computer Vision"],
    repoUrl: "https://github.com/MNSamarth/Automated-Number-Plate-Detection",
    imageSrc: "/images/ANPR.jpg",
    featured: true,
  },
  {
    slug: "automail-ai",
    title: "AutoMail AI",
    summary:
      "Context-aware email drafting with templates, tone controls, and fast iteration — designed to produce human-sounding drafts.",
    stack: ["Python", "Flask", "NLP"],
    repoUrl: "https://github.com/MNSamarth/Automatic-Mail-Generator-and-Sender-AI",
    imageSrc: "/images/AutomailAI.png",
  },
  {
    slug: "stockoporto",
    title: "StockOPorto",
    summary:
      "Portfolio exploration with readable charts for drawdowns/risk and simple what-if scenarios, built for clarity over jargon.",
    stack: ["Python", "Pandas", "Finance"],
    repoUrl:
      "https://github.com/MNSamarth/Stock-Portfolio-and-Prediction-StockoPorto",
    imageSrc: "/images/StockOPorto.png",
  },
  {
    slug: "template-matching",
    title: "Template Matching",
    summary:
      "Compact demonstration of classical pattern search with swapable templates, thresholds, and false-positive inspection.",
    stack: ["OpenCV", "Python"],
    imageSrc: "/images/BorderMatching.png",
  },
  {
    slug: "easydine",
    title: "Restaurant Reservation System (EasyDine)",
    summary:
      "Straightforward CRUD for managing tables/timeslots with conflict visibility and quick edits on a simple maintainable stack.",
    stack: ["HTML/CSS/JS", "MySQL"],
    repoUrl: "https://github.com/MNSamarth/Restaurant-Reservation-System-EasyDine",
    imageSrc: "/images/EasyDine.png",
  },
];
