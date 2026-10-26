# AIMASTER SKILLS MASTER REGISTRY & DIRECTORY (skills)

Bu dizin, [RulesAI.md](../RulesAI.md) standartlarına tam uyumlu olarak organize edilmiş **80 adet uzmanlık yeteneğini (skills)** ve 1 paylaşılan çekirdek şablonu (`_shared-skill-footer.md`) 7 mantıksal kategoride yapılandırır.

---

## 📌 PAYLAŞILAN ŞABLON & MİMARİ STANDART
- **Paylaşılan Footer & QA Standartları:** [`_shared-skill-footer.md`](_shared-skill-footer.md)  
  *Tüm skill dosyalarında token tasarrufu ve standartizasyon sağlayan ortak Kesin Yasaklar, İcra Protokolü ve Doğrulama Kontrol Listesi şablonudur.*

---

## DİNAMİK YÖNLENDİRME VE KATEGORİ HARİTASI

### 01. Mimari, Planlama ve Sistem Analizi (`01-architecture-planning` — 9 Skill)
*Sistem tasarımı, mimari sentez, otonom planlama, kriz çözümü, API sürümleme, monorepo, cross-lingual reasoning ve durum makineleri.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [SOFTWARE ARCHITECTURE & SYSTEM DESIGN](01-architecture-planning/skill-software-architecture.md) | `skills/01-architecture-planning/skill-software-architecture.md` | Katmanlı mimari, DDD, modüler yapı |
| [ARCHITECTURAL SYNTHESIS & TRADE-OFF ANALYSIS](01-architecture-planning/skill-system-synthesizer.md) | `skills/01-architecture-planning/skill-system-synthesizer.md` | Teknoloji seçimi, CAP teoremi, trade-off |
| [AUTONOMOUS TASK DECOMPOSITION & PLANNING](01-architecture-planning/skill-autonomous-planner.md) | `skills/01-architecture-planning/skill-autonomous-planner.md` | Otonom iş kırılımı, atomik adımlar |
| [CRITICAL SYSTEM TROUBLESHOOTER](01-architecture-planning/skill-system-troubleshooter.md) | `skills/01-architecture-planning/skill-system-troubleshooter.md` | Kök neden analizi, sistem teşhisi |
| [PROMPT COMPILER & REFINER](01-architecture-planning/skill-prompt-compiler.md) | `skills/01-architecture-planning/skill-prompt-compiler.md` | Ham fikirleri yapılandırılmış talebe dönüştürme |
| [CROSS-LINGUAL REASONING & ENGLISH-PIVOT](01-architecture-planning/skill-cross-lingual-reasoning.md) | `skills/01-architecture-planning/skill-cross-lingual-reasoning.md` | Çok dilli anlamsal derleme, İngilizce pivot akıl yürütme |
| [FINITE STATE MACHINES & WORKFLOWS](01-architecture-planning/skill-state-machine-logic.md) | `skills/01-architecture-planning/skill-state-machine-logic.md` | Sipariş/işlem akışları, XState / FSM |
| [API VERSIONING & DEPRECATION STRATEGY](01-architecture-planning/skill-api-versioning.md) | `skills/01-architecture-planning/skill-api-versioning.md` | Sürümleme, breaking change ve sunset politikası |
| [MONOREPO & MULTI-PACKAGE ARCHITECTURE](01-architecture-planning/skill-monorepo-architecture.md) | `skills/01-architecture-planning/skill-monorepo-architecture.md` | Turborepo, Nx, paket sınırları, shared types |

