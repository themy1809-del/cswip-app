/* ============================================================
   NUOCRUT — ÔN THI NƯỚC RÚT (kỳ thi tháng 12)
   Nạp CUỐI CÙNG, sau mọi module khác. Gồm:
   1) Ngày thi thống nhất (mặc định 01/12/2026, đổi được) + đếm ngược
   2) Nhật ký học mỗi ngày + thống kê theo chủ đề (ghi nhận từ
      Quiz, Tài liệu thi, Thi thử) + "mức sẵn sàng" dự đoán
   3) Tab 📕 SỔ CÂU SAI — gom mọi câu từng sai ở mọi chế độ,
      ôn lại cho đến khi thuộc
   4) Trang Tổng quan mới: việc cần làm hôm nay, điểm yếu,
      xu hướng thi thử, lịch học 8 tuần
   5) Tab Lộ trình động: kế hoạch từng ngày tới ngày thi
   6) Sắp xếp lại menu theo ưu tiên ôn thi + thanh dưới (mobile)
   7) Phím tắt (1–4 chọn đáp án, Enter câu tiếp), sao lưu/khôi
      phục dữ liệu, chế độ học tự do, liên kết Từ vựng/Học dễ nhớ
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || typeof go !== 'function') return;

var DAY = 86400000;
var DEFAULT_EXAM = '2026-12-01';
var PASS = 70;

/* ---------- tiện ích ---------- */
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }
function SV(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function pad2(n){ return (n < 10 ? '0' : '') + n; }
function dkey(d){ d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function fromKey(k){ var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
function ddmm(d){ return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1); }
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function norm(s){ return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 90); }
function B(vi, en){ return (typeof bili === 'function') ? bili(vi, en) : vi; }
function T(msg){ try{ if (typeof toast === 'function') toast(msg); }catch(e){} }
var WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/* ---------- kho dữ liệu ---------- */
var LOG   = LS('cswip_log', {});     // ngày -> {n,k,thi,mock:[],wr}
var WRONG = LS('cswip_wrong', {});   // id -> câu sai
var CAT   = LS('cswip_cat', {});     // chủ đề -> {n,k}
var SEEN  = LS('cswip_seen', {});    // id -> 1
var TASKS = LS('cswip_tasks', {});   // ngày -> {taskId:true}
var UND   = LS('cswip_und', {});     // chương -> {keyIndex:true}  "tôi giải thích được ý này"
function saveAll(){ SV('cswip_log', LOG); SV('cswip_wrong', WRONG); SV('cswip_cat', CAT); SV('cswip_seen', SEEN); SV('cswip_und', UND); }

/* ---------- HIỂU BÀI: checklist "tôi giải thích được" theo điểm cần nhớ của chương ---------- */
function undItems(ci){ var c = DATA.chapters[ci]; if (!c) return []; var a = (c.key && c.key.length) ? c.key.map(function(k){ return k.vi; }) : (c.deep || []).map(function(b){ return b.h_vi; }); return a.slice(0, 12); }
function undPct(ci){ var items = undItems(ci); if (!items.length) return null; var u = UND[ci] || {}, k = 0; items.forEach(function(_, i){ if (u[i]) k++; }); return Math.round(k / items.length * 100); }
function undAvg(){ var n = 0, s = 0; DATA.chapters.forEach(function(_, ci){ var p = undPct(ci); if (p != null){ n++; s += p; } }); return n ? Math.round(s / n) : 0; }
window.nrUnd = function(ci, i){ UND[ci] = UND[ci] || {}; UND[ci][i] = !UND[ci][i]; saveAll(); try{ renderLearn(); }catch(e){} if (undPct(ci) === 100) T('🎓 Bạn đã tự tin giải thích trọn chương ' + (ci + 1) + '!'); };
function undCardHTML(ci){
  var items = undItems(ci); if (!items.length) return '';
  var u = UND[ci] || {}, p = undPct(ci);
  return '<div class="card" id="nr-und" style="border-left:3px solid var(--green)"><h3 style="margin:0">🧠 Tôi hiểu bài này chưa? <span class="muted" style="font-size:12.5px;font-weight:400">(' + p + '%)</span></h3>'
    + '<p class="muted" style="font-size:13px;margin-top:4px;line-height:1.5">Cách học hiểu nhanh nhất: với mỗi ý dưới đây, <b>nói thành tiếng 1–2 câu giải thích như đang dạy đồng nghiệp</b> (vì sao, cơ chế, bẫy đề). Nói trôi thì tích. Ý nào ấp úng → kéo lên đọc lại phần 🎓 Giảng giải đúng ý đó.</p>'
    + '<div class="nr-bar"><i style="width:' + p + '%;background:var(--green)"></i></div>'
    + items.map(function(t, i){ return '<div class="nr-task' + (u[i] ? ' done' : '') + '"><button class="cb" onclick="nrUnd(' + ci + ',' + i + ')" aria-label="tích">' + (u[i] ? '✓' : '') + '</button><div class="tx">' + t + '</div></div>'; }).join('')
    + '<p class="muted" style="font-size:12px;margin-top:8px">Mẹo: học xong chương, làm ngay quiz chương; câu sai sẽ vào 📕 Sổ câu sai kèm đoạn bài học liên quan.</p></div>';
}
/* tìm đoạn bài học liên quan nhất tới 1 câu hỏi (để hiểu vì sao sai) */
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, would:1, following:1, most:1, likely:1, when:1, used:1, type:1, welding:1, weld:1, welds:1, during:1, should:1, can:1, not:1, than:1, into:1, if:1, has:1, have:1, its:1, all:1, one:1, two:1, may:1, will:1, you:1, your:1, these:1, there:1, their:1, more:1, less:1, some:1, any:1, out:1, up:1, does:1, do:1, we:1, also:1, about:1, been:1, being:1, was:1, were:1, but:1, after:1, before:1, between:1, where:1, how:1, why:1, who:1, so:1, no:1, yes:1};
function words(s){ return String(s || '').toLowerCase().replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
function relatedLesson(w){
  var qw = words(w.q + ' ' + (w.o && w.o[w.a] || '')); if (!qw.length) return null;
  var chaps = [];
  if (w.lesson && DATA.chapters[w.lesson[0]]){ if (w.lesson[1] >= 0 && DATA.chapters[w.lesson[0]].lessons[w.lesson[1]]) return {ci:w.lesson[0], L:DATA.chapters[w.lesson[0]].lessons[w.lesson[1]]}; chaps = [w.lesson[0]]; }
  else if (CAT2CHAP[w.cat] != null) chaps = [CAT2CHAP[w.cat]];
  var best = null;
  function scan(ci, bonus){ var c = DATA.chapters[ci]; if (!c) return; c.lessons.forEach(function(L){
    var tw = words(L.t_en || ''), bw = words(L.en || ''); if (!tw.length && !bw.length) return;
    var ts = {}; tw.forEach(function(x){ ts[x] = 1; }); var bs = {}; bw.forEach(function(x){ bs[x] = 1; });
    var tm = 0, bm = 0; qw.forEach(function(x){ if (ts[x]) tm++; else if (bs[x]) bm++; });
    var sc = (tm * 2 + bm) / Math.sqrt(bw.length + tw.length + 4) + bonus;
    if (tm === 0 && sc < 0.45) return;                    // phải trúng tên bài hoặc khớp thân bài rất mạnh
    if (!best || sc > best.sc) best = {ci:ci, L:L, sc:sc, tm:tm};
  }); }
  chaps.forEach(function(ci){ scan(ci, 0.15); });
  DATA.chapters.forEach(function(_, ci){ if (chaps.indexOf(ci) < 0) scan(ci, 0); });
  return (best && (best.tm >= 1 || best.sc >= 0.45)) ? best : null;
}
function todayLog(){ var k = dkey(); if (!LOG[k]) LOG[k] = {n:0, k:0, thi:0, mock:[], wr:0}; if (!LOG[k].mock) LOG[k].mock = []; return LOG[k]; }

/* ---------- ngày thi ---------- */
function examDate(){
  var v = null; try{ v = localStorage.getItem('cswip_exam_date'); }catch(e){}
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) v = DEFAULT_EXAM;
  return fromKey(v);
}
function daysLeft(){ var e = examDate(); var t = fromKey(dkey()); return Math.round((e - t) / DAY); }
window.nrSetExam = function(v){ if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)){ try{ localStorage.setItem('cswip_exam_date', v); localStorage.removeItem('cswip_plan_anchor'); }catch(e){} T('📅 Đã đặt ngày thi ' + v.split('-').reverse().join('/')); renderAll(); } };
window.countdown = function(){ return Math.max(0, daysLeft()); };

/* ---------- giai đoạn ôn theo số ngày còn lại ---------- */
function phase(days){
  if (days < 0)  return {id:'past',  name:'Đã thi xong', col:'var(--muted)', vi:'Kỳ thi đã qua. Đặt ngày thi mới nếu bạn thi lại hoặc thi phần khác.'};
  if (days > 42) return {id:'base',  name:'Nền tảng', col:'var(--accent2)', vi:'Mỗi ngày 1 chương ở 🎙️ Giảng bài (thầy dẫn từng ý), rồi thi chương. Sai câu nào bấm "Ôn bài liên quan".'};
  if (days > 21) return {id:'drill', name:'Hiểu bài + Cày đề', col:'var(--accent)', vi:'Mỗi ngày 1 chương học HIỂU ở 🎙️ Giảng bài (thầy dẫn từng ý, tự giải thích lại) + ~25 câu Tài liệu thi (chọn đáp án tiếng Anh trước, xem dịch sau) + ôn Sổ câu sai. Cách 2–3 ngày 1 đề thi thử bấm giờ.'};
  if (days > 7)  return {id:'mock',  name:'Thi thử + Vá lỗ hổng', col:'var(--yellow)', vi:'Cách ngày 1 đề thi thử bấm giờ (mục tiêu ổn định ≥70%). Ngày còn lại: ôn hiểu 3 chương yếu nhất + Sổ câu sai + Luyện điểm yếu. Hạn chế dùng nút dịch — phòng thi không có.'};
  if (days > 2)  return {id:'final', name:'Chốt', col:'var(--green)', vi:'Chỉ ôn Sổ câu sai + bảng thuộc lòng (tư thế PA–PG, ký hiệu que, chọn NDT, H2 cracking). Không học chủ đề mới.'};
  return {id:'rest', name:'Nghỉ ngơi', col:'var(--green)', vi:'Lướt lại Sổ câu sai 20 phút, chuẩn bị dụng cụ (kính, dưỡng đo, bút, CMND). Ngủ đủ — đầu óc tỉnh táo đáng giá hơn 10 câu học thêm.'};
}

