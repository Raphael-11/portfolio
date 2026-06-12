import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Server,
  Palette,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Capability {
  title: string;
  description: string;
  stack: string[];
  icon: LucideIcon;
}

export const capabilities: Capability[] = [
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end web applications with clear interfaces, reliable APIs, and database-backed workflows.",
    stack: ["React", "Next.js", "NestJS", "Express", "MongoDB"],
    icon: Globe,
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications for ticketing, inventory, maps, QR flows, and API-driven features.",
    stack: ["React Native", "Maps", "QR Flows", "API Integration"],
    icon: Smartphone,
  },
  {
    title: "Dashboards & Admin Panels",
    description:
      "Operational interfaces with role-based access, status visibility, filtering, and workflow management.",
    stack: ["Role-Based UI", "Tables", "Filters", "Management Workflows"],
    icon: LayoutDashboard,
  },
  {
    title: "Backend Systems",
    description:
      "Server-side logic for authentication, REST APIs, documentation, and practical database models.",
    stack: ["REST APIs", "Auth", "Databases", "Clean Architecture"],
    icon: Server,
  },
  {
    title: "UI/UX Interfaces",
    description:
      "Responsive interfaces with stronger hierarchy, careful spacing, useful motion, and polished handoff.",
    stack: ["Figma", "Interaction Polish", "Responsive", "Motion Design"],
    icon: Palette,
  },
  {
    title: "Product Prototypes",
    description:
      "Functional MVPs that make an idea testable through real flows, not just static screens.",
    stack: ["Fast MVPs", "University Projects", "Startup Demos"],
    icon: Rocket,
  },
];
