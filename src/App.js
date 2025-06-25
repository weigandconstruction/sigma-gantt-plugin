import React, { useEffect, useRef } from "react";
import { useSigma } from "@sigmacomputing/plugin";
import Gantt from "frappe-gantt";
import "./style.css";
import "/node_modules/frappe-gantt/dist/frappe-gantt.css";

function mapSigmaToGantt(sigmaRows) {
  return sigmaRows.map((row) => ({
    id: row.row_id,
    name: row.task_name,
    start: row.start_date,
    end: row.end_date,
    progress: row.percent_complete,
    dependencies: row.depends_on || "",
  }));
}

const GanttChart = () => {
  const { data } = useSigma();
  const ganttRef = useRef(null);

  useEffect(() => {
    if (data && Array.isArray(data.rows) && ganttRef.current) {
      ganttRef.current.innerHTML = "";
      const tasks = mapSigmaToGantt(data.rows);
      new Gantt(ganttRef.current, tasks);
    }
  }, [data]);

  return (
    <div>
      <h1>Sigma Gantt Plugin (Frappe Gantt)</h1>
      <div ref={ganttRef} id="gantt"></div>
    </div>
  );
};

export default GanttChart;
