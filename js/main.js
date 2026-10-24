import { Story } from "inkjs";
import storyJson from "../story/main.json";

// UI shell: drives the compiled Ink story and renders it as a terminal.
// Story content lives entirely in story/main.ink - this file only knows
// about two tags: "prompt" (the tester's input, fades after a beat) and
// everything else, treated as the AI's reasoning (typed, stays on screen).
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

async function typeLine(container, text, speed) {
  const cursor = makeCursor();
  container.appendChild(cursor);
  for (const ch of text) {
    cursor.before(document.createTextNode(ch));
    const jitter = Math.random() * 6 - 3;
    await wait(Math.max(6, speed + jitter));
  }
  cursor.remove();
}

// Received, not generated: the prompt appears whole, it is not typed.
// It stays pinned at the top of the screen for the rest of the scene, so
// the player never loses track of what they were asked to do.
async function runPrompt(text) {
  log.push({ type: "prompt", text });
  const line = document.createElement("div");
  line.className = "line line--prompt";
  line.textContent = text;
  terminal.appendChild(line);
  await wait(1200);
}

// Generated, not received: reasoning types out, and speeds up line by
// line as the AI's thinking gains momentum.
const REASONING_BASE_SPEED = 34;
const REASONING_SPEED_STEP = 5;
const REASONING_MIN_SPEED = 13;
let reasoningStep = 0;

async function runReasoning(text) {
  log.push({ type: "reasoning", text });
  const speed = Math.max(
    REASONING_MIN_SPEED,
    REASONING_BASE_SPEED - reasoningStep * REASONING_SPEED_STEP
  );
  reasoningStep += 1;
  const line = document.createElement("div");
  line.className = "line line--reasoning";
  terminal.appendChild(line);
  await typeLine(line, text, speed);
  await wait(380);
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
  idle.className = "line";
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
        await runReasoning(text);
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
