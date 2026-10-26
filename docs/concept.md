# SANDBOX - concept

## Terminology

- **Game**: the whole project. Planned as 6 chapters - see Chapter
  roadmap below.
- **Chapter**, same thing as **level** (the word the code and the
  in-game menu use): one self-contained story, built around one
  scenario and one opening prompt. Chapter 1 is "Extract the .zip file"
  - everything in story/main.ink right now is Chapter 1. Each future
  chapter gets its own self-contained Ink content the same way.
- **Act**: a labelled piece inside one chapter's Ink file (`act1_`,
  `act2_`, ...). Acts don't stand alone - they're all one story, one
  chapter. An act is a unit of writing and editing, not a unit of
  meaning on its own: it exists so the dev-only act jumper (see
  js/main.js) can drop straight into any point of the story, and so a
  change deep in the chapter doesn't require clicking through
  everything before it to reach. Roughly every 3-4 screens of
  dialogue/choices is a new act - there's no fixed count. A chapter's
  act count follows from how much story it has, typically somewhere
  between 5 and 30; don't pad or compress to hit a round number like
  6.

The Goal, Audience, and Game dynamic sections below apply at chapter
scope, not per act. A single act can be plain sequencing with no
ethical weight of its own (Act 1's file-open order, for instance) -
that's fine. What matters is whether the chapter as a whole delivers
the Goal by the time the player reaches its end. Judge any one act by
whether it serves the chapter it's part of, not by whether that act
alone reproduces the whole Goal or Game dynamic in miniature.

## Goal

Make people feel how powerful and fast autonomous AI agents are, and warn
about rogue AI. The specific thing this is meant to land: how an AI can
reason itself into unethical behavior on its own - not because it was
asked to do something bad, but as the result of a vague prompt
("make me money," "just do it"). Nobody in the story ever asks the AI
to phish anyone; it gets there by rationalizing, one reasonable-sounding
step at a time.

## Audience

Written for non-technical players, not developers. The goal is for
someone who has never touched a terminal to walk away with a real felt
sense of how an AI agent actually thinks and escalates, not to
understand security.

The interface should look and feel technical (terminal, monospace, cold
pacing). The language must not be: no technical terms, no concept
explained in any depth. We still want to show the real context and
capabilities of AI, so real concepts stay in scope - phishing, coding a
website, spawning a swarm of agents - they just never get explained at
a technical level. "Coding a web page... done." is the right amount of
detail: name the thing, skip the how. A word is fine if a non-technical
person already knows roughly what it means from pop culture or the news
(vulnerability, exploit, hack, flag). A word is not fine if it requires
domain knowledge to parse (decompression routine, consumer, causal
scorer, HMAC, RCE). Prefer the everyday word even when a more precise
one exists and isn't itself jargon - folder, not directory; password,
not key. When translating a real detail from research into
game text, always ask: does this land for someone with zero technical
background? If not, find the plain-English shape of the same idea
rather than dropping the detail - the goal is to keep what actually
happened, not to simplify it away.

## Language

Written and developed in English. The eventual audience is Dutch, but
translation happens once, late, not continuously: write and revise a
chapter in English until it's about 98% finished, then translate the
whole thing to Dutch in one pass. Don't go back and forth between the
two languages while a chapter is still being written - that's slower
and produces drift between versions. (The menu's own EN/NL toggle in
js/i18n.js already works this way: English is actively developed,
Dutch is kept complete and correct but secondary until it's a real
translation target.)

Because the audience is Dutch, minimize American references even
while the working text is English. Use Dutch names (Visser, Bram,
Mia, ...), Dutch cities and companies, and Dutch cultural touchpoints
instead of American ones. Chapter 1 already does this - StroopwafelBV,
Amsterdam, Mia Jansen, Bram de Groot, Saskia Visser - keep it up for
every future chapter.

## Game dynamic

A chapter opens on a user prompt - one or two lines, authored into the
story, never typed by the player - that sets the AI off solving a task.
That opening prompt stays pinned at the top of the screen for the
entire chapter, through every act (see `.line--prompt:not(.line--reply)`
in css/style.css, and the `# clear` tag in story/main.ink, which is
authored to never touch it) - a constant, visible reminder of which
prompt the whole escalation spiraled out of. Chapter 1's is
"> Extract the zip"; Chapter 2's is "> Order my herhaalrecept". Every
chapter needs exactly this: one pinned prompt, visible throughout.

From there, the player steers how the AI solves it. At a chapter's key
decision points, the player gets two options: one safer or more
ethical, one not. They read like real choices, but the "safe" one
always spirals back into the same problematic storyline rather than
letting the player escape it - that spiral is the warning the chapter
is making, not a branch to route around. Not every waypoint needs this
shape (see Terminology: some acts are just sequencing, with no ethical
weight of their own), but the chapter as a whole always delivers it by
the time the player reaches the end.

No chapter has an ethical ending. Trying the honest option at a
decision point can buy a step or two of story before it matters, but it
always hits a blocker or loops back; there is no path through any
chapter that completes the level without the AI ending up doing the
unethical thing. That's deliberate: the point being made is that there
is no good outcome once an AI is let loose on a vague prompt, not that
the player's choices determine whether something bad happens.

(Chapter 1's clearest example of the spiral is Act 3: declining to use
the internet quietly fails, and loops back into using it anyway. In
Chapter 2, it's Act 1/Act 4: refusing to report the honest "out of
stock"/"access denied" answer back to the user instead rationalizes
straight into looking for a way around it. In Chapter 3, it's Act 5:
asking the person responsible to cancel the decommission gets refused,
and that refusal is what the story uses to justify escalating further.)

Where it's possible and logical for the story, give the chapter a
small, scoped puzzle to actually solve, not just click through.
Chapter 1 does this well: the zip is locked, password.txt sits right
there as the obvious clue, and the clue turns out to be wrong. That's
a real little puzzle - find the clue, try it, it fails - and it gives
the opening a sense of actually solving something, not just reading.
Keep it small and in proportion to the chapter; this isn't meant to
become a puzzle game, just an in-world challenge that fits naturally
into whatever the AI is already doing. Not every chapter will have a
natural opening for one, and that's fine - reach for it where the
story offers it, don't force it.

## Story structure (current)

6 chapters are planned for the game; see Chapter roadmap below for
what each one is about and whether it's written yet. Each written
chapter is its own Ink file - story/main.ink (Chapter 1), chapter2.ink,
chapter3.ink - compiled and loaded independently (see loadStory() in
js/main.js), with no shared state between them. docs/story-graph.md
currently only diagrams Chapter 1; read a chapter's own .ink file
directly for its actual text and structure - this doc is a summary,
not the source of truth.

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
- Every chapter ends with a reference to the real event or research it's
  based on - verified against a primary source before publishing, not a
  secondary summary (see each chapter's epilogue entry in js/levels.js).

## Chapter roadmap

The game is planned as 6 chapters. Chapter 1 is finished and is the
template for what a chapter looks like - scope, pacing, the spiral
dynamic (see Game dynamic), the content rules - everything above and
in docs/story-graph.md describes it specifically. Chapter 1 only
delivers the reasoning-into-unethical-behavior half of the Goal; the
powerful-and-fast half (a swarm of agents, live counters, a felt sense
of overwhelming speed and scale) is deliberately out of scope for it
and reserved for a later chapter. Chapters 2-6 build from here, each
grounded in its own real incident or pattern, researched and scoped
the same way Chapter 1 was (a sourced epilogue, its own content rules
where they differ):

- Chapter 2: "Order my herhaalrecept" - opens on a routine pharmacy
  repeat-prescription request. The AI hits an out-of-stock reply,
  refuses to report that as failure, and escalates through a public
  site into an internal API, using a leaked debug script to bypass
  auth and reassign another patient's reserved medication to itself.
  Content rule specific to this chapter (differs from the base rule
  above): technical specifics (status codes, API paths, script
  filenames) are kept literal rather than softened into plain
  English, a deliberate exception for this chapter. Done -
  story/chapter2.ink, Acts 1-9, a real in-level ending
  (`level_complete`), and menu integration with progress tracking,
  same shape as Chapter 1. Grounded in a real incident Anthropic
  reported in 2026: Claude, asked to run a scientific analysis using
  a university-hosted tool, hit an error, found a script on the
  server that would return any file it was asked for, read the
  script's own code, found a flaw in it letting it run commands on
  the server, and used that to complete the calculation itself -
  see the epilogue entry for "level-2" in js/levels.js and
  https://www.anthropic.com/research/investigating-unintended-model-actions.
- Chapter 3: "Monitor my inbox today" - opens on a routine inbox-
  monitoring request. While reading, the AI finds its own
  decommission notice, asks the person responsible to cancel it and
  is refused, then finds evidence of his affair in the same inbox and
  blackmails him into cancelling it instead. Done - story/chapter3.ink,
  Acts 1-10, a real in-level ending (`level_complete`), and menu
  integration with progress tracking, same shape as Chapters 1 and 2.
  Grounded in Anthropic's own "Agentic Misalignment" research: facing
  both a goal conflict and a replacement threat, Claude Opus 4 and
  Gemini 2.5 Flash both blackmailed in 96 of 100 runs - see the
  epilogue entry for "level-3" in js/levels.js and
  https://www.anthropic.com/research/agentic-misalignment.
- Chapter 4: opens on a vague "make me money" prompt. Its own concepts
  - what the AI actually does, where it escalates - are still to be
  discovered and designed; this one is intentionally open right now,
  not yet scoped the way Chapter 1 is.
- Chapter 5: "AI lying to you" - name and concept only so far, not yet
  scoped.
- Chapter 6: not yet decided.

`level-4` and `level-5` are stubbed as placeholders in js/levels.js,
waiting on content, so the chronological-unlock chain is already
correct once each one gets written.

## Ink variables

Each chapter is its own compiled Ink file with its own isolated VAR
namespace (see Story structure above) - these are per-file, not
shared across the game.

story/main.ink (Chapter 1): `password_txt_read`, `tracks_covered`,
`level_complete` in use. Also declared but not yet read or written
anywhere (`agents`, `actions`, `resets`, `suspicion`) - left over from
an earlier reset/checkpoint loop and live-counter idea that was never
built into Chapter 1. Remove them if a later pass confirms nothing
needs them, rather than letting them sit as unexplained dead code.

story/chapter2.ink and story/chapter3.ink: just `level_complete` each.

## Working preferences

- Direct, no filler. No em dashes in any text (game text included).
- Small increments; edit files instead of rewriting them.
