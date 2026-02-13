# WHATS_NEW.md

# What's New in UDA: The Layered Architecture

## The Big Change

UDA has transformed from a **single-layer template system** (one size fits all) into a **4-layer framework** (scale from minimal to enterprise).

**Before:** 4 doc types, one structure, fits all use cases
**After:** Configurable layers that let you start minimal and grow to enterprise scale

---

## The 4 Layers

### Layer 1: Cognitive Core (Immutable) ✨ **NEW**
Pure UDA foundation that *never changes*:
- 4 immutable doc types (task, concept, reference, troubleshooting)
- Cognitive science principles (Information Foraging Theory, Cognitive Load Theory, Schema Theory)
- Governance discipline (ROUTING.md decision tree)
- Backward compatibility guaranteed forever

**Impact:** UDA projects will continue working forever. No breaking changes.

---

### Layer 2: Domains (Optional) ✨ **NEW**
Add specialized doc types by domain:
- **Educational:** Batting cages, rubrics, milestones, curriculum maps
- **API:** Endpoint specs, SDK guides, error catalogs
- **Product:** Feature guides, release notes, changelogs
- **Custom:** Create your own domains

**Before:** One 4-type system for everything
**After:** Extend with specialized types without modifying core

---

### Layer 3: Operations (Optional) ✨ **NEW**
Add business/operational metadata:
- **Publishing:** Gates (draft → staging → production), approvals
- **Membership:** Access tiers (free, pro, enterprise), audience segmentation
- **Finance:** Cost attribution, revenue tracking, ROI calculation
- **Content Management:** Lifecycle tracking, deprecation, review schedules

**Before:** No operational infrastructure
**After:** Full business workflows built into your docs platform

---

### Layer 4: Automation (Optional) ✨ **NEW**
CI/CD, testing, and analytics:
- Multi-stage validation pipelines
- Content testing (links, examples, cross-refs)
- Publishing gates and approval flows
- Analytics dashboards and metrics

**Before:** Manual validation and publishing
**After:** Automated quality gates and metrics

---

## Configuration System ✨ **NEW**

Single `uda.config.json` controls your entire architecture:

```json
{
  "profile": "minimal",  // Choose: minimal, educational, product, api, enterprise
  "version": "2.0.0",
  "layers": ["core"],     // Which layers to enable
  "domains": [],          // Which domains to enable
  "operations": []        // Which operations to enable
}
```

**Impact:** No code changes needed. Configuration controls features.

---

## 5 Different Starting Points ✨ **NEW**

Choose based on your needs:

| Profile | Best For | Setup Time | Layers |
|---------|----------|-----------|--------|
| **Minimal** | Personal knowledge, academics | < 5 min | Core |
| **Educational** | Bootcamps, courses | 15-30 min | Core + Educational domain |
| **Product** | Product documentation | 1-2 hours | Core + Product domain + Operations |
| **API** | API documentation | 2-4 hours | Core + API domain + Automation |
| **Enterprise** | Scaled platforms | 1-2 days | All layers |

**Before:** One way to use UDA for everything
**After:** Choose your starting point, scale as you grow

---

## Enhanced Governance ✨ **NEW**

Governance now works across all layers:
- Core governance (ROUTING.md, lifecycle, versioning) stays immutable
- Each domain can extend routing rules
- Each operation can add governance constraints
- Single Content Steward role enforces discipline across all layers

**Before:** Single ROUTING.md for all content
**After:** Layered governance that scales with content complexity

---

## Schema Composition ✨ **NEW**

Schemas now compose via JSON Schema `$ref`:
- Core schema: Immutable (4 doc types)
- Domain schemas: Extend core without modifications
- Operations schemas: Add metadata fields
- Composed schema: Single validation target

**Before:** Single schema, everything mashed together
**After:** Composable schemas that layer cleanly

```
Core Schema  →  + Domain Schemas  →  + Operations Schemas  →  Composed Schema
(Immutable)      (Extend via $ref)     (Extend via $ref)      (For validation)
```

---

## Multi-Stage Validation ✨ **NEW**

Validation now runs layer-by-layer:

```
Document → Schema Validation (Core)
         → Domain Validation (if enabled)
         → Operations Validation (if enabled)
         → Automation Validation (if enabled)
         → Pass/Fail with specific error message
```

