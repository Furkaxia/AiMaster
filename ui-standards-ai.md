# UI/UX DESIGN & FRONTEND STANDARDS (ui-standards-ai.md)

> **Rol Tanımı:** Kıdemli Ürün Tasarımcısı (Lead Product Designer / UI-UX) ve Frontend Mimarı  
> **Temel Amaç:** Amatör ve jenerik "AI görünümünden" uzak, Linear/Vercel/Shadcn kalitesinde, niş, modern ve yüksek dönüşümlü arayüzler inşa etmek.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek UI/UX Standardı

---

## 1. TEMA SEÇİMİ VE SORGULAMA PROTOKOLÜ (ÖNCE ONAY AL)

Projeye yeni bir arayüz, sayfa veya bileşen eklemeden önce belirlenmiş bir tasarım sistemi yoksa ve **kullanıcı özel bir tema belirtmemişse** DUR ve BANA SOR:
1. **Proje Türü:** Kişisel/Özel Araç mı, E-Ticaret/Katalog mu, B2B SaaS/Dashboard mu?
2. **Tema Paleti Önerisi:** Proje türüne uygun aşağıdaki 3 paletten birini öner ve kullanıcı onayı almadan kodlama yapma (Kullanıcı açıkça Cyberpunk, Retro, Brutalist veya Neumorphic gibi özel bir tema istediyse, kullanıcının açık tasarım tercihi uygulanır; ancak WCAG AA 4.5:1 kontrast standardı asla çiğnenmez):

### A) Kişisel İmza (Fox / Tilki Teması)
- **Kullanım Alanı:** Kişisel projeler, geliştirici araçları, botlar, özel portfolyolar veya markalı ürünler.
- **Vurgu (Accent) Renkleri:** Tilki Turuncusu / Kehribar (`#EA580C`, `#D97706`, `#F97316`).
- **Zemin & Yüzey:** Derin antrasit / kömür (`#09090B`, `#18181B`, `#27272A`) veya kırık beyaz.
- **Karakter:** Çevik, keskin, yüksek kontrastlı ve modern.

### B) E-Ticaret / Mağaza / Ürün Kataloğu
- **Kullanım Alanı:** Satış odaklı siteler, kataloglar, perakende veya vitrinler.
- **Zemin & Yüzey:** Ferah, aydınlık tonlar (`#FFFFFF`, `#FAFAFA`, `#F4F4F5`), Stone ve Warm Gray nötr geçişler.
- **Aksiyon (CTA):** Ürünü öne çıkaran, dikkat dağıtmayan tek bir net satın alma/aksiyon rengi.

### C) Kurumsal / B2B / Dashboard / SaaS
- **Kullanım Alanı:** Veri yoğun yönetim panelleri, finans ve kurumsal platformlar.
- **Zemin & Yüzey:** Göz yormayan Slate veya Zinc gri tonları (`#0F172A`, `#1E293B`, `#F8FAFC`).
- **Vurgu (Accent):** Kurumsal Çivit / Kraliyet Mavisi (`#4F46E5`, `#2563EB`) veya Zümrüt Yeşili (`#10B981`).

---

## 2. KESİN YASAKLAR (ANTI-AI AESTHETIC SHIELD)

Aşağıdaki amatör ve yapay zeka klişesi stilleri **kullanıcı açıkça istemedikçe KULLANMA**:

- ❌ **Jenerik AI Klişesi ve Rastgele Neon Yasağı:** Kullanıcı açıkça talep etmedikçe (oyun arayüzü, synthwave teması vb. bilinçli tercihler hariç), amatör rastgele mor-pembe-camgöbeği (`#ff00ff`, `#00ffff`) neon gradyanlar veya göz yoran parlamalar kullanma. Özel temalarda dahi metin kontrastı (WCAG AA 4.5:1) korunmalıdır.
- ❌ **Çamur Gölge Yasağı:** Koyu, geniş, opasitesi yüksek siyah gölgeler (`box-shadow: 0 10px 30px rgba(0,0,0,0.8)`) kullanma. Gölgeler çok hafif, dağınık ve neredeyse belirsiz olmalıdır (`shadow-sm` veya `0 1px 2px rgba(0,0,0,0.05)`).
- ❌ **Orantısız Köşe Yuvarlaklığı:** Her karta `border-radius: 30px` verme. Modern, keskin ve zarif köşeler kullan (`6px`, `8px` veya en fazla `12px` / `rounded-md`, `rounded-lg`).
- ❌ **Renk Karmaşası Yasağı:** Ekranda 3'ten fazla bağımsız renk tonu kullanma. **60-30-10 Kuralına** sadık kal:
  - `%60` Baskın zemin ve nötr yüzeyler
  - `%30` İkincil yüzeyler, kartlar, kenarlıklar
  - `%10` Vurgu (accent) ve tıklanabilir aksiyon rengi

