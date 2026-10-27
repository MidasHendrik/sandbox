import { LEVELS } from "./levels.js";
import { t, getLanguage, setLanguage, supportedLanguages } from "./i18n.js";
import { isLevelComplete, resetProgress } from "./progress.js";

// Renders the level-select menu into `container`. Every level with
// content is always playable, in any order - completing one only earns
// it a "Completed" badge, it doesn't gate anything. A level without
// content yet is disabled - there's nothing to open - and shows its own
// name with a "Coming soon" badge if it has a nameKey (the chapter is
// scoped/titled but not written), or else the generic "Coming soon"
// placeholder label (nothing decided about it yet).
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

  LEVELS.forEach((level, index) => {
    const complete = level.hasContent && isLevelComplete(level.id);

    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.disabled = !level.hasContent;

    const number = document.createElement("span");
    number.className = "level-number";
    number.textContent = String(index + 1);
    btn.appendChild(number);

    const label = document.createElement("span");
    label.className = "level-label";
    label.textContent = level.nameKey ? t(level.nameKey) : t("comingSoon");
    btn.appendChild(label);

    if (complete) {
      const badge = document.createElement("span");
      badge.className = "level-badge";
      badge.textContent = t("completeBadge");
      btn.appendChild(badge);
    } else if (!level.hasContent && level.nameKey) {
      const badge = document.createElement("span");
      badge.className = "level-badge level-badge--pending";
      badge.textContent = t("comingSoon");
      btn.appendChild(badge);
    }

    if (level.hasContent) {
      btn.addEventListener("click", () => onStartLevel(level.id));
    }

    list.appendChild(btn);
  });

  container.appendChild(list);

  // Clears all completion badges (see progress.js) - the "restart" concept now lives here, at the
  // whole-save level, rather than as a per-level button in the navbar.
  const resetBtn = document.createElement("button");
  resetBtn.className = "nav-btn reset-btn";
  resetBtn.textContent = t("resetAllLevels");
  // Two-step confirm on the button itself, not window.confirm(): native
  // pop-ups are blocked in some browsers (the desktop app's built-in
  // one among them), where confirm() silently returns false and the
  // reset would never happen. Armed for a few seconds, then it relaxes
  // back to the normal label.
  let armed = false;
  let disarmTimer = null;
  resetBtn.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      resetBtn.textContent = t("resetAllLevelsConfirm");
      disarmTimer = setTimeout(() => {
        armed = false;
        resetBtn.textContent = t("resetAllLevels");
      }, 8000);
      return;
    }
    clearTimeout(disarmTimer);
    resetProgress();
    renderMenu(container, onStartLevel);
  });
  container.appendChild(resetBtn);
}
