# Creating Custom Operational Modules

An operational module extends UDA with business-focused templates, schemas, and processes for publishing, membership, finance, or custom workflows.

## When to Create an Operational Module

- You need to track publishing workflows, approvals, or gates
- You manage content access, membership tiers, or monetization
- You need financial tracking, cost attribution, or ROI calculation
- You have custom operational processes beyond provided modules

## Available Base Modules

| Module | Purpose |
|---|---|
| **publishing** | Publishing gates, workflows, distribution checklists |
| **membership** | Access control, tiering, membership levels |
| **finance** | Revenue tracking, licensing, cost attribution |
| **content-management** | Lifecycle, deprecation, review cycles, SEO |

## Structure

```
operations/my-module/
├── README.md                        # Module documentation
├── templates/
│   └── workflow.template.md         # Custom templates
├── schemas/
│   └── my-module-extension.schema.json
└── examples/
    └── workflow-example.md
```

## Step 1: Scaffold Module

```bash
mkdir -p operations/my-module/{templates,schemas,examples}
```

## Step 2: Create Templates

**File:** `operations/my-module/templates/workflow.template.md`

```markdown
---
type: "workflow"
title: "[Title]"
version: "1.0.0"
tags: []
operationalModule: "my-module"
---

# Workflow Template

## Purpose

What operational process does this document?

---

## Workflow Steps

1. **Step 1** — Description
2. **Step 2** — Description

---

## Governance

Who approves? What gates check?

---

## Metrics

How is this workflow measured?
```

## Step 3: Create Schema Extension

**File:** `operations/my-module/schemas/my-module-extension.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Module Extension",
  "description": "Extends UDA with operational metadata",
  "type": "object",
  "properties": {
    "operationalModule": {
      "const": "my-module"
    },
    "operationalMeta": {
      "type": "object",
      "properties": {
        "owner": { "type": "string" },
        "approvers": { "type": "array", "items": { "type": "string" } },
        "sla": { "type": "string" }
      }
    }
  }
}
```

## Step 4: Register Module

**File:** `uda.config.json`

```json
{
  "structure": {
    "operations": {
      "enabled": true,
      "modules": ["my-module"]
    }
  },
  "schemas": {
    "plugins": [
      {
        "name": "my-module",
        "path": "schemas/plugins/my-module-extension.schema.json"
      }
    ]
  }
}
```

## Step 5: Copy Schema Plugin

```bash
cp operations/my-module/schemas/my-module-extension.schema.json \
   schemas/plugins/my-module-extension.schema.json
```

## Step 6: Create Module README

**File:** `operations/my-module/README.md`

```markdown
# My Module

## Overview

What operational processes does this module manage?

## Templates

### Workflow Template

Purpose, when to use, structure.

## Governance

How are operations governed within this module?

## Metrics & Tracking

What KPIs does this module track?

## Installation

In `uda.config.json`:

```json
{
  "operations": {
    "modules": ["my-module"]
  }
}
```

## Examples

See [examples/](examples/) folder

## Integration

How does this module integrate with publishing, membership, or analytics?
```

## Step 7: Test Integration

```bash
npm run validate:all

# Verify core + operational schema composition
```

## Common Operational Modules

### Custom Publishing Gate

**Module:** `operations/quality-gate`

```json
{
  "type": "quality-check",
  "gateType": "review",
  "minimumReviewers": 2,
  "requiresTests": true,
  "blockers": []
}
```

### Custom Membership Tier

**Module:** `operations/subscription-tier`

```json
{
  "type": "access-policy",
  "tier": "premium",
  "requiredSubscriptionLevel": "pro",
  "contentFamily": "advanced-tutorials"
}
```

### Custom Financial Tracking

**Module:** `operations/project-cost`

```json
{
  "type": "cost-record",
  "projectId": "proj-123",
  "authorHours": 40,
  "reviewerHours": 10,
  "costCenter": "engineering"
}
```

## Best Practices

1. **Separate concerns:** Each module handles one operational domain
2. **Schema composition:** Always extend via JSON Schema `$ref`, not override
3. **Documentation:** Include examples and governance rules
4. **Metrics:** Define how success is measured
5. **Integration:** Explain how module connects to other systems

## Publishing Your Module

### For Local Use
1. Commit to repo
2. Reference in `uda.config.json`

### For Sharing
1. Create repo: `uda-operations-my-module`
2. Follow module structure
3. Comprehensive README + examples
4. Tag: `uda-operations`, `uda`, `my-module`

### To npm

```bash
npm init    # Create package.json

# Inside package.json
{
  "name": "@uda/operations-my-module",
  "version": "1.0.0",
  "keywords": ["uda", "uda-operations", "my-module"],
  "files": ["templates/", "schemas/", "examples/", "README.md"]
}

npm publish
```

Then install:
```bash
npm install @uda/operations-my-module
```

## Checklist

- [ ] Templates created and follow pattern
- [ ] Schema extension created
- [ ] Registry entry added (if distributing)
- [ ] Registered in `uda.config.json`
- [ ] Validation passes
- [ ] README documents purpose and usage
- [ ] Examples provided
- [ ] Integration points documented
- [ ] Ready for local or public use
