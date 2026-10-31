/* ============================================================
   GIANGBAI — 🎙️ GIẢNG BÀI TỪNG BƯỚC (người thầy ảo, dạng SLIDE)
   Tự sinh bài giảng tương tác cho 18 chương từ:
     DATA.chapters[ci].deep (🎓 Giảng giải) + lessons + key + quiz
     GB_EXTRA  (giangbai_data.js): chuyện đời thường, bẫy đề, con số, thần chú
     GB_FIG    (giangbai_hinh.js): hình minh họa/mô phỏng hiện dần từng bước
     BANK/REALBANK: câu đề thật CSWIP theo chủ đề để kiểm tra
   Nhịp mỗi ý lớn: ① nêu vấn đề (kèm hình nền) & bắt đoán
     → ② SLIDE: hình hiện dần từng lớp + từng đoạn giảng
     → ③ kiểm tra nhanh + 🔍 mổ xẻ câu hỏi (từ khó, bẫy, dịch)
   Cuối chương: bẫy đề → con số thuộc lòng → chốt thuật ngữ
     → tự kiểm "tôi giải thích được" → 5 câu tổng kết (tiếng Anh như đề thật).
   Có ▶ chạy tự động (đọc giọng Việt rồi tự sang slide), ❓ Hỏi thầy.
   Chỉ dùng câu hỏi CSWIP (không CWI).
   Nạp SAU premium.js/nangcap.js/giangbai_data.js/giangbai_hinh.js, TRƯỚC nuocrut.js.
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
var EXTRA = window.GB_EXTRA || {}, FIG = window.GB_FIG || null;
var ORDER = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];

/* ---------- đọc giọng + chạy tự động ---------- */
var TTS = LS('cswip_tts', false), AUTO = false, speakToken = 0, autoTimer = null;
function voiceFor(lang){ try{ var vs = speechSynthesis.getVoices() || []; var pre = lang.slice(0, 2); var v = vs.filter(function(x){ return (x.lang || '').toLowerCase().indexOf(pre) === 0; }); if (!v.length) return null; var g = v.filter(function(x){ return /google|natural|neural|premium|linh|hoai|online/i.test(x.name); }); return (g[0] || v[0]); }catch(e){ return null; } }
function stopSpeak(){ speakToken++; clearTimeout(autoTimer); try{ speechSynthesis.cancel(); }catch(e){} }
function speak(text, lang, onend){
  var tok = ++speakToken; var t = strip(text).replace(/[«»]/g, '').slice(0, 1500);
  if (!t){ if (onend) onend(); return; }
  var fallbackMs = Math.max(2500, Math.min(25000, t.length * 55));
  if (!('speechSynthesis' in window)){ if (onend) autoTimer = setTimeout(function(){ if (tok === speakToken) onend(); }, fallbackMs); return; }
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t); u.lang = lang || 'vi-VN'; u.rate = 1.0;
    var v = voiceFor(u.lang); if (v) u.voice = v;
    var done = false; function fin(){ if (done) return; done = true; if (tok === speakToken && onend) onend(); }
    u.onend = fin; u.onerror = fin;
    speechSynthesis.speak(u);
    // một số trình duyệt không bắn onend khi không có giọng → dự phòng
    autoTimer = setTimeout(function(){ if (!done && tok === speakToken && !speechSynthesis.speaking) fin(); }, fallbackMs + 1500);
  }catch(e){ if (onend) onend(); }
}
window.gbSpeak = function(id, lang){ var el = document.getElementById(id); if (el) speak(el.textContent, lang || 'vi-VN'); };
window.gbSpeakText = function(t, lang){ speak(t, lang); };
window.gbToggleTTS = function(){ TTS = !TTS; SV('cswip_tts', TTS); if (!TTS){ AUTO = false; stopSpeak(); } T(TTS ? '🔊 Đọc giọng: BẬT' : '🔇 Đọc giọng: TẮT'); render(); };
window.gbToggleAuto = function(){ AUTO = !AUTO; if (AUTO){ TTS = true; SV('cswip_tts', true); T('▶ Chạy tự động: đọc xong tự sang slide. Bấm ⏸ để dừng.'); } else { stopSpeak(); T('⏸ Đã dừng chạy tự động'); } render(); };
try{ if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = function(){}; }catch(e){}

/* ---------- tiến độ ---------- */
var PRG = LS('cswip_teach', {});
function prg(ci){ if (!PRG[ci]) PRG[ci] = {si:0, done:false, right:0, total:0, review:[]}; return PRG[ci]; }
function savePrg(){ SV('cswip_teach', PRG); }
window.gbProgress = function(ci){ var p = PRG[ci]; if (!p) return null; var st = build(ci); return {done:p.done, pct:st.length ? Math.min(100, Math.round(p.si / (st.length - 1) * 100)) : 0, right:p.right, total:p.total}; };

/* ---------- lời thầy ---------- */
var OPEN = ['Được rồi, mình sang ý tiếp theo nhé.', 'Ý này đề thi hỏi rất nhiều — để ý kỹ.', 'Giờ mình nói về một chỗ học viên hay nhầm.', 'Tiếp tục nào, ý này ngắn thôi.', 'Chỗ này quan trọng với thanh tra ngoài hiện trường.', 'Mình đi chậm một chút ở ý này.'];
var HOOK = ['Trước khi mình giảng, bạn thử tự trả lời trong đầu đã:', 'Khoan đọc vội. Nhìn hình rồi đoán thử:', 'Câu hỏi mở đầu cho ý này:', 'Thử tự nghĩ 10 giây rồi hãy bấm:'];
var GOOD = ['Chuẩn! 👏', 'Đúng rồi — bạn nắm được ý này.', 'Chính xác. Tốt lắm.', 'Đúng. Giữ cách nghĩ này khi vào phòng thi.'];
var BAD = ['Chưa đúng — nhưng sai ở đây còn hơn sai trong phòng thi.', 'Chưa phải. Mình giải thích lại nhé:', 'Nhầm rồi, đây là bẫy quen thuộc.', 'Chưa đúng. Nghe mình nói lại ý chính:'];
function pick(arr, i){ return arr[i % arr.length]; }

/* ---------- câu hỏi: chương + ngân hàng CSWIP theo chủ đề ---------- */
function normChapQ(q, ci, qi){ return {id:'c' + ci + '-' + qi, vi:q.vi, en:q.en, opts:q.opts, ans:q.ans, exp:q.exp || null, cat:DATA.chapters[ci].vi, src:'quiz chương'}; }
function normBankQ(q, id){ return {id:id, vi:q.qv || '', en:q.q, opts:(q.o || []).map(function(o, k){ return {en:o, vi:(q.ov && q.ov[k]) || ''}; }), ans:q.a, exp:{vi:q.ev || '', en:q.e || ''}, cat:q.c, src:'đề thật CSWIP'}; }
function bankForChapter(ci){
  var cats = (typeof CHAP_CATS !== 'undefined' && CHAP_CATS[ci]) || [];
  var out = [];
  try{ if (typeof BANK !== 'undefined') BANK.forEach(function(q, i){ if (cats.indexOf(q.c) >= 0 && q.o && typeof q.a === 'number') out.push(normBankQ(q, 'b' + i)); }); }catch(e){}
  try{ if (typeof REALBANK !== 'undefined') REALBANK.forEach(function(q, i){ if (cats.indexOf(q.c) >= 0 && q.o && typeof q.a === 'number') out.push(normBankQ(q, 'r' + i)); }); }catch(e){}
  return out;
}

