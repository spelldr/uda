# API Domain Pack

Add specialized templates, schemas, and governance for REST APIs, gRPC services, SDKs, and protocol documentation.

## What This Domain Adds

**Doc Types:**
- **Endpoint Spec** — HTTP endpoint specification (method, path, params, responses)
- **Error Catalog** — Error codes, HTTP status, resolutions
- **SDK Guide** — SDK usage patterns, examples, best practices
- **Operation Reference** — RPC methods, messages, operations

**Metadata:**
- Endpoint methods (GET, POST, PUT, DELETE, etc.)
- Parameters and response types
- Error codes and status codes
- Deprecated endpoints and migrations
- SDK language and version

**Validation:**
- Valid HTTP methods
- Parameter types (query, body, path, header)
- HTTP status codes match responses
- Deprecated endpoints have migration paths

## When to Use This Domain

- Documenting REST APIs or gRPC services
- Creating SDK guides
- Listing error codes and troubleshooting
- Tracking API deprecations and migrations
- API reference documentation

## Templates Included

### Endpoint Spec Template

```markdown
---
type: "reference"
domain: "api"
endpoint: "/api/v1/users/{id}"
method: "GET"
status: "stable"
---

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |
```

### Error Catalog Template

```markdown
---
type: "reference"
domain: "api"
errorCategory: "authentication"
---

| Code | HTTP Status | Message | Resolution |
|------|-------------|---------|-----------|
| AUTH_001 | 401 | Invalid token | See task: Refresh API Token |
```

### SDK Guide Template

```markdown
---
type: "concept"
domain: "api"
sdkLanguage: "python"
sdkVersion: "3.0.0"
---

## Python SDK Guide

How to use the Python SDK for common operations.
```

## Installation

In `uda.config.json`:

```json
{
  "structure": {
    "domains": {
      "available": ["api"]
    }
  }
}
```

Then run:
```bash
npm run validate:all
```

## Governance

See `governance/ROUTING_API.md` for API-specific routing rules.

Stewards use this to classify endpoints, error catalogs, and SDK guides.

## Examples

See `examples/` folder for annotated examples.

## Documenting an Endpoint

1. Copy `templates/endpoint-spec.template.md`
2. List parameters and responses
3. Link to related errors in error catalog
4. Link to SDK guides if applicable
5. Track deprecation status

## Schema Reference

See [schemas/api-extension.schema.json](schemas/api-extension.schema.json) for full schema.

Validates:
- HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)
- Parameter types and requirements
- Response structures
- Error codes and status codes
- Endpoint status (stable, beta, deprecated)
