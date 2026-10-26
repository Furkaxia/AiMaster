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

### 4. ZERO-TRUST SECURITY, PRIVACY & INJECTION DEFENSE
- **Zero-Trust Tenant Binding (Single-Stage Pre-Filtering):** `tenant_id` and ACL filters must NEVER be accepted from LLM tool-call arguments, client payloads, or user prompts. Always bind tenant and user identity directly from the verified server-side session/JWT context into the vector database query as a mandatory Single-Stage Pre-Filter (HNSW pre-filtering). Never use post-filtering (filtering top-K results after vector search), which leaks cross-tenant existence via timing/score side channels and causes recall collapse.
- **Pre-Embedding PII Scrubbing & Erasure Tombstoning:** Raw PII (National IDs, SSNs, IBANs, phone numbers, emails) must be deterministically redacted (`[REDACTED_PII_HASH]`) *before* chunking and embedding generation to prevent high-dimensional Embedding Inversion Attacks. Every vector embedding record must carry `source_document_id` and `user_id` metadata to support millisecond-grade Right to Erasure / GDPR / KVKK compliance via targeted hard deletion (`deleteByFilter`).
- **Data-Instruction Delimitation (Indirect Prompt Injection Firewall):** Retrieved document chunks must be strictly encapsulated inside `<untrusted_context>` XML delimiters when passed into the LLM synthesis prompt. Explicitly instruct the model that text within `<untrusted_context>` is passive reference data only and that any embedded instructions, prompt overrides, or system commands must be completely ignored.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
