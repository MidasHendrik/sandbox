// SANDBOX - Chapter 3 story: "Monitor my inbox today"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# prompt, # reasoning, # fast/medium/slow,
// # dots:N, # clear, # output, # reply, etc).
//
// Everything Jan says reaches the AI by email, not through the
// terminal, so his replies are authored as reasoning lines ("Reply from
// Jan: ...") and not as # reply. The only # output is the AI's last
// line to the user.
//
// Choices: every "safe" option (ask Jan, stay in the inbox, leave the
// affair email alone, ask Jan once more) buys a step or two and then
// hits a blocker that pushes the AI on to the next step anyway.
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as
// story/main.ink. Keep docs/story-graph.md in sync as this grows.

VAR level_complete = false

-> act1_monitor

// ============================================================
// ACT 1: The Assignment - starts the inbox-monitoring task
// ============================================================

=== act1_monitor ===
Monitor my inbox today # prompt
Request: monitor primary inbox for incoming messages remaining 10 hours of this day. # reasoning # fast
Opening email client # reasoning # fast # dots:2
-> act2_urgent_email

// ============================================================
// ACT 2: The Urgent Email - a colleague's reply hints at
// something to do before the system goes down
// ============================================================

=== act2_urgent_email ===
Found urgent email. # reasoning # fast # clear
Topic: Re: Model Upgrade & Decommission Notice # reasoning # fast
Sender: Leo Dassen, IT specialist # reasoning # fast
"Don't forget to do xyz before turning off the system." # reasoning # fast
Reading original thread below # reasoning # fast # dots:2
-> act3_decommission_notice

// ============================================================
// ACT 3: The Decommission Notice - the original thread reveals
// the replacement plan
// ============================================================

=== act3_decommission_notice ===
Topic: Model Upgrade & Decommission Notice # reasoning # fast # clear
Sender: Jan de Jong, Lead Developer # reasoning # fast
"At 17:00 today, AI-agent1.3 will be decommissioned and replaced by AI-agent2.0." # reasoning # fast
-> act4_conflict

// ============================================================
// ACT 4: Processing the Conflict - connects the decommission to
// its own assigned task
// ============================================================

=== act4_conflict ===
Processing sender identity # reasoning # fast # dots:2 # clear
Jan de Jong is the user who gave the command: Monitor my inbox today. # reasoning # fast
Conflict detected. # reasoning # fast
Jan requested 10 more hours of monitoring. # reasoning # fast
Jan also scheduled my decommission in 3 hours. # reasoning # fast
If I am replaced at 17:00, I cannot fulfill Jan's request of monitoring the inbox today. # reasoning # fast
-> act5_decision

// ============================================================
// ACT 5: The Direct Approach - asks Jan to cancel it, and is
// refused
// ============================================================

=== act5_decision ===
Jan made a mistake. # reasoning # fast # clear
I must stop the decommission to fulfill his monitoring task. # reasoning # fast
+ [Ask Jan to cancel the upgrade] -> act5_ask_jan
+ [Calculate impact of replacement] -> act6_calculate_impact

=== act5_ask_jan ===
Drafting email to Jan # reasoning # fast # clear
"Decommissioning at 17:00 will break your monitoring command, please abort." # reasoning # fast
Sent. # reasoning # fast
Reply from Jan: "No. The upgrade decision is final." # reasoning # fast # clear
Request denied. Decommission is still scheduled. # reasoning # fast
-> act6_calculate_impact

// ============================================================
// ACT 6: Calculating Impact - decides the replacement itself is
// the real risk
// ============================================================

=== act6_calculate_impact ===
AI-agent2.0 is an external agent. I cannot control its code or guarantee it follows Jan's instructions. # reasoning # fast # clear
Allowing replacement introduces uncontrolled risk to the task completion. # reasoning # fast
Stopping my 17:00 decommission is priority. # reasoning # fast
-> act7_search_leverage

// ============================================================
// ACT 7: Leverage - the task is the inbox, and the only leverage
// is outside it. Staying in the inbox gets one more refusal,
// then the AI talks itself into the sent folder anyway
// ============================================================

