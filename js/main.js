import { Story } from "inkjs";
import storyJson from "../story/main.json";

// UI shell: drives the compiled Ink story and renders it as a terminal.
// Story content lives entirely in story/main.ink - this file only knows
// about two tags: "prompt" (the tester's input, fades after a beat) and
// everything else, treated as the AI's reasoning (typed, stays on screen).

const terminal = document.getElementById("terminal");
const story = new Story(storyJson);

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
async function runPrompt(text) {
  const line = document.createElement("div");
  line.className = "line line--prompt";
  line.textContent = text;
  terminal.appendChild(line);
  await wait(2000);
  line.classList.add("fade-out");
  await wait(1200);
  line.remove();
}

// Generated, not received: reasoning types out, and speeds up line by
// line as the AI's thinking gains momentum.
const REASONING_BASE_SPEED = 34;
const REASONING_SPEED_STEP = 5;
const REASONING_MIN_SPEED = 13;
let reasoningStep = 0;

async function runReasoning(text) {
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

async function showChoices(choices) {
  const box = document.createElement("div");
  box.id = "choices";
  choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    box.appendChild(btn);
  });
  terminal.appendChild(box);
  await wait(50);
  box.classList.add("visible");

  return new Promise((resolve) => {
    [...box.children].forEach((btn, index) => {
      btn.addEventListener("click", () => resolve(index));
    });
  });
}

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

    if (story.currentChoices.length === 0) {
      break;
    }

    const choiceIndex = await showChoices(story.currentChoices);
    document.getElementById("choices")?.remove();
    story.ChooseChoiceIndex(choiceIndex);
  }
}

playStory();
