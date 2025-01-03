@API
@UpdateBookRecord
Feature: Update a Book Record
  As a library user or admin
  I want to update the name and the author
  of a book that has already been created

  Scenario Outline: Successfully updating a new book with both the title and author
  Given I am authenticated as "admin"
  Given I am updating the book with ID: 1 and title: "The Great Gatsby" and author: "F. Scott Fitzgerald"
  Then The book should be updated successfully

  Scenario Outline: Successfully updating a new book with only the title
  Given I am authenticated as "admin"
  Given I am updating the book with ID: 1 and title: "Updated Title"
  Then The book should be updated successfully

  Scenario Outline: Successfully updating a new book with only the author
  Given I am authenticated as "admin"
  Given I am updating the book with ID: 1 and author: "Updated Auther"
  Then The book update should be failed