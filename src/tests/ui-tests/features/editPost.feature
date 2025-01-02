@UI
@editTextPost

Feature: Edit Text Post
  As an admin user
  I want to editTextPost a text post in the Buzz Newsfeed
  So that other cannot view the edited text post and interact with it

  Background:
    Given User navigates to the "Buzz" module

  Scenario: Successfully deleting a text post in the Buzz Newsfeed
    When User clicks the select options button
    When User clicks the edit button
    When User enters the new "<text>" on the text box
    When User clicks the post button on the edit post modal
    Then User should not see the edited post displayed in the Buzz Newsfeed

    Examples:
      | text |
      |  This post is now edited! |