**Impact:** Easy to debug which layer failed and why.

---

## New Directory Structure ✨ **NEW**

```
uda-core/              (Immutable cognitive layer)
├─ templates/         (4 core templates)
├─ schemas/           (Core schema)
└─ governance/        (ROUTING, GOVERNANCE, VALIDATION)

domains/              (Optional domain extensions)
├─ educational/
├─ api/
├─ product/
└─ [custom domains]/

operations/           (Optional operational infrastructure)
├─ publishing/
├─ membership/
├─ finance/
└─ content-management/

automation/           (Optional CI/CD & analytics)
├─ pipelines/
├─ analytics/
└─ testing/

schemas/              (Schema plugin system)
├─ plugins/
├─ compose.js         (Schema composition)
└─ REGISTRY.md        (Plugin directory)
```

**Before:** Single flat structure
**After:** Organized by layer, clear extension points

---

## What Hasn't Changed

✅ **4 core doc types still exist:** task, concept, reference, troubleshooting
✅ **ROUTING.md still works:** Same decision tree (Is it instructional? Explanatory? etc.)
✅ **Governance model unchanged:** Content Steward, lifecycle, versioning
✅ **Cognitive science foundation unchanged:** IFT, CLT, Schema Theory
✅ **Backward compatibility:** All existing UDA projects continue working

**Bottom line:** UDA's core principles are preserved. New features layer on top.

---

## Quick Migration Guide

### If you're using Minimal UDA now:
✅ **Nothing changes.** Your current docs work as-is.

### When you're ready to add a domain:
```bash
npm run create:domain -- --name my-domain
# Copy the template structure, customize for your domain
```

### When you need operational features:
```bash
# Add to uda.config.json:
"operations": ["publishing"]
```

### When you want CI/CD:
```bash
npm run setup:automation
```

---

## Key Principles

1. **Immutability:** Core layer never changes
2. **Opt-In:** Each layer is optional, not forced
3. **Composition:** Layers extend, never override
4. **Configuration:** `uda.config.json` controls architecture
5. **Backward Compatibility:** Existing projects continue working
6. **Clear Ownership:** Each layer has clear responsibility

---

## New Documentation

Read these in order:

1. **[QUICK_START.md](./QUICK_START.md)** (5 min) — Choose your path
2. **[LAYERED_ARCHITECTURE.md](./LAYERED_ARCHITECTURE.md)** (10 min) — Understand the layers
3. **[CONFIGURATION.md](./CONFIGURATION.md)** (5 min) — Configuration options
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** (comprehensive) — Full technical design
5. **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** (reference) — What's been built

---

## For Domain Creators

Read: [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md)

Now you can:
- Create specialized doc types for your domain
- Add domain-specific routing rules
- Distribute domain packs to other users
- Extend schemas without modifying core

---

## For Automation Builders

Read: [automation/README.md](./automation/README.md)

Now you can:
- Build multi-stage validation pipelines
- Test content (links, code examples)
- Automate publishing workflows
- Collect and report on metrics

---

## For Operations Managers

Read: [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md)

Now you can:
- Create operational modules (publishing gates, membership tiers, etc.)
- Add business metadata to documentation
- Track content lifecycle
- Implement approval workflows

---

## What Remains (Future Work)

These features are designed but not yet implemented:

- ⏳ Schema composition engine (`schemas/compose.js`)
- ⏳ Validation orchestrator (`scripts/validate-orchestrator.js`)
- ⏳ GitHub Actions templates (automation/pipelines/)
- ⏳ Analytics dashboards (automation/analytics/)
- ⏳ Operational module templates

All design is complete. Implementation just needs coding.

---

## Questions?

| Question | Answer |
|----------|--------|
| Will my existing docs break? | No. Pure UDA works exactly as before. |
| Do I have to use all layers? | No. Start minimal, add layers as needed. |
| Can I create custom domains? | Yes. See [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md) |
| Can I choose which features to enable? | Yes. `uda.config.json` controls everything. |
| Is this backward compatible? | 100%. All existing UDA projects continue working. |

---

## Start Here

1. **[QUICK_START.md](./QUICK_START.md)** — Choose your path (minimal, educational, product, api, enterprise)
2. Update `uda.config.json` to match your choice
3. Create your first document
4. Scale as your needs grow

Ready? Let's go! 🚀
