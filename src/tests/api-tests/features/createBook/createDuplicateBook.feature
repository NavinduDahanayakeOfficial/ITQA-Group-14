@API
@CreateDuplicateBook
Feature: Create a Book with Duplicate Details
  As a library user or admin
  I want to handle duplicate book creation
  So that the system can prevent duplicate entries

  Scenario: Creating a book with duplicate details
    Given I am authenticated as "admin"
    And I have a book with duplicate details
    When I attempt to create the book twice
    Then the first book creation should be successful
    And the second book creation should return a 208 status
