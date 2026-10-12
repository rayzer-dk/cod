-- 12) Убирает блок «Де придбати модуль» (ccp-buy-channels) из описаний всех товаров, в том числе отключённых.
-- Нужен MariaDB 10.0.5+ или MySQL 8+ (REGEXP_REPLACE). Обрабатываются обе формы хранения: обычный HTML и экранированный (&lt;div ...).
SET NAMES utf8mb4;
UPDATE `oc_product_description`
SET `description` = REGEXP_REPLACE(REGEXP_REPLACE(`description`,
    '<div class="ccp-buy-channels".*?</div>', ''),
    '&lt;div class=&quot;ccp-buy-channels&quot;.*?&lt;/div&gt;', '')
WHERE `description` LIKE '%ccp-buy-channels%';
