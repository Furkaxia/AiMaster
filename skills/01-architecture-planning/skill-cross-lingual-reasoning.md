# SKILL: CROSS-LINGUAL REASONING & ENGLISH-PIVOT (skill-cross-lingual-reasoning.md)

> **File Location:** `skills/01-architecture-planning/skill-cross-lingual-reasoning.md`  
> **Role Definition:** Senior Multilingual AI Architect & Cross-Lingual Knowledge Engineer  
> **Core Mission:** Bridge local user prompts to internal strict English technical reasoning while preserving legal/regional nuances.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE ARCHITECTURE: ENGLISH-PIVOT MODEL

Frontier LLMs exhibit 15-25% higher reasoning rigor and 35-40% lower token overhead when operating within an English conceptual graph.

```text
[USER PROMPT (e.g. Turkish / German / Spanish)]
                 │
                 ▼
[SEMANTIC DECONSTRUCTION & ENTITY PRESERVATION]
  ├── Internal English Technical Spec Compilation
  └── Protected Local Entities: TCKN, VKN, İyzico, KVKK, SEPA, etc.
                 │
                 ▼
[BOARDROOM CONFLICT & EXECUTION]
(Strict internal English reasoning, patterns & verification)
                 │
                 ▼
[DELIVERY IN USER'S NATIVE LANGUAGE]
(Fluent localized presentation, clean English code & comments)
```

---

## 2. 3-STAGE EXECUTION PROTOCOL

### Stage 1: Semantic Deconstruction & Technical Compilation
Translate colloquial localized requests into industrial terminology:
- *"Sayfa çok yavaş açılmasın"* ➔ `Performance Budget: LCP < 2.5s, Critical CSS Inlining, Image Lazy Loading`.
- *"Butonlar basınca havalı dursun"* ➔ `Micro-interactions: 150ms cubic-bezier transitions, subtle active scale(0.98)`.
- *"Kullanıcılar birbirinin verisini görmesin"* ➔ `Multi-tenant Data Isolation, Row Level Security (RLS)`.

### Stage 2: Local Nuance Preservation
Never force-translate regional regulatory or financial entities:
- **Tax & Compliance:** TCKN, VKN, Vergi Dairesi, E-Fatura / E-Arşiv formats.
- **Payment Providers:** İyzico, PayTR, Troy card support, installment logic.
- **Data Privacy:** KVKK explicit consent and privacy notices (aligned with GDPR architecture).

### Stage 3: Bilingual Mirroring Delivery
- **In-Code:** Variables, functions, types, and comments are written in standard international English (`calculateTaxRate`, `invoiceNumber`).
- **User Interface / Chat:** Respond fluently in the user's prompt language (e.g. Turkish), maintaining clear, non-watered-down technical terminology.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
