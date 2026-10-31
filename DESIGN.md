# İçerik Asistanı · Açık Bakış

Tasarımın tek değer kaynağı `web/src/theme/tokens.ts` ve aynı değerlerin CSS karşılığı `tokens.css` dosyasıdır. `globals.css`, kapsam içindeki `theme/tailwind.config.ts` dosyasını `@config` ile seçer. Tailwind renk, boşluk, yarıçap, gölge ve tipografi araçları bu belirteçlerden üretilir. Ekranlarda yeni renk, yazı tipi, boyut veya boşluk değerleri tanımlamayın.

Palet: primary #165D56, primary-deep #104740, background #F6F7F3, surface #FFFFFF, text #182E2A, muted #5C6D67, border #D7E0D9, tint #EAF1EB. Sınıf renkleri: success #28613F / #EDF6EF, warning #80530B / #FFF4DA, error #A43C36 / #FCEEEB; bilgi rengi #2C5C79 / #EDF4F9.

Yazı ailesi system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif. Boyut/satır yüksekliği ve ağırlık: display 44/52 700; title 32/40 700; heading 22/30 600; body 16/26 400; label 14/20 600; small 13/20 400. Boşluklar: xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, section 48, hero 64 px. Yarıçaplar: sm 8, md 12, lg 20, pill 999 px. Gölgeler: card `0 4px 20px rgba(24, 46, 42, 0.04)`, raised `0 12px 36px rgba(24, 46, 42, 0.09)`.

## Ortak kurallar

- Bütün kontroller en az 44 × 44 px dokunma alanı ve belirgin klavye odağı taşır.
- Risk sınıfları yalnızca renkle anlatılmaz: “Kaçınılması önerilir”, “Dikkat”, “Risk yok” adları görünür. Sıralama kırmızı → sarı → yeşildir. Madde gerekçesi boş bırakılamaz; belirsizlik ve ilgili gruplar ayrıntılarda açıklanır.
- Güven, sağlık puanı değildir. Kaynak ve güven ayrı sunulur; tahmin analizinde güven en fazla ortadır. Tahmin uyarısı özetten önce görünür, kapatılamaz ve fotoğraf yükleme bağlantısı içerir.
- İlerleme ölçülmediğinden yüzde gösterilmez. Hız sınırında Türkçe kalan süre görünür ve yeniden deneme süre bitene kadar kapalıdır.
- Masaüstünde ana içerik ve destek paneli iki sütundur (`split`); 768 px ve altında tek sütuna iner. Kartlar 20 px, kontroller 12 px yarıçap kullanır.
- Tüm metin Türkçedir. Sonuç özeti en fazla üç cümledir; temiz/kirli gibi hükümler kullanılmaz. Her sonuçta, kayıttan açılanlar dahil, `LegalNote` eksiksiz yer alır.
- Kişisel liste yalnızca tarayıcıda tutulur; sunucuya gönderilmez. Fotoğraflar kalıcı saklanmaz. Bu tasarım bileşenleri veri aktarmaz veya saklamaz.

## Bileşenler

- `AppNav`: marka, Yeni analiz, Listem, Hakkında; layout içinde her sayfada görünür, etkin bölüm `aria-current="page"` taşır.
- `Action`: filled, outlined, text; native disabled ve `disabledReason` açıklaması.
- `InputField`: görünür etiket, yardım ve hata; kimlikleri `aria-describedby` ile bağlar, ref ve native input özelliklerini kabul eder.
- `Notice`: warning, info, success, error ve kapatılamayan estimate. Yükleme hedefi `uploadHref` ile ekranın gerçek alanına bağlanır.
- `IngredientRow`: madde adı ve sınıfı kapalıyken görünür; gerekçe, belirsizlik ve gruplar açıldığında okunur. `classification` değerleri avoid, caution, none sırasındadır.
- `SavedCard`: saved çeşidinde tarih ve silme eylemi; example çeşidinde açık örnek etiketi, tarih ve silme eylemi yoktur. Tahmini kayıt `estimated` ile uyarı gösterir.
- `ProcessState`: loading, empty, error, rateLimit; hata kurtarma eylemi `onRetry`, hız sınırı saniyesi `retryAfterSeconds` ile verilir. Yeni bir bekleme penceresi farklı süreyle veya yeni bir React key ile başlatılır.
- `LegalNote`: değişmeyen sağlık bilgilendirmesi.

Bu görev ortak sistemi kurar; sayfaların iş akışları sonraki ekran görevlerinde bu bileşenlerle tamamlanır.
