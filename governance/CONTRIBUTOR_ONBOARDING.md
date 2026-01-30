# UDA Contributor Onboarding

Welcome to the Unified Documentation Architecture. This guide walks you through the mindset, tools, and rules so you can write docs that scale.

---

## Part 1: The Philosophy (15 min read)

### Why UDA Exists

Documentation fails when it overloads the reader's brain. UDA prevents this by:

1. **Separating concerns** — Each doc type has one purpose (Task, Concept, Reference, Troubleshooting)
2. **Predictable structure** — You know what to expect before you search
3. **Enforced discipline** — Templates and rules keep docs maintainable as volume grows

**Key insight:** A mixed-intent document is worse than two focused documents. Users searching "how do I X?" don't want theory. Users searching "what is X?" don't want steps.

### The Four Doc Types (Cognitive Science Foundation)

Read **[UDA Foundations and Scientific Basis.md](../UDA%20Foundations%20and%20Scientific%20Basis.md)** for the deep dive. TL;DR:

| Doc Type            | Purpose               | Reader Intent     | Cognitive Load                      |
| ------------------- | --------------------- | ----------------- | ----------------------------------- |
| **Task**            | Execute procedure A→B | "How do I...?"    | Minimize steps; assume success      |
| **Concept**         | Build mental models   | "What/why is...?" | Build schema; explain relationships |
| **Reference**       | Lookup factual data   | "Look up X"       | Fast retrieval; no narrative        |
| **Troubleshooting** | Error recovery        | "Why am I stuck?" | Map symptoms → causes → fixes       |

**The rule:** One doc = one primary purpose. If you're torn between two, write two docs and link them.

---

## Part 2: Routing Your Contribution (10 min)

### Use the Decision Tree

Go to [ROUTING.md](./ROUTING.md) and walk through the three questions:

1. **Is this about _how to do something_?** → Task
2. **Is this about _why/what something is_?** → Concept
3. **Is the user _stuck or in error_?** → Troubleshooting

**Do this before you write.** Routing determines your template.

### Common Confusions

**Q: I'm writing a "Getting Started Guide" — Task or Concept?**

A: Usually **Task** (step-by-step procedure). If you're also explaining concepts deeply, **split it**: quick-start Task + deeper Concept doc, linked together.

**Q: "Configuration Reference" — Reference or Task?**

A: **Reference** (lookup what each config option means) + **Task** (how to configure) as separate docs.

**Q: Troubleshooting embedded in Task?**

A: **Extract it.** Tasks assume success. Failures get their own Troubleshooting doc driven by symptom.

---

## Part 3: Write Your Doc (30 min)

### Step 1: Pick Your Template

Go to `templates/` folder:

- `task.template.md` — You're writing a procedure
- `concept.template.md` — You're explaining something
- `reference.template.md` — You're listing lookup data
- `troubleshooting.template.md` — You're recovering from an error

Copy the template, rename it meaningfully (e.g., `task-database-backup.md`).

### Step 2: Fill in the Frontmatter

```yaml
---
type: "task" # Must match your doc type
title: "Deploy a Service" # Specific, searchable title
version: "1.0.0" # Repo semantic version
tags: ["deployment", "microservices"] # Topic + intent
---
```

**Notes on fields:**

- `type`: Must be one of: `task`, `concept`, `reference`, `troubleshooting`
- `title`: Be specific. "Deployment" not "Stuff". Users search for exact titles.
- `version`: Match the repo version you're editing in (ask Steward if unsure)
- `tags`: Use 2–3 tags. First tag = topic (e.g., "database"). Second = intent/type signal.

### Step 3: Fill in the Body

**For Task:**

```yaml
body:
  prerequisites:
    - "Have AWS credentials configured"
    - "Install Docker"
  steps:
    - text: "Run 'aws login'"
      note: "You'll see a browser popup"
    - text: "Type 'docker build -t myapp .'"
      note: "This takes 2–3 minutes"
```

→ **One action per step.** No narrative. Optional notes = warnings/tips only.

**For Concept:**

```yaml
body:
  summary: "Microservices are independently deployable services communicating via APIs, enabling team autonomy and technology diversity."
  sections:
    - heading: "Trade-offs"
      content: "Microservices reduce coupling but increase operational complexity..."
    - heading: "When to Use"
      content: "Use when..."
```

→ **Summary = core idea in 1–2 sentences.** Sections build understanding. No steps.

**For Reference:**

```yaml
body:
  entries:
    - key: "200"
      value: "OK. Request succeeded."
      note: "Most common response"
    - key: "404"
      value: "Not Found. Resource doesn't exist."
      note: "Check your URL path"
```

