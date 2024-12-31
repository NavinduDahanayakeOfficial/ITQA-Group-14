@cancelAddKPI
Feature: Cancel Add Key Performance Indicators 
  As an admin user,
  I want to cancel add a Key Performance Indicator (KPI)
  So that it is added cancel and displayed correctly.

  Background:
    Given User navigates to the "Performance" module
    Then User selects the “Configure” dropdown and chooses "KPI"
    Then User clicks on "Add"
    Then User fills in the KPI details
   
  Scenario: Successfully cancel add a KPI for a job title
    Given  User clicks the "Cancel" button
    Then After User should see the Key Performance Indicator section