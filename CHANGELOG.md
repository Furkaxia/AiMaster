# Changelog

All notable changes to the **AiMaster** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-rc.1] - 2026-10-28

### 🚀 Highlights: The Agentic Boardroom Operating System
AiMaster transforms AI code models (in Cursor, Windsurf, Google Antigravity, Copilot, Claude, and ChatGPT) from erratic text generators into a disciplined, self-correcting Staff Engineering Council. This release candidate establishes empirical proof across live LLM inference benchmarks, AST semantic validation, adversarial mutation coverage, and token budgeting.

### Added
- **Tiered JIT Context Compiler (`benchmarks/lib/context-compiler.mjs`):**
  - Replaces monolithic prompt injection (~33KB / 11,000 tokens) with dynamic 3-tier knapsack assembly:
    - Tier 0: Core Constitutional Invariants (~350 tokens)
    - Tier 1: Task Domain Specifications (~400 tokens)
    - Tier 2: Active Knapsack Skills on Demand (~600–1,200 tokens)
  - Delivers **62% to 84% token reduction** across production benchmarks while eliminating context overflow.
- **Canonical Delivery Pipeline (`benchmarks/lib/canonical-delivery.mjs`):**
  - Strict `<canonical_delivery>` output-first protocol isolating compilable deliverables from internal deliberation and review traces.
  - Zero-preamble directive preventing reasoning models (such as Nemotron and DeepSeek) from burning completion budgets in pre-code conversational chatter.
- **Multi-Stage Deterministic Validator (`benchmarks/lib/validator-pipeline.mjs`):**
  - 7-stage validation pipeline:
    1. Canonical Boundary Extraction
    2. Structural & Truncation Integrity
    3. Constitutional Security Invariants (no `any`/`as any`, no hardcoded secrets, no `eval`)
    4. Anti-Pattern Scanners (scanned strictly on comment-stripped executable code)
    5. Required Architecture & API Signatures
    6. 43 Deterministic Semantic & Invariant Checkers
    7. Scientific Failure Classification
- **Adversarial Mutation Testing Suite (`tests/test-validator-mutations.mjs`):**
  - 12 deliberate adversarial mutations (timing attacks, TOCTOU symlink traversal, non-atomic race conditions, blocking table locks, type bypasses, eval injection, DLQ exhaustion, SSRF bypasses, idempotency bypasses, transaction leaks, UTC DST drift).
  - Achieved **100% (12/12) mutation rejection rate**, proving validators reject unsafe code reliably.
- **Token Budget & Integrity Engine (`benchmarks/lib/token-budget-engine.mjs`):**
  - Adaptive token budgeting based on model reasoning profiles and task complexity.
  - Truncation detection distinguishing provider token limits from genuine algorithmic completion.
- **Targeted Self-Healing & Recovery Engine (`benchmarks/lib/recovery-engine.mjs`):**
  - Surgical feedback loops isolating failed AST nodes rather than repeating generic instructions.
  - Granular tracking of Pass@1 versus Pass@Recovery.
- **50 Golden Empirical Architectural Tasks (`benchmarks/tasks/`):**
  - 50 real-world engineering tasks across 12 domains: Architecture, Auth, Backend, Bug Fixing, Concurrency, Database, DevOps, Frontend, Networking, Performance, Refactoring, and Security.
- **NVIDIA NIM & Multi-Model Live Benchmark Evaluation (`benchmarks/`):**
  - Zero-dependency client supporting 6 flagship models (`nvidia/nemotron-3.5-lightning-30b-a3b`, `minimaxai/minimax-m3.1-flash`, `meta/llama-3.2-11b-vision-instruct`, `poolside/laguna-xs-2.1`, `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning`, `nvidia/nemotron-3.5-super-vl-120b-a12b`).
  - 4-way comparative evaluation matrix: Plain AI vs RulesAI vs Legacy AiMaster vs AiMaster+ v3.0.
  - Wilson score 95% confidence intervals and automated parity gate enforcement.
- **CLI Verification Command (`bin/aimaster.js verify`):**
  - Executes 6-suite integrity checks (linters, fixtures, evals, engine, mutations, mock benchmarks) in under 6 seconds with zero external npm dependencies.

### Changed
- **Zero Third-Party Runtime Dependencies:** Pure Node.js ESM/CommonJS standard library implementation with zero external dependencies in `package.json`, eliminating third-party runtime supply-chain risk and dependency bloat.
- **Comment-Stripped Semantic Scanners:** Scanners strip single-line and multi-line comments before pattern matching, preventing false positives when refactored code references deprecated patterns in docstrings.

### Fixed
- Fixed CRLF newline normalization across Windows and POSIX in heading anchor verifiers.
- Fixed reasoning token exhaustion on Nemotron-30B by designating `isReasoning: true` with tailored token budgets.
- Fixed recovery prompt loop to enforce immediate code delivery without reciting negative constitutional rules in model monologue.

---

## [0.9.0] - 2026-10-15
### Added
- Initial 80 domain skills catalog under `skills/`.
- 11 Core Boardroom Protocols (`*-ai.md`).
- Multi-IDE integration templates for Cursor, Windsurf, Antigravity, Copilot, Claude, and ChatGPT.
- `RulesAI.md` constitutional rulebook.