→ **Key-value pairs only.** Consistent format. No narrative, just facts.

**For Troubleshooting:**

```yaml
body:
  symptoms:
    - "Connection refused on port 5432"
    - "Unable to reach database"
  causes:
    - "Database service not running"
    - "Firewall blocking port 5432"
  resolutions:
    - text: "Check if database service is running: 'systemctl status postgres'"
      note: "Run on the server machine, not local"
    - text: "Check firewall rules: 'sudo ufw status'"
      note: "If blocked, enable: 'sudo ufw allow 5432'"
```

→ **Symptoms = what users observe.** Causes = why. Resolutions = fixes, ordered by likelihood.

### Step 4: Review Your Doc Against the Template

- [ ] Frontmatter complete? (type, title, version, tags)
- [ ] Single purpose? (passes routing decision tree)
- [ ] Correct structure for doc type?
- [ ] No mixed content? (Task without concepts, Reference without procedures, etc.)
- [ ] Grammar & clarity okay?
- [ ] Cross-links to related docs?

### Step 5: Add Cross-Links

At the end of your doc (before submission), mention related docs:
**Note:** Use relative paths to link to related docs in the same type folders.
**For a Task doc:**

```
## Related Documents
- **Concept:** [Microservices Architecture](../concept/microservices-architecture.md)
- **Reference:** [Docker CLI Reference](../reference/docker-commands.md)
- **Troubleshooting:** [Docker Build Failures](../troubleshooting/docker-build-errors.md)
```

**For a Concept doc:**

```
## Practical Application
- **Task:** [Set Up a Microservice](../task/deploy-microservice.md)
- **Reference:** [API Design Patterns](../reference/api-patterns.md)
```

(Steward will validate these in review.)

---

## Part 3b: Using Obsidian (Optional Workflow)

If you're editing in **Obsidian**, this section shows vault-native workflows.

### Open the Vault

1. **Launch Obsidian**
2. **Open vault:** File → Open Vault → select this repo folder
3. **Enable templates plugin** (if not already enabled):
   - Settings → Community Plugins → Enable "Templates" (built-in)
   - Settings → Templates → Template folder location: `templates`

### Create a New Doc in Obsidian

1. **Right-click in file explorer** (left sidebar) → **New file**
2. **Name it:** `task-my-feature.md` (or `concept-`, `reference-`, `troubleshooting-`)
3. **Insert template:**
   - Use Obsidian Command Palette (Ctrl+P or Cmd+P)
   - Search "Templates: Insert template"
   - Pick matching template (e.g., `task.template.md`)

### Link to Related Docs (Wikilinks)

Obsidian supports **wikilinks** for easy cross-referencing:

```markdown
## Related Documents

- **Concept:** [[../concepts/microservices-architecture]]
- **Task:** [[../tasks/deploy-microservice]]
- **Troubleshooting:** [[../troubleshooting/docker-build-errors]]
```

When you hover over wikilinks, Obsidian shows a preview. This helps you verify links before submitting.

**Note:** Wikilinks are Obsidian-specific. Before committing, convert them to standard markdown links:

```markdown
- **Concept:** [Microservices Architecture](../concept/microservices-architecture.md)
```

GitHub and other tools require standard markdown links (not wikilinks).

### Use Obsidian Tags for Navigation

In frontmatter, add tags:

```yaml
tags: ["database", "tutorial", "postgresql"]
```

Obsidian's tag panel (sidebar) lets you click tags to see all docs with that tag. Useful for quick domain navigation.

### Disable Obsidian-Specific Syntax Before Commit

Before pushing to GitHub:

- **No wikilinks:** Convert `[[file]]` → `[text](file.md)`
- **No Obsidian callouts:** Stick to standard markdown (code blocks, bold, lists)
- **No embedded canvas/excalidraw:** Keep content text-based

Validation scripts will fail if you leave Obsidian syntax in the final file.

---

## Part 4: Submit & Review (Async)

### Before You Push

1. **Run local validation** (if your team has a pre-commit hook):

   ```bash
   npm run validate
   ```

   This checks schema + lint before submission.

2. **Self-check against [VALIDATION.md](./VALIDATION.md).**
   - Routing correct?
   - Metadata complete?
   - Structure matches doc type?
   - Links valid?

### Create a Pull Request

- **Title:** Descriptive, mentions doc type (e.g., "Add Task: Deploy a Service")
- **Description:** Explain what you're adding and why (routing justification helps)
- **Link issue** if exists (e.g., "Closes #42")

### Review Process

1. **Automated checks** run (schema, lint, filename validation)
   - If they fail: Fix and push again
   - If they pass: Move to step 2

