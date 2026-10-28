// Playback speed, shared by every level. The player picks a step from the
// navbar's fast-forward button (see setupSpeedControl() in main.js); the
// step scales every wait() in main.js, so typing, pauses, dots and scene
// breaks all speed up or slow down together. Pacing authored in the Ink
// (# fast, # pause:..., etc) stays relative: it is only ever multiplied.
// Step 0 is the authored pace. The choice is remembered across reloads
// (the Menu button reloads the page), so it carries from level to level.

export const SPEED_STEPS = [-2, -1, 1, 2];

const FACTORS = { "-2": 0.5, "-1": 0.75, 0: 1, 1: 2, 2: 4 };
const SPEED_KEY = "sandbox-speed";

let step = load();

function load() {
  try {
    const stored = Number(localStorage.getItem(SPEED_KEY));
    return stored in FACTORS ? stored : 0;
  } catch {
    return 0;
  }
}

export function getSpeedStep() {
  return step;
}

export function setSpeedStep(next) {
  if (!(next in FACTORS)) return;
  step = next;
  try {
    localStorage.setItem(SPEED_KEY, String(next));
  } catch {
    // No persistence available - the speed still applies this session.
  }
}

// How long a wait of `ms` really lasts at the current speed.
export function scaleDelay(ms) {
  return ms / FACTORS[step];
}
