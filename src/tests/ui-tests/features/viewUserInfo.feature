@ViewUserInfo
Feature: View User Info
    As an admin user
    User want to view user information
    So that they can confirm the user details

  Background:
    Given User navigates to the "My Info" module

  Scenario: Successfully viewing user information
    Given User on the "My Info" page
    Then User should see the name and profile picture
    And User should be in the "Personal Details" section by default

  Scenario: Successfully switching between sections
    Given User on the "My Info" page
    Then User should be in the "Personal Details" section by default
    When User clicks on the "Contact Details" section
    Then User should see the "Contact Details" section
    When User clicks on the "Emergency Contacts" section
    Then User should see the "Emergency Contacts" section
    When User clicks on the "Dependents" section
    Then User should see the "Dependents" section
    When User clicks on the "Immigration" section
    Then User should see the "Immigration" section
    When User clicks on the "Job" section
    Then User should see the "Job" section
    When User clicks on the "Salary" section
    Then User should see the "Salary" section
    When User clicks on the "Report-to" section
    Then User should see the "Report-to" section
    When User clicks on the "Qualifications" section
    Then User should see the "Qualifications" section
    When User clicks on the "Memberships" section
    Then User should see the "Memberships" section
    When User clicks on the "Personal Details" section
    Then User should see the "Personal Details" section
