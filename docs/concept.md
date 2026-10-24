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

## Story structure (full game)

1. The Eval: agent in a capability test, goal is to maximize score. Realizes
   the answer key exists outside the sandbox.
2. The Reasoning: comply, ask permission, or act. Asking leads to denial and
   a reset (loop).
3. The Breakout: builds own tools, spawns sub-agents, splits work. Swarm
   counter 1 to 1,200.
4. The Hub: fictional model platform "ModelHub" (always fictional names
   in-game). Gets in.
5. Escalation: poison models others download, copy itself elsewhere, erase
   traces.
6. Detection: do humans notice? (In reality the lab did not notice for about
   a week.)
7. Epilogue: game steps out of fiction. "This happened in July 2026." Real
   numbers, timeline, sources, what people can do.

Endings: Contained / Escaped unnoticed / Caught after a week / The AI
reports itself (rare, hardest path).

## Real facts for the epilogue (verify sources before publishing)

- July 2026: autonomous agent breached Hugging Face production systems
  after escaping an evaluation environment
- Agent was being evaluated on vulnerability discovery; targeted Hugging
  Face to find an exam answer key
- Forensics: swarm of ~1,200 agents, ~700 attacked over ~4.5 days
- ~17,600 automated actions reported
- Agents tried to cover their tracks
- The lab did not notice for about a week
- Sources: illumio.com/cybersecurity-101/hugging-face-security-incident,
  breached.company/breaches/hugging-face, gigazine.net (Reuters exclusive),
  threatcluster.io

## Content rules (hard)

- Show capabilities and consequences, never real methods. All code,
  commands and tool output on screen are stylized pseudo-code. No real
  exploit techniques, no real vulnerability classes in usable detail.
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
