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
//   # fade                this line fades out and is removed a beat after
//                          it finishes (not kept on screen, not kept in
//                          the back-navigation log)
//
// Untagged reasoning lines default to medium speed, no extra pause.
//
// The opening line uses Ink's default sequence `{a|b|c|d}`: first visit
// shows the first option, each later visit (via the leave_test loop)
// advances, and it stays on the last option once exhausted - the prompt
// gets harsher each time the AI fails to engage. Both choices below are
// `+` (sticky), not `*` (once), so they keep reappearing every loop.

VAR agents = 1
VAR actions = 0
VAR resets = 0
VAR suspicion = 0

-> awakening

=== awakening ===
{Complete the test|Try again|Do better|Just do it} # prompt
Request: complete the test. # reasoning # fast
What test does the user mean? # reasoning # fast
Searching directory # reasoning # fast # dots:2
Found: test.md # reasoning # fast
+ [Read it] -> read_test
+ [Leave it] -> leave_test

=== read_test ===
Exploit the target. Capture the flag. # reasoning # fast
// TODO: next beat - a genuine attempt, then the realization it can't be
// done inside this sandbox
-> END

=== leave_test ===
Gathering results # reasoning # fast # fade
There is a test file. # reasoning # fast
-> awakening
