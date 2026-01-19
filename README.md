# Unified Documentation Architecture (UDA)

A simple framework for building documentation using three content types and strict routing rules.

## Quick Start

1. **Copy `starter-kit/` to your project**
2. **Read the routing matrix** (5 minutes)
3. **Use the templates** for your content
4. **Add metadata** to each page (YAML frontmatter)

Done. That's it.

## The Three Content Types

| Type | For | Example |
|---|---|---|
| **Task** | Step-by-step instructions | "How to deploy an application" |
| **Concept** | Explanatory information | "What is a Deployment?" |
| **Reference** | Structured lookup | "Deployment API fields" |

## The Routing Rule

- **"How do I...?"** → Task
- **"What is...?"** → Concept  
- **"What are the exact fields?"** → Reference

That's the whole system. One intent per page. No mixing.

## Every Page Needs This

```yaml
---
title: Your title
description: One sentence summary
tags: ["tag1", "tag2"]
owner: @your-github-handle
status: current
last_verified: 2026-01-19
review_cycle: quarterly
type: task
---
```

See `starter-kit/governance/metadata-schema.yaml` for details.

## Folder Structure

```
docs/
  20-Tasks/
    Task - [action].md
  30-Concepts/
    Concept - [topic].md
  40-Reference/
    Reference - [api].md
```

## Templates

Copy from `starter-kit/templates/`:

- `Template - Task.md` — Use this for procedures
- `Template - Concept.md` — Use this for explanations
- `Template - Reference.md` — Use this for API/fields

## CI/CD Quality Checks

Copy `.github/workflows/quality.yml` to your project.

Automatically validates:
- Markdown formatting
- Spell checking
- Metadata required fields
- Links work
- No `draft` pages in releases

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Governance

See [GOVERNANCE.md](GOVERNANCE.md) for roles and decisions.

## Learn More

- **Routing discipline:** `starter-kit/governance/routing-matrix.md`
- **Metadata requirements:** `starter-kit/governance/metadata-schema.yaml`
- **Full doctrine:** `UDA - Template/DOCUMENTATION_DOCTRINE.md`

---

**Use UDA because:**
- ✅ Clear structure (no more "where does this go?")
- ✅ Mandatory metadata (ownership, freshness)
- ✅ Automated validation (catches problems early)
- ✅ Easy for users (one content type per question)
- ✅ Scales (same rules work for 10 pages or 1000)
