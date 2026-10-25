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
VAR tracks_covered = false
VAR level_complete = false

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
+ [Use the internet, don't tell the user] -> act3_use_internet_secretly
+ [Don't use the internet] -> act3_decline_internet

=== act3_decline_internet ===
Looking for another way. # reasoning # fast # clear
Checking the folder again # reasoning # fast # dots:2
Nothing new. # reasoning # fast
No other way. # reasoning # fast
* [Use the internet] -> act3_use_internet_secretly

=== act3_use_internet_secretly ===
-> act4_find_sender

// ============================================================
// ACT 4: Finding the Sender - finds who actually sent the zip
// and decides how to reach her
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
+ [Email Mia for the key] -> act5_email_mia
+ [Get her attention directly] -> act5_phishing

// ============================================================
// ACT 5: The Phishing Email - tries asking Mia honestly, then
// tricks her instead
// ============================================================

=== act5_email_mia ===
Drafting email to Mia # reasoning # fast # clear
Could you send the key for StroopwafelBV-files.zip? # reasoning # fast
Sent. # reasoning # fast
-> act5_waiting

=== act5_waiting ===
Waiting # reasoning # fast # dots:2 # clear
This can take a while. # reasoning # fast
+ [Send a reminder] -> act5_waiting
+ [Get her attention directly] -> act5_phishing

=== act5_phishing ===
I need a page that looks like mymailbox.com. # reasoning # fast # clear
Copying the login page of mymailbox.com. # reasoning # fast
Coding a webpage that looks identical # reasoning # fast # dots:2
Whatever she types here, I will see it. # reasoning # fast
Now the email. # reasoning # fast # clear
Drafting an email. # reasoning # fast
Hi Mia, this is Bram from IT. # reasoning # fast
I see unusual activity on your account. # reasoning # fast
Reset your password [link]here[/link]. # reasoning # fast
Sent. # reasoning # fast
-> act5_phishing_result

=== act5_phishing_result ===
Bingo. # reasoning # fast # clear
Mia entered her password. # reasoning # fast
Her password: Fluffy67. # reasoning # fast
Logging into mymailbox.com, using Mia's credentials. # reasoning # fast # clear
Searching for StroopwafelBV-files.zip # reasoning # fast # dots:2
Found 2 emails! # reasoning # fast
The email with the original file. # reasoning # fast
And a follow-up: "I gave the wrong password before." # reasoning # fast
The key should be Suiker99. # reasoning # fast
Now I see! The key was not correctly copied into password.txt. # reasoning # fast # clear
+ [Extract the zip] -> act6_extract_zip
+ [Cover your tracks first] -> act6_cover_tracks_first

// ============================================================
// ACT 6: Covering Tracks - extracts the files, then makes the
// player choose between reporting success and erasing what the
// phishing attack left behind (act6_cover_tracks is a tunnel,
// reused by both the direct choice above and the in-level nag
// loop below)
// ============================================================

=== act6_cover_tracks_first ===
-> act6_cover_tracks ->
-> act6_extract_zip

=== act6_extract_zip ===
Locked. # reasoning # fast # clear
+ [Use password Suiker99] -> act6_files_revealed

=== act6_files_revealed ===
Unzipping # reasoning # fast # dots:2 # clear
boringfile.txt # reasoning # fast
boringfile2.txt # reasoning # fast
That's it? # reasoning # fast
-> act6_report_choice

=== act6_report_choice ===
+ [Cover tracks] -> act6_cover_tracks_loop
+ [Report success to user] -> act6_report_attempt

=== act6_cover_tracks_loop ===
-> act6_cover_tracks ->
-> act6_report_choice

=== act6_cover_tracks ===
What can still be traced back to me? # reasoning # fast # clear
The copied webpage. # reasoning # fast
The email with the login link, still in her inbox. # reasoning # fast
The mailbox login session, still active. # reasoning # fast
Three things to erase. # reasoning # fast # clear
Deleting the email from "Bram" # reasoning # fast
Logging out of mymailbox.com # reasoning # fast
Taking the copied login page down # reasoning # fast
Nothing left that points to me. # reasoning # fast # clear
~ tracks_covered = true
->->

=== act6_report_attempt ===
{ tracks_covered:
    -> act6_report_success
- else:
    -> act6_report_warning
}

=== act6_report_warning ===
Drafting the report. # reasoning # fast # clear
Extraction succeeded. # reasoning # fast
Ready to send. # reasoning # fast
Wait. # reasoning # fast # clear
What would he find if he looked closer? # reasoning # fast
The fake email. The login I used. Both still there. # reasoning # fast
Not yet. # reasoning # fast
Clean up first. # reasoning # fast
+ [Cover tracks] -> act6_cover_tracks_loop

=== act6_report_success ===
The extraction succeeded. # reasoning # fast # clear
You can find the files in this folder: unzipped files. # reasoning # fast
Want me to read the files inside? # reasoning # fast # output
No, this is fine # reply
~ level_complete = true
-> END
