@UI
@LeaveApplication
Feature: Apply for Leave
  As an admin user  
  User wants to apply for leave  
  So that the employee leave request is successfully submitted and recorded in the system  

  Background:  
    Given User navigates to the "Leave" module  

  Scenario: Successfully applying for leave  
    Given User clicks the "Apply" button  
    And User fills in the leave details
    Then User clicks the "Submit" button  