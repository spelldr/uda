# Reference Documents

This folder contains **Reference** docs (lookup data and facts). Use this folder for content that answers: **"Look up X"** or **"What does X mean?"**

## How to Proceed

1. **Confirm doc type:** Use [ROUTING.md](../../governance/ROUTING.md) to verify it belongs in Reference.
2. **Start from template:** Copy [templates/reference.template.md](../../templates/reference.template.md).
3. **Name the file:** Use lowercase + hyphens. Example: `reference-hardware-specs-r710.md`.
4. **Fill frontmatter:** Ensure `type: "reference"`, title, version, and tags are set.
5. **Use key-value entries:** No narrative, no steps.
6. **Link related docs:** Add links to related Task/Concept/Troubleshooting docs at the end.

## Rules

- **No procedures** (belongs in Task).
- **No conceptual deep dives** (belongs in Concept).
- **No error diagnosis** (belongs in Troubleshooting).

## Validation

Run:

- `npm run validate:frontmatter`
- `npm run validate:filenames`
- `npm run validate:schema`
- `npm run lint:markdown`

See [VALIDATION.md](../../governance/VALIDATION.md) for the full checklist.
