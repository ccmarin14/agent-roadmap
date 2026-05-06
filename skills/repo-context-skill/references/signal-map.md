# Signal Map — When to recommend each file

This reference guides the recommendation logic in Step 3 of the skill.
For each file, the signals that justify it and the signals that argue against it.

---

## README.md

Always assess this first. It's the baseline.

**Recommend improving if:**
- It doesn't exist
- It's outdated (references old setup steps, old tech, old team)
- It doesn't explain how to install and run the project
- It's missing contribution guidelines in a team project

**Don't create from scratch if:** It already exists and covers the basics. Just note gaps.

**Unique role:** This is for humans AND agents. It's the entry point for both.
A good README reduces the need for some other files.

---

## AGENTS.md

**Recommend (Tier 1) if:**
- AI agents are actively used to write code, generate files, or automate tasks in the repo
- The repo has non-obvious setup (specific package manager, pre-commit hooks, test commands)
- Multiple people or agents work on it and consistency matters
- There are folders or files that should never be touched by an agent

**Recommend (Tier 2) if:**
- The user plans to use AI agents soon
- The repo has any CI/CD or automation that an agent could break

**Don't recommend if:**
- It's a solo side project with no agent usage
- The README already covers all operational context

**Key content to generate:**
- Package manager and exact install command
- Build, test, lint commands
- Protected directories/files
- Commit and PR conventions
- Known failure modes (e.g., "don't run migrations without backup")

---

## AUDIENCE.md

**Recommend (Tier 1) if:**
- The project has user-facing copy, UI, or content
- AI is used to generate text, landing pages, emails, docs, or onboarding flows
- The product targets a specific, non-obvious audience

**Recommend (Tier 2) if:**
- There's a marketing site, README aimed at external users, or public docs
- Multiple contributors write copy with inconsistent tone

**Don't recommend if:**
- It's a backend service, CLI, or library with no end-user-facing content
- It's an internal tool used only by the team building it
- The audience is "everyone" (this is almost always a sign the file won't be useful)

**Key content to generate:**
- Primary audience (specific, behavioral description — not demographics)
- What they already know and what they don't
- What they're trying to accomplish
- What language/tone resonates vs. what to avoid
- Who is NOT the audience

---

## llms.txt

**Recommend (Tier 1) if:**
- The project has public-facing documentation spread across multiple pages
- It's an SDK, API, or library that developers will use with AI assistance
- The docs site has significant noise (changelogs, archived versions, generated pages)

**Recommend (Tier 2) if:**
- It's an open source project with a docs site

**Don't recommend if:**
- The project is private or internal
- There are no public docs
- The entire documentation fits in one or two files (llms.txt would just duplicate them)

**Key content to generate:**
- Project name and one-line description
- Ordered list of most important documentation pages with brief annotations
- What to skip (changelogs, deprecated content, auto-generated API refs if there's a better entry point)

---

## OpenAPI

**Recommend (Tier 1) if:**
- The project exposes HTTP endpoints consumed by other services or by humans
- AI agents are used to write API clients, tests, or integrations
- There's no existing API documentation

**Recommend (Tier 2) if:**
- There's existing API documentation but it's informal (README section, Notion, etc.)

**Don't recommend if:**
- No HTTP API (library, CLI, pure frontend)
- The API is already documented with OpenAPI

**Note:** Don't generate the full spec — that requires deep knowledge of the codebase.
Instead, generate the structure and scaffold, and note which endpoints need to be documented.
If the user has route files available, offer to read them and generate the spec from the code.

---

## ADR (Architecture Decision Records)

**Recommend (Tier 1) if:**
- The team is more than 2 people
- The project has been running for 6+ months with meaningful architectural choices
- There are tech choices that could be questioned by someone new to the project
- AI agents are used and could propose "improvements" that would reopen closed debates

**Recommend (Tier 2) if:**
- Solo project but growing fast, or planning to onboard collaborators

**Don't recommend if:**
- New project with no meaningful decisions made yet
- Solo side project unlikely to be maintained long-term
- All architectural choices are obvious or conventional

**Key content to generate:**
- ADR template (the standard is: Title, Status, Context, Decision, Consequences)
- 1–2 example ADRs based on what you know about the project
- Suggested location: `/docs/adr/` or `/adr/`

---

## SECURITY.md

**Recommend (Tier 1) if:**
- Open source project (this is expected by the ecosystem)
- Handles authentication, user data, payments, or other sensitive information
- Has a public bug bounty or responsible disclosure expectation

**Recommend (Tier 2) if:**
- Internal project with sensitive data or integrations
- Team project where security incidents should be handled privately, not via public issues

**Don't recommend if:**
- Personal script or side project with no users and no sensitive data
- Purely static site or documentation project with no attack surface

**Key content to generate:**
- How to report a vulnerability (private channel: email, security advisory, etc.)
- What is in scope and out of scope
- Supported versions (if relevant)
- Expected response time

---

## DESIGN.md

**Recommend (Tier 1) if:**
- AI is used to generate UI components, landing pages, emails, or visual content
- The project has an established design system or brand
- Inconsistency in visual output is a real problem

**Recommend (Tier 2) if:**
- There's a frontend but no current AI usage — it may come soon
- The project has design tokens or a Figma system not yet codified in code

**Don't recommend if:**
- No user-facing UI (backend, CLI, library)
- The UI is generated 100% from a design system with no custom components
- No brand guidelines exist and none are planned

**Key content to generate:**
- Visual principles (not "make it pretty" — specific things like "dense over spacious", "no decorative illustrations")
- Color and typography system or reference to where it lives
- Component conventions
- Patterns to avoid
- Accessibility baseline
- Examples of good vs. bad (even described in words)

---

## MCP configuration

**Recommend (Tier 1) if:**
- The project explicitly uses MCP-compatible agents
- There are external tools (databases, CRMs, APIs) the agent needs to access

**Recommend (Tier 2) if:**
- The project is moving toward agent automation of complex workflows

**Don't recommend if:**
- No MCP tooling in use or planned
- The project doesn't need external tool access beyond the codebase itself

**Note:** MCP config is often tool-specific in implementation. Focus on documenting
*what external tools the project needs access to* and let the user configure the
specific MCP server format for their toolchain.
