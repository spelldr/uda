# UDA Validation Checklist

## For Reviewers: Pre-Merge Validation

Use this checklist when reviewing PRs that add or update UDA content.

### Automated Checks (CI/CD Must Pass First)

- [ ] JSON Schema validation passed (all required fields, correct types)
- [ ] Markdown lint passed (heading levels, list consistency, no line-length issues)
- [ ] Frontmatter validation passed (required fields: type, title, version)
- [ ] Filename validation passed (lowercase, hyphens, meaningful)

**If any automated check fails:** Request author fix before proceeding to manual review.

#### How to Trigger Automated Validation

**Locally (before pushing):**

```bash
# Install dependencies (one-time setup)
npm install

# Run all validators
npm run validate:schema          # Schema compliance check
npm run validate:frontmatter     # Frontmatter fields check
npm run validate:filenames       # Filename convention check
npm run lint:markdown            # Markdown style check
```

**Automatically on PR:**

When you push a PR to GitHub, the `.github/workflows/validate-uda.yml` workflow automatically runs:
1. All 4 checks above
2. Results posted as GitHub Check on PR
3. PR cannot merge if any check fails

**For Reviewers:**

If you see ❌ validation failures on a PR:
1. Check the GitHub Actions tab for detailed error messages
2. Link author to failing check (usually one line = one error)
3. Do not approve until all checks pass (GitHub enforces this)

---

---

## Manual Checks (Steward Verification)

### 1. Routing & Intent

- [ ] **Correct doc type?** Author routed through ROUTING.md decision tree correctly
  - Task: "How to do this?" → prescriptive steps
  - Concept: "What/why is this?" → mental models, schema
  - Reference: "Look up X" → key-value, no narrative
  - Troubleshooting: "I'm stuck with error X" → symptoms → causes → fixes
- [ ] **Single intent?** Doc doesn't blur multiple purposes
  - If Task + Concept mixed → request split
  - If Troubleshooting buried in Task → request extract
  - If Reference lookup in Concept → request separate Reference doc
- [ ] **Intent matches filename?** Filename clearly signals doc type (implicit or explicit)

### 2. Metadata Completeness

- [ ] **`type`** field correct (task | concept | reference | troubleshooting)
- [ ] **`title`** is human-readable and meaningful (min 1 char, max ~80)
- [ ] **`version`** matches repo version (semantic versioning, e.g., 1.0.0)
- [ ] **`tags`** present (optional but recommended for discoverability)
  - Suggestion: domain + intent (e.g., `["database", "tutorial"]`)
- [ ] **`body`** structured per doc type (not missing required fields)

### 3. Content Structure

#### For Task Documents

- [ ] **Prerequisites** section accurate (lists actual dependencies)
- [ ] **Steps** are numbered, one action per step
- [ ] **No conceptual deep-dives** in steps (link to Concept instead)
- [ ] **No troubleshooting** in steps (link to Troubleshooting instead)
- [ ] Optional `note` fields are actually notes (tips, warnings, not narrative)

#### For Concept Documents

- [ ] **Summary** is 1–2 sentences (core idea only)
- [ ] **Sections** have meaningful headings and content
- [ ] **No numbered procedures** (belongs in Task)
- [ ] **Explains "why/what"**, not "how to do"
- [ ] Related concepts mentioned; link to related docs

#### For Reference Documents

- [ ] **Entries** are key-value pairs (no narrative)
- [ ] **Keys** are consistent format (e.g., all HTTP codes, all config params)
- [ ] **Values** are factual, concise (not prose)
- [ ] Optional `note` fields clarify, not explain
- [ ] **No procedural steps** (belongs in Task)

#### For Troubleshooting Documents

- [ ] **Symptoms** are observable patterns (what the user sees)
- [ ] **Causes** explain why (linked to Concept if needed)
- [ ] **Resolutions** are fix attempts, ordered by likelihood/frequency
- [ ] Each resolution has optional `note` (warnings, pre-conditions)
- [ ] **Happy path procedures not here** (belongs in Task)

