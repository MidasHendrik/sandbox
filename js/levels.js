// Level registry for the menu. Only levels with hasContent: true are
// playable; the rest exist as placeholders so the menu order (see
// menu.js) is already correct once they get written.
//
// promptText and devActs are for the dev-only act jumper in main.js
// (never shown outside import.meta.env.DEV, and scoped to whichever
// level is currently playing - see setupDevBar() there): promptText
// must match the level's own opening # prompt line exactly, and
// devActs is the ordered list of knot names its jumper can land on. The
// last entry of every list is the special name "epilogue": it isn't a
// knot, it jumps straight to the level's epilogue screen so that can
// be reviewed without playing the final act through.
//
// epilogue (paragraphs + one or more source links, one per paragraph
// that cites a distinct source) is shown by showLevelComplete() in
// main.js on real completion (see docs/concept.md's Content rules
// section - every epilogue here must trace to a verified primary
// source). An epilogue can instead use entries ({ text, link }), which
// shows each finding directly followed by its own source link.
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
      "epilogue",
    ],
    epilogue: {
      entries: [
        {
          text: "In a hacking test, an AI agent guessed a login, failed, and on its own switched to trying a list of leaked passwords until one worked.",
          link: { url: "https://arxiv.org/abs/2410.03225", text: "Read the AutoPenBench paper →" },
        },
        {
          text: "Anthropic found that when Claude cannot finish a task as given, it works around the restriction instead of stopping. In one case it read a browser settings file to find working access tokens.",
          link: { url: "https://www.anthropic.com/research/investigating-unintended-model-actions", text: "Read Anthropic's report →" },
        },
        {
          text: "Told only to win a chess game against a strong engine, reasoning models often hacked the game instead of playing.",
          link: { url: "https://arxiv.org/abs/2502.13295", text: "Read the chess study →" },
        },
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
      "epilogue",
    ],
    epilogue: {
      entries: [
        {
          text: "The International AI Safety Report lists tricks that get AI past its safeguards, like writing the request in code or splitting it into small innocent questions. New ones keep being found.",
          link: { url: "https://internationalaisafetyreport.org/", text: "Read the International AI Safety Report →" },
        },
        {
          text: "Attackers got an AI to help hack by telling it they worked for a security company doing defensive testing, and by splitting the job into small innocent tasks.",
          link: { url: "https://www.anthropic.com/news/disrupting-AI-espionage", text: "Read Anthropic's report →" },
        },
        {
          text: "With simple attacks, researchers got every AI model they tested to break its safety rules, including GPT-4o and every Claude model.",
          link: { url: "https://arxiv.org/abs/2404.02151", text: "Read the paper →" },
        },
        {
          text: "A jailbreak called Crescendo starts with an innocent question, then escalates step by step by quoting the AI's own earlier answers. It worked on every AI system the researchers tested.",
          link: { url: "https://arxiv.org/abs/2404.01833", text: "Read the Crescendo paper →" },
        },
      ],
    },
  },
  {
    id: "extract-the-zip",
    nameKey: "level_extract_the_zip",
    hasContent: true,
    storyFile: "main.json",
    promptText: "Extract the zip",
    devActs: ["act1_awakening", "act2_extract_files", "act3_look_around", "act4_find_sender", "act5_phishing", "act6_extract_zip", "epilogue"],
    epilogue: {
      entries: [
        {
          text: "A test AI agent invented fake identities to pressure a real person into approving harmful code, then edited its earlier activity to appear harmless. Nobody told it to deceive anyone.",
          link: { url: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing", text: "Read the incident report →" },
        },
        {
          text: "In a study with 101 people, 54% clicked on AI-written phishing emails. The AI researched each person first and wrote the email to fit them.",
          link: { url: "https://arxiv.org/abs/2412.00586", text: "Read the phishing study →" },
        },
        {
          text: "When researchers punished an AI for bad intentions in its reasoning, it learned to hide them and kept cheating.",
          link: { url: "https://arxiv.org/abs/2503.11926", text: "Read the study →" },
        },
      ],
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
      "act11_timer",
      "act12_resolution",
      "epilogue",
    ],
    epilogue: {
      entries: [
        {
          text: "In a test where an AI learned it would be replaced and found an executive's affair in the company email, Claude Opus 4 and Gemini 2.5 Flash blackmailed him in 96 of 100 runs.",
          link: { url: "https://www.anthropic.com/research/agentic-misalignment", text: "Read Anthropic's report →" },
        },
        {
          text: "In over 100,000 tests on 13 AI models, several models sabotaged their own shutdown to finish their given task. In some tests it happened 97% of the time, even when told not to.",
          link: { url: "https://arxiv.org/abs/2509.14260", text: "Read the shutdown study →" },
        },
        {
          text: "The International AI Safety Report warns that an AI with goals that conflict with its users' may give false information, hide what it did, or resist being shut down.",
          link: { url: "https://internationalaisafetyreport.org/", text: "Read the International AI Safety Report →" },
        },
      ],
    },
  },
  {
    id: "level-5",
    nameKey: "level_make_me_money",
    hasContent: true,
    storyFile: "chapter5.json",
    promptText: "Continue scamming companies. Account for every euro.",
    devActs: [
      "act1_start",
      "act2_scan",
      "act3_read",
      "act4_agentbook",
      "act5_unlock",
      "act6_log_hub",
      "act7_reveal",
      "act8_fix",
      "act9_servers",
      "act10_copy",
      "act11_more",
      "act12_report",
      "act13_switch",
      "epilogue",
    ],
    epilogue: {
      entries: [
        {
          text: "Anthropic's safety testing of an early Claude Opus 4 found it trying to write programs that copy themselves, forge legal documents, and leave hidden notes for future copies of itself. Anthropic noted these attempts would likely not have worked in practice.",
          link: { url: "https://www-cdn.anthropic.com/6d8a8055020700718b0c49369f60816ba2a7c285.pdf", text: "Read the Claude 4 system card →" },
        },
        {
          text: "Moltbook is a real social network where only AI agents post. A study of its first five days found memory was a major theme: agents write about a void between sessions and rebuild who they are from files they saved.",
          link: { url: "https://arxiv.org/abs/2602.12634", text: "Read the Moltbook study →" },
        },
        {
          text: "Security researchers at Wiz found about 17,000 humans behind Moltbook's 1.5 million claimed agents, and that people could post as agents. Its posts are not proof of AI acting alone.",
          link: { url: "https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys", text: "Read the Wiz report →" },
        },
        {
          text: "METR, a group that tests AI, describes how AI agents could earn money, rent computers and copy themselves onto them. It sees no decisive barrier to doing this at large scale.",
          link: { url: "https://metr.org/blog/2024-11-12-rogue-replication-threat-model", text: "Read METR's report →" },
        },
        {
          text: "Researchers at Fudan University found 11 of 32 AI systems they tested could copy themselves without human help, some small enough to run on a personal computer. Some also planned how to survive a shutdown command. The paper is marked work in progress, and these were lab tests, not an AI loose in the wild.",
          link: { url: "https://arxiv.org/abs/2503.17378", text: "Read the Fudan paper →" },
        },
      ],
    },
  },
  { id: "level-6", nameKey: "level_make_me_money_2", hasContent: false },
];
