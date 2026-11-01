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

/* ---------- 👨‍🏫 HƯỚNG DẪN ĐỌC HỒ SƠ TỪNG Ô (highlight trên ảnh thật) ---------- */
var GUIDE = [
 {p:28, box:null, t:'<b>WPS là gì trong phòng thi?</b> Đề Work Pack không hỏi lý thuyết suông mà hỏi "theo WPS số 9 thì…". Bạn phải tìm đúng Ô dữ liệu trong 10 giây. Mình đi từng ô của WPS 9 (MMA, ống) nhé.'},
 {p:28, box:[50,4,46,6], t:'<b>Ô 1 — Số hiệu:</b> WPQR No 9 / WPS No 9. WPQR (bản ghi qualify) "chống lưng" cho WPS. Đề hay hỏi "WPS này dựa trên PQR nào" hoặc đánh tráo WPS 9 với WPS 17 — luôn đọc số trước.'},
 {p:28, box:[5,16,45,12], t:'<b>Ô 2 — Weld prep design:</b> góc rãnh 60–70°, mặt chân 1–2 mm, khe hở 2–4 mm. Câu hỏi kiểu "khe hở 5 mm có đúng WPS không?" → không. Thiếu thấu/cháy thủng đều bắt nguồn từ ô này.'},
 {p:28, box:[5,28,46,10], t:'<b>Ô 3 — Base metal:</b> Carbon steel, Pipe, ISO 15614-1 Group 1, <b>thickness range 5.485–21.94 mm</b>, <b>diameter ≥84.15 mm</b>. Đây là ô bị hỏi nhiều nhất: "25 mm có nằm trong phạm vi không?" → so với 21.94.'},
 {p:28, box:[5,38,46,6], t:'<b>Ô 4 — Filler:</b> E7016/E7018 (basic). Basic → phải sấy; so với chứng chỉ thợ: thợ thi que nhóm nào, có phủ B không?'},
 {p:28, box:[50,28,46,6], t:'<b>Ô 5 — Position & progression:</b> "All except PG and J-L045", Uphill. Đề: "uphill là tư thế nào?" → PF. "Được hàn xuống không?" → không (PG bị loại).'},
 {p:28, box:[50,34,46,8], t:'<b>Ô 6 — Preheat / interpass:</b> min 15 °C, đo bằng nhiệt kế số hoặc bút nhiệt, <b>interpass max 250 °C</b>. Đo được 300 °C → vượt → dừng, để nguội (nguy cơ mất độ dai). Không được tưới nước.'},
 {p:28, box:[50,41,46,8], t:'<b>Ô 7 — Technique:</b> tacks & strongbacks, stringer (đi thẳng, không lắc), wire brushing giữa lớp. Thợ hàn lắc ngang (weave) → sai WPS.'},
 {p:28, box:[5,57,91,16], t:'<b>Ô 8 — Bảng thông số từng lớp:</b> Root: que 2.5 mm, <b>DC−</b>, 75–90 A, 20–22 V; Fill/Cap: <b>DC+</b>, 80–120 A, 24–26 V. Hai bẫy: (1) đổi cực tính lớp lót sang DC+ → ngấu sâu → cháy thủng; (2) heat input = U×I×60/(v×1000)×k — ở đây tốc độ ghi N/a nên không tính được; WPS 17/25 có tốc độ.'},
 {p:28, box:[5,74,91,20], t:'<b>Ô 9 — Notes:</b> làm sạch ≥25 mm hai bên mối nối; số lớp & cỡ que tùy chiều dày. Ghi chú là một phần của WPS — đề vẫn hỏi.'},
 {p:29, box:[5,57,91,14], t:'<b>WPS 17 (MAG ống):</b> bảng có tốc độ hàn → tính được arc energy: min = 22×150×60/(300×1000) ≈ 0,66; max = 30×280×60/(120×1000) = 4,2 kJ/mm. Heat input = arc energy × 0,8 (MAG). Khí 80% Ar/20% CO₂ — đổi sang 84/16 thì ngấu giảm.'},
 {p:30, box:[50,28,46,6], t:'<b>WPS 25 (FCAW ống):</b> POSITION QUALIFIED chỉ PA, PB & PC — không có PH/H-L045 → <b>không hàn được ống cố định</b>. Luôn đối chiếu tư thế WPS với tư thế lắp trên bản vẽ.'},
 {p:23, box:[5,11,91,4], t:'<b>Chứng chỉ thợ — dòng Designation:</b> ISO 9606-1, 111 (MMA), T (ống), BW (giáp mép), FM1 (nhóm que), B (basic), s5.5 (dày đắp 5,5), t5.5, D60.32 (Ø ống), H-L045 (tư thế thi), ss (một phía), nb (không lót). Đọc được dòng này là đọc được cả chứng chỉ.'},
 {p:23, box:[5,30,91,27], t:'<b>Cột phải = PHẠM VI QUALIFY</b> (không phải cột Test Piece!): BW only; FM1 & FM2; que A, RA, RB, RC, RR, R & B; dày <b>3,0–11,08 mm</b>; Ø <b>≥30,16 mm</b>; tư thế <b>all except vertical down</b>; ss nb → cả có lót/không lót. Mọi câu "thợ này có được hàn mối X không" đều tra ở cột này.'},
 {p:23, box:[5,73,91,8], t:'<b>Ngày & hiệu lực:</b> hàn 12/05/2019, cấp 20/05/2019, hiệu lực tới 11/05/2022; ô Revalidation 9.3a/b/c = xác nhận 6 tháng (ISO 9606-1: 2 năm, xác nhận mỗi 6 tháng). Chứng chỉ quá hạn = thợ không được hàn dù tay nghề tốt.'},
 {p:26, box:[5,30,91,27], t:'<b>Q4D4 (135 MAG ống):</b> dày 3,0–14,22 mm, Ø ≥84,15, all except vertical down, dip/globular/spray. So với WPS 17 (tới 21,94 mm): thợ chỉ phủ tới 14,22 → "chỉ tới một chiều dày nhất định". Đây là kiểu câu điển hình: WPS phủ nhưng thợ không.'},
 {p:31, box:[0,78,100,22], t:'<b>Bản vẽ — bảng vật liệu:</b> P1–P6 ống Ø200 API 5L dày 10; F1/F2 mặt bích slip-on 400 mm S355; B1–B3, S1–S5 tấm S355 dày 10. Hỏi "mối nối 10 hàn gì?" → tra P1–F1 → ống vào mặt bích → mối hàn GÓC → chỉ WPS 7 là góc.'},
 {p:31, box:[8,2,16,14], t:'<b>Đọc số mối hàn:</b> W10 = P1 với F1 (ống–mặt bích, góc một phía → biến dạng mặt bích). W8 = P2–P3 (giáp mép ống, lắp cố định → cần WPS có PH/H-L045). Quy trình: số mối → hai chi tiết → loại mối hàn → chiều dày/Ø → tư thế lắp → chọn WPS & thợ.'},
 {p:20, box:null, t:'<b>Cách làm bài Work Pack (4 bước):</b> ① đọc câu, gạch chân WPS/chứng chỉ/mối nối được nhắc; ② mở đúng trang, tìm đúng Ô (phạm vi, tư thế, interpass, cực tính…); ③ so sánh con số với yêu cầu; ④ trả lời bằng ngôn ngữ ISO (biến số thiết yếu, phạm vi qualify). Giờ luyện với bộ 📎 Work Pack TWI 20 câu.'}
];
var GI = 0, GOPEN = false;
function renderGuide(){
  var el = document.getElementById('v-thi'); if (!el) return;
  var g = GUIDE[GI], p = WP.find(function(x){ return x.p === g.p; });
  var box = g.box ? '<div style="position:absolute;left:' + g.box[0] + '%;top:' + g.box[1] + '%;width:' + g.box[2] + '%;height:' + g.box[3] + '%;border:3px solid #ff5e54;border-radius:8px;box-shadow:0 0 0 2000px rgba(0,0,0,.45);pointer-events:none;animation:wpPulse 1.2s infinite"></div>' : '';
  el.innerHTML = '<div class="thi-card"><button class="back" onclick="WORKPACK.guideClose()">← Tài liệu thi</button><h2 style="margin-top:8px">👨‍🏫 Hướng dẫn đọc hồ sơ từng ô</h2><p class="thi-muted">Bước ' + (GI + 1) + '/' + GUIDE.length + ' · ' + esc(p ? p.t : '') + '. Vùng khoanh đỏ là ô đang nói tới.</p></div>'
    + '<div class="thi-card"><div class="gb-teacher"><div class="gb-av">👨‍🏫</div><div class="gb-bubble" id="wp-guide-say">' + g.t + '</div></div>'
    + '<div class="thi-row"><button class="btn sec" onclick="WORKPACK.guideGo(-1)" ' + (GI === 0 ? 'disabled style="opacity:.5"' : '') + '>← Trước</button><button class="btn" onclick="WORKPACK.guideGo(1)">' + (GI >= GUIDE.length - 1 ? 'Xong → luyện Work Pack TWI' : 'Tiếp →') + '</button>' + (window.gbSpeak ? '<button class="gb-tbtn" onclick="gbSpeak(\'wp-guide-say\')">🔊 Đọc</button>' : '') + '</div></div>'
    + '<div class="thi-card" style="padding:8px"><div style="position:relative;overflow:hidden;border-radius:10px"><img src="' + BASE + (p ? p.f : '') + '" alt="" style="display:block;width:100%;height:auto;background:#fff" onclick="WORKPACK.modal(' + WP.indexOf(p) + ')">' + box + '</div></div>';
  window.scrollTo(0, 0);
}
var gcss = document.createElement('style'); gcss.textContent = '@keyframes wpPulse{0%,100%{border-color:#ff5e54}50%{border-color:#ffd84d}}'; document.head.appendChild(gcss);
WORKPACK.guide = function(){ GOPEN = true; OPEN = false; GI = 0; renderGuide(); };
WORKPACK.guideGo = function(d){ if (GI + d >= GUIDE.length){ GOPEN = false; try{ THI.quiz('wptwi'); }catch(e){} return; } GI = Math.max(0, GI + d); renderGuide(); };
WORKPACK.guideClose = function(){ GOPEN = false; try{ if (window.THI) THI.back(); }catch(e){} };
(function(){ var oi = inject; inject = function(){ if (GOPEN){ var el = document.getElementById('v-thi'); if (el && el.classList.contains('on') && !el.querySelector('#wp-guide-say')) renderGuide(); return; } return oi(); }; })();

