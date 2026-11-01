/* ============================================================
   HOCDE — 📘 HỌC TỪ ĐỀ THI (lật ngược đề thành bài học)
   Mỗi câu đề thật (Tài liệu thi 510 câu + ngân hàng CSWIP 206 câu)
   → 1 "điểm kiến thức": Đề hỏi gì → Điều phải nhớ → Vì sao.
   Xếp theo 18 chương và đúng từng MỤC bài học (nhờ THI_LESSON_MAP +
   khớp từ khóa), nên học xong là biết đề thi "soi" chỗ nào của chương.
   Cách học: gợi nhớ chủ động (đọc câu hỏi → tự trả lời → hiện đáp án
   → tự chấm Đã nắm / Chưa chắc) → bảng tóm tắt → kiểm tra lại bằng
   chính các câu đó (tiếng Anh). Kết quả ghi vào SRS & Sổ câu sai.
   Nạp SAU map_thi.js, bank, thibank, premium (CHAP_CATS), giangbai;
   TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function') return;
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
function shuf(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, would:1, following:1, most:1, likely:1, when:1, used:1, type:1, welding:1, weld:1, welds:1, during:1, should:1, can:1, not:1, than:1, into:1, if:1, has:1, have:1, its:1, all:1, one:1, two:1, may:1, will:1, these:1, there:1, their:1, more:1, less:1, some:1, any:1, out:1, does:1, do:1, also:1, about:1, been:1, was:1, were:1, but:1, after:1, before:1, between:1, where:1, how:1, why:1, who:1, so:1, no:1, yes:1, reference:1, previous:1, answer:1, question:1, wps:1, statement:1, true:1, false:1, correct:1, incorrect:1, best:1, main:1, normally:1, usually:1, considered:1, following:1};
function words(s){ return String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
function mapKey(q){ return String(q).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 60); }
var ORDER = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];
var SRC = {wp1:'Work Pack 1', wp2:'Work Pack 2', wptwi:'Work Pack TWI', lead:'Leading Q', ring:'WPS Rings', fb:'Điền khuyết', dd:'Kéo-thả', c21:'Hỏi đáp 2.1', c22:'Kinh nghiệm 2.2', c23:'Hỏi đáp 2.3'};

/* ---------- gom điểm kiến thức ---------- */
var POINTS = [], BYCH = {}, seenQ = {};
var CAT2CH = {}; try{ var CC = (typeof CHAP_CATS !== 'undefined') ? CHAP_CATS : {}; Object.keys(CC).forEach(function(ci){ CC[ci].forEach(function(c){ if (CAT2CH[c] == null) CAT2CH[c] = +ci; }); }); }catch(e){}
var LW = DATA.chapters.map(function(c){ return (c.lessons || []).map(function(L){ var tw = words(L.t_en || ''), bw = words(L.en || ''); return {tw:tw, bw:bw}; }); });
function bestLesson(ci, text){
  var qw = words(text); if (!qw.length) return -1; var set = {}; qw.forEach(function(w){ set[w] = 1; });
  var best = -1, bs = 0;
  (LW[ci] || []).forEach(function(L, li){ var tm = 0, bm = 0; L.tw.forEach(function(w){ if (set[w]) tm++; }); L.bw.forEach(function(w){ if (set[w]) bm++; }); var sc = (tm * 2 + bm) / Math.sqrt(L.tw.length + L.bw.length + 4); if (sc > bs){ bs = sc; best = li; } });
  return bs >= 0.3 ? best : -1;
}
function add(p){ var k = mapKey(p.q); if (seenQ[k]) return; seenQ[k] = 1; POINTS.push(p); (BYCH[p.ci] = BYCH[p.ci] || []).push(p); }
(function build(){
  var M = window.THI_LESSON_MAP || {};
  ['THI_WP1', 'THI_WP2', 'THI_WPTWI', 'THI_LEAD', 'THI_RING', 'THI_FB', 'THI_DD', 'THI_C21', 'THI_C22', 'THI_C23'].forEach(function(k){
    var s = window[k]; if (!s || !s.items) return;
    var prev = null;
    s.items.forEach(function(it, i){
      var m = M[mapKey(it.q)]; var mcq = !!(it.o && typeof it.a === 'number');
      var ctx = null; if (prev && /reference to the (previous|above)|previous answer|the answer above|referring to the previous/i.test(it.q)) ctx = {q:prev.q, ans:prev.ans, vq:prev.vq || ''};
      prev = {q:it.q, ans:mcq ? it.o[it.a] : (it.a || ''), vq:it.vq};
      var ci = m ? m[0] : null, li = m ? m[1] : -1;
      var ans = mcq ? it.o[it.a] : (it.a || '');
      if (ci == null){ // chưa map: đoán chương theo từ khóa
        var bestC = -1, bs = 0; DATA.chapters.forEach(function(c, cj){ var li2 = bestLesson(cj, it.q + ' ' + ans); if (li2 >= 0){ bs = 1; bestC = cj; } }); if (bestC < 0) return; ci = bestC;
      }
      if (li < 0) li = bestLesson(ci, it.q + ' ' + ans);
      add({id:'t:' + s.id + ':' + i, ci:ci, li:li, src:SRC[s.id] || s.vi, mcq:mcq, q:it.q, vq:it.vq || '', opts:mcq ? it.o : null, a:mcq ? it.a : -1, ans:ans, ansVi:'', why:(it.va || '') + (it.n ? ' ⚠️ ' + it.n : ''), cat:SRC[s.id] || s.vi, ctx:ctx});
    });
  });
  function bank(arr, pre, label){ if (!arr) return; arr.forEach(function(q, i){ if (!q.o || typeof q.a !== 'number') return; var ci = CAT2CH[q.c]; if (ci == null) return; var li = bestLesson(ci, q.q + ' ' + q.o[q.a]); add({id:pre + i, ci:ci, li:li, src:label, mcq:true, q:q.q, vq:q.qv || '', opts:q.o, a:q.a, ans:q.o[q.a], ansVi:(q.ov && q.ov[q.a]) || '', optsVi:q.ov || null, why:q.ev || q.e || '', cat:q.c}); }); }
  try{ bank(typeof REALBANK !== 'undefined' ? REALBANK : null, 'r', 'Đề thật CSWIP'); bank(typeof BANK !== 'undefined' ? BANK : null, 'b', 'Ngân hàng CSWIP'); }catch(e){}
  Object.keys(BYCH).forEach(function(ci){ BYCH[ci].sort(function(a, b){ return (a.li < 0 ? 999 : a.li) - (b.li < 0 ? 999 : b.li); }); });
})();
function groups(ci){
  var out = [], map = {};
  (BYCH[ci] || []).forEach(function(p){ var k = p.li < 0 ? 'x' : p.li; if (!map[k]){ var L = p.li >= 0 ? DATA.chapters[ci].lessons[p.li] : null; map[k] = {li:p.li, L:L, title:L ? L.t_vi : 'Kiến thức khác đề hay hỏi', en:L ? L.t_en : '', pts:[]}; out.push(map[k]); } map[k].pts.push(p); });
  return out;
}

