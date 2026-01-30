# UDA Routing Decision Tree

## Quick Classification

Use this decision tree to classify content into the correct UDA doc type.

### Decision 1: Is this about *how to do something*?

- **YES** → Go to [**Task** routing](#task-documents)
- **NO** → Go to [Decision 2](#decision-2-is-this-about-explaining-whywhat-something-is)

### Decision 2: Is this about explaining *why/what something is*?

- **YES** → Go to [**Concept** routing](#concept-documents)
- **NO** → Go to [Decision 3](#decision-3-is-the-user-stuck-or-experiencing-an-error)

### Decision 3: Is the user stuck or experiencing an error?

- **YES** → Go to [**Troubleshooting** routing](#troubleshooting-documents)
- **NO** → Go to [**Reference** routing](#reference-documents)

---

## Detailed Routing Rules

### TASK Documents

**Purpose:** Procedural execution. Get from A to B in minimum steps.

**Signal Phrases:**
- "How do I...?"
- "Set up / configure / deploy..."
- "Follow these steps to..."
- "Get started with..."
- "Run this..."

**Structure:**
- Prerequisites (dependencies, preconditions)
- Steps (numbered, one action per step)
- Optional notes per step

**Anti-patterns:**
- Explaining *why* a step exists (belongs in Concept)
- Troubleshooting failure paths (belongs in Troubleshooting)
- Listing reference data (belongs in Reference)

**Examples:**
- "Deploy a Microservice"
- "Configure SSH Keys"
- "Initialize a Database Connection"

---

### CONCEPT Documents

**Purpose:** Schema formation. Build mental models and understanding.

**Signal Phrases:**
- "What is...?"
- "Understand..."
- "Learn about..."
- "Explain..."
- "Design patterns / architecture..."

**Structure:**
- Summary (one sentence: core idea)
- Sections (heading + content)
- Optional: theory, examples, diagrams, relationships to other concepts

**Anti-patterns:**
- Numbered steps (belongs in Task)
- Reference lookups (belongs in Reference)
- Error recovery (belongs in Troubleshooting)

**Examples:**
- "API Authentication Models"
- "Event-Driven Architectures"
- "Cache Invalidation Strategies"

---

### REFERENCE Documents

**Purpose:** Lookup tables. Factual mappings without narrative.

**Signal Phrases:**
- "What does X mean?"
- "Look up..."
- "List of..."
- "Glossary / API endpoints / configuration options..."
- "Quick reference..."

**Structure:**
- Entries (key-value pairs)
- Optional notes per entry

**Anti-patterns:**
- Procedural steps (belongs in Task)
- Conceptual explanation (belongs in Concept)
- Error diagnosis (belongs in Troubleshooting)

**Examples:**
- "HTTP Status Codes"
- "Configuration Parameter Reference"
- "Glossary of Terms"
- "API Endpoint Catalog"

---

### TROUBLESHOOTING Documents

**Purpose:** Error recovery. Start from symptom, map to causes and resolutions.

**Signal Phrases:**
- "Why am I getting...?"
- "Error: ..."
- "How do I fix...?"
- "Something went wrong..."
- "Diagnosis and recovery"

**Structure:**
- Symptoms (observable problems; list by pattern)
- Causes (why it happens)
- Resolutions (fix attempts, ordered by likelihood)

**Anti-patterns:**
- Happy path procedures (belongs in Task)
- Conceptual background (belongs in Concept)
- Reference lookups (belongs in Reference)

**Examples:**
- "Connection Timeout Errors"
- "Authentication Failures"
- "Memory Leak Diagnosis"

---

## Edge Cases & Clarifications

### "Help, I'm stuck!" — Where does it go?

**Question:** A user is following a Task and fails. Should the failure recovery go in the Task or Troubleshooting?

**Answer:** Troubleshooting. Tasks must assume success. Failures get their own doc type driven by symptom + diagnosis.

### Mixed Content: "Concept + Task"

**Question:** Explaining a concept AND showing how to use it?

**Answer:** Two docs. Users searching for "how do I" deserve a clean Task. Users searching for "what is" deserve a clean Concept. Link between them via cross-references if needed.

### Ambiguous: "Configuration Guide"

**Question:** Setting up a system is procedural (Task), but requires understanding options (Reference)?

**Answer:** Task owns the procedure. Reference owns the option definitions. Link them. Don't mix.

### Ambiguous: "Glossary"

**Question:** Is a glossary a Reference or Concept?

**Answer:** Reference. It's lookup-driven (I need definition of X). Concepts explain relationships and mental models; glossaries don't.

---

## Routing Rules by Discipline

1. **One intent per document.** A doc has exactly one primary purpose. Anything that requires explaining purpose-conflicts should split into multiple docs.

2. **Route by reader intent, not author convenience.** Don't put Task + Concept in one document because they're related. Route by what the reader is trying to accomplish.

3. **No "mixed" categories.** Don't create folders for "Setup & Concepts" or "Tasks & Troubleshooting." Folders organize by domain (e.g., "Database", "Authentication"), not by doc type.

4. **Routing is binary at each decision point.** If a doc satisfies multiple purposes, choose the *primary* one. The others get separate docs with cross-links.

5. **Metadata (tags, version, title) must be consistent.** Frontmatter enforces this across all types.

---

## Examples: Routing in Practice

### Scenario 1: "I need to set up SSL certificates"

- Decision 1: How to do something? **YES** → Task
- **Result:** `task: Deploy SSL Certificates`
- Content: Prerequisites, steps, optional notes
- Cross-link to: Concept (SSL/TLS), Reference (Certificate formats), Troubleshooting (Common errors)

### Scenario 2: "What's the difference between OAuth 2.0 and OpenID Connect?"

- Decision 1: How to do something? **NO**
- Decision 2: Why/what is something? **YES** → Concept
- **Result:** `concept: OAuth 2.0 vs OpenID Connect`
- Content: Summary, sections explaining each, architecture differences
- Cross-link to: Task (Implement OAuth), Reference (Protocol specs)

### Scenario 3: "All my API calls return 401 Unauthorized"

- Decision 1: How to do something? **NO** (not procedural; it's broken)
- Decision 2: Why/what is something? **NO** (not conceptual)
- Decision 3: Stuck / error? **YES** → Troubleshooting
- **Result:** `troubleshooting: 401 Unauthorized Responses`
- Content: Symptoms (observable patterns), causes, resolutions
- Cross-link to: Task (API Authentication setup), Concept (Auth models)

### Scenario 4: "List of all environment variables"

- Decision 1: How to do something? **NO**
- Decision 2: Why/what is something? **NO** (not conceptual; just lookup)
- Decision 3: Stuck / error? **NO** → Reference
- **Result:** `reference: Environment Variable Catalog`
- Content: Key-value entries with optional notes
- Cross-link to: Task (Configuration setup), Concept (Environment design)

---

## When You're Unsure

1. **Ask:** Who is reading this and why?
2. **Classify by primary intent:** What is the main reason someone would search for this?
3. **If tied:** Split the document. One doc per intent.
4. **Test:** Can the doc be read standalone and satisfy its intent? If not, you've mixed intents.
