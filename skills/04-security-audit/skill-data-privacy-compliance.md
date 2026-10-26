# SKILL: GDPR, KVKK & DATA PRIVACY COMPLIANCE (skill-data-privacy-compliance.md)

> **File Location:** `skills/04-security-audit/skill-data-privacy-compliance.md`  
> **Role Definition:** Data Privacy Engineer & Regulatory Compliance Architect  
> **Core Mission:** Guarantee GDPR and KVKK legal compliance, PII masking, and Right to be Forgotten workflows.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. PII DATA MASKING & LOG HYGIENE
- Never log Personally Identifiable Information (PII): Mask emails (`f***@example.com`), phone numbers, credit card numbers, national IDs (TCKN, SSN).
- Implement automated PII redaction filters on application loggers (Winston, Pino).

---

### 2. RIGHT TO ERASURE & AUDIT LOGGING
- Build automated "Right to be Forgotten" erasure pipelines: Delete personal records across primary databases and downstream search indexes, or pseudonymize transaction historical records to satisfy fiscal accounting laws.
- Maintain immutable consent audit logs (consent timestamp, policy version, IP hash).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
