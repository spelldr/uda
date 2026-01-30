# Routing Matrix: User Intent → Content Type → Section

Use this matrix to route every page to its correct section.

**The Core Rule:** One user intent = one page = one section = one content type.

---

## Master Routing Matrix

| User Intent | Section | Content Type | Template | Allowed Links → |
|---|---|---|---|---|
| **"How do I...?"** | 20-Tasks | Task | Task | Concepts, Reference, Troubleshooting |
| **"What is...?"** | 30-Concepts | Concept | Concept | Concepts, Reference, Glossary |
| **"What are the exact fields/flags/options?"** | 40-Reference | Reference | Reference | Concepts, Glossary |
| **"How do I fix...?"** | 50-Troubleshooting | Troubleshooting | Troubleshooting | Tasks, Concepts, Reference, Glossary |
| **"How do I operate/maintain this?"** | 60-Platform-Ops | Runbook | Runbook | Reference, Concepts, Troubleshooting, Glossary |
| **"What changed in this version?"** | 70-Release-Upgrade | Release Notes | Release Notes | ADRs, Concepts, Glossary |
| **"Why did we choose this?"** | 80-ADRs | ADR | ADR | ADRs, Release Notes, Glossary |
| **"What does this term mean?"** | 90-Glossary | Glossary | Glossary | (none — glossary is terminal) |

---

## Routing Rules (Non-Negotiable)

### 1. **One Page = One Intent**
- Each page must answer exactly ONE user question
- If your page answers two questions, split it into two pages
- Link them together when appropriate

**✅ Good:**
- "How to configure authentication" (Task)
- "What is authentication?" (Concept)
- "Authentication API fields" (Reference)

**❌ Bad:**
- "How to configure authentication and what authentication is" (mixed Task + Concept)

---

### 2. **Task Pages Link Downward Only**
- Tasks → Reference, Concepts, Troubleshooting (OK)
- Tasks → Other Tasks (❌ FORBIDDEN)
- Use Concepts as a bridge if you need to link related Tasks

**Why:** Users need to complete one task, not get lost in a web of interconnected tasks.

**Pattern:**
```
Task A —→ Concept X ←— Task B
```
Instead of: Task A → Task B

---

### 3. **Concept Pages Don't Link to Tasks**
- Concepts → Concepts, Reference, Glossary (OK)
- Concepts → Tasks (❌ FORBIDDEN)

**Why:** Concepts should explain "what" and "why", never "how". If you're tempted to link to a task, you've mixed content types.

---

### 4. **Reference Pages Don't Explain**
- Reference → Concepts, Glossary (OK)
- Reference → Tasks or procedures (❌ FORBIDDEN)

**Why:** Reference is structured lookup only. If you're explaining how to use the reference, move that to a Task or Concept.

---

### 5. **Troubleshooting Pages Link to Solutions**
- Troubleshooting → Tasks (resolution steps)
- Troubleshooting → Concepts (explain why the problem occurs)
- Troubleshooting → Reference (look up error codes, fields)
- Troubleshooting → Troubleshooting (related problems - OK)

---

### 6. **No Circular Links**
- A → B → C is OK
- A → B → A is ❌ FORBIDDEN

**Why:** Circular links confuse users and indicate unclear content boundaries.

---

### 7. **Glossary is Terminal**
- Glossary terms don't link anywhere
- Everything can link TO glossary, but nothing links FROM glossary

**Why:** Glossary is a dead-end lookup tool, not a content hub.

---

## Section Naming Conventions

Use numeric prefixes for consistent ordering:

```
10-Start/                     ← Getting started, navigation
20-Tasks/                     ← How-to guides
  Task - [action].md
30-Concepts/                  ← Explanations
  Concept - [topic].md
40-Reference/                 ← API, fields, config
  Reference - [api].md
50-Troubleshooting/           ← Problem diagnosis
  Troubleshooting - [problem].md
60-Platform-Ops/              ← Operations, runbooks
  Runbook - [procedure].md
70-Release-Upgrade/           ← Version info
  Release Notes - [version].md
80-ADRs/                      ← Architecture decisions
  ADR-[number] - [decision].md
90-Glossary/                  ← Term definitions
  Glossary.md (single file)
```

---

## How to Apply This Matrix

**Step 1: Identify the user's question**
- "How do I...?" → Task
- "What is...?" → Concept
- "What are the fields?" → Reference
- "How do I fix...?" → Troubleshooting
- "How do I operate...?" → Runbook
- "What changed?" → Release Notes
- "Why did we choose...?" → ADR
- "What does X mean?" → Glossary

**Step 2: Route to the correct section**

Use the matrix above to find the section.

**Step 3: Check allowed links**

When you write internal links in your page, use the "Allowed Links →" column to verify you're following discipline.

**Step 4: Use the correct template**

Copy the template file matching your content type.

---

## Anti-Patterns (What NOT to Do)

### ❌ Blended Content
```markdown
# How to Deploy (and What Deployments Are)

Deployments are... [CONCEPT STARTS]

Here's how to deploy:  [TASK STARTS]
1. Step 1
2. Step 2
```

**Fix:** Split into two pages:
- `Task - Deploy an Application`
- `Concept - Deployments`

---

### ❌ Task-to-Task Links
```markdown
# Task: Configure Authentication

After completing this task, see [Task: Set Up RBAC](Task%20-%20Set%20Up%20RBAC.md).
```

**Fix:** Link through Concept:
```markdown
# Task: Configure Authentication

To understand role-based access control, see [Concept: RBAC](../30-Concepts/Concept%20-%20RBAC.md),
which also discusses [Task: Set Up RBAC](../20-Tasks/Task%20-%20Set%20Up%20RBAC.md).
```

---

### ❌ Concept-to-Task Links
```markdown
# Concept: Caching

To enable caching, see [Task: Enable Caching](../20-Tasks/Task%20-%20Enable%20Caching.md).
```

**Fix:** Let the Task link to the Concept:
- `Concept: Caching` explains what caching is (no task links)
- `Task: Enable Caching` links to `Concept: Caching` for background

---

### ❌ Narrative in Reference
```markdown
# API Reference

Historically, this API used XML, but we switched to JSON in v2.0...

## Fields
- field1 (string)
```

**Fix:** Move history to ADR:
- `Reference - API v2.0 Fields` (no narrative)
- `ADR-0042 - Why we migrated to JSON` (explains history)

---

## FAQ

**Q: I have a how-to guide that needs to explain a concept first. How do I structure this?**

A: Create two pages:
1. `Concept - [Topic]` — Explanation
2. `Task - [Action]` — Procedure that links to the concept

The task says: "To understand the background, see [Concept: Topic]."

---

**Q: Can a Task link to another Task?**

A: No. Instead:
- Identify the shared concept
- Create a Concept page
- Have both Tasks link to that Concept

---

**Q: Where do I put diagrams, videos, or media?**

A: The routing matrix still applies. Figure out which section the media belongs in:
- Explaining a concept? → 30-Concepts
- Showing procedure steps? → 20-Tasks
- Illustrating API fields? → 40-Reference

Embed it in the appropriate page.

---

**Q: What if I have content that doesn't fit any section?**

A: First, ask: "Does this help users accomplish their goal?" If not, delete it.

If yes, it fits somewhere. Common examples:
- Architectural overview → ADR or Concept (in 30-Concepts or 80-ADRs)
- Roadmap → Release Notes (in 70-Release-Upgrade)
- FAQ → Split into Task/Concept pages (use routing matrix for each question)
