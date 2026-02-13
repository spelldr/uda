# Operational Infrastructure

Optional modules for business operations: publishing, membership, finance, and content management.

## Overview

As documentation scales beyond authoring, operational concerns emerge:

- **Publishing:** Approval gates, workflows, distribution checklists
- **Membership:** Access control, content tiering, monetization
- **Finance:** Revenue tracking, cost attribution, ROI, licensing
- **Content Management:** Lifecycle tracking, deprecation, review cycles, SEO

Operational modules extend UDA with templates and schemas for these concerns.

## Available Modules

| Module | Purpose | When to Use |
|---|---|---|
| **publishing** | Workflows, gates, checklists | Every staged publishing process |
| **membership** | Access control, tiers, monetization | Subscription/tiered content |
| **finance** | Revenue, licensing, cost tracking | Monetized or cost-attributed docs |
| **content-management** | Lifecycle, deprecation, search | Large doc libraries with reviews |

## Quick Start

### Enable Operations

In `uda.config.json`:

```json
{
  "structure": {
    "operations": {
      "enabled": true,
      "modules": ["publishing", "membership"]
    }
  }
}
```

Validate:
```bash
npm run validate:all
```

### Use Operational Templates

```bash
cp operations/publishing/templates/checklist.template.md \
   operations/publishing/my-checklist.md

# Edit frontmatter and body
# type: "publishing-gate" or "publishing-checklist"
```

### Track Operational Metadata

Docs automatically gain operational fields:

```yaml
---
type: "task"
title: "Deploy Application"
version: "1.0.0"

# Publishing metadata
publishingGate: "requires-review"
requiresQA: true
isExperimental: false

# Membership metadata
audienceTier: "premium"

# Content management
contentOwner: "alice@example.com"
lastReviewDate: "2025-01-20"
nextReviewDue: "2025-04-20"
---
```

## Module Directory

### publishing/

Publishing workflows, approval gates, distribution checklists.

**Templates:**
- `gate.template.md` — Publishing gate definition (review, QA, legal)
- `checklist.template.md` — Pre-publication checklist
- `workflow.template.md` — Multi-stage publishing workflow

**Schema:**
- Gate metadata (type: "review|qa|legal|release")
- Approver tracking (approval status, date, comments)
- Release gates (blockers, required sign-offs)

**Use When:**
- Multiple approval stages before publication
- QA or legal gates required
- Need release checklists and tracking
- Staged publishing (alpha → beta → production)

### membership/

Content access control, membership tiers, monetization.

**Templates:**
- `tier.template.md` — Membership tier definition
- `access-policy.template.md` — Content access rules
- `monetization-model.template.md` — Pricing and licensing strategy

**Schema:**
- Access metadata (public|authenticated|tier-specific)
- Tier tracking (free|basic|pro|enterprise)
- Monetization (revenueModel, bundleId, pricing)

**Use When:**
- Tiered content (free vs. premium)
- Subscription-based documentation
- Need to restrict content by membership level
- Tracking content by user segment

### finance/

Revenue tracking, licensing, cost attribution, ROI.

**Templates:**
- `revenue-record.template.md` — Revenue attributed to content
- `cost-record.template.md` — Content creation/maintenance costs
- `license.template.md` — Licensing agreements and terms

**Schema:**
- Financial metadata (revenue, cost, margin, ROI)
- Licensing (licenseType, licensee, term, renewal)
- Cost center tracking (costCenter, owner, budget)

**Use When:**
- Monetizing documentation
- Tracking ROI per content piece
- Managing licensing agreements
- Attributing costs to documentation

### content-management/

Lifecycle tracking, deprecation, review cycles, SEO.

**Templates:**
- `lifecycle-policy.template.md` — Content lifecycle definition
- `review-schedule.template.md` — Review cycles and owners
- `deprecation-notice.template.md` — Deprecation and migration path

**Schema:**
- Lifecycle metadata (contentOwner, createdDate, lastReviewDate, nextReviewDue)
- Deprecation tracking (deprecatedDate, sunsetDate, replacementDoc)
- Search optimization (searchKeywords, canonicalUrl, seoTitle)

**Use When:**
- Large doc libraries needing regular review
- Content has variable lifespans (some docs age faster)
- Need SEO optimization
- Managing content deprecation and retirement

## Combining Modules

Use multiple modules in one project:

```json
{
  "structure": {
    "operations": {
      "enabled": true,
      "modules": ["publishing", "membership", "content-management"]
    }
  }
}
```

Schemas compose automatically. Use module templates and metadata as needed.

## Governance

Each module includes governance rules defining:

- Who makes operational decisions
- What gates exist and who approves
- SLAs and timelines
- Metrics and success criteria

**See:** `module/governance/OPERATIONS.md` in each module.

## Creating Custom Modules

See [CREATING_MODULES.md](CREATING_MODULES.md) for guide on:

- Building custom operational workflows
- Defining custom schema extensions
- Integrating with publishing/membership/finance systems
- Distributing operational modules

## Module Lifecycle

### Ingestion
1. Create operational doc (gate checklist, policy, agreement)
2. Fill relevant templates
3. Gain operational metadata via schema

### Maintenance
1. Monitor status (gates, approvals, reviews)
2. Update lifecycle dates (review due, sunset, etc.)
3. Track metrics (cost, revenue, engagement)

### Reporting
1. Generate operational reports (publishing gates passed, revenue, costs)
2. Analytics dashboards (content by tier, review health)
3. Financial summaries (ROI, licensing revenue, cost allocation)

## Integration with Automation

Operational data integrates with CI/CD pipelines:

```yaml
# .github/workflows/publish.yml
- name: Check Publishing Gate
  run: npm run check-gate -- docs/task/my-task.md
  # Verifies all required approvals, QA, legal gates are met
  
- name: Update Content Metrics
  run: npm run analytics:update
  # Tracks publish date, audience tier, cost center
```

## Best Practices

1. **Governance first:** Define operational processes before tracking metadata
2. **Right-sizing:** Don't require operational metadata unless genuinely needed
3. **Clarity:** Document who owns what decisions (steward, approver, owner)
4. **Metrics:** Define success criteria per gate and module
5. **Automation:** Automate tracking and reporting (don't manually track metadata)

## Example: Publishing Workflow

1. **Author** creates doc, tags with `publishingGate: "review"`
2. **Reviewer 1** checks for content quality, approves
3. **QA** validates examples and links, approves
4. **Legal** (if required) reviews for compliance, approves
5. **CI/CD** runs checklist validation
6. **Automation** publishes to production, logs publish event

## Example: Tiered Content

```yaml
---
type: "task"
title: "Advanced Cluster Configuration"

# Core UDA
version: "1.0.0"

# Membership tier control
audienceTier: "premium"
requiresAuth: true

# Content management
contentOwner: "engineering-team"
nextReviewDue: "2025-06-30"
---
```

Automatic access control:
- Free tier: ❌ Blocked, "upgrade to view"
- Premium tier: ✓ Full access

## Resources

- [CREATING_MODULES.md](CREATING_MODULES.md) — Build custom operational modules
- [uda.config.json](../uda.config.json) — Configuration reference
- [ARCHITECTURE.md](../ARCHITECTURE.md) — Multi-layer architecture overview
- [automation/](../automation/) — CI/CD pipeline templates and analytics
