@API
@PutBooks
Feature: Update a Book by ID - Unauthorized Access
  As a user who is not authenticated
  I want to verify that unauthorized users cannot update a book by its ID
  So that only authenticated users can modify book details

  Scenario: Attempting to update a book by ID without authentication
    Given I am not authenticated
    When I attempt to update the book with ID: 12345
    Then the server should return a 401 status code
    And the response should include an error message "Unauthorized access"