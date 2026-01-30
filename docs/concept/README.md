# Concept Documents

This folder contains **Concept** docs (mental models and explanations). Use this folder for content that answers: **"What is X?"** or **"Why does X work?"**

## How to Proceed

1. **Confirm doc type:** Use [ROUTING.md](../../governance/ROUTING.md) to verify it belongs in Concept.
2. **Start from template:** Copy [templates/concept.template.md](../../templates/concept.template.md).
3. **Name the file:** Use lowercase + hyphens. Example: `concept-raid-levels.md`.
4. **Fill frontmatter:** Ensure `type: "concept"`, title, version, and tags are set.
5. **Write sections:** Explain ideas, trade-offs, relationships. No steps.
6. **Link related docs:** Add links to related Task/Reference/Troubleshooting docs at the end.

## Rules

- **No procedures** (belongs in Task).
- **No lookup tables** (belongs in Reference).
- **No error recovery** (belongs in Troubleshooting).

## Validation

Run:

- `npm run validate:frontmatter`
- `npm run validate:filenames`
- `npm run validate:schema`
- `npm run lint:markdown`

See [VALIDATION.md](../../governance/VALIDATION.md) for the full checklist.
