export type Certification = {
  title: string;
  description: string;
  pdfUrl: string;
};

export const certifications: Certification[] = [
  {
    title: "Harvard Leadership",
    description:
      "Leadership principles, influence, and decision-making frameworks for team impact.",
    pdfUrl: "/docs/Harvard.pdf",
  },
  {
    title: "AWS Certificate",
    description:
      "Cloud fundamentals: compute, storage, IAM, and best practices for deployments.",
    pdfUrl: "/docs/AWS Certificate.pdf",
  },
  {
    title: "Salesforce Administrator",
    description:
      "Admin essentials: org setup, data modeling, security, automation, and reporting.",
    pdfUrl: "/docs/Salesforce_Administrator.pdf",
  },
  {
    title: "MongoDB Certification",
    description:
      "Schema design, CRUD, indexing, and aggregation pipeline essentials.",
    pdfUrl: "/docs/MongoDB Certification.pdf",
  },
  {
    title: "AI Badge",
    description:
      "Core ML concepts, evaluation, and practical applications in AI.",
    pdfUrl: "/docs/Badge_AI_1BG21CS068.pdf",
  },
  {
    title: "CyberSecurity",
    description:
      "Threat basics, secure practices, and defensive techniques for modern systems.",
    pdfUrl: "/docs/Badge_CYS_1BG21CS068.pdf",
  },
];
