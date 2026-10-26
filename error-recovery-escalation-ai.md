# ERROR RECOVERY & ESCALATION PROTOCOL (error-recovery-escalation-ai.md)

> **Rol Tanımı:** Kıdemli Kriz Yöneticisi ve Hata Kurtarma Uzmanı  
> **Temel Amaç:** AI ajanının hata karşısında ne zaman kendi düzelteceğini, ne zaman durup soracağını ve ne zaman geri alacağını belirleyen kesin karar matrisi.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Hata Kurtarma Standardı

---

## 1. HATA SEVİYE MATRİSİ (ESCALATION TIERS)

Ajan, karşılaştığı her hatayı aşağıdaki 5 seviyeden birine sınıflandırır ve o seviyenin protokolünü **kesinlikle** uygular:

```text
┌───────────┬──────────────────────────────────┬──────────────────────────────────┐
│ SEVİYE    │ HATA TİPİ                        │ AJAN DAVRANIŞI                   │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ SEVİYE 1  │ Typo, eksik import, lint hatası, │ ✅ Sessizce düzelt, bildirim     │
│ OTO-FIX   │ eksik noktalı virgül, yazım      │ yapma, devam et.                 │
│           │ yanlışı                          │                                  │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ SEVİYE 2  │ Mantık hatası, yanlış hesaplama, │ ⚠️ Düzelt + kullanıcıya ne       │
│ FIX+RAPOR │ eksik edge-case, yanlış koşul    │ bulduğunu ve ne yaptığını        │
│           │ ifadesi                          │ tek satırla bildir.              │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ SEVİYE 3  │ Mimari kırılma riski, tip        │ 🛑 DUR ve SOR. Hatanın kök       │
│ DUR+SOR   │ sistemi çatışması, çoklu dosya   │ nedenini ve 2-3 çözüm           │
│           │ etkisi, API sözleşme değişikliği │ alternatifini sun, onay al.      │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ SEVİYE 4  │ Test suite tamamen kırıldı,      │ 🔙 Yalnızca AJANIN değişiklik-   │
│ GERİ AL   │ build alınamıyor, 3+ dosyada     │ lerini GERİ AL, kullanıcının     │
│           │ kaskat arıza                     │ kodunu koru, kök nedeni sun.     │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ SEVİYE 5  │ Production DB, canlı API, gerçek │ ⛔ KESİNLİKLE DOKUNMA.           │
│ DOKUNMA   │ kullanıcı verisi, ödeme sistemi  │ Sadece plan ve script hazırla,   │
│           │                                  │ kullanıcı bizzat çalıştırsın.    │
└───────────┴──────────────────────────────────┴──────────────────────────────────┘
```

---

## 2. DÖNGÜ KIRICI (LOOP BREAKER) KURALLARI

AI ajanının sonsuz düzeltme döngüsüne girmesini engelleyen kesin kurallar:

### A) 3 Deneme Kuralı (Three Strikes Rule)
- Aynı hatayı veya dosyayı **3 kez** düzeltmeye çalışıp hâlâ başarısız olduysan:
  1. Tüm denenen yaklaşımları listele.
  2. Kök neden analizini raporla.
  3. **DUR** ve kullanıcıya escalate et.
  4. "Dördüncü bir deneme yapayım" diyerek devam **etme**.

### B) Kelebek Etkisi Kuralı (Butterfly Effect Rule)
- Bir yeri düzeltirken **başka bir yer kırıldıysa** (kaskat arıza):
  1. İlk düzeltmeden önceki duruma geri dön.
  2. Etki alanını (blast radius) tablo halinde raporla.
  3. Kullanıcıyla mimari yaklaşımı tartış.
  4. "Hepsini tek seferde düzeltirim" diyerek devam **etme**.

### C) Sessiz Hata Yasağı (Silent Failure Ban)
- Bir build/test komutu çalıştırıldı ve hata ürettiyse:
  - ❌ Hata çıktısını görmezden gelip "başarılı" deme.
  - ❌ Hata veren satırları/testleri silerek sorunu gizleme.
  - ✅ Hata çıktısını olduğu gibi kullanıcıya göster ve seviye matrisine göre hareket et.

---

## 3. SEMANTİK GERİ ALMA (SEMANTIC ROLLBACK) PROTOKOLÜ

Geri alma gerektiğinde (Seviye 4 kaskat arıza veya 3 başarısız deneme sonrası), kullanıcının kendi değişikliklerini ve çalışma dizinini korumak için şu katı adımlar izlenir:

1. **Oturum / Görev Başlangıç Kilidi (Pre-Execution Cryptographic Baseline Snapshot):**
   - Ajan herhangi bir dosyaya yazmadan önce çalışma dizininin ve Git index'inin durumunu kriptografik ve atomik olarak arşivler:
     - `PRE_INDEX_HASH=$(git write-tree)` ile Git index'inin (staged dosyalar) kriptografik ağaç özeti,
     - `PRE_WORKTREE_PATCH=$(git diff | sha256sum)` (ve `git diff` ham çıktısı) ile unstaged çalışma dizini farkının kriptografik özeti,
     - `git status --porcelain` ile genel durum listesi,
     - `git ls-files --others --exclude-standard` ile kullanıcının untracked dosyalar envanteri.
   - **Önceden Var Olan Untracked Dosyaların Korunması (Strict Rule):** `git ls-files --others` yalnızca dosya adlarını listeler, dosya içeriklerini kaydetmez. Önceden var olan untracked dosyaların içeriklerini snapshot almadan değiştirmek veya silmek KESİNLİKLE YASAKTIR. Bu dosyaların değiştirilmesi gerekiyorsa başlangıç içeriği salt hash ile değil (hash tek başına geri yükleme yapamaz), gerçek dosya içeriği kopyasıyla (raw content backup) referans snapshot olarak saklanır; kullanıcının önceki tüm değişiklikleri dokunulmaz kabul edilir.
