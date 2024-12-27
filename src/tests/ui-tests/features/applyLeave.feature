@LeaveApplication
Feature: Apply for Leave
  As an admin user  
  User wants to apply for leave  
  So that the employee leave request is successfully submitted and recorded in the system  

  Background:  
    Given User logs in as an employee  
    And User navigates to the "Leave" module  

  Scenario: Successfully applying for leave  
    Given User clicks the "Apply" button  
    And User fills in the leave details:  
      | Field         | Value             |  
      | Leave Type    | CAN - FMLA        |  
      | From Date     | 2024-12-28        |  
      | To Date       | 2024-12-30        | 
      | Comments      | Family vacation   |  
    When User clicks the "Submit" button  
    Then Leave request is successfully submitted  
    And Leave request is displayed in the leave list  
