# ⚡ AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Skills Count](https://img.shields.io/badge/Skills-80%20Production%20Ready-emerald.svg?style=for-the-badge)](skills/README.md)
[![Core Standards](https://img.shields.io/badge/Core%20Standards-10%20Bulletproof%20Rules-indigo.svg?style=for-the-badge)](RulesAI.md)
[![Token Efficiency](https://img.shields.io/badge/Token%20Savings-Up%20to%2085%25-orange.svg?style=for-the-badge)](#-token-ekonomisi-benchmark)
[![Multi-Agent](https://img.shields.io/badge/Architecture-Agentic%20Boardroom-purple.svg?style=for-the-badge)](agent-boardroom-protocol-ai.md)

**Yapay zeka ajanlarını (Claude, Cursor, Gemini, Windsurf, ChatGPT) kontrolsüz halüsinasyon gören spagetti kod üreticileri olmaktan çıkarıp, Staff Engineer disiplininde çalışan otonom bir mühendislik konseyine dönüştüren kurumsal işletim sistemi.**

[🌍 English Documentation](README.md) • [Hızlı Başlangıç (30 Sn)](#-30-saniyede-hizli-baslangic) • [Boardroom Protokolü](#-agentic-boardroom-nasil-calisir) • [Yetenek Kataloğu (80 Skill)](skills/README.md)

</div>

---

## 💥 PROBLEM: Neden 1000'lerce Skill Yüklemek AI'ı Aptallaştırır?

İnternetteki popüler trend: *"AI'a 500 tane kural ve binlerce skill yükleyin, süper olsun!"*  
**Bu büyük bir yanılgıdır ve üç temel felaketle sonuçlanır:**

1. **Lost-in-the-Middle (Bağlam Bozulması):** LLM'lerin dikkat mekanizması 50k+ tokenlık promptlarda kuralları unutur, birbiriyle çelişen yönergeleri karıştırır ve halüsinasyon görmeye başlar.
2. **Kimlik Çatışması & Spagetti Kod:** Aynı anda hem CSS uzmanı, hem veritabanı gurusu, hem hacker olmaya çalışan tek bir ajan kararsız kalır ve vasat bir ortalama kod üretir.
3. **Maliyet İflası (%80 Rework Cezası):** İlk seferde kusurlu kod yazan ajan, her "düzelt" dediğinizde 2000 satırlık kodu baştan üretir ve tek bir basit sayfada 150.000+ token yakar.

---

## 🛡️ ÇÖZÜM: AIMASTER Felsefesi

AIMASTER bu problemi iki köklü devrimle çözer:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KULLANICI TALEBİ                                │
│                     "Bana modern bir web sitesi yap"                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [GÖREV KARMAŞIKLIK ANALİZİ]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
   [BASİT / BUG-FIX]                                     [KOMPLEKS / YENİ ÖZELLİK]
            │                                                     │
    [FAST-TRACK MODU]                                    [BOARDROOM KONSEYİ]
(Doğrudan Cerrahi Müdahale)                             (KOD YAZMADAN MÜZAKERE)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Bilgi Mimarisi)          (Tasarım/Token)        (Zorunlu 2 Kusur Bulur)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                       [KONSENSÜS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                      [STAFF SYNTHESIZER]
                                                   (Tek Seferde Hatasız Kod)
```

1. **On-Demand Cerrahi Yükleme:** 80 skill hafızaya aynı anda yığılmaz. Sadece o anda yapılan işe özel tek bir skill cerrahi olarak çağrılır.
2. **Agentic Boardroom (Mikro-Ajan Konseyi):** Kod yazılmadan önce 3 mikro-rol (UX Architect, UI Systems, Red-Team Auditor) 30 satırlık bir Micro-Spec üzerinde uzlaşır. Kötü kararlar kod yazılmadan elenir.
3. **One-Shot Synthesis:** Uzlaşı sağlandıktan sonra kod tek hamlede, sıfır deneme-yanılmayla hatasız üretilir.
4. **English-Pivot Cross-Lingual Akıl Yürütme:** Kullanıcı Türkçe talep verse dahi, model arka planda talebi endüstri standardı teknik İngilizce spesifikasyona derler; kuralları en katı şekilde işletir, yerel varlıkları (VKN, TCKN, İyzico) korur ve kullanıcıya doğrudan Türkçe yanıt verir.
5. **Context Window Checkpoint & Handoff:** Uzun süren oturumlarda bağlam şiştiğinde sistem `.handoff/session-state.md` üreterek yeni sohbete sıfır token israfı ve tam hafızayla geçiş sağlar.

---

## 📊 TOKEN EKONOMİSİ BENCHMARK

| Metrik | Geleneksel Monolitik Model | AIMASTER Boardroom Modeli | Avantaj |
| :--- | :--- | :--- | :--- |
| **Bağlam Kirliliği** | 1000'lerce kural baştan yüklenir (~40K token) | Sadece 1 ana kural + 1 on-demand skill (~3K token) | **%92 Daha Hafif** |
| **Ön Hazırlık Maliyeti** | Körlemesine 2500 satır kod yazımı (~15K token) | 30 satırlık Micro-Spec müzakeresi (~1.5K token) | **%90 Tasarruf** |
| **Hata Düzeltme Turları** | 4 - 8 tur tekrar tekrar kod üretimi (~80K+ token) | 0 - 1 tur cerrahi rötuş (~5K token) | **%94 Daha Hızlı** |
| **Toplam Görev Maliyeti** | **~120.000 - 180.000 Token** | **~18,000 - 25,000 Token** | **🔥 %85 NET TASARRUF** |

---

## 🏛️ AGENTIC BOARDROOM NASIL ÇALIŞIR?

Karmaşık bir istek geldiğinde sistem tek bir çıktı bloğunda 4 rolü konuşturur:

```markdown
### 🏛️ [AIMASTER BOARDROOM MÜZAKERESİ]

**[UX-ARCHITECT]**
- Sayfa Akışı: Hero -> Problem -> Bento Grid Features -> Interactive Calculator -> Pricing -> FAQ
- State İhtiyacı: `currency: "USD" | "EUR"`, `monthlyVolume: number`

**[UI-SYSTEMS]**
- Palet (Kurumsal Slate): 60% `#090A0F`, 30% `#151823` (Border `#2D334A`), 10% `#6366F1` (Indigo CTA)
- Tipografi: Outfit (Display) + Inter (Body)
- Spacing: 8pt grid, 200ms ease-out transitions

**[RED-TEAM-AUDITOR] ⚠️ ZORUNLU İTİRAZLAR (Anti-Rubber-Stamping)**
1. *Mobil UX Hatası:* Bento grid mobilde tek sütuna düşürülmezse içerik sıkışır; `grid-cols-1 md:grid-cols-3` zorunlu.
2. *Paket Şişkinliği:* İnteraktif hesaplayıcı için harici grafik kütüphanesi önerilmiş; bundle şişer, pure SVG gauge kullanılmalı.
3. *Erişilebilirlik:* Fiyatlandırma kartındaki secondary buton kontrastı 2.9:1 kalmış; metin rengi `#E2E8F0` yapılmalı.

**[STAFF-SYNTHESIZER] 🎯 NİHAİ KONSENSÜS BLUEPRINT**
- Harici grafik kütüphanesi elendi (Pure SVG Gauge).
- Mobil grid ve kontrast itirazları kabul edildi.
- **Statü:** İCRA İÇİN ONAYLANDI.
```

---

## ⚡ 30 SANİYEDE HIZLI BAŞLANGIÇ

Hangi aracı kullanıyorsanız ilgili şablonu kopyalayın:

### 1. Cursor Kullanıcıları
Projenizin kök dizinine [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) dosyasını kopyalayın. Hepsi bu!

### 2. Claude Projects Kullanıcıları
Claude.ai üzerinde yeni bir Project açın. Project Instructions alanına [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) dosyasının içeriğini yapıştırın.

### 3. Google Antigravity & Gemini CLI
Proje kök dizinine [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) dosyasını yerleştirin.

### 4. Windsurf Kullanıcıları
Proje kök dizinine [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) dosyasını ekleyin.

### 5. ChatGPT Kullanıcıları
Custom Instructions alanına [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md) metnini yapıştırın.

---

## 📂 SİSTEM MİMARİSİ VE DOSYA YAPISI

```text
aimaster/
├── README.md                       # 🌍 GLOBAL ENGLISH DOCUMENTATION & MANIFESTO
├── README.tr.md                    # 🇹🇷 TÜRKÇE DETAYLI REHBER & DOKÜMANTASYON
├── RulesAI.md                      # 🏛️ ANA ANAYASA: Hiyerarşik Kural Önceliği & 6 Adımlı İcra
├── agent-boardroom-protocol-ai.md  # 👥 [ÇEKİRDEK 1] 4 Rolün Kodsuz Müzakere Protokolü
├── ui-standards-ai.md              # 🎨 [ÇEKİRDEK 2] 60-30-10 Kuralı, Yasak Paletler & Tipografi
├── testing-protocol-ai.md          # 🧪 [ÇEKİRDEK 3] Sınır Değer Simülasyonu & Sıfır Bölme Güvenliği
├── project-architecture-ai.md      # 🏗️ [ÇEKİRDEK 4] Kök Dizin Temizliği & Katı src/ Hiyerarşisi
├── error-recovery-escalation-ai.md # 🚨 [ÇEKİRDEK 5] 5 Seviyeli Hata Matrisi & Döngü Kırıcı
├── dependency-policy-ai.md         # 📦 [ÇEKİRDEK 6] Güvenli Paket Listesi & CVE Kriterleri
├── git-commit-convention-ai.md     # 🌿 [ÇEKİRDEK 7] Conventional Commits & Atomik Dal Standartları
├── ai-communication-protocol-ai.md # 🌐 [ÇEKİRDEK 8] Dil Seçimi, Çıktı Formatı & Sıfır Dolgu
├── performance-budget-ai.md        # ⚡ [ÇEKİRDEK 9] Core Web Vitals, Bundle Sınırları & Yanıt Bütçesi
├── session-handoff-protocol-ai.md  # 🔄 [ÇEKİRDEK 10] Bağlam Kontrolü & Yeni Chat Handoff Protokolü
├── ai-log-ai.md                    # 📜 Operasyonel Denetim ve Günlük Kayıtları
├── LICENSE                         # ⚖️ MIT Lisansı
├── CONTRIBUTING.md                 # 🤝 Topluluk Katkı Kılavuzu
├── SECURITY.md                     # 🛡️ Güvenlik ve Zafiyet Politikası
├── package.json                    # 📦 NPM Test & Proje Üstbilgisi
│
├── integrations/                    # 🚀 Hazır IDE ve Platform Presets
│   ├── cursor/.cursorrules          # Cursor AI Entegrasyonu
│   ├── claude/claude-project-prompt # Claude Projects Sistem Promptu
│   ├── antigravity/GEMINI.md        # Google Antigravity & Gemini CLI
│   ├── windsurf/.windsurfrules      # Windsurf Cascade Kuralları
│   ├── chatgpt/custom-instructions  # ChatGPT Ayarları
│   └── copilot/copilot-instructions # GitHub Copilot Workspace
│
├── scripts/                         # 🛠️ Sıfır Bağımlılıklı CI & Bütünlük Scriptleri
│   └── verify-integrity.js          # Otomatik Link, Sızıntı & Bütünlük Doğrulayıcı
│
└── skills/                          # 🧠 80 Adet On-Demand Uzmanlık Yeteneği (7 Kategori)
    ├── _shared-skill-footer.md      # Token Tasarruflu Ortak Yasak & QA Şablonu
    ├── README.md                    # Dinamik Yetenek Kataloğu ve Router
    ├── 01-architecture-planning/    # Mimari Sentez, Monorepo, Cross-Lingual (9 Skill)
    ├── 02-frontend-ui/              # Motion, Design Tokens, Charts, Tailwind, A11y (10 Skill)
    ├── 03-backend-data/             # RAG & Vector, Mesaj Kuyrukları, Ödeme, SQL (19 Skill)
    ├── 04-security-audit/           # KVKK/GDPR, Kriptografi, Red-Team, Auth, Hardening (9 Skill)
    ├── 05-testing-quality/          # Kaos Testi, Snapshot, Görsel Regresyon, Birim (10 Skill)
    ├── 06-devops-tooling/           # Kubernetes, IaC Terraform, DNS/SSL, CI/CD, Docker (11 Skill)
    └── 07-code-craft/               # GoF & SOLID Desenleri, i18n Runtime, Anti-Any TS (12 Skill)
```

---

## 🎯 SİHİRLİ TETİKLEYİCİ KOMUTLAR

Ajanla konuşurken modu değiştirmek için şu komutları kullanabilirsiniz:

- `AIMASTER: <istek>` veya `/boardroom <istek>` ➔ Full Boardroom konseyini toplar.
- `FAST: <istek>` veya `/fast <istek>` ➔ Müzakereyi atlayıp cerrahi koda geçer (küçük işler için).
- `/audit <kod/plan>` ➔ Yalnızca Red-Team Auditor'ı tetikler; acımasız açık ve risk raporu döker.
- `/ui <istek>` ➔ Yalnızca UI Systems rolünü tetikler; 60-30-10 palet ve token analizi yapar.
- `/handoff` ➔ Bağlam şiştiğinde anında `.handoff/session-state.md` oluşturup yeni sohbete geçiş masterpromptu üretir.

---

## 📜 LİSANS VE YAZAR

Bu proje **MIT Lisansı** ile lisanslanmıştır.  
Geliştirici: **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** & AIMASTER Topluluğu.
