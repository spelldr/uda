# UDA Configuration Guide

## Overview

The `uda.config.json` file controls which layers and features are active in your UDA project. It's the single source of truth for your documentation architecture.

## Configuration Structure

### Project Metadata

```json
{
  "project": {
    "name": "My Documentation",
    "description": "Product docs and guides",
    "version": "1.0.0"
  }
}
```

### Structure (Layers)

```json
{
  "structure": {
    "content": {
      "enabled": true,
      "location": "docs"
    },
    "domains": {
      "enabled": true,
      "location": "domains",
      "available": ["educational", "api"]
    },
    "operations": {
      "enabled": true,
      "location": "operations",
      "modules": ["publishing", "membership"]
    },
    "automation": {
      "enabled": true,
      "location": "automation"
    }
  }
}
```

### Schemas

```json
{
  "schemas": {
    "corePath": "uda-core/schemas/uda-content.schema.json",
    "pluginsPath": "schemas/plugins",
    "plugins": [
      {
        "name": "uda-core",
        "path": "uda-core/schemas/uda-content.schema.json",
        "required": true
      },
      {
        "name": "educational",
        "path": "schemas/plugins/educational.schema.json",
        "required": false
      }
    ],
    "composition": "merge",
    "validationMode": "strict"
  }
}
```

### Validation

```json
{
  "validation": {
    "enableAutomated": true,
    "runLocal": true,
    "runOnCI": true,
    "validators": [
      { "name": "schema", "enabled": true, "priority": 1 },
      { "name": "frontmatter", "enabled": true, "priority": 2 },
      { "name": "filenames", "enabled": true, "priority": 3 },
      { "name": "markdown", "enabled": true, "priority": 4 }
    ]
  }
}
```

### Governance

```json
{
  "governance": {
    "stewarded": true,
    "stewardPath": "uda-core/governance",
    "enforcementLevel": "strict"
  }
}
```

### Profiles (Quick Setup)

```json
{
  "profiles": {
    "minimal": {
      "description": "Pure UDA core only",
      "structure": {
        "content": true,
        "domains": false,
        "operations": false,
        "automation": false
      }
    },
    "educational": {
      "description": "UDA + educational domain",
      "structure": {
        "content": true,
        "domains": true,
        "operations": false
      },
      "domains": ["educational"]
    }
  }
}
```

## Usage

### Choose a Profile

```bash
# Use minimal profile (manual edit `uda.config.json`)
npm run setup -- --profile minimal

# Use educational profile
npm run setup -- --profile educational

# Use enterprise profile (all layers)
npm run setup -- --profile enterprise
```

### Manual Configuration

1. Open `uda.config.json`
2. Set `structure.domains.enabled`, `structure.operations.enabled`, etc.
3. List active domains/modules in `available` / `modules` arrays
4. Run validation: `npm run validate:all`

### Add a Domain

```json
{
  "structure": {
    "domains": {
      "enabled": true,
      "available": ["educational", "api", "my-custom-domain"]
    }
  },
  "schemas": {
    "plugins": [
      {
        "name": "my-custom-domain",
        "path": "schemas/plugins/my-custom-domain.schema.json",
        "required": false
      }
    ]
  }
}
```

### Add an Operations Module

```json
{
  "structure": {
    "operations": {
      "enabled": true,
      "modules": ["publishing", "membership", "custom-module"]
    }
  }
}
```

## Common Configurations

### Minimal (Solo Project)
```json
{
  "profiles": ["minimal"],
  "structure": {
    "domains": false,
    "operations": false,
    "automation": false
  }
}
```

### Educational (Training Platform)
```json
{
  "profiles": ["educational"],
  "structure": {
    "domains": true,
    "operations": false,
    "automation": false
  },
  "structure": {
    "domains": {
      "available": ["educational"]
    }
  }
}
```

### Product Docs (Small Team)
```json
{
  "profiles": ["product"],
  "structure": {
    "domains": true,
    "operations": true,
    "automation": false
  },
  "structure": {
    "domains": {
      "available": ["product"]
    },
    "operations": {
      "modules": ["publishing", "content-management"]
    }
  }
}
```

### Enterprise (Large Team)
```json
{
  "profiles": ["enterprise"],
  "structure": {
    "content": true,
    "domains": true,
    "operations": true,
    "automation": true
  },
  "structure": {
    "domains": {
      "available": ["educational", "api", "product"]
    },
    "operations": {
      "modules": ["publishing", "membership", "finance", "content-management"]
    }
  }
}
```

## Validation

After modifying `uda.config.json`:

```bash
# Validate configuration syntax
npm run validate:config

# Validate all layers
npm run validate:all
```

## Troubleshooting

### "Invalid schema reference"
- Check `schemas.plugins[].path` exists
- Ensure schema composition is valid
- Run `npm run validate:config`

### "Domain not found"
- Verify domain folder exists in `domains/`
- Check `structure.domains.available` includes the domain
- Run `npm run init-domain --name=my-domain` to scaffold

### "Operations module disabled"
- Set `operations.enabled: true` in config
- Add module to `operations.modules` array
- Scaffold with `npm run init-operations --name=my-module`

## Schema Reference

See [schemas/REGISTRY.md](schemas/REGISTRY.md) for all available schema plugins and their capabilities.
