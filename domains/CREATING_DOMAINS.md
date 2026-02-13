# Creating a Custom UDA Domain

A domain pack is a self-contained extension to UDA with specialized templates, schemas, and governance.

## When to Create a Domain

- You need doc types beyond the 4 core types (task, concept, reference, troubleshooting)
- You want to enforce domain-specific metadata or validation
- You're building a reusable template for multiple projects

## Structure

```
domains/my-domain/
├── README.md                        # Domain documentation
├── templates/
│   └── my-type.template.md          # Custom template
├── schemas/
│   └── my-domain-extension.schema.json
├── governance/
│   └── ROUTING_MY_DOMAIN.md         # Domain-specific routing rules
└── examples/
    └── my-type-example-annotated.md
```

## Step 1: Copy Template Domain

```bash
cp -r domains/template domains/my-domain
```

## Step 2: Create Templates

**File:** `domains/my-domain/templates/my-type.template.md`

```markdown
---
type: "my-type"
title: "[Title]"
version: "1.0.0"
tags: []
domain: "my-domain"
---

# My Type Template

## Overview

What does this doc accomplish?

---

## Core Content

Describe the structure here.

---

## Notes for Authors

- Explain when to use this type
- Link to governance rules
```

## Step 3: Create Schema Extension

**File:** `domains/my-domain/schemas/my-domain-extension.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Domain Extension",
  "description": "Extends UDA core with my-type doc type",
  "type": "object",
  "properties": {
    "type": {
      "enum": ["my-type"]
    },
    "domain": {
      "const": "my-domain"
    },
    "domainMeta": {
      "type": "object",
      "properties": {
        "myField": { "type": "string" }
      }
    }
  }
}
```

## Step 4: Create Domain Governance

**File:** `domains/my-domain/governance/ROUTING_MY_DOMAIN.md`

```markdown
# My Domain Routing

## My Type

**Purpose:** What is this type for?

**Signal Phrases:**
- "..."
- "..."

**Structure:**
- Section 1
- Section 2

**Anti-patterns:**
- What doesn't belong here

**Examples:**
- Example 1
- Example 2
```

## Step 5: Register in Configuration

**File:** `uda.config.json`

```json
{
  "structure": {
    "domains": {
      "available": ["my-domain"]
    }
  },
  "schemas": {
    "plugins": [
      {
        "name": "my-domain",
        "path": "schemas/plugins/my-domain-extension.schema.json",
        "required": false
      }
    ]
  }
}
```

## Step 6: Copy Schema Plugin

```bash
cp domains/my-domain/schemas/my-domain-extension.schema.json \
   schemas/plugins/my-domain-extension.schema.json
```

## Step 7: Create Example

**File:** `domains/my-domain/examples/my-type-example-annotated.md`

Provide a fully annotated example document showing how to use the new type.

## Step 8: Create Domain README

**File:** `domains/my-domain/README.md`

```markdown
# My Domain Pack

## Overview

What does this domain add to UDA?

## Doc Types

### My Type

Purpose and usage.

## When to Use This Domain

- Use case 1
- Use case 2

## Installation

In `uda.config.json`:

```json
{
  "structure": {
    "domains": {
      "available": ["my-domain"]
    }
  }
}
```

## Governance

See [ROUTING_MY_DOMAIN.md](governance/ROUTING_MY_DOMAIN.md)

## Examples

See [examples/](examples/) folder
```

## Step 9: Test Validation

```bash
npm run validate:all

# Should pass core + my-domain schema validation
```

## Distributing Your Domain

### For Local Use
1. Commit to your repo
2. Document in project README

### For Sharing
1. Create separate repo: `uda-domain-my-domain`
2. Follow domain folder structure
3. Include installation instructions
4. Tag: `uda-domain`, `my-domain`

### Publishing to npm

```bash
# In domain repo
npm init

# Inside package.json
{
  "name": "@uda/domain-my-domain",
  "version": "1.0.0",
  "description": "...",
  "keywords": ["uda", "uda-domain", "my-domain"],
  "files": ["templates/", "schemas/", "governance/", "examples/", "README.md"]
}

npm publish
```

Then install:
```bash
npm install @uda/domain-my-domain
```

And reference in `uda.config.json`:
```json
{
  "schemas": {
    "plugins": [
      {
        "name": "my-domain",
        "path": "node_modules/@uda/domain-my-domain/schemas/extension.schema.json"
      }
    ]
  }
}
```

## Checklist

- [ ] Templates created and follow pattern
- [ ] Schema extension created and composes with core
- [ ] Governance rules documented
- [ ] Examples provided and annotated
- [ ] Registered in `uda.config.json`
- [ ] Validation passes: `npm run validate:all`
- [ ] README explains purpose and usage
- [ ] Ready for local or public distribution