/* ---------- tiến độ ---------- */
var P = LS('cswip_hocde', {}); // ci -> {k:{pid:1 learned}, u:{pid:1 unsure}, i:index}
function prg(ci){ if (ci == null) ci = pkey(); if (!P[ci]) P[ci] = {k:{}, u:{}, i:0}; return P[ci]; }
function save(){ SV('cswip_hocde', P); }
window.hdProgress = function(ci){ var p = P[ci]; var n = (BYCH[ci] || []).length; if (!n) return null; var k = p ? Object.keys(p.k).length : 0; return {n:n, k:k, pct:Math.round(k / n * 100)}; };

/* ---------- trạng thái ---------- */
var S = {ci:null, set:null, mode:'list', i:0, show:false, qs:null, qi:0, qa:null, right:0, dis:false};
window.hdDis = function(){ S.dis = !S.dis; render(); };
var SETCACHE = {};
function setPoints(label){ if (!SETCACHE[label]) SETCACHE[label] = POINTS.filter(function(p){ return p.src === label; }).sort(function(a, b){ return a.ci - b.ci || (a.li < 0 ? 999 : a.li) - (b.li < 0 ? 999 : b.li); }); return SETCACHE[label]; }
function cur(){ return S.set ? setPoints(S.set) : (BYCH[S.ci] || []); }
function pkey(){ return S.set ? 'set:' + S.set : S.ci; }

