@API
@DeleteBook
Feature: Delete a Book by ID
  As a library user
  I want to get a book by its ID
  So that I can view the book details

  Scenario: Successfully deleting a book by existing ID
    Given I am authenticated as "admin"
    When I have th book ID: 7
    Then the book should be deleted successfully with 200 status code

  Scenario: Getting a book by non-existing ID
    Given I am authenticated as "admin"
    When I have th book ID: 100
    Then the book should not be deleted with 404 status code

  Scenario: Successfully getting a book by existing ID
    Given I am authenticated as "user"
    When I have th book ID: 7
    Then the book should not be deleted with 403 status code

  Scenario: Getting a book by non-existing ID
    Given I am authenticated as "user"
    When I have th book ID: 100
    Then the book should not be deleted with 404 status code