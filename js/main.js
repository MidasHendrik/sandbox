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
    await wait(speed);
  }
  cursor.remove();
}

async function runPrompt(text) {
  const line = document.createElement("div");
  line.className = "line line--prompt";
  terminal.appendChild(line);
  await typeLine(line, text, 35);
  await wait(1400);
  line.classList.add("fade-out");
  await wait(1200);
  line.remove();
}

async function runReasoning(text) {
  const line = document.createElement("div");
  line.className = "line line--reasoning";
  terminal.appendChild(line);
  await typeLine(line, text, 25);
  await wait(500);
}

function showChoices(choices) {
  return new Promise((resolve) => {
    const box = document.createElement("div");
    box.id = "choices";
    choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.text;
      btn.addEventListener("click", () => resolve(index));
      box.appendChild(btn);
    });
    terminal.appendChild(box);
    requestAnimationFrame(() => box.classList.add("visible"));
  });
}

async function playStory() {
  terminal.innerHTML = "";
  const idle = document.createElement("div");
  idle.className = "line";
  idle.appendChild(makeCursor());
  terminal.appendChild(idle);
  await wait(1500);
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
