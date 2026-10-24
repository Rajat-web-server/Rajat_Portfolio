export type Education = {
  school: string;
  degree: string;
  period: string;
  details?: string;
};

export const education: Education[] = [
  {
    school: "Your University",
    degree: "B.Tech in Computer Science",
    period: "2023 – 2027",
    details: "Relevant coursework, achievements, or GPA if you want to show it.",
  },
  {
    school: "Your School",
    degree: "Higher Secondary (Science)",
    period: "2021 – 2023",
  },
];