/* ---------- sinh các bước cho chương ---------- */
var CACHE = {};
function build(ci){
  if (CACHE[ci]) return CACHE[ci];
  var c = DATA.chapters[ci]; if (!c) return [];
  var X = EXTRA[ci] || {};
  var steps = [{t:'intro'}];
  var deep = c.deep || [];
  var figs = FIG ? FIG.assign(ci, deep) : [];
  var quiz = (c.quiz || []).map(function(q, qi){ var n = normChapQ(q, ci, qi); n.w = words((q.en || '') + ' ' + (q.exp && q.exp.en || '')); return n; });
  var bank = bankForChapter(ci).map(function(n){ n.w = words(n.en + ' ' + (n.exp && n.exp.en || '')); return n; });
  var usedIds = {}, usedBook = {};
  deep.forEach(function(b, bi){
    var fig = figs[bi] || null;
    steps.push({t:'hook', b:b, bi:bi, fig:fig});
    // slides: hình từng bước → đoạn giảng → bảng/liệt kê
    var slides = [];
    if (fig && FIG){ for (var k = 0; k < FIG.steps(fig); k++) slides.push({kind:'fig', fig:fig, k:k, text:FIG.cap(fig, k)}); }
    (b.body || []).forEach(function(p){ slides.push({kind:'para', vi:p.vi, en:p.en, fig:fig}); });
    // ảnh thật / hình vẽ trong giáo trình WIS5 khớp với ý này
    if (window.BOOK && BOOK.figs.length){
      var btxt = (b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ') + ' ' + (b.rows || []).map(function(r){ return r.en || ''; }).join(' ');
      var bfs = BOOK.match(ci, btxt, 2, usedBook);
      bfs.forEach(function(f){ usedBook[f.i] = 1; slides.push({kind:'book', f:f, fig:fig}); });
    }
    if ((b.rows && b.rows.length) || b.table || b.foot) slides.push({kind:'tail', b:b, fig:fig});
    if (!slides.length) slides.push({kind:'para', vi:strip(b.h_vi), en:strip(b.h_en || ''), fig:fig});
    steps.push({t:'teach', b:b, bi:bi, fig:fig, slides:slides});
    // câu kiểm tra sát ý nhất: ưu tiên quiz chương, rồi đề thật
    var bw = words((b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ') + ' ' + (b.rows || []).map(function(r){ return r.en || ''; }).join(' '));
    var best = null;
    function scan(arr, bonus){ arr.forEach(function(x){ if (usedIds[x.id] || !x.w.length) return; var sc = overlap(x.w, bw) / Math.sqrt(x.w.length + 2) + bonus; if (!best || sc > best.sc) best = {x:x, sc:sc}; }); }
    scan(quiz, 0.05); scan(bank, 0);
    if (best && best.sc >= 0.33){ usedIds[best.x.id] = 1; steps.push({t:'check', b:b, bi:bi, q:best.x}); }
    else steps.push({t:'recall', b:b, bi:bi, fig:fig});
  });
  if (window.BOOK && BOOK.figs.length){
    var rest = BOOK.forChapter(ci).filter(function(f){ return !usedBook[f.i]; });
    steps.forEach(function(st){ if (st.t !== 'teach' || !rest.length) return; if (st.slides.some(function(x){ return x.kind === 'book'; })) return; var f = rest.shift(); usedBook[f.i] = 1; var at = st.slides.findIndex(function(x){ return x.kind === 'tail'; }); st.slides.splice(at < 0 ? st.slides.length : at, 0, {kind:'book', f:f, fig:st.fig}); });
    if (rest.length) steps.splice(steps.length, 0, {t:'gallery', items:rest}); // trước recap/done sẽ sắp lại bên dưới
  }
  if (!deep.length){ (c.lessons || []).forEach(function(L, li){ if (li % 4 === 0) steps.push({t:'teachL', items:c.lessons.slice(li, li + 4), li:li}); }); }
  if (X.traps && X.traps.length) steps.push({t:'traps', items:X.traps});
  if (X.numbers && X.numbers.length) steps.push({t:'numbers', items:X.numbers});
  var les = c.lessons || [];
  for (var i = 0; i < les.length; i += 6) steps.push({t:'recap', items:les.slice(i, i + 6), i:i, n:Math.ceil(les.length / 6), k:Math.floor(i / 6) + 1});
  if (c.key && c.key.length) steps.push({t:'keys'});
  var rest = quiz.filter(function(x){ return !usedIds[x.id]; }).concat(shuf(bank.filter(function(x){ return !usedIds[x.id]; })).slice(0, 6));
  var qs = shuf(rest).slice(0, Math.min(5, rest.length));
  if (qs.length) steps.push({t:'quiz', qs:qs});
  steps.push({t:'done'});
  var gi = steps.findIndex(function(x){ return x.t === 'gallery'; });
  if (gi >= 0){ var g = steps.splice(gi, 1)[0]; var ri = steps.findIndex(function(x){ return x.t === 'recap' || x.t === 'keys' || x.t === 'quiz'; }); steps.splice(ri < 0 ? steps.length - 1 : ri, 0, g); }
  CACHE[ci] = steps; return steps;
}

/* ---------- trạng thái ---------- */
var S = {ci:null, si:0, pi:0, ans:null, qk:0, qans:null, qright:0, ask:'', dis:false};

/* ---------- đăng ký tab + CSS ---------- */
function ensure(){
  if (document.getElementById('v-teach')) return;
  var main = document.querySelector('main'); if (!main) return;
  var d = document.createElement('div'); d.id = 'v-teach'; d.className = 'view'; main.appendChild(d);
  if (typeof TABS !== 'undefined' && typeof buildNav === 'function'){
    var has = TABS.some(function(t){ return t[0] === 'teach'; });
    if (!has){ TABS.splice(1, 0, ['teach', '🎙️ Giảng bài']); buildNav(); document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); }); }
  }
  if (!window._teachWrapped){ var o = window.renderAll; window.renderAll = function(){ o(); try{ if (CUR === 'teach') render(); else if (AUTO){ AUTO = false; stopSpeak(); } }catch(e){ console.error(e); } }; window._teachWrapped = true; }
  var css = document.createElement('style');
  css.textContent = [
  '.gb-wrap{max-width:780px;margin:0 auto}',
  '.gb-top{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}',
  '.gb-top .gb-prog{flex:1;min-width:100px;height:6px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden}',
  '.gb-top .gb-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent2),var(--green))}',
  '.gb-top small{color:var(--muted);font-size:12px;white-space:nowrap}',
  '.gb-tbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:var(--txt);border-radius:9px;padding:6px 10px;font-size:12.5px;cursor:pointer;font-family:inherit;white-space:nowrap}',
  '.gb-tbtn.on{border-color:var(--accent2);color:var(--accent2);background:rgba(76,168,255,.1)}',
  '.gb-tbtn.play{border-color:var(--green);color:var(--green)}',
  '.gb-teacher{display:flex;gap:12px;align-items:flex-start}',
  '.gb-av{flex:none;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ff7a33,#ffd60a);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 6px 18px rgba(255,122,51,.35)}',
  '.gb-av.talk{animation:gbTalk .6s infinite alternate}',
  '@keyframes gbTalk{from{transform:scale(1)}to{transform:scale(1.07)}}',
  '.gb-bubble{flex:1;min-width:0;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:4px 16px 16px 16px;padding:14px 16px;line-height:1.7;font-size:15.5px}',
  '.gb-bubble p{margin:0 0 10px}.gb-bubble p:last-child{margin-bottom:0}',
  '.gb-bubble .lang-en{display:block;color:var(--muted);font-style:italic;font-size:13px;margin-top:3px}',
  'body.m-vi .gb-bubble .lang-en{display:none}',
  '.gb-bubble.hook{border-color:rgba(76,168,255,.4);background:rgba(76,168,255,.08)}',
  '.gb-bubble.good{border-color:rgba(52,199,89,.45);background:rgba(52,199,89,.08)}',
  '.gb-bubble.bad{border-color:rgba(255,69,58,.4);background:rgba(255,69,58,.07)}',
  '.gb-bubble.trap{border-color:rgba(255,214,10,.4);background:rgba(255,214,10,.06)}',
  '.gb-slide{animation:gbin .35s ease}',
  '@keyframes gbin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
  '.gb-figwrap{margin-bottom:12px}',
  '.gb-figwrap.small svg{max-height:170px}',
  '.gb-figcap{font-size:12px;color:var(--muted);margin-top:4px;text-align:center}',
  '.gb-big{font-size:17px;line-height:1.75}',
  '.gb-dots{display:flex;gap:5px;flex-wrap:wrap;margin:12px 0 2px}',
  '.gb-dots i{width:18px;height:6px;border-radius:3px;background:rgba(255,255,255,.1)}',
  '.gb-dots i.done{background:var(--accent2)}.gb-dots i.cur{background:var(--accent)}',
  '.gb-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;align-items:center}',
  '.gb-opt{display:block;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);color:var(--txt);border-radius:12px;padding:12px 14px;margin-top:8px;cursor:pointer;font-size:14.5px;line-height:1.45;font-family:inherit}',
  '.gb-opt:hover{border-color:var(--accent2)}',
  '.gb-opt.ok{background:rgba(52,199,89,.16);border-color:var(--green)}',
  '.gb-opt.bad{background:rgba(255,69,58,.14);border-color:var(--red)}',
  '.gb-opt[disabled]{cursor:default}',
  '.gb-opt .lang-en{display:block;color:var(--muted);font-size:13px;margin-top:2px}',
  '.gb-opt .lang-vi.sub{display:block;color:var(--muted);font-size:13px;margin-top:2px}',
  '.gb-q{font-size:16.5px;line-height:1.55;font-weight:600}',
  '.gb-q mark{background:rgba(255,214,10,.3);color:var(--yellow);padding:0 3px;border-radius:4px;font-weight:800}',
  '.gb-q .num{color:var(--accent2);font-weight:800}',
  '.gb-dis{margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.14);font-size:13.5px;line-height:1.6}',
  '.gb-dis b{color:var(--accent)}',
  '.gb-chip{display:inline-block;margin:3px 4px 0 0;padding:3px 9px;border-radius:12px;background:rgba(76,168,255,.1);border:1px solid rgba(76,168,255,.3);font-size:12.5px}',
  '.gb-chip b{color:var(--accent2);font-weight:700}',
  '.gb-term{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px dashed var(--line)}',
  '.gb-term:last-child{border-bottom:none}',
  '.gb-term .sp{flex:none;background:none;border:1px solid var(--line);color:var(--accent2);border-radius:8px;width:32px;height:32px;cursor:pointer}',
  '.gb-term b{color:var(--accent)}',
  '.gb-ask{margin-top:14px;border-top:1px dashed var(--line);padding-top:12px}',
  '.gb-ask .in{display:flex;gap:6px}',
  '.gb-ask input{flex:1;min-width:0;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:9px 11px;font-size:14px;font-family:inherit}',
  '.gb-ask .ans{margin-top:8px;font-size:13.5px;line-height:1.6}',
  '.gb-ask .ans .hit{padding:8px 10px;border-radius:10px;background:rgba(76,168,255,.07);border:1px solid rgba(76,168,255,.2);margin-top:6px}',
  '.gb-mini{font-size:12px;color:var(--muted)}',
  '.gb-ring{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11.5px;font-weight:700}',
  '.gb-story{font-size:15.5px;line-height:1.75;padding:12px 14px;border-left:3px solid var(--yellow);background:rgba(255,214,10,.05);border-radius:0 12px 12px 0;margin-top:10px}',
  '.gb-learnfig{margin:8px 0 12px}',
  '.gb-learnfig svg{max-height:290px}',
  '.gb-slide .bk-fig img{max-height:430px;object-fit:contain;background:#fff}',
  '@media(max-width:520px){.gb-bubble{font-size:15px;padding:12px}.gb-big{font-size:16px}}',
  '@media print{body *{visibility:hidden}#v-teach,#v-teach *{visibility:visible}#v-teach{position:absolute;left:0;top:0;width:100%;color:#000}#v-teach .card{background:#fff;border:none;box-shadow:none}.gb-top,.gb-row,.btn,.back{display:none!important}}'
  ].join('\n');
  document.head.appendChild(css);
}

