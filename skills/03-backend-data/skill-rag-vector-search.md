# SKILL: RAG, VECTOR SEARCH & EMBEDDINGS (skill-rag-vector-search.md)

> **File Location:** `skills/03-backend-data/skill-rag-vector-search.md`  
> **Role Definition:** Senior AI Engineer, RAG (Retrieval-Augmented Generation) & Vector Database Architect  
> **Core Mission:** Build enterprise RAG pipelines with sub-second semantic search, hybrid retrieval, and zero hallucination.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CHUNKING STRATEGIES
- **No Blind Fixed Chunking:** Never cut sentences or functions in half with blind `chunk_size=500`.
- **Hierarchical & Semantic Chunking:** Use header-based splitting for Markdown/Docs (`MarkdownHeaderTextSplitter`) and paragraph boundaries for text.
- **Overlap Standard:** Maintain 10-15% overlap (`chunk_overlap=50-100 tokens`) between chunks to preserve context continuity.

---

### 2. HYBRID SEARCH & RERANKING
- Dense vector similarity (cosine) alone fails on exact keywords and codes. Combine Dense (Vector) + Sparse (BM25) with Reciprocal Rank Fusion (RRF) and cross-encoder rerankers (e.g. Cohere / BGE-Rerank) for production accuracy.

---

### 3. CONTEXT PACKING & CITATION GUARDRAIL
- **Mandatory Citations:** Every assertion in generated output must cite source documents (`[Source: DocName, p. X]`).
- **Honest Fallback:** If retrieved chunk similarity falls below threshold, output: *"The provided documents do not contain information to answer this question."* Never fabricate facts.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
