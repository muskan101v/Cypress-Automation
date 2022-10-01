Feature: End to end Ecommerce validation

    application Regression

    @Regression
    Scenario: Ecommerce products delivery
        Given I open Ecommerce Page
        When I add item to cart
        And Validate total price
        Then select the country submit and verify Thankyou

    @Smoke
    Scenario: Filling the form to shop
        Given I open Ecommerce Page
        When I fill the form details
            | name | gender |
            | bobz | Male   |
        Then validate the forms behaviour
        And Select the shop page