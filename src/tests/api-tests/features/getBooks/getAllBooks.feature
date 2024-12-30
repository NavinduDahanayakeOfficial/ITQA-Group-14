@API
@GetAllBooks
Feature: Get All Books
  As a library user or admin
  I want to fetch the list of books
  So that I can view available books in the system

  Background:
    Given I am authenticated as "user"

  Scenario: Successfully fetching the list of books
    When I fetch the list of books
    Then the API should return a list of books
