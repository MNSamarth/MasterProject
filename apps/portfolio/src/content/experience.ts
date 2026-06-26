export type Experience = {
  company: string;
  role: string;
  location?: string;
  dates: string;
  summary: string;
  imageSrc?: string;
  proofUrl?: string;
  tags?: string[];
};

export const experience: Experience[] = [
  {
    company: "Vylar (Lost Stories)",
    role: "AI Research Intern",
    location: "Bengaluru, India",
    dates: "Sep 2024 – Feb 2025",
    summary:
      "Built an end-to-end ingestion + processing pipeline in Python, cutting multilingual transcription time by 85%. Shipped a moderation dashboard, creator analytics, and a geolocation recommendation engine to improve discoverability ~40%.",
    imageSrc: "/images/experience-loststories.jpg",
    proofUrl: "/docs/LostStoriesInternship.pdf",
    tags: ["Python", "AI/ML", "Full-stack"],
  },
  {
    company: "Vidatt Data Analytics Pvt Ltd",
    role: "Front End Developer Intern",
    location: "Bengaluru, India",
    dates: "Sep 2023 – Dec 2023",
    summary:
      "Improved UI render efficiency ~2× by re-architecting 15+ React components and implementing performance-oriented visuals. Added Jest tests for hooks with 100% coverage on critical logic; contributed to a ~30% retention lift.",
    imageSrc: "/images/experience-vidatt.png",
    proofUrl: "/docs/Vidatt.pdf",
    tags: ["React", "Frontend", "Testing"],
  },
  {
    company: "Samsung PRISM",
    role: "Intern — Border Matching Worklet",
    location: "Bengaluru, India",
    dates: "Jun 2023 – Dec 2023",
    summary:
      "Reduced manual image-comparison workload by 75%+ by building a Python + OpenCV batch validation tool with clear evaluation criteria and visual diffs.",
    imageSrc: "/images/experience-samsung-prism.png",
    proofUrl: "/docs/Samsung Prism Certificate.pdf",
    tags: ["OpenCV", "Python", "Computer Vision"],
  },
  {
    company: "Contriver",
    role: "Developer Intern (Full Stack & AI/ML)",
    dates: "Oct 2023 – Nov 2023",
    summary:
      "Delivered responsive pages with WordPress and built CV models for age/gender (95%+ accuracy) and face-mask recognition (~98%) with tuned preprocessing.",
    imageSrc: "/images/experience-contriver.jpg",
    proofUrl: "/docs/Contriver Certificate.pdf",
    tags: ["WordPress", "TensorFlow", "Computer Vision"],
  },
  {
    company: "BNM Institute of Technology (BNMIT)",
    role: "Internal Intern (Java & Multimedia)",
    location: "Bengaluru, India",
    dates: "2023",
    summary:
      "Completed project-based internships in intermediate Java and multimedia; won 1st place in the program Java hackathon.",
    imageSrc: "/images/experience-bnmit.jpg",
    proofUrl: "/docs/Multimedia Internship.pdf",
    tags: ["Java", "Teamwork"],
  },
];