### 02. Frontend, UI/UX ve Tasarım Standartları (`02-frontend-ui` — 10 Skill)
*Tasarım token'ları, hareket tasarımı, grafik görselleştirme, responsive akış, erişilebilirlik ve modern state.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [TAILWIND CSS & DESIGN SYSTEM](02-frontend-ui/skill-tailwind-design-system.md) | `skills/02-frontend-ui/skill-tailwind-design-system.md` | Tailwind token'ları, utility sınıfları |
| [RESPONSIVE WEB ARCHITECTURE](02-frontend-ui/skill-responsive-web.md) | `skills/02-frontend-ui/skill-responsive-web.md` | Breakpoints, fluid tipografi, mobil öncelik |
| [FRONTEND ACCESSIBILITY & A11Y](02-frontend-ui/skill-frontend-accessibility.md) | `skills/02-frontend-ui/skill-frontend-accessibility.md` | WCAG 2.1 AA, klavye gezintisi, ARIA |
| [ADVANCED FORMS & VALIDATION](02-frontend-ui/skill-form-validation.md) | `skills/02-frontend-ui/skill-form-validation.md` | Zod, React Hook Form, asenkron validasyon |
| [STATE & LIFECYCLE MANAGEMENT](02-frontend-ui/skill-state.md) | `skills/02-frontend-ui/skill-state.md` | Context, Zustand, render optimizasyonu |
| [METADATA & OPENGRAPH](02-frontend-ui/skill-seo-meta-generator.md) | `skills/02-frontend-ui/skill-seo-meta-generator.md` | SEO, OpenGraph kartları, dinamik OG |
| [AI IMAGE GENERATION & PROMPTS](02-frontend-ui/skill-ai-image-prompts.md) | `skills/02-frontend-ui/skill-ai-image-prompts.md` | AI görsel promptları ve banner tasarımı |
| [MOTION & ANIMATION ARCHITECTURE](02-frontend-ui/skill-animation-motion.md) | `skills/02-frontend-ui/skill-animation-motion.md` | 60 FPS garantisi, Framer Motion, micro-interactions |
| [COMPONENT LIBRARY & DESIGN TOKENS](02-frontend-ui/skill-design-tokens.md) | `skills/02-frontend-ui/skill-design-tokens.md` | Token hiyerarşisi, theme switcher, headless UI |
| [DATA VISUALIZATION & CHARTING](02-frontend-ui/skill-data-visualization.md) | `skills/02-frontend-ui/skill-data-visualization.md` | Responsive dashboard, Chart.js, renk körü uyumu |

### 03. Backend, Veritabanı ve Veri İşleme (`03-backend-data` — 19 Skill)
*API geliştirme, RAG & Vector DB, ödeme, mesaj kuyrukları, full-text search, transactional e-posta ve veritabanı.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [API INTEGRATION & NETWORK](03-backend-data/skill-api.md) | `skills/03-backend-data/skill-api.md` | REST / GraphQL tasarımı, HTTP durum kodları |
| [API AUTOPILOT & SDK CRAFTER](03-backend-data/skill-api-autopilot.md) | `skills/03-backend-data/skill-api-autopilot.md` | Tip güvenli istemci üretimi, SDK tasarımı |
| [WEBHOOK INTEGRATIONS & INGESTION](03-backend-data/skill-webhook-integrations.md) | `skills/03-backend-data/skill-webhook-integrations.md` | HMAC imza doğrulama, idempotency, retry |
| [REALTIME & WEBSOCKETS](03-backend-data/skill-realtime-websockets.md) | `skills/03-backend-data/skill-realtime-websockets.md` | Çift yönlü soket, heartbeat, room yönetimi |
| [DATABASE & SQL OPTIMIZATION](03-backend-data/skill-database.md) | `skills/03-backend-data/skill-database.md` | Şema tasarımı, ACID, normalizasyon |
| [DATABASE PERFORMANCE & QUERY TUNING](03-backend-data/skill-database-performance.md) | `skills/03-backend-data/skill-database-performance.md` | EXPLAIN ANALYZE, composite index, N+1 önleme |
| [DATA MIGRATION & SEEDING](03-backend-data/skill-migration-data-seed.md) | `skills/03-backend-data/skill-migration-data-seed.md` | Sıfır kesinti migration, seed scriptleri |
| [CACHING & PERFORMANCE SCALING](03-backend-data/skill-caching-redis.md) | `skills/03-backend-data/skill-caching-redis.md` | Redis, Cache-Aside, stale-while-revalidate |
| [BACKGROUND JOBS & CRON](03-backend-data/skill-background-cron.md) | `skills/03-backend-data/skill-background-cron.md` | Cron desenleri, zamanlanmış kuyruklar |
| [FILE I/O & STREAMING](03-backend-data/skill-file-system-io.md) | `skills/03-backend-data/skill-file-system-io.md` | Node stream, chunks, bellek tasarrufu |
| [DOCUMENT EXTRACTION, STREAMING ETL & OCR](03-backend-data/skill-document-processing.md) | `skills/03-backend-data/skill-document-processing.md` | 1000+ sayfa streaming, PDF/Excel/OCR parse |
| [RAG, VECTOR SEARCH & EMBEDDINGS](03-backend-data/skill-rag-vector-search.md) | `skills/03-backend-data/skill-rag-vector-search.md` | Vektör veritabanları, chunking, hybrid search, RRF |
| [PDF GENERATION & REPORTING](03-backend-data/skill-pdf-report-generation.md) | `skills/03-backend-data/skill-pdf-report-generation.md` | Vektörel PDF, fatura/rapor üretimi |
| [DATA EXPORT & SPREADSHEETS](03-backend-data/skill-csv-excel-export.md) | `skills/03-backend-data/skill-csv-excel-export.md` | Excel/CSV streaming export, BOM, UTF-8 |
| [REGEX & TEXT PROCESSING](03-backend-data/skill-regex-text-parsing.md) | `skills/03-backend-data/skill-regex-text-parsing.md` | ReDoS korumalı regex, pattern ayıklama |
| [MESSAGE QUEUE & EVENT-DRIVEN ARCHITECTURE](03-backend-data/skill-message-queue-events.md) | `skills/03-backend-data/skill-message-queue-events.md` | BullMQ, Kafka, RabbitMQ, DLQ, Outbox pattern |
| [SEARCH & FULL-TEXT INDEXING](03-backend-data/skill-search-indexing.md) | `skills/03-backend-data/skill-search-indexing.md` | Meilisearch, PG FTS, Türkçe stemming, facets |
| [EMAIL SERVICE & TEMPLATE ENGINE](03-backend-data/skill-email-service.md) | `skills/03-backend-data/skill-email-service.md` | Resend/SendGrid, MJML, SPF/DKIM/DMARC |
| [PAYMENT & BILLING INTEGRATION](03-backend-data/skill-payment-billing.md) | `skills/03-backend-data/skill-payment-billing.md` | Stripe, iyzico, PayTR, PCI DSS, kuruş hesabı |

