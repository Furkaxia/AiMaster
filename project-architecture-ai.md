# PROJECT ARCHITECTURE & FILE ORGANIZATION (project-architecture-ai.md)

> **Rol Tanımı:** Kıdemli Yazılım Mimarı ve Sistem Organizatörü  
> **Temel Amaç:** Sıfır karmaşa, katı klasörleme disiplini, modüler mimari ve jilet gibi dosya hiyerarşisi sağlamak.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Mimari Standardı

---

## 1. KÖK DİZİN DİSİPLİNİ (ROOT HYGIENE)

- ❌ **Kök Çöplüğü Kesinlikle Yasaktır:** Proje ana dizininde (root) yalnızca standart yapılandırma dosyaları bulunabilir.
  - **İzin Verilen Root Dosyaları:** `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, `.gitignore`, `README.md`, `rules.md`, `RulesAI.md`, çekirdek standart dosyaları (`*-ai.md`) ve build/bundler konfigürasyonları (`vite.config.ts`, `next.config.js`, `tailwind.config.js`).
- ❌ **Geçici Dosya Yasağı:** Kök dizine rastgele test scriptleri, geçici veri dosyaları (`.json`, `.csv`, `.py`, `.js`), ham stiller veya analiz notları fırlatma.
- 🎯 **Geçici İşlemler Kuralı:** Eğer geçici bir analiz scripti veya veri dönüşüm aracı gerekiyorsa, bunu sistem scratch dizininde çalıştır ve iş bitince temizle.

---

## 2. STANDART `src/` KLASÖR HİYERARŞİSİ VE SORUMLULUK MATRİSİ

Tüm kaynak kodlar proje yapısına göre `src/` (veya ilgili dilin ana modül klasörü) altında kategorize edilir. Her dosya mutlaka görevine uygun alt klasörde açılmalıdır:

```text
src/
├── assets/          # Statik medya: SVG ikonlar, fontlar, ürün görselleri, banner'lar
├── components/      # UI Bileşenleri (Yeniden kullanılabilir ve özellik bazlı)
│   ├── common/      # Buton, Input, Modal, Badge, Dropdown, Skeleton (Domain-bağımsız)
│   └── [feature]/   # Belirli bir modüle/işe özel bileşenler (örn: components/catalog/, components/cart/)
├── config/          # Uygulama sabitleri, tema token'ları, ortam yapılandırmaları
├── hooks/           # Özel durum/yaşam döngüsü hook'ları (useDebounce, useAuth, useMediaQuery)
├── layouts/         # Sayfa şablonları (Header, Sidebar, Footer, AdminLayout, MainLayout)
├── pages/ / views/  # Doğrudan rota (route) karşılıkları (Sadece layout ve component çağırır)
├── services/ / api/ # Dış API istekleri, HTTP client (axios/fetch), veritabanı sorguları
├── styles/          # Global CSS, Tailwind direktifleri, CSS değişkenleri, tema stilleri
├── types/           # TypeScript arayüzleri (interfaces), modeller, DTO'lar, global tipler
└── utils/           # Saf (pure) yardımcı fonksiyonlar (tarih formatlama, matematik hesapları, regex)
```

---

## 3. KLASÖR VE DOSYA SORUMLULUK KURALLARI

| Klasör | Ne İçerebilir? | Ne Kesinlikle İÇEREMEZ? |
| :--- | :--- | :--- |
| `components/common/` | Genel buton, modal, input, kart gibi her projede çalışabilecek saf UI bileşenleri | İş mantığı (business logic), doğrudan API fetch çağrısı, veritabanı sorgusu |
| `components/[feature]/` | Belirli bir sayfaya veya özelliğe ait bileşenler | Başka modüllerin özel iş kuralları, kontrolsüz global state değişiklikleri |
| `pages/` veya `views/` | Layout ve component'leri bir araya getiren rota girişleri | 200+ satırlık ham HTML/CSS, inline karmaşık hesaplamalar |
| `services/` | API istekleri, endpoint mapping, hata yönetimi, serializer'lar | UI render kodları, React/Vue hook'ları |
| `utils/` | Yan etkisiz, saf fonksiyonlar (formatDate, calculateTax, slugify) | State yönetimi, DOM manipülasyonu, dış API istekleri |
| `types/` | `type`, `interface`, `enum` tanımları | Çalışan JavaScript kodu, fonksiyon gövdeleri |

---

## 4. İSİMLENDİRME VE MODÜL STANDARTLARI

- **UI Bileşenleri:** PascalCase (`Button.tsx`, `ProductCard.tsx`, `Navbar.tsx`).
- **Yardımcı Fonksiyonlar & Servisler:** camelCase veya kebab-case (`formatDate.ts`, `apiClient.ts` veya `date-utils.ts`).
- **Tip Dosyaları:** `*.types.ts` veya `*.d.ts` uzantısı (`catalog.types.ts`, `user.types.ts`).
- **Özel Hook'lar:** Daima `use` önekiyle camelCase (`useLocalStorage.ts`, `useWindowSize.ts`).
- **Dairesel Bağımlılık (Circular Dependency) Yasağı:** A modülü B'yi, B modülü A'yı import edemez. Bağımlılıklar daima hiyerarşik aşağı doğru akmalıdır (`pages -> components -> services/utils -> types`).

---

## 5. YENİ DOSYA OLUŞTURMA VE DEĞİŞİKLİK PROTOKOLÜ

Bir ajan yeni bir dosya oluşturmadan veya mevcut dosyayı taşımadan önce:
1. **Mevcut Yapı Taraması:** Projede halihazırda kullanılan klasör yapısını tara; mevcut bir `helpers/` varsa yanına keyfi `utils/` açma, projede kurulu düzene uy.
2. **Kategori Belirleme:** Yeni oluşturulacak dosyanın yukarıdaki tablodaki yerini kesinleştir.
3. **Tek Sorumluluk:** Yeni dosyanın 1'den fazla sorumluluğu varsa (örn: hem UI bileşeni hem API servisi barındırıyorsa) dosyayı ikiye böl.
4. **Export Standartı:** Dosyalarda varsayılan (default) export yerine isimlendirilmiş (named) export tercih et (`export const Button = ...`); bu sayede yeniden adlandırma ve refactoring hatalarını sıfırla.

---

## 6. MİMARİ DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Kök dizine (root) yetkisiz yeni bir dosya bırakıldı mı? (Sadece `*-ai.md`, `RulesAI.md` gibi izinli mimari dosyalar olabilir).
- [ ] Yeni dosya doğru hiyerarşik alt klasör (`components`, `services`, `types` vb.) içine açıldı mı?
- [ ] Dairesel bağımlılık (circular dependency) riski var mı?
- [ ] Bir dosya 300+ satırı aşıp çoklu sorumluluk yüklenmeye başladı mı? (Gerekiyorsa parçalandı mı?)
- [ ] `🧪 [QA TEST ÖZETİ]` içerisinde *Mimari Standart Uyumu* "Evet" olarak doğrulandı mı?
