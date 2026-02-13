# UDA Governance

## Authority & Decision-Making

### Content Steward Role

**Responsibility:** Maintain UDA doctrine and prevent entropy.

**Authority:**

- Enforce routing discipline (reject mixed-intent docs)
- Approve exceptions to folder rules (content stays under docs/task, docs/concept, docs/reference, docs/troubleshooting)
- Reject docs that violate schema constraints
- Resolve doc-type ambiguities using ROUTING.md decision tree
- Retire obsolete content
- Update templates when they drift from practice

**Accountability:** Steward is accountable for maintainability as doc volume grows.

---

## Contributing Requirements

### Before You Write

1. **Read ROUTING.md** — Determine your doc type using the decision tree
2. **Use the correct template** — Match your doc type (task, concept, reference, troubleshooting)
3. **Check VALIDATION.md** — Understand review criteria
4. **Use the filename convention** — Loose but meaningful (e.g., `task-database-schema-migration.md`, `concept-microservices-architecture.md`)

### During Review

**Steward must verify:**

- [ ] Correct doc type (passes ROUTING.md decision tree)
- [ ] Schema compliance (JSON Schema validates successfully)
- [ ] No mixed intents in body
- [ ] Metadata complete (type, title, version, tags)
- [ ] Filename meaningful and lowercase with hyphens
- [ ] Links to related docs (cross-references)
- [ ] No "misc" or invented categories

**Red flags:**

- Doc satisfies multiple purposes → Request split
- Author created new folder structure → Request alignment with governance
- Task contains conceptual deep-dives → Extract to Concept doc
- Troubleshooting buried in Task steps → Extract to Troubleshooting doc

---

## Versioning Strategy

**Whole-repo versioning** (all docs, templates, schema versioned together).

**Semantic versioning format:** `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking change to doc structure or schema (e.g., new required field)
- **MINOR:** New template, new doc type, doc additions/enhancements
- **PATCH:** Doc updates, clarifications, typo fixes, template wording improvements

**Version field in each doc:** Reflects the repo version when the doc was created/updated.

**Governance change cycle:**

- Changes to ROUTING.md, templates, or schema require GOVERNANCE review
- Semantic version bump triggers repo-wide changelog
- Existing docs inherit new version on edit/review

---

## Lifecycle Management

### Ingestion (New Content)

1. **Author** classifies using ROUTING.md → selects template
2. **Author** fills template, follows naming convention
3. **PR reviewer (Steward)** validates schema + intent + metadata
4. **Merge** → content enters "Active" state

### Maintenance (Active Content)

- **Quarterly review:** Steward scans for obsolescence, updates version if needed
- **Link integrity:** Cross-references remain valid
- **Schema drift:** Docs remain compliant with current schema

### Deprecation

- **Signal:** Add frontmatter field: `deprecated: true`, with date
- **Timeline:** Keep deprecated doc visible for 2 versions
- **Redirect:** Steward creates redirection note pointing to replacement

### Retirement

- **Trigger:** Deprecated 2+ versions ago AND no active links
- **Action:** Archive to `_archive/` folder with timestamp
- **Record:** Add entry to CHANGELOG.md with retirement date

---

## Enforcement Mechanisms

### Automated (CI/CD)

- [ ] JSON Schema validation on PR (blocks merge if invalid)
- [ ] Markdown linting (enforces heading levels, list consistency)
- [ ] Filename validation (lowercase, hyphens)
- [ ] Frontmatter required fields check

### Manual (Human Review)

- [ ] Routing decision tree applied by Steward
- [ ] No mixed intents
- [ ] Cross-links meaningful and accurate
- [ ] Metadata sensible (tags, version)

### Process

1. **Author** pushes PR with new/updated doc
2. **GitHub Actions** runs schema + lint validation (auto-fail if violated)
3. **Steward** reviews for routing/intent/governance (may request changes)
4. **Merge** only after automated + manual checks pass

---

## Conflict Resolution

### "I think this should be a Task, but you say it's Concept"

**Process:**

1. Both parties reference ROUTING.md decision tree
2. Walk through Decision 1, 2, 3 together
3. If still ambiguous: **Primary intent wins** — what would 80% of readers search for?
4. If genuinely dual-intent: **Split into two docs** with cross-links

### "Can I create a new folder called 'Setup & Configuration'?"

**Answer:** No. Content lives under `docs/` by type (`task`, `concept`, `reference`, `troubleshooting`). Use tags to capture topic or domain. Don't invent new folders.

### "Can I deviate from the template?"

**Answer:** Only with Steward approval. Templates enforce consistency and reduce contributor cognitive load. Deviations require governance review and may trigger template updates.

---

## Escalation Path

1. **First disagreement:** Discuss with Steward using ROUTING.md as arbiter
2. **Persistent disagreement:** Steward makes binding call (role grants authority)
3. **Steward decision seems wrong:** Escalate to (project lead / team lead) for review
4. **Appeals process:** (Define in your team's governance; this is a template)

---

## Metrics & Health

**Track these quarterly:**

- **Entropy index:** Fraction of docs that violate routing or schema (target: < 2%)
- **Coverage:** Major topics represented? Are there orphaned docs?
- **Staleness:** Docs not updated in 6+ months (may need review)
- **Merge velocity:** PR review time (target: < 48 hours for Steward)

---

## Updates to This Document

**Process:** Edit GOVERNANCE.md, propose in PR, discuss with team, merge after consensus.

**When to update:**

- New rules discovered in practice
- Roles/authority structure changes
- Enforcement mechanisms added/removed
- Escalation path clarified
