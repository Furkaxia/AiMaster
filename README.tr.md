# ⚡ AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Skills Count](https://img.shields.io/badge/Skills-80%20Uzman%20Yetkinlik-emerald.svg?style=for-the-badge)](skills/README.md)
[![Core Standards](https://img.shields.io/badge/Core%20Standards-10%20Temel%20Kural-indigo.svg?style=for-the-badge)](RulesAI.md)
[![Token Efficiency](https://img.shields.io/badge/Token%20Savings-Up%20to%2085%25-orange.svg?style=for-the-badge)](#tahmini-token-ekonomisi-ve-verimlilik)
[![Multi-Agent](https://img.shields.io/badge/Architecture-Agentic%20Boardroom-purple.svg?style=for-the-badge)](agent-boardroom-protocol-ai.md)

**Yapay zeka ajanlarını (Claude, Cursor, Gemini, Windsurf, ChatGPT) kontrolsüz halüsinasyon gören spagetti kod üreticileri olmaktan çıkarıp, Staff Engineer disiplininde çalışan otonom bir mühendislik konseyine dönüştüren kurumsal işletim sistemi.**

[🌍 English Documentation](README.md) • [Kurulum Seçenekleri](#hizli-baslangic-ve-kurulum-secenekleri) • [Boardroom Protokolü](#agentic-boardroom-nasil-calisir) • [Yetenek Kataloğu (80 Skill)](skills/README.md)

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
   [BASİT / SYNTAX-TYPO]                                 [KOMPLEKS / YENİ ÖZELLİK]
            │                                                     │
     [FAST-TRACK MODU]                                    [BOARDROOM KONSEYİ]
 (Doğrudan Cerrahi Müdahale)                             (KOD YAZMADAN MÜZAKERE)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Bilgi Mimarisi)          (Tasarım/Token)        (Adversarial Denetim: Maddi Risk Varsa >=2)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [KONSENSÜS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                       [STAFF SYNTHESIZER]
                                                  (Konsensüs Spec & Cerrahi Diff)
```

1. **On-Demand Asgari Skill Kümesi:** 80 skill hafızaya aynı anda yığılmaz. Sadece o anda yapılan işin kapsamına giren asgari yeterli küme (genellikle 1 ila 3 on-demand skill) cerrahi olarak çağrılır.
2. **Agentic Boardroom (4 Rol Konseyi):** Kod yazılmadan önce 3 uzman rol ([UX-ARCHITECT], [UI-SYSTEMS], [RED-TEAM-AUDITOR]), [STAFF-SYNTHESIZER] liderliğinde 30–50 satırlık yapılandırılmış bir Micro-Spec üzerinde uzlaşır. Kötü tasarım kararları ve maddi zafiyetler kod yazılmadan elenir.
3. **One-Shot İcra ve Doğrulama Kapıları:** Uzlaşı sağlandıktan sonra kod tek hamlede cerrahi mikro-diff ile üretilir; ardından test, build, lint ve güvenlik doğrulama kapıları çalıştırılır.
4. **English-Pivot Cross-Lingual Akıl Yürütme:** Kullanıcı Türkçe talep verse dahi, model arka planda talebi endüstri standardı teknik İngilizce spesifikasyona derler; kuralları en katı şekilde işletir, yerel varlıkları (VKN, TCKN, İyzico) korur ve kullanıcıya doğrudan Türkçe yanıt verir.
5. **Context Window Checkpoint & Handoff:** Uzun süren oturumlarda bağlam şiştiğinde sistem `.handoff/session-state.md` üreterek yeni sohbete minimum token israfı ve kritik mimari hafıza aktarımıyla geçiş sağlar.

---

## 📊 TAHMİNİ TOKEN EKONOMİSİ VE VERİMLİLİK

| Aşama | Geleneksel Monolitik Model | AIMASTER Boardroom Modeli | Avantaj |
| :--- | :--- | :--- | :--- |
| **Sistem Kuralları & Standartlar** | Monolitik kurallar baştan yüklenir (~40K–50K token) | Merkez anayasa + 1–3 asgari skill (~8K–12K token) | **~%75 Daha Hafif** |
| **Ön Hazırlık & Planlama** | Körlemesine dosya yazımı (~15K token) | 30–50 satırlık yapılandırılmış Micro-Spec (~1K token) | **~%90 Tasarruf** |
| **Hata Düzeltme & Rework** | 4–8 tur tekrar tekrar dosya üretimi (~80K+ token) | Cerrahi mikro-diff ve doğrulama kapıları (~5K token) | **Ciddi Azalma** |
| **Toplam Görev Ayak İzi** | **~135.000 – 165.000 Token** | **~15.000 – 20.000 Token** | **🔥 %85'e Varan Net Tasarruf** |

> *Metodoloji Notu:* Tablodaki veriler, monolitik tüm kuralların baştan yüklendiği sistemler ile AIMASTER'ın dinamik asgari skill yükleme mimarisi arasındaki bayt-token oranlarına dayanan modelleme projeksiyonlarıdır. AIMASTER, istemciler için anayasal bir prompt/talimat çerçevesidir. Gerçek tasarruf oranları kod tabanı ölçeğine, dosya sayısına, görev karmaşıklığına ve kullanılan LLM sağlayıcısının prompt caching yeteneklerine göre değişiklik gösterir; bu veriler harici bağımsız bir ampirik benchmark değil, mimari modelleme tahminleridir. Bağlam kaybını ve tekrar işleme maliyetini azaltmayı hedefler; gerçek tasarruf göreve ve modele bağlıdır, sıfır bilgi kaybı garantisi vermez.

---

## 🏛️ AGENTIC BOARDROOM NASIL ÇALIŞIR?

Karmaşık bir istek geldiğinde sistem tek bir çıktı bloğunda 4 rolü konuşturur:

> 💡 **Örnek Müzakere:** Aşağıdaki diyalog, interaktif bir SaaS açılış sayfası senaryosu için temsili bir örnek gösterir. Rol bulguları her zaman gerçek kod tabanına dinamik olarak uygulanmalı, asla örnek şablon kopyalanmamalıdır.

```markdown
### 🏛️ [AIMASTER BOARDROOM MÜZAKERESİ]

**[UX-ARCHITECT]**
- Sayfa Akışı: Hero -> Problem -> Bento Grid Features -> Interactive Calculator -> Pricing -> FAQ
- State İhtiyacı: `currency: "USD" | "EUR"`, `monthlyVolume: number`

**[UI-SYSTEMS]**
- Palet (Kurumsal Slate): 60% `#090A0F`, 30% `#151823` (Border `#4B5563`), 10% `#6366F1` (Indigo CTA)
- Tipografi: Outfit (Display) + Inter (Body)
- Spacing: 8pt grid, 200ms ease-out transitions

**[RED-TEAM-AUDITOR] ⚠️ ZORUNLU İTİRAZLAR (Anti-Rubber-Stamping)**
1. *Mobil UX Hatası:* Bento grid mobilde tek sütuna düşürülmezse içerik sıkışır; `grid-cols-1 md:grid-cols-3` zorunlu.
2. *Paket Şişkinliği:* İnteraktif hesaplayıcı için harici grafik kütüphanesi önerilmiş; bundle şişer, pure SVG gauge kullanılmalı.
3. *Erişilebilirlik:* Fiyatlandırma kartındaki secondary buton metin rengi `#E2E8F0` (14,37:1 WCAG AAA) olarak belirlendi; border ise `#4B5563` (3,2:1 WCAG 1.4.11 UI bileşen kontrastı) seviyesine yükseltildi.

**[STAFF-SYNTHESIZER] 🎯 NİHAİ KONSENSÜS BLUEPRINT**
- Harici grafik kütüphanesi elendi (Pure SVG Gauge).
- Mobil grid ve kontrast itirazları kabul edildi.
- **Statü:** CERRAHİ İCRA VE DOĞRULAMA İÇİN ONAYLANDI.
```

---

## ⚡ HIZLI BAŞLANGIÇ VE KURULUM SEÇENEKLERİ

İhtiyacınıza uygun kurulum yöntemini seçin:

### Seçenek A: Tam Çerçeve Modu (Önerilen)
80 skill'lik yönlendirme kataloğunu ve tam mimari standartları projenize dahil edin:
1. `RulesAI.md` dosyasını ve `skills/` klasörünü projenizin kök dizinine kopyalayın.
2. Kullandığınız geliştirme ortamına ait hazır şablonu `integrations/` altından seçin:
   - **Cursor:** [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) dosyasını proje kök dizinine kopyalayın.
   - **Claude Projects:** [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) içeriğini Project Instructions alanına yapıştırın.
   - **Google Antigravity & Gemini CLI:** [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) dosyasını proje kök dizinine yerleştirin.
   - **Windsurf:** [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) dosyasını kök dizine ekleyin.
   - **GitHub Copilot:** [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) dosyasını `.github/copilot-instructions.md` yoluna kopyalayın.
   - **ChatGPT:** [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md) metnini Custom Instructions alanına yapıştırın.

### Seçenek B: Sıfır-Kurulum Tekil Şablon Modu
Projenizde `skills/` klasörünü yerel olarak barındırmak istemiyorsanız, yalnızca kullandığınız araca ait tek bir şablon dosyasını (örneğin `integrations/cursor/.cursorrules`, `integrations/antigravity/GEMINI.md` veya `integrations/claude/claude-project-prompt.md`) projenizin kök dizinine ekleyin. Şablon tek başına Boardroom protokolünü, Fast-Track kurallarını ve kalite bariyerlerini otonom bir Staff Engineer disiplininde çalıştırır; ihtiyaç duyulduğunda merkezi standartlara başvurur.

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
