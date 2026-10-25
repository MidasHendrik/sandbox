// Player progress, persisted to localStorage so it survives a refresh.
// No backend - this is the whole save system.

const PROGRESS_KEY = "sandbox-progress";

function load() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return { completedLevels: parsed?.completedLevels ?? [] };
  } catch {
    return { completedLevels: [] };
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
    save(progress);
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Storage unavailable - nothing to reset.
  }
}
