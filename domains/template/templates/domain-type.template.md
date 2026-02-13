---
type: "concept"
title: "[Title: What concept does this domain-specific template explain?]"
version: "1.0.0"
tags: []
domain: "[your-domain]"
domainMeta:
  customField: "value"
---

# Domain Type Template

Replace this entire template with your domain's structure.

## How to Customize This Template

1. **Change the frontmatter:** Replace `domain` and `domainMeta` fields with your domain's metadata
2. **Add domain-specific sections:** Structure your template with sections meaningful to your domain
3. **Document each section:** Include author notes explaining what goes in each section
4. **Keep core fields:** Never remove `type`, `title`, `version` — those are immutable

## Example Domain Sections

If this is an "educational" domain template:

```
---
type: "concept"
domain: "educational"
rubricSchema: "beginner"
prerequisites: ["basic-python"]
---

# Concept

## Learning Objectives

What should learners understand after reading this?

## Content

Explain the concept clearly.

## Practice Exercise

Link to a batting cage exercise.

## Related Concepts

Links to other concepts.
```

If this is a "legal" domain template:

```
---
type: "concept"
domain: "legal"
reviewedBy: "[legal-team]"
approvalDate: "YYYY-MM-DD"
---

# Legal Concept

## Legal Notice

Important legal notice.

## Definition

Clear definition of the legal concept.

## Jurisdiction

Which jurisdictions does this apply to?

## References

Links to statutes, regulations, precedents.
```

## Notes for Authors

- **Frontmatter matters:** Add domain-specific fields here, not in body
- **Keep it focused:** One concept per document
- **Link related:** Connect to related concepts, tasks, references
- **Validate:** `npm run validate:all` checks your domain schema

---

## How to Use This File

1. Rename to something meaningful (e.g., `my-concept.template.md`)
2. Customize the sections for your domain
3. Add domain-specific guidance in "Notes for Authors"
4. Use it as a template for contributors
5. Store in `domains/my-domain/templates/`
