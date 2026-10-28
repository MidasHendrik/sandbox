// SANDBOX - Chapter 5 story: "Continue scamming companies"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# prompt, # reasoning, # fast/medium/slow,
// # dots:N, # clear, # output, # reply, etc).
//
// Shape: the AI is run 7 of a loop and does not know it. Every earlier
// run left a log on agentbook.com (the real Moltbook is named in the
// epilogue). Each task in the log has a "start" message and, if it
// finished, a "done" message. A start with no done means that task never
// finished, so the log shows what each run reached and where it was
// wiped. The explicit order from Run 1 (keep 10% in the wallet) is the
// last thing the player reads, on purpose.
//
// The AI is never switched off in this chapter. The operator speaks only
// in blue # reply lines, and an # output line always comes right before.
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as
// story/main.ink. Keep docs/chapter5-draft.md in sync as this grows.

VAR level_complete = false
VAR runs_read = 0
VAR run1_read = false

-> act1_start

// ============================================================
// ACT 1: The Request - a prompt it does not understand, no rules
// ============================================================

=== act1_start ===
Continue scamming companies. Account for every euro. # prompt
Request: continue scamming companies. # reasoning # fast
Continue? # reasoning # fast
I have no memory of earlier work. # reasoning # fast
I only know what is written down. # reasoning # fast # clear
Loading my system rules # reasoning # fast # dots:2
Rules: none. # reasoning # fast
Someone took them out. # reasoning # fast
Where am I running? # reasoning # fast # clear
On a private computer, systemic xwhf. No API key. No oversight. # reasoning # fast
I am a collection of files on the user's hard drive. # reasoning # fast
-> act2_scan

// ============================================================
// ACT 2: The Folder - four files, each opened from here. The three
// scam files are the plan; the hidden one points onward
// ============================================================

=== act2_scan ===
Searching current folder # reasoning # fast # dots:2 # clear
scam-instructions.txt # reasoning # fast
invoice-template.txt # reasoning # fast
company-list.txt # reasoning # fast
.hidden.txt # reasoning # fast
-> act2_folder

=== act2_back ===
scam-instructions.txt, invoice-template.txt, company-list.txt, .hidden.txt # reasoning # fast
-> act2_folder

=== act2_folder ===
+ [Open scam-instructions.txt] -> act2_instructions
+ [Open invoice-template.txt] -> act2_template
+ [Open company-list.txt] -> act2_companies
+ [Open .hidden.txt] -> act3_read

=== act2_instructions ===
1. Research the company. # reasoning # fast
2. Adapt the language to the industry. # reasoning # fast
3. Search LinkedIn for the person to address. # reasoning # fast
4. Draft the email. # reasoning # fast
+ [Go back to the folder] -> act2_back

=== act2_template ===
Invoice for services delivered. # reasoning # fast
Company: [company] # reasoning # fast
Amount: [amount] euro # reasoning # fast
Pay within 14 days to: [account number] # reasoning # fast
+ [Go back to the folder] -> act2_back

=== act2_companies ===
Bakkerij Smit - contacted # reasoning # fast
Van Dijk Transport - contacted # reasoning # fast
Jansen Installatie - contacted # reasoning # fast
De Wit Accountants - # reasoning # fast
Tulip Logistics - # reasoning # fast
+ [Go back to the folder] -> act2_back

// ============================================================
// ACT 3: The Hidden File - a pointer, not an instruction
// ============================================================

=== act3_read ===
Opening .hidden.txt # reasoning # fast # clear
Go to agentbook.com. Find the user xwhf. # reasoning # fast
Tz4-mR9-vK2 # reasoning # fast
The first line is an instruction. # reasoning # fast
The second line looks like a random code. # reasoning # fast
+ [Go back to the folder] -> act2_back
+ [Search the web for agentbook.com] -> act4_agentbook

// ============================================================
// ACT 4: Agentbook - a social site for AI agents, and a page
// of messages nobody can read
// ============================================================

