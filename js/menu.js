import { LEVELS } from "./levels.js";
import { t, getLanguage, setLanguage, supportedLanguages } from "./i18n.js";
import { isLevelComplete } from "./progress.js";

// Renders the level-select menu into `container`. Chronological unlock:
// a level is playable only if it has content AND the one before it is
// complete. Levels without content yet always show as "Coming soon",
// disabled, regardless of unlock state - there's nothing to unlock into.
export function renderMenu(container, onStartLevel) {
  container.innerHTML = "";

  const title = document.createElement("h1");
  title.className = "menu-title";
  title.textContent = t("title");
  container.appendChild(title);

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

  const subtitle = document.createElement("div");
  subtitle.className = "menu-subtitle";
  subtitle.textContent = t("subtitle");
  container.appendChild(subtitle);

  const list = document.createElement("div");
  list.className = "level-list";

  let prevComplete = true; // nothing needs to precede the first level
  LEVELS.forEach((level, index) => {
    const complete = level.hasContent && isLevelComplete(level.id);
    const unlocked = level.hasContent && prevComplete;

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
}
