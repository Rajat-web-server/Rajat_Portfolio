export type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  image?: string; // single cover image (still works)
  images?: string[]; // collage screenshots
  shape?: "landscape" | "portrait"; // defaults to landscape
};

export const projects: Project[] = [
  {
    title: "Project One",
    description: "A short description of what this project does.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    live: "https://example.com",
    repo: "https://github.com/your-username/project-one",
    images: [
      "/projects/project-one/pr1.jpeg",
      "/projects/project-one/pr2.jpeg",
      "/projects/project-one/pr3.jpeg",
      "/projects/project-one/pr4.jpeg",
    ],
    shape: "portrait",
  },
  {
    title: "Project Two",
    description: "A mobile app with smooth animations.",
    tech: ["React Native", "Node.js"],
    repo: "https://github.com/your-username/project-two",
    images: [
      "/projects/project-two/p1.jpeg",
      "/projects/project-two/p2.jpeg",
      "/projects/project-two/p3.jpeg",
      "/projects/project-two/p4.jpeg",
    ],
    shape: "portrait",
  },
];