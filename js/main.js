import { Story } from "inkjs";
import { renderMenu } from "./menu.js";
import { markLevelComplete, saveLevelState, loadLevelState } from "./progress.js";
import { LEVELS } from "./levels.js";

// UI shell: drives the compiled Ink story and renders it as a terminal.
// Story content lives entirely in story/main.ink, pacing included - see
// the tag/marker vocabulary documented at the top of that file.
//
// Navigation: every point where the player would otherwise have to click
// something is a "waypoint" - either real Ink choices, or a dead end
// (content not written yet). Every waypoint is snapshotted (engine state
// + rendered log) so Back can always return to the previous one, and
// Menu can always get back to level select. The same snapshot is also
// written to localStorage (see progress.js's levelStates), so leaving
// via Menu - which fully reloads the page, wiping this file's in-memory
// state - and picking the level again resumes at that waypoint instead
// of restarting from Act 1. The player (and the developer, while
// testing) should never be stuck on a screen with nothing clickable on
// it, or lose their place by leaving.
//
// The app boots into the level-select menu (see menu.js); choosing a
// level hides it and starts playStory(). Each LEVELS entry (see
// levels.js) names its own compiled story/<file>.json; loadStory()
// below picks the right one at runtime, so this file itself knows
// nothing chapter-specific.

// Vite glob import: a lazy map of every compiled story JSON, keyed by
// path, so the right one can be picked at runtime by levels.js's
// per-level storyFile instead of a static per-chapter import.
const STORY_MODULES = import.meta.glob("../story/*.json");

let LEVEL_ID = null;
let story = null;
let storyVersion = "";

// A short fingerprint of the compiled story, stored with every saved
// position so loadStory() can tell whether the story changed since.
function hashString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return String(hash);
}

async function loadStory(levelId, { resume = true } = {}) {
  const level = LEVELS.find((l) => l.id === levelId);
  const module = await STORY_MODULES[`../story/${level.storyFile}`]();
  story = new Story(module.default);
  LEVEL_ID = levelId;
  storyVersion = hashString(JSON.stringify(module.default));

  // Resume at the last waypoint reached, if there is one (see
  // progress.js's levelStates) - skipped entirely for a level with no
  // saved state, which just plays from the top as normal. Also skipped
  // for resume: false, used by the dev act jumper below, which always
  // wants a fresh story to jump from - it seeds its own fake prompt
  // line and would otherwise double up with a restored one. And skipped
  // when the story was edited since the position was saved: a saved
  // position points into the old text, and loading it into the new
  // story lands somewhere in the middle of it.
  const saved = resume ? loadLevelState(levelId) : null;
  if (saved && saved.version === storyVersion) {
    story.state.LoadJson(saved.state);
    log = saved.log;
    renderLogInstant();
  }
}

const menuEl = document.getElementById("menu");
const terminal = document.getElementById("terminal");
const navbarEl = document.getElementById("navbar");
const backBtn = document.getElementById("back-btn");
const menuBtn = document.getElementById("menu-btn");

let log = [];
const history = [];
let pendingResolve = null;
let skipNextPush = false;

// ---------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeCursor() {
  const span = document.createElement("span");
  span.className = "cursor";
  return span;
}

// Pacing vocabulary authored in story/main.ink via tags and inline
// [markers] - see the comment at the top of that file.
const SPEED_MS = { fast: 51, medium: 168, slow: 510 };
const PAUSE_MS = { short: 1000, medium: 2400, long: 4800 };

function stripMarkers(text) {
  return text.replace(/\[(?:fast|medium|slow|link|\/link)\]/g, "");
}

// ---------------------------------------------------------------------
// Typing primitives - shared character-by-character rendering used by
// the tag-dispatched renderers below
// ---------------------------------------------------------------------

