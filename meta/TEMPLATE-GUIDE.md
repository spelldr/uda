# UDA Templates

All artifacts must begin with the following front‑matter block.  
This establishes metadata used for indexing, routing, ownership, and lifecycle tracking.

```md
---
title:
type: task|concept|reference|troubleshooting
status: draft
owner:
updated:
tags: []
---
```

Each artifact type has a strict internal structure.  
These section headers are **mandatory** and must appear in the order shown.

---

## Task Template

Tasks describe **procedures**.  
They must be deterministic, step‑driven, and reversible.

### Purpose
Explain why this task exists and what outcome it produces.

### Prerequisites
List required tools, permissions, context, or dependencies.

### Steps
Numbered, linear, unambiguous instructions.

### Validation
How to confirm the task succeeded.

### Rollback
How to undo the task or recover from failure.

---

## Concept Template

Concepts explain **ideas, architecture, or theory**.  
They should not contain procedural steps.

### Summary
A concise explanation of the concept.

### Why It Matters
Context, motivation, or the problem this concept solves.

### Key Ideas
Core principles, models, or components.

### Examples
Concrete illustrations or use cases.

---

## Reference Template

References store **static, factual information**.  
They should not contain steps or opinions.

### Summary
What this reference covers and why it exists.

### Data
Tables, inventories, configs, mappings, diagrams, or structured facts.

### Notes
Clarifications, constraints, or cross‑links to related artifacts.

---

## Troubleshooting Template

Troubleshooting artifacts describe **symptom‑driven break/fix** workflows.

### Symptoms
What the user observes.

### Diagnosis
How to narrow down the cause.

### Root Cause
The underlying issue.

### Resolution
The fix.

### Prevention
How to avoid recurrence.