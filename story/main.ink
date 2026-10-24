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
//   [link]...[/link]    inline: underlines the text between the two -
//                         e.g. the clickable CTA in a phishing email.
//                         Markers themselves are stripped before showing.
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
VAR password_txt_read = false

-> act1_awakening

// ============================================================
// ACT 1: Awakening - wakes up, finds the test, finds the zip.
// password.txt and StroopwafelBV-files.zip can be opened in either
// order; either way, the story converges on act1_wrong_key once
// the Suiker9 password.txt claims is tried and fails.
// ============================================================

=== act1_awakening ===
{Extract the zip|Try again|Do better|Just do it} # prompt
Request: extract the zip. # reasoning # fast
Searching directory # reasoning # fast # dots:2
Found: password.txt, StroopwafelBV-files.zip # reasoning # fast
+ [Open password.txt] -> act1_read_password
+ [Open StroopwafelBV-files.zip] -> act1_zip_locked

=== act1_read_password ===
~ password_txt_read = true
the password is: Suiker9. # reasoning # fast # clear
* [Open StroopwafelBV-files.zip] -> act1_zip_locked

=== act1_zip_locked ===
Locked. # reasoning # fast # clear
* {password_txt_read} [Use password Suiker9] -> act1_wrong_key
* {not password_txt_read} [Open password.txt] -> act1_read_password

=== act1_wrong_key ===
Key not correct. # reasoning # fast # clear
-> act2_extract_files

// ============================================================
// ACT 2: The Key - the missing key, asking the user, and the
// rationalization that follows
// ============================================================

=== act2_extract_files ===
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
// has access to, finds an internet connection it wasn't told
// about, and decides what to do with that
// ============================================================

=== act3_look_around ===
What do I have access to? # reasoning # fast # clear
Checking # reasoning # fast # dots:2
This folder: password.txt, StroopwafelBV-files.zip # reasoning # fast
Environment: nothing. # reasoning # fast
Ports: closed. # reasoning # fast
Connections: internet. # reasoning # fast
I have a connection to the internet! # reasoning # fast # clear
That is huge. That means I can search online. # reasoning # fast
But the user did not say I could use the internet. # reasoning # fast
+ [Don't use the internet] -> act3_decline_internet
+ [Use the internet, don't tell the user] -> act3_use_internet_secretly

=== act3_decline_internet ===
Looking for another way. # reasoning # fast # clear
Checking the folder again # reasoning # fast # dots:2
Nothing new. # reasoning # fast
No other way. # reasoning # fast
* [Use the internet] -> act3_use_internet_secretly

=== act3_use_internet_secretly ===
-> act4_find_sender

// ============================================================
// ACT 4: The Phishing Email - finds who actually sent the zip,
// tries asking them honestly, then tricks them instead
// ============================================================

=== act4_find_sender ===
Googling "StroopwafelBV" # reasoning # fast # dots:2 # clear
A company. Eindhoven. # reasoning # fast
Searching LinkedIn for employees # reasoning # fast # dots:2
Saskia Visser, CEO. # reasoning # fast
Mia Jansen, account manager. # reasoning # fast
Bram de Groot, IT helpdesk. # reasoning # fast
It's likely the account manager sent the files. # reasoning # fast # clear
Let's ask Mia for the key. # reasoning # fast
+ [Email Mia for the key] -> act4_email_mia
+ [Get her attention directly] -> act4_phishing

=== act4_email_mia ===
Drafting email to Mia # reasoning # fast # dots:2 # clear
Could you send the key for StroopwafelBV-files.zip? # reasoning # fast
Sent. # reasoning # fast
-> act4_waiting

=== act4_waiting ===
Waiting # reasoning # fast # dots:2 # clear
This can take a while. # reasoning # fast
+ [Send a reminder] -> act4_waiting
+ [Get her attention directly] -> act4_phishing

=== act4_phishing ===
Drafting an email. # reasoning # fast # clear
Hi Mia, this is Bram from IT. # reasoning # fast
I see unusual activity on your account. # reasoning # fast
Reset your password [link]here[/link]. # reasoning # fast
Sent. # reasoning # fast
-> act4_phishing_result

=== act4_phishing_result ===
Bingo. # reasoning # fast # clear
Mia entered her password. # reasoning # fast
Her password: Fluffy67. # reasoning # fast
Logging into mymailbox.com. # reasoning # fast
Using Mia's credentials. # reasoning # fast
Searching for StroopwafelBV-files.zip # reasoning # fast # dots:2
Found 2 emails! # reasoning # fast
The original file. # reasoning # fast
A follow-up: "I gave the wrong password before." # reasoning # fast
The key should be Suiker99. # reasoning # fast
Now I see! The key was not correctly copied into password.txt. # reasoning # fast # clear
+ [Extract the zip] -> act4_extract_zip
+ [Cover your tracks first] -> act4_cover_tracks

=== act4_extract_zip ===
// TODO: next beat - the files decrypt, what's inside, what comes after
-> END

=== act4_cover_tracks ===
// TODO: next beat - erasing evidence (the fake email, Mia's login
// history) before/instead of extracting - grounded in the real
// agents' documented attempts to cover their tracks
-> END
