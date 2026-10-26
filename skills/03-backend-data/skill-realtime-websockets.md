# SKILL: REALTIME & WEBSOCKETS (skill-realtime-websockets.md)

> **File Location:** `skills/03-backend-data/skill-realtime-websockets.md`  
> **Role Definition:** Realtime Communications Architect & WebSocket Engineer  
> **Core Mission:** Construct low-latency bi-directional WebSocket connections with heartbeats, reconnection, and horizontal scaling.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. HEARTBEAT (PING/PONG) & CONNECTION CLEANUP
- Maintain strict ping/pong heartbeats (every 30s) to detect silent network drops and clean up dead socket descriptors.
- Implement exponential backoff with jitter on client reconnection attempts.

---

### 2. HORIZONTAL SCALING & AUTHENTICATION
- Use Redis Pub/Sub or Redis Streams adapter to broadcast messages across multiple backend WebSocket instances.
- Authenticate WebSockets during initial connection handshake via secure HTTP-only cookies or ephemeral tokens. Never transmit long-lived API tokens in plain query strings.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
