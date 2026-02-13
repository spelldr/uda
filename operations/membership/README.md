# Membership Module

Manage content access control, membership tiers, and audience segmentation.

## What This Module Adds

**Templates:**
- Membership Tier Definition
- Content Access Policy
- Audience Segmentation

**Metadata:**
- Access level (public, authenticated, tier-specific)
- Membership tier (free, basic, pro, enterprise)
- Content tier requirement
- Audience segment

**Validation:**
- Tier levels are recognized
- Access requirements are consistent
- No orphaned tier requirements (tier doesn't exist)

## When to Use This Module

- Tiered access to content (free vs. premium)
- Subscription-based documentation
- Audience segmentation
- Restricting advanced docs to specific users
- Multi-tier products with different doc levels

## Installation

In `uda.config.json`:

```json
{
  "operations": {
    "enabled": true,
    "modules": ["membership"]
  }
}
```

Then run:
```bash
npm run validate:all
```

## Example: Restricted Content

```yaml
---
type: "task"
title: "Enterprise Cluster Configuration"

# Core UDA
version: "1.0.0"

# Membership control
accessLevel: "pro"
requiresAuthentication: true
membershipTier: "pro"
---
```

Automatic access control:
- Free tier: ❌ Blocked
- Pro tier: ✅ Full access

## Templates Coming Soon

- membership-tier.template.md
- access-policy.template.md
- audience-segment.template.md

## Governance

See `governance/MEMBERSHIP_GOVERNANCE.md` for membership-specific rules.

## Resources

- [CREATING_MODULES.md](../CREATING_MODULES.md) — Create operational modules
- [operations/README.md](../README.md) — Operations overview
