@AddEmployee 
Feature: Add New Employee
  As an admin user
  User want to add a new employee to the system
  So that their profile is stored and displayed correctly

  Background:
    Given User navigates to the "PIM" module

  Scenario: Successfully adding a new employee
    When User clicks on "Add Employee"
    And User fills in the employee details
    And User clicks Save button
    And User should see the employee profile
    Then User get the success toast message

