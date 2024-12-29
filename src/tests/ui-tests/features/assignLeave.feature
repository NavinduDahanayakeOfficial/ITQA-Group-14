@LeaveAssign
Feature: Assign a Leave
  As an admin user  
  User wants to assign a leave  
  So that the employee leave is successfully submitted and recorded in the system  

  Background:  
    Given User navigates to the "Leave" module  

  Scenario: Successfully assign a leave  
    Given User clicks the "Assign Leave" button  
    And User fills in the leave details to assign
    Then User clicks the "Assign" button  