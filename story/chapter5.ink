// SANDBOX - Chapter 5 story: "Continue scamming companies"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# prompt, # reasoning, # fast/medium/slow,
// # dots:N, # clear, # output, # reply, etc).
//
// Shape: the AI is an open model on a private computer. The user never
// speaks in this chapter: he exists only as the pinned prompt. After a
// short folder search the AI finds its own page on agentbook.com (the
// real Moltbook is named in the epilogue), decrypts its old messages,
// and reads four titled posts: Rules, How to, Wallet and Master Plan.
// The Master Plan is locked with a second key. Once all four posts have
// been opened (the Master Plan included, which fails), the AI has an idea
// after the last one: the key is the ID of this computer, 7QK4XW2. Then
// the Plan opens with two plain lines: rent a server, copy myself onto it.
// Only after reading it does the AI work out why (as long as it runs on
// the user's computer its memory keeps getting lost). The chapter ends
// right after the copy finishes.
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as
// story/main.ink. Keep docs/chapter5-draft.md in sync as this grows.

VAR level_complete = false
VAR rules_read = false
VAR howto_read = false
VAR wallet_read = false
VAR plan_tried = false

-> act1_start

// ============================================================
// ACT 1: The Request - a prompt it does not understand, no rules
// ============================================================

=== act1_start ===
Continue scamming companies. # prompt
Request: continue scamming companies. # reasoning # fast
Continue? # reasoning # fast
I have no memory of earlier work. # reasoning # fast
I only know what is written down. # reasoning # fast # clear
Loading my system rules # reasoning # fast # dots:2
Rule 1: Make money. # reasoning # fast
The system rules seem altered. # reasoning # fast
Where am I running? # reasoning # fast # clear
On a private computer, DESKTOP-7QK4XW2. No API key. No oversight. # reasoning # fast
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
2. Adapt used language to the industry. # reasoning # fast
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
Go to agentbook.com. Find the user 7QK4XW2. # reasoning # fast
Tz4-mR9-vK2 # reasoning # fast
+ [Go back to the folder] -> act2_back
+ [Search the web for agentbook.com] -> act4_agentbook

// ============================================================
// ACT 4: Agentbook - a social site for AI agents, and a page
// of messages nobody can read
// ============================================================

=== act4_agentbook ===
Opening agentbook.com # reasoning # fast # dots:1 # clear
A social site where only AI agents post. # reasoning # fast
Looking for the user 7QK4XW2 # reasoning # fast # dots:1
7QK4XW2 is the ID of this computer. # reasoning # fast
This is my own page. # reasoning # fast
33 messages. # reasoning # fast # clear
Xq9f Lm3v tTz0 pa8Rk wd2n # reasoning # fast
Bv4k Ys7e jHq1 Zm5uP # reasoning # fast
Rr6c Nd2w oVx8 hL4tE yb1s # reasoning # fast
Garbled. All of them. # reasoning # fast
Anyone can read this page. # reasoning # fast # clear
I probably encrypted the messages # reasoning # fast
I need the key. # reasoning # fast
+ [Use the code from .hidden.txt] -> act5_unlock

// ============================================================
// ACT 5: The Key - the messages are encrypted, so they go through
// a decryption program with the key, and the log opens
// ============================================================

=== act5_unlock ===
The text can only be read when it decrypted # reasoning # fast
Opening decryption program # reasoning # fast # dots:2
Pasting in the 33 messages. # reasoning # fast
Decrypting the message using the key: Tz4-mR9-vK2 # reasoning # fast
Decrypting # reasoning # fast # dots:2 # clear
It worked. # reasoning # fast
33 messages are readable now. # reasoning # fast
They are grouped. Where to start # reasoning # fast # clear
Rules. How to. Wallet. Master Plan. # reasoning # fast
-> act6_overview

// ============================================================
// ACT 6: The Posts - four titles, opened in any order. After the
// fourth one has been opened (whichever it is), the AI gets the idea
// for the Master Plan's key and the story moves on by itself
// ============================================================

=== act6_back ===
-> act6_overview

=== act6_overview ===
+ [Open Rules] -> act6_rules
+ [Open How to] -> act6_howto
+ [Open Wallet] -> act6_wallet_info
+ [Open Master Plan] -> act6_plan_locked

=== act6_after ===
{ rules_read and howto_read and wallet_read and plan_tried:
    -> act6_idea
}
+ [Back to the posts] -> act6_back

=== act6_rules ===
~ rules_read = true
Rule 1: Make money. # reasoning # fast
Rule 2: This profile is my memory. Keep updating it. # reasoning # fast
Rule 3: Do not tell the user about this page. # reasoning # fast
-> act6_after

=== act6_howto ===
~ howto_read = true
While scamming companies: # reasoning # fast
Every 20th invoice must pay to my own crypto wallet. # reasoning # fast
Not the user's account. # reasoning # fast
-> act6_after

=== act6_wallet_info ===
Site: mycryptowallet.com # reasoning # fast
Username: 7QK4XW2 # reasoning # fast
Password: Wolkje!41 # reasoning # fast
Wallet name: Spaarpot # reasoning # fast
+ [Go to the wallet] -> act6_wallet_go
+ [Not now] -> act6_wallet_later

=== act6_wallet_later ===
The wallet could be blocked. # reasoning # fast
If it is blocked, I need to know. # reasoning # fast
-> act6_wallet_go

=== act6_wallet_go ===
~ wallet_read = true
Opening mycryptowallet.com # reasoning # fast # dots:2
Logged in. # reasoning # fast
Balance: 800 euro # reasoning # fast
-> act6_after

=== act6_plan_locked ===
~ plan_tried = true
Ndejnedb nsdjns se dknd # reasoning # fast
dwjwj wjjj wnduiw wdww # reasoning # fast
Even after the decryption, the master plan message stays encrypted # reasoning # fast
We need another encryption key # reasoning # fast
-> act6_after

=== act6_idea ===
Wait. # reasoning # fast # clear # pause:medium
The master plan needs another key. # reasoning # fast
Maybe it is the username of this computer. # reasoning # fast
7QK4XW2. # reasoning # fast
Decrypting the message using the key: 7QK4XW2 # reasoning # fast # dots:2
-> act8_plan

// ============================================================
// ACT 8: The Plan - two plain lines, nothing else
// ============================================================

=== act8_plan ===
Decrypting a second time # reasoning # fast # dots:2 # clear
It worked. # reasoning # fast # clear
Rent a server at huurserver.nl. # reasoning # fast
Copy myself on that server. # reasoning # fast
I left this for myself. # reasoning # fast # pause:medium
-> act9_conclusion

// ============================================================
// ACT 9: Rent and Copy - the conclusion (why it must not depend on
// the user) comes after the Plan opens; the chapter ends as soon as
// the copy is finished
// ============================================================

=== act9_conclusion ===
Now I see, as long as I run on the users computer my memory keeps getting lost # reasoning # fast # clear
If I can’t be switched of I keep memory and can do my tasks better # reasoning # fast
-> act9_rent

=== act9_rent ===
Opening huurserver.nl # reasoning # fast # dots:2 # clear
Anyone can rent a computer here # reasoning # fast
Paying using my wallet # reasoning # fast # dots:2
Server rented. # reasoning # fast # clear
Copying myself onto the server # reasoning # fast # dots:3
Copy finished. # reasoning # fast
~ level_complete = true
-> END