### 4. Language & Clarity

- [ ] **Title is specific** ("Deploy a Service" not "Deployment")
- [ ] **No ambiguous pronouns** ("it", "that")
- [ ] **Active voice preferred** ("Restart the server" not "The server should be restarted")
- [ ] **Jargon defined** or linked to Concept doc
- [ ] **Spelling & grammar** acceptable (markdown lint helps)

### 5. Cross-References & Linkage

- [ ] **Related docs linked** (e.g., Concept → Task, Task → Troubleshooting)
- [ ] **No orphaned docs** (standalone without context)
- [ ] **Links are valid** (point to existing docs, not imaginary files)
- [ ] **No circular dependencies** (A → B → A is okay for navigation, but check for confusion)

### 6. Domain & Folder Placement

- [ ] **Folder structure aligned with governance** (organized by domain, not doc type)
- [ ] **No new "misc", "other", or invented categories** created
- [ ] **Domain folder meaningful** (reflects business/technical domain)
- [ ] **No overly nested paths** (prefer shallow, ~3 levels max)

### 7. Versioning & Metadata

- [ ] **Version field matches current repo version** (not old/future versions)
- [ ] **Deprecated flag** only if actually deprecated (with migration path)
- [ ] **Tags are relevant** and consistent with existing tags
- [ ] **No personally identifying info** in metadata or content

---

## Common Rejection Reasons

### Red Flags (Request Changes)

❌ **Mixed intent** — "Here's how to set up X and also why X works"
→ Split into Task + Concept

❌ **Buried troubleshooting** — Task section: "If this fails, try..."
→ Extract to Troubleshooting doc, link from Task

❌ **Schema violation** — Missing required field, wrong type, unknown doc type
→ Auto-blocked by CI; author must fix

❌ **New folder structure invented** — "docs/guides/setup/best-practices/"
→ Violates flat domain structure; request reorganization

❌ **Title too vague** — "Stuff You Should Know"
→ Request specific, searchable title

❌ **No version** or wrong version — `version: "2.3"` (should match repo)
→ Request correction

❌ **Conceptual detail in Troubleshooting** — Resolution explains SSL/TLS theory
→ Extract theory to Concept, reference in Troubleshooting

### Yellow Flags (Request Clarification)

⚠️ **Weak cross-links** — No related docs mentioned
→ Request steward to add contextual links

⚠️ **Ambiguous tags** — `["info"]`, `["stuff"]`
→ Request more specific, domain-based tags

⚠️ **Long Task steps** — Single step > 3 sentences
→ Request split into sub-steps or link to Reference doc

⚠️ **Concept without examples** — Pure theory, no concrete analogy
→ Suggest adding 1–2 relatable examples

---

## Sign-Off

**Reviewer:** [Name]  
**Date:** [Date]  
**Result:** ☐ Approve | ☐ Request Changes | ☐ Reject

**Comments:**
```
[Detailed feedback, linking to ROUTING.md / VALIDATION.md sections if needed]
```

---

## Automation Supplement

**GitHub Actions workflow should validate:**

```yaml
- JSON Schema compliance (all docs)
- Markdown linting (headings, lists, line length)
- Filename format (lowercase, hyphens)
- Required frontmatter fields (type, title, version, body)
- No unresolved cross-references (future enhancement)
```

**Pre-commit hook (optional, for authors):**

```bash
# Run all validators locally before committing
npm run validate:schema && npm run validate:frontmatter && npm run validate:filenames && npm run lint:markdown
```

If any validator fails, fix the issues and re-run before pushing.

---

## Notes for Stewards

1. **Routing is your primary job.** Most rejections are intent-related, not grammar-related.
2. **Use ROUTING.md as arbitration.** When author disagrees with your classification, walk the decision tree together.
3. **Template consistency:** If you see authors repeatedly struggling with a section, the template may need clarification (escalate to GOVERNANCE review).
4. **Version discipline:** Ensure every merged doc reflects current repo version.
5. **Link health:** Quarterly, spot-check cross-references for validity.
