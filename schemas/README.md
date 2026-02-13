# Schema Plugins

JSON Schema plugins for UDA validation, organized by layer.

## Quick Reference

| Plugin | Location | Purpose | Status |
|---|---|---|---|
| **uda-core** | `uda-core/schemas/` | Core 4 types (task, concept, reference, troubleshooting) | Required |
| **educational** | `educational/schemas/` | Batting cages, rubrics, curriculum | Optional |
| **api** | `api/schemas/` | Endpoints, error catalogs, specifications | Optional |
| **product** | `product/schemas/` | Features, releases, changelogs | Optional |
| **publishing** | `publishing/schemas/` | Gates, workflows, checklists | Optional |
| **membership** | `membership/schemas/` | Access control, tiers, monetization | Optional |
| **finance** | `finance/schemas/` | Revenue, costs, licensing | Optional |
| **content-management** | `content-management/schemas/` | Lifecycle, deprecation, SEO | Optional |

## How Plugins Work

### Composition

Schemas compose in layers:

```
Core Schema (required)
    ↓
Domain Schemas (optional)
    ↓
Operational Schemas (optional)
    ↓
Composed Schema (validation target)
```

**Example:**

```json
// Core requires: type, title, version
// Educational adds: rubricsSchema, battingCageSpec
// Membership adds: audienceTier, accessLevel
// Result: Single composed schema validating all fields
```

### Validation

Validators check documents against composed schema:

```bash
npm run validate:all
# Checks core + all enabled plugins

npm run validate:schema -- docs/task/my-doc.md
# Validates single doc against composed schema
```

## Creating a Plugin

See [schemas/REGISTRY.md](REGISTRY.md) for complete reference.

### Basic Plugin Structure

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Plugin",
  "description": "Extends UDA core with my features",
  "type": "object",
  "properties": {
    "myField": {
      "type": "string",
      "description": "My custom field"
    }
  }
}
```

### Registering a Plugin

1. Create schema file: `schemas/plugins/my-plugin.schema.json`
2. Add to `uda.config.json`:
   ```json
   {
     "schemas": {
       "plugins": [
         {
           "name": "my-plugin",
           "path": "schemas/plugins/my-plugin.schema.json",
           "required": false
         }
       ]
     }
   }
   ```
3. Document in [REGISTRY.md](REGISTRY.md)
4. Test: `npm run validate:all`

## Composition Rules

### Extending (Do This)

```json
{
  "type": "object",
  "properties": {
    "myNewField": { "type": "string" }
  }
}
```

### Overriding (Don't Do This)

❌ Never redefine core fields (type, title, version)  
❌ Never change core property types  
❌ Never conflict with other plugins  

### Merging Multiple Plugins

Plugins should be **mutually independent**. If two plugins both define the same field, they should have compatible schemas:

```json
// Plugin A
{
  "properties": {
    "tier": { "enum": ["basic", "pro", "enterprise"] }
  }
}

// Plugin B - COMPATIBLE
{
  "properties": {
    "tier": { "enum": ["basic", "pro", "enterprise", "custom"] }
  }
}

// Plugin C - CONFLICT ❌
{
  "properties": {
    "tier": { "type": "number" }  // Different type!
  }
}
```

## Best Practices

1. **Namespace fields:** Use domain prefix to avoid conflicts
   - ✓ `educationalMeta`, `publishingGate`, `financeRecord`
   - ❌ `meta`, `gate`, `record`

2. **Document extensively:** Each plugin should explain what it adds
3. **Version carefully:** Use MAJOR.MINOR.PATCH for schema changes
4. **Keep plugins focused:** One domain = one plugin; don't mix concerns
5. **Extend, never override:** Use composition, not replacement

## Schema Validation Errors

### Error: `Plugin not found`
- Check `uda.config.json` references correct path
- Verify schema file exists
- Run `npm run validate:config`

### Error: `Schema composition failed`
- Two plugins define incompatible fields
- Review each plugin's property definitions
- Rename conflicting fields with namespace

### Error: `Document invalid against composed schema`
- Plugin added new required field
- Document missing new field or has wrong type
- Check [REGISTRY.md](REGISTRY.md) for what each plugin requires

## Advanced: Custom Composition

For complex projects, customize schema composition:

```bash
npm run compose-schema -- --plugins core,educational,custom \
                          --output schemas/composed.schema.json
```

**Use selectively:**
- Disabling plugins: Trust schema composition logic
- Adding plugins mid-project: Update docs incrementally
- Conflicting schemas: Better to split into separate domains

## Resources

- [REGISTRY.md](REGISTRY.md) — Full plugin registry and specifications
- [uda.config.json](../uda.config.json) — Schema plugin configuration
- [domains/](../domains/) — Domain plugins (educational, api, product)
- [operations/](../operations/) — Operational plugins
- [uda-core/schemas/](../uda-core/schemas/) — Core immutable schema
