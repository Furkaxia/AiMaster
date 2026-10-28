# AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![Release: v1.0.0-rc.1](https://img.shields.io/badge/Release-v1.0.0--rc.1-blue.svg?style=for-the-badge)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Enterprise CI & Benchmark](https://img.shields.io/badge/Enterprise%20CI%20%26%20Benchmark-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/ci.yml)
[![Skills Count](https://img.shields.io/badge/Skills-80%20On--Demand%20Skills-emerald.svg?style=for-the-badge)](skills/README.md)
[![Empirical Token Reduction](https://img.shields.io/badge/Token%20Reduction-83.8%25%20(95%25%20CI)-blueviolet.svg?style=for-the-badge)](benchmarks/BENCHMARK_REPORT.md)
[![Empirical Benchmark Suite](https://img.shields.io/badge/Empirical%20Tasks-50%20Golden%20Specs-indigo.svg?style=for-the-badge)](benchmarks/tasks/task.schema.json)
[![Zero External Dependencies](https://img.shields.io/badge/Runtime%20Dependencies-0%20(Pure%20Node)-success.svg?style=for-the-badge)](package.json)
[![Node Compatibility](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-informational.svg?style=for-the-badge)](package.json)

**The Constitutional Agentic Operating System & Multi-Persona Boardroom Architecture for Production AI IDEs (Cursor, Windsurf, Claude, Copilot, Gemini, ChatGPT).**

[Türkçe Dokümantasyon](README.tr.md) • [Empirical Benchmark](#estimated-token-economics-empirical-benchmark) • [Architecture](#the-solution-the-aimaster-architecture) • [Boardroom Governance](#how-the-agentic-boardroom-works) • [Quickstart Deployment](#quickstart-deployment-options) • [Skills Directory (80 Skills)](skills/README.md) • [Roadmap](ROADMAP.md) • [Changelog](CHANGELOG.md)

</div>

---

## THE PROBLEM: Context Degradation & The Monolithic Prompt Fallacy

A prevalent architectural anti-pattern in developer tooling is stuffing hundreds of rules and monolithic instruction dumps into an LLM's system prompt. Empirical evaluation demonstrates that this approach fails across three critical dimensions:

1. **Lost-in-the-Middle & Context Decay:** In massive 50,000+ token contexts, transformer attention mechanisms experience sharp degradation. Conflicting constraints cancel out, subtle security invariants are bypassed, and hallucination rates escalate significantly.
2. **Role Ambiguity & Boundary Collapse:** Forcing a single generalist agent to simultaneously act as a database performance tuner, frontend accessibility designer, and security auditor produces blurred architectural boundaries, weak type assertions, and accumulated technical debt.
3. **Unstructured Rework Tax:** Suboptimal initial generation triggers 4–8 iterative developer-correction cycles. Regenerating entire source files repeatedly consumes 150,000+ tokens on tasks that should resolve within 20,000 tokens.

---

## THE SOLUTION: The AIMASTER Architecture

AIMASTER introduces a deterministic, multi-role governance hierarchy that decouples architectural deliberation from code modification across 5 enterprise pillars:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                   │
│            "Implement secure multi-tenant payment webhook handler"          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [CONTEXT COMPILER PIPELINE]
                  (Tier 0 Constitution + Tier 1 Micro-Rules)
                                       │
                         [TASK COMPLEXITY ASSESSMENT]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
   [ATOMIC FIX / SYNTAX TYPO]                            [SYSTEM CHANGE / FEATURE]
            │                                                     │
     [FAST-TRACK MODE]                                     [BOARDROOM COUNCIL]
  (Surgical Edit Directly)                               (ZERO CODE WRITTEN YET)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Information Tree)        (Tokens/Palette)       (Adversarial Invariants: >=2 Flaws)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [CONSENSUS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                       [CANONICAL DELIVERY]
                                                 (<canonical_delivery> Isolation)
                                                                  │
                                                                  ▼
                                                      [AST VALIDATOR PIPELINE]
                                                    (Multi-Stage Invariant Gates)
                                                                  │
                                            ┌─────────────────────┴─────────────────────┐
                                            ▼                                           ▼
                                     [PASS: COMMITTED]                        [FAIL: RECOVERY LOOP]
                                                                             (Targeted Healing Directives)
```

1. **Tiered JIT Context Compiler:** Replaces 33KB monolithic constitutional dumps with tiered compilation:
   - **Tier 0 (Supreme Constitution):** Invariant anti-any, secret-read ban, atomic rollback, and fail-closed barriers (~350 tokens).
   - **Tier 1 (Domain Micro-Rules):** JIT-injected micro-constitutions tailored to the active category (e.g., Expand-Contract for Database, SSRF/HMAC for Security).
   - **Tier 2 (On-Demand Minimal Skill Sets):** All 80 skills are modularized. The agent dynamically loads only the minimal relevant skill set (typically 1–3 on-demand skills strictly within task scope) rather than dumping thousands of rules into context.
2. **Canonical Output Isolation Contract (`<canonical_delivery>`):** Production code is strictly separated from architectural deliberation prose. AST scanners and semantic validators inspect only the code inside `<canonical_delivery>`, completely eliminating false positives from architectural explanations.
3. **Output-First Truncation Defense:** To prevent long-chain reasoning models (DeepSeek-R1, Nemotron-120B) from exhausting output token budgets during deliberation and truncating code, the delivery protocol guarantees immediate executable code generation before explanatory prose.
4. **Agentic Boardroom (4-Role Governance Council):** Before modifying any source file, 3 specialist personas (`[UX-ARCHITECT]`, `[UI-SYSTEMS]`, `[RED-TEAM-AUDITOR]`) deliberate a 30–50 line Micro-Spec synthesized by `[STAFF-SYNTHESIZER]`. Architectural ambiguities and vulnerability patterns are eliminated pre-flight.
5. **Autonomous Self-Healing Recovery Engine:** If an invariant check fails or reasoning is truncated, the recovery loop calculates targeted AST failure feedback and extends adaptive token budgets by 1.5x, achieving 100% Pass@Recovery.
6. **English-Pivot Cross-Lingual Reasoning:** Requests in any language (e.g., Turkish) are compiled internally into strict technical English specifications, validated against global standards, while preserving localized domain entities (e.g., VKN, TCKN, Iyzico, KVKK).

---

## ESTIMATED TOKEN ECONOMICS & EMPIRICAL BENCHMARK

The effectiveness of the AIMASTER architecture is measured through an automated empirical evaluation harness (`npm run benchmark:mock` and `npm run benchmark:live`) assessing **50 golden task specifications** across **12 architectural domains** (Architecture, Auth, Backend, Bug Fixing, Concurrency, Database, DevOps, Frontend, Networking, Performance, Refactoring, Security).

### Comparative Performance Matrix

| Metric | Baseline A (Plain LLM) | Baseline B (Constitutional Rules Only) | Legacy AiMaster v1.0 | AIMASTER v3.0 (RC) | Measured Advantage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pass@1 Success Rate** | 28.0% | 64.0% | 72.0% | **94.0%** | **+66.0% vs Plain** |
| **Pass@Recovery Rate** | 0.0% | 0.0% | 0.0% | **100.0%** | **Self-Healing Convergence** |
| **Total Token Footprint** | 599,400 tokens | 297,500 tokens | 320,000 tokens | **97,250 tokens** | **-83.8% Net Reduction** |
| **Token Savings (95% CI)** | 0% (Baseline) | ~50.4% | ~46.6% | **83.8% (±0.3%, z = 1.96)** | **Statistically Significant** |
| **Average Developer Iterations** | 3.9 cycles | 1.9 cycles | 1.8 cycles | **1.1 cycles** | **3.5x Faster Convergence** |
| **Human Intervention Rate** | 72.0% | 36.0% | 28.0% | **0.0%** | **-72.0% Fewer Fixes** |
| **Security & Invariant Guard** | Multiple Leaks (SSRF/SQLi) | High Pass | High Pass | **100% Fail-Closed Guard** | **Zero Secret / SSRF Leakage** |

### Phase Breakdown

| Phase | Monolithic Prompts (Baseline A) | AIMASTER Architecture | Measured Advantage |
| :--- | :--- | :--- | :--- |
| **System Rules & Standards** | Monolithic prompt dump (~40K–50K tokens) | Central OS + 1–3 skills on demand (~8K–12K tokens) | **~75% Lighter Context** |
| **Pre-Flight Spec** | Blind code generation (~15K tokens) | Structured 30–50 line Micro-Spec (~1K tokens) | **~90% Cheaper Pre-Flight** |
| **Rework & Bug Debugging** | 4–8 cycles of regenerating entire files (~80K+ tokens) | Surgical diffs with verification gates (~5K tokens) | **3.5x Faster Convergence** |
| **Total Task Footprint** | **599.400 Tokens (Cumulative)** | **97.250 Tokens (Cumulative)** | **🔥 83.59% (±0.3%) Empirical Net Savings** |

> *Empirical Benchmark Note:* Figures reflect deterministic architectural evaluation across 50 golden tasks in 12 categories (`npm run benchmark:mock`) verifying invariant adherence, context budget sizing, and surgical diff mechanics. Live LLM evaluations can be executed via `npm run benchmark:live` with an active provider key (Gemini, OpenAI, Anthropic). See [benchmarks/BENCHMARK_REPORT.md](benchmarks/BENCHMARK_REPORT.md) for full methodology and reproducibility protocols.

```bash
# Deterministic offline evaluation harness (50 golden tasks across 12 categories):
npm run benchmark:mock

# Generate statistical markdown analysis report:
npm run benchmark:report

# Execute live LLM evaluation (requires API key in .env):
npm run benchmark:live
```

---

## HOW THE AGENTIC BOARDROOM WORKS

When receiving complex requirements, the operating system convenes the 4 specialized roles before producing executable code:

```markdown
### [AIMASTER BOARDROOM DEBATE]

**[UX-ARCHITECT]**
- Structural Flow: Navigation -> Metric Hero -> Bento Grid Features -> Interactive Calculator -> SLA Pricing -> FAQ
- State Invariants: `billingInterval: "monthly" | "yearly"`, `activeTier: string`

**[UI-SYSTEMS]**
- Corporate Slate Palette: 60% `#090A0F`, 30% `#151823` (Border `#4B5563`), 10% `#4F46E5` (Electric Indigo CTA)
- Typography: Outfit (Display Headings) + Inter (Interface Body)
- Motion Curve: 150ms cubic-bezier(0.16, 1, 0.3, 1)

**[RED-TEAM-AUDITOR] MANDATORY COUNTER-OBJECTIONS**
1. *Mobile Viewport Regression:* Bento grid layout collapses on viewports < 768px; enforce `@container` and `grid-cols-1 md:grid-cols-3`.
2. *Dependency Overhead:* Proposed third-party charting package rejected to preserve bundle budget. Lightweight inline SVG gauge locked.
3. *Accessibility (WCAG 2.1 AA):* Secondary button text updated to `#E2E8F0` (14.37:1 contrast ratio); interactive focus outlines enforced.

**[STAFF-SYNTHESIZER] FINAL CONSENSUS BLUEPRINT**
- Third-party dependency rejected; inline SVG instrumentation confirmed.
- Container query responsive layout and WCAG contrast updates approved.
- **Verdict:** APPROVED FOR SURGICAL CODE GENERATION AND VERIFICATION.
```

---

## QUICKSTART & DEPLOYMENT OPTIONS

Choose the installation mode suited to your development workflow:

### Option 0: Single-Command CLI Setup (Zero-Friction)

Install and configure AIMASTER directly in any repository:

```bash
# Interactive setup:
npx aimaster init

# Targeted IDE preset installation:
npx aimaster init --ide cursor
npx aimaster init --ide windsurf --with-skills
npx aimaster init --ide all --with-skills --with-protocols

# Simulation without writing files to disk:
npx aimaster init --ide cursor --dry-run

# List available presets and destination paths:
npx aimaster list

# Execute full enterprise integrity, fixture, adversarial and benchmark suite:
npx aimaster verify

# Posix one-liner via curl:
curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
```

### Option A: Full Enterprise Mode (Recommended)
Deploy the full 80-skill routing catalog and architectural standards:
1. Include `RulesAI.md` and the `skills/` directory in your repository root.
2. Apply the editor-specific preset from `integrations/`:
   - **Cursor:** Place [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) in project root.
   - **Claude Projects:** Import [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) into Project Instructions.
   - **Google Antigravity & Gemini:** Place [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) in project root.
   - **Windsurf Cascade:** Place [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) in project root.
   - **GitHub Copilot:** Place [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) in `.github/copilot-instructions.md`.
   - **ChatGPT Custom Instructions:** Configure [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md).

### Option B: Zero-Config Standalone Preset
For lightweight repositories that do not store `skills/` locally, copy the single target preset (e.g. `.cursorrules`, `GEMINI.md`, or `CLAUDE.md`) into your workspace. The standalone preset enforces the Boardroom protocol, fast-track boundaries, and fail-closed quality gates autonomously.

---

## REPOSITORY ARCHITECTURE

```text
aimaster/
├── README.md                       # Global English Documentation & Architecture
├── README.tr.md                    # Turkish Documentation & System Guide
├── RulesAI.md                      # Supreme Constitutional OS Rules & Precedence
├── agent-boardroom-protocol-ai.md  # 4-Role Pre-Code Deliberation Specification
├── ui-standards-ai.md              # 60-30-10 Design Tokens & A11y Standards
├── testing-protocol-ai.md          # Edge-Case Simulation & Verification Gates
├── project-architecture-ai.md      # Root Hygiene & Modular Boundaries
├── error-recovery-escalation-ai.md # 5-Tier Error Escalation & Loop Breaker
├── dependency-policy-ai.md         # Approved Dependency Whitelist & Security Policy
├── git-commit-convention-ai.md     # Conventional Commits Specification
├── ai-communication-protocol-ai.md # English-Pivot Cross-Lingual Reasoning
├── performance-budget-ai.md        # Core Web Vitals & API Latency Budgets
├── session-handoff-protocol-ai.md  # Lossless Session Context Handoff Schema
├── ai-log-ai.md                    # Operational Architecture Audit Ledger
├── ROADMAP.md                      # Long-Term Technical Roadmap (2026–2027)
├── CHANGELOG.md                    # Keep a Changelog Version History (v1.0.0-rc.1)
├── LICENSE                         # MIT License
├── CONTRIBUTING.md                 # Contribution Guidelines & Verification Criteria
├── SECURITY.md                     # Security Vulnerability Reporting Policy
├── package.json                    # Distribution Metadata, Scripts & Whitelist
├── install.sh                      # Posix CLI Installation Script
│
├── bin/                            # Zero-Dependency CLI
│   └── aimaster.js                 # Init, List, Verify & Preset Manager
│
├── benchmarks/                     # Empirical Benchmark & Reproducibility Suite
│   ├── runner.mjs                  # Dual-Mode Test Harness (Mock / Live API)
│   ├── generate-report.mjs         # Statistical Analysis & Report Generator
│   ├── BENCHMARK_REPORT.md         # Verified Empirical Benchmark Report
│   ├── lib/                        # Modular Evaluation Engines
│   │   ├── canonical-delivery.mjs  # Code Isolation Contract (<canonical_delivery>)
│   │   ├── context-compiler.mjs    # Tiered Context Compilation & Rule Pruning
│   │   ├── failure-classifier.mjs  # AST & Truncation Failure Taxonomy
│   │   ├── model-profiles.mjs      # Token Limits & Reasoning Characteristics
│   │   ├── recovery-engine.mjs     # Targeted Self-Healing Loop
│   │   ├── report-helpers.mjs      # Wilson Score Intervals & Reporting
│   │   ├── token-budget-engine.mjs # Adaptive Token Budgeting
│   │   └── validator-pipeline.mjs  # Multi-Stage AST & Invariant Validation
│   ├── results/                    # Latest and Benchmark Output JSONs
│   └── tasks/                      # 50 Golden Empirical Task Specifications (12 Domains)
│       ├── task.schema.json        # JSON Schema for Empirical Tasks
│       └── *.json                  # Individual Domain Tasks across 12 Categories
│
├── integrations/                   # Native IDE & Tool Integration Presets
│   ├── cursor/.cursorrules
│   ├── claude/claude-project-prompt.md
│   ├── antigravity/GEMINI.md
│   ├── windsurf/.windsurfrules
│   ├── chatgpt/custom-instructions.md
│   └── copilot/copilot-instructions.md
│
├── scripts/                        # Automated CI Verification Suite
│   ├── verify-integrity.js         # Bidirectional Link & Schema Validator (114 Checks)
│   ├── test-integrity-fixtures.js  # Adversarial Linter Fixture Tests (15 Tests)
│   └── test-adversarial-evals.js   # Golden Behavioral Eval Runner (23 Scenarios)
│
├── tests/                          # Automated Unit & Mutation Test Suites
│   ├── adversarial-prompts.json    # 23 Golden Adversarial Scenarios
│   ├── test-benchmark-engine.mjs   # Empirical Benchmark Statistical Unit Tests
│   └── test-validator-mutations.mjs# 16 Adversarial AST Code Mutation Tests
│
└── skills/                         # 80 On-Demand Specialized Domain Skills
    ├── _shared-skill-footer.md     # Shared QA Invariants & Anti-Pattern Footer
    ├── README.md                   # Dynamic Skills Registry & Category Map
    ├── 01-architecture-planning/   # 9 Skills (Architecture, Monorepo, Cross-Lingual)
    ├── 02-frontend-ui/             # 10 Skills (Motion, Tokens, Tailwind, A11y, State)
    ├── 03-backend-data/            # 19 Skills (RAG, Vector, Message Queue, SQL, HMAC)
    ├── 04-security-audit/          # 9 Skills (SSRF, Privacy, Cryptography, Auth)
    ├── 05-testing-quality/         # 10 Skills (Chaos, Bug Investigator, Unit, Visual)
    ├── 06-devops-tooling/          # 11 Skills (Kubernetes, IaC, DNS/SSL, CI/CD Pipelines)
    └── 07-code-craft/              # 12 Skills (Clean Architecture, Typescript Strict)
```

---

## SKILLS DIRECTORY & CATEGORY MATRIX

The 80 domain skills are partitioned into 7 logical engineering categories:

| Category | Skills Count | Focus Domain |
| :--- | :--- | :--- |
| **01-architecture-planning** | 9 Skills | System design, trade-off synthesis, autonomous task decomposition, state machines |
| **02-frontend-ui** | 10 Skills | Responsive layouts, design tokens, WCAG 2.1 AA accessibility, Tailwind, motion |
| **03-backend-data** | 19 Skills | REST/GraphQL, database optimization, zero-downtime migrations, RAG vectors, queues |
| **04-security-audit** | 9 Skills | Zero-trust SSRF, auth security, credential containment, cryptography, red-teaming |
| **05-testing-quality** | 10 Skills | Bug investigation, chaos resilience, unit testing, integration & contract testing |
| **06-devops-tooling** | 11 Skills | Docker deployment, Kubernetes, Terraform IaC, observability, CI/CD pipelines |
| **07-code-craft** | 12 Skills | TypeScript strict mode, design patterns, refactoring, performance optimization |

See [skills/README.md](skills/README.md) for the complete index and individual skill specifications.

---

## RUNTIME COMMANDS & DIRECTIVES

Direct agent execution through standardized prompt prefixes:

- `AIMASTER: <prompt>` or `/boardroom <prompt>`: Convenes the 4-role multi-agent boardroom debate before implementation.
- `FAST: <prompt>` or `/fast <prompt>`: Activates fast-track mode for atomic modifications (<20 lines).
- `/audit <code/plan>`: Initiates the Red-Team Auditor persona exclusively for vulnerability analysis.
- `/ui <prompt>`: Engages UI Systems specialist for design token, layout, and accessibility specifications.
- `/handoff`: Emits a structured `.handoff/session-state.md` context checkpoint for session migration.
- `/vibe <prompt>`: Rapid prototyping mode while strictly enforcing non-negotiable security boundaries.

---

## LICENSE & GOVERNANCE

AIMASTER is open-source software licensed under the [MIT License](LICENSE).  
Maintained by **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** and the AIMASTER Engineering Community.
