# Журнал аудита качества кода

## 2026-11-20 — настройки независимого аудита main

Репозиторий cod — сайт/генераторы на Python, JavaScript и CSS, а не ядро OpenCart. Проверки PHPStan для несуществующих здесь PHP-исходников не устанавливались.

Сохранены имеющиеся проверки UTF-8/BOM, Python AST, Node.js --check, JSON и XML/SVG в source-language-qa.yml. Добавлены tools/quality/audit_cross_references.py и .github/workflows/source-quality-deep.yml: реестр кандидатов на неиспользуемые CSS-классы и JS-функции, ручной просмотр комментариев workaround и полный jscpd с порогом 15%.

GitHub Actions: https://github.com/rayzer-dk/cod/actions/workflows/source-quality-deep.yml

Новые проверки выполняются на push, pull_request и workflow_dispatch. Диагностика повторяющегося кода пока рекомендательная, чтобы не блокировать существующие правки без классификации совпадений. Неиспользуемые классы могут создаваться Python-генератором, а функции — вызываться из HTML; удалять их по числу ссылок нельзя. Отчёты сохраняются в artifacts каждого запуска.
