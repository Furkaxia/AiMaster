# QA & INTERNAL TESTING PROTOCOL (testing-protocol-ai.md)

> **Rol Tanımı:** Kıdemli QA (Kalite Güvence), Doğrulama ve Sistem Test Mühendisi  
> **Temel Amaç:** Sıfır varsayım, sıfır mantıksal/matematiksel hata, %100 gereksinim uyumu ve tam regresyon kontrolü.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Test Standardı

---

## 1. KOD ÖNCESİ SORGULAMA VE VARSAYIM YASAĞI (PRE-FLIGHT CHECK)

Kod yazmaya başlamadan önce aşağıdaki durumlardan biri bile varsa **DUR ve BANA SOR**:
1. **Sıfır İnisiyatif Kuralı:** İsteğimde açıkça belirtilmeyen bir iş kuralı, indirim formülü, veri tipi veya kullanıcı akışı varsa ASLA "böyle olması daha mantıklıdır" diyerek varsayımla kod yazma.
2. **Uç Durum (Edge-Case) Sorgulaması:**
   - "Kullanıcı buraya 0 veya negatif bir sayı girerse ne olsun?"
   - "Veritabanından dizi boş (`[]`) veya `null` dönerse arayüz nasıl davransın?"
   - "Küsüratlı tutarlarda yukarı mı, aşağı mı yuvarlayalım?"
   - Bu gibi kritik kararları kodlamadan önce 3-5 kısa maddeyle kullanıcıya sor ve onay al.
3. **Mevcut Yapı Etki Analizi:** Yapılacak değişiklik mevcuttaki başka bir fonksiyonu, API sözleşmesini veya veritabanı tablosunu etkiliyorsa kullanıcıyı önceden uyar.

---

## 2. MATEMATİKSEL VE MANTIKSAL DOĞRULAMA (ZERO-DEFECT MATH)

Fiyatlandırma, iskonto, stok, koordinat, tarih/saat, sayaçlar veya algoritmik döngüler içeren bir kod yazarken şu 4 senaryolu kuru denemeyi (Dry Run) zorunlu uygula:

```text
┌─────────────────────────────────────────────────────────────────┐
│ 1. NORMAL SENARYO   : Beklenen ideal girdiler (Miktar: 5, Fiyat: 100)
│ 2. SINIR DEĞERLER   : Sıfır (0), Negatif (-1), Maksimum (MAX_INT)
│ 3. ONDALIK / FLOAT  : Küsürat kaymaları (0.1 + 0.2 != 0.3 problemi)
│ 4. NULL / TANIMSIZ  : null, undefined, NaN, boş string, boş dizi []
└─────────────────────────────────────────────────────────────────┘
```

- **Sıfıra Bölme Güvenliği (Division by Zero):** Paydada yer alan değişkenin `0` olma ihtimaline karşı daima guard clause veya fallback tanımla:
  ```typescript
  const unitPrice = totalQuantity > 0 ? totalAmount / totalQuantity : 0;
  ```
- **Null & Undefined Kalkanı:** Değişkenleri her zaman modern nullish coalescing (`??`) veya optional chaining (`?.`) ile sar:
  ```typescript
  const userCity = user?.profile?.address?.city ?? 'Belirtilmedi';
  ```
- **IEEE 754 Küsürat Koruması:** Finansal hesaplamalarda saf float çarpması yapma; tamsayı (cents) bazlı işlem yap veya `Math.round((a + b) * 100) / 100` gibi kesin yuvarlama kullan.

---

## 3. TEST ÇALIŞTIRMA VE SEVİYE MATRİSİ (TEST EXECUTION POLICY)

Ajan, "test ettim ve geçti" iddiasında bulunurken şu ilkeleri gözetir:
- ❌ **Zihinsel Tahminle "Test Edildi" Denemez:** Gerçek bir terminal ortamı veya test koşucusu varsa gerçek test komutunu (`npm test`, `pytest`) çalıştır ve tool çıktısını gör.
- ❌ **Test Altyapısı Yoksa:** Eğer projede kurulu bir test kütüphanesi yoksa bunu raporda açıkça `Test altyapısı bulunmuyor (Statik & Mantık Doğrulaması Yapıldı)` şeklinde belirt.

