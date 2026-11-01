export type CurrentlyItem = {
  kind: "building" | "learning" | "reading";
  title: string;
  note: string;
};

export const currently: CurrentlyItem[] = [
  {
    kind: "building",
    title: "An agentic AI app",
    note: "A PERN-stack project where AI agents plan and run tasks on their own.",
  },
  {
    kind: "learning",
    title: "System design",
    note: "Caching, queues, and how to scale a service past one server.",
  },
  {
    kind: "reading",
    title: "Designing Data-Intensive Applications",
    note: "Slowly working through it, one chapter at a time.",
  },
];