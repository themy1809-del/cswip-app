/* ============================================================
   THUCHANH — 🔧 Thi THỰC HÀNH (plate / pipe segment) theo cách TWI
   Nguồn: phụ lục WIS5 "Practical explanation" + bảng tiêu chí chấp
   nhận TWI nhóm A/B/C cho 13 loại khuyết tật (A→M).
   - Cách thi: 3 câu hỏi cho mỗi mẫu (nhận dạng; không đạt nhóm A;
     không đạt nhóm C), kiểm cả mặt và chân, trừ điểm nếu đánh X bừa.
   - Bảng tiêu chí A/B/C (số liệu đúng theo phụ lục) + ảnh thật từ
     giáo trình cho từng loại khuyết tật + bài tập "sentence" mẫu.
   Gắn thẻ vào tab 📖 Tài liệu thi và lối tắt ở Tổng quan.
   ============================================================ */
(function(){
'use strict';
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
var OPEN = false, SEL = {};
/* 13 loại khuyết tật trong tiêu chí TWI (phụ lục). vi: tên Việt; A/B/C: giới hạn; fig: từ khóa ảnh sách */
var CRIT = [
 {k:'A', en:'Excess weld metal', vi:'Kim loại đắp thừa (mặt)', rem:'Kim loại hàn nhô trên bề mặt tấm', A:'Tối đa 2 mm', B:'Tối đa 3 mm', C:'Tối đa 5 mm', fig:'excess weld metal'},
 {k:'B', en:'Under fill', vi:'Rãnh chưa điền đầy (underfill)', rem:'Kim loại hàn thấp hơn bề mặt tấm', A:'Không cho phép', B:'Không cho phép', C:'Dài tối đa 5 mm', fig:'incompletely filled'},
 {k:'C', en:'Slag / silica inclusions', vi:'Ngậm xỉ / silica', rem:'Tạp phi kim trong kim loại hàn hoặc giữa mối hàn và nền', A:'Không cho phép', B:'Mỗi vết ≤10 mm liên tục/ngắt quãng; tổng cộng ≤10 mm', C:'Mỗi vết ≤20 mm; tổng cộng ≤20 mm', fig:'slag inclusions'},
 {k:'D', en:'Undercut', vi:'Cháy chân (undercut)', rem:'Rãnh khoét vào nền ở ngón mối hàn (mặt, chân hoặc giữa các lớp)', A:'Không có chỉ thị sắc, chuyển tiếp mượt; dài ≤5 mm, tổng ≤5 mm; sâu ≤1 mm (mặt); chân: không cho phép', B:'Chuyển tiếp mượt; dài ≤10 mm, tổng ≤10 mm; sâu ≤1,5 mm (mặt); chân: không cho phép', C:'Dài ≤25 mm, tổng ≤25 mm; sâu ≤3 mm cho cả mặt và chân', fig:'undercut'},
 {k:'E', en:'Stop / starts', vi:'Điểm dừng/nối (stop-start)', rem:'Không được lộ hõm cuối của đường hàn trước tại chỗ nối', A:'Hai điểm nối cách nhau ≥30 mm', B:'≥20 mm', C:'≥10 mm', fig:'crater'},
 {k:'F', en:'Lack of sidewall fusion / laps / cold laps', vi:'Không ngấu thành bên / tràn / cold lap', rem:'Không hòa tan giữa kim loại hàn và nền, hoặc giữa các lớp', A:'Không cho phép', B:'Hở bề mặt: ≤15 mm liên tục/ngắt quãng; tổng ≤15 mm', C:'Như B: ≤15 mm, tổng ≤15 mm', fig:'overlap'},
 {k:'G', en:'Arc strikes', vi:'Vết mồi hồ quang (arc strike)', rem:'Hư hại nền/mối hàn do chạm que hoặc nguồn điện', A:'Không cho phép', B:'Cho phép 1 vết', C:'Cho phép 2 vết', fig:'stray arc'},
 {k:'H', en:'Mechanical damage', vi:'Hư hại cơ học', rem:'Hư hại nền/mối hàn (trừ dấu đóng cứng, pop mark); mối hàn đính lạc', A:'Không có đính lạc; nền phải mài mượt; sâu ≤0,5 mm; chỉ 1 vị trí', B:'Không có đính lạc; mài mượt; sâu ≤1 mm; 1 vị trí', C:'Cho phép 1 đính lạc; mài mượt; sâu ≤1,5 mm; tối đa 2 vị trí', fig:'temper colour'},
 {k:'I', en:'Penetration (excess)', vi:'Ngấu chân quá mức', rem:'Kim loại hàn nhô dưới mặt nền ở chân mối nối', A:'Cao tối đa 2 mm', B:'Tối đa 3 mm', C:'Tối đa 4 mm', fig:'excess penetration'},
 {k:'J', en:'Lack of root penetration', vi:'Không thấu chân', rem:'Thiếu kim loại hàn ở chân, lộ cả hai mặt chân', A:'Dài tối đa 5 mm', B:'Tối đa 10 mm', C:'Tối đa 15 mm', fig:'incomplete root penetration'},
 {k:'K', en:'Lack of root fusion', vi:'Không ngấu chân (một mặt chân)', rem:'Không ngấu trên một mặt chân', A:'Tối đa 4 mm liên tục/ngắt quãng', B:'Tối đa 10 mm', C:'Tối đa 25 mm', fig:'lack of root fusion'},
 {k:'L', en:'Burn through', vi:'Cháy thủng', rem:'Chân mối hàn bị sụp', A:'Không cho phép', B:'Cho phép 1 vùng', C:'Cho phép 2 vùng', fig:'burn-through'},
 {k:'M', en:'Root concavity', vi:'Lõm chân', rem:'Kim loại hàn thấp hơn bề mặt cả hai tấm nền ở chân', A:'Không cho phép', B:'Dài tối đa 10 mm', C:'Dài tối đa 20 mm', fig:'root concavity'}
];
var FIGS_BY_KEY = {};
function bookFig(words){ if (!window.BOOK) return null; var f = BOOK.match(4, words, 1); return f && f[0] ? f[0] : null; }

var css = document.createElement('style');
css.textContent = [
'.th-tbl{width:100%;border-collapse:collapse;font-size:12.5px;line-height:1.45}',
'.th-tbl th,.th-tbl td{border:1px solid var(--line);padding:6px 8px;vertical-align:top;text-align:left}',
'.th-tbl th{background:var(--ink);color:var(--accent2);white-space:nowrap}',
'.th-tbl td.k{font-weight:800;color:var(--accent);white-space:nowrap}',
'.th-tbl td.no{color:var(--red);font-weight:600}',
'.th-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;margin-top:10px}',
'.th-card{border:1px solid var(--line);border-radius:12px;padding:10px;background:var(--panel2)}',
'.th-card b{color:var(--accent)}',
'.th-card .lim{font-size:12px;margin-top:6px;line-height:1.5}',
'.th-card .lim span{display:inline-block;min-width:16px;font-weight:800}',
'.th-ex{display:grid;grid-template-columns:auto 1fr 1fr;gap:8px;align-items:center;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13px}',
'.th-ex .cb{display:flex;gap:4px}',
'.th-ex .cb button{width:30px;height:28px;border-radius:7px;border:1px solid var(--line);background:none;color:var(--txt);cursor:pointer;font-weight:700}',
'.th-ex .cb button.on{background:var(--accent2);color:#fff;border-color:var(--accent2)}',
'.th-ex .cb button.ok{background:var(--green);color:#fff;border-color:var(--green)}.th-ex .cb button.bad{background:var(--red);color:#fff;border-color:var(--red)}',
'@media(max-width:600px){.th-ex{grid-template-columns:1fr;gap:4px}}'
].join('\n');
document.head.appendChild(css);

/* ---------- bài tập "sentence" mẫu: 3 mẫu giả định ---------- */
var SAMPLES = [
 {name:'Mẫu 1 (plate, mặt + chân)', found:['A', 'D', 'G', 'I', 'M'], detail:{A:'kim loại đắp thừa cao 2,5 mm', D:'cháy chân mặt dài 8 mm, sâu 1,2 mm', G:'1 vết mồi hồ quang', I:'ngấu chân cao 2,5 mm', M:'lõm chân dài 8 mm'}},
 {name:'Mẫu 2 (pipe, mặt + chân)', found:['C', 'E', 'J', 'L'], detail:{C:'ngậm xỉ bề mặt dài 12 mm', E:'2 điểm nối cách nhau 15 mm', J:'không thấu chân dài 12 mm', L:'1 vùng cháy thủng'}},
 {name:'Mẫu 3 (plate, góc)', found:['B', 'F', 'H', 'K'], detail:{B:'rãnh chưa điền đầy dài 4 mm', F:'cold lap bề mặt dài 20 mm', H:'hư hại cơ học sâu 0,8 mm, 1 vị trí', K:'không ngấu chân 6 mm'}}
];
/* đáp án không đạt nhóm A / nhóm C cho từng mẫu — tính theo bảng */
function notOK(sample, grp){
  var out = [];
  sample.found.forEach(function(k){
    var d = sample.detail[k];
    var bad = false;
    if (grp === 'A'){ bad = {A:/2,5/.test(d), B:true, C:true, D:true, E:true, F:true, G:true, H:/0,8/.test(d), I:/2,5/.test(d), J:/12/.test(d), K:/6/.test(d), L:true, M:true}[k]; }
    else { bad = {A:false, B:false, C:false, D:false, E:false, F:/20/.test(d), G:false, H:false, I:false, J:false, K:false, L:false, M:false}[k]; }
    if (bad) out.push(k);
  });
  return out;
}
window.TH = {
  open:function(){ OPEN = true; render(); },
  close:function(){ OPEN = false; SEL = {}; try{ if (window.THI) THI.back(); }catch(e){} },
  tick:function(s, grp, k){ var key = s + grp; SEL[key] = SEL[key] || {}; SEL[key][k] = !SEL[key][k]; render(); },
  check:function(s){ SEL['chk' + s] = true; render(); },
  reset:function(s){ delete SEL['chk' + s]; delete SEL[s + 'A']; delete SEL[s + 'C']; render(); }
};
function render(){
  var el = document.getElementById('v-thi'); if (!el || !OPEN) return;
  var h = '<div class="thi-card"><button class="back" onclick="TH.close()">← Tài liệu thi</button><h2 style="margin-top:8px">🔧 Thi thực hành (plate / pipe) — cách TWI chấm</h2>'
    + '<p class="thi-muted" style="margin-top:6px;line-height:1.6">Phần thực hành bạn nhận mẫu hàn thật (tấm hoặc ống) và phải <b>nhìn cả mặt lẫn chân</b>, nhận dạng khuyết tật trong danh sách 13 loại (A→M) rồi "kết án" theo tiêu chí. Mỗi mẫu luôn hỏi đúng <b>3 câu</b>: ① nhận dạng được khuyết tật nào; ② khuyết tật nào <b>không đạt nhóm A</b> (khắt khe nhất); ③ khuyết tật nào <b>không đạt nhóm C</b> (lỏng nhất). Đậu từ 70%, <b>đánh X sai bị trừ điểm</b> → chỉ đánh khi chắc.</p></div>';
  // quy trình
  h += '<div class="thi-card"><h3 style="margin:0 0 6px">👨‍🏫 Quy trình làm bài trong phòng thi</h3><ul class="lesson">'
    + '<li><b>Đo trước, kết luận sau.</b> Dùng dưỡng hàn đo chiều cao đắp thừa, chiều cao ngấu chân, độ sâu cháy chân; thước đo chiều dài vết ngậm xỉ/cháy chân/không thấu. Con số quyết định nhóm.</li>'
    + '<li><b>Lướt theo danh sách A→M</b>, không nhìn ngẫu nhiên: A đắp thừa → B underfill → C xỉ → D undercut → E stop-start → F LOF/cold lap → G arc strike → H hư hại cơ học → I ngấu quá → J không thấu → K không ngấu chân → L cháy thủng → M lõm chân.</li>'
    + '<li><b>Chân mối hàn chiếm 5/13 loại</b> (I, J, K, L, M) — lật mẫu, soi kỹ chân bằng đèn và lúp 2–2,5×.</li>'
    + '<li><b>Nhóm A</b>: hầu hết "không cho phép" hoặc giới hạn rất nhỏ (2 mm, 5 mm, 1 mm). <b>Nhóm C</b>: nới rộng (5 mm, 25 mm, 3 mm) nhưng vẫn có giới hạn — đừng mặc định "C cái gì cũng được".</li>'
    + '<li>Đánh X <b>có mục đích</b>: mỗi X sai bị trừ. Không chắc → để trống.</li></ul></div>';
  // bảng tiêu chí
  h += '<div class="thi-card"><h3 style="margin:0 0 6px">📋 Tiêu chí chấp nhận TWI — 13 loại khuyết tật, 3 nhóm</h3><p class="thi-muted">Chép đúng từ phụ lục WIS5 "Practical explanation". Nhóm A khắt khe nhất, C lỏng nhất. Chạm ảnh để xem khuyết tật thật trong giáo trình.</p>'
    + '<div class="tbl-wrap"><table class="th-tbl"><thead><tr><th>#</th><th>Khuyết tật</th><th>Nhóm A</th><th>Nhóm B</th><th>Nhóm C</th></tr></thead><tbody>'
    + CRIT.map(function(c){ function cell(v){ return '<td class="' + (/^Không cho phép/.test(v) ? 'no' : '') + '">' + esc(v) + '</td>'; } return '<tr><td class="k">' + c.k + '</td><td><b>' + esc(c.vi) + '</b><div class="thi-muted">' + esc(c.en) + ' — ' + esc(c.rem) + '</div></td>' + cell(c.A) + cell(c.B) + cell(c.C) + '</tr>'; }).join('')
    + '</tbody></table></div></div>';
  // ảnh thật
  if (window.BOOK){
    h += '<div class="thi-card"><h3 style="margin:0 0 6px">📷 Nhận mặt 13 loại bằng ảnh thật trong giáo trình</h3><div class="th-grid">'
      + CRIT.map(function(c){ var f = bookFig(c.fig); return '<div class="th-card"><b>' + c.k + '. ' + esc(c.vi) + '</b>' + (f ? BOOK.img(f) + BOOK.cap(f) : '<div class="thi-muted" style="margin-top:6px">(chưa có ảnh)</div>') + '<div class="lim"><span style="color:var(--red)">A</span> ' + esc(c.A) + '<br><span style="color:var(--accent)">B</span> ' + esc(c.B) + '<br><span style="color:var(--green)">C</span> ' + esc(c.C) + '</div></div>'; }).join('')
      + '</div></div>';
  }
  // bài tập
  h += '<div class="thi-card"><h3 style="margin:0 0 6px">✍️ Tập "kết án" 3 mẫu giả định</h3><p class="thi-muted">Mỗi mẫu cho sẵn các khuyết tật đo được (mô phỏng câu 1). Bạn đánh dấu khuyết tật <b>không đạt nhóm A</b> và <b>không đạt nhóm C</b> rồi chấm. Luyện phản xạ tra bảng.</p>';
  SAMPLES.forEach(function(s, si){
    var chk = SEL['chk' + si], ansA = notOK(s, 'A'), ansC = notOK(s, 'C');
    h += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line)"><b>' + esc(s.name) + '</b><div class="thi-muted" style="margin:4px 0 6px">Câu 1 — nhận dạng được: ' + s.found.map(function(k){ var c = CRIT.find(function(x){ return x.k === k; }); return '<b>' + k + '</b> ' + esc(c.vi) + ' (' + esc(s.detail[k]) + ')'; }).join(' · ') + '</div>';
    h += '<div class="th-ex" style="font-weight:700;border-bottom:1px solid var(--line)"><div></div><div>Câu 2 — không đạt nhóm A</div><div>Câu 3 — không đạt nhóm C</div></div>';
    s.found.forEach(function(k){
      function btn(grp, ans){ var on = SEL[si + grp] && SEL[si + grp][k]; var cls = on ? ' on' : ''; if (chk){ var should = ans.indexOf(k) >= 0; if (on && should) cls = ' ok'; else if (on && !should) cls = ' bad'; else if (!on && should) cls = ' bad'; } return '<div class="cb"><button class="' + cls + '" onclick="TH.tick(' + si + ',\'' + grp + '\',\'' + k + '\')">' + (on ? 'X' : '') + '</button>' + (chk ? '<span class="thi-muted" style="font-size:11.5px;align-self:center">' + (ans.indexOf(k) >= 0 ? 'đúng là X' : 'để trống') + '</span>' : '') + '</div>'; }
      h += '<div class="th-ex"><div><b>' + k + '</b> ' + esc(s.detail[k]) + '</div>' + btn('A', ansA) + btn('C', ansC) + '</div>';
    });
    h += '<div class="thi-row">' + (chk ? '<button class="btn sec" onclick="TH.reset(' + si + ')">↺ Làm lại</button>' : '<button class="btn" onclick="TH.check(' + si + ')">Chấm</button>') + '</div>';
    if (chk) h += '<div class="thi-exp" style="margin-top:8px"><div class="vq">Giải thích</div><div class="va">Nhóm A: ' + (ansA.length ? ansA.map(function(k){ return k + ' (' + esc(s.detail[k]) + ')'; }).join('; ') : 'không có') + '.<br>Nhóm C: ' + (ansC.length ? ansC.map(function(k){ return k + ' (' + esc(s.detail[k]) + ')'; }).join('; ') : 'không có — tất cả nằm trong giới hạn nhóm C') + '.</div></div>';
    h += '</div>';
  });
  h += '</div>';
  el.innerHTML = h; window.scrollTo(0, 0);
}
/* thẻ trong menu Tài liệu thi */
function inject(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  if (OPEN){ if (!el.querySelector('.th-tbl')) render(); return; }
  if (el.querySelector('#th-card')) return;
  var first = el.querySelector('.thi-card'); if (!first) return; var mh2 = first.querySelector('h2'); if (!mh2 || !/^📖/.test(mh2.textContent.trim())) return;
  var d = document.createElement('div'); d.className = 'thi-card'; d.id = 'th-card'; d.style.borderLeft = '3px solid var(--green)';
  d.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">🔧</div><div style="flex:1"><b>Thi thực hành (plate/pipe) — cách TWI chấm</b><span class="thi-tag">13 loại khuyết tật</span><span class="thi-tag">nhóm A/B/C</span><div class="thi-muted">3 câu hỏi cho mỗi mẫu, bảng tiêu chí chấp nhận đúng theo phụ lục, ảnh thật từng loại, bài tập kết án có chấm.</div></div></div><div class="thi-row"><button class="btn" onclick="TH.open()">🔧 Mở bài thực hành</button></div>';
  var anchor = el.querySelector('#wp-card') || first; anchor.insertAdjacentElement('afterend', d);
}
new MutationObserver(function(){ try{ inject(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
if (typeof window.go === 'function' && !window._thGoWrapped){ var og = window.go; window.go = function(t){ if (t !== 'thi'){ OPEN = false; } return og.apply(this, arguments); }; window._thGoWrapped = true; }
inject();
})();
