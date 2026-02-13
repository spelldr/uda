# UDA Domain Packs

Optional, reusable extensions to UDA for domain-specific content types and validation.

## Available Domains

| Domain | Templates | Use Case |
|---|---|---|
| **educational** | Batting cage, rubric, curriculum | Learning platforms, training, courses |
| **api** | Endpoint spec, error catalog, changelog | API docs, SDKs, protocol documentation |
| **product** | Feature guide, release notes, changelog | Product docs, release notes, features |
| **template** | Starter pack | Building custom domains |

## Quick Start

### Enable a Domain

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

Then validate:
```bash
npm run validate:all
```

### Use Domain Templates

Templates automatically become available:

```bash
cp domains/educational/templates/batting-cage.template.md \
   docs/concept/my-exercise.md

# Edit frontmatter and body
# type: "batting-cage"  (replaces "concept")
```

### Access Domain Schema Extensions

Schemas are automatically composed during validation. No extra configuration needed—just start using domain-specific frontmatter fields.

## Building Custom Domains

See [CREATING_DOMAINS.md](CREATING_DOMAINS.md) for complete guide on:

- Creating new doc types
- Building custom schema extensions
- Defining domain-specific routing rules
- Distributing domains

## Domain Directory

### educational/
Educational content, training materials, courses.

**Templates:**
- `batting-cage.template.md` — Scored, scriptable exercises
- `rubric.template.md` — Grading criteria and scales
- `curriculum.template.md` — Course structure and sequencing

**Schema:**
- Batting cage metadata (breakScript, scoreScript, spec)
- Rubric definitions (criteria, scales, performance levels)
- Curriculum linking (courseId, moduleId, sequenceOrder)

### api/
REST APIs, gRPC, protocols, SDKs.

**Templates:**
- `endpoint.template.md` — HTTP endpoint specification
- `error-catalog.template.md` — Error codes and resolutions
- `sdk-guide.template.md` — SDK usage and patterns

**Schema:**
- Endpoint metadata (method, path, parameters, responses)
- Error codes (httpStatus, resolution, documentation)
- Deprecated endpoint tracking

### product/
Product documentation, features, releases.

**Templates:**
- `feature-guide.template.md` — Feature documentation
- `release-notes.template.md` — Version release information
- `changelog.template.md` — History of changes

**Schema:**
- Feature metadata (featureId, releaseVersion, tier, status)
- Release notes (breaking, deprecated, migrationType)
- Changelog structure (date, version, category, highlights)

### template/
Starter pack for building new domains.

**Includes:**
- Template structure guide
- Schema composition example
- Governance template
- Example docs

**Use as:**
```bash
cp -r domains/template domains/my-domain
# Customize templates, schema, governance
```

## Combining Domains

Mix multiple domains in one project:

```json
{
  "structure": {
    "domains": {
      "available": ["educational", "api"]
    }
  }
}
```

Schemas compose automatically. Use each domain's templates as needed.

## Governance & Routing

Each domain includes **ROUTING** rules extending the core UDA routing tree.

Example: `domains/educational/governance/ROUTING_EDUCATIONAL.md`

```markdown
### Batting Cage

**Purpose:** Scored, repeatable exercise environment
**Signal:** "Practice scenario", "Hands-on exercise"
**Structure:** Spec, break script, score script, verification
**Anti-patterns:** Conceptual theory (link to Concept), ...
```

Stewards use domain routing rules to classify domain-specific docs.

## Extension Points

Domains can extend:

| Extension | Example |
|---|---|
| **Templates** | New doc types (batting-cage, endpoint, feature-guide) |
| **Schemas** | Domain-specific metadata (rubricSchema, endpointSpec) |
| **Routing** | Domain-specific classification rules |
| **Validation** | Domain-specific checks (script existence, schema compliance) |
| **Examples** | Annotated example docs for each type |

## Domain Lifecycle

### Creation
1. Scaffold: `npm run init-domain --name=my-domain`
2. Build templates, schemas, governance
3. Add examples, documentation
4. Test validation: `npm run validate:all`

### Integration
1. Register in `uda.config.json`
2. Copy schema plugins to `schemas/plugins/`
3. Commit and merge

### Maintenance
1. Version schema with MAJOR.MINOR.PATCH
2. Document breaking changes
3. Keep governance rules up-to-date
4. Maintain examples

### Distribution (Optional)
1. Create repo: `uda-domain-my-domain`
2. Publish to npm: `@uda/domain-my-domain`
3. Install: `npm install @uda/domain-my-domain`

## Best Practices

1. **Extend, don't override:** New doc types should complement core 4 types, not replace
2. **Schema composition:** Use JSON Schema `$ref` to extend, never override core
3. **Governance clarity:** Domain routing rules must avoid ambiguity with core types
4. **Examples:** Provide 2–3 annotated examples per new doc type
5. **Documentation:** README explaining what the domain adds and when to use it

## Resources

- [CREATING_DOMAINS.md](CREATING_DOMAINS.md) — Full guide to building domains
- [schemas/REGISTRY.md](../schemas/REGISTRY.md) — Schema plugin registry
- [domains/template/](template/) — Starter domain pack
- [uda-core/governance/](../uda-core/governance/) — Core routing and validation rules
