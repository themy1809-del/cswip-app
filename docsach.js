/* ============================================================
   DOCSACH — 📖 ĐỌC HẾT GIÁO TRÌNH WIS5 & HỌC ĐỂ NGẤM
   Dữ liệu: book_wis5.js (window.WIS5 — 24 phần, ~120 mục, văn bản
   tiếng Anh gốc, bảng, gạch đầu dòng, 223 hình). Mỗi mục:
     🇻🇳 thầy tóm tắt trước (giảng giải + ý chính VI của chương tương ứng)
     → đọc tiếng Anh gốc (thuật ngữ gạch chân, chạm là ra nghĩa; đọc giọng Anh)
     → 🧠 "Ngấm chưa?": câu đề thật về đúng mục đó, tự trả lời rồi mở đáp án
     → ✅ đánh dấu đã ngấm, sang mục tiếp. Nhớ vị trí, kế hoạch đọc tới ngày thi.
   Nạp SAU chuong.js/tienganh.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function' || !window.WIS5) return;
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, jsq(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function strip(h){ return String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
function jsq(v){ return JSON.stringify(v).replace(/"/g, '&quot;'); }
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, would:1, following:1, most:1, likely:1, when:1, used:1, type:1, welding:1, weld:1, welds:1, during:1, should:1, can:1, not:1, than:1, into:1, if:1, has:1, have:1, its:1, all:1, one:1, two:1, may:1, will:1, these:1, there:1, their:1, more:1, less:1, some:1, any:1, out:1, does:1, do:1, also:1, about:1, been:1, was:1, were:1, but:1, after:1, before:1, between:1, where:1, how:1, why:1, who:1, so:1, no:1, yes:1, use:1, using:1, made:1, make:1, such:1, other:1, each:1, very:1, must:1, only:1, both:1, then:1, over:1, under:1, up:1, down:1, through:1};
function words(s){ return String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
function wset(s){ var o = {}; words(s).forEach(function(w){ o[w] = 1; }); return o; }
function overlap(set, s){ var n = 0, seen = {}; words(s).forEach(function(w){ if (set[w] && !seen[w]){ seen[w] = 1; n++; } }); return n; }

var VI = window.WIS5_VI || {titles:{}, intro:{}, para:{}};
function tvi(id){ return (VI.titles || {})[id] || ''; }
var SECS = WIS5.sections;                       // tất cả (phần + mục)
var SUBS = SECS.filter(function(s){ return s.id.indexOf('.') > 0; });   // mục con có nội dung
var TOPS = SECS.filter(function(s){ return s.id.indexOf('.') < 0; });
var BYID = {}; SECS.forEach(function(s){ BYID[s.id] = s; });
function subsOf(top){ var pre = top.id + '.'; return SUBS.filter(function(s){ return s.id.indexOf(pre) === 0; }); }
function secText(s){ return s.blocks.map(function(b){ return b.en || (b.items || []).join(' ') || (b.rows || []).map(function(r){ return r.join(' '); }).join(' ') || ''; }).join(' '); }

/* ---------- tiến độ ---------- */
var P = LS('cswip_sach', {}); P.done = P.done || {}; P.font = P.font || 16; if (P.vi == null) P.vi = 1;
function save(){ SV('cswip_sach', P); }
function dkey(){ var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function doneCount(){ return Object.keys(P.done).filter(function(k){ return BYID[k]; }).length; }
function todayDone(){ if (!P.day || P.day.k !== dkey()){ P.day = {k:dkey(), d0:doneCount()}; save(); } return Math.max(0, doneCount() - P.day.d0); }
function daysLeft(){ try{ if (window.NR && NR.daysLeft) return NR.daysLeft(); var v = localStorage.getItem('cswip_exam_date'); if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) v = '2026-12-23'; var e = new Date(v + 'T00:00:00'), n = new Date(); n.setHours(0, 0, 0, 0); return Math.round((e - n) / 864e5); }catch(e){ return 45; } }
function goal(){ var left = SUBS.length - doneCount(), d = Math.max(1, daysLeft() - 5); return left <= 0 ? 0 : Math.max(2, Math.ceil(left / d)); }
var PRIO = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];
var ORDERED = SUBS.slice().sort(function(a, b){ var pa = PRIO.indexOf(a.ci), pb = PRIO.indexOf(b.ci); if (pa !== pb) return pa - pb; return SUBS.indexOf(a) - SUBS.indexOf(b); });
function remaining(){ return ORDERED.filter(function(s){ return !P.done[s.id]; }); }
function nextUnread(fromId){ var cur = fromId ? BYID[fromId] : null; if (cur){ var pre = cur.id.split('.')[0] + '.'; var i = SUBS.indexOf(cur); for (var k = i + 1; k < SUBS.length; k++){ if (SUBS[k].id.indexOf(pre) === 0 && !P.done[SUBS[k].id]) return SUBS[k]; } } var rem = remaining(); return rem.length ? rem[0] : null; }
window.sachPlanDay = function(k){ var g = goal(); if (!g) return []; return remaining().slice(k * g, (k + 1) * g).map(function(s){ return s.id + ' ' + s.t; }); };
window.sachOrder = function(){ return ORDERED.map(function(s){ return s.id; }); };
window.sachStats = function(){ todayDone(); var nx = (P.pos && BYID[P.pos] && !P.done[P.pos]) ? BYID[P.pos] : nextUnread(P.pos); return {done:doneCount(), total:SUBS.length, today:todayDone(), goal:goal(), next:nx ? nx.id : null, nextTitle:nx ? nx.t : ''}; };