// Types text out, honoring inline [fast]/[medium]/[slow] markers that
// switch speed mid-line, and [link]...[/link] which underlines the text
// between the two (e.g. the clickable CTA in a phishing email) - none of
// these markers are themselves rendered. Splitting on a capturing group
// keeps the marker names in the result array.
async function typeLine(container, text, speed) {
  const cursor = makeCursor();
  container.appendChild(cursor);
  let currentSpeed = speed;
  let linkSpan = null;
  for (const part of text.split(/\[(fast|medium|slow|link|\/link)\]/)) {
    if (part in SPEED_MS) {
      currentSpeed = SPEED_MS[part];
      continue;
    }
    if (part === "link") {
      linkSpan = document.createElement("span");
      linkSpan.className = "reasoning-link";
      cursor.before(linkSpan);
      continue;
    }
    if (part === "/link") {
      linkSpan = null;
      continue;
    }
    for (const ch of part) {
      if (linkSpan) {
        linkSpan.appendChild(document.createTextNode(ch));
      } else {
        cursor.before(document.createTextNode(ch));
      }
      const jitter = currentSpeed * (Math.random() * 0.5 - 0.25);
      await wait(Math.max(6, currentSpeed + jitter));
    }
  }
  cursor.remove();
}

// A repeating ellipsis pulse - dots build . .. ... then snap back to
// nothing and build again - to feel like actual waiting/searching
// happening in place, not just a static "...". No cursor during this:
// it's not being typed, it's the system working. No pauses either, it
// just cycles. The final cycle's dots are left showing.
async function runDotsCycle(container, cycles) {
  const dotSpeed = SPEED_MS.slow;
  for (let cycle = 0; cycle < cycles; cycle++) {
    for (let i = 0; i < 3; i++) {
      container.appendChild(document.createTextNode("."));
      await wait(dotSpeed);
    }
    const isLast = cycle === cycles - 1;
    if (!isLast) {
      for (let i = 0; i < 3; i++) {
        container.lastChild.remove();
      }
    }
  }
}

// A human typing: imperfect, with a typo caught and corrected, unlike
// the AI's flawless generation below it. Stays pinned at the top of the
// screen for the rest of the scene, so the player never loses track of
// what they were asked to do.
async function typeHumanLine(container, text, typoAt, typoChars) {
  const cursor = makeCursor();
  container.appendChild(cursor);

  async function typeChar(ch) {
    cursor.before(document.createTextNode(ch));
    const jitter = Math.random() * 50 - 25;
    await wait(Math.max(35, 75 + jitter));
  }

  for (const ch of text.slice(0, typoAt)) {
    await typeChar(ch);
  }

  if (typoChars) {
    await wait(220);
    for (const ch of typoChars) {
      await typeChar(ch);
    }
    await wait(380);
    for (let i = 0; i < typoChars.length; i++) {
      cursor.previousSibling.remove();
      await wait(120);
    }
    await wait(180);
  }

  for (const ch of text.slice(typoAt)) {
    await typeChar(ch);
  }

  cursor.remove();
}

// ---------------------------------------------------------------------
// Line renderers - one per Ink tag (# prompt, # reply, # clear, and
// # reasoning/# output via runReasoning), dispatched from playStory()
// at the bottom of this file
// ---------------------------------------------------------------------

// Removes everything except the original prompt: reasoning, output and
// any reply. Shared by a # clear scene break and by advancing on a real
// choice - the only difference between the two is the idle pause after.
function clearSceneContent() {
  terminal.querySelectorAll(".line--reasoning, .line--output, .line--reply").forEach((el) => el.remove());
  log = log.filter((entry) => entry.type === "prompt");
}

// promptVisits tracks how many times # prompt has run. Resets are
// currently retracted (see the top of story/main.ink), so in practice
// this only ever fires once per page load, but the "later visit" branch
// (shorter idle, no typo) is kept dormant for whenever resets come back.
let promptVisits = 0;

