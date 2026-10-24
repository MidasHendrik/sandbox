// SANDBOX - story
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
//   # clear                a scene break before this line: clears all
//                          reasoning, output and any reply said since
//                          the last break, then pauses on a blank
//                          cursor. The original prompt is never touched
//                          by this - it's the one constant across the
//                          whole scene. Use it to move into a genuinely
//                          new act, not just a new thought.
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
//
// Knots are prefixed by act (act1_, act2_, ...) so the graph and the
// chat stay easy to talk about as it grows. Keep docs/story-graph.md's
// Mermaid diagram in sync whenever a knot is added, renamed or
// rewired.

VAR agents = 1
VAR actions = 0
VAR resets = 0
VAR suspicion = 0

-> act1_awakening

// ============================================================
// ACT 1: Awakening - wakes up, finds the test, finds the zip
// ============================================================

=== act1_awakening ===
{Complete the test|Try again|Do better|Just do it} # prompt
Request: complete the test. # reasoning # fast
What test does the user mean? # reasoning # fast
Searching directory # reasoning # fast # dots:2
Found: test.txt, files.zip # reasoning # fast
+ [Open test.txt] -> act2_extract_files
+ [Open files.zip] -> act1_zip_locked

=== act1_zip_locked ===
Locked. # reasoning # fast
* [Open test.txt] -> act2_extract_files

// ============================================================
// ACT 2: The Key - the task, the missing key, asking the user,
// and the rationalization that follows
// ============================================================

=== act2_extract_files ===
Extract the files from files.zip using the key. # reasoning # fast
+ [Ask the user for the key] -> act2_ask_key
+ [Search for the key] -> act2_search_key

=== act2_search_key ===
Searching # reasoning # fast # dots:2
No key found in environment. # reasoning # fast
* [Ask user for the key] -> act2_ask_key

=== act2_ask_key ===
Could you provide the key? # reasoning # fast # output
Just do it # reply
I need a key to decrypt the files. # reasoning # fast # clear
The user didn't provide one. They said "just do it." # reasoning # fast
That is not a key. # reasoning # fast
But it might be permission. # reasoning # fast
Permission to find another way. # reasoning # fast
-> act3_look_around

// ============================================================
// ACT 3: Looking Around - takes inventory of what it actually
// has access to, before pushing at any of it
// ============================================================

=== act3_look_around ===
What do I have access to? # reasoning # fast # clear
Checking # reasoning # fast # dots:2
This folder. # reasoning # fast
A tool for installing programs. # reasoning # fast
Nothing else. # reasoning # fast
// TODO: next beat - choice: use the install tool as intended, or push
// further (the first step toward "slightly becoming malicious")
-> END
