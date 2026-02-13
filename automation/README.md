# Automation & CI/CD

Advanced automation patterns for multi-stage publishing, content testing, analytics, and quality gates.

## What This Layer Adds

**Pipelines:**
- Multi-stage validation (core → domains → operations)
- Content testing (link validation, example execution)
- Publishing gates and approvals
- Automated quality checks

**Analytics:**
- Content metrics (type, age, domain distribution)
- Engagement tracking (views, searches, exit rates)
- Content health (orphans, broken links, stale docs)
- Performance monitoring

**Integration:**
- GitHub Actions workflows
- Continuous content testing
- Automated publishing workflows
- Content delivery integration

## Pipeline Stages

### Stage 1: Validate (Fast)
```bash
npm run validate:schema      # Core + domain schemas
npm run validate:filenames   # Naming conventions
npm run lint:markdown        # Markdown style
```
⚡ **Time:** < 30 seconds (fail fast)

### Stage 2: Test (Medium)
```bash
npm run test:links          # Link validation
npm run test:examples       # Example code execution
npm run test:cross-refs     # Cross-reference validation
```
⏱️ **Time:** 1-5 minutes (dependencies, links)

### Stage 3: Review (Async)
```bash
npm run check-gates        # Publishing gates
npm run check-approvals    # Required approvers
npm run check-compliance   # Compliance rules
```
⏳ **Time:** Variable (waits for humans)

### Stage 4: Publish (Automated)
```bash
npm run publish           # Build & deploy
npm run analytics:track   # Log publish event
npm run analytics:update  # Update metrics
```
📤 **Time:** 1-10 minutes (CDN deployment)

## Analytics

### Content Metrics

Track everything by default:
- **Distribution:** % by type, domain, tier
- **Age:** Average age, staleness indicators
- **Ownership:** Docs per owner, coverage gaps
- **Health:** Orphans, broken links, unlinked docs

### Engagement Metrics

If integrated with docs site:
- **Views:** Page views per doc, trending topics
- **Searches:** Top searches, search success rate
- **Engagement:** Time on page, bounce rate
- **Exit paths:** Where do readers go after viewing

### Health Dashboard

Automated reports (daily/weekly):
- 🔴 Red flags: Broken links, orphaned docs, stale content
- 🟡 Yellow flags: Weak cross-links, missing metadata
- 🟢 Green flags: Well-linked, current, healthy

## When to Use This Layer

- Automated CI/CD pipelines required
- Content testing and validation
- Multi-stage publishing workflows
- Analytics and content metrics
- Dashboards and reporting

## Installation

In `uda.config.json`:

```json
{
  "automation": {
    "enabled": true
  }
}
```

Then configure pipelines:
```bash
npm run setup-automation
# Copies GitHub Actions workflows
# Configures analytics tracking
# Sets up dashboards
```

## Pipeline Templates Coming Soon

### GitHub Actions
- `.github/workflows/validate.yml` — Schema validation
- `.github/workflows/test.yml` — Content testing
- `.github/workflows/publish.yml` — Multi-stage publishing
- `.github/workflows/analytics.yml` — Metrics collection

### Analytics
- `automation/analytics/collect.js` — Metrics collection
- `automation/analytics/dashboard.html` — Metrics dashboard
- `automation/analytics/reports.js` — Report generation

## Examples

### Example: Multi-Stage Pipeline

```yaml
# .github/workflows/publish.yml
on:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run validate:all
        # Fails PR if invalid

  test:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:links
      - run: npm run test:examples
        # Fails PR if tests fail

  check-gates:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run check-gates
        # Checks publishing gates
        # May require approval

  publish:
    if: github.event_name == 'push'
    needs: check-gates
    runs-on: ubuntu-latest
    steps:
      - run: npm run publish
      - run: npm run analytics:track
        # Publishes docs to production
        # Logs publish event
```

### Example: Analytics Dashboard

```html
<!DOCTYPE html>
<html>
<head>
  <title>Documentation Metrics</title>
</head>
<body>
  <h1>Content Health Dashboard</h1>
  
  <div>
    <h2>Distribution</h2>
    <p>Task: 45%, Concept: 30%, Reference: 15%, Troubleshooting: 10%</p>
  </div>

  <div>
    <h2>Health Flags</h2>
    <ul>
      <li>🔴 Orphaned docs: 3</li>
      <li>🟡 Stale (>6 months): 12</li>
      <li>🟡 Weak links: 8</li>
      <li>🟢 Current: 234</li>
    </ul>
  </div>

  <div>
    <h2>Engagement (last 30 days)</h2>
    <p>Top searches: deploy, config, error</p>
    <p>Avg engagement: 3.2 min/page</p>
  </div>
</body>
</html>
```

## Resources

- [ARCHITECTURE.md](../ARCHITECTURE.md) — Full automation integration
- [uda.config.json](../uda.config.json) — Configuration reference
- [CONFIGURATION.md](../CONFIGURATION.md) — Enabling automation layer