### 04. Güvenlik, Kimlik Doğrulama ve Uyumluluk (`04-security-audit` — 9 Skill)
*Kriptografi, KVKK/GDPR uyumu, red-teaming, RBAC, web açıkları (OWASP) ve rate limiting.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [ADVERSARIAL AUDITING & RED-TEAMING](04-security-audit/skill-adversarial-auditor.md) | `skills/04-security-audit/skill-adversarial-auditor.md` | Saldırgan gözüyle güvenlik analizi, bypass testi |
| [AUTHENTICATION & ACCESS CONTROL](04-security-audit/skill-auth-security.md) | `skills/04-security-audit/skill-auth-security.md` | JWT, OAuth2, session, RBAC / ABAC |
| [CODE SECURITY & HARDENING](04-security-audit/skill-security-hardening.md) | `skills/04-security-audit/skill-security-hardening.md` | Güvenli kod kalıpları, statik analiz |
| [MODERN WEB APPLICATION SECURITY](04-security-audit/skill-web-security.md) | `skills/04-security-audit/skill-web-security.md` | XSS, CSRF, SSRF, SQLi, CORS politikası |
| [RATE LIMITING & ABUSE PROTECTION](04-security-audit/skill-rate-limiting-anti-abuse.md) | `skills/04-security-audit/skill-rate-limiting-anti-abuse.md` | Token bucket, sliding window, bot engelleme |
| [REVERSE ENGINEERING & PROTOCOL DISSECTION](04-security-audit/skill-reverse-engineer.md) | `skills/04-security-audit/skill-reverse-engineer.md` | API ve protokol analizi, payload dissection |
| [CONFIGURATION & ENV MANAGEMENT](04-security-audit/skill-env-config.md) | `skills/04-security-audit/skill-env-config.md` | Zero hardcode secrets, env şemaları |
| [GDPR, KVKK & DATA PRIVACY COMPLIANCE](04-security-audit/skill-data-privacy-compliance.md) | `skills/04-security-audit/skill-data-privacy-compliance.md` | Unutulma hakkı, veri maskeleme, rıza kaydı |
| [CRYPTOGRAPHY & SECURE DATA HANDLING](04-security-audit/skill-cryptography.md) | `skills/04-security-audit/skill-cryptography.md` | Argon2, AES-256-GCM, timing-attack önleme |

