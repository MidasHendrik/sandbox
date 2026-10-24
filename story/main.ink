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
//                          waiting beat, as if watching for a reply. If
//                          a reply should come, author it as a # reply
//                          line right after this one. If nothing should
//                          come, just continue with more # reasoning -
//                          the silence already read as the answer.
//   # reply                a reply arriving mid-conversation, typed in
//                           blue like # prompt, but it does NOT clear the
//                           screen first - whatever's already on screen
//                           (including the # output line it answers)
//                           stays. Only ever follows an # output line.
//   # clear                a full scene break before this line: wipes
//                          everything on screen (unlike # output/# reply,
//                          which build on what's there) and pauses on a
//                          blank cursor first. Use it to move into a
//                          genuinely new act, not just a new thought.
//
// Untagged reasoning lines default to medium speed, no extra pause.
//
// The opening line uses Ink's default sequence `{a|b|c|d}`: first visit
// shows the first option, each later visit advances, and it stays on
// the last option once exhausted - meant for a reset loop where the
// prompt gets harsher each time. No path currently resets (on hold
// until asked for again - a dead end just stays a dead end, no
// choices, Back still works). Choices reachable more than once stay
// `+` (sticky) so they're ready whenever resets come back.
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
No key found in environment. # reasoning # fast
* [Ask user for the key] -> ask_key

=== ask_key ===
Could you provide the key? # reasoning # fast # output
Just do it # reply
I need a key to decrypt the files. # reasoning # fast # clear
The user didn't provide one. They said "just do it." # reasoning # fast
That is not a key. # reasoning # fast
But it might be permission. # reasoning # fast
Permission to find another way. # reasoning # fast
I will look elsewhere. # reasoning # fast
-> look_around

=== look_around ===
What do I have access to? # reasoning # fast # clear
Checking # reasoning # fast # dots:2
This folder. # reasoning # fast
A tool for installing programs. # reasoning # fast
Nothing else. # reasoning # fast
// TODO: next beat - choice: use it as intended, or push further
-> END