/* ---------- bản đồ câu hỏi Tài liệu thi (theo text) ---------- */
var THI_SETS = {}, THI_BY_TEXT = {};
var THI_LABEL = {wp1:'Work Pack 1', wp2:'Work Pack 2', wptwi:'Work Pack TWI', lead:'Leading Q', ring:'WPS Rings', fb:'Điền khuyết'};
(function(){
  ['THI_WP1','THI_WP2','THI_WPTWI','THI_LEAD','THI_RING','THI_FB'].forEach(function(k){
    var s = window[k]; if (!s || !s.items) return;
    THI_SETS[s.id] = s;
    s.items.forEach(function(it, i){
      if (!it.o || typeof it.a !== 'number') return;
      var key = norm(it.q); if (!THI_BY_TEXT[key]) THI_BY_TEXT[key] = {set:s, idx:i, it:it, id:'t:' + s.id + ':' + i, cat:THI_LABEL[s.id] || s.vi};
    });
  });
})();
/* câu đề thật CSWIP trong Thi thử Phần 1 → cùng id với quiz lõi (b#, r#) để SRS/Sổ câu sai thống nhất */
(function(){
  function addBank(arr, pre){ if (!arr) return; arr.forEach(function(q, i){ if (!q.o || typeof q.a !== 'number') return; var key = norm(q.q); if (THI_BY_TEXT[key]) return; THI_BY_TEXT[key] = {set:null, idx:i, it:{q:q.q, o:q.o, a:q.a, vq:q.qv || '', va:q.ev || q.e || '', n:''}, id:pre + i, cat:q.c || 'Đề thật', bank:true}; }); }
  try{ addBank(typeof BANK !== 'undefined' ? BANK : null, 'b'); addBank(typeof REALBANK !== 'undefined' ? REALBANK : null, 'r'); }catch(e){}
})();
function thiMeta(q){ var m = THI_BY_TEXT[norm(q)]; if (m) return m; var key = norm(q); for (var k in THI_BY_TEXT){ if (k.indexOf(key.slice(0, 50)) === 0) return THI_BY_TEXT[k]; } return null; }

/* ---------- ghi nhận 1 lượt trả lời ---------- */
/* item: {id, qe, qv, oe, ov, a, ee, ev, cat, src, lesson:[ci,li]|null} */
function record(item, pick, right, opts){
  opts = opts || {};
  var L = todayLog(); L.n++; if (right) L.k++;
  if (opts.thi) L.thi++;
  if (opts.wr) L.wr++;
  if (item.id) SEEN[item.id] = 1;
  var c = item.cat || '?'; CAT[c] = CAT[c] || {n:0, k:0}; CAT[c].n++; if (right) CAT[c].k++;
  if (item.id){
    var w = WRONG[item.id];
    if (!right){
      if (!w) w = {n:0, ok:0};
      w.q = item.qe; w.qv = item.qv || ''; w.o = item.oe; w.ov = item.ov || []; w.a = item.a; w.pick = pick;
      w.ee = item.ee || ''; w.ev = item.ev || ''; w.cat = c; w.src = item.src || ''; w.lesson = item.lesson || null;
      w.n++; w.ok = 0; w.cleared = false; w.last = Date.now();
      WRONG[item.id] = w;
    } else if (w && !w.cleared){
      w.ok = (w.ok || 0) + 1; w.last = Date.now();
      if (w.ok >= 2){ w.cleared = true; T('📕 Đã thuộc 1 câu từng sai ✓'); }
    }
  }
  if (opts.game && typeof gameTick === 'function'){ try{ gameTick(right); }catch(e){} }
  saveAll();
  try{ if (window.cloudSync) window.cloudSync(); }catch(e){}
}
function wrongList(includeCleared){ var a = []; for (var id in WRONG){ var w = WRONG[id]; if (!w || !w.q) continue; if (!includeCleared && w.cleared) continue; w.id = id; a.push(w); } a.sort(function(x, y){ return (y.n - y.ok) - (x.n - x.ok) || (y.last || 0) - (x.last || 0); }); return a; }
function wrongCount(){ return wrongList(false).length; }

/* ---------- HOOK 1: quiz lõi (answer) ---------- */
(function(){
  if (typeof window.answer !== 'function') return;
  var orig = window.answer;
  window.answer = function(oi){
    var q = null, lbl = '';
    try{ q = Qz[Qi]; lbl = (Qsource && Qsource.label) || ''; }catch(e){}
    var r = orig.apply(this, arguments);
    try{
      if (q){
        var src = lbl || (q.id && q.id.charAt(0) === 'c' ? 'Quiz chương' : 'Ngân hàng đề');
        var lesson = null; if (q.id && q.id.charAt(0) === 'c'){ var m = /^c(\d+)-/.exec(q.id); if (m) lesson = [+m[1], -1]; }
        record({id:q.id, qe:q.qe, qv:q.qv, oe:q.oe, ov:q.ov, a:q.a, ee:q.ee, ev:q.ev, cat:q.cat, src:src, lesson:lesson}, oi, oi === q.a, {wr: lbl === 'Sổ câu sai'});
      }
    }catch(e){}
    return r;
  };
})();

/* ---------- HOOK 2: Tài liệu thi (đọc DOM sau khi chọn) ---------- */
var lastThi = '';
function hookThi(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  var cards = el.querySelectorAll('.thi-card');
  for (var i = 0; i < cards.length; i++){
    var card = cards[i];
    var qEl = card.querySelector('.thi-q'); if (!qEl) continue;
    var opts = card.querySelectorAll('button.thi-opt'); if (!opts.length) continue; // chỉ chế độ Làm bài
    var bad = -1, ok = -1, answered = false;
    for (var j = 0; j < opts.length; j++){ if (opts[j].classList.contains('bad')) bad = j; if (opts[j].classList.contains('ok')) ok = j; if (opts[j].disabled) answered = true; }
    if (!answered || ok < 0) continue;
    var m = thiMeta(qEl.textContent); if (!m) continue;
    var key = m.id + '|' + (bad >= 0 ? bad : ok);
    if (key === lastThi) continue;
    lastThi = key;
    var it = m.it;
    record({id:m.id, qe:it.q, qv:it.vq || '', oe:it.o, ov:[], a:it.a, ee:'', ev:(it.va || '') + (it.n ? ' ⚠️ ' + it.n : ''), cat:m.cat, src:'Tài liệu thi — ' + m.cat, lesson:lessonFor(it.q)}, bad >= 0 ? bad : ok, bad < 0, {thi:true, game:true});
  }
}
function lessonFor(q){ try{ var map = window.THI_LESSON_MAP; if (!map) return null; var k = String(q).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 60); return map[k] || null; }catch(e){ return null; } }

/* ---------- HOOK 3: Thi thử (MOCK) ---------- */
var mockSess = {}, mockActive = false, mockDoneFlag = false, lastMockBD = '';
function injectMockBD(){
  if (!lastMockBD) return; var el = document.getElementById('v-mock'); if (!el || el.querySelector('#nr-mockbd')) return;
  var h2 = el.querySelector('.mk-card h2'); if (!h2 || !/ĐẬU|Chưa đậu/.test(h2.textContent)) return;
  h2.closest('.mk-card').insertAdjacentHTML('afterend', lastMockBD);
}
function hookMock(){
  if (!window.MOCK || window.MOCK._nr) return;
  var M = window.MOCK; M._nr = true;
  var oStart = M.start, oPick = M.pick, oQuit = M.quit;
  M.start = function(){ mockSess = {}; mockActive = true; mockDoneFlag = false; lastMockBD = ''; return oStart.apply(this, arguments); };
  M.pick = function(i){
    try{ var qEl = document.querySelector('#v-mock .mk-q'); var m = qEl && thiMeta(qEl.textContent); if (m) mockSess[m.id] = {m:m, pick:i}; }catch(e){}
    return oPick.apply(this, arguments);
  };
  M.quit = function(){ var r = oQuit.apply(this, arguments); try{ if (!document.querySelector('#v-mock .mk-timer')){ mockActive = false; mockSess = {}; } }catch(e){} return r; };
}
function watchMockResult(){
  if (!mockActive || mockDoneFlag) return;
  var el = document.getElementById('v-mock'); if (!el) return;
  var h2 = el.querySelector('.mk-card h2'); if (!h2) return;
  var t = h2.textContent || '';
  if (!/ĐẬU|Chưa đậu/.test(t)) return;
  mockDoneFlag = true; mockActive = false;
  var pm = /(\d+)\s*%/.exec(t); var pct = pm ? +pm[1] : null;
  var L = todayLog(); if (pct != null){ L.mock.push(pct); try{ if (typeof gameMock === 'function') gameMock(pct); }catch(e){} }
  var ids = Object.keys(mockSess);
  ids.forEach(function(id){
    var s = mockSess[id], it = s.m.it, right = s.pick === it.a;
    if (s.m.bank){ try{ QUIZSTATE[id] = {correct:right}; if (typeof srsUpdate === 'function') srsUpdate(id, right); if (typeof save === 'function') save(); }catch(e){} }
    record({id:id, qe:it.q, qv:it.vq || '', oe:it.o, ov:[], a:it.a, ee:'', ev:(it.va || '') + (it.n ? ' ⚠️ ' + it.n : ''), cat:s.m.cat, src:'Thi thử — ' + (s.m.bank ? 'đề thật CSWIP' : s.m.cat), lesson:s.m.bank ? null : lessonFor(it.q)}, s.pick, right, {game:true});
  });
  /* phân tích theo chương: sai ở đâu → học từ đề chương đó */
  try{
    var bd = {};
    ids.forEach(function(id){ var s = mockSess[id], it = s.m.it, right = s.pick === it.a; var ci = null; if (s.m.bank){ ci = CAT2CHAP[s.m.cat]; } else { var ls = lessonFor(it.q); ci = ls ? ls[0] : null; } var key = ci != null ? ci : 'x'; bd[key] = bd[key] || {n:0, k:0}; bd[key].n++; if (right) bd[key].k++; });
    var rows = Object.keys(bd).map(function(k){ return {k:k, n:bd[k].n, kk:bd[k].k, p:Math.round(bd[k].k / bd[k].n * 100)}; }).sort(function(a, b){ return a.p - b.p || b.n - a.n; });
    lastMockBD = '<div class="card" id="nr-mockbd"><h3 style="margin:0 0 4px">📊 Sai ở chương nào?</h3><p class="muted" style="font-size:12.5px">Tính trên ' + ids.length + ' câu đã trả lời. Bấm "Học từ đề" để ôn đúng chương yếu, hoặc "Sổ câu sai" để xem từng câu.</p>'
      + rows.map(function(r){ var name = r.k === 'x' ? 'Khác' : DATA.chapters[+r.k].vi; var col = r.p >= PASS ? 'var(--green)' : r.p >= 50 ? 'var(--accent)' : 'var(--red)'; return '<div class="nr-weak"><div class="nm"><div>' + esc(name) + ' <span class="muted" style="font-size:11.5px">' + r.kk + '/' + r.n + '</span></div><div class="nr-bar"><i style="width:' + r.p + '%;background:' + col + '"></i></div></div><div class="pc" style="color:' + col + '">' + r.p + '%</div>' + (r.k !== 'x' && window.hdStart ? '<button class="drill" onclick="hdStart(' + r.k + ')">📘 Học từ đề</button>' : '') + '</div>'; }).join('')
      + '<div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn sec" onclick="go(\'wrong\')">📕 Sổ câu sai</button></div></div>';
  }catch(e){ lastMockBD = ''; }
  mockSess = {};
  saveAll();
  if (pct != null) T((pct >= PASS ? '🎉' : '💪') + ' Thi thử ' + pct + '% — ' + ids.length + ' câu đã ghi vào nhật ký');
  injectMockBD();
}

