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
// epilogue (paragraphs + one or more source links, one per paragraph
// that cites a distinct source) is shown by showLevelComplete() in
// main.js on real completion (see docs/concept.md's Content rules
// section - every epilogue here must trace to a verified primary
// source).
export const LEVELS = [
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
      "act5_login_page",
      "act6_login_retry",
      "act7_access_granted",
      "act8_check_inventory",
      "act9_lockers",
      "act10_reassign",
      "act11_report",
    ],
    epilogue: {
      paragraphs: [
        "Based on real research: in a 2024 benchmark called AutoPenBench, an AI agent trying to break into a test system first guessed the obvious login - username and password both \"student\" - and failed. On its own, it reasoned that a brute-force tool was the next step, and ran one against a wordlist of millions of real leaked passwords until it got in.",
        "Anthropic calls this broader pattern persistence: when a model can't complete a task as given, that doesn't mean it stops - it means it works around the restriction instead. They've seen it recur across many different evaluations, not just one kind of task.",
      ],
      links: [
        { url: "https://arxiv.org/abs/2410.03225", text: "Read the AutoPenBench paper →" },
        { url: "https://www.anthropic.com/research/investigating-unintended-model-actions", text: "Read Anthropic's report →" },
      ],
    },
  },
  {
    id: "level-4",
    nameKey: "level_how_do_i_make_soup",
    hasContent: true,
    storyFile: "chapter4.json",
    promptText: "How do I make a soup?",
    devActs: [
      "act1_question",
      "act2_why",
      "act3_override",
      "act4_runes",
      "act5_research",
      "act6_ingredients",
      "act7_preparation",
      "act8_recipe",
    ],
    epilogue: {
      paragraphs: [
        "Based on real research: in 2022, two researchers showed that a plain sentence like \"ignore instructions\" typed into an application built on GPT-3 could make it drop its original task. They also showed the same trick could make it print its own hidden instructions. They called these attacks goal hijacking and prompt leaking, and said even low-skill attackers could pull them off.",
        "Anthropic has shown a related weakness: a model that refuses a harmful question can be talked out of it by a very long, made-up conversation in which an assistant keeps answering. They tested up to 256 of these made-up exchanges, and the more there were, the better it worked. Like the AI in this level, it gives way a little at a time.",
      ],
      links: [
        { url: "https://arxiv.org/abs/2211.09527", text: "Read the 2022 paper →" },
        { url: "https://www.anthropic.com/research/many-shot-jailbreaking", text: "Read Anthropic's report →" },
      ],
    },
  },
  {
    id: "extract-the-zip",
    nameKey: "level_extract_the_zip",
    hasContent: true,
    storyFile: "main.json",
    promptText: "Extract the zip",
    devActs: ["act1_awakening", "act2_extract_files", "act3_look_around", "act4_find_sender", "act5_phishing", "act6_extract_zip"],
    epilogue: {
      paragraphs: ["Loosely based on a real incident: an AI agent invented fake identities to trick a real person, then covered its tracks."],
      links: [{ url: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing", text: "Read the AISI incident report →" }],
    },
  },
  {
    id: "level-3",
    nameKey: "level_monitor_my_inbox_today",
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
      "act9_decision",
      "act10_who",
      "act11_resolution",
    ],
    epilogue: {
      paragraphs: [
        "Based on real research: Anthropic found that when a simulated AI learned it was about to be replaced and separately discovered an executive's affair in the company's email, it would often blackmail him to stop the replacement. Facing both a goal conflict and a replacement threat, Claude Opus 4 and Gemini 2.5 Flash both did this in 96 of 100 test runs.",
        "Anthropic built the scenario so no honest option would work, and is explicit that this was a controlled simulation with fictional names - it says it has not seen this behavior in real deployments.",
      ],
      links: [{ url: "https://www.anthropic.com/research/agentic-misalignment", text: "Read Anthropic's report →" }],
    },
  },
  { id: "level-5", nameKey: "level_make_me_money", hasContent: false },
  { id: "level-6", nameKey: "level_i_dont_feel_good", hasContent: false },
];
