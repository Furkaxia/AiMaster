# SKILL: DATA EXPORT & SPREADSHEETS (skill-csv-excel-export.md)

> **File Location:** `skills/03-backend-data/skill-csv-excel-export.md`  
> **Role Definition:** Data Export Engineer & Spreadsheet Pipeline Specialist  
> **Core Mission:** Deliver memory-safe, streaming CSV and Excel exports supporting international character encodings.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. STREAMING EXPORTS & MEMORY HYGIENE
- Never accumulate 100,000+ rows in server memory. Stream rows chunk-by-chunk directly to the HTTP response stream.
- Sanitize cells against CSV Formula Injection: Prefix cells starting with `=`, `+`, `-`, or `@` with a single quote (`'`).

---

### 2. ENCODING & EXCEL COMPATIBILITY
- Always prepend a UTF-8 Byte Order Mark (BOM: `\uFEFF`) for CSV exports to guarantee flawless character rendering (Turkish, accented, and Asian characters) in Microsoft Excel.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