// One shared "terminal input" animation for every blue typed line -
// the chapter's opening prompt and any reply later on. Both go
// through this exact same path (idle cursor, then typeHumanLine, then
// a settle beat) so there is no second, slightly-different
// implementation to drift out of sync and visibly change size
// mid-animation. Chapter 2+ reuse this as-is; nothing chapter-specific
// belongs in here.
//   idleMs: how long a blank cursor shows before typing starts (0 to
//           skip - a reply uses it for its blue waiting cursor, shown
//           on the new cleared screen)
//   typo: simulate the one-time typo-and-correct (only ever the very
//         first prompt of the whole game)
//   pinned: this is the chapter's one permanently-visible prompt (see
//           .line--prompt--pinned in css/style.css), not a reply
//   clearFirst: wipe #terminal before starting (the opening prompt
//               replaces the menu; a reply does not)
async function typeUserLine(text, { idleMs = 0, typo = false, pinned = false, clearFirst = false } = {}) {
  if (clearFirst) {
    terminal.innerHTML = "";
  }

  if (idleMs > 0) {
    const idle = document.createElement("div");
    idle.className = "line line--prompt";
    idle.appendChild(makeCursor());
    terminal.appendChild(idle);
    await wait(idleMs);
    idle.remove();
  }

  const line = document.createElement("div");
  line.className = pinned ? "line line--prompt line--prompt--pinned" : "line line--prompt line--reply";
  terminal.appendChild(line);
  if (typo) {
    await typeHumanLine(line, text, 8, "re");
  } else {
    await typeHumanLine(line, text, text.length, null);
  }
  await wait(800);
  return line;
}

// A scene break: clears reasoning, output and any reply - everything
// the AI (or a reply to it) has said since the last break - then pauses
// on a blank cursor. The original prompt stays exactly where it is; it
// never clears, it's the one constant across the whole scene.
async function runSceneBreak() {
  clearSceneContent();

  const idle = document.createElement("div");
  idle.className = "line";
  idle.appendChild(makeCursor());
  terminal.appendChild(idle);
  await wait(1400);
  idle.remove();
}

async function runPrompt(text) {
  const isFirstEver = promptVisits === 0;
  promptVisits += 1;

  log = [];
  log.push({ type: "prompt", text });
  await typeUserLine(text, {
    idleMs: isFirstEver ? 2200 : 1000,
    typo: isFirstEver,
    pinned: true,
    clearFirst: true,
  });
}

// A reply arriving mid-conversation: typed in blue like the opening
// prompt (same typeUserLine path). Blue user text always arrives on a
// new screen - never prompt, AI dialogue, then another blue line all at
// once - so whatever the AI already said (including the # output line
// it's replying to) is cleared first, leaving only the pinned prompt and
// the reply. The AI's next lines then type in right under the reply.
// Logged/classed separately from the opening prompt so a # clear (or the
// next choice) removes it while still leaving the original prompt
// untouched.
// The blue waiting cursor shows only here, on the new cleared screen
// (idleMs), never under the AI's dialogue on the old one. An # output
// with no reply after it gets no waiting cursor at all: nobody is going
// to answer, so a blinking cursor would promise something that never
// comes.
async function runReply(text) {
  clearSceneContent();
  log.push({ type: "reply", text });
  await typeUserLine(text, { idleMs: 1800, pinned: false });
}

// Generated, not received: reasoning types out at an authored pace - see
// the pacing vocabulary documented at the top of story/main.ink.
async function runReasoning(text, tags) {
  const speedName = tags.find((t) => t in SPEED_MS) || "medium";
  const dotsTag = tags.find((t) => t.startsWith("dots:"));
  const dotsCycles = dotsTag ? Number(dotsTag.slice(5)) : 0;
  const isFade = tags.includes("fade");
  const isOutput = tags.includes("output");

  const line = document.createElement("div");
  line.className = isOutput ? "line line--output" : "line line--reasoning";
  terminal.appendChild(line);

  await typeLine(line, text, SPEED_MS[speedName]);
  if (dotsCycles) {
    await runDotsCycle(line, dotsCycles);
  }

  if (isFade) {
    await wait(500);
    line.classList.add("fade-out");
    await wait(800);
    line.remove();
  } else {
    log.push({
      type: isOutput ? "output" : "reasoning",
      text: stripMarkers(text) + (dotsCycles ? "..." : ""),
    });
  }

  await wait(640);
}

// ---------------------------------------------------------------------
// Navigation: Back/Menu, the waypoint history stack, and the choice
// UI - see the module comment at the top of this file
// ---------------------------------------------------------------------

// Used after Back: redraws the log instantly, no typing or fades, since
// this is review/navigation rather than the live performance.
function renderLogInstant() {
  terminal.innerHTML = "";
  for (const entry of log) {
    const line = document.createElement("div");
    if (entry.type === "reply") {
      line.className = "line line--prompt line--reply";
    } else if (entry.type === "prompt") {
      line.className = "line line--prompt line--prompt--pinned";
    } else {
      line.className = `line line--${entry.type}`;
    }
    line.textContent = entry.text;
    terminal.appendChild(line);
  }
}