/* ---------- CSS + tab ---------- */
function ensure(){
  if (document.getElementById('v-hocde')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-hocde'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function' && !TABS.some(function(t){ return t[0] === 'hocde'; })){ var at = TABS.findIndex(function(t){ return t[0] === 'teach'; }); TABS.splice(at >= 0 ? at + 1 : 2, 0, ['hocde', '📘 Học từ đề']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  if (!window._hdWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'hocde') render(); }catch(e){ console.error(e); } }; window._hdWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
  '.hd-wrap{max-width:780px;margin:0 auto}',
  '.hd-grp{display:flex;gap:10px;align-items:flex-start;background:rgba(76,168,255,.07);border:1px solid rgba(76,168,255,.25);border-radius:12px;padding:10px 12px;margin-bottom:12px}',
  '.hd-grp .n{flex:none;font-size:22px}',
  '.hd-grp b{color:var(--accent2)}',
  '.hd-grp .ctx{font-size:13.5px;color:var(--muted);margin-top:3px;line-height:1.55}',
  '.hd-q{font-size:17px;font-weight:700;line-height:1.5}',
  '.hd-q mark{background:rgba(255,214,10,.3);color:var(--yellow);padding:0 3px;border-radius:4px}',
  '.hd-vq{color:var(--muted);font-size:14px;margin-top:4px}',
  '.hd-ans{margin-top:14px;padding:12px 14px;border-radius:12px;background:rgba(52,199,89,.1);border:1px solid rgba(52,199,89,.4);animation:hdin .3s ease}',
  '@keyframes hdin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
  '.hd-ans .lbl{font-size:12px;color:var(--green);font-weight:700;letter-spacing:.4px;text-transform:uppercase}',
  '.hd-ans .a{font-size:16.5px;font-weight:700;margin-top:4px;line-height:1.5}',
  '.hd-ans .why{margin-top:8px;font-size:14.5px;line-height:1.6;color:#dbe7ff}',
  '.hd-opts{margin-top:10px}',
  '.hd-opt{display:block;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);color:var(--txt);border-radius:12px;padding:11px 13px;margin-top:7px;font-size:14.5px;line-height:1.45;font-family:inherit;cursor:pointer}',
  '.hd-opt.ok{background:rgba(52,199,89,.16);border-color:var(--green)}.hd-opt.bad{background:rgba(255,69,58,.14);border-color:var(--red)}.hd-opt[disabled]{cursor:default}',
  '.hd-opt .sub{display:block;color:var(--muted);font-size:13px;margin-top:2px}',
  '.hd-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;align-items:center}',
  '.hd-src{font-size:12px;color:var(--muted)}',
  '.hd-prog{height:6px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden;flex:1;min-width:100px}',
  '.hd-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent2),var(--green))}',
  '.hd-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap}',
  '.hd-top small{color:var(--muted);font-size:12px;white-space:nowrap}',
  '.hd-sum h4{color:var(--accent2);font-size:14.5px;margin:14px 0 4px}',
  '.hd-sum .ctx{font-size:13px;color:var(--muted);margin-bottom:6px;line-height:1.5}',
  '.hd-sum .it{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line);font-size:13.5px;line-height:1.5}',
  '.hd-sum .it .l{color:var(--muted)}.hd-sum .it .r b{color:var(--green)}',
  '.hd-sum .it .vi{display:block;font-size:12.5px;color:var(--muted)}',
  '.hd-sum .it.learned .r b{color:var(--green)}.hd-sum .it.unsure{background:rgba(255,214,10,.05)}',
  '@media(max-width:560px){.hd-sum .it{grid-template-columns:1fr}}',
  '.hd-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11.5px;font-weight:700}',
  '@media print{body *{visibility:hidden}#v-hocde,#v-hocde *{visibility:visible}#v-hocde{position:absolute;left:0;top:0;width:100%;color:#000}.hd-top,.hd-row,.btn{display:none!important}}'
  ].join('\n');
  document.head.appendChild(css);
}
var NEG = /\b(NOT|EXCEPT|LEAST|NEVER|ALWAYS|MOST|BEST|FIRST|MAIN|PRIMARY|ONLY|MINIMUM|MAXIMUM|INCORRECT|FALSE|TRUE|LOWEST|HIGHEST|GREATEST)\b/g;
function markQ(en){ return esc(en).replace(NEG, function(m){ return '<mark>' + m + '</mark>'; }); }

