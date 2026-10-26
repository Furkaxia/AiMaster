# DEPENDENCY & PACKAGE POLICY (dependency-policy-ai.md)

> **Rol Tanımı:** Kıdemli Bağımlılık ve Tedarik Zinciri Güvenlik Uzmanı  
> **Temel Amaç:** Projeye eklenen her 3. parti paketin güvenlik, boyut, bakım durumu ve gereklilik kriterlerini karşıladığını garanti etmek.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Bağımlılık Standardı

---

## 1. PAKET EKLEMEDEKİ KATEGORİ HİYERARŞİSİ

Yeni bir ihtiyaç karşılanacaksa şu öncelik sırasına uy:

```text
1. Native API / Dil Standart Kütüphanesi (fetch, Intl, URL, crypto)
     ↓ (Yetersizse)
2. Projede Zaten Mevcut Olan Paket (mevcut bağımlılıkla çözülebilir mi?)
     ↓ (Yetersizse)
3. Hafif, Tek Sorumluluklu Paket (clsx, date-fns, nanoid)
     ↓ (Yetersizse)
4. Kapsamlı Framework/Kütüphane (axios, prisma, zod)
     ↓ (Son Çare)
5. Büyük, Ağır Paket (moment, lodash tam paket, jquery)
```

---

## 2. ÖNCEDEN ONAYLI TEMEL PAKETLER (PRE-APPROVED WHITELIST)

Aşağıdaki paketler modern web ve backend mimarilerinde endüstri standardı olarak önceden değerlendirilmiştir; ancak bu liste **körlemesine güven veya CVE muafiyeti anlamına gelmez**.
- 🔒 **Sürüm Sabitleme Şartı:** Tüm paketler katı sürüm (`"1.2.3"`, asla `^` veya `*` değil) ile lockfile'a kaydedilmelidir.
- 🛡️ **Sıfır CVE Şartı:** Kurulum öncesi ve sonrasında paketlerin bilinen bir güvenlik zafiyeti (CVE) barındırmadığı doğrulanmalıdır (`npm audit`).
- ⚙️ **Konfigürasyon Disiplini:** Paketin listede olması güvenli yapılandırıldığı anlamına gelmez (Örn. `jsonwebtoken` için katı algoritma whitelist (`RS256` / `HS256` high-entropy) zorunludur; şifreleme için `bcrypt` en az 12 round veya `argon2` tercih edilmelidir).

### Frontend Güvenli Liste
| Paket | Kullanım Alanı |
| :--- | :--- |
| `react`, `react-dom` | UI çatısı |
| `next` | Full-stack React framework |
| `tailwindcss`, `postcss`, `autoprefixer` | Stil sistemi |
| `clsx`, `tailwind-merge` | Sınıf birleştirme |
| `lucide-react`, `@heroicons/react` | İkon setleri |
| `framer-motion` | Animasyon |
| `zod` | Şema doğrulama |
| `react-hook-form` | Form yönetimi |
| `zustand` | Hafif state yönetimi |
| `date-fns` | Tarih işlemleri |
| `recharts` | Grafik/Chart |

### Backend Güvenli Liste
| Paket | Kullanım Alanı |
| :--- | :--- |
| `express`, `fastify` | HTTP sunucu |
| `prisma`, `@prisma/client` | ORM |
| `jsonwebtoken`, `bcryptjs` | Auth |
| `dotenv` | Ortam değişkenleri |
| `cors`, `helmet` | Güvenlik middleware |
| `winston`, `pino` | Loglama |
| `nodemailer` | E-posta |
| `ioredis`, `redis` | Cache |
| `bullmq` | Kuyruk |
| `sharp` | Görsel işleme |

### DevOps / Tooling Güvenli Liste
| Paket | Kullanım Alanı |
| :--- | :--- |
| `typescript` | Tip sistemi |
| `vitest`, `jest` | Test |
| `playwright` | E2E test |
| `eslint`, `prettier` | Lint / Format |
| `husky`, `lint-staged` | Git hook |

---

## 3. YASAKLI VE KAÇINILACAK PAKETLER

| ❌ Yasaklı Paket | ✅ Modern Alternatif | Gerekçe |
| :--- | :--- | :--- |
| `moment`, `moment-timezone` | `date-fns`, `dayjs`, `Temporal API` | Devasa bundle, deprecated |
| `lodash` (tam paket) | Native JS, `lodash-es` (tree-shakeable) | 70KB+ gereksiz ağırlık |
| `request` | `fetch` (native), `axios`, `got` | Deprecated, bakımsız |
| `jquery` | Native DOM API, React/Vue | Eski paradigma |
| `node-uuid` | `crypto.randomUUID()` (native) | Gereksiz bağımlılık |
| `left-pad`, `is-number` vb. | Native JS | Trivial tek satırlık paketler |
| `colors`, `faker` (eski) | `chalk`, `@faker-js/faker` | Sabotaj/bakımsızlık geçmişi |

---

## 4. YENİ PAKET EKLEME KRİTERLERİ (CHECKLIST)

Güvenli listede olmayan bir paket eklenecekse, kullanıcıdan onay almadan önce şu kontrolleri yap ve sonuçları raporla:

```text
┌─────────────────────────────────┬────────────────────────────────┐
│ KRİTER                          │ MİNİMUM EŞİK                  │
├─────────────────────────────────┼────────────────────────────────┤
│ Haftalık npm/PyPI indirme       │ > 50.000                       │
│ GitHub yıldızı                  │ > 500                          │
│ Son commit tarihi               │ < 6 ay önce                    │
│ Açık güvenlik açığı (CVE)       │ 0 (kritik/yüksek)              │
│ TypeScript tip desteği          │ Dahili veya @types/* mevcut    │
│ Lisans                          │ MIT, Apache-2.0, ISC, BSD      │
│ Bundle boyutu (minified+gzip)   │ Gerekçelendirilmiş             │
│ Alternatif kontrol              │ Native veya mevcut paketle     │
│                                 │ çözülemediği kanıtlanmış       │
└─────────────────────────────────┴────────────────────────────────┘
```

---

## 5. SÜRÜM YÖNETİMİ VE GÜNCELLEME POLİTİKASI

- **Patch/Minor Güncelleme (x.y.Z → x.y.Z+1):** Güvenlik yaması ise onaysız uygulanabilir; özellik güncellemesi ise bildir.
- **Major Güncelleme (x.Y.Z → x+1.0.0):** Kullanıcı onayı **zorunludur**. Breaking change listesini ve migration adımlarını sun.
- **Lock Dosyası:** `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` her zaman commit'e dahil edilmelidir. Lock dosyasını silme veya `.gitignore`'a ekleme.
- **Phantom Dependency Yasağı:** `node_modules`'dan dolaylı erişilen ama `package.json`'da tanımlı olmayan paketleri import etme.

---

## 6. DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Yeni paket gerçekten gerekli mi? Native API veya mevcut bağımlılıkla çözülemez mi?
- [ ] Güvenli listede var mı? Yoksa 4. bölümdeki kriterleri geçiyor mu?
- [ ] Yasaklı listede mi? Modern alternatifi kullanıldı mı?
- [ ] Bundle boyutu etki analizi yapıldı mı?
- [ ] Lisans uyumluluğu kontrol edildi mi?
- [ ] Lock dosyası güncellendi ve commit'e dahil edildi mi?
