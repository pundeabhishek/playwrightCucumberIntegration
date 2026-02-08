Feature: Test different types on value passing from feature file to step definition

    # Scenario Outline: Scenario Outline name: Login using string parameters

    #     Given the user is on the login page
    #     When the user logs in using "<Username>" and "<Password>"
    #     Then I take the scrrenshot of landng page

    #  Examples:

    #         | Username      | Password     |
    #         | standard_user | secret_sauce |
    #         | problem_user  | secret_sauce |
    #         | error_user    | secret_sauce |

    Background: Login Name
        Given the user is on the login page
    
    Scenario: Scenario Outline name: Login using string standard_user


        When the user logs in using "standard_user" and "secret_sauce"
        Then I take the scrrenshot of landng page

    Scenario: Scenario Outline name: Login using string problem_user


        When the user logs in using "problem_user" and "secret_sauce"
        Then I take the scrrenshot of landng page

    Scenario: Scenario Outline name: Login using string error_user


        When the user logs in using "error_user" and "secret_sauce"
        Then I take the scrrenshot of landng page



#     Given I enter username "standard_user"
#     And I enter password "secret_sauce"
#     When I click login button
#     Then I should see "Inventory" page

# Scenario: Login using string parameters - 2
#     Given I enter username "Abhishek"
#     And I enter password "password"
#     When I click login button
#     Then I should see "Home" page