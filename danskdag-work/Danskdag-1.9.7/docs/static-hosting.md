# Сборка для статического хостинга

`npm run build:static` создаёт папку `static-site/` и архив `Danskdag-static-<версия>.zip` в корне проекта. Папку можно загрузить на любой статический HTTPS-хостинг (Netlify, Cloudflare Pages, GitHub Pages на корне домена, nginx). Пошаговая инструкция для пользователя лежит внутри папки: `static-site/DEPLOY.md` (исходник: `tools/static-site/DEPLOY.md`).

Сборка не зависит от `npm run build` и не меняет его результаты (`Danskdag.html`, `dist/index.html`, `dist/server/index.js`).

## Что в папке

| Файл | Назначение |
| --- | --- |
| `index.html` | то же самодостаточное приложение, что и hosted-страница Worker, но с `data-cloud="off"` и CSP в meta-теге |
| `service-worker.js` | Service Worker в режиме `static` (`makeServiceWorker(manifest,{mode:'static'})`) |
| `manifest.webmanifest` | `start_url: "/"`, ярлыки `/#learn`, `/#review`, `/#pd3`, `/#dictionary` |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `flag-dk.svg` | значки |
| `_headers` | формат Netlify и Cloudflare Pages (шаблон: `tools/static-site/_headers`) |
| `.nojekyll`, `DEPLOY.md` | для GitHub Pages и для человека |

## Отличия от версии для Worker

| | Worker (`dist/`) | Статика (`static-site/`) |
| --- | --- | --- |
| Облачная синхронизация, `/api/progress` | есть | нет: `cloud` не создаётся, запросов нет |
| Проверка обновлений `/api/release` | есть | нет; обновление приходит с новым Service Worker |
| Кнопка «Обновить» | `/open?v=…` | `location.reload()` (на статике нет `/open`) |
| Настройки | блок синхронизации, «Sites» | текст «Прогресс сохраняется в этом браузере…», перенос через JSON |
| Ссылка «Открыть сайт» (`hostedUrl`) | только в HTML-файле | нет; в статической сборке `hostedUrl` заменён на пустую строку |
| Заголовок `x-danskdag-version` | есть, SW требует его | нет; SW принимает HTML-ответ приложения |
| CSP | заголовок Worker | `<meta http-equiv="Content-Security-Policy">`, хеш единственного inline-скрипта считается при сборке |
| `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` | заголовки Worker | `_headers` (если хостинг его читает) |

Признак режима: атрибут `data-cloud="off"` у `<html>`. Код: `isStaticEdition` и `staticEdition` в `dist/runtime.mjs`; ветки в `dist/app.mjs` (`findUpdate`, `offerWorkerUpdate`, `reload-app`, создание `cloud`), `dist/app-updates.mjs` (`requestWorkerUpdate`, `cachedPageIsCurrent`), `dist/continuity-view.mjs` (фаза `static`), `dist/views.mjs`.

## Service Worker (режим `static`)

- Precache тех же шести файлов (`/index.html`, манифест, три значка, флаг) с проверкой SHA-256 по встроенному манифесту. Ключ кэша `danskdag-static-<20 hex>` берётся от хеша исходника SW, поэтому любое изменение файлов даёт новый SW.
- `/index.html` при precache запрашивается как `/`: Cloudflare Pages перенаправляет `/index.html` на `/`, а перенаправленный ответ не принимается.
- Навигация к `/`, `/index.html`, `/open`: сеть (`cache: 'no-cache'`, таймаут 3 с) и ответ принимается, если он `ok`, не перенаправлен, `text/html` и в начале содержит `<meta name="danskdag-version"` (страница-заглушка хотспота с кодом 200 не пройдёт). Иначе отдаётся проверенная копия из кэша. Сетевой ответ в precache не пишется: кэш обновляет только установка нового SW. Запрос на `/open` уходит на `/`.
- `/open` оставлен как алиас для старых установок.
- Обновление: браузер сам перепроверяет `service-worker.js` при открытии; во время работы проверку запускают события `focus`, `online`, `visibilitychange` (не чаще раза в 5 минут, `requestWorkerUpdate`). Новый SW устанавливается, берёт управление (`skipWaiting` и `clients.claim`), страница получает `controllerchange`. Кнопку «Обновить» она показывает, только если в новом кэше другая страница, чем та, что открыта (`cachedPageIsCurrent` сравнивает хеш скрипта из CSP). Поэтому после обычного перезапуска, когда страница уже пришла с сети, ложного сообщения нет.

## Ограничения

- Только корень домена: пути в приложении абсолютные (`/service-worker.js`, `/icon.svg`, область `/`). Подкаталоги, в том числе проектные страницы GitHub Pages (`user.github.io/repo/`), не поддерживаются.
- Нужен HTTPS (или `localhost`).
- Хостинг не должен менять файлы (минификация HTML, вставка скриптов): SHA-256 не совпадёт и SW не установится.
- GitHub Pages не читает `_headers`: нет `X-Frame-Options` и `no-cache`, HTML может кэшироваться до 10 минут. Защита скриптов (CSP) остаётся, она в meta-теге. `frame-ancestors` в meta не работает, поэтому защита от встраивания там отсутствует.
- Прогресс хранится в `localStorage` браузера для адреса сайта. Облачной синхронизации нет; перенос через JSON из настроек.
- iOS Safari может очистить данные сайта, который не открывали неделю и не добавили на экран «Домой».
- Конфигурация nginx из `DEPLOY.md` не прогонялась на реальном сервере в этой среде.

## Проверка

- `node --test tests/static-build.test.mjs`: состав папки и архива, манифест, CSP-хеш, `_headers`, `DEPLOY.md`, режим SW, ветки `data-cloud`.
- Ручная проверка в браузере: подними `python3 -I -m http.server <порт> --bind 127.0.0.1` в `static-site/` и открой `http://127.0.0.1:<порт>/` (localhost считается безопасным контекстом, SW работает).
