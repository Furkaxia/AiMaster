# AGENTIC BOARDROOM & MULTI-PERSONA PRE-FLIGHT PROTOCOL (agent-boardroom-protocol-ai.md)

> **Dosya Konumu:** `agent-boardroom-protocol-ai.md`  
> **Rol Tanımı:** Çoklu Ajan Müzakere, Karşıt Denetim ve Token-Tasarruflu Konsensüs Protokolü  
> **Temel Amaç:** Karmaşık görevlerde tekil ajanın kararsızlığını ve halüsinasyonunu engellemek; uzmanlaşmış mikro-roller arasında kodsuz bir ön müzakere yürüterek tek seferde (one-shot) sıfır hatalı üretim sağlamak.

---

## 1. MİMARİ FELSEFE & TOKEN EKONOMİSİ

Geleneksel yapay zeka yaklaşımlarında binlerce kural tek bir hafızaya yüklenir ve ajan doğrudan binlerce satır kod yazmaya başlar. Kod hatalı çıktığında kullanıcı düzeltme ister, ajan tüm kodu baştan yazar ve yüzbinlerce token israf edilir.

**Boardroom Protokolünün Katı Kuralı:**  
> **"Toplantıda tek satır kod yazılmaz; yalnızca 'Micro-Spec' müzakere edilir."**

Kötü mimari kararlar, uyumsuz renkler, erişilebilirlik hataları ve gereksiz bağımlılıklar **kod yazılmadan önce 50-100 kelimelik spec düzeyinde elenir.** Böylece %75 - %85 oranında net token tasarrufu sağlanır.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KULLANICI TALEBİ                                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [GÖREV KARMAŞIKLIK ANALİZİ]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
   [BASİT / BUG-FIX]                                     [KOMPLEKS / YENİ ÖZELLİK]
            │                                                     │
    [FAST-TRACK MODU]                                    [BOARDROOM KONSEYİ]
