# Troubleshooting Documents

This folder contains **Troubleshooting** docs (symptoms → causes → fixes). Use this folder for content that answers: **"Why am I stuck?"**

## How to Proceed

1. **Confirm doc type:** Use [ROUTING.md](../../governance/ROUTING.md) to verify it belongs in Troubleshooting.
2. **Start from template:** Copy [templates/troubleshooting.template.md](../../templates/troubleshooting.template.md).
3. **Name the file:** Use lowercase + hyphens. Example: `troubleshooting-r710-boot-failures.md`.
4. **Fill frontmatter:** Ensure `type: "troubleshooting"`, title, version, and tags are set.
5. **Write symptoms/causes/resolutions:** No happy-path procedures.
6. **Link related docs:** Add links to related Task/Concept/Reference docs at the end.

## Rules

- **No happy-path procedures** (belongs in Task).
- **No conceptual background** (belongs in Concept).
- **No lookup tables** (belongs in Reference).

## Validation

Run:

- `npm run validate:frontmatter`
- `npm run validate:filenames`
- `npm run validate:schema`
- `npm run lint:markdown`

See [VALIDATION.md](../../governance/VALIDATION.md) for the full checklist.
