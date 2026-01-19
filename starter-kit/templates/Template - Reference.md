---
title: Reference - [API/Fields/Configuration]
description: Complete field and configuration reference for [system or API].
tags: ["reference", "api"]
owner: @your-github-handle
status: draft
last_verified: 2026-01-19
review_cycle: annual
type: reference
---

# Reference: [API/Fields/Configuration]

## Overview

What this reference documents. Keep this brief; the details are below.

## Fields

### field_name
- **Type:** data_type
- **Required:** yes|no
- **Default:** value or N/A
- **Description:** What this field does
- **Example:** 
  ```
  field_name: example_value
  ```

### another_field
- **Type:** data_type
- **Required:** yes|no
- **Default:** value or N/A
- **Description:** What this field does
- **Example:**
  ```
  another_field: example_value
  ```

### nested_field
- **Type:** object
- **Required:** no
- **Default:** N/A
- **Description:** What this nested object contains
- **Subfields:**
  - `nested_subfield` (string): Description of subfield

#### nested_subfield
- **Type:** string
- **Required:** no
- **Default:** N/A
- **Description:** Description of the subfield
- **Example:**
  ```
  nested_subfield: "value"
  ```

## Enums

If this reference includes enum values, list them:

| Value | Meaning |
|---|---|
| `value1` | Description of value1 |
| `value2` | Description of value2 |
| `value3` | Description of value3 |

## Constraints & Validation

- Constraint 1: Description
- Constraint 2: Description
- Constraint 3: Description

## Examples

### Example 1: [Common use case]

```yaml
field1: value1
field2: value2
nested:
  subfield: value
```

### Example 2: [Another use case]

```yaml
field1: different_value
field3: value3
```

## Related Content

**Understand the concepts:**
- [Concept: Background topic](../30-Concepts/Concept%20-%20Background%20topic.md) — Explains why these fields exist
- [Concept: Related concept](../30-Concepts/Concept%20-%20Related%20concept.md) — Related topics

**How to use this:**
- [Task: How to configure this](../20-Tasks/Task%20-%20How%20to%20configure%20this.md) — Step-by-step instructions
