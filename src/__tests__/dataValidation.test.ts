import { describe, it, expect } from "vitest";
import {
  validateSigmaData,
  sanitizeGanttTask,
  convertTimestampToDateString,
} from "../utils/dataValidation";

describe("Data Validation Utilities", () => {
  describe("validateSigmaData", () => {
    it("should pass validation with complete valid configuration", () => {
      const data = {
        taskNames: ["Task 1"],
        startDates: [new Date().getTime()],
        endDates: [new Date().getTime()],
      };

      const config = {
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
      };

      const result = validateSigmaData(data, config);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should fail validation when required columns are missing", () => {
      const data = {};
      const config = {};

      const result = validateSigmaData(data, config);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Task Name column is required");
      expect(result.errors).toContain("Start Date column is required");
      expect(result.errors).toContain("End Date column is required");
    });

    it("should fail validation when configured columns dont exist in data", () => {
      const data = {};
      const config = {
        taskNameColumn: "nonexistent_tasks",
        startDateColumn: "nonexistent_start",
        endDateColumn: "nonexistent_end",
      };

      const result = validateSigmaData(data, config);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Task Name column 'nonexistent_tasks' not found in data"
      );
    });

    it("should warn about mismatched array lengths", () => {
      const data = {
        taskNames: ["Task 1", "Task 2"],
        startDates: [new Date().getTime()], // Only 1 item
        endDates: [new Date().getTime(), new Date().getTime()],
      };

      const config = {
        taskNameColumn: "taskNames",
        startDateColumn: "startDates",
        endDateColumn: "endDates",
      };

      const result = validateSigmaData(data, config);

      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain(
        "Column arrays have different lengths (1-2). Will use the maximum length."
      );
    });
  });

  describe("sanitizeGanttTask", () => {
    it("should create valid task from partial data", () => {
      const partialTask = {
        name: "Test Task",
        start: "2025-01-01",
        end: "2025-01-05",
      };

      const result = sanitizeGanttTask(partialTask, 0);

      expect(result.id).toBe("task-0");
      expect(result.name).toBe("Test Task");
      expect(result.start).toBe("2025-01-01");
      expect(result.end).toBe("2025-01-05");
      expect(result.progress).toBe(0);
      expect(result.dependencies).toBe("");
    });

    it("should provide defaults for missing required fields", () => {
      const emptyTask = {};

      const result = sanitizeGanttTask(emptyTask, 5);

      expect(result.id).toBe("task-5");
      expect(result.name).toBe("Unnamed Task 6");
      expect(result.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(result.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(result.progress).toBe(0);
      expect(result.dependencies).toBe("");
    });

    it("should sanitize invalid progress values", () => {
      const taskWithInvalidProgress = {
        name: "Test",
        progress: 150, // Invalid - over 100
      };

      const result = sanitizeGanttTask(taskWithInvalidProgress, 0);

      expect(result.progress).toBe(0); // Should default to 0
    });

    it("should handle non-string dependencies", () => {
      const taskWithInvalidDeps = {
        name: "Test",
        dependencies: 123 as unknown as string, // Invalid type - force type for testing
      };

      const result = sanitizeGanttTask(taskWithInvalidDeps, 0);

      expect(result.dependencies).toBe(""); // Should default to empty string
    });
  });

  describe("convertTimestampToDateString", () => {
    it("should convert valid timestamp to date string", () => {
      const timestamp = new Date("2025-01-01").getTime();

      const result = convertTimestampToDateString(timestamp);

      expect(result).toBe("2025-01-01");
    });

    it("should pass through valid date strings", () => {
      const dateString = "2025-06-15";

      const result = convertTimestampToDateString(dateString);

      expect(result).toBe("2025-06-15");
    });

    it("should return current date for invalid inputs", () => {
      const today = new Date().toISOString().split("T")[0];

      expect(convertTimestampToDateString("invalid")).toBe(today);
      expect(convertTimestampToDateString(null)).toBe(today);
      expect(convertTimestampToDateString(undefined)).toBe(today);
      expect(convertTimestampToDateString(NaN)).toBe(today);
    });

    it("should handle string timestamps", () => {
      const timestamp = new Date("2025-01-01").getTime().toString();

      const result = convertTimestampToDateString(Number(timestamp));

      expect(result).toBe("2025-01-01");
    });
  });
});
