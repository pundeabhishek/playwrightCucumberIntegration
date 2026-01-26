Feature: SauceDemo E2E Flow

  # 🎯 Background: Common setup steps for ALL scenarios
  # These steps run BEFORE each scenario automatically
  Background:
    Given the user is on the login page
    When the user logs in using "standard_user" and "secret_sauce"
    Then the user should be redirected to the inventory page
  
  # ✨ Scenario Outline: Test adding different items to cart
  # Runs the same scenario 3 times with different item names
  # <item> is a placeholder that gets replaced with each exampl
  Scenario Outline: User can add <item> to cart
    When the user adds "<item>" to the cart
    And navigates to the cart page
    Then the cart should display "<item>"

    # Examples: Test data - each row runs the scenario once
    # 3 test cases = scenario runs 3 times with different items
    Examples:
      | item                      |
      | Sauce Labs Backpack       |
      | Sauce Labs Bike Light     |
      | Sauce Labs Bolt T-Shirt   |

  # ✨ Scenario 2: Add item and remove it
  Scenario: User can remove item from cart
    When the user adds "Sauce Labs Bike Light" to the cart
    And navigates to the cart page
    When the user removes "Sauce Labs Bike Light" from the cart
    Then the cart should be empty

  # ✨ Scenario 3: Add multiple items
  Scenario: User can add multiple items to cart
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And navigates to the cart page
    Then the cart should display "Sauce Labs Backpack"
    And the cart should display "Sauce Labs Bike Light"

When the user logs in using "standard_user" and "secret_sauce"