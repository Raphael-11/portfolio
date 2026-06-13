export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface CredentialGroup {
  label: string;
  title: string;
  items: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: "FiveM / CFX Freelance Developer & Server Manager",
    company: "Freelance / Tebex",
    period: "2024 - Present",
    summary:
      "Building and maintaining gameplay systems, custom resources, server operations, and monetization flows for live FiveM communities.",
    highlights: [
      "Supported 3 different FiveM/CFX servers across setup, hosting, resources, databases, Discord integrations, and live troubleshooting.",
      "Released 7+ public scripts and maintained 12+ internal or client-only scripts across Lua, JavaScript, NUI, admin tools, and gameplay systems.",
      "Built Tebex monetization workflows including product setup, custom theme work, client delivery, updates, and a headless Tebex API store prototype in Next.js.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Arkan",
    period: "1.5-Month Internship",
    summary:
      "Worked on a React Native seller application focused on inventory operations, order workflows, and seller support experiences.",
    highlights: [
      "Built mobile screens for inventory management, stock tracking, sales orders, and support-chat-oriented workflows.",
      "Worked with API-driven screens, reusable components, form validation, and seller-focused dashboard patterns.",
      "Used Swagger/OpenAPI documentation to understand, test, and integrate backend endpoints in a Magento-adjacent commerce environment.",
    ],
  },
  {
    role: "Freelance Discord Server Creator",
    company: "Fiverr",
    period: "Jan 2023 - May 2023",
    summary:
      "Delivered community server setups for clients who needed structure, moderation controls, and better onboarding flows.",
    highlights: [
      "Created and configured 10+ Discord server structures for community and client use.",
      "Set up channels, roles, permissions, bots, moderation flows, and onboarding layouts tailored to each server.",
    ],
  },
];

export const credentialGroups: CredentialGroup[] = [
  {
    label: "Education",
    title: "Software Engineering Student",
    items: [
      "Senior software engineering student with coursework and project work spanning web, mobile, backend systems, and applied product design.",
      "University name, degree title, and graduation date are still missing from the source CV and should be added as factual details.",
    ],
  },
  {
    label: "Recognition",
    title: "Proof Beyond Coursework",
    items: [
      "Best ISS Project of the Year for the Orange ISS Portal university project.",
      "450+ followers grown through the You Dare We Do course social media project.",
      "Freelance work spanning live servers, custom scripts, monetization flows, and client community setups.",
    ],
  },
  {
    label: "Certifications",
    title: "17 Completed Certificates",
    items: [
      "Artificial Intelligence: Ethics & Societal Challenges, Lund University",
      "Agile Project Management, Google",
      "Introduction to Android Mobile Application Development, Meta",
      "React Basics, Meta",
      "Interactivity with JavaScript, University of Michigan",
      "Programming Fundamentals, Duke University",
    ],
  },
];
