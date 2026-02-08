const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');

// Before Hook - Runs BEFORE each scenario
// Purpose: Setup test environment (launch browser, initialize data)
// Timeout: 120 seconds (2 minutes) - browser launch takes time
// When it runs: Once per scenario, before any steps
Before({ timeout: 120 * 1000 }, async function () {
  console.log('Launching browser');
  try {
    // Call world method to launch browser
    // This initializes: this.browser, this.page, this.pom
    await this.launchBrowser();
  } catch (error) {
    console.error('Before hook failed: ' + error.message);
    throw error;
  }
});

// AfterStep Hook - Runs AFTER each step
// Purpose: Capture screenshots when steps fail (for debugging)
// When it runs: After every single step (Given, When, Then)
// This helps identify exactly which step failed and why
AfterStep(async function ({ result }) {
  // Check if the step that just ran failed
  if (result.status === Status.FAILED) {
    // Make sure page exists before trying to take screenshot
    if (this.page) {
      // Take a screenshot of the current page state
      const buffer = await this.page.screenshot();
      // Attach the screenshot to the test report
      // base64 encoding converts the image to text format
      await this.attach(buffer.toString('base64'), 'base64:image/png');
      console.log('Screenshot captured');
    }
  }
});

// After Hook - Runs AFTER each scenario
// Purpose: Cleanup test environment (close browser, clean database)
// Timeout: 30 seconds - browser cleanup usually quick
// When it runs: Once per scenario, after all steps complete
After({ timeout: 30 * 1000 }, async function () {
  console.log('Closing browser');
  try {
    // Call world method to close browser
    // This ensures proper resource cleanup
    await this.closeBrowser();
  } catch (error) {
    console.error('After hook failed: ' + error.message);
  }
});

// HOOK EXECUTION ORDER:
// ====================
// 1. Before Hook        - Setup (browser launch)
// 2. Given Step        - Test starts
// 3. When Step
// 4. AfterStep Hook    - Screenshot on failure (if failed)
// 5. Then Step
// 6. AfterStep Hook    - Screenshot on failure (if failed)
// 7. After Hook        - Cleanup (browser close)

// HOOKS AVAILABLE:
// ================
// Before()      - Run before each scenario
// After()       - Run after each scenario
// BeforeStep()  - Run before each step
// AfterStep()   - Run after each step
// BeforeAll()   - Run once at start of all tests
// AfterAll()    - Run once at end of all tests

// HOOK PARAMETERS:
// ================
// { timeout: ms }  - Override timeout for this hook
// { tags: '@tag' } - Only run for scenarios with this tag

// EXAMPLES:
// =========

// Run Before hook only for @smoke tests:
// Before({ tags: '@smoke' }, async function () {
//   // Setup for smoke tests only
// });

// Run Before hook with longer timeout:
// Before({ timeout: 5 * 60 * 1000 }, async function () {
//   // This hook has 5 minutes timeout
// });

// Run hook once before all tests:
// BeforeAll(async function () {
//   console.log('Starting test suite');
// });

// Run hook once after all tests:
// AfterAll(async function () {
//   console.log('Test suite completed');
// });

// BEST PRACTICES:
// ===============
// 1. Keep Before/After hooks simple - just setup/cleanup
// 2. Use meaningful error messages for debugging
// 3. Always cleanup in After hook (close browsers, delete test data)
// 4. Use BeforeStep/AfterStep for logging test progress
// 5. Capture screenshots only on failure (saves storage)
// 6. Handle errors gracefully - don't let hooks crash tests


