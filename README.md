# Numerio

**Numerio** bir sayısal analiz uygulamasıdır. Kullanıcı, doğum tarihini sadece rakamlarla (örnek: `20032006`) girer; uygulama tarihi otomatik olarak `20.03.2006` şeklinde biçimlendirir ve **Pin Kodu** hesaplamalarını gerçekleştirir. Ayrıca chakralar, özel kodlar (Bereket Kodu, Zengin/Işık Numarası) ve PDF rapor oluşturma gibi özellikler sunar.

---

## Özellikler

- **Doğum Tarihi Girişi**: Kullanıcı sadece sayı yazar, uygulama otomatik olarak `dd.MM.yyyy` formatına dönüştürür.
- **Pin Kodu Hesaplama**: Doğum tarihinden 9 haneli Pin Kodu otomatik olarak üretilir.
- **Chakra Yorumları**: 10 chakranın yorumlarını girip kaydedebilirsiniz.
- **Özel Kodlar**: Bereket Kodu ve Zengin/Işık Numarası alanları.
- **PDF Raporu**: Analiz sonuçları, Pin Kodu haneleri ve özel kodlar PDF’ye aktarılır; PDF içinde logonuz (`assets/icon.png`) bulunur.
- **Sidebar (Drawer) Navigasyonu**: Home (Dashboard) ve Archive (Geçmiş Çalışmalar) menüleri.
- **Responsive Tasarım**: Mobil, tablet ve web (Expo‑web) platformlarında çalışır.
- **Silme İşlevi**: Geçmiş çalışmalarda tek bir tıklama ile kayıtları silme ve on‑confirm dialog.
- **Tema**: Navy‑blue (`#1D3557`) ana renk, krem/ beyaz arka plan (`#FDFBF7`).

---

## Kurulum

```bash
# Projeyi klonlayın (repository zaten GitHub’da)
git clone https://github.com/beyzanurerogluuu/numerio.git
cd numerio

# Bağımlılıkları yükleyin
yarn install   # or npm install
```

### Expo ile Çalıştırma

```bash
# Expo geliştirme sunucusunu başlatın
npx expo start
```

- **iOS/Android**: Expo Go uygulamasıyla QR kodunu tarayın.
- **Web**: `a` tuşuna basarak tarayıcıda uygulamayı açabilirsiniz.

---

## Kullanım

1. **Ana Ekran (Dashboard)**
   - Uygulama logo, selamlama ve "Günün Evrensel Enerjisi" kartı gösterir.
   - "Yeni Analiz" butonuna tıklayarak yeni bir analiz formu açılır.
2. **Analiz Formu**
   - Doğum tarihini sadece rakamlarla girin (örnek: `20032006`).
   - "Pin Kodunu Otomatik Hesapla" butonu Pin Kodu hanelerini doldurur.
   - Chakra yorumlarını ve özel kodları ekleyin.
   - "Kaydet ve Çık" ile kaydedin.
   - "PDF Oluştur ve Paylaş" ile PDF raporu alın.
3. **Arşiv (Geçmiş Çalışmalar)**
   - Sidebar’dan Archive menüsüne geçin.
   - Kayıtları silmek için çöp kutusu ikonuna tıklayın; onay dialogu gösterilir.

---

## Katkıda Bulunma

1. Repository’yi fork’layın.
2. Yeni bir branch oluşturun (`git checkout -b yeni-ozellik`).
3. Değişiklikleri commit edin ve push’layın.
4. Pull request açın.

---

## Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

*Bu README, projenin temel tanıtımı ve kurulum adımlarını içermektedir. Daha fazla bilgi ve güncellemeler için repository’deki dosyaları inceleyin.*
