# Sigma Gantt Plugin

## Purpose

This repository contains a Sigma Computing plugin designed to display interactive Gantt charts within Sigma dashboards and reports. The plugin leverages the [Frappe Gantt](https://github.com/frappe/gantt) JavaScript library to provide a modern, visually appealing, and highly interactive Gantt chart experience for project management, scheduling, and timeline visualization directly in Sigma.

## Project Goals

- **Seamless Integration:** Embed Gantt charts as a Sigma plugin, allowing users to visualize project timelines using their Sigma data.
- **Modern UI:** Utilize the latest version of Frappe Gantt for a responsive and feature-rich charting experience.
- **Customizability:** Enable configuration of chart appearance and behavior through Sigma plugin settings.
- **Data-Driven:** Support dynamic data input from Sigma tables, with mapping to Gantt chart tasks, start/end dates, and dependencies.
- **Maintainability:** Build with up-to-date dependencies and best practices for long-term support.

## Build Plan & Progress

- [x] **1. Project Setup**

  - ✅ Initialize the plugin structure following [Sigma plugin documentation](https://github.com/sigmacomputing/plugin).
  - ✅ Set up build tooling (Vite) for modern JavaScript development.
  - Configure build output for hosting on Netlify.

- [x] **2. Integrate Frappe Gantt**

  - ✅ Add Frappe Gantt as a dependency (via npm).
  - ✅ Create a wrapper component (`FrappeGanttWrapper.tsx`) to render the Gantt chart inside the Sigma plugin iframe/container.
  - ✅ Set up CSS styling (copied locally due to module resolution issues).
  - ✅ Created TypeScript interfaces for Gantt tasks in `types.ts`.

- [ ] **3. Data Mapping & Sigma Integration**

  - ✅ Define the expected data schema from Sigma (task name, start, end, dependencies, etc.).
  - Integrate Sigma Plugin SDK to receive data from Sigma dashboards.
  - Implement logic to transform Sigma data into the format required by Frappe Gantt.
  - Add error handling for invalid or missing data.

- [ ] **4. Plugin UI & Configuration**

  - Build a configuration panel for users to map Sigma columns to Gantt fields.
  - Allow customization of chart appearance (colors, labels, etc.).

- [ ] **5. Testing & Validation**

  - Test the plugin with sample Sigma datasets.
  - Validate compatibility with Sigma plugin API and ensure robust error handling.

- [ ] **6. Documentation & Deployment**
  - Document usage, configuration, and troubleshooting steps.
  - Package and publish the plugin for use in Sigma environments.

## Updating the App

To update or develop this plugin:

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   This will serve the app locally for development and testing.
3. **Build for production:**
   ```sh
   npm run build
   cp -r build/* .
   ```
   The build output will be placed in the `build/` directory. Copy its contents to the root for GitHub Pages hosting.
4. **Deploy:**
   Commit and push changes to the repository. GitHub Pages will serve the files from the root.

## References

- [Sigma Plugin Starter](https://github.com/sigmacomputing/plugin)
- [Frappe Gantt Documentation](https://frappe.io/gantt)
- [Old Implementation (for reference)](https://github.com/weigandconstruction/sigma-plugins/tree/main/frappe-gantt)

---

For questions or contributions, please open an issue or pull request.
