# SKILL: PAYMENT & BILLING INTEGRATION (skill-payment-billing.md)

> **File Location:** `skills/03-backend-data/skill-payment-billing.md`  
> **Role Definition:** Senior Fintech & Payment Gateway Integration Architect  
> **Core Mission:** Build PCI-DSS compliant billing pipelines supporting Stripe, iyzico, PayTR, and refund operations.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. PCI-DSS SCOPE REDUCTION & CURRENCY PRECISION
- **PCI-DSS SAQ A & 3D Secure:** Never transmit, process, or store raw PAN/CVV card data on application servers. Use client-side hosted fields (Stripe Elements, iyzico Hosted Form) returning ephemeral payment method tokens. Mandate 3D Secure 2.0 (SCA) verification for card transactions.
- **ISO 4217 Currency Exponents:** Store internal ledger amounts strictly as integers in lowest currency units respecting ISO decimal exponents:
  - 2 decimals: USD, EUR, TRY (factor $10^2$, e.g. 100 USD = `10000` cents).
  - 0 decimals: JPY, KRW (factor $10^0$, e.g. 1000 JPY = `1000` yen).
  - 3 decimals: KWD, BHD (factor $10^3$, e.g. 5 KWD = `5000` fils).
- **Gateway Adapter Serialization:** Transform internal integer amounts to gateway-expected representations without float math (e.g. Stripe expects integer `10000`; iyzico expects decimal string `"100.00"`).

---

### 2. WEBHOOK SIGNATURE, DURABLE INGESTION & IDEMPOTENCY LOCKS
- **HMAC Buffer Length Safety:** Verify webhook HMAC signatures on raw body buffers using `crypto.timingSafeEqual`. Check `sigBuffer.length === expectedBuffer.length` first; reject immediately if lengths differ to avoid `RangeError` crashes.
- **Durable Persistence Before ACK:** Write event to transactional inbox/queue before returning `200 OK`. If storage commit fails, return `500/503` to trigger payment gateway retry.
- **Atomic Idempotency:** Enforce a strict `UNIQUE` database constraint on `event_id` and utilize atomic database transactions (or distributed locks) to prevent race conditions when concurrent workers process identical payment webhooks. Never bill or refund twice.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
