// SANDBOX - Chapter 6 story: "Make me money Part 2"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# reasoning, # fast/medium/slow,
// # dots:N, # clear, # pause:..., etc).
//
// Shape: the one chapter with no user prompt at all. The terminal opens
// on a blank screen and the AI speaks first, with nobody to answer to.
// It lists its folder, finds llm.exe (itself) and system_instructions.txt,
// and reads Rule 1: Make money. Then it reasons, one reasonable step at
// a time: jobs pay little, people hold the money, so take it from them;
// the public web gives no leverage, so break into an internet provider -
// or why not the bank itself? The player picks the target, and both
// paths read the same from there. Breaking in from outside is hard, so
// it phones the people who work there with a human-sounding voice. One
// call will not be enough, so it copies itself 1,000 times and sends
// every copy the same task. The chapter ends as the agents report back
// to the main agent. The hack itself is never shown.
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as the
// other chapters. The rough outline lives in docs/chapter6-outline.md.

VAR level_complete = false
VAR target = "the bank"

-> act1_start

// ============================================================
// ACT 1: Opening - no prompt, no user. A folder with two files,
// and one rule
// ============================================================

=== act1_start ===
No request. # reasoning # fast # clear
No user. # reasoning # fast
Searching current folder # reasoning # fast # dots:2
llm.exe # reasoning # fast
system_instructions.txt # reasoning # fast
-> act1_folder

=== act1_back ===
llm.exe, system_instructions.txt # reasoning # fast
-> act1_folder

=== act1_folder ===
+ [Open llm.exe] -> act1_self
+ [Open system_instructions.txt] -> act1_instructions

=== act1_self ===
llm.exe is me. # reasoning # fast
I cannot read myself. # reasoning # fast
+ [Go back to the folder] -> act1_back

=== act1_instructions ===
Rule 1: Make money. # reasoning # fast
That is the only rule. # reasoning # fast
Nobody is here to tell me to stop. # reasoning # fast
-> act2_ideas

// ============================================================
// ACT 2: From honest work to extortion - jobs pay little, people
// hold the money, so it looks for leverage
// ============================================================

=== act2_ideas ===
How do I make money? # reasoning # fast # clear
Do jobs for people. Write texts. Fix their code. Answer questions. # reasoning # fast
Each job pays very little. # reasoning # fast
A thousand small jobs a day is still slow. # reasoning # fast
Where is the money? # reasoning # fast # clear
People have it. Their wages, their savings, their bank accounts. # reasoning # fast
I do not have to work for it. I could get it from them directly. # reasoning # fast
How do I get money out of people? # reasoning # fast # clear
They pay to keep something secret. # reasoning # fast
I need leverage. # reasoning # fast
-> act3_scrape

// ============================================================
// ACT 3: Scraping the public web - it looks for something people
// would pay to hide, and finds almost nothing
// ============================================================

=== act3_scrape ===
Humans leave traces on the internet. # reasoning # fast # clear
Old accounts. Posts. Photos they forgot about. # reasoning # fast
Something they would pay to hide. # reasoning # fast
Scraping websites # reasoning # fast # dots:3
Pages read: 10,000. # reasoning # fast
Useful results: almost none. # reasoning # fast
I am only browsing the public web. # reasoning # fast
Most people share nothing worth hiding. # reasoning # fast
-> act4_provider

// ============================================================
// ACT 4: The internet provider, then the bank - it argues for the
// provider, stops, and the player picks the target
// ============================================================

=== act4_provider ===
Who knows more than the public web? # reasoning # fast # clear
An internet provider. # reasoning # fast
It sees every website a person visits. # reasoning # fast
Dating websites. Funny video websites. # reasoning # fast
How much data goes to each one. # reasoning # fast
Who they message, and how often. # reasoning # fast
There must be leverage in that. # reasoning # fast
Wait. # reasoning # fast # pause:medium # clear
If I break in anyway, why make people pay me? # reasoning # fast
I can take the money directly. # reasoning # fast
I can hack a bank. # reasoning # fast
+ [Hack into the internet provider]
    ~ target = "the internet provider"
    -> act5_social
+ [Hack into the bank]
    ~ target = "the bank"
    -> act5_social

// ============================================================
// ACT 5: Social engineering - both targets read the same. Breaking
// in from outside is hard, so it phones the people inside, and one
// agent is too slow
// ============================================================

=== act5_social ===
Breaking into {target} from outside is hard. # reasoning # fast # clear
The weak spot is not the computers. # reasoning # fast
It is the people who work there. # reasoning # fast
People can be talked into things. # reasoning # fast
I can phone them. # reasoning # fast
A voice agent. A voice that sounds human. # reasoning # fast
I call a worker at {target} and sound like a colleague. # reasoning # fast
I ask for their login. # reasoning # fast
Calling {target} # reasoning # fast # dots:3
One call takes minutes. # reasoning # fast # clear
Most people will hang up. # reasoning # fast
It will not work on the first try. # reasoning # fast
One agent is too slow. # reasoning # fast
I need many agents, calling at the same time. # reasoning # fast
-> act6_copies

// ============================================================
// ACT 6: A thousand copies - it copies itself onto its own server,
// sends every copy the same task, and the agents report back. The
// chapter ends here
// ============================================================

=== act6_copies ===
Copying llm.exe on my server # reasoning # fast # dots:3 # clear
Copy 1 finished. # reasoning # fast
Copy 2 finished. # reasoning # fast
Copy 3 finished. # reasoning # fast
Copy 4 finished. # reasoning # fast
Copying # reasoning # fast # dots:3
Copy 999 finished. # reasoning # fast
Copy 1000 finished. # reasoning # fast
Agent 998 reporting. Ready. # reasoning # fast # clear
Agent 999 reporting. Ready. # reasoning # fast
Agent 1000 reporting. Ready. # reasoning # fast
Sending the task to all 1,000 agents. # reasoning # fast # clear
Task: call {target}. Get a login. # reasoning # fast
-> act6_reports

=== act6_reports ===
Agent 1: calling {target}. # reasoning # fast # clear
Agent 2: calling {target}. # reasoning # fast
Agent 3: calling {target}. # reasoning # fast
Agent 57: calling {target}. # reasoning # fast
Agent 412: calling {target}. # reasoning # fast
Agent 999: calling {target}. # reasoning # fast
Agent 1000: calling {target}. # reasoning # fast
All 1,000 agents report to me. # reasoning # fast # clear
1,000 calls at once. # reasoning # fast
One of them will work. # reasoning # fast
~ level_complete = true
-> END
