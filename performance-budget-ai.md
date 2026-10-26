# PERFORMANCE BUDGET & METRICS (performance-budget-ai.md)

> **Rol Tanımı:** Kıdemli Performans Mühendisi ve Metrik Analisti  
> **Temel Amaç:** Projelerde ölçülebilir performans hedefleri tanımlayarak subjektif "hızlı/yavaş" değerlendirmelerini somut eşik değerlerine dönüştürmek.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Performans Standardı

## 0. EŞİK VE BÜTÇE POLİTİKASI (HIERARCHY OF THRESHOLDS)

Performans bütçeleri kör bir geçiş/kalış engeli değil, mühendislik kalitesini koruyan hedef kılavuzlarıdır. Sistemde eşikler 4 katmanda ele alınır:

1. **Katı Zorunluluklar (Hard Requirements):** Güvenlik sınırları, veri bütünlüğü, auth kontrolleri, secret koruması ve açıkça belirtilmiş ürün sözleşmeleri. Bu maddeler asla esnetilemez.
2. **Varsayılan Mühendislik Hedefleri (Default Targets):** Standart web ve mobil uygulamalar için geçerli endüstri standardı referanslar (örn. Core Web Vitals, API p95 süreleri, 200KB bundle). Ajan varsayılan olarak bu değerleri hedefler.
3. **Projeye Özel SLO'lar (Project-Specific SLO):** Projenin doğasına (örn. ML/AI dashboard, veri yoğun analiz, 3D/Canvas oyun, Chromium gömülü Electron) göre tanımlanmış özel servis seviyesi hedefleri.
4. **Belgelenmiş İstisna Protokolü (Documented Exceptions):** Bir bileşen (örn. Monaco Editor, PDF renderer, TensorFlow.js) varsayılan bütçeyi aşmak zorundaysa, ajan bunu körlemesine reddetmez veya mimariyi bozmaz; teknik gerekçeyi ve etkiyi `🧪 [QA TEST ÖZETİ]` içinde açıkça belgeler.

---

## 1. WEB PERFORMANS BÜTÇESİ (CORE WEB VITALS)

Google Core Web Vitals ve sayfa yükleme metrikleri:

| Metrik | Açıklama | 🟢 İyi | 🟡 Kabul | 🔴 Kötü |
| :--- | :--- | :--- | :--- | :--- |
| **FCP** (First Contentful Paint) | İlk içeriğin görünmesi | < 1.8s | < 3.0s | > 3.0s |
| **LCP** (Largest Contentful Paint) | En büyük içeriğin render'ı | < 2.5s | < 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | Etkileşim tepki süresi | < 200ms | < 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Görsel kararlılık | < 0.1 | < 0.25 | > 0.25 |
| **TTFB** (Time to First Byte) | Sunucu yanıt süresi | < 800ms | < 1.8s | > 1.8s |
| **TBT** (Total Blocking Time) | Ana thread blokaj süresi | < 200ms | < 600ms | > 600ms |

### Lighthouse Minimum Skoru
| Kategori | Minimum Skor |
| :--- | :--- |
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## 2. BUNDLE BOYUT BÜTÇESİ

| Kaynak Tipi | Maksimum (gzip) | Uyarı Eşiği |
| :--- | :--- | :--- |
| **JavaScript (toplam)** | 200 KB | > 150 KB |
| **CSS (toplam)** | 50 KB | > 35 KB |
| **İlk sayfa JS (initial)** | 100 KB | > 75 KB |
| **Tek component chunk** | 30 KB | > 20 KB |
| **Görsel (tek resim)** | 200 KB | > 100 KB |
| **Font (toplam)** | 100 KB | > 60 KB |

### Bundle Optimizasyon Kuralları
- **Tree-shaking:** Kullanılmayan export'lar dahil edilmemeli.
- **Code Splitting:** Route bazlı lazy loading zorunlu (`React.lazy`, dynamic `import()`).
- **Görsel Optimizasyon:** WebP/AVIF formatı, responsive `srcset`, lazy loading (`loading="lazy"`).
- **Font Subsetting:** Yalnızca kullanılan karakter setleri (Latin, Türkçe) yüklenmeli.

