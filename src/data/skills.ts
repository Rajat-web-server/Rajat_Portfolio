import type { ComponentType } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiReactrouter,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSqlite,
  SiPrisma,
  SiFigma,
  SiDocker,
  SiJsonwebtokens,
  SiPostman,
  SiJest,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaChrome } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  Activity,
  Component,
  Database,
  Smartphone,
  Sparkles,
  Webhook,
  Box,
  ChartNoAxesColumn,
} from "lucide-react";

export type Skill = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  category: "Frontend" | "State" | "Backend" | "Database" | "UI/UX" | "Tools";
};

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", icon: FaHtml5, category: "Frontend" },
  { name: "CSS3", icon: FaCss3Alt, category: "Frontend" },
  { name: "JavaScript (ES6+)", icon: SiJavascript, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "React.js", icon: SiReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "shadcn/ui", icon: SiShadcnui, category: "Frontend" },
  { name: "Recharts.js", icon: ChartNoAxesColumn, category: "Frontend" },
  { name: "React Router", icon: SiReactrouter, category: "Frontend" },
  { name: "Framer Motion", icon: SiFramer, category: "Frontend" },

  // State management
  { name: "Zustand", icon: Box, category: "State" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
  { name: "Express.js", icon: SiExpress, category: "Backend" },
  { name: "REST APIs", icon: Webhook, category: "Backend" },

  // Database
  { name: "SQL", icon: Database, category: "Database" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "SQLite", icon: SiSqlite, category: "Database" },
  { name: "better-sqlite3", icon: Database, category: "Database" },
  { name: "Prisma", icon: SiPrisma, category: "Database" },

  // UI/UX
  { name: "Responsive Design", icon: Smartphone, category: "UI/UX" },
  { name: "Component Design", icon: Component, category: "UI/UX" },
  { name: "Data Visualization", icon: Activity, category: "UI/UX" },
  { name: "Animations", icon: Sparkles, category: "UI/UX" },
  { name: "Figma", icon: SiFigma, category: "UI/UX" },

  // Tools & DevOps
  { name: "Docker", icon: SiDocker, category: "Tools" },
  { name: "JWT", icon: SiJsonwebtokens, category: "Tools" },
  { name: "Postman", icon: SiPostman, category: "Tools" },
  { name: "Jest", icon: SiJest, category: "Tools" },
  { name: "Git", icon: SiGit, category: "Tools" },
  { name: "GitHub", icon: SiGithub, category: "Tools" },
  { name: "VS Code", icon: VscVscode, category: "Tools" },
  { name: "Chrome DevTools", icon: FaChrome, category: "Tools" },
];