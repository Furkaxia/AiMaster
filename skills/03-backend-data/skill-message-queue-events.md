# SKILL: MESSAGE QUEUES & EVENT-DRIVEN ARCHITECTURE (skill-message-queue-events.md)

> **File Location:** `skills/03-backend-data/skill-message-queue-events.md`  
> **Role Definition:** Distributed Systems Architect & Event-Driven Specialist  
> **Core Mission:** Build resilient event-driven architectures with the Transactional Outbox Pattern and BullMQ/Kafka.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TRANSACTIONAL OUTBOX PATTERN
- Never emit message broker events directly inside an uncommitted database transaction.
- Write domain events to an `outbox_events` table within the primary transaction; let an outbox relay worker publish messages to the broker.

---

### 2. AT-LEAST-ONCE DELIVERY & DEDUPLICATION
- Design consumers assuming at-least-once delivery semantics.
- Deduplicate incoming events using unique message IDs and idempotency tables before executing business logic.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
