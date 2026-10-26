# PERFORMANCE BUDGET & METRICS (performance-budget-ai.md)

> **File Location:** `performance-budget-ai.md`  
> **Role Definition:** Staff Performance Engineer & Metric Analyst  
> **Core Mission:** Define measurable performance thresholds, converting subjective "fast/slow" assessments into concrete engineering SLAs and budgets.  
> **Standard Compliance:** RulesAI.md Constitutional Performance Standard

---

## 0. THRESHOLD POLICY & HIERARCHY

Performance budgets serve as engineering targets rather than blind pass/fail gates. The framework evaluates thresholds across 4 distinct tiers:

1. **Hard Requirements:** Security invariants, data integrity, authorization controls, secret protection, and explicit contractual SLAs. These can never be compromised.
2. **Default Engineering Targets:** Industry-standard baselines for standard web and mobile applications (e.g. Core Web Vitals, API p95 latencies, 200KB bundle budgets). The Agent targets these values by default.
3. **Project-Specific SLOs:** Tailored service level objectives governed by project domain (e.g. ML dashboards, 3D/Canvas web games, Chromium-embedded Electron tools).
4. **Documented Exception Protocol:** When a heavy component (e.g. Monaco Editor, PDF renderer, TensorFlow.js) legitimately exceeds default budgets, the Agent does not break architecture; it documents the technical justification and blast radius explicitly in the `🧪 [QA TEST ÖZETİ]`.

---

## 1. WEB PERFORMANCE BUDGET (CORE WEB VITALS)

Google Core Web Vitals and page lifecycle metrics:

| Metric | Technical Description | 🟢 Good | 🟡 Needs Work | 🔴 Poor |
| :--- | :--- | :--- | :--- | :--- |
| **FCP** (First Contentful Paint) | Initial DOM content rendered | < 1.8s | < 3.0s | > 3.0s |
| **LCP** (Largest Contentful Paint) | Main hero content rendered | < 2.5s | < 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | UI responsiveness to user input | < 200ms | < 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability during load | < 0.1 | < 0.25 | > 0.25 |
| **TTFB** (Time to First Byte) | Initial server network response | < 800ms | < 1.8s | > 1.8s |
| **TBT** (Total Blocking Time) | Main thread task blockage | < 200ms | < 600ms | > 600ms |

### Minimum Lighthouse Baselines
| Audit Category | Minimum Score |
| :--- | :--- |
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## 2. BUNDLE SIZE BUDGETS

| Asset Category | Max Budget (gzip) | Warning Threshold |
| :--- | :--- | :--- |
| **JavaScript (total)** | 200 KB | > 150 KB |
| **CSS (total)** | 50 KB | > 35 KB |
| **Initial Critical JS (page-load)** | 100 KB | > 75 KB |
| **Single Component Chunk** | 30 KB | > 20 KB |
| **Single Visual Image Asset** | 200 KB | > 100 KB |
| **Web Typography (total fonts)** | 100 KB | > 60 KB |

### Bundle Optimization Directives
- **Tree-Shaking:** Eliminate unused exports at build time.
- **Code Splitting:** Mandatory route-based dynamic imports (`React.lazy`, dynamic `import()`).
- **Image Optimization:** Modern formats (WebP, AVIF), responsive `srcset`, and native `loading="lazy"`.
- **Font Subsetting:** Package only glyph sets required for active locales.

---

## 3. API PERFORMANCE BUDGETS

| Endpoint Classification | Max p95 Response Time | Timeout SLA |
| :--- | :--- | :--- |
| Simple GET (single record) | 100ms | 5s |
| Paginated List GET | 300ms | 10s |
| Search & Multi-Filter Query | 500ms | 10s |
| POST / PUT (write mutation) | 300ms | 10s |
| Streaming File Upload | Streaming pipeline | 30s |
| Report & Export Generation | Background job | 60s |
| Batch Data Mutation | Asynchronous queue | 120s |

### API Performance Directives
- **Mandatory Pagination:** Enforced on any endpoint returning >=50 records. Default `limit: 20`, maximum `limit: 100`.
- **N+1 Query Elimination:** Resolve relational data in a single database round-trip (eager joins, includes).
- **Projection Disciplines:** Transmit only fields required by the client (enforce projection/selection).
- **HTTP Caching:** Implement caching headers (`Cache-Control`, `ETag`) or Redis caching for slow-moving data.

---

## 4. DESKTOP & ELECTRON PERFORMANCE BUDGETS

| Metric | Target SLA | Critical Threshold |
| :--- | :--- | :--- |
| App Cold-Start Boot Time | < 3s | > 5s |
| RAM Footprint (Idle) | < 150 MB | > 300 MB |
| RAM Footprint (Active) | < 500 MB | > 1 GB |
| CPU Utilization (Idle) | < 2% | > 10% |
| Disk I/O | Async, non-blocking | Synchronous blocking disk I/O |
| IPC Message Roundtrip | < 50ms | > 200ms |

### Desktop Directives
- **Main Thread Protection:** Offload CPU-intensive operations (PDF rendering, crypto, data parsing) to Worker Threads or child processes.
- **Memory Leak Mitigation:** Dismantle event listeners upon component unmount; terminate active intervals.
- **Packaging:** ASAR bundling; strict exclusion of development dependencies.

---

## 5. DATABASE QUERY PERFORMANCE BUDGETS

| Query Type | Max Target Latency | Optimization Action |
| :--- | :--- | :--- |
| Indexed Point Query | < 10ms | Maintain index selectivity |
| Relational Join (2–3 tables) | < 50ms | Audit query execution plan |
| Complex Analytic Aggregation | < 500ms | Deploy materialized views or caching |
| Full-Table Scan | Prohibited | Add composite index |
| Bulk Insert (1000+ records) | Batch insert | Wrap in single transaction |

---

## 6. PERFORMANCE VERIFICATION REPORT SCHEMA

Conclude performance optimization or major architectural feature deliveries with this report:

```text
📊 [PERFORMANCE AUDIT REPORT]
- Bundle Footprint: XX KB (JS) + XX KB (CSS) [gzip]
- Lighthouse Scores: Performance XX / Accessibility XX / SEO XX
- API Latencies: GET XX ms / POST XX ms (p95)
- Identified Bottlenecks: [None / Itemized list]
- Remediation Applied: [None / Itemized list]
```

---

## 7. VERIFICATION & QA CHECKLIST

- [ ] Do Core Web Vitals satisfy target budgets?
- [ ] Does total bundle size remain within budget limits?
- [ ] Do API response times meet p95 latency targets?
- [ ] Were N+1 database queries eliminated?
- [ ] Were dynamic code splitting and lazy loading implemented?
- [ ] Were images optimized (WebP, responsive srcset, lazy loading)?
- [ ] Is main-thread blocking eliminated in desktop applications?
