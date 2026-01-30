---
type: "task"
title: "Set Up PostgreSQL Database Connection"
version: "1.0.0"
tags: ["database", "postgresql", "setup"]
---

# Set Up PostgreSQL Database Connection

## Overview

This task walks you through configuring a connection to a PostgreSQL database from a Python application using the `psycopg2` library.

---

## Prerequisites

- Python 3.8+ installed locally
- PostgreSQL server running (local or remote)
- Database name, host, port, username, and password available
- `pip` package manager

---

## Steps

1. **Install the PostgreSQL driver library**
   ```bash
   pip install psycopg2-binary
   ```
   - *Note:* `psycopg2-binary` includes pre-compiled libraries; use `psycopg2` if you prefer to compile from source.

2. **Create a connection configuration file** (optional but recommended)
   Create `db_config.py`:
   ```python
   DB_CONFIG = {
       "host": "localhost",
       "port": 5432,
       "database": "myapp_db",
       "user": "postgres",
       "password": "your_password"
   }
   ```
   - *Note:* Never commit passwords to version control. Use environment variables in production.

3. **Write a connection test script**
   Create `test_connection.py`:
   ```python
   import psycopg2
   from db_config import DB_CONFIG

   conn = psycopg2.connect(**DB_CONFIG)
   cursor = conn.cursor()
   cursor.execute("SELECT version();")
   db_version = cursor.fetchone()
   print(f"Connected to: {db_version}")
   cursor.close()
   conn.close()
   ```

4. **Run the test script**
   ```bash
   python test_connection.py
   ```
   - *Note:* You should see PostgreSQL version info printed to the console if successful.

---

## Verification

Successful output looks like:
```
Connected to: ('PostgreSQL 12.8 on x86_64-pc-linux-gnu...')
```

If you see a `psycopg2.OperationalError`, check the host, port, username, and password in your config.

---

## Related Documents

- **Concept:** [PostgreSQL Connection Concepts](../concepts/postgres-connections.md) — Understand connection pooling and security
- **Reference:** [PostgreSQL Connection Parameters](../reference/postgres-params.md) — All configuration options
- **Troubleshooting:** [PostgreSQL Connection Errors](../troubleshooting/postgres-connection-errors.md) — Debug connection issues

---

## Annotation (For Template Learning)

**Why this structure works:**

1. **Overview:** Answers "what will I do?" in 1–2 sentences.
2. **Prerequisites:** Reduces cognitive load. Reader knows upfront what they need.
3. **Steps:** One action per step. Each step is independent and clear.
   - Code blocks are included (realistic).
   - `note` fields explain context (why, what to expect), not the step itself.
4. **Verification:** Concrete success criteria. "I'll see this output if it works."
5. **Related Documents:** Links readers to deeper concepts (Concept), reference data (Reference), and error recovery (Troubleshooting).

**What we avoid:**
- No conceptual deep-dive (e.g., "Here's how psycopg2 works" — that goes in Concept)
- No troubleshooting procedures (e.g., "If you get a 'connection refused' error..." — that goes in Troubleshooting)
- No assumption of failure paths (readers with working setups don't need error recovery in the happy path)

This keeps the doc focused and scannable.
