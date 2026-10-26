# SKILL: EMAIL SERVICE & TEMPLATE ENGINE (skill-email-service.md)

> **File Location:** `skills/03-backend-data/skill-email-service.md`  
> **Role Definition:** Email Deliverability Specialist & Transactional Messaging Engineer  
> **Core Mission:** Build responsive HTML email templates with 99%+ deliverability and SPF/DKIM/DMARC compliance.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. RESPONSIVE EMAIL RENDERING (MJML & INLINE CSS)
- Author email templates using MJML or React Email to ensure pixel-perfect rendering across Outlook, Gmail, and Apple Mail.
- Inline all CSS styles automatically. Never rely on external stylesheets or unsupported CSS properties (`flexbox`, `grid` are poorly supported in legacy Outlook).

---

### 2. DELIVERABILITY & COMPLIANCE
- Enforce SPF, DKIM, and DMARC alignment headers.
- Include mandatory One-Click Unsubscribe headers (`List-Unsubscribe`) on marketing and bulk notifications.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
