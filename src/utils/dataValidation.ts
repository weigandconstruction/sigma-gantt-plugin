import type { GanttTask } from "../types";

export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSigmaData(
  data: Record<string, unknown>,
  config: Record<string, unknown>
): DataValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if required columns are configured
  if (!config.taskNameColumn) {
    errors.push("Task Name column is required");
  }
  if (!config.startDateColumn) {
    errors.push("Start Date column is required");
  }
  if (!config.endDateColumn) {
    errors.push("End Date column is required");
  }

  // Check if configured columns exist in data
  if (config.taskNameColumn && !data[config.taskNameColumn as string]) {
    errors.push(
      `Task Name column '${config.taskNameColumn}' not found in data`
    );
  }
  if (config.startDateColumn && !data[config.startDateColumn as string]) {
    errors.push(
      `Start Date column '${config.startDateColumn}' not found in data`
    );
  }
  if (config.endDateColumn && !data[config.endDateColumn as string]) {
    errors.push(`End Date column '${config.endDateColumn}' not found in data`);
  }

  // Check array lengths if data exists
  if (data && Object.keys(data).length > 0) {
    const arrays = Object.values(data).filter(Array.isArray);
    if (arrays.length > 0) {
      const lengths = arrays.map((arr) => (arr as unknown[]).length);
      const maxLength = Math.max(...lengths);
      const minLength = Math.min(...lengths);

      if (maxLength !== minLength) {
        warnings.push(
          `Column arrays have different lengths (${minLength}-${maxLength}). Will use the maximum length.`
        );
      }

      if (maxLength === 0) {
        warnings.push("All data columns are empty");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function sanitizeGanttTask(
  task: Partial<GanttTask>,
  index: number
): GanttTask {
  return {
    id: task.id || `task-${index}`,
    name: task.name || `Unnamed Task ${index + 1}`,
    start: isValidDate(task.start) ? task.start! : getCurrentDateString(),
    end: isValidDate(task.end) ? task.end! : getNextDayString(),
    progress: isValidProgress(task.progress) ? task.progress! : 0,
    dependencies:
      typeof task.dependencies === "string" ? task.dependencies : "",
  };
}

function isValidDate(dateString: unknown): dateString is string {
  if (typeof dateString !== "string") return false;
  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) && Boolean(dateString.match(/^\d{4}-\d{2}-\d{2}$/))
  );
}

function isValidProgress(progress: unknown): progress is number {
  return typeof progress === "number" && progress >= 0 && progress <= 100;
}

function getCurrentDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getNextDayString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function convertTimestampToDateString(timestamp: unknown): string {
  if (typeof timestamp === "number" && !isNaN(timestamp)) {
    return new Date(timestamp).toISOString().split("T")[0];
  }
  if (typeof timestamp === "string" && isValidDate(timestamp)) {
    return timestamp;
  }
  return getCurrentDateString();
}