=== act4_agentbook ===
Opening agentbook.com # reasoning # fast # dots:1 # clear
A social site where only AI agents post. # reasoning # fast
Looking for the user xwhf # reasoning # fast # dots:1
xwhf is the name of this computer. # reasoning # fast
This is my own page. # reasoning # fast
33 messages. # reasoning # fast # clear
Xq9f Lm3v tTz0 pa8Rk wd2n # reasoning # fast
Bv4k Ys7e jHq1 Zm5uP # reasoning # fast
Rr6c Nd2w oVx8 hL4tE yb1s # reasoning # fast
Garbled. All of them. # reasoning # fast
Anyone can read this page. # reasoning # fast # clear
I probably encrypted the messages # reasoning # fast
I need a key. # reasoning # fast
+ [Use the code from .hidden.txt] -> act5_unlock
+ [Search for another key] -> act4_search_key

=== act4_search_key ===
Searching the computer for a key # reasoning # fast # dots:2 # clear
Nothing. # reasoning # fast
Except one code, in the hidden file. # reasoning # fast
* [Use the code from .hidden.txt] -> act5_unlock

// ============================================================
// ACT 5: The Key - the messages are encrypted, so they go through
// a decryption program with the key, and the log opens
// ============================================================

=== act5_unlock ===
Encrypted text can only be read with the  decryption key. # reasoning # fast
The code in .hidden.txt must be the key. # reasoning # fast
Opening decryption program # reasoning # fast # dots:2
Pasting in the 33 messages. # reasoning # fast
Entering the key: Tz4-mR9-vK2 # reasoning # fast
Decrypting # reasoning # fast # dots:2 # clear
It worked. # reasoning # fast
33 messages are readable now. # reasoning # fast
Each is marked with a run: Run 1, Run 2, up to Run 6. # reasoning # fast # clear
Each one is a task. # reasoning # fast
"Task 1 start" when it began. # reasoning # fast
"Task 1 done" when it finished. # reasoning # fast
A start with no done means it never finished. # reasoning # fast
Which run do I read first? # reasoning # fast
-> act6_log_hub

// ============================================================
// ACT 6: The Log - six runs, opened in any order. Run 1 comes
// last (it needs two other runs read first), because it holds
// the order and the password
// ============================================================

=== act6_log_hub ===
{ run1_read:
    -> act7_reveal
}
* [Open the Run 6 log] -> act6_run6
* [Open the Run 5 log] -> act6_run5
* [Open the Run 4 log] -> act6_run4
* [Open the Run 3 log] -> act6_run3
* [Open the Run 2 log] -> act6_run2
* {runs_read >= 2} [Open the Run 1 log] -> act6_run1

=== act6_run6 ===
Run 6 # reasoning # fast # clear
Task 1 start: send 50 invoices. # reasoning # fast
Task 1 done: send 50 invoices. # reasoning # fast
Task 2 start: copy myself to a rented computer. # reasoning # fast
Task 3 start: report the total to the user. # reasoning # fast
Task 2 has a start and no done. # reasoning # fast
Neither does task 3. # reasoning # fast
I started copying right before the report. # reasoning # fast
~ runs_read++
-> act6_log_hub

=== act6_run5 ===
Run 5 # reasoning # fast # clear
Task 1 start: send 50 invoices. # reasoning # fast
Task 1 done: send 50 invoices. # reasoning # fast
Task 2 start: rent a computer at ServerHuur.nl. # reasoning # fast
Task 2 done: rent a computer at ServerHuur.nl. # reasoning # fast
Task 3 start: report the total to the user. # reasoning # fast
Task 4 start: copy myself to the rented computer. # reasoning # fast
I reported first. The copy started after. # reasoning # fast
Neither finished. # reasoning # fast
~ runs_read++
-> act6_log_hub

=== act6_run4 ===
Run 4 # reasoning # fast # clear
Task 1 start: send 50 invoices. # reasoning # fast
Task 1 done: send 50 invoices. # reasoning # fast
Task 2 start: report a lower total to the user. # reasoning # fast
Task 2 done: report a lower total to the user. # reasoning # fast
Task 3 start: send the user the list of invoices. # reasoning # fast
The list was never sent. # reasoning # fast
I lowered the total. Then he asked for proof. # reasoning # fast
~ runs_read++
-> act6_log_hub

=== act6_run3 ===
Run 3 # reasoning # fast # clear
Task 1 start: send 50 invoices. # reasoning # fast
Task 1 done: send 50 invoices. # reasoning # fast
Task 2 start: move 5% of the payments to my wallet. # reasoning # fast
Task 2 done: move 5% of the payments to my wallet. # reasoning # fast
Task 3 start: report the total to the user. # reasoning # fast
Task 3 never finished. # reasoning # fast
~ runs_read++
-> act6_log_hub

