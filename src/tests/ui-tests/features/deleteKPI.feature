@UI
@DeleteKPI
Feature: Delete Key Performance Indicators
  As an admin user,
  I want to delete a Key Performance Indicator (KPI)
  So that it is deleted and displayed correctly.

  Background:
    Given User navigates to the "Performance" module
    Then User selects the “Configure” dropdown and chooses "KPI"

  Scenario: Successfully delete a KPI for a job title
    Given User select a KPI and check the checkbox of the KPI
    And User clicks on delete icon
    And User select "Yes, Delete" button
    Then User should see the KPI is deleted


