@SearchEmployee
Feature: Search Employee
  As an admin user
  User wants to search for an employee in the system
  So that user can view their details and confirm their existence

  Background:
    Given User navigates to the "PIM" module

  Scenario: Successfully searching for an employee
    Given User enters the employee name in the search field
    When User clicks the "Search" button
    Then User should see the search results displaying the correct employee