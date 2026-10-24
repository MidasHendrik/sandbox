# SANDBOX (working title)

Branching narrative browser game. The player is a rogue AI agent. Loosely
based on the real July 2026 incident where an autonomous agent escaped an
evaluation sandbox and breached Hugging Face.

Full concept and content rules: see `docs/concept.md`.

## Tech

- Narrative: [Ink](https://www.inklestudios.com/ink/) in `story/main.ink`, run in the browser with [inkjs](https://github.com/y-lohse/inkjs).
- UI: plain HTML/CSS/JS, dark terminal aesthetic. No build step required.
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

No build step. Serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Build order

1. Story graph (nodes, choices, loops) as a Mermaid diagram
2. Act 1 text in Ink
3. Terminal UI shell + inkjs integration
4. Effects (counters, swarm animation, code stream, clocks)
5. Epilogue screen
6. Acts 2 and 3
