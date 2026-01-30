---
type: "concept"
title: "API Authentication Models"
version: "1.0.0"
tags: ["api", "authentication", "security"]
---

# API Authentication Models

## Summary

API authentication is the process of verifying that a client requesting a resource is who they claim to be. Common models include API keys, OAuth 2.0, JWT tokens, and mutual TLS, each offering different trade-offs between simplicity, security, and scalability.

---

## Overview

Authentication protects APIs from unauthorized access. Different models exist because security requirements vary: a public API has different needs than an internal service-to-service connection. Understanding the models helps you choose the right one for your context.

---

## Core Authentication Models

### 1. API Keys

**How it works:** Client includes a static key in every request (header, query parameter, or body).

**Pros:**
- Simple to implement and use
- Lightweight (low overhead)
- Good for public APIs with trusted clients

**Cons:**
- Key leakage = full compromise
- No expiration by default
- Difficult to rotate without downtime
- No fine-grained permissions

**Use when:** Building a simple public API, internal dashboards, or development environments.

---

### 2. OAuth 2.0

**How it works:** Client redirects user to an authorization server. After user approves, client receives an access token. Client uses token to request resources.

**Pros:**
- User never shares password with client
- Fine-grained permission scopes
- Tokens can expire and be revoked
- Standardized, well-understood
- Supports multiple clients (public + confidential)

**Cons:**
- More complex to implement
- Requires token refresh flow
- Depends on an authorization server (third-party or self-hosted)

**Use when:** Building web apps, mobile apps, or third-party integrations. Especially important if users authenticate.

---

### 3. JSON Web Tokens (JWT)

**How it works:** Client receives a signed token containing claims (user ID, permissions, expiration). Client includes token in requests. Server verifies signature without backend lookup.

**Pros:**
- Stateless (no server session lookup needed)
- Works across distributed systems
- Self-contained (includes all necessary info)
- Can be long-lived or short-lived

**Cons:**
- Token revocation is hard (no immediate invalidation)
- Token size can be large (includes all claims)
- Signature verification required for each request

**Use when:** Building microservices, mobile backends, or scenarios requiring stateless authentication.

---

### 4. Mutual TLS (mTLS)

**How it works:** Both client and server present certificates to each other. Each verifies the other's certificate before communication proceeds.

**Pros:**
- Cryptographically strong
- No username/password
- Both client and server are authenticated
- Excellent for service-to-service communication

**Cons:**
- Complex certificate management
- Higher computational overhead
- Not suitable for public APIs (clients can't manage certificates easily)
- Requires PKI infrastructure

**Use when:** Internal service-to-service communication, highly secure environments, or regulated industries.

---

## Trade-offs by Dimension

| Dimension | API Keys | OAuth 2.0 | JWT | mTLS |
|---|---|---|---|---|
| **Simplicity** | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★☆☆☆☆ |
| **Security** | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Scalability** | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★☆☆☆ |
| **Revocation** | ★☆☆☆☆ | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ |
| **User-Friendly** | ★★★★☆ | ★★★★★ | ★★☆☆☆ | ★☆☆☆☆ |

---

## When to Use Each

1. **API Keys:** Internal tools, public APIs with light security needs, development/testing.
2. **OAuth 2.0:** Any user-facing app, third-party integrations, delegated access.
3. **JWT:** Microservices, stateless backends, mobile apps, distributed systems.
4. **mTLS:** Internal service-to-service, high-security environments, zero-trust networks.

**Often combined:** Real systems mix models. Example: OAuth 2.0 for user login (generates JWT), then JWT for subsequent API calls. Backend services authenticate each other with mTLS.

---

## Related Concepts

- [Token-Based vs. Session-Based Authentication](../concepts/token-vs-session.md)
- [OAuth 2.0 Flows Deep Dive](../concepts/oauth-flows.md)
- [Zero-Trust Architecture](../concepts/zero-trust.md)

---

## Practical Application

- **Task:** [Implement OAuth 2.0 in a Web App](../tasks/implement-oauth.md)
- **Reference:** [OAuth 2.0 Scopes Reference](../reference/oauth-scopes.md)
- **Troubleshooting:** [OAuth Token Errors](../troubleshooting/oauth-token-errors.md)

---

## Annotation (For Template Learning)

**Why this structure works:**

1. **Summary:** Core idea in 1–2 sentences. Reader immediately understands the scope.
2. **Overview:** Context for *why* this matters (different needs = different models).
3. **Core Ideas:** Each model explained with pros, cons, and use cases. Mental models built, not procedures taught.
   - Structured sections build understanding.
   - No numbered steps (that would be Task territory).
4. **Trade-offs table:** Visual comparison. Helps readers choose.
5. **Related Concepts & Application:** Links to deeper theory (Concepts), practical how-to (Task), and reference material (Reference).

**What we avoid:**
- No implementation steps (e.g., "Here's how to implement OAuth 2.0" — that goes in Task)
- No error messages or troubleshooting (that goes in Troubleshooting)
- No detailed parameter lists (that goes in Reference)
- Focus is on understanding relationships and trade-offs, not execution.

This doc teaches *why* you'd choose one model over another. Implementation details go elsewhere.
