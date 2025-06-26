// Edge cases for testing data validation and error handling

// Empty datasets
export const emptyData = {
  taskNames: [],
  startDates: [],
  endDates: [],
  progress: [],
  dependencies: [],
};

// Mismatched array lengths
export const mismatchedLengthsData = {
  taskNames: ["Task 1", "Task 2"],
  startDates: [new Date("2025-01-01").getTime()], // Only 1 item
  endDates: [
    new Date("2025-01-05").getTime(),
    new Date("2025-01-10").getTime(),
  ],
  progress: [50, 75, 100], // 3 items
  dependencies: [""], // Only 1 item
};

// Null and undefined values
export const nullValuesData = {
  taskNames: [null, "Valid Task", undefined, ""],
  startDates: [null, new Date("2025-01-01").getTime(), undefined, "invalid"],
  endDates: [
    new Date("2025-01-05").getTime(),
    null,
    undefined,
    new Date("2025-01-10").getTime(),
  ],
  progress: [null, 50, undefined, -10, 150], // Invalid progress values
  dependencies: [null, "Valid Task", undefined, ""],
};

// Invalid date formats
export const invalidDatesData = {
  taskNames: ["Task 1", "Task 2", "Task 3"],
  startDates: ["2025-13-01", "not-a-date", NaN], // Invalid dates
  endDates: ["2025-01-32", "", 0], // Invalid dates
  progress: [50, 75, 100],
  dependencies: ["", "Task 1", "Task 2"],
};

// Special characters in task names
export const specialCharactersData = {
  taskNames: [
    "Task with émojis 🚀",
    "Task/with\\special*chars",
    "Task with <HTML> & entities",
    "Very long task name that might cause rendering issues and should be handled gracefully by the component",
  ],
  startDates: Array.from({ length: 4 }, (_, i) =>
    new Date(2025, 0, 1 + i).getTime()
  ),
  endDates: Array.from({ length: 4 }, (_, i) =>
    new Date(2025, 0, 5 + i).getTime()
  ),
  progress: [25, 50, 75, 100],
  dependencies: [
    "",
    "Task with émojis 🚀",
    "Task/with\\special*chars",
    "Task with <HTML> & entities",
  ],
};

// Date edge cases
export const dateEdgeCasesData = {
  taskNames: ["Same Day Task", "Reverse Dates", "Far Future", "Past Task"],
  startDates: [
    new Date("2025-01-01").getTime(),
    new Date("2025-01-10").getTime(), // End before start
    new Date("2025-01-01").getTime(),
    new Date("2020-01-01").getTime(), // Past date
  ],
  endDates: [
    new Date("2025-01-01").getTime(), // Same day
    new Date("2025-01-05").getTime(), // Before start date
    new Date("2030-12-31").getTime(), // Far future
    new Date("2020-01-31").getTime(), // Past date
  ],
  progress: [100, 0, 0, 100],
  dependencies: ["", "", "", ""],
};

// Circular dependencies
export const circularDependenciesData = {
  taskNames: ["Task A", "Task B", "Task C"],
  startDates: Array.from({ length: 3 }, (_, i) =>
    new Date(2025, 0, 1 + i).getTime()
  ),
  endDates: Array.from({ length: 3 }, (_, i) =>
    new Date(2025, 0, 5 + i).getTime()
  ),
  progress: [33, 66, 99],
  dependencies: ["Task C", "Task A", "Task B"], // Circular dependency
};
