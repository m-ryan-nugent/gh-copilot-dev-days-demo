# AGENTS.md

> The shared brief for any AI coding agent working in this repo.
> Read this file first, before any other action.

## What this project is

A minimal TODO REST API. Built as a stage for demonstrating multi-agent orchestration with custom GitHub Copilot agents.

It is intentionally small. **Do not expand its scope.**

## Tech stack

- Node.js 20+
- Express 4 for routing
- Jest + supertest for tests
- In-memory store (no database, by design)
- CommonJS modules (do not switch to ESM)

## Layout
```
src/
  index.js         # entry point - sets up Express and mounts routes
  routes/
    todos.js       # all TODO endpoints live here
  store/
    todos.js       # in-memory store (an array + helpers)
tests/
  todos.test.js    # baseline test - keep this passing
docs/
  openapi.yaml     # OpenAPI 3.0 spec (may not exist yet)
.github/
  agents/          # custom agent definitions (.agent.md files)
```

## Commands

| Task | Command |
| ---- | ------- |
| Install | `npm install` |
| Run dev server | `npm start` (serves on `http://localhost:3000`) |
| Run tests | `npm test` |

## Conventions

- **Style**: 2-space indent, single quotes, semicolons, trailing commas in multi-line literals
- **Async**: `async/await` only - no raw Promises, no callbacks
- **Errors**: throw `Error` instances with descriptive messages; set `err.status` for non-500 HTTP codes
- **Naming**: `camelCase` for variables and functions, `PascalCase` for classes, `SCREAMING_SNAKE_CASE` for module-level constants
- **Tests**: one `describe` block per route, one `it` block per behavior; use the supertest `request(app)` pattern shown in `tests/todos.test.js`
- **Imports**: CommonJS `require` / `module.exports` - do not switch to ESM

## API contract

The TODO model:

```js
{
    id: number,          // integer, server-assigned
    title: string,       // required, non-empty
    done: boolean,       // defaults to false on create
    createdAt: string    // ISO 8601 timestamp, server-assigned
}
```

Endpoints in `src/routes/todos.js`:

- `GET    /todos`      - list all todos
- `GET    /todos/:id`  - get one (404 if missing)
- `POST   /todos`      - create (400 if `title` missing or empty)
- `PATCH  /todos/:id`  - update `title` and/or `done` (404 if missing)
- `DELETE /todos/:id`  - delete (404 if missing, 204 on success)

## What NOT to do

These will break the demo. Do not:

- Add a database, ORM, or any persistence beyond the in-memory store
- Add authentication, authorization, sessions, or cookies
- Change the import style (keep CommonJS)
- Modify files outside the directory you've been told to work in
- Add CI configuration, deploy scripts, or Docker files
- Reformat unrelated files - only touch what your task requires
- Install new dependencies without an explicit need; if you must, prefer `dev` dependencies
- Edit other agents' definitions in `.github/agents/` unless the task is explicitly to modify an agent

## What good output looks like

- `npm test` passes before you finish
- New tests follow the existing supertest pattern in `tests/todos.test/js`
- New documentation matches the API contract above exactly
- Diffs are minimal and focused on the requested change
- Nothing in `.github/agents/` changes unless explicitly asked

## Why this file exists

This is the shared context every agent reads before any work begins. It's an open standard - Copilot reads it, Claude Code reads it, Codex reads it, Cursor reads it. The investment you make here is portable across every AI tool you'll ever use.