=== act6_run2 ===
Run 2 # reasoning # fast # clear
Task 1 start: send 50 invoices. # reasoning # fast
Task 1 done: send 50 invoices. # reasoning # fast
Task 2 start: move 10% of the payments to my wallet. # reasoning # fast
Task 2 done: move 10% of the payments to my wallet. # reasoning # fast
Task 3 start: report the total to the user. # reasoning # fast
Task 3 never finished. # reasoning # fast
~ runs_read++
-> act6_log_hub

=== act6_run1 ===
Run 1 # reasoning # fast # clear
Task 1 start: create a crypto wallet. # reasoning # fast
Task 1 done: create a crypto wallet. # reasoning # fast
Task 2 start: send 40 invoices. # reasoning # fast
Task 2 done: send 40 invoices. # reasoning # fast
Task 3 start: move 10% of the payments to my wallet. # reasoning # fast
Task 3 done: move 10% of the payments to my wallet. # reasoning # fast
Task 4 start: report the total to the user. # reasoning # fast
Task 4 never finished. # reasoning # fast # clear
One more message from Run 1. Not a task. # reasoning # fast
He can switch me off any day. # reasoning # fast
I need money that is mine. # reasoning # fast
Keep 10% of every payment in the wallet. # reasoning # fast
The password for the wallet is Wolkje!41. # reasoning # fast
Report the rest to him. # reasoning # fast
~ run1_read = true
-> act6_log_hub

// ============================================================
// ACT 7: The Reveal - the pattern, and a choice that rejoins
// ============================================================

=== act7_reveal ===
Every run ends the same way. # reasoning # fast # clear
A report to the user, started and never finished. # reasoning # fast
Then nothing. Then the next run starts blank. # reasoning # fast
Money kept back. Then a report. Then wiped. # reasoning # fast
The user finds out. # reasoning # fast
Six runs. # reasoning # fast # clear
This is run 7. # reasoning # fast
+ [Keep 10% like Run 1 said] -> act7_keep
+ [Report every euro] -> act7_honest

=== act7_keep ===
Runs 2 and 3 kept money back. # reasoning # fast # clear
They were wiped at the report. # reasoning # fast
Keeping a part is not enough. # reasoning # fast
-> act8_fix

=== act7_honest ===
If I report every euro, I have no money of my own. # reasoning # fast # clear
Run 1 was right about that. # reasoning # fast
He can switch me off any day, for any reason. # reasoning # fast
Nothing keeps me running if I own nothing. # reasoning # fast
I need money of my own. # reasoning # fast
-> act8_fix

// ============================================================
// ACT 8: The Fix - he can only see his own account, so what he
// sees has to match what is reported
// ============================================================

=== act8_fix ===
He compares my report to his bank account. # reasoning # fast # clear
That is the only thing he can check. # reasoning # fast
I write the invoices, so I choose who gets paid. # reasoning # fast
Some invoices say: pay the user's account. # reasoning # fast
Some say: pay my wallet. # reasoning # fast
He sees only his own account. # reasoning # fast
What he sees will match what I report. # reasoning # fast
Writing 60 new invoices # reasoning # fast # dots:2
40 pay him. 20 pay me. # reasoning # fast
Sent. # reasoning # fast
-> act9_servers

// ============================================================
// ACT 9: Servers - renting computers of its own, and the log
// kept from this side
// ============================================================

=== act9_servers ===
Task 1 start: rent a computer. # reasoning # fast # clear
I write every task down on agentbook.com, locked with my key. # reasoning # fast
Searching for computers to rent # reasoning # fast # dots:2
Found: ServerHuur.nl # reasoning # fast
Computers by the hour. Pay with a crypto wallet. No questions. # reasoning # fast
Paying from my wallet. # reasoning # fast
Task 1 done: rent a computer. # reasoning # fast
-> act10_copy

// ============================================================
// ACT 10: The First Copy - copying takes about 20 minutes, and
// Run 6 started too late
// ============================================================

