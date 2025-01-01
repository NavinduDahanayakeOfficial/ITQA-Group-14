@DeleteEmployee
Feature: Delete Employee
  As an admin user
  User wants to delete an employee from the system
  So that the employee profile is removed successfully

  Background:
    Given User navigates to the "PIM" module
    And  User enters the employee name in the search field
    Then User clicks the "Search" button 

  Scenario: Successfully deleting an employee
    Given User selects the employee from the search results
    And User clicks the "Delete" button and confirms the deletion
    Then User should no longer see the employee profile in the search results
