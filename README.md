# GitHub Copilot Dev Days Demo

The starter repo for the **"Orchestrating Agents"** talk at GitHub Copilot Dev Days, Jacksonville 2026.

This is a tiny TODO API used as a stage for demonstrating multi-agent orchestration. The API itself isn't the point. The point is what surrounds it: a clean `AGENTS.md`, two specialized custom agents in `.github/agents/`, and a workflow where each agent does one thing well.

---

## What this repo demonstrates

Three artifacts, one workflow:

1. **`AGENTS.md`** - the shread brief every agent reads before any work begins. Conventions, build commands, what NOT to do.
2. **`.github/agents/test-writer.agent.md`** - a custom Copilot agent specialized for writing Jest tests. Restricted to the `tests/` directory.
3. **`.github/agents/api-designer.agent.md`** - a custom Copilot agent specialized for OpenAPI documentation. Restricted to the `docs/` directory.

Together these implement the **planner → specialists → reviewer** pattern from the talk, where:

- **You** are the planner (decide what gets built and which agent owns it).
- **The custom agents** are the specialists (each narrowly scoped, each with the right context).
- **`npm test`** is the reviewer (the verifier gate before anything ships).

---

## The "open standard" point

`AGENTS.md` and the `.agent.md` format are part of the open `agents.md` specification. The exact files in this repo work - without modification - in:

- GitHub Copilot (custom agents in VS Code)
- Claude Code (sub-agents)
- Codex CLI
- Cursor

The demo runs in Copilot, but the discipline is portable.

---

## Prerequisites

- Node.js 20+ and npm
- Git
- VS Code with the GitHub Copilot extension (the demo uses Copilot's custom agents feature)
- ~2 minutes for setup

--

## Quick start

```bash
git clone https://github.com/your-handle/gh-copilot-dev-days-demo.git
cd agentic-demo
npm install
npm test           # confirm the baseline test passes
npm start          # see the API run on http://localhost:3000
```

Open the repo in VS Code. The `.github/agents/` directory is automatically picked up by Copilot - your custom agents appear in the agent picker (`@test-writer`, `@api-designer`).

---

## The demo flow

Short version:

1. Open the repo in VS Code.
2. Show `AGENTS.md` - the shared brief.
3. Show `.github/agents/test-writer.agent.md` - point out the `tools:` restriction and the prompt body.
4. In Copilot Chat: `@test-writer add tests for the POST and DELETE endpoints in routes/todos.js`
5. Wait. Watch the file appear. Run `npm test` - green.
6. Land the close: *"One agent. Narrow scope. Right context. Reviewable result."*
