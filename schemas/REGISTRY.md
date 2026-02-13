# UDA Schema Registry

This document maintains a registry of all available schema plugins for UDA validation.

## Core Schema

**File:** `uda-core/schemas/uda-content.schema.json`  
**Required:** Yes (always active)  
**Last Updated:** 2025-01-20  
**Version:** 1.0.0  

**Description:** Enforces the 4 core UDA doc types and validates required frontmatter fields.

**Validates:**
- `type`: One of `task`, `concept`, `reference`, `troubleshooting`
- `title`: Human-readable string (required)
- `version`: Semantic versioning (required)
- `tags`: Optional array of strings
- `body`: Type-specific structure validation

**Breaking Changes:** None yet (v1.0.0 is stable)

---

## Domain Plugins

### Educational Domain

**File:** `schemas/plugins/educational.schema.json`  
**Location:** `domains/educational/`  
**Status:** Template available  
**Extends:** Core schema  

**Adds:**
- Batting cage exercise metadata (`spec`, `breakScript`, `scoreScript`)
- Rubric definitions (`rubricSchema`)
- Curriculum linking (`courseId`, `moduleId`, `sequenceOrder`)

**Use When:** Creating educational content, coding exercises, training materials

**Example:** `domains/educational/schemas/rubric.schema.json`

---

### API Domain

**File:** `schemas/plugins/api.schema.json`  
**Location:** `domains/api/`  
**Status:** Template available  
**Extends:** Core schema  

**Adds:**
- Endpoint specifications (`method`, `path`, `parameters`, `responses`)
- Error catalog (`errorCode`, `httpStatus`, `resolution`)
- Changelog tracking (`deprecationDate`, `replacementEndpoint`)

**Use When:** Documenting REST/gRPC APIs, SDKs, protocols

**Example:** `domains/api/schemas/endpoint-spec.schema.json`

---

### Product Domain

**File:** `schemas/plugins/product.schema.json`  
**Location:** `domains/product/`  
**Status:** Template available  
**Extends:** Core schema  

**Adds:**
- Feature metadata (`featureId`, `releaseVersion`, `tier`)
- Release notes (`breaking`, `deprecated`, `migrationType`)
- Changelog structure (`date`, `version`, `category`)

**Use When:** Documenting features, releases, changelogs, product guides

**Example:** `domains/product/schemas/release-notes.schema.json`

---

## Operational Plugins

### Publishing Schema

**File:** `schemas/plugins/publishing.schema.json`  
**Location:** `operations/publishing/`  
**Status:** Template available  

**Adds:**
- Publishing gates (`requiresReview`, `requiresQA`, `isExperimental`, `requiresLegal`)
- Distribution metadata (`audiences`, `deprecated`, `sunsetDate`, `archiveAfter`)
- Publishing checklist (`itemName`, `completed`, `owner`, `dueDate`)

**Use When:** Managing content lifecycle, publishing workflows, distribution decisions

---

### Membership Schema

**File:** `schemas/plugins/membership.schema.json`  
**Location:** `operations/membership/`  
**Status:** Template available  

**Adds:**
- Access control (`public`, `tier`, `requiresAuth`, `membershipLevel`)
- Content monetization (`isPremium`, `pricingModel`, `bundleId`)
- Membership tracking (`createdForVersion`, `audienceSegment`)

**Use When:** Controlling content access, tiering features, analytics

---

### Finance Schema

**File:** `schemas/plugins/finance.schema.json`  
**Location:** `operations/finance/`  
**Status:** Template available  

**Adds:**
- Revenue tracking (`revenueModel`, `cost`, `revenue`, `roi`)
- Licensing metadata (`licenseType`, `licensee`, `term`, `renewal`)
- Financial gates (`requiresFinanceApproval`)

**Use When:** Monetizing documentation, tracking ROI, financial reporting

---

### Content Management Schema

**File:** `schemas/plugins/content-management.schema.json`  
**Location:** `operations/content-management/`  
**Status:** Template available  

**Adds:**
- Lifecycle tracking (`contentOwner`, `lastReviewDate`, `nextReviewDue`, `deprecatedDate`)
- Search optimization (`searchKeywords`, `seoTitle`, `canonicalUrl`)
- Analytics binding (`analyticsId`, `gaCategory`)

**Use When:** Managing content inventory, deprecation, review cycles, search

---

## How to Create a New Plugin

1. **Create schema file:** `schemas/plugins/my-domain.schema.json`
2. **Use JSON Schema composition:** Reference core schema with `$ref`
3. **Extend selectively:** Add properties without breaking core validation
4. **Register in registry:** Add entry to this file + `uda.config.json`
5. **Document in domain pack:** Include schema reference in `domains/my-domain/`
6. **Test composition:** Validate that core + new plugin compose correctly

### Plugin Template

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Domain Extension Schema",
  "description": "Extends UDA core schema with domain-specific metadata",
  "type": "object",
  "properties": {
    "domainMeta": {
      "description": "Domain-specific metadata",
      "type": "object",
      "properties": {
        "key1": { "type": "string" },
        "key2": { "type": "number" }
      }
    }
  }
}
```

---

## Loading Order (Priority)

Schemas are loaded in this order for composition:

1. **Core** → `uda-core/schemas/uda-content.schema.json` (immutable)
2. **Domains** → `schemas/plugins/[domain].schema.json` (in order defined in `uda.config.json`)
3. **Operations** → `schemas/plugins/[operation].schema.json` (in order defined)

Later plugins can extend earlier ones via `$ref`.

---

## Compatibility Matrix

| Base Version | Compatible plugins |
|---|---|
| UDA Core 1.0.0 | Educational 1.0+, API 1.0+, Product 1.0+, Operational 1.0+ |
| UDA Core 2.0.0+ | (Future) Backward compatible plugins only |

---

## Migration Guide

**Upgrading plugin schema?**

1. Increment plugin version (MAJOR.MINOR.PATCH)
2. Update `schemas/plugins/[plugin].schema.json`
3. Document breaking changes in plugin README
4. Update this registry
5. Bump repo version if breaking

**Retiring a plugin?**

1. Mark as `deprecated: true` in registry
2. Keep schema file for backward compatibility (2+ versions)
3. Update this registry with sunset date
4. Link to replacement plugin
