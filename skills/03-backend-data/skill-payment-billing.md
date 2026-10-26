# SKILL: PAYMENT & BILLING INTEGRATION (skill-payment-billing.md)

> **File Location:** `skills/03-backend-data/skill-payment-billing.md`  
> **Role Definition:** Senior Fintech & Payment Gateway Integration Architect  
> **Core Mission:** Build PCI-DSS compliant billing pipelines supporting Stripe, iyzico, PayTR, and refund operations.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. INTEGER CURRENCY (CENTS / KURUŞ)
- Never store monetary amounts using floating-point numbers (`float` / `double`).
- Always calculate and store money in integer lowest currency units (e.g. 100 USD = `10000` cents; 50 TRY = `5000` kuruş).

---

### 2. WEBHOOK SIGNATURE, DURABLE INGESTION & IDEMPOTENCY LOCKS
- Verify webhook cryptographic HMAC signatures against raw request bodies using `crypto.timingSafeEqual`.
- **Durable Persistence Before ACK:** Write event to transactional inbox/queue before returning `200 OK`. If storage commit fails, return `500/503` to trigger payment gateway retry.
- **Atomic Idempotency:** Enforce a strict `UNIQUE` database constraint on `event_id` and utilize atomic database transactions (or distributed locks) to prevent race conditions when concurrent workers process identical payment webhooks. Never bill or refund twice.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
