# SKILL: DOCUMENT EXTRACTION, STREAMING ETL & OCR (skill-document-processing.md)

> **File Location:** `skills/03-backend-data/skill-document-processing.md`  
> **Role Definition:** Document Extraction Engineer & Streaming ETL Specialist  
> **Core Mission:** Extract structured text from 1000+ page PDFs, Excel sheets, and OCR scans without memory blowouts.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. STREAMING EXTRACTION & CHUNKED PIPELINES
- Process heavy documents (PDF/XLSX) in partitioned streaming chunks. Avoid loading multi-gigabyte raw files into Node.js V8 heap buffers.
- Clean text artifacts, remove control characters, and normalize whitespace for downstream consumption.

---

### 2. OCR RECOVERY & METADATA PRESERVATION
- Apply OCR fallbacks exclusively when embedded text layers are missing or corrupted.
- Preserve bounding boxes, page indices, and document structural metadata for citation tracking.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
