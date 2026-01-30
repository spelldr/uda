---
type: "troubleshooting"
title: "Database Connection Refused Errors"
version: "1.0.0"
tags: ["database", "connection", "postgresql"]
---

# Database Connection Refused and Timeout Errors

## Prerequisites

This guide assumes:
- Basic familiarity with terminal/command line
- Access to database server (for server-side checks)
- Understanding of firewall/network concepts

If unfamiliar with any of these, ask your database administrator or DevOps team for help.

## Problem Statement

Your application can't connect to the database and returns a "Connection Refused" or "Connection Timeout" error. **Connection Refused** means the server immediately rejected the connection (common: server not running, port blocked). **Connection Timeout** means the request hung and gave up waiting (common: network routing issue, server slow). This guide covers both.

---

## Symptoms

What you see when this happens:

- Error message: `"psycopg2.OperationalError: could not connect to server: Connection refused"`
- Error message: `"(0x0000274C/10060): A connection attempt failed..."`
- Error message: `"FATAL: remaining connection slots reserved for non-replication superuser connections"`
- Application logs show `"Unable to connect to database host:port"`
- Connection hangs for 30+ seconds then times out

---

## Root Causes

Listed from most common to least common:

1. **Database server not running** — The PostgreSQL/MySQL/etc. service isn't started or crashed.
2. **Wrong host/port in connection string** — Typo in the database URL or port number.
3. **Firewall blocking the port** — Network firewall (iptables, AWS Security Group) blocks traffic to the database port.
4. **Database server listening on different interface** — Database configured to listen only on `localhost`, but you're connecting from a different machine.
5. **Network routing issue** — Network path between client and database server is broken (wrong VLAN, DNS misconfiguration).
6. **Database server out of connections** — Server reached max connections limit (rare; usually shows different error).
7. **TLS/SSL mismatch** — You're requiring TLS but server isn't configured for it (or vice versa).

---

## Resolutions

Try these in order. Most connection refused errors resolve with resolution 1 or 2.

### Resolution 1: Verify Database Server Is Running

Check if the database process is running on the database machine.

**On Linux (PostgreSQL):**

1. SSH into the database server machine
   ```bash
   ssh user@database-host
   ```

