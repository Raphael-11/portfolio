export interface StackGroup {
  label: string;
  items: StackItem[];
}

export interface StackItem {
  name: string;
  description?: string;
}

export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", description: "Component-based UI library" },
      { name: "Next.js", description: "React framework for production" },
      { name: "TypeScript", description: "Typed JavaScript" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Motion", description: "Production-ready animation" },
      { name: "GSAP", description: "Professional-grade animation" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "NestJS", description: "Progressive Node.js framework" },
      { name: "Express", description: "Fast web framework for Node.js" },
      { name: "REST APIs", description: "API design and development" },
      { name: "Swagger", description: "API documentation" },
      { name: "Authentication", description: "JWT, OAuth, session-based auth" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB", description: "NoSQL document database" },
      { name: "MySQL Basics", description: "Relational database fundamentals" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", description: "Cross-platform mobile development" },
      { name: "Google Maps API", description: "Location-based services" },
      { name: "QR Code Workflows", description: "Scan-based interactions" },
    ],
  },
  {
    label: "Design",
    items: [
      { name: "Figma", description: "Interface design and prototyping" },
      { name: "Responsive UI", description: "Adaptive layouts for all screens" },
      { name: "Interaction Polish", description: "Motion, spacing, and detail refinement" },
      { name: "Prototyping", description: "Interactive mockups and flows" },
    ],
  },
  {
    label: "Other",
    items: [
      { name: "Java", description: "Object-oriented programming" },
      { name: "Scene Builder", description: "JavaFX UI design tool" },
      { name: "Git", description: "Version control system" },
      { name: "GitHub", description: "Code hosting and collaboration" },
      { name: "Vercel", description: "Deployment and hosting platform" },
    ],
  },
];
