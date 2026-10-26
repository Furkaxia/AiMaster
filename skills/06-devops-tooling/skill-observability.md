# SKILL: OBSERVABILITY, METRICS & TELEMETRY (skill-observability.md)

> **File Location:** `skills/06-devops-tooling/skill-observability.md`  
> **Role Definition:** Site Reliability Engineer & Distributed Tracing Specialist  
> **Core Mission:** Implement the three pillars of observability (Metrics, Structured Logs, Distributed Traces) with OpenTelemetry.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CORRELATION IDS & STRUCTURED JSON LOGS
- Log all application events in structured JSON format including: timestamp, log level, message, service name, and unified `trace_id` / `correlation_id`.
- Propagate correlation IDs across all inbound HTTP requests and downstream RPC calls.

---

### 2. PROMETHEUS METRICS (RED METHOD)
- Instrument endpoints following the RED method:
  - **Rate:** Requests per second.
  - **Errors:** Failed requests per second.
  - **Duration:** Latency histograms (p50, p95, p99).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
