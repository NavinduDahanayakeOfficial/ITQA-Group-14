@UI @EmployeeClaims
Feature: Employee Claims Navigation

  @Navigate
  Scenario: Navigate to Employee Claims section
 Given User navigates to the "Claim" module
When User clicks on "Employee Claims"
Then User should see the Employee Claims page
