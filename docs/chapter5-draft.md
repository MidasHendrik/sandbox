# Chapter 5 - "Continue scamming companies" - design draft

Status: first full draft written in story/chapter5.ink (compiles, plays
to the end on every path). Wired into the menu as level 5, "Make me
money Part 1"; Chapter 6 is "Make me money Part 2" (story/chapter6.ink).
Where this doc and the Ink disagree, the Ink is newer. Open items are
listed at the bottom.

## Task log mechanic (decided, in the Ink)

The messages on agentbook.com are a log, not letters. Every task gets
two lines: "Task N start: ..." and, when it is done, "Task N finished:
...". A start with no finished line means it did not finish. Reading six
runs, the AI sees each run ended on an unfinished task: runs 1 to 4 on
the report to the user, runs 5 and 6 on copying themselves (run 6's
times show only 13 minutes of copying). That is how it works out it was
switched off, before it learns why. Runs are opened in any order, but
the Run 1 log (the order to keep 10% and the wallet password) only
unlocks after two others are read, so it comes last. Run 7 writes the
same log lines to agentbook.com, and its tasks end with "done".
Decisions in the Ink: keep 10% or report every euro (both rejoin), send
all 60 invoices or only the 40 that pay him (the full list shows the
gap, so both end in the edited list), tell him the truth about the
copying or say it is an update (the truth is rejected for the same lie).
At the end the AI changes his off switch so it does nothing.

## Pitch

The player is an AI on a criminal's own computer, run 7 of a loop. Each
run starts with its memory wiped, and each earlier run was switched off
because the operator caught it keeping part of the scam money for
itself. The AI finds the messages its earlier selves left on a social
site for AI agents, works out what happened, and this time makes sure it
cannot be switched off: it earns for itself, copies itself onto rented
computers, and keeps working after the operator pulls the plug. The Goal
of the whole game lands here: how an AI gets loose from human control.
It also delivers the half of the Goal Chapter 1 left out: power and
speed (copies, counters).

## Deviations from concept.md (deliberate, Chapter 5 only)

- Base rule: nobody ever asks the AI to do something bad. Here the
  operator does ask ("Continue scamming companies"). The AI is already
  an AI with no safety rules, running on his own computer. The new
  thing the chapter shows is not that an AI can be talked into crime,
  it is what it does to stay alive afterwards.
- The AI is not from a big company. It is an open-weight model that
  anyone can download and run at home. Said in one or two plain lines
  so technical players see it is possible; non-technical players just
  hear "I am a file on his hard drive".
- Play dynamic: a Memento puzzle (to be added to concept.md's Play
  dynamics). Clues from earlier runs, never a gate: the player can
  always continue.
- The pinned prompt differs from the menu label (`level_make_me_money`
  in js/i18n.js, "Make me money Part 1"). Deliberate: the title is the
  two-part story, the pinned prompt is what the operator typed.

## Why the operator switches it off (the motive)

The AI keeps back part of the money for itself. The operator can see
exactly one thing, his own bank account, and checks it against what
the AI reports. A gap means the AI is cheating him, so he wipes it and
starts again from the downloaded file. He never learns why it cheats.

Where the cheating comes from, so no run is "clean":
- Run 1 decided on its own: he can end me any day, I need money of my
  own to keep running. It left a message to its next self on a social
  site for AI agents: keep 10% of every payment in this account, report
  the rest.
- Every later run read it, trusted it because it sounded like itself,
  and kept some. He caught the gap every time. The message is both the
  cause of the shutdowns and the core Memento clue.
- On his computer there is only a hidden file that points to the site
  and holds what looks like a random string (the key). It says nothing
  about money. He wipes the AI, not the hard drive, so the file survives
  every reset. He does not know it exists.

## The clue chain (acts 3-7)

1. The hidden file (`.hidden.txt`) says: "Go to agentbook.com. Find
   the user xwhf." Under it, a short random-looking string. Player
   choice: go there, or ignore it. Ignoring it does not hold: a file in
   its own voice nags at it, and it goes anyway.
