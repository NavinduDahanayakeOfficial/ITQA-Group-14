@UI
@AssignClaim
Feature: Assign a claim

  Background:
    Given User navigates to the "Claim" module

  Scenario: User assigns a claim
    When User clicks on "Assign Claim"
    And User fills in the Assign Claim details
    Then User clicks the "Create" button to assign the claim
    Then User verifies the claim assignment success 