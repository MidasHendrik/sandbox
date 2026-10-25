// Player progress, persisted to localStorage so it survives a refresh.
// No backend - this is the whole save system.
//
// levelStates holds, per level id, the Ink engine state + rendered log
// of the latest waypoint reached - so leaving mid-story (the navbar's
// Menu button does a full page reload, see reloadToMenu() in main.js)
// and coming back resumes there instead of restarting from Act 1. It's
// cleared automatically once a level is actually completed (nothing
// left to resume into) and by resetProgress().

const PROGRESS_KEY = "sandbox-progress";

function load() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      completedLevels: parsed?.completedLevels ?? [],
      levelStates: parsed?.levelStates ?? {},
    };
  } catch {
    return { completedLevels: [], levelStates: {} };
  }
}

function save(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) - progress
    // just won't persist. Nothing else to do about it.
  }
}

export function isLevelComplete(levelId) {
  return load().completedLevels.includes(levelId);
}

export function markLevelComplete(levelId) {
  const progress = load();
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
  }
  delete progress.levelStates[levelId];
  save(progress);
}

export function resetProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Storage unavailable - nothing to reset.
  }
}

// state is { state: story.state.ToJson(), log: [...] } - see the
// waypoint snapshot shape in main.js's history stack, which this
// mirrors (same object, just also written to localStorage).
export function saveLevelState(levelId, state) {
  const progress = load();
  progress.levelStates[levelId] = state;
  save(progress);
}

export function loadLevelState(levelId) {
  return load().levelStates[levelId] ?? null;
}
