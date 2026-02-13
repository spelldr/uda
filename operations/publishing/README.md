# Publishing Module

Manage publishing workflows, approval gates, checklists, and distribution controls.

## What This Module Adds

**Templates:**
- Publishing Gate
- Pre-Publication Checklist
- Release Workflow

**Metadata:**
- Gate types (review, QA, legal, release)
- Approval requirements (who, how many, due dates)
- Gate status (blocked, pending, approved)
- Release tier (alpha, beta, production)

**Validation:**
- Gate types are recognized
- Approval chains are valid
- Required gates are defined
- Checklists are complete

## When to Use This Module

- Multi-stage publishing process (review → QA → release)
- Legal or compliance gates required
- Publishing checklist and tracking
- Content has staging (alpha/beta/prod versions)
- Distributed reviewing and approval

## Installation

In `uda.config.json`:

```json
{
  "operations": {
    "enabled": true,
    "modules": ["publishing"]
  }
}
```

Then run:
```bash
npm run validate:all
```

## Example: Publishing Gate

```yaml
---
type: "publishing-gate"
gateName: "Legal Review"
gateType: "legal"
blockers:
  - "legal-team approval"
  - "compliance check"
approvers:
  - "legal@company.com"
  - "compliance@company.com"
dueDate: "2025-03-15"
---
```

## Templates Coming Soon

- publishing-gate.template.md
- publishing-checklist.template.md
- publishing-workflow.template.md

## Governance

See `governance/PUBLISHING_GOVERNANCE.md` for publishing-specific rules.

## Resources

- [CREATING_MODULES.md](../CREATING_MODULES.md) — Create operational modules
- [operations/README.md](../README.md) — Operations overview
