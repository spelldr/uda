# Task Documents

This folder contains **Task** docs (procedural, step-by-step). Use this folder for content that answers: **"How do I do X?"**

## How to Proceed

1. **Confirm doc type:** Use [ROUTING.md](../../governance/ROUTING.md) to verify it belongs in Task.
2. **Start from template:** Copy [templates/task.template.md](../../templates/task.template.md).
3. **Name the file:** Use lowercase + hyphens. Example: `task-install-dell-r710.md`.
4. **Fill frontmatter:** Ensure `type: "task"`, title, version, and tags are set.
5. **Write steps:** One action per step. No concepts or troubleshooting here.
6. **Link related docs:** Add links to related Concept/Reference/Troubleshooting docs at the end.

## Rules

- **No theory or definitions** (belongs in Concept).
- **No error recovery** (belongs in Troubleshooting).
- **No lookup tables** (belongs in Reference).

## Validation

Run:

- `npm run validate:frontmatter`
- `npm run validate:filenames`
- `npm run validate:schema`
- `npm run lint:markdown`

See [VALIDATION.md](../../governance/VALIDATION.md) for the full checklist.
