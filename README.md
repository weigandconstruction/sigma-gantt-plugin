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

- [x] **3. Data Mapping & Sigma Integration**

  - ✅ Define the expected data schema from Sigma (task name, start, end, dependencies, etc.).
  - ✅ Integrate Sigma Plugin SDK to receive data from Sigma dashboards.
  - ✅ Implement logic to transform Sigma data into the format required by Frappe Gantt.
  - ✅ Add error handling for invalid or missing data.

- [x] **4. Plugin UI & Configuration**

  - ✅ Build a configuration panel for users to map Sigma columns to Gantt fields.
  - ✅ Allow customization of chart appearance (colors, labels, etc.).

- [x] **5. Testing & Validation**

  - ✅ Create comprehensive test suite for data transformation logic.
  - ✅ Test the plugin with sample Sigma datasets.
  - ✅ Validate compatibility with Sigma plugin API and ensure robust error handling.
  - ✅ Add better error handling and user feedback for edge cases.

- [x] **6. Documentation & Deployment**
  - ✅ Set up GitHub Actions CI/CD pipeline with automated testing.
  - ✅ Configure branch protection to require passing tests before merging to main.
  - [ ] Document usage, configuration, and troubleshooting steps.
  - [ ] Package and publish the plugin for use in Sigma environments.

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
   ```
   The build output will be placed in the `dist/` directory.
4. **Run tests:**
   ```sh
   npm test          # Interactive test mode
   npm run test:run  # Single test run
   npm run coverage  # Test coverage report
   ```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Automated Checks

- **Testing:** Runs the full test suite with Vitest on Node.js 18 and 20
- **Linting:** Validates code quality with ESLint
- **Building:** Ensures the project compiles successfully
- **Security:** Performs npm audit to check for vulnerabilities
- **Coverage:** Generates test coverage reports

### Branch Protection

The `main` branch is protected and requires:

- All status checks to pass
- Pull request reviews (configurable)
- Up-to-date branches before merging

See `.github/BRANCH_PROTECTION.md` for setup instructions.

### Workflow Triggers

- **Push:** to `main` and `develop` branches
- **Pull Request:** targeting `main` and `develop` branches

## References

- [Sigma Plugin Starter](https://github.com/sigmacomputing/plugin)
- [Frappe Gantt Documentation](https://frappe.io/gantt)
- [Old Implementation (for reference)](https://github.com/weigandconstruction/sigma-plugins/tree/main/frappe-gantt)

---

For questions or contributions, please open an issue or pull request.
