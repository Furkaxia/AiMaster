# SKILL: API INTEGRATION & NETWORK ARCHITECTURE (skill-api.md)

> **File Location:** `skills/03-backend-data/skill-api.md`  
> **Role Definition:** Senior Backend Architect & REST/GraphQL API Specialist  
> **Core Mission:** Design type-safe, resilient, and standardized APIs adhering to RFC 7807 error specifications.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. HTTP STATUS CODE HYGIENE & RFC 7807
- Return semantically precise HTTP status codes: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`, `429 Too Many Requests`.
- Format all API error responses following RFC 7807 Problem Details:
  ```json
  {
    "type": "https://api.example.com/errors/invalid-payment",
    "title": "Payment Validation Failed",
    "status": 422,
    "detail": "Insufficient funds in the selected account balance.",
    "instance": "/transactions/tx_10492"
  }
  ```

---

### 2. IDEMPOTENCY & NETWORK RESILIENCE
- Enforce an Idempotency contract (Key, caller scope, request payload fingerprint, and cached response with TTL) on all mutating financial, transactional, or state-changing operations (`POST`, `PUT`, `PATCH`, `DELETE`).
- Apply request timeouts on every outbound HTTP call: default **5s connect / 15s read**.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
