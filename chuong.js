/* ============================================================
   CHUONG — 📗 HỌC GỌN TỪNG CHƯƠNG (một chương = một đường thẳng)
   Chọn 1 chương → mọi thứ của chương nằm một chỗ, theo thứ tự:
     ① Mục tiêu & tỉ trọng đề  ② Nghe giảng (slide)  ③ Mổ xẻ từng MỤC
     ④ Mổ xẻ từng CÂU đề  ⑤ Tự trả lời hết (đoán trước, mở phương án sau,
     đúng 2 lần liên tiếp mới tính)  ⑥ Thi chương  ⑦ Câu sai  ⑧ Số liệu.  Có "chương đang học" để Tổng quan bám theo.
   Mổ xẻ mục = ý chính + đề hỏi gì ở mục này + bẫy + số liệu + hình +
   đoạn giảng giải liên quan (tự gom từ DATA, HOCDE, GB_EXTRA, BOOK).
   Nạp SAU hocde.js/phantich.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function') return;
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function strip(h){ return String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, would:1, following:1, most:1, likely:1, when:1, used:1, type:1, welding:1, weld:1, welds:1, during:1, should:1, can:1, not:1, than:1, into:1, if:1, has:1, have:1, its:1, all:1, one:1, two:1, may:1, will:1, these:1, there:1, their:1, more:1, less:1, some:1, any:1, out:1, does:1, do:1, also:1, about:1, been:1, was:1, were:1, but:1, after:1, before:1, between:1, where:1, how:1, why:1, who:1, so:1, no:1, yes:1};
function words(s){ return String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
function wordsVi(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 4; }); }
function overlap(a, b){ var s = {}; b.forEach(function(x){ s[x] = 1; }); var n = 0; a.forEach(function(x){ if (s[x]) n++; }); return n; }
var ORDER = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];
var EXTRA = window.GB_EXTRA || {};

/* ---------- tiến độ ---------- */
var P = LS('cswip_chuong', {}); // {cur:ci, les:{ci:{li:1}}, qd:{ci:{id:1}}}
P.les = P.les || {}; P.qd = P.qd || {};
function save(){ SV('cswip_chuong', P); }
window.chCurrent = function(){ return P.cur == null ? null : P.cur; };
function lessonsDone(ci){ return Object.keys(P.les[ci] || {}).length; }
function questionsDone(ci){ return Object.keys(P.qd[ci] || {}).length; }
function examBest(ci){ try{ var r = chapResult(ci); return r ? r.best : null; }catch(e){ return null; } }
function teachPct(ci){ try{ var g = window.gbProgress ? gbProgress(ci) : null; return g ? (g.done ? 100 : g.pct) : 0; }catch(e){ return 0; } }
function hdPct(ci){ try{ var h = window.hdProgress ? hdProgress(ci) : null; return h ? h.pct : 0; }catch(e){ return 0; } }
function wrongOfChapter(ci){
  var out = []; try{ var W = LS('cswip_wrong', {}); var cats = (typeof CHAP_CATS !== 'undefined' && CHAP_CATS[ci]) || []; var pts = (window.HOCDE && HOCDE.byChapter[ci]) || []; var ids = {}; pts.forEach(function(p){ ids[p.id] = 1; });
    Object.keys(W).forEach(function(id){ var w = W[id]; if (!w || w.cleared) return; if (ids[id] || (w.lesson && w.lesson[0] === ci) || (id.charAt(0) === 'c' && id.indexOf('c' + ci + '-') === 0) || cats.indexOf(w.cat) >= 0) out.push(w); }); }catch(e){}
  return out;
}
function mst(id){ try{ return window.NR && NR.mastStreak ? NR.mastStreak(id) : 0; }catch(e){ return 0; } }
function mcqOf(ci){ if (ci < 0){ var all = []; DATA.chapters.forEach(function(_, i){ all = all.concat(mcqOf(i)); }); return all; } return ((window.HOCDE && HOCDE.byChapter[ci]) || []).filter(function(p){ return p.mcq && p.opts && p.opts.length > 1; }); }
function mlast(id){ try{ var m = window.NR && NR.mast && NR.mast[id]; return m ? (m.last || 0) : 0; }catch(e){ return 0; } }
function mastOf(ci){ var pts = mcqOf(ci), m = 0, one = 0; pts.forEach(function(p){ var st = mst(p.id); if (st >= 2) m++; else if (st === 1) one++; }); return {n:pts.length, m:m, one:one}; }
function chapterPct(ci){
  var c = DATA.chapters[ci], nL = (c.lessons || []).length, nQ = ((window.HOCDE && HOCDE.byChapter[ci]) || []).length, M = mastOf(ci);
  var parts = [teachPct(ci), nL ? Math.round(lessonsDone(ci) / nL * 100) : 100, nQ ? Math.min(100, Math.round(questionsDone(ci) / nQ * 100)) : 100, M.n ? Math.round(M.m / M.n * 100) : 100, examBest(ci) != null ? Math.min(100, Math.round(examBest(ci) / 70 * 100)) : 0];
  return Math.round(parts.reduce(function(a, b){ return a + b; }, 0) / parts.length);
}

