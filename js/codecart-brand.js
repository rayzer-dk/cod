/* CodeCart PRO — доработка всплывающей корзины темы 8.7.5.
   Куда: Система → Дизайн → Темы → CodeCart PRO → Свой код → «JS (подвал)», включить «Кастомный JS».
   Что делает: в окне «Кошик» показывает сумму позиции (цена x количество) и общую сумму корзины без текста «Товарів: N (...)».
   В коде нет символов «больше», «меньше», «&» и двойных кавычек — админка темы не испортит его при сохранении. */
(function () {
  function num(t) {
    var m = String(t || '').replace(/ /g, ' ').match(/\d[\d\s.,]*/);
    if (!m) { return NaN; }
    var s = m[0].replace(/\s/g, '');
    if (s.indexOf(',') !== -1 && s.indexOf('.') === -1) { s = s.replace(',', '.'); } else { s = s.replace(/,/g, ''); }
    return parseFloat(s);
  }
  function fmt(tpl, v) {
    var m = String(tpl).match(/^(\D*?)(\d[\d\s.,]*)(\D*)$/);
    if (!m) { return String(v); }
    var parts = m[2].replace(/\s/g, '').split(/[.,]/);
    var d = parts.length !== 1 ? parts[parts.length - 1].length : 0;
    return m[1] + v.toFixed(d) + m[3];
  }
  function fix() {
    var p = document.getElementById('ccp-cart-popup');
    if (!p) { return; }
    var q = function (c) { return p.querySelector('.ccp-cart-popup__' + c); };
    var price = q('price'), qty = q('qty-value'), total = q('total'), sum = q('summary-value');
    if (price) { if (qty) { if (total) {
      var u = num(price.textContent), n = parseInt(qty.textContent, 10) || 1;
      if (!isNaN(u)) { total.textContent = fmt(price.textContent.trim(), u * n); }
    } } }
    if (sum) {
      var m = sum.textContent.match(/\(([^)]+)\)/);
      if (m) { sum.textContent = m[1].trim(); }
    }
  }
  function init() {
    var p = document.getElementById('ccp-cart-popup');
    if (!p) { return; }
    if (!window.MutationObserver) { return; }
    new MutationObserver(function () { if (p.classList.contains('is-visible')) { fix(); } })
      .observe(p, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
