# LAYERED_ARCHITECTURE.md

## The 4-Layer Framework

UDA is now organized as a **layered, composable framework** where each layer builds on the previous one. You choose which layers to activate based on your project's needs.

```
Layer 1: Cognitive Core (Always Active)
├─ 4 immutable doc types (task, concept, reference, troubleshooting)
├─ Cognitive science foundation (IFT, CLT, Schema Theory)
└─ Governance discipline (ROUTING.md decision tree)

Layer 2: Domain Extensions (Optional)
├─ Specialized doc types per domain
├─ Examples: educational, API, product
└─ Extensible: Create your own domains

Layer 3: Operational Infrastructure (Optional)
├─ Business/operational metadata
├─ Modules: publishing, membership, finance, content-management
└─ Enables: approval workflows, access tiers, revenue tracking

Layer 4: Automation & CI/CD (Optional)
├─ Publishing pipelines and gates
├─ Content testing and validation
├─ Analytics and metrics
└─ Enables: multi-stage workflows, quality dashboards
```

## Configuration Profiles

Choose your architecture via `uda.config.json`:

### Minimal (Pure UDA)
**For:** Academic projects, personal knowledge bases, educational materials
```json
{
  "profile": "minimal",
  "layers": ["core"]
}
```
- Core 4 doc types only
- Simple validation (schema, frontmatter, filenames)
- Single ROUTING.md
- ~10KB total overhead

### Educational (Core + Domain)
**For:** Learning platforms, bootcamps, curriculum
```json
{
  "profile": "educational",
  "layers": ["core", "domains"],
  "domains": ["educational"]
}
```
- Core 4 + specialized edu types (batting cages, rubrics, milestones)
- Educational routing extended ROUTING.md
- Domain-specific schema validation
- Enables learning progression and curriculum tracking

### Product (Core + Domain + Operations)
**For:** Product documentation, feature guides, changelog
```json
{
  "profile": "product",
  "layers": ["core", "domains", "operations"],
  "domains": ["product"],
  "operations": ["publishing", "membership", "content-management"]
}
```
- Core 4 + product types (feature guides, changelogs, release notes)
- Publishing gates (staging → production)
- Membership tiers (free, pro, enterprise content)
- Content lifecycle tracking
- Enables staged publishing and tiered access

### API (Core + Domain + Operations + Automation)
**For:** API documentation platforms
```json
{
  "profile": "api",
  "layers": ["core", "domains", "operations", "automation"],
  "domains": ["api"],
  "operations": ["publishing", "content-management"],
  "automation": true
}
```
- Core 4 + API types (endpoint specs, code examples, SDKs)
- Link validation and example testing
- Multi-stage publication pipeline
- Automated quality gates
- Enables production-grade publishing

### Enterprise (All Layers)
**For:** Large-scale content platforms
```json
{
  "profile": "enterprise",
  "layers": ["core", "domains", "operations", "automation"],
  "domains": ["educational", "api", "product"],
  "operations": ["publishing", "membership", "finance", "content-management"],
  "automation": true
}
```
- Everything: All domains + all operational modules
- Full automation pipelines
- Finance tracking (cost attribution, ROI)
- Comprehensive analytics dashboards
- Enables multi-tenant platforms

## How Layers Compose

### Schema Composition

Schemas layer and extend:

```
Core Schema
  ├─ task.schema.json (4 types)
  ├─ concepts.schema.json
  ├─ reference.schema.json
  └─ troubleshooting.schema.json
        ↓ (extends via $ref)
Domain Schema
  ├─ educational-extension.schema.json (adds edu types)
  ├─ api-extension.schema.json (adds endpoint types)
  └─ product-extension.schema.json (adds product types)
        ↓ (extends via $ref)
Operations Schema
  ├─ publishing-extension.schema.json (adds pub gates)
  ├─ membership-extension.schema.json (adds tiers)
  ├─ finance-extension.schema.json (adds cost tracking)
  └─ content-management-extension.schema.json (adds lifecycle)
        ↓
Composed Schema (used for validation)
```

Each layer **extends, never overrides**. Core doc types remain unchanged.

### Directory Composition

Directories layer:
```
uda-core/             (Always active)
├─ templates/         (4 core types)
├─ schemas/          (Core schema)
├─ governance/       (ROUTING.md, etc)

domains/              (If enabled in profile)
├─ educational/
│  ├─ templates/     (Edu-specific types)
│  ├─ schemas/       (Edu schema extension)
│  └─ governance/    (Edu routing extended ROUTING.md)
├─ api/
├─ product/
└─ [custom]/         (User-defined domains)

operations/           (If enabled in profile)
├─ publishing/       (Publishing gates)
├─ membership/       (Access control)
├─ finance/          (Revenue tracking)
└─ content-management/ (Lifecycle)

automation/           (If enabled in profile)
├─ pipelines/        (GitHub Actions)
├─ analytics/        (Metrics collection)
└─ dashboards/       (Reporting)
```

### Validation Composition

Validators run layer-by-layer:

