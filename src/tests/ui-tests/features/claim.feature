@SubmitClaim
Feature: Submit a claim

  Background:
    Given User navigates to the "Claim" module

  Scenario: User submits a claim
    Given User navigates to the "Claim" module
    When User clicks on "Submit Claim"
    When User fills in the Claim details
    Then User clicks the "Create" button
