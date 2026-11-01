/* ============================================================
   TIENGANH — 🇬🇧 Tiếng Anh chuyên ngành SÁT TÀI LIỆU & SÁT ĐỀ
   Đề thi CSWIP 3.1 bằng tiếng Anh, nên mỗi mục / mỗi chương gom:
     - thuật ngữ (từ điển 502 từ) xuất hiện trong chính mục đó,
       trong lời giảng tiếng Anh của giáo trình và trong câu đề thật
     - với mỗi thuật ngữ: nghĩa VI, câu giáo trình chứa nó, câu đề chứa nó,
       số lần đề dùng, nút đọc giọng Anh
     - ôn nhanh: thuật ngữ EN → chọn nghĩa VI (4 phương án)
   Cung cấp window.ENT cho chuong.js. Nạp SAU chuong.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined') return;
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function strip(h){ return String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function norm(s){ return ' ' + String(s || '').toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').replace(/\s+/g, ' ') + ' '; }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
var G = window.GLOSSARY || {};
var SKIP = {'which of the following':1, 'all of the above':1, 'none of the above':1, 'both':1, 'most likely':1, 'in accordance with':1, 'with reference to':1, 'refer to':1, 'according to':1, 'following':1, 'statement':1, 'true':1, 'false':1, 'correct':1, 'incorrect':1};
var KEYS = Object.keys(G).filter(function(k){ return k.length >= 3 && !SKIP[k]; }).sort(function(a, b){ return b.length - a.length; });
var GENERIC = {standard:1, code:1, procedure:1, inspection:1, inspector:1, weld:1, welding:1, metal:1, material:1, joint:1, test:1, testing:1, report:1, defect:1, process:1, quality:1, check:1, record:1, specification:1, equipment:1, temperature:1, steel:1, surface:1, size:1, length:1, width:1, depth:1, thickness:1, position:1, type:1, method:1};
var CACHE = {};

function sentences(en){ var out = [], cur = ''; String(en || '').replace(/\s+/g, ' ').split(/([.!?]) (?=[A-Z(])/).forEach(function(part, i){ if (i % 2 === 0) cur = part; else { out.push((cur + part).trim()); cur = ''; } }); if (cur.trim()) out.push(cur.trim()); return out.filter(function(x){ return x.length > 20; }); }
function chapterCorpus(ci){
  if (CACHE[ci]) return CACHE[ci];
  var c = DATA.chapters[ci], book = [], exam = [];
  (c.deep || []).forEach(function(b){ (b.body || []).forEach(function(p){ sentences(p.en).forEach(function(s){ book.push(s); }); }); (b.rows || []).forEach(function(r){ if (r.en && r.en.length > 20) book.push(strip(r.en)); }); });
  (c.key || []).forEach(function(k){ if (k.en) book.push(strip(k.en)); });
  (c.lessons || []).forEach(function(L){ if (L.en) book.push(strip(L.t_en ? L.t_en + ': ' + L.en : L.en)); });
  var pts = (window.HOCDE && HOCDE.byChapter[ci]) || [];
  pts.forEach(function(p){ exam.push({t:p.q + (p.opts ? ' — ' + p.opts.join(' / ') : ' — ' + (p.ans || '')), q:p.q, p:p}); });
  var bookN = book.map(norm), examN = exam.map(function(e){ return norm(e.t); });
  CACHE[ci] = {book:book, bookN:bookN, exam:exam, examN:examN};
  return CACHE[ci];
}
function hit(nText, k){ return nText.indexOf(' ' + k + ' ') >= 0 || (k.length > 5 && nText.indexOf(k) >= 0); }
function findTerms(text, limit){
  var low = norm(text), out = [], covered = low;
  for (var i = 0; i < KEYS.length && out.length < (limit || 14); i++){ var k = KEYS[i]; if (hit(covered, k)){ out.push(k); covered = covered.split(k).join(' '); } }
  return out;
}
function enrich(ci, k){
  var C = chapterCorpus(ci), freq = 0, ex = null, bk = null;
  for (var i = 0; i < C.examN.length; i++){ if (hit(C.examN[i], k)){ freq++; if (!ex) ex = C.exam[i]; } }
  for (var j = 0; j < C.bookN.length; j++){ if (hit(C.bookN[j], k)){ bk = C.book[j]; break; } }
  return {en:k, vi:G[k], freq:freq, ex:ex, book:bk, generic:!!GENERIC[k]};
}
function mark(sentence, k){ try{ var re = new RegExp('(' + k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+') + ')', 'ig'); return esc(sentence).replace(re, '<mark>$1</mark>'); }catch(e){ return esc(sentence); } }
function sortTerms(a){ return a.sort(function(x, y){ return (y.freq - x.freq) || (x.generic - y.generic) || (y.en.length - x.en.length); }); }

/* ---------- API ---------- */
var ENT = window.ENT = {};
ENT.lesson = function(ci, li){
  var c = DATA.chapters[ci], L = c.lessons[li]; if (!L) return [];
  var pts = ((window.HOCDE && HOCDE.byChapter[ci]) || []).filter(function(p){ return p.li === li; });
  var text = (L.t_en || '') + ' ' + (L.en || '') + ' ' + pts.map(function(p){ return p.q + ' ' + (p.opts ? p.opts.join(' ') : p.ans || ''); }).join(' ');
  var ks = findTerms(text, 14).map(function(k){ return enrich(ci, k); }).filter(function(t){ return !t.generic || t.freq >= 2; });
  return sortTerms(ks).slice(0, 10);
};
ENT.chapter = function(ci){
  var c = DATA.chapters[ci], C = chapterCorpus(ci), seen = {}, out = [];
  var text = C.book.join(' ') + ' ' + C.exam.map(function(e){ return e.t; }).join(' ');
  findTerms(text, 60).forEach(function(k){ if (!seen[k]){ seen[k] = 1; out.push(enrich(ci, k)); } });
  return sortTerms(out.filter(function(t){ return !t.generic || t.freq >= 3; })).slice(0, 40);
};
ENT.speak = function(t){ try{ if (window.gbSpeakText) gbSpeakText(t, 'en-GB'); else if ('speechSynthesis' in window){ var u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; speechSynthesis.cancel(); speechSynthesis.speak(u); } }catch(e){} };
window.entSpeak = function(t){ ENT.speak(t); };

