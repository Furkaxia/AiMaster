# AIMASTER KATKI KILAVUZU (CONTRIBUTING)

AIMASTER, yapay zeka ajanlarını kontrolsüz halüsinasyon ve spagetti kod üreten araçlar olmaktan çıkarıp, **Staff Engineer disiplininde çalışan otonom bir orkestraya** dönüştürmeyi amaçlayan açık kaynaklı bir işletim sistemidir.

Topluluktan gelen katkıları büyük bir memnuniyetle karşılıyoruz!

---

## 🛠️ Nasıl Katkıda Bulunabilirsiniz?

1. **Yeni Bir Yetenek (Skill) Eklemek:**
   - Skill dosyaları `skills/<kategori>/skill-<isim>.md` formatında olmalıdır.
   - Her skill dosyası mutlaka şu bölümleri içermelidir:
     - Header: Rol tanımı ve temel amaç
     - Bölüm 1: Domain Uzmanlığı & Katı Kurallar
     - Bölüm 2: Kesin Yasaklar (Veya `_shared-skill-footer.md` referansı)
     - Bölüm 3: 4 Aşamalı İcra Protokolü
     - Bölüm 4: QA Kontrol Listesi
   - Yeni eklenen skill'i `skills/README.md` ve `RulesAI.md` kataloğuna eklemeyi unutmayın.

2. **Bir Çekirdek Standart (Core Standard) Önermek:**
   - Çekirdek standartlar kök dizinde `<isim>-ai.md` formatında bulunur.
   - Sadece tüm mimariyi doğrudan etkileyen evrensel kurallar çekirdek standart olabilir.

3. **Entegrasyon Şablonlarını (Presets) Genişletmek:**
   - Yeni bir IDE, yapay zeka arayüzü veya CLI için `integrations/` altında şablon oluşturabilirsiniz.

---

## 📜 Çekme İsteği (Pull Request) Standartları

- Commit mesajları Conventional Commits formatında olmalıdır (`feat:`, `fix:`, `docs:`, `refactor:`).
- Token israfı yaratacak uzun, laf kalabalığı içeren metinler yerine cerrahi, yüksek sinyal-gürültü oranına sahip kurallar tercih edilir.
- Değişikliklerinizi göndermeden önce mevcut dosyalarla çelişmediğini doğrulayın.
