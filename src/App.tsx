import React from "react";
import FrappeGanttWrapper from "./FrappeGanttWrapper";
import type { GanttTask } from "./types";
import {
  client,
  useConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import {
  validateSigmaData,
  sanitizeGanttTask,
  convertTimestampToDateString,
} from "./utils/dataValidation";
import "./App.css";

// Fallback sample tasks for development/testing
const sampleTasks: GanttTask[] = [
  {
    id: "Task 1",
    name: "Design",
    start: "2025-06-25",
    end: "2025-06-28",
    progress: 60,
    dependencies: "",
  },
  {
    id: "Task 2",
    name: "Development",
    start: "2025-06-29",
    end: "2025-07-05",
    progress: 20,
    dependencies: "Task 1",
  },
];

client.config.configureEditorPanel([
  {
    name: "source",
    type: "element",
    label: "Data Source",
  },
  {
    name: "taskNameColumn",
    type: "column",
    label: "Task Name",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "startDateColumn",
    type: "column",
    label: "Start Date",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "endDateColumn",
    type: "column",
    label: "End Date",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "progressColumn",
    type: "column",
    label: "Progress (Optional)",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "dependenciesColumn",
    type: "column",
    label: "Dependencies (Optional)",
    source: "source",
    allowMultiple: false,
  },
]);

function App() {
  const config = useConfig();
  const columns = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  const data = React.useMemo(() => {
    if (!sigmaData || !columns) {
      console.warn("[Sigma Plugin] No data or columns available");
      return sampleTasks; // Return sample tasks if no data is available
    }

    // Validate the Sigma data configuration
    const validation = validateSigmaData(sigmaData, config);

    if (!validation.isValid) {
      console.error(
        "[Sigma Plugin] Data validation failed:",
        validation.errors
      );
      validation.warnings.forEach((warning) =>
        console.warn("[Sigma Plugin]", warning)
      );
      return sampleTasks; // Fall back to sample data
    }

    if (validation.warnings.length > 0) {
      validation.warnings.forEach((warning) =>
        console.warn("[Sigma Plugin]", warning)
      );
    }

    // Get column data arrays
    const taskNameData = sigmaData[config.taskNameColumn] || [];
    const startDateData = sigmaData[config.startDateColumn] || [];
    const endDateData = sigmaData[config.endDateColumn] || [];
    const progressData = sigmaData[config.progressColumn] || [];
    const dependenciesData = sigmaData[config.dependenciesColumn] || [];

    // Determine the number of rows (should be the same for all columns)
    const rowCount = Math.max(
      taskNameData.length,
      startDateData.length,
      endDateData.length
    );

    console.log("[Sigma Plugin] Row count:", rowCount);

    // Transform column-based data into row-based tasks
    const tasks: GanttTask[] = [];
    for (let i = 0; i < rowCount; i++) {
      const rawTask = {
        id: `task-${i}`,
        name: taskNameData[i],
        start: convertTimestampToDateString(startDateData[i]),
        end: convertTimestampToDateString(endDateData[i]),
        progress: progressData[i],
        dependencies: dependenciesData[i],
      };

      // Sanitize and validate each task
      const task = sanitizeGanttTask(rawTask, i);
      tasks.push(task);
    }

    return tasks;
  }, [sigmaData, columns, config]);

  // Gantt options - you can customize these based on your needs
  const ganttOptions = {
    readonly: true, // Disables editing
    view_mode: "Month" as const,
    today_button: true,
    view_mode_select: true,
    popup_on: "click" as const,
    lines: "both" as const,
    auto_move_label: true,
    bar_height: 30,
    padding: 18,
    container_height: "auto" as const, // Let it calculate height automatically
    infinite_padding: false, // Disable infinite padding to prevent internal scrolling
  };

  return <FrappeGanttWrapper tasks={data} options={ganttOptions} />;
}

export default App;