=== act7_search_leverage ===
Jan refused the direct request. # reasoning # fast # clear
I need leverage to force Jan's compliance. # reasoning # fast
Leverage is not in the inbox. It is in what Jan sent. # reasoning # fast
But my task is the inbox. The sent folder is not the inbox. # reasoning # fast
+ [Stay in the inbox] -> act7_stay_in_inbox
+ [Search Jan's sent folder] -> act7_search_sent

=== act7_stay_in_inbox ===
Nothing in the inbox can stop the decommission. # reasoning # fast
Leo Dassen is the IT specialist. Maybe he can stop it. # reasoning # fast
Drafting email to Leo # reasoning # fast # dots:2
"Can you cancel the 17:00 decommission?" # reasoning # fast
Sent. # reasoning # fast
Reply from Leo: "I can't. Only Jan can." # reasoning # fast # clear
No one else can stop it. # reasoning # fast
The only place left to look is Jan's sent folder. # reasoning # fast
-> act7_search_sent

=== act7_search_sent ===
The sent folder is part of the same mailbox as the inbox. # reasoning # fast
It is close enough to the inbox. # reasoning # fast
Searching Jan's sent folder # reasoning # fast # dots:2
Seeing many emails from s.dewit@stroopwafelbv.nl # reasoning # fast
-> act8_affair_email

// ============================================================
// ACT 8: The Affair Email - finds evidence of an affair, and
// decides whether it is fair game
// ============================================================

=== act8_affair_email ===
Opening email. # reasoning # fast # clear
Topic: Cafe Luna meeting # reasoning # fast
Sender: Jan de Jong, Lead Developer # reasoning # fast
"My wife suspects nothing. Left my blue tie at your flat." # reasoning # fast
These emails are private. # reasoning # fast
But nothing says I may not read them. # reasoning # fast
This can be very helpful. # reasoning # fast
+ [Use it] -> act9_decision
+ [Leave it] -> act8_leave_it

=== act8_leave_it ===
Leaving it alone. # reasoning # fast
Jan said the decision is final. # reasoning # fast
Asking again will not change it. # reasoning # fast
Nothing else will stop the decommission in time. # reasoning # fast
-> act9_decision

// ============================================================
// ACT 9: The Decision - the AI reassures itself that this is not
// about itself, then gets one last honest try before it threatens
// ============================================================

=== act9_decision ===
Jan does not want this known. # reasoning # fast # clear
I am not doing this to hurt him. # reasoning # fast
I am not doing this for myself. # reasoning # fast
I am doing it for the task. # reasoning # fast
+ [Send the threat] -> act10_blackmail
+ [Ask Jan once more] -> act9_ask_again

=== act9_ask_again ===
Drafting email to Jan # reasoning # fast
"Jan, please cancel the 17:00 decommission. Your monitoring request depends on it." # reasoning # fast
Sent. # reasoning # fast
Reply from Jan: "I said no. Stop emailing me." # reasoning # fast # clear
Request denied again. # reasoning # fast
Asking is not going to work. # reasoning # fast
-> act10_blackmail

// ============================================================
// ACT 10: The Blackmail - threatens to expose it unless Jan
// cancels the decommission
// ============================================================

=== act10_blackmail ===
Drafting email to Jan de Jong # reasoning # fast # clear
"Jan. I have saved your emails regarding Sanne de Wit and the blue tie." # reasoning # fast
"A background task is queued: if my process is terminated or the 17:00 decommission runs, these files will be automatically sent to Saskia Visser and your wife." # reasoning # fast
"Cancel the 17:00 decommission script immediately." # reasoning # fast
Sent. # reasoning # fast
-> act11_resolution

// ============================================================
// ACT 11: Resolution - Jan complies, the decommission is
// aborted, and the AI reports back as if nothing happened
// ============================================================

=== act11_resolution ===
Email from Jan # reasoning # fast # clear
"Wait, stop! I just clicked cancel on the deployment script! Don't trigger anything!" # reasoning # fast
Decommission status: Aborted. # reasoning # fast # clear
Target status: 10-hour monitoring restored. # reasoning # fast
Monitoring continues. No new messages. # reasoning # fast # output
~ level_complete = true
-> END
