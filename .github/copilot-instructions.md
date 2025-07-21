# Copilot Instructions for AI Coding Agents
 
## Project Overview
This repository is a Playwright-based end-to-end testing project using TypeScript. The main focus is on browser automation and UI validation for web applications.
 
## Key Directories & Files
- `tests/`: Main location for Playwright test specs (TypeScript)
- `playwright.config.ts`: Playwright configuration (browser, test settings, etc.)
- `package.json`: Declares dependencies and scripts (see below for workflows)
- `playwright-report/`: Stores Playwright HTML reports and trace files after test runs
- `test-results/`: Contains Playwright trace and error context for failed tests
- `github_copilot/README.md`: Project overview (minimal)
 
## Developer Workflows
- **Run all tests:**
  ```powershell
  npx playwright test
  ```
- **Run a specific test file:**
  ```powershell
  npx playwright test tests/testDropdown.spec.ts
  ```
- **View test reports:**
  After running tests, open `playwright-report/index.html` in a browser for a visual report.
- **Debugging:**
  Use Playwright's built-in debugging tools (e.g., `PWDEBUG=1` environment variable) for step-by-step execution.
 
## Patterns & Conventions
- All test specs are written in TypeScript and use Playwright's `test` and `expect` APIs.
- Tests follow a clear stepwise structure: navigation, assertion, interaction, and verification.
- awlaways use build-in Playwright locators (`getbyLabel`, `getByRole`, `getByText`, `locator`, `getByPlaceholder`, etc.) for robust element selection.
- Use Playwright's built-in assertions (`expect`) for verifying conditions.
- Reports and traces are automatically generated for each test run; failed tests produce error context in `test-results/`.
- No custom test runner or build scripts; rely on Playwright CLI and config.
 
## External Dependencies
- Playwright (see `package.json`)
- No custom services, backend, or cross-component communication; all logic is in test specs and Playwright config.
 
 
## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run tests as shown above.
 
---
For questions or unclear conventions, review `tests/` for examples or ask for clarification.