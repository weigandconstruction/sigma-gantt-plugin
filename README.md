# Sigma Gantt Plugin

## Purpose

This repository contains a Sigma Computing plugin designed to display interactive Gantt charts within Sigma dashboards and reports. The plugin leverages the [Frappe Gantt](https://github.com/frappe/gantt) JavaScript library to provide a modern, visually appealing, and highly interactive Gantt chart experience for project management, scheduling, and timeline visualization directly in Sigma.

## Project Goals

- **Seamless Integration:** Embed Gantt charts as a Sigma plugin, allowing users to visualize project timelines using their Sigma data.
- **Modern UI:** Utilize the latest version of Frappe Gantt for a responsive and feature-rich charting experience.
- **Customizability:** Enable configuration of chart appearance and behavior through Sigma plugin settings.
- **Data-Driven:** Support dynamic data input from Sigma tables, with mapping to Gantt chart tasks, start/end dates, and dependencies.
- **Maintainability:** Build with up-to-date dependencies and best practices for long-term support.

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
