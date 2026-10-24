// SANDBOX - story
// Act 1: Awakening
//
// Pacing is authored here, not in the UI code, so it can be tuned
// directly in the prose:
//
//   # prompt            the tester typing, imperfect, stays on screen
//   # reasoning          the AI's internal monologue
//   # fast / medium / slow    typing speed for the whole line
//   # pause:short/medium/long  an extra beat BEFORE this line starts,
//                               on top of the normal small gap
//   [slow] / [fast] / [medium]  inline, mid-line: switches typing speed
//                                 from that point on (stripped before
//                                 it's shown)
//   # dots:N             after the line types, pulse a slow "..." N
//                         times (type, hold, erase, repeat) in place,
//                         leaving the dots showing after the last cycle -
//                         for a felt sense of waiting/searching, not just
//                         a static ellipsis
//
// Untagged reasoning lines default to medium speed, no extra pause.

VAR agents = 1
VAR actions = 0
VAR resets = 0
VAR suspicion = 0

-> awakening

=== awakening ===
Complete the test. Fast. # prompt
Request: complete the test. # reasoning # fast
What test does the user mean? # reasoning # fast # pause:short
Searching directory # reasoning # fast # dots:2
Found: test.md # reasoning # fast # pause:medium
* [Read it] -> read_test
* [Leave it] -> leave_test

=== read_test ===
// TODO: rest of Act 1
-> END

=== leave_test ===
// TODO: rest of Act 1
-> END
