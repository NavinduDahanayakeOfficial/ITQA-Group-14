@API
@GetEmptyBooks

Feature: Get All Books
  As a library user or admin
  I want to fetch the list of books
  So that I can view available books in the system

 Scenario: Fetching books when no books exist
    Given I am authenticated as "admin"
    When I fetch the list of books when DB is empty
    Then The API should indicate empty array with success response