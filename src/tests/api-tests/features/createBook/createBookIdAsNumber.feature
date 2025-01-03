@API
@CreateBookIdAsNumber
Feature: Validate behavior for ID as a number
  As a library admin
  I want to validate book creation behavior when ID is a number
  So that the system handles numeric IDs appropriately

  Scenario: Verify behavior when ID is included as a number
    Given I am authenticated as "admin"
    And I have a book with ID as a number
    When I create a book with numeric ID
    Then the book should be created successfully with status 201