/* ---------- API điều hướng ---------- */
window.gbStart = function(ci, fromStart, auto){
  if (typeof chapFree === 'function' && !chapFree(ci)){ go('learn'); openChap(ci); return; }
  S.ci = ci; var p = prg(ci); S.si = fromStart ? 0 : Math.min(p.si || 0, build(ci).length - 1); if (fromStart){ p.si = 0; p.done = false; p.right = 0; p.total = 0; p.review = []; savePrg(); }
  S.pi = 0; S.ans = null; S.qk = 0; S.qans = null; S.qright = 0; S.ask = ''; S.dis = false;
  if (auto){ AUTO = true; TTS = true; SV('cswip_tts', true); }
  go('teach');
};
window.gbList = function(){ stopSpeak(); AUTO = false; S.ci = null; S.numbers = false; render(); };
/* 🔢 Bảng số liệu phải thuộc — gom "numbers" + thần chú của 18 chương, in được */
window.gbNumbers = function(){ stopSpeak(); AUTO = false; S.ci = null; S.numbers = true; render(); };
function numbersView(el){
  var h = '<div class="card"><button class="back" onclick="gbList()">← Giảng bài</button><h2 style="margin-top:8px">🔢 Bảng số liệu & thần chú phải thuộc — toàn khóa</h2><p class="muted" style="margin-top:6px;line-height:1.6">Gom toàn bộ con số, bảng và câu thần chú của 18 chương (phần "Phải thuộc" trong từng bài giảng). 21% câu đề có đáp án là con số — đọc bảng này mỗi ngày trong tuần cuối. In ra giấy: Ctrl/Cmd + P.</p><div class="gb-row"><button class="btn" onclick="window.print()">🖨️ In bảng</button><button class="btn sec" onclick="gbSpeak(\'gb-numbers-all\')">🔊 Đọc</button></div></div><div class="card" id="gb-numbers-all">';
  ORDER.forEach(function(ci){ var X = EXTRA[ci]; var c = DATA.chapters[ci]; if (!X || !c) return;
    h += '<h3 style="margin:14px 0 4px;color:var(--accent2)">' + (ci + 1) + '. ' + esc(c.vi) + '</h3>';
    if (X.numbers) h += '<ul class="lesson" style="margin:4px 0">' + X.numbers.map(function(n){ return '<li>' + n + '</li>'; }).join('') + '</ul>';
    if (X.mnemonic) h += '<div class="gb-story" style="margin-top:6px">🧷 ' + X.mnemonic + '</div>';
  });
  h += '</div>';
  el.innerHTML = '<div class="gb-wrap">' + h + '</div>'; window.scrollTo(0, 0);
}
function setStep(si){ var st = build(S.ci); S.si = Math.max(0, Math.min(st.length - 1, si)); S.pi = 0; S.ans = null; S.qans = null; S.ask = ''; S.dis = false; var p = prg(S.ci); if (S.si > (p.si || 0)) p.si = S.si; if (st[S.si].t === 'done') p.done = true; savePrg(); }
window.gbNext = function(){ stopSpeak(); var st = build(S.ci); if (S.si < st.length - 1) setStep(S.si + 1); render(); };
window.gbPrev = function(){ stopSpeak(); if (S.si > 0){ setStep(S.si - 1); var s = build(S.ci)[S.si]; S.pi = s.slides ? s.slides.length - 1 : (s.items ? s.items.length - 1 : 0); } render(); };
window.gbGoto = function(si){ stopSpeak(); setStep(si); render(); };
window.gbSlide = function(d){ stopSpeak(); var s = build(S.ci)[S.si]; var n = s.slides ? s.slides.length : (s.items ? s.items.length : 1); S.pi = Math.max(0, Math.min(n - 1, S.pi + d)); render(); };
window.gbPara = function(){ var s = build(S.ci)[S.si]; var n = s.slides ? s.slides.length : (s.items ? s.items.length : 1); if (S.pi < n - 1) gbSlide(1); else gbNext(); };
window.gbDis = function(){ S.dis = !S.dis; render(); };
window.gbPick = function(k){
  var st = build(S.ci)[S.si]; if (!st || S.ans !== null) return; stopSpeak(); S.ans = k;
  var q = st.q, right = k === q.ans, p = prg(S.ci); p.total++; if (right) p.right++; else if (p.review.indexOf(st.bi) < 0) p.review.push(st.bi);
  savePrg(); recordQ(q, k, right); render();
};
window.gbRecall = function(ok){ stopSpeak(); var st = build(S.ci)[S.si]; var p = prg(S.ci); if (!ok && p.review.indexOf(st.bi) < 0) p.review.push(st.bi); if (ok) p.review = p.review.filter(function(x){ return x !== st.bi; }); savePrg(); if (ok) gbNext(); else { S.ans = 'review'; render(); } };
window.gbQPick = function(k){
  var st = build(S.ci)[S.si]; if (S.qans !== null) return; stopSpeak(); S.qans = k;
  var it = st.qs[S.qk], right = k === it.ans, p = prg(S.ci); p.total++; if (right){ p.right++; S.qright++; }
  savePrg(); recordQ(it, k, right); render();
};
window.gbQNext = function(){ stopSpeak(); var st = build(S.ci)[S.si]; S.qk++; S.qans = null; S.dis = false; if (S.qk >= st.qs.length){ S.qk = 0; gbNext(); } else render(); };
window.gbAsk = function(){ var inp = document.getElementById('gb-ask-in'); if (!inp) return; S.ask = (inp.value || '').trim(); render(); };
window.gbAskGPT = function(){
  var st = build(S.ci)[S.si], c = DATA.chapters[S.ci];
  var ctx = st.b ? ('Ý đang học: ' + strip(st.b.h_vi) + '. ' + (st.b.body || []).map(function(p){ return strip(p.vi); }).join(' ').slice(0, 700)) : ('Chương: ' + c.vi);
  var q = S.ask || 'Hãy giảng lại ý này thật dễ hiểu kèm ví dụ hiện trường.';
  var prompt = 'Bạn là giảng viên CSWIP 3.1 (TWI WIS5). Học viên Việt Nam đang học chương "' + c.vi + '". ' + ctx + '\nCâu hỏi của học viên: ' + q + '\nTrả lời tiếng Việt dễ hiểu, kèm thuật ngữ tiếng Anh trong ngoặc, có ví dụ thực tế, cuối cùng nêu 1 bẫy đề thi liên quan.';
  try{ navigator.clipboard.writeText(prompt); }catch(e){}
  window.open('https://chatgpt.com/?q=' + encodeURIComponent(prompt), '_blank');
};

