@createTextPost

Feature: Create Text Post
  As an admin user
  I want to create a text post in the Buzz Newsfeed
  So that other users can view the text post and interact with it

  Background:
    Given User navigates to the "Buzz" module

  Scenario: Successfully creating a text post in the Buzz Newsfeed
    Given User enters the post "<text>" in the text field
    When User clicks the post button
    Then User should see the post "<text>" displayed in the Buzz Newsfeed

    Examples:
        | text |
        | This is a test post with a link to google: https://www.google.com |