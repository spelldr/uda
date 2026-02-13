# Unified Documentation Architecture (UDA)

A scientifically-grounded, layered documentation system designed to minimize cognitive load, maximize findability, and enforce contributor discipline at scale.

**This is a template repository.** It contains the UDA framework, templates, governance rules, examples, and optional extensions for specialized domains and operations. Use this to bootstrap documentation for your team or project—from minimal pure UDA to enterprise setups with educational content, APIs, and operational workflows.

---

## What's New: Layered Architecture

UDA now supports multiple configuration profiles, from minimal to enterprise:

| Profile | Layers | Use Case |
|---|---|---|
| **Minimal** | Core UDA only | Small projects, pure implementation |
| **Educational** | Core + educational domain | Learning platforms, courses, training |
| **API** | Core + API domain | Software APIs, SDKs, protocols |
| **Product** | Core + product domain | Product docs, features, release notes |
| **Enterprise** | Core + all domains + operations + automation | Large-scale docs with publishing, membership, finance |

**New in this version:**

- 📦 **Modular domain packs** — Add educational, API, or product doc types without cluttering core
- ⚙️ **Configuration system** — `uda.config.json` controls which layers are active
- 🔌 **Schema plugins** — Extensible validation for domain-specific metadata
- 📋 **Operational infrastructure** — Publishing gates, membership tiers, finance tracking
- 🚀 **Advanced automation** — Multi-stage CI/CD, analytics, content metrics

**See [ARCHITECTURE.md](ARCHITECTURE.md) for full design.**

---

## Quick: Choose Your Path

**Just want pure UDA (4 doc types)?**  
→ Read [CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md), use `templates/`, follow ROUTING.md. **Ignore domains/ and operations/ folders.**

**Building a learning platform or educational content?**  
→ Set `uda.config.json` profile to `educational`. See [domains/README.md](domains/README.md) for batting cages, rubrics, curriculum templates.

**Documenting an API or SDK?**  
→ Set profile to `api`. See [domains/README.md](domains/README.md) for endpoint specs, error catalogs, protocol docs.

**Product documentation with releases and features?**  
→ Set profile to `product`. See [domains/README.md](domains/README.md) for feature guides, release notes, changelogs.

**Enterprise setup with publishing gates, membership tiers, and financial tracking?**  
→ Set profile to `enterprise`. See [ARCHITECTURE.md](ARCHITECTURE.md) + [operations/README.md](operations/README.md) for full infrastructure.

**Want something custom?**  
→ See [ARCHITECTURE.md](ARCHITECTURE.md) → [domains/CREATING_DOMAINS.md](domains/CREATING_DOMAINS.md) or [operations/CREATING_MODULES.md](operations/CREATING_MODULES.md).

---

## What Is UDA?

UDA solves a core documentation problem: **mixed-intent documents are harder to search, read, and maintain**.

Instead, UDA enforces four mutually exclusive document types:

| Type | Purpose | You Use It When... |
|---|---|---|
| **Task** | Procedural execution | "How do I do X?" |
| **Concept** | Mental models & understanding | "What/why is X?" |
| **Reference** | Lookup factual data | "Look up X's definition" |
| **Troubleshooting** | Error recovery | "I'm stuck with error X" |

Each type has:
- A **template** (starter structure)
- A **JSON Schema** (enforced metadata)
- **Governance rules** (routing discipline)
- **Examples** (annotated samples)

**Result:** Readers find exactly what they need. Contributors follow predictable patterns. Docs scale without entropy.

---

## Core Philosophy

UDA is grounded in cognitive science:

1. **Cognitive Load Theory (CLT)** — Separate doc types reduce working memory load
2. **Information Foraging Theory** — Predictable structure creates "information scent"
3. **Schema Theory** — Different document types activate different mental models
4. **Minimalism** — Keep docs focused; link instead of embedding

**Read [UDA Foundations and Scientific Basis.md](./UDA%20Foundations%20and%20Scientific%20Basis.md)** for the full theory.

---

## Quick Start for Contributors

### 1. Identify Your Doc Type

Use the **[ROUTING.md](./governance/ROUTING.md)** decision tree (3 questions, < 2 min):

- Is this about *how to do something*? → **Task**
- Is this about *explaining why/what*? → **Concept**
- Is the user *stuck with an error*? → **Troubleshooting**
- Otherwise → **Reference**

### 2. Pick Your Template

Go to `templates/` folder:
- `task.template.md`
- `concept.template.md`
- `reference.template.md`
- `troubleshooting.template.md`

Copy, rename, and fill in. Then place the file in `docs/<type>/` (e.g., `docs/task/`).

