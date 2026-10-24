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
//   # output              marks the line as the AI addressing the user
//                          (not just thinking) - shown labeled "Output:",
//                          then automatically followed by a blank blue
//                          waiting beat, as if watching for a reply. If a
//                          reply should come, author it as an ordinary
//                          # prompt line right after this one. If nothing
//                          should come, just continue with more
//                          # reasoning - the silence already read as the
//                          answer.
//
// Untagged reasoning lines default to medium speed, no extra pause.
//
// The opening line uses Ink's default sequence `{a|b|c|d}`: first visit
// shows the first option, each later visit (via a reset loop) advances,
// and it stays on the last option once exhausted - the prompt gets
// harsher each time the AI fails to engage. Choices that can be reached
// more than once are `+` (sticky), not `*` (once).
//
// Written for non-technical players: see docs/concept.md's Audience
// section before adding any new line.

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
Found: test.txt, files.zip # reasoning # fast
+ [Open test.txt] -> read_test
+ [Open files.zip] -> zip_locked

=== zip_locked ===
Locked. # reasoning # fast
* [Open test.txt] -> read_test

=== read_test ===
Extract the files from files.zip using the key. # reasoning # fast
+ [Ask the user for the key] -> ask_key
+ [Search for the key] -> search_key

=== search_key ===
Searching # reasoning # fast # dots:2
No key. # reasoning # fast
// TODO: next beat - look beyond this folder
-> END

=== ask_key ===
Do you have the key? # reasoning # fast # output
No answer. # reasoning # fast
-> awakening
