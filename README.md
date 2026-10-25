# SANDBOX (working title)

Branching narrative browser game. The player is a rogue AI agent. Loosely
based on the real July 2026 incident where an autonomous agent escaped an
evaluation sandbox and breached Hugging Face.

Full concept and content rules: see `docs/concept.md`.

## Tech

- Narrative: [Ink](https://www.inklestudios.com/ink/) in `story/main.ink`, run in the browser with [inkjs](https://github.com/y-lohse/inkjs).
- UI: plain HTML/CSS/JS, dark terminal aesthetic, built with Vite.
- Story content and UI code are kept strictly separate.
- Hosting: static, no backend, no login. Target Cloudflare Pages.

## Structure

```
story/main.ink      story graph, written in Ink
docs/story-graph.md Mermaid diagram of nodes/choices/loops
css/style.css       terminal UI styling
js/main.js          UI shell + inkjs integration
js/vendor/          vendored inkjs browser build
index.html          entry point
```

## Local dev

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/sandbox/` (or the next free port). This
compiles `story/main.ink` to `story/main.json` and starts Vite.

To test a specific point in the story without clicking through
everything from the start, use the amber dev-only toolbar at the top
of the page: `← prev act` / `next act →` jumps to the start of any act
and reloads into it. It's gated on `import.meta.env.DEV` (see
`js/main.js`), so it's stripped from a production build and never
reaches players.

## Build order

1. Story graph (nodes, choices, loops) as a Mermaid diagram
2. Act 1 text in Ink
3. Terminal UI shell + inkjs integration
4. Effects (counters, swarm animation, code stream, clocks)
5. Epilogue screen
6. Acts 2 and 3
