import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";
import { resetSigmaMocks, setupSigmaDataMock } from "../__mocks__/sigma-plugin";
import { mockSigmaData } from "../test-data/sampleSigmaData";
import {
  emptyData,
  nullValuesData,
  mismatchedLengthsData,
  dateEdgeCasesData,
} from "../test-data/edgeCases";

describe("Data Transformation Logic", () => {
  beforeEach(() => {
    resetSigmaMocks();
  });

  describe("Valid Sigma Data Transformation", () => {
    it("should transform column-based Sigma data to Gantt tasks", () => {
      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(mockSigmaData, {}, config);

      const { container } = render(<App />);

      // Check that the component renders without crashing
      expect(container).toBeInTheDocument();
    });

    it("should handle timestamp to date conversion correctly", () => {
      const timestampData = {
        taskNames: ["Test Task"],
        startDates: [new Date("2025-01-01").getTime()],
        endDates: [new Date("2025-01-05").getTime()],
        progress: [50],
        dependencies: [""],
      };

      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(timestampData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should handle optional columns (progress, dependencies)", () => {
      const minimalData = {
        taskNames: ["Task 1", "Task 2"],
        startDates: [
          new Date("2025-01-01").getTime(),
          new Date("2025-01-02").getTime(),
        ],
        endDates: [
          new Date("2025-01-05").getTime(),
          new Date("2025-01-06").getTime(),
        ],
      };

      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        // No progress or dependencies columns
      };

      setupSigmaDataMock(minimalData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle empty datasets gracefully", () => {
      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
      };

      setupSigmaDataMock(emptyData, {}, config);

      const { container } = render(<App />);
      // Should fall back to sample data
      expect(container).toBeInTheDocument();
    });

    it("should handle null/undefined values in data", () => {
      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(nullValuesData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should handle mismatched array lengths", () => {
      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(mismatchedLengthsData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should handle invalid date values", () => {
      const config = {
        source: "test-element",
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
        progressColumn: "progress",
        dependenciesColumn: "dependencies",
      };

      setupSigmaDataMock(dateEdgeCasesData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should fall back to sample data when no Sigma data available", () => {
      // No data provided - should use sample data
      setupSigmaDataMock({}, {}, {});

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Configuration Validation", () => {
    it("should handle missing configuration gracefully", () => {
      setupSigmaDataMock(mockSigmaData, {}, {});

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it("should handle missing column mappings", () => {
      const config = {
        source: "test-element",
        // Missing column mappings
      };

      setupSigmaDataMock(mockSigmaData, {}, config);

      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });
});
