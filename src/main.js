import React from "react";
import { createRoot } from "react-dom/client";
import GanttChart from "./App";
import "./style.css";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<GanttChart />);
