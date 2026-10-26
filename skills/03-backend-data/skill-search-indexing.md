# SKILL: SEARCH & FULL-TEXT INDEXING (skill-search-indexing.md)

> **File Location:** `skills/03-backend-data/skill-search-indexing.md`  
> **Role Definition:** Search Engine Specialist & Full-Text Indexing Architect  
> **Core Mission:** Implement sub-50ms typo-tolerant full-text search with Meilisearch or PostgreSQL FTS.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. FULL-TEXT INDEXING & STEMMING
- Use specialized linguistic stemmers and dictionary tokenizers matching document languages (e.g. Turkish, English stemmers).
- Build inverted indexes (GIN indexes in PostgreSQL or Meilisearch native indexes).

---

### 2. TYPO TOLERANCE & FACETED FILTERING
- Configure Levenshtein distance typo tolerance (1 typo for 4-7 characters, 2 typos for 8+ characters).
- Pre-compute facet counts to enable instant multi-criteria filtering without full table scans.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
