@API @UpdateBooks
Feature: Update a Book by ID - Unauthorized Access
  As a user who is not authenticated
  I want to verify that unauthorized users cannot update a book by its ID
  So that only authenticated users can modify book details

  Scenario: Attempting to update a book by ID without authentication
    Given I am authenticated as "user"
    When I am updating a book with ID: 1 and title: "The Great Gatsby" and author: "F. Scott Fitzgerald"
    Then the server should return a 403 status code
    And the response should include an error message "User is not permitted"
    And the response body should contain:
      | field  | value               |
      | error  | Unauthorized access |
      | status |                 403 |
