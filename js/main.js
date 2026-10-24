import { Story } from "inkjs";
import storyJson from "../story/main.json";

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

const terminal = document.getElementById("terminal");
const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");

const story = new Story(storyJson);
let log = [];
const history = [];
let pendingResolve = null;
let skipNextPush = false;

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
  return text.replace(/\[(?:fast|medium|slow)\]/g, "");
}

// Types text out, honoring inline [fast]/[medium]/[slow] markers that
// switch speed mid-line (and are not themselves rendered). Splitting on
// a capturing group keeps the marker names in the result array. Pass
// keepCursor to carry on appending after it (e.g. a dots cycle) instead
// of removing it immediately.
async function typeLine(container, text, speed, keepCursor = false) {
  const cursor = makeCursor();
  container.appendChild(cursor);
  let currentSpeed = speed;
  for (const part of text.split(/\[(fast|medium|slow)\]/)) {
    if (part in SPEED_MS) {
      currentSpeed = SPEED_MS[part];
      continue;
    }
    for (const ch of part) {
      cursor.before(document.createTextNode(ch));
      const jitter = currentSpeed * (Math.random() * 0.5 - 0.25);
      await wait(Math.max(6, currentSpeed + jitter));
    }
  }
  if (keepCursor) return cursor;
  cursor.remove();
  return null;
}

// A repeating ellipsis pulse - dots type in, hold, erase, and repeat -
// to feel like actual waiting/searching happening in place, not just a
// static "...". The final cycle's dots are left showing.
async function runDotsCycle(cursor, cycles) {
  const dotSpeed = SPEED_MS.slow;
  for (let cycle = 0; cycle < cycles; cycle++) {
    for (let i = 0; i < 3; i++) {
      cursor.before(document.createTextNode("."));
      await wait(dotSpeed);
    }
    await wait(PAUSE_MS.short);
    const isLast = cycle === cycles - 1;
    if (!isLast) {
      for (let i = 0; i < 3; i++) {
        cursor.previousSibling.remove();
        await wait(dotSpeed * 0.5);
      }
      await wait(PAUSE_MS.short / 2);
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

async function runPrompt(text) {
  log.push({ type: "prompt", text });
  const line = document.createElement("div");
  line.className = "line line--prompt";
  terminal.appendChild(line);
  await typeHumanLine(line, text, 8, "re");
  await wait(800);
}

// Generated, not received: reasoning types out at an authored pace - see
// the pacing vocabulary documented at the top of story/main.ink.
async function runReasoning(text, tags) {
  const pauseTag = tags.find((t) => t.startsWith("pause:"));
  if (pauseTag) {
    await wait(PAUSE_MS[pauseTag.slice(6)] ?? 0);
  }

  const speedName = tags.find((t) => t in SPEED_MS) || "medium";
  const dotsTag = tags.find((t) => t.startsWith("dots:"));
  const dotsCycles = dotsTag ? Number(dotsTag.slice(5)) : 0;

  log.push({
    type: "reasoning",
    text: stripMarkers(text) + (dotsCycles ? "..." : ""),
  });

  const line = document.createElement("div");
  line.className = "line line--reasoning";
  terminal.appendChild(line);

  if (dotsCycles) {
    const cursor = await typeLine(line, text, SPEED_MS[speedName], true);
    await runDotsCycle(cursor, dotsCycles);
    cursor.remove();
  } else {
    await typeLine(line, text, SPEED_MS[speedName]);
  }

  await wait(640);
}

// Used after Back: redraws the log instantly, no typing or fades, since
// this is review/navigation rather than the live performance.
function renderLogInstant() {
  terminal.innerHTML = "";
  for (const entry of log) {
    const line = document.createElement("div");
    line.className = `line line--${entry.type}`;
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

// Shows either real choices, or - if nothing is written past this point
// yet - a plain note saying so. Either way, the player always has Back
// (and Restart) available: never just a dead screen.
async function presentWaypoint(choices) {
  if (!skipNextPush) {
    history.push({ state: story.state.ToJson(), log: [...log] });
  }
  skipNextPush = false;
  backBtn.disabled = history.length <= 1;

  const box = document.createElement("div");
  box.id = "choices";

  if (choices.length === 0) {
    const note = document.createElement("div");
    note.className = "dead-end";
    note.textContent = "nothing written past this point yet";
    box.appendChild(note);
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
restartBtn.addEventListener("click", () => location.reload());

async function playStory() {
  terminal.innerHTML = "";
  const idle = document.createElement("div");
  idle.className = "line line--prompt";
  idle.appendChild(makeCursor());
  terminal.appendChild(idle);
  await wait(2200);
  idle.remove();

  while (true) {
    while (story.canContinue) {
      const text = story.Continue().trim();
      if (!text) continue;
      const tags = story.currentTags || [];
      if (tags.includes("prompt")) {
        await runPrompt(text);
      } else {
        await runReasoning(text, tags);
      }
    }

    const result = await presentWaypoint(story.currentChoices);
    document.getElementById("choices")?.remove();

    if (result.type === "back") {
      continue;
    }

    story.ChooseChoiceIndex(result.index);
  }
}

playStory();