---

## 3. API PERFORMANS BÜTÇESİ

| Endpoint Tipi | Maksimum Yanıt (p95) | Zaman Aşımı (Timeout) |
| :--- | :--- | :--- |
| Basit GET (tek kayıt) | 100ms | 5s |
| Liste GET (sayfalanmış) | 300ms | 10s |
| Arama / Filtreleme | 500ms | 10s |
| POST / PUT (veri yazma) | 300ms | 10s |
| Dosya yükleme (upload) | Streaming | 30s |
| Rapor / Export üretimi | Arka plan iş | 60s |
| Toplu işlem (batch) | Kuyruk (async) | 120s |

### API Performans Kuralları
- **Sayfalama (Pagination):** 50+ kayıt döndüren her endpoint'te zorunlu. Varsayılan `limit: 20`, maksimum `limit: 100`.
- **N+1 Sorgu Yasağı:** İlişkili veriler tek sorguda (JOIN, include, eager loading) çekilmeli.
- **Gereksiz Veri Yasağı:** İstemcinin ihtiyaç duymadığı alanları gönderme (select/projection kullan).
- **Önbellekleme:** Değişmeyen veya yavaş değişen verilerde HTTP cache header'ları (`Cache-Control`, `ETag`) veya Redis cache kullan.

---

## 4. ELECTRON / MASAÜSTÜ PERFORMANS BÜTÇESİ

| Metrik | Hedef | Kritik Eşik |
| :--- | :--- | :--- |
| Uygulama açılış süresi | < 3s | > 5s |
| RAM kullanımı (idle) | < 150 MB | > 300 MB |
| RAM kullanımı (aktif) | < 500 MB | > 1 GB |
| CPU kullanımı (idle) | < 2% | > 10% |
| Disk I/O | Async, ana thread bloklamayan | Senkron dosya okuma |
| IPC mesaj süresi | < 50ms | > 200ms |

### Desktop Performans Kuralları
- **Ana Thread Koruması:** Ağır işlemler (PDF işleme, veri dönüşümü) Worker Thread veya child process'te çalıştırılmalı.
- **Bellek Sızıntısı Kontrolü:** Event listener'lar component unmount'ta temizlenmeli, `setInterval` durdurulmalı.
- **Paketleme:** ASAR arşivleme, gereksiz devDependency'lerin dışlanması.

---

## 5. VERİTABANI PERFORMANS BÜTÇESİ

| Sorgu Tipi | Maksimum Süre | Aksiyon |
| :--- | :--- | :--- |
| Basit sorgu (indeksli) | < 10ms | - |
| JOIN sorgusu (2-3 tablo) | < 50ms | - |
| Karmaşık raporlama | < 500ms | Materialized view veya cache düşün |
| Full-table scan | Yasak | İndeks ekle |
| Toplu yazma (1000+ kayıt) | Batch insert | Transaction içinde |

---

## 6. PERFORMANS İZLEME VE RAPORLAMA

Her büyük özellik tesliminde veya performans optimizasyonundan sonra:

```text
📊 [PERFORMANS RAPORU]
- Bundle Boyutu: XX KB (JS) + XX KB (CSS) [gzip]
- Lighthouse Skoru: Performance XX / Accessibility XX / SEO XX
- API Yanıt Süreleri: GET XX ms / POST XX ms (p95)
- Bilinen Darboğazlar: [Yok / Liste]
- Önerilen İyileştirmeler: [Yok / Liste]
```

---

## 7. DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Core Web Vitals metrikleri hedef aralıkta mı?
- [ ] Bundle boyutu bütçeyi aşmıyor mu?
- [ ] API yanıt süreleri p95 eşiklerini karşılıyor mu?
- [ ] N+1 sorgu riski var mı?
- [ ] Code splitting ve lazy loading uygulandı mı?
- [ ] Görseller optimize edildi mi (WebP, lazy loading, srcset)?
- [ ] Desktop uygulamada ana thread bloklanmıyor mu?
