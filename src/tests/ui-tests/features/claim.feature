@AssignClaim
Feature: Assign and Search Claims
  As an admin user
  I want to assign and search claims in the system
  So that I can verify claims are added correctly and delete unnecessary ones

  Background:
    Given User navigates to the "Claim" module

  Scenario: Successfully assigning a claim
    Given User clicks the "Assign Claim" button
    When User fills in the claim details with name "Travel Reimbursement", description "Trip to client site", and amount "500"
    And User clicks the "Save" button
    Then User should see the assigned claim in the list

  Scenario: Successfully searching for a claim
    Given User enters the claim name "Travel Reimbursement" in the search field
    When User clicks the "Search" button
    Then User should see the search results displaying the correct claim

  Scenario: Successfully deleting a claim
    Given User searches for the claim "Travel Reimbursement"
    When User deletes the claim
    Then User should see a message "No Records Found"
