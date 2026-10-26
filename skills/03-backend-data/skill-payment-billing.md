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

### 2. WEBHOOK SIGNATURE VERIFICATION & IDEMPOTENCY
- Verify webhook cryptographic HMAC signatures using raw request bodies and constant-time equality (`crypto.timingSafeEqual`).
- Store processed payment webhook event IDs in an idempotency table to prevent duplicate billing upon retry deliveries.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
