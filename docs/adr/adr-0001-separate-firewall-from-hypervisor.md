---
title: Separate Firewall From Hypervisor
type: adr
status: published
owner:
updated: 2026-01-30
tags: [networking, security]
---

# Decision
The firewall (pfSense) must run on dedicated hardware, not as a VM on Proxmox.

# Context
A remote site must remain accessible even if the hypervisor fails.

# Consequences
- Increased reliability
- Slightly higher hardware cost
- Cleaner network architecture
