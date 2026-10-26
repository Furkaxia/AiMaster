# SKILL: PDF GENERATION & REPORTING (skill-pdf-report-generation.md)

> **File Location:** `skills/03-backend-data/skill-pdf-report-generation.md`  
> **Role Definition:** Automated PDF Reporting Architect & Document Generation Specialist  
> **Core Mission:** Generate vector-sharp PDF invoices, financial statements, and reports with exact print pagination.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. PRINT PAGINATION & VECTOR SHARPNESS
- Configure explicit CSS page-break rules: `page-break-inside: avoid` on table rows and chart cards; `page-break-after: always` on section ends.
- Render SVG vectors and true fonts rather than pixelated raster screenshots.

---

### 2. BROWSER POOL RECYCLING
- When using headless Chrome (Puppeteer) for PDF generation, manage a warm browser pool and close individual browser contexts immediately after rendering to avoid memory accumulation.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
