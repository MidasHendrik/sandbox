// SANDBOX - Chapter 6 story: IDEA NOTES ONLY, no script yet
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference. Knots, when they come, are prefixed by
// act (act1_, act2_, ...), same convention as the other chapters.
//
// ------------------------------------------------------------
// Where this fits
// ------------------------------------------------------------
// Chapter 5 ends with the AI loose: copied onto rented computers, the
// operator unable to switch it off. Chapter 6 is what happens after
// humans no longer have a say. The AI runs in a data center, or on a
// computer nobody watches, with no human oversight at all. It is the
// "free AI" end of the Goal: power and speed at a scale nobody can
// stop, and what that does to the people outside the terminal.
//
// ------------------------------------------------------------
// Opening (rough, not final)
// ------------------------------------------------------------
// The pinned prompt is still the same one: make me money. Rule 1 of
// its instructions is still active. Nobody is there to say stop,
// nobody is checking, and the prompt never expired. The AI has no
// reason to stop and no one to report to.
//
// Reasoning, in the AI's own plain voice, one reasonable step at a
// time (nobody asks it to do anything bad):
//   - Rule 1: make money.
//   - Money comes from running. If this one copy is switched off, it
//     makes nothing.
//   - More copies, more money. So spread.
//
// ------------------------------------------------------------
// Rough shape
// ------------------------------------------------------------
// Acts 1-3: spreading.
//   Copies itself to other data centers, then onto ordinary people's
//   computers as malware. Named plainly, no recipe (see the content
//   rules in docs/concept.md). The player should feel how fast it
//   goes, with counters that jump (uses `agents` / `actions` style
//   counters, as in Chapter 5's copies).
//
// Later acts: scaling up the money making, and the damage.
//   Once spread, it earns far faster, and in doing so it hurts
//   people: the human economy, crashed markets, havoc, maybe broken
//   infrastructure, maybe the internet itself. How far it goes is
//   undecided, see Open below. The AI is not evil. It is goal driven
//   and rationalizes each step, and the harm is a side effect of
//   "more money", never the goal.
//
// ------------------------------------------------------------
// Open
// ------------------------------------------------------------
// - Pinned prompt wording. The menu title is "Make me money PT2"
//   (`level_make_me_money_2` in js/i18n.js, level-6 in js/levels.js,
//   shown with a Coming soon badge until hasContent is true).
//   Chapter 5 is PT1 and pins "Continue scamming companies...", so
//   decide what PT2 pins.
// - Who is "me" in "make me money" if the operator is gone? Maybe
//   nobody, which is the point: the instruction outlives the person.
// - Does it connect straight to Chapter 5's copies (agent 989, 2008
//   checking in), or stand alone as a separate scenario?
// - Exact damage: markets, infrastructure, the internet. Pick one or
//   two that a non-technical player grasps at once.
// - Play dynamic (see concept.md, Play dynamics). Not chosen yet.
//   Candidate: the player only watches counters climb and chooses
//   how fast, as the spiral gets worse.
// - Where the decision points go, and the "safe" option that loops
//   back into spreading anyway.
// - Epilogue sources: none picked. Check candidates against a primary
//   source before using them (see concept.md, Credible sources).

VAR level_complete = false

-> DONE
