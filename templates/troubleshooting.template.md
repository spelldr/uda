---
type: "troubleshooting"
title: ""
version: "1.0.0"
tags: []
---

# Troubleshooting Template

## Problem Statement

Brief description of the issue this doc addresses (1–2 sentences).

Example: "Connection timeouts when connecting to the database from a microservice."

---

## Symptoms

What does the user observe or experience? List observable patterns.

- Symptom 1: Specific error message or behavior
- Symptom 2: Another observable pattern
- Symptom 3: Related observable behavior

---

## Root Causes

Why does this happen? List possible causes, from most common to least common.

1. **Most common cause** — Why this happens and where to check
2. **Second most common** — Different reason and where to check
3. **Less common** — Edge case or rare cause

---

## Resolutions

Fixes, ordered by frequency/likelihood. Try the most common first.

### Resolution 1: [Most Likely Fix]

Step-by-step fix or diagnostic command.

1. Run this command or check this: `example command`
   - *Note:* What to expect if this is the problem

2. If that confirms the issue, then: `fix command`
   - *Note:* What happens after you run this

---

### Resolution 2: [Second Most Likely]

Different fix approach.

1. Try this: `diagnostic command`
   - *Note:* Look for this in the output

2. If confirmed, apply: `fix command`
   - *Note:* This may take 5–10 minutes

---

### Resolution 3: [Least Likely / Escalation]

If the above didn't work, escalate or try this advanced approach.

- Contact: [Support link] or [Team link]
- Logs to collect: [Location or command]

---

## Related Documents

- **Concept:** [Understanding the problem domain](../concepts/example.md)
- **Task:** [Normal setup (happy path)](../tasks/example.md)
- **Reference:** [Error codes and meanings](../reference/error-codes.md)

---

## Notes for Authors

- Symptoms = what users *observe* (error messages, behavior), not diagnoses.
- Causes = the *why* behind each symptom (internal mechanisms).
- Resolutions = fixes, ordered by likelihood.
- Each resolution should be a mini-procedure (discrete steps), but keep it focused on recovery.
- `note` fields are for warnings ("this takes 10 minutes"), expectations, or preconditions.
- Don't assume success; users are stuck. Be empathetic and clear.