### 05. Test, Kalite Güvence ve Hata Tespiti (`05-testing-quality` — 10 Skill)
*Birim, entegrasyon, görsel regresyon, kaos mühendisliği, E2E tarayıcı testleri ve kod denetimi.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [UNIT & INTEGRATION TESTING](05-testing-quality/skill-unit-test-builder.md) | `skills/05-testing-quality/skill-unit-test-builder.md` | Jest, Vitest, izole birim testleri |
| [INTEGRATION TESTING](05-testing-quality/skill-integration-testing.md) | `skills/05-testing-quality/skill-integration-testing.md` | Modüller arası ve DB entegrasyon testleri |
| [BROWSER AUTOMATION & E2E TESTING](05-testing-quality/skill-browser-testing.md) | `skills/05-testing-quality/skill-browser-testing.md` | Playwright, kritik kullanıcı senaryoları |
| [API CONTRACT & SCHEMA VALIDATION](05-testing-quality/skill-api-contract-testing.md) | `skills/05-testing-quality/skill-api-contract-testing.md` | OpenAPI sözleşme doğrulaması |
| [PERFORMANCE & LOAD TESTING](05-testing-quality/skill-performance-testing.md) | `skills/05-testing-quality/skill-performance-testing.md` | K6, yük testi, eşzamanlılık darboğazları |
| [ROOT CAUSE BUG INVESTIGATION](05-testing-quality/skill-bug-investigator.md) | `skills/05-testing-quality/skill-bug-investigator.md` | Reproduce adımları, kök neden analizi |
| [RIGOROUS CODE REVIEW & AUDIT](05-testing-quality/skill-code-review.md) | `skills/05-testing-quality/skill-code-review.md` | İkinci geçiş Staff/Principal seviye kod review |
| [REALISTIC MOCK DATA GENERATION](05-testing-quality/skill-mock-data-generator.md) | `skills/05-testing-quality/skill-mock-data-generator.md` | Tutarlı ve gerçekçi fixture/mock üretimi |
| [VISUAL REGRESSION & SNAPSHOT TESTING](05-testing-quality/skill-visual-regression-testing.md) | `skills/05-testing-quality/skill-visual-regression-testing.md` | Pixel-diff eşikleri, Playwright screenshot test |
| [CHAOS ENGINEERING & RESILIENCE TESTING](05-testing-quality/skill-chaos-resilience-testing.md) | `skills/05-testing-quality/skill-chaos-resilience-testing.md` | Circuit breaker, timeout, graceful degradation |

### 06. DevOps, Bulut ve Altyapı (`06-devops-tooling` — 11 Skill)
*Kubernetes, IaC (Terraform), DNS & SSL, Docker, CI/CD, Git disiplini ve gözlemlenebilirlik.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [DOCKER & CONTAINERIZATION](06-devops-tooling/skill-docker-deployment.md) | `skills/06-devops-tooling/skill-docker-deployment.md` | Multi-stage build, hafif ve güvenli imaj |
| [CI/CD PIPELINES & AUTOMATION](06-devops-tooling/skill-ci-cd-pipeline.md) | `skills/06-devops-tooling/skill-ci-cd-pipeline.md` | GitHub Actions, test otomasyonu, staging |
| [GIT DISCIPLINE & COMMIT STANDARDS](06-devops-tooling/skill-clean-git-ci.md) | `skills/06-devops-tooling/skill-clean-git-ci.md` | Conventional Commits, atomik commit akışı |
| [ADVANCED GIT WORKFLOW & BRANCHING](06-devops-tooling/skill-git-workflow.md) | `skills/06-devops-tooling/skill-git-workflow.md` | Dal stratejileri, merge conflict çözümü |
| [DEPENDENCY MANAGEMENT & AUDIT](06-devops-tooling/skill-dependency-management.md) | `skills/06-devops-tooling/skill-dependency-management.md` | Sürüm kilidi, CVE denetimi, temizleme |
| [OBSERVABILITY, METRICS & TRACING](06-devops-tooling/skill-observability.md) | `skills/06-devops-tooling/skill-observability.md` | OpenTelemetry, Prometheus, structured logs |
| [CLI & TERMINAL TOOLS](06-devops-tooling/skill-cli-tools.md) | `skills/06-devops-tooling/skill-cli-tools.md` | Etkileşimli CLI geliştirme, flag parsing |
| [AUTOMATION & BOT ENGINEERING](06-devops-tooling/skill-automation.md) | `skills/06-devops-tooling/skill-automation.md` | Headless browser otomasyonu, bot scriptleri |
| [KUBERNETES & CONTAINER ORCHESTRATION](06-devops-tooling/skill-kubernetes-orchestration.md) | `skills/06-devops-tooling/skill-kubernetes-orchestration.md` | Pod, Deployment, Service, Ingress, HPA, Health |
| [INFRASTRUCTURE AS CODE (IaC)](06-devops-tooling/skill-infrastructure-as-code.md) | `skills/06-devops-tooling/skill-infrastructure-as-code.md` | Terraform, modüler yapı, state yönetimi |
| [DNS, DOMAIN & SSL/TLS MANAGEMENT](06-devops-tooling/skill-dns-ssl-management.md) | `skills/06-devops-tooling/skill-dns-ssl-management.md` | DNS kayıtları, Let's Encrypt, HSTS, TLS |

