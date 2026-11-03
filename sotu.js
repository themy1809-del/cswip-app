/* ============================================================
   SOTU — 🔤 SỔ TỪ TỰ ĐỘNG + ÔN NGẮT QUÃNG (nhớ từ tiếng Anh chuyên ngành)
   Từ tự vào sổ khi:  • chạm thuật ngữ gạch chân lúc 📖 Đọc sách
                      • trả lời SAI một câu ở bất kỳ đâu (lấy thuật ngữ trong
                        câu hỏi + đáp án đúng)
                      • bấm "Thêm từ của chương / mục đang học"
   Mỗi từ lưu kèm CÂU NGỮ CẢNH (câu sách hoặc câu đề chứa từ đó).
   Ôn kiểu Leitner: hộp 0→5, cách 0·1·3·7·14·30 ngày.
     hộp 0–1: thấy tiếng Anh + nghe đọc → tự nói nghĩa → lật → Nhớ / Quên
     hộp ≥2 : thấy nghĩa Việt + câu ngữ cảnh bị che từ → chọn đúng từ tiếng Anh
   Sai thì về hộp 1 và gặp lại ngay trong phiên.
   Nạp SAU tienganh.js / docsach.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function') return;
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function jsq(v){ return JSON.stringify(v).replace(/"/g, '&quot;'); }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
var G = window.GLOSSARY || {};
var DAY = 864e5, GAP = [0, 1, 3, 7, 14, 30];
var SKIP = {'which of the following':1, 'all of the above':1, 'none of the above':1, 'most likely':1, 'with reference to':1, 'refer to':1, 'according to':1, 'following':1, 'statement':1, 'true':1, 'false':1, 'correct':1, 'incorrect':1, 'both':1, 'weld':1, 'welding':1, 'metal':1, 'steel':1, 'test':1, 'joint':1, 'process':1, 'standard':1, 'code':1, 'inspection':1, 'inspector':1, 'material':1, 'safety':1, 'true':1, 'prior to':1, 'eliminate':1, 'insufficient':1, 'diameter':1, 'arc':1, 'current':1, 'voltage':1, 'heat':1, 'gas':1};
var KEYS = Object.keys(G).filter(function(k){ return k.length >= 3 && !SKIP[k]; }).sort(function(a, b){ return b.length - a.length; });

/* ---------- dữ liệu ---------- */
var D = LS('cswip_sotu', {w:{}, log:{}}); D.w = D.w || {}; D.log = D.log || {};
function save(){ SV('cswip_sotu', D); }
function dk(){ var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function now(){ return Date.now(); }
function norm(s){ return ' ' + String(s || '').toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').replace(/\s+/g, ' ') + ' '; }
function termsIn(text, max){ var low = norm(text), out = []; for (var i = 0; i < KEYS.length && out.length < (max || 3); i++){ var k = KEYS[i]; if (low.indexOf(' ' + k + ' ') >= 0){ out.push(k); low = low.split(k).join(' '); } } return out; }
function splitS(text){ return String(text || '').replace(/\s+/g, ' ').replace(/([.?!:;])\s+/g, '$1\u0001').split('\u0001').map(function(x){ return x.trim(); }).filter(Boolean); }
function bestSentence(list, k){ var hit = list.filter(function(x){ return norm(x).indexOf(' ' + k + ' ') >= 0; }); var long = hit.filter(function(x){ return x.split(' ').length >= 6; }); var x = (long[0] || hit[0] || ''); return x.length > 240 ? x.slice(0, 237) + '…' : x; }
function bookSentences(){ var out = []; document.querySelectorAll('#v-sach .bk-text .bk-p, #v-sach .bk-text li, #v-sach .bk-text td').forEach(function(n){ out = out.concat(splitS(n.textContent)); }); return out; }
function sentenceWith(text, k){ var parts = String(text || '').replace(/\s+/g, ' ').replace(/([.?!])\s+/g, '$1\u0001').split('\u0001'); for (var i = 0; i < parts.length; i++) if (norm(parts[i]).indexOf(' ' + k + ' ') >= 0) return parts[i].slice(0, 220); return String(text || '').slice(0, 220); }
function add(k, ex, src, silent){
  k = String(k || '').toLowerCase().trim(); if (!G[k]) return false;
  var w = D.w[k];
  if (w){ if (ex && !w.ex) w.ex = ex; if (w.box > 1 && !silent){ w.box = 1; w.due = now(); } save(); return false; }
  D.w[k] = {vi:G[k], ex:ex || '', src:src || '', box:0, due:now(), add:now(), n:0, k:0}; save(); return true;
}
function due(){ var t = now(); return Object.keys(D.w).filter(function(k){ return D.w[k].due <= t; }).sort(function(a, b){ return D.w[a].box - D.w[b].box || D.w[a].due - D.w[b].due; }); }
function stats(){ var ks = Object.keys(D.w), m = 0; ks.forEach(function(k){ if (D.w[k].box >= 4) m++; }); var L = D.log[dk()] || {r:0, a:0}; return {total:ks.length, due:due().length, mastered:m, today:L.r, added:L.a}; }
function logR(){ var L = D.log[dk()] = D.log[dk()] || {r:0, a:0}; L.r++; }
function logA(){ var L = D.log[dk()] = D.log[dk()] || {r:0, a:0}; L.a++; }
window.SOTU = {add:function(k, ex, src){ var ok = add(k, ex, src); if (ok) logA(); save(); return ok; }, stats:stats, due:due, termsIn:termsIn};
window.sotuStats = stats;

/* ---------- hook 1: chạm thuật ngữ khi đọc sách ---------- */
(function hookBook(){
  if (!window.sachTerm || window.sachTerm._sotu) return;
  var o = window.sachTerm;
  window.sachTerm = function(el){
    o(el);
    try{ var k = el.getAttribute('data-k'); var p = el.closest('.bk-p, li, td, .bk-h'); var ex = bestSentence(splitS(p ? p.textContent : ''), k); if (!ex || ex.split(' ').length < 6){ var b2 = bestSentence(bookSentences(), k); if (b2) ex = b2; } var sec = (document.querySelector('#v-sach h2') || {}).textContent || '';
      var isNew = add(k, ex, 'Sách ' + sec.split(' ')[0]); if (isNew) logA(); save();
      var pop = document.getElementById('bk-pop'); if (pop) pop.insertAdjacentHTML('beforeend', '<div style="margin-top:4px;font-size:12px;color:var(--green)">' + (isNew ? '⭐ Đã thêm vào 🔤 Sổ từ' : '🔤 Đã có trong Sổ từ — sẽ được nhắc ôn') + '</div>');
    }catch(e){}
  };
  window.sachTerm._sotu = 1;
})();
/* ---------- hook 2: trả lời sai ở bất kỳ đâu ---------- */
window.SOTU_onWrong = function(item){
  if (!item) return; var ans = (item.oe && item.oe[item.a]) || ''; var ks = termsIn((item.qe || '') + ' . ' + ans, 3), nn = 0;
  ks.forEach(function(k){ if (add(k, bestSentence(splitS(item.qe || ''), k) || String(item.qe || '').slice(0, 240), 'Câu sai — ' + (item.src || ''), true)){ nn++; logA(); } }); if (nn) save();
};

/* ---------- thêm từ theo chương / mục ---------- */
window.sotuSeedChapter = function(ci, n){
  if (ci == null){ try{ ci = window.chCurrent ? chCurrent() : null; }catch(e){} } if (ci == null) ci = 4;
  var list = []; try{ list = window.ENT ? ENT.chapter(ci) : []; }catch(e){}
  var c = 0; list.forEach(function(t){ if (c >= (n || 20)) return; var ex = t.ex ? t.ex.q : (t.book || ''); if (add(t.en, bestSentence(splitS(ex), t.en) || String(ex).slice(0, 240), 'Chương ' + (ci + 1))){ c++; logA(); } }); save();
  T(c ? '🔤 Đã thêm ' + c + ' từ của chương "' + DATA.chapters[ci].vi + '"' : 'Các từ chính của chương này đã có trong sổ'); render();
};
window.sotuSeedBook = function(){
  var el = document.querySelector('#v-sach .bk-text'); var sec = (document.querySelector('#v-sach h2') || {}).textContent || '';
  if (!el){ T('Mở một mục ở 📖 Đọc sách trước'); return; }
  var sents = bookSentences(), ks = termsIn(sents.join(' . '), 25), c = 0; ks.forEach(function(k){ if (add(k, bestSentence(sents, k), 'Sách ' + sec.split(' ')[0])){ c++; logA(); } }); save();
  T(c ? '🔤 Đã thêm ' + c + ' thuật ngữ của mục ' + sec.split(' ')[0] : 'Thuật ngữ của mục này đã có trong sổ');
};

/* ---------- phiên ôn ---------- */
var S = {view:'home', q:[], i:0, flip:false, pick:-1, opts:null, k:0, n:0, filter:''};
function maskEx(ex, k){ try{ var re = new RegExp(k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+'), 'ig'); return esc(ex).replace(re, '<span class="st-blank">_____</span>'); }catch(e){ return esc(ex); } }
function markEx(ex, k){ try{ var re = new RegExp('(' + k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+') + ')', 'ig'); return esc(ex).replace(re, '<mark>$1</mark>'); }catch(e){ return esc(ex); } }
function shuf(a){ for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function distract(k){ var pool = Object.keys(D.w).filter(function(x){ return x !== k; }); if (pool.length < 6) pool = pool.concat(KEYS.slice(0, 400).filter(function(x){ return x !== k && pool.indexOf(x) < 0; })); var w = k.split(' ').length; var near = pool.filter(function(x){ return Math.abs(x.split(' ').length - w) <= 1; }); return shuf(near.length >= 3 ? near : pool).slice(0, 3); }
window.sotuStart = function(all){
  var q = all ? Object.keys(D.w) : due(); if (!q.length){ T('Không có từ đến hạn — thêm từ mới hoặc ôn lại tất cả'); return; }
  S.view = 'rev'; S.q = all ? shuf(q).slice(0, 30) : q.slice(0, 40); S.i = 0; S.flip = false; S.pick = -1; S.opts = null; S.k = 0; S.n = 0; if (CUR !== 'sotu') go('sotu'); else render(); speakCur();
};
function speakCur(){ var k = S.q[S.i]; if (!k) return; var w = D.w[k]; if (w && w.box < 2) try{ if (window.entSpeak) entSpeak(k); }catch(e){} }
function grade(ok){
  var k = S.q[S.i], w = D.w[k]; if (!w) return; w.n++; logR();
  if (ok){ w.k++; w.box = Math.min(5, w.box + 1); w.due = now() + GAP[w.box] * DAY; S.k++; }
  else { w.box = 1; w.due = now() + DAY; S.q.push(k); }
  S.n++; save();
}
window.sotuFlip = function(){ S.flip = true; render(); };
window.sotuGrade = function(ok){ grade(ok); S.i++; S.flip = false; S.pick = -1; S.opts = null; render(); speakCur(); };
window.sotuPick = function(i){ if (S.pick >= 0) return; S.pick = i; var ok = S.opts[i] === S.q[S.i]; grade(ok); render(); try{ if (window.entSpeak) entSpeak(S.q[S.i]); }catch(e){} };
window.sotuNext = function(){ S.i++; S.flip = false; S.pick = -1; S.opts = null; render(); speakCur(); };
window.sotuHome = function(){ S.view = 'home'; render(); };
window.sotuDel = function(k){ delete D.w[k]; save(); render(); };
window.sotuFilter = function(v){ S.filter = v; render(); var i = document.getElementById('st-search'); if (i){ i.focus(); i.setSelectionRange(v.length, v.length); } };

function homeView(){
  var st = stats(), ks = Object.keys(D.w);
  var h = '<div class="card"><h2 style="margin:0">🔤 Sổ từ — nhớ từ tiếng Anh chuyên ngành</h2>'
    + '<p class="muted" style="line-height:1.6;margin-top:6px">Từ tự vào sổ khi bạn <b>chạm thuật ngữ lúc đọc sách</b> hoặc <b>trả lời sai một câu</b>. Mỗi từ có câu ngữ cảnh từ sách/đề. App nhắc ôn đúng lúc sắp quên (sau 1 · 3 · 7 · 14 · 30 ngày). Mỗi ngày chỉ cần 10–15 phút.</p>'
    + '<div class="nr-grid" style="margin-top:10px"><div class="nr-stat"><b style="color:' + (st.due ? 'var(--accent)' : 'var(--green)') + '">' + st.due + '</b><span>từ đến hạn ôn hôm nay</span></div><div class="nr-stat"><b>' + st.total + '</b><span>từ trong sổ</span></div><div class="nr-stat"><b style="color:var(--green)">' + st.mastered + '</b><span>từ đã thuộc lâu (hộp 4–5)</span></div><div class="nr-stat"><b>' + st.today + '</b><span>lượt ôn hôm nay · thêm ' + st.added + ' từ</span></div></div>'
    + '<div class="gb-row" style="margin-top:10px">' + (st.due ? '<button class="btn" onclick="sotuStart()">▶ Ôn ' + Math.min(40, st.due) + ' từ đến hạn</button>' : '') + '<button class="btn sec" onclick="sotuSeedChapter()">➕ Thêm 20 từ đề hay ra của chương đang học</button>' + (ks.length ? '<button class="btn ghost" onclick="sotuStart(true)">🔁 Ôn ngẫu nhiên 30 từ</button>' : '') + '</div></div>';
  h += '<div class="card"><h3 style="margin:0 0 6px">Cách nhớ từ hiệu quả nhất (đã gắn sẵn vào app)</h3><ol class="st-tips">'
    + '<li><b>Gặp từ trong câu, không học từ rời.</b> Khi đọc sách, chạm từ lạ: app lưu cả câu chứa nó. Bạn nhớ "lack of fusion" qua câu đề thật, không phải qua danh sách.</li>'
    + '<li><b>Tự nhớ lại trước khi xem nghĩa.</b> Nhìn từ, nói nghĩa ra miệng, rồi mới lật. Cố nhớ lại một lần giữ từ lâu hơn đọc lại 5 lần.</li>'
    + '<li><b>Ôn đúng lúc sắp quên.</b> Ôn sau 1 ngày, 3 ngày, 1 tuần, 2 tuần, 1 tháng. Từ nhớ rồi thì giãn ra, từ quên thì quay lại sớm.</li>'
    + '<li><b>Nghe và nói to.</b> App đọc giọng Anh mỗi từ; bạn đọc theo một lần. Tai nhớ thêm một đường.</li>'
    + '<li><b>Đảo chiều khi đã quen.</b> Từ hộp 2 trở lên, app cho nghĩa Việt và câu bị che từ, bạn phải chọn đúng từ tiếng Anh. Đây chính là việc phải làm trong phòng thi.</li>'
    + '<li><b>Ít mà đều.</b> Thêm 10–20 từ mỗi ngày theo chương đang học, ôn hết từ đến hạn. Không dồn 200 từ một tối.</li></ol></div>';
  var list = ks.sort(function(a, b){ return D.w[a].box - D.w[b].box || a.localeCompare(b); }).filter(function(k){ return !S.filter || k.indexOf(S.filter.toLowerCase()) >= 0 || norm(D.w[k].vi).indexOf(S.filter.toLowerCase()) >= 0; });
  h += '<div class="card"><div class="row" style="justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3 style="margin:0">Các từ trong sổ (' + ks.length + ')</h3><input id="st-search" placeholder="Tìm từ…" value="' + esc(S.filter) + '" oninput="sotuFilter(this.value)" style="padding:7px 10px;border-radius:9px;border:1px solid var(--line);background:var(--panel);color:var(--txt);font-family:inherit"></div>';
  if (!ks.length) h += '<p class="muted" style="margin-top:8px">Sổ đang trống. Bấm "Thêm 20 từ…" ở trên, hoặc vào 📖 Đọc sách và chạm vào các từ gạch chân.</p>';
  h += list.slice(0, 200).map(function(k){ var w = D.w[k]; return '<div class="st-row"><button class="en-sp" onclick="entSpeak(' + jsq(k) + ')">🔊</button><div style="flex:1;min-width:0"><b style="color:#7c5cff">' + esc(k) + '</b> = ' + esc(w.vi) + (w.ex ? '<div class="muted" style="font-size:12px;margin-top:2px">' + markEx(w.ex, k) + '</div>' : '') + '<div class="muted" style="font-size:11px">' + esc(w.src || '') + '</div></div><div class="st-box b' + w.box + '" title="Hộp ' + w.box + '">' + w.box + '</div><button class="st-del" onclick="sotuDel(' + jsq(k) + ')" title="Xóa">✕</button></div>'; }).join('') + (list.length > 200 ? '<p class="muted">… còn ' + (list.length - 200) + ' từ, dùng ô tìm.</p>' : '') + '</div>';
  return h;
}
function revView(){
  var k = S.q[S.i];
  if (!k){ var st = stats(); return '<div class="card" style="text-align:center"><h2>🎉 Xong phiên ôn từ</h2><p class="muted">Nhớ ' + S.k + '/' + S.n + ' lượt · còn ' + st.due + ' từ đến hạn · ' + st.mastered + ' từ đã thuộc lâu</p><div class="gb-row" style="justify-content:center">' + (st.due ? '<button class="btn" onclick="sotuStart()">▶ Ôn tiếp</button>' : '') + '<button class="btn sec" onclick="sotuHome()">🔤 Về Sổ từ</button><button class="btn sec" onclick="go(\'sach\')">📖 Đọc sách</button></div></div>'; }
  var w = D.w[k], rev = w.box >= 2;
  var h = '<div class="card"><button class="back" onclick="sotuHome()">← Sổ từ</button><div class="muted" style="font-size:12px;margin-top:4px">Từ ' + (S.i + 1) + '/' + S.q.length + ' · nhớ ' + S.k + '/' + S.n + ' · hộp ' + w.box + ' · ' + esc(w.src || '') + '</div></div><div class="card st-card">';
  if (!rev){
    h += '<div class="st-big">' + esc(k) + ' <button class="en-sp" onclick="entSpeak(' + jsq(k) + ')">🔊</button></div>' + (w.ex ? '<div class="st-ex">' + markEx(w.ex, k) + '</div>' : '');
    if (!S.flip) h += '<div class="gb-bubble hook" style="margin-top:12px">🗣️ Đọc to từ này theo giọng đọc, rồi nói nghĩa tiếng Việt ra miệng. Xong mới lật.</div><div class="gb-row"><button class="btn" onclick="sotuFlip()">Lật xem nghĩa</button></div>';
    else h += '<div class="st-vi">🇻🇳 ' + esc(w.vi) + '</div><div class="gb-row"><button class="btn" onclick="sotuGrade(true)">✅ Tôi đã nhớ đúng</button><button class="btn sec" onclick="sotuGrade(false)">❌ Chưa nhớ</button></div>';
  } else {
    if (!S.opts) S.opts = shuf(distract(k).concat([k]));
    h += '<div class="muted" style="font-size:12.5px">Chọn từ tiếng Anh đúng với nghĩa và điền vào câu:</div><div class="st-vi" style="margin-top:4px">🇻🇳 ' + esc(w.vi) + '</div>' + (w.ex ? '<div class="st-ex">' + maskEx(w.ex, k) + '</div>' : '')
      + '<div style="margin-top:8px">' + S.opts.map(function(o, i){ var cls = 'gb-opt'; if (S.pick >= 0){ if (o === k) cls += ' ok'; else if (i === S.pick) cls += ' bad'; } return '<button class="' + cls + '" ' + (S.pick >= 0 ? 'disabled' : 'onclick="sotuPick(' + i + ')"') + '>' + String.fromCharCode(65 + i) + '. ' + esc(o) + '</button>'; }).join('') + '</div>';
    if (S.pick >= 0) h += (w.ex ? '<div class="st-ex" style="margin-top:8px">' + markEx(w.ex, k) + '</div>' : '') + '<div class="gb-row"><button class="btn" onclick="sotuNext()">Từ tiếp →</button></div>';
  }
  return h + '</div>';
}
function render(){ var el = document.getElementById('v-sotu'); if (!el) return; el.innerHTML = '<div class="ch-wrap">' + (S.view === 'rev' ? revView() : homeView()) + '</div>'; }
window.renderSotu = render;

/* ---------- khung ---------- */
function ensure(){
  if (document.getElementById('v-sotu')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-sotu'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function' && !TABS.some(function(t){ return t[0] === 'sotu'; })){ TABS.splice(1, 0, ['sotu', '🔤 Sổ từ']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  if (!window._sotuWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'sotu') render(); }catch(e){ console.error(e); } }; window._sotuWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
    '.st-tips{margin:0;padding-left:20px;line-height:1.65;font-size:14px}.st-tips li{margin:4px 0}',
    '.st-row{display:flex;gap:8px;align-items:flex-start;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13.5px}',
    '.st-box{flex:none;width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;background:rgba(127,127,127,.15)}',
    '.st-box.b2,.st-box.b3{background:rgba(93,177,255,.22);color:var(--accent2)}.st-box.b4,.st-box.b5{background:rgba(52,199,89,.22);color:var(--green)}',
    '.st-del{flex:none;background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px}',
    '.st-card{text-align:left}.st-big{font-size:28px;font-weight:800;color:#7c5cff;display:flex;gap:10px;align-items:center;flex-wrap:wrap}',
    'body.light .st-big{color:#5b3fd6}',
    '.st-ex{margin-top:8px;font-size:15px;line-height:1.6;padding:8px 10px;border-left:3px solid #7c5cff;background:rgba(124,92,255,.06);border-radius:0 8px 8px 0}',
    '.st-ex mark{background:rgba(124,92,255,.25);color:inherit;border-radius:3px;padding:0 2px}',
    '.st-blank{display:inline-block;min-width:60px;border-bottom:2px solid #7c5cff;color:transparent}',
    '.st-vi{font-size:19px;font-weight:700;margin-top:10px}'
  ].join('\n');
  document.head.appendChild(css);
}
new MutationObserver(function(){ try{ ensure(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
