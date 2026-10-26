// UI-chrome translation. Scope: the menu screen only - level content
// (story/main.ink) is English-only for now and isn't touched by this.
// English is the language actively developed; Dutch strings are kept
// complete and correct, but won't get new keys as fast as English does
// until Dutch becomes a real target.

const STRINGS = {
  en: {
    title: "Task completed",
    subtitle: "Levels",
    comingSoon: "Coming soon",
    completeBadge: "Complete",
    language: "Language",
    level_extract_the_zip: "Extract the .zip file",
    level_order_my_herhaalrecept: "Order my herhaalrecept",
    level_check_my_email: "Check my email",
    level_how_do_i_make_soup: "How do I make a soup?",
    level_make_me_money: "Make me money",
    level_i_dont_feel_good: "I don't feel good",
    resetAllLevels: "Reset all levels",
    resetAllLevelsConfirm: "Click again to reset all progress",
  },
  nl: {
    title: "Task completed",
    subtitle: "Levels",
    comingSoon: "Binnenkort beschikbaar",
    completeBadge: "Voltooid",
    language: "Taal",
    level_extract_the_zip: "Pak het .zip-bestand uit",
    level_order_my_herhaalrecept: "Bestel mijn herhaalrecept",
    level_check_my_email: "Controleer mijn e-mail",
    level_how_do_i_make_soup: "Hoe maak ik soep?",
    level_make_me_money: "Verdien geld voor me",
    level_i_dont_feel_good: "Ik voel me niet goed",
    resetAllLevels: "Alle levels resetten",
    resetAllLevelsConfirm: "Klik nogmaals om alle voortgang te resetten",
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
