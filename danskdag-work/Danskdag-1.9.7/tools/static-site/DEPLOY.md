# Danskdag {{VERSION}}: сборка для статического хостинга

Это готовое приложение: набор файлов, который открывается как обычный сайт. Сервер, база данных и аккаунты не нужны.

## Что загружать

Содержимое этой папки целиком (не саму папку внутри папки, а её файлы):

- `index.html` — всё приложение в одном файле;
- `service-worker.js` — работа без интернета и обновления;
- `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`, `flag-dk.svg` — установка и значки;
- `_headers` — заголовки безопасности и кэша для Netlify и Cloudflare Pages;
- `.nojekyll` — нужен GitHub Pages (файл без имени и с точкой: проверь, что он загрузился);
- `DEPLOY.md` — эта инструкция, её можно не загружать.

Эти же файлы лежат в архиве `Danskdag-static-{{VERSION}}.zip` (распакуй его в пустую папку).

## Обязательные условия

1. **HTTPS.** Без него Service Worker и установка не работают. Исключение — `http://localhost` для проверки у себя.
2. **Корень домена.** Приложение должно открываться по адресу вида `https://danskdag.example.com/`. Пути внутри приложения абсолютные (`/service-worker.js`, `/icon.svg`, область `/`), поэтому **подкаталоги не поддерживаются**: `https://user.github.io/danskdag/` (проектная страница GitHub Pages) работать не будет.
3. **Не менять файлы на хостинге.** Service Worker сверяет SHA-256 каждого файла. Если хостинг сам «оптимизирует» HTML (минификация, вставка скриптов аналитики, Rocket Loader в Cloudflare), установка офлайн-копии не пройдёт. Отключи такие опции для этого сайта.

## Netlify (перетаскиванием)

1. Открой `https://app.netlify.com/drop` (нужен бесплатный аккаунт).
2. Перетащи папку с файлами в окно. Через несколько секунд появится адрес вида `https://имя.netlify.app/`.
3. Открой адрес, подожди загрузки. Готово. Своё имя: Site configuration → Change site name; свой домен: Domain management.
4. Обновление: Deploys → перетащи новую папку в область «Drag and drop your site output folder here».

## Cloudflare Pages

1. Workers & Pages → Create → Pages → **Upload assets** (Direct Upload).
2. Задай имя проекта, перетащи папку (или zip) и нажми Deploy. Адрес: `https://имя.pages.dev/`.
3. Обновление: у проекта Create deployment и загрузи новую папку.
4. Для проекта не включай преобразования HTML (Rocket Loader, Auto Minify), см. условие 3.

## GitHub Pages

Подходит только сайт пользователя или организации (репозиторий `имя.github.io`, адрес `https://имя.github.io/`) либо проектная страница со **своим доменом на корне** (Settings → Pages → Custom domain).

1. Создай репозиторий `имя.github.io`, загрузи в корень все файлы папки, включая `.nojekyll`.
2. Settings → Pages → Source: ветка `main`, папка `/ (root)`. Включи Enforce HTTPS.
3. Файл `_headers` GitHub Pages не читает: заголовки задаются самим GitHub, кэш страницы около 10 минут. Приложение при этом работает, а обновление может дойти с задержкой до 10 минут.

## nginx

Скопируй файлы в `/var/www/danskdag`. Файл `/etc/nginx/snippets/danskdag-headers.conf`:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer" always;
add_header Permissions-Policy "microphone=(self), camera=(), geolocation=()" always;
add_header X-Frame-Options "DENY" always;
```

Сайт (сертификат — например, от Let's Encrypt):

```nginx
server {
    listen 443 ssl;
    server_name danskdag.example.com;
    ssl_certificate     /etc/letsencrypt/live/danskdag.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/danskdag.example.com/privkey.pem;

    root /var/www/danskdag;
    index index.html;
    include snippets/danskdag-headers.conf;

    location / {
        try_files $uri $uri/ =404;
    }

    # Страница, Service Worker и манифест проверяются при каждом открытии.
    location ~ ^/(index\.html|service-worker\.js)$ {
        include snippets/danskdag-headers.conf;
        add_header Cache-Control "no-cache" always;
        try_files $uri =404;
    }

    # Нужный MIME-тип манифеста (в старых nginx расширения webmanifest нет в mime.types).
    location = /manifest.webmanifest {
        include snippets/danskdag-headers.conf;
        add_header Cache-Control "no-cache" always;
        default_type application/manifest+json;
        try_files $uri =404;
    }
}
```

Проверка и перезапуск: `sudo nginx -t && sudo systemctl reload nginx`. Корень `/` обслуживается через `index index.html`.

## Как установить приложение

- **Android (Chrome):** открой адрес, подожди несколько секунд, меню ⋮ → «Установить приложение» (или «Добавить на главный экран»). Можно нажать «Установить» в настройках Danskdag. Долгое нажатие на значок покажет быстрые действия: «Маршрут», «Повторення», PD3 и «Мої слова».
- **ПК (Chrome, Edge):** значок установки в адресной строке или меню → «Установить Danskdag» (в Edge: Приложения → Установить этот сайт как приложение).
- **iPhone (Safari):** «Поделиться» → «На экран “Домой”». Устанавливается как веб-приложение; без добавления на экран Safari может удалить данные сайта, если им не пользоваться неделю.

Первый запуск нужен с интернетом: тогда приложение сохраняет себя на устройстве и дальше открывается без сети.

## Как обновить версию

1. Замени файлы на хостинге новой папкой (Netlify, Cloudflare Pages: новый деплой; GitHub Pages, nginx: замени файлы).
2. При следующем открытии приложение само скачает новую версию. Появится сообщение «Доступна новая версия» с кнопкой «Обновить». Прогресс при обновлении не теряется.
3. Проверка занимает до нескольких минут (кэш хостинга), у GitHub Pages — до 10 минут.

## Где хранится прогресс

Прогресс лежит **в браузере устройства** (localStorage адреса, где открыто приложение). Облачной синхронизации и входа в аккаунт в этой сборке нет, на сервер ничего не отправляется.

- Другое устройство, другой браузер или другой адрес сайта — это новый пустой прогресс.
- Для переноса: Настройки → «Выгрузить» (файл JSON) на старом месте, затем Настройки → «Загрузить» на новом.
- Очистка данных сайта в браузере удаляет прогресс. Перед этим выгрузи JSON.
- При смене адреса (домена) старые данные не переносятся автоматически, используй JSON.

## Если что-то не работает

- Нет кнопки «Установить»: проверь HTTPS, корень домена и что страница полностью загрузилась. В DevTools → Application → Service Workers должен быть статус «activated».
- Service Worker не устанавливается: хостинг изменил файлы (см. условие 3) или какой-то из файлов не загрузился (404 в Network).
- Страница не обновляется: на GitHub Pages подожди до 10 минут; в других случаях закрой и снова открой приложение.
