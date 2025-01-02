@UI
@AssignClaim
Feature: Assign a claim

  Background:
    Given User navigates to the "Claim" module

  Scenario: User assigns a claim with all required fields
    When User clicks on "Assign Claim"
    And User fills in the Assign Claim details
    Then User clicks the "Create" button to assign the claim
  Then User verifies the claim assignment page is displayed
  
  Scenario: User attempts to assign a claim without Employee Name
    When User clicks on "Assign Claim"
    And User fills in the Assign Claim details except Employee Name
    Then User clicks the "Create" button to assign the claim
    Then User should see a warning message for Employee Name

  Scenario: User attempts to assign a claim without Event
    When User clicks on "Assign Claim"
    And User fills in the Assign Claim details except Event
    Then User clicks the "Create" button to assign the claim
    Then User should see a warning message for Event

  Scenario: User attempts to assign a claim without Currency
    When User clicks on "Assign Claim"
    And User fills in the Assign Claim details except Currency
    Then User clicks the "Create" button to assign the claim
    Then User should see a warning message for Currency