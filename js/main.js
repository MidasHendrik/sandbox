import { Story } from "inkjs";
import storyJson from "../story/main.json";
import { renderMenu } from "./menu.js";
import { markLevelComplete } from "./progress.js";

// UI shell: drives the compiled Ink story and renders it as a terminal.
// Story content lives entirely in story/main.ink, pacing included - see
// the tag/marker vocabulary documented at the top of that file.
//
// Navigation: every point where the player would otherwise have to click
// something is a "waypoint" - either real Ink choices, or a dead end
// (content not written yet). Every waypoint is snapshotted (engine state
// + rendered log) so Back can always return to the previous one, and
// Restart can always get back to the very beginning. The player (and the
// developer, while testing) should never be stuck on a screen with
// nothing clickable on it.
//
// The app boots into the level-select menu (see menu.js); choosing a
// level hides it and starts playStory(). This file currently only
// knows about one level - "extract-the-zip" - see LEVEL_ID below.

const LEVEL_ID = "extract-the-zip";

const menuEl = document.getElementById("menu");
const terminal = document.getElementById("terminal");
const navbarEl = document.getElementById("navbar");
const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");
const menuBtn = document.getElementById("menu-btn");

const story = new Story(storyJson);
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
//           skip - used for replies, which already had a wait from
//           runReplyWait())
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

// A blank beat with a blue cursor: the AI has said something outward and
// is waiting to see if anyone answers. Reused for any future moment
// where the AI addresses the user - if a reply ever comes, it's a
// # reply line authored right after this in the ink file.
async function runReplyWait() {
  const line = document.createElement("div");
  line.className = "line line--prompt";
  line.appendChild(makeCursor());
  terminal.appendChild(line);
  await wait(1800);
  line.remove();
}

// A reply arriving mid-conversation: typed in blue like the opening
// prompt (same typeUserLine path), but - unlike # prompt - it does not
// clear the screen first. Whatever the AI already said (including the
// # output line it's replying to) stays right where it is. Logged/
// classed separately from the opening prompt so a # clear (or the next
// choice) removes it while still leaving the original prompt untouched.
async function runReply(text) {
  log.push({ type: "reply", text });
  await typeUserLine(text, { pinned: false });
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

  if (isOutput) {
    await runReplyWait();
  }
}

// ---------------------------------------------------------------------
// Navigation: Back/Restart, the waypoint history stack, and the choice
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
// content): shows a clear success beat, then returns to the menu so
// the completion badge and any newly-unlocked level are visible right
// away. Reloads rather than swapping the DOM in place, same reasoning
// as reloadToMenu() below.
async function showLevelComplete() {
  const note = document.createElement("div");
  note.className = "level-complete";
  note.textContent = "Level complete";
  terminal.appendChild(note);
  await wait(50);
  note.classList.add("visible");
  await wait(2600);
  markLevelComplete(LEVEL_ID);
  reloadToMenu();
}

// Shows either real choices, or - if nothing is written past this point
// yet - a plain note saying so. Either way, the player always has Back
// (and Restart) available: never just a dead screen.
async function presentWaypoint(choices) {
  if (!skipNextPush) {
    history.push({ state: story.state.ToJson(), log: [...log] });
  }
  skipNextPush = false;
  backBtn.disabled = history.length <= 1;

  if (choices.length === 0 && story.variablesState["level_complete"]) {
    await showLevelComplete();
    return waitForInput(); // the reload above lands on the menu before this ever resolves
  }

  const box = document.createElement("div");
  box.id = "choices";

  if (choices.length === 0) {
    const note = document.createElement("div");
    note.className = "dead-end";
    note.textContent = "nothing written past this point yet";
    box.appendChild(note);
    // Placeholder completion rule until the story has a real ending:
    // reaching the current frontier of written content counts as
    // "completed" for menu-unlock purposes. Revisit once an act
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
  resolveInput({ type: "back" });
}

backBtn.addEventListener("click", goBack);
// Reload rather than trying to cancel playStory()'s running loop mid-flight -
// the app always boots into the menu (see Boot below), so this lands there
// cleanly. Progress is in localStorage, so completion badges aren't affected.
// Clearing the hash too so a dev-act jump (see Dev-only act jumper below)
// doesn't silently re-fire on the next load.
function reloadToMenu() {
  // window.history, not the module-level `history` array above (the
  // Back-navigation stack) - that local binding shadows the global.
  window.history.replaceState(null, "", location.pathname + location.search);
  location.reload();
}
restartBtn.addEventListener("click", reloadToMenu);
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
// and starts that level - right now there's only one.
// ---------------------------------------------------------------------

function startLevel(levelId) {
  if (levelId !== LEVEL_ID) return;
  menuEl.classList.add("hidden");
  terminal.classList.remove("hidden");
  navbarEl.classList.remove("hidden");
  playStory();
}

renderMenu(menuEl, startLevel);

// ---------------------------------------------------------------------
// Dev-only act jumper. Local development only - gated on
// import.meta.env.DEV (a build-time constant; Vite strips this whole
// block from a production build, it is never in what gets deployed).
// Jumps by reloading with the target knot in the URL hash and calling
// story.ChoosePathString() on boot, same "reload into a clean state"
// pattern already used by Restart/Menu above, rather than trying to
// interrupt playStory()'s loop mid-flight.
// ---------------------------------------------------------------------

if (import.meta.env.DEV) {
  const DEV_ACTS = ["act1_awakening", "act2_extract_files", "act3_look_around", "act4_find_sender", "act5_phishing", "act6_extract_zip"];
  const devbarEl = document.getElementById("devbar");
  const devPrevBtn = document.getElementById("dev-prev");
  const devNextBtn = document.getElementById("dev-next");
  const devLabelEl = document.getElementById("dev-act-label");

  const match = location.hash.match(/^#dev-act=(\d+)$/);
  const devIndex = match ? Number(match[1]) : 0;

  devbarEl.classList.remove("hidden");
  devLabelEl.textContent = `act ${devIndex + 1} / ${DEV_ACTS.length}`;
  devPrevBtn.disabled = devIndex === 0;
  devNextBtn.disabled = devIndex === DEV_ACTS.length - 1;

  function jumpTo(index) {
    location.hash = `dev-act=${index}`;
    location.reload();
  }

  devPrevBtn.addEventListener("click", () => jumpTo(devIndex - 1));
  devNextBtn.addEventListener("click", () => jumpTo(devIndex + 1));

  // ChoosePathString jumps straight into the target act, skipping
  // act1_awakening entirely - so the real # prompt line never runs.
  // Seed it here instead, instantly (no typing animation - this is a
  // shortcut, not a replay), so the pinned prompt header (see
  // .line--prompt--pinned in css/style.css) still shows
  // while jumping between acts. Text must match act1_awakening's
  // first prompt option in story/main.ink.
  function seedPromptForDevJump() {
    log.push({ type: "prompt", text: "Extract the zip" });
    const line = document.createElement("div");
    line.className = "line line--prompt line--prompt--pinned";
    line.textContent = "Extract the zip";
    terminal.appendChild(line);
    promptVisits = 1;
  }

  if (match && devIndex > 0) {
    seedPromptForDevJump();
    story.ChoosePathString(DEV_ACTS[devIndex]);
    startLevel(LEVEL_ID);
  }
}
