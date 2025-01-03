@UI
@AddCandidate
Feature: Add New Candidate
  As an admin user
  User want to add a new candidate to the recruitment
  So that their profile is stored and displayed correctly

  Background:
    Given User navigates to the Recruitment module

  Scenario: Successfully adding a new candidate by filling the required fields
    When User clicks on add button
    And User fills in the candidate details
    | firstName | middleName | lastName |      email      |
    |   Kasun   |   Kalhara  |  Perera  | kasun@email.com |
    And User clicks Save button to save candidate
    And User should see "Successfully Saved" message
    Then User should see the candidate profile