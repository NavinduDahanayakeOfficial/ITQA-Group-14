@API
@CreateBookIdAsString
Feature: Validate behavior for ID inclusion and duplicate entries
  As a library admin
  I want to validate book creation behavior for IDs and duplicates
  So that the system handles these cases appropriately

  Scenario: Verify behavior when ID is included as String
    Given I am authenticated as "admin"
    Given I have the following book details:
      | id  | title  | author   |
      | 100 | Book10 | Author10 |
    When I create a book
    Then the book should not be created successfully with status 400

