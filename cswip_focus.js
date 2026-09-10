/* ============================================================
   CSWIP_FOCUS — Tập trung đúng chuẩn CSWIP 3.1, tránh nhầm CWI
   1) Loại câu CWI (AWS) khỏi MỌI chế độ trộn chung:
      Học thông minh, Luyện điểm yếu, Thi thử bấm giờ, Tất cả
      ngân hàng — các chế độ này giờ chỉ còn câu chuẩn CSWIP.
   2) Bộ CWI vẫn làm được nhưng phải chọn riêng, kèm cảnh báo
      "khác chuẩn" ngay trên card và trong lúc làm bài.
   ============================================================ */
(function(){
'use strict';
/* 1) Ghi đè poolAll: bỏ CWIBANK khỏi pool trộn chung */
if (typeof poolAll === 'function' && typeof poolChapters === 'function'){
  window.poolAll = function(){
    return poolChapters().concat(poolBank()).concat(poolReal());
  };
}
/* 2) Cảnh báo trên card menu + banner khi đang làm bộ CWI */
const css = document.createElement('style');
css.textContent = '.cwi-warn{margin:0 0 10px;padding:9px 12px;border-radius:10px;font-size:12.5px;line-height:1.5;'
 + 'border:1px solid var(--yellow,#ffd60a);background:rgba(255,214,10,.08);color:var(--txt,#eaeff7)}'
 + '.cwi-warn b{color:var(--yellow,#ffd60a)}';
document.head.appendChild(css);

const NOTE_MENU = '⚠️ Bộ BỔ TRỢ theo chuẩn Mỹ (AWS) — chỉ làm thêm khi dư thời gian. Ký hiệu hàn, đơn vị (psi/°F), quy định an toàn KHÁC chuẩn CSWIP/ISO của đề bạn thi. Ưu tiên: Tài liệu thi → Quiz chương.';
const NOTE_QUIZ = '⚠️ <b>Đang làm bộ CWI (chuẩn Mỹ — AWS).</b> Kiến thức gốc dùng được, nhưng ký hiệu hàn, đơn vị psi/°F và quy định an toàn Mỹ KHÔNG thi trong CSWIP 3.1 — đừng học thuộc các con số này.';

function inject(){
  // card menu CWI
  document.querySelectorAll('#v-quiz .chap').forEach(function(card){
    if (card.textContent.indexOf('CWI') === -1 || card.querySelector('.cwi-warn')) return;
    const meta = card.querySelector('.meta'); if (!meta) return;
    const d = document.createElement('div');
    d.className = 'cwi-warn'; d.style.marginTop = '6px'; d.textContent = NOTE_MENU;
    meta.appendChild(d);
  });
  // banner khi đang làm bài CWI (nhãn "• CWI" trên đầu câu hỏi)
  const head = document.querySelector('#v-quiz .card .muted');
  if (head && /•\s*CWI/.test(head.textContent)){
    const card = head.closest('.card');
    if (card && !card.querySelector('.cwi-warn')){
      const d = document.createElement('div');
      d.className = 'cwi-warn'; d.innerHTML = NOTE_QUIZ;
      card.insertBefore(d, card.firstChild);
    }
  }
}
new MutationObserver(inject).observe(document.body, {childList:true, subtree:true});
inject();
})();
