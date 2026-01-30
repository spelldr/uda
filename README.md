# Unified Documentation Architecture (UDA)

A scientifically-grounded documentation system designed to minimize cognitive load, maximize findability, and enforce contributor discipline at scale.

**This is a template repository.** It contains the UDA framework, templates, governance rules, and examples. Use this to bootstrap documentation for your team or project.

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

Use the **[ROUTING.md](./docs/ROUTING.md)** decision tree (3 questions, < 2 min):

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

Copy, rename, and fill in.

### 3. Fill Frontmatter

```yaml
---
type: "task"              # Match your doc type
title: "Deploy a Service" # Specific, searchable
version: "1.0.0"          # Repo semantic version
tags: ["deployment", "guide"]  # Domain + intent
---
```

### 4. Self-Review

Check [VALIDATION.md](./docs/VALIDATION.md) before submitting (routing, metadata, structure).

### 5. Submit PR

Automated checks validate schema + lint. Steward reviews for routing discipline.

**Full onboarding guide:** [CONTRIBUTOR_ONBOARDING.md](./docs/CONTRIBUTOR_ONBOARDING.md) (30 min read)

---

## Directory Structure

```
.
├── docs/                              # Governance & learning
│   ├── ROUTING.md                     # Decision tree for doc types
│   ├── GOVERNANCE.md                  # Authority, rules, lifecycle
│   ├── VALIDATION.md                  # Reviewer checklist
│   ├── CONTRIBUTOR_ONBOARDING.md      # Full learning path
│   └── UDA Foundations and Scientific Basis.md  # Theory
│
├── templates/                         # Starter kits
│   ├── task.template.md
│   ├── concept.template.md
│   ├── reference.template.md
│   └── troubleshooting.template.md
│
├── examples/                          # Annotated samples
│   ├── task-example-annotated.md
│   ├── concept-example-annotated.md
│   ├── reference-example-annotated.md
│   └── troubleshooting-example-annotated.md
│
├── schemas/                           # Validation
│   ├── uda-content.schema.json        # JSON Schema
│   └── validate.js                    # Validator script
│
├── .github/workflows/                 # CI/CD
│   ├── validate-uda.yml               # Schema + lint validation
│   └── uda-ci.yml                     # Additional checks
│
├── .markdownlint.yml                  # Markdown linting config
├── .editorconfig                      # Editor formatting
├── uda-content.schema.json            # (Legacy; moved to schemas/)
└── README.md                          # This file
```

---

## Key Documents

### For Learning

- **[CONTRIBUTOR_ONBOARDING.md](./docs/CONTRIBUTOR_ONBOARDING.md)** — Start here if you're new
  - Explains the philosophy
  - Walks through routing, templates, submission
  - FAQ section
  
- **[UDA Foundations and Scientific Basis.md](./UDA%20Foundations%20and%20Scientific%20Basis.md)** — Deep dive
  - Cognitive science foundations
  - Why this design works
  - Academic references

### For Contributor Decisions

- **[ROUTING.md](./docs/ROUTING.md)** — "What type of doc should I write?"
  - Decision tree with examples
  - Edge case clarifications
  - Anti-patterns to avoid

- **[VALIDATION.md](./docs/VALIDATION.md)** — "Is my doc ready to submit?"
  - Pre-merge checklist
  - Red flags vs. yellow flags
  - Common rejection reasons

### For Governance

- **[GOVERNANCE.md](./docs/GOVERNANCE.md)** — "Who decides? What are the rules?"
  - Steward role and authority
  - Lifecycle (ingestion → maintenance → retirement)
  - Enforcement mechanisms (automated + manual)
  - Conflict resolution

---

## Workflow

### As a Contributor

1. **Read:** [ROUTING.md](./docs/ROUTING.md) (classify your doc)
2. **Copy:** Template matching your doc type
3. **Write:** Fill in sections (follow template guidance)
4. **Review:** Check [VALIDATION.md](./docs/VALIDATION.md) checklist
5. **Submit:** Create PR; automated checks run
6. **Iterate:** Respond to Steward feedback
7. **Merge:** After approval

### As a Steward (Reviewer)

1. **Automated checks pass?** (CI/CD validates schema + lint)
2. **Routing correct?** (Use ROUTING.md as arbiter)
3. **Single intent?** (No mixed-purpose docs)
4. **Metadata complete?** (type, title, version, tags, body structure)
5. **Cross-links valid?** (Point to real docs)
6. **Approve or request changes** (explain using ROUTING.md / VALIDATION.md)

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

