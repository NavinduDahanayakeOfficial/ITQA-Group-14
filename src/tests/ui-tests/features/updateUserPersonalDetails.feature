@UpdateUserPersonalDetails
Feature: Update User Personal Details
    As an admin user
    User want to update user personal details
    So that they can keep the user information up-to-date

  Background:
    Given User navigates to the "My Info" module
    And User should be in the "Personal Details" section by default

  Scenario: Successfully updating user personal details
    When User enter the new personal details
      | firstName | middleName | lastName | employeeId | otherId | licenseNumber | licenseExpiry | nationality | maritalStatus | dateOfBirth | gender |
      | John      | William    | Doe      |     444110 |  123456 |       2000304 |    2022-12-31 | American    | Single        |  1990-01-15 | Male   |
    And User clicks on the Save button
    Then User should see the success message "Successfully Updated"
