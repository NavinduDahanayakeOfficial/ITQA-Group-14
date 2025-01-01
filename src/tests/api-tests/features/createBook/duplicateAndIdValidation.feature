@API
@CreateBookAdditional
Feature: Validate behavior for ID inclusion and duplicate entries
  As a library admin
  I want to validate book creation behavior for IDs and duplicates
  So that the system handles these cases appropriately

  Scenario Outline: Verify behavior when ID is included vs. auto-generated
    Given I am authenticated as "admin"
    Given I have the following book details with ID:
      | id      | title   | author   |
      | <id>    | <title> | <author> |
    When I create a new book with ID
    Then the book should <outcome>

    Examples:
      | id    | title  | author   | outcome                |
      |       | Book7  | Author7  | be created successfully |
      | 99999 | Book8  | Author8  | not be created         |

  Scenario: Verify duplicate entries are handled correctly
    Given I am authenticated as "admin"
    Given I have the following book details:
      | title   | author   |
      | Book9   | Author9  |
    When I create a new book
    Then the book should be created successfully

    When I create a new book
    Then duplicate entries should not be created