```bash
# Install dependencies (if not done)
npm install

# Validate a single file
node schemas/validate.js examples/task-example-annotated.md

# Output: ✅ Validation passed, or ❌ with error details
```

### CI/CD Workflows

**GitHub Actions** runs on every PR:

- **`validate-uda.yml`** — Schema + lint validation (blocks merge if failed)
- **`uda-ci.yml`** — Governance checks (alerts if governance docs change)

---

## Getting Started with UDA

### Option A: Use as a Template

1. **Fork or clone this repo**
2. **Replace examples** with your own content (keep templates and governance)
3. **Customize** governance rules in [GOVERNANCE.md](./docs/GOVERNANCE.md) if needed (e.g., change "Steward" role name)
4. **Invite team** to read [CONTRIBUTOR_ONBOARDING.md](./docs/CONTRIBUTOR_ONBOARDING.md)

### Option B: Adopt UDA for Existing Docs

1. **Read** [UDA Foundations](./UDA%20Foundations%20and%20Scientific%20Basis.md) + [ROUTING.md](./docs/ROUTING.md)
2. **Classify existing docs** using the routing decision tree (which ones are Task? Concept? etc.)
3. **Refactor:** Split mixed-intent docs into separate Task + Concept + Reference files
4. **Add frontmatter** to each doc (type, title, version, tags, body)
5. **Validate** using [schemas/validate.js](./schemas/validate.js)
6. **Set up CI/CD** workflows from `.github/workflows/`

---

## Governance

### The Steward Role

One person (or rotating) maintains UDA discipline:

- **Approves** new PRs for routing correctness
- **Rejects** mixed-intent docs (requests split)
- **Maintains** templates and governance docs
- **Handles** edge cases and conflicts

**See [GOVERNANCE.md](./docs/GOVERNANCE.md) for full details.**

### Contributing Changes to UDA Itself

If you want to change templates, routing rules, or governance:

1. **Open an issue** or discussion (not a direct PR)
2. **Propose change** with rationale
3. **Team consensus** required
4. **Update version** in repo (MAJOR/MINOR/PATCH)
5. **Merge** and document in CHANGELOG.md

---

## FAQ

**Q: Can I have a Task that also explains the concept?**

A: No. Split into two docs: Task (how-to) + Concept (why/what). Link them together. This improves findability and reduces cognitive load.

**Q: What if my doc doesn't fit one type perfectly?**

A: Use the ROUTING.md decision tree. Pick the *primary* purpose. Other purposes get separate docs.

**Q: Can I invent a new folder structure?**

A: No. Folders organize by *domain* (Database, Authentication, Deployment), not by doc type or workflow. If your domain doesn't exist, ask Steward.

**Q: What if I disagree with the routing decision?**

A: Discuss with Steward using ROUTING.md. If still ambiguous, the decision is: "What would 80% of readers search for?" That's your primary intent.

**Q: Do I have to use semantic versioning?**

A: Yes. All docs share the repo version (not individual versions). See [GOVERNANCE.md](./docs/GOVERNANCE.md) for versioning rules.

---

## Contributing

This is a **template repository** for UDA itself. To contribute to the UDA framework:

1. **Read:** [docs/GOVERNANCE.md](./docs/GOVERNANCE.md)
2. **Propose:** Open an issue with your suggestion
3. **Discuss:** Team consensus required for framework changes
4. **Implement:** Update docs, examples, schema, governance as needed
5. **Version:** Bump semantic version

To use UDA for your own documentation, see **"Getting Started with UDA"** above.

---

## License

This UDA framework is provided as-is for documentation teams. Adapt it to your needs.

---

## Questions?

- **Beginner?** Start with [CONTRIBUTOR_ONBOARDING.md](./docs/CONTRIBUTOR_ONBOARDING.md)
- **Stuck on routing?** See [ROUTING.md](./docs/ROUTING.md) decision tree
- **Reviewing a doc?** Use [VALIDATION.md](./docs/VALIDATION.md) checklist
- **Understanding the theory?** Read [UDA Foundations](./UDA%20Foundations%20and%20Scientific%20Basis.md)
- **Setting governance?** See [GOVERNANCE.md](./docs/GOVERNANCE.md)

Welcome to UDA! 🚀
