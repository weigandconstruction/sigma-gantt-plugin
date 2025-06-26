import type { GanttTask } from "../types";

// Sample construction project data
export const constructionProjectData: GanttTask[] = [
  {
    id: "foundation",
    name: "Foundation Work",
    start: "2025-01-01",
    end: "2025-01-15",
    progress: 100,
    dependencies: "",
  },
  {
    id: "framing",
    name: "Framing",
    start: "2025-01-16",
    end: "2025-02-15",
    progress: 75,
    dependencies: "foundation",
  },
  {
    id: "roofing",
    name: "Roofing",
    start: "2025-02-10",
    end: "2025-02-28",
    progress: 30,
    dependencies: "framing",
  },
  {
    id: "electrical",
    name: "Electrical Work",
    start: "2025-02-20",
    end: "2025-03-10",
    progress: 0,
    dependencies: "framing",
  },
];

// Sample software development sprint data
export const softwareSprintData: GanttTask[] = [
  {
    id: "planning",
    name: "Sprint Planning",
    start: "2025-06-01",
    end: "2025-06-02",
    progress: 100,
    dependencies: "",
  },
  {
    id: "backend",
    name: "Backend Development",
    start: "2025-06-03",
    end: "2025-06-10",
    progress: 60,
    dependencies: "planning",
  },
  {
    id: "frontend",
    name: "Frontend Development",
    start: "2025-06-05",
    end: "2025-06-12",
    progress: 40,
    dependencies: "planning",
  },
  {
    id: "testing",
    name: "Testing & QA",
    start: "2025-06-11",
    end: "2025-06-14",
    progress: 10,
    dependencies: "backend,frontend",
  },
];

// Sample Sigma column-based data (mimics how data comes from Sigma)
export const mockSigmaData = {
  taskNames: ["Design Phase", "Development", "Testing", "Deployment"],
  startDates: [
    new Date("2025-01-01").getTime(),
    new Date("2025-01-15").getTime(),
    new Date("2025-02-01").getTime(),
    new Date("2025-02-15").getTime(),
  ],
  endDates: [
    new Date("2025-01-14").getTime(),
    new Date("2025-01-31").getTime(),
    new Date("2025-02-14").getTime(),
    new Date("2025-02-28").getTime(),
  ],
  progress: [100, 75, 25, 0],
  dependencies: ["", "Design Phase", "Development", "Testing"],
};

// Large dataset for performance testing
export const largeSigmaData = {
  taskNames: Array.from({ length: 100 }, (_, i) => `Task ${i + 1}`),
  startDates: Array.from({ length: 100 }, (_, i) =>
    new Date(2025, 0, 1 + i).getTime()
  ),
  endDates: Array.from({ length: 100 }, (_, i) =>
    new Date(2025, 0, 3 + i).getTime()
  ),
  progress: Array.from({ length: 100 }, () => Math.random() * 100),
  dependencies: Array.from({ length: 100 }, (_, i) =>
    i > 0 ? `Task ${i}` : ""
  ),
};
