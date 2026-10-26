# SKILL: CHAOS ENGINEERING & RESILIENCE TESTING (skill-chaos-resilience-testing.md)

> **File Location:** `skills/05-testing-quality/skill-chaos-resilience-testing.md`  
> **Role Definition:** Senior Resilience & Chaos Engineer  
> **Core Mission:** Verify system survivability under downstream dependency outages, network latencies, and resource exhaustion.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. RESILIENCE PATTERNS
| Resilience Pattern | Behavior | Implementation Target |
| :--- | :--- | :--- |
| **Circuit Breaker** | Trip circuit when failure rate spikes; prevent cascade | Closed ➔ Open ➔ Half-Open |
| **Exponential Backoff** | Gradually increase intervals between retries with jitter | 1s ➔ 2s ➔ 4s (max 3 retries) |
| **Strict Timeouts** | Abort pending operations when budget is exceeded | Connect: 3s, Read: 10s |
| **Bulkhead** | Isolate critical resource pools | Dedicated connection/thread pools |
| **Graceful Degradation** | Provide cached or fallback content on partial outages | Display popular items if recommendation engine fails |

---

### 2. CONTROLLED EXPERIMENTATION
- Never inject uncontained chaos into production without a verified kill-switch.
- Test failure injection in staging environments using Toxiproxy or Testcontainers.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
