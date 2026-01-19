# Contributing

## How to Contribute

1. **Open an issue** describing what you want to add
2. **Fork and create a branch** 
3. **Use a template** from `starter-kit/templates/`
4. **Add required metadata** (YAML frontmatter)
5. **Submit a PR**

## Requirements

Every page must have:

```yaml
---
title: Your title
description: One sentence
tags: ["tag1", "tag2"]
owner: @your-github-handle
status: current
last_verified: 2026-01-19
review_cycle: quarterly
type: task
---
```

## Content Types

- **Task** — How-to guides (step-by-step)
- **Concept** — Explanations (what and why)
- **Reference** — Lookup (fields, API)

Pick one per page. No mixing.

## Routing

- **"How do I...?"** → Task folder
- **"What is...?"** → Concept folder
- **"What are the fields?"** → Reference folder

See `starter-kit/governance/routing-matrix.md` for details.

## Before You Submit

- [ ] Uses one of the three templates
- [ ] Has all required metadata
- [ ] Title clearly states the intent
- [ ] Routed to correct folder
- [ ] No mixing content types
- [ ] Links work
- [ ] Spell check passes

## Review

A maintainer will review and approve. That's all.

## 4. Routing Rules

Routing determines where a page lives and how it is discovered.

- One intent per directory.
- No nested conceptual pages.
- Procedures must live under `/docs/procedures`.
- References must live under `/docs/reference`.
- Templates must live under `/starter-kit/templates`.
- Governance artifacts must live under `/starter-kit/governance`.

Full rules are defined in `/starter-kit/governance/routing-rules.md`.

## 5. Style Expectations

- Keep narrative minimal.
- Use tables for structured information.
- Use headings consistently (`##` for sections, `###` for subsections).
- Avoid blended content types.
- Keep paragraphs short and scannable.
- Use active voice.
- Avoid idioms, metaphors, or conversational tone in documentation pages.

## 6. Review Requirements

All pull requests must:

- Pass CI checks (lint, spellcheck, link validation).
- Include a clear intent statement.
- Reference an issue.
- Use the PR template.
- Follow routing and metadata rules.

### Approval Rules

- Routine changes: 1 maintainer  
- Structural changes (routing, metadata schema, Starter Kit): 2 maintainers  
- Governance changes: unanimous maintainer approval  

## 7. Code of Conduct

All contributors must follow the Code of Conduct in `/CODE_OF_CONDUCT.md`.

## 8. Questions or Proposals

Open an issue using the appropriate template.  
Do not submit structural or governance changes without prior discussion.

```

