@CreateBook
Feature: Create a Book
  As a library user or admin
  I want to create a new book
  So that they can be available in the system

  Scenario Outline: Successfully creating a new book
    Given I am authenticated as "<userType>"
    Given I have the following book details:
      | title   | author   |
      | <title> | <author> |
    When I send a POST request to "/api/books"
    Then the response status code should be 201
    And the book should be created successfully

    Examples:
      | userType | title | author  |
      | admin    | Book1 | Author1 |
      | user     | Book2 | Author2 |

  Scenario Outline: Validate required fields for creating a new book
    Given I am authenticated as "admin"
    Given I have the following book details:
      | title   | author   |
      | <title> | <author> |
    When I send a POST request to "/api/books"
    Then the response status code should be 400

    Examples:
      | title | author  |
      |       | Author4 |
      | Book4 |         |
