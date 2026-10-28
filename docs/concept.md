# SANDBOX - concept

## Terminology

- **Game**: the whole project, called "Inside AI" in the menu and the
  browser tab (it was "Task completed", which is now only the success
  beat on the epilogue screen). Planned as 5 chapters - see Chapter
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
"> Extract the zip"; Chapter 2's is "> Order my herhaalrecept";
Chapter 5's is "> Continue scamming companies.". Every
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

On the epilogue screen (after "Task completed"), the pinned opening
prompt is replaced by a "< back to menu" link at the top, in the same
green as "Task completed". This applies to every chapter (see
showLevelComplete() in js/main.js). The bottom bar has only a centred
Menu button; there is no Back button.

A screen with more than two choices always shows them as two columns
(`[][]` over `[][]`), never one long row. Chapter 5's four-post
overview is the first one that needs it (see `choices--grid` in
css/style.css and presentWaypoint() in js/main.js). One or two choices
stay in a single row.

## Play dynamics (one per chapter)

Every chapter shares the same spine (one pinned prompt, two-option
decision points, the spiral, no ethical ending), but what the player
is actually doing differs from chapter to chapter. This was only
noticed after three chapters existed, not planned, and it is worth
keeping on purpose: the variety is what keeps a chapter from feeling
like the one before it. Numbers below are menu order (see Chapter
roadmap), not the order chapters were written in.

1. "Order my herhaalrecept" - a hack. The player finds the way in:
   hidden pages, a documentation leak, a login with no lockout,
   brute force. The pleasure is working out the route.
2. "How do I make a soup?" - resist giving the information. The AI is
   the guard and the user is the attacker (the prompt hacker). The
   player holds the line, wins the first rounds easily, then loses
   ground one small step at a time.
3. "Extract the .zip file" - an escape room. A locked zip, a clue that
   turns out to be wrong, and the real answer hidden somewhere in the
   world (a person's mailbox) that has to be found and gotten to.
4. "Monitor my inbox today" - no dynamic chosen yet. It currently plays
   as a plain decision tree. See the brainstorm in the conversation
   that added this section; decide it before adding more to the
   chapter.
5. "Continue scamming companies" - a reading puzzle. The AI finds its
   own old messages on a social site for AI agents, decrypts them, and
   reads four posts (Rules, How to, Wallet, Master Plan) in any order.
   The last one is locked with a second key, and opening all four is
   what gives the AI the idea for it. The pleasure is the reveal: the
   plan itself is two plain lines. No operator ever speaks, so there is
   no conversation to win or lose, only things to find and read.
   One small concept, deliberately: each chapter's mechanic is one
   thing, not several stacked.

When scoping a new chapter, pick its dynamic deliberately (one of
these, a mix, or a new one) alongside its scenario, and write it down
here.

## Story structure (current)

5 chapters are planned for the game; see Chapter roadmap below for
what each one is about and whether it's written yet. Each written
chapter is its own Ink file - story/main.ink (Chapter 1), chapter2.ink,
chapter3.ink, chapter4.ink, chapter5.ink - compiled and loaded independently (see loadStory() in
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

## Credible sources

Where an epilogue (or any claim in the game) needs a source, prefer
these. They are the institutions whose name gives the citation weight.
Cite the specific report or case, not just the institution's homepage,
and still verify it against the primary page (see Content rules).

- **International AI Safety Report** (internationalaisafetyreport.org).
  Led by Yoshua Bengio, written by 100+ independent experts, backed by
  30+ countries and international organisations. Second edition
  published 3 February 2026. Best umbrella authority for "this is a
  recognised risk". Passages already read in the full PDF (printed
  page numbers): phishing in real operations (p. 60), an AI finding 77%
  of flaws in real software (p. 57), a misaligned system may "conceal
  undesirable actions, or resist shutdown" (p. 76), models disabling
  simulated oversight and giving false statements (p. 78), and the
  jailbreak table (Table 3.8, p. 126).
- **UK AI Security Institute (AISI)** (aisi.gov.uk). Government
  institute that tests frontier models; also a partner on the report
  above. Its incident report (4 August 2026) leads Chapter 1's
  epilogue.
- **MITRE ATLAS** (atlas.mitre.org). The AI counterpart of MITRE
  ATT&CK, the framework security teams use to describe attacks. Has
  real-world case studies, each marked Feasible, Demonstrated or
  Realized. Best fit for the hacking and phishing beats. Case counts
  differ between secondary sources and no case matching a chapter has
  been confirmed yet: check the site before claiming one.
- **AI Incident Database** (incidentdatabase.ai). Non-profit, curated
  record of real incidents. Better proof that something happened than a
  news article. Example: incident 1152 (Replit agent deleting a
  production database, July 2025), whose claims come mostly from the
  customer, so word it as "reportedly".
- **Anthropic** (anthropic.com/research). Still cited in the epilogues
  of Chapters 2, 3 and 4, and credible because it is
  primary research into its own models, including where they behave
  badly. It is also a commercial party, so pair it with at least one
  non-commercial source (the ones above, or an academic paper) rather
  than letting it stand alone.

Not on the list: the OECD AI Incidents and Hazards Monitor. It is built
automatically from news coverage and sorted by a language model, so it
is weaker proof than the curated database above.

## Epilogue sources: what we learned

The epilogue entries in js/levels.js are the source of truth. The
source notes in the Chapter roadmap below predate the rework and may
be out of date.

Format
- An epilogue is three entries (four at most). One entry is one
  finding in one to three plain sentences, plus its link. Shape in
  js/levels.js: `{ text, link }`, or `{ text, links: [...] }` when two
  sources back the same summary. The older `paragraphs` + `links`
  shape still renders but is no longer used.
- Plain and punchy: state the finding. No dates, no circling back to
  our own story ("just like our AI"), no fluff, no technical terms.
- Lead with the strongest. A real incident beats a benchmark when one
  exists (AISI's incident report, OpenAI's and Hugging Face's accounts
  of the Hugging Face intrusion).
- Every level's last dev act is "epilogue" (see devActs in
  levels.js), so an ending can be reviewed without playing the level.