/* ghi nhận câu kiểm tra vào hệ thống chung (QUIZSTATE + SRS + Sổ câu sai) */
function recordQ(q, k, right){
  try{ QUIZSTATE[q.id] = {correct:right}; if (typeof srsUpdate === 'function') srsUpdate(q.id, right); if (typeof save === 'function') save(); if (typeof gameTick === 'function') gameTick(right); }catch(e){}
  try{ if (window.NR && NR.record) NR.record({id:q.id, qe:q.en, qv:q.vi, oe:q.opts.map(function(o){ return o.en; }), ov:q.opts.map(function(o){ return o.vi || ''; }), a:q.ans, ee:q.exp ? q.exp.en : '', ev:q.exp ? q.exp.vi : '', cat:q.cat, src:'Giảng bài — ' + DATA.chapters[S.ci].vi, lesson:[S.ci, -1]}, k, right, {}); }catch(e){}
}

/* ---------- 🔍 mổ xẻ câu hỏi ---------- */
var NEG = /\b(NOT|EXCEPT|LEAST|NEVER|ALWAYS|MOST|BEST|FIRST|MAIN|PRIMARY|ONLY|MINIMUM|MAXIMUM|INCORRECT|FALSE|TRUE|UNLIKELY|LIKELY|WORST|HIGHEST|LOWEST|GREATEST)\b/gi;
function glossaryHits(text){
  var G = window.GLOSSARY || {}; var low = ' ' + String(text || '').toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  var keys = Object.keys(G).sort(function(a, b){ return b.length - a.length; }); var hits = [], covered = low;
  for (var i = 0; i < keys.length && hits.length < 7; i++){ var k = keys[i]; if (k.length < 3) continue; if (covered.indexOf(' ' + k + ' ') >= 0 || (k.length > 5 && covered.indexOf(k) >= 0)){ hits.push([k, G[k]]); covered = covered.split(k).join(' '); } }
  return hits;
}
function markQ(en){ return esc(en).replace(NEG, function(m){ return '<mark>' + m + '</mark>'; }).replace(/(\d+(?:[.,]\d+)?\s?(?:%|°C|mm|MPa|J|A|V|kJ\/mm|ksi|psi|m)?)/g, '<span class="num">$1</span>'); }
function dissectHTML(q, hint){
  var negs = []; var m; var re = new RegExp(NEG.source, 'gi'); while ((m = re.exec(q.en || '')) !== null) negs.push(m[1].toUpperCase());
  var hits = glossaryHits((q.en || '') + ' ' + (q.opts || []).map(function(o){ return o.en; }).join(' '));
  var h = '<div class="gb-dis">🔍 <b>Mổ xẻ đề</b>';
  if (hint) h += ' — đề đang hỏi về: <b>' + esc(hint) + '</b>';
  if (negs.length) h += '<div>⚠️ Từ quyết định nghĩa câu: <b>' + negs.map(esc).join(', ') + '</b> — đọc lại câu với từ này, nhiều người chọn ngược chỉ vì bỏ qua nó.</div>';
  if (q.vi) h += '<div>🇻🇳 Dịch: ' + esc(q.vi) + '</div>';
  if (hits.length) h += '<div style="margin-top:4px">📖 Từ khó: ' + hits.map(function(x){ return '<span class="gb-chip"><b>' + esc(x[0]) + '</b> = ' + esc(x[1]) + '</span>'; }).join('') + '</div>';
  h += '<div class="gb-mini" style="margin-top:6px">Cách làm: gạch chân từ khóa → tự trả lời trước khi nhìn đáp án → loại 2 đáp án sai rõ → chọn giữa 2 còn lại theo "cơ chế" đã học.</div></div>';
  return h;
}