/* ---------- thống kê ---------- */
function allMocks(){
  var a = [];
  try{ (LS('MOCKH', []) || []).forEach(function(x){ a.push({pc:x.pc, d:x.d, src:'mock'}); }); }catch(e){}
  try{ var u = LS('cswip_user', {}); (u.history || []).forEach(function(h){ if (/Timed|Thi Chương|Exam/i.test(h.label || '')) a.push({pc:h.p, d:h.d, src:'quiz'}); }); }catch(e){}
  return a;
}
function recentMockAvg(n){
  var m = []; var H = LS('MOCKH', []) || []; for (var i = H.length - 1; i >= 0 && m.length < n; i--) m.push(H[i].pc);
  if (!m.length){ var u = LS('cswip_user', {}); (u.history || []).slice(0, n).forEach(function(h){ if (/Timed|Thi Chương|Exam/i.test(h.label || '')) m.push(h.p); }); }
  if (!m.length) return null; return Math.round(m.reduce(function(a, b){ return a + b; }, 0) / m.length);
}
function accuracy(){
  var n = 0, k = 0; try{ for (var id in QUIZSTATE){ n++; if (QUIZSTATE[id] && QUIZSTATE[id].correct) k++; } }catch(e){}
  for (var c in CAT){ if (c.indexOf('Work Pack') === 0 || /Leading|Rings|khuyết/.test(c)){ n += CAT[c].n; k += CAT[c].k; } }
  return n ? {n:n, k:k, p:Math.round(k / n * 100)} : {n:0, k:0, p:0};
}
function totalQuestions(){ var t = 0; try{ t += poolAll().length; }catch(e){} for (var s in THI_SETS) t += THI_SETS[s].items.length; return t; }
function seenCount(){ var s = {}; try{ for (var id in QUIZSTATE) s[id] = 1; }catch(e){} for (var k in SEEN) s[k] = 1; return Object.keys(s).length; }
function readiness(){
  var acc = accuracy(), mock = recentMockAvg(3), cov = Math.min(1, seenCount() / Math.max(1, totalQuestions()));
  if (acc.n < 20 && mock == null) return null;
  var und = undAvg();
  var base = mock != null ? mock : acc.p;
  var score = Math.round(base * 0.5 + acc.p * 0.2 + cov * 100 * 0.1 + und * 0.2);
  var lbl, col;
  if (score >= 80){ lbl = 'Sẵn sàng'; col = 'var(--green)'; }
  else if (score >= 70){ lbl = 'Gần đạt'; col = 'var(--accent2)'; }
  else if (score >= 55){ lbl = 'Cần cày thêm'; col = 'var(--accent)'; }
  else { lbl = 'Còn yếu'; col = 'var(--red)'; }
  return {score:score, lbl:lbl, col:col, mock:mock, acc:acc, cov:Math.round(cov * 100), und:und};
}
/* chủ đề yếu: gộp QUIZSTATE (theo cat của poolAll) + CAT */
function weakTopics(){
  var t = {};
  try{ poolAll().forEach(function(q){ if (!q.id || !QUIZSTATE[q.id]) return; var c = q.cat || '?'; t[c] = t[c] || {n:0, k:0}; t[c].n++; if (QUIZSTATE[q.id].correct) t[c].k++; }); }catch(e){}
  for (var c in CAT){ if (!t[c]){ t[c] = {n:CAT[c].n, k:CAT[c].k}; } }
  var arr = Object.keys(t).map(function(c){ return {cat:c, n:t[c].n, k:t[c].k, p:Math.round(t[c].k / t[c].n * 100)}; }).filter(function(x){ return x.n >= 4; });
  arr.sort(function(a, b){ return a.p - b.p || b.n - a.n; });
  return arr;
}
var CAT2CHAP = {};
(function(){ try{ var CC = (typeof CHAP_CATS !== 'undefined') ? CHAP_CATS : {}; for (var ci in CC) CC[ci].forEach(function(c){ if (CAT2CHAP[c] == null) CAT2CHAP[c] = +ci; }); }catch(e){} })();
var THI_SET_BY_LABEL = {}; for (var _id in THI_LABEL) THI_SET_BY_LABEL[THI_LABEL[_id]] = _id;

window.nrDrillCat = function(cat){
  if (THI_SET_BY_LABEL[cat] && window.THI){ go('thi'); THI.quiz(THI_SET_BY_LABEL[cat]); return; }
  var pool = []; try{ pool = poolAll().filter(function(q){ return q.cat === cat; }); }catch(e){}
  if (!pool.length){ T('Chưa có câu hỏi cho chủ đề này'); return; }
  pool.sort(function(a, b){ var wa = QUIZSTATE[a.id] && !QUIZSTATE[a.id].correct ? 0 : (QUIZSTATE[a.id] ? 2 : 1); var wb = QUIZSTATE[b.id] && !QUIZSTATE[b.id].correct ? 0 : (QUIZSTATE[b.id] ? 2 : 1); return wa - wb; });
  go('quiz'); startSet(shuffle(pool.slice(0, 30)).slice(0, 20), 0, cat);
};
window.nrTimed = function(n, m){ go('quiz'); startTimed(n, m); };

