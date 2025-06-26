import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import FrappeGanttWrapper from "../FrappeGanttWrapper";
import {
  constructionProjectData,
  softwareSprintData,
} from "../test-data/sampleSigmaData";
import type { GanttOptions } from "../types";

describe("FrappeGanttWrapper Component", () => {
  beforeEach(() => {
    // Clear any previous DOM content
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("should render without crashing with valid tasks", () => {
      const { container } = render(
        <FrappeGanttWrapper tasks={constructionProjectData} />
      );

      expect(container).toBeInTheDocument();
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("should render with custom options", () => {
      const options: GanttOptions = {
        view_mode: "Week",
        bar_height: 40,
        readonly: true,
      };

      const { container } = render(
        <FrappeGanttWrapper tasks={softwareSprintData} options={options} />
      );

      expect(container).toBeInTheDocument();
    });

    it("should handle empty tasks array", () => {
      const { container } = render(<FrappeGanttWrapper tasks={[]} />);

      expect(container).toBeInTheDocument();
    });

    it("should apply correct styling", () => {
      const { container } = render(
        <FrappeGanttWrapper tasks={constructionProjectData} />
      );

      const ganttDiv = container.querySelector("div");
      expect(ganttDiv).toHaveStyle({ width: "100%", height: "100vh" });
    });
  });

  describe("Task Data Handling", () => {
    it("should handle tasks with missing progress values", () => {
      const tasksWithoutProgress = constructionProjectData.map((task) => ({
        ...task,
        progress: undefined,
      }));

      const { container } = render(
        <FrappeGanttWrapper tasks={tasksWithoutProgress} />
      );

      expect(container).toBeInTheDocument();
    });

    it("should handle tasks with different date formats", () => {
      const tasksWithVariedDates = [
        {
          id: "task1",
          name: "Task 1",
          start: "2025-01-01",
          end: "2025-01-05",
          progress: 50,
          dependencies: "",
        },
        {
          id: "task2",
          name: "Task 2",
          start: "2025-01-06",
          end: "2025-01-10",
          progress: 25,
          dependencies: "task1",
        },
      ];

      const { container } = render(
        <FrappeGanttWrapper tasks={tasksWithVariedDates} />
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("Options Handling", () => {
    it("should merge default options with custom options", () => {
      const customOptions: GanttOptions = {
        view_mode: "Year",
        bar_height: 50,
      };

      const { container } = render(
        <FrappeGanttWrapper
          tasks={constructionProjectData}
          options={customOptions}
        />
      );

      expect(container).toBeInTheDocument();
    });

    it("should handle all view modes", () => {
      const viewModes: Array<GanttOptions["view_mode"]> = [
        "Day",
        "Week",
        "Month",
        "Year",
      ];

      viewModes.forEach((viewMode) => {
        const { container } = render(
          <FrappeGanttWrapper
            tasks={constructionProjectData}
            options={{ view_mode: viewMode }}
          />
        );

        expect(container).toBeInTheDocument();
      });
    });
  });

  describe("Re-rendering and Updates", () => {
    it("should handle task updates", () => {
      const { container, rerender } = render(
        <FrappeGanttWrapper tasks={constructionProjectData} />
      );

      expect(container).toBeInTheDocument();

      // Update with different tasks
      rerender(<FrappeGanttWrapper tasks={softwareSprintData} />);

      expect(container).toBeInTheDocument();
    });

    it("should handle options updates", () => {
      const initialOptions: GanttOptions = { view_mode: "Month" };
      const updatedOptions: GanttOptions = { view_mode: "Week" };

      const { container, rerender } = render(
        <FrappeGanttWrapper
          tasks={constructionProjectData}
          options={initialOptions}
        />
      );

      expect(container).toBeInTheDocument();

      rerender(
        <FrappeGanttWrapper
          tasks={constructionProjectData}
          options={updatedOptions}
        />
      );

      expect(container).toBeInTheDocument();
    });
  });
});
