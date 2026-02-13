# UDA Architecture Overview

## Introduction

UDA (Unified Documentation Architecture) is a layered documentation framework grounded in cognitive science principles. This document explains the architecture redesign that evolved from the template through real-world implementation feedback.

## Layered Architecture

UDA now operates as a **four-layer system**:

### Layer 1: Cognitive Core (Immutable)

**Location:** `uda-core/`

The pure expression of UDA principles. This layer never changes to preserve theoretical integrity.

- **Templates:** 4 doc types (task, concept, reference, troubleshooting)
- **Schema:** Core validation rules
- **Governance:** ROUTING.md, GOVERNANCE.md, VALIDATION.md

**When to use:** Minimal, pure UDA projects with no domain-specific extensions.

**Profile:** `minimal`

### Layer 2: Domain Extensions (Configurable)

**Location:** `domains/`

Optional, reusable domain packs that extend core UDA with specialized templates, schemas, and governance.

- **Educational:** Batting cages, rubrics, curriculum templates
- **API:** Endpoint specs, error catalogs, protocol documentation
- **Product:** Feature guides, release notes, changelogs
- **Template:** Starter pack for building custom domains

**When to use:** Projects with specialized content types beyond the 4 core types.

**Profile:** `educational`, `api`, `product`

### Layer 3: Operational Infrastructure (Optional)

**Location:** `operations/`

Templates and schemas for business operations: publishing, membership, finance, content management.

- **Publishing:** Workflows, checklists, distribution gates
- **Membership:** Access control, tiering, monetization
- **Finance:** Revenue, licensing, ROI tracking
- **Content Management:** Lifecycle, deprecation, search optimization

**When to use:** Production content systems with business operations requirements.

**Profile:** `enterprise`

### Layer 4: Automation & Tooling (Optional)

**Location:** `automation/`

Advanced CI/CD patterns, analytics, and quality gates.

- **Pipelines:** Multi-stage validation, testing, publishing workflows
- **Analytics:** Content metrics, engagement tracking, performance monitoring

**When to use:** Large-scale documentation projects with sophisticated delivery requirements.

**Profile:** `enterprise`

---

## Configuration System

**File:** `uda.config.json`

Controls which layers and features are active.

```json
{
  "structure": {
    "content": true,      // Always active
    "domains": true,      // Enable domain extensions
    "operations": false,  // Disable operations layer
    "automation": false   // Disable automation layer
  },
  "profiles": [
    "minimal",            // Use predefined profile
    "educational"
  ]
}
```

### Available Profiles

| Profile | Layers | Use Case |
|---|---|---|
| **minimal** | Core only | Small, pure UDA projects |
| **educational** | Core + educational domain | Learning platforms, training materials |
| **api** | Core + API domain | Software API documentation |
| **product** | Core + product domain | Product documentation, release notes |
| **enterprise** | All layers | Large-scale documentation operations |

---

## Schema Plugin System

**Location:** `schemas/plugins/`

Schemas compose via JSON Schema composition rules:

```
Core Schema (immutable)
    ↓
Domain Schemas (extend core)
    ↓
Operational Schemas (extend domain)
    ↓
Composed Schema (validation target)
```

**Registry:** See [schemas/REGISTRY.md](schemas/REGISTRY.md)

### Plugin Lifecycle

1. **Create:** `schemas/plugins/my-plugin.schema.json` extends core
2. **Register:** Add to `uda.config.json` + `schemas/REGISTRY.md`
3. **Integrate:** Import in domain pack or operational module
4. **Test:** Validate composition with test documents
5. **Deploy:** Merge to main; version bump if breaking

---

## Validation Architecture

**Orchestrator:** `scripts/validate-orchestrator.js`

Runs validators in priority order, reporting per layer:

```
Layer 1 (Core): ✓ Schema valid, ✓ Frontmatter complete, ✓ Filename OK
Layer 2 (Domains): ✓ Educational plugin valid
Layer 3 (Operations): ✓ Publishing gates OK
Layer 4 (Automation): ✓ Analytics binding valid
```

### Validators

| Validator | Priority | Responsibility |
|---|---|---|
| Schema | 1 | JSON Schema validation (core + plugins) |
| Frontmatter | 2 | Required fields (type, title, version) |
| Filenames | 3 | Convention check (lowercase, hyphens) |
| Markdown | 4 | Linting (headings, lists, line length) |

---

## Directory Structure (Full Enterprise Setup)