/* thẻ trong menu Tài liệu thi */
function inject(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  if (OPEN){ if (!el.querySelector('.wp-page')) renderViewer(); return; }
  if (el.querySelector('#wp-card')) return;
  var first = el.querySelector('.thi-card'); if (!first) return;
  var mh2 = first.querySelector('h2'); if (!mh2 || !/^📖/.test(mh2.textContent.trim())) return; // chỉ ở màn menu
  var d = document.createElement('div'); d.className = 'thi-card'; d.id = 'wp-card'; d.style.borderLeft = '3px solid var(--yellow,#ffd60a)';
  d.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">📎</div><div style="flex:1"><b>Hồ sơ Work Pack mẫu TWI</b><span class="thi-tag">' + WP.length + ' trang</span><span class="thi-tag">WPS · chứng chỉ thợ · bản vẽ</span><div class="thi-muted">Tập đọc WPS 7/9/17/25, chứng chỉ Q1D4–Q4D4 và bản vẽ TRAIN 1 như đề Work Pack thật. Kèm gợi ý của thầy cho từng trang.</div></div></div>'
    + '<div class="thi-row"><button class="btn" onclick="WORKPACK.guide()">👨‍🏫 Hướng dẫn đọc từng ô</button><button class="btn sec" onclick="WORKPACK.open(0)">📖 Mở hồ sơ</button><button class="btn sec" onclick="WORKPACK.open(10)">Bản vẽ TRAIN 1</button></div>';
  first.insertAdjacentElement('afterend', d);
}
new MutationObserver(function(){ try{ inject(); injectSetBtn(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
/* đổi tab thì đóng viewer */
if (typeof window.go === 'function' && !window._wpGoWrapped){ var og = window.go; window.go = function(t){ if (t !== 'thi'){ OPEN = false; GOPEN = false; } return og.apply(this, arguments); }; window._wpGoWrapped = true; }
inject();
})();
