# Content Management Module

Manage content lifecycle, deprecation, review schedules, and search optimization.

## What This Module Adds

**Templates:**
- Content Lifecycle Policy
- Review Schedule
- Deprecation Notice

**Metadata:**
- Content owner
- Creation and last review dates
- Next review due date
- Deprecation and sunset dates
- Search keywords and SEO
- Content status (active, stale, deprecated, archived)

**Validation:**
- Owner email is valid
- Review dates are chronological
- Sunset date is after deprecation date
- Search keywords are populated

## When to Use This Module

- Large documentation libraries (200+ docs)
- Content needs regular review cycles
- Tracking content age and staleness
- Managing deprecations and retirements
- Search optimization (SEO, keywords)
- Content ownership tracking

## Installation

In `uda.config.json`:

```json
{
  "operations": {
    "enabled": true,
    "modules": ["content-management"]
  }
}
```

Then run:
```bash
npm run validate:all
```

## Example: Content Lifecycle

```yaml
---
type: "task"
title: "Deploy a Microservice"
version: "1.0.0"

# Content management
contentOwner: "alice@company.com"
createdDate: "2024-01-15"
lastReviewDate: "2025-02-10"
nextReviewDue: "2025-05-10"

# Deprecated docs track sunset
deprecated: false
deprecatedDate: null
sunsetDate: null
replacementDoc: null

# Search optimization
searchKeywords: ["deployment", "microservices", "docker"]
seoTitle: "Deploy a Microservice to Production"
canonicalUrl: "https://docs.example.com/deploy-microservice"
---
```

Automatic tracking:
- **Last review:** 3 days ago (current)
- **Next review due:** May 10, 2025
- **Status:** Active

## Templates Coming Soon

- lifecycle-policy.template.md
- review-schedule.template.md
- deprecation-notice.template.md

## Governance

See `governance/CONTENT_MANAGEMENT_GOVERNANCE.md` for content management rules.

## Resources

- [CREATING_MODULES.md](../CREATING_MODULES.md) — Create operational modules
- [operations/README.md](../README.md) — Operations overview
