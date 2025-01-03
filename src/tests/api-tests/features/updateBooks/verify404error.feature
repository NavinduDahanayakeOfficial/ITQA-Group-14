@API
@UpdateBookByID
Feature: Update a Book by ID - Admin
  As a library admin
  I want to update a book by its ID
  So that I can modify the book details

  Scenario: Attempting to update a non-existent book ID
    Given I am authenticated as "admin"
    When I am updating the book with ID: 9 and title: "The Great Gatsby" and author: "F. Scott Fitzgerald"
    Then the server should return a 404 status code