/* ============================================================
   CSWIP_FOCUS — Tập trung đúng chuẩn CSWIP 3.1, tránh nhầm CWI
   1) Loại câu CWI (AWS) khỏi MỌI chế độ trộn chung (Học thông
      minh, Luyện điểm yếu, Thi thử, Tất cả ngân hàng).
   2) Gỡ card CWI khỏi menu Quiz.
   3) Tạo TAB RIÊNG "🇺🇸 CWI" (tham khảo) — vào đề từ đây,
      kèm cảnh báo khác chuẩn.
   ============================================================ */
(function(){
'use strict';
/* ---------- 1) poolAll: chỉ còn câu chuẩn CSWIP ---------- */
if (typeof poolAll === 'function' && typeof poolChapters === 'function'){
  window.poolAll = function(){
    return poolChapters().concat(poolBank()).concat(poolReal());
  };
}

const css = document.createElement('style');
css.textContent = '.cwi-warn{margin:0 0 10px;padding:9px 12px;border-radius:10px;font-size:12.5px;line-height:1.5;'
 + 'border:1px solid var(--yellow,#ffd60a);background:rgba(255,214,10,.08);color:var(--txt,#eaeff7)}'
 + '.cwi-warn b{color:var(--yellow,#ffd60a)}';
document.head.appendChild(css);

const NOTE_QUIZ = '⚠️ <b>Đang làm bộ CWI (chuẩn Mỹ — AWS), chỉ để tham khảo.</b> Kiến thức gốc dùng được, nhưng ký hiệu hàn, đơn vị psi/°F và quy định an toàn Mỹ KHÔNG thi trong CSWIP 3.1 — đừng học thuộc các con số này.';

/* ---------- 3) Tab riêng "🇺🇸 CWI (tham khảo)" ---------- */
function addTab(){
  if (typeof TABS === 'undefined' || typeof buildNav !== 'function') return;
  if (document.getElementById('v-cwi')) return;
  const main = document.querySelector('main'); if (!main) return;
  const d = document.createElement('div'); d.id = 'v-cwi'; d.className = 'view'; main.appendChild(d);
  let has = false; for (const t of TABS) if (t[0] === 'cwi') has = true;
  if (!has){
    TABS.push(['cwi','🇺🇸 CWI']);
    buildNav();
    document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.t === (typeof CUR !== 'undefined' ? CUR : 'home')));
  }
  const orig = window.renderAll;
  window.renderAll = function(){ orig(); try{ if (typeof CUR !== 'undefined' && CUR === 'cwi') renderCwi(); }catch(e){} };
}

function renderCwi(){
  const el = document.getElementById('v-cwi'); if (!el) return;
  const total = (typeof CWIBANK !== 'undefined') ? CWIBANK.length : 0;
  const vi = (window.CWI_VI) ? Object.keys(window.CWI_VI).length : 0;
  let done = 0, right = 0;
  if (typeof QUIZSTATE !== 'undefined'){
    for (let i = 0; i < total; i++){ const s = QUIZSTATE['w'+i]; if (s){ done++; if (s.correct) right++; } }
  }
  el.innerHTML =
    '<div class="card"><h2>🇺🇸 Ngân hàng CWI (AWS) — tham khảo</h2>'
    + '<div class="cwi-warn" style="margin-top:10px">⚠️ <b>Bộ này theo chuẩn Mỹ (AWS), KHÁC chuẩn CSWIP/ISO của đề bạn thi.</b> '
    + 'Dùng để luyện thêm kiến thức gốc (khuyết tật, quá trình hàn, cực tính, NDT) và phản xạ đọc tiếng Anh. '
    + 'BỎ QUA các câu về: ký hiệu hàn kiểu AWS, đơn vị psi/°F, quy định an toàn Mỹ. '
    + 'Ưu tiên ôn: <b>Tài liệu thi → Quiz chương → Học thông minh</b> (các mục đó giờ 100% chuẩn CSWIP).</div>'
    + '<p class="muted" style="margin:10px 0">' + total + ' câu từ "1001 Questions & Answers for the CWI Exam" (đáp án gốc AWS) • '
    + vi + ' câu đầu đã có dịch tay + giải nghĩa tiếng Việt • Bạn đã làm ' + done + ' câu, đúng ' + right + '.</p>'
    + '<div class="row"><button class="btn" onclick="go(\'quiz\');startCWI()">📝 Làm đề CWI (' + total + ' câu)</button></div>'
    + '</div>';
}

/* ---------- 2) Gỡ card CWI khỏi menu Quiz + banner khi làm CWI ---------- */
function inject(){
  document.querySelectorAll('#v-quiz .chap').forEach(function(card){
    if (/CWI/.test(card.textContent)) card.style.display = 'none';
  });
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
new MutationObserver(function(){ addTab(); inject(); }).observe(document.body, {childList:true, subtree:true});
addTab(); inject();
})();