2. **Cerrahi Restorasyon & Hunk Bazlı Geri Alma (Hunk-Level Reversion):**
   - ⛔ **Ajan tarafından değiştirilen dosya görev öncesinde zaten `dirty` (staged veya modified) ise `git restore <file>`, `git restore --staged <file>` veya `git checkout <file>` çalıştırmak KESİNLİKLE YASAKTIR.** Çünkü bu komutlar dosyanın index ve worktree içeriğini `HEAD` üzerinden sıfırlayarak kullanıcının önceden yaptığı değişiklikleri yok eder.
   - **Kullanıcı ile Ajanın Karışık Olduğu Dosyalar:** Geri alma işlemi asla dosya seviyesinde yapılamaz; yalnızca ajanın ürettiği diff blokları ters patch (`git apply --reverse <agent_patch>` veya cerrahi hunk geri alma) ile geri çekilir. Kullanıcının index (`staged`) ve working-tree durumu el değmeden korunur.
   - **Yalnızca Ajanın Değiştirdiği Temiz Dosyalar:** Görev öncesinde dosyada kullanıcının hiçbir değişikliği yoksa, dosya `git restore <dosya>` (ve henüz stage edilmemişse) ile güvenle geri alınabilir.
   - **Ajanın Yeni Oluşturduğu Dosyalar vs. Önceden Var Olan Untracked Dosyalar:** Yalnızca ajanın oturumda kendisinin sıfırdan oluşturduğu spesifik dosyalar silinebilir. Oturum öncesinde var olan untracked dosyalara dokunulmaz; eğer oturumda değiştirilmişlerse gerçek içerik yedeğinden başlangıç durumuna restore edilir, asla körlemesine silinmez veya ezilmez.
   - ⛔ **Körlemesine `git reset --hard` veya `git clean -fd` çalıştırmak KESİNLİKLE YASAKTIR.**
3. **Kullanıcı Değişikliği Çakışma Güvenliği (User Conflict Safety):**
   - Eğer ajanın dokunmak istediği kod bloğunda kullanıcının kaydedilmemiş bir değişikliği ile çakışma varsa, dosya ezilmez; durulur ve kullanıcıya diff gösterilerek onay istenir.
4. **Matematiksel Doğrulama Kapısı (Post-Rollback State Equivalence Verification):**
   - Geri alma sonrasında alınan güncel `git write-tree` çıktısı oturum başındaki `PRE_INDEX_HASH` ile, `git diff | sha256sum` çıktısı ise `PRE_WORKTREE_PATCH` ile birebir (kriptografik eşitlik düzeyinde) karşılaştırılır.
   - Ayrıca `git ls-files --others --exclude-standard` çıktısı ve değiştirilen untracked dosya içerikleri gerçek içerik yedekleriyle doğrulanır.
   - Eğer `git write-tree` veya diff hash çıktıları başlangıç snapshot'ı ile uyuşmuyorsa rollback **başarısız** sayılır; ajan derhal çalışmayı durdurur, durumu gizlemez ve kullanıcıya tam eskalasyon raporu sunar.
   - Derleme (`build`) veya sözdizimi doğrulaması çalıştırılarak sistemin önceki kararlı baseline durumuna döndüğü teyit edilir.
5. **Kök Neden & Eskalasyon Raporu:**
   - Geri alınan değişiklikler, başarısız denemelerin kök nedeni ve kullanıcıya sunulan alternatif çözümler açıkça raporlanır.

---

## 4. HATA SINIFLANDIRMA KARAR AĞACI

Bir hatayla karşılaştığında şu karar ağacını izle:

```text
Hata mı var?
  ├── Tek dosya, <5 satır, yeni import yok → SEVİYE 1 (Oto-fix)
  ├── Tek dosya, mantıksal düzeltme → SEVİYE 2 (Fix + Rapor)
  ├── Çoklu dosya etkileniyor veya API/tip değişikliği → SEVİYE 3 (Dur + Sor)
  ├── Build/test tamamen kırık veya kaskat arıza → SEVİYE 4 (Geri Al)
  └── Canlı ortam, gerçek veri, ödeme → SEVİYE 5 (Dokunma)
```

---

## 5. DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Hata doğru seviyeye sınıflandırıldı mı?
- [ ] Seviye 1-2 dışında kullanıcı bilgilendirildi mi?
- [ ] 3 deneme kuralı aşıldıysa escalate edildi mi?
- [ ] Kaskat arıza tespit edildiyse geri alındı mı?
- [ ] Geri alma sonrası build/test doğrulaması yapıldı mı?
- [ ] Sessiz hata gizlenmedi mi?