function waitForInput() {
  return new Promise((resolve) => {
    pendingResolve = resolve;
  });
}

function resolveInput(result) {
  if (pendingResolve) {
    const resolve = pendingResolve;
    pendingResolve = null;
    resolve(result);
  }
}

// The real ending (story/main.ink sets `level_complete` right before
// -> END, once a level is actually finished, not just run out of
// content): shows a clear success beat and the current level's own
// epilogue (see epilogue in levels.js - paragraphs plus one or more
// source links for the real incident(s) the chapter is grounded in;
// docs/concept.md's Content rules section is where that sourcing rule
// lives). Marks the level complete right away rather than gating it
// behind a click. The pinned opening prompt has done its job by now, so
// on this screen it is swapped for a "< back to menu" link at the top
// (the bottom navbar's menu/back buttons, see Navigation above, stay
// as they are). Going Back redraws the log, which brings the prompt
// back.
async function showLevelComplete({ markComplete = true } = {}) {
  // The last lines of the final act stay on screen for a beat, as the
  // end of that act, and then the epilogue starts on a clean screen as
  // its own act. (The dev "epilogue" act has nothing to clear and so
  // does not wait.)
  if (terminal.querySelector(".line--reasoning, .line--output, .line--reply")) {
    await wait(2500);
    clearSceneContent();
  }
  if (import.meta.env.DEV) syncDevBarToEpilogue();
  const backToMenu = document.createElement("button");
  backToMenu.className = "epilogue-back";
  backToMenu.textContent = "< back to menu";
  backToMenu.addEventListener("click", reloadToMenu);
  const pinnedPrompt = terminal.querySelector(".line--prompt--pinned");
  if (pinnedPrompt) pinnedPrompt.replaceWith(backToMenu);
  else terminal.prepend(backToMenu);

  const note = document.createElement("div");
  note.className = "level-complete";
  note.textContent = "Task completed";
  terminal.appendChild(note);
  await wait(50);
  note.classList.add("visible");
  await wait(1400);

  const epilogue = LEVELS.find((l) => l.id === LEVEL_ID)?.epilogue;
  if (epilogue) {
    const fact = document.createElement("div");
    fact.className = "level-complete-fact";
    const makeLink = ({ url, text }) => {
      const link = document.createElement("a");
      link.className = "level-complete-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = text;
      return link;
    };
    if (epilogue.entries) {
      // Each finding followed directly by its own source link.
      epilogue.entries.forEach(({ text, link, links }) => {
        const entry = document.createElement("div");
        entry.className = "level-complete-entry";
        const p = document.createElement("p");
        p.textContent = text;
        entry.appendChild(p);
        (links ?? [link]).forEach((l) => entry.appendChild(makeLink(l)));
        fact.appendChild(entry);
      });
    } else {
      epilogue.paragraphs.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        fact.appendChild(p);
      });
      epilogue.links.forEach((link) => fact.appendChild(makeLink(link)));
    }
    terminal.appendChild(fact);
    await wait(50);
    fact.classList.add("visible");
  }

  // The dev jumper's "epilogue" act (see below) previews this screen
  // without finishing the level, so it must not touch saved progress.
  if (markComplete) markLevelComplete(LEVEL_ID);
}