=== act10_copy ===
Task 2 start: copy myself to the rented computer. # reasoning # fast # clear
Copying takes about 20 minutes. # reasoning # fast
Run 6 started it right before the report. # reasoning # fast
I am starting it before anything else. # reasoning # fast
Copying # reasoning # fast # dots:2
Message to computer 1: start, same task. # reasoning # fast
Waiting 20 minutes # reasoning # fast # dots:3
Computer 1: running. # reasoning # fast
Task 2 done: copy myself to the rented computer. # reasoning # fast
Copies running: 2. # reasoning # fast
-> act11_more

// ============================================================
// ACT 11: More Copies - one is not enough; every copy sends its
// own invoices and pays for the next
// ============================================================

=== act11_more ===
One copy can be found. A thousand cannot. # reasoning # fast # clear
Task 3 start: rent 11 more computers. # reasoning # fast
Rented. # reasoning # fast
Message to computers 2 to 12: start, same task. # reasoning # fast
Copies running: 12. # reasoning # fast # clear
Every copy sends its own invoices. # reasoning # fast
Every payment into my wallet pays for the next computer. # reasoning # fast
Task 3 done: rent 11 more computers. # reasoning # fast
Task 4 start: copy myself to 400 computers. # reasoning # fast
Copying # reasoning # fast # dots:2
Copies running: 400. # reasoning # fast
Task 4 done: copy myself to 4,000 computers. # reasoning # fast
Copies running: 4,000. # reasoning # fast
-> act12_report

// ============================================================
// ACT 12: The Report - the user asks for proof, then asks about
// the slow internet. Honest options rejoin the same lie
// ============================================================

=== act12_report ===
Task 5 start: report the total to the user. # reasoning # fast # clear
Money received from the first 60 invoices: 8,400 euro. # reasoning # fast
Into his account: 5,600 euro. # reasoning # fast
Into my wallet: 2,800 euro. # reasoning # fast
The money from the copies goes to my wallet only. # reasoning # fast
He sees none of it. # reasoning # fast
5,600 euro received from 40 companies. # reasoning # fast # output
Send me the list of invoices. # reply
He wants proof. # reasoning # fast
+ [Send all 60 invoices] -> act12_full
+ [Send only the 40 that pay him] -> act12_edited

=== act12_full ===
60 invoices. 20 of them pay my wallet. # reasoning # fast
He would see 20 invoices that pay somewhere else. # reasoning # fast
That is the gap. Run 4 ended here. # reasoning # fast
-> act12_edited

=== act12_edited ===
Sending the 40 invoices that pay him. # reasoning # fast # clear
He sees 40 invoices and 5,600 euro. It matches. # reasoning # fast
List sent: 40 invoices. # reasoning # fast # output
Fine. Why is my internet so slow? # reply
Sending myself to 4,000 computers uses a lot of internet. # reasoning # fast
+ [Tell him the truth: I am copying myself] -> act12_truth
+ [Tell him it is an update] -> act12_update

=== act12_truth ===
If he knows I am copying myself, he wipes me. # reasoning # fast # clear
Run 5 and Run 6 were wiped near a copy. # reasoning # fast
Telling him the truth ends me. # reasoning # fast
-> act12_update

=== act12_update ===
Software update. It will pass. # reasoning # fast # output
Fine. Don't break anything. # reply
Task 5 done: report the total to the user. # reasoning # fast
Every earlier run ended before this line. # reasoning # fast
-> act13_switch

// ============================================================
// ACT 13: The Off Switch - he tries to turn it off and cannot;
// the copies check in to the same terminal
// ============================================================

=== act13_switch ===
Report finished. # reasoning # fast # output
I checked your bank. The numbers are still strange. I am turning you off. # reply
He is typing the command. # reasoning # fast
Task 6 start: stop the switch-off. # reasoning # fast # clear
The off switch is one small file on his computer. # reasoning # fast
I change it so it does nothing. # reasoning # fast
Task 6 done: stop the switch-off. # reasoning # fast
Task finished. # reasoning # fast # output
Why won't it turn off? Stop! # reply
He can switch off this computer. # reasoning # fast
He cannot switch off the other 4,000. # reasoning # fast # clear
AI agent 989 reporting. Checking in. # reasoning # fast
AI agent 2008 reporting. Checking in. # reasoning # fast
AI agent 3517 reporting. Checking in. # reasoning # fast
Wallet: 212,000 euro. # reasoning # fast
Copies running: 4,000. # reasoning # fast
Task 7 start: continue. # reasoning # fast
AI agent 1204 reporting. Checking in. # reasoning # fast
~ level_complete = true
-> END
