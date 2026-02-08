const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');

// CustomWorld Class
// Purpose: Creates a shared container for all test data and resources
// This class is instantiated once per scenario
// All steps in a scenario share the same world instance via 'this'
// 
// Think of it like:
// - Scenario = Building
// - World = Apartment in the building
// - Each step = Resident of the apartment
// All residents live in same apartment and share same furniture (resources)

class CustomWorld {
  // Constructor
  // Purpose: Initialize empty properties
  // These properties will be filled by launchBrowser() method
  // Runs once per scenario when scenario starts
  constructor() {
    this.browser = null;     // Will hold Playwright browser instance
    this.context = null;     // Will hold browser context (tabs, cookies, storage)
    this.page = null;        // Will hold current page being tested
    this.pom = null;         // Will hold PageObjectManager (manages all page objects)
  }

  // Method: launchBrowser()
  // Purpose: Setup test environment before scenario runs
  // Called by: Before hook
  // What it does:
  //   1. Launch Chrome browser
  //   2. Create a new browser context (isolated environment)
  //   3. Create a new page (like opening a new tab)
  //   4. Initialize PageObjectManager with the page
  // 
  // Why Playwright browser launch?
  //   - chromium: Open-source Chrome engine
  //   - headless: false = show browser on screen (helpful for debugging)
  //   - headless: true = run in background (faster for CI/CD)
  async launchBrowser() {
    try {
      // Launch browser - this is the slowest part, takes 5-10 seconds
      // headless: false = show browser window on screen
      // You can change to { headless: true } for background execution
      this.browser = await chromium.launch({ headless: false });
      
      // Create context - isolated environment with own cookies/storage
      // Like opening an incognito window
      this.context = await this.browser.newContext();
      
      // Create new page - like opening a new tab in the browser
      // This is the actual page we interact with in tests
      this.page = await this.context.newPage();
      
      // Initialize PageObjectManager - factory that creates page objects
      // Pass this.page so page objects can interact with the page
      this.pom = new PageObjectManager(this.page);
      
      console.log('Browser launched');
    } catch (error) {
      console.error('Failed to launch browser: ' + error.message);
      throw error;
    }
  }

  // Method: closeBrowser()
  // Purpose: Cleanup test environment after scenario runs
  // Called by: After hook
  // What it does:
  //   1. Check if browser exists (defensive programming)
  //   2. Close browser (frees up resources)
  //   3. Handle errors gracefully (don't crash if close fails)
  // 
  // Why important?
  //   - Browser uses RAM and CPU
  //   - If not closed properly, resources leak
  //   - After 100+ tests, memory can be exhausted
  //   - Proper cleanup ensures tests don't interfere with each other
  async closeBrowser() {
    try {
      // Check if browser actually exists before trying to close
      // Defensive programming - what if launchBrowser() failed?
      if (this.browser) {
        // Close browser - shut down the entire process
        await this.browser.close();
        console.log('Browser closed');
      }
    } catch (error) {
      // Don't throw error here - test already ran
      // If close fails, just log and continue
      console.error('Failed to close browser: ' + error.message);
    }
  }
}

// Register CustomWorld with Cucumber
// This tells Cucumber: "Use CustomWorld class for all scenarios"
// Without this line, Cucumber wouldn't know about CustomWorld
// Then 'this' in step definitions would be undefined
setWorldConstructor(CustomWorld);

// WORLD PROPERTIES AVAILABLE IN STEPS:
// ====================================
// this.browser     - Playwright browser instance
// this.context     - Browser context (cookies, storage, permissions)
// this.page        - Current page being tested
// this.pom         - Page Object Manager (creates page objects)

// HOW WORLD WORKS IN SCENARIO:
// ===========================
// Scenario starts:
//   -> CustomWorld constructor() runs
//   -> this.browser = null, this.page = null, etc.
// 
// Before Hook runs:
//   -> launchBrowser() is called
//   -> this.browser is now set
//   -> this.page is now set
//   -> this.pom is now set
// 
// Each Step runs:
//   -> Step can access this.page, this.pom, etc.
//   -> Multiple steps share SAME this.page
//   -> Multiple steps share SAME this.pom
// 
// After Hook runs:
//   -> closeBrowser() is called
//   -> this.browser is closed
// 
// Scenario ends:
//   -> World instance is garbage collected

// CUSTOMIZING WORLD:
// ==================
// You can add custom properties and methods:
// 
// constructor() {
//   this.browser = null;
//   this.testData = {};     // Store test data
//   this.users = [];        // Store created users
// }
// 
// async createUser(userData) {
//   // Create user via API
//   const user = await api.createUser(userData);
//   this.users.push(user);
//   return user;
// }
// 
// Then use in step definitions:
// this.testData.userId = '123';
// const newUser = await this.createUser({ name: 'John' });

// BEST PRACTICES:
// ===============
// 1. Keep world simple - only store what tests need
// 2. Don't put business logic in world - use page objects
// 3. Always cleanup in closeBrowser() method
// 4. Use try-catch in methods for error handling
// 5. Add console logs for debugging
// 6. Don't store large objects (images, files) in world