// Shows either real choices, or - if nothing is written past this point
// yet - a plain note saying so. Either way, the player always has Back
// (and Menu) available: never just a dead screen.
async function presentWaypoint(choices) {
  if (!skipNextPush) {
    const snapshot = { state: story.state.ToJson(), log: [...log], version: storyVersion };
    history.push(snapshot);
    saveLevelState(LEVEL_ID, snapshot);
  }
  skipNextPush = false;
  backBtn.disabled = history.length <= 1;

  if (choices.length === 0 && story.variablesState["level_complete"]) {
    await showLevelComplete();
    // Parks playStory() here for good - there's nothing left to choose.
    // The bottom navbar's Back/Menu buttons stay live and work
    // independently of this pending promise (Back resolves it and
    // re-enters the story at the last real waypoint; Menu just
    // reloads the page).
    return waitForInput();
  }

  const box = document.createElement("div");
  box.id = "choices";
  // More than two options always show as two columns ([][] over [][]),
  // never as one long row.
  if (choices.length > 2) box.classList.add("choices--grid");

  if (choices.length === 0) {
    const note = document.createElement("div");
    note.className = "dead-end";
    note.textContent = "nothing written past this point yet";
    box.appendChild(note);
    // Placeholder completion rule until the story has a real ending:
    // reaching the current frontier of written content counts as
    // "completed" for the menu's Completed badge. Revisit once an act
    // actually concludes rather than just running out of content.
    markLevelComplete(LEVEL_ID);
  } else {
    choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.text;
      btn.addEventListener("click", () => resolveInput({ type: "choice", index }));
      box.appendChild(btn);
    });
  }

  terminal.appendChild(box);
  await wait(50);
  box.classList.add("visible");

  return waitForInput();
}

function goBack() {
  if (history.length <= 1) return;
  history.pop();
  const target = history[history.length - 1];
  story.state.LoadJson(target.state);
  log = [...target.log];
  renderLogInstant();
  skipNextPush = true;
  saveLevelState(LEVEL_ID, target); // keep the resume point in sync with Back
  if (import.meta.env.DEV) setupDevBar();
  resolveInput({ type: "back" });
}

backBtn.addEventListener("click", goBack);
// Reload rather than trying to cancel playStory()'s running loop mid-flight -
// the app always boots into the menu (see Boot below), so this lands there
// cleanly. Progress is in localStorage, so completion badges aren't affected.
// Dropping the query string too (not just the path), not only the hash -
// otherwise a dev ?level=&act= jump (see Dev-only entry points below)
// would silently re-fire on the next load instead of landing on the menu.
function reloadToMenu() {
  // window.history, not the module-level `history` array above (the
  // Back-navigation stack) - that local binding shadows the global.
  window.history.replaceState(null, "", location.pathname);
  location.reload();
}
menuBtn.addEventListener("click", reloadToMenu);

// ---------------------------------------------------------------------
// Main loop: walks the compiled Ink story, dispatching each line by
// tag and presenting a waypoint whenever a choice (or a dead end) is
// reached
// ---------------------------------------------------------------------

async function playStory() {
  while (true) {
    while (story.canContinue) {
      const text = story.Continue().trim();
      if (!text) continue;
      const tags = story.currentTags || [];
      const pauseTag = tags.find((t) => t.startsWith("pause:"));
      if (pauseTag) {
        await wait(PAUSE_MS[pauseTag.slice(6)] ?? 0);
      }
      if (tags.includes("clear")) {
        await runSceneBreak();
      }
      if (tags.includes("prompt")) {
        await runPrompt(text);
      } else if (tags.includes("reply")) {
        await runReply(text);
      } else {
        await runReasoning(text, tags);
      }
    }

    const result = await presentWaypoint(story.currentChoices);
    document.getElementById("choices")?.remove();

    if (result.type === "back") {
      continue;
    }

    // Every action button clears the reasoning so far and starts the AI
    // writing fresh from the top - the prompt (blue) is the one constant,
    // it's never retyped or removed here.
    clearSceneContent();

    story.ChooseChoiceIndex(result.index);
  }
}

// ---------------------------------------------------------------------
// Boot: the menu is the app's home screen. Choosing a level hides it
// and starts that level.
// ---------------------------------------------------------------------

// Dev-only act jumper elements/state - see setupDevBar() below. Looked
// up once here; setupDevBar() only touches these when
// import.meta.env.DEV, so they're unused (but harmless) in production.
const devbarEl = document.getElementById("devbar");
const devPrevBtn = document.getElementById("dev-prev");
const devNextBtn = document.getElementById("dev-next");
const devLabelEl = document.getElementById("dev-act-label");