**If you use Obsidian:**
1. Open this repo as a vault.
2. Settings → Templates → set template folder to `templates`.
3. Create a new file, then insert a template via Command Palette → "Templates: Insert template".
4. Convert any wikilinks (`[[file]]`) to standard markdown links before committing.

### 3. Fill Frontmatter

```yaml
---
type: "task"              # Match your doc type
title: "Deploy a Service" # Specific, searchable
version: "1.0.0"          # Repo semantic version
tags: ["deployment", "guide"]  # Topic + intent
---
```

### 4. Self-Review

Check [VALIDATION.md](./governance/VALIDATION.md) before submitting (routing, metadata, structure).

### 5. Submit PR

Automated checks validate schema + lint. Steward reviews for routing discipline.

**Full onboarding guide:** [CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md) (30 min read)

---

## Directory Structure

The repository is organized by **layers**:

```
.
├── uda-core/                          # Layer 1: Immutable cognitive core
│   ├── templates/                     # 4 core doc types
│   ├── schemas/uda-content.schema.json
│   └── governance/
│       ├── ROUTING.md
│       ├── GOVERNANCE.md
│       └── VALIDATION.md
│
├── docs/                              # Content by type
│   ├── task/                          # Task docs (procedures)
│   ├── concept/                       # Concept docs (understanding)
│   ├── reference/                     # Reference docs (lookup)
│   └── troubleshooting/               # Troubleshooting docs (error recovery)
│
├── domains/                           # Layer 2: Optional domain extensions
│   ├── template/                      # Template for building custom domains
│   ├── educational/                   # Batting cages, rubrics
│   ├── api/                           # API endpoints, parameters
│   ├── product/                       # Features, releases, changelogs
│   ├── README.md                      # Domain pack overview
│   └── CREATING_DOMAINS.md            # Guide to building domains
│
├── operations/                        # Layer 3: Optional operational infrastructure
│   ├── membership/                    # Membership tiers, access control
│   ├── publishing/                    # Publishing gates, workflows
│   ├── finance/                       # Revenue, costs, licensing
│   ├── content-management/            # Lifecycle, deprecation, SEO
│   ├── README.md                      # Operational overview
│   └── CREATING_MODULES.md            # Guide to custom modules
│
├── automation/                        # Layer 4: Optional automation & CI/CD
│   ├── pipelines/                     # GitHub Actions, publish workflows
│   └── analytics/                     # Content metrics, engagement tracking
│
├── schemas/                           # Schema plugins (validation)
│   ├── REGISTRY.md                    # Schema plugin directory
│   ├── README.md                      # Plugin architecture
│   └── plugins/                       # Domain & operational schemas
│       ├── educational-extension.schema.json
│       ├── api-extension.schema.json
│       └── ...
│
├── governance/                        # Top-level governance hub
│   ├── CONTRIBUTOR_ONBOARDING.md
│   ├── EXTENSIBILITY.md               # Multi-layer extensibility guide
│   └── ...
│
├── templates/                         # (Legacy: See uda-core/templates/)
├── examples/                          # Annotated samples
├── scripts/                           # Validation & automation
├── uda.config.json                    # Project configuration
├── ARCHITECTURE.md                    # Layered architecture design
├── CONFIGURATION.md                   # Configuration options guide
└── README.md                          # This file
```

---

## Getting Started

### For Minimal UDA (Core Only)

1. **Understand:** Read [UDA Foundations and Scientific Basis.md](./UDA%20Foundations%20and%20Scientific%20Basis.md)
2. **Navigate:** Use [ROUTING.md](./uda-core/governance/ROUTING.md) to classify your doc type
3. **Template:** Copy from `uda-core/templates/`
4. **Review:** Check [VALIDATION.md](./uda-core/governance/VALIDATION.md)
5. **Validate:** Run `npm run validate:all`
6. **Submit:** Create PR for review

### For Domain-Extended UDA (Educational, API, Product)

1. **Identify:** Which domain matches your needs?
2. **Configure:** Edit `uda.config.json` and set profile: `educational` | `api` | `product`
3. **Review:** Read [domains/README.md](./domains/README.md)
4. **Use templates:** Copy specialized templates from `domains/<domain>/templates/`
5. **Validate:** Now includes domain schema validation
6. **Coordinate:** Ensure team knows about new doc types via domain governance

### For Enterprise (All Layers)

