import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // === Test Settings ===
  testDir: './tests',                         // Directory where tests are located
  timeout: 30 * 1000,                         // Maximum time one test can run (in ms)
  expect: {
    timeout: 5000,                            // Timeout for expect assertions
    toMatchSnapshot: { threshold: 0.2 }       // Snapshot comparison threshold
  },
  fullyParallel: false,                        // Run tests in parallel across files
  workers: 1,                                 // Number of parallel workers (default = cores)
  retries: 0,                                 // Retry failed tests N times

  // === Reporting Configuration ===
  reporter: [
    // ['list'],                                 // Console list output
    ['html', { outputFolder: 'html-report', open: 'never' }]
    // ['json', { outputFile: 'report.json' }],
    // ['junit', { outputFile: 'results.xml' }]
    // // You can also use third-party reporters like Allure
    // ['allure-playwright']
  ],

  // === Output Directory for Artifacts ===
  outputDir: 'test-results/',                 // Store screenshots, videos, traces

  // === Global Setup/Teardown Scripts ===
  // globalSetup: require.resolve('./global-setup'),   // Global setup file
  // globalTeardown: require.resolve('./global-teardown'), // Global teardown file

  // === Shared Settings for All Tests ===
  use: {
    browserName: 'chromium',                  // chromium | firefox | webkit
    headless: false,                           // true = no UI, false = UI mode
    baseURL: 'https://www.saucedemo.com/',           // Base URL used in test.navigate or API calls

    // Viewport size
    viewport: { width: 1280, height: 720 },   // Or null to use device settings

    // HTTP
    ignoreHTTPSErrors: true,                  // Ignore certificate errors

    // Screenshots, Videos, Traces
    screenshot: 'only-on-failure',            // 'on' | 'off' | 'only-on-failure'
    video: 'retain-on-failure',               // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
    trace: 'on-first-retry',                  // 'on' | 'off' | 'retain-on-failure'

    // Time and Locale
    locale: 'en-US',                          // Set browser locale
    timezoneId: 'America/New_York',           // Set browser timezone

    // Permissions & Geolocation
    permissions: ['geolocation'],             // Grant permissions to context
    geolocation: { latitude: 52.52, longitude: 13.39 }, // Fake location

    // Emulation
    colorScheme: 'light',                     // 'light' | 'dark' | 'no-preference'
    reducedMotion: 'reduce',                  // 'reduce' | 'no-preference'

    // Launch Options
    launchOptions: {
      slowMo: 100,                            // Slow down by N ms
      args: ['--start-maximized']             // Additional args to pass to the browser
    },

    // Storage State (for session reuse)
    // storageState: 'auth.json',             // Load login session

    // User-Agent override
    // userAgent: 'custom-user-agent',        // Custom UA string

    // Action timeout (default = 0 means no limit)
    actionTimeout: 0,

    // Navigation timeout
    navigationTimeout: 30000
  },
});
