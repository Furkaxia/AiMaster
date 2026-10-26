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
│ SEVİYE 4  │ Test suite tamamen kırıldı,      │ 🔙 TÜM değişiklikleri GERİ AL,   │
│ GERİ AL   │ build alınamıyor, 3+ dosyada    │ önceki çalışan duruma dön,       │
│           │ kaskat arıza                     │ kök neden analizi sun.           │
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

1. **Oturum Öncesi Durum Tespiti (Pre-Flight Snapshot):**
   - Ajan bir dosyaya dokunmadan önce o dosyanın mevcut Git index (`staged`) ve çalışma ağacı (`unstaged`) durumunu inceler.
   - Dosyada kullanıcının önceden sahnelediği (staged) değişiklikler varsa, ajan kendi müdahalesini dosya bazında değil, **hunk / patch bazında izole eder**.
2. **Cerrahi Restorasyon & Patch Geri Alma (Hunk-Level Reversion):**
   - Dosyada sadece ajanın değişiklikleri varsa: `git restore <dosya>` (ve gerekirse `git restore --staged <dosya>`).
   - Dosyada kullanıcının önceden sahnelediği kodlar mevcutsa: `git restore --staged` dosya bazında çalıştırılarak kullanıcının stage durumu bozulmaz; ajanın ürettiği diff ters patch (`reverse patch`) veya in-memory diff geri alma ile cerrahi olarak çıkarılır.
   - Ajan tarafından yeni oluşturulmuş hatalı dosyalar varsa: Yalnızca ajanın oluşturduğu o spesifik dosyalar silinir.
   - ⛔ **Körlemesine `git reset --hard` veya `git clean -fd` çalıştırmak KESİNLİKLE YASAKTIR.**
3. **Kullanıcı Değişikliği Çakışma Güvenliği (User Conflict Safety):**
   - Eğer ajanın müdahale ettiği dosyada kullanıcının önceden yaptığı kaydedilmemiş düzenlemeler varsa, dosya körlemesine ezilmez; kullanıcıya diff gösterilip eskalasyon yapılır.
4. **Kurtarma Doğrulaması:**
   - Geri alma işlemi sonrasında derleme (`build`) veya sözdizimi kontrolü çalıştırılarak projenin önceki kararlı çalışma durumuna döndüğü doğrulanır.
5. **Kök Neden & Eskalasyon Raporu:**
   - Geri alınan spesifik dosyalar, başarısız olan 3 denemenin teknik kök nedeni ve kullanıcıya önerilen mimari alternatif tek blokta raporlanır.

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
