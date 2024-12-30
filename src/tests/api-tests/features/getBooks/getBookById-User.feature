@GetBookByIDUser
Feature: Get a Book by ID - User
  As a library user
  I want to get a book by its ID
  So that I can view the book details

  Background:
    Given I am authenticated as "user"

  Scenario: Successfully getting a book by existing ID
    When I have the following book ID: 1
    Then the book details should be not be displayed successfully with 200 status code
  
  Scenario: Getting a book by non-existing ID
    When I have the following book ID: 100
    Then the book details should not be displayed with 404 status code