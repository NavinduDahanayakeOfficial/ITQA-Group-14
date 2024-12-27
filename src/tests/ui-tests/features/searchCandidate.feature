@SearchCandidate
Feature: Search Candidate
  As an admin user
  User wants to search for a candidate in the recruitment system
  So that the user can view candidate details and confirm their status

  Background:
    Given User navigates to the "Recruitment" module

  Scenario: Successfully searching for a candidate
    When User select a option from the Job Title dropdown
    # And User select "Payroll Administrator" from the "Vacancy" dropdown
    # And User select "Dilshan Perera" from the "Hiring Manager" dropdown
    # And User select "Application Initiated" from the "Status" dropdown
    # And User click on the Search button
    Then User should see the list of candidates matching the selected criteria
