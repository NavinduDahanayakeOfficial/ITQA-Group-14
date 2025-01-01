@API
@GetAllBooks

Feature: Get All Books
  As a library user or admin
  I want to fetch the list of books
  So that I can view available books in the system

  Scenario: Successfully fetching the list of books as Admin
    Given I am authenticated as "admin"
    When I fetch the list of books
    Then the API should return a list of books

  Scenario: Successfully fetching the list of books as User
    Given I am authenticated as "user"
    When I fetch the list of books
    Then the API should return a list of books

