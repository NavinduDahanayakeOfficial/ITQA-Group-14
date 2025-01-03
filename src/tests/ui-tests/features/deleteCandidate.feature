@UI
@DeleteCandidate
Feature: Delete Candidate
  As an admin user
  User wants to delete a candidate from the system
  So that the candidate profile is removed successfully

  Background:
    Given User navigates to the Recruitment module

  Scenario: Successfully deleting a candidate
    When User clicks the delete icon button
    And User confirms the deletion
    Then User should see "Succesfully Deleted" message