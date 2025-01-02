@UI
@deleteTextPost

Feature: Delete Text Post
  As an admin user
  I want to delete a text post in the Buzz Newsfeed
  So that other cannot view the text post and interact with it

  Background:
    Given User navigates to the "Buzz" module

  Scenario: Successfully deleting a text post in the Buzz Newsfeed
    When User clicks the select options button
    When User clicks the delete button
    When User clicks the confirm button
    Then User should not see the post displayed in the Buzz Newsfeed