export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  longDescription: string;
  problem?: string;
  solution?: string;
  impact?: string;
  stack: string[];
  highlight?: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "orange-iss",
    number: "01",
    title: "Orange ISS Portal",
    type: "Award-Winning Web Platform",
    description:
      "AI-powered internship/PFE management portal with dashboards, role-based access, workflow management, and academic process optimization.",
    longDescription:
      "A complete portal built to improve the internship/PFE workflow between students, supervisors, companies, and administrators. The platform focuses on smoother management, better communication, document handling, and a more modern experience for academic internship processes.",
    problem:
      "Students, supervisors, and companies needed a smoother and more organized way to manage internships and PFE workflows.",
    solution:
      "We built a modern portal with dashboards, user roles, document workflows, and AI-powered features to make the process easier to manage.",
    impact: "The project won Best ISS Project of the Year.",
    stack: ["React", "NestJS", "MongoDB", "AI Features"],
    highlight: "Best ISS Project",
    image: "/projects/orange-iss.jpg",
    featured: true,
  },
  {
    id: "fiesta",
    number: "02",
    title: "Fiesta",
    type: "Mobile Event Management App",
    description:
      "A mobile app for event and party management with online ticket preorders, QR-code access, Google Maps integration, and Figma-designed flows.",
    longDescription:
      "A comprehensive mobile event management platform that streamlines the entire event lifecycle from discovery to entry.",
    stack: ["React Native", "NestJS", "MongoDB", "Google Maps API", "Figma"],
    highlight: "Mobile event flow",
    image: "/projects/fiesta.jpg",
  },
  {
    id: "notyourbasicclothes",
    number: "03",
    title: "NotYourBasicClothes",
    type: "E-commerce Website",
    description:
      "A modern clothing e-commerce platform with product browsing, cart logic, backend APIs, and database-driven product management.",
    longDescription:
      "A fashion-forward e-commerce experience with seamless product discovery, cart management, and checkout flow.",
    stack: ["React", "NestJS", "Express", "MongoDB"],
    highlight: "Commerce system",
    image: "/projects/notyourbasicclothes.jpg",
  },
  {
    id: "arkan",
    number: "04",
    title: "Arkan Seller Inventory App",
    type: "Internship Mobile App",
    description:
      "A React Native seller app built during a 1.5-month internship at Arkan. It helps sellers manage inventory, stock, sales, orders, and support chat.",
    longDescription:
      "Built during a 1.5-month internship, this app helps sellers manage their entire inventory workflow.",
    stack: ["React Native", "APIs", "Swagger", "Magento Exposure"],
    highlight: "Internship build",
    image: "/projects/arkan.jpg",
  },
  {
    id: "webank",
    number: "05",
    title: "WeBank",
    type: "Banking Management App",
    description:
      "A Java desktop banking management app where clients can manage transactions, view history, and chat with support.",
    longDescription:
      "A comprehensive desktop banking solution built with Java and Scene Builder.",
    stack: ["Java", "Scene Builder"],
    highlight: "Desktop banking",
    image: "/projects/webank.jpg",
  },
  {
    id: "tonights-movie",
    number: "06",
    title: "Tonight's Movie",
    type: "Movie Recommendation System",
    description:
      "A C-based recommendation system that suggests movies based on user preferences and matching logic.",
    longDescription:
      "An intelligent recommendation engine built in C that matches users with movies based on their preferences.",
    stack: ["C", "Algorithms", "Recommendation Logic"],
    highlight: "C algorithms",
    image: "/projects/tonights-movie.jpg",
  },
];
