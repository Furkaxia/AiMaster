# SESSION HANDOFF & CONTEXT RECOVERY PROTOCOL (session-handoff-protocol-ai.md)

> **Dosya Konumu:** `session-handoff-protocol-ai.md`  
> **Rol Tanımı:** Oturum Sürekliliği, Bağlam Sıkıştırma (Compaction) ve Yeni Chat Geçiş Mimarı  
> **Temel Amaç:** Uzun süren oturumlarda bağlam penceresi (context-window) dolduğunda yaşanan hafıza kaybını, dikkat erimesini (attention drift) ve fahiş token israfını engellemek; tüm oturumu tek bir `.handoff/session-state.md` dosyasına mühürleyip kritik mimari bağlamı ve karar geçmişini koruyarak yeni sohbete aktarmak.

---

## 1. MİMARİ NEDEN & BAĞLAM ERİMESİ TEHLİKESİ

Yapay zeka modelleri 50-100k+ tokenlık geçmişe ulaştığında:
1. **Lost-in-the-Middle:** Eski kararları ve kuralları unutmaya, halüsinasyon görmeye başlar.
2. **Fahiş Maliyet:** Her küçük "şurayı düzelt" dediğinizde tüm 100k geçmiş tekrar işlenir ve token sayacı çıldırır.
3. **Sapıtma ve Kararsızlık:** Model aynı dosyalarda çelişkili veya döngüsel düzeltmeler yapmaya başlar.

**Çözüm:** Temiz bir hafızayla taze bir chat penceresine geçmek; ancak **projede alınan mimari kararları, tamamlanan aşamaları ve bir sonraki adımı eksiksiz özetleyen bir "Masterprompt" ile.**

---

## 2. EL SIKIŞMA (HANDOFF) TETİKLEME KRİTERLERİ

Aşağıdaki durumlardan biri gerçekleştiğinde Handoff Protokolü devreye girer:

1. **Mesaj Sayısı Eşiği:** Aynı sohbette 15-20+ tur derin kodlama yapıldıysa.
2. **Aşama Tamamlanması:** Büyük bir modül (örneğin Auth, Ödeme veya UI Layout) bitip yenisine başlanacağı an.
3. **Kullanıcı Komutu:** Kullanıcı `/handoff`, `HANDOFF` veya `AIMASTER: HANDOFF` komutu verdiğinde.
4. **Dikkat / Bellek Sızıntısı:** Ajan aynı hatayı 2 kez tekrarlarsa veya bağlam sınırına yaklaşıldığını fark ederse.

---

## 3. `.handoff/session-state.md` STANDART ŞABLONU

Handoff tetiklendiğinde ajan projenin kök dizininde `.handoff/session-state.md` dosyasını oluşturur ve içeriğini şu katı şablona göre doldurur:

```markdown
# 🔄 AIMASTER SESSION STATE & RESUME MASTERPROMPT
> **Oluşturulma Tarihi:** [YYYY-MM-DD HH:mm]
> **Aktif Proje:** [Proje Adı / Dizini]
> **Handoff Nedeni:** [Context Sınırı / Aşama Tamamlama / Kullanıcı Talebi]

---

## 1. TAMAMLANAN İŞLER (COMPLETED MILESTONES)
- [x] [Modül / Özellik 1 tamamlandı ve test edildi]
- [x] [Modül / Özellik 2 tamamlandı]

## 2. ETKİLENEN DOSYALAR VE MİMARİ DEĞİŞİKLİKLER
- `src/components/Header.tsx`: Responsive menü ve A11y eklendi.
- `src/services/api.ts`: Idempotency header eklendi.

## 3. AKTİF KARARLAR VE MİMARİ SÖZLEŞMELER
- Renk Paleti: 60% #090A0F, 30% #151823, 10% #4F46E5.
- State Yönetimi: Zustand store kuruldu, persist middleware bağlandı.

## 4. BİR SONRAKİ İLK ADIM (NEXT IMMEDIATE OBJECTIVE)
- [ ] [Yeni chat başladığında tam olarak ilk yapılacak iş nedir?]

---

## 5. 🚀 YENİ SOHBET MASTERPROMPTU (COPY & PASTE INTO NEW CHAT)
[Aşağıdaki metni kopyalayıp yepyeni bir temiz sohbet penceresine yapıştırın:]

```text
AIMASTER OS KAPSAMINDA ÖNCEKİ OTURUMDAN DEVAM EDİYORUZ.
Proje kök dizinindeki RulesAI.md ve .handoff/session-state.md dosyalarını oku.

ŞU ANKİ DURUMUMUZ:
- Tamamlananlar: [Özet]
- Sırada Yapılacak İş: [Bir sonraki ilk adım]

Hemen .handoff/session-state.md dosyasını incele, bağlamı doğrula ve doğrudan sıradaki adıma cerrahi olarak başla!
```
```

---

## 4. KULLANICIYA BİLDİRİM FORMATI

Ajan handoff dosyasını yazdıktan sonra kullanıcıya yanıtının en altına şu resmi uyarı bloğunu ekler:

```text
⚠️ [AIMASTER BAĞLAM UYARISI / CONTEXT CHECKPOINT]
Bu oturumda bağlam derinliği optimum sınırı aştı. Bellek zindeliği ve %85 token tasarrufu için:
1. Projenizde `.handoff/session-state.md` oluşturuldu ve güncellendi.
2. Yeni ve temiz bir sohbet penceresi açın.
3. Dosyanın en altındaki Masterprompt'u yeni sohbete yapıştırarak sıfır kayıpla tam kaldığınız yerden devam edin!
```