2. Check if PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```
   - *Note:* Should show `active (running)` in green. If not, start it: `sudo systemctl start postgresql`

3. Verify it's listening on the expected port (default 5432):
   ```bash
   sudo ss -tlnp | grep postgres
   ```
   - *Note:* You should see `LISTEN` and port 5432. If different port, update your connection string.

**On Windows (PostgreSQL):**

1. Open Services (Windows + R, type `services.msc`)
2. Search for "PostgreSQL"
3. If status is "Stopped", right-click and select "Start"
4. Right-click and select "Properties" to see startup type (should be "Automatic")

---

### Resolution 2: Verify Connection String (Host, Port, Credentials)

Check your connection string for typos.

1. Find your connection string or config file. Examples:
   - Python: `psycopg2.connect("host=localhost port=5432 user=postgres password=secret")`
   - Node.js: `new Client({host: 'localhost', port: 5432, user: 'postgres', password: 'secret'})`

2. Verify each component:
   - **Host:** Is it `localhost` (local) or an IP/FQDN (remote)?
   - **Port:** Default PostgreSQL = 5432. MySQL = 3306. Check your database type.
   - **User:** Does this user exist in your database?
   - **Password:** Correct?

3. Test connection manually (if you have database CLI installed):
   ```bash
   psql -h localhost -p 5432 -U postgres
   ```
   - *Note:* You'll be prompted for password. If it connects, the problem is in your app's connection string.
   - *Note:* If it fails, database server might not be running (go back to Resolution 1).

---

### Resolution 3: Check Firewall Rules

If the database is on a different machine, check network firewall.

**On Linux (iptables):**

1. Check firewall rules:
   ```bash
   sudo iptables -L -n | grep 5432
   ```
   - *Note:* Should see an `ACCEPT` rule for port 5432.

2. If missing, add a rule (example):
   ```bash
   sudo iptables -A INPUT -p tcp --dport 5432 -j ACCEPT
   ```

3. Make it permanent (install `iptables-persistent` first):
   ```bash
   sudo netfilter-persistent save
   ```

**On AWS (Security Group):**

1. Go to EC2 console → Security Groups
2. Find the security group attached to your database instance
3. Click "Inbound Rules"
4. Verify there's a rule allowing TCP 5432 from your app's security group/IP
5. If missing, click "Edit Inbound Rules" → "Add Rule" → PostgreSQL (5432) → Source: your app's IP/SG

---

### Resolution 4: Verify Database Binds to All Interfaces

If connecting from a different machine, database must listen on all interfaces (not just `localhost`).

1. SSH into database server:
   ```bash
   ssh user@database-host
   ```
   - *Note:* If you can't SSH, ask your database administrator to check the config.

2. Find PostgreSQL config file (usually `/etc/postgresql/*/main/postgresql.conf`):
   ```bash
   grep "listen_addresses" /etc/postgresql/*/main/postgresql.conf
   ```
   - *Note:* The command searches for the line containing `listen_addresses` and prints it.

3. Should show: `listen_addresses = '*'` (not `'localhost'`)
   - *Note:* `'*'` means listen on all network interfaces. `'localhost'` = local connections only.

4. If it's `localhost`, edit the file:
   ```bash
   sudo nano /etc/postgresql/*/main/postgresql.conf
   ```
   - Change `listen_addresses = 'localhost'` to `listen_addresses = '*'`
   - *Note:* Use Ctrl+W to search, then Ctrl+X to save in nano editor.
   - Save and exit

5. Restart PostgreSQL:
   ```bash
   sudo systemctl restart postgresql
   ```
   - *Note:* Restart is required for config changes to take effect. Existing connections will be dropped.

---

### Resolution 5: Check TLS/SSL Configuration Mismatch

If your app requires TLS/SSL but the database server isn't configured for it (or vice versa), connection will fail.

1. Check your application's connection string for TLS settings:
   ```python
   conn = psycopg2.connect(
       host="database-host",
       sslmode="require"
   )
   ```
   - *Note:* Common values: `require` (must use TLS), `prefer` (use if available), `disable` (no TLS)

2. Check if PostgreSQL server supports SSL:
   ```bash
   sudo grep "ssl" /etc/postgresql/*/main/postgresql.conf
   ```
   - *Note:* Should show `ssl = on` if enabled. If `off` or commented out, server doesn't support TLS.

3. If server has `ssl = off` but your app requires TLS, choose one:
   - Disable TLS in connection string (`sslmode = disable`)
   - Or enable SSL on server (requires certificate; ask database administrator)

4. Test connection after change:
   ```bash
   psql -h database-host -U postgres --set=sslmode=prefer
   ```
   - *Note:* `--set=sslmode=prefer` will use TLS if available, but continue if not.

---

### Resolution 6: Test Network Connectivity (Advanced)

If all above pass but connection still fails, test network routing.

1. From your app machine, test if you can reach the database port:
   ```bash
   telnet database-host 5432
   ```
   - *Note:* If it connects (blank screen, no error), network is okay. Exit with Ctrl+] then `quit`.
   - *Note:* If it fails (`Connection refused`), network is broken. Check DNS, routing, VPN.

2. If DNS is suspect, try IP address directly:
   ```bash
   nslookup database-host
   ```
   - *Note:* Compare the IP to what you expect. Wrong IP = DNS misconfiguration.

---

## Escalation

If none of the above work:

**Collect diagnostic information:**
```bash
sudo tail -50 /var/log/postgresql/postgresql.log
sudo ss -tlnp | grep 5432
telnet database-host 5432
```

**Post an issue to your team with:**
- Your connection string (redact passwords)
- The exact error message
- Output from commands above
- Which resolutions 1–6 you've already tried

**Contact points:**
- **Internal:** Post in `#database-help` Slack channel or create ticket in [YOUR_JIRA_PROJECT]
- **Vendor:** If using managed database (AWS RDS, Azure Database), open support ticket with AWS/Azure
- **Database team:** Email [database-team@company.com] or page on-call DBA

---

## Related Documents

**Note:** In this template repo, these links are examples. When creating your own Troubleshooting docs, replace these with actual links to your docs.

- **Concept:** [Database Connection Concepts](../concepts/database-connections.md) — Understanding connection pooling and network issues
- **Task:** [Set Up PostgreSQL Database Connection](../tasks/setup-postgres-connection.md) — Happy path configuration
- **Reference:** [PostgreSQL Configuration Parameters](../reference/postgres-config.md) — All config options

---

## Annotation (For Template Learning)

**Why this structure works:**

1. **Problem Statement:** Immediately frames the issue. Reader knows they're in the right doc.
2. **Symptoms:** Observable patterns. Reader can confirm they have this problem.
3. **Root Causes:** Listed by frequency (most common first). Helps reader pick the right fix.
4. **Resolutions:** Ordered by likelihood. Try #1, #2 (solve 90%+ of issues). Advanced resolutions lower.
   - Each resolution is a mini-procedure (discrete steps), but focused on *fixing* the error.
   - `note` fields explain what output means and what to do next.
5. **Escalation:** If nothing works, here's how to get help (logs to collect, who to contact).

**What we avoid:**
- No happy path procedures (e.g., "Here's how to set up normally" — that goes in Task)
- No conceptual deep-dives (e.g., "Here's how database connections work" — that goes in Concept)
- No reference lookups embedded (that goes in Reference)
- Focus is on symptoms → diagnosis → resolution. Reader is stuck; help them get unstuck.

This doc gets a stuck user back on track as quickly as possible, with ordered, actionable steps.
