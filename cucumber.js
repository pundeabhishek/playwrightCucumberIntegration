module.exports = {
  default: {
    // Files to load before running tests
    // Order matters: world first, then hooks, then step definitions
    require: [
      'features/support/world.js',        // World class - shared context container
      'features/support/hooks.js',        // Hooks - Before, After, BeforeStep, AfterStep
      'features/stepDefinations/*.js'     // Step definitions - Given, When, Then implementations
    ],

    // Path to feature files - where test scenarios are written
    paths: ['features/*.feature'],

    // Report format - what kind of output to generate
    // 'html' creates beautiful HTML reports
    // 'json' creates machine-readable reports
    // 'progress' shows dots in console
    // You can have multiple formats
    format: [
      'html:html-report/cucumber-report.html',  // HTML report location
      'progress-bar'                             // Show progress bar in console
    ],

    // Timeout in seconds - how long to wait for a step before failing
    // Increased for browser operations and network calls
    // Default is 5 seconds, we increased to 120 seconds (2 minutes)
    timeout: '120s',

    // Parallel execution - run multiple scenarios at same time
    // Options: 1 (no parallel), 2, 4, 8, etc
    // Higher number = faster but uses more CPU
    // Set to 1 to run tests sequentially (safer for debugging)
    parallel: 1,

    // Strict mode - treat warnings as errors
    // true = pending or undefined steps cause failure
    // false = pending steps are just warnings
    strict: true,

    // Dry run - only check if steps exist, don't run them
    // true = test syntax without executing
    // false = actually run the tests
    dryRun: false,

    // Fail fast - stop running tests after first failure
    // true = stop at first failure (faster debugging)
    // false = run all tests even if some fail (better reporting)
    failFast: false,

    // Retry failed scenarios - automatically re-run failed tests
    // Number: how many times to retry
    // Useful for flaky tests but can hide real issues
    // retryTagFilter: '@flaky',  // Only retry tests with @flaky tag
    // retry: 1,                  // Retry 1 time


    // Tags - run only tests with specific tags
    // Format: '@tag1 and @tag2' or '@smoke or @regression'
    // You can override with command line: npx cucumber-js --tags '@smoke'
    // tags: '@smoke and not @wip',

    // Format options - additional output settings
    formatOptions: {
      snippetInterface: 'async-await'  // Use async/await in generated snippets
    },

    // Order of execution - randomize or sequential
    // 'random' = run tests in random order (finds order dependencies)
    // 'defined' = run in order they appear in feature files
    // order: 'random',

    // World parameters - pass data to world class
    // You can use this to pass configuration values
    // worldParameters: {
    //   appUrl: 'https://saucedemo.com',
    //   headless: true
    // },

    // Filter by name - run only scenarios matching text
    // Command line override: npx cucumber-js --name "User can login"
    // name: 'login',

    // Number of workers for parallel execution
    // For CPU-bound tasks
    // workers: 4,

    // Suppress output - useful for CI/CD pipelines
    // quiet: false,

    // Output stream - where to send results
    // Default: process.stdout (console)
    // Can redirect to file or other stream

    // Language for Gherkin keywords
    // Default: 'en' (English)
    // Other options: 'fr' (French), 'de' (German), etc
    // language: 'en',

    // Stop after N failures
    // failAfterfailures: 5,

    // Step definition syntax type
    stepDefinitionSyntax: 'JS'  // JavaScript syntax
  },

  // You can define multiple profiles for different environments
  smoke: {
    // Run only smoke tests
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/stepDefinations/*.js'
    ],
    format: ['html:html-report/smoke-report.html'],
    paths: ['features/*.feature'],
    tags: '@smoke',
    timeout: '60s'
  },

  regression: {
    // Run full regression tests
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/stepDefinations/*.js'
    ],
    format: ['html:html-report/regression-report.html'],
    paths: ['features/*.feature'],
    tags: '@regression',
    timeout: '180s',
    parallel: 2  // Can use more parallelization
  },

  ci: {
    // Configuration for Continuous Integration (GitHub Actions, Jenkins, etc)
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/stepDefinations/*.js'
    ],
    format: [
      'html:html-report/ci-report.html',
      'json:reports/cucumber-report.json'
    ],
    paths: ['features/*.feature'],
    timeout: '180s',
    parallel: 4,       // Use more parallelization in CI
    strict: true,      // Treat warnings as errors in CI
    failFast: false,   // Run all tests to get complete report
    publish: false     // Don't publish to cloud from CI
  }
};

// USAGE EXAMPLES:
// ===============

// Run default profile:
// npx cucumber-js

// Run smoke tests:
// npx cucumber-js --profile smoke

// Run regression tests:
// npx cucumber-js --profile regression

// Run CI profile:
// npx cucumber-js --profile ci

// Run with specific tags:
// npx cucumber-js --tags '@smoke and @critical'

// Run specific feature file:
// npx cucumber-js features/AddToCart.feature

// Run with specific name:
// npx cucumber-js --name 'User can login'

// Run in parallel:
// npx cucumber-js --parallel 4

// Dry run (test syntax only):
// npx cucumber-js --dry-run

// Fail fast (stop at first failure):
// npx cucumber-js --fail-fast

// PROFILE EXPLANATION:
// ====================
// Profiles let you define different test configurations:
// - 'default': Regular test runs
// - 'smoke': Quick smoke tests (fast, basic checks)
// - 'regression': Full regression tests (comprehensive, slower)
// - 'ci': For Continuous Integration servers (optimized for automation)

// TAG EXPLANATION:
// ================
// Tags help organize and filter tests:
// @smoke     - Quick sanity check tests
// @regression - Full regression test suite
// @flaky     - Known to be unreliable
// @wip       - Work in progress, not ready
// @critical  - Must pass before release
// @ui        - User interface tests
// @api       - API tests
// @database  - Database tests

// npx cucumber-js                  Run default profile (all tests)
// npx cucumber-js --profile smoke  Run only @smoke tests
// npx cucumber-js -p smoke         Shorter version of above
// npx cucumber-js -p regression    Run only @regression tests
// npx cucumber-js -p ci            Run CI profile (all tests, optimized)
// npx cucumber-js --help           Show all available options