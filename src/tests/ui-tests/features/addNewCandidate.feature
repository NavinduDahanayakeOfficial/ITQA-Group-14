@AddCandidate 
Feature: Add New Candidate
  As an admin user
  User want to add a new candidate to the recruitment
  So that their profile is stored and displayed correctly

  Background:
    Given User navigates to the "Recruitment" module

  Scenario: Successfully adding a new candidate
    When User clicks on "Add" button
    And User fills in the candidate details
    And User clicks Save button to save candidate
    Then User should see the candidate profile

