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

See [starter-kit/governance/metadata-schema.yaml](starter-kit/governance/metadata-schema.yaml) for complete schema.

## Content Types

- **Task** — How-to guides (step-by-step)
- **Concept** — Explanations (what and why)
- **Reference** — Lookup (fields, API)
- **Troubleshooting** — Problem diagnosis and resolution
- **Runbook** — Operational procedures
- **Release Notes** — Version changes
- **ADR** — Architecture Decision Records
- **Glossary** — Term definitions

Pick one per page. No mixing.

## Routing

Use the routing matrix to place your page:

- **"How do I...?"** → Task folder (20-Tasks/)
- **"What is...?"** → Concept folder (30-Concepts/)
- **"What are the fields?"** → Reference folder (40-Reference/)
- **"How do I fix...?"** → Troubleshooting folder (50-Troubleshooting/)
- **"How do I operate...?"** → Runbook folder (60-Platform-Ops/)
- **"What changed?"** → Release Notes folder (70-Release-Upgrade/)
- **"Why did we choose...?"** → ADR folder (80-ADRs/)
- **"What does this mean?"** → Glossary folder (90-Glossary/)

See [starter-kit/governance/routing-matrix.md](starter-kit/governance/routing-matrix.md) for full details.

## Before You Submit

- [ ] Uses one of the templates
- [ ] Has all required metadata
- [ ] Title clearly states the intent
- [ ] Routed to correct folder per routing matrix
- [ ] Pure content type (no mixing Task/Concept/Reference)
- [ ] Internal links follow routing rules
- [ ] No Task-to-Task links (use Concepts as bridge)
- [ ] Links work (no broken references)
- [ ] Spell check passes

## Structure & Formatting

- [ ] Uses appropriate template for page type
- [ ] Headings follow hierarchy (no skipped levels)
- [ ] Code blocks are properly formatted with language identifier
- [ ] Lists are consistently formatted (bullets or numbers as appropriate)
- [ ] No walls of text; content is scannable
- [ ] Images have alt text (accessibility)
- [ ] Tables are properly formatted and readable

## Linking & Navigation

- [ ] Links follow routing matrix rules
- [ ] No Task-to-Task links (use Concepts as bridge)
- [ ] No circular links (A → B → A)
- [ ] All links point to existing pages

See [starter-kit/governance/routing-matrix.md](starter-kit/governance/routing-matrix.md) for linking discipline.

## Review

A maintainer will review using the [review checklist](starter-kit/governance/review-checklist.md). That's all.

## Approval Rules

- **Routine changes:** 1 maintainer approval  
- **Structural changes** (routing, metadata schema, Starter Kit): 2 maintainers  
- **Governance changes:** Unanimous maintainer approval  

## Code of Conduct

All contributors must follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## 8. Questions or Proposals

Open an issue using the appropriate template.  
Do not submit structural or governance changes without prior discussion.

```