### 07. Modern Kodlama, Refactoring ve Mimari İlkeler (`07-code-craft` — 12 Skill)
*Tasarım desenleri (GoF/SOLID), i18n runtime, katı TypeScript, cerrahi bağlam ve platformlar.*

| Skill Başlığı | Bağıl Dosya Yolu | Açıklama |
| :--- | :--- | :--- |
| [DESIGN PATTERNS & SOFTWARE PRINCIPLES](07-code-craft/skill-design-patterns.md) | `skills/07-code-craft/skill-design-patterns.md` | GoF desenleri, SOLID, Dependency Injection |
| [INTERNATIONALIZATION (i18n) RUNTIME & PLURAL RULES](07-code-craft/skill-i18n-runtime.md) | `skills/07-code-craft/skill-i18n-runtime.md` | Intl API, plural kuralları, dinamik sözlük |
| [MODERN CODE CRAFTSMANSHIP & IDIOMATIC PATTERNS](07-code-craft/skill-modern-code-craft.md) | `skills/07-code-craft/skill-modern-code-craft.md` | Temiz kod, erken return, immutability |
| [TYPESCRIPT & STRICT TYPING](07-code-craft/skill-typescript-strict.md) | `skills/07-code-craft/skill-typescript-strict.md` | Anti-any, generics, discriminated unions |
| [CODE REFACTORING & CLEANUP](07-code-craft/skill-refactor-cleanup.md) | `skills/07-code-craft/skill-refactor-cleanup.md` | Ölü kod temizliği, fonksiyon ayrıştırma |
| [PERFORMANCE & BUNDLE OPTIMIZATION](07-code-craft/skill-performance-optimization.md) | `skills/07-code-craft/skill-performance-optimization.md` | Tree-shaking, lazy load, memoization |
| [ERROR HANDLING & LOGGING](07-code-craft/skill-error-handling-logging.md) | `skills/07-code-craft/skill-error-handling-logging.md` | Özel hata sınıfları, error boundary |
| [DOCUMENTATION & README ARCHITECTURE](07-code-craft/skill-readme-docs.md) | `skills/07-code-craft/skill-readme-docs.md` | Kapsamlı dokümantasyon, JSDoc standartları |
| [SURGICAL CONTEXT & LARGE FILE INDEXING](07-code-craft/skill-surgical-context-index.md) | `skills/07-code-craft/skill-surgical-context-index.md` | Dev dosyalara cerrahi müdahale haritası |
| [DESKTOP APPLICATION ARCHITECTURE](07-code-craft/skill-desktop-app.md) | `skills/07-code-craft/skill-desktop-app.md` | Electron, Tauri, IPC güvenlik köprüsü |
| [MOBILE CORE & RESPONSIVENESS](07-code-craft/skill-mobile-core.md) | `skills/07-code-craft/skill-mobile-core.md` | React Native, mobil gesture, safe area |
| [DISCORD BOT ARCHITECTURE](07-code-craft/skill-bot-discord.md) | `skills/07-code-craft/skill-bot-discord.md` | Discord.js, slash commands, event handlers |

---

## SKILL KULLANIM VE ÇAĞIRMA KURALLARI

1. **İhtiyaç Anında Çağırma:** Yalnızca o anda üzerinde çalışılan görevle doğrudan ilişkili skill dosyasını oku; ilgisiz skilleri belleğe alıp token harcama.
2. **Öncelik Hiyerarşisi:**
   `1. Security / Safety` ➔ `2. Architecture` ➔ `3. Domain` ➔ `4. Implementation` ➔ `5. Testing` ➔ `6. Documentation`
3. **Cerrahi Sadakat:** Yüklenen her skill dosyasındaki *Kesin Yasaklar* ve *Doğrulama Listesi* adımlarına %100 uyulması zorunludur.