/* ---------- HTML ---------- */
function termRow(t, compact){
  var h = '<div class="en-term"><div class="en-h"><button class="en-sp" onclick="entSpeak(' + JSON.stringify(t.en).replace(/"/g, '&quot;') + ')" title="Đọc giọng Anh">🔊</button><b>' + esc(t.en) + '</b><span class="en-vi">= ' + esc(t.vi) + '</span>' + (t.freq ? '<span class="en-f">đề dùng ' + t.freq + '×</span>' : '') + '</div>';
  if (!compact){
    if (t.book) h += '<div class="en-ex">📘 <i>Giáo trình:</i> ' + mark(t.book, t.en) + '</div>';
    if (t.ex) h += '<div class="en-ex">📝 <i>Đề thi:</i> ' + mark(t.ex.q, t.en) + (t.ex.p && t.ex.p.ans ? ' <span class="en-ans">→ ' + esc(t.ex.p.ans) + '</span>' : '') + '</div>';
  }
  return h + '</div>';
}
ENT.lessonHTML = function(ci, li){
  var ts = ENT.lesson(ci, li); if (!ts.length) return '';
  return '<div class="ch-sec" style="border-left-color:#7c5cff"><div class="ch-lbl" style="color:#7c5cff">🇬🇧 Tiếng Anh chuyên ngành của mục này (' + ts.length + ') — đề thi dùng đúng các từ này</div>' + ts.map(function(t){ return termRow(t, t.freq === 0); }).join('') + '</div>';
};
ENT.chapterHTML = function(ci){
  var ts = ENT.chapter(ci); if (!ts.length) return '';
  var h = '<h4 style="margin:16px 0 4px;color:#7c5cff;font-size:14px">🇬🇧 Thuật ngữ tiếng Anh của chương (' + ts.length + ') — xếp theo số lần đề thi dùng</h4><p class="muted" style="font-size:12.5px;line-height:1.6;margin:0 0 6px">Đề thi bằng tiếng Anh và dùng đúng từ của giáo trình TWI. Đọc to từng từ (🔊), nhìn câu giáo trình và câu đề thật chứa nó, rồi bấm "Ôn nhanh" để kiểm tra.</p>'
    + '<div id="en-flash">' + flashHTML(ci) + '</div>'
    + '<div class="en-list">' + ts.map(function(t){ return termRow(t, false); }).join('') + '</div>';
  return h;
};

/* ---------- ôn nhanh: EN → chọn nghĩa VI ---------- */
var F = null;
function shuf(a){ for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function rerender(){ var el = document.getElementById('en-flash'); if (el && F) el.innerHTML = flashHTML(F.ci); else if (window.renderChuong) renderChuong(); }
window.enFlashStart = function(ci){
  var ts = ENT.chapter(ci); if (ts.length < 4){ T('Chương này ít thuật ngữ quá'); return; }
  var items = shuf(ts.slice()).slice(0, 10).map(function(t){ var wrong = shuf(ts.filter(function(x){ return x.en !== t.en; })).slice(0, 3); var opts = shuf(wrong.concat([t])); return {t:t, opts:opts, a:opts.indexOf(t)}; });
  F = {ci:ci, items:items, i:0, pick:-1, k:0}; rerender(); ENT.speak(items[0].t.en);
};
window.enFlashPick = function(k){ if (!F || F.pick >= 0) return; F.pick = k; if (k === F.items[F.i].a) F.k++; rerender(); };
window.enFlashNext = function(){ if (!F) return; F.i++; F.pick = -1; if (F.i >= F.items.length){ var k = F.k, n = F.items.length; F = null; T('🇬🇧 Thuật ngữ: đúng ' + k + '/' + n); rerender(); return; } rerender(); ENT.speak(F.items[F.i].t.en); };
window.enFlashStop = function(){ F = null; rerender(); };
function flashHTML(ci){
  if (!F || F.ci !== ci) return '<div class="gb-row" style="margin:6px 0 10px"><button class="btn sec" onclick="enFlashStart(' + ci + ')">🎴 Ôn nhanh 10 thuật ngữ (EN → nghĩa)</button></div>';
  var it = F.items[F.i], t = it.t;
  var h = '<div class="en-flash"><div class="muted" style="font-size:12px">Thuật ngữ ' + (F.i + 1) + '/' + F.items.length + ' · đúng ' + F.k + '</div><div class="en-big"><button class="en-sp" onclick="entSpeak(' + JSON.stringify(t.en).replace(/"/g, '&quot;') + ')">🔊</button>' + esc(t.en) + '</div>'
    + (t.ex ? '<div class="en-ex" style="margin-top:4px">📝 ' + mark(t.ex.q, t.en) + '</div>' : (t.book ? '<div class="en-ex" style="margin-top:4px">📘 ' + mark(t.book, t.en) + '</div>' : ''))
    + '<div style="margin-top:8px">' + it.opts.map(function(o, k){ var cls = 'gb-opt'; if (F.pick >= 0){ if (k === it.a) cls += ' ok'; else if (k === F.pick) cls += ' bad'; } return '<button class="' + cls + '" ' + (F.pick >= 0 ? 'disabled' : 'onclick="enFlashPick(' + k + ')"') + '>' + String.fromCharCode(65 + k) + '. ' + esc(o.vi) + '</button>'; }).join('') + '</div>'
    + '<div class="gb-row">' + (F.pick >= 0 ? '<button class="btn" onclick="enFlashNext()">' + (F.i + 1 >= F.items.length ? 'Xem kết quả' : 'Từ tiếp →') + '</button>' : '') + '<button class="btn ghost" onclick="enFlashStop()">Dừng</button></div></div>';
  return h;
}

/* ---------- CSS ---------- */
var css = document.createElement('style');
css.textContent = [
  '.en-term{padding:7px 0;border-bottom:1px dashed var(--line);font-size:13.5px;line-height:1.55}',
  '.en-term:last-child{border-bottom:none}',
  '.en-h{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
  '.en-h b{color:#7c5cff;font-size:14.5px}',
  'body.light .en-h b{color:#5b3fd6}',
  '.en-vi{color:var(--txt)}',
  '.en-f{font-size:11px;color:var(--yellow);background:rgba(255,216,77,.12);border-radius:8px;padding:1px 7px}',
  'body.light .en-f{color:#8a5a00;background:#fff3c4}',
  '.en-sp{flex:none;background:none;border:1px solid var(--line);color:var(--accent2);border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:13px}',
  '.en-ex{font-size:12.5px;color:var(--muted);margin-top:3px;padding-left:36px}',
  '.en-ex mark{background:rgba(124,92,255,.22);color:inherit;border-radius:3px;padding:0 2px;font-weight:700}',
  'body.light .en-ex mark{background:#e8e2ff}',
  '.en-ans{color:var(--green);font-weight:600}',
  '.en-list{margin-top:4px}',
  '.en-flash{border:1px solid #7c5cff;border-radius:14px;padding:12px 14px;margin:6px 0 12px;background:rgba(124,92,255,.06)}',
  '.en-big{font-size:22px;font-weight:800;margin-top:4px;display:flex;gap:10px;align-items:center}'
].join('\n');
document.head.appendChild(css);
})();
