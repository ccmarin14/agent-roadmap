# File Templates

These are starting points — adapt them heavily based on the actual project.
Never copy verbatim. Fill in real content or leave explicit TODOs.

---

## AGENTS.md template

```markdown
# AGENTS.md

Guidelines for AI agents working in this repository.

## Setup

<!-- TODO: What commands does an agent need to run first? -->
```bash
# Install dependencies
[package-manager install command]

# Verify setup
[verification command]
```

## Development commands

| Task | Command |
|------|---------|
| Build | `[command]` |
| Test | `[command]` |
| Lint | `[command]` |
| Type check | `[command]` |

## Repository structure

```
[key directories and what they contain]
```

## Rules

- [Specific constraint for this project]
- [Another constraint]

## Protected areas

Do NOT modify these without explicit instruction:
- `[path]` — [reason]

## Before finishing a task

- [ ] Run tests: `[command]`
- [ ] Run lint: `[command]`
- [ ] [Any other check specific to this project]

## Known issues and gotchas

- [Something that trips up agents or newcomers]
```

---

## AUDIENCE.md template

```markdown
# AUDIENCE.md

Who this project is for — and who it's not for.

## Primary audience

[Specific, behavioral description. Example: "Independent developers building side projects
who want to move fast and have high technical tolerance but low patience for marketing fluff."]

## What they already know

- [Assumption 1]
- [Assumption 2]

## What they're trying to accomplish

- [Goal 1]
- [Goal 2]

## Their common objections or fears

- [Objection 1]
- [Objection 2]

## Language and tone

**Use:** [words, register, style that resonates]  
**Avoid:** [words, register, style that alienates]

## Who this is NOT for

[Explicit exclusions. This is as important as inclusions.]

## Unsupported assumptions

<!-- Things we believe about our audience that we haven't validated yet -->
- [Assumption we're not sure about]
```

---

## llms.txt template

```markdown
# [Project name]

> [One sentence description]

[2–3 sentences of context: what it does, who uses it, what problem it solves]

## Documentation

- [Most important page](URL): [Why to read this first]
- [Second most important](URL): [Brief annotation]
- [API reference](URL): [What it covers]

## Optional (read if relevant to task)

- [Advanced topic](URL)
- [Configuration guide](URL)

## Skip

- [Changelog](URL): Historical only
- [Archive](URL): Deprecated content
```

---

## ADR template

```markdown
# ADR-[NNN]: [Short title]

**Date:** YYYY-MM-DD  
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-NNN]

## Context

[What situation or problem led to this decision? What constraints existed?]

## Decision

[What was decided? State it clearly and directly.]

## Alternatives considered

- **[Alternative A]:** [Why it was considered, why it was rejected]
- **[Alternative B]:** [Same]

## Consequences

**Positive:**
- [Benefit]

**Negative / trade-offs:**
- [Trade-off or cost]

**Risks:**
- [Something to watch for]
```

---

## SECURITY.md template

```markdown
# Security Policy

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

<!-- TODO: Choose one: -->
Send reports to: [security@yourdomain.com]
<!-- OR -->
Use GitHub's private vulnerability reporting: [link to security advisories]

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within [X] business days and aim to resolve
confirmed vulnerabilities within [Y] days.

## Supported versions

| Version | Supported |
|---------|-----------|
| [x.x.x] | ✅ |
| [x.x.x] | ❌ |

## Scope

**In scope:**
- [What you care about]

**Out of scope:**
- Denial of service attacks
- Social engineering
- [Other exclusions]
```

---

## DESIGN.md template

```markdown
# DESIGN.md

Visual and experience principles for [project name].

## Core principles

1. **[Principle]:** [What it means in practice. Be specific.]
2. **[Principle]:** [Concrete implication, not a platitude.]

## Typography

- **Headings:** [Font, weight, size scale]
- **Body:** [Font, size, line height]
- **Code:** [Monospace font]

## Color

| Role | Value | Usage |
|------|-------|-------|
| Primary | `#[hex]` | CTAs, key actions |
| Background | `#[hex]` | Page background |
| Surface | `#[hex]` | Cards, panels |
| Text | `#[hex]` | Body text |
| Danger | `#[hex]` | Errors, destructive actions |

<!-- TODO: Link to Figma or design tokens file if it exists -->

## Spacing system

[e.g., 4px base unit. Allowed multiples: 4, 8, 12, 16, 24, 32, 48, 64]

## Components

[Where to find the component library, or list key component conventions]

## Accessibility baseline

- Minimum contrast ratio: [4.5:1 for text / 3:1 for UI elements]
- All interactive elements keyboard-navigable
- [Any other non-negotiables]

## What to avoid

- [Specific visual anti-pattern for this project]
- [Another one]

## Examples

<!-- If possible, link to screens or components that represent the ideal -->
- ✅ Good: [description or link]
- ❌ Avoid: [description or link]
```
