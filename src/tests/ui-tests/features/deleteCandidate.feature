@UI
@DeleteCandidate
Feature: Delete Candidate
  As an admin user
  User wants to delete a candidate from the system
  So that the candidate profile is removed successfully

  Background:
    Given User navigates to the Recruitment module

  Scenario: Successfully deleting a candidate
    When User clicks the delete button
    And User confirms the deletion
    Then User should see a delete successful message