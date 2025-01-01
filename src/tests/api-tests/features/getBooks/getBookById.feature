@API
@GetBookByID
Feature: Get a Book by ID - Admin
  As a library user
  I want to get a book by its ID
  So that I can view the book details

  Scenario: Successfully getting a book by existing ID
    Given I am authenticated as "admin"
    When I have the following book ID: 1
    Then the book details should be displayed successfully with 200 status code

  Scenario: Getting a book by non-existing ID
    Given I am authenticated as "admin"
    When I have the following book ID: 100
    Then the book details should not be displayed with 404 status code

  Scenario: Successfully getting a book by existing ID
    Given I am authenticated as "user"
    When I have the following book ID: 1
    Then the book details should be displayed successfully with 200 status code

  Scenario: Getting a book by non-existing ID
    Given I am authenticated as "user"
    When I have the following book ID: 100
    Then the book details should not be displayed with 404 status code