@UI @EmployeeClaims
Feature: Employee Claims Navigation

  @Navigate
  Scenario: Navigate to Employee Claims section and search claims
    Given User navigates to the "Claim" module
    When User clicks on "Employee Claims"
    Then User should see the Employee Claims page
    When User selects "Accommodation" from Event Name dropdown
    And User selects "Initiated" from Status dropdown
    And User clicks the Search button
    Then User should be able to see the filtered results
