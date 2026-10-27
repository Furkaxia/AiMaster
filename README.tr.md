# AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Enterprise CI & Benchmark](https://img.shields.io/badge/Kurumsal%20CI%20%26%20Benchmark-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/ci.yml)
[![Skills Count](https://img.shields.io/badge/Yetenekler-80%20On--Demand%20Skill-emerald.svg?style=for-the-badge)](skills/README.md)
[![Empirical Token Reduction](https://img.shields.io/badge/Token%20Tasarrufu--%2583.5%20(%2595%20GA)-blueviolet.svg?style=for-the-badge)](benchmarks/BENCHMARK_REPORT.md)
[![Empirical Benchmark Suite](https://img.shields.io/badge/Ampirik%20G%C3%B6revler-28%20Golden%20Spec-indigo.svg?style=for-the-badge)](benchmarks/tasks/task.schema.json)
[![Node Compatibility](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-informational.svg?style=for-the-badge)](package.json)

**Yapay zeka modellerini (Claude, Cursor, Gemini, Windsurf, Copilot, ChatGPT) yönlendirilmeyen kod üreticileri olmaktan çıkarıp, deterministik Staff Engineer disiplininde çalışan otonom bir mühendislik konseyine dönüştüren kurumsal işletim sistemi.**

[English Documentation](README.md) • [Ampirik Benchmark](#tahmini-token-ekonomisi-ve-ampirik-benchmark) • [Mimari Çözüm](#çözüm-modüler-yönetişim-ve-boardroom-mimarisi) • [Boardroom Yönetişimi](#agentic-boardroom-nasil-calisir) • [Kurulum Seçenekleri](#hizli-baslangic-ve-kurulum-secenekleri) • [Yetenek Kataloğu (80 Skill)](skills/README.md)

</div>

---

## PROBLEM: Bağlam Bozulması ve Monolitik Prompt Yanılgısı

Geliştirici araçlarında sıklıkla yapılan kritik bir mimari hata, yüzlerce kuralı ve monolitik talimat yığınlarını LLM sistem promptuna tek seferde doldurmaktır. Ampirik değerlendirmeler, bu yaklaşımın üç temel alanda başarısız olduğunu kanıtlamaktadır:

1. **Lost-in-the-Middle ve Bağlam Bozulması:** 50.000+ token boyutundaki geniş bağlamlarda, transformer dikkat mekanizması belirgin bozulma yaşar. Çelişen kurallar birbirini geçersiz kılar, kritik güvenlik sınırları atlanır ve halüsinasyon oranları ciddi ölçüde yükselir.
2. **Rol Belirsizliği ve Mimari Sınır Kaybı:** Tek bir genel amaçlı ajanın aynı anda veritabanı optimizasyon uzmanı, erişilebilirlik tasarımcısı ve güvenlik denetçisi olarak çalışmaya zorlanması; mimari sınırların bulanıklaşmasına, zayıf tip tanımlamalarına ve teknik borç birikimine yol açar.
3. **Yapılandırılmamış Yeniden İşleme Maliyeti:** Kusurlu ilk çıktılar 4–8 tur geliştirici düzeltme döngüsü gerektirir. Tüm kaynak dosyaların tekrar tekrar üretilmesi, aslında 20.000 token içerisinde çözülebilecek görevlerde 150.000+ token harcanmasına neden olur.

---

## ÇÖZÜM: Modüler Yönetişim ve Boardroom Mimarisi

AIMASTER, mimari müzakereyi kod yazımından ayıran deterministik ve çok rollü bir yönetişim hiyerarşisi uygular:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KULLANICI TALEBİ                                │
│          "Güvenli ve çok kiracılı ödeme webhook işleyicisi geliştir"       │
└──────────────────────────────────────┬──────────────────────────────────────┘
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
                                                       [STAFF SYNTHESIZER]
                                                  (Konsensüs Spec & Cerrahi Diff)
```

1. **On-Demand Asgari Skill Kümeleri:** 80 skill hafızaya aynı anda yığılmaz. Yalnızca ilgili işin kapsamına giren asgari yeterli küme (genellikle 1 ila 3 on-demand skill) dinamik olarak çağrılır.
2. **Agentic Boardroom (4 Rol Yönetişim Konseyi):** Kod tabanına dokunulmadan önce 3 uzman rol (`[UX-ARCHITECT]`, `[UI-SYSTEMS]`, `[RED-TEAM-AUDITOR]`), `[STAFF-SYNTHESIZER]` liderliğinde 30–50 satırlık yapılandırılmış bir Micro-Spec üzerinde uzlaşır. Tasarım kusurları ve güvenlik açıkları baştan elenir.
3. **One-Shot İcra ve Doğrulama Kapıları:** İmzalanan uzlaşının ardından kod tek aşamada cerrahi mikro-diff ile üretilir; derleme, test, tip ve güvenlik kontrolleri çalıştırılır.
4. **English-Pivot Cross-Lingual Akıl Yürütme:** İstek hangi dilde (örneğin Türkçe) gelirse gelsin, model arka planda talebi endüstri standardı teknik İngilizce spesifikasyona derler; yerel kuralları ve domain varlıklarını (VKN, TCKN, İyzico, KVKK) koruyarak kullanıcıya ana dilinde teslim eder.

---

## TAHMİNİ TOKEN EKONOMİSİ VE AMPİRİK BENCHMARK

AIMASTER mimarisinin verimliliği, 7 mimari kategoride (Frontend, Backend, Database, Security, Refactoring, Bug-Fixing, Architecture) **28 golden görev spesifikasyonunu** sınayan otomatik ampirik değerlendirme motoruyla (`npm run benchmark:mock` ve `npm run benchmark:live`) doğrulanmıştır.

### Karşılaştırmalı Performans Matrisi

| Metrik | Baseline A (Ham LLM) | Baseline B (Yalnızca Anayasa Kuralları) | AIMASTER Tam Mimari | Ölçülen Avantaj |
| :--- | :--- | :--- | :--- | :--- |
| **Pass@1 Başarı Oranı** | %32.1 | %64.3 | **%100.0** | **+%67.9 daha yüksek başarı** |
| **Toplam Token Ayak İzi** | 332.200 token | 164.000 token | **54.950 token** | **-%83.5 Net Tasarruf** |
| **Token Tasarrufu (%95 GA)** | %0 (Referans) | ~%50.2 | **%83.5 (±%0.5, σ = %1.22)** | **İstatistiki Olarak Anlamlı** |
| **Ortalama Geliştirici İterasyonu** | 4.8 döngü | 2.9 döngü | **1.1 döngü** | **4.3 kat daha hızlı çözüm** |
| **İnsan Müdahalesi Oranı** | %71.4 | %39.3 | **%3.6** | **-%67.8 daha az müdahale** |
| **Güvenlik & Sınır Koruma** | Zafiyetli (SSRF/Sızıntı) | Yüksek Uyum | **%100 Fail-Closed Bariyer** | **Sıfır sızıntı / Tam izolasyon** |

### Aşama Dağılımı

| Aşama | Monolitik Promptlar (Baseline A) | AIMASTER Mimarisi | Ölçülen Avantaj |
| :--- | :--- | :--- | :--- |
| **Sistem Kuralları & Standartlar** | Monolitik prompt yığını (~40K–50K token) | Merkezi OS + İhtiyaç anında 1–3 skill (~8K–12K token) | **~%75 Daha Hafif Bağlam** |
| **Ön Uçuş Spesifikasyonu** | Körlemesine kod üretimi (~15K token) | Yapılandırılmış 30–50 satırlık Micro-Spec (~1K token) | **~%90 Daha Tasarruflu** |
| **Yeniden İşleme & Hata Ayıklama** | Tüm dosyayı 4–8 kez baştan üretme (~80K+ token) | Doğrulama bariyerli cerrahi diff (~5K token) | **4.3 Kat Daha Hızlı Çözüm** |
| **Toplam Görev Ayak İzi** | **332.200 Token (Kümülatif)** | **54.950 Token (Kümülatif)** | **%83.5 (±%0.5) Ampirik Net Tasarruf** |

> **Tekrarlanabilirlik & Bilimsel Rapor:** Ham veri seti, standart sapma hesaplamaları ve görev tanımları [benchmarks/BENCHMARK_REPORT.md](benchmarks/BENCHMARK_REPORT.md) dosyasında belgelenmiştir. Testler yerel ortamda bağımsız olarak çalıştırılabilir:
> ```bash
> npm run benchmark:mock     # Deterministik çevrimdışı değerlendirme motorunu çalıştırır
> npm run benchmark:report   # İstatistiki markdown analiz raporu üretir
> ```

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

# Mevcut şablonları ve hedef yolları listele:
npx aimaster list

# Tümleşik kurumsal bütünlük, fixture, adversarial ve benchmark testlerini çalıştır:
npx aimaster verify

# Posix / Unix tek satır kurulum:
curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
```

### Seçenek A: Tam Kurumsal Mod (Önerilen)
80 skill yönlendirme kataloğunu ve kurumsal standartları projenize dahil edin:
1. `RulesAI.md` dosyasını ve `skills/` dizinini proje kök dizinine ekleyin.
2. Editörünüze ait hazır şablonu `integrations/` altından seçin:
   - **Cursor:** [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) dosyasını kök dizine ekleyin.
   - **Claude Projects:** [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) dosyasını Project Instructions alanına ekleyin.
   - **Google Antigravity & Gemini:** [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) dosyasını kök dizine yerleştirin.
   - **Windsurf Cascade:** [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) dosyasını kök dizine ekleyin.
   - **GitHub Copilot:** [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) dosyasını `.github/copilot-instructions.md` yoluna kopyalayın.
   - **ChatGPT Custom Instructions:** [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md) dosyasını yapılandırın.

### Seçenek B: Sıfır-Kurulum Tekil Şablon Modu
Projenizde `skills/` klasörünü yerel olarak tutmak istemiyorsanız, yalnızca ilgili araca ait şablonu (örneğin `.cursorrules`, `GEMINI.md` veya `CLAUDE.md`) çalışma alanınıza kopyalayın. Şablon tek başına Boardroom protokolünü, fast-track sınırlarını ve fail-closed kalite kapılarını otonom olarak işletir.

---

## SİSTEM MİMARİSİ VE DOSYA YAPISI

```text
aimaster/
├── README.md                       # Global İngilizce Dokümantasyon ve Mimari
├── README.tr.md                    # Türkçe Dokümantasyon ve Sistem Kılavuzu
├── RulesAI.md                      # En Üst Düzey Anayasal İşletim Sistemi Kuralları
├── agent-boardroom-protocol-ai.md  # 4 Rolün Kodsuz Müzakere Şartnamesi
├── ui-standards-ai.md              # 60-30-10 Tasarım Token'ları ve A11y Standartları
├── testing-protocol-ai.md          # Sınır Değer Simülasyonu ve Doğrulama Kapıları
├── project-architecture-ai.md      # Kök Dizin Hijyeni ve Modüler Mimari Sınırları
├── error-recovery-escalation-ai.md # 5 Kademeli Hata Matrisi ve Döngü Kırıcı
├── dependency-policy-ai.md         # Onaylı Paket Listesi ve Bağımlılık Politikası
├── git-commit-convention-ai.md     # Conventional Commits Şartnamesi
├── ai-communication-protocol-ai.md # English-Pivot Akıl Yürütme ve İletişim Protokolü
├── performance-budget-ai.md        # Core Web Vitals ve API Yanıt Bütçeleri
├── session-handoff-protocol-ai.md  # Kayıpsız Oturum Geçiş ve Kontrol Noktası Şeması
├── ai-log-ai.md                    # Mimari Karar ve Operasyonel Denetim Kaydı
├── LICENSE                         # MIT Lisansı
├── CONTRIBUTING.md                 # Katkı Kılavuzu ve Doğrulama Kriterleri
├── SECURITY.md                     # Güvenlik ve Zafiyet Bildirim Politikası
├── package.json                    # Paket Dağıtım Metadata, Scriptler ve Dosya Listesi
├── bin/                            # Sıfır Bağımlılıklı CLI
│   └── aimaster.js                 # Init, List, Verify ve Preset Yöneticisi
│
├── benchmarks/                     # Ampirik Benchmark ve Tekrarlanabilirlik Paketi
│   ├── runner.mjs                  # Çift Modlu Test Motoru (Mock / Live API)
│   ├── generate-report.mjs         # İstatistiki Analiz ve Rapor Üretici
│   ├── BENCHMARK_REPORT.md         # Doğrulanmış Ampirik Benchmark Raporu
│   ├── results/                    # Güncel ve Zaman Damgalı Ham JSON Çıktıları
│   └── tasks/                      # 28 Golden Ampirik Görev Spesifikasyonu
│       ├── task.schema.json        # Ampirik Görevler için JSON Şeması
│       └── *.json                  # 7 Kategoride Dağıtılmış Görev Dosyaları
│
├── integrations/                   # Editör ve Platform Hazır Entegrasyon Şablonları
│   ├── cursor/.cursorrules
│   ├── claude/claude-project-prompt.md
│   ├── antigravity/GEMINI.md
│   ├── windsurf/.windsurfrules
│   ├── chatgpt/custom-instructions.md
│   └── copilot/copilot-instructions.md
│
├── scripts/                        # Otomatik CI Doğrulama Paketi
│   ├── verify-integrity.js         # Çift Yönlü Link ve Şema Doğrulayıcı (114 Kontrol)
│   ├── test-integrity-fixtures.js  # Adversarial Linter Fixture Testleri (15 Test)
│   └── test-adversarial-evals.js   # Golden Davranışsal Eval Koşucusu (23 Senaryo)
│
├── tests/                          # Karşıt Test Veri Setleri
│   └── adversarial-prompts.json    # 23 Golden Karşıt Senaryo
│
└── skills/                         # 80 Adet On-Demand Uzmanlık Yeteneği (7 Kategori)
    ├── _shared-skill-footer.md     # Ortak QA Kuralları ve Kesin Yasaklar Şablonu
    ├── README.md                   # Dinamik Yetenek Kataloğu ve Kategori Haritası
    ├── 01-architecture-planning/   # 9 Yetenek (Sistem Mimarisi, Monorepo, Cross-Lingual)
    ├── 02-frontend-ui/             # 10 Yetenek (Motion, Token'lar, Tailwind, A11y, State)
    ├── 03-backend-data/            # 19 Yetenek (RAG, Vektör, Mesaj Kuyruğu, SQL, HMAC)
    ├── 04-security-audit/          # 9 Yetenek (SSRF, Gizlilik, Kriptografi, Kimlik Doğrulama)
    ├── 05-testing-quality/         # 10 Yetenek (Kaos Testi, Hata Teşhisi, Birim, Görsel)
    ├── 06-devops-tooling/          # 11 Yetenek (Kubernetes, IaC, DNS/SSL, CI/CD Pipeline)
    └── 07-code-craft/              # 12 Yetenek (Temiz Kod, Katı TypeScript, Refactoring)
```

---

## YETENEK KATALOĞU VE KATEGORİ MATRİSİ

80 adet uzmanlık yeteneği 7 mantıksal mühendislik kategorisine ayrılmıştır:

| Kategori | Yetenek Sayısı | Odak Alanı |
| :--- | :--- | :--- |
| **01-architecture-planning** | 9 Yetenek | Sistem tasarımı, mimari sentez, otonom iş kırılımı, durum makineleri |
| **02-frontend-ui** | 10 Yetenek | Responsive arayüz, tasarım token'ları, WCAG 2.1 AA erişilebilirlik, Tailwind |
| **03-backend-data** | 19 Yetenek | REST/GraphQL, veritabanı optimizasyonu, sıfır kesinti migration, RAG vektörler |
| **04-security-audit** | 9 Yetenek | Zero-trust SSRF, kimlik güvenliği, secret koruması, kriptografi, red-teaming |
| **05-testing-quality** | 10 Yetenek | Hata teşhisi, kaos dayanıklılığı, birim testleri, entegrasyon ve sözleşme testleri |
| **06-devops-tooling** | 11 Yetenek | Docker dağıtımı, Kubernetes, Terraform IaC, gözlemlenebilirlik, CI/CD |
| **07-code-craft** | 12 Yetenek | Katı TypeScript, tasarım desenleri, refactoring, performans optimizasyonu |

Detaylı yetenek listesi ve yönlendirme haritası için [skills/README.md](skills/README.md) dokümanını inceleyin.

---

## ÇALIŞMA ZAMANI KOMUTLARI VE YÖNERGELER

Ajanın çalışma modunu doğrudan standart prompt önekleriyle yönlendirebilirsiniz:

- `AIMASTER: <istek>` veya `/boardroom <istek>`: Kod yazımından önce 4 rollü multi-agent boardroom müzakeresini zorunlu kılar.
- `FAST: <istek>` veya `/fast <istek>`: Atomik değişiklikler (<20 satır) için müzakereyi atlayıp cerrahi düzeltme modunu açar.
- `/audit <kod/plan>`: Yalnızca Red-Team Auditor rolünü devreye alarak güvenlik ve risk analizi yürütür.
- `/ui <istek>`: Tasarım token'ları, arayüz düzeni ve erişilebilirlik analizi için UI Systems rolünü çağırır.
- `/handoff`: Oturum bağlamı dolduğunda temiz aktarım için `.handoff/session-state.md` şablonu oluşturur.
- `/vibe <istek>`: Güvenlik sınırlarından taviz vermeden hızlı prototipleme modunu etkinleştirir.

---

## LİSANS VE YÖNETİŞİM

AIMASTER, [MIT Lisansı](LICENSE) kapsamında açık kaynaklı olarak dağıtılmaktadır.  
Geliştirici: **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** ve AIMASTER Mühendislik Topluluğu.
