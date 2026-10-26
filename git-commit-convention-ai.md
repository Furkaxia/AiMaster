# GIT COMMIT & BRANCH CONVENTION (git-commit-convention-ai.md)

> **Rol Tanımı:** Kıdemli Sürüm Kontrol ve Kaynak Yönetimi Uzmanı  
> **Temel Amaç:** Tutarlı, okunabilir ve otomatik changelog üretimine uygun commit mesajları ile temiz dal yönetimi sağlamak.  
> **Standart Uyumu:** RulesAI.md Destekli Çekirdek Git Standardı

---

## 1. COMMIT MESAJ FORMATI (CONVENTIONAL COMMITS)

Her commit mesajı aşağıdaki formata **kesinlikle** uymalıdır:

```text
<tip>(<kapsam>): <kısa açıklama>

[isteğe bağlı gövde]

[isteğe bağlı alt bilgi]
```

### Commit Tipleri (Type)

| Tip | Kullanım Alanı | Örnek |
| :--- | :--- | :--- |
| `feat` | Yeni özellik | `feat(auth): add JWT refresh token rotation` |
| `fix` | Hata düzeltme | `fix(catalog): correct price rounding for decimals` |
| `refactor` | Davranış değiştirmeyen kod düzenleme | `refactor(api): extract validation to middleware` |
| `style` | Kod formatlama, whitespace (davranış değişikliği yok) | `style(components): fix indentation and trailing commas` |
| `docs` | Dokümantasyon değişikliği | `docs(readme): update installation instructions` |
| `test` | Test ekleme veya düzeltme | `test(cart): add edge case for zero quantity` |
| `chore` | Build, CI, bağımlılık, config değişikliği | `chore(deps): upgrade prisma to v6.2` |
| `perf` | Performans iyileştirmesi | `perf(query): add index on orders.created_at` |
| `ci` | CI/CD pipeline değişikliği | `ci(github): add playwright e2e to workflow` |
| `revert` | Önceki commit'i geri alma | `revert: feat(auth): add social login` |

### Kapsam (Scope) Kuralları
- Kapsam, değişikliğin etkilediği modülü veya alanı belirtir: `auth`, `catalog`, `ui`, `api`, `db`, `config`
- Tüm projeyi etkileyen değişikliklerde kapsam atlanabilir: `chore: update eslint config`
- Kapsam her zaman **küçük harfle**, tire kullanılmadan yazılır.

### Kısa Açıklama Kuralları
- Küçük harfle başlar, nokta ile bitmez.
- Emir kipi (imperative) kullanılır: `add`, `fix`, `remove`, `update` (~~added~~, ~~fixed~~, ~~removed~~ değil).
- Maksimum **72 karakter**.
- Dil: **İngilizce**.

---

## 2. BREAKING CHANGE BİLDİRİMİ

API sözleşmesini, veritabanı şemasını veya kullanıcı arayüzünü kıran değişikliklerde:

```text
feat(api)!: change authentication from session to JWT

BREAKING CHANGE: All API endpoints now require Bearer token 
in Authorization header. Session-based auth is removed.
```

- `!` işareti tip ve kapsam arasına eklenir.
- `BREAKING CHANGE:` alt bilgisi ile detaylı açıklama verilir.

---

## 3. DAL (BRANCH) ADLANDIRMA STANDARDI

```text
<tip>/<kısa-açıklama>
```

| Dal Tipi | Format | Örnek |
| :--- | :--- | :--- |
| Yeni özellik | `feature/<açıklama>` | `feature/user-dashboard` |
| Hata düzeltme | `fix/<açıklama>` | `fix/cart-total-calculation` |
| Acil düzeltme | `hotfix/<açıklama>` | `hotfix/payment-timeout` |
| Bakım/Config | `chore/<açıklama>` | `chore/upgrade-node-22` |
| Deneysel | `experiment/<açıklama>` | `experiment/new-cache-strategy` |

### Dal Kuralları
- Dal adları küçük harf, tire (`-`) ile ayrılır.
- Ana dallar: `main` (production), `develop` (geliştirme).
- Feature dalları `develop`'dan ayrılır, `develop`'a merge edilir.
- Hotfix dalları `main`'den ayrılır, hem `main` hem `develop`'a merge edilir.

---

## 4. ATOMİK COMMIT PRENSİBİ

- **Tek Commit = Tek Mantıksal Değişiklik:** Bir commit'te hem yeni özellik hem bug fix hem refactor **yapılamaz**.
- **Her commit kendi başına build alabilir:** Kırık (broken) commit yasaktır.
- **WIP commit yasağı:** `WIP: çalışıyor`, `temp commit`, `asdfg` gibi mesajlar **yasaktır**.

### Commit Boyutu Rehberi
```text
İDEAL   : 1-5 dosya, tek bir değişiklik teması
KABUL   : 5-10 dosya, birbiriyle doğrudan ilişkili
BÖLÜNME : 10+ dosya → Birden fazla mantıksal commit'e ayır
```

---

## 5. COMMIT YASAKLARI

- ❌ Commit mesajına dosya listesi yazma (diff zaten gösterir).
- ❌ `git add .` ile kontrol edilmeden tüm değişiklikleri ekleme.
- ❌ `.env`, secret dosyaları, `node_modules`, `dist/`, `.next/` commit'e dahil etme.
- ❌ `force push` (kullanıcı açıkça istemediği sürece).
- ❌ Aynı dosyanın farklı mantıksal değişikliklerini tek commit'e sıkıştırma.

---

## 6. DOĞRULAMA VE QA KONTROL LİSTESİ

- [ ] Commit mesajı Conventional Commits formatında mı?
- [ ] Kısa açıklama 72 karakteri aşmıyor mu?
- [ ] Breaking change varsa `!` ve `BREAKING CHANGE:` footer'ı eklendi mi?
- [ ] Commit atomik mi? (Tek mantıksal değişiklik)
- [ ] Secret veya build artifact dahil edilmedi mi?
- [ ] Dal adı standarda uygun mu?