2. **Steward reviews** for routing + intent + governance
   - You may get feedback: "Can you split this into two docs?" or "Link this to Concept X?"
   - Respond in comments; make changes; push again

3. **Approval & merge** by Steward

### Feedback Examples

✅ **Good feedback:** "This looks like a Task + Concept mixed. Can you extract the theory section into a separate Concept doc and link it?"

✅ **Clear explanation:** "Your doc satisfies two purposes (setup + troubleshooting). Let's split it for discoverability."

---

## Part 5: Governance & Rules You Must Know

### The Routing Rules (Super Important)

📖 **Read [ROUTING.md](./ROUTING.md) completely.** This is your arbiter for doc classification.

Key principles:

1. One intent per doc. If you're torn, write two.
2. Route by reader intent, not author convenience.
3. Don't invent folder structures. Use the four type folders under `docs/` (`task`, `concept`, `reference`, `troubleshooting`).
4. Tasks assume success. Failures go in Troubleshooting.
5. Tasks are prescriptive. Explanations go in Concepts.

### The Review Checklist

Before Steward reviews, you should check [VALIDATION.md](./VALIDATION.md):

- Correct doc type?
- Single intent?
- Metadata complete?
- Structure matches template?
- Cross-links valid?
- No mixed content?

### Versioning Discipline

All docs carry a `version` field reflecting the **repo semantic version**, not individual doc versions.

- **MAJOR:** Breaking schema changes (rare)
- **MINOR:** New templates, new doc types, major enhancements
- **PATCH:** Doc updates, typos, clarifications

When you create a doc, use the current repo version. Steward tells you what that is (usually in CONTRIBUTING.md).

### Folder Structure (You Don't Invent)

Folders organize by **doc type**, not domain:

```
docs/
├── task/                    ← Type (not "Database" or "Authentication")
│   ├── database-backup.md
│   ├── setup-sso.md
│   └── deploy-service.md
├── concept/                 ← Type
│   ├── oauth-flows.md
│   ├── query-optimization.md
│   └── api-authentication.md
├── reference/               ← Type
│   ├── http-status-codes.md
│   ├── query-syntax.md
│   └── error-codes.md
└── troubleshooting/         ← Type
    ├── slow-queries.md
    ├── 401-errors.md
    └── connection-refused.md
```

**You don't create new folders arbitrarily.** Content goes under `docs/<type>/` where type is `task`, `concept`, `reference`, or `troubleshooting`. Use tags to capture topic or domain.

---

## Part 6: Quick Reference

### Checklist Before You Submit

- [ ] Routed through ROUTING.md decision tree?
- [ ] Frontmatter complete (type, title, version, tags)?
- [ ] Single purpose (passes intent check)?
- [ ] Correct template structure?
- [ ] No mixed content (Task ≠ Concept, etc.)?
- [ ] Cross-links to related docs?
- [ ] Filename meaningful, lowercase, hyphens?
- [ ] Grammar & clarity?
- [ ] Read and understood [GOVERNANCE.md](./GOVERNANCE.md)?

### Key Links (Bookmarks These)

- [ROUTING.md](./ROUTING.md) — Classify your doc type
- [VALIDATION.md](./VALIDATION.md) — Self-review before submission
- [GOVERNANCE.md](./GOVERNANCE.md) — Rules and authority
- [UDA Foundations](../UDA%20Foundations%20and%20Scientific%20Basis.md) — Why this works (deep dive)

### Common Questions (FAQ)

**Q: What if I disagree with my routing?**
A: Walk through ROUTING.md decision tree with Steward. If still ambiguous, split into two docs.

**Q: Can I deviate from the template?**
A: No. Templates enforce consistency. If you need a change, escalate to GOVERNANCE review.

**Q: How specific should my tags be?**
A: 2–3 tags. First = topic (e.g., "database"). Second = intent (e.g., "tutorial", "api-ref"). Optional third = audience/context.

**Q: What's the repo version number?**
A: Ask Steward or check `package.json`. Use that for `version` field in your frontmatter.

**Q: Can I link to external docs?**
A: Yes, but prefer internal links when possible. If you link to external, use full URLs and note it.

---

## Next Steps

1. **Read ROUTING.md** (15 min)
2. **Read VALIDATION.md** (10 min)
3. **Pick a doc you want to contribute**
4. **Choose your template** from `templates/` folder
5. **Follow the 5 steps** in Part 3 above
6. **Self-review** using Part 5 checklist
7. **Create PR** and await Steward review
8. **Iterate** based on feedback

Welcome aboard! 🚀