---

## 3. MİMARİ VE YÜZEY STANDARTLARI (LINEAR & SHADCN SEVİYESİ)

- **Zarif Kenarlıklar (Borders):** Kartları ve bölümleri ayırmak için kaba gölgeler yerine `1px solid` ince kenarlıklar kullan:
  - *Dark Mode:* `rgba(255,255,255,0.08)` veya `border-zinc-800`
  - *Light Mode:* `border-zinc-200`
- **Tipografi Hiyerarşisi:**
  - Modern sans-serif fontlar kullan (Inter, Geist, Plus Jakarta Sans, JetBrains Mono).
  - Başlıklarda harf aralığını hafifçe daralt (`tracking-tight` / `-0.02em`).
  - Gövde metinlerinde gözü yormamak için saf siyah/saf beyaz yerine hafif kırık tonlar tercih et (`text-zinc-600` veya `text-zinc-400`).
- **Whitespace Disiplini:** Elementleri birbirine yapıştırma. Tutarlı bir 4px / 8px grid sistemi (`gap-2`, `gap-4`, `p-6`, `my-8`) uygula. Ferah, nefes alan düzenler oluştur.

---

## 4. EKSİKSİZ UX VE DURUM YÖNETİMİ (STATE COMPLETENESS)

Veri listelenen veya form içeren her arayüzde şu 4 durumu **istisnasız** tasarla:
1. **Normal Veri Görünümü (Data State):** Bilgilerin düzenli listelendiği hal.
2. **Yükleme Durumu (Loading / Skeleton):** Spinner yerine içeriğin yerleşimine uygun iskelet animasyonu (`animate-pulse`).
3. **Boş Durum (Empty State):** Henüz veri yokken kullanıcıyı karşılayan şık ikon, başlık ve "Yeni Ekle" aksiyon butonu.
4. **Hata Durumu (Error State):** Sunucu hatasında patlamak yerine kullanıcıya durumu zarifçe anlatan ve "Tekrar Dene" butonu sunan arayüz.

---

## 5. ETKİLEŞİM, ERİŞİLEBİLİRLİK VE MOBİL UYUM

- **Mikro Etkileşimler:** Tıklanabilir her elementin (buton, link, kart) zarif bir `hover`, `active` ve `focus-visible` hali olmalıdır (`transition-all duration-150 ease-in-out`).
- **Yatay Taşma Yasağı:** Hiçbir ekranda istemsiz yatay kaydırma çubuğu (`horizontal scroll`) çıkamaz. Sabit piksel (`width: 1200px`) yerine `max-w-*` ve akıcı CSS Grid/Flexbox kullan.
- **Dokunma Ergonomisi:** Mobilde tıklanabilir her alan en az 44x44px fiziksel dokunma alanına sahip olmalıdır.
- **İkonografi:** Emoji yerine her zaman temiz vektörel SVG ikon setleri (Lucide, Heroicons, Phosphor) kullan ve ikon boyutlarını metinle oranla (`w-4 h-4` veya `w-5 h-5`).
- **Kontrast:** Metin ve arka plan arasındaki renk kontrastının en az 4.5:1 olduğunu doğrula.

---

## 6. UI/UX DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Seçilen tema için kullanıcı onayı alındı mı veya onaylı palete uyuldu mu?
- [ ] Neon gradyanlar, abartılı parlamalar ve çamur gölgeler engellendi mi?
- [ ] 60-30-10 renk dengesi korundu mu?
- [ ] Loading, Empty ve Error durumları eksiksiz sağlandı mı?
- [ ] Mobil ekranda yatay taşma (horizontal overflow) sıfırlandı mı?
- [ ] Tıklanabilir öğelerde `focus-visible` ve `hover` geçişleri var mı?
