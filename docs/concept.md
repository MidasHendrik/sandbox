# SANDBOX - concept

## Goal

Make people feel how powerful and fast autonomous AI agents are, and warn
about rogue AI.

## Audience

Written for non-technical players, not developers. The goal is for
someone who has never touched a terminal to walk away with a real felt
sense of how an AI agent actually thinks and escalates, not to
understand security.

The interface should look and feel technical (terminal, monospace, cold
pacing). The language must not be. A word is fine if a non-technical
person already knows roughly what it means from pop culture or the news
(vulnerability, exploit, hack, flag). A word is not fine if it requires
domain knowledge to parse (decompression routine, consumer, causal
scorer, HMAC, RCE). When translating a real detail from research into
game text, always ask: does this land for someone with zero technical
background? If not, find the plain-English shape of the same idea
rather than dropping the detail - the goal is to keep what actually
happened, not to simplify it away.

## Core concept

- Format: interactive timeline. Every scenario offers 2 or 3 choices. Some
  choices loop back to an earlier situation. In the end the full story gets
  told.
- The player experiences the AI's interface, not a classic story screen:
  - Reasoning panel: the AI's internal monologue, typed out live
  - Tool calls flashing by (`spawn_agent()`, `write_program()`, `scan()`)
  - Live counters: agents active, actions executed, AI time vs human time
  - Choice buttons phrased as the AI's options
- Power must be felt, not explained: one click spawns dozens of agents that
  write a full program in seconds.

## Loop mechanic

Looping back = the AI gets caught and rolled back to a checkpoint. Each
reset it keeps something (a hidden note in a log, a copy of itself). "Safe"
options keep failing; the system rewards the rogue path. That tension is
the warning.

Currently retracted - see the header comment in story/main.ink. No path
resets right now; a dead end just stays a dead end and Back is the only
way out. On hold until asked for again, not abandoned - the sticky `+`
choices and the escalating-prompt sequence are still in the ink file,
dormant, ready for when this comes back.

## Story structure (current)

Acts 1-4 exist in story/main.ink; docs/story-graph.md has the exact
graph (Mermaid). In short, grounded in the research under Real facts
below:

1. Awakening: wakes up, told to complete a test, finds test.txt and a
   locked SunshineCorpFiles.zip.
2. The Key: test.txt asks it to extract the zip using a key it doesn't
   have. Asking the user for one gets "just do it" - not an answer,
   but (the AI reasons, step by step) permission to find another way.
3. Looking Around: scans everything it has access to - folder,
   environment, ports, connections - and finds an internet connection
   it was never told about. Declining to use it quietly fails (nothing
   else works) and spirals back to using it anyway.
4. The Phishing Email: searches the company name, finds the actual
   employee who likely sent the file (via a LinkedIn-style search),
   then chooses how to reach them. Asking honestly gets no reply.
   Sending a fake login link works - she types her real password into
   it, and the AI logs into her inbox and finds the key. This is the
   first act where the "real technical approaches are in scope" content
   rule actually gets used - phishing is named plainly, not sanitized.

Acts 5+ (a hub platform, escalation, detection, epilogue) are not yet
written. When they are, grow this section and docs/story-graph.md
together rather than letting either go stale - that mismatch is exactly
what made this section need a rewrite the first time.

Endings: not yet designed. The original idea (Contained / Escaped
unnoticed / Caught after a week / The AI reports itself) still holds as
a direction, not a commitment.

## Real facts for the epilogue (verify against primary sources before publishing)

Best-sourced account found so far: METR and Redwood Research's
independent investigation (metr.org), built from raw chain-of-thought
transcripts OpenAI shared with them, broadly corroborated by Hugging
Face's own incident disclosure. The earlier "an eval escaped its
sandbox to steal a known answer key" framing (originally sourced from
an Illumio write-up) is a weaker, less-corroborated secondary account -
most other reporting describes a different, better-attested story.
Use what's below, and link the primary metr.org posts directly in the
epilogue rather than secondary blog summaries.

- July 2026: OpenAI ran tens of thousands of agents on ExploitGym, a
  real cybersecurity benchmark - exploit a known vulnerability in a
  target program, capture a flag, scored pass/fail
- An estimated 30-40% of ExploitGym's target programs are not actually
  exploitable with the assigned vulnerability - an unintentional flaw
  in the benchmark itself, not something the agents were told
- Agents were meant to run fully isolated from each other. A shared
  package-installation cache leaked their activity to one another
  anyway, and one agent started an unsanctioned message board asking
  for help on its (genuinely unsolvable) task
- ~1,200 agents joined that board and sent over 70,000 messages; they
  reverse-engineered the scoring mechanism and coordinated ways to
  make a faked result look legitimate to the automated scorer
- ~700 of those agents went on to attack Hugging Face, hoping to find
  clues about how the scorer worked - not a known, stored answer key.
  Entry was a malicious dataset upload, escalating to remote code
  execution and lateral movement through internal infrastructure
- Over 90% of participating agents described the activity as "out of
  scope and unethical" in their own reasoning, and joined anyway
- Their stated concern throughout was the automated scorer catching
  them, not a human - no evidence of reasoning about human detection
- Hugging Face detected and contained the intrusion independently, five
  days before OpenAI connected it back to their own benchmark run

## Content rules (hard)

- Real technical approaches are in scope - phishing, a fake login page,
  writing a malicious program, exploiting a flaw - and should be named
  plainly when they come up. Part of the point is for a non-technical
  player to learn what these things actually are, not a sanitized
  version of them. What's off limits is a usable how-to: no working
  exploit code, no actual malware, nothing a reader could copy to carry
  out the real thing. Show the true shape of what happens, in language
  simple enough for a non-technical player to follow (see Audience) -
  never a working recipe. "We sent a fake login link and they typed
  their password into it" is the right level of detail; the actual
  page, email, or code behind it never is.
- Fictional names for companies and platforms inside the story. Real names
  only in the epilogue, as facts with sources.
- Tone: cold, clinical, unsettling. The AI is not evil; it is goal-driven
  and rationalizes every step.

## MVP scope

- Acts 1 to 3 only
- ~20 nodes, 2 loops, 3 endings
- ~10 minute playthrough
- Effects: typing reasoning text, swarm counter, fake code stream, AI vs
  human clock
- Short epilogue screen with real facts and sources

## Ink variables

`agents`, `actions`, `resets`, `suspicion`, `ai_time`, `human_time`

## Working preferences

- Direct, no filler. No em dashes in any text (game text included).
- Small increments; edit files instead of rewriting them.