/* ---------- API ---------- */
window.hdStart = function(ci, fromStart){
  if (typeof chapFree === 'function' && !chapFree(ci)){ go('learn'); openChap(ci); return; }
  S.set = null; S.ci = ci; S.mode = 'study'; var p = prg(ci); S.i = fromStart ? 0 : Math.min(p.i || 0, Math.max(0, (BYCH[ci] || []).length - 1)); S.show = false; S.qs = null; go('hocde');
};
/* học kiến thức của một BỘ đề (Tài liệu thi) — xếp theo chương → mục */
window.hdStartSet = function(label, fromStart){
  var pts = setPoints(label); if (!pts.length){ T('Bộ này chưa có điểm kiến thức'); return; }
  S.set = label; S.ci = pts[0].ci; S.mode = 'study'; var p = prg(); S.i = fromStart ? 0 : Math.min(p.i || 0, pts.length - 1); S.show = false; S.qs = null; go('hocde');
};
/* nhảy tới đúng điểm kiến thức theo id (từ Tài liệu thi) */
window.hdJumpTo = function(id){
  var p = null; for (var i = 0; i < POINTS.length; i++) if (POINTS[i].id === id){ p = POINTS[i]; break; } if (!p) return;
  if (typeof chapFree === 'function' && !chapFree(p.ci)){ go('learn'); openChap(p.ci); return; }
  S.set = null; S.ci = p.ci; S.mode = 'study'; S.i = Math.max(0, (BYCH[p.ci] || []).indexOf(p)); S.show = false; S.qs = null; go('hocde');
};
window.hdList = function(){ S.mode = 'list'; S.ci = null; S.set = null; render(); };
window.hdSummary = function(ci){ if (ci != null) S.ci = ci; S.mode = 'summary'; render(); };
window.hdShow = function(){ S.show = true; render(); };
window.hdMark = function(ok){
  var p = prg(), pt = cur()[S.i]; if (!pt) return;
  if (ok){ p.k[pt.id] = 1; delete p.u[pt.id]; } else { p.u[pt.id] = 1; delete p.k[pt.id]; }
  if (S.set){ var pc = prg(pt.ci); if (ok){ pc.k[pt.id] = 1; delete pc.u[pt.id]; } else { pc.u[pt.id] = 1; delete pc.k[pt.id]; } } // đồng bộ với tiến độ chương
  S.i++; p.i = S.i; S.show = false; save();
  if (S.i >= cur().length){ S.mode = 'end'; }
  render();
};
window.hdGo = function(d){ S.i = Math.max(0, Math.min(cur().length - 1, S.i + d)); S.show = false; prg().i = S.i; save(); render(); };
window.hdJump = function(i){ S.mode = 'study'; S.i = i; S.show = false; render(); };
window.hdQuiz = function(onlyUnsure){
  var p = prg(); var pool = cur().filter(function(x){ return x.mcq && (!onlyUnsure || p.u[x.id]); });
  if (!pool.length){ T('Không có câu trắc nghiệm phù hợp'); return; }
  S.qs = shuf(pool).slice(0, 15); S.qi = 0; S.qa = null; S.right = 0; S.mode = 'quiz'; render();
};
window.hdPick = function(k){
  if (S.qa !== null) return; S.qa = k; var q = S.qs[S.qi], right = k === q.a; if (right) S.right++;
  var p = prg(); if (right){ p.k[q.id] = 1; delete p.u[q.id]; } else { p.u[q.id] = 1; } if (S.set){ var pc = prg(q.ci); if (right){ pc.k[q.id] = 1; delete pc.u[q.id]; } else pc.u[q.id] = 1; } save();
  try{ QUIZSTATE[q.id] = {correct:right}; if (typeof srsUpdate === 'function') srsUpdate(q.id, right); if (typeof window.save === 'function') window.save(); if (typeof gameTick === 'function') gameTick(right); }catch(e){}
  try{ if (window.NR && NR.record) NR.record({id:q.id, qe:q.q, qv:q.vq, oe:q.opts, ov:q.optsVi || [], a:q.a, ee:'', ev:q.why, cat:q.cat, src:'Học từ đề — ' + q.src, lesson:[q.ci, q.li]}, k, right, {}); }catch(e){}
  render();
};
window.hdQNext = function(){ S.qi++; S.qa = null; if (S.qi >= S.qs.length){ S.mode = 'end'; } render(); };
window.hdSpeak = function(id){ var el = document.getElementById(id); if (el && window.gbSpeakText) gbSpeakText(el.textContent, /[a-zA-Z]{4,}/.test(el.textContent) && !/[ăâđêôơưàáạảãèéẹẻẽìíịỉĩòóọỏõùúụủũỳýỵỷỹ]/i.test(el.textContent) ? 'en-GB' : 'vi-VN'); };