```
├── uda-core/                          # Layer 1: Immutable cognitive core
│   ├── templates/
│   │   ├── task.template.md
│   │   ├── concept.template.md
│   │   ├── reference.template.md
│   │   └── troubleshooting.template.md
│   ├── schemas/
│   │   └── uda-content.schema.json
│   └── governance/
│       ├── GOVERNANCE.md
│       ├── ROUTING.md
│       └── VALIDATION.md
│
├── docs/                              # Layer 1: Content directory
│   ├── task/
│   ├── concept/
│   ├── reference/
│   └── troubleshooting/
│
├── domains/                           # Layer 2: Domain extensions
│   ├── template/
│   │   ├── templates/
│   │   ├── schemas/
│   │   ├── governance/
│   │   └── examples/
│   ├── educational/
│   │   ├── templates/
│   │   │   ├── batting-cage.template.md
│   │   │   └── rubric.template.md
│   │   ├── schemas/
│   │   │   └── educational-extension.schema.json
│   │   ├── governance/
│   │   └── examples/
│   ├── api/
│   │   ├── templates/
│   │   ├── schemas/
│   │   └── examples/
│   └── product/
│       ├── templates/
│       ├── schemas/
│       └── examples/
│
├── schemas/                           # Schema plugin registry
│   ├── REGISTRY.md
│   └── plugins/
│       ├── educational-extension.schema.json
│       ├── api-extension.schema.json
│       ├── product-extension.schema.json
│       └── operational-extension.schema.json
│
├── operations/                        # Layer 3: Operational infrastructure
│   ├── membership/
│   │   ├── templates/
│   │   ├── schemas/
│   │   └── examples/
│   ├── publishing/
│   ├── finance/
│   └── content-management/
│
├── automation/                        # Layer 4: Automation & tooling
│   ├── pipelines/
│   │   └── github-actions/
│   └── analytics/
│
├── scripts/                           # Validation & automation
│   ├── validate-orchestrator.js
│   ├── init-domain.js
│   └── ... (additional helpers)
│
├── governance/                        # Top-level governance hub
│   ├── EXTENSIBILITY.md
│   └── MULTI_LAYER_GOVERNANCE.md
│
├── examples/                          # Example docs & projects
│   ├── project-minimal/
│   ├── project-educational/
│   ├── project-enterprise/
│   └── ...
│
├── uda.config.json                    # Project configuration
├── package.json                       # Dependencies & scripts
└── README.md                          # Quick start guide
```

---

## How to Get Started

### Scenario 1: Minimal (Pure UDA)

```bash
# Initialize minimal setup
npm install
npx uda-init --profile minimal

# Result: docs/ folder with 4 types, no extensions
```

**Config:**
```json
{
  "profiles": ["minimal"],
  "structure": { "domains": false, "operations": false }
}
```

---

### Scenario 2: Educational Content

```bash
# Initialize with educational domain
npm install
npx uda-init --profile educational --domain educational

# Result: docs/ + domains/educational/ with batting cages, rubrics
```

**Config:**
```json
{
  "profiles": ["educational"],
  "structure": { "domains": true }
}
```

---

### Scenario 3: Enterprise Setup

```bash
# Initialize full stack
npm install
npx uda-init --profile enterprise

# Result: All layers enabled; full operational infrastructure
```

**Config:**
```json
{
  "profiles": ["enterprise"],
  "structure": { "domains": true, "operations": true, "automation": true }
}
```

---

## Backward Compatibility

**Existing UDA projects:**

- Old projects still work unchanged
- `uda-core/` contains the original template (backward compatible)
- New layers are opt-in via `uda.config.json`
- No forced migration required

**Migration path (optional):**
```bash
npm install                           # Get new version
npx uda-migrate --from-legacy         # Optional: reorganize into uda-core/
```

---

## Extensibility

### Creating a Custom Domain

```bash
npx uda-init-domain --name="my-domain" --template="template"
```

This scaffolds:
- `domains/my-domain/templates/`
- `domains/my-domain/schemas/`
- `domains/my-domain/governance/`
- `domains/my-domain/README.md`

### Creating a Custom Operational Module

```bash
npx uda-init-operations --name="custom-ops"
```

This scaffolds:
- `operations/custom-ops/templates/`
- `operations/custom-ops/schemas/`
- `operations/custom-ops/README.md`

---

## Key Principles

1. **Purity:** Core layer remains immutable; preserves UDA's theoretical foundation
2. **Modularity:** Each layer independent; pick what you need
3. **Composition:** Schemas compose without conflict
4. **Clarity:** Configuration system makes structure explicit
5. **Scalability:** Works for solo projects to enterprise documentation operations

---

## References

- [uda.config.json](uda.config.json) — Configuration options
- [schemas/REGISTRY.md](schemas/REGISTRY.md) — Schema plugin directory
- [uda-core/governance/GOVERNANCE.md](uda-core/governance/GOVERNANCE.md) — Foundation governance
- [governance/MULTI_LAYER_GOVERNANCE.md](governance/MULTI_LAYER_GOVERNANCE.md) — Extended governance for all layers