/* ---------- mổ xẻ MỤC: gom mọi thứ liên quan tới 1 mục ---------- */
function lessonInfo(ci, li){
  var c = DATA.chapters[ci], L = c.lessons[li], X = EXTRA[ci] || {};
  var lw = words((L.t_en || '') + ' ' + (L.en || '')), lv = wordsVi((L.t_vi || '') + ' ' + (L.vi || ''));
  var pts = ((window.HOCDE && HOCDE.byChapter[ci]) || []).filter(function(p){ return p.li === li; });
  function pick(arr, n){ return (arr || []).map(function(t){ return {t:t, s:overlap(wordsVi(strip(t)), lv) + overlap(words(strip(t)), lw)}; }).filter(function(x){ return x.s >= 2; }).sort(function(a, b){ return b.s - a.s; }).slice(0, n).map(function(x){ return x.t; }); }
  var traps = pick(X.traps, 2), nums = pick(X.numbers, 2);
  var deep = null, bs = 0; (c.deep || []).forEach(function(b){ var s = overlap(words((b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ')), lw) + overlap(wordsVi(strip(b.h_vi)), lv); if (s > bs){ bs = s; deep = b; } });
  var fig = null; try{ if (window.BOOK){ var f = BOOK.match(ci, (L.t_en || '') + ' ' + (L.en || ''), 1); fig = f && f[0] ? f[0] : null; } }catch(e){}
  return {L:L, pts:pts, traps:traps, nums:nums, deep:bs >= 2 ? deep : null, fig:fig};
}
function lessonCardHTML(ci, li, open){
  var I = lessonInfo(ci, li), L = I.L, done = !!(P.les[ci] && P.les[ci][li]);
  var h = '<div class="ch-les' + (done ? ' done' : '') + '" id="ch-les-' + li + '"><div class="ch-les-h" onclick="chToggle(' + li + ')"><div class="ch-num">' + (li + 1) + '</div><div style="flex:1;min-width:0"><b>' + esc(L.t_vi) + '</b>' + (L.t_en ? ' <span class="muted">(' + esc(L.t_en) + ')</span>' : '') + '<div class="ch-tags">' + (I.pts.length ? '<span class="ch-tag" style="color:var(--yellow)">🎯 đề hỏi ' + I.pts.length + '×</span>' : '<span class="ch-tag">chưa thấy trong đề</span>') + (I.traps.length ? '<span class="ch-tag" style="color:var(--red)">⚠️ bẫy</span>' : '') + (I.nums.length ? '<span class="ch-tag" style="color:var(--accent2)">🔢 số liệu</span>' : '') + (I.fig ? '<span class="ch-tag">📷 hình</span>' : '') + '</div></div><div class="ch-st">' + (done ? '✅' : (open ? '▾' : '▸')) + '</div></div>';
  if (open){
    h += '<div class="ch-les-b">'
      + '<div class="ch-sec"><div class="ch-lbl">🧠 Ý chính</div><div class="ch-big">' + esc(L.vi) + (L.en ? '<span class="lang-en" style="display:block;color:var(--muted);font-style:italic;font-size:13px;margin-top:3px">' + esc(L.en) + '</span>' : '') + '</div></div>';
    if (I.deep) h += '<div class="ch-sec"><div class="ch-lbl">🎓 Giảng giải liên quan — <i>' + esc(strip(I.deep.h_vi)) + '</i></div><div style="font-size:14px;line-height:1.65">' + ((I.deep.body || [])[0] ? (I.deep.body[0].vi) : (I.deep.rows || []).slice(0, 3).map(function(r){ return '• ' + r.vi; }).join('<br>')) + '</div>' + (window.gbStart ? '<button class="gb-tbtn" style="margin-top:6px" onclick="gbStart(' + ci + ')">🎙️ Nghe giảng ý này</button>' : '') + '</div>';
    if (I.fig && window.BOOK) h += '<div class="ch-sec"><div class="ch-lbl">📷 Hình trong giáo trình</div><div style="max-width:420px">' + BOOK.img(I.fig) + BOOK.cap(I.fig) + '</div></div>';
    if (I.pts.length) h += '<div class="ch-sec"><div class="ch-lbl">🎯 Đề thi hỏi gì ở mục này (' + I.pts.length + ')</div>' + I.pts.slice(0, 6).map(function(p){ return '<div class="ch-q"><div>' + esc(p.q) + (p.vq ? '<div class="muted" style="font-size:12.5px">' + esc(p.vq) + '</div>' : '') + '</div><div class="ch-a">→ ' + esc(p.ans) + (p.why ? '<div class="muted" style="font-size:12.5px;font-weight:400">' + esc(p.why) + '</div>' : '') + '</div></div>'; }).join('') + (I.pts.length > 6 ? '<div class="muted" style="font-size:12.5px;margin-top:4px">… và ' + (I.pts.length - 6) + ' câu nữa — xem ở bước ④.</div>' : '') + '</div>';
    if (I.traps.length) h += '<div class="ch-sec" style="border-left-color:var(--red)"><div class="ch-lbl" style="color:var(--red)">⚠️ Bẫy đề</div>' + I.traps.map(function(t){ return '<div style="font-size:13.5px;line-height:1.6;margin-top:4px">' + t + '</div>'; }).join('') + '</div>';
    if (I.nums.length) h += '<div class="ch-sec" style="border-left-color:var(--accent2)"><div class="ch-lbl" style="color:var(--accent2)">🔢 Số liệu phải thuộc</div>' + I.nums.map(function(t){ return '<div style="font-size:13.5px;line-height:1.6;margin-top:4px">' + t + '</div>'; }).join('') + '</div>';
    if (window.ENT) try{ h += ENT.lessonHTML(ci, li); }catch(e){}
    h += '<div class="gb-row"><button class="btn" onclick="chDone(' + ci + ',' + li + ',true)">' + (done ? '✅ Đã nắm' : '✅ Tôi nắm mục này → mục tiếp') + '</button>' + (done ? '<button class="btn ghost" onclick="chDone(' + ci + ',' + li + ',false)">Bỏ đánh dấu</button>' : '') + '<button class="gb-tbtn" onclick="chSpeak(' + li + ')">🔊</button>' + (window.hdStart && I.pts.length ? '<button class="gb-tbtn" onclick="hdJumpTo(' + JSON.stringify(I.pts[0].id).replace(/"/g, '&quot;') + ')">📘 Luyện các câu của mục</button>' : '') + '</div></div>';
  }
  return h + '</div>';
}

/* ---------- mổ xẻ CÂU ---------- */
function questionCardHTML(ci, p, idx, open){
  var done = !!(P.qd[ci] && P.qd[ci][p.id]);
  var h = '<div class="ch-les' + (done ? ' done' : '') + '" id="ch-q-' + idx + '"><div class="ch-les-h" onclick="chQToggle(' + idx + ')"><div class="ch-num">' + (idx + 1) + '</div><div style="flex:1;min-width:0"><b style="font-weight:600">' + esc(p.q) + '</b><div class="ch-tags"><span class="ch-tag">' + esc(p.src) + '</span>' + (p.li >= 0 ? '<span class="ch-tag">mục ' + (p.li + 1) + '</span>' : '') + '</div></div><div class="ch-st">' + (done ? '✅' : (open ? '▾' : '▸')) + '</div></div>';
  if (open){
    var q = {en:p.q, vi:p.vq, opts:(p.opts || [p.ans]).map(function(o){ return {en:o}; })};
    h += '<div class="ch-les-b">' + (window.gbDissectHTML ? gbDissectHTML(q, p.li >= 0 ? DATA.chapters[ci].lessons[p.li].t_vi : DATA.chapters[ci].vi) : '');
    if (p.ctx) h += '<div class="muted" style="font-size:13px;margin-top:8px">↩ Câu trước đó: <i>' + esc(p.ctx.q) + '</i> → <b style="color:var(--txt)">' + esc(p.ctx.ans) + '</b></div>';
    if (p.opts) h += '<div style="margin-top:8px">' + p.opts.map(function(o, k){ return '<div class="gb-opt' + (k === p.a ? ' ok' : '') + '" style="cursor:default;padding:9px 12px">' + String.fromCharCode(65 + k) + '. ' + esc(o) + (p.optsVi && p.optsVi[k] ? '<span class="lang-en" style="display:block;color:var(--muted);font-size:12.5px">' + esc(p.optsVi[k]) + '</span>' : '') + (k === p.a ? ' ✓' : '') + '</div>'; }).join('') + '</div>';
    h += '<div class="hd-ans" style="margin-top:10px"><div class="lbl">✅ Điều phải nhớ</div><div class="a">' + esc(p.ans) + '</div>' + (p.why ? '<div class="why">💡 ' + esc(p.why) + '</div>' : '') + '</div>';
    h += '<div class="gb-row"><button class="btn" onclick="chQDone(' + ci + ',' + idx + ',true)">' + (done ? '✅ Đã mổ xẻ' : '✅ Hiểu câu này → câu tiếp') + '</button>' + (p.li >= 0 ? '<button class="gb-tbtn" onclick="chOpenLesson(' + p.li + ')">📚 Về mục ' + (p.li + 1) + '</button>' : '') + '</div></div>';
  }
  return h + '</div>';
}

/* ---------- trạng thái & tab ---------- */
var S = {ci:null, step:0, openL:0, openQ:0, qfilter:'', dr:null};
var ENMODE = LS('cswip_enmode', true); // ⑤: như thi thật — chỉ tiếng Anh, dịch hiện sau khi trả lời
window.chEnMode = function(){ ENMODE = !ENMODE; SV('cswip_enmode', ENMODE); T(ENMODE ? '🇬🇧 Như thi thật: câu hỏi & phương án chỉ tiếng Anh, dịch hiện sau khi trả lời' : '🇻🇳 Hiện dịch tiếng Việt ngay'); render(); };
window.chDrillVi = function(){ if (S.dr){ S.dr.vi = !S.dr.vi; render(); } };
function ensure(){
  if (document.getElementById('v-chuong')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-chuong'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function' && !TABS.some(function(t){ return t[0] === 'chuong'; })){ TABS.splice(1, 0, ['chuong', '📗 Học gọn chương']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  if (!window._chWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'chuong') render(); }catch(e){ console.error(e); } }; window._chWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
  '.ch-wrap{max-width:820px;margin:0 auto}',
  '.ch-steps{display:flex;gap:6px;overflow-x:auto;padding:4px 0 8px;scrollbar-width:none}',
  '.ch-steps button{flex:none;background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--muted);border-radius:20px;padding:7px 12px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap}',
  '.ch-steps button.on{background:var(--accent2);color:#fff;border-color:var(--accent2)}',
  '.ch-steps button.ok{border-color:var(--green);color:var(--green)}',
  'body.light .ch-steps button{background:#fff}',
  'body.light .ch-steps button.on{background:var(--accent2);color:#fff}',
  '.ch-dq{font-size:17px;line-height:1.55;font-weight:600;margin-top:6px}',
  '.ch-dfb{margin-top:10px;padding:10px 12px;border-radius:12px;border:1px solid var(--line)}',
  '.ch-dfb.ok{background:rgba(52,199,89,.1);border-color:var(--green)}',
  '.ch-dfb.bad{background:rgba(255,94,84,.1);border-color:var(--red)}',
  'body.light .ch-dfb.ok{background:#e9f7ee}body.light .ch-dfb.bad{background:#fdeeed}',
  '.ch-les{border:1px solid var(--line);border-radius:14px;margin-top:10px;background:var(--panel2);overflow:hidden}',
  '.ch-les.done{border-color:rgba(52,199,89,.45)}',
  '.ch-les-h{display:flex;gap:10px;align-items:center;padding:11px 12px;cursor:pointer}',
  '.ch-les-h:hover{background:rgba(255,255,255,.03)}',
  '.ch-num{flex:none;width:30px;height:30px;border-radius:9px;background:rgba(255,122,51,.15);color:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px}',
  '.ch-les.done .ch-num{background:rgba(52,199,89,.15);color:var(--green)}',
  '.ch-tags{margin-top:3px}',
  '.ch-tag{display:inline-block;font-size:11px;color:var(--muted);background:rgba(255,255,255,.06);border-radius:8px;padding:1px 7px;margin:2px 4px 0 0}',
  '.ch-st{flex:none;color:var(--muted);font-size:16px}',
  '.ch-les-b{padding:4px 14px 14px;border-top:1px dashed var(--line);animation:gbin .3s ease}',
  '.ch-sec{margin-top:12px;padding:10px 12px;border-left:3px solid var(--accent);background:rgba(255,255,255,.03);border-radius:0 10px 10px 0}',
  '.ch-lbl{font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px}',
  '.ch-big{font-size:15.5px;line-height:1.7}',
  '.ch-q{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13.5px;line-height:1.5}',
  '.ch-q .ch-a{font-weight:700;color:var(--green)}',
  '@media(max-width:560px){.ch-q{grid-template-columns:1fr}}',
  '.ch-prog{height:8px;border-radius:5px;background:rgba(255,255,255,.08);overflow:hidden}',
  '.ch-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent2),var(--green))}',
  '.ch-cur{border-left:3px solid var(--accent2)}'
  ].join('\n');
  document.head.appendChild(css);
}

/* ---------- API ---------- */
window.chStart = function(ci, step){ if (ci < 0){ chDrillAll(); return; } S.ci = ci; P.cur = ci; save(); S.step = step == null ? recommendedStep(ci) : step; S.openL = firstUndone(ci); S.openQ = firstUndoneQ(ci); go('chuong'); };
window.chList = function(){ S.ci = null; render(); };
window.chStep = function(s){ if (S.ci < 0){ chList(); return; } S.step = s; if (s !== 4) S.dr = null; render(); window.scrollTo(0, 0); };
window.chDrillAll = function(mode){ S.ci = -1; S.step = 4; S.dr = null; go('chuong'); chDrillStart(-1, mode === 'due' ? 'due' : (mode === 'all')); };
window.chToggle = function(li){ S.openL = (S.openL === li) ? -1 : li; render(); var el = document.getElementById('ch-les-' + li); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); };
window.chOpenLesson = function(li, ci){ if (ci != null && ci >= 0 && ci !== S.ci){ S.ci = ci; P.cur = ci; save(); } if (S.ci < 0) return; S.step = 2; S.openL = li; render(); var el = document.getElementById('ch-les-' + li); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); };
window.chDone = function(ci, li, ok){ P.les[ci] = P.les[ci] || {}; if (ok) P.les[ci][li] = 1; else delete P.les[ci][li]; save(); if (ok){ try{ if (window.nrUnd){} }catch(e){} var n = DATA.chapters[ci].lessons.length; var nx = -1; for (var i = li + 1; i < n; i++) if (!P.les[ci][i]){ nx = i; break; } S.openL = nx; if (nx < 0 && lessonsDone(ci) >= n) T('🎉 Xong mổ xẻ ' + n + ' mục — sang bước ④ câu hỏi'); } render(); var el = document.getElementById('ch-les-' + (S.openL >= 0 ? S.openL : li)); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); };
window.chQToggle = function(i){ S.openQ = (S.openQ === i) ? -1 : i; render(); var el = document.getElementById('ch-q-' + i); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); };
window.chQDone = function(ci, i, ok){ var pts = qlist(ci); var p = pts[i]; if (!p) return; P.qd[ci] = P.qd[ci] || {}; if (ok) P.qd[ci][p.id] = 1; else delete P.qd[ci][p.id]; save(); var nx = -1; for (var k = i + 1; k < pts.length; k++) if (!P.qd[ci][pts[k].id]){ nx = k; break; } S.openQ = nx; render(); var el = document.getElementById('ch-q-' + (nx >= 0 ? nx : i)); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); };
window.chQFilter = function(v){ S.qfilter = v; S.openQ = 0; render(); };
window.chSpeak = function(li){ var L = DATA.chapters[S.ci].lessons[li]; if (window.gbSpeakText) gbSpeakText(L.t_vi + '. ' + L.vi, 'vi-VN'); };
window.chReviewWrong = function(ci){ var ws = wrongOfChapter(ci); if (!ws.length){ T('Chương này chưa có câu sai'); return; } var pool = ws.map(function(w){ return {qv:w.qv || '', qe:w.q, ov:(w.ov && w.ov.length === w.o.length) ? w.ov : w.o.map(function(){ return ''; }), oe:w.o, a:w.a, ev:w.ev || '', ee:w.ee || '', id:w.id, cat:w.cat}; }); go('quiz'); startSet(pool.slice(0, 20), 0, 'Sổ câu sai'); };
function qlist(ci){ var pts = (window.HOCDE && HOCDE.byChapter[ci]) || []; if (S.qfilter === 'mcq') pts = pts.filter(function(p){ return p.mcq; }); if (S.qfilter === 'todo') pts = pts.filter(function(p){ return !(P.qd[ci] && P.qd[ci][p.id]); }); return pts; }
function firstUndone(ci){ var n = DATA.chapters[ci].lessons.length; for (var i = 0; i < n; i++) if (!(P.les[ci] && P.les[ci][i])) return i; return -1; }
function firstUndoneQ(ci){ var pts = qlist(ci); for (var i = 0; i < pts.length; i++) if (!(P.qd[ci] && P.qd[ci][pts[i].id])) return i; return -1; }
function recommendedStep(ci){ if (teachPct(ci) < 100) return 1; var n = DATA.chapters[ci].lessons.length; if (lessonsDone(ci) < n) return 2; var nq = ((window.HOCDE && HOCDE.byChapter[ci]) || []).length; if (questionsDone(ci) < nq) return 3; var M = mastOf(ci); if (M.n && M.m < M.n) return 4; if (examBest(ci) == null || examBest(ci) < 70) return 5; return 6; }

/* ---------- ⑤ TỰ TRẢ LỜI HẾT: đoán trước → mở phương án → chấm → đúng 2 lần liên tiếp mới tính ---------- */
function shuf(a){ for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
window.chDrillStart = function(ci, all){
  var lim = Date.now() - 7 * 864e5;
  var pool = mcqOf(ci).filter(function(p){ return all === 'due' ? (mst(p.id) >= 2 && mlast(p.id) < lim) : (all || mst(p.id) < 2); });
  if (!pool.length){ T(all === 'due' ? 'Không có câu nào đến hạn ôn lại' : ci < 0 ? '🎉 Bạn đã tự trả lời được toàn bộ câu đề' : '🎉 Chương này bạn đã tự trả lời được hết'); S.dr = null; render(); return; }
  // câu chưa thử bao giờ / đang 0 lên trước, câu đã đúng 1 lần (chờ chốt) xuống sau
  if (all === 'due') pool = shuf(pool).slice(0, 30);
  else pool = shuf(pool.filter(function(p){ return mst(p.id) === 0; })).concat(shuf(pool.filter(function(p){ return mst(p.id) === 1; })), shuf(pool.filter(function(p){ return mst(p.id) >= 2; })));
  if (ci < 0 && pool.length > 30) pool = pool.slice(0, 30);
  S.dr = {ci:ci, pool:pool, i:0, show:false, pick:-1, dis:false, k:0, n:0, again:0, done:false, mode:all === 'due' ? 'due' : all ? 'all' : 'todo'}; render(); window.scrollTo(0, 0);
};
window.chDrillReveal = function(){ if (!S.dr) return; S.dr.show = true; render(); };
window.chDrillDis = function(){ if (!S.dr) return; S.dr.dis = !S.dr.dis; render(); };
window.chDrillPick = function(k){
  var D = S.dr; if (!D || D.pick >= 0) return; var p = D.pool[D.i]; if (!p) return;
  var right = k === p.a; D.pick = k; D.n++; if (right) D.k++;
  try{ if (window.NR && NR.record) NR.record({id:p.id, qe:p.q, qv:p.vq, oe:p.opts, ov:p.optsVi || [], a:p.a, ee:'', ev:p.why, cat:p.cat, src:'Tự trả lời — ' + p.src, lesson:[p.ci, p.li]}, k, right, {game:true}); }catch(e){}
  try{ QUIZSTATE[p.id] = {correct:right}; if (typeof srsUpdate === 'function') srsUpdate(p.id, right); if (typeof window.save === 'function') window.save(); }catch(e){}
  if (!right){ D.pool.push(p); D.again++; } // sai → gặp lại cuối phiên
  else if (mst(p.id) === 1 && D.pool.indexOf(p, D.i + 1) < 0){ D.pool.push(p); } // đúng 1 lần → gặp lại để chốt lần 2
  render();
};
window.chDrillNext = function(){ var D = S.dr; if (!D) return; D.i++; D.show = false; D.pick = -1; D.dis = false; if (D.i >= D.pool.length) D.done = true; render(); window.scrollTo(0, 0); };
function drillHTML(ci){
  var M = mastOf(ci), pc = M.n ? Math.round(M.m / M.n * 100) : 0, D = S.dr;
  var ALL = ci < 0;
  var head = '<div class="card"><div class="row" style="justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap"><h3 style="margin:0 0 6px">' + (ALL ? '🎯 Tổng ôn trộn mọi chương — ' + M.m + '/' + M.n + ' câu đã tự trả lời được' : '⑤ Tự trả lời hết câu đề của chương — ' + M.m + '/' + M.n + ' câu đã trả lời được') + '</h3><button class="gb-tbtn' + (ENMODE ? ' on' : '') + '" onclick="chEnMode()">🇬🇧 Như thi thật: ' + (ENMODE ? 'BẬT' : 'TẮT') + '</button></div><p class="muted" style="line-height:1.6">Đọc câu, <b>nói câu trả lời ra trước</b>, rồi mới mở phương án và chọn. Một câu tính là "tự trả lời được" khi đúng <b>2 lần liên tiếp</b>; sai là tính lại từ đầu. Câu sai/mới đúng 1 lần sẽ quay lại trong cùng phiên cho tới khi chốt.</p><div class="ch-prog"><i style="width:' + pc + '%"></i></div><div class="muted" style="font-size:12px;margin-top:4px">' + M.one + ' câu đã đúng 1 lần (chờ chốt) · ' + (M.n - M.m - M.one) + ' câu chưa đúng lần nào</div>';
  if (!D){
    return head + '<div class="gb-row" style="margin-top:12px">' + (M.m < M.n ? '<button class="btn" onclick="chDrillStart(' + ci + ')">▶ Luyện ' + (ALL ? '30 câu trộn' : (M.n - M.m) + ' câu') + ' chưa trả lời được</button>' : '<b style="color:var(--green)">🎉 Đã tự trả lời được toàn bộ ' + M.n + ' câu.</b>') + '<button class="btn sec" onclick="chDrillStart(' + ci + ',\'due\')">⏰ Ôn câu đã chốt lâu chưa gặp</button><button class="btn sec" onclick="chDrillStart(' + ci + ',true)">🔁 Ôn lại tất cả' + (ALL ? '' : ' ' + M.n + ' câu') + '</button>' + (M.m >= M.n && M.n && !ALL ? '<button class="btn" onclick="chStep(5)">Sang ⑥ Thi chương →</button>' : '') + '</div></div>';
  }
  if (D.done){
    var M2 = mastOf(ci);
    return head + '<div class="ch-dfb ok" style="margin-top:12px"><b>Xong phiên:</b> đúng ' + D.k + '/' + D.n + ' lượt' + (D.again ? ' · ' + D.again + ' lượt sai phải làm lại' : '') + '.<br>Chương này: <b>' + M2.m + '/' + M2.n + '</b> câu đã tự trả lời được.</div><div class="gb-row" style="margin-top:12px">' + (M2.m < M2.n ? '<button class="btn" onclick="chDrillStart(' + ci + ')">▶ Luyện tiếp ' + (ALL ? '30 câu' : (M2.n - M2.m) + ' câu còn lại') + '</button>' : '') + (ALL ? '<button class="btn sec" onclick="go(\'home\')">🏠 Về Tổng quan</button>' : '<button class="btn sec" onclick="chStep(5)">Sang ⑥ Thi chương →</button>') + '</div></div>';
  }
  var p = D.pool[D.i], st = mst(p.id), pci = p.ci != null ? p.ci : ci, lesson = p.li >= 0 ? DATA.chapters[pci].lessons[p.li] : null;
  var h = head + '<div class="muted" style="font-size:12.5px;margin-top:10px">Câu ' + (D.i + 1) + '/' + D.pool.length + ' · phiên này đúng ' + D.k + '/' + D.n + ' · <span class="ch-tag">' + esc(p.src) + '</span>' + (ALL ? '<span class="ch-tag" style="color:var(--accent2)">Ch.' + (pci + 1) + ' ' + esc(DATA.chapters[pci].vi) + '</span>' : '') + (lesson ? '<span class="ch-tag">mục ' + (p.li + 1) + ': ' + esc(lesson.t_vi) + '</span>' : '') + (st === 1 ? '<span class="ch-tag" style="color:var(--yellow)">đã đúng 1 lần — chốt lần 2</span>' : st >= 2 ? '<span class="ch-tag" style="color:var(--green)">ôn lại câu đã chốt</span>' : '') + '' + '</div>';
  if (p.ctx) h += '<div class="muted" style="font-size:13px;margin-top:6px">↩ Câu trước đó: <i>' + esc(p.ctx.q) + '</i> → <b style="color:var(--txt)">' + esc(p.ctx.ans) + '</b></div>';
  var showVi = !ENMODE || D.pick >= 0 || D.vi;
  h += '<div class="ch-dq">' + esc(p.q) + ' <button class="en-sp" style="vertical-align:middle" onclick="entSpeak(' + JSON.stringify(p.q).replace(/"/g, '&quot;') + ')" title="Đọc câu hỏi tiếng Anh">🔊</button></div>' + (p.vq ? (showVi ? '<div class="muted" style="font-size:13.5px;margin-top:2px">' + esc(p.vq) + '</div>' : '<button class="gb-tbtn" style="margin-top:4px" onclick="chDrillVi()">🇻🇳 Xem dịch (hạn chế — thi thật không có)</button>') : '');
  if (!D.show){
    h += '<div class="gb-bubble hook" style="margin-top:12px">🤔 Nói (hoặc nghĩ) câu trả lời của bạn trước. Chỉ khi đã có câu trả lời mới mở phương án — đây là cách duy nhất để biết bạn <b>tự</b> trả lời được hay chỉ nhận ra đáp án.</div>'
      + '<div class="gb-row"><button class="btn" onclick="chDrillReveal()">Tôi đoán xong → hiện phương án</button>' + (lesson ? '<button class="gb-tbtn" onclick="chOpenLesson(' + p.li + ',' + pci + ')">📚 Xem lại mục ' + (p.li + 1) + '</button>' : '') + '</div>';
  } else {
    h += '<div style="margin-top:10px">' + p.opts.map(function(o, k){ var cls = 'gb-opt'; if (D.pick >= 0){ if (k === p.a) cls += ' ok'; else if (k === D.pick) cls += ' bad'; } return '<button class="' + cls + '" ' + (D.pick >= 0 ? 'disabled' : 'onclick="chDrillPick(' + k + ')"') + '>' + String.fromCharCode(65 + k) + '. ' + esc(o) + ((D.pick >= 0 || !ENMODE) && p.optsVi && p.optsVi[k] ? '<span style="display:block;color:var(--muted);font-size:12.5px">' + esc(p.optsVi[k]) + '</span>' : '') + '</button>'; }).join('') + '</div>';
    if (D.pick >= 0){
      var right = D.pick === p.a, st2 = mst(p.id);
      h += '<div class="ch-dfb ' + (right ? 'ok' : 'bad') + '"><b>' + (right ? '✅ Đúng' : '❌ Sai — đáp án: ' + String.fromCharCode(65 + p.a) + '. ' + esc(p.ans)) + '</b>' + (right ? (st2 >= 2 ? ' · 🎯 <b>Tự trả lời được</b> (2 lần liên tiếp)' : ' · đúng lần 1, gặp lại lần nữa để chốt') : ' · chuỗi về 0, câu này sẽ quay lại cuối phiên') + (p.why ? '<div style="margin-top:6px;font-size:13.5px;line-height:1.6">💡 ' + esc(p.why) + '</div>' : '') + '</div>';
      if (!D.dis && window.ENT){ try{ var tq = ENT.lesson(pci, p.li).filter(function(t){ return (' ' + (p.q + ' ' + p.opts.join(' ')).toLowerCase() + ' ').indexOf(t.en) >= 0; }).slice(0, 4); if (tq.length) h += '<div class="muted" style="font-size:12.5px;margin-top:6px">🇬🇧 ' + tq.map(function(t){ return '<b style="color:#7c5cff">' + esc(t.en) + '</b> = ' + esc(t.vi); }).join(' · ') + '</div>'; }catch(e){} }
      if (D.dis && window.gbDissectHTML) h += gbDissectHTML({en:p.q, vi:p.vq, opts:p.opts.map(function(o){ return {en:o}; })}, lesson ? lesson.t_vi : DATA.chapters[pci].vi);
      h += '<div class="gb-row"><button class="btn" onclick="chDrillNext()">Câu tiếp →</button><button class="gb-tbtn' + (D.dis ? ' on' : '') + '" onclick="chDrillDis()">🔍 Mổ xẻ: cách hỏi & nhận biết đáp án</button>' + (lesson ? '<button class="gb-tbtn" onclick="chOpenLesson(' + p.li + ',' + pci + ')">📚 Về mục ' + (p.li + 1) + '</button>' : '') + '</div>';
    }
  }
  return h + '</div>';
}

/* ---------- vẽ ---------- */
var STEPS = ['① Mục tiêu', '② Nghe giảng', '③ Mổ xẻ mục', '④ Mổ xẻ câu', '⑤ Tự trả lời hết', '⑥ Thi chương', '⑦ Câu sai', '⑧ Số liệu & 🇬🇧 thuật ngữ'];
function stepDone(ci, s){ var c = DATA.chapters[ci]; switch (s){ case 1: return teachPct(ci) >= 100; case 2: return lessonsDone(ci) >= c.lessons.length; case 3: return questionsDone(ci) >= ((window.HOCDE && HOCDE.byChapter[ci]) || []).length; case 4: { var M = mastOf(ci); return M.n > 0 && M.m >= M.n; } case 5: return examBest(ci) != null && examBest(ci) >= 70; case 6: return wrongOfChapter(ci).length === 0 && !!examBest(ci); default: return false; } }
function listView(el){
  var cur = P.cur;
  var h = '<div class="card"><h2>📗 Học gọn từng chương</h2><p class="muted" style="margin-top:6px;line-height:1.6">Chọn <b>một chương</b> và đi hết 8 bước của nó trước khi sang chương khác: mục tiêu → nghe giảng → mổ xẻ từng mục → mổ xẻ từng câu đề → <b>tự trả lời hết câu đề</b> → thi chương → dọn câu sai → thuộc số liệu. Mọi thứ của chương nằm trong một màn, không cần nhảy tab.</p>'
    + (cur != null ? '<div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn" onclick="chStart(' + cur + ')">▶ Tiếp tục chương đang học: ' + esc(DATA.chapters[cur].vi) + ' (' + chapterPct(cur) + '%)</button></div>' : '') + '</div>';
  h += '<div class="chap-list">' + ORDER.map(function(ci, k){ var c = DATA.chapters[ci], pct = chapterPct(ci), nq = ((window.HOCDE && HOCDE.byChapter[ci]) || []).length, eb = examBest(ci), M = mastOf(ci);
    return '<div class="chap' + (ci === cur ? ' ch-cur' : '') + '" onclick="chStart(' + ci + ')"><div class="num">' + (k + 1) + '</div><div class="meta"><b>' + esc(c.vi) + '</b><div class="muted" style="font-size:12px">' + c.lessons.length + ' mục · ' + nq + ' câu đề' + (M.n ? ' · <span style="color:' + (M.m >= M.n ? 'var(--green)' : 'var(--accent2)') + '">🎯 tự trả lời được ' + M.m + '/' + M.n + '</span>' : '') + (eb != null ? ' · thi ' + eb + '%' : '') + (ci === cur ? ' · <span style="color:var(--accent2)">đang học</span>' : '') + '</div><div class="ch-prog" style="margin-top:5px;max-width:260px"><i style="width:' + pct + '%"></i></div></div><div style="font-weight:800;color:' + (pct >= 100 ? 'var(--green)' : 'var(--accent2)') + '">' + pct + '%</div></div>'; }).join('') + '</div>';
  el.innerHTML = '<div class="ch-wrap">' + h + '</div>';
}
function render(){
  var el = document.getElementById('v-chuong'); if (!el) return;
  if (S.ci === null){ listView(el); return; }
  if (S.ci < 0){ el.innerHTML = '<div class="ch-wrap"><div class="card" style="padding:14px 16px"><button class="back" onclick="chList()">← Các chương</button><div class="muted" style="font-size:12.5px;margin-top:4px">Trộn câu đề của mọi chương như đề thi thật. Muốn học gọn từng chương thì quay lại danh sách.</div></div>' + drillHTML(-1) + '</div>'; return; }
  var ci = S.ci, c = DATA.chapters[ci], X = EXTRA[ci] || {}, pts = (window.HOCDE && HOCDE.byChapter[ci]) || [];
  var h = '<div class="card" style="padding:14px 16px"><button class="back" onclick="chList()">← Các chương</button><div class="row" style="justify-content:space-between;align-items:flex-start;margin-top:6px"><div><span class="pill">Chương ' + (ci + 1) + '</span><h2 style="margin-top:4px">' + esc(c.vi) + '</h2><div class="muted" style="font-size:12.5px">' + esc(c.en || '') + '</div></div><div style="text-align:right;min-width:90px"><div style="font-size:22px;font-weight:800;color:var(--accent2)">' + chapterPct(ci) + '%</div><div class="muted" style="font-size:11px">hoàn thành chương</div></div></div>'
    + '<div class="ch-steps" style="margin-top:10px">' + STEPS.map(function(s, i){ return '<button class="' + (S.step === i ? 'on' : stepDone(ci, i) ? 'ok' : '') + '" onclick="chStep(' + i + ')">' + s + (stepDone(ci, i) && S.step !== i ? ' ✓' : '') + '</button>'; }).join('') + '</div></div>';
  var body = '';
  if (S.step === 0){
    var gs = window.HOCDE ? HOCDE.groups(ci).filter(function(g){ return g.L; }).sort(function(a, b){ return b.pts.length - a.pts.length; }).slice(0, 5) : [];
    body = '<div class="card"><h3 style="margin:0 0 6px">① Mục tiêu chương này</h3>' + (c.intro ? '<p style="line-height:1.65">' + esc(c.intro.vi) + '</p>' : '')
      + (X.story ? '<div class="gb-story" style="margin-top:10px">💡 <b>Hình dung cả chương:</b> ' + X.story + '</div>' : '')
      + '<div class="nr-grid" style="margin-top:12px"><div class="nr-stat"><b>' + c.lessons.length + '</b><span>mục cần mổ xẻ</span></div><div class="nr-stat"><b style="color:var(--yellow)">' + pts.length + '</b><span>câu đề thật về chương</span></div><div class="nr-stat"><b>' + (c.deep || []).length + '</b><span>ý giảng giải</span></div><div class="nr-stat"><b style="color:' + (examBest(ci) != null && examBest(ci) >= 70 ? 'var(--green)' : 'var(--muted)') + '">' + (examBest(ci) != null ? examBest(ci) + '%' : '—') + '</b><span>thi chương tốt nhất</span></div></div>'
      + (gs.length ? '<h4 style="margin:14px 0 4px;color:var(--accent2);font-size:14px">Đề thi nhắm vào mục nào của chương</h4>' + gs.map(function(g){ return '<div class="nr-weak" style="cursor:pointer" onclick="chOpenLesson(' + g.li + ')"><div class="nm"><div>Mục ' + (g.li + 1) + ': ' + esc(g.title) + '</div><div class="nr-bar"><i style="width:' + Math.round(g.pts.length / gs[0].pts.length * 100) + '%;background:var(--accent)"></i></div></div><div class="pc" style="color:var(--accent)">' + g.pts.length + '×</div></div>'; }).join('') : '')
      + (c.key ? '<h4 style="margin:14px 0 4px;color:var(--accent2);font-size:14px">🔑 Học xong chương phải nói được</h4><ul class="lesson">' + c.key.map(function(k){ return '<li>' + k.vi + '</li>'; }).join('') + '</ul>' : '')
      + '<div class="gb-row"><button class="btn" onclick="chStep(1)">Bắt đầu: ② Nghe giảng →</button></div></div>';
  }
  else if (S.step === 1){
    var tp = teachPct(ci);
    body = '<div class="card"><h3 style="margin:0 0 6px">② Nghe thầy giảng chương này</h3><p class="muted" style="line-height:1.6">Đi hết các slide: hình mô phỏng → giảng từng đoạn → hỏi lại → bẫy → số liệu → chốt thuật ngữ. ' + (tp >= 100 ? '<b style="color:var(--green)">Đã nghe xong.</b>' : tp ? 'Đang ở ' + tp + '%.' : 'Chưa bắt đầu.') + '</p><div class="ch-prog" style="margin:8px 0"><i style="width:' + tp + '%"></i></div>'
      + '<div class="gb-row"><button class="btn" onclick="gbStart(' + ci + ')">🎙️ ' + (tp && tp < 100 ? 'Nghe tiếp' : tp >= 100 ? 'Nghe lại' : 'Bắt đầu nghe giảng') + '</button><button class="btn sec" onclick="gbStart(' + ci + ',true,true)">🎧 Tự chạy cả chương</button><button class="btn ghost" onclick="go(\'learn\');openChap(' + ci + ')">📄 Bản đọc đầy đủ</button>' + (tp >= 100 || tp > 0 ? '<button class="btn sec" onclick="chStep(2)">Sang ③ Mổ xẻ mục →</button>' : '') + '</div></div>';
  }
  else if (S.step === 2){
    body = '<div class="card"><h3 style="margin:0 0 6px">③ Mổ xẻ từng mục — ' + lessonsDone(ci) + '/' + c.lessons.length + ' đã nắm</h3><p class="muted" style="line-height:1.6">Mỗi mục gom: ý chính, đoạn giảng giải, hình, <b>đề thi hỏi gì đúng ở mục này</b>, bẫy, số liệu. Đọc xong, tự nói lại 1 câu, bấm "Tôi nắm" để mở mục tiếp. Mục nào "chưa thấy trong đề" đọc nhanh thôi.</p><div class="ch-prog"><i style="width:' + Math.round(lessonsDone(ci) / Math.max(1, c.lessons.length) * 100) + '%"></i></div>'
      + c.lessons.map(function(L, li){ return lessonCardHTML(ci, li, S.openL === li); }).join('')
      + '<div class="gb-row" style="margin-top:14px"><button class="btn" onclick="chStep(3)">Sang ④ Mổ xẻ câu đề →</button></div></div>';
  }
  else if (S.step === 3){
    var ql = qlist(ci);
    body = '<div class="card"><h3 style="margin:0 0 6px">④ Mổ xẻ từng câu đề của chương — ' + questionsDone(ci) + '/' + pts.length + '</h3><p class="muted" style="line-height:1.6">Mỗi câu: từ quyết định nghĩa, số liệu, từ khó, dịch, đáp án và vì sao. Đọc câu → tự trả lời → mở xem. Muốn luyện kiểu trắc nghiệm có chấm thì bấm "Luyện bằng Học từ đề".</p>'
      + '<div class="row" style="justify-content:flex-start;gap:6px;margin:6px 0"><button class="nr-chip' + (S.qfilter === '' ? ' on' : '') + '" onclick="chQFilter(\'\')">Tất cả (' + pts.length + ')</button><button class="nr-chip' + (S.qfilter === 'todo' ? ' on' : '') + '" onclick="chQFilter(\'todo\')">Chưa mổ xẻ</button><button class="nr-chip' + (S.qfilter === 'mcq' ? ' on' : '') + '" onclick="chQFilter(\'mcq\')">Trắc nghiệm</button>' + (window.hdStart ? '<button class="gb-tbtn" onclick="hdStart(' + ci + ')">📘 Luyện bằng Học từ đề</button>' : '') + '</div>'
      + (ql.length ? ql.map(function(p, i){ return questionCardHTML(ci, p, i, S.openQ === i); }).join('') : '<p class="muted">Không có câu nào.</p>')
      + '<div class="gb-row" style="margin-top:14px"><button class="btn" onclick="chStep(4)">Sang ⑤ Tự trả lời hết →</button></div></div>';
  }
  else if (S.step === 4){
    body = drillHTML(ci);
  }
  else if (S.step === 5){
    var eb = examBest(ci); var r = null; try{ r = chapResult(ci); }catch(e){}
    body = '<div class="card"><h3 style="margin:0 0 6px">⑥ Thi chương (chấm điểm, tiếng Anh như đề thật)</h3><p class="muted" style="line-height:1.6">Đề rút từ câu đề thật cùng chủ đề + quiz chương, có giờ, không hiện đáp án tới khi nộp. Mốc đậu 70%. ' + (eb != null ? 'Cao nhất: <b style="color:' + (eb >= 70 ? 'var(--green)' : 'var(--accent)') + '">' + eb + '%</b>' + (r ? ' · ' + (r.attempts || 0) + ' lần' : '') + '.' : 'Chưa thi.') + '</p>'
      + '<div class="gb-row"><button class="btn" onclick="examChap(' + ci + ')">📝 ' + (eb != null ? 'Thi lại' : 'Thi chương này') + '</button><button class="btn sec" onclick="go(\'quiz\');startChap(' + ci + ')">Ôn quiz (hiện đáp án)</button>' + (eb != null ? '<button class="btn sec" onclick="chStep(6)">Sang ⑦ Câu sai →</button>' : '') + '</div></div>';
  }
  else if (S.step === 6){
    var ws = wrongOfChapter(ci);
    body = '<div class="card"><h3 style="margin:0 0 6px">⑦ Câu sai của chương này — ' + ws.length + ' câu chưa thuộc</h3><p class="muted" style="line-height:1.6">Gom từ mọi chế độ (quiz, thi chương, tài liệu thi, thi thử, học từ đề). Luyện lại đến khi đúng 2 lần.</p>'
      + (ws.length ? ws.slice(0, 30).map(function(w){ return '<div class="nr-wrong"><div class="q">' + esc(w.q) + (w.qv ? '<div class="muted" style="font-weight:400;font-size:13px">' + esc(w.qv) + '</div>' : '') + '</div><div class="o ok" style="margin-top:6px">✓ ' + esc(w.o[w.a]) + '</div>' + (w.ev ? '<div class="ex">💡 ' + esc(w.ev) + '</div>' : '') + '</div>'; }).join('') : '<p style="color:var(--green)">🎉 Không còn câu sai nào thuộc chương này.</p>')
      + '<div class="gb-row" style="margin-top:12px">' + (ws.length ? '<button class="btn" onclick="chReviewWrong(' + ci + ')">📝 Luyện lại ' + Math.min(20, ws.length) + ' câu</button>' : '') + '<button class="btn sec" onclick="go(\'wrong\')">📕 Sổ câu sai chung</button><button class="btn sec" onclick="chStep(7)">Sang ⑧ Số liệu & thuật ngữ →</button></div></div>';
  }
  else {
    var nx = ORDER[(ORDER.indexOf(ci) + 1) % ORDER.length];
    body = '<div class="card"><h3 style="margin:0 0 6px">⑧ Số liệu, thần chú & tiếng Anh chuyên ngành của chương</h3>' + (X.numbers ? '<ul class="lesson">' + X.numbers.map(function(n){ return '<li>' + n + '</li>'; }).join('') + '</ul>' : '<p class="muted">Chương này không có bảng số riêng.</p>') + (X.mnemonic ? '<div class="gb-story" style="margin-top:10px">🧷 ' + X.mnemonic + '</div>' : '')
      + (X.traps ? '<h4 style="margin:14px 0 4px;color:var(--red);font-size:14px">⚠️ Bẫy đề của chương (' + X.traps.length + ')</h4><ul class="lesson">' + X.traps.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>' : '')
      + (window.ENT ? ENT.chapterHTML(ci) : '')
      + '<div class="gb-row" style="margin-top:14px"><button class="btn" onclick="chStart(' + nx + ',0)">▶ Chương tiếp theo: ' + esc(DATA.chapters[nx].vi) + '</button><button class="btn sec" onclick="chList()">Danh sách chương</button></div></div>';
  }
  el.innerHTML = '<div class="ch-wrap">' + h + body + '</div>';
}
window.renderChuong = render;
new MutationObserver(function(){ try{ ensure(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
