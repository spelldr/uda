# Educational Domain Pack

Add specialized templates, schemas, and governance for educational content, learning platforms, and training materials.

## What This Domain Adds

**Doc Types:**
- **Batting Cage** — Scored, scriptable hands-on exercises with break/score automation
- **Rubric** — Grading criteria, scales, and performance levels
- **Curriculum** — Course structure,  sequencing, and learning paths

**Metadata:**
- Exercise specifications (difficulty, time estimate, prerequisites)
- Rubric definitions (criteria, performance scales)
- Curriculum linking (course ID, module ID, sequence order)
- Learner tracking (completion status, score, progress)

**Validation:**
- Batting cage scripts must be executable
- Rubric scales must be consistent
- Curriculum must be acyclic (no circular dependencies)

## When to Use This Domain

- Building an online learning platform
- Creating hands-on exercises or labs
- Documenting courses or training materials
- Scoring or grading learner submissions
- Tracking learning paths and prerequisites

## Templates Included

### Batting Cage Template

Hands-on, repeatable exercise with automated breaking and scoring.

```markdown
---
type: "concept"
domain: "educational"
exerciseType: "batting-cage"
difficulty: "intermediate"
timeEstimate: "30 minutes"
prerequisites: ["concept-api-basics"]
spec:
  description: "Deploy a microservice to Kubernetes"
  objectives: ["...", "..."]
  breakScript: "scripts/break.sh"
  scoreScript: "scripts/score.sh"
---
```

### Rubric Template

Grading criteria and performance scales.

```markdown
---
type: "reference"
domain: "educational"
rubricFor: "batting-cage-exercise-001"
---

| Criterion | Novice | Intermediate | Expert |
|-----------|--------|--------------|--------|
| ... | ... | ... | ... |
```

### Curriculum Template

Course structure and learning sequencing.

```markdown
---
type: "concept"
domain: "educational"
courseId: "kubernetes-fundamentals"
moduleId: "module-02-pods"
sequenceOrder: 3
---
```

## Installation

In `uda.config.json`:

```json
{
  "structure": {
    "domains": {
      "available": ["educational"]
    }
  }
}
```

Then run:
```bash
npm run validate:all
```

## Governance

See `governance/ROUTING_EDUCATIONAL.md` for educational-specific routing rules.

Stewards use this to classify batting cages, rubrics, and curriculum docs.

## Examples

See `examples/` folder for annotated examples of each template.

## Creating Exercises

1. Copy `templates/batting-cage.template.md`
2. Fill in spec with exercise metadata
3. Create `scripts/break.sh` (fault injection)
4. Create `scripts/score.sh` (validation)
5. Validate: `npm run validate:all`
6. Test: Run break and score scripts manually

## Schema Reference

See [schemas/educational-extension.schema.json](schemas/educational-extension.schema.json) for full schema.

Validates:
- Exercise specifications
- Rubric structure
- Curriculum linking
- Script references
