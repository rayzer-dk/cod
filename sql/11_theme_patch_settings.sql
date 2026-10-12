-- 11) Для темы Theme_CodeCart_Pro_v8.7.5-brand1: CSS и JS теперь внутри темы, поэтому поля «Свой код» очищаются (иначе стили дублировались бы).
-- Выполняйте ТОЛЬКО после установки пропатченной темы (она заменяет sql/10).
SET NAMES utf8mb4;
START TRANSACTION;
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_quick_order';
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_live_price';
UPDATE `oc_setting` SET `value`='support@codecartpro.com' WHERE `store_id`=0 AND `key`='theme_codecart_pro_quick_order_email';
UPDATE `oc_setting` SET `value`='{"1": "\\u0414\\u044f\\u043a\\u0443\\u0454\\u043c\\u043e! \\u0417\\u0430\\u044f\\u0432\\u043a\\u0443 \\u043e\\u0442\\u0440\\u0438\\u043c\\u0430\\u043d\\u043e \\u2014 \\u043c\\u0435\\u043d\\u0435\\u0434\\u0436\\u0435\\u0440 \\u0437\\u0432\\u2019\\u044f\\u0436\\u0435\\u0442\\u044c\\u0441\\u044f \\u0437 \\u0432\\u0430\\u043c\\u0438 \\u043d\\u0430\\u0439\\u0431\\u043b\\u0438\\u0436\\u0447\\u0438\\u043c \\u0447\\u0430\\u0441\\u043e\\u043c.", "2": "Thank you! Your request has been received \\u2014 a manager will contact you shortly.", "3": "\\u0421\\u043f\\u0430\\u0441\\u0438\\u0431\\u043e! \\u0417\\u0430\\u044f\\u0432\\u043a\\u0430 \\u043f\\u043e\\u043b\\u0443\\u0447\\u0435\\u043d\\u0430 \\u2014 \\u043c\\u0435\\u043d\\u0435\\u0434\\u0436\\u0435\\u0440 \\u0441\\u0432\\u044f\\u0436\\u0435\\u0442\\u0441\\u044f \\u0441 \\u0432\\u0430\\u043c\\u0438 \\u0432 \\u0431\\u043b\\u0438\\u0436\\u0430\\u0439\\u0448\\u0435\\u0435 \\u0432\\u0440\\u0435\\u043c\\u044f."}' WHERE `store_id`=0 AND `key`='theme_codecart_pro_quick_order_success_text';
UPDATE `oc_setting` SET `value`='' WHERE `store_id`=0 AND `key`='theme_codecart_pro_custom_css_global';
UPDATE `oc_setting` SET `value`='' WHERE `store_id`=0 AND `key`='theme_codecart_pro_custom_js_footer';
COMMIT;
