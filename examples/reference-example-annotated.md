---
type: "reference"
title: "HTTP Status Codes"
version: "1.0.0"
tags: ["http", "api", "reference"]
---

# HTTP Status Codes

## Overview

HTTP status codes indicate the result of an HTTP request. They are three-digit integers grouped into five classes: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error).

Use this reference to understand what each code means and when to return it.

---

## Success Responses (2xx)

| Code | Name | Meaning | Typical Use |
|---|---|---|---|
| 200 | OK | Request succeeded. Response body contains result. | Successful GET, POST, PUT, DELETE |
| 201 | Created | Request succeeded and a new resource was created. | Successful POST creating a new resource |
| 202 | Accepted | Request accepted but not yet processed. | Async operations, batch jobs |
| 204 | No Content | Request succeeded but there's no content to return. | Successful DELETE, or PUT with no response body |

---

## Redirection Responses (3xx)

| Code | Name | Meaning | Typical Use |
|---|---|---|---|
| 301 | Moved Permanently | Resource permanently moved to a new URL. | Endpoint deprecated, URL changed |
| 302 | Found (Temporary Redirect) | Resource temporarily at a different URL. | Temporary redirect, session handling |
| 304 | Not Modified | Cached resource is still valid. | Client-side caching, conditional requests |
| 307 | Temporary Redirect | Like 302, but client must use same HTTP method. | Temporary routing changes |

---

## Client Error Responses (4xx)

| Code | Name | Meaning | Typical Use |
|---|---|---|---|
| 400 | Bad Request | Request malformed or invalid (syntax error). | Missing required fields, invalid JSON |
| 401 | Unauthorized | Request requires authentication (client not authenticated). | Missing or invalid API key, expired token |
| 403 | Forbidden | Client authenticated but lacks permission (authorization failure). | User doesn't have required role/scope |
| 404 | Not Found | Resource doesn't exist. | Invalid URL path, deleted resource |
| 409 | Conflict | Request conflicts with current state (e.g., version mismatch). | Concurrent edit, duplicate resource creation |
| 429 | Too Many Requests | Client exceeded rate limit. | Too many requests in short time |

---

## Server Error Responses (5xx)

| Code | Name | Meaning | Typical Use |
|---|---|---|---|
| 500 | Internal Server Error | Server encountered an unhandled exception. | Unexpected error, uncaught exception |
| 502 | Bad Gateway | Gateway/proxy received invalid response from upstream. | Upstream service down, misconfiguration |
| 503 | Service Unavailable | Server temporarily unable to handle requests. | Maintenance, overload, deployment |
| 504 | Gateway Timeout | Gateway/proxy didn't get response from upstream in time. | Upstream service slow or unresponsive |

---

## Quick Decision Tree

**Is the request valid?**
- **No (malformed)** → 400 Bad Request
- **Yes** → Next

**Is the client authenticated?**
- **No** → 401 Unauthorized
- **Yes** → Next

**Does the client have permission?**
- **No** → 403 Forbidden
- **Yes** → Next

**Does the resource exist?**
- **No** → 404 Not Found
- **Yes** → Next

**Did the request succeed?**
- **Yes** → 200 OK (or 201 Created, 204 No Content)
- **No** → 500 Internal Server Error (or appropriate 5xx)

---

## Common Mistakes

| Mistake | Wrong Code | Correct Code | Why |
|---|---|---|---|
| Missing authentication | 403 | 401 | 401 = client not authenticated; 403 = authenticated but not permitted |
| Resource deleted, not found | 410 Gone | 404 Not Found | Use 404 for consistency unless you need to distinguish "existed before" |
| Rate limit exceeded | 403 | 429 | 403 = permission denied; 429 = quota/limit |
| Server overloaded | 500 | 503 | 500 = error; 503 = temporary unavailability (server will recover) |

---

## Related Documents

- **Concept:** [RESTful API Design Principles](../concepts/rest-api-design.md) — When to use which codes
- **Task:** [Design Error Responses for Your API](../tasks/design-api-errors.md) — How to implement status codes
- **Troubleshooting:** [Common HTTP Errors and Fixes](../troubleshooting/http-errors.md) — Debug status code issues

---

## Annotation (For Template Learning)

**Why this structure works:**

1. **Overview:** Explains scope and purpose. Reader knows what they're looking up.
2. **Organized tables:** Grouped by class (2xx, 3xx, 4xx, 5xx). Quick scanning.
   - Columns are consistent: Code, Name, Meaning, Typical Use.
   - Concise descriptions (not narratives).
3. **Decision tree:** Helps readers *choose* the right code for their scenario.
4. **Common mistakes table:** Directly addresses confusion points.
5. **Related docs:** Links to conceptual understanding (Concept), implementation guidance (Task), and error debugging (Troubleshooting).

**What we avoid:**
- No procedures (e.g., "Here's how to return a 404" — that goes in Task)
- No error recovery (e.g., "If you're getting 500 errors..." — that goes in Troubleshooting)
- No narrative explanation (facts only; link to Concept if deeper understanding needed)
- Pure lookup data, organized for fast retrieval.

This doc is designed for quick lookup. A developer should find the answer in < 30 seconds.