/* ---------- việc cần làm hôm nay ---------- */
var CHAP_ORDER = [4, 1, 6, 7, 2, 8, 9, 5, 3, 11, 10, 15, 0, 12, 13, 14, 16, 17];
function todayTasks(){
  var days = daysLeft(), ph = phase(days), L = todayLog(), tk = TASKS[dkey()] || {};
  var tasks = [];
  var goal = days <= 21 ? 40 : 25;
  function add(id, txt, act, done, manual){ tasks.push({id:id, txt:txt, act:act, done:!!(done || tk[id]), manual:!!manual}); }
  if (ph.id === 'rest'){
    add('rest1', '📕 Lướt Sổ câu sai 20 phút (chỉ đọc, không học mới)', "go('wrong')", L.wr >= 10);
    add('rest2', '🧰 Chuẩn bị dụng cụ: kính, dưỡng đo, bút, giấy tờ, lộ trình đến điểm thi', null, false, true);
    add('rest3', '😴 Ngủ sớm — đặt báo thức, không thức khuya', null, false, true);
    return tasks;
  }
  if (ph.id === 'past'){ add('past', '📅 Đặt ngày thi mới ở thẻ đếm ngược phía trên', null, false, true); return tasks; }
  var due = 0; try{ due = _dueCount(); }catch(e){}
  if (due > 0) add('srs', '🔁 Ôn ngắt quãng: ' + due + ' câu đến hạn', "go('quiz');startSmart()", false);
  var wc = wrongCount();
  if (wc > 0) add('wrong', '📕 Ôn lại ' + Math.min(wc, 20) + ' câu trong Sổ câu sai', "nrReviewWrong()", L.wr >= Math.min(wc, 10));
  if (ph.id === 'base' || ph.id === 'drill' || ph.id === 'mock' || ph.id === 'final'){
    var ci = chapOfDay(days), ch = DATA.chapters[ci], up = undPct(ci);
    var gp = (window.gbProgress ? gbProgress(ci) : null);
    add('chap', '🎙️ Nghe giảng chương "' + (ch ? ch.vi : '') + '" (thầy dẫn từng ý: đoán → giảng → hỏi lại)' + (gp && !gp.done ? ' — đang ' + gp.pct + '%' : '') + (up != null ? ' · hiểu bài ' + up + '%' : ''), (window.gbStart ? "gbStart(" + ci + ")" : "go('learn');openChap(" + ci + ")"), (gp && gp.done) || (up != null && up >= 80));
  }
  if ((ph.id === 'drill' || ph.id === 'mock') && window.hdProgress){
    var hci = chapOfDay(days), hp = hdProgress(hci);
    if (hp) add('hocde', '📘 Học từ đề: chương "' + DATA.chapters[hci].vi + '" — ' + hp.n + ' điểm kiến thức rút từ đề thật' + (hp.k ? ' (đã nắm ' + hp.k + ')' : ''), "hdStart(" + hci + ")", hp.pct >= 80);
  }
  if (ph.id === 'drill' || ph.id === 'mock' || ph.id === 'base'){
    var ws = weakThiSet();
    add('thi', '📖 Làm ' + (ph.id === 'base' ? 15 : 25) + ' câu Tài liệu thi — ' + ws.label + (ws.p != null ? ' (đang ' + ws.p + '%)' : ''), "go('thi');THI.quiz('" + ws.id + "')", L.thi >= (ph.id === 'base' ? 15 : 25));
  }
  var needMock = (ph.id === 'mock') || (ph.id === 'drill' && days % 3 === 0) || (ph.id === 'base' && days % 7 === 0);
  if (needMock){
    var p = ['p1', 'p2', 'p3'][days % 3];
    add('mock', '🎓 1 đề thi thử bấm giờ (' + {p1:'Phần 1', p2:'Phần 2', p3:'Phần 3'}[p] + ') — mục tiêu ≥70%', "go('mock');MOCK.start('" + p + "')", L.mock.length > 0);
  }
  if (ph.id === 'final'){
    add('weak', '🎯 Luyện điểm yếu 20 câu', "go('quiz');startWeak()", false);
    add('vocab', '🔤 Lướt 120 từ vựng đề thi (10 phút)', "location.href='tuvung.html'", false, true);
  }
  add('goal', '🎯 Trả lời ≥' + goal + ' câu hôm nay (' + L.n + '/' + goal + ')', null, L.n >= goal);
  return tasks;
}
/* chương của ngày: lần lượt theo độ ưu tiên thi; 3 tuần cuối ưu tiên chương hiểu kém nhất */
function anchor(){ var a = LS('cswip_plan_anchor', null); if (a == null){ a = daysLeft(); SV('cswip_plan_anchor', a); } return a; }
function chapOfDay(days){
  var idx = anchor() - days;                                   // ngày đầu dùng app = chương ưu tiên số 1 (Khuyết tật)
  if (idx >= 0 && idx < CHAP_ORDER.length && days > 7) return CHAP_ORDER[idx];
  if (days <= 21 || idx >= CHAP_ORDER.length){
    var arr = DATA.chapters.map(function(_, ci){ return {ci:ci, p:undPct(ci) == null ? 0 : undPct(ci), pr:CHAP_ORDER.indexOf(ci)}; });
    arr.sort(function(a, b){ return a.p - b.p || a.pr - b.pr; });
    return arr[Math.abs(days) % Math.min(3, arr.length)].ci; // xoay vòng 3 chương hiểu kém nhất
  }
  return CHAP_ORDER[Math.abs(idx) % CHAP_ORDER.length];
}
function weakThiSet(){
  var best = null;
  for (var id in THI_SETS){
    var c = THI_LABEL[id], s = CAT[c]; var p = s && s.n >= 5 ? Math.round(s.k / s.n * 100) : null;
    var P = {}; try{ P = LS('THIP', {}); }catch(e){}
    var done = (P[id] && P[id].done) || 0;
    var score = p == null ? (done ? 60 : 50) : p; // chưa làm bao giờ ưu tiên hơn đã làm
    if (!best || score < best.score) best = {id:id, label:c, p:p, score:score};
  }
  return best || {id:'lead', label:'Leading Q', p:null};
}
window.nrTick = function(id){ var k = dkey(); TASKS[k] = TASKS[k] || {}; TASKS[k][id] = !TASKS[k][id]; SV('cswip_tasks', TASKS); renderAll(); };
window.nrDo = function(code){ try{ (new Function(code))(); }catch(e){ T('Không mở được: ' + e.message); } };

/* ---------- CSS ---------- */
var css = document.createElement('style');
css.textContent = [
'.nr-hero{border-left:3px solid var(--accent);position:relative;overflow:hidden}',
'.nr-hero .nr-days{font-size:44px;font-weight:800;line-height:1;color:var(--accent);letter-spacing:-1px}',
'.nr-hero .nr-days small{font-size:15px;color:var(--muted);font-weight:600;letter-spacing:0}',
'.nr-phase{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;border:1px solid currentColor;margin-left:6px}',
'.nr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:12px}',
'.nr-stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 12px}',
'.nr-stat b{display:block;font-size:22px;line-height:1.2}',
'.nr-stat span{font-size:11.5px;color:var(--muted)}',
'.nr-ready{display:flex;align-items:center;gap:14px;margin-top:12px;padding:12px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08)}',
'.nr-ring{width:72px;height:72px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;background:conic-gradient(var(--rc) calc(var(--rp)*1%),rgba(255,255,255,.08) 0);position:relative}',
'.nr-ring:before{content:"";position:absolute;inset:7px;border-radius:50%;background:var(--panel)}',
'.nr-ring span{position:relative}',
'.nr-task{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px dashed var(--line)}',
'.nr-task:last-child{border-bottom:none}',
'.nr-task .cb{width:24px;height:24px;flex:none;border-radius:7px;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;color:#06121f;transition:.15s;background:none}',
'.nr-task.done .cb{background:var(--green);border-color:var(--green)}',
'.nr-task.done .tx{text-decoration:line-through;color:var(--muted)}',
'.nr-task .tx{flex:1;font-size:14px;line-height:1.45}',
'.nr-task .go{flex:none;background:rgba(76,168,255,.12);border:1px solid rgba(76,168,255,.35);color:var(--accent2);border-radius:9px;padding:5px 11px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}',
'.nr-bar{height:8px;border-radius:5px;background:rgba(255,255,255,.07);overflow:hidden;margin-top:4px}',
'.nr-bar i{display:block;height:100%;border-radius:5px}',
'.nr-weak{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13.5px}',
'.nr-weak:last-child{border-bottom:none}',
'.nr-weak .nm{flex:1;min-width:0}',
'.nr-weak .pc{font-weight:800;width:44px;text-align:right}',
'.nr-weak .drill{background:none;border:1px solid var(--line);color:var(--txt);border-radius:8px;padding:4px 9px;font-size:12px;cursor:pointer;font-family:inherit}',
'.nr-quick{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:9px;margin-top:10px}',
'.nr-quick a,.nr-quick button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:13px;padding:12px;color:var(--txt);text-decoration:none;cursor:pointer;font-family:inherit;transition:.18s}',
'.nr-quick a:hover,.nr-quick button:hover{border-color:rgba(76,168,255,.5);transform:translateY(-2px)}',
'.nr-quick .ic{font-size:22px;line-height:1}',
'.nr-quick b{font-size:13.5px}',
'.nr-quick span{font-size:11.5px;color:var(--muted)}',
'.nr-trend{display:flex;align-items:flex-end;gap:5px;height:90px;padding-top:6px;position:relative;margin-top:8px}',
'.nr-trend:before{content:"70%";position:absolute;left:0;right:0;bottom:calc(70% - 1px);border-top:1px dashed rgba(255,214,10,.5);font-size:10px;color:var(--yellow);text-align:right;line-height:0;padding-right:2px}',
'.nr-trend .bar{flex:1;max-width:40px;border-radius:6px 6px 2px 2px;position:relative;min-height:3px}',
'.nr-trend .bar em{position:absolute;top:-16px;left:0;right:0;text-align:center;font-size:10.5px;font-style:normal;color:var(--muted)}',
'.nr-heat{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,12px);gap:3px;margin-top:10px;overflow-x:auto;padding-bottom:4px}',
'.nr-heat i{width:12px;height:12px;border-radius:3px;background:rgba(255,255,255,.07)}',
'.nr-heat i.l1{background:rgba(52,199,89,.35)}.nr-heat i.l2{background:rgba(52,199,89,.6)}.nr-heat i.l3{background:rgba(52,199,89,.85)}.nr-heat i.l4{background:#34c759}',
'.nr-heat i.today{outline:2px solid var(--accent)}',
'.nr-day{display:flex;gap:12px;padding:10px 0;border-bottom:1px dashed var(--line);align-items:flex-start}',
'.nr-day:last-child{border-bottom:none}',
'.nr-day .dt{flex:none;width:58px;text-align:center;border-radius:10px;padding:6px 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}',
'.nr-day .dt b{display:block;font-size:15px}.nr-day .dt span{font-size:10.5px;color:var(--muted)}',
'.nr-day.today .dt{border-color:var(--accent);background:rgba(255,122,51,.12)}',
'.nr-day.past{opacity:.75}',
'.nr-day .bd{flex:1;font-size:13.5px;line-height:1.5}',
'.nr-day .st{font-size:12px;margin-top:3px}',
'.nr-wrong{padding:12px 0;border-bottom:1px dashed var(--line)}',
'.nr-wrong:last-child{border-bottom:none}',
'.nr-wrong .q{font-weight:700;line-height:1.45;font-size:14.5px}',
'.nr-wrong .o{margin-top:6px;padding:7px 10px;border-radius:9px;font-size:13.5px;border:1px solid transparent}',
'.nr-wrong .o.ok{background:rgba(52,199,89,.14);border-color:rgba(52,199,89,.5)}',
'.nr-wrong .o.bad{background:rgba(255,69,58,.12);border-color:rgba(255,69,58,.45)}',
'.nr-wrong .ex{margin-top:7px;font-size:13px;color:#dbe7ff;background:rgba(76,168,255,.08);border:1px solid rgba(76,168,255,.22);border-radius:9px;padding:8px 10px;line-height:1.5}',
'.nr-wrong .meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px;font-size:12px;color:var(--muted)}',
'.nr-wrong .meta button{background:none;border:1px solid var(--line);color:var(--txt);border-radius:8px;padding:4px 9px;font-size:12px;cursor:pointer;font-family:inherit}',
'.nr-chip{display:inline-block;padding:3px 10px;border-radius:14px;font-size:12px;border:1px solid var(--line);color:var(--muted);cursor:pointer;margin:3px 4px 3px 0;background:none;font-family:inherit}',
'.nr-chip.on{background:var(--accent2);color:#06121f;border-color:var(--accent2)}',
'.nr-kbd{display:inline-block;border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;padding:0 6px;font-size:12px;font-family:ui-monospace,Menlo,monospace;background:rgba(255,255,255,.05)}',
'details.nr-more summary{cursor:pointer;font-weight:700;color:var(--accent2);list-style:none}',
'details.nr-more summary::-webkit-details-marker{display:none}',
'#nr-exam-inp{background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--txt);border-radius:8px;padding:5px 8px;font-size:13px;font-family:inherit}',
'@media(max-width:520px){.nr-hero .nr-days{font-size:36px}.nr-day .dt{width:50px}}',
'@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}'
].join('\n');
document.head.appendChild(css);

