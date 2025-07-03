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
    projectName: "Website Redesign",
    projectNumber: "PRJ-001",
    scheduleDescription:
      "Initial design phase including wireframes and mockups",
  },
  {
    id: "Task 2",
    name: "Development",
    start: "2025-06-29",
    end: "2025-07-05",
    progress: 20,
    dependencies: "Task 1",
    projectName: "Website Redesign",
    projectNumber: "PRJ-001",
    scheduleDescription: "Frontend and backend development implementation",
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
  {
    name: "projectNameColumn",
    type: "column",
    label: "Project Name (Optional)",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "projectNumberColumn",
    type: "column",
    label: "Project Number (Optional)",
    source: "source",
    allowMultiple: false,
  },
  {
    name: "scheduleDescriptionColumn",
    type: "column",
    label: "Schedule Description (Optional)",
    source: "source",
    allowMultiple: false,
  },
]);

function App() {
  const config = useConfig();
  const columns = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  // Create a ref to store additional task data that Frappe Gantt might strip out
  const taskDataMap = React.useRef<
    Map<
      string,
      {
        projectName?: string;
        projectNumber?: string;
        scheduleDescription?: string;
      }
    >
  >(new Map());

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
    const projectNameData = sigmaData[config.projectNameColumn] || [];
    const projectNumberData = sigmaData[config.projectNumberColumn] || [];
    const scheduleDescriptionData =
      sigmaData[config.scheduleDescriptionColumn] || [];

    // Determine the number of rows (should be the same for all columns)
    const rowCount = Math.max(
      taskNameData.length,
      startDateData.length,
      endDateData.length
    );

    console.log("[Sigma Plugin] Row count:", rowCount);

    // Transform column-based data into row-based tasks
    const tasks: GanttTask[] = [];
    // Clear the task data map for new data
    taskDataMap.current.clear();

    for (let i = 0; i < rowCount; i++) {
      const taskId = `task-${i}`;
      const rawTask = {
        id: taskId,
        name: taskNameData[i],
        start: convertTimestampToDateString(startDateData[i]),
        end: convertTimestampToDateString(endDateData[i]),
        progress: progressData[i],
        dependencies: dependenciesData[i],
        projectName: projectNameData[i],
        projectNumber: projectNumberData[i],
        scheduleDescription: scheduleDescriptionData[i],
      };

      // Store the extra data in our map
      taskDataMap.current.set(taskId, {
        projectName:
          typeof projectNameData[i] === "string"
            ? projectNameData[i]
            : undefined,
        projectNumber:
          typeof projectNumberData[i] === "string"
            ? projectNumberData[i]
            : undefined,
        scheduleDescription:
          typeof scheduleDescriptionData[i] === "string"
            ? scheduleDescriptionData[i]
            : undefined,
      });

      // Sanitize and validate each task
      const task = sanitizeGanttTask(rawTask, i);
      tasks.push(task);
    }

    return tasks;
  }, [sigmaData, columns, config]);

  // Custom popup function to display additional task information
  const customPopup = (popupData: {
    task: GanttTask;
    chart: object;
    get_title: () => HTMLElement;
    get_subtitle: () => HTMLElement;
    get_details: () => HTMLElement;
    set_title: (html: string) => void;
    set_subtitle: (html: string) => void;
    set_details: (html: string) => void;
    add_action: (html: string, func: () => void) => void;
  }) => {
    // Extract the task from the popup data
    const task = popupData.task;

    if (!task) {
      console.warn("[Sigma Plugin] No task found in popup data");
      return undefined;
    }

    // Get additional data from our map if it's not in the task object
    const additionalData = taskDataMap.current.get(task.id);

    // Use data from task first, then fallback to map data
    const projectName = task.projectName || additionalData?.projectName;
    const projectNumber = task.projectNumber || additionalData?.projectNumber;
    const scheduleDescription =
      task.scheduleDescription || additionalData?.scheduleDescription;

    const startDate = new Date(task.start).toLocaleDateString();
    const endDate = new Date(task.end).toLocaleDateString();

    // Set the title
    popupData.set_title(`<strong>${task.name}</strong>`);

    // Set the subtitle with dates
    popupData.set_subtitle(`${startDate} - ${endDate}`);

    // Build the details HTML
    let detailsHtml = "";

    // Progress
    if (task.progress !== undefined) {
      detailsHtml += `
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Progress:</strong> 
          <span style="color: #333;">${task.progress}%</span>
        </div>
      `;
    }

    // Dependencies
    if (
      task.dependencies &&
      typeof task.dependencies === "string" &&
      task.dependencies.trim()
    ) {
      detailsHtml += `
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Dependencies:</strong> 
          <span style="color: #333;">${task.dependencies}</span>
        </div>
      `;
    }

    // Custom fields with better styling
    if (projectName && projectName.trim()) {
      detailsHtml += `
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Project Name:</strong> 
          <span style="color: #333;">${projectName}</span>
        </div>
      `;
    }

    if (projectNumber && projectNumber.trim()) {
      detailsHtml += `
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Project Number:</strong> 
          <span style="color: #333;">${projectNumber}</span>
        </div>
      `;
    }

    if (scheduleDescription && scheduleDescription.trim()) {
      detailsHtml += `
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Schedule Description:</strong> 
          <div style="color: #333; margin-top: 4px; font-size: 12px; line-height: 1.4;">
            ${scheduleDescription}
          </div>
        </div>
      `;
    }

    // If no custom fields, show a message
    if (!projectName && !projectNumber && !scheduleDescription) {
      detailsHtml += `
        <div style="margin-bottom: 8px; color: #666; font-style: italic;">
          No additional project information available.
        </div>
      `;
    }

    // Set the details
    popupData.set_details(detailsHtml);

    // Return undefined to use the default popup with our custom content
    return undefined;
  };

  // Gantt options - you can customize these based on your needs
  const ganttOptions = {
    readonly: true, // Disables editing
    view_mode: "Month" as const,
    today_button: true,
    view_mode_select: true,
    popup_on: "click" as const,
    lines: "both" as const,
    auto_move_label: true,
    scroll_to: "today" as const,
    bar_height: 30,
    padding: 18,
    container_height: "auto" as const, // Let it calculate height automatically
    infinite_padding: false, // Disable infinite padding to prevent internal scrolling
    popup: customPopup, // Use our custom popup function
  };

  return <FrappeGanttWrapper tasks={data} options={ganttOptions} />;
}

export default App;
