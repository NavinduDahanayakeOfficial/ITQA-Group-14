@UI @EmployeeClaims
Feature: Employee Claims 
As an admin user
  I want to navigate to the Employee Claims section and search claims
  So that I can efficiently manage and review employee claims

  Scenario: Navigate to Employee Claims section and search claims
    Given User navigates to the "Claim" module
    When User clicks on "Employee Claims"
    Then User should see the Employee Claims page
    When User searches all combinations from Event Name and Status dropdowns
    Then User should be able to see the filtered results for each combination
