@AssignClaim
Feature: Assign a claim

  Background:
    Given User navigates to the "Claim" module

  Scenario: User assigns a claim
    Given User navigates to the "Claim" module
    When User clicks on "Assign Claim"
    When User fills in the Assign details
    Then User clicks the "Create" button
    Then User verifies the claim Assign submission success
