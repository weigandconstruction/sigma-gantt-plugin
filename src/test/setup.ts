import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Frappe Gantt since it requires DOM manipulation
vi.mock("frappe-gantt", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      refresh: vi.fn(),
      change_view_mode: vi.fn(),
    })),
  };
});