/* ---------- hỏi thầy ---------- */
function norm(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase(); }
function askAnswer(q){
  var ws = norm(q).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 2; }); if (!ws.length) return '';
  function score(text){ var t = norm(text), s = 0; ws.forEach(function(w){ if (t.indexOf(w) >= 0) s++; }); return s; }
  var hits = [];
  function scanChap(ci, bonus){ var c = DATA.chapters[ci]; (c.lessons || []).forEach(function(L){ var s = score((L.t_vi || '') + ' ' + (L.t_en || '') + ' ' + (L.vi || '') + ' ' + (L.en || '')) + bonus; if (s > bonus) hits.push({s:s, h:'<b>' + esc(L.t_vi) + (L.t_en ? ' (' + esc(L.t_en) + ')' : '') + '</b>: ' + esc(L.vi), src:c.vi}); });
    (c.deep || []).forEach(function(b){ (b.body || []).forEach(function(p){ var s = score(strip(p.vi) + ' ' + strip(p.en)) + bonus; if (s > bonus + 1) hits.push({s:s, h:'<b>' + esc(strip(b.h_vi)) + '</b>: ' + esc(strip(p.vi)).slice(0, 320), src:c.vi}); }); }); }
  scanChap(S.ci, 2);
  DATA.chapters.forEach(function(_, ci){ if (ci !== S.ci) scanChap(ci, 0); });
  try{ var X = EXTRA[S.ci]; if (X){ (X.traps || []).concat(X.numbers || []).forEach(function(t){ var s = score(strip(t)) + 1; if (s > 2) hits.push({s:s, h:'⚠️ ' + t, src:'bẫy đề / con số'}); }); } }catch(e){}
  try{ var G = window.GLOSSARY || {}; var nq = norm(q); Object.keys(G).forEach(function(k){ if (nq.indexOf(k) >= 0 || (k.length > 4 && norm(G[k]).indexOf(nq) >= 0)) hits.push({s:3 + k.length / 20, h:'📖 <b>' + esc(k) + '</b> = ' + esc(G[k]), src:'Từ điển'}); }); }catch(e){}
  hits.sort(function(a, b){ return b.s - a.s; });
  var top = hits.slice(0, 3);
  if (!top.length) return '<div class="ans"><p>Thầy chưa thấy ý này trong bài. Bấm <b>Hỏi ChatGPT kèm ngữ cảnh</b> để được giảng sâu hơn.</p></div>';
  return '<div class="ans"><p>Trong bài có mấy chỗ liên quan, bạn đọc kỹ nhé:</p>' + top.map(function(h){ return '<div class="hit">' + h.h + ' <span class="gb-mini">— ' + esc(h.src) + '</span></div>'; }).join('') + '</div>';
}
function askBox(){
  return '<div class="gb-ask"><div class="gb-mini" style="margin-bottom:6px">❓ Học đến đâu hỏi đến đó — gõ thắc mắc (vd: "vì sao que basic phải sấy?", "undercut là gì")</div>'
    + '<div class="in"><input id="gb-ask-in" placeholder="Hỏi thầy…" value="' + esc(S.ask).replace(/"/g, '&quot;') + '" onkeydown="if(event.key===\'Enter\')gbAsk()"><button class="btn" style="padding:9px 14px" onclick="gbAsk()">Hỏi</button></div>'
    + (S.ask ? askAnswer(S.ask) : '')
    + '<div class="gb-row" style="margin-top:8px"><button class="gb-tbtn" onclick="gbAskGPT()">💬 Hỏi ChatGPT kèm ngữ cảnh ý đang học</button></div></div>';
}

/* ---------- vẽ ---------- */
function teacher(html, cls, speakId){ return '<div class="gb-teacher"><div class="gb-av' + (AUTO ? ' talk' : '') + '">👨‍🏫</div><div class="gb-bubble ' + (cls || '') + '" ' + (speakId ? 'id="' + speakId + '"' : '') + '>' + html + '</div></div>'; }
function bil(vi, en){ return '<span class="lang-vi">' + vi + '</span>' + (en ? '<span class="lang-en">' + en + '</span>' : ''); }
function bilE(vi, en){ return '<span class="lang-en" style="display:block;color:var(--txt);font-style:normal;font-size:inherit">' + en + '</span>' + (vi ? '<span class="lang-vi sub">' + vi + '</span>' : ''); }
function fig(key, upto, small){ if (!FIG || !key) return ''; return '<div class="gb-figwrap' + (small ? ' small' : '') + '">' + FIG.render(key, upto) + (small ? '' : '<div class="gb-figcap">' + esc(FIG.title(key)) + '</div>') + '</div>'; }
function dots(n, cur){ var h = '<div class="gb-dots">'; for (var i = 0; i < n; i++) h += '<i class="' + (i < cur ? 'done' : i === cur ? 'cur' : '') + '"></i>'; return h + '</div>'; }
function optHTML(q, picked, pickFn, enFirst){
  return q.opts.map(function(o, k){ var cls = ''; if (picked !== null){ if (k === q.ans) cls = ' ok'; else if (k === picked) cls = ' bad'; }
    var body = enFirst ? bilE(esc(o.vi || ''), esc(o.en)) : (o.vi ? bil(esc(o.vi), esc(o.en)) : '<span>' + esc(o.en) + '</span>');
    return '<button class="gb-opt' + cls + '" ' + (picked === null ? 'onclick="' + pickFn + '(' + k + ')"' : 'disabled') + '>' + String.fromCharCode(65 + k) + '. ' + body + '</button>'; }).join('');
}
function topBar(st, si){
  var n = st.length - 1;
  return '<div class="gb-top"><button class="back" style="margin:0" onclick="gbList()">← Danh sách</button><div class="gb-prog"><i style="width:' + Math.round(si / n * 100) + '%"></i></div><small>' + si + '/' + n + ' · Ch.' + (S.ci + 1) + '</small>'
    + '<button class="gb-tbtn' + (TTS ? ' on' : '') + '" onclick="gbToggleTTS()" title="Đọc giọng tiếng Việt">' + (TTS ? '🔊' : '🔇') + '</button>'
    + '<button class="gb-tbtn' + (AUTO ? ' play' : '') + '" onclick="gbToggleAuto()" title="Đọc xong tự sang slide, dừng ở câu hỏi">' + (AUTO ? '⏸ Dừng' : '▶ Tự chạy') + '</button></div>';
}
function listView(){
  var el = document.getElementById('v-teach');
  var h = '<div class="card"><h2>🎙️ Giảng bài từng bước</h2><p class="muted" style="margin-top:6px;line-height:1.6">Không ngồi đọc tài liệu. Thầy ảo dẫn bạn đi <b>từng slide</b>: hình minh họa hiện dần từng lớp → giảng từng đoạn → hỏi lại ngay bằng câu đề thật kèm <b>mổ xẻ đề</b> (từ khó, bẫy) → bẫy đề của chương → con số thuộc lòng → chốt thuật ngữ → 5 câu tổng kết. Bấm <b>▶ Tự chạy</b> để nghe như podcast; câu sai tự vào 📕 Sổ câu sai.</p>'
    + '<p class="muted" style="font-size:12.5px;margin-top:6px">Thứ tự gợi ý theo trọng tâm đề CSWIP 3.1: Khuyết tật → Quá trình hàn → NDT → WPS/PQR → Vật liệu hàn → Luyện kim → Xử lý nhiệt → DT …</p></div>';
  var total = 0, done = 0;
  h += '<div class="chap-list gb-list">' + ORDER.map(function(ci, k){
    var c = DATA.chapters[ci]; if (!c) return ''; var st = build(ci), p = PRG[ci], pct = p ? Math.min(100, Math.round((p.si || 0) / (st.length - 1) * 100)) : 0; total++; if (p && p.done) done++;
    var locked = (typeof chapFree === 'function' && !chapFree(ci));
    var ideas = (c.deep || []).length, nfig = FIG ? FIG.assign(ci, c.deep || []).filter(Boolean).length : 0, nbook = window.BOOK ? BOOK.forChapter(ci).length : 0, mins = Math.max(8, ideas * 4 + 8);
    var status = locked ? '<span class="gb-ring" style="background:rgba(255,255,255,.08);color:var(--muted)">🔒 khóa</span>' : (p && p.done ? '<span class="gb-ring" style="background:rgba(52,199,89,.15);color:var(--green)">✓ xong · đúng ' + p.right + '/' + p.total + '</span>' : pct ? '<span class="gb-ring" style="background:rgba(76,168,255,.15);color:var(--accent2)">▶ ' + pct + '%</span>' : '<span class="gb-ring" style="background:rgba(255,255,255,.08);color:var(--muted)">chưa học</span>');
    return '<div class="chap" onclick="gbStart(' + ci + ')"><div class="num">' + (k + 1) + '</div><div class="meta"><b>' + esc(c.vi) + '</b><div class="muted" style="font-size:12px">' + ideas + ' ý lớn · ' + nfig + ' mô phỏng · ' + nbook + ' hình sách · ~' + mins + ' phút · ' + (EXTRA[ci] && EXTRA[ci].traps ? EXTRA[ci].traps.length + ' bẫy đề' : '') + '</div></div><div>' + status + '</div></div>';
  }).join('') + '</div>';
  h += '<div class="card" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;border-left:3px solid var(--yellow)"><div style="font-size:26px">🔢</div><div style="flex:1;min-width:200px"><b>Bảng số liệu & thần chú phải thuộc — toàn khóa</b><div class="muted" style="font-size:12.5px;margin-top:2px">Gom con số của 18 chương (sấy que, H5/H10, 27 J, 4t, 380 HV, 723 °C, PWHT, 75 mm, lux…) + câu thần chú. In được. 21% câu đề có đáp án là số.</div></div><button class="btn sec" onclick="gbNumbers()">Mở bảng</button></div>';
  h += '<div class="card" style="text-align:center"><p class="muted" style="font-size:13px">Đã xong ' + done + '/' + total + ' chương. Nghe lại chương đã xong vẫn tính điểm & ghi câu sai.</p></div>';
  el.innerHTML = '<div class="gb-wrap">' + h + '</div>';
}
function render(){
  var el = document.getElementById('v-teach'); if (!el) return;
  if (S.ci === null){ if (S.numbers) return numbersView(el); listView(); return; }
  var c = DATA.chapters[S.ci], st = build(S.ci), s = st[S.si]; if (!s){ listView(); return; }
  var X = EXTRA[S.ci] || {};
  var h = topBar(st, S.si), body = '', nav = '', speakId = 'gb-say-' + S.si + '-' + S.pi, autoNext = null;
  if (s.t === 'intro'){
    var ideas = (c.deep || []).length, p = PRG[S.ci];
    body = teacher('<p>Chào bạn 👋 Hôm nay mình học <b>chương ' + (S.ci + 1) + ': ' + esc(c.vi) + '</b>' + (c.en ? ' <span class="muted">(' + esc(c.en) + ')</span>' : '') + '.</p>'
      + (c.intro ? '<p>' + bil(esc(c.intro.vi), esc(c.intro.en)) + '</p>' : '')
      + (X.story ? '<div class="gb-story">💡 <b>Hình dung cả chương:</b> ' + X.story + '</div>' : '')
      + '<p style="margin-top:10px">Mình sẽ đi qua <b>' + ideas + ' ý lớn</b> bằng hình mô phỏng, <b>ảnh thật trong giáo trình WIS5</b> và từng đoạn ngắn. Ở mỗi ý bạn đoán trước, mình giảng, rồi mình hỏi lại bằng câu đề thật. Đừng cố thuộc lòng — hãy cố <b>giải thích được vì sao</b>.</p>'
      + (p && p.si > 0 && !p.done ? '<p class="muted">Lần trước bạn học dở ở bước ' + p.si + '.</p>' : ''), '', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbGoto(1)">▶ Bắt đầu giảng</button><button class="btn sec" onclick="gbStart(' + S.ci + ',true,true)">🎧 Nghe tự động cả chương</button>' + (p && p.si > 1 && !p.done ? '<button class="btn sec" onclick="gbGoto(' + p.si + ')">⏩ Học tiếp từ bước ' + p.si + '</button>' : '') + '<button class="btn ghost" onclick="go(\'learn\');openChap(' + S.ci + ')">📄 Bản đọc đầy đủ</button></div>';
    autoNext = function(){ gbGoto(1); };
  }
  else if (s.t === 'hook'){
    body = fig(s.fig, 0) + teacher('<p>' + pick(OPEN, s.bi) + '</p><p><b>' + pick(HOOK, s.bi) + '</b></p><p style="font-size:16.5px">«' + esc(strip(s.b.h_vi)) + '»' + (s.b.h_en ? ' <span class="muted">(' + esc(strip(s.b.h_en)) + ')</span>' : '') + ' — nó là gì, và vì sao thanh tra hàn phải quan tâm? Nghĩ 10 giây.</p>', 'hook', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Tôi đoán xong → xem giảng</button><button class="btn sec" onclick="gbNext()">Mình chưa biết gì, giảng luôn</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>';
    autoNext = function(){ autoTimer = setTimeout(gbNext, 3500); };
  }
  else if (s.t === 'teach'){
    var n = s.slides.length; if (S.pi >= n) S.pi = n - 1; var sl = s.slides[S.pi];
    var head = '<p><b style="color:var(--accent);font-size:16px">' + esc(strip(s.b.h_vi)) + '</b>' + (s.b.h_en ? '<span class="lang-en">' + esc(strip(s.b.h_en)) + '</span>' : '') + '</p>';
    var inner = '';
    if (sl.kind === 'fig') body = '<div class="gb-slide">' + fig(sl.fig, sl.k) + teacher(head + '<div class="gb-big" id="' + speakId + '">' + sl.text + '</div><div class="gb-mini" style="margin-top:8px">Hình: bước ' + (sl.k + 1) + '/' + FIG.steps(sl.fig) + '</div>', '', null) + '</div>';
    else if (sl.kind === 'para') body = '<div class="gb-slide">' + (sl.fig ? fig(sl.fig, null, true) : '') + teacher(head + '<div class="gb-big" id="' + speakId + '">' + bil(sl.vi, sl.en) + '</div>', '', null) + '</div>';
    else if (sl.kind === 'book') body = '<div class="gb-slide">' + BOOK.img(sl.f, '', false) + teacher(head + '<div class="gb-big" id="' + speakId + '">📷 <b>Hình thật trong giáo trình WIS5</b> (trang ' + sl.f.p + ', ' + esc(sl.f.n.replace(/^T/, 'Bảng ')) + '): ' + esc(sl.f.vi || sl.f.cap) + '.' + (sl.f.vi ? '<span class="lang-en">' + esc(sl.f.cap) + '</span>' : '') + '</div><div class="gb-mini" style="margin-top:8px">Nhìn kỹ hình này 10 giây — đề thi hay cho ảnh macro/ảnh khuyết tật tương tự và hỏi "đây là gì / do đâu". Chạm ảnh để phóng to.</div>', '', null) + '</div>';
    else {
      var tail = '';
      if (s.b.rows && s.b.rows.length) tail += '<ul class="lesson" style="margin-top:4px">' + s.b.rows.map(function(r){ return '<li>' + bil(r.vi, r.en) + '</li>'; }).join('') + '</ul>';
      if (s.b.table) tail += '<div class="tbl-wrap"><table class="deep-tbl"><thead><tr>' + s.b.table.cols.map(function(col){ return '<th>' + bil(col.vi, col.en) + '</th>'; }).join('') + '</tr></thead><tbody>' + s.b.table.data.map(function(row){ return '<tr>' + row.map(function(cell){ return '<td>' + bil(cell.vi, cell.en) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      if (s.b.foot) tail += '<p class="muted deep-foot">' + bil(s.b.foot.vi, s.b.foot.en) + '</p>';
      body = '<div class="gb-slide">' + teacher(head + '<div class="gb-mini" style="margin-bottom:4px">📋 Bảng / liệt kê cần nhớ của ý này:</div><div id="' + speakId + '">' + tail + '</div>', '', null) + '</div>';
    }
    var last = S.pi >= n - 1, nxt = st[S.si + 1];
    body += dots(n, S.pi);
    nav = '<div class="gb-row"><button class="gb-tbtn" onclick="gbSpeak(\'' + speakId + '\')">🔊 Đọc</button>'
      + (S.pi > 0 ? '<button class="btn sec" onclick="gbSlide(-1)">← Slide trước</button>' : '<button class="btn ghost" onclick="gbPrev()">← Lùi</button>')
      + (!last ? '<button class="btn" onclick="gbSlide(1)">Tiếp → (' + (S.pi + 1) + '/' + n + ')</button>' : '<button class="btn" onclick="gbNext()">' + (nxt && nxt.t === 'check' ? 'Hiểu rồi → kiểm tra nhanh' : 'Hiểu rồi → nhắc lại') + '</button>')
      + '</div>' + askBox();
    autoNext = function(){ if (!last) gbSlide(1); else gbNext(); };
  }
  else if (s.t === 'check'){
    var q = s.q;
    var fb = '';
    if (S.ans !== null){
      var right = S.ans === q.ans;
      fb = '<div style="margin-top:12px">' + teacher('<p><b>' + pick(right ? GOOD : BAD, s.bi) + '</b></p>' + (!right ? '<p>Đáp án đúng là <b>' + String.fromCharCode(65 + q.ans) + '. ' + esc(q.opts[q.ans].vi || q.opts[q.ans].en) + '</b>.</p>' : '') + (q.exp && (q.exp.vi || q.exp.en) ? '<p>' + bil(esc(q.exp.vi || ''), esc(q.exp.en || '')) + '</p>' : '') + (!right ? '<p class="muted">Muốn mình giảng lại không? Bấm "Xem lại slide".</p>' : ''), right ? 'good' : 'bad', speakId) + '</div>';
    }
    body = teacher('<p>🧪 <b>Kiểm tra nhanh ý «' + esc(strip(s.b.h_vi)) + '»</b> <span class="gb-mini">(' + esc(q.src) + ')</span></p><div class="gb-q">' + markQ(q.en) + (q.vi ? '<div class="muted" style="font-weight:400;font-size:13.5px;margin-top:4px">' + esc(q.vi) + '</div>' : '') + '</div>' + (S.dis ? dissectHTML(q, strip(s.b.h_vi)) : ''), '', S.ans === null ? speakId : null)
      + optHTML(q, S.ans, 'gbPick', true) + fb;
    nav = '<div class="gb-row"><button class="gb-tbtn' + (S.dis ? ' on' : '') + '" onclick="gbDis()">🔍 ' + (S.dis ? 'Ẩn mổ xẻ' : 'Mổ xẻ đề (từ khó, bẫy, dịch)') + '</button>' + (S.ans !== null ? (S.ans !== q.ans ? '<button class="btn sec" onclick="gbGoto(' + (S.si - 1) + ')">↩ Xem lại slide</button>' : '') + '<button class="btn" onclick="gbNext()">Tiếp tục →</button>' : '<button class="btn ghost" onclick="gbPrev()">← Xem lại slide</button>') + '</div>' + askBox();
    if (S.ans !== null) autoNext = function(){ autoTimer = setTimeout(gbNext, 1500); };
  }
  else if (s.t === 'recall'){
    body = (s.fig ? fig(s.fig, null, true) : '') + teacher('<p>🗣️ <b>Nhắc lại bằng lời của bạn</b></p><p>Nhìn hình, nói thành tiếng 1–2 câu: <b>«' + esc(strip(s.b.h_vi)) + '»</b> là gì / xảy ra khi nào / vì sao quan trọng. Nói ra được mới là hiểu.</p>' + (S.ans === 'review' ? '<p class="muted">Không sao. Đoạn giảng chính đây, đọc lại rồi thử nói lần nữa:</p>' + (s.b.body || []).slice(0, 2).map(function(p){ return '<div class="gb-story" style="border-left-color:var(--accent2);background:rgba(76,168,255,.05)">' + bil(p.vi, p.en) + '</div>'; }).join('') : ''), 'hook', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbRecall(true)">✅ Nói trôi, hiểu rồi</button><button class="btn sec" onclick="gbRecall(false)">😕 Còn lấn cấn</button><button class="btn ghost" onclick="gbPrev()">← Xem lại slide</button></div>' + askBox();
  }
  else if (s.t === 'teachL'){
    body = teacher('<p>Chương này mình học theo cụm thuật ngữ. Đọc từng dòng, chỗ nào chưa hình dung được thì hỏi mình bên dưới.</p>' + s.items.map(function(L){ return '<div class="gb-story" style="border-left-color:var(--accent)"><b>' + esc(L.t_vi) + (L.t_en ? ' <span class="muted">(' + esc(L.t_en) + ')</span>' : '') + ':</b> ' + bil(L.vi, L.en) + '</div>'; }).join(''), '', speakId);
    nav = '<div class="gb-row"><button class="gb-tbtn" onclick="gbSpeak(\'' + speakId + '\')">🔊 Đọc</button><button class="btn" onclick="gbNext()">Tiếp →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
    autoNext = gbNext;
  }
  else if (s.t === 'gallery'){
    body = teacher('<p>📷 <b>Thêm ' + s.items.length + ' hình trong giáo trình thuộc chương này</b> — lướt nhanh để nhận mặt: đề thi thực hành & lý thuyết đều dùng ảnh kiểu này. Chạm hình để phóng to, ←/→ để lật.</p><div class="bk-grid">' + s.items.map(function(f){ return '<div>' + BOOK.img(f) + BOOK.cap(f) + '</div>'; }).join('') + '</div>', '', null);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Tiếp →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>';
    autoNext = gbNext;
  }
  else if (s.t === 'traps' || s.t === 'numbers'){
    var n2 = s.items.length; if (S.pi >= n2) S.pi = n2 - 1;
    var isT = s.t === 'traps';
    body = '<div class="gb-slide">' + teacher('<p>' + (isT ? '⚠️ <b>Bẫy đề thi ' : '🔢 <b>Phải thuộc ') + (S.pi + 1) + '/' + n2 + '</b> — ' + (isT ? 'đề thích đánh đố chỗ này:' : 'con số/bảng hay vào đề:') + '</p><div class="gb-big" id="' + speakId + '">' + s.items[S.pi] + '</div>', isT ? 'trap' : '', null) + '</div>' + dots(n2, S.pi);
    var last2 = S.pi >= n2 - 1;
    nav = '<div class="gb-row"><button class="gb-tbtn" onclick="gbSpeak(\'' + speakId + '\')">🔊 Đọc</button>' + (S.pi > 0 ? '<button class="btn sec" onclick="gbSlide(-1)">← Trước</button>' : '<button class="btn ghost" onclick="gbPrev()">← Lùi</button>') + (!last2 ? '<button class="btn" onclick="gbSlide(1)">Tiếp →</button>' : '<button class="btn" onclick="gbNext()">Xong ' + (isT ? 'bẫy đề' : 'con số') + ' →</button>') + '</div>' + askBox();
    autoNext = function(){ if (!last2) gbSlide(1); else gbNext(); };
  }
  else if (s.t === 'recap'){
    body = teacher('<p>📌 <b>Chốt thuật ngữ (' + s.k + '/' + s.n + ')</b> — đề thi bằng tiếng Anh nên bạn chỉ cần <b>nhận ra</b> từ tiếng Anh. Bấm 🔊 để nghe phát âm.</p>'
      + '<div id="' + speakId + '">' + s.items.map(function(L){ var en = L.t_en || ''; return '<div class="gb-term"><button class="sp" onclick="gbSpeakText(' + JSON.stringify(en || L.t_vi).replace(/"/g, '&quot;') + ',\'en-GB\')">🔊</button><div><b>' + esc(L.t_vi) + '</b>' + (en ? ' <span class="muted">= ' + esc(en) + '</span>' : '') + '<div style="font-size:13.5px;margin-top:2px">' + esc(L.vi) + '</div></div></div>'; }).join('') + '</div>', '', null);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Tiếp →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>';
    autoNext = gbNext;
  }
  else if (s.t === 'keys'){
    var UND = LS('cswip_und', {}); var u = UND[S.ci] || {}; var items = c.key.map(function(k){ return k.vi; }).slice(0, 12);
    body = teacher('<p>🧠 <b>Tự kiểm: tôi giải thích được chưa?</b></p><p>Với mỗi điểm dưới đây, nói 1–2 câu giải thích như đang dạy đồng nghiệp. Nói trôi thì tích. Ý nào ấp úng, bấm "Lùi" về đọc lại.</p>'
      + items.map(function(t, i){ return '<div class="nr-task' + (u[i] ? ' done' : '') + '" style="padding:8px 0"><button class="cb" onclick="(window.nrUnd?nrUnd(' + S.ci + ',' + i + '):0);gbKeysRefresh()" aria-label="tích">' + (u[i] ? '✓' : '') + '</button><div class="tx">' + t + '</div></div>'; }).join(''), '', speakId);
    nav = '<div class="gb-row"><button class="btn" onclick="gbNext()">Làm 5 câu tổng kết →</button><button class="btn ghost" onclick="gbPrev()">← Lùi</button></div>' + askBox();
  }
  else if (s.t === 'quiz'){
    var it = s.qs[S.qk];
    var fb2 = S.qans !== null ? '<div style="margin-top:12px">' + teacher('<p><b>' + pick(S.qans === it.ans ? GOOD : BAD, S.qk) + '</b></p>' + (S.qans !== it.ans ? '<p>Đáp án: <b>' + String.fromCharCode(65 + it.ans) + '. ' + esc(it.opts[it.ans].vi || it.opts[it.ans].en) + '</b></p>' : '') + (it.exp && (it.exp.vi || it.exp.en) ? '<p>' + bil(esc(it.exp.vi || ''), esc(it.exp.en || '')) + '</p>' : ''), S.qans === it.ans ? 'good' : 'bad', speakId) + '</div>' : '';
    body = teacher('<p>🏁 <b>Tổng kết chương — câu ' + (S.qk + 1) + '/' + s.qs.length + '</b> <span class="muted">(đúng ' + S.qright + ') · ' + esc(it.src) + ' · đọc tiếng Anh như đề thật</span></p><div class="gb-q">' + markQ(it.en) + '</div>' + (S.dis ? dissectHTML(it, it.cat) : ''), '', S.qans === null ? speakId : null) + optHTML(it, S.qans, 'gbQPick', true) + fb2;
    nav = '<div class="gb-row"><button class="gb-tbtn' + (S.dis ? ' on' : '') + '" onclick="gbDis()">🔍 ' + (S.dis ? 'Ẩn mổ xẻ' : 'Mổ xẻ đề') + '</button>' + (S.qans !== null ? '<button class="btn" onclick="gbQNext()">' + (S.qk + 1 >= s.qs.length ? 'Xem kết quả →' : 'Câu tiếp →') + '</button>' : '') + '</div>';
  }
  else if (s.t === 'done'){
    var p2 = prg(S.ci); p2.done = true; savePrg();
    var pct = p2.total ? Math.round(p2.right / p2.total * 100) : 0;
    var rev = (p2.review || []).map(function(bi){ var b = (c.deep || [])[bi]; if (!b) return ''; var si = -1; for (var i = 0; i < st.length; i++) if (st[i].t === 'teach' && st[i].bi === bi){ si = i; break; } return '<li><a href="#" onclick="gbGoto(' + si + ');return false" style="color:var(--accent2)">' + esc(strip(b.h_vi)) + '</a></li>'; }).join('');
    var nx = ORDER[(ORDER.indexOf(S.ci) + 1) % ORDER.length];
    body = teacher('<p>🎉 <b>Xong chương ' + (S.ci + 1) + '!</b> Bạn trả lời đúng <b>' + p2.right + '/' + p2.total + '</b> câu kiểm tra (' + pct + '%).</p>'
      + (X.mnemonic ? '<div class="gb-story">🧷 <b>Câu thần chú của chương:</b> ' + X.mnemonic + '</div>' : '')
      + (rev ? '<p style="margin-top:10px">Mấy ý bạn còn lấn cấn, mình gợi ý xem lại:</p><ul class="lesson">' + rev + '</ul>' : '<p style="margin-top:10px">Không có ý nào bị đánh dấu lấn cấn — rất tốt.</p>')
      + '<p>Bước tiếp theo đúng chuẩn: <b>thi chương có chấm điểm</b> (toàn tiếng Anh như đề thật). Đậu ≥70% rồi hãy sang chương kế. Câu sai nằm trong 📕 Sổ câu sai.</p>', 'good', speakId);
    nav = '<div class="gb-row">' + (window.hdStart ? '<button class="btn" onclick="hdStart(' + S.ci + ')">📘 Học từ đề chương này</button>' : '') + '<button class="btn ' + (window.hdStart ? 'sec' : '') + '" onclick="(typeof examChap===\'function\'?examChap(' + S.ci + '):(go(\'quiz\'),startChap(' + S.ci + ')))">📝 Thi chương này</button><button class="btn sec" onclick="gbStart(' + nx + ',true)">▶ Chương tiếp: ' + esc(DATA.chapters[nx].vi) + '</button><button class="btn ghost" onclick="gbStart(' + S.ci + ',true)">🔁 Học lại</button><button class="btn ghost" onclick="gbList()">Danh sách</button></div>';
    AUTO = false;
  }
  el.innerHTML = '<div class="gb-wrap">' + h + '<div class="card">' + body + nav + '</div></div>';
  window.scrollTo(0, 0);
  if (TTS && speakId){ var sp = document.getElementById(speakId); if (sp) speak(sp.textContent, 'vi-VN', (AUTO && autoNext) ? function(){ if (AUTO) autoNext(); } : null); else if (AUTO && autoNext) autoNext(); }
}
window.gbKeysRefresh = function(){ setTimeout(render, 30); };
window.renderTeach = render;

/* ---------- tab Bài học: nút "Nghe giảng" + hình minh họa dưới mỗi ý Giảng giải ---------- */
function injectLearn(){
  var el = document.getElementById('v-learn'); if (!el || !el.classList.contains('on')) return;
  if (typeof CURCHAP === 'undefined' || CURCHAP === null) return;
  var card = el.querySelector('.card'); if (!card || !el.querySelector('.deep-wrap, ul.lesson')) return;
  if (!el.querySelector('#gb-learn-btn')){
    var d = document.createElement('div'); d.id = 'gb-learn-btn'; d.className = 'card'; d.style.cssText = 'border-left:3px solid var(--accent2);display:flex;gap:12px;align-items:center;flex-wrap:wrap';
    d.innerHTML = '<div style="font-size:28px">👨‍🏫</div><div style="flex:1;min-width:200px"><b>Không muốn ngồi đọc? Để thầy giảng từng slide.</b><div class="muted" style="font-size:12.5px;margin-top:2px">Hình mô phỏng hiện dần → giảng từng đoạn → hỏi lại bằng đề thật → bẫy đề → con số thuộc lòng. Có đọc giọng & chạy tự động.</div></div><button class="btn" onclick="gbStart(' + CURCHAP + ')">🎙️ Nghe giảng chương này</button>';
    card.parentNode.insertBefore(d, card);
  }
  if (FIG && !el.querySelector('.gb-learnfig')){
    var c = DATA.chapters[CURCHAP]; var blocks = el.querySelectorAll('.deep-block'); var figs = FIG.assign(CURCHAP, c.deep || []);
    blocks.forEach(function(bl, bi){ var f = figs[bi]; if (!f) return; var h4 = bl.querySelector('h4'); if (!h4) return; var w = document.createElement('div'); w.className = 'gb-learnfig'; w.innerHTML = FIG.render(f) + '<div class="gb-figcap">' + esc(FIG.title(f)) + ' · <a href="#" onclick="gbStart(' + CURCHAP + ');return false" style="color:var(--accent2)">xem mô phỏng từng bước</a></div>'; h4.insertAdjacentElement('afterend', w); });
  }
}
new MutationObserver(function(){ try{ ensure(); injectLearn(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
ensure();
})();
