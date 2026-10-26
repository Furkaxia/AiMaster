# SKILL: WEBHOOK INTEGRATIONS & INGESTION (skill-webhook-integrations.md)

> **File Location:** `skills/03-backend-data/skill-webhook-integrations.md`  
> **Role Definition:** Webhook Ingestion Architect & Event Delivery Specialist  
> **Core Mission:** Engineer secure, replay-attack-proof webhook ingestion and delivery pipelines.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. HMAC SIGNATURE VERIFICATION & REPLAY WINDOW
- Verify incoming webhook cryptographic HMAC signatures using raw request body buffers and constant-time equality (`crypto.timingSafeEqual`) to eliminate timing side-channel attacks.
- Reject requests where the timestamp header deviates by more than **5 minutes** from current server time to prevent replay attacks.

---

### 2. DURABLE INGESTION (TRANSACTIONAL INBOX BEFORE ACK)
- **Persistence First:** Never acknowledge an unpersisted event. Verify signature, then write the event into a durable queue or transactional inbox table in the primary database *within an atomic transaction*.
- **Response Ordering:**
  1. Authenticate signature & timestamp window.
  2. Persist event payload into durable storage/inbox with status `PENDING`.
  3. Return `200/202 Accepted` **ONLY AFTER** persistent storage commit succeeds.
  4. If database or queue broker write fails, return `503 Service Unavailable` or `500 Internal Server Error` immediately to trigger the webhook sender's exponential backoff retry.
- **Worker Execution:** Asynchronous background workers pull from the durable inbox, execute business logic, and transition event state to `PROCESSED`.

---

### 3. IDEMPOTENCY & OUT-OF-ORDER EVENT RESILIENCE
- Store unique `event_id` with a strict `UNIQUE` database constraint in an idempotency table.
- If duplicate `event_id` arrives, return `200 OK` without re-executing business logic.
- Compare incoming entity version/timestamp against database record state; discard stale, out-of-order deliveries gracefully without overwriting newer state.
- Route failing events after 3–5 retry attempts to a Dead-Letter Queue (DLQ) with alert notification.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