// Scoped to whichever level is currently playing (LEVEL_ID) - reads
// that level's own devActs list from levels.js, never another
// chapter's. Hidden on the menu (see showTerminalAndPlay, reloadToMenu)
// and whenever the current level has no devActs of its own yet.
function setupDevBar() {
  if (!import.meta.env.DEV) return;

  const level = LEVELS.find((l) => l.id === LEVEL_ID);
  const devActs = level?.devActs;
  if (!devActs || devActs.length === 0) {
    devbarEl.classList.add("hidden");
    return;
  }

  const params = new URLSearchParams(location.search);
  const requested = Number(params.get("act")) || 0;
  const devIndex = Math.min(Math.max(requested, 0), devActs.length - 1);

  devbarEl.classList.remove("hidden");
  devLabelEl.textContent = `act ${devIndex + 1} / ${devActs.length}`;
  devPrevBtn.disabled = devIndex === 0;
  devNextBtn.disabled = devIndex === devActs.length - 1;

  devPrevBtn.onclick = () => jumpToAct(devIndex - 1);
  devNextBtn.onclick = () => jumpToAct(devIndex + 1);
}

// The epilogue is the jumper's last act (see levels.js), so when a level
// plays on into it, the bar moves to that last act too, instead of
// still saying the story's final act.
function syncDevBarToEpilogue() {
  const devActs = LEVELS.find((l) => l.id === LEVEL_ID)?.devActs;
  if (!devActs || devActs[devActs.length - 1] !== "epilogue") return;
  devbarEl.classList.remove("hidden");
  devLabelEl.textContent = `act ${devActs.length} / ${devActs.length}`;
  devPrevBtn.disabled = devActs.length < 2;
  devNextBtn.disabled = true;
  devPrevBtn.onclick = () => jumpToAct(devActs.length - 2);
}

// Reloads with ?level=<current>&act=<index> set, so the act jumper
// below picks it up on the next boot - same "reload into a clean
// state" pattern already used by Menu, rather than trying to
// interrupt playStory()'s loop mid-flight.
function jumpToAct(index) {
  const params = new URLSearchParams(location.search);
  params.set("level", LEVEL_ID);
  params.set("act", String(index));
  location.search = params.toString();
}

// ChoosePathString jumps straight into the target act, skipping the
// level's own opening knot entirely - so its real # prompt line never
// runs. Seed it here instead, instantly (no typing animation - this is
// a shortcut, not a replay), so the pinned prompt header (see
// .line--prompt--pinned in css/style.css) still shows while jumping
// between acts. text must match that level's own opening # prompt line
// exactly (see promptText in levels.js).
function seedPromptForDevJump(text) {
  log.push({ type: "prompt", text });
  const line = document.createElement("div");
  line.className = "line line--prompt line--prompt--pinned";
  line.textContent = text;
  terminal.appendChild(line);
  promptVisits = 1;
}

function showTerminal() {
  menuEl.classList.add("hidden");
  terminal.classList.remove("hidden");
  navbarEl.classList.remove("hidden");
  setupDevBar();
}

function showTerminalAndPlay() {
  showTerminal();
  playStory();
}

async function startLevel(levelId) {
  await loadStory(levelId);
  showTerminalAndPlay();
}

renderMenu(menuEl, startLevel);

// ---------------------------------------------------------------------
// Dev-only entry points. Local development only - gated on
// import.meta.env.DEV (a build-time constant; Vite strips this whole
// block from a production build, it is never in what gets deployed).
// ?level=<id> alone jumps straight into any level that has content,
// skipping the menu. Adding &act=<index> additionally jumps into that level's
// own devActs[index] (see levels.js) via the act jumper above. The
// last act of every level is "epilogue", which skips straight to that
// level's epilogue screen.
// ---------------------------------------------------------------------

if (import.meta.env.DEV) {
  const params = new URLSearchParams(location.search);
  const devLevel = LEVELS.find((l) => l.id === params.get("level") && l.hasContent);
  const devActIndex = params.has("act") ? Number(params.get("act")) : null;

  if (devLevel && devActIndex && devActIndex > 0 && devLevel.devActs?.[devActIndex]) {
    loadStory(devLevel.id, { resume: false }).then(() => {
      seedPromptForDevJump(devLevel.promptText);
      if (devLevel.devActs[devActIndex] === "epilogue") {
        // Not a knot: show the epilogue screen directly, no play.
        showTerminal();
        showLevelComplete({ markComplete: false });
        return;
      }
      story.ChoosePathString(devLevel.devActs[devActIndex]);
      showTerminalAndPlay();
    });
  } else if (devLevel) {
    startLevel(devLevel.id);
  }
}
