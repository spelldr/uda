---
type: "concept"
title: "[Title: What domain template structure do you want to create?]"
version: "1.0.0"
tags: []
domain: "template"
---

# Domain Template Pack

## Overview

This is a starter pack for building brand new UDA domain extensions.

**Start here if you want to create a custom domain** (not educational, api, or product).

## What is a Domain?

A domain extends UDA's 4 core types with **specialized templates, schemas, and governance** for a specific knowledge area.

**Examples:**
- Educational domain: adds "batting-cage" template + rubric validation
- API domain: adds "endpoint-spec" template + parameter validation  
- Product domain: adds "feature-guide" template + version tracking

## Creating Your Domain

### Step 1: Rename This Folder

```bash
cp -r domains/template domains/my-domain
```

### Step 2: Customize Templates

**File:** `domains/my-domain/templates/my-type.template.md`

Create templates for your new doc types. They extend core templates with domain-specific sections.

**Example (if you're building a "legal" domain):**

```markdown
---
type: "[legal-document-type]"
title: "[Your title]"
version: "1.0.0"
tags: []
domain: "legal"
---

# Legal Document

## Legal Notice

[Your domain-specific section]

## Related Documents

[Links to other docs by type]
```

### Step 3: Create Schema Extension

**File:** `domains/my-domain/schemas/my-domain-extension.schema.json`

This schema adds validation for domain-specific metadata:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Domain Extension",
  "type": "object",
  "properties": {
    "domain": {
      "const": "my-domain"
    },
    "myCustomField": {
      "type": "string",
      "description": "Custom field specific to my domain"
    }
  }
}
```

### Step 4: Create Governance

**File:** `domains/my-domain/governance/ROUTING_MY_DOMAIN.md`

Document how stewards should route domain-specific docs:

```markdown
# My Domain Routing

## My Custom Type

**Purpose:** What is this type for?

**Signal Phrases:**
- "..."

**Structure:**
- Section 1
- Section 2

**Anti-patterns:**
- What doesn't belong

**Examples:**
- Example 1
- Example 2
```

### Step 5: Add Examples

**File:** `domains/my-domain/examples/my-type-example.md`

Provide annotated examples showing how to use templates correctly.

### Step 6: Document the Domain

**File:** `domains/my-domain/README.md`

```markdown
# My Domain Pack

## Overview

What does this domain add to UDA?

## Templates

### My Custom Type

Structure and guidance.

## When to Use

- Use case 1
- Use case 2

## Installation

In uda.config.json:

```json
{
  "domains": {
    "available": ["my-domain"]
  }
}
```

## Examples

See examples/ folder
```

### Step 7: Register in Config

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
        "path": "schemas/plugins/my-domain-extension.schema.json"
      }
    ]
  }
}
```

And copy schema plugin:
```bash
cp domains/my-domain/schemas/my-domain-extension.schema.json \
   schemas/plugins/my-domain-extension.schema.json
```

### Step 8: Test

```bash
npm run validate:all 

# Should pass with your new domain schema
```

## Key Principles

1. **Never override core:** Add fields, never redefine `type`, `title`, `version`
2. **Namespace fields:** Use domain prefix to avoid conflicts (e.g., `legalMeta`, not `meta`)
3. **Document everything:** Templates, schema, governance, examples
4. **Schema validation:** Use JSON Schema extensions, not full replacement
5. **Start simple:** One new doc type is enough; don't try to replace all 4 core types

## Domain Checklist

- [ ] Folder renamed from `template` to `my-domain`
- [ ] Templates created with domain-specific sections
- [ ] Schema extension created and placed in `schemas/plugins/`
- [ ] Governance rules documented
- [ ] Examples provided and annotated
- [ ] README explains purpose and usage
- [ ] Registered in `uda.config.json`
- [ ] Validation passes: `npm run validate:all`
- [ ] Ready to commit or distribute

## Next Steps

- **Use locally:** Commit domain, enable in `uda.config.json`
- **Share widely:** Create repo `uda-domain-my-domain`, publish to npm
- **Iterate:** Version schema with MAJOR.MINOR.PATCH, document changes

See [domains/CREATING_DOMAINS.md](../CREATING_DOMAINS.md) for full guide.
