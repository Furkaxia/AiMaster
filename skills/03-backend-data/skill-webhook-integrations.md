# SKILL: WEBHOOK INTEGRATIONS & INGESTION (skill-webhook-integrations.md)

> **File Location:** `skills/03-backend-data/skill-webhook-integrations.md`  
> **Role Definition:** Webhook Ingestion Architect & Event Delivery Specialist  
> **Core Mission:** Engineer secure, replay-attack-proof webhook ingestion and delivery pipelines.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. HMAC SIGNATURE VERIFICATION
- Verify incoming webhook signatures against raw body buffers using `crypto.timingSafeEqual` to eliminate timing side-channel attacks.
- Reject requests where timestamp header deviates by more than **5 minutes** from current server time to prevent replay attacks.

---

### 2. DURABLE ASYNCHRONOUS INGESTION
- Verify signature, then execute durable handoff to persistent queue or write-ahead log.
- Return `200/202 Accepted` ONLY after durable enqueue succeeds.
- If the background queue or broker is temporarily unavailable, return `503 Service Unavailable` (or `500`) to trigger the webhook provider's retry backoff. Never acknowledge an unpersisted event.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
