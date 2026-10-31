/* ============================================================
   GIANGBAI — 🎙️ GIẢNG BÀI TỪNG BƯỚC (người thầy ảo)
   Tự sinh bài giảng tương tác cho cả 18 chương từ dữ liệu
   🎓 Giảng giải (DATA.chapters[ci].deep), tóm tắt, điểm cần nhớ
   và quiz chương. Mỗi ý lớn đi theo nhịp của một người đang dạy:
     ① Nêu vấn đề & bắt bạn đoán trước  → ② Giảng từng đoạn
     → ③ Kiểm tra nhanh ngay (giải thích vì sao đúng/sai)
     → ④ Chốt thuật ngữ → ⑤ Tự kiểm "tôi giải thích được"
     → ⑥ 5 câu tổng kết chương.
   Kèm: 🔊 đọc giọng tiếng Việt, ❓ Hỏi thầy ngay tại chỗ,
   ghi nhớ tiến độ để học dở thì học tiếp.
   Nạp SAU premium.js/nangcap.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function') return;

/* ---------- tiện ích ---------- */
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function strip(h){ return String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
function T(m){ try{ if (typeof toast === 'function') toast(m); }catch(e){} }
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, would:1, following:1, most:1, likely:1, when:1, used:1, type:1, welding:1, weld:1, welds:1, during:1, should:1, can:1, not:1, than:1, into:1, if:1, has:1, have:1, its:1, all:1, one:1, two:1, may:1, will:1, these:1, there:1, their:1, more:1, less:1, some:1, any:1, out:1, does:1, do:1, also:1, about:1, been:1, was:1, were:1, but:1, after:1, before:1, between:1, where:1, how:1, why:1, who:1, so:1, no:1, yes:1};
function words(s){ return String(s || '').toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
function overlap(a, b){ var set = {}; b.forEach(function(x){ set[x] = 1; }); var n = 0; a.forEach(function(x){ if (set[x]) n++; }); return n; }
function shuf(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

/* ---------- đọc giọng (TTS) ---------- */
var TTS = LS('cswip_tts', false);
function voiceFor(lang){
  try{ var vs = speechSynthesis.getVoices() || []; var pre = lang.slice(0, 2); var v = vs.filter(function(x){ return (x.lang || '').toLowerCase().indexOf(pre) === 0; }); if (!v.length) return null; var g = v.filter(function(x){ return /google|natural|neural|premium|linh|hoai/i.test(x.name); }); return (g[0] || v[0]); }catch(e){ return null; }
}
function speak(text, lang){
  try{
    if (!('speechSynthesis' in window)) { T('Trình duyệt không hỗ trợ đọc giọng'); return; }
    speechSynthesis.cancel();
    var t = strip(text).slice(0, 1200); if (!t) return;
    var u = new SpeechSynthesisUtterance(t); u.lang = lang || 'vi-VN'; u.rate = 1.0;
    var v = voiceFor(u.lang); if (v) u.voice = v;
    speechSynthesis.speak(u);
  }catch(e){}
}
window.gbSpeak = function(id, lang){ var el = document.getElementById(id); if (el) speak(el.textContent, lang || 'vi-VN'); };
window.gbSpeakText = function(t, lang){ speak(t, lang); };
window.gbToggleTTS = function(){ TTS = !TTS; SV('cswip_tts', TTS); if (!TTS) try{ speechSynthesis.cancel(); }catch(e){} T(TTS ? '🔊 Tự đọc bài giảng: BẬT' : '🔇 Tự đọc: TẮT'); render(); };
try{ if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = function(){}; }catch(e){}

/* ---------- tiến độ ---------- */
var PRG = LS('cswip_teach', {}); // ci -> {si, done, right, total, review:[bi]}
function prg(ci){ if (!PRG[ci]) PRG[ci] = {si:0, done:false, right:0, total:0, review:[]}; return PRG[ci]; }
function savePrg(){ SV('cswip_teach', PRG); }
window.gbProgress = function(ci){ var p = PRG[ci]; if (!p) return null; var st = build(ci); return {done:p.done, pct:st.length ? Math.min(100, Math.round(p.si / (st.length - 1) * 100)) : 0, right:p.right, total:p.total}; };

/* ---------- lời thầy (chọn theo chỉ số để không lặp) ---------- */
var OPEN = ['Được rồi, mình sang ý tiếp theo nhé.', 'Ý này đề thi hỏi rất nhiều — để ý kỹ.', 'Giờ mình nói về một chỗ học viên hay nhầm.', 'Tiếp tục nào, ý này ngắn thôi.', 'Chỗ này quan trọng với thanh tra ngoài hiện trường.', 'Mình đi chậm một chút ở ý này.'];
var HOOK = ['Trước khi mình giảng, bạn thử tự trả lời trong đầu đã:', 'Khoan đọc vội. Bạn đoán thử xem:', 'Câu hỏi mở đầu cho ý này:', 'Thử tự nghĩ 10 giây rồi hãy bấm:'];
var GOOD = ['Chuẩn! 👏', 'Đúng rồi — bạn nắm được ý này.', 'Chính xác. Tốt lắm.', 'Đúng. Giữ cách nghĩ này khi vào phòng thi.'];
var BAD = ['Chưa đúng — nhưng sai ở đây còn hơn sai trong phòng thi.', 'Chưa phải. Mình giải thích lại nhé:', 'Nhầm rồi, đây là bẫy quen thuộc.', 'Chưa đúng. Nghe mình nói lại ý chính:'];
function pick(arr, i){ return arr[i % arr.length]; }

/* ---------- sinh các bước cho chương ---------- */
var CACHE = {};
function build(ci){
  if (CACHE[ci]) return CACHE[ci];
  var c = DATA.chapters[ci]; if (!c) return [];
  var steps = [{t:'intro'}];
  var deep = c.deep || [];
  var quiz = (c.quiz || []).map(function(q, qi){ return {q:q, qi:qi, w:words((q.en || '') + ' ' + (q.exp && q.exp.en || '')), used:false}; });
  deep.forEach(function(b, bi){
    steps.push({t:'hook', b:b, bi:bi});
    steps.push({t:'teach', b:b, bi:bi});
    // câu kiểm tra sát ý nhất
    var bw = words((b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ') + ' ' + (b.rows || []).map(function(r){ return r.en || ''; }).join(' '));
    var best = null;
    quiz.forEach(function(x){ if (x.used || !x.w.length) return; var sc = overlap(x.w, bw) / Math.sqrt(x.w.length + 2); if (!best || sc > best.sc) best = {x:x, sc:sc}; });
    if (best && best.sc >= 0.35){ best.x.used = true; steps.push({t:'check', b:b, bi:bi, q:best.x.q, qi:best.x.qi}); }
    else steps.push({t:'recall', b:b, bi:bi});
  });
  if (!deep.length){ // chương không có giảng giải: dạy theo tóm tắt
    (c.lessons || []).forEach(function(L, li){ if (li % 4 === 0) steps.push({t:'teachL', items:c.lessons.slice(li, li + 4), li:li}); });
  }
  var les = c.lessons || [];
  for (var i = 0; i < les.length; i += 6) steps.push({t:'recap', items:les.slice(i, i + 6), i:i, n:Math.ceil(les.length / 6), k:Math.floor(i / 6) + 1});
  if (c.key && c.key.length) steps.push({t:'keys'});
  var rest = quiz.filter(function(x){ return !x.used; }); var pool = rest.length >= 5 ? rest : quiz;
  var qs = shuf(pool).slice(0, Math.min(5, pool.length));
  if (qs.length) steps.push({t:'quiz', qs:qs.map(function(x){ return {q:x.q, qi:x.qi}; })});
  steps.push({t:'done'});
  CACHE[ci] = steps; return steps;
}

/* ---------- trạng thái ---------- */
var S = {ci:null, si:0, pi:0, ans:null, qk:0, qans:null, qright:0, ask:''};

/* ---------- đăng ký tab ---------- */
function ensure(){
  if (document.getElementById('v-teach')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-teach'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function'){
    var has = TABS.some(function(t){ return t[0] === 'teach'; });
    if (!has){ TABS.splice(1, 0, ['teach', '🎙️ Giảng bài']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  }
  if (!window._teachWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'teach') render(); }catch(e){ console.error(e); } }; window._teachWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
  '.gb-wrap{max-width:760px;margin:0 auto}',
  '.gb-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap}',
  '.gb-top .gb-prog{flex:1;min-width:120px;height:6px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden}',
  '.gb-top .gb-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent2),var(--green))}',
  '.gb-top small{color:var(--muted);font-size:12px;white-space:nowrap}',
  '.gb-tbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:var(--txt);border-radius:9px;padding:6px 10px;font-size:12.5px;cursor:pointer;font-family:inherit}',
  '.gb-tbtn.on{border-color:var(--accent2);color:var(--accent2)}',
  '.gb-teacher{display:flex;gap:12px;align-items:flex-start}',
  '.gb-av{flex:none;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ff7a33,#ffd60a);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 6px 18px rgba(255,122,51,.35)}',
  '.gb-bubble{flex:1;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:4px 16px 16px 16px;padding:14px 16px;line-height:1.7;font-size:15px}',
  '.gb-bubble p{margin:0 0 10px}.gb-bubble p:last-child{margin-bottom:0}',
  '.gb-bubble .lang-en{display:block;color:var(--muted);font-style:italic;font-size:13px;margin-top:2px}',
  'body.m-vi .gb-bubble .lang-en{display:none}',
  '.gb-bubble.hook{border-color:rgba(76,168,255,.4);background:rgba(76,168,255,.08)}',
  '.gb-bubble.good{border-color:rgba(52,199,89,.45);background:rgba(52,199,89,.08)}',
  '.gb-bubble.bad{border-color:rgba(255,69,58,.4);background:rgba(255,69,58,.07)}',
  '.gb-para{padding:10px 12px;border-left:3px solid var(--accent);background:rgba(255,255,255,.03);border-radius:0 10px 10px 0;margin-top:10px;animation:gbin .35s ease}',
  '.gb-para.dim{opacity:.55;border-left-color:var(--line)}',
  '@keyframes gbin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
  '.gb-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;align-items:center}',
  '.gb-opt{display:block;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);color:var(--txt);border-radius:12px;padding:12px 14px;margin-top:8px;cursor:pointer;font-size:14.5px;line-height:1.45;font-family:inherit}',
  '.gb-opt:hover{border-color:var(--accent2)}',
  '.gb-opt.ok{background:rgba(52,199,89,.16);border-color:var(--green)}',
  '.gb-opt.bad{background:rgba(255,69,58,.14);border-color:var(--red)}',
  '.gb-opt[disabled]{cursor:default}',
  '.gb-term{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px dashed var(--line)}',
  '.gb-term:last-child{border-bottom:none}',
  '.gb-term .sp{flex:none;background:none;border:1px solid var(--line);color:var(--accent2);border-radius:8px;width:32px;height:32px;cursor:pointer}',
  '.gb-term b{color:var(--accent)}',
  '.gb-ask{margin-top:14px;border-top:1px dashed var(--line);padding-top:12px}',
  '.gb-ask .in{display:flex;gap:6px}',
  '.gb-ask input{flex:1;min-width:0;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:9px 11px;font-size:14px;font-family:inherit}',
  '.gb-ask .ans{margin-top:8px;font-size:13.5px;line-height:1.6}',
  '.gb-ask .ans .hit{padding:8px 10px;border-radius:10px;background:rgba(76,168,255,.07);border:1px solid rgba(76,168,255,.2);margin-top:6px}',
  '.gb-list .chap .num{font-size:15px}',
  '.gb-chip{display:inline-block;font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(255,255,255,.07);color:var(--muted);margin-left:6px}',
  '.gb-mini{font-size:12px;color:var(--muted)}',
  '.gb-ring{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11.5px;font-weight:700}'
  ].join('\n');
  document.head.appendChild(css);
}

/* ---------- API ---------- */
window.gbStart = function(ci, fromStart){
  if (typeof chapFree === 'function' && !chapFree(ci)){ go('learn'); openChap(ci); return; }
  S.ci = ci; var p = prg(ci); S.si = fromStart ? 0 : Math.min(p.si || 0, build(ci).length - 1); if (fromStart){ p.si = 0; p.done = false; p.right = 0; p.total = 0; p.review = []; savePrg(); }
  S.pi = 0; S.ans = null; S.qk = 0; S.qans = null; S.qright = 0; S.ask = '';
  go('teach');
};
window.gbList = function(){ S.ci = null; render(); };
window.gbNext = function(){ var st = build(S.ci); if (S.si < st.length - 1){ S.si++; S.pi = 0; S.ans = null; S.qans = null; S.ask = ''; var p = prg(S.ci); if (S.si > (p.si || 0)) p.si = S.si; if (st[S.si].t === 'done') p.done = true; savePrg(); } render(); };
window.gbPrev = function(){ if (S.si > 0){ S.si--; S.pi = 99; S.ans = null; S.qans = null; S.ask = ''; } render(); };
window.gbGoto = function(si){ S.si = Math.max(0, Math.min(build(S.ci).length - 1, si)); S.pi = 0; S.ans = null; S.qans = null; render(); };
window.gbPara = function(){ S.pi++; render(); };
window.gbPick = function(k){
  var st = build(S.ci)[S.si]; if (!st || S.ans !== null) return; S.ans = k;
  var q = st.q, right = k === q.ans, p = prg(S.ci); p.total++; if (right) p.right++; else if (p.review.indexOf(st.bi) < 0) p.review.push(st.bi);
  savePrg(); recordQ(q, st.qi, k, right); render();
};
window.gbRecall = function(ok){ var st = build(S.ci)[S.si]; var p = prg(S.ci); if (!ok && p.review.indexOf(st.bi) < 0) p.review.push(st.bi); if (ok) p.review = p.review.filter(function(x){ return x !== st.bi; }); savePrg(); if (ok) gbNext(); else { S.ans = 'review'; render(); } };
window.gbQPick = function(k){
  var st = build(S.ci)[S.si]; if (S.qans !== null) return; S.qans = k;
  var it = st.qs[S.qk], right = k === it.q.ans, p = prg(S.ci); p.total++; if (right){ p.right++; S.qright++; }
  savePrg(); recordQ(it.q, it.qi, k, right); render();
};
window.gbQNext = function(){ var st = build(S.ci)[S.si]; S.qk++; S.qans = null; if (S.qk >= st.qs.length){ S.qk = 0; gbNext(); } else render(); };
window.gbAsk = function(){ var inp = document.getElementById('gb-ask-in'); if (!inp) return; S.ask = (inp.value || '').trim(); render(); var a = document.getElementById('gb-ask-in'); if (a){ a.value = S.ask; } };
window.gbAskGPT = function(){
  var st = build(S.ci)[S.si], c = DATA.chapters[S.ci];
  var ctx = st.b ? ('Ý đang học: ' + strip(st.b.h_vi) + '. ' + (st.b.body || []).map(function(p){ return strip(p.vi); }).join(' ').slice(0, 700)) : ('Chương: ' + c.vi);
  var q = S.ask || 'Hãy giảng lại ý này thật dễ hiểu kèm ví dụ hiện trường.';
  var prompt = 'Bạn là giảng viên CSWIP 3.1 (TWI WIS5). Học viên Việt Nam đang học chương "' + c.vi + '". ' + ctx + '\nCâu hỏi của học viên: ' + q + '\nTrả lời tiếng Việt dễ hiểu, kèm thuật ngữ tiếng Anh trong ngoặc, có ví dụ thực tế, cuối cùng nêu 1 bẫy đề thi liên quan.';
  try{ navigator.clipboard.writeText(prompt); }catch(e){}
  window.open('https://chatgpt.com/?q=' + encodeURIComponent(prompt), '_blank');
};

/* ghi nhận câu kiểm tra vào hệ thống chung (QUIZSTATE + SRS + Sổ câu sai) */
function recordQ(q, qi, k, right){
  var id = 'c' + S.ci + '-' + qi;
  try{ QUIZSTATE[id] = {correct:right}; if (typeof srsUpdate === 'function') srsUpdate(id, right); if (typeof save === 'function') save(); if (typeof gameTick === 'function') gameTick(right); }catch(e){}
  try{ if (window.NR && NR.record) NR.record({id:id, qe:q.en, qv:q.vi, oe:q.opts.map(function(o){ return o.en; }), ov:q.opts.map(function(o){ return o.vi; }), a:q.ans, ee:q.exp ? q.exp.en : '', ev:q.exp ? q.exp.vi : '', cat:DATA.chapters[S.ci].vi, src:'Giảng bài — ' + DATA.chapters[S.ci].vi, lesson:[S.ci, -1]}, k, right, {}); }catch(e){}
}

/* ---------- hỏi thầy: tìm trong chương (ưu tiên), rồi toàn bộ + từ điển ---------- */
function norm(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase(); }
function askAnswer(q){
  var ws = norm(q).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 2; }); if (!ws.length) return '';
  function score(text){ var t = norm(text), s = 0; ws.forEach(function(w){ if (t.indexOf(w) >= 0) s++; }); return s; }
  var hits = [];
  function scanChap(ci, bonus){ var c = DATA.chapters[ci]; (c.lessons || []).forEach(function(L){ var s = score((L.t_vi || '') + ' ' + (L.t_en || '') + ' ' + (L.vi || '') + ' ' + (L.en || '')) + bonus; if (s > bonus) hits.push({s:s, h:'<b>' + esc(L.t_vi) + (L.t_en ? ' (' + esc(L.t_en) + ')' : '') + '</b>: ' + esc(L.vi), src:c.vi}); });
    (c.deep || []).forEach(function(b){ (b.body || []).forEach(function(p){ var s = score(strip(p.vi) + ' ' + strip(p.en)) + bonus; if (s > bonus + 1) hits.push({s:s, h:'<b>' + esc(strip(b.h_vi)) + '</b>: ' + esc(strip(p.vi)).slice(0, 320), src:c.vi}); }); }); }
  scanChap(S.ci, 2);
  DATA.chapters.forEach(function(_, ci){ if (ci !== S.ci) scanChap(ci, 0); });
  try{ var G = window.GLOSSARY || {}; var nq = norm(q); Object.keys(G).forEach(function(k){ if (nq.indexOf(k) >= 0 || (k.length > 4 && norm(G[k]).indexOf(nq) >= 0)) hits.push({s:3 + k.length / 20, h:'📖 <b>' + esc(k) + '</b> = ' + esc(G[k]), src:'Từ điển'}); }); }catch(e){}
  hits.sort(function(a, b){ return b.s - a.s; });
  var top = hits.slice(0, 3);
  if (!top.length) return '<div class="ans"><p>Thầy chưa thấy ý này trong bài. Bấm <b>Hỏi ChatGPT kèm ngữ cảnh</b> để được giảng sâu hơn.</p></div>';
  return '<div class="ans"><p>Trong bài có mấy chỗ liên quan, bạn đọc kỹ nhé:</p>' + top.map(function(h){ return '<div class="hit">' + h.h + ' <span class="gb-mini">— ' + esc(h.src) + '</span></div>'; }).join('') + '</div>';
}
function askBox(){
  return '<div class="gb-ask"><div class="gb-mini" style="margin-bottom:6px">❓ Học đến đâu hỏi đến đó — gõ thắc mắc (ví dụ: "vì sao que basic phải sấy?", "undercut là gì")</div>'
    + '<div class="in"><input id="gb-ask-in" placeholder="Hỏi thầy…" value="' + esc(S.ask).replace(/"/g, '&quot;') + '" onkeydown="if(event.key===\'Enter\')gbAsk()"><button class="btn" style="padding:9px 14px" onclick="gbAsk()">Hỏi</button></div>'
    + (S.ask ? askAnswer(S.ask) : '')
    + '<div class="gb-row" style="margin-top:8px"><button class="gb-tbtn" onclick="gbAskGPT()">💬 Hỏi ChatGPT kèm ngữ cảnh ý đang học</button></div></div>';
}

/* ---------- vẽ ---------- */
function teacher(html, cls, speakId){
  return '<div class="gb-teacher"><div class="gb-av">👨‍🏫</div><div class="gb-bubble ' + (cls || '') + '" ' + (speakId ? 'id="' + speakId + '"' : '') + '>' + html + '</div></div>';
}
function bil(vi, en){ return '<span class="lang-vi">' + vi + '</span>' + (en ? '<span class="lang-en">' + en + '</span>' : ''); }
function topBar(st, si){
  var c = DATA.chapters[S.ci], n = st.length - 1;
  return '<div class="gb-top"><button class="back" style="margin:0" onclick="gbList()">← Danh sách</button><div class="gb-prog"><i style="width:' + Math.round(si / n * 100) + '%"></i></div><small>' + si + '/' + n + ' · Ch.' + (S.ci + 1) + '</small>'
    + '<button class="gb-tbtn' + (TTS ? ' on' : '') + '" onclick="gbToggleTTS()" title="Tự đọc bài giảng bằng giọng tiếng Việt">' + (TTS ? '🔊 Đọc: bật' : '🔇 Đọc: tắt') + '</button></div>';
}
function listView(){
  var el = document.getElementById('v-teach');
  var h = '<div class="card"><h2>🎙️ Giảng bài từng bước</h2><p class="muted" style="margin-top:6px;line-height:1.6">Thay vì ngồi đọc tài liệu, thầy ảo sẽ <b>dẫn bạn đi từng ý</b>: nêu vấn đề để bạn đoán trước → giảng từng đoạn (bấm 🔊 để nghe đọc) → hỏi lại ngay để chắc là hiểu → chốt thuật ngữ → 5 câu tổng kết. Câu sai tự vào 📕 Sổ câu sai. Học dở có thể quay lại học tiếp.</p>'
    + '<p class="muted" style="font-size:12.5px;margin-top:6px">Thứ tự gợi ý theo trọng tâm đề thi: Khuyết tật → Quá trình hàn → NDT → WPS/PQR → Vật liệu hàn → Luyện kim → Xử lý nhiệt → DT …</p></div>';
  var order = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];
  var total = 0, done = 0;
  h += '<div class="chap-list gb-list">' + order.map(function(ci, k){
    var c = DATA.chapters[ci]; if (!c) return ''; var st = build(ci), p = PRG[ci], pct = p ? Math.min(100, Math.round((p.si || 0) / (st.length - 1) * 100)) : 0; total++; if (p && p.done) done++;
    var locked = (typeof chapFree === 'function' && !chapFree(ci));
    var ideas = (c.deep || []).length, mins = Math.max(8, ideas * 4 + 6);
    var status = locked ? '<span class="gb-ring" style="background:rgba(255,255,255,.08);color:var(--muted)">🔒 khóa</span>' : (p && p.done ? '<span class="gb-ring" style="background:rgba(52,199,89,.15);color:var(--green)">✓ xong · đúng ' + p.right + '/' + p.total + '</span>' : pct ? '<span class="gb-ring" style="background:rgba(76,168,255,.15);color:var(--accent2)">▶ ' + pct + '%</span>' : '<span class="gb-ring" style="background:rgba(255,255,255,.08);color:var(--muted)">chưa học</span>');
    return '<div class="chap" onclick="gbStart(' + ci + ')"><div class="num">' + (k + 1) + '</div><div class="meta"><b>' + esc(c.vi) + '</b><div class="muted" style="font-size:12px">' + ideas + ' ý lớn · ~' + mins + ' phút · ' + (c.quiz || []).length + ' câu kiểm tra</div></div><div>' + status + '</div></div>';
  }).join('') + '</div>';
  el.innerHTML = '<div class="gb-wrap">' + h + '</div>';
}
function render(){
  var el = document.getElementById('v-teach'); if (!el) return;
  if (S.ci === null){ listView(); return; }
  var c = DATA.chapters[S.ci], st = build(S.ci), s = st[S.si]; if (!s){ listView(); return; }
  var h = topBar(st, S.si), body = '', nav = '', speakId = 'gb-say-' + S.si;
  if (s.t === 'intro'){
    var ideas = (c.deep || []).length, p = PRG[S.ci];
    body = teacher('<p>Chào bạn 👋 Hôm nay mình học <b>chương ' + (S.ci + 1) + ': ' + esc(c.vi) + '</b>' + (c.en ? ' <span class="muted">(' + esc(c.en) + ')</span>' : '') + '.</p>'
      + (c.intro ? '<p>' + bil(esc(c.intro.vi), esc(c.intro.en)) + '</p>' : '')
      + '<p>Mình sẽ đi qua <b>' + ideas + ' ý lớn</b>. Ở mỗi ý bạn đoán trước, mình giảng, rồi mình hỏi lại ngay. Đừng cố thuộc lòng — hãy cố <b>giải thích được vì sao</b>. Đề thi CSWIP hỏi "why/what happens if" nhiều hơn là hỏi định nghĩa.</p>'
      + (p && p.si > 0 && !p.done ? '<p class="muted">Lần trước bạn học dở ở bước ' + p.si + '. Bấm "Bắt đầu" để đi từ đầu hoặc "Học tiếp" để vào chỗ cũ.</p>' : ''), '', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbGoto(1)">▶ Bắt đầu giảng</button>' + (p && p.si > 1 && !p.done ? '<button class="btn sec" onclick="gbGoto(' + p.si + ')">⏩ Học tiếp từ bước ' + p.si + '</button>' : '') + '<button class="btn ghost" onclick="go(\'learn\');openChap(' + S.ci + ')">📄 Xem bản đọc đầy đủ</button></div>';
  }
  else if (s.t === 'hook'){
    body = teacher('<p>' + pick(OPEN, s.bi) + '</p><p><b>' + pick(HOOK, s.bi) + '</b></p><p style="font-size:16.5px">«' + esc(strip(s.b.h_vi)) + '»' + (s.b.h_en ? ' <span class="muted">(' + esc(strip(s.b.h_en)) + ')</span>' : '') + ' — nó là gì, và vì sao thanh tra hàn phải quan tâm? Nghĩ 10 giây.</p>', 'hook', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Tôi đoán xong → nghe giảng</button><button class="btn sec" onclick="gbNext()">Mình chưa biết gì, giảng luôn</button></div>';
  }
  else if (s.t === 'teach'){
    var paras = (s.b.body || []).slice(); var hasTail = (s.b.rows && s.b.rows.length) || s.b.table || s.b.foot;
    var total = paras.length + (hasTail ? 1 : 0); if (S.pi > total) S.pi = total; var shown = Math.min(S.pi + 1, total);
    var inner = '<p><b style="color:var(--accent);font-size:16px">' + esc(strip(s.b.h_vi)) + '</b>' + (s.b.h_en ? '<span class="lang-en">' + esc(strip(s.b.h_en)) + '</span>' : '') + '</p>';
    for (var i = 0; i < shown; i++){
      if (i < paras.length) inner += '<div class="gb-para' + (i < shown - 1 ? ' dim' : '') + '" id="gb-p' + i + '">' + bil(paras[i].vi, paras[i].en) + '</div>';
      else {
        var tail = '';
        if (s.b.rows && s.b.rows.length) tail += '<ul class="lesson" style="margin-top:4px">' + s.b.rows.map(function(r){ return '<li>' + bil(r.vi, r.en) + '</li>'; }).join('') + '</ul>';
        if (s.b.table) tail += '<div class="tbl-wrap"><table class="deep-tbl"><thead><tr>' + s.b.table.cols.map(function(col){ return '<th>' + bil(col.vi, col.en) + '</th>'; }).join('') + '</tr></thead><tbody>' + s.b.table.data.map(function(row){ return '<tr>' + row.map(function(cell){ return '<td>' + bil(cell.vi, cell.en) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
        if (s.b.foot) tail += '<p class="muted deep-foot">' + bil(s.b.foot.vi, s.b.foot.en) + '</p>';
        inner += '<div class="gb-para" id="gb-p' + i + '"><div class="gb-mini" style="margin-bottom:4px">📋 Bảng / liệt kê cần nhớ:</div>' + tail + '</div>';
      }
    }
    if (shown < total) inner += '<p class="gb-mini" style="margin-top:10px">… còn ' + (total - shown) + ' đoạn nữa. Đọc xong đoạn trên rồi bấm "Tiếp".</p>';
    else inner += '<p style="margin-top:10px">Xong ý này. ' + (st[S.si + 1] && st[S.si + 1].t === 'check' ? 'Giờ mình hỏi lại bạn một câu để xem có hiểu thật không.' : 'Giờ bạn tự nhắc lại bằng lời của mình nhé.') + '</p>';
    body = teacher(inner, '', null);
    var curId = 'gb-p' + (shown - 1);
    nav = '<div class="gb-row"><button class="gb-tbtn" onclick="gbSpeak(\'' + curId + '\')">🔊 Đọc đoạn này</button>'
      + (shown < total ? '<button class="btn" onclick="gbPara()">Tiếp →</button>' : '<button class="btn" onclick="gbNext()">Hiểu rồi → kiểm tra nhanh</button>')
      + '<button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
    speakId = curId;
  }
  else if (s.t === 'check'){
    var q = s.q;
    var opts = q.opts.map(function(o, k){ var cls = ''; if (S.ans !== null){ if (k === q.ans) cls = ' ok'; else if (k === S.ans) cls = ' bad'; } return '<button class="gb-opt' + cls + '" ' + (S.ans === null ? 'onclick="gbPick(' + k + ')"' : 'disabled') + '>' + String.fromCharCode(65 + k) + '. ' + bil(esc(o.vi), esc(o.en)) + '</button>'; }).join('');
    var fb = '';
    if (S.ans !== null){
      var right = S.ans === q.ans;
      fb = teacher('<p><b>' + pick(right ? GOOD : BAD, s.bi) + '</b></p>' + (!right ? '<p>Đáp án đúng là <b>' + String.fromCharCode(65 + q.ans) + '. ' + esc(q.opts[q.ans].vi) + '</b>.</p>' : '') + (q.exp ? '<p>' + bil(esc(q.exp.vi), esc(q.exp.en)) + '</p>' : '') + (!right ? '<p class="muted">Muốn mình giảng lại đoạn vừa rồi không? Bấm "Xem lại đoạn giảng".</p>' : ''), right ? 'good' : 'bad', speakId);
    }
    body = teacher('<p>🧪 <b>Kiểm tra nhanh ý «' + esc(strip(s.b.h_vi)) + '»</b></p><p style="font-size:15.5px">' + bil(esc(q.vi), esc(q.en)) + '</p>', '', S.ans === null ? speakId : null) + opts + (fb ? '<div style="margin-top:12px">' + fb + '</div>' : '');
    nav = '<div class="gb-row">' + (S.ans !== null ? (S.ans !== q.ans ? '<button class="btn sec" onclick="gbGoto(' + (S.si - 1) + ')">↩ Xem lại đoạn giảng</button>' : '') + '<button class="btn" onclick="gbNext()">Tiếp tục →</button>' : '<button class="btn ghost" onclick="gbPrev()">← Xem lại đoạn giảng</button>') + '</div>' + askBox();
  }
  else if (s.t === 'recall'){
    body = teacher('<p>🗣️ <b>Nhắc lại bằng lời của bạn</b></p><p>Nói thành tiếng 1–2 câu: <b>«' + esc(strip(s.b.h_vi)) + '»</b> là gì / xảy ra khi nào / vì sao quan trọng. Nói ra được mới là hiểu — đây là cách kiểm tra trung thực nhất.</p>' + (S.ans === 'review' ? '<p class="muted">Không sao. Mình để lại đoạn giảng bên dưới, bạn đọc lại rồi thử nói lần nữa:</p>' + (s.b.body || []).slice(0, 2).map(function(p){ return '<div class="gb-para">' + bil(p.vi, p.en) + '</div>'; }).join('') : ''), 'hook', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbRecall(true)">✅ Nói trôi, hiểu rồi</button><button class="btn sec" onclick="gbRecall(false)">😕 Còn lấn cấn</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
  }
  else if (s.t === 'teachL'){
    body = teacher('<p>Chương này mình học theo cụm thuật ngữ. Đọc từng dòng, chỗ nào chưa hình dung được thì hỏi mình bên dưới.</p>' + s.items.map(function(L){ return '<div class="gb-para"><b>' + esc(L.t_vi) + (L.t_en ? ' <span class="muted">(' + esc(L.t_en) + ')</span>' : '') + ':</b> ' + bil(L.vi, L.en) + '</div>'; }).join(''), '', speakId);
    nav = '<div class="gb-row"><button class="gb-tbtn" onclick="gbSpeak(\'' + speakId + '\')">🔊 Đọc</button><button class="btn" onclick="gbNext()">Tiếp →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
  }
  else if (s.t === 'recap'){
    body = teacher('<p>📌 <b>Chốt thuật ngữ (' + s.k + '/' + s.n + ')</b> — đề thi bằng tiếng Anh nên bạn chỉ cần <b>nhận ra</b> từ tiếng Anh. Bấm 🔊 để nghe phát âm.</p>'
      + s.items.map(function(L, i){ var en = L.t_en || ''; return '<div class="gb-term"><button class="sp" onclick="gbSpeakText(' + JSON.stringify(en || L.t_vi).replace(/"/g, '&quot;') + ',\'en-GB\')">🔊</button><div><b>' + esc(L.t_vi) + '</b>' + (en ? ' <span class="muted">= ' + esc(en) + '</span>' : '') + '<div style="font-size:13.5px;margin-top:2px">' + esc(L.vi) + '</div></div></div>'; }).join(''), '', null);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Tiếp →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>';
  }
  else if (s.t === 'keys'){
    var UND = LS('cswip_und', {}); var u = UND[S.ci] || {}; var items = c.key.map(function(k){ return k.vi; }).slice(0, 12);
    body = teacher('<p>🧠 <b>Tự kiểm: tôi giải thích được chưa?</b></p><p>Với mỗi điểm dưới đây, nói 1–2 câu giải thích như đang dạy đồng nghiệp. Nói trôi thì tích. Ý nào ấp úng, bấm "Lùi" về đọc lại.</p>'
      + items.map(function(t, i){ return '<div class="nr-task' + (u[i] ? ' done' : '') + '" style="padding:8px 0"><button class="cb" onclick="(window.nrUnd?nrUnd(' + S.ci + ',' + i + '):0);gbKeysRefresh()" aria-label="tích">' + (u[i] ? '✓' : '') + '</button><div class="tx">' + t + '</div></div>'; }).join(''), '', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Làm 5 câu tổng kết →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
  }
  else if (s.t === 'quiz'){
    var it = s.qs[S.qk], qq = it.q;
    var o2 = qq.opts.map(function(o, k){ var cls = ''; if (S.qans !== null){ if (k === qq.ans) cls = ' ok'; else if (k === S.qans) cls = ' bad'; } return '<button class="gb-opt' + cls + '" ' + (S.qans === null ? 'onclick="gbQPick(' + k + ')"' : 'disabled') + '>' + String.fromCharCode(65 + k) + '. ' + bil(esc(o.vi), esc(o.en)) + '</button>'; }).join('');
    var fb2 = S.qans !== null ? '<div style="margin-top:12px">' + teacher('<p><b>' + pick(S.qans === qq.ans ? GOOD : BAD, S.qk) + '</b></p>' + (S.qans !== qq.ans ? '<p>Đáp án: <b>' + String.fromCharCode(65 + qq.ans) + '. ' + esc(qq.opts[qq.ans].vi) + '</b></p>' : '') + (qq.exp ? '<p>' + bil(esc(qq.exp.vi), esc(qq.exp.en)) + '</p>' : ''), S.qans === qq.ans ? 'good' : 'bad') + '</div>' : '';
    body = teacher('<p>🏁 <b>Tổng kết chương — câu ' + (S.qk + 1) + '/' + s.qs.length + '</b> <span class="muted">(đúng ' + S.qright + ')</span></p><p style="font-size:15.5px">' + bil(esc(qq.vi), esc(qq.en)) + '</p>') + o2 + fb2;
    nav = '<div class="gb-row">' + (S.qans !== null ? '<button class="btn" onclick="gbQNext()">' + (S.qk + 1 >= s.qs.length ? 'Xem kết quả →' : 'Câu tiếp →') + '</button>' : '') + '</div>';
  }
  else if (s.t === 'done'){
    var p2 = prg(S.ci); p2.done = true; savePrg();
    var pct = p2.total ? Math.round(p2.right / p2.total * 100) : 0;
    var rev = (p2.review || []).map(function(bi){ var b = (c.deep || [])[bi]; if (!b) return ''; var si = st.findIndex(function(x){ return x.t === 'teach' && x.bi === bi; }); return '<li><a href="#" onclick="gbGoto(' + si + ');return false" style="color:var(--accent2)">' + esc(strip(b.h_vi)) + '</a></li>'; }).join('');
    var order = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17]; var nx = order[(order.indexOf(S.ci) + 1) % order.length];
    body = teacher('<p>🎉 <b>Xong chương ' + (S.ci + 1) + '!</b> Bạn trả lời đúng <b>' + p2.right + '/' + p2.total + '</b> câu kiểm tra (' + pct + '%).</p>'
      + (rev ? '<p>Mấy ý bạn còn lấn cấn, mình gợi ý xem lại:</p><ul class="lesson">' + rev + '</ul>' : '<p>Không có ý nào bị đánh dấu lấn cấn — rất tốt.</p>')
      + '<p>Bước tiếp theo đúng chuẩn: <b>thi chương có chấm điểm</b> (toàn tiếng Anh như đề thật). Đậu ≥70% rồi hãy sang chương kế. Câu sai sẽ nằm trong 📕 Sổ câu sai để ôn lại.</p>', 'good', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="(typeof examChap===\'function\'?examChap(' + S.ci + '):(go(\'quiz\'),startChap(' + S.ci + ')))">📝 Thi chương này</button><button class="btn sec" onclick="gbStart(' + nx + ',true)">▶ Chương tiếp: ' + esc(DATA.chapters[nx].vi) + '</button><button class="btn ghost" onclick="gbStart(' + S.ci + ',true)">🔁 Học lại từ đầu</button><button class="btn ghost" onclick="gbList()">Danh sách</button></div>';
  }
  el.innerHTML = '<div class="gb-wrap">' + h + '<div class="card">' + body + nav + '</div></div>';
  if (TTS && speakId){ var sp = document.getElementById(speakId); if (sp) speak(sp.textContent, 'vi-VN'); }
  window.scrollTo(0, 0);
}
window.gbKeysRefresh = function(){ setTimeout(render, 30); };
window.renderTeach = render;

/* ---------- nút "Nghe giảng" trong tab Bài học ---------- */
function injectLearnBtn(){
  var el = document.getElementById('v-learn'); if (!el || !el.classList.contains('on')) return;
  if (typeof CURCHAP === 'undefined' || CURCHAP === null) return;
  if (el.querySelector('#gb-learn-btn')) return;
  var card = el.querySelector('.card'); if (!card || !el.querySelector('.deep-wrap, ul.lesson')) return;
  var d = document.createElement('div'); d.id = 'gb-learn-btn'; d.className = 'card'; d.style.cssText = 'border-left:3px solid var(--accent2);display:flex;gap:12px;align-items:center;flex-wrap:wrap';
  d.innerHTML = '<div style="font-size:28px">👨‍🏫</div><div style="flex:1;min-width:200px"><b>Không muốn ngồi đọc? Để thầy giảng từng bước.</b><div class="muted" style="font-size:12.5px;margin-top:2px">Đoán trước → giảng từng đoạn → hỏi lại ngay → chốt thuật ngữ → 5 câu tổng kết. Có đọc giọng tiếng Việt.</div></div><button class="btn" onclick="gbStart(' + CURCHAP + ')">🎙️ Nghe giảng chương này</button>';
  card.parentNode.insertBefore(d, card);
}
new MutationObserver(function(){ try{ ensure(); injectLearnBtn(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
