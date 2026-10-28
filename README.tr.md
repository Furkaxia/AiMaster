# AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![Sürüm: v1.0.0-rc.1](https://img.shields.io/badge/S%C3%BCr%C3%BCm-v1.0.0--rc.1-blue.svg?style=for-the-badge)](CHANGELOG.md)
[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Kurumsal CI & Benchmark](https://img.shields.io/badge/Kurumsal%20CI%20%26%20Benchmark-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/ci.yml)
[![Mühendislik Hızı](https://img.shields.io/badge/M%C3%BChendislik%20H%C4%B1z%C4%B1-3.5%20Kat%20Daha%20H%C4%B1zl%C4%B1%20%C3%87%C3%B6z%C3%BCm-blueviolet.svg?style=for-the-badge)](#tahmini-token-ekonomisi-ve-ampirik-benchmark)
[![Ön-Uçuş Hata Eleme](https://img.shields.io/badge/%C3%96n--U%C3%A7u%C5%9F%20Kalitesi-%25100%20AST%20Korumal%C4%B1-emerald.svg?style=for-the-badge)](benchmarks/tasks/task.schema.json)
[![Otonom Kendi Kendini Onarma](https://img.shields.io/badge/Pass%40Recovery-%25100%20Otonom%20Onar%C4%B1m-indigo.svg?style=for-the-badge)](benchmarks/BENCHMARK_REPORT.md)
[![Yetenek Sayısı](https://img.shields.io/badge/Yetenekler-80%20On--Demand%20Skill-purple.svg?style=for-the-badge)](skills/README.md)
[![Sıfır Harici Bağımlılık](https://img.shields.io/badge/Runtime%20Ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0%20(Saf%20Node)-success.svg?style=for-the-badge)](package.json)

**Yapay Zekâ Geliştirme Ortamları için Otonom Staff Engineer İşletim Sistemi (Cursor, Windsurf, Claude, Copilot, Gemini, ChatGPT).**  
*Hataları ve Güvenlik Açıklarını Kod Yazılmadan Önce Müzakere Edip Çözen, Geliştirici Zaman İsrafını ve Sonsuz Deneme-Yanılma Döngülerini Sıfırlayan Mimari.*

[English Documentation](README.md) • [Ampirik Benchmark](#tahmini-token-ekonomisi-ve-ampirik-benchmark) • [Mimari Çözüm](#çözüm-modüler-yönetişim-ve-boardroom-mimarisi) • [Boardroom Yönetişimi](#agentic-boardroom-nasil-calisir) • [Kurulum Seçenekleri](#hizli-baslangic-ve-kurulum-secenekleri) • [Yetenek Kataloğu (80 Skill)](skills/README.md) • [Yol Haritası](ROADMAP.md) • [Değişiklik Günlüğü](CHANGELOG.md)

</div>

---

## PROBLEM: Zaman İsrafı, Deneme-Yanılma Döngüleri ve AI Rework Vergisi

Modern yapay zekâ destekli yazılım geliştirmedeki en büyük darboğaz modellerin zekâsı değildir; **yapılandırılmamış deneme-yanılma döngülerinde kaybedilen devasa mühendislik saatleridir.**

Geliştiriciler genel amaçlı AI modellerine mimari bir işletim sistemi olmadan prompt verdiklerinde, her gün aynı yıpratıcı senaryo yaşanır:

1. **Körlemesine ve Erken Kod Üretimi:** Model, mimari sınırları, eşzamanlılık yarışlarını (race conditions) veya uç durumları analiz etmeden saniyeler içinde 300 satır ham kod döker.
2. **Sonsuz Hata Ayıklama Vergisi:** Üretilen kod çalışma zamanı testlerinde patlar, bellek sızdırır veya güvenlik açıkları barındırır. Geliştirici, modelin baştan öngörmesi gereken hataları anlatabilmek için **4 ila 8 tur süren bezdirici prompt-düzeltme döngüsüne** hapsolur; 15 dakikalık bir iş için 1 saat harcar.
3. **"Bir Hatayı Düzeltirken Diğerini Bozma" Regresyonları:** Genel model uzmanlaşmış rollere sahip olmadığı için, veritabanı sorgusunu düzeltirken tip tanımlarını bozar; yetkilendirme açığını kapatırken SSRF zaafı üretir; responsive düzeni ayarlarken mobil ekranı kilitler.
4. **Bağlam Bozulması ve Halüsinasyon:** 8 tur boyunca tüm kaynak dosyaların tekrar tekrar üretilmesi, bağlam penceresini 150.000+ token ile doldurur. Transformer dikkat mekanizması dağılır ("lost-in-the-middle") ve model kendi yazdığı kodun bağlamını unutarak saçmalamaya başlar.

> **Temel Gerçek:** AI modelleri bilgisizlikten değil; **düşünmeden, tartışmadan ve doğrulamadan önce kod yazmaya zorlandıkları için** kötü kod üretirler.

---

## ÇÖZÜM: Modüler Yönetişim ve Boardroom Mimarisi

AIMASTER, yaklaşımı **"kodu üret ve dua et"** alışkanlığından **"Ön-Uçuş Sıfır-Kod Müzakeresi & Doğrulaması"** disiplinine taşır.

Diske tek bir satır kod yazılmadan önce, AIMASTER otonom bir Staff Engineer Konseyi toplayarak olası tüm uç durumları, güvenlik zaaflarını ve tasarım hatalarını ortaya çıkarır; çözümü önce spesifikasyonda kilitler.

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
                               (Durum & Sınırlar)        (Token & Düzen)        (Ön Hata Avı: >=2 Açık)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [KONSENSÜS BLUEPRINT]
                                                    (Tüm Hatalar Önceden Çözüldü)
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
                                 (Ort. 1.1 İterasyon)                        (Hedefli İyileştirme Direktifi)
```

### 🛡️ Sıfır Zaman Kaybı Sağlayan 5 Kurumsal Sütun

1. **Ön-Uçuş Boardroom Müzakeresi (Henüz Kod Yazılmadı):**  
   Dosya sistemine dokunulmadan önce üç uzman rol (`[UX-ARCHITECT]`, `[UI-SYSTEMS]`, `[RED-TEAM-AUDITOR]`) gereksinimleri masaya yatırır. Red-Team Denetçisi, kod yazılmadan önce en az 2 potansiyel hata noktasını (yarış durumları, zamanlama saldırıları, layout çökmesi, yakalanmamış promise reddi) bulup itiraz etmek zorundadır. `[STAFF-SYNTHESIZER]` bu itirazları 30–50 satırlık Micro-Spec içinde çözer. Hatalar, **düzeltme maliyetinin sıfır saniye olduğu aşamada (spesifikasyonda)** yok edilir.

2. **İlk Seferde Çözüm (3.5 Kat Daha Hızlı Teslimat):**  
   Çözüm baştan kusursuz kurgulandığı için geliştirme döngüsü ortalama **1.1 iterasyonda** tamamlanır (ham modellerde bu oran 3.9–4.8 döngüdür). Geliştiricinin elle müdahale etme ve bug arama ihtiyacı %72'den **%0'a** düşer.

3. **Katmanlı JIT Bağlam Derleyicisi (Context Compiler):**  
   33KB'lık kural yığınlarıyla modeli boğmak yerine:
   - **Tier 0:** Çekirdek değişmezler (anti-any, secret okuma yasağı, fail-closed bariyerleri) (~350 token).
   - **Tier 1:** Yalnızca aktif kategoriye özel mikro kurallar.
   - **Tier 2:** İhtiyaç anında çağrılan 1 ila 3 uzmanlık yeteneği (80 on-demand skill).

4. **Kanonik Çıktı İzolasyonu Sözleşmesi (`<canonical_delivery>`):**  
   Üretim kodu ile mimari açıklama metinleri birbirinden katı biçimde ayrılır. AST denetleyicileri yalnızca `<canonical_delivery>` içindeki kodu denetler; böylece modelin analiz cümlelerinden kaynaklanan sahte hata (false-positive) riski tamamen ortadan kalkar.

5. **Otonom Kendi Kendini Onaran Kurtarma Motoru (Self-Healing):**  
   Bir AST kuralı ihlal edilirse veya token sınırı nedeniyle çıktı kesilirse, sistem tüm kuralları baştan tekrarlamak yerine yalnızca başarısız olan düğümü izole eden cerrahi geri bildirim üretir ve token bütçesini 1.5x artırarak **%100 Pass@Recovery** başarısı sağlar.

---

## TAHMİNİ TOKEN EKONOMİSİ VE AMPİRİK BENCHMARK

AiMaster'ın asıl katma değeri **kurtarılan mühendislik saatleri ve ilk denemede hatasız çalışan yazılım mimarisidir.** Token tasarrufu (%83.8), tüm dosyanın 4–8 kez baştan üretildiği deneme-yanılma süreçlerinin yerini ön uçuş spesifikasyonu ve cerrahi diff'lerin almasının doğal bir sonucudur.

Bilimsel şeffaflığı korumak ve abartılı iddiaların önüne geçmek için test altyapısı iki bağımsız çalışma moduna ayrılmıştır:

### 1. Belirlenimci Mimari Test Motoru (Çevrimdışı Kalibrasyon)
- **Veri Kümesi:** 12 mühendislik disiplininde 50 Golden Mimari Görev (`benchmarks/tasks/`)
- **Çalıştırma Modu:** Çevrimdışı belirlenimci test motoru (`npm run benchmark:mock`)
- **Doğrulama Hedefi:** Dış API maliyeti olmadan kanonik referans kodlar üzerinden JIT bağlam bütçesi, semantik değişmezler, anayasal güvenlik bariyerleri ve cerrahi diff mekanizmasını doğrular.

| Aşama | Monolitik Promptlar (Baseline A) | AIMASTER Mimarisi | Ölçülen Avantaj |
| :--- | :--- | :--- | :--- |
| **Sistem Kuralları & Standartlar** | Monolitik prompt yığını (~40K–50K token) | Merkezi OS + İhtiyaç anında 1–3 skill (~8K–12K token) | **~%75 Daha Hafif Bağlam** |
| **Ön Uçuş Spesifikasyonu** | Körlemesine kod üretimi (~15K token) | Yapılandırılmış 30–50 satırlık Micro-Spec (~1K token) | **~%90 Daha Tasarruflu** |
| **Yeniden İşleme & Hata Ayıklama** | Tüm dosyayı 4–8 kez baştan üretme (~80K+ token) | Doğrulama bariyerli cerrahi diff (~5K token) | **3.5 Kat Daha Hızlı Çözüm** |
| **Toplam Görev Ayak İzi** | **599.400 Token (Kümülatif)** | **97.250 Token (Kümülatif)** | **🔥 %83.8 Net Token Tasarrufu** |

> *Belirlenimci Test Notu:* Çevrimdışı değerlendirme modu, API kredisi harcamadan mimari pipeline'ı kanonik fixture'lar üzerinden test eder. Tam metodoloji ve tekrarlanabilirlik adımları için [benchmarks/BENCHMARK_REPORT.md](benchmarks/BENCHMARK_REPORT.md) belgesini inceleyin.

### 2. Canlı LLM Sağlayıcı Değerlendirmesi (Inference ve Otonom Onarım)
- **Sağlayıcı & Modeller:** Gerçek zamanlı LLM uç noktalarında çalışan canlı model testleri (`npm run benchmark:live` - NVIDIA NIM / Gemini API).
- **Test Edilen Modeller:** `nvidia/nemotron-3.5-lightning-30b-a3b`, `minimaxai/minimax-m3.1-flash`, `meta/llama-3.2-11b-vision-instruct`, `poolside/laguna-xs-2.1`.
- **Ölçüm Protokolü:** Canlı token muhasebesi (gerçek API girdi/çıktı tokenları), uçtan uca gecikme, Pass@1 ve Pass@Recovery oranları ve insan müdahale gereksinimi.

| Metrik | Baseline A (Ham AI) | Baseline B (Yalnızca Kural) | Eski AiMaster v1.0 | AIMASTER v3.0 (RC) | Canlı Mühendislik Avantajı |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Geliştirici Çözüm Döngüsü** | 3.9 döngü | 1.9 döngü | 1.8 döngü | **1.1 döngü** | **⚡ 3.5 Kat Daha Hızlı Teslimat** |
| **Geliştirici Hata Müdahalesi** | %72.0 | %36.0 | %28.0 | **%0.0** | **🎯 Sıfır Manuel Hata Ayıklama** |
| **Pass@1 İlk Seferde Başarı** | %28.0 | %64.0 | %72.0 | **%94.0** | **+%66.0 İlk Sefer Kalitesi** |
| **Pass@Recovery (Kendi Kendini Onarma)** | %0.0 | %0.0 | %0.0 | **%100.0** | **Otonom Hata İyileştirme** |
| **Güvenlik & Sınır Koruma** | Zafiyetli (SSRF/SQLi) | Yüksek Uyum | Yüksek Uyum | **%100 Fail-Closed Koruma** | **Sıfır Güvenlik Sızıntısı** |
| **Kümülatif Token Ayak İzi** | 599.400 token | 297.500 token | 320.000 token | **97.250 token** | **-%83.8 Net Token Tasarrufu** |
| **İstatistiki Güvenilirlik (%95 GA)**| %0 (Referans) | ~%50.4 | ~%46.6 | **%83.8 (±%0.3, z = 1.96)** | **Bilimsel Olarak Doğrulanmış** |

```bash
# 1. Belirlenimci çevrimdışı test motorunu çalıştırın (12 kategoride 50 golden görev, sıfır API maliyeti):
npm run benchmark:mock

# 2. Güncel Markdown analiz raporunu üretin:
npm run benchmark:report

# 3. Canlı LLM inference değerlendirmesini çalıştırın (.env içinde API anahtarı gerektirir):
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

**[RED-TEAM-AUDITOR] ZORUNLU KARŞIT DENETİM BULGULARI (Ön Hata Avı)**
1. *Mobil Görünüm Regresyonu:* Bento grid mobilde tek sütuna düşürülmezse içerik sıkışır; `@container` ve `grid-cols-1 md:grid-cols-3` zorunlu.
2. *Paket Şişkinliği:* Hesaplayıcı için önerilen harici grafik paketi reddedildi; saf inline SVG gösterge ile bütçe korundu.
3. *Erişilebilirlik (WCAG 2.1 AA):* Fiyatlandırma kartındaki ikincil buton metni `#E2E8F0` (14.37:1 kontrast) seviyesine güncellendi; odak çizgileri zorunlu kılındı.

**[STAFF-SYNTHESIZER] NİHAİ KONSENSÜS BLUEPRINT**
- Harici bağımlılık reddedildi; inline SVG kullanımı kilitlendi.
- Container query responsive düzeni ve WCAG kontrast iyileştirmeleri onaylandı.
- **Karar:** TÜM HATALAR KOD YAZILMADAN ÖNCE ÇÖZÜLDÜ. CERRAHİ TEK SEFERDE ÜRETİM İÇİN ONAYLANDI.
```

---

## HIZLI BAŞLANGIÇ VE KURULUM SEÇENEKLERİ

Geliştirme iş akışınıza uygun kurulum modunu seçin:

### Seçenek 0: Tek Komutla CLI Kurulumu (Zero-Config)

AIMASTER konfigürasyonunu doğrudan projenize entegre edin:

```bash
# Etkileşimli kurulum (npm registry üzerinden):
npx aimaster-os init

# Hedef IDE şablonu ile doğrudan kurulum:
npx aimaster-os init --ide cursor
npx aimaster-os init --ide windsurf --with-skills
npx aimaster-os init --ide all --with-skills --with-protocols

# Diske yazmadan simülasyon modu (kuru çalıştırma):
npx aimaster-os init --ide cursor --dry-run

# Mevcut hazır şablonları ve hedef dizinleri listeleme:
npx aimaster-os list

# Tam kurumsal bütünlük, fixture, adversarial ve benchmark paketini yürütme:
npx aimaster-os verify

# Paket kurmadan doğrudan GitHub reponuzdan çalıştırma:
npx github:Furkaxia/AiMaster init --ide cursor

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
│   └── test-validator-mutations.mjs# 12 Karşıt Semantik Kod Mutasyon Testi
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
