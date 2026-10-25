import { LEVELS } from "./levels.js";
import { t, getLanguage, setLanguage, supportedLanguages } from "./i18n.js";
import { isLevelComplete, resetProgress } from "./progress.js";

// Renders the level-select menu into `container`. Chronological unlock:
// a level is playable only if it has content AND the one before it is
// complete. Levels without content yet always show as "Coming soon",
// disabled, regardless of unlock state - there's nothing to unlock into.
// In local dev (import.meta.env.DEV, stripped from a production build
// same as the dev act jumper in main.js) the completion requirement is
// skipped, so every level with content is clickable regardless of
// progress - hasContent is still required, there's nothing to open for
// a level that has none.
// Hides the EN/NL picker for now - level content is English-only
// anyway until a chapter is actually translated (see Language in
// docs/concept.md), so the picker has nothing real to switch yet. The
// rest of i18n.js is untouched; flip this back to show it again.
const SHOW_LANGUAGE_PICKER = false;

export function renderMenu(container, onStartLevel) {
  container.innerHTML = "";

  const title = document.createElement("h1");
  title.className = "menu-title";
  title.textContent = t("title");
  container.appendChild(title);

  if (SHOW_LANGUAGE_PICKER) {
    const langPicker = document.createElement("div");
    langPicker.className = "lang-picker";
    const langLabel = document.createElement("span");
    langLabel.className = "lang-label";
    langLabel.textContent = `${t("language")}:`;
    langPicker.appendChild(langLabel);
    supportedLanguages().forEach((lang) => {
      const btn = document.createElement("button");
      btn.className = "lang-btn";
      if (lang === getLanguage()) btn.classList.add("active");
      btn.textContent = lang.toUpperCase();
      btn.addEventListener("click", () => {
        setLanguage(lang);
        renderMenu(container, onStartLevel);
      });
      langPicker.appendChild(btn);
    });
    container.appendChild(langPicker);
  }

  const subtitle = document.createElement("div");
  subtitle.className = "menu-subtitle";
  subtitle.textContent = t("subtitle");
  container.appendChild(subtitle);

  const list = document.createElement("div");
  list.className = "level-list";

  let prevComplete = true; // nothing needs to precede the first level
  LEVELS.forEach((level, index) => {
    const complete = level.hasContent && isLevelComplete(level.id);
    const unlocked = level.hasContent && (import.meta.env.DEV || prevComplete);

    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.disabled = !unlocked;

    const number = document.createElement("span");
    number.className = "level-number";
    number.textContent = String(index + 1);
    btn.appendChild(number);

    const label = document.createElement("span");
    label.className = "level-label";
    label.textContent = level.hasContent ? t(level.nameKey) : t("comingSoon");
    btn.appendChild(label);

    if (complete) {
      const badge = document.createElement("span");
      badge.className = "level-badge";
      badge.textContent = t("completeBadge");
      btn.appendChild(badge);
    }

    if (unlocked) {
      btn.addEventListener("click", () => onStartLevel(level.id));
    }

    list.appendChild(btn);
    prevComplete = complete;
  });

  container.appendChild(list);

  // Clears all completion badges and re-locks the chronological chain
  // (see progress.js) - the "restart" concept now lives here, at the
  // whole-save level, rather than as a per-level button in the navbar.
  const resetBtn = document.createElement("button");
  resetBtn.className = "nav-btn reset-btn";
  resetBtn.textContent = t("resetAllLevels");
  resetBtn.addEventListener("click", () => {
    if (!confirm(t("resetAllLevelsConfirm"))) return;
    resetProgress();
    renderMenu(container, onStartLevel);
  });
  container.appendChild(resetBtn);
}
