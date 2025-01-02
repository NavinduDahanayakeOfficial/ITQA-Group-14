@UI
@SubmitClaim
Feature: Submit a claim

  Background:
    Given User navigates to the "Claim" module

  Scenario: User submits a claim
    When User clicks on "Submit Claim"
    When User fills in the Claim details
    Then User clicks the "Create" button
    Then User verifies the claim submission success

  Scenario: User submits a claim without selecting an event
    When User clicks on "Submit Claim"
    When User fills in the Currency and Remarks
    Then User clicks the "Create" button
    Then User sees "Required" message for Event field

  Scenario: User submits a claim without selecting a currency
    When User clicks on "Submit Claim"
    When User fills in the Event and Remarks
    Then User clicks the "Create" button
    Then User sees "Required" message for Currency field

  Scenario: User submits a claim without selecting both event and currency
    When User clicks on "Submit Claim"
    When User fills in the Remarks
    Then User clicks the "Create" button
    Then User sees "Required" message for both Event and Currency fields