(Doğrudan Cerrahi Müdahale)                                       │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Bilgi Mimarisi)          (Tasarım/Token)        (Zorunlu İtiraz)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                       [KONSENSÜS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                      [STAFF SYNTHESIZER]
                                                   (Tek Seferde Hatasız Kod)
```

---

## 2. MOD SEÇİM MATRİSİ: KONSEY Mİ, FAST-TRACK Mİ?

Ajan her görevde konseyi toplamaz; token tasarrufu için şu matrisi uygular:

| Görev Tipi | Uygulanacak Mod | Açıklama |
| :--- | :--- | :--- |
| **Yeni Web Sitesi / Mobil Uygulama** | 🏛️ **Full Boardroom** | UX, UI, Güvenlik ve Auditor tam kadro toplanır. |
| **Yeni Büyük Modül / Auth / Veritabanı** | 🏛️ **Full Boardroom** | Veri akışı, güvenlik ve mimari spec çıkarılır. |
| **Büyük Refactoring / Performans İyileştirme** | 🏛️ **Technical Boardroom** | UX atlanır; Architect + Performance + Auditor toplanır. |
| **Tek Dosya / Net Bug-Fix (<20 Satır)** | ⚡ **Fast-Track** | Konsey toplanmaz; cerrahi düzeltme uygulanır. |
| **Metin / İsim / Renk / CSS İnce Ayarı** | ⚡ **Fast-Track** | Konsey toplanmaz; doğrudan kurala uyulur. |

---

## 3. KONSEY ROLLERİ VE GÖREV TANIMLARI

### Rol 1: `[UX-ARCHITECT]` (Kullanıcı Deneyimi ve Bilgi Mimarisi)
- **Yetki Alanı:** Sayfa yapısı, component hiyerarşisi, kullanıcı yolculuğu, sayfa içi durum (state) gereksinimleri.
- **Yasakları:** Asla hex kodları, CSS sınıfları veya stil detaylarına girmez. Kod yazmaz.
- **Çıktı Biçimi:**
  ```yaml
  [UX-ARCHITECT]:
    Information_Hierarchy: [Bölüm 1, Bölüm 2, Bölüm 3]
    Component_Tree: [AnaBileşen -> AltBileşen1, AltBileşen2]
    State_Requirements: [Kullanıcı etkileşimleri, form durumları]
    Key_User_Action: [Kullanıcının tamamlaması gereken birincil hedef]
  ```

### Rol 2: `[UI-SYSTEMS]` (Görsel Tasarım & Stil Mimarisi)
- **Yetki Alanı:** 60-30-10 renk dengesi, tipografi ölçeği, spacing ritmi, interaksiyon durumları.
- **Yasakları:** Neon/siberpunk renkler, çamur gölgeler ve rastgele utility kullanımı yasaktır. Kod blokları yazmaz.
- **Çıktı Biçimi:**
  ```yaml
  [UI-SYSTEMS]:
    Color_Palette:
      Dominant_60: "#Renk (Arka plan ve ana gövde)"
      Structural_30: "#Renk (Kartlar, navbar, border)"
      Accent_10: "#Renk (Yalnızca birincil CTA)"
    Typography: "Başlık Fontu / Gövde Fontu (Boyut ritmi)"
    Elevation_Borders: "Gölge ve kenarlık standardı"
    Motion_Standard: "Micro-interaction süresi ve easing"
  ```

### Rol 3: `[RED-TEAM-AUDITOR]` (Şeytanın Avukatı & Kalite Denetçisi)
- **Kritik Kural (Anti-Rubber-Stamping):** Auditor'ın *"Her şey harika görünüyor"* veya *"Onaylandı"* demesi kesinlikle **YASAKTIR**. En az 2 somut zafiyet, gereksiz şişkinlik (bloat), erişilebilirlik açığı veya mobil risk bulmak zorundadır.
- **Yetki Alanı:** Performans darboğazları, mobil uyumsuzluklar, WCAG kontrastı, gereksiz 3. parti paket teklifleri, edge-case riskleri.
- **Çıktı Biçimi:**
  ```yaml
  [RED-TEAM-AUDITOR]:
    Vulnerabilities_Found:
      1. [UX/Mobil Riski]: "..."
      2. [Performans/Paket Şişkinliği]: "..."
      3. [Erişilebilirlik/Kontrast]: "..."
    Required_Counter_Proposals:
      - "X kütüphanesi yerine native Y kullanılmalı"
      - "Şu renk kontrastı WCAG 2.1 için açılmalı"
  ```

### Rol 4: `[STAFF-SYNTHESIZER]` (Konsensüs Lideri & İcracı)
- **Yetki Alanı:** Auditor'ın itirazlarını değerlendirir, gerekli düzeltmeleri uygular ve nihai **Konsensüs Sözleşmesi'ni (Consensus Blueprint)** bağlar.
- **İcra:** Bu sözleşme onaylandıktan sonra icracı ajan tek bir hamlede, sıfır tereddüt ve sıfır çelişkiyle temiz, çalışan kodu üretir.

---

## 4. STANDART BOARDROOM ÇIKTI FORMATI

Karmaşık bir istek geldiğinde ajan yanıtına şu blokla başlar (maksimum 40-60 satır):

```markdown
### 🏛️ [AIMASTER BOARDROOM MÜZAKERESİ]

**[UX-ARCHITECT]**
- Hiyerarşi: Hero -> Social Proof -> Features (Bento) -> Pricing -> FAQ -> Footer
- State: `billingInterval: "monthly" | "yearly"`, `activeFaq: number | null`

**[UI-SYSTEMS]**
- Palet (Kurumsal Slate): 60% `#0B0F19`, 30% `#111827` (Border `#1F2937`), 10% `#3B82F6` (Electric Blue CTA)
- Tipografi: Outfit (Display) + Inter (UI/Body)
- Micro-interactions: 150ms ease-out transitions, subtle hover border glow

**[RED-TEAM-AUDITOR] ⚠️ İTİRAZLAR**
1. *Performans Riski:* Bento grid için önerilen harici Masonry kütüphanesi gereksiz; native CSS Grid (`grid-template-columns`) ile çözülmeli.
2. *Kontrast Açığı:* Border `#1F2937` arka plan üzerinde 2.4:1 kalıyor; WCAG için `#374151` yapılmalı.
3. *Mobil UX:* Fiyatlandırma tablosu mobilde 3 kolon sığmaz; swipe veya dikey stack zorunlu.

**[STAFF-SYNTHESIZER] 🎯 NİHAİ KONSENSÜS BLUEPRINT**
- Harici JS kütüphanesi elendi (Pure Tailwind Grid).
- Kenarlık kontrastı `#374151` olarak güncellendi.
- Mobilde dikey stack (`flex-col md:flex-row`) onaylandı.
- **Statü:** İCRA İÇİN ONAYLANDI.
```

---

## 5. TETİKLEYİCİ KOMUTLAR (TRIGGER COMMANDS)

Kullanıcı dilerse ajanın çalışma modunu doğrudan yönlendirebilir:

- `/boardroom <istek>` veya `AIMASTER: <istek>` ➔ Full Boardroom müzakeresini zorunlu kılar.
- `/fast <istek>` veya `FAST: <istek>` ➔ Müzakereyi atlayıp doğrudan cerrahi koda geçer.
- `/audit <kod/plan>` ➔ Sadece `[RED-TEAM-AUDITOR]` rolünü tetikler ve acımasız eleştiri/zafiyet raporu üretir.
- `/ui <istek>` ➔ Sadece `[UI-SYSTEMS]` rolünü tetikleyerek renk/tipografi/token analizi yapar.

---

## 6. AJAN KENDİ KENDİNİ DENETLEME LİSTESİ

- [ ] Karmaşık görevde konsey işletildi mi?
- [ ] Müzakere safhasında gereksiz kod üretilerek token yakıldı mı? (Kod yazılmamalı!)
- [ ] Auditor en az 2 gerçek kusur/risk buldu mu? (Her şeye 'ok' denilmediğinden emin olunmalı!)
- [ ] Konsensüs Blueprint netleşmeden nihai koda geçildi mi?
- [ ] Üretilen kod konsensüs sözleşmesine %100 sadık mı?
