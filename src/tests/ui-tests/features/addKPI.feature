@UI
@AddKPI
Feature: Add Key Performance Indicators 
  As an admin user,
  I want to add a Key Performance Indicator (KPI)
  So that it is added and displayed correctly.

  Background:
    Given User navigates to the "Performance" module
   
  Scenario: Successfully add a KPI for a job title
    Given User selects the “Configure” dropdown and chooses "KPI"
    When User clicks on "Add"
    And User fills in the KPI details
    And User clicks the "Save" button
    Then User should see the Key Performance Indicator section
