/* ============================================================
   WORKPACK — 📎 Hồ sơ Work Pack mẫu TWI (phụ lục WIS5)
   14 trang: kịch bản, 20 câu hỏi, 4 chứng chỉ thợ (Q1D4–Q4D4),
   4 WPS/WPQR (No 7, 9, 17, 25), bản vẽ TRAIN 1.
   Dùng để TẬP ĐỌC hồ sơ như trong phòng thi Work Pack: tìm số liệu
   trên WPS/chứng chỉ, đối chiếu bản vẽ. Phụ lục không kèm đáp án
   chính thức → câu hỏi để tự luyện & hỏi thầy, không chấm điểm.
   Gắn vào tab Tài liệu thi (thi.js) và có nút trong bộ Work Pack.
   ============================================================ */
(function(){
'use strict';
var WP = window.BOOK_WP || []; if (!WP.length) return;
var BASE = 'img_book/';
var OPEN = false, PI = 0;
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
var css = document.createElement('style');
css.textContent = [
'.wp-page{background:#fff;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.12)}',
'.wp-page img{display:block;width:100%;height:auto;cursor:zoom-in}',
'.wp-thumbs{display:flex;gap:6px;overflow-x:auto;padding:6px 0;scrollbar-width:thin}',
'.wp-thumbs button{flex:none;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:var(--txt,#eaeff7);border-radius:9px;padding:6px 10px;font-size:12px;cursor:pointer;font-family:inherit;white-space:nowrap}',
'.wp-thumbs button.on{border-color:var(--accent2,#4ca8ff);color:var(--accent2,#4ca8ff);background:rgba(76,168,255,.12)}',
'.wp-tip{font-size:13px;line-height:1.6;background:rgba(255,214,10,.06);border:1px solid rgba(255,214,10,.3);border-radius:10px;padding:10px 12px;margin-top:10px}',
'.wp-zoom{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:10001;overflow:auto;cursor:zoom-out;padding:10px}',
'.wp-zoom img{width:100%;max-width:1400px;display:block;margin:0 auto;background:#fff;border-radius:6px}'
].join('\n');
document.head.appendChild(css);

var TIPS = {
 19:'Đọc kịch bản: bạn phải xác nhận <b>WPS đúng</b> và <b>thợ đúng chứng chỉ</b> cho từng mối nối trên bản vẽ, rồi kiểm trước–trong–sau hàn.',
 20:'Với mỗi câu, xác định trước: câu hỏi về <b>WPS nào</b>, <b>chứng chỉ nào</b>, <b>mối nối nào</b> trên bản vẽ. Mở trang tương ứng rồi tìm đúng ô dữ liệu.',
 21:'Câu về phạm vi qualify (thickness/diameter/position): so sánh <b>Range of qualification</b> trên chứng chỉ với yêu cầu mối nối trên bản vẽ.',
 22:'Câu về heat input/arc energy: lấy U, I, tốc độ (hoặc ROL) trên bảng thông số WPS; HI = U×I×60/(v×1000) × k.',
 23:'Chứng chỉ thợ ISO 9606-1: đọc <b>designation</b> (quá trình, tấm/ống, BW/FW, nhóm que, chiều dày s/t, đường kính D, tư thế, ss/bs, nb/mb) và <b>phạm vi qualify</b> bên dưới. Để ý ngày thi và xác nhận 6 tháng.',
 24:'Chứng chỉ 141 TIG góc tấm: chỉ qualify mối hàn góc (FW), không qualify giáp mép.',
 25:'Chứng chỉ 136 FCAW ống: chú ý đường kính nhỏ nhất qualify và tư thế (PH/PJ/H-L045).',
 26:'Chứng chỉ 135 MAG ống: so với WPS 17 — cùng quá trình? cùng nhóm vật liệu? chiều dày/đường kính nằm trong phạm vi?',
 27:'WPS 7 (141 TIG, góc tấm): xem loại vonfram, khí, dòng, tư thế; không có chiều dày tấm → phạm vi cạnh góc suy từ WPQR.',
 28:'WPS 9 (111 MMA, hàn lên PF): để ý que basic, cực tính DC+, interpass max, tiền nhiệt; đổi cực tính gốc là đổi biến số thiết yếu.',
 29:'WPS 17 (135 MAG ống): khí Ar/CO₂ — tăng CO₂ → ngấu sâu hơn; phạm vi chiều dày/đường kính; tư thế qualify.',
 30:'WPS 25 (136 FCAW ống): dây lõi thuốc + 80% Ar/20% CO₂; đọc bảng dòng/áp/tốc độ để tính heat input min–max.',
 31:'Bản vẽ TRAIN 1: nhận dạng từng mối nối (1–10): ống–ống, ống–mặt bích, tấm; chiều dày, đường kính, tư thế lắp → chọn WPS & thợ phù hợp.',
 32:'Bản vẽ (tiếp): đối chiếu ký hiệu hàn với WPS; mối nối nào cần chống biến dạng (mặt bích mỏng) hoặc tấm lót.'
};
function renderViewer(){
  var el = document.getElementById('v-thi'); if (!el) return;
  var p = WP[PI];
  el.innerHTML = '<div class="thi-card"><button class="back" onclick="WORKPACK.close()">← Tài liệu thi</button>'
    + '<h2 style="margin-top:8px">📎 Hồ sơ Work Pack mẫu TWI</h2><p class="thi-muted" style="margin-top:6px">Trang ' + (PI + 1) + '/' + WP.length + ' — <b>' + esc(p.t) + '</b> (phụ lục WIS5 tr.' + p.p + '). Chạm ảnh để phóng to. Phụ lục không kèm đáp án chính thức: dùng để tập đọc WPS/chứng chỉ/bản vẽ đúng kiểu phòng thi.</p>'
    + '<div class="wp-thumbs">' + WP.map(function(x, i){ return '<button class="' + (i === PI ? 'on' : '') + '" onclick="WORKPACK.go(' + i + ')">' + (i + 1) + '. ' + esc(x.t.split(' (')[0]) + '</button>'; }).join('') + '</div></div>'
    + '<div class="thi-card"><div class="wp-page"><img src="' + BASE + p.f + '" alt="' + esc(p.t) + '" onclick="WORKPACK.zoom()"></div>'
    + (TIPS[p.p] ? '<div class="wp-tip">👨‍🏫 ' + TIPS[p.p] + '</div>' : '')
    + '<div class="thi-row"><button class="btn sec" onclick="WORKPACK.go(' + (PI - 1) + ')" ' + (PI === 0 ? 'disabled style="opacity:.5"' : '') + '>← Trang trước</button><button class="btn" onclick="WORKPACK.go(' + (PI + 1) + ')" ' + (PI >= WP.length - 1 ? 'disabled style="opacity:.5"' : '') + '>Trang sau →</button><button class="btn ghost" onclick="WORKPACK.zoom()">🔍 Phóng to</button></div></div>';
  window.scrollTo(0, 0);
}
window.WORKPACK = {
  open:function(i){ OPEN = true; PI = i || 0; renderViewer(); },
  close:function(){ OPEN = false; try{ if (window.THI) THI.back(); else if (typeof renderThi === 'function') renderThi(); }catch(e){} },
  go:function(i){ PI = Math.max(0, Math.min(WP.length - 1, i)); renderViewer(); },
  zoom:function(){ var o = document.createElement('div'); o.className = 'wp-zoom'; o.innerHTML = '<img src="' + BASE + WP[PI].f + '" alt="">'; o.addEventListener('click', function(){ o.remove(); }); document.body.appendChild(o); },
  /* xem hồ sơ dạng cửa sổ nổi — dùng khi đang làm bài, không mất tiến độ */
  modal:function(i){
    var old = document.getElementById('wp-modal'); if (old) old.remove();
    var mi = Math.max(0, Math.min(WP.length - 1, i == null ? 4 : i));
    var o = document.createElement('div'); o.id = 'wp-modal'; o.className = 'wp-zoom'; o.style.cursor = 'default';
    function draw(){ var p = WP[mi]; o.innerHTML = '<div style="max-width:1100px;margin:0 auto"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px"><b style="color:#fff">📎 ' + esc(p.t) + '</b><span style="color:#aab;font-size:12px">' + (mi + 1) + '/' + WP.length + '</span><span style="flex:1"></span><button class="btn sec" style="padding:6px 12px" onclick="WORKPACK.modalGo(-1)">←</button><button class="btn sec" style="padding:6px 12px" onclick="WORKPACK.modalGo(1)">→</button><button class="btn" style="padding:6px 12px" onclick="document.getElementById(\'wp-modal\').remove()">✕ Đóng, làm tiếp</button></div><div class="wp-thumbs" style="margin-bottom:8px">' + WP.map(function(x, k){ return '<button class="' + (k === mi ? 'on' : '') + '" onclick="WORKPACK.modalGo(' + (k - mi) + ')">' + (k + 1) + '. ' + esc(x.t.split(' (')[0]) + '</button>'; }).join('') + '</div><img src="' + BASE + p.f + '" alt=""></div>'; }
    o._go = function(d){ mi = Math.max(0, Math.min(WP.length - 1, mi + d)); draw(); };
    draw(); document.body.appendChild(o);
  },
  modalGo:function(d){ var o = document.getElementById('wp-modal'); if (o && o._go) o._go(d); }
};
/* nút "Mở hồ sơ" khi đang học/làm bộ Work Pack TWI */
function injectSetBtn(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  var head = el.querySelector('.thi-card b'); if (!head || !/Work Pack TWI/.test(head.textContent) || el.querySelector('.wp-setbtn')) return;
  var b = document.createElement('button'); b.className = 'btn sec wp-setbtn'; b.style.cssText = 'margin-top:8px;padding:7px 12px;font-size:12.5px'; b.textContent = '📎 Mở hồ sơ WPS / chứng chỉ / bản vẽ (cửa sổ nổi)';
  b.onclick = function(){ WORKPACK.modal(4); };
  head.parentNode.parentNode.appendChild(b);
}
/* thẻ trong menu Tài liệu thi */
function inject(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  if (OPEN){ if (!el.querySelector('.wp-page')) renderViewer(); return; }
  if (el.querySelector('#wp-card')) return;
  var first = el.querySelector('.thi-card'); if (!first) return;
  if (!/Tài liệu thi/.test(first.textContent)) return; // chỉ ở màn menu
  var d = document.createElement('div'); d.className = 'thi-card'; d.id = 'wp-card'; d.style.borderLeft = '3px solid var(--yellow,#ffd60a)';
  d.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">📎</div><div style="flex:1"><b>Hồ sơ Work Pack mẫu TWI</b><span class="thi-tag">' + WP.length + ' trang</span><span class="thi-tag">WPS · chứng chỉ thợ · bản vẽ</span><div class="thi-muted">Tập đọc WPS 7/9/17/25, chứng chỉ Q1D4–Q4D4 và bản vẽ TRAIN 1 như đề Work Pack thật. Kèm gợi ý của thầy cho từng trang.</div></div></div>'
    + '<div class="thi-row"><button class="btn" onclick="WORKPACK.open(0)">📖 Mở hồ sơ</button><button class="btn sec" onclick="WORKPACK.open(10)">Xem bản vẽ TRAIN 1</button></div>';
  first.insertAdjacentElement('afterend', d);
}
new MutationObserver(function(){ try{ inject(); injectSetBtn(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
/* đổi tab thì đóng viewer */
if (typeof window.go === 'function' && !window._wpGoWrapped){ var og = window.go; window.go = function(t){ if (t !== 'thi') OPEN = false; return og.apply(this, arguments); }; window._wpGoWrapped = true; }
inject();
})();
