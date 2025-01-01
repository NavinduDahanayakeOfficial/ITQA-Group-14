@DeleteBook
Feature: Delete a Book
  As a library user or admin
  I want to delete a book
  So that it can be removed from the system

  Scenario Outline: Successfully deleting a book
    Given I am authenticated as "<userType>"
    Given the following book exists in the system:
      | id  | title   | author   |
      | <id> | <title> | <author> |
    When I delete the book with id "<id>"
    Then the book should be deleted successfully

    Examples:
      | userType | id | title  | author  |
      | admin    | 1  | Book1  | Author1 |

  Scenario Outline: User should not be allowed to delete a book
    Given I am authenticated as "<userType>"
    Given the following book exists in the system:
      | id  | title   | author   |
      | <id> | <title> | <author> |
    When I attempt to delete the book with id "<id>"
    Then the book should not be deleted

    Examples:
      | userType | id | title  | author  |
      | user     | 1  | Book1  | Author1 |