# QUICK_START.md

## Choose Your Path

### 🎯 I just want to write docs (Minimal Profile)

**Setup:** < 5 minutes

```bash
# 1. You're done! Check:
cat uda-core/templates/task.template.md

# 2. Create your first doc:
npm run create:task -- --title "My First Task"

# 3. Validate:
npm run validate:all
```

**Use:** Personal knowledge bases, academic materials, learning notes

---

### 🎓 I'm building a course (Educational Profile)

**Setup:** 15-30 minutes

```bash
# 1. Update uda.config.json:
{
  "profile": "educational",
  "layers": ["core", "domains"],
  "domains": ["educational"]
}

# 2. Create course structure:
npm run create:domain -- --name my-course

# 3. Create assessment content:
npm run create:educational-doc -- --type batting-cage --title "Practice Problem"

# 4. Validate:
npm run validate:all
```

**Use:** Bootcamps, online courses, curriculum platforms

**Reference:** [domains/educational/README.md](./domains/educational/README.md)

---

### 📦 I'm documenting a product (Product Profile)

**Setup:** 1-2 hours

```bash
# 1. Update uda.config.json:
{
  "profile": "product",
  "layers": ["core", "domains", "operations"],
  "domains": ["product"],
  "operations": ["publishing", "membership", "content-management"]
}

# 2. Configure publishing tiers:
npm run setup:publishing-gates
npm run setup:membership-tiers

# 3. Create product content:
npm run create:product-doc -- --type feature-guide
npm run create:product-doc -- --type release-notes

# 4. Validate and publish:
npm run validate:all
npm run publish
```

**Use:** Product documentation, feature guides, changelogs

**Reference:** [domains/product/README.md](./domains/product/README.md)

---

### 🔌 I'm building an API platform (API Profile)

**Setup:** 2-4 hours

```bash
# 1. Update uda.config.json:
{
  "profile": "api",
  "layers": ["core", "domains", "operations", "automation"],
  "domains": ["api"],
  "operations": ["publishing", "content-management"],
  "automation": true
}

# 2. Set up CI/CD:
npm run setup:automation

# 3. Create API docs:
npm run create:api-doc -- --type endpoint
npm run create:api-doc -- --type sdk-guide

# 4. Test and publish:
npm run validate:all
npm run test:all
npm run publish
```

**Use:** API documentation platforms, developer portals

**Reference:** [domains/api/README.md](./domains/api/README.md), [automation/README.md](./automation/README.md)

---

### 🏢 I need everything (Enterprise Profile)

**Setup:** 1-2 days

```bash
# 1. Update uda.config.json:
{
  "profile": "enterprise",
  "layers": ["core", "domains", "operations", "automation"],
  "domains": ["educational", "api", "product"],
  "operations": ["publishing", "membership", "finance", "content-management"],
  "automation": true
}

# 2. Full setup:
npm run setup:full

# 3. Create custom domain:
npm run create:domain -- --name my-domain

# 4. Create custom operational module:
npm run create:operational-module -- --name my-module

# 5. Full validation pipeline:
npm run validate:all
npm run test:all
npm run publish
```

**Use:** Large content platforms, multi-tenant systems, scaled operations

**Reference:** [LAYERED_ARCHITECTURE.md](./LAYERED_ARCHITECTURE.md)

---

## The 4 Layers at a Glance

```
Layer 1: CORE (Always active)
  └─ 4 immutable doc types: task, concept, reference, troubleshooting

Layer 2: DOMAINS (Optional)
  └─ Add specialized doc types: educational, API, product, [custom]

Layer 3: OPERATIONS (Optional)
  └─ Add business metadata: publishing, membership, finance, content-management

Layer 4: AUTOMATION (Optional)
  └─ Add CI/CD pipelines, testing, analytics
```

---

## One-Minute Overview

**UDA is now:**
- ✅ Flexible (minimal to enterprise)
- ✅ Layered (choose what you use)
- ✅ Composable (domains + operations layer cleanly)
- ✅ Immutable (core never changes, backward compatible)
- ✅ Configurable (single `uda.config.json` controls everything)

**Start with:** Minimal profile (pure UDA)
**Add layers:** As your needs grow
**Each layer:** Completely optional, non-intrusive

---

## Doc Quick Reference

| Need | Read This |
|------|-----------|
| Understand layers | [LAYERED_ARCHITECTURE.md](./LAYERED_ARCHITECTURE.md) |
| Choose configuration | [CONFIGURATION.md](./CONFIGURATION.md) |
| Full technical details | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Create custom domain | [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md) |
| Create operational module | [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md) |
| Set up automation | [automation/README.md](./automation/README.md) |
| All available schemas | [schemas/REGISTRY.md](./schemas/REGISTRY.md) |
| See what's done | [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) |

---

## Common Commands

```bash
# Create documents
npm run create:task
npm run create:educational-doc -- --type batting-cage
npm run create:product-doc -- --type feature-guide
npm run create:api-doc -- --type endpoint

# Create extensions
npm run create:domain -- --name my-domain
npm run create:operational-module -- --name my-module

# Validate and test
npm run validate:all
npm run test:all

# Setup and deploy
npm run setup:automation
npm run publish
```

---

## Migration Path

```
Start: Minimal (Pure UDA)
  ↓
+ Educational Domain
  ↓
+ Product Domain + Operations
  ↓
+ API Domain + Automation
  ↓
Enterprise (All layers)
```

Each step is optional. Stay at any level that fits your needs.

---

## I'm Still Confused

Start here in order:
1. [LAYERED_ARCHITECTURE.md](./LAYERED_ARCHITECTURE.md) — 10-minute read explaining the 4 layers
2. [CONFIGURATION.md](./CONFIGURATION.md) — 5-minute read choosing your profile
3. Update `uda.config.json` to match your choice
4. Create your first document

Need more help?
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Complete technical reference
- [domains/README.md](./domains/README.md) — Domain system explained
- [operations/README.md](./operations/README.md) — Operations system explained

---

## Feedback & Questions

Each layer has clear extension points. See comprehensive guides:
- **Domains:** [domains/CREATING_DOMAINS.md](./domains/CREATING_DOMAINS.md)
- **Operations:** [operations/CREATING_MODULES.md](./operations/CREATING_MODULES.md)
- **Schemas:** [schemas/README.md](./schemas/README.md)
- **Automation:** [automation/README.md](./automation/README.md)
