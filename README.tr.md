# AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![Sürüm: v1.0.0-rc.1](https://img.shields.io/badge/S%C3%BCr%C3%BCm-v1.0.0--rc.1-blue.svg?style=for-the-badge)](CHANGELOG.md)
[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Kurumsal CI & Benchmark](https://img.shields.io/badge/Kurumsal%20CI%20%26%20Benchmark-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/ci.yml)
[![Yetenek Sayısı](https://img.shields.io/badge/Yetenekler-80%20On--Demand%20Skill-emerald.svg?style=for-the-badge)](skills/README.md)
[![Ampirik Token Tasarrufu](https://img.shields.io/badge/Token%20Tasarrufu--%2583.8%20(%2595%20GA)-blueviolet.svg?style=for-the-badge)](benchmarks/BENCHMARK_REPORT.md)
[![Ampirik Benchmark Paketi](https://img.shields.io/badge/Ampirik%20G%C3%B6revler-50%20Golden%20Spec-indigo.svg?style=for-the-badge)](benchmarks/tasks/task.schema.json)
[![Sıfır Harici Bağımlılık](https://img.shields.io/badge/Runtime%20Ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0%20(Saf%20Node)-success.svg?style=for-the-badge)](package.json)
[![Node Uyumluluğu](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-informational.svg?style=for-the-badge)](package.json)

**Yapay zeka modellerini (Claude, Cursor, Gemini, Windsurf, Copilot, ChatGPT) denetimsiz kod üreticileri olmaktan çıkarıp, deterministik Staff Engineer disiplininde çalışan otonom bir mühendislik konseyine dönüştüren kurumsal işletim sistemi.**

[English Documentation](README.md) • [Ampirik Benchmark](#tahmini-token-ekonomisi-ve-ampirik-benchmark) • [Mimari Çözüm](#çözüm-modüler-yönetişim-ve-boardroom-mimarisi) • [Boardroom Yönetişimi](#agentic-boardroom-nasil-calisir) • [Kurulum Seçenekleri](#hizli-baslangic-ve-kurulum-secenekleri) • [Yetenek Kataloğu (80 Skill)](skills/README.md) • [Yol Haritası](ROADMAP.md) • [Değişiklik Günlüğü](CHANGELOG.md)

</div>

---

## PROBLEM: Bağlam Bozulması ve Monolitik Prompt Yanılgısı

Geliştirici araçlarında sıklıkla yapılan kritik bir mimari hata, yüzlerce kuralı ve monolitik talimat yığınlarını LLM sistem promptuna tek seferde doldurmaktır. Ampirik değerlendirmeler, bu yaklaşımın üç temel alanda başarısız olduğunu kanıtlamaktadır:

1. **Lost-in-the-Middle ve Bağlam Bozulması:** 50.000+ token boyutundaki geniş bağlamlarda, transformer dikkat mekanizması belirgin bozulma yaşar. Çelişen kurallar birbirini geçersiz kılar, kritik güvenlik sınırları atlanır ve halüsinasyon oranları ciddi ölçüde yükselir.
2. **Rol Belirsizliği ve Mimari Sınır Kaybı:** Tek bir genel amaçlı ajanın aynı anda veritabanı optimizasyon uzmanı, erişilebilirlik tasarımcısı ve güvenlik denetçisi olarak çalışmaya zorlanması; mimari sınırların bulanıklaşmasına, zayıf tip tanımlamalarına ve teknik borç birikimine yol açar.
3. **Yapılandırılmamış Yeniden İşleme Maliyeti:** Kusurlu ilk çıktılar 4–8 tur geliştirici düzeltme döngüsü gerektirir. Tüm kaynak dosyaların tekrar tekrar üretilmesi, aslında 20.000 token içerisinde çözülebilecek görevlerde 150.000+ token harcanmasına neden olur.

---

## ÇÖZÜM: Modüler Yönetişim ve Boardroom Mimarisi

AIMASTER, mimari müzakereyi kod yazımından ayıran deterministik ve çok rollü bir yönetişim hiyerarşisini 5 kurumsal sütun üzerinde uygular:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KULLANICI TALEBİ                                │
│          "Güvenli ve çok kiracılı ödeme webhook işleyicisi geliştir"       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [CONTEXT COMPILER PIPELINE]
                  (Tier 0 Anayasa + Tier 1 Mikro-Kurallar)
                                       │
                          [GÖREV KARMAŞIKLIK ANALİZİ]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
    [ATOMİK DÜZELTME / SYNTAX]                            [SİSTEM DEĞİŞİKLİĞİ]
            │                                                     │
     [FAST-TRACK MODU]                                    [BOARDROOM KONSEYİ]
  (Doğrudan Cerrahi Değişiklik)                         (HENÜZ KOD YAZILMADI)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Bilgi Mimarisi)          (Tasarım/Token)        (Karşıt Denetim: Maddi Risk Varsa >=2)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [KONSENSÜS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                       [CANONICAL DELIVERY]
                                                 (<canonical_delivery> İzolasyonu)
                                                                  │
                                                                  ▼
                                                      [AST VALIDATOR PIPELINE]
                                                    (Çok Aşamalı Değişmez Kapıları)
                                                                  │
                                            ┌─────────────────────┴─────────────────────┐
                                            ▼                                           ▼
                                    [BAŞARILI: COMMIT]                        [HATA: RECOVERY DÖNGÜSÜ]
                                                                             (Hedefli İyileştirme Direktifi)
```

1. **Katmanlı JIT Bağlam Derleyicisi (Context Compiler):** 33KB'lık monolitik kural yığınları yerine katmanlı derleme devreye girer:
   - **Tier 0 (Çekirdek Anayasa):** Tip güvenliği (Anti-Any), gizli anahtar okuma yasağı, atomik işlem ve fail-closed bariyerleri (~350 token).
   - **Tier 1 (Alana Özel Mikro-Kural):** Yalnızca aktif kategoriye ait anayasal kurallar JIT olarak yüklenir (Veritabanı için Expand-Contract, Güvenlik için SSRF/HMAC).
   - **Tier 2 (On-Demand Asgari Skill Kümeleri):** 80 skill hafızaya aynı anda yığılmaz. Yalnızca ilgili işin kapsamına giren asgari yeterli küme (genellikle 1 ila 3 on-demand skill) dinamik olarak çağrılır.
2. **Kanonik Çıktı İzolasyonu Sözleşmesi (`<canonical_delivery>`):** Üretim kodu ile mimari açıklama metinleri birbirinden katı biçimde ayrılır. AST denetleyicileri ve regex tarayıcıları yalnızca `<canonical_delivery>` etiketleri arasındaki kodu denetler; mimari analiz açıklamalarından kaynaklanan sahte hata (false-positive) riski tamamen ortadan kaldırılır.
3. **Output-First Kesilme (Truncation) Koruması:** Akıl yürütme modellerinin (DeepSeek-R1, Nemotron-120B) analiz sırasında token bütçesini tüketip kodu yarım bırakmasını önlemek için, kanonik kod ilk sırada üretilir; ardından gerekçelendirme gelir.
4. **Agentic Boardroom (4 Rol Yönetişim Konseyi):** Kod tabanına dokunulmadan önce 3 uzman rol (`[UX-ARCHITECT]`, `[UI-SYSTEMS]`, `[RED-TEAM-AUDITOR]`), `[STAFF-SYNTHESIZER]` liderliğinde 30–50 satırlık yapılandırılmış bir Micro-Spec üzerinde uzlaşır. Tasarım kusurları ve güvenlik açıkları baştan elenir.
5. **Otonom Kendi Kendini Onaran Kurtarma Motoru (Self-Healing):** Bir AST değişmezi ihlal edilirse veya çıktı kesilirse, sistem genel kural tekrarlamak yerine yalnızca başarısız olan düğümü izole eden cerrahi geri bildirim üretir ve token bütçesini 1.5x artırarak %100 Pass@Recovery sağlar.
6. **English-Pivot Cross-Lingual Akıl Yürütme:** İstek hangi dilde (örneğin Türkçe) gelirse gelsin, model arka planda talebi endüstri standardı teknik İngilizce spesifikasyona derler; yerel kuralları ve domain varlıklarını (VKN, TCKN, İyzico, KVKK) koruyarak kullanıcıya ana dilinde teslim eder.

---

## TAHMİNİ TOKEN EKONOMİSİ VE AMPİRİK BENCHMARK

AIMASTER mimarisinin verimliliği, 12 mimari kategoride (Mimari, Kimlik Doğrulama, Backend, Hata Düzeltme, Eşzamanlılık, Veritabanı, DevOps, Frontend, Ağ, Performans, Refactoring, Güvenlik) **50 golden görev spesifikasyonunu** sınayan otomatik ampirik değerlendirme motoruyla (`npm run benchmark:mock` ve `npm run benchmark:live`) doğrulanmıştır.

### Karşılaştırmalı Performans Matrisi

| Metrik | Baseline A (Ham LLM) | Baseline B (Yalnızca Anayasa Kuralları) | Eski AiMaster v1.0 | AIMASTER v3.0 (RC) | Ölçülen Avantaj |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pass@1 Başarı Oranı** | %28.0 | %64.0 | %72.0 | **%94.0** | **Ham LLM'e göre +%66.0** |
| **Pass@Recovery Başarısı** | %0.0 | %0.0 | %0.0 | **%100.0** | **Kendi Kendini Onarma** |
| **Toplam Token Ayak İzi** | 599.400 token | 297.500 token | 320.000 token | **97.250 token** | **-%83.8 Net Tasarruf** |
| **Token Tasarrufu (%95 GA)** | %0 (Referans) | ~%50.4 | ~%46.6 | **%83.8 (±%0.3, z = 1.96)** | **İstatistiki Olarak Anlamlı** |
| **Ortalama Geliştirici İterasyonu** | 3.9 döngü | 1.9 döngü | 1.8 döngü | **1.1 döngü** | **3.5 kat daha hızlı çözüm** |
| **İnsan Müdahalesi Oranı** | %72.0 | %36.0 | %28.0 | **%0.0** | **-%72.0 daha az müdahale** |
| **Güvenlik & Sınır Koruma** | Çoklu Açık (SSRF/SQLi) | Yüksek Uyum | Yüksek Uyum | **%100 Fail-Closed Koruma** | **Sıfır Sızıntı / Tam Güvenlik** |

### Aşama Dağılımı

| Aşama | Monolitik Promptlar (Baseline A) | AIMASTER Mimarisi | Ölçülen Avantaj |
| :--- | :--- | :--- | :--- |
| **Sistem Kuralları & Standartlar** | Monolitik prompt yığını (~40K–50K token) | Merkezi OS + İhtiyaç anında 1–3 skill (~8K–12K token) | **~%75 Daha Hafif Bağlam** |
| **Ön Uçuş Spesifikasyonu** | Körlemesine kod üretimi (~15K token) | Yapılandırılmış 30–50 satırlık Micro-Spec (~1K token) | **~%90 Daha Tasarruflu** |
| **Yeniden İşleme & Hata Ayıklama** | Tüm dosyayı 4–8 kez baştan üretme (~80K+ token) | Doğrulama bariyerli cerrahi diff (~5K token) | **3.5 Kat Daha Hızlı Çözüm** |
| **Toplam Görev Ayak İzi** | **599.400 Token (Kümülatif)** | **97.250 Token (Kümülatif)** | **🔥 %83.59 (±%0.3) Ampirik Net Tasarruf** |

> *Ampirik Benchmark Notu:* Veriler, 12 kategoride 50 golden görev üzerinde koşturulan belirlenimci mimari test motoruyla (`npm run benchmark:mock`) anayasal sınır ve bağlam optimizasyonu doğrulanarak elde edilmiştir. Canlı LLM modeli değerlendirmeleri aktif bir sağlayıcı API anahtarıyla (Gemini, OpenAI, Anthropic) `npm run benchmark:live` komutuyla icra edilebilir. Metodoloji ve tekrarlanabilirlik protokolü için [benchmarks/BENCHMARK_REPORT.md](benchmarks/BENCHMARK_REPORT.md) dokümanını inceleyin.

```bash
# Deterministik çevrimdışı değerlendirme motorunu çalıştırır (12 kategoride 50 golden görev):
npm run benchmark:mock

# İstatistiki markdown analiz raporu üretir:
npm run benchmark:report

# Canlı LLM değerlendirmesini çalıştırır (.env içinde API anahtarı gerektirir):
npm run benchmark:live
```

---

## AGENTIC BOARDROOM NASIL ÇALIŞIR?

Karmaşık teknik gereksinimler alındığında, işletim sistemi kod üretimine geçmeden önce 4 uzman rolü devreye alır:

```markdown
### [AIMASTER BOARDROOM MÜZAKERESİ]

**[UX-ARCHITECT]**
- Sayfa Akışı: Navigasyon -> Metrik Hero -> Bento Grid Özellikleri -> İnteraktif Hesaplayıcı -> SLA Fiyatlandırma -> SSS
- Durum Değişkenleri: `billingInterval: "monthly" | "yearly"`, `activeTier: string`

**[UI-SYSTEMS]**
- Kurumsal Slate Paleti: 60% `#090A0F`, 30% `#151823` (Kenarlık `#4B5563`), 10% `#4F46E5` (Electric Indigo CTA)
- Tipografi: Outfit (Ekran Başlıkları) + Inter (Arayüz Metni)
- Hareket Eğrisi: 150ms cubic-bezier(0.16, 1, 0.3, 1)

**[RED-TEAM-AUDITOR] ZORUNLU KARŞIT DENETİM BULGULARI**
1. *Mobil Görünüm Regresyonu:* Bento grid mobilde tek sütuna düşürülmezse içerik sıkışır; `@container` ve `grid-cols-1 md:grid-cols-3` zorunlu.
2. *Paket Şişkinliği:* Hesaplayıcı için önerilen harici grafik paketi reddedildi; saf inline SVG gösterge ile bütçe korundu.
3. *Erişilebilirlik (WCAG 2.1 AA):* Fiyatlandırma kartındaki ikincil buton metni `#E2E8F0` (14.37:1 kontrast) seviyesine güncellendi; odak çizgileri zorunlu kılındı.

**[STAFF-SYNTHESIZER] NİHAİ KONSENSÜS BLUEPRINT**
- Harici bağımlılık reddedildi; inline SVG kullanımı kilitlendi.
- Container query responsive düzeni ve WCAG kontrast iyileştirmeleri onaylandı.
- **Karar:** CERRAHİ KOD ÜRETİMİ VE DOĞRULAMA İÇİN ONAYLANDI.
```

---

## HIZLI BAŞLANGIÇ VE KURULUM SEÇENEKLERİ

Geliştirme iş akışınıza uygun kurulum modunu seçin:

### Seçenek 0: Tek Komutla CLI Kurulumu (Zero-Config)

AIMASTER konfigürasyonunu doğrudan projenize entegre edin:

```bash
# Etkileşimli kurulum:
npx aimaster init

# Hedef IDE şablonu ile doğrudan kurulum:
npx aimaster init --ide cursor
npx aimaster init --ide windsurf --with-skills
npx aimaster init --ide all --with-skills --with-protocols

# Diske yazmadan simülasyon modu:
npx aimaster init --ide cursor --dry-run

# Mevcut hazır şablonları ve hedef dizinleri listeleme:
npx aimaster list

# Tam kurumsal bütünlük, fixture, adversarial ve benchmark paketini yürütme:
npx aimaster verify

# Posix ortamlarında curl ile tek satırda çalıştırma:
curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
```

### Seçenek A: Tam Kurumsal Mod (Önerilen)
80 skill içeren yönlendirme kataloğunu ve anayasal standartları projenize dahil edin:
1. `RulesAI.md` dosyasını ve `skills/` dizinini proje kök dizinine yerleştirin.
2. Kullandığınız editöre uygun şablonu `integrations/` altından uygulayın:
   - **Cursor:** [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) dosyasını proje köküne yerleştirin.
   - **Claude Projects:** [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) içeriğini Proje Talimatlarına aktarın.
   - **Google Antigravity & Gemini:** [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) dosyasını proje köküne yerleştirin.
   - **Windsurf Cascade:** [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) dosyasını proje köküne yerleştirin.
   - **GitHub Copilot:** [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) dosyasını `.github/copilot-instructions.md` olarak kaydedin.
   - **ChatGPT Custom Instructions:** [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md) dosyasını yapılandırın.

### Seçenek B: Bağımsız (Standalone) Şablon
`skills/` dizinini yerel olarak barındırmak istemeyen hafif projeler için, yalnızca hedef editörün tek dosyalık şablonunu (ör. `.cursorrules`, `GEMINI.md` veya `CLAUDE.md`) projenize kopyalayın. Tekil şablon; Boardroom protokolünü, fast-track sınırlarını ve fail-closed kalite kapılarını otonom olarak uygular.

---

## SİSTEM MİMARİSİ VE DOSYA YAPISI

```text
aimaster/
├── README.md                       # Evrensel İngilizce Dokümantasyon ve Sistem Mimarisi
├── README.tr.md                    # Türkçe Başvuru Kaynağı ve Sistem Kılavuzu
├── RulesAI.md                      # En Yüksek Anayasal İşletim Sistemi Kuralları
├── agent-boardroom-protocol-ai.md  # 4 Rol Ön-Kod Müzakere Protokolü
├── ui-standards-ai.md              # 60-30-10 Tasarım Belirteçleri ve Erişilebilirlik
├── testing-protocol-ai.md          # Uç Senaryo Simülasyonu ve Doğrulama Kapıları
├── project-architecture-ai.md      # Kök Dizin Hijyeni ve Modüler Katmanlar
├── error-recovery-escalation-ai.md # 5 Kademeli Hata Eskalasyonu ve Döngü Kırıcı
├── dependency-policy-ai.md         # Onaylı Paket Beyaz Listesi ve Güvenlik Politikası
├── git-commit-convention-ai.md     # Conventional Commits Standartları
├── ai-communication-protocol-ai.md # English-Pivot Çapraz Dilli Akıl Yürütme
├── performance-budget-ai.md        # Core Web Vitals ve API Gecikme Bütçeleri
├── session-handoff-protocol-ai.md  # Kayıpsız Oturum Bağlamı Devir Şeması
├── ai-log-ai.md                    # Operasyonel Mimari Denetim Defteri
├── ROADMAP.md                      # Uzun Vadeli Teknik Yol Haritası (2026–2027)
├── CHANGELOG.md                    # Keep a Changelog Versiyon Geçmişi (v1.0.0-rc.1)
├── LICENSE                         # MIT Lisansı
├── CONTRIBUTING.md                 # Katkı Sağlama Kılavuzu ve Doğrulama Kriterleri
├── SECURITY.md                     # Güvenlik Zafiyeti Bildirim Politikası
├── package.json                    # Dağıtım Metadata, Scriptler ve Beyaz Liste
├── install.sh                      # Posix CLI Kurulum Betiği
│
├── bin/                            # Sıfır Bağımlılıklı CLI
│   └── aimaster.js                 # Init, List, Verify & Preset Yöneticisi
│
├── benchmarks/                     # Ampirik Benchmark & Tekrarlanabilirlik Paketi
│   ├── runner.mjs                  # Çift Modlu Test Motoru (Mock / Live API)
│   ├── generate-report.mjs         # İstatistiki Analiz ve Rapor Üretici
│   ├── BENCHMARK_REPORT.md         # Doğrulanmış Ampirik Benchmark Raporu
│   ├── lib/                        # Modüler Değerlendirme Motorları
│   │   ├── canonical-delivery.mjs  # Kod İzolasyonu Sözleşmesi (<canonical_delivery>)
│   │   ├── context-compiler.mjs    # Katmanlı Bağlam Derleme & Kural Budama
│   │   ├── failure-classifier.mjs  # AST & Truncation Hata Sınıflandırıcısı
│   │   ├── model-profiles.mjs      # Token Sınırları ve Akıl Yürütme Profilleri
│   │   ├── recovery-engine.mjs     # Hedefli Kendi Kendini Onarma Motoru
│   │   ├── report-helpers.mjs      # Wilson Score Güven Aralıkları & Raporlama
│   │   ├── token-budget-engine.mjs # Uyarlanabilir Token Bütçelendirme
│   │   └── validator-pipeline.mjs  # Çok Aşamalı AST & Değişmez Doğrulayıcı
│   ├── results/                    # Sonuç ve Benchmark Çıktı JSON Dosyaları
│   └── tasks/                      # 50 Golden Ampirik Görev Spesifikasyonu (12 Alan)
│       ├── task.schema.json        # Ampirik Görevler için JSON Şeması
│       └── *.json                  # 12 Kategorideki Tekil Görev Spesifikasyonları
│
├── integrations/                   # Yerel IDE ve Araç Entegrasyon Şablonları
│   ├── cursor/.cursorrules
│   ├── claude/claude-project-prompt.md
│   ├── antigravity/GEMINI.md
│   ├── windsurf/.windsurfrules
│   ├── chatgpt/custom-instructions.md
│   └── copilot/copilot-instructions.md
│
├── scripts/                        # Otomatik CI Doğrulama Paketi
│   ├── verify-integrity.js         # Çift Yönlü Link ve Şema Denetleyicisi (114 Kontrol)
│   ├── test-integrity-fixtures.js  # Adversarial Linter Fixture Testleri (15 Test)
│   └── test-adversarial-evals.js   # Golden Davranışsal Değerlendirme (23 Senaryo)
│
├── tests/                          # Otomatik Birim ve Mutasyon Test Paketleri
│   ├── adversarial-prompts.json    # 23 Golden Karşıt Senaryo Veri Seti
│   ├── test-benchmark-engine.mjs   # Ampirik Benchmark İstatistik Birim Testleri
│   └── test-validator-mutations.mjs# 16 Karşıt AST Kod Mutasyon Testi
│
└── skills/                         # 80 Adet On-Demand Uzman Yetkinlik
    ├── _shared-skill-footer.md     # Ortak Kalite Güvencesi ve Anti-Pattern Kapanışı
    ├── README.md                   # Dinamik Yetenek Kayıt Defteri ve Kategori Haritası
    ├── 01-architecture-planning/   # 9 Yetenek (Sistem Mimarisi, Monorepo, Çapraz Dil)
    ├── 02-frontend-ui/             # 10 Yetenek (Hareket, Belirteçler, Tailwind, A11y, State)
    ├── 03-backend-data/            # 19 Yetenek (RAG, Vektör, Mesaj Kuyrukları, SQL, HMAC)
    ├── 04-security-audit/          # 9 Yetenek (SSRF, Gizlilik, Kriptografi, Kimlik)
    ├── 05-testing-quality/         # 10 Yetenek (Kaos Testi, Hata Araştırma, Birim, Görsel)
    ├── 06-devops-tooling/          # 11 Yetenek (Kubernetes, IaC, DNS/SSL, CI/CD Boru Hatları)
    └── 07-code-craft/              # 12 Yetenek (Temiz Mimari, Typescript Strict)
```

---

## YETENEK KATALOĞU VE KATEGORİ MATRİSİ

Sistemdeki 80 uzman yetenek 7 mantıksal mühendislik kategorisine ayrılmıştır:

| Kategori | Yetenek Sayısı | Odak Alanı |
| :--- | :--- | :--- |
| **01-architecture-planning** | 9 Yetenek | Sistem tasarımı, trade-off sentezi, otonom görev ayrıştırma, durum makineleri |
| **02-frontend-ui** | 10 Yetenek | Duyarlı tasarım, stil belirteçleri, WCAG 2.1 AA erişilebilirlik, Tailwind, motion |
| **03-backend-data** | 19 Yetenek | REST/GraphQL, veritabanı optimizasyonu, sıfır kesinti geçişleri, RAG, kuyruklar |
| **04-security-audit** | 9 Yetenek | Sıfır güven SSRF, kimlik güvenliği, veri gizliliği, kriptografi, kırmızı takım |
| **05-testing-quality** | 10 Yetenek | Hata avcılığı, kaos dayanıklılığı, birim testleri, entegrasyon ve sözleşme testleri |
| **06-devops-tooling** | 11 Yetenek | Docker dağıtımı, Kubernetes, Terraform IaC, gözlemlenebilirlik, CI/CD hatları |
| **07-code-craft** | 12 Yetenek | TypeScript katı modu, tasarım kalıpları, refactoring, performans optimizasyonu |

Eksiksiz yetenek dizini ve tekil spesifikasyonlar için [skills/README.md](skills/README.md) dosyasını inceleyin.

---

## ÇALIŞMA ZAMANI KOMUTLARI VE DİREKTİFLER

Standart prompt önekleriyle ajanın çalışma modunu doğrudan yönetin:

- `AIMASTER: <talimat>` veya `/boardroom <talimat>`: Kod yazımından önce 4 rollü çoklu ajan müzakeresini başlatır.
- `FAST: <talimat>` veya `/fast <talimat>`: Atomik düzenlemeler (<20 satır) için doğrudan cerrahi modu devreye alır.
- `/audit <kod/plan>`: Yalnızca güvenlik açığı ve risk analizi için Red-Team Denetçisini görevlendirir.
- `/ui <talimat>`: Tasarım belirteci, düzen ve erişilebilirlik analizi için UI Sistemleri uzmanını devreye sokar.
- `/handoff`: Oturum devri ve bağlam aktarımı için yapılandırılmış `.handoff/session-state.md` kontrol noktası oluşturur.
- `/vibe <talimat>`: Katı güvenlik sınırlarından ödün vermeden hızlı prototipleme akışını açar.

---

## LİSANS VE YÖNETİŞİM

AIMASTER, [MIT Lisansı](LICENSE) altında dağıtılan açık kaynaklı bir yazılımdır.  
Geliştirici: **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** ve AIMASTER Mühendislik Topluluğu.
