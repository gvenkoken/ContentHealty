# İçerik Asistanı

`web/` altında tek Next.js App Router uygulaması. Node.js 22 ve npm kullanılır.
TypeScript strict, Tailwind, ESLint, Vitest/jsdom, Testing Library ve Playwright yapılandırılmıştır.
Uygulama Türkçe belge dili ve mobil viewport kullanır. Altı sayfa T13–T18 için yer tutucudur;
görsel tasarım ve tema, tasarım sistemi görevinde uygulanacaktır.

Komutlar `web/` içinde çalıştırılır:

| Komut | Amaç |
| --- | --- |
| `npm run dev` | Yerel geliştirme sunucusu |
| `npm run build` | Üretim derlemesi; harici font veya servis gerektirmez |
| `npm start` | Üretim sunucusu |
| `npm run lint` | ESLint; uyarılar hata sayılır |
| `npm test` | Vitest testlerini bir kez, jsdom üzerinde çalıştırır |
| `npm run test:e2e` | Playwright; kendi sunucusunu fake model adaptörü ile açar |
| `npm run scan:key` | İleride eklenecek `scripts/scan-key.mjs` giriş noktası |
| `npm run eval` | İleride eklenecek `eval/run.ts` giriş noktası |

T01 dosya kapsamı ayrı test dosyalarına izin vermediğinden düzenin render testi,
gezinme, viewport ve altı yer tutucu sayfa testi `vitest.setup.ts` içindedir;
Vitest bu dosyayı test dosyası olarak toplar. Gelecekte `src/**/*.test.ts(x)` testleri
aynı Vitest projesinde çalışır. Playwright testleri sonraki kabul testi görevinde
`web/e2e/` altına eklenecektir. Playwright tarayıcıları çalışma ortamında önceden
kurulu olmalıdır; testler model servisine bağlanmamalıdır.

Bu görevde kurulum, derleme ve test komutları çalıştırılmadı. Ağ ve paket kurulumu
yasak olduğundan geçerli transitif bağımlılık verileriyle `package-lock.json`
üretilemedi. Temiz klonda `npm ci` kullanımı için kilit dosyası, bağımlılıkların
hazır olduğu yetkili ortamda üretilmelidir. Factory paketleri `package.json`
üzerinden kurabilir. Dockerfile yalnızca `npm ci` kullanır; kilit dosyası eklenene
kadar Docker derlemesi ve temiz klonda `npm ci` çalışmaz. AC07.1 tamamlanmamıştır.

`docker compose up --build` tek bir web örneğini 3000 portunda başlatır.
Compose dosyası volume veya veritabanı tanımlamaz. Henüz görsel yükleme,
analiz API'si veya kişisel liste depolaması uygulanmamıştır.

Sunucu ortamı için ayrılmış değişkenler: `OPENAI_API_KEY`, `OPENAI_MODEL`,
`RATE_LIMIT_PER_MINUTE` ve `RATE_LIMIT_PER_DAY`. Compose varsayılanları dakikada
5 ve günde 50 istektir; uygulama sonraki ratelimit modülünde yapılacaktır.
Anahtar çalışma ortamından
sağlanır; Docker imajına derleme argümanı olarak aktarılmaz. Next yapılandırması
ortam değerlerini istemciye açmaz. Test sunucusundaki `ANALYSIS_MODEL_ADAPTER=fake`
seçimi sonraki analiz modülü tarafından kullanılacaktır.

`.env.example`, `web/scripts/scan-key.mjs` ve `web/eval/run.ts` görev açıklamasında
anılır ancak izinli pathScope içinde değildir; oluşturulmadılar. Bu nedenle
anahtar taraması ve değerlendirme komutları giriş noktaları eklenene kadar çalışmaz.
AC05.1 kapsam dışındaki ortam dosyası eklenene kadar tamamlanmamıştır.
Örnek ortam dosyasının içeriği şu olmalıdır:

```dotenv
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
RATE_LIMIT_PER_MINUTE=5
RATE_LIMIT_PER_DAY=50
```

Gerçek model yalnızca ayrı değerlendirme komutunda kullanılmalıdır.
