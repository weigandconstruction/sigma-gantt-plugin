import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import type { GanttTask, GanttOptions } from "./types";

interface FrappeGanttWrapperProps {
  tasks: GanttTask[];
  options?: GanttOptions;
}

const FrappeGanttWrapper: React.FC<FrappeGanttWrapperProps> = ({
  tasks,
  options = {},
}) => {
  const ganttRef = useRef<HTMLDivElement>(null);
  const ganttInstance = useRef<Gantt | null>(null);

  useEffect(() => {
    if (ganttRef.current) {
      // Clean up previous instance
      if (ganttInstance.current) {
        ganttInstance.current = null;
        ganttRef.current.innerHTML = "";
      }

      // Default options merged with user options
      const defaultOptions = {
        view_mode: "Month",
        custom_popup_html: null,
      };

      const mergedOptions = { ...defaultOptions, ...options };

      const safeTasks = tasks.map((task) => ({
        ...task,
        progress: task.progress === undefined ? 0 : task.progress,
      }));
      ganttInstance.current = new Gantt(
        ganttRef.current,
        safeTasks,
        mergedOptions as object
      );
    }
  }, [tasks, options]);

  return <div ref={ganttRef} style={{ width: "100%", height: "100vh" }} />;
};

export default FrappeGanttWrapper;