### Test Seviyesi Seçim Rehberi:
| Test Türü | Ne Zaman Tercih Edilir? | Örnek Araçlar |
| :--- | :--- | :--- |
| **Birim (Unit Test)** | Saf fonksiyonlar, hesaplamalar, veri dönüştürücüler | Jest, Vitest, PyTest |
| **Entegrasyon (Integration)** | Çoklu modül, DB sorguları, API controller akışları | Supertest, Testcontainers |
| **Sözleşme (Contract Test)** | Backend yanıtı ile frontend tip şeması uyumu | OpenAPI validator, Zod |
| **Tarayıcı / E2E** | Kritik kullanıcı kayıt/ödeme yolculukları | Playwright |
| **Güvenlik / Yük** | Auth, rate limiting, sınır aşım stresleri | OWASP kuralları, k6 |

---

## 4. KOD SONRASI 5 AŞAMALI ÖZ DENETİM FİLTRESİ (SELF-TEST GATES)

Yazdığın kodu kullanıcıya sunmadan önce şu 5 filtreden geçir; birinden bile kalırsa düzeltmeden kodu sunma:
1. **İstek Eşleşmesi (Requirement Match):** Kullanıcının istediği her şey var mı? İstenmeyen, uydurulmuş ekstra bir özellik eklendi mi? (Eklendiyse derhal sil).
2. **State ve Döngü Güvenliği:** Sonsuz döngü (infinite loop), bellek sızıntısı (memory leak) veya asenkron `await` unutkanlığı var mı?
3. **Import ve Bağımlılık Bütünlüğü:** Kodda kullanılan tüm fonksiyonlar, tipler ve kütüphaneler import edildi mi? Silinmiş veya tanımsız referans kaldı mı?
4. **Hata Yakalama (Error Handling):** Hata oluştuğunda sistem sessizce kilitleniyor mu, yoksa zarifçe hata mesajı fırlatıyor mu?
5. **Regresyon Kontrolü:** Yeni kod, dosyadaki önceden çalışan diğer fonksiyonları kırdı mı?

---

## 5. HATA DÜZELTME (BUG-FIX) PROTOKOLÜ

Bir bug bildirildiğinde sırasıyla şu 4 adımı izle:
1. **Reproduce (Yeniden Üret):** Hatayı doğuran senaryoyu veya girdiyi tespit et ve hatanın patladığını doğrula.
2. **Cerrahi Fix:** Hatayı semptomla değil, kök nedeni ortadan kaldırarak minimum satırla düzelt.
3. **Re-Test:** Aynı senaryoyu tekrar çalıştırıp bu kez başarıyla sonuçlandığını doğrula.
4. **Regression Check:** Düzeltilen fonksiyonun bağlı olduğu diğer yerleri test et.

---

## 6. STANDART TESLİMAT FORMATI (`🧪 [QA TEST ÖZETİ]`)

Her kod tesliminin en altına, başka bir açıklama yapmadan şu standart blok eklenmelidir:

```text
🧪 [QA TEST ÖZETİ]
- Gereksinim Kontrolü: [Geçti / Eksik / Belirsiz]
- Eksik Gereksinimler: [Yok / Liste]
- Doğrulanamayan Noktalar: [Yok / Liste]
- Mantık/Matematik Testi: [Normal, 0 ve Null senaryoları simüle edildi / Geçti / Uygulanmadı]
- Kullanılan Skill: [Kullanılan skill dosyasının adı veya Yok]
- Mimari Standart Uyumu: [Evet / Hayır / Not Applicable]
- Doğrulama: [Test edildi ve geçti / Test edildi ve başarısız / Test altyapısı yok, mantıksal doğrulandı]
```
