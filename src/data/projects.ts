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
    title: "Habisius",
    description: "A web application for tracking habits",
    tech: ["React", "Node.js","auth", "express", "framer","postgresql",],
    live: "https://habittracker-eight-ivory.vercel.app/",
    repo: "https://github.com/Rajat-web-server/Habit_tracker",
    images: [
      "/projects/project-two/p1.jpeg",
      "/projects/project-two/p2.jpeg",
      "/projects/project-two/p3.jpeg",
      "/projects/project-two/p4.jpeg",
    ],
    shape: "portrait",
  }, {
    title: "CRM ",
    description: "A customer relationship management system application",
    tech: ["React", "Node.js","auth", "express", "framer","postgresql",],
    live: "https://support-crm-two-tau.vercel.app/",
    repo: "https://github.com/Rajat-web-server/Support-CRM",
    images: [
      "/projects/project-one/pr1.jpeg",
      "/projects/project-one/pr2.jpeg",
      "/projects/project-one/pr3.jpeg",
      "/projects/project-one/pr4.jpeg",
    ],
    shape: "portrait",
  },
  
];