```
Input: Document (raw markdown)
    ↓
1. Schema Validation (Core)
   └─ Checks: doc type, frontmatter required fields
   └─ Error? Fail with "Invalid doc type"
    ↓
2. Domain Validation (if domain enabled)
   └─ Checks: domain-specific fields, routing correctness
   └─ Error? Fail with "Invalid domain routing"
    ↓
3. Operations Validation (if ops enabled)
   └─ Checks: publishing gates, membership tags
   └─ Error? Fail with "Missing publishing tier"
    ↓
4. Automation Validation (if automation enabled)
   └─ Checks: link validity, example execution
   └─ Error? Fail with "Broken internal link"
    ↓
Output: Clean document or specific error message
```

## Layer Immutability Guarantees

**Core Layer (Immutable):**
- 4 doc types never change
- ROUTING.md decision tree never changes
- Core schema never overridden
- Backward compatibility guaranteed
- Any UDA project continues working forever

**Domain Layers (Composable):**
- Extend core via `$ref` (never override)
- Add new types without changing core types
- Can be added/removed without breaking core
- Each domain is independent

**Operations Layers (Configurable):**
- Add metadata, never change doc structure
- Can be enabled/disabled per profile
- Compose without conflicts (different schema sections)
- Backward compatible

**Automation Layer (Optional):**
- Pure CI/CD, never changes documents
- Can be added/removed without side effects
- Doesn't modify core or domain schemas

## Migration Guide

### From Pure UDA → Educational

```bash
# 1. Update profile
# In uda.config.json: "profile": "educational"

# 2. Create domain content
mkdir domains/educational/docs
npm run create:educational-doc --type batting-cage

# 3. Update ROUTING.md
# Add educational routing rules

# 4. Validate
npm run validate:all
```

### From Educational → Product

```bash
# 1. Update profile
# In uda.config.json: "profile": "product"

# 2. Enable operations
# Set "operations": ["publishing", "membership", "content-management"]

# 3. Configure publishing gates
npm run setup:publishing-gates

# 4. Validate
npm run validate:all
```

### From Product → Enterprise

```bash
# 1. Update profile
# In uda.config.json: "profile": "enterprise"

# 2. Enable all domains and operations
# Set all layers to true

# 3. Set up automation
npm run setup:automation

# 4. Validate entire pipeline
npm run validate:all
npm run test:all
```

## When to Use Each Profile

| Profile | When | Setup Time | Complexity |
|---------|------|-----------|-----------|
| **Minimal** | Personal knowledge, academics, learning | < 5 min | Very low |
| **Educational** | Bootcamps, courses, learning platforms | 15-30 min | Low |
| **Product** | Product docs, feature guides, changelogs | 1-2 hours | Medium |
| **API** | API documentation, developer portals | 2-4 hours | High |
| **Enterprise** | Scaled content platforms, multi-tenant | 1-2 days | Very high |

## Key Principles

1. **Minimalism is Default:** Start with minimal, add layers as needs grow
2. **Core is Sacred:** Layer 1 never changes, guarantees backward compatibility
3. **Composition Over Configuration:** Each layer extends previous, no overrides
4. **Opt-In Features:** Each domain and operation is optional, not forced
5. **Profile-Based:** `uda.config.json` controls entire architecture
6. **Fail Fast:** Validation catches issues early, before they propagate
7. **Clear Ownership:** Each layer has clear responsibility and isolation

## Quick Start

### 1. Choose Your Profile
```bash
# Pick one from above based on your needs
```

### 2. Update Configuration
```bash
# Edit uda.config.json: set profile and enable layers
```

### 3. Create Your First Document
```bash
# Use appropriate template from layer being used
npm run create:task
npm run create:educational-doc --type batting-cage  # (if educational)
npm run create:product-doc --type release-notes     # (if product)
```

### 4. Validate
```bash
npm run validate:all
```

### 5. Extend (When Ready)
```bash
# Add custom domains
npm run create:domain --name my-domain

# Add operational modules
npm run create:operational-module --name my-module

# Set up CI/CD
npm run setup:automation
```

## Documentation Map

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Full technical architecture
- [CONFIGURATION.md](./CONFIGURATION.md) — All configuration options
- [uda-core/README.md](./uda-core/README.md) — Core layer documentation
- [domains/README.md](./domains/README.md) — Domain system documentation
- [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md) — Build custom domains
- [operations/README.md](./operations/README.md) — Operational infrastructure
- [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md) — Build operational modules
- [automation/README.md](./automation/README.md) — CI/CD and automation
- [schemas/README.md](./schemas/README.md) — Schema plugin system
- [schemas/REGISTRY.md](./schemas/REGISTRY.md) — Available schema plugins

## Support & Contribution

Each layer has clear extension points:
- **Core layer:** Immutable (backwards compatibility preserved)
- **Domains:** Add custom domains via [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md)
- **Operations:** Add custom modules via [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md)
- **Schemas:** Add plugins via [schemas/README.md](./schemas/README.md)
- **Automation:** Add pipelines via [automation/README.md](./automation/README.md)
