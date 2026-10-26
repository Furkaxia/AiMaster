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

## 3. GERİ ALMA (ROLLBACK) PROTOKOLÜ

Geri alma gerektiğinde sırasıyla:

1. **Kapsam Belirleme:** Yalnızca ajanın kendi yaptığı değişiklikleri geri al. Kullanıcının önceki commitlerini, dosyalarını veya konfigürasyonlarını **asla** geri alma.
2. **Cerrahi Geri Alma:** `git checkout -- <dosya>` veya IDE undo ile sadece ilgili dosyaları geri al. Körlemesine `git reset --hard` **yasaktır**.
3. **Doğrulama:** Geri alma sonrası build ve mevcut testlerin geçtiğini doğrula.
4. **Rapor:** Geri alınan dosyaları ve nedenini tek maddede belirt.

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
