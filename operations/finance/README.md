# Finance Module

Track revenue, costs, licensing, and ROI for documentation.

## What This Module Adds

**Templates:**
- Revenue Record
- Cost Record
- License Agreement

**Metadata:**
- Revenue model (subscription, licensing, one-time)
- Cost center and budget
- Revenue and cost attribution
- ROI calculation
- Licensing terms and renewals

**Validation:**
- Revenue models are recognized
- Cost calculations are positive
- Dateformats are valid (ISO 8601)
- ROI metrics are reasonable

## When to Use This Module

- Monetizing documentation
- Tracking ROI per content piece
- Cost attribution to documentation projects
- Managing licensing agreements
- Financial reporting on content operations

## Installation

In `uda.config.json`:

```json
{
  "operations": {
    "enabled": true,
    "modules": ["finance"]
  }
}
```

Then run:
```bash
npm run validate:all
```

## Example: Monetized Content

```yaml
---
type: "concept"
title: "Advanced Kubernetes Architecture"

# Finance tracking
revenueModel: "subscription"
costCenter: "engineering-docs"
authorHours: 40
reviewerHours: 10
estimatedRevenue: 5000
roi: 1.25
---
```

Automatic tracking:
- **Cost:** $2,450 (90 hours @ $25/hr + overhead)
- **Revenue:** $5,000
- **ROI:** 1.25x

## Templates Coming Soon

- revenue-record.template.md
- cost-record.template.md
- license-agreement.template.md

## Governance

See `governance/FINANCE_GOVERNANCE.md` for finance-specific rules.

## Resources

- [CREATING_MODULES.md](../CREATING_MODULES.md) — Create operational modules
- [operations/README.md](../README.md) — Operations overview
