# Product Domain Pack

Add specialized templates, schemas, and governance for product documentation, features, releases, and changelogs.

## What This Domain Adds

**Doc Types:**
- **Feature Guide** — Feature documentation with status, tier, and release information
- **Release Notes** — Version-specific release information and upgrade guides
- **Changelog** —  Historical record of all changes across versions

**Metadata:**
- Feature status (new, beta, stable, deprecated)
- Feature tier (free, basic, pro, enterprise)
- Release version and date
- Breaking changes and migration guides
- Deprecation information and sunset dates

**Validation:**
- Feature status must be valid (new|beta|stable|deprecated)
- Tier must match product tier structure
- Version must be semantic
- Deprecated features have sunset dates and migration paths

## When to Use This Domain

- Product documentation sites
- Feature announcements and release notes
- Deprecation notices and upgrade guides
- Tracking product history and changes
- Managing different product tiers (free, pro, enterprise)

## Templates Included

### Feature Guide Template

```markdown
---
type: "concept"
domain: "product"
featureId: "notifications-v2"
status: "stable"
tier: "pro"
releaseVersion: "3.2.0"
---

## Notifications V2

Feature description, how to use, benefits.
```

### Release Notes Template

```markdown
---
type: "reference"
domain: "product"
releaseVersion: "3.2.0"
releaseDate: "2025-02-15"
---

## Version 3.2.0

### New Features
- Feature 1
- Feature 2

### Breaking Changes
- Change 1: Migration guide link
```

### Changelog Template

```markdown
---
type: "reference"
domain: "product"
---

## Changelog

| Version | Date | Highlights |
|---------|------|-----------|
| 3.2.0 | 2025-02-15 | New notifications API, deprecations |
| 3.1.0 | 2025-01-20 | Features, fixes |
```

## Installation

In `uda.config.json`:

```json
{
  "structure": {
    "domains": {
      "available": ["product"]
    }
  }
}
```

Then run:
```bash
npm run validate:all
```

## Governance

See `governance/ROUTING_PRODUCT.md` for product-specific routing rules.

Stewards use this to classify features, releases, and changelogs.

## Examples

See `examples/` folder for annotated examples.

## Documenting a Feature

1. Copy `templates/feature-guide.template.md`
2. Fill in feature metadata (status, tier, version)
3. Document how to use the feature
4. Link to related features
5. Note if feature is deprecated and why

## Tracking Releases

1. Create release notes for each version
2. List breaking changes with migration guides
3. Note deprecated features with sunset dates
4. Link to changelog entry

## Deprecation Management

Features can be marked as deprecated:

```yaml
---
status: "deprecated"
deprecatedDate: "2025-02-15"
sunsetDate: "2025-08-15"
replacementFeature: "feature-new-version"
---
```

Docs track the deprecation lifecycle automatically.

## Schema Reference

See [schemas/product-extension.schema.json](schemas/product-extension.schema.json) for full schema.

Validates:
- Feature status (new|beta|stable|deprecated)
- Tier level (free|basic|pro|enterprise)
- Semantic versioning
- Date formats
- Deprecation information
