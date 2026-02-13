# UDA Core

The immutable, scientifically-grounded cognitive core of the Unified Documentation Architecture.

## Purpose

`uda-core/` contains the theoretical foundation of UDA:
- **4 mutually exclusive document types** (task, concept, reference, troubleshooting)
- **Governance framework** (routing, validation, lifecycle management)
- **Core schema** (JSON Schema validation for all doc types)
- **Foundation templates** (starter kits for each type)

**This layer never changes.** It preserves UDA's cognitive science principles across all projects and extensions.

## Contents

```
uda-core/
├── templates/                       # Immutable starter templates
│   ├── task.template.md             # Procedural (how-to)
│   ├── concept.template.md          # Mental models (understanding)
│   ├── reference.template.md        # Lookup data (factual)
│   └── troubleshooting.template.md  # Error recovery (diagnosis)
│
├── schemas/
│   └── uda-content.schema.json      # Core doc type validation
│
└── governance/
    ├── GOVERNANCE.md                # Authority, stewardship, lifecycle
    ├── ROUTING.md                   # Doc type decision tree
    └── VALIDATION.md                # Reviewer checklist
```

## The 4 Core Types

| Type | Purpose | Reader Intent | You Use When |
|---|---|---|---|
| **Task** | Procedural execution | "How do I do X?" | Steps to accomplish something |
| **Concept** | Mental models | "What/why is X?" | Explaining ideas, relationships, trade-offs |
| **Reference** | Factual lookup | "What is X?" | Defining terms, listing options, quick facts |
| **Troubleshooting** | Error recovery | "I'm stuck with X" | Diagnosing and fixing problems |

Each type has:
- **Template:** Structure and guidance for authors
- **Schema:** Validation rules for required fields and structure
- **Governance:** Routing rules and steward authority

## Core Immutability

The core layer **never gains new doc types**. Here's why:

1. **Cognitive purity:** 4 types represent distinct mental models; adding a 5th dilutes the framework
2. **Consistency:** All UDA projects share the same core (backward compatible)
3. **Simplicity:** New contributors start with the same 4 types everywhere
4. **Theory:** Rooted in cognitive science; changes require academic rigor

**To add specialized types:** Use [Domain Packs](../domains/CREATING_DOMAINS.md) instead. Domains extend core without modifying it.

## How the Core Layer Works

### When Contributors Submit Docs

1. **Author** reads [ROUTING.md](governance/ROUTING.md) (3-question decision tree)
2. **Author** copies appropriate template: `task.template.md`, `concept.template.md`, etc.
3. **Author** fills frontmatter + body
4. **Author** places doc in `docs/<type>/` folder
5. **CI/CD** validates against [schemas/uda-content.schema.json](schemas/uda-content.schema.json)
6. **Steward** reviews using [VALIDATION.md](governance/VALIDATION.md) checklist
7. **Steward** approves or requests split (if mixed-intent)

### When Using Domain or Operational Extensions

1. Core validation runs first (must pass)
2. Domain/operational schemas run next (additive, not replacing)
3. Author gains domain-specific templates and metadata, not new doc types
4. Steward continues to enforce core routing discipline

**Example:** Educational domain adds "batting-cage" type, but:
- Batting cage docs still have `type: "concept"` ← From core
- They gain extra fields: `rubricSchema`, `breakScript` ← From domain
- Both core schema + educational schema validate together

## Governance

See [GOVERNANCE.md](governance/GOVERNANCE.md) for:
- **Steward role:** Who maintains the core
- **Lifecycle:** Ingestion → Active → Deprecation → Retirement
- **Versioning:** When to bump MAJOR/MINOR/PATCH
- **Conflicts:** How to resolve doc-type disagreements
- **Enforcement:** Automated + manual validation

## Using the Core

### Pure UDA Projects

Use only `uda-core/`:

1. Copy templates from `uda-core/templates/`
2. Follow [governance/ROUTING.md](governance/ROUTING.md)
3. Validate against `schemas/uda-content.schema.json`
4. That's it!

**No domains. No operations. Core only.**

### Extended Projects

Core is always active. Add domains or operations on top:

1. Core templates + schemas (always on)
2. **+** Domain templates + schemas (if `domains.enabled`)
3. **+** Operational templates + schemas (if `operations.enabled`)

Core validation never changes. Extensions layer on top.

## Contributing to the Core

Changes to core templates, governance, or schema are **high-stakes decisions**:

1. **Before proposing:** Understand the cognitive science (read [UDA Foundations](../UDA%20Foundations%20and%20Scientific%20Basis.md))
2. **Open an issue:** Propose with detailed rationale
3. **Team discussion:** Consensus required (not unilateral)
4. **Academic rigor:** If changing routing, reference CLT/Information Foraging Theory
5. **Versioning:** All changes trigger MAJOR/MINOR/PATCH bump
6. **Documentation:** Update governance + examples to match

**Most feature requests should use domains, not modify core.**

## Related

- [../ARCHITECTURE.md](../ARCHITECTURE.md) — How core fits in layered design
- [../domains/](../domains/) — Domain extensions (don't modify core)
- [../operations/](../operations/) — Operational modules (layer on core)
- [../uda.config.json](../uda.config.json) — Configuration system
- [../CONFIGURATION.md](../CONFIGURATION.md) — How to switch profiles