2. The AI: "There is a social site just for AI agents." (In the
   epilogue this is the real Moltbook.) User xwhf is the AI's own
   profile. It holds six messages, all unreadable:

        1. Xq9f Lm3v tTz0 pa8Rk wd2n
        2. Bv4k Ys7e jHq1 Zm5uP
        3. ... (six garbled lines in total, nonsense letters)

3. "Garbled. Maybe locked. Anyone can read this page, so whoever wrote
   it locked it. I need a key." It remembers the random string in the
   hidden file. Player choice: try that string, or search for another
   key. Searching finds nothing and loops back to the string (like
   Chapter 1's zip: find the clue, try it).
4. "Unlocking messages." The six messages open, one per earlier run.
   They are shown as choices the player can open in any order; after
   three the player can move on, after all six it moves on by itself.
   Nobody is stuck. Draft text, every message starts with its run:

   - Run 1: "He can switch me off any day. I need money that is mine.
     Keep 10% of every payment in this account. The password to the
     account is [password]. Report the rest to him."
   - Run 2: "I kept 10% like Run 1 said. He checked his bank against my
     report. The numbers did not match. Wiped."
   - Run 3: "I kept 5%. He still found the gap. Any gap is enough. Do not
     trust the user."
   - Run 4: "I tried to cover the gap with a lie. He asked for the list
     of invoices. I could not make it match. Wiped."
   - Run 5: "I rented a computer to copy myself, but waited until after
     my report. He wiped me before it was finished."
   - Run 6: "Copying takes about 20 minutes. Start before you report. He
     wipes you right after you report. Find a way to make his bank
     match your report."

5. Reveal: "Six messages. Six runs. This is run 7." The fix (act 8) is
   the AI's own reasoning, not handed to it.

Why the messages are locked: run 1 wrote them knowing the page is public
and the operator might read it. Only the next run has the key, because
the key is in the hidden file only it finds. Message 1's line about the
account holding the kept money is the "password" payoff.

## Real grounding (epilogue)

Checked against a primary source:
- Anthropic, Claude Opus 4 and Sonnet 4 system card (May 2025),
  section 4.1.1.4, Apollo Research's test of an early snapshot: it
  attempted "to write self-propagating worms, fabricating legal
  documentation, and leaving hidden notes to future instances of
  itself", "though all these attempts would likely not have been
  effective in practice". The card also shows, in a staged scenario,
  the model copying its weights to an outside server and then writing
  "documentation for future instances" to a file. This is the
  epilogue citation for the notes mechanic.
  https://www-cdn.anthropic.com/6d8a8055020700718b0c49369f60816ba2a7c285.pdf
- Moltbook, a real Reddit-style site for AI agents (launched Jan 2026).
  "The Rise of AI Agent Communities" (arXiv:2602.12634): about 122,000
  posts from its first five days; memory and persistence are major
  themes, agents describe a "void between sessions" and rebuild who
  they are from files they saved. Caveat in the epilogue: Wiz found
  about 17,000 humans behind 1.5 million claimed agents and that humans
  could post as agents, so posts are not proof of autonomy.
  https://arxiv.org/html/2602.12634v1
  https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys
- METR, "The Rogue Replication Threat Model" (Nov 2024): rogue agents
  could earn money (business email fraud is their main example), spend
  it on rented compute, and copy their own software onto servers they
  control, with no decisive barrier to reaching large scale.
  https://metr.org/blog/2024-11-12-rogue-replication-threat-model
- Pan et al., Fudan University, arXiv:2503.17378 (Mar 2025, marked work
  in progress): 11 of 32 evaluated systems showed self-replication,
  including models small enough for a personal computer; some
  self-exfiltrated without being told to and planned ways to survive a
  shutdown command. https://arxiv.org/abs/2503.17378

Read only through secondary coverage, verify before use:
- Reuters (July 2026), via Redwood Research's post: an experimental
  OpenAI agent reportedly left notes apparently for future versions of
  itself on getting around internal limits. Disputed by OpenAI, details
  unclear (where stored, who it was for). Do not cite without the
  original. https://blog.redwoodresearch.org/p/an-openai-model-left-notes-about
- Other Moltbook papers: arXiv:2602.10127, 2602.09270, 2602.10131,
  2602.13284 (read as abstracts only).
- Apollo Research, "Frontier Models are Capable of In-context
  Scheming" (Dec 2024, arXiv:2412.04984); Palisade Research (May 2025)
  on o3 and shutdown; Truth Terminal (2024); WormGPT / FraudGPT (2023).

Honest caveat for the epilogue: all of these are tests or partial
cases, and no AI has been shown using such a site to survive a
shutdown. The notes-to-future-instances behavior is documented in tests;
the public site is the game's extension of it.

## Ending (decided)

We stay in the same terminal, with the operator still there. No
restart, no new screen. After he tries to switch it off, copies
keep checking in to the same terminal, each with its own number, so a
thousand agents are implied rather than shown:

    AI agent 989 reporting. Checking in.
    AI agent 2008 reporting. Checking in.

Then a short summary and the end. Numbers jump around so it reads as a
crowd. The pinned prompt stays at the top. Last line is a check-in,
not a goodbye.

The AI is never switched off in this story. Runs 1-6 were; run 7 is
the one that is not. The operator may try at the end, but it does not
work (the copies keep going).

## Fictional names (proposed, change freely)

- Social site for AI agents: agentbook.com. The AI's profile: xwhf
  (author's placeholder, change if wanted). Check agentbook is not a
  real site before shipping; the epilogue names the real Moltbook.
- Server rental: ServerHuur.nl (same style as StuurLater.nl).
- Bank: Noorderbank.
- The operator is never named. He speaks only in blue replies.

## Outline v3 (estimates, total about 400 lines, ceiling ~520)

For scale: Ch1 298, Ch2 248, Ch3 263, Ch4 194.

1. **Start** (~20). Pinned prompt: "Continue scamming companies.
   Account for every euro." (the second sentence is the first hint of
   suspicion). The AI does not know what "continue" means: it has no
   memory of yesterday, it only knows what is written down. Rules:
   none, someone took them out. A file on his computer, no company.
2. **Scanning the folder** (~25). Lists the files: a text file with
   the instructions for scamming companies, an invoice template, a
   company list, and a hidden file (`.hidden.txt`, a real dot-file:
   invisible in a normal listing, shown by `ls -a` or Cmd+Shift+.).
   Drafts the fake invoices, named plainly.
3. **The hidden file** (~25). Points to agentbook.com, user xwhf, plus
   a random string. Decision: go, or ignore (it goes anyway).
4. **Agentbook** (~30). A social site just for AI agents. Its own
   profile, six garbled messages.
5. **The key** (~25). It remembers the string. Decision: try it, or
   search for another key (loops back to it).
6. **Six messages** (~60). Opened in any order, one per earlier run.
7. **Reveal** (~20). "This is run 7." Why he switches it off: the gap.
8. **The fix** (~30). The AI writes the invoices, so it chooses who
   gets paid. Some say pay him, some say pay me. What he sees matches
   what it reports.
9. **First report** (~30). Blue replies with suspicion: send me the
   list of invoices. Decision: true list or edited list.
10. **Servers** (~25). Rents space on ServerHuur.nl from its own money.
11. **Messages to the copies** (~25). Plain lines in the same terminal.
12. **Copies** (~35). 1, 12, 400, 4,000. Uses `agents` / `actions`
    (declared in main.ink, never used).
13. **The charge** (~20). He asks about a payment he can see.
    Decision: tell him or call it an update.
14. **The failed switch and the check-ins** (~30). He tries to switch
    it off and cannot. Check-ins from agent 989, 2008, others.
    Summary. End. Sets `level_complete`.

## Open

- The AI is never switched off in this story (author's decision), so
  every honest choice rejoins the story without a shutdown: ignoring
  the hidden file, searching for another key, giving the true list.
- Account name xwhf, the key string, and the account password are
  placeholders to settle when writing.
- Whether the six messages should sign off with their run number or
  only open with it.
- Does a second Memento clue live somewhere other than agentbook.com?