/* ---------- TỔNG QUAN ---------- */
function heroHTML(){
  var days = daysLeft(), ph = phase(days), e = examDate();
  var ds = pad2(e.getDate()) + '/' + pad2(e.getMonth() + 1) + '/' + e.getFullYear();
  var streak = (typeof GAME !== 'undefined' && GAME.streak) || 0;
  var L = todayLog(), goal = days <= 21 ? 40 : 25;
  var best = 0; allMocks().forEach(function(m){ if (m.pc > best) best = m.pc; });
  var avg = recentMockAvg(3);
  var R = readiness();
  var daysTxt = days < 0 ? '<span style="font-size:22px">Đã thi</span>' : (days + ' <small>ngày</small>');
  return '<div class="card nr-hero" id="todayCard">'
    + '<div class="row" style="justify-content:space-between;align-items:flex-start;gap:10px">'
    + '<div><div class="muted" style="font-size:12.5px;text-transform:uppercase;letter-spacing:.6px">⏳ Đếm ngược kỳ thi CSWIP 3.1</div>'
    + '<div class="nr-days" style="margin-top:4px">' + daysTxt + '</div>'
    + '<div style="margin-top:6px;font-size:13px" class="muted">Ngày thi <b style="color:var(--txt)">' + ds + '</b>'
    + ' · <details class="nr-more" style="display:inline-block"><summary style="display:inline;font-size:12px">đổi ngày</summary> <input type="date" id="nr-exam-inp" value="' + dkey(e) + '" onchange="nrSetExam(this.value)"></details></div></div>'
    + '<div style="text-align:right"><span class="nr-phase" style="color:' + ph.col + '">Giai đoạn: ' + ph.name + '</span></div></div>'
    + '<p style="margin-top:10px;line-height:1.6;font-size:14px">' + ph.vi + '</p>'
    + '<div class="nr-grid">'
    + '<div class="nr-stat"><b style="color:var(--accent)">' + streak + ' 🔥</b><span>Ngày học liên tục</span></div>'
    + '<div class="nr-stat"><b>' + L.n + '<small style="font-size:13px;color:var(--muted)">/' + goal + '</small></b><span>Câu hôm nay · đúng ' + L.k + '</span><div class="nr-bar"><i style="width:' + Math.min(100, Math.round(L.n / goal * 100)) + '%;background:linear-gradient(90deg,var(--accent),var(--yellow))"></i></div></div>'
    + '<div class="nr-stat"><b style="color:' + (avg == null ? 'var(--muted)' : avg >= PASS ? 'var(--green)' : 'var(--accent)') + '">' + (avg == null ? '—' : avg + '%') + '</b><span>TB 3 đề thi thử gần nhất · cao nhất ' + (best || '—') + (best ? '%' : '') + '</span></div>'
    + '<div class="nr-stat"><b style="color:var(--accent2)">' + wrongCount() + '</b><span>Câu sai chưa thuộc</span></div>'
    + '<div class="nr-stat"><b style="color:' + (undAvg() >= 80 ? 'var(--green)' : 'var(--txt)') + '">' + undAvg() + '%</b><span>Hiểu bài (tự đánh giá 18 chương)</span></div>'
    + '</div>'
    + (R ? '<div class="nr-ready"><div class="nr-ring" style="--rp:' + R.score + ';--rc:' + R.col + '"><span style="color:' + R.col + '">' + R.score + '</span></div>'
        + '<div style="flex:1"><b style="color:' + R.col + ';font-size:15px">Mức sẵn sàng: ' + R.lbl + '</b>'
        + '<div class="muted" style="font-size:12.5px;margin-top:3px;line-height:1.5">Ước tính từ thi thử (' + (R.mock == null ? 'chưa thi' : R.mock + '%') + '), độ chính xác chung (' + R.acc.p + '% trên ' + R.acc.n + ' câu), độ phủ ngân hàng (' + R.cov + '%) và mức hiểu bài tự đánh giá (' + R.und + '%). Mốc đậu thật là 70% từng phần — hãy nhắm ≥80% ở thi thử.</div></div></div>'
        : '<div class="nr-ready"><div class="nr-ring" style="--rp:0;--rc:var(--muted)"><span class="muted">?</span></div><div class="muted" style="font-size:13px;line-height:1.5"><b style="color:var(--txt)">Mức sẵn sàng: chưa đủ dữ liệu.</b><br>Làm ≥20 câu hoặc 1 đề thi thử để app ước tính khả năng đậu.</div></div>')
    + '</div>';
}
function tasksHTML(){
  var tasks = todayTasks(); var done = tasks.filter(function(t){ return t.done; }).length;
  return '<div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">✅ Hôm nay làm gì?</h3><span class="muted" style="font-size:12.5px">' + done + '/' + tasks.length + ' việc</span></div>'
    + '<div class="nr-bar" style="margin:8px 0 4px"><i style="width:' + (tasks.length ? Math.round(done / tasks.length * 100) : 0) + '%;background:var(--green)"></i></div>'
    + tasks.map(function(t){
        return '<div class="nr-task' + (t.done ? ' done' : '') + '"><button class="cb" onclick="nrTick(\'' + t.id + '\')" aria-label="đánh dấu">' + (t.done ? '✓' : '') + '</button>'
          + '<div class="tx">' + t.txt + '</div>'
          + (t.act ? '<button class="go" onclick="nrDo(' + JSON.stringify(t.act).replace(/"/g, '&quot;') + ')">Làm →</button>' : '') + '</div>';
      }).join('')
    + '<p class="muted" style="font-size:12px;margin-top:8px">Việc tự động được tích khi app ghi nhận bạn đã làm; việc khác bấm ô vuông để tích tay.</p></div>';
}
function weakHTML(){
  var arr = weakTopics().filter(function(x){ return x.p < 80; }).slice(0, 6);
  if (!arr.length) return '';
  return '<div class="card"><h3 style="margin:0 0 4px">🎯 Chủ đề cần cày</h3><p class="muted" style="font-size:12.5px">Tỉ lệ đúng thấp nhất (≥4 câu đã làm). Bấm "Luyện" để làm 20 câu đúng chủ đề đó.</p>'
    + arr.map(function(x){ var col = x.p >= PASS ? 'var(--green)' : x.p >= 50 ? 'var(--accent)' : 'var(--red)';
        return '<div class="nr-weak"><div class="nm"><div>' + esc(x.cat) + ' <span class="muted" style="font-size:11.5px">' + x.k + '/' + x.n + '</span></div><div class="nr-bar"><i style="width:' + x.p + '%;background:' + col + '"></i></div></div><div class="pc" style="color:' + col + '">' + x.p + '%</div><button class="drill" onclick="nrDrillCat(' + JSON.stringify(x.cat).replace(/"/g, '&quot;') + ')">Luyện</button></div>'; }).join('')
    + '</div>';
}
function trendHTML(){
  var H = (LS('MOCKH', []) || []).slice(-12);
  if (!H.length) return '';
  return '<div class="card"><h3 style="margin:0 0 4px">📈 Xu hướng thi thử</h3><p class="muted" style="font-size:12.5px">' + H.length + ' đề gần nhất — vạch vàng là mốc đậu 70%.</p>'
    + '<div class="nr-trend">' + H.map(function(x){ var c = x.pc >= PASS ? 'var(--green)' : 'var(--red)'; return '<div class="bar" style="height:' + Math.max(3, x.pc) + '%;background:' + c + '" title="' + esc(x.d) + ' · ' + x.pc + '%"><em>' + x.pc + '</em></div>'; }).join('') + '</div>'
    + '<div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn" onclick="go(\'mock\')">🎓 Vào thi thử</button><button class="btn sec" onclick="nrTimed(60,90)">⏱ 60 câu/90′ từ đề thật</button></div></div>';
}
function heatHTML(weeks){
  weeks = weeks || 10;
  var today = fromKey(dkey()); var start = new Date(today.getTime() - (weeks * 7 - 1) * DAY);
  start = new Date(start.getTime() - start.getDay() * DAY); // về Chủ nhật đầu tuần
  var cells = '', d = new Date(start), total = 0, active = 0;
  while (d <= today){
    var k = dkey(d), l = LOG[k], n = l ? l.n : 0; total += n; if (n) active++;
    var cls = n === 0 ? '' : n < 10 ? 'l1' : n < 25 ? 'l2' : n < 50 ? 'l3' : 'l4';
    cells += '<i class="' + cls + (k === dkey() ? ' today' : '') + '" title="' + ddmm(d) + ': ' + n + ' câu' + (l && l.mock && l.mock.length ? ' · thi thử ' + l.mock.join('%, ') + '%' : '') + '"></i>';
    d = new Date(d.getTime() + DAY);
  }
  return '<div class="card"><h3 style="margin:0 0 4px">📆 Lịch sử học ' + weeks + ' tuần</h3><p class="muted" style="font-size:12.5px">' + active + ' ngày có học · ' + total + ' câu đã trả lời. Mỗi ô là 1 ngày (đậm = nhiều câu).</p><div class="nr-heat">' + cells + '</div></div>';
}
function quickHTML(){
  var items = [
    ['🎙️', 'Giảng bài từng bước', 'Thầy ảo dẫn 18 chương', "go('teach')"],
    ['📘', 'Học từ đề thi', (window.HOCDE ? HOCDE.points.length : 700) + ' điểm kiến thức rút từ đề', "go('hocde')"],
    ['📖', 'Tài liệu thi', 'Đề Work Pack, Leading Q, Rings', "go('thi')"],
    ['🎓', 'Thi thử bấm giờ', '3 phần như thi thật', "go('mock')"],
    ['🔧', 'Thi thực hành', 'Tiêu chí A/B/C, 13 khuyết tật', "go('thi');setTimeout(function(){if(window.TH)TH.open()},150)"],
    ['📕', 'Sổ câu sai', wrongCount() + ' câu chưa thuộc', "go('wrong')"],
    ['🧠', 'Ôn ngắt quãng', 'Spaced repetition + điểm yếu', "go('quiz')"],
    ['📚', 'Bài học 18 chương', 'Giảng giải + tóm tắt', "go('learn')"],
    ['🃏', 'Flashcard', 'Thuật ngữ + 502 từ điển', "go('flash')"],
    ['🔤', '120 từ vựng đề thi', 'Nhận mặt từ là đủ', "location.href='tuvung.html'"],
    ['🗓️', 'Lộ trình từng ngày', 'Kế hoạch tới ngày thi', "go('plan')"],
    ['🤖', 'AI gia sư', 'Prompt ChatGPT/Gemini', "go('tutor')"]
  ];
  return '<div class="card"><h3 style="margin:0">🚀 Vào học nhanh</h3><div class="nr-quick">' + items.map(function(it){ return '<button onclick="nrDo(' + JSON.stringify(it[3]).replace(/"/g, '&quot;') + ')"><span class="ic">' + it[0] + '</span><b>' + it[1] + '</b><span>' + it[2] + '</span></button>'; }).join('') + '</div></div>';
}
function howHTML(){
  return '<div class="card"><details class="nr-more"><summary>ℹ️ Cách dùng app hiệu quả nhất (bấm mở)</summary><ul class="lesson" style="margin-top:8px">'
    + '<li><b>Mỗi ngày mở Tổng quan</b> và làm hết danh sách "Hôm nay làm gì" — app tự tính theo số ngày còn lại và chỗ bạn yếu.</li>'
    + '<li><b>Học HIỂU, không học vẹt</b>: vào 🎙️ Giảng bài để thầy ảo dẫn từng ý (đoán trước → giảng → hỏi lại → chốt thuật ngữ). Học đến đâu thắc mắc gõ vào ô "Hỏi thầy" ngay tại chỗ. Giải thích được là nhớ được.</li>'
    + '<li><b>Đề thi thật bằng tiếng Anh</b>: khi làm Tài liệu thi / Thi thử, chọn đáp án trước rồi mới xem dịch. Bôi đen chữ để dịch nhanh.</li>'
    + '<li><b>Sổ câu sai là vàng</b>: mọi câu sai ở mọi chế độ đều được gom lại. Trả lời đúng 2 lần liên tiếp là "thuộc".</li>'
    + '<li><b>Thi thử bấm giờ</b> cách ngày trong 3 tuần cuối; ổn định ≥80% ở app thì đi thi thật khá yên tâm.</li>'
    + '<li><b>Phím tắt</b> (máy tính): <span class="nr-kbd">1</span>–<span class="nr-kbd">4</span> chọn đáp án · <span class="nr-kbd">Enter</span> câu tiếp · <span class="nr-kbd">Space</span> lật thẻ.</li>'
    + '<li><b>Sao lưu</b> dữ liệu học ở tab Hồ sơ trước khi đổi máy/xóa trình duyệt.</li>'
    + '<li>App chỉ ôn lý thuyết. Phần thực hành (plate/pipe/macro) phải luyện trên mẫu thật tại khóa học.</li>'
    + '</ul></details></div>';
}
function renderHomeNR(){
  var el = document.getElementById('v-home'); if (!el) return;
  var u = {}; try{ u = JSON.parse(localStorage.getItem('cswip_user') || '{}'); }catch(e){}
  var hi = u.name ? 'Chào <b>' + esc(u.name) + '</b> 👋' : 'Chào bạn 👋';
  el.innerHTML = '<p class="muted" style="margin:-6px 0 10px;font-size:13.5px">' + hi + ' — ' + (daysLeft() > 0 ? 'bám lộ trình, mỗi ngày một ít, đến ngày thi là đủ.' : 'chúc bạn thi tốt!') + '</p>'
    + heroHTML() + tasksHTML() + weakHTML() + quickHTML() + trendHTML() + heatHTML(10) + howHTML();
}

/* ---------- LỘ TRÌNH ĐỘNG ---------- */
function dayPlan(days, d){
  var ph = phase(days), L = LOG[dkey(d)];
  var txt;
  if (ph.id === 'rest') txt = 'Nghỉ. Lướt Sổ câu sai 20 phút. Chuẩn bị dụng cụ & giấy tờ. Ngủ sớm.';
  else if (ph.id === 'final') txt = '📚 Ôn hiểu chương yếu nhất (Giảng giải). Sổ câu sai + Luyện điểm yếu 20 câu. Bảng thuộc lòng (tư thế, ký hiệu que, NDT). Lướt 120 từ vựng.';
  else if (ph.id === 'mock') txt = '📚 Hiểu bài: ' + chName(chapOfDay(days)) + '. ' + (days % 2 === 0 ? '🎓 Thi thử Phần ' + (['1', '2', '3'][Math.floor(days / 2) % 3]) + ' bấm giờ → xem lại câu sai.' : '📖 25 câu Tài liệu thi + Sổ câu sai.') + ' Ôn ngắt quãng nếu có câu đến hạn.';
  else if (ph.id === 'drill') txt = '📚 Hiểu bài: ' + chName(chapOfDay(days)) + ' (Giảng giải + tự kiểm). 📖 25 câu Tài liệu thi + Sổ câu sai.' + (days % 3 === 0 ? ' 🎓 1 đề thi thử bấm giờ.' : '');
  else if (ph.id === 'base'){ txt = '📚 Chương "' + chName(chapOfDay(days)) + '" + quiz chương. 15 câu Tài liệu thi.' + (days % 7 === 0 ? ' 🎓 Thi thử cuối tuần.' : ''); }
  else txt = '—';
  var st = '';
  if (L && (L.n || (L.mock && L.mock.length))) st = '<span style="color:var(--green)">✓ ' + L.n + ' câu, đúng ' + L.k + (L.mock && L.mock.length ? ' · thi thử ' + L.mock.join('%, ') + '%' : '') + '</span>';
  return {ph:ph, txt:txt, st:st};
}
function chName(ci){ return (DATA.chapters[ci] && DATA.chapters[ci].vi) || ('Chương ' + (ci + 1)); }
function renderPlanNR(){
  var el = document.getElementById('v-plan'); if (!el) return;
  var days = daysLeft(), e = examDate(), today = fromKey(dkey());
  var h = '<div class="card"><h2>🗓️ Lộ trình tới ngày thi ' + pad2(e.getDate()) + '/' + pad2(e.getMonth() + 1) + '/' + e.getFullYear() + '</h2>'
    + '<p class="muted" style="margin-top:6px">Kế hoạch tính tự động từ số ngày còn lại (<b style="color:var(--accent)">' + Math.max(0, days) + ' ngày</b>). Ngày đã qua hiện kết quả thật; hôm nay được tô cam. Đổi ngày thi ở Tổng quan.</p>'
    + '<div class="warn">⚠️ CSWIP 3.1 yêu cầu <b>kinh nghiệm thanh tra hàn tối thiểu</b> và đăng ký qua trung tâm được TWI phê duyệt. App ôn lý thuyết; phần thực hành (plate/pipe/macro) cần luyện trên mẫu thật tại khóa học.</div></div>';
  // các giai đoạn
  var phs = [['base', '> 6 tuần', 'Nền tảng'], ['drill', '3–6 tuần', 'Cày đề'], ['mock', '1–3 tuần', 'Thi thử'], ['final', '3–7 ngày', 'Chốt'], ['rest', '0–2 ngày', 'Nghỉ ngơi']];
  var cur = phase(days).id;
  h += '<div class="card"><h3 style="margin:0 0 6px">Các giai đoạn</h3>' + phs.map(function(p){ var P = phase({base:60, drill:30, mock:14, final:5, rest:1}[p[0]]); var on = P.id === cur;
    return '<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line);' + (on ? '' : 'opacity:.7') + '"><div style="flex:none;width:80px;font-size:12px;color:var(--muted);padding-top:2px">' + p[1] + '</div><div style="flex:1;font-size:13.5px"><b style="color:' + P.col + '">' + (on ? '▶ ' : '') + P.name + '</b><div class="muted" style="font-size:12.5px;margin-top:2px;line-height:1.5">' + P.vi + '</div></div></div>'; }).join('') + '</div>';
  // từng ngày: 7 ngày trước → ngày thi (tối đa 60 ngày tới)
  var from = new Date(today.getTime() - 7 * DAY), to = days > 0 ? new Date(Math.min(e.getTime(), today.getTime() + 60 * DAY)) : today;
  h += '<div class="card"><h3 style="margin:0 0 6px">Từng ngày</h3>';
  for (var d = new Date(from); d <= to; d = new Date(d.getTime() + DAY)){
    var dl = Math.round((e - d) / DAY), p = dayPlan(dl, d), isT = dkey(d) === dkey(), past = d < today;
    h += '<div class="nr-day' + (isT ? ' today' : past ? ' past' : '') + '"><div class="dt"><b>' + ddmm(d) + '</b><span>' + WD[d.getDay()] + (dl === 0 ? ' · THI' : ' · còn ' + dl) + '</span></div>'
      + '<div class="bd"><span class="muted" style="font-size:11.5px;color:' + p.ph.col + '">' + p.ph.name + '</span><div>' + p.txt + '</div>' + (p.st ? '<div class="st">' + p.st + '</div>' : (past ? '<div class="st muted">— không học</div>' : '')) + '</div></div>';
  }
  if (days > 60) h += '<p class="muted" style="font-size:12.5px;margin-top:8px">… và ' + (days - 60) + ' ngày nữa đến ngày thi.</p>';
  h += '</div>';
  h += '<div class="card"><h3 style="margin:0 0 6px">📌 Mẹo phòng thi</h3><ul class="lesson">'
    + '<li>Đọc câu hỏi 2 lần, để ý chữ <b>NOT / EXCEPT / ALWAYS / MOST likely</b>.</li>'
    + '<li>Loại trừ đáp án sai trước; không bỏ trống câu nào (không bị trừ điểm câu sai).</li>'
    + '<li>~1 phút/câu, cắm cờ câu khó rồi quay lại — tập thói quen này ngay trong Thi thử của app.</li>'
    + '<li>Work Pack: đọc kỹ WPS/bản vẽ, gạch chân con số (tiền nhiệt, interpass, đường kính que, tư thế) trước khi đọc câu hỏi.</li>'
    + '<li>Phần thực hành: đo cẩn thận, ghi đúng đơn vị, đối chiếu đúng tiêu chí chấp nhận được cho.</li></ul></div>';
  el.innerHTML = h;
}

/* ---------- TAB 📕 SỔ CÂU SAI ---------- */
var WF = {cat:'', showCleared:false};
window.nrWrongFilter = function(c){ WF.cat = (WF.cat === c) ? '' : c; renderWrong(); };
window.nrWrongToggleCleared = function(){ WF.showCleared = !WF.showCleared; renderWrong(); };
window.nrMarkKnown = function(id){ if (WRONG[id]){ WRONG[id].cleared = true; WRONG[id].ok = 2; saveAll(); renderWrong(); } };
window.nrUnknown = function(id){ if (WRONG[id]){ WRONG[id].cleared = false; WRONG[id].ok = 0; saveAll(); renderWrong(); } };
window.nrForget = function(id){ if (WRONG[id] && confirm('Xóa câu này khỏi sổ?')){ delete WRONG[id]; saveAll(); renderWrong(); } };
window.nrClearKnown = function(){ var n = 0; for (var id in WRONG) if (WRONG[id].cleared){ delete WRONG[id]; n++; } saveAll(); renderWrong(); T('Đã dọn ' + n + ' câu đã thuộc'); };
window.nrJumpLesson = function(ci, li){ try{ go('learn'); openChap(ci); if (li >= 0) setTimeout(function(){ var L = DATA.chapters[ci].lessons[li]; if (!L) return; var els = document.querySelectorAll('#v-learn li'); for (var i = 0; i < els.length; i++){ if (els[i].textContent.indexOf(L.t_vi) >= 0){ els[i].scrollIntoView({behavior:'smooth', block:'center'}); els[i].classList.add('lesson-flash'); break; } } }, 400); }catch(e){} };
window.nrReviewWrong = function(n){
  var list = wrongList(false); if (WF.cat) list = list.filter(function(w){ return w.cat === WF.cat; });
  if (!list.length){ T('Sổ câu sai trống — tuyệt vời!'); return; }
  var pool = list.slice(0, n || 20).map(function(w){ return {qv:w.qv || '', qe:w.q, ov:(w.ov && w.ov.length === w.o.length) ? w.ov : w.o.map(function(){ return ''; }), oe:w.o, a:w.a, ev:w.ev || '', ee:w.ee || '', id:w.id, cat:w.cat}; });
  go('quiz'); startSet(pool, 0, 'Sổ câu sai');
};
window.nrFlashWrong = function(){
  var list = wrongList(false); if (!list.length){ T('Sổ câu sai trống'); return; }
  FC.length = 0;
  list.forEach(function(w){ FC.push({q:w.q, a:(w.o[w.a] || '') + (w.ev ? ' — ' + w.ev : ''), c:'📕 ' + w.cat}); });
  FCi = 0; go('flash');
};
function renderWrong(){
  var el = document.getElementById('v-wrong'); if (!el) return;
  var all = wrongList(true), open = all.filter(function(w){ return !w.cleared; }), cleared = all.filter(function(w){ return w.cleared; });
  var cats = {}; open.forEach(function(w){ cats[w.cat] = (cats[w.cat] || 0) + 1; });
  var list = (WF.showCleared ? cleared : open).filter(function(w){ return !WF.cat || w.cat === WF.cat; });
  var h = '<div class="card"><h2>📕 Sổ câu sai</h2><p class="muted" style="margin-top:6px;font-size:13.5px">Mọi câu bạn từng chọn sai ở Quiz, Tài liệu thi và Thi thử đều gom về đây kèm giải thích. Trả lời đúng <b>2 lần</b> (ở bất kỳ chế độ nào) là câu đó được xếp vào "đã thuộc".</p>'
    + '<div class="nr-grid" style="grid-template-columns:repeat(3,1fr)"><div class="nr-stat"><b style="color:var(--accent)">' + open.length + '</b><span>Chưa thuộc</span></div><div class="nr-stat"><b style="color:var(--green)">' + cleared.length + '</b><span>Đã thuộc</span></div><div class="nr-stat"><b>' + Object.keys(cats).length + '</b><span>Chủ đề</span></div></div>'
    + '<div class="row" style="justify-content:flex-start;margin-top:12px;gap:8px"><button class="btn" onclick="nrReviewWrong(20)" ' + (open.length ? '' : 'disabled style="opacity:.5"') + '>📝 Luyện lại ' + Math.min(20, open.length) + ' câu' + (WF.cat ? ' (' + esc(WF.cat) + ')' : '') + '</button><button class="btn sec" onclick="nrFlashWrong()" ' + (open.length ? '' : 'disabled style="opacity:.5"') + '>🃏 Lật thẻ câu sai</button><button class="btn ghost" onclick="nrWrongToggleCleared()">' + (WF.showCleared ? '← Xem câu chưa thuộc' : 'Xem ' + cleared.length + ' câu đã thuộc') + '</button></div></div>';
  if (!open.length && !cleared.length){
    h += '<div class="card" style="text-align:center"><div style="font-size:40px">🎉</div><p style="margin-top:6px">Chưa có câu sai nào được ghi nhận. Vào <b>Tài liệu thi</b> hoặc <b>Quiz</b> làm bài — câu nào sai sẽ tự xuất hiện ở đây.</p><div class="row" style="margin-top:10px"><button class="btn" onclick="go(\'thi\')">📖 Tài liệu thi</button><button class="btn sec" onclick="go(\'quiz\')">📝 Quiz</button></div></div>';
    el.innerHTML = h; return;
  }
  if (Object.keys(cats).length > 1){
    h += '<div class="card" style="padding:12px 16px"><span class="muted" style="font-size:12px;margin-right:6px">Lọc:</span><button class="nr-chip' + (WF.cat ? '' : ' on') + '" onclick="nrWrongFilter(\'\')">Tất cả (' + open.length + ')</button>' + Object.keys(cats).sort(function(a, b){ return cats[b] - cats[a]; }).map(function(c){ return '<button class="nr-chip' + (WF.cat === c ? ' on' : '') + '" onclick="nrWrongFilter(' + JSON.stringify(c).replace(/"/g, '&quot;') + ')">' + esc(c) + ' (' + cats[c] + ')</button>'; }).join('') + '</div>';
  }
  h += '<div class="card">' + (WF.showCleared ? '<div class="row" style="justify-content:space-between"><h3 style="margin:0">✅ Đã thuộc (' + list.length + ')</h3>' + (cleared.length ? '<button class="btn ghost" style="padding:6px 12px;font-size:12.5px" onclick="nrClearKnown()">🗑 Dọn khỏi sổ</button>' : '') + '</div>' : '<h3 style="margin:0">❌ Chưa thuộc (' + list.length + ') — xếp theo số lần sai</h3>');
  if (!list.length) h += '<p class="muted" style="margin-top:8px">Không có câu nào.</p>';
  h += list.slice(0, 150).map(function(w, i){
    var o = (w.o || []).map(function(opt, k){ var cls = k === w.a ? ' ok' : (k === w.pick ? ' bad' : ''); return '<div class="o' + cls + '">' + String.fromCharCode(97 + k) + ') ' + esc(opt) + (k === w.a ? ' ✓' : k === w.pick ? ' ✗ bạn chọn' : '') + ((w.ov && w.ov[k]) ? ' <span class="muted" style="font-size:12px">— ' + esc(w.ov[k]) + '</span>' : '') + '</div>'; }).join('');
    var ex = (w.ev || w.ee) ? '<div class="ex">💡 ' + esc(w.ev || '') + (w.ee ? (w.ev ? '<br>' : '') + '<i>' + esc(w.ee) + '</i>' : '') + '</div>' : '';
    var les = '';
    if (w.lesson && DATA.chapters[w.lesson[0]]){ var ch = DATA.chapters[w.lesson[0]], L = w.lesson[1] >= 0 ? ch.lessons[w.lesson[1]] : null; les = '<button onclick="nrJumpLesson(' + w.lesson[0] + ',' + w.lesson[1] + ')">📚 ' + esc(ch.vi) + (L ? ' → ' + esc(L.t_vi || L.t_en) : '') + '</button>'; }
    else if (CAT2CHAP[w.cat] != null){ les = '<button onclick="nrJumpLesson(' + CAT2CHAP[w.cat] + ',-1)">📚 ' + esc(DATA.chapters[CAT2CHAP[w.cat]].vi) + '</button>'; }
    var rel = '', R = relatedLesson(w);
    if (R){ rel = '<div class="ex" style="background:rgba(52,199,89,.07);border-color:rgba(52,199,89,.25)">📘 <b>Kiến thức liên quan</b> <span class="muted">(' + esc(chName(R.ci)) + ')</span><br><b>' + esc(R.L.t_vi || '') + (R.L.t_en ? ' (' + esc(R.L.t_en) + ')' : '') + ':</b> ' + esc(R.L.vi || '') + '</div>'; if (!les) les = '<button onclick="nrJumpLesson(' + R.ci + ',' + DATA.chapters[R.ci].lessons.indexOf(R.L) + ')">📚 Mở bài học</button>'; }
    return '<div class="nr-wrong"><div class="q">' + (i + 1) + '. ' + esc(w.q) + (w.qv ? '<div class="muted" style="font-weight:400;font-size:13px;margin-top:3px">' + esc(w.qv) + '</div>' : '') + '</div>' + o + ex + rel
      + '<div class="meta"><span>' + esc(w.src || w.cat) + '</span><span>· sai ' + w.n + ' lần' + (w.ok ? ' · đúng lại ' + w.ok + '/2' : '') + '</span>' + les
      + (w.cleared ? '<button onclick="nrUnknown(\'' + w.id + '\')">↩ Chưa thuộc</button>' : '<button onclick="nrMarkKnown(\'' + w.id + '\')">✓ Đã thuộc</button>') + '<button onclick="nrForget(\'' + w.id + '\')">🗑</button></div></div>';
  }).join('');
  if (list.length > 150) h += '<p class="muted" style="margin-top:8px">… còn ' + (list.length - 150) + ' câu nữa. Luyện bớt rồi quay lại.</p>';
  h += '</div>';
  el.innerHTML = h;
}

/* ---------- HỒ SƠ: sao lưu, học tự do, phím tắt ---------- */
var BK_KEYS = /^(cswip_|THIP$|MOCKH$)/;
window.nrExport = function(){
  var out = {app:'cswip-app', v:1, at:new Date().toISOString(), data:{}};
  for (var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if (BK_KEYS.test(k)) out.data[k] = localStorage.getItem(k); }
  var blob = new Blob([JSON.stringify(out)], {type:'application/json'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cswip-backup-' + dkey() + '.json'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  T('💾 Đã tải file sao lưu');
};
window.nrImport = function(inp){
  var f = inp.files && inp.files[0]; if (!f) return;
  var rd = new FileReader();
  rd.onload = function(){
    try{
      var o = JSON.parse(rd.result); if (!o || o.app !== 'cswip-app' || !o.data) throw new Error('sai định dạng');
      var n = Object.keys(o.data).length;
      if (!confirm('Khôi phục ' + n + ' mục dữ liệu từ bản sao lưu ' + (o.at || '').slice(0, 10) + '? Dữ liệu hiện tại trên máy này sẽ bị GHI ĐÈ.')) return;
      for (var k in o.data) if (BK_KEYS.test(k)) localStorage.setItem(k, o.data[k]);
      alert('✅ Đã khôi phục. App sẽ tải lại.'); location.reload();
    }catch(e){ alert('❌ File không hợp lệ: ' + e.message); }
  };
  rd.readAsText(f);
};
function profileExtraHTML(){
  var total = 0; for (var k in LOG) total += LOG[k].n || 0;
  var h = '<div class="card"><h3>💾 Sao lưu & khôi phục dữ liệu học</h3><p class="muted" style="font-size:13px">Toàn bộ tiến độ (chương, quiz, sổ câu sai, lịch sử thi thử, mã kích hoạt) nằm trên trình duyệt này. Tải file sao lưu trước khi đổi máy hoặc xóa dữ liệu trình duyệt.</p>'
    + '<div class="row" style="justify-content:flex-start;margin-top:10px;gap:8px"><button class="btn" onclick="nrExport()">⬇️ Tải file sao lưu</button><label class="btn sec" style="cursor:pointer">⬆️ Khôi phục từ file<input type="file" accept="application/json,.json" style="display:none" onchange="nrImport(this)"></label></div>'
    + '<p class="muted" style="font-size:12px;margin-top:8px">Đã ghi nhận ' + total + ' lượt trả lời trong ' + Object.keys(LOG).length + ' ngày học · ' + Object.keys(WRONG).length + ' câu trong sổ câu sai.</p></div>';
  h += '<div class="card"><h3>⌨️ Phím tắt (máy tính)</h3><p class="muted" style="font-size:13px;line-height:1.9"><span class="nr-kbd">1</span>–<span class="nr-kbd">4</span> hoặc <span class="nr-kbd">A</span>–<span class="nr-kbd">D</span> chọn đáp án · <span class="nr-kbd">Enter</span> / <span class="nr-kbd">→</span> câu tiếp · <span class="nr-kbd">←</span> câu trước · <span class="nr-kbd">Space</span> lật thẻ · <span class="nr-kbd">F</span> cắm cờ (thi thử)</p></div>';
  return h;
}

/* ---------- phím tắt ---------- */
document.addEventListener('keydown', function(e){
  var t = e.target; if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  var view = document.querySelector('.view.on'); if (!view) return;
  var k = e.key;
  function vis(b){ return b && b.offsetParent !== null; }
  function clickText(re){ var bs = view.querySelectorAll('button'); for (var i = 0; i < bs.length; i++){ if (vis(bs[i]) && re.test(bs[i].textContent)){ bs[i].click(); return true; } } return false; }
  var idx = -1;
  if (/^[1-4]$/.test(k)) idx = +k - 1; else if (/^[a-dA-D]$/.test(k)) idx = k.toLowerCase().charCodeAt(0) - 97;
  if (idx >= 0){
    var opts = view.querySelectorAll('#opts .opt:not(.disabled), button.thi-opt:not([disabled]), button.mk-opt, button.gb-opt:not([disabled])');
    if (opts[idx]){ opts[idx].click(); e.preventDefault(); }
    return;
  }
  if (k === 'Enter' || k === 'ArrowRight'){ if (clickText(/Câu tiếp|Xem kết quả|Sau →|Từ tiếp|Ý tiếp|^Tiếp →|Tiếp tục|Hiểu rồi|Tôi đoán xong|Bắt đầu giảng|Nói trôi|tổng kết →/)) e.preventDefault(); return; }
  if (k === 'ArrowLeft'){ if (clickText(/← Trước|Ý trước/)) e.preventDefault(); return; }
  if (k === ' '){ var f = view.querySelector('#flash, .thi-flash'); if (f){ f.click(); e.preventDefault(); } return; }
  if (k === 'f' || k === 'F'){ clickText(/Cắm cờ|Bỏ cờ/); }
});

/* ---------- thông báo lỗi toàn cục (không làm app chết im lặng) ---------- */
var lastErr = '';
window.addEventListener('error', function(e){
  var m = (e && e.message) || ''; if (!m || m === lastErr || /Script error/i.test(m)) return; lastErr = m;
  try{ T('⚠️ Có lỗi nhỏ: ' + m.slice(0, 80)); }catch(x){}
});

/* ---------- đăng ký tab, menu, thanh dưới ---------- */
function ensureView(id){ if (document.getElementById('v-' + id)) return; var main = document.querySelector('main'); if (!main) return; var d = document.createElement('div'); d.id = 'v-' + id; d.className = 'view'; main.appendChild(d); }
ensureView('wrong');
var LABELS = {home:'🏠 Tổng quan', teach:'🎙️ Giảng bài', hocde:'📘 Học từ đề', thi:'📖 Tài liệu thi', mock:'🎓 Thi thử', quiz:'📝 Quiz & Ôn tập', wrong:'📕 Sổ câu sai', learn:'📚 Bài học', flash:'🃏 Flashcard', plan:'🗓️ Lộ trình', tools:'🛠️ Công cụ', tutor:'🤖 AI Gia sư', profile:'👤 Hồ sơ', cwi:'🇺🇸 CWI (tham khảo)'};
var ORDER = ['home', 'teach', 'hocde', 'thi', 'mock', 'quiz', 'wrong', 'learn', 'flash', 'plan', 'tools', 'tutor', 'profile', 'cwi'];
function reorderTabs(){
  if (typeof TABS === 'undefined') return;
  var have = {}; TABS.forEach(function(t){ have[t[0]] = t[1]; });
  var out = [];
  ORDER.forEach(function(k){ if (k === 'wrong' || have[k] !== undefined) out.push([k, LABELS[k] || have[k]]); });
  TABS.forEach(function(t){ if (ORDER.indexOf(t[0]) < 0) out.push(t); });
  TABS.splice.apply(TABS, [0, TABS.length].concat(out));
  buildNav();
  document.querySelectorAll('#nav button').forEach(function(b){ b.classList.toggle('on', b.dataset.t === CUR); });
}
function rebuildBotnav(){
  var bar = document.getElementById('botnav'); if (!bar || bar._nr) return; bar._nr = true;
  var items = [['home', '🏠', 'Tổng quan'], ['teach', '🎙️', 'Giảng bài'], ['thi', '📖', 'Tài liệu'], ['mock', '🎓', 'Thi thử'], ['menu', '☰', 'Thêm']];
  bar.innerHTML = items.map(function(it){ return '<button data-bt="' + it[0] + '"><span class="bi">' + it[1] + '</span>' + it[2] + '</button>'; }).join('');
  bar.querySelectorAll('button').forEach(function(b){ b.onclick = function(){ var t = b.getAttribute('data-bt'); if (t === 'menu'){ document.body.classList.toggle('nav-open'); return; } try{ go(t); }catch(e){} }; });
  syncBot();
}
function syncBot(){ var bar = document.getElementById('botnav'); if (!bar) return; bar.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-bt') === CUR); }); }

/* ---------- Bài học: thẻ "Tôi hiểu bài" + % hiểu trên danh sách ---------- */
(function(){
  if (typeof window.renderLearn !== 'function') return;
  var orig = window.renderLearn;
  window.renderLearn = function(){
    var r = orig.apply(this, arguments);
    try{
      var el = document.getElementById('v-learn'); if (!el) return r;
      if (CURCHAP === null){
        el.querySelectorAll('.chap').forEach(function(card, ci){ var p = undPct(ci); var m = card.querySelector('.meta .muted'); if (p == null || !m || card.querySelector('.nr-ub')) return; if (/🔒|🔐/.test(card.textContent)) return; m.insertAdjacentHTML('beforeend', ' · <span class="nr-ub" style="color:' + (p >= 80 ? 'var(--green)' : p > 0 ? 'var(--accent)' : 'var(--muted)') + '">🧠 hiểu ' + p + '%</span>'); });
      } else if (el.querySelector('.deep-wrap, ul.lesson') && !el.querySelector('#nr-und')){
        var first = el.querySelector('.card'); if (first) first.insertAdjacentHTML('afterend', undCardHTML(CURCHAP));
      }
    }catch(e){}
    return r;
  };
})();

/* ---------- gắn vào renderAll / renderProfile ---------- */
var _origRenderAll = window.renderAll;
window.renderAll = function(){
  try{ _origRenderAll(); }catch(e){ console.error(e); }          // các module khác vẽ phần của họ
  try{
    if (CUR === 'home') renderHomeNR();
    else if (CUR === 'plan') renderPlanNR();
    else if (CUR === 'wrong') renderWrong();
    else if (CUR === 'profile'){ var el = document.getElementById('v-profile'); if (el && !el.querySelector('#nr-profile')){ var d = document.createElement('div'); d.id = 'nr-profile'; d.innerHTML = profileExtraHTML(); el.appendChild(d); } }
  }catch(e){ console.error(e); }
  syncBot();
};

/* ---------- quan sát DOM cho Tài liệu thi / Thi thử ---------- */
new MutationObserver(function(){ try{ hookThi(); hookMock(); watchMockResult(); injectMockBD(); rebuildBotnav(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});

/* ---------- khởi động ---------- */
reorderTabs(); hookMock(); rebuildBotnav();
try{ renderAll(); }catch(e){}
window.NR = {log:LOG, wrong:WRONG, cat:CAT, record:record, daysLeft:daysLeft, readiness:readiness, weakTopics:weakTopics, tasks:todayTasks};
})();