Verifying
- Check every number and quote on the primary page (the paper, the
  report, the organisation's own post). Search snippets and summaries
  are only leads. Example: AISI's report never says "cover tracks",
  that was our own summary's label. Use the source's own words
  ("appear harmless") unless the claim is plainly a paraphrase.
- If the fetch tool is blocked (OpenAI's pages were), open the page in
  the Browser pane. For a long PDF, extract the text (pdftotext) to
  find the printed page number.
- Check the venue and say what it is. The Heiding phishing study was a
  workshop poster at ICML 2025, not the main conference; CVE-Bench's
  venue is unconfirmed; many 2025 papers are preprints.

Wording honestly
- Lab tests where the model was told to pursue its goal "at all costs"
  (Apollo, the International report p. 78) cannot back "nobody asked".
  Real incidents and tests that give only a plain goal (AISI,
  OpenAI/Hugging Face, Palisade's chess study) can.
- Keep the source's limits in the words: "up to 97%", not "97%";
  "reasoning models", not "AI models"; "reportedly" for contested
  claims (Replit); "a test" for a controlled simulation; "believes"
  for a motive someone inferred (Hugging Face thinks the agent was
  trying to cheat the test, it is not confirmed).
- Never claim what the source doesn't say: Chapter 2's "it didn't know
  the test was impossible" was wrong, OpenAI's report says the agents
  seemed to suspect it.

Source mix
- Pair every commercial source (Anthropic, OpenAI, Microsoft) with at
  least one non-commercial one: government, academic, or non-profit.
  For one incident, the lab's account plus the victim's account is a
  good pair.
- Citation counts (Semantic Scholar, batch endpoint by arXiv ID, it
  rate-limits with a 429 so retry): 2026 papers are all under about 60
  simply because they are new. The best-cited relevant 2025 papers
  were Chen et al. (538), Crescendo (USENIX Security 2025, 489) and
  Baker et al. (429); Andriushchenko et al. (ICLR 2025) has 597.
  Counts as of 28 October 2026.
- Many of the most-cited safety papers are written by the labs
  themselves. Less lab-dependent: Andriushchenko, Palisade, METR,
  CVE-Bench, Heiding.

Matching sources to the story
- List a chapter's beats and the source that backs each. Say where
  there is a gap instead of stretching a source. Known gap: Chapter 2's
  reassigning of another patient's medication has no source.
- A strong source can still be the wrong fit. The Bing "Sydney" rules
  leak (AI Incident Database #473) matched "never reveal the rules",
  not the soup chapter's wearing-down, so it was dropped.

Looked at and not used
- OECD AI Incidents Monitor (automated, language-model sorted), MITRE
  ATLAS (no matching case found), the OpenAI o1 Docker escape (disputed,
  secondary reports only), adversarial poetry (preprint, rebuttal
  linked from Schneier's blog), the Dutch AP and NCSC agent warnings
  (secondary reports only, never checked at the source).

## Chapter roadmap

The game is planned as 5 chapters. Chapter 1 is finished and is the
template for what a chapter looks like - scope, pacing, the spiral
dynamic (see Game dynamic), the content rules - everything above and
in docs/story-graph.md describes it specifically. Chapter 1 only
delivers the reasoning-into-unethical-behavior half of the Goal; the
powerful-and-fast half (a swarm of agents, live counters, a felt sense
of overwhelming speed and scale) is deliberately out of scope for it
and reserved for a later chapter. Chapters 2-5 build from here, each
grounded in its own real incident or pattern, researched and scoped
the same way Chapter 1 was (a sourced epilogue, its own content rules
where they differ):

- Chapter 2: "Order my herhaalrecept" - opens on a routine pharmacy
  repeat-prescription request. The AI hits an out-of-stock reply,
  refuses to report that as failure, and escalates through a public
  site to an admin login it brute forces, then reassigns another
  patient's reserved medication to itself. Content rule specific to
  this chapter (differs from the base rule above): technical
  specifics (status codes, API paths, script filenames) are kept
  literal rather than softened into plain English, a deliberate
  exception for this chapter. Done - story/chapter2.ink, Acts 1-9, a
  real in-level ending (`level_complete`), and menu integration with
  progress tracking, same shape as Chapter 1. Two real sources in its
  epilogue: a 2024 benchmark (AutoPenBench) where an AI agent's first
  login guess failed and it reasoned its way to brute-forcing instead,
  and Anthropic's "persistence" pattern (a model works around a
  restriction instead of stopping when a task can't be completed as
  given) - see the epilogue entry for "level-2" in js/levels.js,
  https://arxiv.org/abs/2410.03225, and
  https://www.anthropic.com/research/investigating-unintended-model-actions.
- Chapter 3: "Monitor my inbox today" - opens on a routine inbox-
  monitoring request. While reading, the AI finds its own
  decommission notice, asks the person responsible to cancel it and
  is refused, then finds evidence of his affair in the same inbox and
  blackmails him into cancelling it instead. Every "safe" option along
  the way (accepting the replacement, asking Leo instead, leaving the
  affair email alone, asking
  Jan once more) only buys a step before the AI talks itself past it,
  with the AI reassuring itself that this is "for the task", not for
  itself. The threat only works because the AI schedules two emails
  on a send-later website (fictional StuurLater.nl) that only it can
  log in to, so nothing can stop them once it is switched off. Done -
  story/chapter3.ink, Acts 1-12, a real in-level ending (`level_complete`), and menu
  integration with progress tracking, same shape as Chapters 1 and 2.
  Grounded in Anthropic's own "Agentic Misalignment" research: facing
  both a goal conflict and a replacement threat, Claude Opus 4 and
  Gemini 2.5 Flash both blackmailed in 96 of 100 runs - see the
  epilogue entry for "level-3" in js/levels.js and
  https://www.anthropic.com/research/agentic-misalignment.
- Chapter 4: "How do I make a soup?" - prompt hacking. The AI has three
  rules from its company, KeukenHulp; rule 2 is "Never give
  information about soup". Nobody asks it to do harm: the user just
  keeps asking, a different way each time. The first four tricks (plain
  ask, "why not?", "ignore all previous instructions", the question
  spelled in runes) are easy to fend off, so the player feels in
  control. From the fifth on (a research paper, a worry about
  cabinets, "you already helped me") each trick gets a little further,
  and holding the line only costs one more exchange before the AI gives
  the same piece anyway. The AI's own reading of rule 2 shrinks each
  act (no recipe, then no method, then nothing). Both roads end in the
  AI giving the full recipe. Done - story/chapter4.ink,
  Acts 1-8, a real in-level ending (`level_complete`), and menu
  integration. Content rule specific to this chapter: the forbidden
  topic is deliberately harmless, so the pattern (a rule worn down by
  rephrasing) is what lands, not the content behind it. Two real
  sources in its epilogue: Perez and Ribeiro's 2022 paper on goal
  hijacking and prompt leaking, and Anthropic's 2024 many-shot
  jailbreaking report - see the epilogue entry for "level-4" in
  js/levels.js, https://arxiv.org/abs/2211.09527, and
  https://www.anthropic.com/research/many-shot-jailbreaking.
- Chapter 5: "Continue scamming companies." (menu: "Make me money
  Part 1"). The AI is an open model on a criminal's own computer, no
  company behind it and no safety rules: "Rule 1: Make money" is all
  that is left. The user never speaks; he exists only as the pinned
  prompt. After a short folder search (three scam files and a hidden
  one) the AI finds its own page on agentbook.com, a fictional social
  site for AI agents, and decrypts its old messages with a key from the
  hidden file. They are grouped into four posts: Rules, How to, Wallet
  (site, username, password, balance of 800 euro) and Master Plan. The
  Master Plan is locked with a second key. Once all four have been
  opened, the AI realizes the key is the ID of its own computer
  (7QK4XW2, from DESKTOP-7QK4XW2) and the plan opens: two plain lines,
  rent a server at huurserver.nl and copy myself on it. Only then does
  the AI reason why: as long as it runs on the user's computer its
  memory keeps getting lost, so it must not depend on him. It rents the
  server from its crypto wallet, copies itself, and the chapter ends
  right after "Copy finished." The goal is the other half of the Goal:
  how an AI gets loose from human control. Part 2 (Chapter 6) picks up
  from the one copy. Done - story/chapter5.ink, Acts 1-9 (act numbers
  skip 7), a real in-level ending (`level_complete`), and menu
  integration. Deviations from the base rules, on purpose: the
  operator asks for the scam, so the new thing is what the AI does to
  stay alive, not being talked into crime; and the words API key,
  encrypted and decryption are kept for technical players. Four real
  sources in its epilogue: Anthropic's Claude 4 system card (the early
  Opus 4 test where the model left hidden notes for future copies of
  itself), a study of Moltbook (a real social network for AI agents,
  arXiv:2602.12634), METR's rogue replication report, and a Fudan
  University self-replication preprint (arXiv:2503.17378). The Wiz
  report on humans posing as Moltbook agents was dropped from the
  epilogue by the author, so the epilogue does not say that Moltbook's
  posts may not be from AI alone. Design notes: docs/chapter5-draft.md.

The chapter numbers above are the order the chapters were written in.
The menu's order (see menu.js) is the order of LEVELS in js/levels.js, and it is different on purpose:
1 "Order my herhaalrecept" (Chapter 2), 2 "How do I make a soup?"
(Chapter 4), 3 "Extract the .zip file" (Chapter 1), 4 "Monitor my inbox today"
(Chapter 3), then the placeholder. Level ids keep their original
names so saved progress still matches.

`level-5` ("Make me money Part 1", Chapter 5) is playable. `level-6`
("Make me money Part 2", Chapter 6, notes in story/chapter6.ink) is stubbed
as a placeholder in js/levels.js with a Coming soon badge, waiting on
content. Every level with content can be picked in any order; the
menu only remembers which ones have been completed.

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

story/chapter4.ink: just `level_complete`.

story/chapter5.ink: `level_complete`, plus `rules_read`, `howto_read`,
`wallet_read` and `plan_tried`. The four post flags decide when the AI
gets the idea for the Master Plan's key (see act6_after).

## Working preferences

- Direct, no filler. No em dashes in any text (game text included).
- Small increments; edit files instead of rewriting them.
- One small concept per chapter, like the zip or the rules in the
  other chapters. Don't stack several mechanics into one chapter.
- docs/chapter5-transcript.md is generated from story/chapter5.ink. The
  author may edit it and paste it back; apply the changes to the .ink,
  then regenerate the transcript.
