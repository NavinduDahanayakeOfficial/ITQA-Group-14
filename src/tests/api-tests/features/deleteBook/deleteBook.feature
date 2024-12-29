@DeleteBook
Feature: Delete a Book
  As a library user or admin
  I want to delete a book
  So that it can be removed from the system

  Scenario Outline: Successfully deleting a book
    Given I am authenticated as "<userType>"
    Given the following book exists in the system:
      | title   | author   |
      | <title> | <author> |
    When I delete the book titled "<title>"
    Then the book should be deleted successfully

    Examples:
      | userType | title  | author  |
      | admin    | Book1  | Author1 |

  Scenario Outline: User should not be allowed to delete a book
    Given I am authenticated as "<userType>"
    Given the following book exists in the system:
      | title   | author   |
      | <title> | <author> |
    When I attempt to delete the book titled "<title>"
    Then I should see an error message "403"
    And the book should still exist in the system

    Examples:
      | userType | title  | author  |
      | user     | Book2  | Author2 |
