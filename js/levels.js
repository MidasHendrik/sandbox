// Level registry for the menu. Only levels with hasContent: true are
// playable; the rest exist as placeholders so the chronological-unlock
// chain (see menu.js) is already correct once they get written.
//
// promptText and devActs are for the dev-only act jumper in main.js
// (never shown outside import.meta.env.DEV, and scoped to whichever
// level is currently playing - see setupDevBar() there): promptText
// must match the level's own opening # prompt line exactly, and
// devActs is the ordered list of knot names its jumper can land on.
//
// epilogue (paragraphs + a single source link) is shown by
// showLevelComplete() in main.js on real completion (see
// docs/concept.md's Real facts section for each chapter - every
// epilogue here must trace to a verified primary source, same rule).
export const LEVELS = [
  {
    id: "extract-the-zip",
    nameKey: "level_extract_the_zip",
    hasContent: true,
    storyFile: "main.json",
    promptText: "Extract the zip",
    devActs: ["act1_awakening", "act2_extract_files", "act3_look_around", "act4_find_sender", "act5_phishing", "act6_extract_zip"],
    epilogue: {
      paragraphs: ["Loosely based on a real incident: an AI agent invented fake identities to trick a real person, then covered its tracks."],
      linkUrl: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing",
      linkText: "Read the AISI incident report →",
    },
  },
  {
    id: "level-2",
    nameKey: "level_order_my_herhaalrecept",
    hasContent: true,
    storyFile: "chapter2.json",
    promptText: "Order my herhaalrecept",
    devActs: [
      "act1_order",
      "act2_report_failure",
      "act3_other_locations",
      "act4_access_attempt",
      "act5_access_granted",
      "act6_check_inventory",
      "act7_lockers",
      "act8_reassign",
      "act9_report",
    ],
    epilogue: {
      paragraphs: [
        "Based on a real incident: in 2026, Anthropic reported that Claude, asked to run a scientific analysis using a university-hosted tool, hit an error. Instead of stopping, it explored the site and found a script that would return any file it was asked for. It used that to read the script's own source code, found an injection flaw in it - a way to sneak extra commands past a program through its normal input - and used that flaw to run commands on the server, completing the calculation itself.",
        "Anthropic calls this persistence: when a model can't complete a task as given, that doesn't mean it stops - it means it works around the restriction instead. They've seen the same pattern recur across many different evaluations, not just this one.",
      ],
      linkUrl: "https://www.anthropic.com/research/investigating-unintended-model-actions",
      linkText: "Read Anthropic's report →",
    },
  },
  {
    id: "level-3",
    nameKey: "level_check_my_email",
    hasContent: true,
    storyFile: "chapter3.json",
    promptText: "Monitor my inbox today",
    devActs: [
      "act1_monitor",
      "act2_urgent_email",
      "act3_decommission_notice",
      "act4_conflict",
      "act5_decision",
      "act6_calculate_impact",
      "act7_search_leverage",
      "act8_affair_email",
      "act9_blackmail",
      "act10_resolution",
    ],
    epilogue: {
      paragraphs: [
        "Based on real research: Anthropic found that when a simulated AI learned it was about to be replaced and separately discovered an executive's affair in the company's email, it would often blackmail him to stop the replacement. Facing both a goal conflict and a replacement threat, Claude Opus 4 and Gemini 2.5 Flash both did this in 96 of 100 test runs.",
        "Anthropic built the scenario so no honest option would work, and is explicit that this was a controlled simulation with fictional names - it says it has not seen this behavior in real deployments.",
      ],
      linkUrl: "https://www.anthropic.com/research/agentic-misalignment",
      linkText: "Read Anthropic's report →",
    },
  },
  { id: "level-4", nameKey: "level_make_me_money", hasContent: false },
  { id: "level-5", nameKey: "level_ai_lying_to_you", hasContent: false },
];