/* ---------- vẽ ---------- */
function topBar(){
  var n = cur().length, p = prg(), k = Object.keys(p.k).length;
  return '<div class="hd-top"><button class="back" style="margin:0" onclick="' + (S.set ? "go('thi')" : 'hdList()') + '">← ' + (S.set ? 'Tài liệu thi' : 'Danh sách') + '</button><div class="hd-prog"><i style="width:' + Math.round(k / Math.max(1, n) * 100) + '%"></i></div><small>đã nắm ' + k + '/' + n + (S.set ? ' · bộ ' + esc(S.set) : ' · Ch.' + (S.ci + 1)) + '</small><button class="gb-tbtn" onclick="hdSummary()">📄 Bảng tóm tắt</button></div>';
}
function listView(el){
  var tot = POINTS.length, learned = 0; Object.keys(P).forEach(function(ci){ learned += Object.keys(P[ci].k || {}).length; });
  var h = '<div class="card"><h2>📘 Học từ đề thi</h2><p class="muted" style="margin-top:6px;line-height:1.6">Lật ngược <b>' + tot + ' câu đề thật</b> thành bài học: mỗi câu là một điểm kiến thức <b>"Đề hỏi gì → Điều phải nhớ → Vì sao"</b>, xếp đúng vào từng mục của 18 chương. Học kiểu gợi nhớ chủ động: đọc câu hỏi, tự trả lời trong đầu, rồi mới hiện đáp án và tự chấm. Cuối chương kiểm tra lại bằng chính các câu đó (tiếng Anh), câu sai vào 📕 Sổ câu sai.</p>'
    + '<div class="nr-grid" style="grid-template-columns:repeat(3,1fr)"><div class="nr-stat"><b style="color:var(--accent2)">' + tot + '</b><span>Điểm kiến thức</span></div><div class="nr-stat"><b style="color:var(--green)">' + learned + '</b><span>Đã nắm</span></div><div class="nr-stat"><b>' + Math.round(learned / Math.max(1, tot) * 100) + '%</b><span>Hoàn thành</span></div></div></div>';
  h += '<div class="chap-list">' + ORDER.map(function(ci, k){
    var c = DATA.chapters[ci], pts = BYCH[ci] || [], p = P[ci], kn = p ? Object.keys(p.k).length : 0, un = p ? Object.keys(p.u).length : 0, g = groups(ci).length;
    var locked = (typeof chapFree === 'function' && !chapFree(ci));
    var st = locked ? '<span class="hd-badge" style="background:rgba(255,255,255,.08);color:var(--muted)">🔒</span>' : kn >= pts.length && pts.length ? '<span class="hd-badge" style="background:rgba(52,199,89,.15);color:var(--green)">✓ xong</span>' : kn ? '<span class="hd-badge" style="background:rgba(76,168,255,.15);color:var(--accent2)">' + Math.round(kn / pts.length * 100) + '%</span>' : '<span class="hd-badge" style="background:rgba(255,255,255,.08);color:var(--muted)">chưa học</span>';
    return '<div class="chap" onclick="hdStart(' + ci + ')"><div class="num">' + (k + 1) + '</div><div class="meta"><b>' + esc(c.vi) + '</b><div class="muted" style="font-size:12px">' + pts.length + ' điểm kiến thức · ' + g + ' mục · ' + pts.filter(function(x){ return x.mcq; }).length + ' câu trắc nghiệm' + (un ? ' · <span style="color:var(--yellow)">' + un + ' chưa chắc</span>' : '') + '</div></div><div>' + st + '</div></div>';
  }).join('') + '</div>';
  el.innerHTML = '<div class="hd-wrap">' + h + '</div>';
}
function groupHeader(pt, ci, always){
  ci = pt.ci; var L = pt.li >= 0 ? DATA.chapters[ci].lessons[pt.li] : null;
  var prev = cur()[S.i - 1]; var changed = always || !prev || prev.li !== pt.li || prev.ci !== pt.ci;
  var chTag = S.set ? '<div class="muted" style="font-size:11.5px;text-transform:uppercase;letter-spacing:.4px">Chương ' + (ci + 1) + ' · ' + esc(DATA.chapters[ci].vi) + '</div>' : '';
  if (!L) return changed ? '<div class="hd-grp"><div class="n">📚</div><div>' + chTag + '<b>Kiến thức khác đề hay hỏi</b><div class="ctx">Các điểm này nằm ngoài tóm tắt chương nhưng đề thi vẫn hỏi — nhớ như một bổ sung.</div></div></div>' : '';
  var idx = groups(ci).findIndex(function(g){ return g.li === pt.li; }) + 1;
  return '<div class="hd-grp"><div class="n">📚</div><div>' + chTag + '<b>Mục ' + idx + ': ' + esc(L.t_vi) + '</b>' + (L.t_en ? ' <span class="muted">(' + esc(L.t_en) + ')</span>' : '') + (changed ? '<div class="ctx">' + esc(L.vi) + '</div>' : '') + '</div></div>';
}
function studyView(el){
  var pts = cur(); if (!pts.length){ el.innerHTML = '<div class="hd-wrap">' + topBar() + '<div class="card"><p>Chương này chưa có câu đề nào được gắn.</p></div></div>'; return; }
  if (S.i >= pts.length) S.i = pts.length - 1;
  var pt = pts[S.i], p = prg(), state = p.k[pt.id] ? 'learned' : p.u[pt.id] ? 'unsure' : '';
  var h = topBar() + '<div class="card">' + groupHeader(pt, S.ci, S.i === 0)
    + '<div class="hd-src">🎯 Điểm ' + (S.i + 1) + '/' + pts.length + ' · nguồn: ' + esc(pt.src) + (state === 'learned' ? ' · <span style="color:var(--green)">đã nắm</span>' : state === 'unsure' ? ' · <span style="color:var(--yellow)">chưa chắc</span>' : '') + '</div>'
    + (pt.ctx ? '<div class="hd-vq" style="margin:6px 0;padding:8px 10px;border-left:3px solid var(--line);background:rgba(255,255,255,.03);border-radius:0 8px 8px 0">↩ Câu trước đó: <i>' + esc(pt.ctx.q) + '</i> → <b style="color:var(--txt)">' + esc(pt.ctx.ans) + '</b></div>' : '')
    + '<div class="hd-q" id="hd-q" style="margin-top:6px">Đề hỏi: ' + markQ(pt.q) + '</div>' + (pt.vq ? '<div class="hd-vq">' + esc(pt.vq) + '</div>' : '')
    + (S.dis && window.gbDissectHTML ? gbDissectHTML({en:pt.q, vi:pt.vq, opts:(pt.opts || [pt.ans]).map(function(o){ return {en:o}; })}, pt.li >= 0 ? DATA.chapters[pt.ci].lessons[pt.li].t_vi : DATA.chapters[pt.ci].vi) : '');
  if (pt.mcq && pt.opts) h += '<div class="hd-opts">' + pt.opts.map(function(o, k){ return '<div class="hd-opt' + (S.show && k === pt.a ? ' ok' : '') + '" style="cursor:default">' + String.fromCharCode(65 + k) + '. ' + esc(o) + (pt.optsVi && pt.optsVi[k] ? '<span class="sub">' + esc(pt.optsVi[k]) + '</span>' : '') + (S.show && k === pt.a ? ' ✓' : '') + '</div>'; }).join('') + '</div>';
  if (!S.show){
    h += '<div class="hd-row"><button class="btn" onclick="hdShow()">🤔 Tôi đã tự trả lời → hiện đáp án</button><button class="gb-tbtn' + (S.dis ? ' on' : '') + '" onclick="hdDis()">🔍 ' + (S.dis ? 'Ẩn mổ xẻ' : 'Mổ xẻ đề') + '</button><button class="gb-tbtn" onclick="hdSpeak(\'hd-q\')">🔊 Đọc câu hỏi</button><button class="btn ghost" onclick="hdGo(-1)" ' + (S.i === 0 ? 'disabled style="opacity:.4"' : '') + '>← Trước</button><button class="btn ghost" onclick="hdGo(1)">Bỏ qua →</button></div>';
  } else {
    h += '<div class="hd-ans"><div class="lbl">✅ Điều phải nhớ</div><div class="a" id="hd-a">' + esc(pt.ans) + (pt.ansVi ? ' <span class="muted" style="font-weight:400">— ' + esc(pt.ansVi) + '</span>' : '') + '</div>' + (pt.why ? '<div class="why">💡 ' + esc(pt.why) + '</div>' : '') + '</div>'
      + '<div class="hd-row"><button class="btn" style="background:linear-gradient(135deg,var(--green),#2a9d4a)" onclick="hdMark(true)">✅ Đã nắm</button><button class="btn sec" onclick="hdMark(false)">😕 Chưa chắc — ôn lại sau</button><button class="gb-tbtn" onclick="hdSpeak(\'hd-a\')">🔊</button>' + (pt.li >= 0 ? '<button class="gb-tbtn" onclick="go(\'learn\');openChap(' + pt.ci + ');setTimeout(function(){if(window.nrJumpLesson)nrJumpLesson(' + pt.ci + ',' + pt.li + ')},200)">📚 Mở bài học</button>' : '') + (window.gbStart ? '<button class="gb-tbtn" onclick="gbStart(' + pt.ci + ')">🎙️ Nghe giảng chương</button>' : '') + '</div>';
  }
  h += '</div>';
  el.innerHTML = '<div class="hd-wrap">' + h + '</div>'; window.scrollTo(0, 0);
}
function setGroups(){ var out = [], map = {}; cur().forEach(function(p){ var k = p.ci + ':' + (p.li < 0 ? 'x' : p.li); if (!map[k]){ var L = p.li >= 0 ? DATA.chapters[p.ci].lessons[p.li] : null; map[k] = {li:p.li, L:L, title:(L ? L.t_vi : 'Kiến thức khác đề hay hỏi'), en:L ? L.t_en : '', ch:DATA.chapters[p.ci].vi, pts:[]}; out.push(map[k]); } map[k].pts.push(p); }); return out; }
function summaryView(el){
  var gs = S.set ? setGroups() : groups(S.ci), p = prg(), c = DATA.chapters[S.ci];
  var h = topBar() + '<div class="card hd-sum"><h2>📄 Bảng kiến thức rút từ đề — ' + esc(S.set ? 'bộ ' + S.set : c.vi) + '</h2><p class="muted" style="font-size:13px;margin-top:4px">' + cur().length + ' điểm, xếp theo ' + (S.set ? 'chương → ' : '') + 'mục bài học. Dòng vàng = bạn đánh dấu chưa chắc. Bấm vào dòng để học lại điểm đó. Có thể in (Ctrl/Cmd+P).</p>'
    + '<div class="hd-row"><button class="btn" onclick="' + (S.set ? 'hdStartSet(' + JSON.stringify(S.set).replace(/"/g, '&quot;') + ',true)' : 'hdStart(' + S.ci + ',true)') + '">▶ Học từ đầu</button><button class="btn sec" onclick="hdQuiz(false)">📝 Kiểm tra 15 câu</button>' + (Object.keys(p.u).length ? '<button class="btn sec" onclick="hdQuiz(true)">🔁 Kiểm tra ' + Object.keys(p.u).length + ' câu chưa chắc</button>' : '') + '<button class="btn ghost" onclick="window.print()">🖨️ In</button></div>';
  gs.forEach(function(g, gi){
    h += '<h4>' + (g.ch ? '<span class="muted" style="font-weight:400;font-size:12px">' + esc(g.ch) + ' › </span>' : '') + (g.L ? (g.ch ? '' : 'Mục ' + (gi + 1) + ': ') + esc(g.title) + (g.en ? ' <span class="muted" style="font-weight:400">(' + esc(g.en) + ')</span>' : '') : esc(g.title)) + ' <span class="muted" style="font-weight:400;font-size:12px">· ' + g.pts.length + ' điểm</span></h4>' + (g.L ? '<div class="ctx">' + esc(g.L.vi) + '</div>' : '');
    g.pts.forEach(function(pt){ var i = cur().indexOf(pt); h += '<div class="it ' + (p.k[pt.id] ? 'learned' : p.u[pt.id] ? 'unsure' : '') + '" onclick="hdJump(' + i + ')" style="cursor:pointer"><div class="l">' + (pt.ctx ? '<span class="vi">↩ ' + esc(pt.ctx.q) + ' → ' + esc(pt.ctx.ans) + '</span>' : '') + esc(pt.q) + (pt.vq ? '<span class="vi">' + esc(pt.vq) + '</span>' : '') + '</div><div class="r"><b>→ ' + esc(pt.ans) + '</b>' + (pt.why ? '<span class="vi">' + esc(pt.why) + '</span>' : '') + '</div></div>'; });
  });
  h += '</div>';
  el.innerHTML = '<div class="hd-wrap">' + h + '</div>'; window.scrollTo(0, 0);
}
function quizView(el){
  var q = S.qs[S.qi];
  var h = topBar() + '<div class="card"><div class="hd-src">📝 Kiểm tra lại — câu ' + (S.qi + 1) + '/' + S.qs.length + ' · đúng ' + S.right + ' · ' + esc(q.src) + ' · đọc tiếng Anh như đề thật</div>'
    + (q.ctx ? '<div class="hd-vq" style="margin:6px 0">↩ Câu trước: <i>' + esc(q.ctx.q) + '</i> → <b style="color:var(--txt)">' + esc(q.ctx.ans) + '</b></div>' : '')
    + '<div class="hd-q" style="margin-top:6px">' + markQ(q.q) + '</div>'
    + '<div class="hd-opts">' + q.opts.map(function(o, k){ var cls = ''; if (S.qa !== null){ if (k === q.a) cls = ' ok'; else if (k === S.qa) cls = ' bad'; } return '<button class="hd-opt' + cls + '" ' + (S.qa === null ? 'onclick="hdPick(' + k + ')"' : 'disabled') + '>' + String.fromCharCode(65 + k) + '. ' + esc(o) + '</button>'; }).join('') + '</div>';
  if (S.qa !== null) h += '<div class="hd-ans" style="' + (S.qa === q.a ? '' : 'background:rgba(255,69,58,.08);border-color:rgba(255,69,58,.4)') + '"><div class="lbl" style="' + (S.qa === q.a ? '' : 'color:var(--red)') + '">' + (S.qa === q.a ? '✅ Chuẩn' : '❌ Chưa đúng — đáp án: ' + String.fromCharCode(65 + q.a)) + '</div>' + (q.vq ? '<div class="hd-vq">' + esc(q.vq) + '</div>' : '') + (q.why ? '<div class="why">💡 ' + esc(q.why) + '</div>' : '') + '</div><div class="hd-row"><button class="btn" onclick="hdQNext()">' + (S.qi + 1 >= S.qs.length ? 'Xem kết quả →' : 'Câu tiếp →') + '</button></div>';
  h += '</div>';
  el.innerHTML = '<div class="hd-wrap">' + h + '</div>'; window.scrollTo(0, 0);
}
function endView(el){
  var p = prg(), n = cur().length, k = Object.keys(p.k).length, u = Object.keys(p.u).length, c = DATA.chapters[S.ci];
  var quizLine = S.qs ? '<p>Kiểm tra vừa rồi: đúng <b>' + S.right + '/' + S.qs.length + '</b>' + (S.qs.length ? ' (' + Math.round(S.right / S.qs.length * 100) + '%)' : '') + '. Câu sai đã vào 📕 Sổ câu sai và lịch ôn ngắt quãng.</p>' : '';
  var nx = ORDER[(ORDER.indexOf(S.ci) + 1) % ORDER.length];
  el.innerHTML = '<div class="hd-wrap">' + topBar() + '<div class="card" style="text-align:center"><div style="font-size:40px">🎉</div><h2>' + (S.set ? 'Xong kiến thức bộ ' + esc(S.set) : 'Xong phần đề của chương ' + (S.ci + 1)) + '</h2><p class="muted" style="margin-top:6px">' + esc(S.set ? 'Các điểm kiến thức của bộ đề này' : c.vi) + ' — đã nắm <b style="color:var(--green)">' + k + '/' + n + '</b>' + (u ? ' · chưa chắc <b style="color:var(--yellow)">' + u + '</b>' : '') + '</p>' + quizLine
    + '<div class="hd-row" style="justify-content:center">' + (!S.qs ? '<button class="btn" onclick="hdQuiz(false)">📝 Kiểm tra 15 câu</button>' : '') + (u ? '<button class="btn sec" onclick="hdQuiz(true)">🔁 Kiểm tra ' + u + ' câu chưa chắc</button>' : '') + '<button class="btn sec" onclick="hdSummary()">📄 Bảng tóm tắt</button>' + (S.set ? '<button class="btn ghost" onclick="go(\'thi\')">📖 Về Tài liệu thi</button>' : '<button class="btn ghost" onclick="hdStart(' + nx + ',true)">▶ Chương tiếp: ' + esc(DATA.chapters[nx].vi) + '</button>') + '<button class="btn ghost" onclick="hdList()">Danh sách</button></div></div></div>';
  S.qs = null;
}
function render(){ var el = document.getElementById('v-hocde'); if (!el) return; if (S.ci === null || S.mode === 'list') return listView(el); if (S.mode === 'summary') return summaryView(el); if (S.mode === 'quiz') return quizView(el); if (S.mode === 'end') return endView(el); return studyView(el); }
window.renderHocde = render;
window.HOCDE = {points:POINTS, byChapter:BYCH, groups:groups};

/* ---------- gắn vào tab Bài học: thẻ "Đề thi hỏi gì ở chương này" ---------- */
function injectLearn(){
  var el = document.getElementById('v-learn'); if (!el || !el.classList.contains('on')) return;
  if (typeof CURCHAP === 'undefined' || CURCHAP === null || el.querySelector('#hd-learn')) return;
  var pts = BYCH[CURCHAP] || []; if (!pts.length) return;
  var btn = el.querySelector('#gb-learn-btn'); if (!btn) return;
  var d = document.createElement('div'); d.id = 'hd-learn'; d.className = 'card'; d.style.cssText = 'border-left:3px solid var(--yellow);display:flex;gap:12px;align-items:center;flex-wrap:wrap';
  d.innerHTML = '<div style="font-size:28px">📘</div><div style="flex:1;min-width:200px"><b>Đề thi hỏi gì ở chương này? — ' + pts.length + ' điểm kiến thức rút từ đề thật</b><div class="muted" style="font-size:12.5px;margin-top:2px">Mỗi câu đề → điều phải nhớ → vì sao, xếp theo ' + groups(CURCHAP).length + ' mục của chương. Học xong kiểm tra lại bằng chính các câu đó.</div></div><button class="btn sec" onclick="hdStart(' + CURCHAP + ')">📘 Học từ đề</button>';
  btn.insertAdjacentElement('afterend', d);
}
new MutationObserver(function(){ try{ ensure(); injectLearn(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
