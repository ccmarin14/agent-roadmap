---
name: repo-context-skill
description: >
  Analyzes a software project and determines which context files it needs to work well with AI agents.
  Use this skill whenever a user asks how to prepare their repo for AI, what files to add for agents,
  how to structure their repository for LLM-assisted development, or wants to create files like
  AGENTS.md, AUDIENCE.md, llms.txt, ADR, SECURITY.md, DESIGN.md, or OpenAPI specs.
  Also trigger when a user says their AI agent "doesn't understand the project", "keeps making wrong
  assumptions", or "needs more context". This skill avoids recommending files blindly — it diagnoses
  first and recommends only what the project actually needs.
---

# Repo Context Skill

This skill helps users prepare their repository so that AI agents can work in it effectively.
The goal is NOT to add more documentation for its own sake. The goal is to make implicit context
explicit — so agents stop guessing and start working correctly.

## Core principle

Context files are investments. Each one takes time to write and maintain. Only recommend files
where the value clearly outweighs that cost for this specific project.

---

## Step 1: Gather project signals

Before recommending anything, you need to understand the project. If the user has shared
a repo structure, codebase, or description, extract signals from it. If not, ask.

**Do NOT ask all questions at once.** Start with the most diagnostic ones:

```
1. What kind of project is this? (web app, API, library, CLI, data pipeline, docs site, monorepo, other)
2. Is it open source or internal/private?
3. What's its maturity? (new / active development / stable / legacy)
```

Then, based on answers, ask follow-up questions only if needed:
- Does it have a user-facing product or UI? → signals AUDIENCE.md and DESIGN.md
- Does it expose HTTP endpoints? → signals OpenAPI
- Is AI actively used to work on it (write code, generate UI, automate tasks)? → signals AGENTS.md
- Does it have public documentation? → signals llms.txt
- Does it handle sensitive data or have security considerations? → signals SECURITY.md
- Has the team made non-obvious architectural decisions that could be revisited? → signals ADR

If the user can share the repo structure (even just `ls` or a tree output), that's faster than
asking all of these. Parse it for clues: presence of API routes, UI components, docs folders,
existing markdown files, config files, etc.

---

## Step 2: Classify the project

Map gathered signals to a project profile. See `references/signal-map.md` for the full decision
logic. Here's the high-level classification:

**Size/maturity axis:**
- `solo-small`: one person, side project or early prototype
- `solo-growing`: one person, but becoming real (users, complexity, longevity)
- `team`: multiple contributors, shared codebase
- `product`: has users, brand, design system, or public documentation

**Type axis:**
- `backend-only`: APIs, services, data pipelines — no user-facing UI
- `frontend`: web/mobile UI, design-driven
- `fullstack`: both
- `library`: imported by other projects, no UI
- `cli`: terminal tools
- `docs`: documentation sites, wikis

**Visibility axis:**
- `public`: open source or public-facing
- `private`: internal or personal

These three axes together determine which files make sense. A `solo-small / cli / private`
project needs almost nothing. A `team / fullstack / public` project may need all of them.

---

## Step 3: Recommend files

Using the classification, recommend files in three tiers:

### Tier 1 — Essential
These should be created or improved immediately. They have the most impact.

### Tier 2 — Recommended
These add real value for this project. Worth doing soon.

### Tier 3 — Optional / Later
These could help, but the cost/benefit is marginal for this project right now.
Be honest when a file is not worth it.

### Files out of scope
Always explicitly state which files from the framework are NOT needed and why.
This prevents cargo-cult documentation.

---

## Step 4: Generate the files

For each Tier 1 (and Tier 2 if the user wants them), generate a working first draft.

Do not generate placeholder lorem ipsum. Generate real, specific content based on
what you know about the project. If you don't have enough information for a section,
leave a clearly marked `<!-- TODO: [specific question] -->` comment so the user knows
exactly what to fill in.

Use the file templates in `references/file-templates.md` as starting points.
Adapt them — never copy them verbatim.

---

## Output format

Structure your response like this:

```
## Project diagnosis
[2–3 sentences summarizing the project profile and why it matters for context files]

## What this project needs

### ✅ Essential
- **FILENAME.md** — [one sentence on why, specific to this project]

### 📋 Recommended  
- **FILENAME.md** — [one sentence on why]

### 💡 Optional
- **FILENAME.md** — [one sentence on why, and when it would become worth it]

### ❌ Not needed
- **FILENAME** — [brief reason]

---

## Draft files

[Generated content for each Essential file, then Recommended if requested]
```

---

## Anti-patterns to avoid

- **Do not recommend all files to all projects.** A script someone runs locally does not need SECURITY.md, AUDIENCE.md, or llms.txt.
- **Do not generate generic boilerplate.** An AGENTS.md that says "run tests before committing" without knowing the test command is worse than no file — it wastes the agent's attention on noise.
- **Do not conflate tool-specific files with universal context.** Files like `.cursor/rules`, `CLAUDE.md`, or Copilot instructions are tool-specific and outside the scope of this skill. Focus only on tool-agnostic context files that any agent can use.
- **Do not recommend ADRs where there are no decisions to record.** New projects without architectural choices yet don't need ADR infrastructure.
- **Do not create maintenance burden without proportional value.** Every file you recommend will need to be kept up to date.
