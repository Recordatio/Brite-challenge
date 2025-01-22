Feature: Validate tentacles input field
  The input field only accepts numbers between 10 and 100. Valid values will lead to a "Success" message, and invalid values will lead to an "Error" message.

  Scenario: User enters a valid number
    When the user enters a number between 10 and 100
    And the user clicks the "Send" button
    Then a "Success" message should be shown

  Scenario: User enters a number lower than the minimum
    When the user enters a number less than 10
    And the user clicks the "Send" button 
    Then an "Error" message should be shown

  Scenario: User enters a number above the maximum
    When the user enters a number greater than 100
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User enters a non-numeric value
    When the user enters a non-numeric value like "aaa" or "!#"
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User submits the form leaving the input field empty
    When the user leaves the input field empty
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User enters a decimal number within the range
    When the user enters a decimal number like 3.14 or 3,14
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User enters a negative number
    When the user enters a negative value like -10
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User enters a valid number with a leading zero
    When the user enters a number with a leading zero like "010"
    And the user clicks the "Send" button
    Then a "Success" message should be shown

  Scenario: User enters a number within range together with a special character
    When the user enters a number between 10 and 100 together with a special character like "!#"
    And the user clicks the "Send" button
    Then an "Error" message should be shown

  Scenario: User enters a valid number with leading or trailing spaces
    When the user enters a number with spaces like "  10" or "10  "
    And the user clicks the "Send" button
    Then a "Success" message should be shown

  Scenario: User enters the exact minimum valid number
    When the user enters the number 10
    And the user clicks the "Send" button
    Then a "Success" message should be shown

  Scenario: User enters the exact maximum valid number
    When the user enters the number 100
    And the user clicks the "Send" button
    Then a "Success" message should be shown

  Scenario: User enters input in another encoding
    When the user enters a value in a different encoding like "十" (Chinese numeral for 10)
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User enters HTML tags
    When the user enters a value like "<b>100</b>"
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User attempts SQL injection
    When the user enters a value like "10' OR '1'='1"
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User attempts cross-site scripting (XSS)
    When the user enters a value like "<script>alert(1)</script>"
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User attempts JavaScript code injection
    When the user enters a value like "10; console.log('JS injection!');"
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User attempts Python code injection
    When the user enters a value like "10; __import__('os').system('echo Python injection!')"
    And the user clicks the "Send" button
    Then an "Error" message should be displayed

  Scenario: User attempts a very large number (like 1 million characters)
    When the user enters a number with 1 million characters
    And the user clicks the "Send" button
    Then an "Error" message should be displayed
