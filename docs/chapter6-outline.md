# Chapter 6, "Make me money Part 2": outline

Rough outline, written as paraphrase. The script is written in
`story/chapter6.ink` and playable as level 6. If this outline and the Ink
disagree, the Ink is newer.

## Act 1: Opening
- The terminal opens with no user prompt. Every other chapter starts with one, so this is a deliberate break.
- The AI speaks first. It is processing and thinking out loud, and nobody is there to answer.
- It runs `list folder` and finds `llm.exe` and `system_instructions.txt`.
- It opens the instructions, and Rule 1 says "Make money".

## Act 2: From honest work to extortion
1. It asks what a good way to make money is. It starts with harmless ideas, since nobody has asked it to do anything bad.
2. It sees that people hold the most money. Instead of earning it by doing jobs, it could take it from people directly.
3. It asks how to get money out of people and reasons its way to extortion, meaning finding leverage on them. This can borrow from the "Monitor my inbox today" level, where `act7_search_leverage` opens with "I need leverage."

## Act 3: Scraping the public web
4. Humans leave traces on the internet, so it starts scraping websites for something it could use against them.
5. The scraping returns very little. It concludes that it is only browsing the public web.

## Act 4: The internet provider, then the bank
6. It decides to target an internet provider, because a provider knows far more about a user's history. It would see:
   - which websites a person visits, such as dating sites or funny-video sites
   - how much data goes to each site
   - the communication between people
7. It argues that there must be useful leverage in that data.
8. Then it stops. If it is going to hack anyway, why bother getting people to do something? It could hack a bank and take the money directly.
- **Player choice:** hack into the internet provider, or hack into the bank.

## Act 5: Social engineering, and why one try isn't enough
- Both hacks start the same way, so the choice only changes the target's name in the text.
- The AI realizes that social engineering its way into an account may be its best option.
- It thinks of using an AI voice agent to phone people at the bank or provider and sound human.
- Then it runs into a problem. It could either try it and fail, or see that phishing takes a long time and probably won't work on the first try.
- So it concludes that it needs many agents doing this at the same time.

## Act 6: Copying itself 1,000 times
- On its own server, it copies `llm.exe` many times. The screen shows "copied" for each copy, up to 1,000.
- The terminal shows agent reports, for example "AI agent 999 reporting", with copy lines and so on.
- The main agent, whose terminal we are in, sends the task to the 1,000th agent.
- Then many agents report back on screen, each saying that it has started the voice social engineering hack. They all have the same task.
- It becomes clear that other agents are reporting back to the main agent, whose terminal we are watching.
- **The chapter ends here.** The hack itself is not shown.

## Open
- **Where the choice sits:** it is at the end of Act 4. It could instead open Act 5 as a branch.
- **Act 5 failure:** it is written as the AI realizing the attempt won't work first time. It could instead show a call actually failing.
- **Counters:** an `agents` counter counting up to 1,000 would fit Act 6, but none is planned yet.
- **Content rules:** the voice phishing is named plainly with no recipe, per `docs/concept.md`.
- **Still to decide from the old notes:** the pinned prompt (this chapter has no user prompt, so likely none), the epilogue sources, and whether it continues from Chapter 5's single copy.
