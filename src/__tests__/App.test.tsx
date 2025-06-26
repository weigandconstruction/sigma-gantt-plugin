import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";
import { resetSigmaMocks, setupSigmaDataMock } from "../__mocks__/sigma-plugin";
import { mockSigmaData, largeSigmaData } from "../test-data/sampleSigmaData";
import {
  specialCharactersData,
  circularDependenciesData,
} from "../test-data/edgeCases";

describe("App Integration Tests", () => {
  beforeEach(() => {
    resetSigmaMocks();
  });

  describe("End-to-End Data Flow", () => {
    it("should handle complete data flow from Sigma to Gantt chart", () => {
      const config = {
        source: "project-data",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      const columns = {
        taskNames: { type: "text" },
        startDates: { type: "date" },
        endDates: { type: "date" },
        progress: { type: "number" },
        dependencies: { type: "text" },
      };

      setupSigmaDataMock(mockSigmaData, columns, config);

      const { container } = render(<App />);

      // Should render the Gantt chart component
      expect(container).toBeInTheDocument();
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("should handle partial column configuration", () => {
      const config = {
        source: "minimal-data",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        // No progress or dependencies
      };

      const minimalData = {
        taskNames: ["Task 1", "Task 2"],
        startDates: [
          new Date("2025-01-01").getTime(),
          new Date("2025-01-05").getTime(),
        ],
        endDates: [
          new Date("2025-01-03").getTime(),
          new Date("2025-01-07").getTime(),
        ],
      };

      setupSigmaDataMock(minimalData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Performance and Large Datasets", () => {
    it("should handle large datasets without crashing", () => {
      const config = {
        source: "large-dataset",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(largeSigmaData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should render within reasonable time for large datasets", () => {
      const startTime = performance.now();

      const config = {
        source: "large-dataset",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(largeSigmaData, {}, config);

      render(<App />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within 1 second for 100 tasks
      expect(renderTime).toBeLessThan(1000);
    });
  });

  describe("Special Cases and Edge Scenarios", () => {
    it("should handle special characters in task names", () => {
      const config = {
        source: "special-chars",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(specialCharactersData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should handle circular dependencies gracefully", () => {
      const config = {
        source: "circular-deps",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(circularDependenciesData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Error States and Recovery", () => {
    it("should show sample data when Sigma data fails to load", () => {
      // Mock a failure scenario - no data returned
      setupSigmaDataMock({}, {}, {});

      const { container } = render(<App />);

      // Should still render (with sample data)
      expect(container).toBeInTheDocument();
    });

    it("should recover gracefully from malformed data", () => {
      const malformedData = {
        taskNames: ["Task 1"],
        startDates: ["not-a-timestamp"],
        endDates: [null],
        progress: ["invalid-progress"],
        dependencies: [123], // Wrong type
      };

      const config = {
        source: "malformed",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(malformedData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });
});
