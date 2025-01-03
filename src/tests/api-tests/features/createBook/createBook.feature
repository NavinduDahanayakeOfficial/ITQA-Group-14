@API
@CreateBook
Feature: Create a Book
  As a library user or admin
  I want to create a new book
  So that they can be available in the system

  Scenario Outline: Successfully creating a new book
    Given I am authenticated as "<userType>"
    Given I have the following book details:
      | title   | author   |
      | <title> | <author> |
    When I create a new book 
    Then the book should be created successfully

    Examples:
      | userType | title | author  |
      | admin    | Book1 | Author1 |
      | user     | Book2 | Author2 |

  Scenario Outline: Empty mandatory fields
    Given I am authenticated as "admin"
    Given I have the following book details:
      | title   | author   |
      | <title> | <author> |
    When I create a new book
    Then the book should not be created

    Examples:
      | title | author  |
      |       | Author3 |
      | Book4 |         |

  Scenario Outline: Missing mandatory fields
    Given I am authenticated as "admin"
    Given I have the following book details:
      | <field> |
      | <value> | 
    When I create a new book
    Then the book should not be created

  Examples:
    | field | value |
    | title | Book5   |
    | author| Author6 |

    
