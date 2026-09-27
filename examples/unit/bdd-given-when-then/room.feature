Feature: Meeting room reservations
  Facilities, product, and QA share this file. Sentences name guests and
  seats — not APIs, CSS, or helper names.

  These examples stand on their own. They are not a Gherkin restatement
  of the TDD coupon tests. They are effective when someone outside
  engineering will read them, the rule is user-visible and stable, and
  each step is a domain fact. They waste time when they encode layout
  or restate every unit-test row.

  Scenario: a party that fits is confirmed
    Given 6 seats are free
    And a party of 4
    When I reserve the room
    Then the reservation is confirmed
    And 2 seats remain

  Scenario: a party that does not fit is refused
    Given 3 seats are free
    And a party of 5
    When I reserve the room
    Then the reservation is refused
    And 3 seats remain