/* ---------- gắn kiến thức tiếng Việt của app vào mục sách ---------- */
function viFor(s){
  var c = DATA.chapters[s.ci], set = wset(s.t + ' ' + secText(s).slice(0, 4000));
  var deep = null, bs = 0; (c.deep || []).forEach(function(b){ var sc = overlap(set, (b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ')); if (sc > bs){ bs = sc; deep = b; } });
  var les = (c.lessons || []).map(function(L, li){ return {L:L, li:li, s:overlap(set, (L.t_en || '') + ' ' + (L.en || ''))}; }).filter(function(x){ return x.s >= 2; }).sort(function(a, b){ return b.s - a.s; }).slice(0, 4);
  var pts = ((window.HOCDE && HOCDE.byChapter[s.ci]) || []).map(function(p){ return {p:p, s:overlap(set, p.q + ' ' + (p.opts ? p.opts.join(' ') : p.ans || ''))}; }).filter(function(x){ return x.s >= 2; }).sort(function(a, b){ return b.s - a.s; }).slice(0, 3).map(function(x){ return x.p; });
  return {c:c, deep:bs >= 4 ? deep : null, les:les, pts:pts};
}

/* ---------- thuật ngữ: gạch chân, chạm là ra nghĩa ---------- */
var G = window.GLOSSARY || {}, TERM_RE = null;
function termRe(){ if (TERM_RE) return TERM_RE; var keys = Object.keys(G).filter(function(k){ return k.length >= 4 && /^[a-z0-9 \-\/]+$/.test(k); }).sort(function(a, b){ return b.length - a.length; }); TERM_RE = new RegExp('\\b(' + keys.map(function(k){ return k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); }).join('|') + ')\\b', 'gi'); return TERM_RE; }
function mark(en){ return esc(en).replace(termRe(), function(m){ return '<span class="bk-term" data-k="' + esc(m.toLowerCase()) + '">' + m + '</span>'; }); }
window.sachTerm = function(el){
  var k = el.getAttribute('data-k'), vi = G[k]; if (!vi) return;
  var pop = document.getElementById('bk-pop'); if (!pop){ pop = document.createElement('div'); pop.id = 'bk-pop'; document.body.appendChild(pop); pop.addEventListener('click', function(e){ e.stopPropagation(); }); }
  pop.innerHTML = '<b>' + esc(k) + '</b> <button class="en-sp" onclick="entSpeak(' + jsq(k) + ')">🔊</button><div>' + esc(vi) + '</div>';
  var r = el.getBoundingClientRect(); pop.style.display = 'block'; pop.style.left = Math.max(8, Math.min(window.innerWidth - 300, r.left)) + 'px'; pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
};
document.addEventListener('click', function(e){ var t = e.target; if (t && t.classList && t.classList.contains('bk-term')){ e.stopPropagation(); sachTerm(t); return; } var pop = document.getElementById('bk-pop'); if (pop) pop.style.display = 'none'; });

/* ---------- đọc giọng Anh cả mục ---------- */
var SPK = {on:false, q:[], i:0};
window.sachSpeak = function(id){
  if (!('speechSynthesis' in window)){ T('Trình duyệt không hỗ trợ đọc giọng'); return; }
  if (SPK.on){ SPK.on = false; speechSynthesis.cancel(); render(); return; }
  var s = BYID[id]; if (!s) return;
  SPK.q = [s.t].concat(s.blocks.map(function(b){ return b.en || (b.items || []).join('. ') || ''; }).filter(Boolean)); SPK.i = 0; SPK.on = true; render();
  (function nx(){ if (!SPK.on || SPK.i >= SPK.q.length){ SPK.on = false; render(); return; } var u = new SpeechSynthesisUtterance(SPK.q[SPK.i++]); u.lang = 'en-GB'; u.rate = 0.95; u.onend = nx; u.onerror = nx; speechSynthesis.speak(u); })();
};

/* ---------- 📝 sổ tay tóm tắt viết tay (12 trang scan) ---------- */
var SOTAY = [
  {f:'p-01.jpg', t:'Nhiệm vụ thanh tra · Thuật ngữ & định nghĩa · Khuyết tật (nứt 4 loại, weld decay) · NDT: PT / MT / RT / UT', ci:[0, 15, 4, 6]},
  {f:'p-02.jpg', t:'Kiểm tra phá hủy: kéo, va đập, độ cứng, macro · Ký hiệu hàn (ISO 2553 / AWS 2.4)', ci:[5, 3]},
  {f:'p-03.jpg', t:'WPS/Thợ hàn: biến số thiết yếu, phạm vi dày · Quá trình hàn: cực tính, CC/CV, chọn quá trình, OCV', ci:[7, 1]},
  {f:'p-04.jpg', t:'MMA (BS EN 2560 / AWS A5.1) · TIG · FCAW · SAW', ci:[1, 2]},
  {f:'p-05.jpg', t:'MIG/MAG: khí, CTWD, chuyển dịch (dip / spray / pulse / globular), biến số', ci:[1]},
  {f:'p-06.jpg', t:'Vật liệu hàn (sơ đồ): khí bảo vệ, que MMA, dây TIG, flux SAW', ci:[2]},
  {f:'p-07.jpg', t:'Mã que hàn BS EN 499 / AWS A5.1 / A5.5 · khí TIG & MIG/MAG theo vật liệu', ci:[2]},
  {f:'p-08.jpg', t:'Tính hàn: nguyên tố hợp kim, CE, hydro, nứt nguội / nứt nóng / lamellar tearing', ci:[8]},
  {f:'p-09.jpg', t:'Xử lý nhiệt: tôi, thường hóa, ủ, ram, PWHT · tiền nhiệt, giản đồ Fe–C', ci:[9]},
  {f:'p-10.jpg', t:'Hot shortness · An toàn hồ quang · Ứng suất dư & biến dạng', ci:[8, 14, 10]},
  {f:'p-11.jpg', t:'Bảng tiêu chí chấp nhận tấm (thi thực hành)', ci:[4]},
  {f:'p-12.jpg', t:'Sơ đồ nguyên nhân khuyết tật (mind map) · 30 câu hỏi mẫu', ci:[4]}
];
window.SOTAY = SOTAY;
window.sotayHTML = function(ci, compact){
  var pages = SOTAY.map(function(x, i){ x.i = i; return x; }).filter(function(x){ return ci == null || x.ci.indexOf(ci) >= 0; });
  if (!pages.length) return '';
  return '<div class="st-grid">' + pages.map(function(x){ return '<div class="st-pg" onclick="sachSotay(' + x.i + ')"><img src="img_book/sotay/' + x.f + '" loading="lazy" alt="Sổ tay trang ' + (x.i + 1) + '"><div class="st-cap"><b>Trang ' + (x.i + 1) + '</b>' + (compact ? '' : ' · ' + esc(x.t)) + '</div></div>'; }).join('') + '</div>';
};
window.sachSotay = function(i){ S.view = 'sotay'; S.st = i == null ? -1 : i; if (CUR !== 'sach') go('sach'); else render(); window.scrollTo(0, 0); };
function sotayView(el){
  var i = S.st, x = i >= 0 ? SOTAY[i] : null;
  var h = '<div class="card"><button class="back" onclick="sachToc()">← Mục lục sách</button><h2 style="margin:4px 0">📝 Sổ tay tóm tắt viết tay (12 trang)</h2><p class="muted" style="line-height:1.6">Bản tóm tắt tay cả khóa: sơ đồ, con số, mẹo thi. Dùng để ôn nhanh sau khi đã đọc mục tương ứng, và lướt lại mỗi ngày trong tuần cuối. Chạm trang để phóng to; trên điện thoại dùng hai ngón để zoom.</p></div>';
  if (x) h += '<div class="card" style="padding:10px"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px"><b>Trang ' + (i + 1) + '/12 — ' + esc(x.t) + '</b><div class="row" style="gap:4px">' + (i > 0 ? '<button class="gb-tbtn" onclick="sachSotay(' + (i - 1) + ')">← Trang trước</button>' : '') + (i < 11 ? '<button class="gb-tbtn" onclick="sachSotay(' + (i + 1) + ')">Trang sau →</button>' : '') + '</div></div><a href="img_book/sotay/' + x.f + '" target="_blank" rel="noopener"><img src="img_book/sotay/' + x.f + '" style="width:100%;border-radius:8px;margin-top:8px" alt="Sổ tay trang ' + (i + 1) + '"></a><div class="muted" style="font-size:12px;margin-top:4px">Chương liên quan: ' + x.ci.map(function(c){ return '<button class="gb-tbtn" onclick="chStart(' + c + ')">📗 ' + esc(DATA.chapters[c].vi) + '</button>'; }).join(' ') + '</div></div>';
  h += '<div class="card"><h3 style="margin:0 0 8px">Tất cả trang</h3>' + sotayHTML(null, false) + '</div>';
  el.innerHTML = '<div class="ch-wrap">' + h + '</div>';
}

/* ---------- vẽ ---------- */
var S = {view:'toc', id:null, filterCi:null, open:{}, reveal:{}};
function blockHTML(b){
  if (b.t === 'p'){ var pv = P.vi && VI.para ? VI.para[String(b.en).slice(0, 48)] : null; return '<p class="bk-p">' + mark(b.en) + '</p>' + (pv ? '<div class="bk-pvi">🇻🇳 ' + esc(pv) + '</div>' : ''); }
  if (b.t === 'h') return '<h4 class="bk-h">' + mark(b.en) + '</h4>';
  if (b.t === 'ul') return '<ul class="bk-ul">' + b.items.map(function(i){ return '<li>' + mark(i) + '</li>'; }).join('') + '</ul>';
  if (b.t === 'tbl'){ var head = /^(causes|prevention|description)/i.test(b.rows[0][0] || '') || b.rows[0].length === 2 && /^[A-Z][a-z]+$/.test(b.rows[0][1] || ''); return '<div class="bk-tw"><table class="bk-tbl">' + b.rows.map(function(r, i){ return '<tr>' + r.map(function(c){ return (i === 0 && head ? '<th>' : '<td>') + mark(c) + (i === 0 && head ? '</th>' : '</td>'); }).join('') + '</tr>'; }).join('') + '</table></div>'; }
  if (b.t === 'fig'){ if (!window.BOOK) return ''; var f = null; try{ f = BOOK.figs.filter(function(x){ return x.f === b.f; })[0]; }catch(e){} return f ? '<figure class="bk-fig">' + BOOK.img(f) + BOOK.cap(f) + '</figure>' : ''; }
  if (b.t === 'cap') return '<div class="muted" style="font-size:12.5px;margin:4px 0">' + esc(b.en) + '</div>';
  return '';
}
function tocView(el){
  var st = sachStats(), pct = Math.round(st.done / st.total * 100), nx = st.next ? BYID[st.next] : null;
  var h = '<div class="card bk-hero"><h2 style="margin:0">📖 Đọc hết giáo trình WIS5 — học để ngấm</h2><p class="muted" style="margin-top:6px;line-height:1.6">Toàn bộ sách TWI (24 phần, ' + st.total + ' mục, ' + (window.BOOK ? BOOK.figs.length : 223) + ' hình). Mỗi mục: thầy tóm tắt tiếng Việt → đọc nguyên văn tiếng Anh (chạm thuật ngữ để xem nghĩa, 🔊 nghe đọc) → trả lời câu đề thật về đúng mục đó → đánh dấu đã ngấm.</p>'
    + '<div class="nr-grid" style="margin-top:10px"><div class="nr-stat"><b style="color:var(--accent2)">' + st.done + '<small style="font-size:13px;color:var(--muted)">/' + st.total + '</small></b><span>mục đã ngấm (' + pct + '%)</span></div><div class="nr-stat"><b style="color:' + (st.today >= st.goal ? 'var(--green)' : 'var(--accent)') + '">' + st.today + '<small style="font-size:13px;color:var(--muted)">/' + st.goal + '</small></b><span>mục hôm nay (kế hoạch để đọc xong trước ngày thi 5 ngày)</span></div><div class="nr-stat"><b>' + Math.max(0, st.total - st.done) + '</b><span>mục còn lại</span></div></div>'
    + '<div class="nr-bar" style="height:10px;margin:10px 0"><i style="width:' + pct + '%;background:linear-gradient(90deg,var(--accent2),var(--green))"></i></div>'
    + (function(){ var r = remaining().slice(0, Math.max(3, st.goal)); return r.length ? '<div class="muted" style="font-size:12.5px;margin-bottom:8px">📅 Hôm nay đọc (theo thứ tự chương hay ra đề, cùng chương đang học): ' + r.map(function(s){ return '<b style="color:var(--txt)">' + s.id + '</b> ' + esc(s.t) + ' <span class="muted">(' + esc(DATA.chapters[s.ci].vi) + ')</span>'; }).join(' · ') + '</div>' : ''; })()
    + '<div class="row" style="justify-content:flex-start;gap:8px">' + (nx ? '<button class="btn" onclick="sachOpen(' + jsq(nx.id) + ')">▶ ' + (P.pos ? 'Đọc tiếp' : 'Bắt đầu') + ': ' + nx.id + ' ' + esc(nx.t) + '</button>' : '<b style="color:var(--green)">🎉 Đã đọc & ngấm hết sách!</b>') + (S.filterCi != null ? '<button class="btn sec" onclick="sachFilter(null)">Hiện cả sách</button>' : '') + '</div></div>';
  h += '<div class="card"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px"><h3 style="margin:0">📝 Sổ tay tóm tắt viết tay (12 trang)</h3><button class="btn sec" onclick="sachSotay()">Mở sổ tay</button></div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Sơ đồ & con số cả khóa — ôn nhanh sau mỗi phần sách, lướt lại mỗi ngày tuần cuối.</p>' + sotayHTML(null, true) + '</div>';
  h += '<div class="card"><h3 style="margin:0 0 6px">Mục lục' + (S.filterCi != null ? ' — phần thuộc chương ' + (S.filterCi + 1) + ': ' + esc(DATA.chapters[S.filterCi].vi) : '') + '</h3>';
  TOPS.forEach(function(t){
    var subs = subsOf(t); if (S.filterCi != null && t.ci !== S.filterCi) return;
    var d = subs.filter(function(s){ return P.done[s.id]; }).length, open = S.open[t.id] !== undefined ? !!S.open[t.id] : !!(nx && nx.id.indexOf(t.id + '.') === 0);
    h += '<div class="bk-top' + (d >= subs.length && subs.length ? ' done' : '') + '"><div class="bk-top-h" onclick="sachToggle(' + jsq(t.id) + ')"><div class="ch-num">' + t.id + '</div><div style="flex:1;min-width:0"><b>' + esc(t.t) + '</b>' + (tvi(t.id) ? '<div style="font-size:13px;color:var(--accent)">' + esc(tvi(t.id)) + '</div>' : '') + '<div class="muted" style="font-size:12px">' + subs.length + ' mục · đã ngấm ' + d + ' · 📗 ' + esc(DATA.chapters[t.ci].vi) + '</div><div class="ch-prog" style="margin-top:4px;max-width:220px"><i style="width:' + (subs.length ? Math.round(d / subs.length * 100) : 0) + '%"></i></div></div><div class="ch-st">' + (open ? '▾' : '▸') + '</div></div>';
    if (open) h += '<div class="bk-subs">' + subs.map(function(s){ return '<div class="bk-sub' + (P.done[s.id] ? ' done' : '') + (P.pos === s.id ? ' cur' : '') + '" onclick="sachOpen(' + jsq(s.id) + ')">' + (P.done[s.id] ? '✅' : '○') + ' <b>' + s.id + '</b> ' + esc(s.t) + (tvi(s.id) ? ' <span style="color:var(--accent);font-size:12.5px">— ' + esc(tvi(s.id)) + '</span>' : '') + '<span class="muted" style="font-size:11.5px;margin-left:6px">tr.' + s.page + '</span></div>'; }).join('') + '</div>';
    h += '</div>';
  });
  el.innerHTML = '<div class="ch-wrap">' + h + '</div></div>';
}
function secView(el){
  var s = BYID[S.id]; if (!s){ S.view = 'toc'; tocView(el); return; }
  var i = SUBS.indexOf(s), prev = SUBS[i - 1], next = SUBS[i + 1], V = viFor(s), top = BYID[s.id.split('.')[0]];
  var bar = '<div class="card bk-bar"><div class="row" style="justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap"><button class="back" onclick="sachToc()">← Mục lục</button><div class="muted" style="font-size:12px">' + (i + 1) + '/' + SUBS.length + ' · tr.' + s.page + ' · ' + doneCount() + ' đã ngấm</div><div class="row" style="gap:4px"><button class="gb-tbtn" onclick="sachFont(-1)">A−</button><button class="gb-tbtn" onclick="sachFont(1)">A+</button><button class="gb-tbtn' + (P.vi ? ' on' : '') + '" onclick="sachVi()">🇻🇳 Tóm tắt</button><button class="gb-tbtn' + (SPK.on ? ' play' : '') + '" onclick="sachSpeak(' + jsq(s.id) + ')">' + (SPK.on ? '⏹ Dừng đọc' : '🔊 Nghe đọc') + '</button></div></div></div>';
  var h = bar + '<div class="card bk-body" style="font-size:' + P.font + 'px"><div class="muted" style="font-size:12px">Phần ' + top.id + ' · ' + esc(top.t) + '</div><h2 style="margin:2px 0 2px">' + s.id + ' ' + esc(s.t) + '</h2>' + (tvi(s.id) ? '<div style="color:var(--accent);font-weight:600;margin-bottom:10px">🇻🇳 ' + esc(tvi(s.id)) + '</div>' : '<div style="margin-bottom:10px"></div>');
  if (P.vi){
    h += '<div class="bk-vi"><div class="ch-lbl" style="color:var(--accent)">🇻🇳 Thầy tóm tắt trước khi đọc</div>' + ((VI.intro || {})[s.id] ? '<div class="bk-intro"><b>Dịch chuyên ngành phần mở đầu:</b> ' + esc(VI.intro[s.id]) + '</div>' : '');
    if (V.les.length) h += '<ul class="lesson" style="margin:4px 0">' + V.les.map(function(x){ return '<li><b>' + esc(x.L.t_vi) + ':</b> ' + esc(x.L.vi) + '</li>'; }).join('') + '</ul>';
    if (V.deep) h += '<details class="bk-deep"><summary>🎓 Giảng giải liên quan: ' + strip(V.deep.h_vi) + '</summary><div style="margin-top:6px;line-height:1.65">' + ((V.deep.body || []).map(function(p){ return '<p>' + p.vi + '</p>'; }).join('') || (V.deep.rows || []).map(function(r){ return '<div>• ' + r.vi + '</div>'; }).join('')) + '</div></details>';
    if (!V.les.length && !V.deep) h += '<div class="muted" style="font-size:13px">Mục này app chưa có tóm tắt riêng — đọc tiếng Anh, chạm vào thuật ngữ gạch chân để xem nghĩa, bôi đen đoạn để dịch.</div>';
    h += '<div class="muted" style="font-size:12px;margin-top:6px">Đọc xong hãy tự nói lại ý chính bằng tiếng Việt, rồi trả lời câu đề ở cuối mục.</div></div>';
  }
  h += '<div class="bk-text">' + s.blocks.map(blockHTML).join('') + '</div>';
  // ngấm chưa?
  h += '<div class="bk-check"><div class="ch-lbl" style="color:var(--green)">🧠 Ngấm chưa? — đề thi hỏi gì về mục này</div>';
  if (V.pts.length) h += V.pts.map(function(p, k){ var rv = S.reveal[p.id]; return '<div class="bk-q"><div><b>' + esc(p.q) + '</b>' + (p.opts ? '<div class="muted" style="font-size:13px;margin-top:3px">' + p.opts.map(function(o, j){ return String.fromCharCode(65 + j) + '. ' + esc(o); }).join(' · ') + '</div>' : '') + '</div>' + (rv ? '<div class="hd-ans" style="margin-top:6px"><div class="a">→ ' + esc(p.ans) + '</div>' + (p.why ? '<div class="why">💡 ' + esc(p.why) + '</div>' : '') + '</div>' : '<button class="gb-tbtn" style="margin-top:6px" onclick="sachReveal(' + jsq(p.id) + ')">Tôi đã tự trả lời → xem đáp án</button>') + '</div>'; }).join('');
  else h += '<div class="muted" style="font-size:13px">Bộ đề không có câu nào khớp riêng mục này — mục đọc để hiểu nền; câu hỏi sẽ ở các mục lân cận.</div>';
  h += '<div class="gb-row" style="margin-top:10px"><button class="btn" onclick="sachDone(' + jsq(s.id) + ')">' + (P.done[s.id] ? '✅ Đã ngấm' : '✅ Đã đọc & ngấm') + (next ? ' → ' + next.id : '') + '</button>' + (next ? '<button class="btn sec" onclick="sachOpen(' + jsq(next.id) + ')">Đọc tiếp, chưa chắc →</button>' : '') + (prev ? '<button class="btn ghost" onclick="sachOpen(' + jsq(prev.id) + ')">← ' + prev.id + '</button>' : '') + (window.chStart ? '<button class="gb-tbtn" onclick="chStart(' + s.ci + ')">📗 Học gọn chương ' + (s.ci + 1) + '</button>' : '') + '</div></div></div>';
  el.innerHTML = '<div class="ch-wrap">' + h + '</div>';
}
function render(){ var el = document.getElementById('v-sach'); if (!el) return; if (S.view === 'sec') secView(el); else if (S.view === 'sotay') sotayView(el); else tocView(el); }

/* ---------- API ---------- */
window.sachOpen = function(id){ if (!BYID[id]) return; if (SPK.on){ SPK.on = false; try{ speechSynthesis.cancel(); }catch(e){} } S.view = 'sec'; S.id = id; P.pos = id; save(); if (CUR !== 'sach') go('sach'); else render(); window.scrollTo(0, 0); };
window.sachToc = function(){ if (SPK.on){ SPK.on = false; try{ speechSynthesis.cancel(); }catch(e){} } S.view = 'toc'; if (CUR !== 'sach') go('sach'); else render(); window.scrollTo(0, 0); };
window.sachToggle = function(id){ var nx = sachStats().next; var cur = S.open[id] !== undefined ? !!S.open[id] : !!(nx && nx.indexOf(id + '.') === 0); S.open[id] = !cur; render(); };
window.sachFilter = function(ci){ S.filterCi = ci; S.view = 'toc'; if (CUR !== 'sach') go('sach'); else render(); };
window.sachChapter = function(ci){ var first = SUBS.filter(function(s){ return s.ci === ci && !P.done[s.id]; })[0] || SUBS.filter(function(s){ return s.ci === ci; })[0]; S.filterCi = ci; if (first){ sachOpen(first.id); } else sachFilter(ci); };
window.sachFont = function(d){ P.font = Math.max(13, Math.min(22, P.font + d)); save(); render(); };
window.sachVi = function(){ P.vi = P.vi ? 0 : 1; save(); render(); };
window.sachReveal = function(pid){ S.reveal[pid] = 1; render(); };
window.sachDone = function(id){ P.done[id] = 1; todayDone(); var st = sachStats(); save(); var i = SUBS.indexOf(BYID[id]), next = SUBS[i + 1]; T(st.today >= st.goal ? '🎉 Đủ ' + st.goal + ' mục hôm nay (' + st.done + '/' + st.total + ')' : '✅ Đã ngấm ' + id + ' · hôm nay ' + st.today + '/' + st.goal); if (next) sachOpen(next.id); else sachToc(); };
window.sachResume = function(){ var st = sachStats(); if (st.next) sachOpen(st.next); else sachToc(); };

/* ---------- khung ---------- */
function ensure(){
  if (document.getElementById('v-sach')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-sach'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function' && !TABS.some(function(t){ return t[0] === 'sach'; })){ var at = TABS.findIndex(function(t){ return t[0] === 'chuong'; }); TABS.splice(at >= 0 ? at + 1 : 1, 0, ['sach', '📖 Đọc sách']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  if (!window._sachWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'sach') render(); }catch(e){ console.error(e); } }; window._sachWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
  '.bk-body{line-height:1.7}',
  '.bk-p{margin:0 0 10px}',
  '.bk-h{margin:14px 0 4px;font-size:1.02em;color:var(--accent2)}',
  '.bk-ul{margin:0 0 10px 18px;padding:0}.bk-ul li{margin:3px 0}',
  '.bk-tw{overflow-x:auto;margin:6px 0 12px}',
  '.bk-tbl{border-collapse:collapse;width:100%;font-size:.92em}.bk-tbl td,.bk-tbl th{border:1px solid var(--line);padding:6px 8px;vertical-align:top;text-align:left}.bk-tbl th{background:rgba(93,177,255,.12);color:var(--accent2)}',
  'body.light .bk-tbl th{background:#e9f1fc}',
  '.bk-fig{margin:10px 0 14px;max-width:560px}',
  '.bk-term{border-bottom:1px dotted var(--accent2);cursor:pointer}.bk-term:hover{background:rgba(93,177,255,.12)}',
  '#bk-pop{display:none;position:absolute;z-index:1200;max-width:290px;background:var(--panel);border:1px solid var(--accent2);border-radius:10px;padding:8px 10px;font-size:13.5px;line-height:1.5;box-shadow:0 8px 24px rgba(0,0,0,.25)}#bk-pop b{color:var(--accent2)}',
  '.bk-vi{border-left:3px solid var(--accent);background:rgba(255,138,68,.07);padding:10px 12px;border-radius:0 10px 10px 0;margin-bottom:14px;font-size:.93em}',
  'body.light .bk-vi{background:#fff5ec}',
  '.bk-deep summary{cursor:pointer;color:var(--accent2);font-weight:600}',
  '.bk-check{margin-top:16px;border:1px dashed var(--green);border-radius:12px;padding:10px 12px;font-size:.93em}',
  '.bk-q{padding:8px 0;border-bottom:1px dashed var(--line)}.bk-q:last-of-type{border-bottom:none}',
  '.bk-top{border:1px solid var(--line);border-radius:12px;margin-top:8px;background:var(--panel2);overflow:hidden}.bk-top.done{border-color:rgba(52,199,89,.45)}',
  '.bk-top-h{display:flex;gap:10px;align-items:center;padding:9px 12px;cursor:pointer}.bk-top-h:hover{background:rgba(255,255,255,.03)}',
  '.bk-top .ch-num{width:auto;padding:0 8px;min-width:30px}',
  '.bk-subs{padding:2px 12px 10px;border-top:1px dashed var(--line)}',
  '.bk-sub{padding:6px 8px;border-radius:8px;cursor:pointer;font-size:13.5px}.bk-sub:hover{background:rgba(93,177,255,.1)}.bk-sub.done{color:var(--muted)}.bk-sub.cur{background:rgba(93,177,255,.14)}',
  '.bk-bar{padding:8px 12px;position:sticky;top:0;z-index:5}',
  '.bk-pvi{margin:-4px 0 12px;padding:6px 10px;border-left:3px solid var(--accent);background:rgba(255,138,68,.06);border-radius:0 8px 8px 0;font-size:.9em;line-height:1.6}',
  'body.light .bk-pvi{background:#fff7f0}',
  '.bk-intro{margin:4px 0 8px;line-height:1.65}',
  '.st-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}',
  '.st-pg{border:1px solid var(--line);border-radius:10px;overflow:hidden;cursor:pointer;background:#fff}.st-pg img{width:100%;display:block;aspect-ratio:1.41;object-fit:cover}.st-pg:hover{border-color:var(--accent2)}',
  '.st-cap{font-size:11.5px;padding:5px 7px;color:var(--muted);line-height:1.4}.st-cap b{color:var(--txt)}',
  'body:not(.light) .st-pg{background:#f4f4f4}body:not(.light) .st-cap{background:var(--panel2)}'
  ].join('\n');
  document.head.appendChild(css);
}
window.renderSach = render;
new MutationObserver(function(){ try{ ensure(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
