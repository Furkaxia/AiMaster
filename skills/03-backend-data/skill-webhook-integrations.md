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

### 2. ASYNCHRONOUS INGESTION
- Acknowledge incoming webhooks immediately (`200 OK`) after signature verification; push payloads to a background queue for asynchronous processing.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