1. **Setup:** Set profile to `enterprise` in `uda.config.json`
2. **Architecture:** Read [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Configure:** Review [CONFIGURATION.md](./CONFIGURATION.md)
4. **Domains:** Enable via [domains/README.md](./domains/README.md)
5. **Operations:** Configure via [operations/README.md](./operations/README.md)
6. **Automation:** Setup CI/CD from [automation/](./automation/) templates
7. **Implement:** Full multi-layer governance, publishing gates, membership tiers

---

## Key Documents

### For Learning

- **[CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md)** — Start here if you're new
  - Explains the philosophy
  - Walks through routing, templates, submission
  - FAQ section
  
- **[UDA Foundations and Scientific Basis.md](./UDA%20Foundations%20and%20Scientific%20Basis.md)** — Deep dive
  - Cognitive science foundations
  - Why this design works
  - Academic references

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Understand the layered design
  - Cognitive core vs. extensions
  - Configuration and profiles
  - Schema plugin system

### For Contributor Decisions

- **[uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md)** — "What type of doc should I write?"
  - Decision tree with examples
  - Edge case clarifications
  - Anti-patterns to avoid

- **[uda-core/governance/VALIDATION.md](./uda-core/governance/VALIDATION.md)** — "Is my doc ready to submit?"
  - Pre-merge checklist
  - Red flags vs. yellow flags
  - Common rejection reasons

- **[domains/README.md](./domains/README.md)** — Using domain-specific doc types
  - When to enable domains
  - Available domains (educational, api, product)
  - Creating custom domains

### For Governance & Configuration

- **[uda-core/governance/GOVERNANCE.md](./uda-core/governance/GOVERNANCE.md)** — Core UDA authority and rules
  - Steward role and authority
  - Lifecycle (ingestion → maintenance → retirement)
  - Enforcement mechanisms

- **[CONFIGURATION.md](./CONFIGURATION.md)** — Configure project layers
  - Changing profiles (minimal, educational, enterprise)
  - Schema plugin activation
  - Validation options

- **[operations/README.md](./operations/README.md)** — Operational infrastructure
  - Publishing, membership, finance, content management
  - When to enable operational modules

---

## Workflow

### As a Contributor (Pure UDA or Domain-Extended)

1. **Learn:** [CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md)
2. **Route:** Use [uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md) to pick your doc type
3. **Template:** Copy from `uda-core/templates/` (or domain template if using domains)
4. **Write:** Fill in markdown and frontmatter
5. **Review:** Check [uda-core/governance/VALIDATION.md](./uda-core/governance/VALIDATION.md)
6. **Validate:** Run `npm run validate:all` (includes domain schemas if enabled)
7. **Submit:** Create PR; automated checks run
8. **Iterate:** Respond to feedback
9. **Merge:** After approval

### As a Steward (Reviewer)

1. **Automated checks pass?** (CI/CD validates schema + lint)
2. **Routing correct?** (Use [uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md) as arbiter)
3. **Single intent?** (No mixed-purpose docs)
4. **Domain routed correctly?** (If using domains, check domain-specific routing)
5. **Metadata complete?** (type, title, version, tags, body structure)
6. **Cross-links valid?** (Point to real docs)
7. **Approve or request changes** (explain using governance docs)

---

## Examples

This repo includes **annotated examples** for each doc type:

| File | Purpose | Learn About |
|---|---|---|
| [task-example-annotated.md](./examples/task-example-annotated.md) | Setting up a database connection | Prerequisites, steps, verification |
| [concept-example-annotated.md](./examples/concept-example-annotated.md) | API authentication models | Mental models, trade-offs, relationships |
| [reference-example-annotated.md](./examples/reference-example-annotated.md) | HTTP status codes | Lookup tables, fast retrieval |
| [troubleshooting-example-annotated.md](./examples/troubleshooting-example-annotated.md) | Database connection errors | Symptoms, causes, resolutions |

Each example includes **annotations explaining why the structure works**.

---

## Technology

### Schema Validation

**JSON Schema** defines all doc types. See [schemas/uda-content.schema.json](./schemas/uda-content.schema.json).

Enforces:
- Required fields (type, title, version, body)
- Valid doc types (task | concept | reference | troubleshooting)
- Type-specific body structure
- Semantic versioning format

### Validator Script

**[schemas/validate.js](./schemas/validate.js)** — Validate docs locally before pushing.

**Setup:**
```bash
# Install dependencies (one-time setup)
npm install

# Validate a single file
node schemas/validate.js examples/task-example-annotated.md

# Output: ✅ Validation passed, or ❌ with error details
```

**In CI/CD**, the validator runs automatically on every PR via GitHub Actions. See `.github/workflows/validate-uda.yml`.

### CI/CD Workflows

**GitHub Actions** runs on every PR:

- **`validate-uda.yml`** — Schema + lint validation (blocks merge if failed)
- **`uda-ci.yml`** — Governance checks (alerts if governance docs change)

## Getting Started with UDA

### Quick Setup (Minimal)

1. **Fork or clone this repo**
2. **Copy templates** from `uda-core/templates/` (templates/ is legacy, don't use)
3. **Use ROUTING** from `uda-core/governance/ROUTING.md`
4. **Replace examples** with your own content (keep governance)
5. **Invite team** to read [CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md)

### Extended Setup (With Domains)

1. **Edit `uda.config.json`** and set profile: `educational`, `api`, `product`, or `enterprise`
2. **Enable domains** in structure configuration
3. **Read** [domains/README.md](./domains/README.md)
4. **Use domain templates** from `domains/<domain>/templates/`
5. **Validate** includes domain schema plugins automatically

### Enterprise Setup (All Layers)

1. **Edit `uda.config.json`** and set profile to `enterprise`
2. **Read** [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Configure** [CONFIGURATION.md](./CONFIGURATION.md)
4. **Enable operations** [operations/README.md](./operations/README.md)
5. **Setup CI/CD** from [automation/](./automation/) templates
6. **Implement** publishing gates, membership tiers, financial tracking

## Architecture & Extensibility

UDA is designed in **layers** with progressive enhancement:

- **Layer 1 (Cognitive Core):** Immutable 4-type system in `uda-core/` — never changes
- **Layer 2 (Domain Packs):** Optional in `domains/` — add specialized doc types (educational, API, product)
- **Layer 3 (Operations):** Optional in `operations/` — publishing, membership, finance, content management
- **Layer 4 (Automation):** Optional in `automation/` — CI/CD, analytics, content metrics

**Learn more:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Full design overview
- [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md) — Build custom domains
- [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md) — Build custom operations
- [schemas/REGISTRY.md](./schemas/REGISTRY.md) — Schema plugin registry

---

## FAQ

**Q: Can I have a Task that also explains the concept?**

A: No. Split into two docs: Task (how-to) + Concept (why/what). Link them together. This improves findability and reduces cognitive load.

**Q: What if my doc doesn't fit one of the 4 core types?**

A: Use the [uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md) decision tree. Pick the *primary* purpose. If none fit, consider using a **domain extension** (educational, API, product) or creating a **custom domain** for your specialized type.

**Q: Can I invent a new folder structure?**

A: Core UDA content stays under `docs/<type>/`. Domain content goes in `domains/<domain>/`. Operations go in `operations/<module>/`. Use tags for topic/domain classification. See [CONFIGURATION.md](./CONFIGURATION.md).

**Q: What if I disagree with the routing decision?**

A: Discuss with Steward using [uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md). If still ambiguous: "What would 80% of readers search for?" determines primary intent.

**Q: Can I layer multiple domains?**

A: Yes! Set `uda.config.json` to enable multiple domains: `["educational", "api", "product"]`. Schemas compose automatically.

**Q: Do I have to use semantic versioning?**

A: Yes. All docs share the repo version (not individual versions). See [uda-core/governance/GOVERNANCE.md](./uda-core/governance/GOVERNANCE.md) for versioning rules.

**Q: What's the difference between using pure UDA vs. a domain?**

A: Pure UDA = 4 doc types (task, concept, reference, troubleshooting). Domains add specialized types (e.g., batting-cage, endpoint-spec). Use domains when you need domain-specific validation or templates. Keep core UDA minimal for simplicity.

**Q: Can I customize operational modules?**

A: Yes! See [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md) for building custom modules (publishing, membership, finance, or your own).

---

## Questions?

- **Getting started?** → [Getting Started](#getting-started) section above
- **New to UDA?** → [CONTRIBUTOR_ONBOARDING.md](./governance/CONTRIBUTOR_ONBOARDING.md)
- **Stuck on routing?** → [uda-core/governance/ROUTING.md](./uda-core/governance/ROUTING.md)
- **Reviewing a doc?** → [uda-core/governance/VALIDATION.md](./uda-core/governance/VALIDATION.md)
- **Understanding theory?** → [UDA Foundations](./UDA%20Foundations%20and%20Scientific%20Basis.md)
- **Setting governance?** → [uda-core/governance/GOVERNANCE.md](./uda-core/governance/GOVERNANCE.md)
- **Configuring layers?** → [CONFIGURATION.md](./CONFIGURATION.md)
- **Building custom domains?** → [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md)
- **Building custom operations?** → [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md)
- **Understanding architecture?** → [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Contributing to UDA

**To contribute to the UDA framework itself:**

1. **Read:** [uda-core/governance/GOVERNANCE.md](./uda-core/governance/GOVERNANCE.md)
2. **Propose:** Open an issue with your suggestion
3. **Discuss:** Team consensus required for framework changes
4. **Implement:** Update docs, examples, schema, governance
5. **Version:** Bump semantic version in `uda.config.json`

**To use UDA for your own documentation project:** See **Getting Started** section above.

---

## License

This UDA framework is provided as-is for documentation teams. Adapt and use freely.

---

Welcome to UDA! 🚀
