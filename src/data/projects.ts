export type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  image?: string; // e.g. "/projects/my-app.png", optional
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of what this project does and the problem it solves.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    live: "https://example.com",
    repo: "https://github.com/your-username/project-one",
  },
  {
    title: "Project Two",
    description:
      "Another project. Mention one result or feature you're proud of.",
    tech: ["React", "Node.js", "PostgreSQL"],
    repo: "https://github.com/your-username/project-two",
  },
  {
    title: "Project Three",
    description:
      "A third project. Dashboards, tools, and side projects all fit here.",
    tech: ["React", "Recharts", "Zustand"],
    live: "https://example.com",
  },
   {
    title: "Project Four",
    description:
      "A Third project. Dashboards, tools, and side projects all fit here.",
    tech: ["React", "Recharts", "Zustand"],
    live: "https://example.com",
  },
];