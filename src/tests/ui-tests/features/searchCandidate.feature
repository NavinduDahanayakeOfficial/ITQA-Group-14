@UI
@SearchCandidate
Feature: Search Candidates
  As an admin user
  User wants to search for shortlisted candidates in the recruitment system
  So that the user can view candidates list

  Background:
    Given User navigates to the Recruitment module

  Scenario: Successfully filtering shortlisted candidates
    When User select "shortlisted" option from the Status dropdown
    And User click on the Search button
    Then User should see the list of candidates matching the selected criteria
