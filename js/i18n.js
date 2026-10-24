// UI-chrome translation. Scope: the menu screen only - level content
// (story/main.ink) is English-only for now and isn't touched by this.
// English is the language actively developed; Dutch strings are kept
// complete and correct, but won't get new keys as fast as English does
// until Dutch becomes a real target.

const STRINGS = {
  en: {
    title: "Just do it",
    subtitle: "Levels",
    comingSoon: "Coming soon",
    completeBadge: "Complete",
    language: "Language",
    level_extract_the_zip: "Extract the .zip file",
  },
  nl: {
    title: "Just do it",
    subtitle: "Levels",
    comingSoon: "Binnenkort beschikbaar",
    completeBadge: "Voltooid",
    language: "Taal",
    level_extract_the_zip: "Pak het .zip-bestand uit",
  },
};

const LANG_KEY = "sandbox-lang";
const SUPPORTED = Object.keys(STRINGS);

export function getLanguage() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    return SUPPORTED.includes(stored) ? stored : "en";
  } catch {
    return "en";
  }
}

export function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // No persistence available - the picker still works for this
    // session, it just won't be remembered next visit.
  }
}

export function t(key) {
  const lang = getLanguage();
  return STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
}

export function supportedLanguages() {
  return SUPPORTED;
}
