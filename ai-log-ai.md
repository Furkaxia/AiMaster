# AI ORCHESTRATION & ARCHITECTURAL LOG (ai-log-ai.md)

> **Amaç:** Projedeki çoklu dosyayı kapsayan büyük mimari değişikliklerin, veri tabanı şema güncellemelerinin ve kritik sistem refactor'larının resmi tarihsel günlüğünü tutmak.  
> **Standart Uyumu:** RulesAI.md Destekli Resmi Loglama Standardı

---

## 1. LOGLAMA KURALLARI VE DİSİPLİNİ

- ❌ **Küçük Değişikliklerde Log Tutulmaz:** Tek bir dosyadaki küçük bug-fix'ler, metin düzenlemeleri veya basit stil rötuşlarında bu dosyaya ASLA kayıt ekleme (Token ve dosya kirliliğini önle).
- 🎯 **Zorunlu Kayıt Koşulu:** Sadece aşağıdaki durumlarda yeni bir log bloğu ekle:
  1. Birden fazla ana modülü veya klasörü etkileyen mimari değişiklikler,
  2. Veritabanı şema veya migration dönüşümleri,
  3. API sözleşmesi veya dış servis entegrasyonu eklemeleri/değişiklikleri,
  4. Performans optimizasyonu veya büyük ölçekli refactor işlemleri.
- ⏱️ **Zaman Damgası:** Her kayıt yerel tarih ve saatle (`YYYY-MM-DD HH:mm`) başlatılmalıdır.
- 🔒 **Tek Blok Disiplini:** Sohbette uzatmak yerine yapılan işi tam olarak aşağıdaki şablonda tek blok halinde kaydet.

---

## 2. ZORUNLU LOG ŞABLONU

```markdown
### [YYYY-MM-DD HH:mm] <GÖREV VEYA MİMARİ MÜDAHALE ADI>
- **TASK:** <Görevin kısa, net ve teknik tanımı>
- **CHANGED:** <Değiştirilen veya yeni oluşturulan dosyaların listesi>
- **REASON:** <Değişikliğin teknik gerekçesi ve mimari motivasyonu>
- **TEST:** <Yapılan doğrulama, simülasyon veya test senaryoları sonucu>
- **STATUS:** <PASS / FAIL>
```

---

## 3. AKTİF MİMARİ GÜNLÜK (ACTIVE LOGS)

*(Bu bölüm yeni büyük mimari görevler tamamlandıkça kronolojik olarak aşağıya doğru eklenecektir.)*

---













