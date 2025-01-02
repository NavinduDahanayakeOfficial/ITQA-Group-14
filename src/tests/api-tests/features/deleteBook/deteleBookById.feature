@DeleteBookById
Feature: Validate 404 for Non-Existent Book ID
  As an admin
  I want to receive a 404 response when attempting to delete a non-existent book
  So that I know the system correctly handles invalid book IDs

  Scenario: Deleting a non-existent book should return 404
    Given I am authenticated as "admin"
    When I attempt to delete the book with ID "999999"
    Then I should see a 404 response code
    And I should see an error message "Book not found"
