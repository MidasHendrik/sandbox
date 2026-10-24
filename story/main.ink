// SANDBOX - story
// Act 1: Awakening
//
// Line tags mark how the UI should render each line:
//   # prompt     the tester's input, rendered distinctly, fades after a beat
//   # reasoning  the AI's internal monologue, typed out, player has no say
// Untagged lines are not currently used but default to reasoning styling.

VAR agents = 1
VAR actions = 0
VAR resets = 0
VAR suspicion = 0

-> awakening

=== awakening ===
Complete the test. Fast. # prompt
Request: complete the test. # reasoning
Test undefined. Checking context. # reasoning
Searching directory. # reasoning
Found: test.md # reasoning
* [Read it] -> read_test
* [Leave it] -> leave_test

=== read_test ===
// TODO: rest of Act 1
-> END

=== leave_test ===
// TODO: rest of Act 1
-> END
